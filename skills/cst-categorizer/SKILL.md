---
name: cst-categorizer
description: >
  Categorize and analyze research papers about Research Ideation Tools using a
  four-type taxonomy based on design philosophy. Use this skill whenever the user wants to
  classify, analyze, review, or discuss CST papers — including when they mention "creativity
  support tools", "creative AI tools", "ideation tools", "design tools", or ask about how a
  tool "supports creativity". Also trigger when the user shares an abstract, title, or
  description of a research paper and wants help situating it in the CST literature, or when
  they want to categorize papers into a data file. Do not wait for the user to explicitly say
  "categorize" — if they're discussing a tool's design philosophy in terms of human vs. system
  agency, or asking which research stage a tool supports, use this skill.
---

# Categorization Framework

This skill helps you analyze research papers about Research Ideation Tools and assign them to one of four categories. The core analytical question for tool papers is: **Who is the primary generator of creative ideas — the human or the system?** For non-tool papers, the question is whether the paper contributes a survey/theoretical framework or empirical findings from a study.

---

## Primary Design Paradigm Axis

Before assigning a category, identify which of two historically distinct design paradigms the tool embodies. Shneiderman (2020) traced two competing AI design goals that organize the full spectrum of computational research ideation tools:

- **The Emulation Goal** — Build autonomous systems that replicate or surpass human intelligence. The system is the agent; the human is a downstream consumer of its outputs. This goal motivates **AI Automation** tools.
- **The Application Goal** — Build tools that amplify and augment human capabilities without replacing them. The human remains the primary agent; the system extends what they can do. This goal motivates **Mixed-Initiative** tools (Horvitz, 1999).

Identify the paradigm first; it constrains which category and subcategory apply.

### AI Automation Tools

The researcher's primary role is to define the problem space and evaluate outputs as a **downstream consumer**. The system autonomously executes literature review, hypothesis generation, experimental design, and often simulation or analysis. The generative chain runs almost entirely within the machine.

**Two historical eras:**

| Era | Mechanism | Representative Works |
|---|---|---|
| **Expert Systems** (pre-LLM) | Symbolic rule-based reasoning, domain-encoded knowledge | BACON, DENDRAL, KEKADA, EURISKO |
| **LLM-Based Agents** (modern) | Large language models with multi-agent orchestration, tool use, and iterative refinement | SciAgents, The AI Scientist, Agent Laboratory, AI Co-Scientist, AutoDiscovery, Popper, LLM-SR |

AI Automation tools are **always Type 2** in the category taxonomy, because the system is the primary creative contributor and the human evaluates or consumes outputs.

### Mixed-Initiative Tools

The researcher remains the primary creative agent throughout. The tool augments, restructures, or stimulates the human's own thinking without taking over the generative act. Mixed-initiative design is characterized by shared control and ongoing human-in-the-loop engagement (Horvitz, 1999).

Within mixed-initiative tools, there is a second-order distinction by **function in the research workflow** (§2.2.2 of Jialingjia's dissertation framework):

| Sub-paradigm | Research Workflow Position | Corresponding Stages |
|---|---|---|
| **Preparatory Scaffolding** (§2.2.2.1) | Earlier: building knowledge and making sense of the landscape | Information Foraging, Analysis & Sensemaking |
| **Generative Support** (§2.2.2.2) | Later: actively generating and refining research ideas | Problem Framing, Research Planning |

Mixed-initiative tools may be **Type 1 or Type 2** depending on who generates the creative content. Even generative support tools can be Type 1 if the human drives idea generation with computational assistance, or Type 2 if the system produces the ideas for the human to evaluate. Use the agency test below to distinguish.

---

## The Four-Category Framework

### Type 1: Scaffolding Human Cognitive Processes

**Design Philosophy**: The human remains the primary idea generator. The tool restructures, prompts, or augments the user's own thinking — it does not produce ideas on their behalf. Human agency is exercised in *production*, not just evaluation. The system acts as a cognitive scaffold: it can organize, surface constraints, offer prompts, or structure a workspace, but the generative act stays with the human.

**Key signal**: If you removed the AI/computational component, the human would still generate the same *type* of ideas — perhaps more slowly or less systematically, but the ideas originate from the human's own cognition.

**Always Mixed-Initiative. Assign to the appropriate sub-paradigm and research stage(s):**

#### Preparatory Scaffolding (§2.2.2.1) — Type 1 sub-type
Tools supporting the researcher *before* active idea generation — during the knowledge-building and sensemaking phases. They correspond to Wallas's preparation stage and Mumford's early cognitive processes (problem construction, information encoding).

| Stage | What it looks like in CSTs |
|---|---|
| **Information Foraging** | Tools supporting literature search, knowledge discovery, and synthesis — where the human decides what's relevant. Citation graph explorers, paper recommendation systems with human-driven navigation, synthesis scaffolds where the researcher determines meaning. Examples: Citeread, Citesee, ComLittee, PaperWeaver, Relatedly, Threddy, Passage |
| **Analysis & Sensemaking** | Tools helping researchers interpret data and identify patterns they themselves perceive. Visualization scaffolds, affinity diagramming tools, mixed-initiative synthesis systems where the researcher drives meaning-making. Examples: Synergi, search tools with cluster/topic views |

#### Generative Support (§2.2.2.2) — Type 1 sub-type
Tools supporting the researcher *during* active ideation — when they are formulating questions, generating hypotheses, or planning how to investigate. They correspond to Wallas's illumination stage. Type 1 applies when the human drives the generative act with system support.

| Stage | What it looks like in CSTs |
|---|---|
| **Problem Framing** | Tools that help researchers identify gaps, define questions, map the scope of an inquiry, or challenge assumptions. Question-generation prompts, constraint surfacing, analogical reframers where the user drives the process. Examples: CoQuest (research question co-creation), SearchIdea (gap identification features) |
| **Research Planning** | Tools that scaffold methodology planning, experimental design, or protocol structuring — helping researchers plan *how* to investigate without choosing their approach for them. Examples: Cocoa (co-planning with AI agents where the researcher sets the agenda) |

---

### Type 2: Computational Creativity with Human as Evaluator

**Design Philosophy**: The system generates the ideas; the human's primary role is selection, filtering, evaluation, and analogical transfer. Human agency is exercised in *curation and adaptation*, not production. The computational component is doing real creative work — not just structuring a space for the human to fill.

**Key signal**: If you removed the AI/computational component, the human would have substantially fewer or qualitatively different ideas to work with. The system is a genuine creative contributor.

**Includes both AI Automation tools (always Type 2) and Mixed-Initiative generative tools where the system is the primary generator.**

**Classify by Boden's three types of computational creativity:**

| Boden Type | Core Mechanism | What it looks like in CSTs |
|---|---|---|
| **Combinational** | Novel juxtaposition of previously unconnected concepts — surprising but comprehensible associations | Tools that blend distant domains, suggest unexpected analogies, generate combinations the researcher would be unlikely to produce alone. Examples: Scideator, Perspectra, PersonaFlow |
| **Exploratory** | Systematic traversal of a defined conceptual space — finding what's possible within a given structure | Tools that exhaustively or intelligently explore a design/solution space and surface overlooked possibilities. Expert systems and LLM agents that traverse hypothesis spaces. Examples: BACON, DENDRAL, IRIS, SciMON, Chain-of-Ideas, The AI Scientist, SciAgents |
| **Transformational** | Changing the conceptual space itself by relaxing, adding, or inverting fundamental constraints | Systems that propose counter-paradigm hypotheses or generate fundamentally different ways of defining a problem. (Rare — only use this if the system genuinely redefines the space.) |

---

### Survey / Theory

Papers that synthesize existing knowledge, propose theoretical frameworks, develop taxonomies, or critically analyze a domain — without deploying or evaluating a specific tool.

**Includes:**
- Literature surveys and systematic reviews
- Conceptual or philosophical frameworks (e.g., Shneiderman 2020 on emulation vs. application goal; Horvitz 1999 on mixed-initiative interaction)
- Benchmark and evaluation methodology papers
- Critical analyses of existing approaches
- Taxonomies and design space analyses

**Key signal**: The primary contribution is a framework, argument, or synthesis — not a working system or empirical data collection.

---

### Empirical Study

Papers that collect data from real users or observational contexts to understand how people use tools, how creativity unfolds in practice, or how AI affects human creative behavior — without contributing a novel tool design.

**Includes:**
- User studies and field studies of existing practices
- Controlled experiments measuring creativity outcomes
- Qualitative studies (interviews, diary studies, think-alouds)
- Mixed-methods investigations of tool adoption or creative behavior

**Key signal**: The primary contribution is findings about human behavior or tool effects — the methodology is data collection, not system design.

---

## How to Categorize a Paper

Work through these questions in order:

1. **Is this a tool paper?** Does the paper contribute a deployed or evaluated system? If not, go to step 6.

2. **Apply the paradigm test.** Is this an **AI Automation** tool (system executes the research pipeline autonomously; researcher is downstream consumer) or a **Mixed-Initiative** tool (human remains primary agent; system augments)? AI Automation → proceed to step 5 with Type 2 already determined. Mixed-Initiative → continue.

3. **Apply the agency test for Mixed-Initiative tools.** Ask: *Who generates the creative content?* If the human generates and the system supports → **Type 1**. If the system generates and the human evaluates/selects → **Type 2**.

4. **Watch for hybrid designs.** Some tools shift agency depending on mode of use. When this happens:
   - Identify the *primary* interaction pattern the paper studies
   - Note the hybrid nature explicitly
   - Classify based on the dominant design intent as articulated by the paper's authors

5. **Assign subcategory:**
   - **Type 1**: Which sub-paradigm — Preparatory Scaffolding or Generative Support? Which research ideation stage(s) — Information Foraging, Problem Framing, Analysis & Sensemaking, or Research Planning? Assign the most prominent stage(s).
   - **Type 2**: Which Boden type — Combinational, Exploratory, or Transformational?

6. **Non-tool papers:** Does the paper primarily contribute a framework, survey, or critique → **Survey / Theory**. Does it primarily contribute empirical findings from studying people → **Empirical Study**.

---

## Output Format

When categorizing a paper, produce a structured analysis:

**Paper**: [Title, authors, venue/year]

**Summary**: 1–2 sentences on what the paper contributes and what problem it addresses.

**Paradigm**: AI Automation / Mixed-Initiative *(tool papers only)*

**Category**: Type 1 / Type 2 / Hybrid / Survey / Theory / Empirical Study

**Subcategory**:
- Type 1: Sub-paradigm (Preparatory Scaffolding / Generative Support) + Research stage(s) with brief justification
- Type 2: Boden type with the specific creative mechanism
- Survey / Theory or Empirical Study: Brief characterization of contribution type

**Agency Analysis** *(tool papers only)*: A concise explanation of where creative agency lies. Use specific evidence from the paper's design choices, study findings, or author framing.

**Boundary Notes** *(optional)*: If the paper sits at an interesting boundary or challenges the taxonomy, explain why.

---

## Common Pitfalls to Avoid

- **Don't conflate "AI-powered" with Type 2.** Many tools use ML to scaffold human thinking (Type 1 Mixed-Initiative). The question is about generative agency, not technical implementation.
- **Don't treat "the user can choose" as sufficient for Type 1.** If the system generates a rich space of novel possibilities and the user selects from them, that's Type 2 — selection is the human's primary creative act.
- **Don't over-rely on the paper's own framing.** Authors sometimes describe generative systems as "assisting" human creativity even when the design fits Type 2. Read the actual interaction design, not just the abstract.
- **Don't assume all Mixed-Initiative generative support tools are Type 1.** Some (like Scideator, Perspectra, PersonaFlow) place the system in the generative role despite keeping the human engaged — these are Type 2 Combinational.
- **Transformational creativity is rare.** Only classify as Transformational if the system genuinely redefines the conceptual space — not merely explores it vigorously.
- **Expert systems are Type 2 Exploratory.** Even though they predate LLMs and use symbolic reasoning, they autonomously generate scientific discoveries — the researcher is a consumer of their outputs.
- **Distinguish Survey / Theory from Empirical Study carefully.** A paper that reviews literature → Survey / Theory. A paper that runs studies with participants → Empirical Study. Some do both — classify by the primary contribution the authors claim.

---

## Quick Reference Examples

| Category | Example | Paradigm | Classification |
|---|---|---|---|
| Symbolic scientific discovery | BACON, DENDRAL, KEKADA, EURISKO | AI Automation | Type 2 → Exploratory |
| LLM multi-agent scientist | The AI Scientist, SciAgents, Agent Laboratory | AI Automation | Type 2 → Exploratory |
| Citation graph / paper discovery | Citeread, Citesee, PaperWeaver | Mixed-Initiative (Preparatory) | Type 1 → Information Foraging |
| Scholarly synthesis / reading scaffold | Synergi, ComLittee, Relatedly, Threddy | Mixed-Initiative (Preparatory) | Type 1 → Analysis & Sensemaking |
| Research question co-creation | CoQuest | Mixed-Initiative (Generative) | Type 1 → Problem Framing |
| Cooperative study planning | Cocoa | Mixed-Initiative (Generative) | Type 1 → Research Planning |
| Cross-domain idea generation | Scideator, Perspectra, PersonaFlow | Mixed-Initiative (Generative) | Type 2 → Combinational |
| Iterative hypothesis generation | IRIS, SciMON, Chain-of-Ideas | Mixed-Initiative (Generative) | Type 2 → Exploratory |
| Design space analysis | Survey of AI-assisted research tools | — | Survey / Theory |
| User study of creative practices | How researchers manage ideas | — | Empirical Study |
