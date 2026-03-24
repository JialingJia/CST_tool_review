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
        ],
      },
      {
        month: "April 2026",
        items: [
          "Added *EvoScientist* (Lyu et al. 2026) → §Computational Ideation at Scale",
          "Added *Scientific Creativity* (Getzels & Csikszentmihalyi 1967) → §Theoretical Grounding",
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
        month: "April 2026",
        items: [
          "Recommended *Scientific Creativity* (Getzels & Csikszentmihalyi 1967) → §Theoretical Grounding",
        ],
      },
    ],
  },
];
