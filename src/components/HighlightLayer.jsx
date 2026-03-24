import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, serverTimestamp, query, orderBy,
} from 'firebase/firestore';
import { 
  MessageSquare, X, Edit2, Trash2, User, Github, Plus, Check, MoreHorizontal
} from 'lucide-react';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

// ── Constants & Styles ────────────────────────────────────────────────────────
const HIGHLIGHT_BG       = 'rgba(254, 240, 138, 0.45)';
const HIGHLIGHT_HOVER    = 'rgba(251, 191, 36, 0.55)';
const HIGHLIGHT_SELECTED = 'rgba(245, 158, 11, 0.7)';

const animations = `
  @keyframes highlightFadeIn {
    from { background-color: transparent; }
    to { background-color: ${HIGHLIGHT_BG}; }
  }
  @keyframes popoverIn {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .mark-animation {
    animation: highlightFadeIn 0.5s ease-out forwards;
  }
  .popover-animation {
    animation: popoverIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

// ── DOM Utilities ────────────────────────────────────────────────────────────
function applyHighlightToDom(containerEl, selectedText, highlightId, onClick) {
  if (!containerEl || !selectedText) return false;
  const walker = document.createTreeWalker(containerEl, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const idx = node.nodeValue.indexOf(selectedText);
    if (idx === -1) continue;

    const before = node.nodeValue.slice(0, idx);
    const after  = node.nodeValue.slice(idx + selectedText.length);

    const mark = document.createElement('mark');
    mark.dataset.highlightId = highlightId;
    mark.className = 'mark-animation';
    mark.textContent = selectedText;
    mark.style.cssText = `
      background: ${HIGHLIGHT_BG};
      border-bottom: 2px solid rgba(245, 158, 11, 0.3);
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.2s ease;
      padding: 1px 0;
    `;
    mark.addEventListener('mouseenter', () => { 
      mark.style.background = HIGHLIGHT_HOVER;
      mark.style.borderBottomColor = 'rgba(245, 158, 11, 0.8)';
    });
    mark.addEventListener('mouseleave', () => { 
      mark.style.background = HIGHLIGHT_BG;
      mark.style.borderBottomColor = 'rgba(245, 158, 11, 0.3)';
    });
    mark.addEventListener('click', (e) => {
      e.stopPropagation();
      onClick(mark.getBoundingClientRect(), highlightId);
    });

    const parent = node.parentNode;
    parent.insertBefore(document.createTextNode(before), node);
    parent.insertBefore(mark, node);
    parent.insertBefore(document.createTextNode(after), node);
    parent.removeChild(node);
    return true;
  }
  return false;
}

function removeHighlightFromDom(highlightId) {
  document.querySelectorAll(`mark[data-highlight-id="${highlightId}"]`).forEach(el => {
    const parent = el.parentNode;
    parent.insertBefore(document.createTextNode(el.textContent), el);
    parent.removeChild(el);
    parent.normalize();
  });
}

function formatTime(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── UI Components ─────────────────────────────────────────────────────────────

function SelectionPopover({ position, onSave, onCancel, user, onSignIn, selectedText, fullSentence }) {
  const [comment, setComment] = useState('');
  const taRef = useRef(null);

  useEffect(() => { taRef.current?.focus(); }, []);

  return (
    <div className="popover-animation" style={popoverWrapper(position)}>
      <div style={popoverHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={16} color="#2563eb" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>Add Annotation</span>
        </div>
        <button onClick={onCancel} style={iconBtn}><X size={16} /></button>
      </div>

      <div style={quoteBox}>
        <div style={{ fontSize: '0.6rem', color: '#92400e', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
          <span>Captured Context</span>
          <span style={{ opacity: 0.6 }}>Full Sentence</span>
        </div>
        <p style={{ ...quoteText, marginBottom: '8px' }}>"{fullSentence}"</p>
        <div style={{ fontSize: '0.6rem', color: '#92400e', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Selection</div>
        <p style={{ ...quoteText, color: '#b45309', fontWeight: 600 }}>"{selectedText}"</p>
      </div>

      {user ? (
        <div style={{ padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <img src={user.photoURL} alt="" style={userAvatarSmall} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{user.displayName}</span>
          </div>
          <textarea
            ref={taRef}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="What are your thoughts?"
            style={commentTextarea}
            rows={3}
          />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={onCancel} style={btnGhost}>Cancel</button>
            <button 
              onClick={() => comment.trim() && onSave(comment.trim())} 
              style={btnPrimary} 
              disabled={!comment.trim()}
            >
              <Check size={14} style={{ marginRight: '4px' }} />
              Save Comment
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            Sign in with GitHub to share your feedback with others.
          </p>
          <button onClick={onSignIn} style={btnGithub}>
            <Github size={16} style={{ marginRight: '8px' }} />
            Sign in with GitHub
          </button>
        </div>
      )}
      <div style={popoverArrow} />
    </div>
  );
}

function CommentPopover({ position, highlight, user, onClose, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(highlight.comment);
  const isOwner = user && user.uid === highlight.authorUid;

  return (
    <div className="popover-animation" style={popoverWrapper(position)}>
      <div style={popoverHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={highlight.authorAvatar} style={userAvatarSmall} alt="" />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{highlight.authorName}</div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{formatTime(highlight.createdAt)}</div>
          </div>
        </div>
        <button onClick={onClose} style={iconBtn}><X size={16} /></button>
      </div>

      <div style={{ padding: '12px' }}>
        {editing ? (
          <>
            <textarea
              value={editText}
              onChange={e => setEditText(e.target.value)}
              style={commentTextarea}
              rows={3}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button onClick={() => setEditing(false)} style={btnGhost}>Cancel</button>
              <button 
                onClick={() => { onEdit(editText.trim()); setEditing(false); }} 
                style={btnPrimary}
                disabled={!editText.trim()}
              >
                Update
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={displayComment}>{highlight.comment}</p>
            {isOwner && (
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                <button onClick={() => setEditing(true)} style={actionBtn}>
                  <Edit2 size={12} /> Edit
                </button>
                <button onClick={onDelete} style={deleteBtn}>
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div style={popoverArrow} />
    </div>
  );
}

function findSentenceContext(range) {
  if (!range) return "";
  const text = range.toString();
  const container = range.commonAncestorContainer;
  // Find the closest paragraph or block-level container
  const parent = container.nodeType === Node.TEXT_NODE ? container.parentNode : container;
  const p = parent.closest('p, div.prose-content') || parent;
  const fullText = p.textContent || "";
  
  // Find the occurrence of the selected text within the full text
  const startIdx = fullText.indexOf(text);
  if (startIdx === -1) return text; // Fallback

  // Expand backwards to find sentence start
  let sentenceStart = 0;
  for (let i = startIdx - 1; i >= 0; i--) {
    if (/[.!?]/.test(fullText[i]) && i < startIdx - 1) {
      sentenceStart = i + 1;
      break;
    }
  }

  // Expand forwards to find sentence end
  let sentenceEnd = fullText.length;
  for (let i = startIdx + text.length; i < fullText.length; i++) {
    if (/[.!?]/.test(fullText[i])) {
      sentenceEnd = i + 1;
      break;
    }
  }

  return fullText.slice(sentenceStart, sentenceEnd).trim();
}

// ── Main Layer ───────────────────────────────────────────────────────────────
export default function HighlightLayer({ sectionRefs, children }) {
  const { user, githubMetadata, signInWithGithub } = useAuth();
  const [highlights, setHighlights] = useState([]);
  const [selectionInfo, setSelectionInfo] = useState(null);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const appliedRef = useRef(new Set());

  useEffect(() => {
    const q = query(collection(db, 'highlights'), orderBy('createdAt', 'asc'));
    return onSnapshot(q, snap => {
      // Only show comments that have NOT been incorporated (pipeline_processed !== true)
      setHighlights(
        snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(h => h.pipeline_processed !== true)
      );
    });
  }, []);

  useEffect(() => {
    appliedRef.current.forEach(id => {
      if (!highlights.find(h => h.id === id)) {
        removeHighlightFromDom(id);
        appliedRef.current.delete(id);
      }
    });

    highlights.forEach(h => {
      if (appliedRef.current.has(h.id)) return;
      const container = sectionRefs.current?.[h.sectionId];
      if (!container) return;
      const applied = applyHighlightToDom(
        container.querySelector('.prose-content'),
        h.selectedText,
        h.id,
        (rect, id) => {
          setActiveHighlight({ rect, highlight: highlights.find(x => x.id === id) ?? h });
          setSelectionInfo(null);
        }
      );
      if (applied) appliedRef.current.add(h.id);
    });
  }, [highlights, sectionRefs]);

  const handleMouseUp = useCallback((e) => {
    if (e.target.closest('[data-popover]')) return;
    const sel = window.getSelection();
    const text = sel?.toString().trim();

    if (!text || text.length < 3) {
      if (!e.target.closest('mark')) setSelectionInfo(null);
      return;
    }

    let sectionId = null;
    if (sectionRefs.current) {
      for (const [id, el] of Object.entries(sectionRefs.current)) {
        if (el && el.contains(sel.anchorNode)) { sectionId = id; break; }
      }
    }
    if (!sectionId) return;

    const range = sel.getRangeAt(0);
    const fullSentence = findSentenceContext(range);
    
    setSelectionInfo({ 
      text, 
      sectionId, 
      rect: range.getBoundingClientRect(),
      fullSentence: fullSentence
    });
    setActiveHighlight(null);
  }, [sectionRefs]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  useEffect(() => {
    const dismiss = (e) => {
      if (!e.target.closest('[data-popover]') && !e.target.closest('mark')) {
        setSelectionInfo(null);
        setActiveHighlight(null);
      }
    };
    document.addEventListener('mousedown', dismiss);
    return () => document.removeEventListener('mousedown', dismiss);
  }, []);

  const saveHighlight = async (commentText) => {
    if (!selectionInfo || !user) return;
    
    // Find section title
    const sectionEl = sectionRefs.current?.[selectionInfo.sectionId];
    const sectionTitle = sectionEl?.querySelector('h2')?.textContent || "Unknown Section";

    try {
      await addDoc(collection(db, 'highlights'), {
        sectionId: selectionInfo.sectionId,
        sectionTitle,
        selectedText: selectionInfo.text,
        fullSentence: selectionInfo.fullSentence,
        comment: commentText,
        authorUid: user.uid,
        authorName: user.displayName,
        authorAvatar: user.photoURL,
        authorHandle: githubMetadata?.username || '',
        authorGithubId: githubMetadata?.githubId || '',
        authorProfileUrl: githubMetadata?.profileUrl || '',
        pipeline_processed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setSelectionInfo(null);
      window.getSelection()?.removeAllRanges();
    } catch (err) { console.error(err); }
  };

  const popoverStyle = (rect) => {
    if (!rect) return {};
    const width = 320;
    const margin = 20;
    const popoverHeight = 340; // Estimated max height

    // Horizontal clamping
    let left = rect.left + (rect.width / 2) - (width / 2);
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
    
    // Vertical collision detection
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    
    // Default to 'top' if enough space, else 'bottom' if enough space, else 'pushed'
    const showAbove = (spaceAbove > popoverHeight) || (spaceAbove > spaceBelow);
    
    let top = showAbove ? rect.top - 12 : rect.bottom + 12;
    
    return {
      position: 'fixed',
      top: top + 'px',
      left: left + 'px',
      width: width + 'px',
      transform: showAbove ? 'translateY(-100%)' : 'none',
      zIndex: 10000,
      maxHeight: (showAbove ? spaceAbove - 24 : spaceBelow - 24) + 'px',
    };
  };

  return (
    <>
      <style>{animations}</style>
      {children}
      {selectionInfo && (
        <div data-popover style={popoverStyle(selectionInfo.rect)}>
          <SelectionPopover 
            user={user} 
            onSignIn={signInWithGithub}
            onSave={saveHighlight}
            onCancel={() => setSelectionInfo(null)}
            selectedText={selectionInfo.text}
            fullSentence={selectionInfo.fullSentence}
          />
        </div>
      )}
      {activeHighlight && (
        <div data-popover style={popoverStyle(activeHighlight.rect)}>
          <CommentPopover 
            highlight={activeHighlight.highlight}
            user={user}
            onClose={() => setActiveHighlight(null)}
            onEdit={async (txt) => {
              await updateDoc(doc(db, 'highlights', activeHighlight.highlight.id), { comment: txt, updatedAt: serverTimestamp() });
            }}
            onDelete={async () => {
              const id = activeHighlight.highlight.id;
              removeHighlightFromDom(id);
              appliedRef.current.delete(id);
              await deleteDoc(doc(db, 'highlights', id));
              setActiveHighlight(null);
            }}
          />
        </div>
      )}
    </>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const popoverWrapper = (pos) => ({
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  ...pos
});
const popoverHeader = {
  padding: '12px 14px',
  borderBottom: '1px solid #f1f5f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#f8fafc'
};
const quoteBox = {
  padding: '10px 14px',
  background: '#fffbeb',
  borderBottom: '1px solid #fef3c7',
};
const quoteText = {
  margin: 0,
  fontSize: '0.75rem',
  color: '#92400e',
  fontStyle: 'italic',
  lineHeight: 1.4
};
const commentTextarea = {
  width: '100%',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '0.85rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
  resize: 'none',
  boxSizing: 'border-box'
};
const displayComment = {
  fontSize: '0.9rem',
  color: '#334155',
  lineHeight: 1.6,
  margin: 0
};
const userAvatarSmall = {
  width: 24,
  height: 24,
  borderRadius: '50%',
  border: '1px solid #e2e8f0'
};
const iconBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  display: 'flex',
  color: '#94a3b8',
  transition: 'all 0.2s'
};
const btnPrimary = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
};
const btnGhost = {
  background: 'none',
  border: 'none',
  color: '#64748b',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  padding: '6px 12px'
};
const btnGithub = {
  background: '#0f172a',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 20px',
  fontSize: '0.85rem',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center'
};
const actionBtn = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  padding: '4px 8px',
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#64748b',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
};
const deleteBtn = {
  ...actionBtn,
  color: '#ef4444',
  borderColor: '#fee2e2',
  background: '#fef2f2'
};
const popoverArrow = {
  // Can be added later for extra polish if needed
};
