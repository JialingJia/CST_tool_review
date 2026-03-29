---
name: research-ideation-stages
description: >
  Identify which stages of the research ideation process a tool supports, using a four-stage
  framework: Information Foraging, Problem Framing, Analysis & Sensemaking, and Research
  Planning. Use this skill whenever the user wants to understand where in the research workflow
  a tool intervenes — including when they ask "what stage does this tool support?", "which part
  of research does this help with?", "how does this tool fit into the research process?", or
  when they're building a database or visualization of research tools and need stage tags. Also
  trigger when the user describes a tool and wants to situate it within a research workflow,
  even if they don't use the word "stage". Use this skill alongside cst-categorizer when
  categorizing Type 1 CST papers.
---

# Research Ideation Stages Framework

This skill identifies which stage(s) of the research ideation process a tool supports. The goal is to understand *where in the research journey* a tool intervenes — not what kind of tool it is (that's what the cst-categorizer handles), but *when* a researcher would reach for it.

---

## Two Clusters: Preparatory vs. Generative

The four stages organize into two functional clusters that correspond to the two Mixed-Initiative sub-paradigms identified in Jialingjia's dissertation (§2.2.2). Understanding these clusters helps assign stages accurately and situate tools within the broader design spectrum.

### Preparatory Cluster (§2.2.2.1)

**Stages**: Information Foraging + Analysis & Sensemaking

**Research position**: Earlier in the ideation workflow — before the researcher has formed a clear research question. The researcher is building a knowledge foundation and making sense of what exists.

**Wallas stage correspondence**: Preparation phase — the cognitive work of problem construction, information encoding, and landscape understanding that precedes creative insight.

**Mumford processes**: Problem construction, information encoding, category search — early cognitive processes that structure the raw material for ideation.

Tools in this cluster help the researcher *understand the field* before they decide *what to investigate*.

---

### Generative Cluster (§2.2.2.2)

**Stages**: Problem Framing + Research Planning

**Research position**: Later in the ideation workflow — once the researcher has sufficient background to begin defining and pursuing a specific inquiry.

**Wallas stage correspondence**: Illumination phase — the cognitive work of formulating a question or hypothesis, and charting a path to answer it.

**Mumford processes**: Idea generation, idea evaluation, implementation planning — later cognitive processes that shape a research direction into an actionable plan.

Tools in this cluster help the researcher *define and pursue* a specific question, building on the foundation laid in the preparatory stages.

---

*Note*: Even as LLM-based agents increasingly automate later-stage generative work (AI Automation paradigm), preparatory scaffolding tools remain foundational — researchers still need to make sense of a field before they can evaluate machine-generated outputs. The preparatory cluster is not made obsolete by automation; it shifts in importance.

---

## The Four Stages

Research ideation doesn't happen in a neat linear sequence — researchers move between stages fluidly. Still, each stage has a distinctive goal and associated cognitive demands, and tools are usually designed with one or two stages primarily in mind.

### 1. Information Foraging *(Preparatory Cluster)*

**Goal**: Find and absorb the right knowledge to build on.

The researcher is building their understanding of a landscape — searching for prior work, discovering what's been done, filtering what's relevant, and synthesizing it into a coherent picture. The key cognitive challenge is navigating an overwhelming space of information and deciding what matters.

**Tools in this stage:**
- Literature search and recommendation engines
- Citation graph explorers and paper discovery tools
- Knowledge synthesis scaffolds (helping the researcher connect and organize what they've read)
- Paper alert and feed systems that surface new relevant work
- Tools that contextualize new papers relative to what the researcher already knows

**Representative tools**: Citeread, Citesee, ComLittee, PaperWeaver, Relatedly, Threddy, Passage

**Distinguishing question**: *Is the researcher's primary activity finding and absorbing existing knowledge?*

---

### 2. Analysis & Sensemaking *(Preparatory Cluster)*

**Goal**: Make meaning from data, results, and evidence.

The researcher has collected something — data, literature, findings — and now needs to interpret it. The key cognitive challenge is perceiving patterns, building explanations, and constructing an understanding that goes beyond the raw material. Importantly, this stage is not limited to post-hoc analysis: sensemaking happens *during* search too, whenever a tool provides visualization scaffolds that help the researcher organize and perceive structure in what they are reading.

**Tools in this stage:**
- Qualitative coding and thematic analysis tools
- Visualization scaffolds that help researchers see patterns — including cluster/topic maps, mind maps, and concept networks built from search results
- Literature synthesis tools that help build a coherent narrative across sources
- Mixed-initiative sensemaking systems (where the system surfaces structure, the human interprets it)
- Tools that help researchers trace the logical connections between evidence and claims
- Search tools with organizational views (e.g., topic clustering, side-by-side comparison) that scaffold the researcher's own pattern recognition

**Representative tools**: Synergi, Relatedly (the synthesis features), SearchIdea (the cluster/compare views)

**Distinguishing question**: *Is the researcher's primary activity making sense of — or organizing the structure of — information they have encountered?*

---

### 3. Problem Framing *(Generative Cluster)*

**Goal**: Define a clear, valuable research question or hypothesis.

The researcher is sharpening their focus — identifying what's unknown or underexplored, formulating a problem worth solving, and challenging their own assumptions about the space. The key cognitive challenge is moving from a vague area of interest to a specific, tractable, and meaningful inquiry.

**Tools in this stage:**
- Research question and hypothesis generators
- Gap-identification systems that surface what's missing in a field
- Analogical reframers that help the researcher see their problem from a new angle
- Tools that structure the brainstorming of "what could we study here?"
- Systems that evaluate the novelty or feasibility of a proposed question

**Representative tools**: CoQuest (research question co-creation), SearchIdea (idea board features), Scideator, Perspectra, PersonaFlow, IRIS, SciMON, Chain-of-Ideas

**Distinguishing question**: *Is the researcher's primary activity deciding* what *to investigate?*

---

### 4. Research Planning *(Generative Cluster)*

**Goal**: Decide how to execute the research.

The researcher knows what they want to investigate and now needs to figure out how — choosing a methodology, designing a study, structuring a protocol, or organizing a research workflow. The key cognitive challenge is translating a question into a rigorous, feasible plan.

**Tools in this stage:**
- Methodology recommenders and experimental design guides
- Protocol builders and study design scaffolds
- Research workflow organizers and project planning tools
- Tools that help researchers anticipate methodological pitfalls
- Systems that structure the selection of appropriate methods for a given question

**Representative tools**: Cocoa (cooperative study planning with AI agents), IdeaSynth (study planning features)

**Distinguishing question**: *Is the researcher's primary activity planning* how *to conduct the research?*

---

## How to Assign Stages

**Step 1: Identify which cluster first.** Is the tool primarily supporting the researcher in building knowledge (preparatory cluster: Information Foraging or Analysis & Sensemaking) or in defining and pursuing an inquiry (generative cluster: Problem Framing or Research Planning)?

**Step 2: Assign the most prominent stage within the cluster.** Most tools have a clear primary stage. Assign it first.

**Step 3: Consider secondary stages.** Some tools genuinely span two stages — for example, a tool that helps a researcher synthesize literature *and* formulate a question from it touches both Information Foraging and Problem Framing (crossing cluster boundaries). Assign secondary stages where genuinely applicable, but don't over-assign — the goal is clarity, not comprehensiveness.

**Step 4: Watch for stage-crossing tools.** A few tools are designed to support the full workflow. When this happens, assign all applicable stages but note which is primary and why.

---

## Output Format

When analyzing a tool, produce:

**Tool**: [Name or short description]

**Cluster**: Preparatory / Generative / Both

**Primary Stage**: [Stage name] — one sentence explaining why this stage fits.

**Secondary Stage(s)** *(if applicable)*: [Stage name(s)] — brief justification for each.

**Stage Reasoning**: 2–3 sentences connecting the tool's core affordance to the cognitive demands of the assigned stage(s). Be specific about *what the researcher is doing* when they use this tool.

---

## Stage Assignment Examples

| Tool | Cluster | Primary Stage | Secondary Stage | Reasoning |
|---|---|---|---|---|
| Semantic Scholar / Connected Papers | Preparatory | Information Foraging | — | Researcher is discovering and navigating relevant prior work |
| Citeread, Citesee | Preparatory | Information Foraging | — | Scaffold how researchers read and absorb individual papers |
| PaperWeaver, Relatedly | Preparatory | Information Foraging | Analysis & Sensemaking | Find papers + help researchers perceive connections across them |
| Synergi | Preparatory | Analysis & Sensemaking | Information Foraging | Helps researchers build research threads across papers they've found |
| SearchIdea | Preparatory→Generative | Information Foraging, Analysis & Sensemaking | Problem Framing | Cluster/compare views scaffold knowledge organization; Idea Board scaffolds question formation |
| CoQuest | Generative | Problem Framing | — | Collaborative research question co-creation with AI |
| HARPA / hypothesis generator | Generative | Problem Framing | — | Researcher is sharpening what question to pursue |
| Scideator, Perspectra | Generative | Problem Framing | — | System generates cross-domain ideas for researcher to evaluate |
| Cocoa | Generative | Research Planning | Analysis & Sensemaking | Supports cooperative study planning and task execution with AI agents |
| IdeaSynth | Generative | Problem Framing | Research Planning | Generates research problems and scaffolds study planning |
| Affinity diagramming tool | Preparatory | Analysis & Sensemaking | — | Researcher is grouping and interpreting qualitative data |

---

## Common Pitfalls

- **Don't assign a stage just because a tool uses literature.** Many tools read papers to generate output, but the *researcher's* activity might be evaluating ideas (Problem Framing), not searching (Information Foraging). Ask what the researcher is *doing*, not what data the system is reading.
- **Resist over-assigning stages, but don't under-assign either.** If a tool has distinct features that genuinely serve different stages (e.g., a search view for foraging *and* a cluster/map view for organizing what was found), assign both. Stage tags lose value if everything is tagged with everything — but they also lose value if multi-function tools are squeezed into one box.
- **Problem Framing vs. Information Foraging**: A paper recommendation tool is Information Foraging. A hypothesis generation tool is Problem Framing. The line is: is the researcher building knowledge, or defining what to investigate?
- **Analysis & Sensemaking vs. Research Planning**: Sensemaking is about interpreting what you *have*. Planning is about deciding what to *do next*. A tool that helps you see patterns in data → Sensemaking. A tool that helps you design your next study → Research Planning.
- **Cluster crossing is real but should be deliberate.** A tool that helps synthesize literature *and* formulate questions genuinely spans the preparatory-generative boundary. Don't force it into one cluster — but verify the cross-cluster span is a core design feature, not an incidental affordance.
- **AI Automation tools (Type 2) do not get stage tags.** Stage assignments apply to Mixed-Initiative tools (Type 1, and some Type 2) where the researcher's cognitive activity is the primary referent. Fully autonomous agents (The AI Scientist, SciAgents, etc.) replace the researcher's stage activity rather than supporting it — they are not tagged with research stages in the database.
