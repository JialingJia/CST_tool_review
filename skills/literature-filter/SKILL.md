---
name: literature-filter
description: >
  Fast scope-gating skill for the CST monthly pipeline. Given a candidate paper (title, abstract,
  venue, or URL), determine whether it belongs in the research ideation / scientific creativity
  CST corpus. Returns one of three verdicts: IN_SCOPE, BORDERLINE, or OUT_OF_SCOPE, with a brief
  key signal. Use this before categorizing any paper in the monthly pipeline — it is Step 3 of the
  cst-monthly-pipeline skill. Also invoke when the user asks "does this paper belong in the
  database?", "should I add this paper?", or "is this in scope for the review?"
---

# Literature Filter: Scope Gating for the CST Corpus

This skill performs a fast, binary gating step: it checks whether a candidate paper belongs in
the **research ideation / scientific creativity support tools** corpus before any categorization
work is done. Its purpose is to keep the database focused and prevent scope creep.

Apply this skill to every candidate paper in Step 3 of the `cst-monthly-pipeline` before moving
to the `cst-categorizer`.

---

## What the Corpus Covers

The CST corpus captures papers that bear directly on **how researchers generate, develop, and
refine novel research ideas** — whether by building tools that support this process, studying
how it happens empirically, or theorizing about creativity and ideation in research contexts.

### Definitively IN_SCOPE

A paper is in scope if it primarily contributes one or more of the following:

**Tool systems for research ideation:**
- AI or computational tools that support literature discovery, synthesis, or sensemaking in
  research contexts (information foraging, analysis & sensemaking)
- AI or computational tools for generating, exploring, or evaluating research hypotheses,
  questions, or ideas (problem framing, research planning)
- Autonomous AI agents that perform scientific discovery tasks (hypothesis generation,
  experiment design, paper writing) — even if fully automated
- Tools that scaffold experimental design, study planning, or research workflow for academic
  researchers

**Scientific creativity and ideation research:**
- Empirical studies of how researchers ideate, seek information, capture ideas, or develop
  research questions — even without a novel tool
- Theoretical frameworks for scientific creativity, creative cognition, or the philosophy of
  scientific discovery
- Surveys and taxonomies of AI-assisted research tools or scientific creativity support systems
- Benchmarks and evaluation frameworks for research idea quality, novelty, or scientific
  creativity

**Computational creativity with scientific application:**
- Computational creativity systems (symbolic AI, LLMs) applied to scientific hypothesis
  generation or equation discovery — including historical expert systems (BACON, DENDRAL, etc.)

---

### OUT_OF_SCOPE

A paper is out of scope if its primary focus is any of the following:

| Category | Examples |
|---|---|
| **General NLP / LLM capabilities** | Language model benchmarks, RLHF, instruction following — unless specifically applied to research ideation |
| **Entertainment or artistic creativity** | Game design tools, music generation, visual art AI — not targeted at academic researchers |
| **Education / student support** | Tools for teaching, tutoring, homework assistance, student writing |
| **Code generation / software engineering** | Programming assistants, bug detection, software design tools |
| **Clinical or medical AI** | Medical diagnosis, clinical decision support — unless hypothesis generation for scientific research is the explicit focus |
| **General information retrieval** | Web search engines, generic Q&A systems — unless specifically designed for academic literature discovery |
| **Creativity in non-research domains** | Organizational innovation, design thinking for products/services — without a research ideation component |
| **Data analysis without ideation** | Statistical methods, data visualization tools — unless they scaffold research hypothesis formation |

---

### BORDERLINE

Mark a paper BORDERLINE when it is genuinely ambiguous — it could serve research ideation even
if that is not its exclusive or primary focus. Borderline papers proceed to the `cst-categorizer`
for full categorization but should be flagged so a human can review the inclusion decision.

Common BORDERLINE situations:
- A general writing assistant evaluated partly in an academic writing context
- A literature summarization tool that is not specifically designed for researchers but is
  commonly used by them
- A computational creativity system for a non-research domain that has a clear technical
  transfer pathway to research ideation
- An empirical study of creativity in professional contexts (design, journalism) that informs
  research ideation by analogy

When in doubt between IN_SCOPE and BORDERLINE, choose BORDERLINE. When in doubt between
BORDERLINE and OUT_OF_SCOPE, choose BORDERLINE. Only choose OUT_OF_SCOPE when you are
confident the paper has no meaningful connection to research ideation or scientific creativity.

---

## How to Apply the Filter

**Step 1 — Identify the primary contribution.**
Ask: What is the main thing this paper contributes — a tool, an empirical finding, a framework,
or a benchmark? Is that contribution aimed at academic researchers or scientific discovery?

**Step 2 — Check the target user.**
Is the tool or study targeting academic researchers, scientists, or people engaged in knowledge
work that produces new research? If the primary user is a student, artist, consumer, or
professional in a non-research domain, lean toward OUT_OF_SCOPE unless the transfer to research
is explicit.

**Step 3 — Check the domain of creativity.**
Is the creativity being supported *scientific creativity* — generating novel ideas, hypotheses,
or research directions — or is it a different domain (artistic, commercial, educational)?
Scientific creativity → likely IN_SCOPE. Non-scientific creativity without a research ideation
angle → likely OUT_OF_SCOPE.

**Step 4 — Check for evaluation of research ideation.**
Even if no tool is built, does the paper measure, study, or theorize about how researchers
generate ideas? If yes → IN_SCOPE.

---

## Output Format

Produce a structured one-shot judgment:

**Paper**: [Title — Authors — Venue/Year]

**Verdict**: IN_SCOPE / BORDERLINE / OUT_OF_SCOPE

**Key Signal**: One sentence explaining the primary evidence for the verdict. Focus on the
paper's stated contribution and target users — not speculation about potential uses.

**Note** *(optional, BORDERLINE only)*: One sentence flagging the specific ambiguity a human
reviewer should adjudicate.

---

## Quick Reference Examples

| Paper | Verdict | Key Signal |
|---|---|---|
| *CiteRead: Integrating Localized Citation Contexts into Scientific Paper Reading* | IN_SCOPE | Scaffolds information foraging for academic researchers reading scientific literature |
| *The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery* | IN_SCOPE | Autonomous agent for end-to-end scientific hypothesis generation and paper writing |
| *Scideator: Human-LLM Scientific Idea Generation* | IN_SCOPE | Tool explicitly designed to help academic researchers generate cross-domain research ideas |
| *BACON: Discovering Scientific Laws via Computer Programs* | IN_SCOPE | Automated scientific law discovery — foundational AI Automation paradigm for research |
| *GPT-4 Technical Report* | OUT_OF_SCOPE | General LLM capability evaluation; no research ideation application |
| *Duolingo: AI-Assisted Language Learning* | OUT_OF_SCOPE | Educational tool targeting language learners, not scientific researchers |
| *GitHub Copilot for Code Generation* | OUT_OF_SCOPE | Programming assistant; no research ideation component |
| *DALL-E: Hierarchical Text-to-Image Generation* | OUT_OF_SCOPE | Artistic image generation; not targeted at academic research ideation |
| *Semantic Scholar Open Research Corpus* | BORDERLINE | General academic search infrastructure — commonly used by researchers but not specifically designed for research ideation scaffolding |
| *Elicit: AI Research Assistant* | IN_SCOPE | AI tool specifically designed to help researchers find, summarize, and synthesize academic literature |
