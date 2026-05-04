/**
 * contributors.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Static source of truth for the Contributors panel in LiteratureReview.
 * Mirrors acknowledgements.md with structured fields.
 *
 * To add a new contributor after a monthly pipeline run:
 *   1. Add a new entry to the `contributors` array (or push to an existing
 *      contributor's `contributions` array).
 *   2. Redeploy — no component changes needed.
 */

export const contributors = [
  // ── AI Pipeline ────────────────────────────────────────────────────────────
  {
    id: "claude",
    name: "Claude",
    handle: null,
    role: "AI Pipeline · Anthropic",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/58/Claude-ai-icon.svg",
    profileUrl: "https://claude.ai",
    isAI: true,
    contributions: [
      {
        month: "March 2026",
        items: [
          "Added *Deep Ideation* (Zhao et al. 2024) → §Computational Ideation at Scale",
          "Added *EvoScientist* (Lyu et al. 2026) → §Computational Ideation at Scale",
          "Added *Scientific Creativity* (Getzels & Csikszentmihalyi 1967) → §Theoretical Grounding",
          "Added *Agentic AI for Scientific Discovery: A Survey* (Gridach et al. 2025) → §Open Tensions",
          "Added *Large Language Models for Scientific Idea Generation: A Creativity-Centered Survey* (Shahhosseini et al. 2025) → §Theoretical Grounding",
          "Revised IdeaSynth prose in §Scaffolding Human Cognition: corrected facet description, acknowledged Type 1/2 boundary, corrected authorship claim",
          "Reclassified IdeaSynth as Type 1 + Type 2 (Hybrid); moved to §Hybrid Systems",
          "Framework update (2026-03-28): added 16 papers (f58–f73) covering expert systems (BACON, DENDRAL, KEKADA, EURISKO), LLM agents (SciAgents, The AI Scientist, Agent Laboratory, AutoDiscovery, Popper, LLM-SR), and preparatory scaffolding tools (CiteRead, CiteSee, ComLittee, Relatedly, Threddy, Passage)",
          "Recategorized SearchIdea (f46): added Analysis & Sensemaking stage per §2.2.2.1",
          "Recategorized AI Co-Scientist (f51): cleared research_stages (AI Automation paradigm)",
          "Rewrote literature_review.md in full: new structure aligned with AI Automation vs. Mixed-Initiative axis and preparatory/generative sub-distinction",
          "Updated cst-categorizer and research-ideation-stages skills with Shneiderman (2020) / Horvitz (1999) grounding",
        ],
      },
      {
        month: "April 2026",
        items: [
          "Added *Navigating Ideation Space* (Shen et al. 2026) → §Preparatory Scaffolding",
          "Added *AI tools expand scientists' impact but contract science's focus* (Hao et al. 2026) → §Open Tensions",
          "Added *ResearchBench* (Liu et al. 2025) → §Theoretical Grounding",
          "Added *AI Idea Bench 2025* (Qiu et al. 2025) → §Theoretical Grounding",
          "Added *HybridQuestion* (Zhao et al. 2026) → §LLM-Based Hypothesis Generation",
          "Added *Exploring the role of LLMs in the scientific method* (Zhang et al. 2025) → §Theoretical Grounding",
        ],
      },
      {
        month: "May 2026",
        items: [
          "Added *Spark: A System for Scientifically Creative Idea Generation* (Sanyal et al. 2025) → §LLM-Based Hypothesis Generation",
          "Added *The AI Scientist-v2: Workshop-Level Automated Scientific Discovery via Agentic Tree Search* (Lu et al. 2025) → §Full-Pipeline Autonomous Research Agents",
          "Added *From Toil to Thought: Designing for Strategic Exploration and Responsible AI in Systematic Literature Reviews* (Ye et al. 2026) → §Preparatory Scaffolding",
          "Added *Enhancing Research Idea Generation through Combinatorial Innovation and Multi-Agent Iterative Search Strategies* (Chen & Zhang 2026) → §LLM-Based Hypothesis Generation",
        ],
      },
    ],
  },

  // ── Community Contributors ──────────────────────────────────────────────────
  {
    id: "jialingjia",
    name: "Houji",
    handle: "@JialingJia",
    role: "Researcher",
    avatar: "https://avatars.githubusercontent.com/u/38600780?v=4",
    profileUrl: "https://github.com/JialingJia",
    isAI: false,
    contributions: [
      {
        month: "March 2026",
        items: [
          "Recommended *Scientific Creativity* (Getzels & Csikszentmihalyi 1967) → §Theoretical Grounding",
          "Requested prose edit in §Scaffolding Human Cognition: \"IdeaSynth Type 1/2 boundary — main intellectual outcomes may come from AI\"",
          "Requested prose edit in §Scaffolding Human Cognition: \"idea facets represent parts of the research plan, not evaluation criteria\"",
          "Requested prose edit in §Scaffolding Human Cognition: \"study does not evaluate authorship of co-created ideas\"",
          "Contributed Section 2.2 dissertation framework as organizing schema: AI Automation (emulation goal) vs. Mixed-Initiative (application goal) primary axis; Preparatory Scaffolding vs. Generative Support sub-distinction within mixed-initiative tools",
        ],
      },
    ],
  },
];
