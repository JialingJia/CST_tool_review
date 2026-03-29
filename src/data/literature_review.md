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
what we call *AI Automation* tools: systems in which the machine autonomously conducts some or
all of the creative scientific work — hypothesis generation, experimental planning, literature
synthesis — while the researcher serves primarily as goal-setter and final evaluator. On the other
sit *Mixed-Initiative* tools in the sense of Horvitz [1999]: systems that keep the researcher as
the primary creative agent, using computation to extend cognitive reach without transferring the
generative act to the machine.

Between and within these poles, the design space is further structured by the temporal position
of a tool in the research workflow. Work in this corpus clusters naturally around four ideation
stages: *information foraging*, in which researchers navigate and absorb existing knowledge;
*problem framing*, in which they define and sharpen the questions worth investigating; *analysis
and sensemaking*, in which they interpret accumulated evidence; and *research planning*, in which
they design the methodology for executing their inquiry. Mixed-initiative tools tend to target
one or two of these stages deliberately, while AI Automation systems vary from targeting a single
stage autonomously to spanning the full pipeline. This review maps the corpus of AI-assisted
research ideation tools across these distinctions, attending throughout to what each design choice
implies for the role of the human researcher.

---

## Theoretical Grounding: Defining Scientific Creativity

Before tools can support scientific creativity, the field needs to know what it is supporting.
At its most foundational, scientific creativity refers to the capacity to generate ideas,
hypotheses, or frameworks that are both novel and valuable within a scientific domain. Getzels
and Csikszentmihalyi [1967] offered an influential early account that locates this capacity not
primarily in problem-solving ability — arriving at a correct answer to a well-formed question —
but in *problem finding*: the disposition to identify problems worth pursuing in the first place.
On this view, what distinguishes creative scientists from merely capable ones is the ability to
sense gaps, tensions, and anomalies that others overlook and to formulate them as tractable
scientific questions. This problem-finding conception shifts the locus of scientific creativity
upstream, from the formal machinery of hypothesis testing to the largely tacit process of
deciding what is worth investigating at all — a shift with direct implications for how any
supporting tool should be designed.

Several strands of theoretical work have since tackled this question from complementary angles.
Hsueh et al. [2024] apply the 4Ps framework — product, process, person, press — to HCI
specifically, showing that researchers often talk past each other because they are measuring
different aspects of creativity. A parallel conceptual debate examines whether AI systems can
qualify as creative at all. Chakrabarty et al. [2024] argue that genuine creativity demands
intentionality, risk-taking, and contextual meaning that current LLMs do not exhibit despite
their surface fluency; on this account, computational systems produce the appearance of creative
output without the underlying epistemic commitment. Chen et al. [2024] take a more optimistic
position, proposing a theoretical framework in which AI functions as a catalyst for scientific
creativity — an accelerant that enables novel combinations humans would not reach alone, even if
it does not itself constitute a creative agent. Cox et al. [2025] reframe the evaluation question
entirely, arguing that the field has focused on measuring creative outputs — the volume and
novelty of generated ideas — when it should be measuring creative development: whether tool use
makes researchers more capable thinkers over time.

The computational creativity tradition, particularly Boden's taxonomy of combinational, exploratory,
and transformational creativity, has provided a common vocabulary for classifying what different
tools actually do. Combinational creativity produces novel juxtapositions of previously unconnected
ideas; exploratory creativity systematically traverses a defined conceptual space to surface what
is possible within it; transformational creativity restructures the conceptual space itself by
relaxing or inverting its fundamental rules. Most contemporary LLM-based systems operate in the
combinational or exploratory registers. EURISKO [Lenat 1983] approached the transformational
category within its domain, as discussed below, and remains the clearest historical example of
machine-generated structural change to a conceptual space. Surveys of hypothesis generation
systems have observed that many current benchmarks measure novelty in a superficial sense rather
than the deeper scientific significance practitioners care about [Alkan et al. 2025; Shahhosseini
et al. 2025]. Shahhosseini et al. [2025] organize LLM-based idea generation methods into five
families — external knowledge augmentation, prompt-based distributional steering, inference-time
scaling, multi-agent collaboration, and parameter-level adaptation — finding that combinational
novelty is more readily achieved than exploratory or transformational novelty and that current
evaluation metrics are poorly calibrated to detect this difference. IdeaBench [Guo et al. 2025]
represents a systematic attempt at standardized comparison across hypothesis generation systems.
LiveIdeaBench [Ruan et al. 2026] takes a divergent-thinking-oriented approach — evaluating LLMs'
scientific creativity through single-keyword minimal-context prompts grounded in Guilford's theory
— and finds that creativity performance is only weakly correlated with general intelligence
benchmarks, underscoring the distinctiveness of creative ideation as a cognitive demand.

Two broader analyses situate this tool landscape in the context of the scientific research
enterprise as a whole. Krenn et al. [2022] survey the trajectory from automated equation
discovery systems through modern autonomous research agents, proposing "Popper" as a conceptual
framework for automated hypothesis generation and falsification loops grounded in Popperian
philosophy of science — a framework that anticipates the design logic of the AI Automation systems
reviewed below. Ye et al. [2025] offer an HCI-oriented complement, analyzing the design space
of recent AI-assisted research tools specifically across ideation, sensemaking, and scientific
creativity dimensions, taxonomizing tool capabilities by interaction mode and automation level.
Zhao et al. [2025], focusing on writing support tools rather than research ideation per se,
provide a comparative taxonomy linking AI writing tools to specific writer needs and stages — a
useful reference point for understanding where ideation-focused tools end and writing-assistance
tools begin.

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
randomized controlled experiments showing that LLM assistance has asymmetric effects: it can
expand the range of ideas generated (divergent thinking) while potentially narrowing the depth
of independent engagement with any single direction. Bellemare-Pepin et al. [2026] evaluated
leading LLMs against over 100,000 human participants on the Divergent Association Task, finding
that advanced models such as GPT-4 exceed average human performance on associatively diverse
output while the most creative human participants maintain a consistent and statistically
significant advantage — suggesting LLMs have achieved broad competence at divergent generation
while still falling short of the upper end of human creative capacity. Liu et al. [2026] probe
the agency question directly through a mixed-methods study in which 54 researchers used an
agentic ideation probe at three levels of LLM control, finding that creativity support is
non-linear across control levels and that human effort does not disappear as AI assumes more
generative work — it redirects from generation toward verification and quality assessment.
Kapania et al. [2025] provide an ethical complement to this picture, documenting how HCI
researchers navigate the ethical tensions of using LLMs in their own research practice — tensions
between efficiency gains and concerns about intellectual integrity that are not yet resolved by
any community norm.

Together these empirical findings frame the design challenge: the appropriate form of
computational assistance depends less on raw capability than on how that capability is structured
into the researcher's workflow and what residual cognitive demands it leaves with the human.

---

## The AI Automation Paradigm: From Expert Systems to Autonomous Research Agents

### Expert Systems: The First Generation of Autonomous Discovery

The emulation goal in AI — building systems that replicate human scientific reasoning autonomously
— predates the LLM era by half a century. The expert systems of the 1970s and 1980s pursued
this goal through symbolic rule-based computation, encoding domain knowledge as logical constraints
and searching for conclusions the rules could generate. BACON [Langley et al. 1987], the most
extensively studied of these programs, rediscovered empirical laws including Kepler's Third Law,
Ohm's Law, and Black's specific heat law by detecting invariant relationships in numeric data
through heuristic search — without domain-specific prior knowledge. DENDRAL [Buchanan et al.
1969] demonstrated expert-level autonomous hypothesis generation in organic chemistry, using a
plan-generate-test architecture to enumerate and rank molecular structures consistent with mass
spectrometry data. Where BACON made sense of numeric observations and DENDRAL interpreted
spectral evidence, KEKADA [Kulkarni and Simon 1988] targeted the strategy of scientific discovery
itself: rather than rediscovering known laws, it modeled the path by which Krebs identified the
urea cycle through an experiment-selection heuristic that prioritized anomalous results —
capturing not just what scientists discover but how they decide what to investigate next.
EURISKO [Lenat 1983] extended the ambition further still, inventing new domain concepts and
meta-level heuristics across mathematics, VLSI design, and naval gaming; because it modified its
own rules rather than merely traversing a fixed search space, it approached transformational
creativity in Boden's sense. Together these systems established that pattern detection, hypothesis
generation, and discovery strategy could be computationally formalized — but only within tightly
constrained, well-specified domains.

### LLM-Based Hypothesis Generation

The LLM era relaxed the domain specificity constraint dramatically, enabling systems that generate
research hypotheses and ideas across research areas without hand-coded rules. This cluster of
work is large and internally diverse; what unifies it is the core Type 2 design logic: the system
generates a space of ideas or hypotheses, and the human researcher evaluates, selects, and adapts
from that space.

A substantial body of work exploits the combinational creativity afforded by LLMs' broad
interdisciplinary training. Early demonstrations showed that LLMs could generate plausible
scientific hypotheses zero-shot [Qi et al. 2023] and produce creative research questions by
blending concepts across HCI subfields [Liu et al. 2023], simply by leveraging the cross-domain
knowledge encoded during pretraining. SciMON [Wang et al. 2024] formalizes this intuition,
retrieving cross-domain inspiration explicitly to optimize for novelty in generated scientific
ideas. Sparks of Science [O'Neill et al. 2025] grounds hypothesis generation in structured
metadata — extracted methods, datasets, and results from existing papers — using that grounding
to constrain LLM output toward feasible and testable directions. PaperRobot [Wang et al. 2019],
an early instantiation of this approach, autonomously generates scientific paper sections including
background reviews and future work directions by reading existing papers, treating the literature
as raw material for open-ended combinational recombination. Literature meets data [Liu et al.
2025] extends this further, finding that including empirical datasets alongside literature in
the generation context boosts the feasibility of generated hypotheses — suggesting that
combinational creativity in scientific ideation benefits from grounding not just in prior claims
but in prior evidence. Many-heads-are-better [Su et al. 2025] applies the same combinational
principle through multi-agent diversity: specialized agents simulating scientist, critic, and
reviewer roles each contribute distinct conceptual perspectives, with the diversity of viewpoints
driving richer recombination than any single model would produce. The analogical search engine
of Kang et al. [2022] takes a structurally similar approach in the information foraging stage,
retrieving solutions from distant scientific domains that are structurally analogous to the
user's problem — letting the system generate the cross-domain connections while the researcher
decides what to transfer. Spinneret [Bae et al. 2020] surfaces non-obvious concept associations
through computational similarity search to seed human creative thinking, positioning the generated
associations as starting points rather than finished ideas.

A second group of systems targets exploratory creativity — systematic traversal of a defined
research idea space. DeepReport [Xu et al. 2025] mines scientific literature to autonomously
generate structured research ideas for human evaluation, while Nova [Hu et al. 2024] employs
an iterative planning-and-search methodology that drives LLMs to explore more novel and diverse
directions than standard generation produces. HARPA [Vasu et al. 2025] integrates testability
as an explicit constraint, incorporating criteria for experimental feasibility and adaptive
feedback from prior outcomes into the generation loop so that explored ideas remain scientifically
actionable. Hypothesis Search [Wang et al. 2023] formalizes the exploration as a search problem,
with LMs systematically enumerating and testing candidate hypotheses against inductive reasoning
tasks. Zhou et al. [2024] investigate the quality, novelty, and plausibility of machine-generated
hypotheses relative to human-authored ones, providing an early empirical baseline for this class
of system. ResearchAgent [Baek et al. 2025] and IRIS [Garikaparthi et al. 2025] both operate
as iterative ideation engines: ResearchAgent continuously mines literature to generate and
self-critique research ideas in an autonomous loop, while IRIS emphasizes transparency — making
the evidence trail behind each generated hypothesis visible so researchers can assess the
reasoning, not just the output. Chain of Ideas [Li et al. 2025] constructs a progressive chain
through a research field's trajectory, generating ideas at the frontier of that chain by modeling
the developmental logic of the field rather than treating literature as a flat knowledge base.
Deep Ideation [Zhao et al. 2024] integrates LLM agents with a scientific concept network built
from keyword co-occurrence across a large paper corpus, generating ideas through an
explore-expand-evolve workflow reinforced by a critic trained on real reviewer feedback. The
minimum Bayes risk decoding approach of Jinnai et al. [2024] addresses a methodological problem
common to all of these systems: the tendency of LLMs toward repetitive, low-diversity generation.
By optimizing simultaneously for quality and diversity in the decoding process, it enables
ideation systems to produce varied idea sets rather than converging on a single direction.

Two systems in this cluster target the problem framing stage from a specialized angle. The
automated error discovery work of Petrak et al. [2025] applies systematic computational
exploration to surface blind spots in conversational AI systems — failure modes that human testers
overlook — framing the discovery of AI limitations as itself a scientific ideation task. TreeQuestion
[Cheng et al. 2024], which generates hierarchically structured assessment questions from course
material, extends the LLM-as-generator logic into an educational context, demonstrating that the
Type 2 design pattern extends naturally beyond hypothesis generation to other forms of knowledge
construction. Similarly, Augmenting Research Ideation with Data [Liu et al. 2025] empirically
investigates whether providing social science data alongside literature during ideation improves
idea quality — finding that data augmentation improves feasibility without reducing novelty —
and in doing so frames ideation quality assessment as an open research question in its own right.

### Full-Pipeline Autonomous Research Agents

While the hypothesis generation systems above produce ideas for human evaluation, a second wave
of LLM-era systems pursues the full AI Automation vision: autonomous execution of the complete
research pipeline from problem identification through experimental execution and paper writing.

The AI Scientist [Lu et al. 2024] provides the canonical example of this design: an end-to-end
pipeline in which an LLM generates research ideas, implements experimental code, runs experiments,
analyzes results, and produces a complete scientific paper without human intervention. An
automated reviewer agent evaluates the generated papers against conference standards. Agent
Laboratory [Schmidgall et al. 2025] pursues similar scope with an architecture organized around
distinct Literature Review, Experimentation, and Report Writing agents, demonstrating that
parallelizing the research pipeline across specialized agents substantially reduces the cost of
running machine learning experiments while maintaining paper quality. SciAgents [Buehler 2024]
grounds multi-agent research generation in knowledge graph reasoning: specialized agents traverse
a graph built from domain literature, generating hypotheses by combining concepts that cross
disciplinary distance that no single researcher would routinely bridge. The AI co-scientist
[Gottweis et al. 2025] advances this direction through tournament-style self-play, in which
Generation, Reflection, Ranking, and Evolution agents debate and revise proposals across many
rounds, converging on hypotheses that domain experts rate substantially higher in novelty than
single-pass systems achieve. Its validation on real biomedical discovery tasks — drug repurposing
for acute myeloid leukemia, antimicrobial resistance hypotheses — represents a qualitative step
toward the fully autonomous scientific agent imagined by the emulation goal. EvoScientist
[Lyu et al. 2026] addresses the recurrence problem that plagues static autonomous pipelines: its
Evolution Manager Agent distills interaction histories into persistent ideation and experimentation
memory modules that carry across independent runs, enabling the system to avoid repeating
unproductive directions without human guidance. Gridach et al. [2025], surveying agentic AI
systems across the full scientific discovery pipeline, map this integration challenge and identify
reliability, literature automation, and ethical accountability as the central open problems for
this paradigm.

### Specialized Autonomous Discovery

At finer scales, the AI Automation paradigm extends to specialized subtasks within the research
pipeline. LLM-SR [Shojaee et al. 2024] applies LLMs to scientific equation discovery, generating
candidate equations as executable programs and evolving them through evolutionary search guided
by LLM scientific priors — substantially outperforming symbolic regression baselines on physics
benchmarks and recovering correct closed-form equations for Kepler's third law and pendulum
dynamics from noisy data. AutoDiscovery [Liu and Tegmark 2022] demonstrates that the fundamental
variables underlying a physical system can be automatically identified from experimental
measurements alone, without domain knowledge, by applying information-theoretic criteria —
autonomously determining what variables matter before hypothesis generation even begins. These
specialized systems reinforce the core design logic of the AI Automation paradigm: the researcher
defines the problem scope and evaluates finished outputs, while the intermediate scientific work
is executed by the machine.

What unifies AI Automation tools across the expert systems and LLM eras is this transformation
of the researcher's role. In Shneiderman's framing, these systems pursue the emulation goal not
as an end in itself but as a practical reorganization of the division of scientific labor: the
human researcher becomes a supervisor, goal-setter, and final judge rather than the primary
cognitive agent of discovery. This reorganization raises productive design questions — about what
kinds of goals are best set by humans, what kinds of quality signals require human judgment, and
how the loop from machine output to human evaluation should be structured — that the emerging
generation of autonomous co-scientist systems is only beginning to address.

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
space. The tools in this cluster scaffold that preparatory work without taking it over.

A first group of systems addresses the mechanics of paper discovery and reading. CiteRead
[Rachatasumrit et al. 2022] augments the experience of reading a scientific paper by showing,
inline beside each citation, how that cited paper has been discussed by other works in the corpus
— making the citation ecosystem visible during reading and reducing the need to follow links
outward to understand a paper's significance. CiteSee [Kang et al. 2023a] complements this with
a personalized history overlay: visual markers encode which cited papers the reader has already
opened, annotated, or saved, reducing the cognitive overhead of tracking what is already known
across a session. Passage [Kang et al. 2023b] shifts the granularity of discovery from the paper
level to the passage level, allowing researchers to bookmark specific text passages as the unit
of interest and using those passage collections to recommend new papers whose specific arguments
— not just overall topic — match what the researcher is attending to. Together these three systems
represent a systematic effort to reduce friction in the information foraging phase, each targeting
a different bottleneck: citation orientation (CiteRead), prior-knowledge tracking (CiteSee), and
argument-level specificity (Passage).

A second group of tools addresses the problem of discovering relevant work in the first place.
ComLittee [Kang et al. 2023c] anchors paper discovery in researcher taste rather than keyword
matching: a personal "committee" of selected authors, whose papers best represent the researcher's
intellectual interests, drives recommendation and search ranking. Relatedly [Choi et al. 2022]
takes a different approach to the same problem, repurposing existing related work sections from
papers in the corpus — using prior authors' organizational work as a lens for discovering what
a new researcher has missed. PaperWeaver [Lee et al. 2024] contextualizes newly recommended
papers through personally meaningful connections to the researcher's own collection, scaffolding
the sensemaking work that converts a large paper set into usable knowledge. These systems share
a common design logic: rather than asking the researcher to specify what they want through queries,
they infer relevant interests from the researcher's existing intellectual identity and past reading
behavior.

The sensemaking dimension of preparation — making sense of what has been found, not just finding
it — is addressed most directly by tools that scaffold the organization and interpretation of
accumulated reading. Threddy [Fok et al. 2023] helps researchers build and navigate personalized
"threads": topically coherent paths through the corpus that connect thematically related works
across time and venue, externalizing the researcher's evolving understanding of a topic as a
navigable artifact. Synergi [Kang et al. 2023d] operates at a similar level, helping scholars
build thematic threads across multiple papers and making the system's surface of connections
visible while leaving meaning-making firmly with the researcher. Fuzzy Linkography [Smith et al.
2025] extends sensemaking in a retrospective direction: rather than helping researchers make
sense of the literature they are reading, it generates automated graphical summaries of recorded
creative activity traces, enabling researchers and creators to reflect on their own ideation
process after the fact. Ford and Bryan-Kinns [2023] develop and validate a reflective experience
questionnaire instrument that gives researchers a structured scaffold for self-assessing their
creative process — a lighter-weight but conceptually related tool for making the process of
creative work itself legible. SearchIdea [Chavula et al. 2023] bridges from this preparatory
cluster toward the generative one: its cluster and compare views scaffold the sensemaking that
emerges from academic search, while its Idea Board gives researchers a canvas for organizing
emergent insights into nascent research directions — a transitional affordance between building
knowledge and beginning to formulate what to investigate.

### Generative Support: Scaffolding the Formulation of Ideas

The generative cluster of mixed-initiative tools intervenes at a later stage in the research
workflow — once the researcher has sufficient background to begin defining a specific inquiry.
These tools correspond to Wallas's illumination stage, supporting the cognitive work of problem
framing, hypothesis formation, and research planning. Unlike AI Automation systems, which execute
this work autonomously, generative support tools keep the researcher in a directing role: the
human steers what to investigate while computation expands the conceptual reach available for
doing so. Most tools in this cluster are hybrid designs, combining Type 1 scaffolding elements
with Type 2 generative elements in ways that distribute authorship between human and machine.

Research question formulation is the earliest target in this cluster. CoQuest [Liu et al. 2024]
uses processing delays as a design feature: by introducing intentional pauses before surfacing
LLM-generated suggestions during research question co-creation, the system gives users time to
think independently before being anchored by AI output — significantly improving the quality of
final research questions. This counterintuitive intervention makes the temporal structure of
cognition an explicit design consideration, and highlights a tension common to all generative
support systems: fast AI assistance can short-circuit the slower incubation processes that produce
genuinely original human ideas.

Perspective diversity is a second design target for generative support. PersonaFlow [Liu et al.
2025a] scaffolds research ideation by presenting LLM-simulated expert perspectives as structured
prompts, enabling researchers to consider viewpoints from disciplines outside their own while
retaining authorship of the resulting directions. Perspectra [Liu et al. 2025b] extends this
through a multi-agent forum where users select domain-expert LLM personas that deliberate and
critique while the researcher steers the conversation and evaluates outputs. These multi-agent
perspective tools occupy a hybrid position in the design space: the system generates the
disciplinary viewpoints and produces critiques (Type 2), while the researcher selects which
experts to convene, sets the agenda, and retains final judgment (Type 1). They produce
Combinational creativity — novel juxtaposition of domain perspectives — while keeping the
evaluative and appropriative work human.

A third design approach targets structured facet recombination. Scideator [Radensky et al. 2026]
extracts structured components — purposes, mechanisms, evaluations — from seed papers the
researcher provides, recombines them systematically to generate novel research ideas, and evaluates
their novelty against the literature, positioning the human as input provider and output evaluator
while the system performs the combinational search between. Idea-Catalyst [Kargupta et al. 2026]
revisits cross-domain inspiration through a metacognition-driven framing: it analyzes the target
domain to identify persistent unresolved challenges, abstracts those challenges into domain-agnostic
forms, and retrieves insights from external disciplines whose prior solutions could transfer —
making the retrieval of analogical inspiration more strategic than free-form cross-domain search.

A final group of generative support tools addresses not just what to investigate but how to
pursue it. IdeaSynth [Pu et al. 2025] exemplifies a hybrid distribution of authorship: researchers
decompose their nascent ideas into modular facets as nodes on a canvas, and receive literature-
grounded LLM feedback at each node and across the canvas as a whole. The researcher authors all
facets, but the LLM's feedback substantively shapes what gets written next — redirecting problem
framing, surfacing tensions with prior work, and prompting elaboration the researcher would not
have reached alone. User evaluations found participants articulated more specific and grounded
research briefs, though the study did not include a direct measure of authorship attribution for
co-created content. Cocoa [Feng et al. 2026] extends mixed-initiative design to longer-horizon
planning tasks where the researcher must interleave ideation with execution: rather than
delivering a discrete output for human review, the system enables continuous co-steering, with
the researcher intervening, redirecting, and executing alongside the agent at multiple stages.
This represents a shift from human-as-evaluator to human-as-co-planner — a model that keeps more
of the research process under active human authority while still leveraging AI for exploration
and execution. TreeQuestion [Cheng et al. 2024], while focused on educational assessment rather
than research ideation proper, demonstrates that the same mixed-initiative logic of LLM-generated
output plus human review extends naturally to question construction and conceptual assessment.

---

## Open Tensions and the Design Frontier

The body of work reviewed here reveals both substantial progress and persistent tensions that will
define the next phase of the field. At the level of the design spectrum itself, the relationship
between AI Automation and Mixed-Initiative approaches is not simply competitive — the two paradigms
address different problems and serve different moments in the research process. Even as autonomous
agents take on more of the generative labor, preparatory scaffolding tools remain essential:
researchers must still build the knowledge foundation and exercise the contextual judgment required
to set worthwhile problems and evaluate machine-generated proposals. The design frontier may lie
not in pushing further toward either extreme but in understanding how to integrate the two
paradigms within a coherent workflow — how preparatory scaffolding informs the problem
specifications that autonomous agents receive, and how AI-generated proposals can be channeled
back into the researcher's sensemaking process rather than delivered as flat outputs to approve
or reject. Gridach et al. [2025], surveying agentic AI systems across the full scientific
discovery pipeline, and Ye et al. [2025], mapping the design space of AI-assisted research tools,
have begun to map this integration challenge from complementary perspectives.

Several other tensions cut across the paradigm distinction. The first concerns evaluation. Despite
a proliferation of benchmarks [Guo et al. 2025; Ruan et al. 2026] and surveys [Alkan et al.
2025; Shahhosseini et al. 2025], there is no consensus on what makes a research idea good.
Novelty, feasibility, significance, and testability are routinely conflated in benchmark design.
Cox et al. [2025] argue that the field has been measuring outputs when it should be measuring
creative development — the harder but more meaningful target of whether a tool makes researchers
more capable thinkers over time. The difficulty of operationalizing this criterion is itself an
open research problem.

The second tension concerns agency. Empirical work consistently finds that the same LLM capability
that expands ideation when used collaboratively can narrow independent thinking when used passively
[Kumar et al. 2025; Wan et al. 2024]. The CoQuest delay mechanism [Liu et al. 2024] offers one
design response, but the general problem — how to structure AI assistance so that it augments
rather than displaces the researcher's own cognitive engagement — remains open. This tension is
particularly acute for systems on the AI Automation end of the spectrum, where the researcher may
lack the cognitive engagement with the generative process needed to critically evaluate its outputs.
Liu et al. [2026] find that human effort does not disappear as AI assumes more generative work,
but redirects toward verification and quality assessment — a shift that raises its own questions
about whether verification skill is cultivated or eroded by increasing reliance on AI-generated
proposals.

The third tension is ethical. As AI-assisted ideation tools mature, the boundaries of intellectual
contribution, credit, and originality in research become harder to draw [Kapania et al. 2025;
Liu et al. 2026]. A tool that generates a hypothesis the researcher refines into a publishable
finding occupies a fundamentally ambiguous position in the scholarly economy — one that existing
norms have not caught up with. This ambiguity intensifies as the AI Automation paradigm matures:
when an autonomous system generates, tests, and writes up a finding, what credit, if any, belongs
to the researcher who set the initial goal? Together these tensions suggest that the most important
next contributions to AI-assisted research ideation may be not technical but evaluative, social,
and institutional — a conclusion with direct implications for how this corpus of tools should
be studied, compared, and ultimately adopted.

---

*Note: Citations use [Author et al. Year] format throughout. Where multiple papers by the same
first author share a year, letter suffixes (a/b/c/d) distinguish them and should be resolved to
specific venues in the final manuscript.*
