# CaseDelta Beachhead Analysis — Practice Area Selection

**Date:** March 9, 2026
**Catalyst:** Gabriel Stiritz call (Lexamica founder) + strategic reanalysis
**Purpose:** Identify the best practice area beachhead for CaseDelta's California expansion
**Status:** Decision pending — Camren to commit

---

## Executive Summary

CaseDelta is a horizontal AI orchestration layer — "another seat in your firm." It doesn't compete with EvenUp (demand letters), Blue J (tax research), Harvey (BigLaw AI), or any other vertical tool. CaseDelta sits on top of all of them as the intelligent coordination layer. A PI firm can use EvenUp AND CaseDelta. A tax firm can use Blue J AND CaseDelta. No competitor rules out a practice area.

CaseDelta has no domain-specific moat today. The product is a general-purpose AI agent with runtime prompts — equally capable across all practice areas. The beachhead decision is about **where to BUILD the moat**, not where existing features fit.

Three constraints shape the decision:
1. **Moving to California** — Kansas warm leads close for initial income; the beachhead must be optimized for the CA market
2. **Go BIG** — Target the largest, highest-revenue segments where lawyers have serious money and serious pain
3. **No existing moat** — The choice determines which domain logic gets built first. Start from zero in every direction.

---

## Strategic Anchors

### Gabriel Stiritz (Lexamica) — March 9, 2026

Gabriel is the founder/CEO of Lexamica (800+ law firm clients, ~$45K ACV, referral management for PI firms). He gave 38 minutes of direct tactical advice on a Zoom call.

**Key directives:**
1. **Pick ONE practice area and commit.** "Better to literally roll a dice than spend another two days wondering."
2. **Homogeneity matters.** "At least specific enough that they're all the same." One product, one pitch, one onboarding flow.
3. **Embed at one firm.** YC founder moved to Akron to live with a law firm. "The psychologies of the law firms are so dramatically different."
4. **Billing model alignment.** Contingency = AI efficiency increases revenue. Hourly = AI efficiency can threaten revenue (must reframe as capacity).
5. **Dual pricing anchor.** (1) Revenue creation ("how many more cases can you take?") + (2) FTE replacement ("paralegal costs $50-70K, CaseDelta costs $6-12K").
6. **"You have an existential threat hanging over you."** Stop exploring. Start executing.
7. **Agentic AI is the gap.** "If the market still has a gap, it would be around agentic AI." The outsourced-output model (Eve, Supio, EvenUp) is funded. The in-firm agentic model is wide open.

**Relationship terms:** Mentor, not customer/investor. Follow up April 6-10 with concrete execution proof. Not more exploration.

Full debrief: `casedelta_documents_new/meetings/other/STIRITZ.md`

### CaseDelta's Positioning

CaseDelta is NOT a vertical tool that competes with any of these:
- **EvenUp** ($2B, $385M raised) — generates PI demand letters. Output-as-a-service.
- **Eve** ($1B, $103M Series B) — plaintiff pre-litigation outsourcing. $700/case.
- **Blue J** ($300M, $122M Series D) — tax research. Cuts research from 15 hours to 15 seconds.
- **Harvey** ($5B) — BigLaw general AI. 25-seat minimum, $1K/lawyer/month.
- **Supio** ($60M) — PI pre-litigation outsourcing.
- **Paxton** ($28M) — legal research & drafting. $159/user/month.
- **Darrow** ($91M) — plaintiff case sourcing AI. Finds legal violations at scale.

CaseDelta is the **horizontal in-firm AI associate** that works across the firm's existing tools. It ingests documents, monitors cases, flags issues, drafts follow-ups, and builds institutional memory — regardless of what other vertical tools the firm uses. Modern Treasury for law firms: don't replace anything, orchestrate everything.

A firm using EvenUp for demand letters still needs someone to manage the case file, chase missing documents, flag anomalies, track deadlines, and brief the partner every morning. That's CaseDelta. These tools are complements, not competitors.

---

## The Evaluation Framework

### What Makes a Practice Area "Right" for CaseDelta

| Criterion | Why It Matters |
|---|---|
| **Revenue / willingness to pay** | High-revenue attorneys don't blink at $700-1,000/mo. Brandan Davies (PI) didn't hesitate. Family law attorneys will. Go where the money is. |
| **Document pain intensity** | CaseDelta's core value is document-heavy cognitive work. More documents per case = more value delivered = stickier product. |
| **Path to moat** | How fast can CaseDelta build replicable domain logic from zero? Standardized documents → faster moat. Repeatable patterns → defensible moat. |
| **Billing model alignment** | Contingency: efficiency = more cases = more revenue. No pitch tension. Hourly: efficiency can = less revenue (needs capacity reframing at $500+/hr rates). |
| **CA market size** | How many firms in the ICP (5-50 attorneys) exist in California? Camren is rebuilding from zero — needs volume of firms to approach. |
| **Market growth** | Is the practice area expanding or contracting? Ride tailwinds, not headwinds. |

### The Hourly vs. Contingency Insight

Gabriel surfaced the most strategically important structural insight:

- **Hourly billing** (family law, estate, immigration, corporate, tax): Revenue = hours x rate. AI that makes work faster **reduces** billable hours = **reduces** revenue. Creates structural resistance to efficiency tools.
- **Contingency** (PI, employment plaintiff, bad faith, med mal, workers comp, qui tam): Revenue = % of settlement/verdict. AI that makes work faster = handle more cases = **more** revenue. Efficiency tools are welcome.

**Implication:** CaseDelta's beachhead should be contingency-billing unless the hourly rates are high enough ($500+/hr) that the capacity reframe works: "200 more billable hours at $500/hr = $100K in revenue for $12K in CaseDelta."

---

## The Contenders

Only the big markets. Only the high-revenue practice areas. Only the segments where the pain is real and the lawyers have money.

---

### 1. Personal Injury (Plaintiff)

**Revenue:** A+ | **Doc Pain:** A | **Moat Path:** B+ | **Billing:** Contingency | **CA Market:** A+ | **Growth:** Steady

**The market:**
- The largest plaintiff litigation market in the US
- 58% of PI solo practitioners earn $500K+/yr — these are wealthy lawyers
- Contingency (33-40% of settlement/verdict) = AI efficiency directly increases revenue
- Case values: $50K-$500K+ per case, with catastrophic injury cases in the millions
- Massive CA market — thousands of PI firms across every metro
- Gabriel's 800-firm Lexamica network is almost entirely PI firms

**The document pain:**
- Medical records (hundreds to thousands of pages per case)
- Police/accident reports, witness statements
- Insurance correspondence, billing records
- Expert reports (medical, accident reconstruction, economics)
- Discovery documents in litigated cases

**Path to moat:**
- Medical record chronology engine — every PI case needs a medical timeline, manually takes 20-40 hours
- Treatment gap detection — identify periods of no treatment that defense will attack
- Damages calculation automation — medical specials, lost wages, future costs
- Pattern detection across cases — which injuries correlate with which settlement ranges

**Adjacent tools (complementary, not competitive):**
- EvenUp generates demand letters — CaseDelta manages the entire case file and workflow
- Eve outsources pre-litigation — CaseDelta works inside the firm as a colleague
- Supio does medical chronology — CaseDelta does everything else (and could do chronology too)
- A PI firm could use all four: Darrow (find cases) → CaseDelta (manage the case) → EvenUp (generate demand) → Eve (outsource pre-lit if overwhelmed). CaseDelta is the in-firm layer.

**Risks:**
- Attention competition: $500-750M of VC money spent marketing to these firms. EvenUp, Eve, and Supio are bombarding PI firms with sales outreach. Getting in the door is harder when firms are already inundated with legal AI pitches.
- Gabriel warned: "The economics of entering PI as an unfunded solo founder are near-impossible" — referring to attention competition and GTM cost, not product competition.

**Verdict:** Biggest market, wealthiest lawyers, perfect billing alignment. The risk isn't product competition (CaseDelta is a different layer) — it's getting heard above the noise of $500-750M in VC-funded marketing. Viable if CaseDelta can differentiate its pitch ("I'm not another demand letter tool — I'm another person in your firm").

---

### 2. Employment Law (Plaintiff — PAGA / Wage & Hour)

**Revenue:** A | **Doc Pain:** A | **Moat Path:** A- | **Billing:** Contingency | **CA Market:** A+ | **Growth:** Record-breaking

**The market:**
- **PAGA filings hit 10,098 in 2025** — all-time record. Up from 9,464 in 2024. California is ground zero for employment litigation.
- Contingency/hybrid billing. Fee-shifting: defendants pay plaintiff attorney fees.
- Average PAGA settlement: ~$1.1M. Employment discrimination: $100K-$500K. Wage & hour class actions: millions.
- California has the most employee-protective laws in the country (PAGA, FEHA, wage & hour). CA is the epicenter of this practice area.
- Hundreds of plaintiff employment boutiques across LA, SF, OC, San Diego.
- Partners generating $400K-$1M+ per year. Won't blink at $700/mo.

**The document pain:**
- Personnel files, timesheets, payroll records (across potentially hundreds of employees in PAGA cases)
- Emails, Slack messages, internal communications
- HR policies, employee handbooks, performance reviews
- Scheduling data, meal/rest break logs
- Wage statements, W-4s, tax documents

**Path to moat:**
- Wage & hour violation detection: "hours worked > hours paid = wage theft," "no meal break recorded during 6+ hour shift = violation"
- Cross-employee pattern analysis in PAGA cases — identify systemic violations across hundreds of employees
- Automated penalty calculation based on CA labor code
- Payroll system extraction for common platforms (ADP, Paychex, Gusto)

**Adjacent tools:** Zero dedicated AI tools in this segment. Complete white space.

**Risks:**
- 2024 PAGA reforms (AB 2288 + SB 92) changed penalty structures — but filings still hit records in 2025, so reforms haven't slowed volume
- Payroll systems vary by employer, slightly reducing document standardization vs. insurance or tax

**Verdict:** Largest high-revenue market in CA with zero noise from other AI vendors. Record-breaking volume, contingency alignment, and a clear path to violation-detection logic that compounds across clients. When Camren lands in CA with no network, this segment has the most firms to approach.

---

### 3. Insurance Bad Faith (Plaintiff — Wildfire-Driven)

**Revenue:** A+ | **Doc Pain:** A | **Moat Path:** A | **Billing:** Contingency | **CA Market:** A+ (explosive) | **Growth:** Unprecedented

**The market:**
- **January 2025 LA wildfires: $135-150 billion in total losses** (AccuWeather). Insured losses up to $30 billion. 6,837 structures destroyed in Palisades fire alone. Eaton fire killed 17, destroyed thousands more.
- **Tens of thousands of plaintiffs.** 40+ lawsuits against Southern California Edison. 45-firm steering committee. 5,000+ individuals/businesses represented. $10 billion in subrogation claims pending.
- **Insurance companies denying and delaying en masse.** State Farm under LA County investigation. FAIR Plan subject to CDI enforcement. 220+ consumer complaints. Adjuster turnover means claims restart.
- Contingency billing (33-40%). AI efficiency = more cases = more revenue.
- **Very high case values.** Policy limits ($200K-$multi-million) + punitive damages at 10-20x actual loss. Recent results: $150M, $108M, $47M verdicts.
- Established plaintiff firms: Shernoff Bidart Echeverria, McKennon Law Group, Pillsbury & Coleman, Kabateck LLP, Cutter Law, CaseyGerry, Singleton Schreiber.
- **This wave will generate cases for 3-5+ years.** Baseline bad faith work (homeowner, auto, disability, health) is a permanent practice area beyond wildfires.

**The document pain:**
- Insurance policies (declarations, full policy language, endorsements)
- Claim correspondence (denial letters, reservation of rights, adjuster communications)
- Internal insurer claim files (obtained in discovery — adjuster notes, internal comms, guidelines)
- Property damage assessments, repair estimates, contractor bids
- Medical records (for disability/health bad faith)
- Financial records (for punitive damages phase)

**Path to moat:**
- **Bad faith indicator detection engine.** Bad faith violations follow recognizable patterns: unreasonable delay, lowball offers without investigation, inconsistent denial reasons, boilerplate letters with factual errors. CaseDelta could systematize the analysis every plaintiff attorney needs to do. Prove the same elements, every time.
- Policy language analysis — ISO standard forms, coverage triggers, exclusion interpretation. Highly automatable.
- Claim file timeline reconstruction — when was each communication sent, what was promised vs. delivered
- Carrier behavior pattern matching — build a database of how specific carriers handle (and mishandle) claims

**Adjacent tools:** Zero AI tools target plaintiff bad faith specifically. Complete white space.

**Risks:**
- The wildfire wave is a surge — market size may shrink in 3-5 years as cases resolve (though baseline bad faith is permanent)
- Many firms handle bad faith as part of a broader plaintiff practice, not as a standalone — customer base may be less homogeneous
- Requires understanding insurance policy language (learnable but specialized)

**Verdict:** Once-in-a-generation timing opportunity. If Camren lands near LA during peak wildfire litigation, this is a massive wave with zero AI competition, standardized documents, and explosive case values. The risk is permanence — but baseline bad faith work sustains beyond wildfires.

---

### 4. Medical Malpractice (Plaintiff)

**Revenue:** A+ | **Doc Pain:** A+ | **Moat Path:** B+ | **Billing:** Contingency | **CA Market:** A | **Growth:** Steady

**The market:**
- Contingency billing (33-40%). Case values: $200K-$2M+. Catastrophic cases in the tens of millions.
- Partners generating $500K-$1.5M+/yr. Won't blink.
- Large CA market with many plaintiff med mal boutiques.
- Among the highest case values in plaintiff litigation.

**The document pain:**
- **Most document-intensive practice area.** Medical records can span thousands of pages per case — physician notes, nursing records, imaging reports, operative notes, lab results, pharmacy records, billing records, expert opinions.
- Every case needs a medical chronology/timeline — manually takes 20-40 hours.
- Cross-referencing treatment records against billing, identifying gaps in care, spotting deviations from standard of care.

**Path to moat:**
- Medical chronology engine — automated timeline from any medical record set
- Standard of care deviation detection (requires medical domain knowledge)
- Treatment gap identification
- Medical billing analysis (ICD-10, CPT codes)
- BUT: medical records are notoriously unstructured (handwritten notes, inconsistent formats across hospitals). Slower moat-building than insurance or employment docs.

**Adjacent tools:**
- Supio does medical chronology for PI. Could be complementary or slightly overlapping.
- EvenUp/Eve are PI-adjacent but not specifically med mal document management.

**Risks:**
- Medical records are the messiest documents in law — handwritten, inconsistent, highly variable across healthcare systems
- Requires some medical domain knowledge to build effective analysis
- PI-adjacent, so some attention competition from the $500-750M VC wave

**Verdict:** Enormous document pain, very high case values, contingency alignment. The document messiness slows moat-building, but the pain is so acute that even a general-purpose AI agent adds massive value on day one. Strong beachhead or expansion target.

---

### 5. Tax Controversy

**Revenue:** A | **Doc Pain:** A+ | **Moat Path:** A+ | **Billing:** Hourly ($400-800/hr) | **CA Market:** B+ | **Growth:** Steady

**The market:**
- Tax controversy partners bill $400-$800/hr. High-stakes IRS disputes involving millions in back taxes, penalties, potential criminal exposure.
- Revenue per partner: $500K-$1.5M+. Won't blink at $700/mo.
- CA market: high-net-worth individuals, tech founders with complex equity, real estate developers, crypto investors.

**The document pain:**
- Years of tax returns (1040, 1065, 1120), K-1s, 1099s, W-2s
- Bank statements, financial statements, investment records
- IRS notices, correspondence, audit workpapers
- Partnership/operating agreements, trust documents
- Expert reports for complex positions

**Path to moat:**
- **Fastest moat-building of any practice area.** IRS forms are government-standardized. Every 1040 has the same line items. Every K-1 has the same fields. Build extraction logic once → works for every client, forever.
- Income reconciliation is mathematical: does reported income on the 1040 match bank deposits, 1099s, and K-1s? This is automatable, deterministic, and perfectly suited to AI.
- IRS deadline tracking (response dates, statute of limitations) is structured and critical.

**Adjacent tools:**
- Blue J ($300M, 3,000+ firms) does **tax research** — "what's the law on this issue?" CaseDelta does **tax case management** — "organize these 500 pages of financial records, flag the discrepancies, track the deadlines." Different layers. A tax firm could use both.

**Risks:**
- Hourly billing tension. At $400-800/hr, the capacity reframe works ("take on 2 more controversy matters per quarter") but it's a harder pitch than contingency.
- Market of pure tax boutiques (5-20 attorneys) is smaller than employment or PI. Many tax practitioners are at larger firms.
- Blue J is already marketing to tax firms — attention competition exists even though the products don't overlap.

**Verdict:** Best moat-building speed of any practice area (government-standardized documents = fastest path to replicable domain logic). High revenue, real pain. Limited by market size and hourly billing tension. Could be the right play if CaseDelta finds a dense cluster of tax boutiques in a CA metro.

---

### 6. Qui Tam / Whistleblower (False Claims Act)

**Revenue:** A+ | **Doc Pain:** A+ | **Moat Path:** A- | **Billing:** Contingency + fee-shifting | **CA Market:** B+ | **Growth:** Record-breaking

**The market:**
- **FY 2025: $6.8 billion in FCA recoveries — all-time record.** 1,297 new qui tam suits filed (highest ever, 5/day, up 32%).
- Whistleblowers received $330M+ in payouts. 77% of all FCA recoveries came from qui tam.
- California FCA is even more favorable: 15-33% if government intervenes, 25-50% if relator proceeds alone.
- Fee-shifting: defendant pays plaintiff attorney fees and litigation costs on top of contingency.
- Healthcare fraud dominates, but cybersecurity, defense procurement, and environmental fraud expanding.

**The document pain:**
- Initial complaint requires "written disclosure of substantially all material evidence" — massive document compilation.
- Medical billing data, corporate financials, internal communications, compliance documents, coding records, expert analyses.
- Among the most document-intensive practice areas in law.

**Path to moat:**
- Healthcare billing fraud pattern detection — upcoding, unbundling, unnecessary procedures across thousands of claims
- Financial anomaly detection across corporate records
- Evidence organization against FCA elements (knowledge, materiality, falsity)
- BUT: requires understanding medical billing codes (ICD-10, CPT) for healthcare fraud cases

**Adjacent tools:** Zero AI tools target qui tam plaintiff firms.

**Risks:**
- Very specialized practice — the market of dedicated qui tam firms is small (dozens to low hundreds nationally)
- Cases are long (3-7 years filing to resolution)
- Government intervention decisions create uncertainty
- Healthcare billing expertise required for the dominant case type

**Verdict:** Extreme document pain, enormous case values, record-breaking growth, zero competition. But the market of dedicated firms is small. Best suited as an expansion target or a niche play for firms that also handle employment or general plaintiff work.

---

### 7. Commercial Litigation (Boutique)

**Revenue:** A+ | **Doc Pain:** A+ | **Moat Path:** C+ | **Billing:** Hourly ($400-800/hr) | **CA Market:** A+ | **Growth:** Steady

**The market:**
- Highest billing rates outside BigLaw. Partners at $500-$800/hr.
- Huge CA market: tech disputes, contract litigation, securities, antitrust, real estate.
- Case values: $100K-$10M+.
- Perry Brandt confirmed the pain: "I want everything with this person's name on it" — no current solution for small/mid firms.
- No AI tool targets 5-50 attorney commercial lit boutiques. Relativity/Everlaw serve large firms.

**The document pain:**
- Discovery can involve thousands to millions of pages
- Contracts, correspondence, financial records, depositions, emails, expert reports
- Cross-referencing across massive document sets
- Deposition prep requires finding every document mentioning a specific person/topic

**Path to moat:**
- Document relevance scoring and cross-referencing
- Deposition prep automation ("everything with this person's name on it")
- Contract clause extraction and comparison
- BUT: extreme heterogeneity. Every commercial dispute is different — contract disputes, securities, antitrust, IP, real estate. The document types and analysis required change completely. Slowest moat-building of the big practice areas.

**Adjacent tools:** Relativity and Everlaw do e-discovery for large firms. No equivalent for 5-50 attorney boutiques. Gap exists.

**Risks:**
- **Hourly billing tension.** Efficiency = fewer billable hours. At $500+/hr, the capacity reframe is strong ("200 more hours at $500 = $100K"), but it's structurally harder than contingency.
- Heterogeneity makes every case different — harder to build replicable domain logic
- Large firms have Relativity/Everlaw; CaseDelta would need to be the "Relativity for small firms"

**Verdict:** Enormous market, wealthiest lawyers, extreme document pain. But the hardest pitch (hourly billing) and slowest moat path (heterogeneous cases). Best for firms whose pain is so acute they'll pay despite the billing tension.

---

## Eliminated Practice Areas

These practice areas fail the "go BIG" filter — either too low-revenue, too niche, or insufficient document pain for CaseDelta's value proposition.

| Practice Area | Why Eliminated |
|---|---|
| **Family Law** | Near-bottom hourly rates ($250-400/hr). Budget-conscious buyers. Keep for Kansas income only. |
| **Immigration** | Flat fee ($3-15K/case). Low revenue. New AI competitors emerging (LegalOS, Visalaw AI). |
| **Bankruptcy** | Bottom of the revenue stack. Flat fee ($1.5-10K). Not compatible with going big. |
| **Workers Comp** | Lower case values ($20K-$100K), lower revenue per partner. Not chasing up-market enough. |
| **Criminal Defense** | Too heterogeneous (DUI firm ≠ white collar firm). Mixed revenue. |
| **Lemon Law** | High volume but niche. Practice AI already exists. Regulatory headwinds (AB 1755). |
| **Construction Defect** | Niche. Smaller firm market. Multi-party complexity harder to systematize. |
| **Estate Planning** | Mostly transactional, not document-heavy litigation. Moderate revenue. |
| **Patent/IP** | Documents are engineering specs/source code — wrong domain. Wildly heterogeneous by technology area. |
| **PFAS/Toxic Tort** | Mass tort play, better served by mass tort-specific tools. |
| **Cannabis** | Primarily transactional/compliance, not document-heavy litigation. |
| **Privacy/CCPA** | Early-stage practice area, unpredictable case outcomes. |
| **Elder Abuse** | Growing but small market of specialized firms. |

---

## Revenue & Billing Comparison

| Practice Area | Billing Model | Revenue/Partner | Typical Case Value | $700/mo Reaction |
|---|---|---|---|---|
| **PI (plaintiff)** | Contingency 33-40% | $500K-$2M+ | $50K-$500K+ | Won't blink |
| **Insurance Bad Faith** | Contingency 33-40% | $400K-$1.5M+ | $200K-$5M+ (punitive) | Won't blink |
| **Med Mal** | Contingency 33-40% | $500K-$1.5M | $200K-$2M+ | Won't blink |
| **Qui Tam** | Contingency 15-50% | $500K-$2M+ | $1M-$100M+ | Won't blink |
| **Employment (plaintiff)** | Contingency/hybrid + fee-shift | $400K-$1M+ | $100K-$1.1M (PAGA avg) | Won't blink |
| **Commercial Lit** | Hourly $400-800 | $500K-$2M+ | $100K-$10M+ | Won't blink |
| **Tax Controversy** | Hourly $400-800 | $500K-$1.5M | Varies widely | Probably fine |

All seven contenders are high-revenue practices where $700/mo is noise. The billing model is the differentiator, not the revenue.

---

## Document Standardization & Moat Speed

Starting from zero domain logic — how fast can CaseDelta build replicable, defensible domain intelligence?

| Practice Area | Primary Documents | Standardization | Pattern Repeatability | Moat Speed |
|---|---|---|---|---|
| **Tax Controversy** | IRS forms (1040, K-1, 1099), financials | Very high (government forms) | Very high (mathematical reconciliation) | **Fastest** |
| **Insurance Bad Faith** | Policies (ISO forms), denial letters, claim files | High (industry standard forms) | High (bad faith patterns are codifiable) | **Fast** |
| **Employment (PAGA)** | Payroll, timesheets, HR policies, W-4s | Medium-high (varies by payroll system) | High (wage violations are pattern-based) | **Medium-fast** |
| **PI** | Medical records, police reports, insurance docs | Medium (medical records vary) | Medium (case-specific) | **Medium** |
| **Qui Tam** | Billing data, financials, compliance docs | Medium (varies by industry) | High (fraud patterns are detectable) | **Medium** |
| **Med Mal** | Medical records, billing, expert reports | Low (unstructured, varies by hospital) | Medium (standard of care is fact-specific) | **Slow** |
| **Commercial Lit** | Contracts, correspondence, financials | Low (every dispute is different) | Low (heterogeneous cases) | **Slowest** |

---

## Decision Matrix — Final Ranking

| # | Practice Area | Revenue | Doc Pain | Moat Path | Billing Fit | CA Market | Growth | **Overall** |
|---|---|---|---|---|---|---|---|---|
| **1** | **Employment (plaintiff)** | A | A | A- | A+ (contingency) | A+ | A+ (record filings) | **A** |
| **2** | **Insurance Bad Faith** | A+ | A | A | A+ (contingency) | A+ | A+ (wildfire wave) | **A** |
| **3** | **PI (plaintiff)** | A+ | A | B+ | A+ (contingency) | A+ | A (steady) | **A-** |
| **4** | **Med Mal** | A+ | A+ | B+ | A+ (contingency) | A | A (steady) | **A-** |
| **5** | **Tax Controversy** | A | A+ | A+ | B (hourly) | B+ | B+ (steady) | **B+** |
| **6** | **Qui Tam** | A+ | A+ | A- | A+ (contingency) | B+ | A+ (record) | **B+** |
| **7** | **Commercial Lit** | A+ | A+ | C+ | B (hourly) | A+ | B+ (steady) | **B+** |

Employment and Insurance Bad Faith are neck-and-neck at the top. PI is back in contention as a viable play at a different layer than EvenUp/Eve. Tax is fascinating for moat speed but constrained by market size and hourly billing.

---

## The Kansas-to-California Strategy

| Phase | Timeline | Focus | Goal |
|---|---|---|---|
| **Kansas (now → move)** | Weeks | Close warm leads: Barnds, Clevenger, Carmody, Roth Davies | Initial revenue to fund the move. Product validation on real deployments. Practice area agnostic — take the money. |
| **California landing** | Month 1 | Choose metro. Identify 20+ target firms in beachhead segment. Cold outreach for embed. | Find 1 firm willing to let Camren sit in for 2-3 weeks. |
| **Embed** | Months 1-2 | Sit in the firm. Learn the exact workflow. Build domain logic for their specific pain. | Working prototype with real domain logic, tested on real cases. |
| **First CA customer** | Month 2-3 | Convert embed firm to paying customer. Use as proof to approach 5 more firms. | 1 paying CA customer in the beachhead segment. |
| **Gabriel follow-up** | April 6-10 | "I embedded at a CA firm, built [specific domain logic], here's what happened." | Execution proof → continued mentorship. |

---

## What Lexamica Teaches CaseDelta

| Lexamica Insight | CaseDelta Application |
|---|---|
| ACV: ~$45K/yr (volume-based, not seat or license) | Explore per-matter or per-case pricing. Seat-based caps revenue in small firms (only 1-6 people touch the platform). |
| Dual pricing anchor: (1) revenue creation + (2) FTE replacement | Add revenue anchor: "3 more cases/month x $X/case = $Y/yr in new capacity. CaseDelta costs $12K/yr." |
| Deterministic rules, not AI. Firms want control. | CaseDelta's AI must always surface findings for attorney review/override. Never auto-execute on a real case. |
| "The actual hard work is managing and curating network performance" | The moat isn't the AI. It's the operational layer — domain logic, firm-specific context, reliability. |
| "They hate it, then they love it because it gets better" | Expect rough first 2-4 weeks with each client. Plan for it. Don't lose the client in week 1. |
| "It has to not fail" | Reliability > features. One bad AI output on a real case = lost client forever. |
| One persona: only PI firms 12+ people with referral management | CaseDelta needs the same discipline. One persona, not 7 practice areas. |
| Sales: 4 people serving 800 firms. Conferences + digital + outbound | Gabriel's GTM is old-school. Conferences and physical presence matter in legal. Plan for them. |
| "If the market still has a gap, it would be around agentic AI" | Validated CaseDelta's core thesis. The agentic in-firm model is the gap. |
| "I would never sell it as a license" — $1K/yr license vs. $45K/yr volume-based | Pricing architecture determines whether you build a $1K business or a $45K business. Choose wisely. |

---

## Adjacent AI Landscape (Complements, Not Competitors)

| Company | What They Do | Layer | CaseDelta Relationship |
|---|---|---|---|
| **EvenUp** ($2B) | PI demand letter generation | Output-as-a-service | **Complement.** EvenUp produces the demand letter. CaseDelta manages the entire case file, chases documents, flags anomalies, briefs the partner. Different layers. |
| **Eve** ($1B) | Plaintiff pre-lit outsourcing, ~$700/case | Outsourced workflow | **Complement.** Eve outsources pre-lit work. CaseDelta works inside the firm as a colleague. Firms could use both. |
| **Blue J** ($300M) | Tax research ("what's the law?") | Research tool | **Complement.** Blue J answers tax law questions. CaseDelta organizes the case file, reconciles financial documents, tracks IRS deadlines. Different layers. |
| **Harvey** ($5B) | BigLaw general AI | Enterprise AI | **Different ICP.** Harvey serves Am Law 100. CaseDelta serves the other 80%. |
| **Supio** ($60M) | PI medical chronology | Specific output | **Partial overlap** on medical chronology. But CaseDelta is a full in-firm associate, not a single-output tool. |
| **Darrow** ($91M) | Case sourcing AI (finds legal violations) | Lead generation | **Complement.** Darrow finds the case. CaseDelta works the case. Sequential workflow. |
| **Paxton** ($28M) | Legal research & drafting | Research tool | **Complement.** Paxton does research. CaseDelta does case management and proactive monitoring. |

**The thesis:** Every one of these tools does ONE thing well. CaseDelta is the horizontal layer that ties it all together inside the firm. The more vertical tools exist, the more valuable a horizontal orchestration layer becomes.

---

## Action Items

| Action | Timeline | Priority |
|---|---|---|
| Commit to beachhead practice area | This week | **Critical** |
| Send thank-you email to Gabriel — reference "roll a dice" and YC/Akron story | Today | High |
| Update Liam Reilly that the call was excellent | Today | High |
| Research 20+ firms in beachhead segment in target CA metro | This week | High |
| Close Kansas warm leads (Barnds, Clevenger, Carmody) for initial revenue | Ongoing | High |
| Identify 1 firm in CA for the embed play | Before move | High |
| Follow up with Gabriel April 6-10 with execution proof | April 6-10 | High |
| Revisit pricing model — explore per-matter pricing, add revenue-creation anchor | This week | High |

---

## Sources

### Gabriel Stiritz Call
- Full debrief: `casedelta_documents_new/meetings/other/STIRITZ.md`

### Market Data
- Thomson Reuters 2026 State of the US Legal Market Report
- Clio 2025 Legal Trends for Solo and Small Firms
- PracticePanther 2024 Small & Midsized Law Firm Report
- BCG Attorney Search: Fastest-Growing Legal Practice Areas 2025-2026

### Practice Area Data
- PAGA filings: Duane Morris California Class Action Defense blog; CalChamber HRWatchdog; Ogletree Deakins (10,098 notices in 2025)
- Wildfire losses: AccuWeather ($135-150B); Claims Journal; Daily Journal; California DOI
- FCA recoveries: DOJ FY 2025 ($6.8B); Seyfarth Shaw; Ropes & Gray; Alston & Bird
- PI revenue: RunSensible 2024; LawCrossing 2025 partner compensation data

### Competitive Landscape
- EvenUp: Fortune ($150M Series E, $2B valuation, 2,000+ PI firms)
- Eve: Legal.io ($1B valuation, $103M Series B)
- Blue J: VentureBeat ($122M Series D, $300M valuation, 3,000+ firms)
- Harvey: $5B valuation
- Darrow: $91M total ($60M Series B)
- Paxton: LawNext ($22M Series A, 14x MRR growth)
- YC W26 batch: General Legal, Arcline, LegalOS, Crimson (Artificial Lawyer)

### CaseDelta Internal
- `CASEDELTA_CONSOLIDATED.md` — Strategy & Market Anchor
- `CASEDELTA_NARRATIVE.md` — Product Philosophy & Positioning
- `CASEDELTA_ROADMAP.md` — Product Roadmap & Operations
