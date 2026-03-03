# Bucket 2: CaseDelta Product Strategy
**Date:** February 26, 2026
**Context:** Answers informed by 31 video analyses, full codebase exploration, CaseDelta strategy docs, and founder profile

---

## Q9: What does the CaseDelta codebase actually look like today?

**Answer:** Better than your strategy docs suggest. The gap between "what's designed" and "what's built" is smaller than expected.

**What's production-ready:**
- 21 Lambda functions, domain-driven architecture, 1,163+ tests at 99.7% pass rate
- 4-tier document processing pipeline: OCR (Llama 3.2 Vision 90B) → Classification (Llama 3.3 70B) → Synthesis (Bedrock) → AI Decision Engine
- Agentic Q&A assistant via Strands with 14 tools, GLM-4.7 as production model (30/31 accuracy on 31-question benchmark)
- Multi-tenant isolation by firm_id across 24 database tables
- Email automation with 3-tier routing cascade
- Client portal with magic links
- Google Drive + GoHighLevel integrations working
- Full CI/CD pipeline with smart deployment detection

**What's 80% done:**
- Clio, MyCase, Camp Legal integrations: auth infrastructure complete, agent tool stubs need endpoint confirmation. Estimate 2-3 days per platform to finish.
- Billing service: Lambda exists, Stripe integration scaffolded but incomplete. Estimate 3-5 days.
- RFP processing: backend pipeline works, frontend not wired.

**What's missing that matters:**
- No proactive agent behavior (cron jobs, deadline monitoring, managing partner briefing)
- No exportable audit trail (data is logged but not exportable as a report)
- No outcome-based billing implementation
- No self-improvement/feedback loop

**The honest assessment:** Your core product — secure document analysis with agentic Q&A for law firms — is functional and tested. The blocker to revenue is not engineering. It's finishing integrations (so you can demo with a firm's real data) and getting in front of buyers.

---

## Q10: What is the single most compelling demo you could show a managing partner in 15 minutes?

**Answer:** Not the managing partner briefing. Not the Ultron CEO. The demo that closes is simpler and more visceral than that.

**The 15-minute demo:**

**Minutes 1-2: The Problem (60 seconds of empathy, 60 seconds of pain)**
"You have a family law case. Your client needs to submit 40 documents — tax returns, bank statements, pay stubs, asset disclosures. Right now, your paralegal spends hours chasing these down, clients upload the wrong things, and you're manually reviewing each one to see what's missing. How much of your week is spent on this?"

**Minutes 3-7: Document Collection (the visceral moment)**
Open CaseDelta. Create a case. Show the document template (family law requirements list). Generate the portal link. Open the client portal in a second tab. Upload 5 sample documents. Watch in real-time as the AI classifies each one: "This is a 2024 W-2." "This is a bank statement, January 2025." "This is NOT a pay stub — this appears to be a utility bill." Show the dashboard light up: 5/40 documents received, here's what's still missing, here's a draft email to the client asking for the remaining items.

**This is the moment.** The partner sees their paralegal's 3-hour workflow happen in 90 seconds. That's the hook.

**Minutes 8-12: Agentic Q&A (the depth)**
Now that documents are uploaded: "Let's ask a question." Type: "What is the husband's total reported income across all submitted documents?" Watch the agent search across all uploaded docs, cite sources with page numbers, and return a synthesized answer with a spreadsheet breakdown.

Then: "Are there any discrepancies between the W-2 income and the bank deposit totals?" This is the "unique insight humans can't easily achieve" moment — cross-document pattern detection.

**Minutes 13-15: Security + Pricing (the close)**
"Everything you just saw happened inside CaseDelta's secure environment. No client data was sent to OpenAI, Google, or any third party. Every action the AI took is logged with a timestamp — here's the audit trail. If your bar association asks how you're using AI, you show them this."

"Pricing: $20 per user per month base, plus $0.99 per analysis. That family law case with 40 documents? About $40 in AI costs for what used to take your paralegal an entire day."

**Why this demo and not the managing partner briefing:** The briefing agent is aspirational — it requires integrating with their Clio, their email, their billing system. You can't demo that without weeks of setup. The document collection + analysis pipeline works TODAY with zero integration required. The partner uploads documents, the AI classifies and analyzes them. That's self-contained and immediately impressive.

---

## Q11: Should the flagship feature be the "managing partner briefing agent" or document analysis?

**Answer:** Document analysis is the wedge. The briefing is the expansion play at month 6-12.

Here's why, based on both the market research and your codebase:

**Document analysis is ready now.** Your 4-tier pipeline, RAG system, and agentic Q&A are built, tested, and benchmarked. You can demo this tomorrow. The managing partner briefing requires Clio/MyCase integration (not finished), email ingestion (not wired), billing data access (not built), and proactive scheduling (no cron infrastructure). That's 4-8 weeks of engineering minimum.

**Document analysis has the most visceral demo.** Every video in Cluster 4 identified document review as the #1 pain point. 62% of lawyer work is administrative. The Clio data shows 501% more leads from automated intake. Partners feel this pain daily.

**The managing partner briefing is the upsell that creates lock-in.** Once a firm is using CaseDelta for document analysis, you have access to their case data. You then offer: "Want a daily briefing that tells you which matters need attention, which deadlines are approaching, and which clients haven't submitted documents?" That's a natural expansion from tool they use → agent that runs their practice. It also requires the integration work you haven't finished — but by then you'll have customer revenue funding the engineering time.

**Sequence:**
1. **Now → Month 3:** Document collection + analysis. Close first 5-10 customers on this alone.
2. **Month 3-6:** Finish Clio/MyCase integrations. Add deadline monitoring and stale-case alerting.
3. **Month 6-12:** Launch proactive managing partner briefing as premium tier.

---

## Q12: What's the minimum feature set to close the first 5 paying customers?

**Answer:** You are closer than you think. Here's the literal checklist:

**Already built (no work needed):**
- Document upload via client portal with magic link
- AI classification + "what's missing" tracking
- Agentic Q&A with RAG, source citations, conversation history
- Email automation for client document requests
- Bates stamping
- Multi-tenant firm isolation
- Case management CRUD

**Must finish (1-2 weeks max):**
- [ ] Stripe billing integration — even a simple "charge $20/user/month via Stripe Checkout" is enough for v1. Don't build metered billing yet. Just get credit cards on file.
- [ ] Onboarding flow — a guided 5-minute setup for a new firm: create account → create first case → upload documents → ask first question. Currently this requires some manual steps. Smooth it out.
- [ ] One working CRM integration — finish Clio (the most popular CMS among your ICP). This lets you say "connects to your existing tools" and mean it.
- [ ] Audit trail export — a simple "download PDF of all agent actions for this case" button. Doesn't need to be fancy. Needs to exist so you can say "full audit trail" in the demo.

**Explicitly NOT needed for first 5 customers:**
- MyCase, Camp Legal, Dropbox integrations
- Managing partner briefing
- Proactive agent behavior / cron jobs
- Model routing / economy profiles
- RFP processing
- AgentFrame admin dashboard
- Federated learning, on-prem deployment, legal CRM, or anything from the mid/long-term roadmap

**The brutal truth:** You could close your first customer within 2 weeks if you stop building and start selling. The product works. The demo is compelling. The engineering perfectionism that made you build 1,163 tests before having a single customer is both your strength (quality) and your weakness (delay). Ship what you have. Fix what breaks.

---

## Q13: Should CaseDelta ship proactive, always-on agents as a core differentiator?

**Answer:** Yes, but not yet. This is a month 3-6 feature, not a launch feature.

Here's the strategic logic:

**Why it matters (from the research):** Every Cluster 1 video converges on the same point — proactive agents that surface things without being asked are now the user expectation. The creator who built a personal CRM with Fathom integration polling every 5 minutes isn't an outlier — he's the new normal. Law firms that experience "your case has a deadline in 3 days and your client still hasn't submitted their financial disclosure" as a proactive alert will never go back to checking manually.

**Why not now:** Proactive behavior requires:
1. Integration with the firm's case management system (Clio) — not finished
2. A scheduling mechanism (cron/EventBridge) — EventBridge exists but isn't wired to agent actions
3. A notification delivery channel (email, Slack, or in-app) — you have SES and Slack but not agent-triggered notifications
4. Clear approval gates so the agent doesn't take actions autonomously — your pending_tasks table exists for this

Each of these is 2-4 days of work. Together that's 2-3 weeks. That's 2-3 weeks you should spend selling, not engineering, while you're at zero revenue.

**The plan:**
- Launch with reactive agent (user asks questions, agent answers)
- Collect usage data from first 5-10 customers to understand what they actually want proactive alerts on
- Build proactive features informed by real demand, not assumptions
- Position proactive behavior as the v2 upgrade that deepens engagement and creates switching costs

---

## Q14: Is the current AWS architecture the right foundation?

**Answer:** Yes. Don't change it.

Your serverless Lambda + Step Functions + Bedrock + Supabase architecture is well-suited for the current stage:
- **Cost:** ~$404/month estimated at moderate usage. That's sustainable pre-revenue.
- **Scale:** Lambda handles bursty document processing naturally. Step Functions handle the 4-tier pipeline cleanly.
- **Multi-tenancy:** firm_id isolation works. No RLS needed yet.
- **Testing:** 1,163 tests. That's more than most Series A companies.

The strategy docs mention Strands, Agno, DSPy, and other framework alternatives. Ignore them for now. You already chose Strands and it's working (30/31 benchmark accuracy). Switching frameworks is a month of work for marginal improvement. That month should be spent on sales.

**One optimization worth doing soon:** Your agent runtime runs in-process inside a Lambda with a 300s timeout. For complex multi-turn queries, this could hit the wall. Consider moving agent execution to a dedicated Lambda with a 600s timeout (or an ECS Fargate task for truly long-running jobs). But don't do this until a real customer hits the limit.

---

## Q15: Should we implement model routing now?

**Answer:** You already have it. Your `platform_profiles` table supports hot-swappable model selection — GLM-4.7 for standard, Qwen3 80B for economy. This is sufficient.

Don't add Opus routing for complex analysis until you have customers asking for it. The current GLM-4.7 at 30/31 accuracy is better than what any competitor offers at your price point. "Better accuracy" is not what closes your first 5 deals. "Secure, works with your docs, $0.99 per analysis" is what closes deals.

---

## Q16: What's the real cost per outcome at current architecture?

**Answer:** Based on your benchmark data:

| Model | Avg Tokens/Query | Cost/Query | At $0.99/outcome |
|---|---|---|---|
| GLM-4.7 | 251K | $0.152 | **$0.84 gross margin (85%)** |
| Qwen3 80B | ~200K | $0.098 | **$0.89 gross margin (90%)** |

The $0.99/outcome pricing pencils extremely well. Even at GLM-4.7 (your most expensive model), you keep 85 cents on every dollar. At scale with Qwen3 economy routing for simple queries, margins improve further.

**The $20/user/month base:** At 10 users per firm, that's $200/month/firm before any outcome charges. A family law firm doing 20 cases/month with 5 analyses per case = 100 outcomes = $99 in outcome revenue + $200 base = $299/month per firm. Your infrastructure cost is ~$404/month total. You need 2 firms to cover infrastructure costs.

**This is a very healthy unit economics story for investors.** Brett Taylor's point about token-based pricing being an "input uncorrelated with output" applies here — your customers don't see tokens. They see "contract reviewed: $0.99." That's clean.

---

## Q17: Should we build the audit trail / governance layer now?

**Answer:** Yes — but only the minimum viable version. This is the one feature worth building before the first sale because it is the sales enabler.

**What exists today:** `platform_invocations` logs every agent run with steps (JSONB). `case_activities` logs every case action. The data is there — it's just not exportable.

**What to build (2-3 days max):**
1. A "Case Audit Report" endpoint that generates a PDF/JSON export of all agent actions for a given case: timestamp, action taken, documents accessed, query asked, answer given, sources cited.
2. A button in the frontend: "Download Audit Report"
3. A line in the demo: "Every action the AI took is logged. Here's your audit trail. ABA Rule 1.6 compliant."

**Why this matters so much:** The MPL Legal Tech video (oASucTbY_Fc) was explicit: "No audit trail, no compliance." The CCBE guidelines require evidence of boundary, authority, and accountability. The attorney panel video showed lawyers are "very intentional" and "still afraid" about AI. An exportable audit trail is the single most trust-building feature you can show in a demo. It converts "I'm interested but worried" into "I'll try it."

---

## Q18: How does the Universal Integration Strategy map to the current codebase?

**Answer:** The architecture is built. The endpoint discovery is not.

**What's done:**
- `platform_oauth_connections` + `platform_oauth_grants` tables: store credentials for OAuth, API key, and session-based auth
- `get_auth_headers(tenant_id, provider)`: unified function that returns correct headers regardless of auth type
- OAuth flows for Google, Clio, MyCase: scaffolded with token refresh
- Session auth for Camp Legal: scaffolded with cookie capture

**What's not done:**
- Clio: OAuth works, but agent tool `search_clio` needs real endpoint testing against a Clio sandbox. Clio has 400+ REST endpoints with good docs — this is the easiest to finish. **Estimate: 2-3 days.**
- MyCase: OAuth infrastructure ready, but actual API paths are guesses. Need XHR inspection of the MyCase web app to confirm endpoints. **Estimate: 3-4 days.**
- Camp Legal: Session auth scaffolded but there's no public API. Need full XHR reverse-engineering. **Estimate: 4-5 days.**
- Dropbox: OAuth wired but no `search_dropbox` agent tool. **Estimate: 1-2 days.**

**Priority order:** Clio first (biggest market share among your ICP, best docs), Dropbox second (easy win), MyCase third, Camp Legal last (hardest, smallest market).

**The "we don't ask platforms for permission" pitch from the strategy doc is real** — your credential-based session management + stored API reference pattern works. But it needs to actually work against real platforms before you pitch it.

---

## Q19: Where exactly does CaseDelta's wedge land?

**Answer:** One sentence:

**"CaseDelta is the secure AI associate for small law firms — it analyzes your documents, tracks what's missing, and answers questions about your cases, without your clients' data ever leaving the platform."**

That's it. Not "horizontal agentic orchestration layer." Not "Claude Code for lawyers." Not "one person, one million dollar practice" (that's the investor pitch, not the prospect pitch). The prospect pitch is concrete: I analyze your documents, I track what's missing, I answer your questions, your data is safe.

Harvey won't go downmarket (confirmed by Gabe Pereyra on No Priors). Clio is adding AI features to a practice management platform — they're not an AI-first company. ChatGPT/Claude are being used ad-hoc with manual privacy workarounds. CaseDelta is the purpose-built, secure, integrated AI for the 70% of law firms that Harvey doesn't serve and Clio doesn't deeply solve for.

---

## Q20: Is the right framing "Claude Code for lawyers" or "one person, one million dollar practice"?

**Answer:** Neither for prospects. Both for investors, in different contexts.

**For prospects:** "The secure AI that handles your document work." Lawyers don't know what Claude Code is. They don't aspire to be a one-person firm — most partners want to grow, not shrink. They want to stop drowning in paperwork. Speak to the pain, not the vision.

**For investors (seed pitch):** "Harvey owns BigLaw. We own everything below. The legal AI market is $2.67B in 2026 growing to $4.42B by 2031. 79% of lawyers are using AI, but 78% cite security as the top barrier. CaseDelta is the only purpose-built legal AI for small-to-mid firms with per-tenant data isolation, audit trails, and outcome-based pricing. Think TaxGPT for law — one person, one million dollar practice."

**For press / content / LinkedIn:** "Claude Code for lawyers, but secure" is a hook that gets attention. Use it for content marketing, not for sales conversations.

---

## Q21: Integration layer vs. replacement?

**Answer:** Integration layer. Unambiguously.

Three reasons:

1. **Switching costs kill SMB sales.** A 10-person family law firm has 500 active cases in Clio. They are not migrating. They will never migrate. Any product that requires migration is dead on arrival for SMB law firms. Your Universal Integration Strategy already acknowledges this — "you don't have to change anything."

2. **Clio's moat is the install base, not the AI.** Trying to replace Clio means competing on case management, billing, client intake, calendaring, AND AI. That's 5 fights at once. You want 1 fight: AI document analysis and agentic assistance. Let Clio handle the rest. Connect to it.

3. **Integration creates distribution.** If you build a Clio integration that works well, you become visible in the Clio marketplace. Clio's 150,000+ law firm customers become your distribution channel. You don't compete with them — you complement them.

**The one exception (long-term):** If a firm has no practice management system at all (some solos and very small firms use spreadsheets), CaseDelta could become their primary platform. But don't build for this case — let it happen organically.

---

## Q22: How do we defend against Clio shipping the same features?

**Answer:** Three moats, in order of defensibility:

**Moat 1 (immediate): Security depth.** Clio is a multi-product platform. Their AI is a feature added to practice management. CaseDelta's entire architecture is built around data isolation — per-tenant RAG, no third-party model training, exportable audit trails, human-in-the-loop approvals. Clio will offer "AI-powered" features. You offer "the AI your bar association won't question." This is not a feature difference — it's an architectural difference that's hard to retrofit.

**Moat 2 (6-12 months): Feedback learning loop.** Your roadmap's "Active Agent Learning Loop" is the right instinct. Once firms use CaseDelta, their corrections and preferences create firm-specific model improvements. After 6 months of a family law firm correcting the agent's understanding of their specific document types, CaseDelta knows how that firm works. Migrating means starting from zero. Clio can't replicate this without years of legal-specific data.

**Moat 3 (12-24 months): Cross-firm insights.** The "Proprietary Legal Insights Engine" from your roadmap — anonymized patterns across firms. "98% of estate plans with X clause avoid Y issue." "This judge rules for plaintiffs 63% of the time." This requires scale (hundreds of firms) and legal-specific data that Clio doesn't collect at this granularity. It's the long-term moat that makes CaseDelta indispensable.

**The honest assessment:** At year 1, you don't have a durable moat against Clio building the same thing. Your advantage is speed (AI-native architecture vs. bolted-on AI), focus (100% of your company is this; 5% of Clio's is), and pricing ($0.99/outcome vs. whatever Clio charges as a platform upsell). That's enough to win the first 50-100 customers. The moats compound from there.
