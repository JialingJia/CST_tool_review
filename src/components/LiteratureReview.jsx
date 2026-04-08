import React, { useMemo, useState, useRef, useEffect } from 'react';
import rawMarkdown from '../data/literature_review.md?raw';
import { filteredData as allData } from '../data/data_filtered';
import HighlightLayer from './HighlightLayer';
import ContributorsPanel from './ContributorsPanel';
import { useAuth } from '../context/AuthContext';

// ── Responsive hook ───────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

// ── Color palette (mirrors Dashboard) ────────────────────────────────────────
const TYPE_COLORS = {
  'Type 1': { bg: '#ecfdf5', text: '#065f46', border: '#6ee7b7' },
  'Type 2': { bg: '#eff6ff', text: '#1e40af', border: '#93c5fd' },
  'Survey / Theory': { bg: '#faf5ff', text: '#6b21a8', border: '#d8b4fe' },
  'Empirical Study': { bg: '#fff7ed', text: '#9a3412', border: '#fdba74' },
  _default: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
};
function typeColor(toolTypes) {
  return TYPE_COLORS[toolTypes?.[0]] ?? TYPE_COLORS._default;
}

// ── Citation lookup map ───────────────────────────────────────────────────────
function buildCitationMap() {
  const map = {};
  allData.forEach(paper => {
    if (!paper.authors?.length) return;
    const fullLast = paper.authors[0].split(',')[0].trim();
    const yr = paper.year;
    const k1 = `${fullLast.toLowerCase()}_${yr}`;
    if (!map[k1]) map[k1] = paper;
    // also index by last word (handles "Rhys Cox" → "cox")
    const lastWord = fullLast.split(' ').pop().toLowerCase();
    if (lastWord !== fullLast.toLowerCase()) {
      const k2 = `${lastWord}_${yr}`;
      if (!map[k2]) map[k2] = paper;
    }
  });
  return map;
}
const CITE_MAP = buildCitationMap();

function findPaper(citationInner) {
  const yrM = citationInner.match(/\d{4}/);
  if (!yrM) return null;
  const yr = parseInt(yrM[0]);
  const before = citationInner.split(yrM[0])[0].trim();
  const lastName = before.replace(/\s+et al\..*/, '').split(' and ')[0].trim().toLowerCase();
  return CITE_MAP[`${lastName}_${yr}`] ?? null;
}

// ── Citation regexes (two formats) ──────────────────────────────────────────
// Format A: [Author et al. Year]  or  [A et al. 2025; B et al. 2025]
//   captures everything between brackets that contains a 4-digit year
const CITE_RE_FULL = /\[([^\]]*\d{4}[a-d]?[^\]]*)\]/g;
// Format B: Author et al. [Year]  — only year in brackets
const CITE_RE_SPLIT = /([A-Z][A-Za-zé'\-]+(?: and [A-Z][A-Za-zé'\-]+)?(?:\s+et al\.)?) \[(\d{4}[a-d]?)\]/g;
// Validates a single citation segment — supports:
//   "Author et al. Year"           standard format
//   "Author et al., Venue Year"    Recent Additions format (comma + venue before year)
const SINGLE_CITE_RE = /^[A-Z][A-Za-zé'\-]+(?: and [A-Z][A-Za-zé'\-]+)?(?:\s+et al\.)?(?:,?[^\d]*)\d{4}[a-d]?$/;

// Collect all citation matches from both formats, sorted by position
function collectMatches(text) {
  const matches = [];

  // Format A — may be compound (semicolon-separated)
  const reA = new RegExp(CITE_RE_FULL.source, 'g');
  let m;
  while ((m = reA.exec(text)) !== null) {
    const segments = m[1].split(';').map(s => s.trim()).filter(Boolean);
    // Only treat as citation if every segment looks like a valid citation
    if (segments.every(s => SINGLE_CITE_RE.test(s))) {
      matches.push({ start: m.index, end: m.index + m[0].length, inners: segments });
    }
  }

  // Format B — single citation, year in brackets
  const reB = new RegExp(CITE_RE_SPLIT.source, 'g');
  while ((m = reB.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, inners: [`${m[1].trim()} ${m[2]}`] });
  }

  // Sort by start position; deduplicate overlaps
  matches.sort((a, b) => a.start - b.start);
  const deduped = [];
  let prevEnd = -1;
  for (const match of matches) {
    if (match.start >= prevEnd) { deduped.push(match); prevEnd = match.end; }
  }
  return deduped;
}

function extractCitedPapers(body) {
  const seen = new Map();
  collectMatches(body).forEach(({ inners }) => {
    inners.forEach(inner => {
      const p = findPaper(inner);
      if (p && !seen.has(p.id)) seen.set(p.id, p);
    });
  });
  return [...seen.values()];
}

// ── Markdown parser ───────────────────────────────────────────────────────────
function parseSections(raw) {
  return raw
    .split('\n---\n')
    .flatMap(chunk => {
      chunk = chunk.trim();
      if (!chunk || chunk.startsWith('*Note:')) return [];
      const lines = chunk.split('\n');
      const hi = lines.findIndex(l => l.startsWith('## '));
      if (hi === -1) return [];
      const heading = lines[hi].replace(/^##\s+/, '');
      const body = lines.slice(hi + 1).join('\n').trim();
      const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return [{ id, heading, body }];
    });
}



// Section heading → tool_types filter preset
function sectionFilterPreset(heading) {
  const h = heading.toLowerCase();
  if (h.includes('ai automation')) return { tool_types: ['Type 2'] };
  if (h.includes('mixed-initiative')) return { tool_types: ['Type 1'] };
  if (h.includes('scaffolding')) return { tool_types: ['Type 1'] };
  if (h.includes('computational')) return { tool_types: ['Type 2'] };
  if (h.includes('hybrid')) return { tool_types: ['Type 1', 'Type 2'] };
  if (h.includes('empirical')) return { tool_types: ['Empirical Study'] };
  if (h.includes('theoretical')) return { tool_types: ['Survey / Theory'] };
  return null;
}

// ── CitationChip ──────────────────────────────────────────────────────────────
function CitationChip({ inner }) {
  const [hovered, setHovered] = useState(false);
  const paper = useMemo(() => findPaper(inner), [inner]);

  // derive display text: "Smith et al. 2024" → "Smith 2024"
  const yrM = inner.match(/\d{4}/);
  const namePart = inner.split(/\s+et al\.|\s+and\s+/)[0].replace(/\s*\d{4}[a-d]?$/, '').trim();
  const display = yrM ? `${namePart} ${yrM[0]}` : inner;

  if (!paper) {
    return <span style={{ borderBottom: '1px dotted #94a3b8', color: '#94a3b8', fontSize: '0.85em' }}>[{inner}]</span>;
  }

  const { bg, text: col, border } = typeColor(paper.tool_types);

  return (
    <span style={{ position: 'relative', display: 'inline-block', verticalAlign: 'baseline' }}>
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: bg, color: col, border: `1px solid ${border}`,
          padding: '0 6px', borderRadius: '8px', fontSize: '0.78em',
          fontWeight: 700, cursor: 'help', whiteSpace: 'nowrap',
          transition: 'opacity 0.15s', opacity: hovered ? 0.7 : 1,
        }}
      >
        {display}
      </span>

      {hovered && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)', zIndex: 1000,
          background: '#fff', border: '1px solid #e2e8f0',
          borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.13)',
          padding: '0.8rem 1rem', minWidth: '260px', maxWidth: '360px',
          pointerEvents: 'none', textAlign: 'left',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a', lineHeight: 1.4, marginBottom: '0.3rem' }}>
            {paper.title}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.25rem' }}>
            {paper.authors.slice(0, 2).join(', ')}{paper.authors.length > 2 ? ' et al.' : ''} · {paper.year}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            {paper.venue}
          </div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {paper.tool_types.map(t => {
              const { bg: b, text: c, border: br } = TYPE_COLORS[t] ?? TYPE_COLORS._default;
              return <span key={t} style={{ background: b, color: c, border: `1px solid ${br}`, padding: '1px 6px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 700 }}>{t}</span>;
            })}
          </div>
        </div>
      )}
    </span>
  );
}

// ── Inline markdown renderer (bold, italic, links, citations) ────────────────
function renderInline(text) {
  // Split on **bold**, *italic*, [label](url), and citation patterns
  const TOKEN_RE = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const parts = [];
  let last = 0;

  // First collect citation matches from the citation logic
  const citeMatches = collectMatches(text);
  // Merge inline-format matches with citation matches (sorted by position)
  const inlineMatches = [];
  let m;
  const re = new RegExp(TOKEN_RE.source, 'g');
  while ((m = re.exec(text)) !== null) {
    inlineMatches.push({ start: m.index, end: m.index + m[0].length, raw: m });
  }

  // Build a unified sorted event list
  const events = [
    ...citeMatches.map(c => ({ ...c, kind: 'cite' })),
    ...inlineMatches.map(i => ({ ...i, kind: 'inline' })),
  ].sort((a, b) => a.start - b.start);

  // Deduplicate overlaps (citation takes priority)
  const deduped = [];
  let prevEnd = -1;
  for (const ev of events) {
    if (ev.start >= prevEnd) { deduped.push(ev); prevEnd = ev.end; }
  }

  deduped.forEach((ev, idx) => {
    if (ev.start > last) parts.push(<span key={`t-${idx}`}>{text.slice(last, ev.start)}</span>);
    if (ev.kind === 'cite') {
      parts.push(
        <span key={`c-${idx}`} style={{ display: 'inline-flex', gap: '3px', alignItems: 'baseline' }}>
          {ev.inners.map((inner, j) => <CitationChip key={j} inner={inner} />)}
        </span>
      );
    } else {
      const raw = ev.raw;
      if (raw[1] !== undefined) {
        // **bold**
        parts.push(<strong key={`b-${idx}`} style={{ fontWeight: 700, color: '#1e293b' }}>{raw[1]}</strong>);
      } else if (raw[2] !== undefined) {
        // *italic*
        parts.push(<em key={`i-${idx}`}>{raw[2]}</em>);
      } else if (raw[3] !== undefined) {
        // [label](url)
        parts.push(
          <a key={`a-${idx}`} href={raw[4]} target="_blank" rel="noopener noreferrer"
            style={{ color: '#2563eb', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            {raw[3]}
          </a>
        );
      }
    }
    last = ev.end;
  });
  if (last < text.length) parts.push(<span key="tail">{text.slice(last)}</span>);
  return parts;
}

function Prose({ body }) {
  // Split into blocks: paragraphs, ### sub-headings, bullet lists
  const blocks = body.split(/\n\n+/).filter(Boolean);
  const elements = [];

  blocks.forEach((block, bi) => {
    const lines = block.split('\n');

    // ### sub-heading
    if (lines[0].startsWith('### ')) {
      const heading = lines[0].replace(/^###\s+/, '');
      elements.push(
        <h3 key={`h-${bi}`} style={{
          fontSize: '0.92rem', fontWeight: 700, color: '#1e293b',
          margin: '1.4rem 0 0.5rem 0', letterSpacing: '-0.01em',
          paddingBottom: '0.25rem', borderBottom: '1px solid #f1f5f9',
        }}>
          {heading}
        </h3>
      );
      // remainder as a paragraph if any lines follow
      const rest = lines.slice(1).join('\n').trim();
      if (rest) {
        elements.push(
          <p key={`hp-${bi}`} style={{ margin: '0 0 1.1rem 0', lineHeight: 1.8, color: '#334155', fontSize: '0.95rem' }}>
            {renderInline(rest)}
          </p>
        );
      }
      return;
    }

    // Bullet list block (all lines start with '- ')
    if (lines.every(l => l.match(/^\s*-\s/) || l.match(/^\s{2,}/))) {
      elements.push(
        <ul key={`ul-${bi}`} style={{ margin: '0 0 1rem 0', paddingLeft: '1.25rem', listStyle: 'none' }}>
          {lines.filter(l => l.match(/^\s*-\s/)).map((line, li) => {
            const text = line.replace(/^\s*-\s/, '');
            return (
              <li key={li} style={{
                fontSize: '0.9rem', lineHeight: 1.75, color: '#334155',
                marginBottom: '0.2rem', position: 'relative', paddingLeft: '1rem',
              }}>
                <span style={{
                  position: 'absolute', left: 0, top: '0.55em',
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: '#94a3b8', display: 'inline-block',
                }} />
                {renderInline(text)}
              </li>
            );
          })}
        </ul>
      );
      return;
    }

    // Normal paragraph
    elements.push(
      <p key={`p-${bi}`} style={{ margin: '0 0 1.1rem 0', lineHeight: 1.8, color: '#334155', fontSize: '0.95rem' }}>
        {renderInline(block.replace(/\n/g, ' '))}
      </p>
    );
  });

  return <>{elements}</>;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LiteratureReview({ onFilterAndSwitch }) {
  const { user, signInWithGithub, signOut } = useAuth();
  const sections = useMemo(() => parseSections(rawMarkdown), []);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const sectionRefs = useRef({});
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 768;
  const [tocOpen, setTocOpen] = useState(false);

  // Cited papers per section (for count badges)
  const sectionCited = useMemo(() => {
    const m = {};
    sections.forEach(({ id, body }) => { m[id] = extractCitedPapers(body); });
    return m;
  }, [sections]);

  // IntersectionObserver — update active TOC item on scroll
  useEffect(() => {
    const obs = [];
    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveId(id); },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, [sections]);

  function scrollTo(id) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Measure the actual bottom of the sticky tab bar so the TOC bar aligns perfectly
  const [tabBarBottom, setTabBarBottom] = useState(50);
  useEffect(() => {
    const nav = document.getElementById('app-nav-bar');
    if (!nav) return;
    const measure = () => {
      const rect = nav.getBoundingClientRect();
      setTabBarBottom(rect.bottom);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  // Height of the fixed mobile TOC bar itself
  const MOBILE_TOC_HEIGHT = 44;

  const content = (
    <>
      {/* ── Fixed mobile TOC bar ── */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: tabBarBottom,
          left: 0,
          right: 0,
          zIndex: 500,
          background: 'rgba(248, 250, 252, 0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: tocOpen ? 'none' : '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          {/* Toggle button */}
          <button
            onClick={() => setTocOpen(v => !v)}
            style={{
              width: '100%', background: 'none', border: 'none',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0 1rem',
              height: `${MOBILE_TOC_HEIGHT}px`,
              cursor: 'pointer',
              fontSize: '0.82rem', fontWeight: 700, color: '#334155',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📑</span>
              <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.75rem' }}>Jump to:</span>
              <span style={{ color: '#1e40af', fontWeight: 700, maxWidth: '55vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {sections.find(s => s.id === activeId)?.heading ?? 'Section'}
              </span>
            </span>
            <span style={{ color: '#94a3b8', fontSize: '1rem', transform: tocOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
          </button>

          {/* Dropdown */}
          {tocOpen && (
            <nav style={{
              borderTop: '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0',
              background: 'rgba(255,255,255,0.97)',
              maxHeight: '60vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              padding: '0.35rem 0',
            }}>
              {sections.map(({ id, heading }) => {
                const active = activeId === id;
                return (
                  <button key={id} onClick={() => { scrollTo(id); setTocOpen(false); }} style={{
                    background: active ? '#eff6ff' : 'transparent',
                    border: 'none',
                    borderLeft: `3px solid ${active ? '#2563eb' : 'transparent'}`,
                    padding: '0.5rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: active ? 700 : 400,
                    color: active ? '#1e40af' : '#334155',
                    cursor: 'pointer',
                    lineHeight: 1.4,
                    width: '100%',
                  }}>
                    {heading}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      )}

    <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start' }}>

      {/* ── TOC sidebar (desktop only) ── */}
      {!isMobile && (
        <aside style={{ width: '196px', flexShrink: 0, position: 'sticky', top: '1rem', alignSelf: 'flex-start' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>
            Contents
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {sections.map(({ id, heading }) => {
              const active = activeId === id;
              return (
                <button key={id} onClick={() => scrollTo(id)} style={{
                  background: active ? '#eff6ff' : 'transparent',
                  border: 'none',
                  borderLeft: `2px solid ${active ? '#2563eb' : 'transparent'}`,
                  padding: '0.32rem 0.6rem',
                  textAlign: 'left',
                  fontSize: '0.77rem',
                  fontWeight: active ? 700 : 400,
                  color: active ? '#1e40af' : '#64748b',
                  cursor: 'pointer',
                  borderRadius: '0 4px 4px 0',
                  transition: 'all 0.15s',
                  lineHeight: 1.35,
                }}>
                  {heading}
                </button>
              );
            })}
          </nav>

          <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.7rem', color: '#64748b', lineHeight: 1.5 }}>
            <div style={{ fontWeight: 700, marginBottom: '0.3rem', color: '#334155' }}>Citation chips</div>
            Hover any <span style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #93c5fd', padding: '0 5px', borderRadius: '6px', fontWeight: 700, fontSize: '0.65rem' }}>Author Year</span> chip to see the paper details.
          </div>
        </aside>
      )}

      {/* ── Main reading area ── */}
      <main style={{ flex: 1, minWidth: 0, paddingBottom: '5rem', paddingTop: isMobile ? `${tabBarBottom + MOBILE_TOC_HEIGHT + 8}px` : 0 }}>

        {/* ── Contributors Panel ── */}
        <ContributorsPanel />

        {/* Review title / intro */}
        <div style={{
          marginBottom: '2rem', paddingBottom: '1.25rem',
          borderBottom: '2px solid #e2e8f0',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '1.25rem' : '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0', letterSpacing: '-0.02em' }}>
              Computational Research Ideation
            </h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
              Literature review · {allData.length} papers · {sections.length} sections
              {!isMobile && <span style={{ marginLeft: '0.75rem', color: '#94a3b8' }}>· Select any text to comment</span>}
            </p>
          </div>
          {/* GitHub auth chip */}
          {user ? (
            <button onClick={signOut} title="Sign out" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: '20px', padding: '4px 12px 4px 6px',
              cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, color: '#334155',
              alignSelf: isMobile ? 'flex-start' : 'auto',
            }}>
              <img src={user.photoURL} alt="" style={{ width: 22, height: 22, borderRadius: '50%' }} />
              {user.displayName}
            </button>
          ) : (
            <button onClick={signInWithGithub} style={{
              background: '#0f172a', color: '#fff',
              border: 'none', borderRadius: '8px',
              padding: '6px 14px', fontSize: '0.78rem', fontWeight: 700,
              cursor: 'pointer', whiteSpace: 'nowrap',
              alignSelf: isMobile ? 'flex-start' : 'auto',
            }}>
              Sign in with GitHub to comment
            </button>
          )}
        </div>

        {sections.map(({ id, heading, body }) => {
          const cited = sectionCited[id] ?? [];
          const preset = sectionFilterPreset(heading);

          return (
            <section
              key={id}
              ref={el => { sectionRefs.current[id] = el; }}
              style={{ marginBottom: '3rem', scrollMarginTop: '1rem' }}
            >
              {/* Section header */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'flex-start',
                marginBottom: '1rem', gap: '0.6rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: isMobile ? '1rem' : '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.015em' }}>
                    {heading}
                  </h2>
                  {cited.length > 0 && (
                    <span style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1px 8px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {cited.length} papers
                    </span>
                  )}
                </div>
                {preset && onFilterAndSwitch && (
                  <button
                    onClick={() => onFilterAndSwitch(preset)}
                    style={{
                      background: '#fff', border: '1px solid #bfdbfe', color: '#2563eb',
                      padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem',
                      fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                      transition: 'all 0.15s', flexShrink: 0,
                      alignSelf: isMobile ? 'flex-start' : 'auto',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                  >
                    View in Grid →
                  </button>
                )}
              </div>

              {/* Prose */}
              <div className="prose-content" style={{ background: '#fafafa', borderRadius: '10px', padding: isMobile ? '0.85rem 1rem' : '1.25rem 1.5rem', border: '1px solid #f1f5f9' }}>
                <Prose body={body} />
              </div>

              {/* Cited paper pills row */}
              {cited.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  {cited.map(p => {
                    const { bg, text: col, border } = typeColor(p.tool_types);
                    return (
                      <span key={p.id} title={p.title} style={{
                        background: bg, color: col, border: `1px solid ${border}`,
                        padding: '2px 9px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 600,
                      }}>
                        {p.authors[0].split(',')[0]} {p.year}
                      </span>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </main>
    </div>
    </>
  );

  return <HighlightLayer sectionRefs={sectionRefs}>{content}</HighlightLayer>;
}
