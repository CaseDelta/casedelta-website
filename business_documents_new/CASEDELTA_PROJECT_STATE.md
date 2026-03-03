# CaseDelta Project State & Strategic Context
**Last Updated:** February 26, 2026
**Author:** Claude (after comprehensive market research + codebase analysis)

---

## Executive Summary

CaseDelta is a production-grade legal AI SaaS platform with a working MVP, benchmarked agent architecture, and zero revenue. The product is ready for customer acquisition. The market window is 18-24 months before incumbents catch up.

---

## Product State

### What Works (Production-Ready)
- 21 Lambda functions, serverless architecture, 1,163 tests at 99.7% pass rate
- 4-tier document processing: OCR (Llama 3.2 Vision 90B) → Classification (Llama 3.3 70B) → Synthesis (Bedrock) → Manager Decision
- Agentic Q&A via Strands: 14 tools, GLM-4.7 model (30/31 accuracy on 31-question legal benchmark)
- Multi-tenant isolation (firm_id on 24 tables)
- Email automation with 3-tier routing
- Client portal with magic link authentication
- Google Drive + GoHighLevel integrations (working)
- Bates stamping
- Case management CRUD

### What's 80% Complete (1-2 weeks to finish)
- Stripe billing (Lambda exists, needs integration)
- Clio integration (OAuth done, API endpoints need testing)
- Audit trail export (data exists in DB, needs PDF generator)
- Onboarding flow (exists but needs polishing)

### What's Scaffolded (4+ weeks to finish)
- MyCase integration (endpoints need XHR reverse-engineering)
- Camp Legal integration (no public API, needs full reverse-engineering)
- Dropbox integration (OAuth done, agent tool missing)
- Managing partner briefing agent (requires Clio integration + proactive scheduling)
- RFP processing (backend works, frontend not wired)

### What's NOT Built
- Proactive agents / cron jobs
- Feedback learning loop
- Cross-firm insights engine
- On-prem deployment
- Outcome-based billing metering
- AgentFrame admin UI

---

## Market Position

### ICP (Ideal Customer Profile)
- **Size:** 5-50 lawyer firms
- **Geography:** US-based (no specific region)
- **Practice areas:** Family law (1st choice), Estate planning (2nd), Immigration (3rd)
- **Tech level:** Using Clio or MyCase, experimenting with ChatGPT/Claude, security-conscious
- **Decision-maker:** Managing partner who controls budget

### Competitive Landscape
- **Harvey:** BigLaw focus (~1,000 customers, 500 employees). Will NOT go downmarket. Uses Forward Deployed Engineers. CEO Gabe Pereyra confirmed they won't build a law firm.
- **Clio:** Practice management platform adding AI as a feature (not AI-first). Has 150,000+ firm install base. Threat: long-term, not immediate (6-12 months).
- **Paxton, LawDroid, others:** Exist but don't solve the security/agentic depth problem CaseDelta solves.
- **ChatGPT/Claude direct:** What firms are doing today with manual privacy workarounds. CaseDelta replaces this with integrated, secure, auditable agentic AI.

### Market Data Points
- Legal AI market: $2.67B (2026) → $4.42B (2031), 10.53% CAGR
- 79% of lawyers use AI (Clio, Feb 2026)
- 78% cite security as top adoption barrier
- Small-to-mid firms (5-50 lawyers) = 70% of all law firms
- Baker McKenzie laid off 700 citing AI restructuring
- Thomson Reuters / Casetext sold for $650-680M (AI capability validated)

### Unit Economics
- Infrastructure cost: ~$404/month (all services combined at moderate scale)
- Cost per outcome (GLM-4.7): $0.152 (avg 251K tokens/query)
- Revenue per outcome: $0.99
- **Gross margin: 85%**
- Base subscription: $20/user/month

---

## Strategic Insights (From 31-Video Analysis)

### 1. The Window Is Real and Closing
- Legal consolidation happening now: Harvey winning BigLaw, mid-market open
- Incumbents will catch up in 12-24 months once they shift to AI-native architecture
- Every week counts. This is not a 5-year marathon — it's an 18-month sprint.

### 2. Security Is the Go-To-Market, Not Just a Feature
- Skills ecosystem is broken (Zach Korman demonstrated prompt injection exploits)
- CCBE guidelines (Oct 2025) + ABA Rule 1.6 create regulatory tailwind
- Firms need "audit trails proving the AI didn't expose client data" — CaseDelta can show exactly this
- "PII never leaves the ecosystem" is the single most trust-building statement you can make in a law firm demo

### 3. Outcome-Based Pricing Is Validated and Defensible
- Brett Taylor (Harvey CEO, OpenAI chairman, Sierra CEO) explicitly endorses outcome-based as "the secular business model for agents"
- Your $0.99/outcome + $20/user/month hybrid is exactly right: gives procurement a predictable line item, captures upside on usage
- Token-based pricing gets dismissed as "input uncorrelated with output" — position yourself against this anti-pattern

### 4. The Wedge Is Document Analysis, Not Managing Partner Briefing
- Every video in Cluster 4 identifies document review as the #1 pain point
- 62% of lawyer work is administrative (Clio)
- Managing partner briefing is aspirational, requires integrations you don't have, can't be demoed without setup
- Lead with document analysis (you can demo in 15 minutes), expand to briefing agent at month 6

### 5. Integration Over Replacement
- Firms will never migrate off Clio. They have 500+ active cases there.
- Your play: "Rides on top of everything you already use. Clio, Dropbox, Google Drive — we integrate."
- This is not a weakness — it's a distribution advantage (Clio marketplace = 150K firm reach)

### 6. Forward Deployed Engineers (FDE) Is the Enterprise Sales Pattern
- Harvey, TaxGPT, Sierra all do it
- For solo founder version: white-glove onboarding for first 10 firms
- You demo the product, create the account, upload their documents, stay on the call while they ask questions
- This is non-negotiable for closing skeptical attorneys

### 7. The First 5 Customers Are The Only Milestone That Matters
- Fundraising, accelerators, content, new features — all of these become 10x easier post-traction
- Zero customers is not fundable, even with a great product
- 5 customers is fundable, even with obvious gaps
- Everything else is secondary until you have these 5 names

---

## Recommended Next Steps (30-Day Sprint)

### Week 1: Product Completion
- [ ] Stripe integration (3 days)
- [ ] Clio sandbox testing (2 days)
- [ ] Audit trail export PDF (2 days)
- [ ] Record 3-minute Loom demo

### Week 2: Warm Outreach
- [ ] Segment CRM into Tier 1-4 (see Q26 answer)
- [ ] Draft personalized emails for Tier 1 + 2 (use Claw)
- [ ] Send 10 emails with Loom video
- [ ] Goal: 3-5 responses, 2-3 pilot signups

### Week 3: Demos + Close
- [ ] Run 15-minute demo for each responding firm (see Q10 answer)
- [ ] Leave them with working accounts
- [ ] Follow up in 24 hours with "here's what the AI found" summary

### Week 4: Expand + Launch
- [ ] Convert pilots to paid ($20/user/month + $0.99/outcome)
- [ ] Ask for 2 referrals per customer
- [ ] Submit demo to Launch OpenClaw event (openclaw@launch.co)
- [ ] Post 2 LinkedIn updates about what you're learning

---

## Resource Files

All analysis and answers are in:
- `/business_documents_new/market_insights/TWIST_2026-02-23_openclaw-knowledge-chaos.md` — Initial TWIST episode analysis
- `/business_documents_new/market_insights/MARKET_LANDSCAPE_2026-02-26_clusters1-3.md` — 12-video analysis (Clusters 1-3)
- `/business_documents_new/market_insights/MARKET_LANDSCAPE_2026-02-26_clusters4-6.md` — 19-video analysis (Clusters 4-6)
- `/business_documents_new/market_insights/BUCKET_1_AGENT_OPTIMIZATION.md` — Q1-8 answers (agent setup)
- `/business_documents_new/market_insights/BUCKET_2_CASEDELTA_PRODUCT.md` — Q9-22 answers (product strategy)
- `/business_documents_new/market_insights/BUCKET_3_FOUNDER_OPS_GTM.md` — Q23-36 answers (founder ops + GTM)

---

## Key Contacts in CRM to Target First

Query CRM for: Status = (Met OR Follow-up) AND Practice Area = (Family Law OR Estate Planning)

These are your Tier 1 prospects. They know you, know what you're building, and are most likely to pilot.

---

## Critical Success Factors

1. **Finish Stripe + Clio in 2 weeks.** These are the only blockers to revenue. Everything else can wait.
2. **Email your CRM this week.** Don't wait for perfect product. The 80/20 version is enough to demo.
3. **Demo to managing partners, not paralegals.** Decision-maker access is non-negotiable.
4. **White-glove first 10 firms.** You personally get on Zoom, create the account, show them the demo.
5. **Track traction obsessively.** # of conversations, # of pilots, # paying. These numbers matter for fundraising.

---

## The Thesis in One Sentence

CaseDelta is the secure AI associate for small law firms — analyzing documents, tracking what's missing, and answering questions about cases, without client data ever leaving the platform.
