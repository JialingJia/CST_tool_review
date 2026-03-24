#!/usr/bin/env python3
"""
init_processed_flag.py
──────────────────────
One-time migration script. Sets `pipeline_processed: false` on any document
in the `highlights` collection that doesn't already have the field.

This ensures all pre-existing comments appear correctly in the updated
HighlightLayer (which now filters out pipeline_processed=true documents).

Run ONCE after deploying the updated HighlightLayer:
    python3 init_processed_flag.py
"""

import os, sys
from pathlib import Path

KEY_FILE   = Path(__file__).parent / "firebase-service-account.json"
COLLECTION = "highlights"

if not KEY_FILE.exists():
    print(f"❌  Service account key not found at {KEY_FILE}")
    sys.exit(1)

try:
    import firebase_admin
    from firebase_admin import credentials, firestore
except ImportError:
    os.system(f"{sys.executable} -m pip install firebase-admin -q")
    import firebase_admin
    from firebase_admin import credentials, firestore

if not firebase_admin._apps:
    cred = credentials.Certificate(str(KEY_FILE))
    firebase_admin.initialize_app(cred)

db = firestore.client()

docs = list(db.collection(COLLECTION).stream())
needs_update = [d for d in docs if "pipeline_processed" not in d.to_dict()]

if not needs_update:
    print(f"✅  All {len(docs)} documents already have the pipeline_processed field. Nothing to do.")
    sys.exit(0)

print(f"ℹ️   Found {len(needs_update)} document(s) missing the pipeline_processed field.")
print("    Setting them to pipeline_processed=false so they appear in the dashboard...")

batch = db.batch()
for d in needs_update:
    ref = db.collection(COLLECTION).document(d.id)
    batch.update(ref, {"pipeline_processed": False})
batch.commit()

print(f"✅  Done — {len(needs_update)} document(s) updated.")
print("    Deploy the updated HighlightLayer and all existing highlights will still be visible.")
print("    After your next monthly pipeline run, incorporated comments will automatically disappear.")
