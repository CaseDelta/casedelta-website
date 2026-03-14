# CaseDelta Growth Strategy: $1M ARR in 12 Months

**Date:** March 13, 2026
**Author:** Camren Hall + Claw
**Status:** Active — derived from hyper-growth company research, competitive analysis, pricing modeling, and founder discussion
**Companion docs:** `HYPERGROWTH_PLAYBOOK.md` (full research), `CASEDELTA_CONSOLIDATED.md` (positioning), `CASEDELTA_NARRATIVE.md` (product philosophy)

---

## I. Executive Summary

This document is the operational blueprint for getting CaseDelta from 0 to $1M ARR in 12 months. It consolidates:
- Deep research on 10 of the fastest-growing SaaS/AI companies in history
- Growth patterns extracted from those companies and translated to CaseDelta's context
- Competitive pricing analysis against Harvey, Legora, Paxton, CoCounsel, and Lexis+ AI
- Vertical SaaS playbooks from Toast, ServiceTitan, Procore, Veeva, and Clio
- Token cost modeling and margin analysis
- A dual-market pricing architecture (self-serve + sales-led)
- A revised ICP targeting higher-revenue practice areas
- A phased 12-month GTM roadmap

**The core thesis:** CaseDelta captures the market segment that's too small for Harvey/Legora (seat minimums of 30-40) and too security-conscious for ChatGPT — by offering flat firm pricing (not per-seat), a usage-based self-serve tier for small firms, and a security-first positioning modeled on Anthropic's playbook in regulated industries.

**The math:** ~200 total firms across two market segments, blended ~$99K MRR = ~$1.19M ARR.

---

## II. What We Learned: 10 Hyper-Growth Companies

### The Companies Studied

| Company | Record | Category |
|---|---|---|
| Lovable | $10M ARR in 2 months, $200M in 12 months | AI Coding |
| Replit | $10M → $100M ARR in 5.5 months | AI Coding |
| Cursor | $1B ARR in ~24 months | AI Coding (B2B) |
| OpenAI | $1B ARR in <12 months, $25B by Feb 2026 | AI Foundation |
| Anthropic | $200M → $19B run-rate in ~2.5 years | AI Foundation |
| Manus | $100M ARR in 8 months | AI Agents |
| Daytona | ~$1M ARR in ~60 days | AI Infrastructure |
| Emergent | $10M ARR in 2 months, $100M in 8 months | AI Coding |
| RB2B | $1M ARR in 16 weeks (bootstrapped, 6 people) | B2B SaaS |
| Midjourney | $200M ARR in year 2, $0 marketing spend | AI Image Gen |

### The 12 Patterns That Matter for CaseDelta

**Pattern 1: The Output IS the Marketing.**
Midjourney images, Lovable deployed apps, Cursor's shipping speed, RB2B's Slack notifications. The product creates shareable proof of value. **CaseDelta's version:** Delta's morning briefing, anomaly flags, and drafted follow-ups. A lawyer showing a colleague "look what Delta found overnight" is the growth loop.

**Pattern 2: Free → Aha Moment → Paid.**
Every company has a free experience that delivers the aha moment before asking for money. ChatGPT free → "I need GPT-4." RB2B free → "Holy shit, that's a real person on my site." **CaseDelta's version:** $50 in free credits → upload documents → Delta finds a discrepancy or missing document the lawyer didn't know about. That aha moment must happen before any paywall.

**Pattern 3: Founder-Led Content as Primary Acquisition.**
Adam Robinson built RB2B's entire $5M ARR engine on LinkedIn. 142K followers, daily posts, "Prolific Zone" framework (polarizing but not dismissible), only 1 in 10 posts has a CTA. **CaseDelta's version:** Camren posts 4-5x/week on LinkedIn. Not about CaseDelta — about the problem. "What a paralegal costs vs. what the work is actually worth." Build authority, not a sales funnel.

**Pattern 4: Brutal Pivots Create Step-Function Growth.**
Replit killed education (their origin story) → 1,556% YoY growth. GPT Engineer → Lovable rebrand → 20x growth. Daytona walked away from $300K ARR to chase AI infrastructure. **CaseDelta's version:** The pivot from "document verification tool" to "AI associate" already happened. The next opportunity: if the morning briefing (not document upload) is what closes deals, make THAT the product entry point.

**Pattern 5: Pricing Aligned with Value, Not Seats.**
Replit (effort-based checkpoints), Manus (credits per task), OpenAI (tiered access to better models). Fastest growers charge based on value delivered. **CaseDelta's version:** Flat firm pricing or usage-based credits — never per-seat. Per-seat is what every competitor does, and firms hate it.

**Pattern 6: Bottom-Up Enterprise Adoption.**
Cursor: individual devs pay $20/mo → tell teammates → 4,000+ companies request enterprise. OpenAI: employees use free ChatGPT → IT notices → Enterprise contract. **CaseDelta's version:** One paralegal or partner tries the free tier → shows results to the firm → firm signs up. The referral loop IS bottom-up PLG in legal.

**Pattern 7: Community as Distribution.**
Midjourney's Discord (21M members). RB2B's LinkedIn audience. **CaseDelta's version:** The community for lawyers isn't Discord — it's bar association events, CLE talks, and local networks. Distribution is physical presence + reputation.

**Pattern 8: Speed to Live Demo > Feature Completeness.**
RB2B launched MVP → $1M in 16 weeks. Lovable ships weekly. **CaseDelta's version:** Demo what works TODAY on the prospect's actual documents. Don't wait for the proactive loop to be finished.

**Pattern 9: In-Person Sales Convert 3x in Traditional Industries.**
Toast: 80/20 field/inside split, 3x conversion in-person. ServiceTitan founders did ride-alongs with contractors. **CaseDelta's version:** Walk-ins work for initial closes but don't scale. Use phone calls as the scalable equivalent — lawyers pick up the phone.

**Pattern 10: Compliance/Security is a Moat, Not a Barrier.**
Veeva baked regulatory compliance into pharma workflows — removal became a regulatory risk. Clio became first legal tech recognized by all 50 state bars, which replaced entire sales cycles. **CaseDelta's version:** When Delta's audit logs are part of a firm's ethics infrastructure, canceling is a malpractice risk event. Pursue bar association recognition and LPL insurer endorsement.

**Pattern 11: Free Collaborators Create Network Effects.**
Procore: 60% of users are free subcontractors. Each one expects Procore on their next project, pulling new GCs onto the platform. **CaseDelta's version:** Clients uploading through the magic-link portal are free collaborators. Every client who uses the portal once expects it next time.

**Pattern 12: Trust is Transferred, Not Built from Scratch.**
Clio's bar association endorsement replaced independent evaluation. Veeva targeted top 20 pharma companies first — everyone else followed. **CaseDelta's version:** The trust transfer chain: named KC firm case study → KCBA CLE talk → bar association recognition → LPL insurer endorsement. Each step makes the next sale easier.

---

## III. The Anthropic Parallel: Why It Matters Most

Of all 10 companies studied, Anthropic's growth pattern is the most relevant to CaseDelta.

| Dimension | Anthropic | CaseDelta |
|---|---|---|
| Market position | #2 to OpenAI | Challenger to Harvey's BigLaw dominance |
| Core differentiator | Safety/trust in AI | Security/compliance in legal AI |
| Target buyer | Regulated enterprises | Regulated firms (law practices) |
| Revenue per user | $211/month (8x OpenAI) | Target: $800-1,500/month per firm |
| Distribution | AWS Bedrock, Google Vertex | Clio marketplace, bar associations |
| Revenue mix | 75% enterprise, 15% consumer | Target: 75% sales-led firms, 25% self-serve |
| Competitive response | "We're the safe choice" | "Delta works inside your firm's walls" |

**What Anthropic proves:** You don't need to win the consumer virality race. You can build massive revenue by being the trusted choice for regulated buyers. Security-first positioning isn't a constraint — it's a moat. Anthropic generates 8x more revenue per user than OpenAI by going enterprise-first.

**Applied to CaseDelta:**
1. Lean HARD into security and compliance. Every competitor weakness on data privacy is your strength.
2. The audit trail IS the product for bar associations and LPL insurers.
3. Clio marketplace listing = your version of Anthropic on AWS Bedrock.
4. Higher price + flat firm model signals professional-grade.
5. If Delta becomes the tool lawyers open every morning, retention is permanent.

---

## IV. Competitive Landscape & Positioning

### The Pricing Map

| Competitor | Model | Price | Min seats | 10-atty firm cost | What it is |
|---|---|---|---|---|---|
| Harvey | Per-seat | $1,000/seat | 40 | **Can't buy** | Research + drafting (BigLaw only) |
| Legora | Per-seat | $1,500/seat | 30 | **Can't buy** | Research (BigLaw only) |
| CoCounsel | Per-seat | $225-500/seat | None | $2,250-5,000/mo | Research + drafting (Westlaw integration) |
| Lexis+ AI | Per-seat | ~$499/seat | None | ~$4,990/mo | Legal research |
| Paxton | Per-seat | $159-499/seat | None | $1,590-4,990/mo | Legal research assistant |
| **CaseDelta** | **Per-firm (flat)** | **$799-2,499/mo** | **None** | **$1,499/mo** | **Proactive case management AI** |

### The Critical Differentiation

Every competitor is a **research tool** — you go to it, prompt it, search case law, get an answer. All reactive. All per-seat.

CaseDelta is a **practice management AI** — it monitors cases, finds anomalies, drafts follow-ups, builds institutional memory, and surfaces findings before being asked. Proactive. Per-firm.

The pitch isn't "we're cheaper than Paxton." It's: **"Paxton searches case law when you ask. Delta reviewed your entire caseload overnight and has findings waiting."**

### Two Segments We Own

**Segment 1: Priced out of enterprise.** Firms with 1-29 attorneys literally cannot buy Harvey or Legora. This is 80%+ of all law firms. They have no enterprise-grade legal AI option.

**Segment 2: Security-conscious.** 78% of firms cite data privacy as the top barrier. Firms that tried ChatGPT and stopped. Firms where bar compliance matters. Delta's audit trail + no-data-to-third-parties architecture owns this segment.

---

## V. Pricing Strategy: The Dual-Market Model

### The Problem with Pure Flat Pricing

Token costs are real. At $100-200/attorney/month in inference costs for heavy users (med mal firms processing thousands of pages of medical records), a 25-attorney firm at $1,499 flat generates ~$5,000 in token costs. That's a $3,500/month loss per customer.

Industry data: 84% of AI SaaS companies see 6%+ gross margin erosion from unmetered AI. AI-first SaaS gross margins run 20-60% vs 70-90% traditional SaaS. Flat unlimited pricing with no usage guardrails is a margin death trap.

### The Problem with Pure Usage-Based Pricing

"How much will this cost me per month?" → "It depends on usage" is a conversation killer with managing partners budgeting quarterly expenses. Lawyers hate unpredictable costs from vendors.

### The Solution: Anthropic's Dual-Market Architecture

**Two tracks, one product:**

#### Track 1: Self-Serve (Small Firms — "Claude.ai")

| Element | Detail |
|---|---|
| **Target** | Solo to 4 attorneys, any practice area |
| **Entry** | $50 free credits on signup, no credit card |
| **Pricing** | Usage-based: credits consumed per analysis/query |
| **Unit** | Price per "document analysis" or "case review" — NOT per token |
| **Suggested rates** | ~$1-3/document analysis, ~$0.50/Q&A query, ~$5/case briefing |
| **Typical monthly spend** | $50-300/mo |
| **Sales motion** | Zero-touch. Sign up, try it, add credit card when credits run out |
| **Revenue role** | ~20-25% of total revenue, hundreds of firms, long tail |

This captures the underserved market without losing money. Solo family lawyers pay $75/mo in usage. Solo immigration lawyers pay $120/mo. Margins are always positive (tokens marked up 5-10x). No heavy user ever costs more than they pay.

#### Track 2: Sales-Led (Target ICP — "Claude Enterprise")

| Tier | Monthly | Included usage | Target firm size |
|---|---|---|---|
| **Practice** | $799/mo | ~500 analyses + 200 queries | 5-10 attorneys |
| **Firm** | $1,499/mo | ~1,200 analyses + 500 queries | 10-25 attorneys |
| **Enterprise** | $2,499/mo | ~2,500 analyses + 1,000 queries | 25-50 attorneys |
| **Overage** | $1.50/analysis, $0.75/query | Beyond included cap | Heavy users |
| **Annual** | 2 months free | Same caps | All tiers |

**Sales motion:** Founder-led demo → 14-day trial on their real documents → close. Camren onboards every firm personally for the first 20 customers.

**Revenue role:** ~75-80% of total revenue, 40-60 firms, high-touch, low churn.

### Token Economics (Firm Tier Example)

```
Revenue:                $1,499/mo
Included usage:         1,200 analyses + 500 queries

Estimated token costs (Sonnet rates):
  Analyses:  ~66M tokens → $270
  Queries:   ~8.5M tokens → $37
  Briefings: ~$100
  Total COGS: ~$400-500/mo

Gross margin: ~67-73%
```

At normal usage, margins are strong. Heavy users who exceed caps pay overage, protecting margins. If a 25-attorney med mal firm hammers the system, overage charges cover the token costs instead of destroying the margin.

**Future cost optimization (don't do now):**
- Intelligent routing: Haiku for classification/simple tasks (80%), Sonnet for analysis (20%) → 60-70% cost reduction
- Batch API for morning briefings (non-real-time) → 50% cheaper
- Caching common document patterns → further reduction
- Inference costs fell 78% in 2025 — trend continues

### Pricing Testing Sequence

**Phase 1 (Customers 1-5): Learn, don't optimize.** Price whatever makes them say yes. $499, $799, even $299 for early adopters. Track actual token costs per firm, per attorney, per practice area. Ask: "Would you prefer flat monthly or pay-per-use?" This data is worth more than the revenue.

**Phase 2 (Customers 5-15): Split test.** Half get flat firm pricing. Half get usage-based. Track: close rate, 60-day retention, usage volume, margin per customer.

**Phase 3 (Customers 15-30): Converge.** Lock in the winning model. Scale.

### The $1M ARR Math

| Segment | Count | Avg MRR | Total MRR |
|---|---|---|---|
| Self-serve (usage-based) | 150 firms | $150/mo | $22,500 |
| Practice tier ($799) | 15 firms | $799 | $11,985 |
| Firm tier ($1,499) | 30 firms | $1,499 | $44,970 |
| Enterprise tier ($2,499) | 5 firms | $2,499 | $12,495 |
| Overage revenue (~8%) | | | $7,356 |
| **Total** | **200 firms** | | **$99,306 MRR** |

**~$99K MRR = ~$1.19M ARR.** The 50 sales-led firms are 70% of revenue. The 150 self-serve firms are 23%. Overage is 7%.

---

## VI. Revised Ideal Customer Profile

### The ICP Shift: Follow the Money

Family law firms (the original ICP focus) have lower revenue per case and tighter margins. The high-value practice areas where $1,499/mo is trivial:

| Practice Area | Revenue/case | Document intensity | Delta's superpower | Why $1,499/mo is easy |
|---|---|---|---|---|
| **Medical Malpractice** | $200K-$5M+ | Extreme (thousands of medical record pages) | Cross-document anomaly detection, timeline inconsistencies | One partner hour = $400-600. Delta saves 10+ hrs/month. |
| **Personal Injury (serious)** | $100K-$1M+ | High | Income discrepancy detection, completeness tracking | Contingency cases — firm needs efficiency to maximize margins |
| **Commercial Litigation** | $50K-$500K+ | Very high (discovery) | Cross-party comm filtering, document review | Discovery costs are the #1 pain. Any reduction is budget-justified. |
| **Employment Law** | $100K-$1M+ | High | Pattern detection across HR records | Years of documents to review per case |
| **Intellectual Property** | High hourly ($500-700/hr) | Moderate-high | Document classification, prior art organization | Highest billable rates — time savings multiply fast |

### The New ICP Definition

| Dimension | Specification |
|---|---|
| **Firm size** | 5-50 attorneys (minimum 5 for sales-led; self-serve handles smaller) |
| **Practice areas** | Med mal, PI (serious), commercial litigation, employment, IP |
| **Revenue signal** | Cases worth $200K+ regularly; partners billing $300+/hr |
| **Buyer** | Managing partner or senior partner |
| **Pain signal** | 10+ hours/week of document review their associates should handle |
| **Budget framing** | "$1,499 flat vs. $5,000/mo for 10 Paxton seats" AND "vs. $50-70K/yr for a paralegal" |
| **Security signal** | Has tried ChatGPT and stopped, or has explicit bar compliance concerns |

### What About Small Firms?

Small firms (1-4 attorneys, family law, immigration, criminal defense) are served by the self-serve usage-based tier. They're not excluded — they're just not the sales-led focus. Don't build features for solo family lawyers during the $1M ARR sprint. All GTM energy goes to the high-value ICP. The self-serve tier captures the long tail without sales effort.

**The Anthropic model:** Enterprise API is 75% of revenue, consumer claude.ai is 15%. Both exist. Both matter. But the $1M comes from enterprise.

---

## VII. Go-to-Market: Multi-Channel Plan

### Channel Mix

Cold email alone cannot get to $1M ARR. None of the 10 hyper-growth companies did it with cold email. The path is multi-channel:

| Channel | Firms/month (est.) | Effort/week | Ramp time |
|---|---|---|---|
| Warm pipeline + referrals | 2-3 | 3-4 hrs | Now |
| LinkedIn content → inbound | 1-3 | 5 hrs (daily posts + engagement) | 60-90 days |
| Cold email (targeted, 200-400/week) | 1-2 | 3-4 hrs | 30 days |
| Cold calling (30-50 dials/day) | 1-2 | 2-3 hrs | Now |
| CLE talks / bar events | 1-2 | 2 hrs/month prep | 90 days |
| Clio marketplace listing | 2-5 | One-time setup | 90-120 days |
| Self-serve signups (organic) | 10-20 (small firms) | Zero-touch | 60-90 days |

### Cold Email Benchmarks (Reality Check)

| Metric | Average | Good |
|---|---|---|
| Open rate | 20% | 30-40% |
| Reply rate | 1-3% | 3-5% |
| Email → Demo booked | 0.5-1% | 1-2% |
| Demo → Close (cold) | 10-15% | 15-25% |
| **End-to-end: Email → Close** | **0.05-0.15%** | **0.15-0.5%** |

At 0.2% end-to-end, closing 4 firms/month via cold email requires ~2,000 emails/month. That's doable but requires list-building infrastructure, multiple sending domains, and warm-up sequences.

### Cold Calling (The Underrated Channel for Legal)

Lawyers pick up the phone. Unknown numbers might be a client, judge's clerk, or opposing counsel. Cold calling converts better than email for legal.

**Script (60 seconds):**
> "Hi [Name], this is Camren Hall with CaseDelta. I'll be quick — I know you're busy. I built an AI that runs inside your Clio, never sends client data to OpenAI or Google, and found a $31K income discrepancy across two financial disclosures that a paralegal review missed. I'd love to run it on one of your active cases — takes 10 minutes, completely free. Worth a look?"

**The multi-touch sequence (email + call combined, 2-3x better than either alone):**
- Day 1: Cold email
- Day 3: Cold call ("I sent you an email Tuesday about...")
- Day 5: LinkedIn connection request
- Day 8: Second email (different angle — security or case study)
- Day 12: Second call attempt
- Day 15: Final email with 90-second demo video

### LinkedIn Content Engine

**Start this week. Post 4-5x/week.**

Steal from Adam Robinson's playbook:
- 90% value, 10% CTA. Only 1 in 10 posts mentions CaseDelta.
- Topics: "What a paralegal costs vs. what the work is worth." "The AI tools lawyers are using (and the malpractice risks they don't know about)." "What happens when a paralegal quits and takes 2 years of case knowledge." Behind-the-scenes of building for lawyers.
- 10-20 LinkedIn connection requests/day to managing partners at 5-50 attorney firms.
- Comment on legal industry posts 5-10x/day (build visibility before posting works).
- Target: 5K LinkedIn connections in 90 days.

### The "Delta Found Something" Video (This Week)

Record a 90-second screen recording:
1. Upload anonymized financial documents or medical records
2. Delta classifies, checks completeness, finds a discrepancy
3. End frame: "This took 3 minutes. A manual review takes 3 hours."

Post on LinkedIn. Use in cold emails. Use as the "send me info" follow-up. This one asset replaces every pitch deck. This is CaseDelta's "Midjourney image" — the output that sells itself.

### The Slingshot Mechanisms

**1. Clio Marketplace listing.** Every firm that uses Clio and searches for AI tools finds you. One listing, continuous inbound. #1 engineering priority after Clio integration is complete.

**2. CLE talks.** One 45-minute talk to 50 lawyers → 5-10 warm conversations → 2-3 demos → 1-2 closes. Vickie Mauck intro already in play. Push HARD. Repeat monthly.

**3. Referral bounty.** "Refer a firm that signs up → your next month is free." $1,499 buying a warm intro that would take 2,000 cold emails to replicate.

**4. LPL insurer partnership.** ALPS, Lawyers Mutual endorse tools that reduce malpractice risk. CaseDelta's audit trail IS malpractice risk reduction. One endorsement = instant credibility with every firm they cover.

---

## VIII. The Demo That Closes

Every meeting. Every time. No slides. No feature tours. Their documents. Live.

**The sequence:**
1. "Give me your hardest active case — the one with the most documents."
2. Upload 10-20 documents live.
3. Delta classifies, checks completeness, finds anomalies.
4. In 10 minutes: "Delta found 3 things: a missing QDRO, a $23K income discrepancy, and an unsigned page."
5. Lawyer's face: "How did it find that?"
6. "That's what Delta does every morning before you walk in. Want to see what it would look like on your entire caseload?"

**The aha moment = Delta finding something the lawyer didn't know about, on their own documents, in minutes.** This is the Midjourney image equivalent. The output sells the product.

---

## IX. 12-Month Roadmap

### Phase 1: Foundation (Months 1-3) — Target: 5-10 paying firms, ~$5-8K MRR

**Convert warm pipeline:**
- Barnds Law (Kyra active, Kaitlin = decision-maker) → close by Mar 18
- Katherine Clevenger (ParksClevenger) → close from Mar 13 meeting
- Sarah Carmody (Carmody Law) → fix MyCase OAuth, re-engage
- KN Immigration (Heidi/Mireya) → complete Camp Legal integration
- Goza & Honnold → med mal demo (strategically critical — first high-value ICP)

**Price first 5 at whatever closes.** Track token costs religiously. This data informs all future pricing.

**Launch LinkedIn content engine.** Daily posts, connection requests, comment engagement.

**Record the "Delta Found Something" video.** Post on LinkedIn + use in all outreach.

**White-glove onboard every customer.** Camren personally. Session 1: connect integrations. Session 2 (week 2): review findings. Session 3 (month 1): collect quote for case study. Session 4 (month 2): referral ask.

**Build the free tier.** $50 in credits on signup. Self-serve. This runs in parallel with sales-led efforts and starts capturing the long tail.

### Phase 2: Traction (Months 4-6) — Target: 15-30 paying firms, ~$15-25K MRR

**KCBA CLE talk.** Push Vickie Mauck connection. Title: "Practical AI for Attorneys: What Actually Works, What to Avoid, How to Keep Client Data Safe." Educate, don't pitch.

**Practice area density.** Pick ONE high-value area and own it. Recommended: **Medical Malpractice** (Goza & Honnold already in pipeline, document-heavy, high case values, Delta's anomaly detection shines on medical records).

**First published case study.** The MOMENT any customer has a win: "[Firm Name] reduced document review time by X%." Specific, named, with a quote.

**Cold outreach machine.** 200-400 emails/week + 30-50 calls/day in multi-touch sequences. Targeted to med mal, commercial lit, employment, IP firms with 5-50 attorneys.

**Complete the proactive loop.** Clio read/write → morning briefing → approval queue UI → email notification. Once built, every demo starts with what Delta did overnight without being asked.

**Converge on pricing model.** By customer 15, you'll know if lawyers prefer flat or usage-based. Lock it in.

### Phase 3: Scale (Months 7-9) — Target: 50-80 firms, ~$40-60K MRR

**Geographic expansion.** KC is proving ground. Expand to California (52 OC firms in CRM, Camren relocating). Second city: wherever bar association connection opens a door.

**Clio marketplace listing goes live.** This is the force multiplier. Every Clio user searching for AI tools finds CaseDelta. Continuous inbound.

**LPL insurer conversations.** ALPS, Lawyers Mutual. "CaseDelta creates documented ABA 1.6 compliance by architecture." Ask for: endorsement, co-marketing, reduced premiums for CaseDelta firms.

**Referral flywheel at full speed.** 50+ customers each knowing 5+ managing partners. "Refer a firm → your next month is free."

**Annual pricing push.** $1,499/mo → $14,990/yr (save $3,000). Lock in retention + cash flow.

### Phase 4: Acceleration (Months 10-12) — Target: 150-200 total firms, ~$85-100K MRR

**Hire first sales rep.** Only after Camren has personally closed 20+ firms and documented the playbook. Former legal tech sales (Clio, LexisNexis, Thomson Reuters). Base + aggressive commission on new MRR.

**Content scaling.** Monthly "Legal Practice AI Report" with anonymized data. Podcast appearances on legal industry shows. Guest posts in bar publications.

**Expand practice areas.** Med mal proven → add commercial lit → add employment → add IP. One at a time, each with its own demo script and case study.

**Self-serve organic growth compounding.** By month 10, the free tier + LinkedIn content + Clio marketplace should be generating 10-20 self-serve signups/month without sales effort.

---

## X. Critical Assumptions & Risks

### Where This Plan Could Break

| Risk | Severity | Mitigation |
|---|---|---|
| Sales cycle longer than expected | High | First 5 customers will be hard. Budget 2-3 months, not 5 weeks. Don't get demoralized. |
| Token costs higher than modeled | Medium | Usage caps + overage protect margins. Monitor weekly. Optimize models later, not now. |
| Clio integration delayed | High | Clio integration unlocks proactive loop + marketplace listing. Treat as #1 engineering priority. |
| Competitors drop prices or add features | Medium | CaseDelta competes on proactive + security, not research features. Different category. |
| Churn in self-serve tier | Medium | Expected. Low-price customers churn 15-20%/month (RB2B data). High-value tiers churn 2-5%. Revenue weighted to sales-led. |
| Solo founder bandwidth | High | Can't build product + sell + create content + onboard simultaneously. Prioritize: sell > build > content. |

### The Honest Assessment

$1M ARR in 12 months at this pricing requires near-flawless execution across multiple channels. It's a stretch goal, not a certainty. $500-700K ARR is achievable and puts CaseDelta in fundable/scalable territory. The dual-market model (self-serve + sales-led) de-risks by having two revenue engines. If sales-led is slower than expected, self-serve compounds in the background. If self-serve doesn't take off, sales-led alone at 40-50 firms gets to $500K+ ARR.

The first 5 customers are the hardest thing you'll do. After that: proof, stories, referrals, and the flywheel starts turning.

---

## XI. Do's and Don'ts

### DO:
1. Demo on their documents. Every meeting. Their case files. Live.
2. Charge from day one. Free pilots breed "I'll look at it later." Free credits with a conversion trigger create urgency.
3. Post on LinkedIn daily. 200+ posts over 12 months is your largest acquisition channel.
4. Ask for referrals at the 30-day mark. Every happy customer knows 5 lawyers.
5. Pick med mal or commercial lit first. Own it. Then expand.
6. Ship the morning briefing. It's the output that sells itself.
7. Track token costs per firm from day one. This data determines your pricing model.
8. Cold call. Lawyers answer phones. 30-50 dials/day, 2-3 hours.

### DON'T:
1. Don't price at $1,000/mo with zero customers and zero brand. Land at $799-1,499 depending on firm size, expand later.
2. Don't wait for the product to be "ready." Demo what works today.
3. Don't mass-email. 50 personalized emails > 500 templates. Quality of touch matters in legal.
4. Don't try to serve everyone equally. Enable small firms with self-serve, but SELL to 5-50 attorney firms.
5. Don't optimize token costs yet. Show maximum value now. Optimize models (Haiku routing, caching, batching) once you have 20+ customers and usage data.
6. Don't hire sales before the founder playbook is proven. Camren closes the first 20.
7. Don't underestimate the sales cycle. The first 5 customers are 2-3 months of work, not 5 weeks.

---

## XII. One-Page Summary

**What:** CaseDelta is the AI associate for the 80% of law firms that Harvey ignores — proactive, secure, flat-priced per firm.

**Who:** 5-50 attorney firms in med mal, commercial lit, employment, PI, IP. Managing partners billing $300+/hr who are drowning in document review.

**How much:** Self-serve: usage-based ($50-300/mo). Sales-led: $799-2,499/mo flat per firm with included usage + overage.

**Why now:** 78% of firms cite security as the top AI barrier. Per-seat pricing from competitors makes legal AI unaffordable for mid-size firms. CaseDelta eliminates both objections.

**How we get there:** Founder-led sales (warm pipeline → cold calling + email → CLE talks → referrals → Clio marketplace). LinkedIn content daily. Self-serve free tier captures long tail.

**The number:** ~200 firms across two segments. ~$99K MRR. ~$1.19M ARR. 12 months.
