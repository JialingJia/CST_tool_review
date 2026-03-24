#!/usr/bin/env python3
"""
collect_comments.py
───────────────────
Reads the Firestore `highlights` collection for the research-ideation-review project,
identifies comments that carry actionable pipeline instructions (e.g. paper recommendations),
writes them to pending_instructions.json, and marks each comment as processed so it is
not re-acted on in a future run.

Also writes contributor_credits.json — a log of who contributed what, consumed by the
pipeline to append credit lines to literature_review.md.

Run automatically by the monthly CST pipeline scheduled task.
Requires: firebase-admin   (pip install firebase-admin)
          CST_tool_review/firebase-service-account.json  (service account key)
"""

import json, os, sys, re, socket
from datetime import datetime, timezone
from pathlib import Path

# ── Fix gRPC proxy: strip only the socks5h vars (unsupported by gRPC),
#    keep http/https proxy so gRPC can reach Firestore via the HTTP tunnel proxy ──
for _var in ("grpc_proxy", "GRPC_PROXY",   # socks5h – gRPC-specific, must remove
             "all_proxy",  "ALL_PROXY",     # socks5h – catch-all fallback, must remove
             "ftp_proxy",  "FTP_PROXY"):    # socks5h – not needed for Firebase
    os.environ.pop(_var, None)

# ── Pre-flight: check if Firestore is reachable ──────────────────────────────
def _firestore_reachable(host="firestore.googleapis.com", port=443, timeout=5) -> bool:
    """
    Returns True if Firestore is reachable.
    - If a local HTTP proxy (127.0.0.1:3128) is running, test through it.
    - If no proxy is running, assume direct internet access and return True.
    """
    proxy_host = "127.0.0.1"
    proxy_port = 3128
    try:
        s = socket.create_connection((proxy_host, proxy_port), timeout=2)
        connect_req = (
            f"CONNECT {host}:{port} HTTP/1.1\r\n"
            f"Host: {host}:{port}\r\n\r\n"
        ).encode()
        s.sendall(connect_req)
        resp = s.recv(256).decode(errors="ignore")
        s.close()
        return "200" in resp
    except ConnectionRefusedError:
        # No proxy running locally — assume direct connection is fine
        return True
    except Exception:
        return False

WORKSPACE   = Path(__file__).parent
KEY_FILE    = WORKSPACE / "firebase-service-account.json"
OUT_FILE    = WORKSPACE / "pending_instructions.json"
CREDITS_FILE = WORKSPACE / "contributor_credits.json"
COLLECTION  = "highlights"
PROJECT_ID  = "research-ideation-review"

# ── Heuristics: what makes a comment "actionable"? ─────────────────────────
PAPER_SIGNALS = [
    r"https?://arxiv\.org/abs/\S+",
    r"https?://doi\.org/\S+",
    r"https?://dl\.acm\.org/doi/\S+",
    r"https?://aclanthology\.org/\S+",
    r"https?://openreview\.net/\S+",
    r"https?://psycnet\.apa\.org/\S+",
    r"https?://www\.semanticscholar\.org/\S+",
    r"https?://link\.springer\.com/\S+",
    r"https?://onlinelibrary\.wiley\.com/\S+",
    r"https?://ieeexplore\.ieee\.org/\S+",
    r"https?://pubmed\.ncbi\.nlm\.nih\.gov/\S+",
    r"https?://www\.nature\.com/\S+",
    r"https?://www\.pnas\.org/\S+",
    r"https?://www\.jstor\.org/\S+",
    r"\b\d{4}\.\d{4,5}\b",                    # bare arXiv ID like 2601.12152
]

ACTION_PHRASES = [
    "consider this", "add this paper", "you should include",
    "please add", "missing paper", "relevant paper",
    "see also", "check out", "don't forget", "worth looking",
    "worth reading", "you might want", "also relevant",
]

def is_actionable(text: str) -> bool:
    low = text.lower()
    # Any academic URL in the comment is automatically actionable
    if any(re.search(pat, text) for pat in PAPER_SIGNALS):
        return True
    # Action phrases without a URL are also actionable
    return any(p in low for p in ACTION_PHRASES)

def extract_urls(text: str) -> list:
    urls = re.findall(r"https?://\S+", text)
    for bid in re.findall(r"\b(\d{4}\.\d{4,5})\b", text):
        urls.append(f"https://arxiv.org/abs/{bid}")
    return list(set(urls))

def format_credit_description(data: dict) -> str:
    """Build a human-readable description of what the commenter contributed."""
    comment = data.get("comment", "").strip()
    section = data.get("sectionTitle", data.get("sectionId", ""))
    selected = data.get("selectedText", "").strip()
    handle   = data.get("authorHandle", "")
    author   = f"@{handle}" if handle else data.get("authorName", "Anonymous")

    urls = extract_urls(comment)
    if urls:
        return f'Suggested paper addition from {author} (on §{section}: "{comment[:120]}")'
    elif selected:
        return f'Feedback from {author} on §{section} — highlighted: "…{selected[:80]}…" — comment: "{comment[:120]}"'
    else:
        return f'Feedback from {author} on §{section}: "{comment[:150]}"'

def ts_to_str(ts) -> str:
    """Convert Firestore timestamp or string to ISO date string."""
    try:
        if hasattr(ts, "isoformat"):      # datetime-like
            return ts.strftime("%Y-%m-%d")
        if hasattr(ts, "seconds"):        # Firestore Timestamp proto
            return datetime.fromtimestamp(ts.seconds, tz=timezone.utc).strftime("%Y-%m-%d")
        return str(ts)[:10]
    except Exception:
        return ""

def main():
    # ── Pre-flight connectivity check ─────────────────────────────────────
    if not _firestore_reachable():
        print("[collect_comments] ⚠️  firestore.googleapis.com is not reachable "
              "(blocked by network proxy). Skipping comment collection.")
        print("  → pending_instructions.json and contributor_credits.json left unchanged.")
        sys.exit(0)

    # ── Check for key file ────────────────────────────────────────────────
    if not KEY_FILE.exists():
        print(f"[collect_comments] ⚠️  Service account key not found at {KEY_FILE}")
        print("  → Firebase Console → Project Settings → Service Accounts → Generate new private key")
        print(f"  → Save as: {KEY_FILE}")
        sys.exit(1)

    try:
        import firebase_admin
        from firebase_admin import credentials, firestore as fs
    except ImportError:
        print("[collect_comments] Installing firebase-admin…")
        os.system(f"{sys.executable} -m pip install firebase-admin -q")
        import firebase_admin
        from firebase_admin import credentials, firestore as fs

    if not firebase_admin._apps:
        cred = credentials.Certificate(str(KEY_FILE))
        firebase_admin.initialize_app(cred)

    db = fs.client()
    from google.cloud.firestore_v1.base_query import FieldFilter

    # ── Fetch unprocessed comments ────────────────────────────────────────
    try:
        raw = list(db.collection(COLLECTION)
                     .where(filter=FieldFilter("pipeline_processed", "==", False))
                     .stream())
    except Exception:
        raw = []

    if not raw:
        # Fallback: fetch all and filter client-side
        raw = [d for d in db.collection(COLLECTION).stream()
               if not d.to_dict().get("pipeline_processed", False)]

    print(f"[collect_comments] {len(raw)} unprocessed comments found")

    instructions = []
    new_credits   = []

    for doc in raw:
        data = doc.to_dict()
        comment_text = data.get("comment", "").strip()
        if not comment_text:
            continue

        actionable = is_actionable(comment_text)
        urls       = extract_urls(comment_text)
        date_str   = ts_to_str(data.get("createdAt"))
        author     = data.get("authorName", "Anonymous")

        entry = {
            "doc_id":             doc.id,
            "comment":            comment_text,
            "author":             author,
            "author_uid":         data.get("authorUid", ""),
            "author_avatar":      data.get("authorAvatar", ""),
            "author_handle":      data.get("authorHandle", ""),
            "author_github_id":   data.get("authorGithubId", ""),
            "author_profile_url": data.get("authorProfileUrl", ""),
            "section_id":         data.get("sectionId", ""),
            "section_title":      data.get("sectionTitle", ""),
            "selected_text":      data.get("selectedText", ""),
            "full_sentence":      data.get("fullSentence", ""),
            "created_at":         date_str,
            "actionable":         actionable,
            "extracted_urls":      urls,
            "acted_on":           False,
        }
        instructions.append(entry)

        # Build a credit record for every comment
        new_credits.append({
            "doc_id":             doc.id,
            "author":             author,
            "author_uid":         data.get("authorUid", ""),
            "author_handle":      data.get("authorHandle", ""),
            "author_github_id":   data.get("authorGithubId", ""),
            "author_profile_url": data.get("authorProfileUrl", ""),
            "date":               date_str,
            "section":            data.get("sectionTitle", data.get("sectionId", "")),
            "description":        format_credit_description(data),
            "comment":            comment_text,
            "urls":               urls,
            "acted_on":           False,
            "credited_in":        "",
        })

    # ── Merge into pending_instructions.json ──────────────────────────────
    existing = []
    if OUT_FILE.exists():
        try:
            existing = json.loads(OUT_FILE.read_text())
        except Exception:
            existing = []
    existing_ids = {e["doc_id"] for e in existing}
    combined = existing + [e for e in instructions if e["doc_id"] not in existing_ids]
    OUT_FILE.write_text(json.dumps(combined, indent=2, ensure_ascii=False))
    print(f"[collect_comments] pending_instructions.json → {len(combined)} total entries")

    # ── Merge into contributor_credits.json ───────────────────────────────
    existing_c = []
    if CREDITS_FILE.exists():
        try:
            existing_c = json.loads(CREDITS_FILE.read_text())
        except Exception:
            existing_c = []
    existing_c_ids = {e["doc_id"] for e in existing_c}
    combined_c = existing_c + [e for e in new_credits if e["doc_id"] not in existing_c_ids]
    CREDITS_FILE.write_text(json.dumps(combined_c, indent=2, ensure_ascii=False))
    print(f"[collect_comments] contributor_credits.json → {len(combined_c)} total entries")

    # ── Mark as processed in Firestore ───────────────────────────────────
    batch = db.batch()
    for e in instructions:
        ref = db.collection(COLLECTION).document(e["doc_id"])
        batch.update(ref, {
            "pipeline_processed": True,
            "pipeline_processed_at": datetime.now(timezone.utc).isoformat(),
        })
    batch.commit()
    print("[collect_comments] Firestore docs marked pipeline_processed=true")

if __name__ == "__main__":
    main()
