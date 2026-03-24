import React, { useMemo, useState, useRef, useEffect } from 'react';
import rawMarkdown from '../data/literature_review.md?raw';
import { filteredData as allData } from '../data/data_filtered';

// ── Color palette (mirrors Dashboard) ────────────────────────────────────────
const TYPE_COLORS = {
  'Type 1':          { bg: '#ecfdf5', text: '#065f46', border: '#6ee7b7' },
  'Type 2':          { bg: '#eff6ff', text: '#1e40af', border: '#93c5fd' },
  'Survey / Theory': { bg: '#faf5ff', text: '#6b21a8', border: '#d8b4fe' },
  'Empirical Study': { bg: '#fff7ed', text: '#9a3412', border: '#fdba74' },
  _default:          { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
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

// ── Markdown parser ───────────────────────────────────────────────────────────
const CITE_RE = /\[([A-Z][A-Za-zé\-]+(?: and [A-Z][A-Za-zé\-]+)?(?:\s+et al\.)?\s+\d{4}[a-d]?)\]/g;

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

function extractCitedPapers(body) {
  const seen = new Map();
  const re = new RegExp(CITE_RE.source, 'g');
  let m;
  while ((m = re.exec(body)) !== null) {
    const p = findPaper(m[1]);
    if (p && !seen.has(p.id)) seen.set(p.id, p);
  }
  return [...seen.values()];
}

// Section heading → tool_types filter preset
function sectionFilterPreset(heading) {
  const h = heading.toLowerCase();
  if (h.includes('scaffolding'))   return { tool_types: ['Type 1'] };
  if (h.includes('computational')) return { tool_types: ['Type 2'] };
  if (h.includes('hybrid'))        return { tool_types: ['Type 1', 'Type 2'] };
  if (h.includes('empirical'))     return { tool_types: ['Empirical Study'] };
  if (h.includes('theoretical'))   return { tool_types: ['Survey / Theory'] };
  return null;
}

// ── CitationChip ──────────────────────────────────────────────────────────────
function CitationChip({ inner }) {
  const [hovered, setHovered] = useState(false);
  const paper = useMemo(() => findPaper(inner), [inner]);

  // derive display text: "Smith et al. 2024" → "Smith 2024"
  const yrM = inner.match(/\d{4}/);
  const namePart = inner.split(/\s+et al\.|\s+and\s+/)[0];
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

// ── Prose renderer ────────────────────────────────────────────────────────────
function renderParts(text) {
  const parts = [];
  let last = 0;
  const re = new RegExp(CITE_RE.source, 'g');
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'text', content: text.slice(last, m.index) });
    parts.push({ type: 'cite', inner: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', content: text.slice(last) });
  return parts;
}

function Prose({ body }) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);
  return (
    <>
      {paragraphs.map((para, pi) => {
        const parts = renderParts(para.replace(/\n/g, ' '));
        return (
          <p key={pi} style={{ margin: '0 0 1.1rem 0', lineHeight: 1.8, color: '#334155', fontSize: '0.95rem' }}>
            {parts.map((part, i) =>
              part.type === 'text'
                ? <span key={i}>{part.content}</span>
                : <CitationChip key={i} inner={part.inner} />
            )}
          </p>
        );
      })}
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LiteratureReview({ onFilterAndSwitch }) {
  const sections = useMemo(() => parseSections(rawMarkdown), []);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const sectionRefs = useRef({});

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

  return (
    <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start' }}>

      {/* ── TOC sidebar ── */}
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

      {/* ── Main reading area ── */}
      <main style={{ flex: 1, minWidth: 0, paddingBottom: '5rem' }}>

        {/* Review title / intro */}
        <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '2px solid #e2e8f0' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0', letterSpacing: '-0.02em' }}>
            AI-Assisted Research Ideation Tools
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
            Literature review · {allData.length} papers · {sections.length} sections
          </p>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.015em' }}>
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
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                  >
                    View in Grid →
                  </button>
                )}
              </div>

              {/* Prose */}
              <div style={{ background: '#fafafa', borderRadius: '10px', padding: '1.25rem 1.5rem', border: '1px solid #f1f5f9' }}>
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
  );
}
