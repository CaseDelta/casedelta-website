# CaseDelta: Strategy & Market Anchor Document

> **See also:** `CASEDELTA_NARRATIVE.md` — the behavioral north star governing all product, UX, and marketing language. When this document conflicts with the Narrative, the Narrative wins.

## Executive Summary

CaseDelta is another seat in your firm — a legal associate that works across your existing tools, never sleeps, and gets smarter the longer it's there. Not a tool you go to. Not a chatbot you prompt. A colleague — one that shows up, notices things, and brings you findings before you ask. The assistant inside CaseDelta is named **Delta**: confident, direct, always working, always there.

The problem isn't that lawyers need more software. It's that they need more capacity. CaseDelta is that capacity — at a fraction of what another human costs.

**Core Thesis**: Harvey charges $1,000+/lawyer/month with a 25-seat minimum — built for Am Law 100, irrelevant to everyone else. The 80% of the market they ignore (1-50 attorney firms) has no access to enterprise-grade legal AI. CaseDelta owns that segment. A paralegal costs $50-70K/year fully loaded. CaseDelta is $6-12K/year — same cognitive labor, none of the turnover, training, or institutional knowledge walking out the door.

This document consolidates our market analysis, pitch arsenal, feature set, and business strategy into a single reference — an internal north star and an external pitch foundation.

---

## Pitch Arsenal

Use the right version for the room. Never lead with "AI." Lead with the outcome.

---

### One Sentence — Prospect
> "Delta is your firm's AI associate — reviews your cases overnight, flags what needs attention, and has drafts ready before you ask."

### One Sentence — Investor
> "CaseDelta is the AI associate for the 80% of law firms Harvey ignores — Clio-integrated, firm-specific institutional memory, outcome-based pricing, 85% gross margin."

---

### Two Sentences — Prospect
> "CaseDelta is an AI associate named Delta that connects to your Clio and runs in the background while you're in court. By the time you're back, Delta has reviewed what your clients submitted, flagged what's missing, and drafted the follow-ups — at $500–1,000 a month versus $50–70K a year for a paralegal."

### Two Sentences — Investor
> "Harvey owns Am Law 100 — 25-seat minimums at $1,000/lawyer/month. CaseDelta owns the 80% below that: 1–50 attorney boutique firms who need the same capability, built for their scale, their budget, and their security standards."

---

### 30-Second Pitch
> "Most legal AI is just a search box — you go to it, you prompt it, you wait. Delta is different. Delta connects to your Clio and runs continuously in the background. By the time you walk out of a three-hour deposition, Delta has already reviewed what your clients submitted, flagged what's still missing, and drafted the follow-up for your approval. Your client data never touches OpenAI or Google — everything stays inside CaseDelta with a full audit trail. And the math is simple: a paralegal is $50–70K a year. Delta is $500–1,000 a month."

---

### 2-Minute Pitch
> "Let me start with the problem you already know. You're doing work that an associate should be doing — because you can't afford one, can't find one, or can't trust one with a client matter yet. That's a capacity problem, not a software problem.
>
> CaseDelta is an AI associate named Delta. Delta connects to your Clio with its own dedicated credentials — your login is never touched — and runs continuously in the background on your active cases. Every morning before you walk in, Delta has already reviewed your caseload: here's what's missing from the Wheeler file, here's the Martinez deadline with no filing confirmed, here's an income discrepancy in Robertson's financials you'll want to see. Delta doesn't wait to be asked. It shows up.
>
> When you open CaseDelta, there's a queue: Delta's findings, drafted emails, flagged items — all ready for your review. You approve, edit, or dismiss. You provide the judgment. Delta handles the cognitive labor that's been eating your billable time.
>
> On security: your client data never leaves CaseDelta's environment. No ChatGPT, no OpenAI, no Google. Every action Delta takes is logged with a timestamp — document accessed, question asked, answer given, sources cited. If your bar association ever asks, you show them the log.
>
> The economics are straightforward. A paralegal is $50–70K per year fully loaded — salary, benefits, training, and institutional knowledge that walks out the door when they leave. Delta is $500–1,000 per month. No turnover. No ramp time. Everything it learns about your firm stays.
>
> We connect to whatever you're already using — Clio, MyCase, Google Drive. Delta gets its own login, the same way you'd onboard any new hire. No migration. No workflow change. Just another team member who happens to work around the clock."

---

### Security Response (when they ask)
> "Delta works inside your firm's walls. It connects to Clio with its own dedicated credentials — never sharing your attorneys' logins — and everything stays within CaseDelta's environment. No client data is ever sent to OpenAI, Google, or any third party. Every action Delta takes is logged with a full audit trail. If your bar association asks how your firm is using AI, you show them the log. That's it."

### Competitor Response — Harvey
> "Harvey is built for Am Law 100. Twenty-five seat minimum, $1,000 per lawyer per month, designed for firms with 200 attorneys and a dedicated IT department. Delta is built for firms like yours."

### Competitor Response — ChatGPT/Claude
> "That's actually the most common starting point. The problem most firms run into is that pasting client information into ChatGPT is a malpractice exposure — your data goes to OpenAI's servers, potentially used for training, and there's no audit trail. Delta is the version of that which your bar association won't question."

---

## Feature Set

> **For engineering gap analysis:** Compare this list against the codebase. Features under "Today" are built and demo-able. Features under "This Month" are in final integration. Features under "30–60 Days" are the proactive loop — the highest current build priority. See `CASEDELTA_ROADMAP.md` Appendix B for sequencing.

### What Delta Does Today
*(Built, tested, and demo-able right now — no setup required)*

- **Document intake via client portal** — Clients upload documents through a secure magic-link portal. Delta receives them instantly and logs receipt to the case.
- **AI document classification** — Delta identifies what each document is: W-2, bank statement, QDRO, parenting plan, medical record. No labeling required from the attorney.
- **Completeness tracking** — Delta compares received documents against the case's requirements and surfaces exactly what's missing. "8 of 12 required documents received. Still missing: 2023 tax return and QDRO."
- **Agentic Q&A with source citations** — Ask Delta any question about a case. Delta searches across all uploaded documents, synthesizes the answer, and cites the exact source with page number. Runs on GLM-4.7 at 30/31 accuracy on a 31-question legal benchmark.
- **Cross-document anomaly detection** — Delta compares data across documents and flags discrepancies: income on W-2 versus bank deposits, conflicting dates, unsigned pages. Insight a paralegal would miss in a three-hour review.
- **Draft email generation** — When documents are missing or a follow-up is needed, Delta drafts the client email. Partner reviews and approves before anything sends.
- **Bates stamping** — Automated sequential document numbering for discovery and litigation.
- **Audit trail logging** — Every Delta action is recorded: timestamp, document accessed, query asked, response given, sources cited. Exportable for bar compliance.
- **Multi-firm data isolation** — Each firm's data is completely isolated. No cross-firm access, no shared indexes.
- **Case management** — Create and track matters, assign document requirements by case type, monitor case status.
- **Email automation** — 3-tier routing cascade for client communication workflows.
- **Google Drive integration** — Delta reads documents stored in Google Drive.
- **GoHighLevel integration** — Connected via API key.

### What Delta Is Finishing This Month
*(80% built — final integration work in progress)*

- **Clio read/write integration** — OAuth infrastructure complete; API endpoints in testing. This is the highest-priority completion item — it unlocks the proactive loop.
- **Stripe billing** — Lambda built, Stripe integration scaffolded. Needed before any firm goes to paid.
- **Audit trail PDF export** — Data exists in the database; PDF generator being wired. "Download Audit Report" button for the demo close.
- **Onboarding flow** — Guided firm setup: connect integrations → create first case → configure document requirements → run first analysis.

### What's Coming in 30–60 Days
*(The proactive loop — re-prioritized to immediate; see Roadmap Appendix B)*

- **Morning briefing** — Delta sends a proactive daily summary across all active cases at 7 AM: deadlines, missing documents, anomalies, drafted actions queued for review. The partner's day starts with Delta's briefing, not a blank screen.
- **Event-triggered alerts** — Client submits documents → Delta analyzes immediately → findings posted to the approval queue → partner notified. No waiting, no manual checking.
- **Approval queue UI** — The primary interface: Delta's pending actions surfaced as reviewable cards. Partner approves, edits, or dismisses with one click. Delta speaks first; the partner responds.
- **Firm context file** — Structured per-firm context loaded into every Delta invocation: practice areas, common document types, attorney preferences, billing rates, opposing counsel patterns. The institutional memory foundation. After 6 months, this file contains knowledge a new associate would take 18 months to accumulate.

### What's on the Roadmap *(3–12 Months)*

- Full managing partner briefing agent (proactive cross-case situational awareness, pulling from live Clio data)
- Deadline monitoring and proactive filing reminders
- Feedback learning loop (Delta improves from attorney corrections; firm-specific model tuning)
- MyCase integration
- Dropbox integration
- Cross-firm insights engine (anonymized pattern detection: "98% of estate plans with X clause avoid Y complication")

---

## I. The Macro Landscape: AI's Disruption of SaaS

### SaaS Market Overview

The software-as-a-service sector has undergone significant volatility, with AI advancements contributing to a reevaluation of traditional business models. The global SaaS market was valued at approximately $273 billion in 2024 and is projected to grow, but AI is expected to expand it further while redistributing value. Agentic AI, which enables autonomous task execution, is forecasted to drive productivity gains and market expansion, potentially increasing the software TAM by 20–45% by 2030. However, this shift may compress traditional SaaS economics as value migrates to intelligent layers.

In early 2026, a market event saw nearly $300 billion in value erased from software and data stocks in a single trading session, driven by concerns over AI's potential to automate complex workflows and reduce demand for conventional SaaS products. This "SaaSpocalypse" affected a broad range of companies, highlighting investor fears about pricing pressure, margin erosion, and shifting profit pools. Despite stable or growing revenues for many firms, forward multiples have compressed due to uncertainty about AI's long-term impact on durability and growth.

### Stock Impacts and Sell-Off

The sell-off was triggered by advancements in AI tools capable of handling professional workflows in legal, finance, and data analysis. Legal tech and data providers were hit hardest:

- **Thomson Reuters**: Shares declined up to 20%, its largest single-day drop.
- **RELX (LexisNexis)**: Fell approximately 14–20%.
- **LegalZoom**: Dropped 15–20%.

Broader SaaS also suffered:

- **Figma**: Down 13% from peaks, part of an 80% overall drop.
- **Salesforce**: Declined 11–27% amid AI concerns.
- **Adobe**: Fell 8–35%.

Total market cap loss in software exceeded $1 trillion since late 2025, with the sector underperforming the S&P 500 by over 20%.

### Valuation Trends

SaaS valuations have reached historic lows. Median EV/Revenue multiples dropped to 3.9x forward revenue in early 2026, down from peaks of 18–19x in 2021. Free cash flow multiples are also at all-time lows, averaging 14–21x. Private SaaS multiples stabilized around 4.1x in 2024–2025, a 36% discount to public peers at 5.6x.

Median growth rates have slowed to 12–16% annually, contributing to multiple compression despite improving profitability. Top-quartile companies with strong AI integration trade at premiums (5–7x), while low-growth firms linger at 3–4x—highlighting investor preference for AI beneficiaries.

### Revenue Stability vs. Multiple Compression

Many SaaS companies maintain stable or increasing revenues (11–16% growth), but multiples have halved due to AI-induced uncertainty about future cash flows. Forward P/E ratios compressed from 39x to 21x. Investors now discount long-term durability, with projections shifting from 30-year visibility to 7–15 years amid AI disruption. This reflects concerns over commoditization and reduced pricing power, even as operational efficiencies improve margins.

---

## II. The Agentic AI Shift

### Rise of Agentic AI

AI is not expected to eliminate SaaS entirely but to create new value layers through agentic systems that orchestrate tasks across tools. The agentic AI market is projected to grow from $5–7 billion in 2024–2025 to $93–199 billion by 2030–2034, at CAGRs of 42–46%. These agents enable cross-platform automation, potentially offloading 20–30% of human work initially and expanding the software market by 20%+. Traditional copilots remain sandboxed, while agents span data sources, positioning them as the new workspace.

This shift is central to CaseDelta's architecture: our agentic orchestration layer (built on AWS Bedrock Agentcore with ReAct LangGraph) moves beyond sandboxed copilots to cross-platform workflows—pull from Clio, analyze in agent, output to client.

### Pricing Model Evolution

Traditional per-seat pricing is giving way to value-based and usage-based models in AI SaaS, aligning charges with outcomes like resolved tasks. Over 33% of B2B SaaS now use value-based strategies, with hybrids (seats + credits) rising from 27% to 41%. This captures AI's variable costs and ties revenue to productivity gains, potentially boosting margins but requiring new metrics.

CaseDelta embraces this shift directly: we charge $0.99/outcome (e.g., per analysis) plus a $20/user/month base, with a freemium tier for solos—aligning our economics with the value we create rather than seats occupied.

### Profit Pool Migration

Profit pools are shifting from traditional SaaS to agentic layers, potentially capturing 60%+ of software economics by 2030 while expanding the overall market. Legacy applications may become infrastructure, with agents handling value-add tasks and diluting per-seat revenue. In banking, agents could shrink global profit pools by 9–10% if unaddressed. Pioneers may gain 4% ROE advantages through productivity, but laggards risk compressed margins.

### Open Data vs. Closed Data Ecosystems

SaaS companies face a strategic choice between open data (allowing API access for agents) and closed data (retaining control for proprietary AI). Open ecosystems foster innovation and integration but risk disintermediation; closed ones protect moats but create friction for users adopting cross-tool agents. Hybrid models are emerging, balancing transparency with security. This tension could determine competitive advantages in AI-driven markets.

CaseDelta's approach leans hybrid: open integrations (OAuth to Google Drive, Dropbox, Clio) combined with a security-first posture (no training on user data, SOC2 compliance).

### Productivity Gains and Job Consolidation

AI agents boost productivity by 26–126% in tasks like coding and business workflows, with gains of 60%+ in team settings. They enable job consolidation, where one worker handles 3–4 roles, reducing admin time by 43% and shifting focus to high-value work. In software development, agents increase output by 56–66%, particularly for juniors. Overall, agents could add $2.6–4.4T to global GDP by 2030, with 80% of workers affected—though 20% of jobs may see losses, requiring redesign.

### AI Beneficiaries in Data Infrastructure

Certain companies are reaccelerating growth through AI integration:

- **Databricks**: $5.4B ARR in early 2026, up 65% YoY; AI products at $1.4B ARR.
- **Snowflake**: $3.8B ARR, growing 27–29%; AI revenue at $100M but linked to 50% of bookings.

These platforms benefit from AI's data demands, with growth rates outpacing broader SaaS (12–16%). Valuations reflect this: Databricks at $134B vs. Snowflake's $44B market cap.

---

## III. The Legal AI Opportunity

### Market Size and Growth

The legal AI landscape is booming but fragmented. The broader legal AI market was at USD 1.2B in 2024, growing at 25% CAGR to 2028. AI software in legal specifically hits USD 2.67B in 2026 and is projected to reach USD 4.42B by 2031 at a 10.53% CAGR.

### Adoption Trends

42% of firms now use AI (up from 26% in 2024), and 42% expect to increase usage in 2026. Mid-sized firms lead adoption (3.9x ROI with strategies), but small firms lag at 37% due to cost, training, and security barriers. 92% of firms plan AI investments, but they need secure, affordable tools to act on that intent.

### The Underserved Segment

Small-to-mid firms (5–50 lawyers) represent 70% of legal practices but are overlooked by enterprise tools. They face cost barriers (cited by 50%+), limited training resources, and acute security concerns. The addressable TAM for AI tools serving legal SMEs exceeds $1.5B.

### Challenges and Regulatory Context

Ethical regulations (e.g., EU AI Act), hallucination risks, and ROI uncertainty remain headwinds. Firms need embedded governance and clear evidence of returns before committing. AI disruptions (e.g., Claude Cowork) are commoditizing routine work, but small firms lack resources to pivot—risking obsolescence as demand for legal services grows amid tech and regulatory changes.

---

## IV. The Problem We Solve

Small-to-mid law firms are drowning in work that doesn't require a partner's judgment but still lands on a partner's desk. The real problem isn't documents — it's capacity. There's never enough of it, and good help is expensive, fragile, and slow to ramp.

- **Bandwidth, not tools**: Partners at 5-30 attorney firms are doing work a senior associate should handle — because they can't afford one, can't find one, or can't trust one with client matters yet. The bottleneck is human capacity, not software.
- **Underserved by tech**: Enterprise tools like Harvey target BigLaw with 25-seat minimums at $1K+/lawyer/month. 80% of legal practices — solos through mid-size — have no access to anything comparable.
- **Security kills adoption**: 78% of firms cite data privacy as the top barrier. Consumer tools like ChatGPT are a malpractice exposure. Lawyers know it. They need something built for the legal context, not repurposed from it.
- **Institutional knowledge is fragile**: When a paralegal or associate leaves, they take years of case context with them. There's no system of record for the cognitive work — how this client communicates, how this opposing counsel operates, what worked last time. It just disappears.

The opportunity: build the thing that acts like another person in the firm — capable, context-aware, and always there.

---

## V. Our Solution

CaseDelta is a legal assistant that lives inside your firm's existing stack. Not a new platform to learn. Not a chatbot to prompt. A capable, context-aware resource that handles real work — and gets better at your firm the longer it's there.

- **Works inside what you already use**: Connects via OAuth to Clio, MyCase, Google Drive, Dropbox, and other platforms the firm uses. Sees across all systems simultaneously — matters, documents, billing, correspondence — not just what you paste in. Like giving a new associate their own login to everything on day one.
- **Proactive, not reactive**: Delta doesn't wait to be asked. By the time a partner opens CaseDelta, there's already a briefing waiting — deadlines flagged, missing documents identified, follow-up drafts prepared. "Your trial is 30 days out and the expert witness list hasn't been filed." That's not a search result. That's a colleague watching your back. (Technical foundation: AWS Bedrock Agentcore with ReAct LangGraph — invisible to the lawyer, critical to the product.)
- **Builds institutional memory**: Learns the firm over time — this client's preferences, this opposing counsel's patterns, this attorney's drafting style. That knowledge compounds and stays. When someone leaves, it doesn't walk out with them. After six months, Delta knows the firm better than a new associate would after a year. Canceling means starting from zero.
- **Secure by belonging**: Delta works inside your firm's walls. It connects to Clio and your document storage with its own dedicated credentials — never sharing your attorneys' logins — and everything stays within CaseDelta's environment. No client data is ever sent to OpenAI, Google, or any third party. Every action Delta takes is logged with a timestamp and full audit trail. If your bar association asks how your firm uses AI, you show them the log. (Technical specifics: end-to-end encryption, SOC2 compliance, no training on firm data. See `SECURITY_ONE_PAGER.md` for full technical details.)

### How Delta Connects to Your Stack

Delta adapts to whatever practice management platform the firm already uses. There are three paths, and all of them keep Delta independent from the attorneys' own sessions:

**OAuth platforms** (Clio, MyCase, Filevine, Docketwise, PracticePanther): One authorization flow. Delta gets its own private credentials — your attorneys' logins are never involved. Already live on Clio as a private app; public marketplace listing coming. Zero friction.

**API-key platforms** (GoHighLevel, and others with a public API but no OAuth): Some platforms issue API keys or client credentials directly instead of OAuth. Paste the key into CaseDelta and Delta is connected. No seat, no login redirect, no friction.

**No-API platforms** (legacy or closed systems without a public API): Delta needs its own seat — a user account in the firm's system, exactly the way any new staff member would be onboarded. Use an existing inactive account or add a new one. This is the strongest possible expression of the "new associate" model: Delta isn't bolted onto your system from the outside, Delta has their own login, their own access, and their own audit trail. The seat cost — typically $30–80/month — is the cost of adding a team member to your systems. An associate who never logs out.

---

**One sentence**: CaseDelta is another seat in your firm — a colleague named Delta who shows up before you ask, handles what's eating your time, and knows your firm better every day.

**Positioning**: Don't replace Clio or iManage — sit on top of all of them as the intelligent coordination layer. Modern Treasury for law firms. The distinction that matters: other legal AI tools wait to be used. Delta is already working.

---

## VI. Ideal Customer Profile

**Who**: Partners and founding attorneys at 5-50 attorney firms. Not paralegals, not associates — the people who own the firm and feel the capacity ceiling personally.

**Where**: Any practice area where the work is high-stakes, volume-driven, and time-intensive. The common thread isn't the practice area — it's bandwidth pressure. Employment, med mal, workers comp, commercial lit, probate, family law, PI — all qualify. The question is whether the partner is doing work they shouldn't have to be doing.

**Signals of a good fit**:
- Running 20+ active files with a lean team
- Losing billable hours to admin, record review, or correspondence drafting
- Has tried ChatGPT and stopped because of security concerns
- Already using Clio, MyCase, or Google Drive (integration is frictionless)
- Budget framing: not asking "can we afford this" but "is this worth $500-1K/month" — which resolves immediately against a paralegal comparison

**Who it's not for**: Solo practitioners with 5 or fewer active matters; firms that are already overstaffed; BigLaw (they have Harvey).

**Early adopter profile**: Growth-minded partners at boutique firms who are already AI-curious but haven't found something they trust. They've read about Harvey, know it's not for them, and are looking for the version that is.

---

## VII. Business Model

- **Monetization**: Value-based pricing—$0.99/outcome (e.g., per analysis) + $20/user/month base; freemium for solos. This aligns with the broader SaaS shift from per-seat to outcome-based models (now 33%+ of B2B SaaS).
- **Revenue Streams**: Subscriptions (core), add-ons (advanced integrations), partnerships (e.g., Clio affiliate).
- **Unit Economics**: Low CAC via content marketing; high LTV (4x from efficiency gains); aim $100K MRR in Year 1.
- **Projections**: Year 1: $2M (500 users); Year 3: $20M (5K users); 46% CAGR aligned with the agentic AI market growth rate.

---

## VIII. Competitive Landscape

### Direct Competitors

- **Harvey.ai**: $3B valuation, BigLaw focus—leaves small/mid firms unserved.
- **Paxton**: Small-mid AI assistant, 14x MRR growth—closest competitor.

### Indirect Competitors

- **Clio**: CRM with limited AI capabilities.
- **Lexis+**: Legal research, sandboxed (not agentic).

### AI-Native Platforms (Adjacent)

- **Databricks** ($5.4B ARR, 65% YoY) and **Snowflake** ($3.8B ARR, 27–29% growth) demonstrate that platforms built around AI data demands command premium valuations and outpace broader SaaS growth.

### Differentiation

| CaseDelta (Delta) | Harvey / Generic LLM / Paxton |
|---|---|
| **Colleague**: Delta shows up, notices things, brings findings before you ask | **Tool**: you go to it, prompt it, wait for it |
| Proactive: monitors and alerts without being asked | Reactive: requires a lawyer to initiate every interaction |
| Firm-specific institutional memory — Delta learns this firm, this client, this opposing counsel | Stateless — forgets every session; knows nothing about your firm |
| Cross-system: sees Clio + email + docs + billing simultaneously | Siloed — sees only what you paste in |
| Secure by belonging — Delta works inside your firm's walls, nothing leaves | Data leaves your control (Harvey), or consumer AI with no audit trail (ChatGPT) |
| Named associate identity (Delta) that grows with the firm | Anonymous tool that could be anyone's |
| $500–1,000/month | $1,000+/lawyer/month, 25-seat minimum (Harvey); $159/user/month, research-only (Paxton) |
| Built for 5–50 attorney firms | Built for Am Law 100 (Harvey) or research tasks only (Paxton) |

**Five moats being built, in order of priority:**
1. **Data moat** — per-firm institutional memory compounds. Switching means losing it.
2. **Compliance moat** — when CaseDelta's audit logs are part of a firm's ethics infrastructure, removing it is a malpractice risk event, not a cancellation.
3. **Ecosystem moat** — become the hub that all other tools feed into (Clio, iManage, Dropbox, billing).
4. **Credentialing moat** — bar association endorsement; Clio did it, CaseDelta should pursue it.
5. **Payments moat** — long-term play via trust accounting and billing automation integration.

---

## IX. Go-to-Market Strategy

**GTM is sequenced — don't skip steps:**

**Phase 1 (Now → 5 customers): Warm network, founder-led, physical presence**
- First 5 customers come from the KC lawyer network (Brandt, Clevenger, Carmody, Barnds). Not cold outreach.
- Every first meeting includes a live demo on their actual case type. No discovery-only meetings.
- Walk into firms. Show it running on their documents. If they can't say yes in person, email won't close them.
- The pitch in one line: "Think of it as another associate in your firm — shows up before you ask, handles the work that's eating your time, works inside everything you already use, and gets smarter about your firm every day. At $500–1K/month versus $50–70K for a paralegal, the math is obvious."
- Never lead with "AI." Lead with the outcome: more capacity, less admin, nothing to replace.
- **The demo that closes is the proactive briefing, not document upload.** Show what Delta did overnight without the lawyer asking. "Here's what I found on your active cases while you were away." Then show the approval queue — findings, drafts ready for review, items flagged. The lawyer's job in the demo should be approving Delta's work, not querying it. See `CASEDELTA_NARRATIVE.md` — "The Behavioral Model" section for the full demo arc.

**Handling integration cost friction (warm contacts only):**
When a warm contact says their platform requires an API upgrade or extra seat to connect CaseDelta, offer a structured 60-day pilot: cover the integration cost yourself in exchange for two 30-minute feedback sessions per month. Frame it explicitly as a pilot with an end date — not an indefinite subsidy. After 60 days, full cost is theirs. This is buying validated signal with obligation attached, not buying a customer.

Do not offer this to cold or new prospects. For new clients, build the integration cost into the pitch upfront as a total cost comparison: "$[X+50]/month max vs. $4,500-6,000/month for a paralegal." If they balk at $30-50 after that framing, the issue is belief in the value proposition — fix the belief gap, don't remove the cost.

**Phase 2 (5 → 50 customers): Trust credibility event**
- One published case study from a named KC firm ("Clevenger Law reduced document review by 40%").
- KBA/KCBA CLE talk on AI in family law. Speaking = inbound.
- Legal malpractice insurer partnership (ALPS, Lawyers Mutual) — CaseDelta as a risk-reduction endorsement.

**Phase 3 (50 → 500 customers): Distribution channel**
- Bar association co-marketing (Clio did it; their endorsement replaced entire sales cycles).
- Annual "Legal Practice AI Report" with anonymized data from member firms — industry authority positioning.
- Integration ecosystem: every Clio, MyCase, Filevine integration makes CaseDelta the hub. Network effect grows with each connection.

**Integration conversation script (when asked how it connects to their tools):**
> "Tell me what you're using. If it has OAuth — like Clio — Delta gets its own private connection, completely separate from your login. If it uses API keys, you just paste one in and you're connected. If it's a platform with no API at all, Delta gets its own seat — same as onboarding any new staff member. Either way, your workflow doesn't change."

**Metrics**: First 5 paying customers → 3 published case studies → KBA speaking slot → first LPL insurer conversation.

---

## X. Why Now / Why Us

- **Timing**: The AI "SaaSpocalypse" has created urgency—$1T+ in software value erased since late 2025, legal stocks hit hardest (Thomson Reuters −20%, RELX −20%, LegalZoom −20%). Yet 42% adoption growth continues and 92% of firms plan AI investments. The agentic shift from copilots to orchestration creates a narrow window for new entrants before incumbents adapt.
- **Market Bifurcation**: AI-forward companies trade at 5–7x revenue vs. 3–4x for laggards. Building natively on agentic architecture positions CaseDelta in the premium tier.
- **Us**: Solo founder with 6 months dev experience; pivot agility; laser focus on the underserved segment + security-first positioning.

---

## XI. Risks and Mitigations

- **Adoption Barriers**: Security fears remain the top hurdle (78% of firms). Mitigate with SOC2 certification, end-to-end encryption, and transparent data policies.
- **Competition and Commoditization**: AI is compressing SaaS multiples and profit pools. Mitigate by building proprietary data loops and legal-tuned agent moats.
- **Regulatory Risk**: Ethical requirements (EU AI Act), hallucination concerns, and ROI uncertainty. Mitigate by embedding governance tooling and human-in-the-loop workflows.
- **Market Compression**: SaaS valuations at historic lows (3.9x forward revenue). Mitigate through value-based pricing that ties revenue to demonstrable outcomes rather than speculative growth.

---

## Appendix

### Key Resources

- Thomson Reuters 2026 US Legal Market Report
- Internal financial models and industry benchmarks

### Reference Data Points

| Metric | Value |
|---|---|
| Global SaaS market (2024) | ~$273B |
| Legal AI market (2026E) | $2.67B |
| Legal AI market (2031E) | $4.42B |
| Agentic AI market (2024–25) | $5–7B |
| Agentic AI market (2030–34E) | $93–199B |
| SaaS median EV/Revenue (2026) | 3.9x |
| AI-forward SaaS EV/Revenue | 5–7x |
| Small-mid firm AI adoption | 37–42% |
| Firms citing security as barrier | 78% |
| CaseDelta Year 1 revenue target | $2M |
| CaseDelta Year 3 revenue target | $20M |
