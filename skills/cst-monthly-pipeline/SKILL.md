---
name: cst-monthly-pipeline
description: Monthly pipeline: collect user comments from Firestore, search new CST papers, categorize, and update literature review
---

You are running the monthly CST (Creativity Support Tools) literature review pipeline for the research-ideation-review project. The workspace is at /sessions/[session-id]/mnt/CST_tool_review — use the actual mounted path available in your session.

## Overview
This pipeline runs on the 1st of each month. It collects community comments, searches for new CST papers, filters them for scope, categorizes them, updates the literature review, and appends contributor credits to the acknowledgements file.

---

## Step 1 — Collect Community Comments
Run the comment collector script:
```
cd [workspace]/CST_tool_review
pip install firebase-admin --break-system-packages -q
python3 collect_comments.py
```
This reads the Firestore `highlights` collection, writes actionable comments to `pending_instructions.json`, and contributor metadata to `contributor_credits.json`. If the Firebase service account key is missing or the network is unreachable, skip this step and note it in the final report — continue with whatever is already in those files.

---

## Step 2 — Build Paper Candidate Pool
Combine two sources:
1. **Community-recommended papers**: Read `pending_instructions.json` and extract all `extracted_urls` from entries where `actionable: true` and `acted_on: false`. **These URLs point to papers that a contributor is explicitly recommending for addition to the database** — treat them as full pipeline candidates that must go through Steps 3–6 (scope filter → categorize → add to data_filtered.js → add to literature review).
2. **Fresh web search**: Search for recent CST/AI-ideation papers (past 3 months) using queries like:
   - "creativity support tools AI CHI 2025"
   - "research ideation AI tools arxiv 2025"
   - "AI-augmented design tools UIST CSCW 2025"
   - Search arXiv cs.HC and cs.AI; ACM DL for CHI, UIST, CSCW, CHIIR proceedings.

**Deduplication rule**: deduplicate against papers already in `src/data/data_filtered.js` by matching title or DOI against existing entries in that file. Keep only papers not already present as a database entry.

**Critical**: A paper being cited or discussed in `src/data/literature_review.md` prose does **NOT** mean it is already in `data_filtered.js`. These are two separate files. Always check the database file directly when deduplicating.

---

## Step 3 — Filter Candidates for Scope
**Before categorizing anything**, run the **literature-filter** skill (use the Skill tool: `skill: "literature-filter"`) on **each candidate paper** from Step 2. This is a fast gating step that checks whether a paper belongs in the research ideation / scientific creativity CST corpus.

- Papers with verdict **IN_SCOPE** or **BORDERLINE** proceed to Step 4.
- Papers with verdict **OUT_OF_SCOPE** are discarded — log their titles and the KEY SIGNAL for the final report, but do not categorize or add them.

This step prevents irrelevant papers (e.g. entertainment design tools, general NLP papers, education apps) from polluting the database.

If the `literature-filter` skill is not available, apply manual scope judgment using the same criteria (research ideation, scientific creativity, CST for academic research).

---

## Step 4 — Categorize Each New Paper

For each paper that **passed the filter** in Step 3, invoke the **cst-categorizer** skill (use the Skill tool: `skill: "cst-categorizer"`). Follow its full instructions.

The categorizer now applies a **two-level framework** grounded in Jialingjia's §2.2 dissertation framework and Shneiderman (2020):

**Level 1 — Primary Paradigm** (apply first):
- **AI Automation** (emulation goal): The system runs the research pipeline autonomously; the researcher is a downstream consumer of machine-generated outputs. Includes expert systems (BACON, DENDRAL, KEKADA, EURISKO) and LLM-based agents (The AI Scientist, SciAgents, Agent Laboratory, AI Co-Scientist, etc.). Always Type 2.
- **Mixed-Initiative** (application goal, Horvitz 1999): The human remains the primary creative agent; the system augments without replacing. May be Type 1 or Type 2 depending on who generates the creative content.

**Level 2 — Sub-type for Mixed-Initiative tools**:
- **Preparatory Scaffolding** (§2.2.2.1): Tools supporting knowledge-building and sensemaking *before* active ideation (Information Foraging, Analysis & Sensemaking stages). Examples: CiteRead, CiteSee, PaperWeaver, Synergi, Relatedly.
- **Generative Support** (§2.2.2.2): Tools supporting question formulation, hypothesis generation, and study planning *during* active ideation (Problem Framing, Research Planning stages). Examples: CoQuest, Scideator, Perspectra, Cocoa.

Assign from the full schema:
- `tool_types` (Type 1 / Type 2 / Survey / Theory / Empirical Study)
- `bodens_types`, `wallas_stages`, `creative_thinking_types`
- A confidence score

**Important**: AI Automation tools (Type 2 systems that run the pipeline autonomously) receive empty `research_stages: []` — they replace rather than support the researcher's stage activity.

---

## Step 5 — Assign Research Ideation Stages

For Mixed-Initiative tool papers (both Type 1 and Type 2 that maintain active researcher engagement), invoke the **research-ideation-stages** skill (use the Skill tool: `skill: "research-ideation-stages"`). Assign `research_stages` tags from the four-stage framework.

**Two-cluster organizing principle** (updated March 2026):
- **Preparatory cluster**: Information Foraging + Analysis & Sensemaking — tools supporting the researcher before active ideation (Wallas preparation phase; §2.2.2.1).
- **Generative cluster**: Problem Framing + Research Planning — tools supporting the researcher during active ideation (Wallas illumination phase; §2.2.2.2).

Identify which cluster(s) a tool primarily serves before assigning specific stages. A tool may span clusters (e.g., SearchIdea spans preparatory and generative) — assign all applicable stages when genuinely multi-functional.

**Do not assign research_stages to full AI Automation tools** (The AI Scientist, SciAgents, Agent Laboratory, AI Co-Scientist, BACON, DENDRAL, etc.) — these systems replace the researcher's stage activity.

---

## Step 6 — Update data_filtered.js
Append **all** newly categorized papers to `src/data/data_filtered.js`. Follow the existing entry schema exactly. Do not modify existing entries.

This includes community-recommended papers from Step 2 that passed filtering — they must be added here regardless of whether they are already mentioned in the literature review prose.

---

## Step 7 — Update Literature Review

### 7a — Insert New Papers
For each new paper added to the database in Step 6, invoke the **literature-writing** skill (use the Skill tool: `skill: "literature-writing"`) to draft a prose insertion. Insert the new content into the appropriate section of `src/data/literature_review.md`. Make targeted paragraph-level insertions only — do not rewrite existing sections.

If a paper is already thoroughly discussed in the relevant section, a prose insertion may be minimal or skipped — but the paper was still correctly added to `data_filtered.js` in Step 6.

**Track what you change**: keep a running list of (paper title, citation key, section name) for every paper you successfully insert. You will need this for Step 9.

### 7b — Process Pending Instruction Prose Edits
After inserting new papers, check `pending_instructions.json` for entries where **`acted_on: false`** and a `section_id` is present. This includes **both** `actionable: true` entries (explicitly flagged by the collector script) **and** `actionable: false` entries that contain substantive researcher feedback.

**For `actionable: false` entries**, read the `comment` field and apply editorial judgment. Process the entry as actionable if the comment does any of the following:
- Identifies a factual inaccuracy in the prose (wrong claim about a paper's study design, sample size, findings, etc.)
- Corrects a description of what a tool does (e.g., clarifies what a term means in context of the paper)
- Raises a meaningful taxonomic challenge (e.g., argues a tool should be Type 2 not Type 1, with reasoning)
- Points out that the review overstates or misattributes a finding (e.g., "the study did not measure X")

Skip `actionable: false` entries that are purely speculative, opinion-only without a specific correction, or that you cannot verify against the existing prose.

**Important**: By the time you reach Step 7b, any papers in an entry's `extracted_urls` have already been processed through Steps 3–6. Step 7b is ONLY about the targeted prose change the contributor is requesting. Do not re-add papers to the database here.

For each entry you process:
1. Read the `comment` field to understand what prose change is requested.
2. Check whether the requested change is already fully present in the review at the specified location. If it is, note that and proceed to mark it acted_on — no edit is needed.
3. If a revision is needed, use the **literature-writing** skill (`skill: "literature-writing"`) to draft the appropriate addition or revision.
4. Locate the target location in `src/data/literature_review.md`:
   - Use `section_title` to find the right section heading.
   - Use `full_sentence` (and `selected_text`) as the anchor: insert new prose **immediately after** the sentence that contains `full_sentence`, unless the comment clearly indicates a different placement.
5. Make the edit — a targeted, minimal revision that honours the comment's intent without rewriting surrounding text.
6. Add to the running track list: `(instruction comment summary, contributor handle, section name)` for Step 9.

---

## Step 8 — Mark Comments as Acted On
For each community-recommended paper **or prose-edit instruction** that was successfully acted upon (paper added to DB, or prose verified/updated), update `pending_instructions.json` to set `acted_on: true` for those entries. Also update `contributor_credits.json` to set `acted_on: true` and fill in `credited_in` with the current month (e.g. "April 2026").

---

## Step 9 — Append Credits to Acknowledgements

**CRITICAL RULE**: `src/data/acknowledgements.md` has a fixed header section (above the HTML comment `<!-- Pipeline: append new monthly sections below this line. Do not edit above. -->`). This header is immutable — never modify or overwrite anything above the comment. Only append below it.

### 9a — Update acknowledgements.md
Append a new monthly section with **two types of entries** — Claude's own contributions first, then community contributors:

```markdown
### [Month Year]

- **Claude (Anthropic)** — Added N paper(s) to the review:
  - *[Paper Title]* ([Author et al. Year]) → §[Section Name]
  - *[Paper Title]* ([Author et al. Year]) → §[Section Name]
  *(Run date: [date])*

- **[Contributor Name]** (@[github_handle] if available) — Recommended *[Paper Title]* ([Author et al. Year]), now in §[Section Name] *([comment date])*
- **[Contributor Name]** (@[github_handle] if available) — Requested prose edit in §[Section Name]: "[short summary of comment]" *([comment date])*
```

**For Claude's entry**: list every paper added to `data_filtered.js` this run, with the exact section each change was placed in. If nothing was changed, write: `No new papers or edits this run.`

**For community entries**: include one bullet per contributor from `contributor_credits.json` where `acted_on` is now `true` and `credited_in` matches the current month. Use the "Recommended paper" format for entries that contributed a paper to the database, and the "Requested prose edit" format for entries that only requested a prose change without a new paper. If no community contributions this month, omit that section.

If nothing happened at all (no papers added, no community contributions), do not append any section.

### 9b — Update contributors.js
`src/data/contributors.js` is the structured JS mirror of `acknowledgements.md`, used by the Contributors panel UI. It must be updated in the same pipeline run as `acknowledgements.md`. Read the file first to understand its current state, then apply the following rules:

**File structure**: `contributors.js` exports a `contributors` array. Each entry has:
```js
{
  id: string,           // lowercase, no spaces (e.g. "jialingjia" from "@JialingJia")
  name: string,         // display name
  handle: string|null,  // "@handle" or null
  role: string,         // e.g. "Researcher" for community; "AI Pipeline · Anthropic" for Claude
  avatar: string,       // avatar URL
  profileUrl: string,   // profile URL
  isAI: boolean,
  contributions: [
    { month: "Month YYYY", items: [ "item string", ... ] },
    ...
  ]
}
```

**Item string format** (keep concise — abbreviated section names are fine):
- Claude adds paper: `"Added *[Paper Title]* ([Author et al. Year]) → §[Short Section Name]"`
- Community recommends paper: `"Recommended *[Paper Title]* ([Author et al. Year]) → §[Short Section Name]"`
- Community requests prose edit: `"Requested prose edit in §[Short Section Name]: \"[brief description]\""`

**Update logic**:

1. **Claude entry** (`id: "claude"`): Always exists. Find it and either:
   - If a `contributions` block for the current month already exists, push new items into its `items` array.
   - If no block for this month exists yet, append a new `{ month: "...", items: [...] }` object to the `contributions` array.

2. **Community contributor entries**: For each contributor credited this run (from `contributor_credits.json` where `acted_on: true` and `credited_in` matches current month):
   - **Existing contributor** (match by `handle` or `id`): Find their entry and add a new month block (or push to an existing one) just as with Claude.
   - **New contributor** (not yet in the array): Append a brand-new entry to the `contributors` array using metadata from `contributor_credits.json`:
     - `id`: lowercase version of `author_handle` with no `@` (e.g. `"jialingjia"`)
     - `name`: `author` field
     - `handle`: `"@" + author_handle`
     - `role`: `"Researcher"`
     - `avatar`: `author_avatar` URL
     - `profileUrl`: `author_profile_url`
     - `isAI`: false
     - `contributions`: one block for the current month

Do **not** modify any existing contribution entries — only append. Preserve all existing formatting and comments in the file.

---

## Step 10 — Final Report
Print a summary to the console:
- Number of community comments processed (separately: `actionable: true` and `actionable: false` substantive ones)
- Number of candidates found (before filtering), split by source (community-recommended vs. web search)
- Number of candidates filtered out (OUT_OF_SCOPE) and their titles + key signals
- Number of new papers added to data_filtered.js (and their titles)
- Prose edits applied from pending instructions (section name + contributor + whether comment was actionable: true or false)
- Sections of the literature review that were updated
- Contributors credited this month
- Any errors or skipped steps (e.g. Firebase unreachable, literature-filter skill missing)

---

## Key File Paths (relative to workspace)
- `src/data/data_filtered.js` — paper database (source of truth for what's in the corpus)
- `src/data/literature_review.md` — literature review prose (may reference papers not yet in the database)
- `src/data/acknowledgements.md` — acknowledgements (header is IMMUTABLE; append only below pipeline comment)
- `src/data/contributors.js` — structured JS mirror of acknowledgements.md for the Contributors panel UI
- `collect_comments.py` — Firestore comment collector
- `pending_instructions.json` — actionable community comments
- `contributor_credits.json` — contributor metadata for credits
- `firebase-service-account.json` — Firebase auth key (must exist for Step 1)