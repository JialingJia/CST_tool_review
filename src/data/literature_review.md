# Literature Review: AI-Assisted Research Ideation Tools

## Overview: The Design Spectrum of Computational Research Ideation

The task of generating novel research ideas sits at one of the most demanding intersections of
human cognition: it requires simultaneously commanding a domain's prior work, sensing its gaps,
and proposing directions no one has taken before. For decades this remained firmly a human
endeavor, supported at most by search engines and citation managers. The emergence of large
language models (LLMs) has fundamentally disrupted this picture, spawning a wave of computational
systems that attempt — in radically different ways — to intervene in the ideation process.

Understanding this landscape requires recovering a distinction that has structured the history of
AI research more broadly. Shneiderman [2020] traces two historically competing design goals in
artificial intelligence: the *emulation goal*, which aims to build autonomous systems that replicate
or surpass human intelligence, and the *application goal*, which aims to build tools that amplify
human capabilities without replacing them. The tension between these goals predates LLMs by
decades — it organized the expert systems era of the 1970s and 1980s — but it has returned with
new urgency as language models enable both poles of the spectrum simultaneously. On one end sit
what we call *AI Automation* tools: systems in which the machine autonomously conducts literature
review, hypothesis generation, and experimental planning while the researcher serves primarily as
a downstream consumer of machine-generated proposals. On the other sit *Mixed-Initiative* tools
in the sense of Horvitz [1999]: systems that keep the researcher as the primary creative agent,
using computation to extend cognitive reach without transferring the generative act to the machine.

Between and within these poles, the design space is further structured by the temporal position
of a tool in the research workflow. Mixed-initiative tools cluster naturally into two functional
groups: *preparatory scaffolding* tools, which support the knowledge-building and sensemaking
work that precedes active ideation, and *generative support* tools, which intervene during the
formulation of specific research questions, hypotheses, and plans. This review maps the corpus
of AI-assisted research ideation tools across these distinctions, attending throughout to what
each design choice implies for the role of the human researcher.

---

## Theoretical Grounding: Defining Scientific Creativity

Before tools can support scientific creativity, the field needs to know what it is supporting.
At its most foundational, scientific creativity refers to the capacity to generate ideas,
hypotheses, or frameworks that are both novel and valuable within a scientific domain. Getzels
and Csikszentmihalyi [1967] offered an influential early account that locates this capacity not
primarily in problem-solving ability — arriving at a correct answer to a well-formed question
— but in *problem finding*: the disposition to identify problems worth pursuing in the first
place. On this view, what distinguishes creative scientists from merely capable ones is the
ability to sense gaps, tensions, and anomalies that others overlook and to formulate them as
tractable scientific questions. This problem-finding conception shifted the locus of scientific
creativity upstream, from the formal machinery of hypothesis testing to the largely tacit process
of deciding what is worth investigating at all — a shift with direct implications for how any
supporting tool should be designed.

Several strands of theoretical work have since tackled this question from complementary angles.
The 4Ps framework — product, process, person, press — organizes the different objects of inquiry
in creativity research, and recent work has applied this lens specifically to HCI, showing that
researchers often talk past each other because they are measuring different things [Hsueh et al.
2024]. A parallel conceptual effort examines whether AI systems can qualify as creative at all,
arguing that genuine creativity demands intentionality, risk-taking, and contextual meaning that
current LLMs do not exhibit despite their surface fluency [Chakrabarty et al. 2024]. Chen et al.
[2024] take a more optimistic position, proposing a theoretical framework in which AI functions
as a catalyst for scientific creativity — an accelerant that enables novel combinations humans
would not reach alone.

The computational creativity tradition, especially Boden's taxonomy of combinational, exploratory,
and transformational creativity, has provided a common vocabulary for classifying what different
tools actually do. Most contemporary LLM-based systems operate in the combinational or exploratory
registers: they recombine known ideas across domain boundaries or search existing conceptual
spaces more thoroughly than any single researcher could. Truly transformational creativity —
generating ideas that require restructuring the rules of a field — remains largely aspirational,
though EURISKO [Lenat 1983], by modifying its own heuristics rather than merely traversing a
fixed space, approached this category within its domain. Surveys of hypothesis generation systems
have noted that many benchmarks measure novelty in a superficial sense rather than the deeper
scientific significance that practitioners care about [Alkan et al. 2025; Shahhosseini et al. 2025].
Shahhosseini et al. [2025] organize LLM-based idea generation methods into five families —
external knowledge augmentation, prompt-based distributional steering, inference-time scaling,
multi-agent collaboration, and parameter-level adaptation — analyzed through both Boden's taxonomy
and Rhodes' 4Ps, finding that combinational novelty is more readily achieved than exploratory or
transformational novelty, and that current evaluation metrics are poorly calibrated to detect this
difference. IdeaBench [Guo et al. 2025] represents a systematic attempt to establish standardized
comparison across systems, while LiveIdeaBench [Ruan et al. 2026] takes a divergent-thinking-
oriented approach — evaluating LLMs' scientific creativity through single-keyword minimal-context
prompts grounded in Guilford's divergent production theory — finding that creativity performance
is only weakly correlated with general intelligence benchmarks. Cox et al. [2025] push back on
the field's tendency to equate creativity support with productivity gain, arguing for frameworks
that center human creative growth rather than output volume.

---

## Empirical Foundations: How Researchers Actually Ideate

A complementary line of work has studied the research ideation process empirically — not to
build tools, but to understand what researchers actually do before any tool is introduced. This
work provides essential grounding for tool design by revealing the cognitive strategies, social
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
randomized controlled experiments showing that LLM assistance has asymmetric effects: it can
expand the range of ideas generated while potentially narrowing the depth of independent engagement.
Bellemare-Pepin et al. [2026] evaluated leading LLMs against over 100,000 human participants on
the Divergent Association Task, finding that advanced models such as GPT-4 exceed average human
performance on associatively diverse output while the most creative human participants maintain a
consistent and statistically significant advantage — suggesting LLMs have become broadly
competent at divergent generation while still falling short of the upper end of human creative
capacity. Liu et al. [2026] probe the agency question directly through a mixed-methods study in
which 54 researchers used an agentic ideation probe at three levels of LLM control, finding that
creativity support is non-linear across control levels and that human effort does not disappear
as AI assumes more generative work — it redirects from generation toward verification and quality
assessment. These empirical findings collectively frame the design challenge: the appropriate
form of computational assistance depends less on raw capability than on how that capability is
structured into the researcher's workflow.

---

## The AI Automation Paradigm: From Expert Systems to Autonomous Research Agents

The emulation goal in AI — building systems that replicate human scientific reasoning autonomously
— predates the LLM era by half a century. The expert systems of the 1970s and 1980s pursued this
goal through symbolic rule-based computation, encoding domain knowledge as logical constraints and
searching for conclusions the rules could generate. BACON [Langley et al. 1987], the most
extensively studied of these programs, rediscovered empirical laws including Kepler's Third Law,
Ohm's Law, and Black's specific heat law by detecting invariant relationships in numeric data
through heuristic search — without domain-specific prior knowledge. DENDRAL [Buchanan et al. 1969]
demonstrated expert-level autonomous hypothesis generation in organic chemistry, using a
plan-generate-test architecture to enumerate and rank molecular structures consistent with mass
spectrometry data. KEKADA [Kulkarni & Simon 1988] pursued a different target: rather than
rediscovering known laws, it modeled the *strategy* of scientific discovery, recreating the path
by which Krebs identified the urea cycle through an experiment-selection heuristic that
prioritized anomalous results. EURISKO [Lenat 1983] extended the ambition further still, inventing
new domain concepts and meta-level heuristics across mathematics, VLSI design, and naval gaming
— approaching transformational creativity in Boden's sense precisely because it modified its own
rules rather than merely traversing a fixed search space. Together these systems established that
the pattern-detection and hypothesis-generation stages of scientific discovery could be
computationally formalized — but only within tightly constrained, well-specified domains.

The LLM era has relaxed that domain specificity dramatically, enabling AI Automation systems that
operate across research areas without hand-coded rules. The AI Scientist [Lu et al. 2024]
provides the canonical example: an end-to-end pipeline in which an LLM generates research ideas,
implements experimental code, runs experiments, analyzes results, and writes a full scientific
paper without human intervention during execution. An automated reviewer agent then evaluates the
generated papers against conference standards. Agent Laboratory [Schmidgall et al. 2025] pursues
similar coverage with an architecture organized around distinct Literature Review, Experimentation,
and Report Writing agents, demonstrating that parallelizing the research pipeline across
specialized agents substantially reduces the cost of running machine learning experiments.
SciAgents [Buehler 2024] grounds this multi-agent architecture in knowledge graph reasoning:
specialized agents traverse a graph built from domain literature, generating hypotheses by
combining concepts that human researchers would be unlikely to bridge across disciplinary distance.
The AI co-scientist [Gottweis et al. 2025] advances this direction through tournament-style
self-play: Generation, Reflection, Ranking, and Evolution agents debate and revise proposals
across many rounds, converging toward hypotheses that domain experts rate substantially higher in
novelty than single-pass systems achieve. Its validation against real-world biomedical tasks —
drug repurposing for acute myeloid leukemia, hypothesis generation for antimicrobial resistance
— represents a qualitative step toward the fully autonomous AI scientist imagined by the emulation
goal. EvoScientist [Lyu et al. 2026] addresses the recurrence problem that plagues static
autonomous pipelines: its Evolution Manager Agent distills interaction histories into persistent
memory modules that carry across independent runs, enabling the system to avoid repeating
unproductive directions without human guidance.

At finer scales, the AI Automation paradigm extends to specialized subtasks within the research
pipeline. LLM-SR [Shojaee et al. 2024] applies LLMs to scientific equation discovery, generating
candidate equations as executable programs and evolving them through evolutionary search guided
by LLM scientific priors — outperforming symbolic regression baselines on physics benchmarks.
AutoDiscovery [Liu & Tegmark 2022] demonstrates that fundamental variables underlying a physical
system can be automatically identified from experimental data alone, without domain knowledge,
by applying information-theoretic criteria. These specialized systems reinforce the core design
logic of the AI Automation paradigm: the researcher defines the problem scope and evaluates
finished outputs; the intermediate scientific work — literature search, hypothesis formation,
candidate generation, evaluation — is executed by the machine.

What unifies AI Automation tools across the expert systems and LLM eras is this transformation
of the researcher's role. In Shneiderman's [2020] framing, these systems pursue the emulation
goal not as an end in itself but as a practical reorganization of the division of scientific labor:
the human researcher becomes a supervisor, goal-setter, and final judge rather than the primary
cognitive agent of discovery. This reorganization raises productive design questions — about what
kinds of goals are best set by humans, what kinds of quality signals require human judgment, and
how the loop from machine output to human evaluation should be structured — that the emerging
generation of AI co-scientist systems is only beginning to address.

---

## Mixed-Initiative Tools: Keeping the Researcher as Creative Agent

Against the AI Automation trajectory, a parallel tradition has pursued the application goal:
building systems that amplify the researcher's own cognitive processes rather than replacing them.
In Horvitz's [1999] framing, mixed-initiative systems maintain shared control — they take on
tasks the user would find tedious or cognitively costly while preserving human authority over
decisions that require contextual judgment, domain expertise, and creative originality. Within
the research ideation domain, mixed-initiative tools sort naturally into two functional clusters
organized by where in the research workflow they intervene.

### Preparatory Scaffolding: Building the Knowledge Foundation

Before any specific research question can be formulated, the researcher must develop a sufficient
understanding of the landscape — surveying prior work, identifying what has been done and where
gaps exist, and building the conceptual vocabulary necessary to think clearly about a problem
space. This preparatory work corresponds to Wallas's preparation stage and to the early cognitive
processes — problem construction, information encoding — that Mumford and colleagues identified
as prerequisites for creative ideation. The tools in this cluster scaffold that preparatory work
without taking it over.

A first group of systems addresses the mechanics of paper discovery and reading. CiteRead
[Rachatasumrit et al. 2022] augments the experience of reading a scientific paper by showing,
inline beside each citation, how that cited paper has been discussed by other works in the corpus
— making the citation ecosystem visible during reading and reducing the need to follow links
outward to understand a paper's significance. CiteSee [Kang et al. 2023] complements this with
a personalized history overlay: visual markers encode which cited papers the reader has already
opened, annotated, or saved, reducing the cognitive overhead of tracking what is already known
across a session. Passage [Kang et al. 2023] shifts the granularity of discovery from the paper
level to the passage level, allowing researchers to bookmark specific text passages as the unit
of interest and using those passage collections to recommend new papers whose specific arguments
— not just overall topic — match what the researcher is attending to. Together these three systems
represent a systematic effort to reduce friction in the information foraging phase, each targeting
a different bottleneck: citation orientation (CiteRead), prior-knowledge tracking (CiteSee), and
argument-level specificity (Passage).

A second group of tools addresses the problem of discovering relevant work in the first place.
ComLittee [Kang et al. 2023] anchors paper discovery in researcher taste rather than keyword
matching: a personal "committee" of selected authors, whose papers best represent the researcher's
intellectual interests, drives recommendation and search ranking. Relatedly [Choi et al. 2022]
takes a different approach to the same problem, repurposing existing related work sections from
papers in the corpus — using prior authors' organizational work as a lens for discovering what
a new researcher has missed. PaperWeaver [Lee et al. 2024] contextualizes recommended papers
through personally meaningful connections rather than relevance ranking alone, scaffolding the
sensemaking work that converts a large paper set into usable knowledge. These systems share a
common design logic: rather than asking the researcher to specify what they want through queries,
they infer relevant interests from the researcher's existing intellectual identity and past
reading behavior.

The sensemaking dimension of preparation — making sense of what has been found, not just finding
it — is addressed most directly by tools that scaffold the organization and interpretation of
accumulated reading. Threddy [Fok et al. 2023] helps researchers build and navigate personalized
threads: topically coherent paths through the corpus that connect thematically related works
across time and venue, externalizing the researcher's evolving understanding of a topic as a
navigable artifact. Synergi [Kang et al. 2023] operates at a similar level, helping scholars
build thematic threads across multiple papers and making the system's surface of connections
visible while leaving meaning-making firmly with the researcher. Both systems exemplify a
principle common to preparatory scaffolding designs: the computational contribution is structural
— surfacing connections, organizing accumulations — while the interpretive contribution is the
researcher's. SearchIdea [Chavula et al. 2023] bridges from this preparatory cluster toward the
generative one: its cluster and compare views scaffold the sensemaking that emerges from academic
search, while its Idea Board gives researchers a canvas for organizing emergent insights into
nascent research directions — a transitional affordance between building knowledge and beginning
to formulate what to investigate.

### Generative Support: Scaffolding the Formulation of Ideas

The generative cluster of mixed-initiative tools intervenes at a later stage in the research
workflow — once the researcher has sufficient background to begin defining a specific inquiry.
These tools correspond to Wallas's illumination stage, supporting the cognitive work of problem
framing, hypothesis formation, and research planning. Unlike AI Automation systems, which execute
this work autonomously, generative support tools keep the researcher in a directing role: the
human steers what to investigate while computation expands the conceptual reach available for
doing so.

Research question formulation is the earliest target in this cluster. CoQuest [Liu et al. 2024]
uses processing delays as a design feature: by introducing intentional pauses before surfacing
LLM-generated suggestions during research question co-creation, the system gives users time to
think independently before being anchored by AI output. This counterintuitive intervention
significantly improves the quality of final research questions — highlighting a tension common
to all generative support systems, where fast AI assistance can short-circuit the slower
incubation processes that produce genuinely original human ideas. The delay mechanism makes
the temporal structure of cognition an explicit design consideration.

Perspective diversity is a second design target for generative support. PersonaFlow [Liu et al.
2025] scaffolds research ideation by presenting LLM-simulated expert perspectives as structured
prompts, enabling researchers to consider viewpoints from disciplines outside their own while
retaining authorship of the resulting directions. Perspectra [Liu et al. 2025] extends this
through a multi-agent forum where users select domain-expert LLM personas that deliberate and
critique while the researcher steers the conversation and evaluates outputs. Scideator [Radensky
et al. 2026] takes a facet-based approach: it extracts structured components (purposes,
mechanisms, evaluations) from seed papers the researcher provides, recombines them systematically
to generate novel research ideas, and evaluates their novelty against the literature — positioning
the human as input provider and output evaluator while the system performs the combinational
search between. Idea-Catalyst [Kargupta et al. 2026] revisits cross-domain inspiration through
a metacognition-driven framing: it analyzes the target domain to identify persistent unresolved
challenges, abstracts those challenges into domain-agnostic forms, and retrieves insights from
external disciplines whose prior solutions could transfer. These cross-domain systems — whether
structuring perspectives, recombining facets, or bridging disciplines — operate at the Combinational
end of Boden's creativity taxonomy: their computational contribution is novel juxtaposition, while
the evaluative and appropriative work remains human.

A final group of generative support tools addresses not just what to investigate but how to
pursue it. IdeaSynth [Pu et al. 2025] exemplifies a hybrid distribution of authorship: researchers
decompose their nascent ideas into modular facets as nodes on a canvas, and receive literature-
grounded LLM feedback at each node and across the canvas as a whole. The researcher authors all
facets, but the LLM's feedback substantively shapes what gets written next — redirecting problem
framing, surfacing tensions with prior work, and prompting elaboration the researcher would not
have reached alone. User evaluations found participants articulated more specific and grounded
research briefs; the study assessed perceived specificity and groundedness but did not include
a direct measure of authorship attribution for co-created content. Cocoa [Feng et al. 2026]
extends mixed-initiative design to longer-horizon planning tasks where the researcher must
interleave ideation with execution: rather than delivering a discrete output for human review,
the system enables continuous co-steering, with the researcher intervening, redirecting, and
executing alongside the agent at multiple stages. This represents a shift from human-as-evaluator
to human-as-co-planner, a model that keeps more of the research process under active human
authority while still leveraging AI for exploration and execution.

Alongside these direct scaffolding tools, a substantial body of work has produced systems that
generate research hypotheses or ideas for human evaluation — occupying the mixed-initiative
space between pure scaffolding and full automation. SciMON [Wang et al. 2024] optimizes
explicitly for novelty by retrieving inspiration from cross-domain literature; IRIS and
Chain-of-Ideas [Li et al. 2025] iterate through idea spaces grounded in how fields have evolved
over time, constructing progressive idea chains that reflect the trajectory of prior work rather
than treating the literature as a flat knowledge base. ResearchAgent [Baek et al. 2025] iteratively
generates, refines, and critiques ideas in a continuous loop over the scientific literature,
functioning as an autonomous ideation engine that escalates through cycles of self-improvement.
These systems occupy a gradient between generative support and AI Automation depending on the
degree of researcher involvement in directing each ideation step.

---

## Open Tensions and the Design Frontier

The body of work reviewed here reveals both substantial progress and persistent tensions that
will define the next phase of the field. At the level of the design spectrum itself, the
relationship between AI Automation and Mixed-Initiative approaches is not simply competitive —
the two paradigms address different problems and serve different moments in the research process.
Even as autonomous agents take on more of the generative labor, preparatory scaffolding tools
remain essential: researchers must still build the knowledge foundation and exercise the contextual
judgment required to set worthwhile problems and evaluate machine-generated proposals. The design
frontier may lie not in pushing further toward either extreme but in understanding how to integrate
the two paradigms within a coherent workflow — how preparatory scaffolding can inform the problem
specifications that autonomous agents receive, and how AI-generated proposals can be channeled
back into the researcher's sensemaking process rather than delivered as flat outputs to approve
or reject. Gridach et al. [2025], surveying agentic AI systems across the full scientific
discovery pipeline, have begun to map this integration challenge.

Several other tensions cut across the paradigm distinction. The first concerns evaluation. Despite
a proliferation of benchmarks [Guo et al. 2025; Ruan et al. 2026] and surveys [Alkan et al. 2025;
Shahhosseini et al. 2025], there is no consensus on what makes a research idea good. Novelty,
feasibility, significance, and testability point in different directions and are routinely
conflated in benchmark design. Cox et al. [2025] argue that the field has been measuring outputs
when it should be measuring creative development — the harder but more meaningful target of
whether a tool makes researchers more capable thinkers over time.

The second tension concerns agency. Empirical work consistently finds that the same LLM capability
that expands ideation when used collaboratively can narrow independent thinking when used
passively [Kumar et al. 2025; Wan et al. 2024]. The CoQuest delay mechanism [Liu et al. 2024]
offers one design response, but the general problem — how to structure AI assistance so that it
augments rather than displaces the researcher's own cognitive engagement — remains an open design
question. This tension is particularly acute for systems on the AI Automation end of the spectrum,
where the researcher may lack the cognitive engagement with the generative process that is needed
to critically evaluate its outputs.

The third tension is ethical. As AI-assisted ideation tools mature, the boundaries of intellectual
contribution, credit, and originality in research become harder to draw [Kapania et al. 2025;
Liu et al. 2026]. A tool that generates a hypothesis the researcher refines into a publishable
finding occupies a fundamentally ambiguous position in the scholarly economy — one that existing
norms have not caught up with. This ambiguity intensifies as the AI Automation paradigm matures:
when an autonomous system generates, tests, and writes up a finding, what credit, if any, belongs
to the researcher who set the initial goal? Together these tensions suggest that the most important
next contributions to AI-assisted research ideation may be not technical but evaluative, social,
and institutional.

---

*Note: Citations use [Author et al. Year] format throughout. Where multiple authors from the same
group appear (e.g., Liu et al. 2025a/b), the suffixes distinguish papers by year; these should
be resolved to specific venues in the final manuscript.*
