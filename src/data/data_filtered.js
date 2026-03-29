// ── CST-CATEGORIZED: Research Ideation Tools ────────────────────────────────
// Source: research_ideation_tools.json (46 papers)
// Taxonomy: Type 1          = Scaffolding Human Cognitive Processes
//           Type 2          = Computational Creativity with Human as Evaluator
//           Survey / Theory = Survey, benchmark, taxonomy, or conceptual/theoretical paper
//           Empirical Study = User study, experiment, or field study (no tool artifact)
// Research stages (Type 1 & hybrid tools): Information Foraging | Problem Framing
//                                          Analysis & Sensemaking | Research Planning
// Added field: venue (publication venue)
// ─────────────────────────────────────────────────────────────────────────────

export const filteredData = [

  // ── ENTRY 1 ──────────────────────────────────────────────────────────────
  {
    id: "f1",
    title: "Understanding creative thinking processes in searching for new ideas",
    authors: ["Chavula, C.", "Choi, Y.", "Rieh, S.Y."],
    year: 2022,
    venue: "ACM SIGIR Conference on Human Information Interaction and Retrieval (CHIIR)",
    url: "http://dx.doi.org/10.1145/3498366.3505783",
    core_contributions: "Empirical investigation of how humans engage in creative thinking while searching for new ideas in academic contexts, identifying cognitive strategies and information-seeking patterns that support ideation.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Incubation"],
    bodens_types: []
  },

  // ── ENTRY 2 ──────────────────────────────────────────────────────────────
  {
    id: "f2",
    title: "The philosopher's stone for science – the catalyst change of AI for scientific creativity",
    authors: ["Chen, Q.", "Ho, Y.J.", "Sun, P.", "Wang, D."],
    year: 2024,
    venue: "SSRN Electronic Journal",
    url: "http://dx.doi.org/10.2139/ssrn.4749118",
    core_contributions: "Conceptual investigation of whether AI serves as a catalyst for scientific creativity, proposing a theoretical framework for understanding AI's role across different types of creative scientific work.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Incubation", "Illumination", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 3 ──────────────────────────────────────────────────────────────
  {
    id: "f3",
    title: "DeepReport: An AI-assisted idea generation system for scientific research",
    authors: ["Xu, Y.", "Fu, L.", "Sheng, S.", "Xue, B.", "Ding, J.", "Zhou, L.", "Wang, X.", "Zhou, C."],
    year: 2025,
    venue: "Proceedings of the 48th International ACM SIGIR Conference on Research and Development in Information Retrieval",
    url: "http://dx.doi.org/10.1145/3726302.3730151",
    core_contributions: "DeepReport is an AI system that autonomously generates structured research ideas by mining scientific literature, producing ideas the human then evaluates and refines rather than generating themselves.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 4 ──────────────────────────────────────────────────────────────
  {
    id: "f4",
    title: "Nova: An iterative planning and search approach to enhance novelty and diversity of LLM generated ideas",
    authors: ["Hu, X.", "Fu, H.", "Wang, J.", "Wang, Y.", "Li, Z.", "Xu, R.", "Lu, Y.", "Jin, Y.", "Pan, L.", "Lan, Z."],
    year: 2024,
    venue: "arXiv [cs.AI]",
    url: "http://arxiv.org/abs/2410.14255",
    core_contributions: "Nova is a planning-and-search methodology that drives LLMs to iteratively generate novel and diverse research ideas by incorporating external knowledge retrieval, with humans evaluating the generated output.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 5 ──────────────────────────────────────────────────────────────
  {
    id: "f5",
    title: "IdeaBench: Benchmarking large language models for research idea generation",
    authors: ["Guo, S.", "Shariatmadari, A.H.", "Xiong, G.", "Huang, A.", "Kim, M.", "Williams, C.M.", "Bekiranov, S.", "Zhang, A."],
    year: 2025,
    venue: "Proceedings of the 31st ACM SIGKDD Conference on Knowledge Discovery and Data Mining",
    url: "http://dx.doi.org/10.1145/3711896.3737419",
    core_contributions: "IdeaBench provides a standardized evaluation framework for benchmarking LLMs on research idea generation quality, enabling systematic comparison of Type 2 computational creativity systems.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 6 ──────────────────────────────────────────────────────────────
  {
    id: "f6",
    title: "Sparks of science: Hypothesis generation using structured paper data",
    authors: ["O'Neill, C.", "Ghosal, T.", "Răileanu, R.", "Walmsley, M.", "Bui, T.", "Schawinski, K.", "Ciucă, I."],
    year: 2025,
    venue: "arXiv [cs.CL]",
    url: "http://arxiv.org/abs/2504.12976",
    core_contributions: "A system that uses structured metadata extracted from scientific papers (methods, datasets, results) as grounding to prompt LLMs to generate novel, feasible scientific hypotheses at scale.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 7 ──────────────────────────────────────────────────────────────
  {
    id: "f7",
    title: "A survey on hypothesis generation for scientific discovery in the era of Large Language Models",
    authors: ["Alkan, A.K.", "Sourav, S.", "Jablonska, M.", "Astarita, S.", "Chakrabarty, R.", "Garuda, N.", "Khetarpal, P.", "Pióro, M.", "Tanoglidis, D.", "Iyer, K.G.", "Polimera, M.S.", "Smith, M.J.", "Ghosal, T.", "Huertas-Company, M.", "Kruk, S.", "Schawinski, K.", "Ciucă, I."],
    year: 2025,
    venue: "arXiv [cs.CL]",
    url: "http://arxiv.org/abs/2504.05496",
    core_contributions: "A comprehensive survey of LLM-based hypothesis generation systems for scientific discovery, taxonomizing approaches by mechanism, evaluating their creativity, and identifying open research directions.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 8 ──────────────────────────────────────────────────────────────
  {
    id: "f8",
    title: "HARPA: A testability-driven, literature-grounded framework for research ideation",
    authors: ["Vasu, R.", "Jansen, P.", "Siangliulue, P.", "Sarasua, C.", "Bernstein, A.", "Clark, P.", "Mishra, B.D."],
    year: 2025,
    venue: "arXiv [cs.AI]",
    url: "http://arxiv.org/abs/2510.00620",
    core_contributions: "HARPA is a framework that generates scientifically grounded, testable hypotheses by incorporating testability criteria and adaptive feedback from prior experimental outcomes into the LLM ideation pipeline.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Illumination", "Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 9 ──────────────────────────────────────────────────────────────
  {
    id: "f9",
    title: "Large Language Models are zero shot hypothesis proposers",
    authors: ["Qi, B.", "Zhang, K.", "Li, H.", "Tian, K.", "Zeng, S.", "Chen, Z.R.", "Zhou, B."],
    year: 2023,
    venue: "arXiv [cs.CL]",
    url: "http://arxiv.org/abs/2311.05965",
    core_contributions: "Demonstrates that LLMs can propose plausible scientific hypotheses zero-shot by leveraging their broad interdisciplinary knowledge, breaking down information barriers across scientific fields.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 10 ──────────────────────────────────────────────────────────────
  {
    id: "f10",
    title: "Creative research question generation for Human-Computer Interaction research",
    authors: ["Liu, Y.", "Yu, M.", "Jiang, M.", "Huang, Y."],
    year: 2023,
    venue: "IUI Workshops",
    url: "https://ceur-ws.org/Vol-3359/paper7.pdf",
    core_contributions: "Applies natural language generation (NLG) methods to automatically produce creative HCI research questions from existing papers, positioning the system as an idea-generating partner for interdisciplinary ideation.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 11 ──────────────────────────────────────────────────────────────
  {
    id: "f11",
    title: "Hypothesis Search: Inductive Reasoning with Language Models",
    authors: ["Wang, R.", "Zelikman, E.", "Poesia, G.", "Pu, Y.", "Haber, N.", "Goodman, N."],
    year: 2023,
    venue: "The Twelfth International Conference on Learning Representations (ICLR)",
    url: "https://openreview.net/forum?id=G7UtIGQmjm",
    core_contributions: "Proposes a hypothesis search algorithm in which LMs systematically enumerate and test candidate hypotheses to solve inductive reasoning tasks, treating hypothesis space exploration as a search problem.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Illumination", "Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 12 ──────────────────────────────────────────────────────────────
  {
    id: "f12",
    title: "Hypothesis generation with large language models",
    authors: ["Zhou, Y.", "Liu, H.", "Srivastava, T.", "Mei, H.", "Tan, C."],
    year: 2024,
    venue: "Proceedings of the 1st Workshop on NLP for Science (NLP4Science)",
    url: "http://dx.doi.org/10.18653/v1/2024.nlp4science-1.10",
    core_contributions: "Investigates how LLMs can generate scientific hypotheses from background literature, analyzing the quality, novelty, and plausibility of machine-generated hypotheses versus human-authored ones.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 13 ──────────────────────────────────────────────────────────────
  {
    id: "f13",
    title: "Generating diverse and high-quality texts by minimum Bayes risk decoding",
    authors: ["Jinnai, Y.", "Honda, U.", "Morimura, T.", "Zhang, P."],
    year: 2024,
    venue: "Findings of the Association for Computational Linguistics: ACL 2024",
    url: "http://dx.doi.org/10.18653/v1/2024.findings-acl.503",
    core_contributions: "Introduces minimum Bayes risk decoding as a method to generate text outputs that are simultaneously diverse and high-quality, enabling LLM-based ideation systems to produce varied rather than repetitive suggestions.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 14 ──────────────────────────────────────────────────────────────
  {
    id: "f14",
    title: "SciMON: Scientific inspiration machines optimized for novelty",
    authors: ["Wang, Q.", "Downey, D.", "Ji, H.", "Hope, T."],
    year: 2024,
    venue: "Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (ACL 2024)",
    url: "http://dx.doi.org/10.18653/v1/2024.acl-long.18",
    core_contributions: "SciMON is a system that generates novel scientific ideas by retrieving inspiration from cross-domain literature and optimizing explicitly for novelty, functioning as an idea-generation machine the researcher then evaluates.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Incubation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 15 ──────────────────────────────────────────────────────────────
  {
    id: "f15",
    title: "Augmenting Research Ideation with Data: An Empirical Investigation in Social Science",
    authors: ["Liu, X.", "Dong, X.", "Gao, X.", "Feng, Y.", "Pang, X."],
    year: 2025,
    venue: "NeurIPS 2025 AI for Science Workshop",
    url: "https://openreview.net/forum?id=eblvaoaXlg",
    core_contributions: "Empirically investigates whether providing LLMs with relevant data (beyond just literature) during ideation improves research idea quality for social science, finding that data augmentation boosts feasibility.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 16 ──────────────────────────────────────────────────────────────
  {
    id: "f16",
    title: "Chain of ideas: Revolutionizing research via novel idea development with LLM agents",
    authors: ["Li, L.", "Xu, W.", "Guo, J.", "Zhao, R.", "Li, X.", "Yuan, Y.", "Zhang, B.", "Jiang, Y.", "Xin, Y.", "Dang, R.", "Rong, Y.", "Zhao, D.", "Feng, T.", "Bing, L."],
    year: 2025,
    venue: "Findings of the Association for Computational Linguistics: EMNLP 2025",
    url: "http://dx.doi.org/10.18653/v1/2025.findings-emnlp.477",
    core_contributions: "Proposes a Chain-of-Ideas framework in which LLM agents construct a progressive chain of research ideas grounded in literature trajectories, systematically exploring the frontier of a research field.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 17 ──────────────────────────────────────────────────────────────
  {
    id: "f17",
    title: "Towards automated error discovery: A study in conversational AI",
    authors: ["Petrak, D.", "Tran, T.T.", "Gurevych, I."],
    year: 2025,
    venue: "Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing (EMNLP)",
    url: "http://dx.doi.org/10.18653/v1/2025.emnlp-main.1",
    core_contributions: "Presents a method for automatically discovering systematic errors and failure modes in conversational AI systems, using computational exploration to surface blind spots that human testers overlook.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 18 ──────────────────────────────────────────────────────────────
  {
    id: "f18",
    title: "Literature meets data: A synergistic approach to hypothesis generation",
    authors: ["Liu, H.", "Zhou, Y.", "Li, M.", "Yuan, C.", "Tan, C."],
    year: 2025,
    venue: "Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (ACL 2025)",
    url: "http://dx.doi.org/10.18653/v1/2025.acl-long.12",
    core_contributions: "Introduces a synergistic framework that combines scientific literature and empirical datasets to generate high-quality hypotheses, with the system doing the integrative creative work of blending both knowledge sources.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 19 ──────────────────────────────────────────────────────────────
  {
    id: "f19",
    title: "PaperRobot: Incremental draft generation of scientific ideas",
    authors: ["Wang, Q.", "Huang, L.", "Jiang, Z.", "Knight, K.", "Ji, H.", "Bansal, M.", "Luan, Y."],
    year: 2019,
    venue: "Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics (ACL 2019)",
    url: "http://dx.doi.org/10.18653/v1/P19-1191",
    core_contributions: "PaperRobot incrementally generates new scientific paper sections (background, future work, titles, abstracts) by reading existing papers and autonomously constructing novel scientific ideas and paper drafts.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 20 ──────────────────────────────────────────────────────────────
  {
    id: "f20",
    title: "Fuzzy linkography: Automatic graphical summarization of creative activity traces",
    authors: ["Smith, A.", "Anderson, B.R.", "Otto, J.T.", "Karth, I.", "Sun, Y.", "Joon Young Chung, J.", "Roemmele, M.", "Kreminski, M."],
    year: 2025,
    venue: "Proceedings of the 2025 Conference on Creativity and Cognition (C&C)",
    url: "http://dx.doi.org/10.1145/3698061.3726915",
    core_contributions: "Fuzzy Linkography is an automated tool that generates graphical summaries of creative activity traces, helping researchers and creators retrospectively analyze and reflect on their own creative processes.",
    tool_types: ["Type 1"],
    research_stages: ["Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Verification"],
    bodens_types: []
  },

  // ── ENTRY 21 ──────────────────────────────────────────────────────────────
  {
    id: "f21",
    title: "How researchers manage ideas",
    authors: ["Inie, N.", "Frich, J.", "Dalsgaard, P."],
    year: 2022,
    venue: "Proceedings of the 2022 Conference on Creativity and Cognition (C&C)",
    url: "http://dx.doi.org/10.1145/3527927.3532813",
    core_contributions: "Empirical study documenting how academic researchers capture, store, organize, and develop research ideas over time, surfacing patterns in idea management practices that could inform future tool design.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Incubation"],
    bodens_types: []
  },

  // ── ENTRY 22 ──────────────────────────────────────────────────────────────
  {
    id: "f22",
    title: "Making the write connections: Linking writing support tools with writer needs",
    authors: ["Zhao, Z.", "Masson, D.", "Kim, Y.H.", "Penn, G.", "Chevalier, F."],
    year: 2025,
    venue: "Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems",
    url: "http://dx.doi.org/10.1145/3706598.3713161",
    core_contributions: "Taxonomy and survey connecting the landscape of AI-powered writing support tools to specific writer needs and stages, providing a framework for understanding where tools scaffold versus replace human authorship.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 23 ──────────────────────────────────────────────────────────────
  {
    id: "f23",
    title: "Towards a reflection in creative experience questionnaire",
    authors: ["Ford, C.", "Bryan-Kinns, N."],
    year: 2023,
    venue: "Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems",
    url: "http://dx.doi.org/10.1145/3544548.3581077",
    core_contributions: "Develops and validates a questionnaire instrument for measuring reflective experience during creative activities, giving researchers a scaffold for self-assessing their own creative process.",
    tool_types: ["Type 1"],
    research_stages: ["Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Verification"],
    bodens_types: []
  },

  // ── ENTRY 24 ──────────────────────────────────────────────────────────────
  {
    id: "f24",
    title: "How creative practitioners use tools to capture ideas: A cross-domain study",
    authors: ["Rosselli Del Turco, E.", "Inie, N.", "Hollan, J.D.", "Dalsgaard, P."],
    year: 2025,
    venue: "ACM Transactions on Computer-Human Interaction (TOCHI)",
    url: "http://dx.doi.org/10.1145/3727979",
    core_contributions: "Cross-domain qualitative study (~200 surveys, ~60 interviews) of how creative practitioners in design, research, music, and writing capture and manage ideas, revealing tool-use patterns and unmet needs.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Incubation"],
    bodens_types: []
  },

  // ── ENTRY 25 ──────────────────────────────────────────────────────────────
  {
    id: "f25",
    title: "TreeQuestion: Assessing conceptual learning outcomes with LLM-generated multiple-choice questions",
    authors: ["Cheng, Z.", "Xu, J.", "Jin, H."],
    year: 2024,
    venue: "Proceedings of the ACM on Human-Computer Interaction (PACM HCI)",
    url: "http://dx.doi.org/10.1145/3686970",
    core_contributions: "TreeQuestion is a human-in-the-loop system in which LLMs generate hierarchically structured multiple-choice questions to assess student conceptual understanding, with instructors reviewing and curating the AI-generated questions.",
    tool_types: ["Type 2"],
    research_stages: ["Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 26 ──────────────────────────────────────────────────────────────
  {
    id: "f26",
    title: "Beyond productivity: Rethinking the impact of creativity support tools",
    authors: ["Rhys Cox, S.", "Bøjer Djernæs, H.", "van Berkel, N."],
    year: 2025,
    venue: "Proceedings of the 2025 Conference on Creativity and Cognition (C&C)",
    url: "http://dx.doi.org/10.1145/3698061.3726924",
    core_contributions: "Theoretical argument that CST evaluation should move beyond productivity metrics to measure genuine creative impact, advocating for frameworks that center human creative growth rather than output volume.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  },

  // ── ENTRY 27 ──────────────────────────────────────────────────────────────
  {
    id: "f27",
    title: "IRIS: Interactive research ideation system for accelerating scientific discovery",
    authors: ["Garikaparthi, A.", "Patwardhan, M.", "Vig, L.", "Cohan, A."],
    year: 2025,
    venue: "Proceedings of the 63rd Annual Meeting of the ACL (System Demonstrations)",
    url: "https://aclanthology.org/2025.acl-demo.57/",
    core_contributions: "IRIS is an interactive LLM-based system that generates novel, transparent research hypotheses by integrating related work retrieval, allowing researchers to inspect the evidence trail behind each generated idea.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination", "Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 28 ──────────────────────────────────────────────────────────────
  {
    id: "f28",
    title: "Perspectra: Choosing your experts enhances critical thinking in multi-agent research ideation",
    authors: ["Liu, Y.", "Shah, V.", "Suh, S.", "Siangliulue, P.", "August, T.", "Huang, Y."],
    year: 2025,
    venue: "arXiv [cs.HC]",
    url: "http://arxiv.org/abs/2509.20553",
    core_contributions: "Perspectra is a multi-agent system where users select domain-expert LLM personas that deliberate via a forum-style interface; the agents generate ideas and critiques while the human steers the deliberation and evaluates outputs.",
    tool_types: ["Type 1", "Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 29 ──────────────────────────────────────────────────────────────
  {
    id: "f29",
    title: "Many heads are better than one: Improved scientific idea generation by a LLM-based multi-agent system",
    authors: ["Su, H.", "Chen, R.", "Tang, S.", "Yin, Z.", "Zheng, X.", "Li, J.", "Qi, B.", "Wu, Q.", "Li, H.", "Ouyang, W.", "Torr, P.", "Zhou, B.", "Dong, N."],
    year: 2025,
    venue: "Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (ACL 2025)",
    url: "http://dx.doi.org/10.18653/v1/2025.acl-long.1368",
    core_contributions: "A multi-agent LLM system in which specialized agents (e.g., scientist, critic, reviewer) collaborate to generate higher-quality scientific ideas than any single LLM agent, with diverse agent perspectives driving Combinational creativity.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 30 ──────────────────────────────────────────────────────────────
  {
    id: "f30",
    title: "Spinneret: Aiding creative ideation through non-obvious concept associations",
    authors: ["Bae, S.S.", "Kwon, O.H.", "Chandrasegaran, S.", "Ma, K.L."],
    year: 2020,
    venue: "Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems",
    url: "http://dx.doi.org/10.1145/3313831.3376746",
    core_contributions: "Spinneret is a visual ideation tool that computationally surfaces non-obvious concept associations to seed creative thinking; the system generates surprising conceptual links that humans then use to develop their own ideas.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Incubation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 31 ──────────────────────────────────────────────────────────────
  {
    id: "f31",
    title: "ResearchAgent: Iterative research idea generation over scientific literature with large language models",
    authors: ["Baek, J.", "Jauhar, S.K.", "Cucerzan, S.", "Hwang, S.J."],
    year: 2025,
    venue: "Proceedings of NAACL: Human Language Technologies (Volume 1: Long Papers)",
    url: "http://dx.doi.org/10.18653/v1/2025.naacl-long.342",
    core_contributions: "ResearchAgent is an LLM agent that iteratively generates, refines, and critiques research ideas by continuously mining scientific literature, autonomously driving the ideation loop while humans evaluate the final outputs.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 32 ──────────────────────────────────────────────────────────────
  {
    id: "f32",
    title: "PersonaFlow: Designing LLM-simulated expert perspectives for enhanced research ideation",
    authors: ["Liu, Y.", "Sharma, P.", "Oswal, M.", "Xia, H.", "Huang, Y."],
    year: 2025,
    venue: "Proceedings of the 2025 ACM Designing Interactive Systems Conference (DIS)",
    url: "http://dx.doi.org/10.1145/3715336.3735789",
    core_contributions: "PersonaFlow scaffolds research ideation by presenting LLM-simulated expert perspectives as structured prompts, enabling researchers to consider viewpoints from diverse disciplines while retaining authorship of their own ideas.",
    tool_types: ["Type 1", "Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 33 ──────────────────────────────────────────────────────────────
  {
    id: "f33",
    title: "Rapid AIdeation: Generating ideas with the self and in collaboration with large language models",
    authors: ["Lim, G.", "Perrault, S.T."],
    year: 2024,
    venue: "arXiv [cs.HC]",
    url: "http://arxiv.org/abs/2403.12928",
    core_contributions: "Workshop study comparing solo human ideation, LLM-generated ideation, and human-LLM collaborative ideation, finding that collaborative modes leverage both human agency and LLM generativity for richer outcomes.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: []
  },

  // ── ENTRY 34 ──────────────────────────────────────────────────────────────
  {
    id: "f34",
    title: "Human creativity in the age of LLMs: Randomized experiments on divergent and convergent thinking",
    authors: ["Kumar, H.", "Vincentius, J.", "Jordan, E.", "Anderson, A."],
    year: 2025,
    venue: "Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems",
    url: "https://dl.acm.org/doi/10.1145/3706598.3714198",
    core_contributions: "Randomized controlled experiments measuring how LLM assistance affects human divergent and convergent thinking, finding nuanced effects on creative output quality, originality, and cognitive engagement.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: []
  },

  // ── ENTRY 35 ──────────────────────────────────────────────────────────────
  {
    id: "f35",
    title: "'I'm categorizing LLM as a productivity tool': Examining ethics of LLM use in HCI research practices",
    authors: ["Kapania, S.", "Wang, R.", "Li, J.J.", "Li, T.", "Shen, H."],
    year: 2025,
    venue: "Proceedings of the ACM on Human-Computer Interaction (PACM HCI)",
    url: "https://dl.acm.org/doi/10.1145/3711000",
    core_contributions: "Qualitative study examining how HCI researchers perceive and navigate the ethical dimensions of using LLMs in their research practices, revealing tensions between efficiency gains and concerns about intellectual integrity.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 36 ──────────────────────────────────────────────────────────────
  {
    id: "f36",
    title: "The design space of recent AI-assisted research tools for ideation, sensemaking, and scientific creativity",
    authors: ["Ye, R.", "Varona, M.", "Huang, O.", "Lee, P.Y.", "Liut, M.", "Nobre, C."],
    year: 2025,
    venue: "arXiv [cs.HC]",
    url: "http://arxiv.org/abs/2502.16291",
    core_contributions: "Survey and design space analysis of recent AI-assisted research tools across ideation, sensemaking, and creativity dimensions, providing a taxonomy of tool capabilities, interaction modes, and automation levels.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 37 ──────────────────────────────────────────────────────────────
  {
    id: "f37",
    title: "Human-LLM compound system for scientific ideation through facet recombination and novelty evaluation (Scideator)",
    authors: ["Radensky, M.", "Shahid, S.", "Fok, R.", "Siangliulue, P.", "Hope, T.", "Weld, D.S."],
    year: 2026,
    venue: "arXiv [cs.HC]",
    url: "http://arxiv.org/abs/2409.14634",
    core_contributions: "Scideator is a human-LLM compound system that extracts facets (purposes, mechanisms, evaluations) from user-provided seed papers and recombines them to generate novel scientific ideas, with built-in novelty evaluation against the literature.",
    tool_types: ["Type 1", "Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 38 ──────────────────────────────────────────────────────────────
  {
    id: "f38",
    title: "PaperWeaver: Enriching topical paper alerts by contextualizing recommended papers with user-collected papers",
    authors: ["Lee, Y.", "Kang, H.B.", "Latzke, M.", "Kim, J.", "Bragg, J.", "Chang, J.C.", "Siangliulue, P."],
    year: 2024,
    venue: "Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI 2024)",
    url: "https://dl.acm.org/doi/pdf/10.1145/3613904.3642196",
    core_contributions: "PaperWeaver enriches automated paper recommendations by contextualizing newly recommended papers in relation to the user's own collection, helping researchers understand relevance through personally meaningful connections.",
    tool_types: ["Type 1", "Type 2"],
    research_stages: ["Information Foraging"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation", "Incubation"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 39 ──────────────────────────────────────────────────────────────
  {
    id: "f39",
    title: "Augmenting scientific creativity with an analogical search engine",
    authors: ["Kang, H.B.", "Qian, X.", "Hope, T.", "Shahaf, D.", "Chan, J.", "Kittur, A."],
    year: 2022,
    venue: "ACM Transactions on Computer-Human Interaction (TOCHI)",
    url: "https://dl.acm.org/doi/pdf/10.1145/3530013",
    core_contributions: "An analogical search engine that retrieves structurally similar solutions from distant scientific domains, with the system generating the cross-domain analogical connections and the researcher adapting them to their problem.",
    tool_types: ["Type 2"],
    research_stages: ["Information Foraging", "Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Incubation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 40 ──────────────────────────────────────────────────────────────
  {
    id: "f40",
    title: "Cocoa: Co-planning and co-execution with AI agents",
    authors: ["Feng, K.J.", "Pu, K.", "Latzke, M.", "August, T.", "Siangliulue, P.", "Bragg, J.", "Weld, D.S.", "Zhang, A.X.", "Chang, J.C."],
    year: 2026,
    venue: "arXiv [cs.HC]",
    url: "http://arxiv.org/abs/2412.10999",
    core_contributions: "Cocoa is a human-agent collaboration framework for long-running research tasks where planning and execution are interleaved, allowing humans to steer, intervene, and co-execute alongside AI agents rather than simply reviewing autonomous outputs.",
    tool_types: ["Type 1", "Type 2"],
    research_stages: ["Research Planning", "Analysis & Sensemaking"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 41 ──────────────────────────────────────────────────────────────
  {
    id: "f41",
    title: "\"it felt like having a second mind\": Investigating human-AI co-creativity in prewriting with large language models",
    authors: ["Wan, Q.", "Hu, S.", "Zhang, Y.", "Wang, P.", "Wen, B.", "Lu, Z."],
    year: 2024,
    venue: "Proceedings of the ACM on Human-Computer Interaction (PACM HCI)",
    url: "https://dl.acm.org/doi/pdf/10.1145/3637361",
    core_contributions: "Qualitative study of how writers collaborate with LLMs during prewriting (divergent exploration before drafting), finding that LLM assistance acts as a cognitive partner that both scaffolds and displaces aspects of human ideation.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Incubation"],
    bodens_types: []
  },

  // ── ENTRY 42 ──────────────────────────────────────────────────────────────
  {
    id: "f42",
    title: "Art or artifice? Large language models and the false promise of creativity",
    authors: ["Chakrabarty, T.", "Laban, P.", "Agarwal, D.", "Muresan, S.", "Wu, C.S."],
    year: 2024,
    venue: "Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI 2024)",
    url: "https://dl.acm.org/doi/pdf/10.1145/3613904.3642731",
    core_contributions: "Critical analysis demonstrating that LLM-generated creative work, while superficially fluent, lacks the intentionality, risk-taking, and contextual meaning that characterize genuine human creativity.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: []
  },

  // ── ENTRY 43 ──────────────────────────────────────────────────────────────
  {
    id: "f43",
    title: "How AI processing delays foster creativity: Exploring research question co-creation with an LLM-based agent",
    authors: ["Liu, Y.", "Chen, S.", "Cheng, H.", "Yu, M.", "Ran, X.", "Mo, A.", "Tang, Y.", "Huang, Y."],
    year: 2024,
    venue: "Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI 2024)",
    url: "https://dl.acm.org/doi/pdf/10.1145/3613904.3642698",
    core_contributions: "Shows that intentional AI processing delays during research question co-creation encourage users to engage in deeper independent thinking before seeing LLM suggestions, improving the quality of the resulting research questions.",
    tool_types: ["Type 1", "Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Incubation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 44 ──────────────────────────────────────────────────────────────
  {
    id: "f44",
    title: "What counts as 'creative' work? Articulating four epistemic positions in creativity-oriented HCI research",
    authors: ["Hsueh, S.", "Ciolfi Felice, M.", "Alaoui, S.F.", "Mackay, W.E."],
    year: 2024,
    venue: "Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI 2024)",
    url: "https://dl.acm.org/doi/pdf/10.1145/3613904.3642854",
    core_contributions: "Articulates four epistemic positions (product, process, person, press) through which HCI researchers frame 'creativity,' providing a theoretical scaffold for designing and evaluating creativity support tools.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  },

  // ── ENTRY 45 ──────────────────────────────────────────────────────────────
  {
    id: "f45",
    title: "Synergi: A mixed-initiative system for scholarly synthesis and sensemaking",
    authors: ["Kang, H.B.", "Wu, T.", "Chang, J.C.", "Kittur, A."],
    year: 2023,
    venue: "Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology (UIST 2023)",
    url: "https://doi.org/10.1145/3586183.3606759",
    core_contributions: "Synergi is a mixed-initiative tool that helps scholars build research threads across multiple papers, with the system surfacing connections and the human making meaning — keeping synthesis agency firmly with the researcher.",
    tool_types: ["Type 1"],
    research_stages: ["Information Foraging", "Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation", "Incubation", "Illumination"],
    bodens_types: []
  },

  // ── ENTRY 46 ──────────────────────────────────────────────────────────────
  {
    id: "f46",
    title: "SearchIdea: An Idea Generation Tool to Support Creativity in Academic Search",
    authors: ["Chavula, C.", "Choi, Y.", "Rieh, S.Y."],
    year: 2023,
    venue: "Proceedings of the 2023 Conference on Human Information Interaction and Retrieval (CHIIR 2023)",
    url: "https://doi.org/10.1145/3576840.3578294",
    core_contributions: "SearchIdea is a web-based tool that scaffolds creative thinking during academic search by enabling users to actively reorganize, annotate, and synthesize search results — keeping the researcher as the primary idea generator. Spans the preparatory–generative boundary: search and cluster/compare views support information foraging and sensemaking (§2.2.2.1 Preparatory Scaffolding), while the Idea Board scaffolds hypothesis formation (§2.2.2.2 Generative Support).",
    tool_types: ["Type 1"],
    research_stages: ["Information Foraging", "Analysis & Sensemaking", "Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Incubation", "Illumination"],
    bodens_types: []
  },

  // ── ADDED: March 2026 ────────────────────────────────────────────────────

  // ── ENTRY 47 ──────────────────────────────────────────────────────────────
  {
    id: "f47",
    title: "IdeaSynth: Iterative Research Idea Development Through Evolving and Composing Idea Facets with Literature-Grounded Feedback",
    authors: ["Pu, K.", "Feng, K.J.K.", "Grossman, T.", "Hope, T.", "Dalvi Mishra, B.", "Latzke, M.", "Bragg, J.", "Chang, J.C.", "Siangliulue, P."],
    year: 2025,
    venue: "Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems",
    url: "https://doi.org/10.1145/3706598.3714057",
    core_contributions: "IdeaSynth is a hybrid research idea development system that distributes authorship across the development of a single research idea. Researchers decompose their nascent ideas into modular facets — distinct components of the research plan such as problem statement, study design, and expected contributions — as nodes on a canvas, while literature-grounded LLM feedback at each node and canvas level substantively shapes what gets elaborated next. The researcher structures and authors the facets (Type 1); the LLM's literature synthesis redirects framing and surfaces directions the researcher would not have reached alone (Type 2). User evaluations found participants articulated more specific, grounded research briefs; the study assessed perceived specificity and groundedness but did not directly measure authorship attribution for co-created content.",
    tool_types: ["Type 1", "Type 2"],
    research_stages: ["Problem Framing", "Analysis & Sensemaking"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 48 ──────────────────────────────────────────────────────────────
  {
    id: "f48",
    title: "Sparking Scientific Creativity via LLM-Driven Interdisciplinary Inspiration",
    authors: ["Kargupta, P.", "Jansen, P.", "Mishra, B.D.", "Garg, N.", "Carenini, G.", "Chang, J.C."],
    year: 2026,
    venue: "arXiv [cs.CL]",
    url: "https://doi.org/10.48550/arXiv.2603.12226",
    core_contributions: "Idea-Catalyst is a metacognition-driven framework that systematically generates interdisciplinary idea fragments by analyzing a target domain's challenges and strategically retrieving insights from external scientific disciplines, surfacing cross-domain conceptual connections to spark human creative reasoning at early-stage ideation.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing", "Information Foraging"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Incubation", "Illumination"],
    bodens_types: ["Combinational"]
  },

  // ── ENTRY 49 ──────────────────────────────────────────────────────────────
  {
    id: "f49",
    title: "Evaluating LLMs' Divergent Thinking Capabilities for Scientific Idea Generation with Minimal Context",
    authors: ["Ruan, K.", "Wang, X.", "Hong, J.", "Wang, P.", "Liu, Y.", "Sun, H."],
    year: 2026,
    venue: "Nature Communications",
    url: "https://doi.org/10.1038/s41467-026-70245-1",
    core_contributions: "LiveIdeaBench is a continuously updated benchmark that evaluates LLMs' scientific creativity through divergent thinking tasks using single-keyword minimal-context prompts, assessing ideas across originality, feasibility, fluency, flexibility, and clarity dimensions grounded in Guilford's creativity theory.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: []
  },

  // ── ENTRY 50 ──────────────────────────────────────────────────────────────
  {
    id: "f50",
    title: "Divergent creativity in humans and large language models",
    authors: ["Bellemare-Pepin, A.", "Lespinasse, F.", "Thölke, P.", "Harel, Y.", "Mathewson, K.", "Olson, J.A.", "Bengio, Y.", "Jerbi, K."],
    year: 2026,
    venue: "Scientific Reports (Nature Portfolio)",
    url: "https://doi.org/10.1038/s41598-025-25157-3",
    core_contributions: "Large-scale empirical comparison of LLMs' divergent creativity against 100,000+ human participants using the Divergent Association Task, finding that advanced LLMs (e.g., GPT-4) exceed average human scores while the most creative humans still maintain a consistent advantage over AI.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  },

  // ── ENTRY 51 ──────────────────────────────────────────────────────────────
  {
    id: "f51",
    title: "Towards an AI co-scientist",
    authors: ["Gottweis, J.", "Weng, W.-H.", "Daryin, A.", "Tu, T.", "Palepu, A.", "Sirkovic, P.", "Natarajan, V."],
    year: 2025,
    venue: "arXiv [cs.AI]",
    url: "https://doi.org/10.48550/arXiv.2502.18864",
    core_contributions: "The AI co-scientist is a multi-agent system built on Gemini 2.0 that autonomously generates, debates, and evolves novel scientific hypotheses and research proposals through specialized agents (Generation, Reflection, Ranking, Evolution) operating in a tournament-style framework, validated through real-world biomedical discovery tasks. An AI Automation system: the researcher provides a research goal and evaluates the final proposals; all hypothesis generation, critique, and evolution occurs autonomously within the multi-agent loop.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 52 ──────────────────────────────────────────────────────────────
  {
    id: "f52",
    title: "Who Owns Creativity and Who Does the Work? Trade-offs in LLM-Supported Research Ideation",
    authors: ["Liu, H.", "Choi, Y.", "Gautam, S.", "Jaffe, G.", "Rieh, S.Y.", "Lease, M."],
    year: 2026,
    venue: "arXiv [cs.HC]",
    url: "https://doi.org/10.48550/arXiv.2601.12152",
    core_contributions: "Mixed-methods study with 54 researchers using an agentic ideation probe (Ideator, Writer, Evaluator roles) across three LLM control levels, finding that creativity support is non-linear with control level, human effort shifts from generating ideas to verifying them as AI takes more control, and perceived ownership of research ideas is a negotiated outcome rather than straightforwardly attributed to either human or AI.",
    tool_types: ["Empirical Study"],
    research_stages: [],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 53 ─────────────────────────────────────────────────── (March 2026 pipeline) ──
  {
    id: "f53",
    title: "Deep Ideation: Designing LLM Agents to Generate Novel Research Ideas on Scientific Concept Network",
    authors: ["Zhao, R.", "Zhang, Y.", "Liu, J.", "Li, X.", "Chen, W."],
    year: 2024,
    venue: "arXiv [cs.AI]",
    url: "https://doi.org/10.48550/arXiv.2511.02238",
    core_contributions: "Deep Ideation is a framework that integrates LLM agents with a scientific concept network — built from ~100,000 AI conference papers using keyword co-occurrence and contextual relationships — to generate novel, grounded research ideas via an explore-expand-evolve workflow. A critic engine trained on real-world reviewer feedback evaluates idea novelty and feasibility at each iteration. Experiments across multiple AI domains show a 10.67% improvement in overall idea quality versus baseline methods, with generated ideas exceeding top-conference acceptance thresholds on both novelty and feasibility.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory", "Combinational"]
  },

  // ── ENTRY 54 ─────────────────────────────────────────────────── (March 2026 pipeline) ──
  {
    id: "f54",
    title: "EvoScientist: Towards Multi-Agent Evolving AI Scientists for End-to-End Scientific Discovery",
    authors: ["Lyu, Y.", "Zhang, X.", "Yi, X.", "Zhao, Y.", "Guo, S.", "Hu, W.", "Piotrowski, J.", "Kaliski, J.", "Urbani, J.", "Meng, Z.", "Zhou, L.", "Yan, X."],
    year: 2026,
    venue: "arXiv [cs.CL]",
    url: "https://doi.org/10.48550/arXiv.2603.08127",
    core_contributions: "EvoScientist is an evolving multi-agent AI scientist framework that performs end-to-end scientific discovery through three specialized agents: a Researcher Agent (RA) for idea generation, an Engineer Agent (EA) for experiment execution, and an Evolution Manager Agent (EMA) that distills interaction histories into persistent memory to continuously improve research strategies across runs. Two memory modules — ideation memory and experimentation memory — enable the system to avoid repeating failed approaches and prioritize promising directions, addressing the static-pipeline limitation of prior autonomous AI scientist systems such as AI Scientist-v2.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing", "Research Planning"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: ["Exploratory", "Combinational"]
  },

  // ── ENTRY 55 ─────────────────────────── (contributor suggestion: @JialingJia, March 2026) ──
  {
    id: "f55",
    title: "Scientific Creativity",
    authors: ["Getzels, J.W.", "Csikszentmihalyi, M."],
    year: 1967,
    venue: "Science Journal",
    url: "https://psycnet.apa.org/record/1967-16699-001",
    core_contributions: "Foundational empirical account arguing that scientific creativity resides primarily in problem-finding — the disposition to identify and formulate problems worth pursuing — rather than in problem-solving ability. Distinguishes creative scientists from merely capable ones by their sensitivity to gaps, tensions, and anomalies that others overlook, shifting the locus of creativity upstream of hypothesis testing.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Incubation"],
    bodens_types: []
  },

  // ── ENTRY 56 ─────────────────────────── (pipeline addition: March 2026) ──
  {
    id: "f56",
    title: "Agentic AI for Scientific Discovery: A Survey of Progress, Challenges, and Future Directions",
    authors: ["Gridach, M.", "Nanavati, J.", "Zine El Abidine, K.", "Mendes, L.", "Mack, C."],
    year: 2025,
    venue: "arXiv [cs.CL]",
    url: "https://arxiv.org/abs/2503.08979",
    core_contributions: "Comprehensive survey of agentic AI systems for scientific discovery, covering the full research pipeline from literature review and hypothesis generation through experiment design, data analysis, and paper writing. Categorizes existing systems and tools, reviews evaluation metrics and commonly used datasets, and addresses critical challenges including literature automation, system reliability, and ethical concerns — with a forward-looking emphasis on human-AI collaboration.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 57 ─────────────────────────── (pipeline addition: March 2026) ──
  {
    id: "f57",
    title: "Large Language Models for Scientific Idea Generation: A Creativity-Centered Survey",
    authors: ["Shahhosseini, F.", "Marioriyad, A.", "Momen, A.", "Soleymani Baghshah, M.", "Rohban, M.H.", "Haghjooy Javanmard, S."],
    year: 2025,
    venue: "arXiv [cs.AI]",
    url: "https://arxiv.org/abs/2511.07448",
    core_contributions: "Creativity-centered survey organizing LLM-based scientific idea generation methods into five families — external knowledge augmentation, prompt-based distributional steering, inference-time scaling, multi-agent collaboration, and parameter-level adaptation — analyzed through two complementary creativity frameworks: Boden's taxonomy (combinational, exploratory, transformational) and Rhodes' 4Ps (product, process, person, press). Highlights that scientific ideation is inherently open-ended and multi-objective, distinct from standard reasoning or general creative generation, and argues that current evaluation methods inadequately capture the creativity dimensions that matter most.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Illumination"],
    bodens_types: []
  },

  // ── ENTRIES 58–73 ─────────────────── (framework update: Jialingjia §2.2, March 2026) ──
  // Expert Systems (AI Automation era — §2.2.1)

  // ── ENTRY 58 ──────────────────────────────────────────────────────────────
  {
    id: "f58",
    title: "BACON: Discovering Scientific Laws via Computer Programs",
    authors: ["Langley, P.", "Simon, H.A.", "Bradshaw, G.L.", "Zytkow, J.M."],
    year: 1987,
    venue: "MIT Press",
    url: "https://mitpress.mit.edu/9780262121347/scientific-discovery/",
    core_contributions: "BACON is a family of rule-based discovery programs that rediscovered empirical laws (Kepler's Third Law, Ohm's Law, Black's specific heat law) by systematically searching numeric data for invariant relationships. It demonstrated that the pattern-detection stages of scientific discovery could be computationally formalized through heuristic search over symbolic data representations, without domain-specific prior knowledge — an early landmark of the AI Automation paradigm for scientific creativity.",
    tool_types: ["Type 2"],
    research_stages: ["Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 59 ──────────────────────────────────────────────────────────────
  {
    id: "f59",
    title: "Heuristic DENDRAL: A Program for Generating Explanatory Hypotheses in Organic Chemistry",
    authors: ["Buchanan, B.G.", "Sutherland, G.", "Feigenbaum, E.A."],
    year: 1969,
    venue: "Machine Intelligence 4",
    url: "https://stacks.stanford.edu/file/druid:yp838gg5013/yp838gg5013.pdf",
    core_contributions: "DENDRAL is an expert system that automatically generates and ranks molecular structure hypotheses from mass spectrometry data using a plan-generate-test architecture and encoded domain chemistry rules. It was among the first programs to demonstrate expert-level autonomous scientific hypothesis generation, establishing the feasibility of the AI Automation paradigm for knowledge-intensive discovery tasks. The system's researcher evaluates final outputs but does not participate in hypothesis generation.",
    tool_types: ["Type 2"],
    research_stages: ["Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 60 ──────────────────────────────────────────────────────────────
  {
    id: "f60",
    title: "The Processes of Scientific Discovery: The Strategy of Experimentation",
    authors: ["Kulkarni, D.", "Simon, H.A."],
    year: 1988,
    venue: "Cognitive Science",
    url: "https://doi.org/10.1016/0364-0213(88)90018-8",
    core_contributions: "KEKADA is a production-rule simulation that models the discovery of the urea cycle by biochemist Hans Krebs, capturing the strategic heuristics of experimental design and anomaly-driven inquiry. By recreating the path of actual scientific discoveries through symbolic rule execution, KEKADA showed that key aspects of scientific discovery strategy — experiment selection, anomaly identification, hypothesis revision — could be modeled computationally, situating it firmly in the AI Automation paradigm.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing", "Research Planning"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 61 ──────────────────────────────────────────────────────────────
  {
    id: "f61",
    title: "EURISKO: A Program That Learns New Heuristics and Domain Concepts",
    authors: ["Lenat, D.B."],
    year: 1983,
    venue: "Artificial Intelligence",
    url: "https://doi.org/10.1016/S0004-3702(83)80005-8",
    core_contributions: "EURISKO is a self-modifying heuristic discovery program that invents new concepts and rules by applying and revising its own meta-level heuristics across domains including mathematics, VLSI design, and naval war games. Its ability to modify the heuristics it uses — not merely traverse a fixed search space — gives it a transformational character in Boden's sense: EURISKO restructures its own conceptual machinery rather than only exploring within a predefined space. Represents one of the most ambitious early demonstrations of autonomous machine creativity.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory", "Transformational"]
  },

  // LLM-Based Agents (AI Automation era — §2.2.1)

  // ── ENTRY 62 ──────────────────────────────────────────────────────────────
  {
    id: "f62",
    title: "SciAgents: Automating Scientific Discovery Through Multi-Agent Intelligent Graph Reasoning",
    authors: ["Buehler, M.J."],
    year: 2024,
    venue: "arXiv [cs.AI]",
    url: "https://arxiv.org/abs/2409.05556",
    core_contributions: "SciAgents is a multi-agent system that automates scientific discovery by combining large language models with knowledge graph reasoning over domain literature. Specialized agents — including Ontologist, Scientist, Critic, and Expander roles — collaborate to generate, critique, and refine novel scientific hypotheses grounded in cross-domain relationships extracted from the graph. Demonstrated on biomaterials science, the system autonomously generates research directions that combine distant knowledge domains without human direction of the ideation process.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing"],
    creative_thinking_types: ["Divergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory", "Combinational"]
  },

  // ── ENTRY 63 ──────────────────────────────────────────────────────────────
  {
    id: "f63",
    title: "The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery",
    authors: ["Lu, C.", "Lu, C.", "Lange, R.T.", "Foerster, J.", "Clune, J.", "Ha, D."],
    year: 2024,
    venue: "arXiv [cs.AI]",
    url: "https://arxiv.org/abs/2408.06292",
    core_contributions: "The AI Scientist is an end-to-end automated research pipeline in which an LLM generates novel research ideas, implements experimental code, runs experiments, analyzes results, and writes a full scientific paper — all without human intervention during execution. The system includes an automated reviewer agent that evaluates generated papers against conference standards. Demonstrated across three machine learning subfields, it represents a paradigmatic instantiation of the AI Automation design goal, reducing the researcher's role to defining the problem scope and evaluating finished manuscripts.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing", "Research Planning", "Analysis & Sensemaking"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 64 ──────────────────────────────────────────────────────────────
  {
    id: "f64",
    title: "Agent Laboratory: Using LLM Agents as Research Assistants",
    authors: ["Schmidgall, S.", "Su, Y.", "Wang, Z.", "Sun, L.", "Wu, Z.", "Yu, X.", "Liu, Y.", "Baraniuk, R."],
    year: 2025,
    venue: "arXiv [cs.AI]",
    url: "https://arxiv.org/abs/2501.04227",
    core_contributions: "Agent Laboratory is a fully autonomous research workflow in which specialized LLM agents (Literature Review, Experimentation, Report Writing) execute a complete research project from a problem statement to a written paper. The system introduces mle-solver, an ML engineering agent, and uses automated evaluation against human researcher baselines. Agent Laboratory substantially reduces the cost of running machine learning research experiments while maintaining paper quality, demonstrating the scalability of AI Automation for end-to-end scientific work.",
    tool_types: ["Type 2"],
    research_stages: ["Problem Framing", "Research Planning"],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 65 ──────────────────────────────────────────────────────────────
  {
    id: "f65",
    title: "Automated Discovery of Fundamental Variables Hidden in Experimental Data",
    authors: ["Liu, Z.", "Tegmark, M."],
    year: 2022,
    venue: "Nature Computational Science",
    url: "https://doi.org/10.1038/s43588-022-00281-6",
    core_contributions: "AutoDiscovery is an algorithm that automatically identifies fundamental variables underlying physical systems directly from experimental measurements, without domain knowledge. The system applies an information-theoretic criterion to discover minimal sets of variables that fully describe system behavior, rediscovering known physical quantities (angles, angular velocities) from video data of pendulum and double-pendulum systems. It exemplifies AI Automation applied to the problem construction stage of scientific inquiry — autonomously determining what variables matter before hypothesis generation begins.",
    tool_types: ["Type 2"],
    research_stages: ["Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory"]
  },

  // ── ENTRY 66 ──────────────────────────────────────────────────────────────
  {
    id: "f66",
    title: "Automated Scientific Discovery: From Equation Discovery to Autonomous Agents",
    authors: ["Krenn, M.", "Pollice, R.", "Guo, S.Y.", "Aldeghi, M.", "Cervera-Lierta, A.", "Friederich, P.", "Gómez-Bombarelli, R.", "Häse, F.", "Kůs, P.", "Nigam, A.", "Roch, L.M.", "Ser, C.T.", "Vinokur, V.", "Aspuru-Guzik, A."],
    year: 2022,
    venue: "Nature Reviews Physics",
    url: "https://doi.org/10.1038/s42254-022-00518-3",
    core_contributions: "A comprehensive perspective on the trajectory of AI-driven scientific discovery, surveying automated equation discovery systems (symbolic regression, BACON-family programs) through to modern autonomous research agents. The paper introduces \"Popper\" as a conceptual framework for automated hypothesis generation and falsification loops inspired by Karl Popper's philosophy of science, arguing that true scientific discovery requires systems that can generate and rigorously test hypotheses in closed loops. Positions AI Automation as the leading edge of computational scientific creativity.",
    tool_types: ["Survey / Theory"],
    research_stages: [],
    creative_thinking_types: ["Divergent", "Convergent"],
    wallas_stages: ["Preparation", "Illumination", "Verification"],
    bodens_types: []
  },

  // ── ENTRY 67 ──────────────────────────────────────────────────────────────
  {
    id: "f67",
    title: "LLM-SR: Scientific Equation Discovery via Programming with Large Language Models",
    authors: ["Shojaee, P.", "Meidani, K.", "Barati Farimani, A.", "Reddy, C.K."],
    year: 2024,
    venue: "arXiv [cs.LG]",
    url: "https://arxiv.org/abs/2404.18400",
    core_contributions: "LLM-SR uses large language models to generate candidate scientific equations as executable programs, iteratively evolving them using evolutionary search guided by LLM scientific priors and symbolic regression fitness scores. The approach substantially outperforms prior symbolic regression methods on physics benchmarks, discovering correct closed-form equations for Kepler's third law and pendulum dynamics from noisy data. It extends AI Automation to the equation-discovery layer of research, where the generative and search processes run autonomously without researcher involvement in hypothesis formation.",
    tool_types: ["Type 2"],
    research_stages: ["Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation", "Illumination"],
    bodens_types: ["Exploratory"]
  },

  // Preparatory Scaffolding Tools (Mixed-Initiative — §2.2.2.1)

  // ── ENTRY 68 ──────────────────────────────────────────────────────────────
  {
    id: "f68",
    title: "CiteRead: Integrating Localized Citation Contexts into Scientific Paper Reading",
    authors: ["Rachatasumrit, N.", "Fok, R.", "Zhang, A.X.", "Weld, D.S."],
    year: 2022,
    venue: "ACM IUI",
    url: "https://doi.org/10.1145/3490099.3511162",
    core_contributions: "CiteRead is a reading interface that augments scientific papers with inline citation contexts — showing how each cited paper has been used by other works in the field, surfaced directly alongside the in-text citation. By making the citation ecosystem visible during reading, CiteRead scaffolds the researcher's information foraging process: rather than following citation trails to external pages, readers can immediately assess a cited paper's influence and relevance. A controlled study shows faster orientation to new research areas without loss of comprehension.",
    tool_types: ["Type 1"],
    research_stages: ["Information Foraging"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  },

  // ── ENTRY 69 ──────────────────────────────────────────────────────────────
  {
    id: "f69",
    title: "CiteSee: Augmenting Citations in Scientific Papers with Persistent and Personalized Historical Context",
    authors: ["Kang, D.", "Head, A.", "Weld, D.S."],
    year: 2023,
    venue: "ACM CHI",
    url: "https://doi.org/10.1145/3544548.3580847",
    core_contributions: "CiteSee augments in-text citations in scientific papers with personalized visual overlays that encode the reader's prior interaction history with cited works — marking papers the reader has already opened, annotated, or saved. By making personal reading history persistent and visible across papers, CiteSee reduces the cognitive overhead of tracking what is already known, helping researchers prioritize which citations to follow during information foraging without interrupting the flow of reading.",
    tool_types: ["Type 1"],
    research_stages: ["Information Foraging"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  },

  // ── ENTRY 70 ──────────────────────────────────────────────────────────────
  {
    id: "f70",
    title: "ComLittee: Literature Discovery with Personal Elected Author Committees",
    authors: ["Kang, D.", "Head, A.", "Hearst, M.A.", "Weld, D.S."],
    year: 2023,
    venue: "ACM CHI",
    url: "https://doi.org/10.1145/3544548.3581371",
    core_contributions: "ComLittee is a literature discovery interface in which researchers select a personal \"committee\" of authors whose papers best represent the work they care about. The system uses this committee to recommend new papers and rank search results, providing a personalized filter tuned to the researcher's intellectual identity rather than keyword matching alone. A user study shows researchers discover more relevant papers with less effort. ComLittee scaffolds information foraging by grounding discovery in human-curated taste rather than algorithmic opaqueness.",
    tool_types: ["Type 1"],
    research_stages: ["Information Foraging", "Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  },

  // ── ENTRY 71 ──────────────────────────────────────────────────────────────
  {
    id: "f71",
    title: "Relatedly: Scaffolding Literature Reviews with Existing Related Work Sections",
    authors: ["Choi, Y.", "Head, A.", "Kang, D.", "Weld, D.S."],
    year: 2022,
    venue: "ACM CHI",
    url: "https://doi.org/10.1145/3491102.3502047",
    core_contributions: "Relatedly helps researchers discover related work by repurposing existing related work sections from papers in the corpus. Given a seed set of papers, Relatedly surfaces other papers' related work sections that overlap substantially, letting the researcher see how prior authors organized relevant literature. This scaffolds both information foraging (discovering overlooked papers) and sensemaking (understanding how the research community structures the space), all without requiring the researcher to formulate new queries.",
    tool_types: ["Type 1"],
    research_stages: ["Information Foraging", "Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  },

  // ── ENTRY 72 ──────────────────────────────────────────────────────────────
  {
    id: "f72",
    title: "Threddy: An Interactive System for Personalizing Threads of Papers and Synthesizing Information",
    authors: ["Fok, R.", "Zhang, A.X.", "Weld, D.S."],
    year: 2023,
    venue: "ACM CHI",
    url: "https://doi.org/10.1145/3544548.3581011",
    core_contributions: "Threddy supports literature review by helping researchers build and navigate personalized \"threads\" — topically coherent paths through a paper corpus that connect thematically related works across time and venue. Unlike flat paper lists or citation graphs, threads organize papers around a conceptual through-line that the researcher defines. Threddy scaffolds analysis and sensemaking by externalizing the researcher's evolving understanding of a topic, and supports information foraging by surfacing related papers likely to extend each thread.",
    tool_types: ["Type 1"],
    research_stages: ["Information Foraging", "Analysis & Sensemaking"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  },

  // ── ENTRY 73 ──────────────────────────────────────────────────────────────
  {
    id: "f73",
    title: "Passage: Facilitating Research Paper Discovery via Scholar-Curated Passages",
    authors: ["Kang, D.", "Head, A.", "Hearst, M.A.", "Weld, D.S."],
    year: 2023,
    venue: "ACM SIGIR",
    url: "https://doi.org/10.1145/3539618.3591913",
    core_contributions: "Passage is a paper discovery system in which researchers save and annotate specific text passages — rather than whole papers — as the unit of interest. These passage collections are used to drive recommendation and search: the system identifies new papers containing passages similar to the researcher's saved ones, surfacing relevant work at the level of specific arguments or findings rather than overall paper topic. A study shows that passage-level bookmarking captures finer-grained research interests and yields more targeted discovery than paper-level systems.",
    tool_types: ["Type 1"],
    research_stages: ["Information Foraging"],
    creative_thinking_types: ["Convergent"],
    wallas_stages: ["Preparation"],
    bodens_types: []
  }

];
