# Literature Review: AI-Assisted Research Ideation Tools

## Overview

The task of generating novel research ideas sits at one of the most demanding intersections of
human cognition: it requires simultaneously commanding a domain's prior work, sensing its gaps,
and proposing directions no one has taken before. For decades this remained firmly a human
endeavor, supported at most by search engines and citation managers. The emergence of large
language models (LLMs) has fundamentally disrupted this picture, spawning a wave of tools that
range from scaffolds that sharpen human reasoning to autonomous systems that generate research
hypotheses wholesale. This review maps that landscape across four axes: theoretical frameworks
that define what scientific creativity is, empirical studies that document how researchers
actually ideate, tool designs that scaffold human cognitive processes, and computational systems
that take on creative generation themselves. Together these threads reveal a field in rapid
transition — one that has accumulated significant technical capability but continues to grapple
with foundational questions about the appropriate division of labor between researcher and machine.

---

## Theoretical Grounding: Defining Scientific Creativity

Before tools can support scientific creativity, the field needs to know what it is supporting.
At its most foundational, scientific creativity refers to the capacity to generate ideas, hypotheses,
or frameworks that are both novel and valuable within a scientific domain. Getzels and
Csikszentmihalyi [1967] offered an influential early account that locates this capacity not primarily
in problem-solving ability — arriving at a correct answer to a well-formed question — but in
*problem finding*: the disposition to identify problems worth pursuing in the first place. On this
view, what distinguishes creative scientists from merely capable ones is the ability to sense gaps,
tensions, and anomalies that others overlook, and to formulate them as tractable scientific
questions. This problem-finding conception shifted the locus of scientific creativity upstream, from
the formal machinery of hypothesis testing to the largely tacit process of deciding what is worth
investigating at all — a shift with direct implications for how any supporting tool should be
designed.
Several strands of theoretical work have since tackled this question from complementary angles. At the
most foundational level, the 4Ps framework — product, process, person, press — organizes the
different objects of inquiry in creativity research, and recent work has applied this lens
specifically to HCI, showing that researchers often talk past each other because they are
measuring different things [Hsueh et al. 2024]. A parallel conceptual effort examines whether AI
systems can qualify as creative at all, arguing that genuine creativity demands intentionality,
risk-taking, and contextual meaning that current LLMs do not exhibit, despite their surface
fluency [Chakrabarty et al. 2024]. Chen et al. [2024] take a more optimistic position, proposing
a theoretical framework in which AI functions as a catalyst for scientific creativity rather than
a replacement — an accelerant that enables novel combinations humans would not reach alone.

The computational creativity tradition, especially Boden's taxonomy of combinational, exploratory,
and transformational creativity, has provided a common vocabulary for classifying what different
tools actually do. Most contemporary LLM-based systems operate in the combinational or
exploratory registers: they recombine known ideas across domain boundaries or search existing
conceptual spaces more thoroughly than any single researcher could. Truly transformational
creativity — generating ideas that require restructuring the rules of a field — remains largely
aspirational. This distinction matters for evaluation: surveys of hypothesis generation systems
have noted that many benchmarks measure novelty in a superficial sense (distance from training
data) rather than the deeper scientific significance that practitioners care about [Alkan et al.
2025]. IdeaBench [Guo et al. 2025] represents a systematic attempt to address this gap by
providing a standardized evaluation framework for comparing LLM-based idea generation systems.
Complementing this benchmarking tradition, LiveIdeaBench [Ruan et al. 2026] takes a
distinctly divergent-thinking-oriented approach, evaluating LLMs' scientific creativity
through single-keyword minimal-context prompts grounded in Guilford's theory of divergent
production; a key finding is that a model's performance on these idea generation tasks is
only weakly correlated with its scores on general intelligence benchmarks — suggesting that
scientific creativity may benefit from distinct training objectives emphasizing conceptual
breadth over convergent accuracy. Ye et al. [2025] have further mapped the design space of
recent AI research tools across ideation, sensemaking, and creativity dimensions. Cox et al. [2025] push back on the field's
tendency to equate creativity support with productivity gain, arguing for evaluation frameworks
that center human creative growth rather than output volume.

---

## Empirical Foundations: How Researchers Actually Ideate

A complementary line of work has studied the research ideation process empirically — not to build
tools, but to understand what researchers actually do before any tool is introduced. This work
provides essential grounding for tool design by revealing the cognitive strategies, social
practices, and practical constraints that tools must either support or navigate around.

Studies of information-seeking during ideation reveal that creative thinking and academic search
are deeply intertwined activities. Chavula et al. [2022] document how researchers alternate
between foraging for literature and framing potential problems, with information-seeking serving
as a driver of creative insight rather than merely a precondition for it. Inie et al. [2022]
extend this picture by studying how researchers capture, store, and develop ideas over time,
finding that idea management is an ongoing and highly personal practice rather than a discrete
event. Similarly, Rosselli Del Turco et al. [2025] conducted a large cross-domain study showing
that creative practitioners across design, research, music, and writing share common patterns in
how they capture and organize emerging ideas — and common frustrations with the tools available
to them.

Empirical work examining researchers' interactions with LLMs specifically has surfaced a richer
and more ambivalent picture than the tool-building literature sometimes acknowledges. Lim and
Perrault [2024] found that collaborative human-LLM ideation produces richer outcomes than either
solo or purely AI-generated approaches, but that the quality of collaboration depends heavily on
how the interaction is structured. Wan et al. [2024] describe the LLM as a "second mind" in
prewriting — a cognitive partner that simultaneously scaffolds and risks displacing aspects of
human ideation depending on the writer's engagement mode. Kumar et al. [2025] add nuance through
randomized controlled experiments showing that LLM assistance has asymmetric effects on divergent
versus convergent thinking: it can expand the range of ideas generated while potentially
narrowing the depth of independent engagement. The most comprehensive benchmark comparison to
date comes from Bellemare-Pepin et al. [2026], who evaluated leading LLMs against over 100,000
human participants on the Divergent Association Task. Their findings sketch a nuanced competitive
landscape: advanced models such as GPT-4 exceed average human performance on this measure of
verbal divergent creativity, yet the most creative human participants maintain a consistent and
statistically significant advantage — suggesting that LLMs have become broadly competent at
associatively diverse output while still falling short of the upper end of human creative
capacity. Alongside these cognitive accounts, Kapania et al. [2025] surface the ethical tensions that HCI researchers navigate when using LLMs in their
own work — tensions between efficiency gains and concerns about intellectual integrity, credit,
and the meaning of authorship in an AI-assisted process. Liu et al. [2026] probe these tensions
directly through a mixed-methods study in which 54 researchers used an agentic ideation system —
comprising Ideator, Writer, and Evaluator agents — at three levels of LLM control. Their findings
complicate a simple "more control = more creativity" assumption: creativity support is non-linear
across control levels, with Low- and Intensive-control conditions fostering qualitatively different
kinds of creative engagement. Critically, as AI assumes more generative control, human effort does
not disappear but redirects — shifting from idea generation toward idea verification and quality
assessment. Ownership of the resulting proposals emerged as a negotiated outcome in which
participants drew on both idea originality and execution effort to apportion credit, rather than
applying a simple human-or-AI binary.

---

## Scaffolding Human Cognition: Tools That Keep the Researcher as Creator

One tradition in research ideation support treats the researcher as the sole creative agent and
builds tools that sharpen, organize, or extend their cognitive processes without taking over the
generative work. These Type 1 tools represent a fundamentally different design philosophy from
computational creativity systems: the tool's contribution is structural rather than substantive.

Within information foraging, PaperWeaver [Lee et al. 2024] demonstrates how recommender systems
can move beyond relevance ranking to actively help researchers make sense of new literature in
relation to their existing collections. By contextualizing recommended papers through personally
meaningful connections, the system scaffolds the sensemaking work that converts a large paper set
into usable knowledge — without proposing what to do with that knowledge. SearchIdea [Chavula
et al. 2023] operates at a similar stage but emphasizes active reorganization: the tool enables
researchers to annotate, cluster, and synthesize search results as part of the search process
itself, making idea generation an emergent product of how information is organized rather than a
separate downstream step.

The sensemaking dimension is extended further by Synergi [Kang et al. 2023], a mixed-initiative
tool that helps scholars build thematic threads across multiple papers. Synergi exemplifies a
principle common to Type 1 designs: the system surfaces connections and structural patterns, but
the meaning-making remains with the researcher.

IdeaSynth [Pu et al. 2025] extends this scaffolding philosophy into the research idea
development stage itself. Rather than structuring literature search or post-hoc synthesis,
IdeaSynth provides a canvas on which researchers decompose their nascent ideas into modular
facets — research problem, proposed solution, evaluation approach, and expected contribution —
and receive literature-grounded LLM feedback at both the node level and across the canvas as a
whole. The system does not propose ideas on the researcher's behalf; it surfaces how proposed
idea facets relate to existing work and prompts iterative reflection and elaboration. User
evaluations showed that IdeaSynth helped participants articulate more specific and grounded
research briefs while maintaining a stronger sense of authorship than systems that generate
suggestions for them to select.

Reflection-oriented tools work at an even more meta level. Ford and Bryan-Kinns [2023] developed a validated questionnaire instrument for
measuring reflective experience during creative activity — a scaffold for self-assessment that
helps researchers understand their own process rather than outsourcing any part of it. Fuzzy
Linkography [Smith et al. 2025] takes an automated approach to the same goal, generating
graphical summaries of creative activity traces so that researchers can retrospectively analyze
the structure of their own ideation sessions.

---

## Computational Ideation at Scale: LLM-Based Hypothesis and Idea Generation

The most numerically dominant category in the corpus consists of systems that use large language
models to generate research hypotheses, questions, or ideas that researchers then evaluate and
refine. This wave of work has grown rapidly since 2022 and spans a wide range of mechanisms,
target domains, and levels of autonomy.

The earliest and most direct approach simply exploited LLMs' zero-shot cross-domain knowledge.
Qi et al. [2023] demonstrated that LLMs can propose plausible scientific hypotheses by bridging
information across disciplinary silos — the model's broad training corpus enables combinational
leaps that would require unusual interdisciplinary exposure from a human researcher. PaperRobot
[Wang et al. 2019] anticipated this direction by generating new paper sections from existing
scientific literature, treating idea generation as an incremental drafting process. The subsequent
generation of systems introduced more sophisticated mechanisms for controlling the quality of
generated ideas. SciMON [Wang et al. 2024] optimizes explicitly for novelty by retrieving
inspiration from cross-domain literature, while "Sparks of Science" [O'Neill et al. 2025] grounds
hypothesis generation in structured metadata extracted from papers — methods, datasets, and
results — rather than in free-form text. Zhou et al. [2024] systematically compared machine- and
human-authored hypotheses, documenting both the strengths and the reliability problems of the
former. Jinnai et al. [2024] contributed a decoding method that improves the diversity of LLM
outputs, addressing the tendency of generative systems to converge on similar ideas across
repeated runs.

Augmenting LLM ideation with empirical data has emerged as a distinct and promising direction.
Liu et al. [2025a] found that providing LLMs with relevant datasets alongside literature improves
the feasibility of generated social science research ideas, and Liu et al. [2025b] introduced a
synergistic framework that combines both knowledge sources to generate higher-quality hypotheses —
the model doing the integrative work of blending literature and data that a human would find
cognitively demanding. HARPA [Vasu et al. 2025] pushes further by incorporating testability
criteria directly into the generation pipeline, so that produced hypotheses are not only novel
but empirically actionable. The analogical search engine developed by Kang et al. [2022] takes a
structurally different approach: instead of generating hypotheses directly, it retrieves
structurally similar solutions from distant scientific domains, enabling researchers to adapt
analogical insights from fields they would not otherwise consult. Idea-Catalyst [Kargupta et al.
2026] revisits this cross-domain inspiration approach through a metacognition-driven framing:
rather than directly retrieving papers from adjacent domains, the system first analyzes the
target field to identify persistent unresolved challenges, reframes those challenges as
domain-agnostic conceptual problems, and only then retrieves insights from external disciplines
whose prior solutions could transfer. This structured metacognitive scaffolding — decompose,
abstract, search — mirrors the deliberate analogical reasoning that researchers report in
retrospective accounts of interdisciplinary breakthroughs, and experimental results showed
significant gains in novelty and insightfulness over direct retrieval baselines.

Multi-agent architectures have extended these capabilities by replacing the single-model ideation
bottleneck with a deliberative ensemble. Su et al. [2025] demonstrated that a system of
specialized LLM agents — scientist, critic, reviewer — generates higher-quality ideas than any
single agent through productive disagreement, with diverse agent perspectives driving combinational
creativity. ResearchAgent [Baek et al. 2025] iteratively generates, refines, and critiques ideas
in a continuous loop over the scientific literature, functioning as an autonomous ideation engine
that escalates through cycles of self-improvement. The most ambitious expression of this
trajectory is the AI co-scientist [Gottweis et al. 2025], a multi-agent system built on Gemini
2.0 that deploys specialized agents — Generation, Reflection, Ranking, and Evolution — in a
tournament-style framework where hypothesis quality improves through iterated self-play debate.
Unlike systems that deliver a fixed output set for human review, the AI co-scientist evolves its
proposals recursively across many rounds of critique and revision, converging toward hypotheses
that domain experts rate significantly higher in novelty than those produced by single-pass
methods. Validated against real-world biomedical discovery tasks — including drug repurposing for
acute myeloid leukemia and hypothesis generation for antimicrobial resistance — it represents a
qualitative step toward fully autonomous research ideation while positioning the scientist as the
supervisor who sets the goal and adjudicates outcomes. EvoScientist [Lyu et al. 2026] pushes this trajectory further by introducing persistent cross-run memory as a first-class system component. Where prior multi-agent systems self-improve only within a single session, EvoScientist's Evolution Manager Agent continuously distills interaction histories — tracking which research directions proved fruitful and which failed — into ideation and experimentation memory modules that carry over across independent runs, directly addressing the recurrence problem in which static autonomous pipelines repeatedly explore the same unproductive directions. Chain-of-Ideas [Li et al. 2025] further
grounds iterative generation in literature trajectories, constructing progressive chains of ideas
grounded in how a field has evolved rather than treating the literature as a flat knowledge base.
Complementing this trajectory-based approach, Deep Ideation [Zhao et al. 2024] takes a third
strategy for grounding iterative generation in domain structure: rather than organizing
literature chronologically or thematically, it constructs a scientific concept network from
approximately 100,000 AI conference papers, encoding keyword co-occurrence and paper-level
contextual relationships as a navigable graph. LLM agents traverse this network through an
explore-expand-evolve workflow, and a critic engine trained on real reviewer feedback provides
continuous novelty and feasibility signals at each iteration. Evaluated across multiple AI
research domains, the framework achieves a 10.67% improvement in idea quality over prior
baselines — suggesting that encoding domain-specific relational structure as an explicit
knowledge graph, rather than leaving it implicit in model weights or unstructured retrieval
corpora, yields measurable gains in the caliber of autonomously generated research ideas.

---

## Hybrid Systems: Co-Creation Across the Human-AI Boundary

Between the poles of scaffolding and autonomous generation lies a set of hybrid systems that
attempt to keep both human and machine as active contributors without collapsing into either pure
delegation or pure assistance. These tools are among the most recent in the corpus and
collectively suggest where the field's frontier lies.

Several hybrid systems address the problem of perspective diversity in ideation. PersonaFlow
[Liu et al. 2025c] scaffolds research ideation by presenting LLM-simulated expert perspectives
as structured prompts, enabling researchers to consider viewpoints from disciplines outside their
own while retaining authorship of the resulting ideas. Perspectra [Liu et al. 2025d] develops
this approach further through a multi-agent forum where users select domain-expert LLM personas
that deliberate and critique while the researcher steers the conversation and evaluates the
outputs. The key design choice in both systems is that the human decides which perspectives to
activate and how to integrate them — the system expands the researcher's conceptual reach without
prescribing where to go.

Scideator [Radensky et al. 2026] takes a facet-based approach: it extracts structured
components (purposes, mechanisms, evaluations) from seed papers the researcher provides, then
recombines them systematically to generate novel research ideas and evaluate their novelty against
the literature. This compound design positions the human as both input provider and output
evaluator while the system performs the combinational search in between. The processing-delay
system of Liu et al. [2024] explores a subtler intervention: introducing intentional delays
before showing LLM suggestions, during which users engage in independent thinking. The finding
that delays improve research question quality highlights a tension common to all hybrid systems —
fast AI assistance can short-circuit the slower incubation processes that produce genuinely
original human ideas.

Cocoa [Feng et al. 2026] extends the hybrid model to longer-horizon research tasks where planning
and execution must be interleaved. Unlike systems that generate a discrete output for human
review, Cocoa enables continuous co-steering: the researcher intervenes, redirects, and executes
alongside the agent at multiple stages of a complex task. This represents a shift from
human-as-evaluator to human-as-co-planner — a model that keeps more of the research process
under active human control while still leveraging AI capabilities for exploration and execution.

---

## Open Tensions and the Design Frontier

The body of work reviewed here has produced substantial evidence that LLMs can generate plausible
and in some cases genuinely novel research ideas, that scaffolding tools improve the efficiency
and depth of human ideation, and that hybrid designs can combine the strengths of both. Yet
several fundamental tensions remain unresolved and will shape the next phase of work in this
space.

The first concerns evaluation. Despite the proliferation of benchmarks [Guo et al. 2025] and
surveys [Alkan et al. 2025; Ye et al. 2025], there is no consensus on what makes a research idea
good. Novelty, feasibility, significance, and testability point in different directions and are
routinely conflated. Cox et al. [2025] argue that the field has been measuring outputs when it
should be measuring creative development — a harder but more meaningful target. The second
tension concerns agency. Empirical work consistently finds that the same LLM capability that
expands ideation when used collaboratively can narrow independent thinking when used passively
[Kumar et al. 2025; Wan et al. 2024]. How to design for productive engagement without fostering
over-reliance remains an open design problem. The third tension is ethical. As LLM-based
ideation tools mature, the boundaries of intellectual contribution, credit, and originality in
research become harder to draw [Kapania et al. 2025; Liu et al. 2026]. A tool that generates a hypothesis the
researcher refines into a publishable finding occupies a fundamentally ambiguous position in the
scholarly economy — one that existing norms have not yet caught up with. Together these tensions
suggest that the most important next contributions to AI-assisted research ideation may be not
technical but evaluative, social, and ethical.

---

*Note: Citations use [Author et al. Year] format throughout. Where multiple authors from the same
group appear (e.g., Liu et al. 2025a/b/c/d), the suffixes distinguish papers by year; these
should be resolved to specific venues in the final manuscript.*

---

## Recent Additions (March 2026)

The following papers were added to the corpus in the March 2026 pipeline update. Brief notes
on how each fits into the existing review structure are provided for the benefit of future
revision passes.

[Pu et al., CHI 2025] — A Type 1 scaffolding tool for iterative research idea
development that represents idea facets as nodes on a canvas and provides literature-grounded
LLM feedback to support refinement while keeping the researcher as the primary generator.
Integrated into the *Scaffolding Human Cognition* section.

[Kargupta et al., arXiv 2026] — A Type 2 Combinational system that generates
interdisciplinary idea fragments through metacognition-driven cross-domain retrieval: it analyzes
target-domain challenges, abstracts them, and retrieves insights from external disciplines to
spark creative reasoning. Integrated into the *Computational Ideation at Scale* section alongside
the analogical search engine literature.

[Ruan et al., Nature Communications 2026] — A continuously updating benchmark
that evaluates LLMs' divergent scientific creativity via minimal-context (single-keyword) prompts,
grounded in Guilford's divergent production theory. Integrated into the *Theoretical Grounding*
section alongside IdeaBench.

[Bellemare-Pepin et al., Scientific
Reports 2026] — A large-scale empirical study comparing LLMs against 100,000+ human participants
on the Divergent Association Task, establishing a nuanced baseline: current frontier models
exceed average human performance but trail the most creative individuals. Integrated into the
*Empirical Foundations* section.

[Gottweis et al., arXiv 2025] — A multi-agent Type 2 system
(Google / Gemini 2.0) that autonomously generates and evolves scientific hypotheses through
tournament-style agent debate, validated on real-world biomedical discovery tasks. Integrated
into the *Computational Ideation at Scale* section's multi-agent subsection.

[Liu et al., arXiv cs.HC 2026] — Mixed-methods
empirical study (n=54) examining creativity, effort, and ownership trade-offs across three LLM
control levels in a three-role agentic ideation probe. Key finding: creativity support is
non-linear with control, and human effort shifts from generating to verifying ideas as AI takes
more control. Integrated into the *Empirical Foundations* section and *Open Tensions*.

[Zhao et al., arXiv cs.AI 2024] — A Type 2 Exploratory+Combinational system (Deep Ideation)
that builds a scientific concept network from ~100,000 AI conference papers and deploys LLM
agents via an explore-expand-evolve workflow to generate novel, grounded research ideas. A
critic engine trained on real reviewer feedback provides iterative quality signals. Achieves a
10.67% improvement in idea quality over prior baselines. Integrated into the *Computational
Ideation at Scale* section's multi-agent paragraph.

[Getzels and Csikszentmihalyi, Science Journal 1967] — Foundational theoretical paper
arguing that scientific creativity resides primarily in *problem-finding* rather than
problem-solving: the capacity to sense gaps and anomalies others overlook and to formulate
them as tractable scientific questions. Contributed via researcher annotation (@JialingJia).
Integrated into the opening of the *Theoretical Grounding* section to ground the discussion
of what scientific creativity is before reviewing modern tool approaches.

[Lyu et al., arXiv cs.CL 2026] — EvoScientist, a multi-agent Type 2 system that introduces
persistent cross-run memory (ideation and experimentation memory modules) managed by an
Evolution Manager Agent, enabling the autonomous pipeline to avoid repeating failed directions
across independent runs. Integrated into the *Computational Ideation at Scale* section's
multi-agent subsection, positioned between AI co-scientist and Chain-of-Ideas.
