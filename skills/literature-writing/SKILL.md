---
name: literature-writing
description: >
  Write Literature Review or Survey paper sections in structured academic prose. Use this skill
  whenever the user wants to write, draft, or improve a literature review, related work section,
  background section, or survey paper — whether they provide a list of papers, an abstract/title
  set, or just a description of their research area. Also trigger when the user says things like
  "help me write my related work", "synthesize these papers for my lit review", "draft a survey
  section on X", "I need to write a background section covering these papers", or when they share
  a collection of references and ask Claude to turn them into flowing academic writing. Do not wait
  for the user to say "literature review" explicitly — if they're asking to write academic prose
  that synthesizes prior work, use this skill.
---

# Literature Writing Skill

This skill helps you write high-quality Literature Review and Survey sections — the kind of
academic prose that synthesizes prior work into a coherent narrative, not a list of summaries.

---

## What Makes a Good Literature Review

The goal of a literature review is not to summarize each paper in turn. It is to *construct an
argument* about what the field has done, what it has left unresolved, and why the current work is
needed. The reader should finish your lit review understanding the intellectual landscape — not
just who wrote what.

Three principles to hold throughout:

1. **Synthesize, don't summarize.** Group papers by what they have in common (shared claim,
   shared method, shared limitation) and write about the group. A sentence like "Several
   studies have shown that X [A, B, C]" is stronger than three separate sentences each
   summarizing A, B, and C.

2. **Build toward your contribution.** A lit review has a direction: it should end at a gap,
   tension, or open question that your paper addresses. Let that endpoint guide which papers
   you include and how you frame them.

3. **Write in prose, not bullets.** Academic readers expect flowing paragraphs with explicit
   connective logic — transitions like "however," "building on this," "in contrast," "notably."
   Each paragraph should have a topic sentence, supporting claims with citations, and a closing
   sentence that connects to what comes next.

---

## Handling Inputs

Users will give you one of three types of input:

**A list of papers** (titles, abstracts, authors, venues, years — in any combination):
Read carefully. Extract the key claim or contribution of each paper. Then step back and ask:
what are the recurring themes, methods, or debates across this set? Use those themes to
organize the review.

**A free-form description of the research area**:
Draw on your knowledge of the field to identify the major threads of prior work relevant to
the user's topic. Name specific papers where you know them; acknowledge where you are uncertain
about specific citations. Ask the user to fill gaps before finalizing if precision matters.

**A mix** (some papers + some context):
Anchor your review in the papers they've provided, and supplement with your knowledge of the
broader landscape where useful. Flag when you are adding papers the user didn't mention.

---

## How to Structure the Review

### Step 1: Identify themes

Before writing a single sentence of prose, identify 3–6 organizing themes across the literature.
Themes can be:
- **Methodological**: "Machine learning approaches" vs. "rule-based approaches"
- **Conceptual**: "User-centered design" vs. "system-centered design"
- **Temporal/evolutionary**: Early work → critique → modern response
- **By target problem**: Studies of X vs. studies of Y
- **By finding**: Papers showing effect A vs. papers showing the opposite

**Do not use "Paper A did X, Paper B did Y" as an organizing principle.** This is the most
common mistake and produces unreadable lit reviews.

### Step 2: Determine the arc

The best lit reviews have a narrative shape. Common arcs:

- **Convergence arc**: Multiple lines of work converge on a common insight or consensus.
  Use when the field has reached substantial agreement.
- **Tension arc**: Two traditions pull in different directions; the gap motivates new work.
  Use when your paper's contribution resolves a debate.
- **Progress arc**: Each generation of work addresses limitations of the last.
  Use for technical fields where methods have evolved significantly.
- **Landscape arc**: The review maps a diverse space of approaches without a single resolution.
  Use for survey papers with no single thesis.

Choose the arc that best fits what the user is writing. If unsure, ask.

### Step 3: Write section by section

Structure the lit review as a set of thematic subsections (with or without headings, depending
on the paper's conventions). A typical section runs 2–4 paragraphs.

**Within each section:**
- Open with a topic sentence that names the theme and its significance
- Present 2–4 representative works per paragraph; synthesize rather than list
- Use explicit comparisons: "Unlike A, B takes a different approach because..."
- Close with a transition sentence that connects to the next theme or builds toward the gap

**The closing section** should name the gap, tension, or open question that the user's paper
addresses. This gives the whole review its purpose.

---

## Prose Style

### Citation placement
Put citations at the end of the claim they support — not after the author's name.
- Preferred: "Prior work shows that X is effective for Y [Smith 2021, Jones 2022]."
- Avoid: "Smith [2021] showed X. Jones [2022] also showed X."

### Verb tense
Use simple present tense for claims that remain true: "These tools *demonstrate* that..."
Use past tense for specific findings that were bounded to a study: "They *found* that..."

### Hedging and precision
- Use hedges when the evidence is mixed or limited: "suggests," "indicates," "has been shown to"
- Reserve strong claims ("proves," "establishes") for foundational or heavily replicated findings
- Attribute contested claims to their sources rather than asserting them as fact

### Transitions between paragraphs
Each paragraph should begin with a sentence that situates it relative to what came before.
Use substantive connectors, not empty ones:
- **Contrast**: "In contrast to tool-centered approaches, a line of work focused on the user..."
- **Extension**: "Building on this foundation, more recent work has..."
- **Pivot to gap**: "Despite this progress, a key question remains unaddressed:..."

---

## Output Format

Produce the literature review as flowing academic prose — paragraphs, no bullet points. Include
placeholder citations in the format [Author Year] or [1] depending on the conventions the user
specifies (default to [Author Year] if not specified).

Structure your output as:

1. **Opening paragraph** — Frame the area and explain what the review covers
2. **Thematic sections** (2–5 sections, each 2–4 paragraphs) — each organized around one theme
3. **Closing paragraph** — Name the gap, tension, or open question motivating the current work

If the user is writing a full survey paper rather than a lit review section, expand each
thematic section to a full subsection with a heading. Use the same principles but at greater
depth.

---

## Asking for Clarification

If key information is missing, ask before writing:
- **What is the user's own paper about?** (This shapes which gap to highlight at the close)
- **How long should the review be?** (Default: 600–1000 words for a paper section; longer for
  a survey)
- **What citation format?** (Default: [Author Year])
- **Are there papers that must be included?** (Ensure key works don't get dropped)

Don't ask all four at once — pick the most critical missing piece and ask that one.
If the user has given enough context to make reasonable assumptions, proceed and note your
assumptions at the end so the user can correct them.
