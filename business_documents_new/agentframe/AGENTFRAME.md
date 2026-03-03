# AgentFrame: The Secure, Multi-Tenant PaaS for Regulated Agentic SaaS

**Prepared for Camren Hall, Founder & CEO**
**February 2026**

---

## Executive Summary

AgentFrame is a Platform-as-a-Service that lets developers deploy config-driven, multi-tenant AI agents via API. It was born out of necessity: CaseDelta, our AI-powered legal document analysis platform, required sophisticated agentic infrastructure — multi-tenant data isolation, cost attribution, deterministic governance, and regulatory compliance — that no existing platform provided. Rather than treat this infrastructure as a sunk cost, we're spinning it out as a standalone product. The infrastructure becomes the business.

This is the "George Lucas" play. Just as Lucas built Industrial Light & Magic for Star Wars and then spun it out as the dominant visual effects company, CaseDelta built agent infrastructure for legal tech and is now productizing it for the broader market. CaseDelta becomes "tenant #1" on AgentFrame — both proving the platform works in production and continuously improving it through real usage.

**The core thesis:** The agentic AI market is exploding (~$7–10B in 2026, growing at 42–46% CAGR to $50–200B by 2030–2034), but developers building agentic features for regulated industries face insurmountable infrastructure hurdles. No single platform nails horizontal SaaS-scale agent development with true multi-tenancy, cost attribution, bring-your-own-model flexibility, and production observability. AgentFrame fills that gap — the missing "Stripe for agent orchestration" that lets SaaS builders ship reliable agents fast without reinventing tenancy, observability, governance, or cost controls.

**Seeking $3M seed at $12M pre-money** to launch beta and scale.

---

## The Problem

Agentic AI — autonomous systems that plan, reason, and execute multi-step workflows — is the next platform shift. But regulated industries (legal, fintech, healthcare) face a collision between AI's promise and their compliance reality.

**Developer pain points:**

- **Security.** 90% of enterprises cite AI security as their top concern. PII handling, data isolation, and audit trails are non-negotiable in legal, finance, and healthcare — yet no existing platform provides deterministic multi-tenant isolation out of the box. Developers hack it with manual IAM plumbing and metadata filtering.
- **Cost unpredictability.** Long-context agent calls spike bills with no warning. Per-tenant cost attribution — essential for any SaaS business charging customers for AI features — is manual or absent across every major platform.
- **Production fragility.** Going from a working prototype to production is a 3–6 month slog. Popular open-source frameworks suffer from memory leaks, concurrency limits, and breaking changes that make them unsuitable for regulated workloads.
- **Compliance gaps.** Generic cloud platforms offer generic security. They don't provide the deterministic governance, audit trails, hallucination guards, or PII redaction that regulated industries require.

**Business inhibitors:**

- **Gartner estimates >40% of enterprise agent projects will be cancelled by end-2027** due to cost overruns, control gaps, unclear ROI, and production complexity.
- **Shadow AI is emerging** — employees adopting unvetted AI tools — risking data breaches in exactly the environments that can least afford them.
- **Mid-market SaaS builders ($10M–$1B revenue) are stuck.** They can't afford enterprise platforms ($100K+/year) or on-prem setups ($500K+ hardware), but they need production-grade infrastructure to ship agentic features their customers demand.

The surviving 60% of agent projects will demand better infrastructure. The question is who builds it.

---

## Why Existing Solutions Fall Short

We didn't set out to build a platform. We were building CaseDelta — an AI legal document analysis tool for small-to-mid market lawyers — and discovered firsthand that no existing infrastructure could support what we needed. Every platform we evaluated had critical gaps for regulated, multi-tenant SaaS.

| Platform | What It Does Well | Where It Falls Short |
|---|---|---|
| **AWS Bedrock Agents** | Enterprise-grade, model variety | Ecosystem lock-in, weak multi-tenancy (manual IAM plumbing), generic compliance |
| **LangGraph Platform** | Code-first, flexible graphs | Production-fragile: memory leaks, concurrency limits, breaking changes |
| **OpenAI Assistants API** | Simple developer experience | Sunsetting August 2026 — platform risk for any production system |
| **Vertex AI Agent Builder** | Google ecosystem integration | Google lock-in, limited regulated vertical readiness |
| **CrewAI** | Open-source, role-based agents, 40K+ GitHub stars | Fragile for production workloads, LangChain dependency |
| **Visual builders (Kore.ai, Glean)** | Low-code accessibility | No-code bias limits developer control; regulated firms need auditability |
| **Vertical specialists (Lumay AI, Kanerika)** | Compliance focus | Lack horizontal scalability; single-vertical lock-in |

**The central gap:** No platform combines true multi-tenant isolation, cost attribution, bring-your-own-model flexibility, production observability, and regulatory governance in one horizontal product. Every SaaS developer building agents for regulated verticals is reinventing the same infrastructure from scratch.

### What CaseDelta's Build Taught Us

Building CaseDelta forced us through every painful infrastructure decision that regulated agent developers face. Several of these experiences directly validate why AgentFrame is needed:

**The multi-tenancy problem is deeper than it looks.** CaseDelta serves multiple law firms on shared infrastructure. Every document query, every RAG search, every agent memory scope must be deterministically isolated by firm. Existing platforms treat multi-tenancy as a metadata filter you configure yourself. We had to build three layers of isolation — platform tenant, agent configuration, and end-user session — enforced at the infrastructure level so that misconfiguration by a developer can't cause cross-tenant data leakage. This is the kind of hard-won primitive that every regulated SaaS builder needs but no one wants to build from scratch.

**Framework instability is a real production risk.** Our agent runtime has already migrated once — from LangGraph on AgentCore (Docker-based, 250MB images, minutes to deploy) to a lighter serverless architecture (350KB, deploys in seconds). The migration was driven by a fundamental multi-tenancy flaw: the previous framework required the LLM itself to correctly pass tenant identifiers to tools — meaning isolation depended on the model not hallucinating the wrong firm ID. The replacement injects tenant context at the code level, making isolation deterministic. Any developer building on today's frameworks will face similar migration pain as the ecosystem matures. AgentFrame absorbs that instability so developers don't have to.

**"Bring your own everything" is the right abstraction.** We learned that the most powerful design principle is treating everything external as a tool. A RAG search, a database query, a third-party API call — they're all just HTTP endpoints the agent can invoke. This means AgentFrame doesn't need database drivers, RAG provider SDKs, or connection pooling for arbitrary systems. Developers point their agent at their own infrastructure and own their logic. The platform handles orchestration, isolation, and governance.

**Cost visibility is table stakes.** Every agent invocation in CaseDelta logs the model used, tokens consumed, execution duration, and the tenant who triggered it. Without this, we couldn't predict our own AWS bill, let alone build a sustainable business. We discovered that cost tracking isn't a nice-to-have — it's the foundation for pricing, capacity planning, and the per-tenant attribution that any SaaS business needs to charge fairly for AI features.

---

## Market Context & Timing

### Market Size

The agentic AI infrastructure market is projected at ~$7–10B in 2026, growing to $50–200B by 2030–2034 at 42–46% CAGR (Grand View Research: 46.2%, MarketsandMarkets: 44.6%, Mordor Intelligence: 42.14%). The regulated subset — healthcare, fintech, and legal — represents $25–30B of that total but lags in adoption due to compliance needs. This is where AgentFrame plays.

### Why 2026 Is the Inflection Point

**Post-hype, pre-mass failures.** Agentic AI has exited the experimentation phase. 68% of CEOs plan AI investment increases (NTT/WSJ). 80% of healthcare executives expect AI value delivery in 2026 (Deloitte). Model maturity (Claude Opus 4.6, GLM-4.7, Qwen 3.5) now enables reliable multi-step reasoning. But the infrastructure hasn't kept pace with the ambition — creating the exact gap AgentFrame fills.

**PaaS is evolving.** The platform-as-a-service model is shifting from static cloud hosting to intelligent agentic orchestration — platforms with self-improving agents, multi-agent teams, and embedded governance (IBM: "From monolithic AI to orchestrator agents"). By 2026, PaaS increasingly embeds AutoML, real-time ETL, and hybrid deployment. AgentFrame rides this evolution rather than fighting it.

**Security apprehension creates opportunity.** 48% of organizations see AI as their top security threat (Kiteworks). AgentFrame turns this fear into a selling point with compliance-by-design: audit trails, PII redaction, hallucination guards, and deterministic tenant isolation built into the platform layer rather than bolted on by individual developers.

**Hardware trends favor the platform.** On-premise is rising for data sovereignty (NVIDIA GB200 racks are projected to drop costs 30–50% by 2027), but mid-market favors hybrid cloud (Deloitte: "strategic hybrid" shift). AgentFrame positions as cloud-first, hybrid-ready — cheaper hardware powers better governance through our data flywheel, while hybrid deployment kits serve sovereignty-sensitive customers.

### The Window

The 2026–2028 window is open for an early mover focused on regulated SaaS builders. Incumbents are catching up on multi-tenancy (AWS Bedrock improving metadata filtering, LangGraph adding stability patches), but they remain generic. A purpose-built platform for regulated verticals has 18–24 months of positioning advantage before the gap narrows.

---

## The Solution: AgentFrame

AgentFrame is a secure, multi-tenant PaaS for deploying agentic workflows. A developer can go from zero to a working multi-step AI agent — with built-in RAG, multi-tenant data isolation, and cost tracking — by calling a single API endpoint.

### What Developers Get

- **Config-driven agents.** Define an agent (system prompt, model, tools, tenant isolation rules) via JSON configuration. No visual builder, no code upload — just a config that the platform executes. Modify the agent via API without redeploying anything.
- **Native multi-tenant isolation.** Three layers of deterministic isolation: platform tenant (the developer), agent configuration (the AI's scope), and end-user session (the developer's customer). Tenant identifiers are injected at the infrastructure level — developers cannot accidentally leak data across tenants.
- **Per-tenant cost attribution.** Every invocation logs the model, tokens, duration, and tenant. Dashboards, quotas, and throttling come built in. Noisy-neighbor protection ensures one tenant's usage can't degrade another's experience.
- **Bring-your-own-model.** Model-agnostic by design. At launch, supports every model available on AWS Bedrock (Claude, Llama, Mistral, Titan). External inference providers (Groq, OpenAI, Anthropic direct) follow in Phase 2 as customer demand dictates.
- **Bring-your-own-everything via HTTP tools.** Agents connect to any external system through HTTP endpoint tools. A Pinecone vector store, a PostgreSQL database, a third-party API — they're all just tool endpoints. The platform handles orchestration; developers own their logic and data.
- **Regulated-vertical defaults.** Legal-tuned governance out of the box: audit trails, hallucination guards, privilege simulation, PII redaction hooks. Expandable to fintech (SOX), healthcare (HIPAA), and other compliance frameworks via compliance packs.
- **Production-grade operations.** Unified tracing, evaluation pipelines, error recovery, and production failure replay. Not the fragmented "CloudWatch plus custom" experience that developers suffer through today.
- **Long-running and background tasks.** Native persistence and resumable state for agents that run for minutes or hours — no clunky polling hacks or session management workarounds.
- **OAuth and external tool federation.** Built-in OAuth proxy with per-tenant credential isolation. Developers connect Google Drive, Dropbox, Clio, or any OAuth-secured system without writing their own federation layer.
- **Universal platform connections.** A first-class "Connection" primitive that lets agents authenticate to any third-party platform — via OAuth (for platforms that support it), credential-based session management (for platforms without APIs), or API keys. Connections store a per-platform API reference documenting endpoints, pagination patterns, and data models. Once a platform is mapped by any tenant, every subsequent tenant reuses the reference. This enables any AgentFrame-powered app to integrate with arbitrary SaaS platforms, including those without public APIs — a capability no competing platform offers.

### Core "Wow"

A developer signs up, gets an API key, configures an agent, and invokes it programmatically. The agent performs multi-step reasoning (plan → execute tools → observe results → reflect → respond) with full tenant isolation, cost tracking, and compliance guardrails — all via a single API call. What currently takes 3–6 months of infrastructure work ships in days.

---

## Strategic Positioning

**Tagline:** "The secure, multi-tenant runtime for horizontal agents — built for regulated SaaS."

Alternatively: "Stripe for Agents — built from legal tech battlegrounds."

**Target Persona:** Mid-market SaaS developers and founders building agentic features in verticals with compliance needs — legal tech, fintech, healthtech, insurance, HR tech. Companies at $10M–$1B revenue that can't afford enterprise platforms ($100K+/year) but need production-grade infrastructure.

**Value Proposition:** "Ship production-grade, multi-tenant agents 3–6x faster without rewriting tenancy, observability, governance, or cost controls. Stay model-agnostic, keep your margins, and pass compliance audits."

### The Moat Stack

1. **Domain-hardened security & governance.** Battle-tested in legal PII workflows, not theoretical compliance checklists. AgentFrame's guardrails were built because lawyers demanded them.
2. **Production-grade multi-tenancy.** Deterministic isolation and cost attribution at the infrastructure level — not metadata filters that developers configure and hope they got right.
3. **Virtuous data flywheel.** Anonymized usage patterns across tenants improve shared components (RAG templates, guardrails, cost optimizers). Every new tenant makes the platform smarter.
4. **AWS-native depth.** Zero-egress architecture, unified billing, seamless Bedrock integration. Built on AWS but not locked in — BYOM and hybrid deployment ensure portability.
5. **Regulated vertical credibility.** CaseDelta as the flagship reference customer. We don't just claim to work in regulated environments — we run production legal AI workloads on the platform daily.
6. **Shared API reference registry.** As tenants connect to more third-party platforms, AgentFrame accumulates a growing registry of private API references — endpoint maps, auth flows, data models — that benefit all tenants. This is a Plaid-like network effect: each new platform mapped by any tenant makes the platform more valuable for everyone. No competitor has this for non-API platforms.

---

## Competitive Landscape

### Positioning Matrix

| Capability | Enterprise Platforms (Bedrock, Vertex, Copilot Studio) | Open-Source / Code-First (LangGraph, CrewAI) | Visual Builders (Kore.ai, Glean) | AgentFrame |
|---|---|---|---|---|
| True multi-tenant isolation | Partial (manual IAM) | Absent | N/A | Native, deterministic |
| Per-tenant cost attribution | Manual or absent | Absent | Absent | Built-in dashboards + quotas |
| Cost predictability | Linear / unpredictable | Unpredictable | Hidden | Tiered + optimized |
| Bring-your-own-model | Ecosystem lock-in | Flexible but fragile | Limited | Fully model-agnostic |
| Code-first developer experience | Mixed (visual bias) | Strong | Weak (no-code) | Strong + enhanced tooling |
| Regulated vertical readiness | Generic compliance | None | None | Legal-tuned defaults, expandable |
| Long-running / background tasks | Clunky polling/session mgmt | Limited | Limited | Native persistence + resumable state |
| Observability & debugging | Fragmented | Basic | Basic | Unified tracing + failure replay |
| OAuth / tool federation | Custom code required | Custom code required | Limited | Built-in proxy + credential isolation |
| Universal platform connections | None | None | None | OAuth + session + API key; shared API reference registry |

### Competitive Dynamics

**Enterprise platforms** (AWS Bedrock Agents, Google Vertex, Microsoft Copilot Studio, IBM watsonx Orchestrate) have scale and trust but optimize for their own ecosystems. They're generic on compliance, weak on multi-tenancy, and their pricing models don't account for the cost unpredictability that SaaS builders face when reselling AI features.

**Open-source / code-first frameworks** (LangGraph, CrewAI, SmolAgents) offer flexibility but are production-fragile. LangGraph — the most popular — has documented memory leaks and concurrency limits. CrewAI carries a LangChain dependency that creates deployment complexity. These are excellent prototyping tools but painful to run at scale in regulated environments.

**Vertical specialists** (Lumay AI for compliance, Kanerika for finance/legal) focus on specific industries but lack horizontal scalability. A fintech developer and a legal tech developer face the same multi-tenancy and cost attribution problems — vertical specialists solve them once, for one market.

**AgentFrame wins by being horizontal enough to serve multiple regulated verticals while being deep enough on compliance, tenancy, and cost controls that generic platforms can't match.**

---

## Business Model & Go-to-Market

### Revenue Model

Usage-based pricing with tenancy tiers:

- **Starter:** $99/month — suitable for early-stage SaaS builders testing agentic features.
- **Pro:** Scaled usage pricing — per-invocation plus per-tenant fees, designed to grow with the developer's business.
- **Enterprise:** Custom pricing — dedicated infrastructure, compliance packs, SLA guarantees.

Target margins: 70% (AWS-native, zero-egress architecture).

### Go-to-Market

- **AWS Marketplace listing** — discoverability and enterprise procurement compatibility.
- **Content marketing** — "Why Legal SaaS Needs Agentic PaaS," "How We Rebuilt Agent Infrastructure from Scratch," case studies from CaseDelta's production experience.
- **Vertical conferences** — LegalTech, FinTech Summit, HIMSS (healthcare).
- **Developer community** — GitHub presence, open-source components to lower adoption barrier.
- **Partnerships** — Clio, Westlaw APIs, and other vertical SaaS platforms where agentic features create mutual value.

### Expansion Path

Legal tech → fintech → healthtech → insurance → HR tech. Each new vertical reuses the horizontal platform and adds a compliance pack. Hardware cost drops (30–50% by 2027) lower inference costs over time, enabling premium features and better margins.

---

## Traction & Validation

- **CaseDelta as proof of concept.** The platform runs production legal AI workloads today: 3x faster workflows, 50% cost savings on agent runs, zero compliance issues in PII-heavy document analysis tasks.
- **Private beta waitlist.** Targeting 5–10 legal and fintech SaaS companies for initial beta.
- **Anonymized data flywheel.** CaseDelta's production usage already refines platform components — guardrails, cost optimizers, and RAG templates improve with every invocation.
- **Market alignment.** 80% of healthcare executives plan AI value delivery in 2026 (Deloitte). 92% of legal firms plan AI investments (Thomson Reuters). AgentFrame positions to capture this investment wave with infrastructure that passes compliance review.

---

## Phased Roadmap

### Phase 1: Internal Mastery (Q1–Q2 2026)

Fully migrate CaseDelta onto the platform as tenant #1. Build and harden internal abstractions for tenancy, cost tracking, observability, and governance. Instrument everything: per-tenant cost, latency, error rates, hallucination frequency. Document every painful workaround — each one becomes a feature for external developers.

**MVP delivers:** Multi-tenant isolation, cost attribution, BYOM (Bedrock models), legal compliance defaults, API-first developer experience. Estimated build time from architecture completion: 3–5 days to working core, with hardening through CaseDelta production usage.

### Phase 2: Private Beta (Q3–Q4 2026)

Extract the runtime as a separate API service. Launch private beta with 5–10 regulated SaaS companies. Add: developer dashboard at `agents.casedelta.com` (or dedicated AgentFrame domain), streaming support, external inference providers (BYOM beyond Bedrock), API key management UI, usage dashboards with cost estimates, onboarding documentation, and OAuth tool federation.

**Validation targets:** Developer velocity (time to first working agent), cost predictability (variance from estimates), and compliance sign-off (can beta customers pass their own audits using AgentFrame).

### Phase 3: Public Launch & Growth (2027+)

Open API with SDKs (Python, TypeScript). AWS Marketplace listing. Pricing tiers (starter, pro, enterprise). Compliance packs (HIPAA, SOC2, GDPR templates). Federated learning hooks. On-prem hybrid deployment support. Custom code execution for tools (sandboxed). Multi-agent orchestration.

**Long-term vision:** Transform from a vertical legal application into a foundational layer of the agentic economy — capturing value at the infrastructure level while continuously improving the core CaseDelta product through the flywheel.

---

## Financial Projections

| Metric | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| ARR | $500K (beta revenue) | $3M | $10M |
| Customers | Beta cohort (5–10) | ~50 | ~500 |
| Average revenue per customer | — | ~$5K/month | ~$2K/month (mix shifts toward starter) |

**Unit economics:** Customer acquisition cost ~$5K. Lifetime value ~$50K (3-year churn rate: 20%). Break-even at 18 months post-seed.

**Cost tailwinds:** Hardware cost drops (30–50% by 2027) reduce inference expenses. PaaS evolution (self-improving orchestration, AutoML) adds premium feature opportunities without proportional engineering cost.

Monthly burn rate: $200K post-seed.

---

## Team

- **Founder:** Camren Hall — built CaseDelta's agentic infrastructure from scratch, solving multi-tenancy, governance, and production agent challenges in legal PII workflows.
- **Advisors:** [To be confirmed — targeting security expertise and PaaS operational experience.]
- **Post-seed hires:** Platform engineer (infrastructure hardening, scaling), sales lead (beta customer acquisition and expansion).
- **Why this team:** AgentFrame doesn't require theoretical platform-building experience. It requires someone who has lived through the pain of building regulated agentic infrastructure — and Camren has, for the past year, in production.

---

## The Ask

**$3M Seed at $12M pre-money valuation** (20% dilution).

**Use of funds:**
- 40% — Product development (hybrid/on-prem capabilities, compliance packs, multi-agent orchestration)
- 30% — Go-to-market (AWS Marketplace, content marketing, conference presence)
- 20% — Hiring (platform engineer, sales lead)
- 10% — Operations

**The bet:** Regulated agentic SaaS is a $25–30B market growing at 42–46% CAGR with no purpose-built horizontal platform. AgentFrame has a working product (CaseDelta), a clear wedge (legal tech → fintech → healthcare), and an 18–24 month window before incumbents close the gap. This is the infrastructure play for the agentic economy.

---

## Risks & Mitigations

**Incumbent catch-up.** AWS Bedrock, LangGraph, and Vertex are improving. Mitigation: AgentFrame's advantage is regulated-vertical depth and true multi-tenant primitives — capabilities that require domain expertise, not just engineering resources. Generic platforms optimizing for breadth won't prioritize the deterministic governance that regulated verticals demand.

**Execution bandwidth.** Solo founder at launch. Mitigation: Phase 1 is entirely internal (CaseDelta migration) — no external customer support load. Post-seed hires a platform engineer and sales lead before Phase 2 beta. The infrastructure is already built; the work is productization, not R&D.

**Adoption lag.** Agentic project failures (40% by 2027) could create market skepticism. Mitigation: CaseDelta's production success stories plus a free tier and open-source components lower the adoption barrier. Failed agent projects are actually our best lead generation — teams that failed on LangGraph or Bedrock are actively looking for alternatives.

**Model commoditization.** Models improve and costs drop, potentially reducing the value of orchestration. Mitigation: AgentFrame is inference-agnostic by design. As models commoditize, the orchestration, tenancy, governance, and cost control layers become more valuable, not less — just as Stripe became more valuable as payment processing commoditized.

**Framework instability.** The agent framework ecosystem is immature and shifting rapidly. Mitigation: AgentFrame's architecture is designed for framework migration. We've already migrated once (from a Docker-based runtime to serverless) with minimal disruption. Config-driven agents and the HTTP tools model mean that the orchestration layer can change without breaking developer integrations.

---

## Appendix: Key Architectural Decisions

These decisions reflect the product philosophy — what we chose, why, and what it signals about AgentFrame's approach. The specific technologies may evolve; the principles are durable.

| Decision Area | Choice | Why It Matters |
|---|---|---|
| Agent definition | JSON configuration via API | No visual builder, no code upload. Developers define agents declaratively and modify them without redeployment. Simplest, most flexible approach — and it means AgentFrame never becomes a code-hosting liability. |
| Runtime | Serverless (Lambda-based) | 700x lighter than the Docker-based alternative we started with. Deploys in seconds, scales natively, costs nothing at idle. Chose this over container-based runtimes after discovering that Docker-based agents introduced unacceptable deployment latency and cold-start penalties. |
| Multi-tenancy | Three-layer deterministic isolation | Platform tenant → agent → end-user session. Tenant identifiers injected at infrastructure level so developer misconfiguration cannot cause cross-tenant leakage. This is the core primitive competitors lack. |
| Authentication | API keys (not JWT/OAuth) | Industry standard for developer platforms (Stripe, OpenAI, Anthropic). Decoupled from CaseDelta's user-facing auth. Simple: generate key → use in header → done. |
| Tools model | HTTP endpoints only (at MVP) | Any system with an HTTP API becomes a tool. No sandboxing needed, infinite extensibility, developer owns their logic. Avoids the "arbitrary code execution" liability entirely. |
| RAG / data access | "Just define a tool" | No built-in database drivers, RAG SDKs, or connection pooling. One shared RAG tool ships as default; everything else is an HTTP tool endpoint the developer provides. Zero integration layer to maintain. |
| Inference | Model-agnostic (Bedrock at MVP, BYOM at Phase 2) | Developers choose models via a config field. No ecosystem lock-in. When external providers launch, it's an additive config option — no breaking change. |
| Cost tracking | Per-invocation logging | Every call logs model, tokens, duration, and tenant. The raw data exists from day one; billing and metering systems layer on top when needed. |
| Real-time updates | Polling at MVP, SSE opt-in later | Simplest to implement, universally compatible (every HTTP client supports polling), and sufficient when we're the only tenant. SSE adds later as opt-in without breaking changes. |
| Build approach | API-first, dashboard second | The API is the product. A working invoke endpoint is a weekend; a dashboard is weeks. Build the core, validate with curl, then add the UI. |
| CaseDelta relationship | Tenant #1, same infrastructure | CaseDelta proves the platform works in production daily. Shared infrastructure at MVP (efficiency); separates when external tenants onboard (blast radius). |

### Deliberately Deferred (Phase 2+)

| Feature | Rationale |
|---|---|
| External inference providers (Groq, OpenAI, etc.) | Adds credential management complexity; no external tenant requesting it yet |
| Custom code execution for tools | Requires a sandboxing system (a product in itself); HTTP tools cover MVP needs |
| Visual agent builder | Out of scope for a code-first platform; may never be built |
| Dashboard frontend | API-first is faster; dashboard ships in Phase 2 |
| Real billing/metering system | Invocation logging provides cost visibility; billing layers on when pricing launches |
| SSE/WebSocket streaming | Polling is sufficient; SSE adds as opt-in when dashboard shows real-time |
| On-premise/hybrid deployment | Cloud-first; hybrid support in Phase 3 as hardware costs drop |
| Separate AWS account / infrastructure | No external tenants yet; separates at first beta customer |