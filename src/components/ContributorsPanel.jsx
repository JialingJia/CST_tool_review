import React, { useState } from 'react';
import { contributors } from '../data/contributors';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Render *italic* spans in contribution text */
function renderText(text) {
  const parts = text.split(/\*([^*]+)\*/);
  return parts.map((p, i) =>
    i % 2 === 1 ? <em key={i}>{p}</em> : p
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContributorsPanel() {
  const [activeId, setActiveId] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const active = contributors.find(c => c.id === activeId) ?? null;
  const toggle = (id) => {
    setActiveId(prev => (prev === id ? null : id));
    setShowExplanation(false);
  };
  const toggleExplanation = () => {
    setShowExplanation(prev => !prev);
    setActiveId(null);
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <style>{`
        @keyframes detailIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contributor-avatar {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .contributor-avatar:hover {
          transform: scale(1.1);
          z-index: 1;
        }
      `}</style>

      {/* ── Compact avatar row ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8',
          marginRight: '4px', letterSpacing: '0.04em',
        }}>
          Contributors
        </span>

        {contributors.map(c => {
          const isActive = activeId === c.id;
          return (
            <button
              key={c.id}
              className="contributor-avatar"
              onClick={() => toggle(c.id)}
              title={`${c.name}${c.handle ? ` (${c.handle})` : ''}`}
              style={{
                padding: 0,
                background: 'none',
                border: isActive ? '2px solid #6366f1' : '2px solid #e2e8f0',
                borderRadius: '50%',
                cursor: 'pointer',
                width: '30px', height: '30px',
                flexShrink: 0,
                boxShadow: isActive ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <img
                src={c.avatar}
                alt={c.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                onError={e => {
                  // Fallback: initials
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = '#6366f1';
                  e.target.parentElement.style.color = '#fff';
                  e.target.parentElement.style.fontSize = '0.65rem';
                  e.target.parentElement.style.fontWeight = '700';
                  e.target.parentElement.innerText = c.name[0];
                }}
              />
            </button>
          );
        })}

        <span style={{ fontSize: '0.65rem', color: '#cbd5e1', marginLeft: '2px' }}>
          {contributors.length}
        </span>

        <button
          onClick={toggleExplanation}
          style={{
            background: 'none', border: 'none', padding: 0, margin: '0 0 0 8px',
            fontSize: '0.65rem', color: showExplanation ? '#6366f1' : '#94a3b8',
            cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px',
          }}
        >
          How this works?
        </button>
      </div>

      {/* ── Explanation card ── */}
      {showExplanation && (
        <div style={{
          marginTop: '8px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '12px 14px',
          animation: 'detailIn 0.18s ease-out',
          maxWidth: '480px',
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
            Human-AI Collaborative Review
          </div>
          <p style={{ fontSize: '0.72rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
            Readers can highlight text and leave paper recommendations. 
            Every month, an AI pipeline (Claude) processes these suggestions, 
            discovers the corresponding papers, synthesizes them into the prose, 
            and updates this dashboard. Contributors are automatically credited here.
          </p>
        </div>
      )}

      {/* ── Expanded detail card ── */}
      {active && (
        <div style={{
          marginTop: '8px',
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '12px 14px',
          animation: 'detailIn 0.18s ease-out',
          maxWidth: '480px',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <img
              src={active.avatar}
              alt={active.name}
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }}
            />
            <div style={{ lineHeight: 1.3 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b' }}>
                {active.name}
              </span>
              {active.handle && (
                <a href={active.profileUrl} target="_blank" rel="noopener noreferrer"
                  style={{ marginLeft: '6px', fontSize: '0.72rem', color: '#6366f1', textDecoration: 'none' }}>
                  {active.handle}
                </a>
              )}
              {active.isAI && (
                <a href={active.profileUrl} target="_blank" rel="noopener noreferrer"
                  style={{ marginLeft: '6px', fontSize: '0.72rem', color: '#6366f1', textDecoration: 'none' }}>
                  claude.ai ↗
                </a>
              )}
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{active.role}</div>
            </div>
          </div>

          {/* Contribution list */}
          {active.contributions.map((group, gi) => (
            <div key={gi} style={{ marginBottom: gi < active.contributions.length - 1 ? '8px' : 0 }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#cbd5e1', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {group.month}
              </div>
              {group.items.map((item, ii) => (
                <div key={ii} style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.6, paddingLeft: '10px', borderLeft: '2px solid #f1f5f9', marginBottom: '2px' }}>
                  {renderText(item)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
