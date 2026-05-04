# Acknowledgements & Contributors

This literature review evolves with input from the research community. The sections below
credit individuals who improved the review through comments left on the interactive website.
Contributions include paper recommendations, corrections, and section-level feedback —
all of which are reviewed and acted on during the monthly pipeline update.

---

## Pipeline & Infrastructure

Monthly updates to this review are run by **Claude (Anthropic)** — an AI assistant that
discovers new papers, applies the CST taxonomy, and integrates them into the review prose.
Each month's specific additions are documented in the sections below alongside community
contributions. Powered by [claude.ai](https://claude.ai).

---

<!-- Pipeline: append new monthly sections below this line. Do not edit above. -->

### March 2026

- **Claude (Anthropic)** — Added 3 papers to the review:
  - *Deep Ideation: Designing LLM Agents to Generate Novel Research Ideas on Scientific Concept Network* (Zhao et al. 2024) → §Computational Ideation at Scale: LLM-Based Hypothesis and Idea Generation
  - *EvoScientist: Towards Multi-Agent Evolving AI Scientists for End-to-End Scientific Discovery* (Lyu et al. 2026) → §Computational Ideation at Scale: LLM-Based Hypothesis and Idea Generation
  - *Scientific Creativity* (Getzels & Csikszentmihalyi 1967) → §Theoretical Grounding: Defining Scientific Creativity
  *(Run date: 2026-03-24)*

- **Houji** (@JialingJia) — Recommended *Scientific Creativity* (Getzels & Csikszentmihalyi 1967), now in §Theoretical Grounding: Defining Scientific Creativity *(2026-03-24)*

### March 2026 (Run: 2026-03-26)

- **Claude (Anthropic)** — Added 2 paper(s) to the review:
  - *Agentic AI for Scientific Discovery: A Survey of Progress, Challenges, and Future Directions* (Gridach et al. 2025) → §Open Tensions and the Design Frontier
  - *Large Language Models for Scientific Idea Generation: A Creativity-Centered Survey* (Shahhosseini et al. 2025) → §Theoretical Grounding: Defining Scientific Creativity
  *(Run date: 2026-03-26)*

### March 2026 (Revision: 2026-03-26)

- **Claude (Anthropic)** — Revised §Scaffolding Human Cognition: IdeaSynth prose updated in response to community feedback (corrected facet description, acknowledged Type 1/2 boundary, corrected authorship claim).
  *(Run date: 2026-03-26)*

- **Houji** (@JialingJia) — Requested prose edit in §Scaffolding Human Cognition: "IdeaSynth also belongs to the second type, as it directly generates research problems, synthesize literature." *(2026-03-25)*
- **Houji** (@JialingJia) — Requested prose edit in §Scaffolding Human Cognition: "More accurately, this idea facets only represent different parts of the idea, such as problem statement, research study, instead of criteria facet to evaluate the idea." *(2026-03-25)*
- **Houji** (@JialingJia) — Requested prose edit in §Scaffolding Human Cognition: "The study does not evaluate authorship of the co-created ideas." *(2026-03-25)*

### March 2026 (Revision 2: 2026-03-26)

- **Claude (Anthropic)** — Reclassified IdeaSynth as Type 1 + Type 2 (Hybrid); moved its discussion from §Scaffolding Human Cognition to §Hybrid Systems: Co-Creation Across the Human-AI Boundary. Updated `data_filtered.js` entry accordingly.
  *(Run date: 2026-03-26)*

### March 2026 (Framework Update: 2026-03-28)

- **Claude (Anthropic)** — Major framework update based on Jialingjia's Section 2.2 dissertation framework ("The Design Spectrum of Computational Research Ideation"):
  - Added 16 papers to the database (f58–f73): BACON, DENDRAL, KEKADA, EURISKO (expert systems era); SciAgents, The AI Scientist, Agent Laboratory, AutoDiscovery, Popper/Krenn et al., LLM-SR (LLM agent era); CiteRead, CiteSee, ComLittee, Relatedly, Threddy, Passage (preparatory scaffolding tools).
  - Recategorized SearchIdea (f46): added Analysis & Sensemaking stage and updated `core_contributions` to reflect its dual preparatory-generative role per §2.2.2.1–2.2.2.2.
  - Recategorized AI Co-Scientist (f51): cleared `research_stages` to reflect AI Automation paradigm (researcher as downstream consumer).
  - Rewrote `literature_review.md` in full to align with the AI Automation vs. Mixed-Initiative primary axis and the preparatory vs. generative sub-distinction within mixed-initiative tools.
  - Added revised `cst-categorizer/SKILL.md` and `research-ideation-stages/SKILL.md` to `CST_tool_review/skills/` reflecting the new framework, Shneiderman (2020) emulation/application goals, and Horvitz (1999) mixed-initiative origins.
  - Updated `cst-monthly-pipeline/SKILL.md` to reference the new dual-paradigm structure in categorization steps.
  *(Run date: 2026-03-28)*

- **Houji** (@JialingJia) — Contributed Section 2.2 dissertation framework ("The Design Spectrum of Computational Research Ideation") as the organizing schema for the review. Framework distinguishes AI Automation (emulation goal, Shneiderman 2020) from Mixed-Initiative tools (application goal, Horvitz 1999), and within the latter distinguishes Preparatory Scaffolding from Generative Support. *(2026-03-28)*

### April 2026

- **Claude (Anthropic)** — Added 6 paper(s) to the review:
  - *Navigating Ideation Space: Decomposed Conceptual Representations for Positioning Scientific Ideas* (Shen et al. 2026) → §Preparatory Scaffolding: Building the Knowledge Foundation
  - *Artificial intelligence tools expand scientists' impact but contract science's focus* (Hao et al. 2026) → §Open Tensions and the Design Frontier
  - *ResearchBench: Benchmarking LLMs in Scientific Discovery via Inspiration-Based Task Decomposition* (Liu et al. 2025) → §Theoretical Grounding: Defining Scientific Creativity
  - *AI Idea Bench 2025: AI Research Idea Generation Benchmark* (Qiu et al. 2025) → §Theoretical Grounding: Defining Scientific Creativity
  - *HybridQuestion: Human-AI Collaboration for Identifying High-Impact Research Questions* (Zhao et al. 2026) → §Computational Ideation at Scale: LLM-Based Hypothesis and Idea Generation
  - *Exploring the role of large language models in the scientific method: from hypothesis to discovery* (Zhang et al. 2025) → §Theoretical Grounding: Defining Scientific Creativity
  *(Run date: 2026-04-02)*

### May 2026

- **Claude (Anthropic)** — Added 4 paper(s) to the review:
  - *Spark: A System for Scientifically Creative Idea Generation* (Sanyal et al. 2025) → §LLM-Based Hypothesis Generation
  - *The AI Scientist-v2: Workshop-Level Automated Scientific Discovery via Agentic Tree Search* (Lu et al. 2025) → §Full-Pipeline Autonomous Research Agents
  - *From Toil to Thought: Designing for Strategic Exploration and Responsible AI in Systematic Literature Reviews* (Ye et al. 2026) → §Preparatory Scaffolding: Building the Knowledge Foundation
  - *Enhancing Research Idea Generation through Combinatorial Innovation and Multi-Agent Iterative Search Strategies* (Chen & Zhang 2026) → §LLM-Based Hypothesis Generation
  *(Run date: 2026-05-01)*
