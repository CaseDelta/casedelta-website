# CaseDelta: Product Roadmap & Operations Strategy

**Prepared for Camren Hall, Founder & CEO**
**Research Date: February 2026**

---

## Introduction

This document consolidates CaseDelta's future feature directions, on-premise deployment strategy, and open-source operations playbook into a single roadmap. It is the companion to the Strategy & Market Anchor Document and answers "where we're going and how we'll build it."

Three strategic threads run through every initiative here:

1. **Defensible moats over features.** In a market where AI commoditizes thin apps, power comes from compounding advantages — proprietary data loops, domain-specific tuning, and security certifications — that open-source clones and incumbents can't easily replicate. Every feature below is evaluated through a moat lens.

2. **Open-source as existential leverage.** As a solo founder, every component that can be adopted rather than built (CRM, OCR, billing, observability) represents 2–6 months of development saved. Open-source models closing the gap on proprietary ones (85–95% of Claude's capability on most tasks) means CaseDelta can offer AI at 50–80% lower cost than competitors locked into proprietary APIs — directly enabling our cost-conscious target market.

3. **On-prem as a security multiplier.** With 78% of firms citing privacy as the top adoption barrier and open-source models now achieving 90%+ accuracy on key benchmarks (AIME 2025: 87–97%, SWE-Bench: 70–73%), on-premise deployment is becoming feasible for small-mid firms. Hardware trends (NPUs at 10 TOPS/watt, Groq LPUs at 10x throughput with 90% less power than GPUs) point to autonomous, low-maintenance on-prem solutions by 2027–2028.

Directions are phased: near-term (6–12 months), mid-term (12–24 months), and long-term (24+ months). All align with AI's 46% CAGR in agents (to $93B by 2032), deflationary pricing (AI costs trending toward 1% of salaries), and value migration to intelligent layers (60% of software economics by 2030).

---

## I. Near-Term Directions (6–12 Months)

### A. Core Moats

#### 1. Proprietary Legal Insights Engine (Data Moat)

Evolve anonymized data aggregation into a fine-tuned "Insights Engine" that analyzes patterns across user documents — flagging anomalies in estate plans, predicting immigration form rejections based on aggregated trends, and surfacing patterns invisible to individual practitioners.

- **Moat mechanism.** This creates a flywheel: more users feed better models, yielding insights unattainable by humans or generic agents. Security (auto-PII redaction) ensures trust, while domain tuning (legal-specific fine-tuning on Bedrock) prevents commoditization. Competitors need years to amass similar data; our underserved focus accelerates collection from small firms.
- **Value delivered.** 40–60% faster case prep via predictive analytics, positioning CaseDelta as indispensable. Defends against open-source by requiring vast, compliant legal datasets (scarce outside BigLaw tools like Harvey.ai).
- **Monetization.** Premium tier ($10–20/mo add-on). Data moats drive 2–3x valuations; legal AI's 17% CAGR hinges on proprietary intelligence.

#### 2. Guardian Agents for Compliance (Security Moat)

Introduce "Guardian Agents" that monitor workflows in real-time — flagging ethical risks, ensuring privilege protection, auditing for bias and hallucinations — combined with automated PII detection at the document ingestion layer.

- **Moat mechanism.** Builds on security as a foundational barrier (78% adoption hurdle), compounding with agentic self-correction for 95%+ accuracy. Certifications (SOC2, bar approvals) plus proprietary algorithms create high barriers; open-source lacks legal nuance.
- **Value delivered.** Addresses lawyers' top fear (PII breaches), enabling adoption in risk-averse markets. Combines with data moats for adaptive learning (firm-specific compliance rules). 40% of agent failures stem from security issues — our moat mitigates, capturing the 92% of firms with planned AI investments.
- **Implementation accelerator.** Deploy Microsoft's **Presidio** (MIT license) as a Lambda preprocessing layer — every document passes through PII detection before hitting the agent pipeline. Add **Auditum** or **Retraced** for immutable audit trails connecting to SOC2 compliance goals.
- **Monetization.** Bundled in base tier; upsell enterprise audit packages.

#### 3. Active Agent Learning-Loop (Feedback Moat)

Implement a feedback-driven learning system where agents improve at specific tasks (contract review, document aggregation, PDF generation, any workflow) through user corrections and memory. When lawyers flag errors, provide corrections, or approve outputs, agents store this in firm-specific and cross-firm memory layers — fine-tuning task performance over time.

- **Moat mechanism.** Creates a proprietary improvement flywheel: more usage → better feedback → smarter agents → more value → more usage. Unlike static AI tools, agents compound expertise through lawyer-in-the-loop reinforcement. Memory persists across sessions (firm-level preferences, user-specific workflows, case patterns), making CaseDelta indispensable as it "knows" how each lawyer works. After 6 months, agents know a firm's playbook — migrating means starting from zero.
- **Value delivered.** Agents that get measurably better: 30% accuracy improvement in contract clause extraction after 50 feedback cycles, 2x faster document prep as agents learn templates. Transforms CaseDelta from "AI tool" to "AI colleague" that remembers corrections, adapts to preferences (citation styles, risk tolerance), and proactively suggests improvements.
- **Technical defensibility.** Competitors need (1) critical mass of users for feedback volume, (2) multi-tenant architecture to isolate/aggregate learnings, (3) legal-specific memory schemas (privilege-aware storage). Implementation requires advanced orchestration (ReAct agents) plus secure memory (SOC2 compliance) — generic copilots can't replicate without 12–18 months of R&D. Our underserved focus accelerates feedback density: 1,000 small firms generate more diverse corrections than 100 BigLaw users.
- **Monetization.** Bundled in base tier (drives retention); premium "Pro Memory" tier ($15–25/mo) unlocks cross-firm insights (anonymized benchmarks like "98% of estate plans with X clause avoid Y issue").

### B. Technical Foundations

#### 4. Agent Framework & Reasoning Enhancement

The reasoning gap between CaseDelta's agents and Claude Code isn't a framework problem — it's a model-level capability rooted in extended thinking, interleaved reasoning-plus-tool-use, and sophisticated context engineering. No open-source framework fully replicates this, but patterns and tools can significantly bridge the gap.

**Recommended hybrid architecture:**

- **Keep Strands as the orchestration layer.** Serverless-native, AWS-integrated, lightweight (350KB Lambda layer vs. 250MB Docker image). Now has multi-agent orchestration (July 2025), TypeScript support (December 2025), MCP integration, and edge deployment. Used in production by Amazon Q Developer.
- **Layer DSPy (Stanford, MIT license) for reasoning enhancement.** Declarative framework that optimizes prompts using MIPROv2 — benchmarks show it can boost ReAct accuracy from 24% to 51% on complex tasks. Tunes prompts Strands uses for reflection and reasoning without replacing the framework.
- **Implement explicit reflection checkpoints.** After each tool call, inject a meta-prompt asking the agent to evaluate results, check for contradictions, and decide whether to revise its approach. This approximates Claude Code's reflection loop at the prompt level.
- **Use model routing.** Route high-complexity tasks (100+ page contracts, multi-document synthesis) to Claude Opus with extended thinking (50,000 thinking tokens). Route routine tasks (classification, simple extraction) to Haiku or open-source models. The AgentFrame config-driven model already supports this via the `model_id` field.
- **Consider Agno (formerly PhiData, MIT license) for swarm patterns.** Creates agents at 2 microseconds each (10,000x faster than LangGraph), uses 3.75 KiB per agent (50x less), stateless and horizontally scalable. Excellent for multi-agent legal workflows — retrieval agent, analysis agent, and validation agent that focus on distinct reasoning modes.

**Other frameworks to monitor:** CrewAI (40,000+ stars, 1.8B agentic automations, role-based multi-agent — but LangChain dependency complicates Lambda bundles). SmolAgents (Hugging Face, ~1,000 lines of core code, code-first agents using 30% fewer steps, sandboxed execution, excellent serverless fit).

**Lambda bundle size strategy:** Target total deployment under 180MB (within 250MB limit). Strands SDK ~20MB, Anthropic client ~10MB, DSPy ~5MB, custom legal tools ~40MB, dependencies ~100MB. If tight, use Lambda container images (10GB limit) as an escape hatch.

#### 5. OCR & Document Analysis Pipeline

The OCR landscape has shifted dramatically in 2025–2026. Purpose-built open-source models now rival or exceed commercial services like AWS Textract at a fraction of the cost.

**Primary OCR engine — PaddleOCR v3.0** (Apache 2.0, 60,000+ stars): Enhanced handwritten text recognition (critical for signed legal documents), handles forms with checkboxes and signatures, built-in table detection via PPStructure, 80+ languages, runs on CPU (no GPU required for basic use), deployable on Lambda via Docker container images. At scale: 1M pages costs ~$120 self-hosted vs. ~$1,500 on Textract.

**Document conversion — Docling** (Apache 2.0, 37,000+ stars, IBM/Linux Foundation): Granite-Docling-258M model is ultra-compact, handles PDFs/DOCX/PPTX/XLSX/HTML/images, preserves table structure and reading order, 97.9% accuracy on complex tables. Converts everything to structured markdown or JSON for RAG ingestion.

**High-speed batch processing — LightOnOCR-2-1B** (Apache 2.0): 5.71 pages/second on H100, under $0.01 per 1,000 pages, 9x smaller than competing models.

**Unified OCR — GOT-OCR2.0**: Single model handling plain text, mathematical formulas, tables, charts. 580M parameters (needs GPU) but handles document types traditional OCR can't touch.

**Legal document understanding — LayoutLMv3** (Microsoft, MIT): Fine-tuned versions show 12% improvement identifying legal elements (titles, sections, entities), can identify clause types ("Termination Clause," "Indemnification Clause"), reduces contract analysis time from weeks to hours.

**Document ETL — Unstructured.io**: Partitions documents into structured elements, cleans extracted text, stages for downstream processing. SCORE-Bench benchmark covers legal, healthcare, and finance documents.

**Document reconstruction — MinerU 2.0** (open-source): Image extraction, table-to-HTML, formula-to-LaTeX, multi-language OCR (109 languages), handwriting recognition, lightweight multimodal model included.

**Legal-specific tools:**
- **OpenContracts** (AGPL-3.0): Enterprise-grade contract analysis with ML-based PDF extraction, custom schema annotation, AI agents for document chat, structured data extraction, and redaction.
- **Legal NER models** on Hugging Face: Primarily language-specific (Serbian, German, Indian English, Italian). US English legal NER requires fine-tuning a base model — connects to future model training ambitions.
- **Eyecite**: Specialized legal citation extraction with high precision for case law analysis.

**Phased deployment (no GPU required to start):**
- Phase 1 (immediate): PaddleOCR on Lambda via Docker + Docling for structured conversion. ~$350/month for 1M documents.
- Phase 2 (3–6 months): Add LayoutLMv3 on SageMaker Serverless for clause identification, entity extraction, document classification. Add Unstructured.io as preprocessing ETL.
- Phase 3 (6–12 months): Deploy LightOnOCR or GOT-OCR2.0 on SageMaker for complex documents. Integrate OpenContracts for annotation. Begin fine-tuning legal NER models.

**Cost comparison at 1M pages/month:** Textract ~$1,500. PaddleOCR on Lambda ~$350. Hybrid (PaddleOCR for 90%, SageMaker for complex 10%) ~$800.

### C. On-Prem Foundations

#### 6. Modular On-Prem Agent Kit with Hardware Partnerships

Package CaseDelta as a deployable "kit" for on-prem: Dockerized agents (ReAct/LangGraph) optimized for open-source models (DeepSeek for reasoning, Qwen for multilingual docs), with auto-setup scripts for low-spec hardware (NPU-equipped laptops or mini-servers).

- **Moat mechanism.** Integrate proprietary data moats (anonymized fine-tuning from cloud users) for legal-specific accuracy (95%+ on case extraction), plus security (deterministic inference via Groq-like LPUs for no-variability audits). Hardware partnerships (e.g., Groq for LPUs) create lock-in.
- **Value delivered.** Enables "plug-and-play" on-prem (run on a $1K Mac Mini with NPU), automating 30% of workflows offline — addressing PII fears while matching cloud speed (276 tokens/sec on LPUs vs. GPU 10–100). Model-agnostic design defends against obsolescence (swap DeepSeek for future models).
- **Monetization.** One-time license ($5K/firm) + updates subscription. On-prem breakeven in 4 months for >20% utilization.

#### 7. Autonomous Maintenance Layer with Edge Optimization

Add self-updating agents that handle patches, model swaps (auto-download Qwen updates), and diagnostics — minimizing IT needs ("silent mode" for noise/cooling, auto-optimize for NPUs).

- **Moat mechanism.** Compound security moat with deterministic execution (no hallucinations in audits), using data loops for predictive maintenance (flag hardware wear from usage patterns). Proprietary diagnostics algorithms; open-source can't match legal compliance without our tuning.
- **Value delivered.** Transforms on-prem from "cumbersome" to autonomous (laptop-like interface), reducing TCO by 50% (no 2-year obsolescence via software upgrades). Supports "superhuman" tasks like real-time PII redaction.
- **Monetization.** Subscription for updates ($10/user/mo). Hardware costs are dropping (NPUs 10 TOPS/watt); inference expected to exceed 50% of compute by 2026.

---

## II. Mid-Term Directions (12–24 Months)

### A. Platform Expansion

#### 8. Horizontal Agentic Orchestration with Open Data APIs

Enable custom agent "swarms" that orchestrate across ecosystems (pull Clio data, analyze in real-time, push to Gmail/Notion), with open APIs for third-party extensions.

- **Moat mechanism.** Open data fosters integrations and network effects, while legal-tuned agents (ReAct/LangGraph) provide edge over generics. Data moats enhance with usage (optimize based on firm patterns). Switching costs compound through customized agents.
- **Value delivered.** Becomes the "Ultron" workspace, automating 30–50% of workflows cross-tool — far beyond sandboxed copilots. Open ecosystems outpace closed by 20–30%.
- **Monetization.** API usage fees; integration partnerships.

#### 9. Agent-Infused Legal CRM

This is the highest-overlap initiative across all three source strategies. The approach: build on open-source rather than from scratch, then differentiate with agentic intelligence and data moats.

**Market context.** There are no production-ready open-source legal CRMs. Clio dominates at $59/user/month. This is an opportunity — an open-source-based legal CRM with agentic smarts would face zero open-source competition and could undercut Clio significantly.

**Foundation — Odoo CRM** (strongest candidate): Python/Vue.js ERP suite, 32,000+ GitHub stars, 4,000+ contributors, built-in time tracking, invoicing, multi-tenancy, AGPLv3 community edition plus commercial licenses available. Most complete out-of-the-box feature set.

**Alternatives evaluated:**
- **ERPNext (Frappe Framework)**: Python-based, 32,000+ stars, multi-tenant, complete billing/invoicing, clean API-first design. AGPLv3 with commercial options.
- **Twenty CRM**: TypeScript/React, 40,000+ stars, modern architecture, but lacks time tracking and billing entirely. Significant custom development needed. AGPLv3.

**License considerations.** AGPLv3 requires source code disclosure when offered as SaaS. Options: (a) negotiate a commercial license with Odoo (available), (b) open-source the legal customization layer (strategic trust advantage with lawyers), or (c) architect the CRM as a separate, bounded service where AGPL obligations are contained.

**Recommended approach.** Start with Odoo's community edition containerized on ECS. Build a thin integration layer connecting Odoo's contact/matter records to CaseDelta's document analysis pipeline. Legal-specific customizations — matter types, court deadlines, statute of limitations tracking, conflict checking — become the differentiating layer. Price as a bundled add-on at $25–35/user/month (undercutting Clio by 40–50%).

**Agentic enhancements (the moat layer):**
- Auto-populate cases from analyzed documents, predict delays via data moats, orchestrate tasks ("assign review based on workload").
- 60% faster case management vs. Clio via proactive agents ("flag expiring deadlines based on doc trends").
- Unique features: "Ethical Simulator" (run hypotheticals on cases), "Ethical Auditor" (simulate privilege risks).
- On-prem variant with deterministic execution (no cloud latency), offline capability for PII-sensitive firms.

**Build-vs-wrap decision.** Don't build standalone CRM — it's commoditized (Clio dominates). Integrate only if data shows demand (70% of small firms use basic tools). Full build only if moats (data/security) make it 2x better, else stay as wrapper (faster entry, no direct competition, but API reliance).

**Monetization.** Tiered at $50–100/mo for full suite. Legal management TAM: $3.9B.

#### 10. Dynamic Outcome Pricing

Implement AI-driven pricing that adjusts per outcome ($1–5 based on complexity/savings), tracked via dashboards showing ROI ("Saved 5 billable hours").

- **Moat mechanism.** Ties to data moats for accurate valuation (benchmark against aggregated efficiencies). Proprietary metrics algorithms; competitors struggle without equivalent data depth.
- **Value delivered.** Aligns with the services-economy shift, capturing "unique value" (impossible tasks like multi-doc synthesis) — boosting LTV 4x over seat-based models. Value-based models grow 20–30% faster.
- **Monetization.** Scales with usage; 60% of software economics shifting to agents by 2030.

### B. Data & Model Strategy

#### 11. Federated Data Moats for On-Prem Insights

Enable opt-in federated learning across on-prem instances — share anonymized patterns without data leaving devices, building global benchmarks ("industry asset division trends") while keeping PII local.

- **Moat mechanism.** Creates network-scale data moats without centralization, fine-tuning models on-device for 20–30% better accuracy. Federated protocols ensure privacy; competitors need our user base for comparable insights.
- **Value delivered.** Delivers unique value (predictive case outcomes from aggregated trends), impossible without our ecosystem — defending against commoditization by requiring scale.
- **Monetization.** Premium "Federated Insights" ($20/mo). Data transformation drives winners (Databricks 60% growth); legal's scarce datasets amplify moats.

#### 12. Open-Source Model Strategy & Distillation

The gap between proprietary and open-source agentic capabilities has narrowed dramatically. This validates a BYOM (bring-your-own-model) strategy where AgentFrame becomes more valuable as a model-agnostic orchestration layer.

**The Distillation Story.** Anthropic disclosed in late February 2026 that ~24,000 fraudulent accounts generated over 16 million exchanges with Claude. DeepSeek conducted 150,000+ exchanges targeting foundational logic. Moonshot AI (Kimi) conducted 3.4M+ exchanges targeting agentic reasoning, tool use, and coding. MiniMax conducted 13M+ exchanges targeting agentic coding and orchestration. These labs specifically targeted Claude's most differentiated capabilities: multi-step planning, tool orchestration, code generation, and computer-use.

**Open-source agentic leaderboard (February 2026):**

| Model | Key Benchmark | Notes |
|---|---|---|
| GLM-4.7 | 73.8% SWE-bench (vs. Claude Opus 4 at 72.5%) | 90.6% tool-calling success rate |
| Qwen3-Coder-Next (80B) | 70%+ SWE-bench | MCP support, 256K context (extendable to 1M), designed for OpenClaw/Claude Code/Cline |
| Qwen 3.5 (397B, 17B active MoE) | 78.6% BrowseComp | Outperforms every US frontier model on web browsing; 201 languages |
| DeepSeek V3.2 | GPT-5-level performance | V3.1 excels in tool usage; autonomous agent planned for end of 2026 |
| Llama 4 Maverick (17B active, 128 experts) | Matches DeepSeek V3 on reasoning/coding | 1M context (Scout: 10M tokens); Apache 2.0 |
| Phi-4-Reasoning-Plus (Microsoft) | Outperforms 671B DeepSeek-R1 on AIME 2025 | Complex legal reasoning at fraction of compute |
| Mistral Devstral 2 | 72.2% SWE-bench | State of the art for open models in agentic coding |

**Capability gap summary.** Code/software engineering: 85–95% of Claude. Tool use: 90–100% (sometimes superior). Reasoning: 85–95%. Primary remaining gaps: computer-use (Claude Sonnet 4.5 leads at 61.4% on OSWorld) and sustained multi-turn agentic workflows (Claude Code's extended thinking advantage).

**Tiered model selection opportunity.** CaseDelta can offer within the same agent configuration: Opus for high-stakes contract analysis ($2–5 per analysis), Sonnet for routine review ($0.10–0.50), open-source model like Qwen3-Coder for batch processing ($0.01–0.05 per document).

**Fine-tuning a legal-specific model.** Cost: $2,500–7,000 using modern tooling like Unsloth (77% compute reduction). Approach: use Claude or Qwen as teacher to generate 10,000–50,000 synthetic legal Q&A pairs, then fine-tune a smaller model (Phi-4 or Llama 4). Timeline: 6–12 weeks from start to production-ready. Result: 50–80% less cost than Claude API calls, tuned specifically for CaseDelta's legal workflows. This becomes the data moat that competitors can't replicate without years of equivalent legal training data.

---

## III. Long-Term Directions (24+ Months)

#### 13. Hardware-Agnostic On-Prem Orchestrator with LPU/NPU Optimization

Evolve to a "universal" orchestrator supporting emerging hardware (Groq LPUs for 1,665 tokens/sec, NPUs for edge), with auto-configuration for autonomous racks (minimal cooling/noise).

- **Moat mechanism.** Optimize via data moats for hardware-specific tuning (90% less power on LPUs). Tuning requires our datasets; hardware partnerships (Groq) create exclusivity.
- **Value delivered.** Enables "future-proof" on-prem (swap hardware without rebuilds), scaling to 50%+ automation offline. Costs dropping (breakeven in 4 months); inference exceeding 50% of compute.
- **Monetization.** Hardware bundles and partnership revenue.

#### 14. Multi-Firm Federation Network

Create secure, on-prem federated networks for co-counsel — shared agents across firms with PII isolation, enabling anonymized benchmarks and collaborative workflows.

- **Moat mechanism.** Scales data moats federatedly, creating ecosystem lock-in. Federated learning preserves privacy; scale creates barriers for newcomers. Expands data moats network-wide for exponential insights.
- **Value delivered.** "Superhuman" collaboration (cross-firm benchmarks, co-counsel agent workflows), unique in legal. Scales to enterprise, enabling 50%+ automation in networks.
- **Monetization.** Network fees. 92% of firms plan AI collaboration; on-prem addresses security.

---

## IV. Infrastructure & Open-Source Stack

These are solved problems where open-source is mature and the license terms are manageable. Each represents 2–6 months of development saved.

### Billing & Metering

**Lago** (AGPLv3, 9,340+ stars): Purpose-built for event-driven metering — handles CaseDelta's per-outcome pricing ($0.99/analysis). Processes 15,000 events/sec, supports hybrid subscription-plus-usage models, integrates with Stripe, used by Mistral AI. Self-hostable via Docker.

**Kill Bill** (Apache 2.0): Safer license alternative — mature since 2010, Fortune 500 usage, multi-tenant white-label, prepaid/postpaid models. More heavyweight but no AGPL concerns.

Replaces the current simple invocation logging approach (`platform_invocations` table with token counts and duration) with a real billing system for Phase 2.

### LLM Observability

**Langfuse** (MIT, 9,000+ stars): Open-source LLM observability with traces, latency metrics, cost tracking, prompt management, evaluations, and full OpenTelemetry integration. Self-hostable, no vendor lock-in, recently acquired by ClickHouse. Integrates with LangChain, LlamaIndex, and can wire into Strands via OpenTelemetry exports.

Solves the observability gap ("Fragmented — CloudWatch + custom"). Deploy on ECS and instrument every agent invocation for per-tenant trace visibility — the "unified tracing, evals, error recovery" differentiator for AgentFrame.

### PII Detection & Compliance

**Presidio** (MIT, Microsoft): Detects and redacts credit cards, SSNs, names, locations, phone numbers via pattern matching plus NER. Deploy as a Lambda preprocessing layer. Directly supports Guardian Agents (Section I.A.2).

**Auditum / Retraced**: Event-level audit logging — every agent action (document accessed, analysis performed, result generated) gets an immutable record. Connects to SOC2 compliance goals.

### Vector Search (RAG Infrastructure)

**pgvector**: Already available through the Supabase stack. Combines relational queries with vector similarity search, HNSW indexing, sub-second latency for under 1M vectors. Adding pgvector is essentially free infrastructure.

**Qdrant** (SSPL/Apache 2.0 dual license, Rust-based): Sophisticated metadata filtering mapping to `firm_id` + `case_id` + `tenant_id` isolation. Could complement or eventually replace the shared Bedrock Knowledge Base — removing the AWS 100 KB per account limit.

### Developer Platform

**Appsmith** (Apache 2.0, 35,000+ stars): Drag-and-drop admin UI builder for the AgentFrame dashboard (Phase 2). Ship an MVP dashboard in days instead of building React from scratch.

**Redoc** (MIT): Generates 3-panel API documentation from OpenAPI specs — for the developer portal AgentFrame will need.

**OpenAPI Generator**: Produces Python and TypeScript SDKs automatically from API definitions — the exact SDKs in the Phase 3 public launch plan.

---

## V. Strategic Synthesis: The Open-Source Playbook

### Where Open-Source Gives CaseDelta an Unfair Advantage

**Speed to market.** Every component above — CRM, OCR, observability, billing, vector search — represents months of development avoided. As a solo founder, this is existential leverage.

**Cost structure.** Open-source models at $0.001–0.01 per 1K tokens vs. Claude API at $0.01–0.15 means CaseDelta can offer AI at 50–80% lower cost than competitors locked into proprietary APIs. This directly enables the target market of cost-conscious small-to-mid firms.

**Trust narrative.** Lawyers are risk-averse. "Our AI pipeline is built on auditable open-source software" is a stronger security story than "trust our proprietary black box." This converts the AGPL obligation from a burden into a marketing advantage.

**BYOM for AgentFrame.** As open-source models become agentic-capable, AgentFrame's value proposition strengthens — it becomes the abstraction layer letting developers choose any model (open or closed) while getting multi-tenancy, governance, and compliance. The more models exist, the more valuable a model-agnostic platform becomes.

### Where Open-Source Doesn't Win (Yet)

**Deep agentic reasoning.** Claude Code's extended thinking architecture remains ahead for sustained, reflective, multi-turn agent workflows. The gap is closing but not closed. For CaseDelta's highest-stakes use cases (complex contract analysis, multi-document synthesis), Claude/Opus remains the best choice for the next 12–18 months.

**Turnkey compliance.** SOC2 certification, HIPAA compliance packs, and legal-specific governance still require significant custom work regardless of open-source components. Presidio helps, but compliance is a process, not a product.

**Production reliability at scale.** Open-source OCR, vector databases, and agent frameworks are production-ready, but they require operational expertise that managed services (Textract, Bedrock KB) abstract away. Cost savings are real but come with an ops burden.

### The Four-Layer Strategy

1. **Layer 1 — Commodity infrastructure.** CRM (Odoo), OCR (PaddleOCR + Docling), vector search (pgvector), billing (Lago), observability (Langfuse), PII detection (Presidio). Solved problems where open-source is mature.
2. **Layer 2 — Cost-efficient models.** Deploy Qwen3-Coder or Phi-4-Reasoning for routine tasks, reserve Claude for high-complexity analysis. Implement model routing in agent config.
3. **Layer 3 — Proprietary value on top.** Legal domain tuning, feedback learning loop, firm-specific memory, compliance certifications, trust-building marketing. This is where CaseDelta's moat lives.
4. **Layer 4 — Train your own model when ready.** Distillation (Claude/Qwen as teacher, Phi-4/Llama as student) to create a legal-specialized model. Cost: $2,500–7,000. Timeline: 6–12 weeks. The deepest moat.

---

## VI. Risks & Defensibility

### Commoditization

All features leverage moats (data/security/domain) to outpace open-source. Legal tuning requires specialized datasets that CaseDelta amasses through its underserved-firm focus. Moats elevate commodities (CRM via agents becomes >2x more powerful); open-source alone lacks legal depth.

### Obsolescence (Hardware & Models)

Modular design plus data moats ensure value persists beyond any specific hardware or model generation. Insights compound regardless of the underlying model. Model-agnostic architecture means swapping DeepSeek for future models requires no rebuilds.

### Cost Feasibility (On-Prem)

Trends support the bet: NPUs at 10 TOPS/watt, LPUs 10x more efficient than GPUs. Current on-prem setups cost $20K–$100K+ upfront with 2–3 year obsolescence cycles, but autonomous low-maintenance solutions are projected by 2027–2028. Defend with benchmarks showing breakeven in months at >20% utilization.

### Market Alignment

Deflation favors efficient agents; CaseDelta benefits like Databricks (data-driven growth). Power from "unique value" (superhuman insights) defends against the 40% agent failure rate. PII tailwind (78% barrier) is captured via security-first positioning and on-prem options, enabling 4–10x growth.

### Pivot Flexibility

Modular design allows adaptation across all directions. Underserved focus yields loyal data sources that feed every moat. Each feature is independently valuable — no single bet is existential.

---

## Appendix A: Open-Source License Quick Reference

| Tool | License | Commercial SaaS OK? | Notes |
|---|---|---|---|
| Odoo CRM | AGPLv3 / Commercial | Yes (with commercial license) | Dual licensing available |
| ERPNext | AGPLv3 / Commercial | Yes (with commercial license) | Frappe offers commercial terms |
| Twenty CRM | AGPLv3 | Requires source disclosure | Or negotiate commercial license |
| PaddleOCR | Apache 2.0 | Yes, fully | No restrictions |
| Docling | Apache 2.0 | Yes, fully | IBM / Linux Foundation backed |
| LayoutLMv3 | MIT | Yes, fully | Microsoft Research |
| Presidio | MIT | Yes, fully | Microsoft |
| Langfuse | MIT | Yes, fully | Now ClickHouse-backed |
| Lago | AGPLv3 | Requires review | Consider Kill Bill (Apache 2.0) |
| pgvector | PostgreSQL | Yes, fully | Extension of PostgreSQL |
| Qdrant | SSPL / Apache 2.0 | Yes, fully | Dual license |
| Appsmith | Apache 2.0 | Yes, fully | No per-user fees |
| Strands | MIT | Yes, fully | AWS-backed |
| DSPy | MIT | Yes, fully | Stanford NLP |
| Agno | MIT | Yes, fully | Lightweight alternative |
| Qwen 3 | Apache 2.0 | Yes, fully | Alibaba / open weights |
| Llama 4 | Apache 2.0 (community) | Yes, fully | Meta |
| Phi-4 | MIT | Yes, fully | Microsoft |
| OpenContracts | AGPLv3 | Requires source disclosure | Legal-specific tool |

## Appendix B: Immediate Action Items

1. **This week**: Evaluate Odoo CRM's community edition — spin up a Docker instance and map its data model against CaseDelta's client/matter structure.
2. **This week**: Deploy Presidio as a Lambda layer for document preprocessing. Low-effort, high-impact for the security narrative.
3. **Next 2 weeks**: Test PaddleOCR v3.0 on actual legal documents (contracts, financial disclosures, immigration forms). Compare accuracy and speed against current pipeline.
4. **Next 2 weeks**: Set up Langfuse on ECS and instrument Strands agent invocations. Observability foundation for both CaseDelta and AgentFrame.
5. **Next month**: Implement DSPy-based prompt optimization for Strands reflection prompts. Benchmark against current agent performance on legal document analysis.
6. **Next month**: Test Qwen3-Coder on Bedrock as an alternative model for routine document classification. Compare cost and quality against current Llama 3.3 default.
7. **Next quarter**: Begin legal model fine-tuning project — curate 5,000 legal document examples, use Claude as teacher, fine-tune Phi-4 as student.
8. **Next quarter**: Integrate pgvector into Supabase for RAG, reducing dependency on shared Bedrock Knowledge Base.
