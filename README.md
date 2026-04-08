# Computational Support for Research Ideation — Interactive Literature Review

An interactive dashboard for exploring the growing body of research on **Computational Support for Research Ideation**. Papers are organized across two primary design paradigms — **AI Automation** (emulation goal) and **Mixed-Initiative tools** (application goal) — and further categorized by research ideation stage and underlying cognitive-creativity frameworks ([Guilford](https://en.wikipedia.org/wiki/JP_Guilford), [Wallas](https://en.wikipedia.org/wiki/Graham_Wallas), [Boden](https://en.wikipedia.org/wiki/Margaret_Boden)).

🔗 **Live dashboard:** [https://jialingjia.github.io/Computational-Research-Ideations-AI-Lit-Review/](https://jialingjia.github.io/Computational-Research-Ideations-AI-Lit-Review/)

> Dashboard UI and interactive filtering experience co-designed and developed by **Antigravity (Google DeepMind AI)**.

---

## What's Inside

The dashboard has three panels:

- **Paper Database** — filterable table of 81 categorized papers (updated monthly), searchable by tool type, research stage, creativity framework, and keyword.
- **Literature Review** — a structured prose review of the field, updated monthly with new papers. Citations in the prose render as interactive chips: hover any **Author Year** tag to see the paper's title, authors, venue, and type. Readers can also highlight any sentence and leave a comment directly on the page.
- **Contributors** — credits for community members and the AI pipeline that keep the review current.

---

## Taxonomy

### Tool Types

| Tag | Design paradigm | Role of researcher |
|---|---|---|
| **Type 1** | Mixed-Initiative (application goal) | Researcher as primary creative agent — tool provides preparatory scaffolding or generative support without taking over the generative act. |
| **Type 2** | AI Automation (emulation goal) | System autonomously conducts literature review, hypothesis generation, and planning; researcher evaluates finished outputs. |
| **Type 1 + Type 2** | Hybrid | Both human and system make substantive intellectual contributions — agency is distributed across the pipeline. |
| **Survey / Theory** | Synthesis or framework paper | No tool artifact; primary contribution is a review, taxonomy, or conceptual model. |
| **Empirical Study** | Data collection | Primary contribution is findings about human creative behavior or tool effects. |

### Research Ideation Stages (Type 1 & Hybrid tools)

| Stage | What it covers |
|---|---|
| **Information Foraging** | Literature search, knowledge discovery, paper recommendation and synthesis |
| **Problem Framing** | Identifying gaps, defining questions, mapping the scope of an inquiry |
| **Analysis & Sensemaking** | Interpreting data, coding, affinity mapping, pattern finding |
| **Research Planning** | Methodology design, protocol structuring, workflow organization |

### Creativity Frameworks

Papers are also tagged by the cognitive/computational creativity models they engage:

- **Wallas stages** — Preparation, Incubation, Illumination, Verification
- **Boden types** (for Type 2 tools) — Combinational, Exploratory, Transformational
- **Thinking types** — Divergent, Convergent

---

## Contributing

### Leaving a Comment on the Live Site

The easiest way to contribute. On the [live dashboard](https://jialingjia.github.io/Computational-Research-Ideations-AI-Lit-Review/):

1. Navigate to the **Literature Review** tab.
2. Highlight any sentence you want to comment on.
3. A comment box will appear — type your feedback and submit (GitHub login required).

Comments can:
- **Recommend a paper** for inclusion (paste the URL in your comment).
- **Correct a factual claim** about a paper's study design, findings, or contribution.
- **Challenge a classification** (e.g., "this tool should be Type 2 because…").
- **Flag an overstatement** (e.g., "the study didn't actually measure authorship").

The monthly pipeline reviews all comments and acts on substantive ones automatically.

### Adding Papers Directly or Co-writing

To add a paper manually, append an entry to `src/data/data_filtered.js` following the existing schema:

```js
{
  id: "fN",                          // next sequential ID
  title: "...",
  authors: ["Last, F.", "Last, F."],
  year: 2025,
  venue: "Conference or journal name",
  url: "https://doi.org/...",
  core_contributions: "One-paragraph summary of what the paper contributes and why it matters for this corpus.",
  tool_types: ["Type 1"],            // Type 1 | Type 2 | Type 1 + Type 2 | Survey / Theory | Empirical Study
  research_stages: ["Problem Framing"],  // for Type 1 and Hybrid tools only; else []
  creative_thinking_types: ["Divergent"],
  wallas_stages: ["Preparation", "Illumination"],
  bodens_types: ["Exploratory"]      // for Type 2 and Hybrid tools only; else []
}
```

Then add a corresponding prose paragraph to `src/data/literature_review.md` in the appropriate section.

---

## Monthly Pipeline

This repository is kept current by an automated monthly pipeline (runs on the 1st of each month) powered by **Claude (Anthropic)**. Each run:

1. **Collects community comments** from Firestore (submitted via the live site's highlight layer).
2. **Searches for new papers** — recent publications from CHI, UIST, CSCW, CHIIR, arXiv cs.HC, and cs.AI.
3. **Filters for scope** — only papers on research ideation, scientific creativity, or CSTs for academic research are admitted.
4. **Categorizes each new paper** using the CST taxonomy above.
5. **Updates the literature review** — inserts new prose and applies substantive community corrections.
6. **Appends credits** to `acknowledgements.md` and `contributors.js`.

Pipeline configuration lives in `/Users/houjiangliu/Documents/Claude/Scheduled/cst-monthly-pipeline/SKILL.md`.

---

## Project Structure

```
CST_tool_review/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Paper database table (AG Grid)
│   │   ├── LiteratureReview.jsx   # Prose review with highlight layer
│   │   ├── HighlightLayer.jsx     # Comment submission UI (Firestore)
│   │   └── ContributorsPanel.jsx  # Contributors display
│   ├── data/
│   │   ├── data_filtered.js       # ★ Paper database — source of truth
│   │   ├── literature_review.md   # ★ Prose review — updated by pipeline
│   │   ├── acknowledgements.md    # Monthly credit log (append-only below pipeline comment)
│   │   └── contributors.js        # Structured mirror of acknowledgements for UI
│   └── firebase.js                # Firestore config (highlight layer)
├── collect_comments.py            # Fetches pending comments from Firestore
├── init_processed_flag.py         # One-time script: marks existing Firestore docs as processed
├── pending_instructions.json      # Comments awaiting pipeline action
├── contributor_credits.json       # Contributor metadata for credit generation
└── firebase-service-account.json  # Service account key (not committed)
```

> **★ Key rule**: `data_filtered.js` is the source of truth for what's in the corpus. A paper being cited in the prose of `literature_review.md` does **not** mean it's in the database — always check the data file directly.
>
> **★ Citation rendering**: A small number of entries in `data_filtered.js` are foundational theoretical references (e.g. Horvitz 1999, Shneiderman 2020) that are **not research tools** and will not appear in the Paper Grid's tag filters. They are included solely to power the interactive citation chips in the Literature Review prose. These entries have empty `research_stages`, `wallas_stages`, and `bodens_types` arrays and carry only the `Survey / Theory` type tag.

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run deploy    # build + push to gh-pages branch
```

Requires Node 18+. The highlight/comment layer requires a Firebase project and a valid `firebase-service-account.json` for the collector script.

---

## License

This project uses two licenses, one for code and one for content:

| What | License |
|---|---|
| App source code (`src/components/`, `src/App.jsx`, `src/context/`, `src/main.jsx`, scripts) | [MIT](LICENSE) |
| Review content (`src/data/literature_review.md`, `src/data/data_filtered.js`, `src/data/acknowledgements.md`) | [CC BY 4.0](LICENSE-CC-BY-4.0) |

If you use or adapt the review content, please cite it as:

> Liu, H. (2026). *Computational Support for Research Ideation: An Interactive Literature Review*. https://jialingjia.github.io/Computational-Research-Ideations-AI-Lit-Review/

---

## Acknowledgements

See [src/data/acknowledgements.md](src/data/acknowledgements.md) for a full log of monthly pipeline runs and community contributions.
