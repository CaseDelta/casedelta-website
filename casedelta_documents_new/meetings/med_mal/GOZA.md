# Goza & Honnold — Meeting Debrief & Strategic Analysis
**Date:** March 12, 2026
**Attendees:** Kirk J. Goza (Founding Partner), Roxene (Office Manager / IT Gatekeeper), Unknown Staff Member (speaker_3 — paralegal or associate), Camren Hall
**Duration:** ~20 minutes
**Setting:** Their office, 9500 Nall Ave, Overland Park, KS 66207
**Context:** First in-person meeting, booked via Kirk's same-day reply to cold email (Mar 4)

---

## TL;DR

Kirk Goza is one of the most technically sophisticated plaintiff lawyers in KC. He's already built a custom AI document intelligence system for an active MDL, hires nurse practitioners for med mal chronologies, and outsources mass document review to Pattern Data. He's unhappy with Westlaw CoCounsel (locked in 1.5 more years, calls it "that stupid thing") and explicitly wants what CaseDelta is building — he described it almost word-for-word as the proactive loop. The biggest surprise: Roxene is the actual software decision-maker. Kirk said so explicitly within the first minute. The referral opportunity at the end of the meeting is potentially the highest-value outcome — Kirk offered to send names of similar PI/mass tort firms.

**Signal strength:** Very warm. Multiple strong buy signals. No hard objection to price or value. Timing is the only real constraint (CoCounsel contract).

---

## 1. The Buying Center — Critical Insight

Kirk made this clear in the first 90 seconds:

> "You know, you met Roxanne, but Roxanne's our office manager, and honestly, when it comes to a lot of the IT stuff and managing programs and stuff, she's probably more a better person to talk to than me, frankly."

**Kirk Goza** = strategic vision holder. He sees the big picture, articulates the use cases, and makes final budget calls. But he does not want to be in the implementation conversation. He's too senior and too busy (half hour from a closing argument when we met).

**Roxene** = the actual buyer on software. She handles IT decisions, manages programs, and will be the primary contact going forward. She is the one who will send the memo to the firm, email Camren, and decide whether CaseDelta gets integrated. She was also engaged and asked intelligent technical questions about the Clio integration during the meeting.

**Unknown staff member (speaker_3)** — There was at least one additional person in the room (possibly a paralegal or associate) who also engaged with technical questions: *"So are you saying when we dump our documents in Clio, your system is just automatically looking at that?"* and *"Is that your ILS or is that something else?"* This person should be identified and included in follow-up communications.

**Action:** Roxene is the champion to cultivate. Kirk gives the vision and the buy signal. Roxene executes the decision. Follow-up must serve both.

---

## 2. Their Current Tech Stack (Full Picture)

This is an unusually sophisticated firm for their size. They are already spending significantly on document intelligence.

| Tool | Purpose | Status | Kirk's Sentiment |
|---|---|---|---|
| **Clio** | Case management + document management | Active | Neutral/positive — it's their system of record |
| **Westlaw CoCounsel** | AI legal assistant (chronology, research) | Active — locked in ~18 months | *"That stupid thing." "Does a crappy job of doing chronologies." "I wish we wouldn't have gotten conned into that."* |
| **Pattern Data** | Mass-scale document review (MDL/mass tort) | Active — outsourced vendor | *"Not inexpensive."* + third-party data access concerns |
| **Nurse Practitioners** | Individual med mal chronologies | Active — per-case hire | External, expensive, limited to standard-of-care assessment |
| **Custom AI System (active MDL)** | Document intelligence for one specific litigation | Active — built by hired software engineer | Very enthusiastic. *"It absorbs them all very quickly."* Uses Claude or similar, enterprise version |
| **Claude (public)** | Ad-hoc AI use | Sporadic — concern about not having closed/private version | Roxene asked explicitly: *"Are we getting a version of Claude that's closed so that we can use it more?"* |

**What this means strategically:** Goza & Honnold is not a firm that needs to be convinced AI is useful. They are already buying it in multiple forms, at significant cost, and they know it. The sales conversation is not "should you use AI" — it's "CaseDelta replaces three separate line items you're already paying for and adds a permanent institutional layer you don't have."

---

## 3. Explicit Pain Points (Direct Quotes)

### Pain #1: CoCounsel Is a Lemon
> "We signed a two year contract, which in retrospect, given the velocity in which all the AI programs are changing... programs like yours do actually probably a better job."
> "C邑ounsel's very stilted because it's a platform built in the Westlaw background... it doesn't have much imagination other than what is in the statutory case law."
> "It does a crappy job of doing chronologies."
> "It's expensive. So I, I wish we wouldn't have gotten conned into that for so long."
> "We gotta get rid of CoCounsel. It doesn't do anything."

**Context from research:** CoCounsel costs ~$500/month on top of Westlaw. Documented limitations include hard caps at 50 search results regardless of actual hits, unreliable case citation validation, and inconsistent research quality. Kirk's complaints about chronologies are validated — it's not designed for plaintiff-side document synthesis, it's a legal research tool with limited document intelligence.

**CaseDelta angle:** CoCounsel contract expires in ~18 months. This is a hard timing constraint, but also a clear replacement opportunity. Worth noting now that CaseDelta can supplement what CoCounsel fails at (chronologies, document synthesis) *during* the remaining contract — not as a competitor, but as the piece CoCounsel doesn't cover.

### Pain #2: Pattern Data — Expensive & Security Risk
> "We've outsourced that sometimes to a company called Pattern Data. It's not inexpensive to do it that way."
> "It also creates some issues with a third party vendor having access to all the meta... You know, there are lots of things that come up as a result."

**Context from research:** Pattern Data is the dominant AI platform for mass tort case intake and document review — active on 30+ litigations with 1.2M+ cases, including JUUL, Roundup, Camp Lejeune, CPAP, 3M earplugs. They have deep MDL coverage. Pricing is enterprise and demo-only (i.e., expensive). Their model is outsourced document intelligence — you send them your data, they analyze it.

**CaseDelta angle:** The data security concern Kirk raised is exactly CaseDelta's differentiator. Pattern Data takes your client data and processes it externally — the same concern lawyers have with ChatGPT, but in a business-to-business context. CaseDelta keeps everything in-house. This is not a minor feature difference; for plaintiff PI/mass tort attorneys with 5 million pages of sensitive client medical records, this is a fundamental issue.

### Pain #3: Nurse Practitioners for Med Mal Chronologies
> "On the individual cases, a lot of times we'll hire like a nurse practitioner to create a medical chronology — because oftentimes we can direct them a little better about, okay, here are things, or, or get advice from them as to is this a case or not a case, or what's the deal here."

**Context from research:** Manual medical chronology review takes 15-20+ hours per case by a paralegal. Nurse practitioner services typically cost $35/hour with full hyperlinks and bookmarks. For a complex med mal case, this is $500-$1,500+ per case plus turnaround time.

**CaseDelta angle:** The nurse practitioner serves two functions: chronology building AND case evaluation ("is this a case or not a case"). CaseDelta can handle the chronology portion completely. The case evaluation piece (standard of care assessment) still benefits from clinical expertise — but if CaseDelta surfaces the right records and timeline, the nurse practitioner's engagement becomes much shorter and more targeted.

### Pain #4: MDL Document Chaos at Scale
> "In these cases, the hard part is tracking the documents because literally we have... I think the other side's produced five million pages of documents."
> "In there, there are thousands of documents that are good that have been used in depositions. But keeping all that straight — and in mind — is like the most [challenging thing]."
> "I am the worst freaking person in the world organizing things. Roxanne will tell you I have like 140,000 email messages in my inbox."

**Context from research:** MDL document management at scale typically requires enterprise Relativity or similar eDiscovery platforms — tools built for law firm IT departments, not founder-led boutique practices. The gap between "I need to find the 50 best cross-exam documents" and "I need to configure Relativity's predictive coding pipeline" is enormous.

**CaseDelta angle:** Kirk already knows what he wants — he described it exactly. See Section 5.

---

## 4. The Claude Angle — Major Differentiator Unlocked

Roxene asked explicitly:
> "Are we getting a version of Claude that's closed so that we can use it more?"

Kirk's response:
> "Claude, the only way you get a closed version is if you buy an enterprise package, and the only way to get an enterprise package, I think you gotta have 80 users or more. And so we don't have that."

Camren's response:
> "So the cool thing is I have an enterprise agreement, which is very nice."
> "I have the agreement. And I can deploy it on my own server."

**This is one of the highest-value moments in the meeting.** Goza & Honnold wants private, enterprise Claude but cannot access it at their firm size. CaseDelta holds that enterprise agreement and can deploy it on a per-firm basis. This resolves their exact pain point — they want closed, private Claude; CaseDelta is exactly that, packaged for their firm, without the 80-seat minimum.

This is not a feature to bury in sales materials. It is the single most concrete "here is something I want and you have it" moment in the entire meeting.

**Messaging for follow-up:** "CaseDelta gives your firm private, enterprise Claude — the version that doesn't train on your data, doesn't share your client information, and has the full model capability — without the 80-user minimum Anthropic requires. You've been using the consumer version and stopping yourselves because of data concerns. CaseDelta is the version you can actually use."

---

## 5. The "Day One" Use Case — The Killer App for This Firm

This is the most important section. Kirk described, in detail, the exact product he wants to buy. He did so unprompted.

> "I would be very interested in the next big case we have to say, 'Okay, day one, here is a proprietary software package that you dump everything — every motion, case [document]...'"
> "We can say to it, 'Okay, we wanna cross-examine this witness. What are the 50 best documents to use?' Or, 'What are the 100 best documents to put in an opening statement?'"

He described watching this work in real-time on their active litigation:
> "It's capable of scanning eight gazillion documents... I mean, it absorbs them all very quickly."

He explicitly acknowledged the retrospective gap:
> "I, I mean, we basically have hired a software engineer to do that other program that I've talked about. And essentially we bought his time and said, 'Just create this for us.'"

**What Kirk is describing is precisely the CaseDelta proactive loop applied to MDL litigation** — not the morning briefing for a family law matter, but the strategic document intelligence layer for a mass tort case with 5 million pages. He already knows it's possible because he already built a version of it. He's asking for the productized, Day One version.

**The core insight:** Today, Goza & Honnold builds this system **retroactively** — they hire a developer, dump documents in, and start querying mid-case. Kirk wants it **proactively** — starting from day one so the system is learning and indexing from the first filing.

This is not a feature request. This is the product-market fit signal for CaseDelta in the PI/mass tort vertical. The Day One MDL Intelligence System is the killer use case for this firm.

**Demo design for next meeting:** Don't show a family law checklist or a morning briefing for a standard matter. Build the demo around an MDL scenario — show Kirk uploading a batch of deposition exhibits and asking "What are the 20 best documents to cross-examine the defense expert on causation?" Show it finding them, with citations. That's the demo that closes.

---

## 6. What They Already Built — Validation of the Market

The custom MDL AI system deserves its own analysis because it tells us exactly what CaseDelta is competing with and what it needs to be.

**What they built:**
- A closed (enterprise) AI deployment (probably Claude, based on Kirk's language: *"I think it's Claude. It may be something else."*)
- Loaded with every document from one specific litigation
- Queryable: "What are the 50 best documents for cross-examining this witness?" / "What are the 100 best for opening statement?"
- Built by a hired software engineer, one-time cost, retroactively loaded

**Why this matters for CaseDelta:**
1. They will compare CaseDelta to this system. It sets the bar.
2. The problem with their system: it was built retroactively and only for one case. No persistence. No new case onboarding. The developer has to do it again for the next case.
3. CaseDelta's answer: this is exactly what CaseDelta automates. Instead of hiring a developer for each new major case, CaseDelta is the permanent infrastructure. Connect Clio on day one, every document ingested automatically, queries available from the first filing.
4. The switching cost argument: they spent money building that system. They'll spend money again for the next case. CaseDelta amortizes that cost across every case, forever.

**Roxene (speaker_3?)** also surfaced the proactive use case she envisions:
> "What I was understanding was like every morning I'm gonna come in and I'm gonna get a report from CaseDelta that says, 'This is what happened in Clio yesterday, and this is...'"

Kirk's response to her framing:
> "That would be the more way I would use it."

This is the proactive briefing — the morning report from CaseDelta's narrative document. Kirk confirmed it.

---

## 7. CaseDelta Narrative Fit Analysis

Mapping the meeting against the CaseDelta Narrative (`CASEDELTA_NARRATIVE.md`):

| Narrative Concept | Goza Meeting Validation |
|---|---|
| **Tool vs. Colleague** | Kirk described wanting a proactive system that starts working on day one and grows with the case — not something you prompt reactively. *"Starting from day one, Kirk..."* is colleague language. |
| **Proactive Loop** | Both Kirk and Roxene independently described the morning briefing concept. Kirk: *"Pull up documents in case so-and-so and do a medical summary for me"* (reactive) + Roxene: *"Every morning I'm gonna come in and get a report"* (proactive). They want both modes. |
| **Institutional Memory** | The explicit pain: 140K unread emails, no system for tracking 5M pages of opposing documents, having to rebuild AI systems from scratch for each case. This is the institutional memory problem stated directly. |
| **Secure by Belonging** | Third-party data concern with Pattern Data resonates exactly with the security narrative. They already have the anxiety; they articulated it. The enterprise Claude angle is the resolution. |
| **Approval Queue** | Kirk's vision: *"Okay, we wanna cross-examine this witness. What are the 50 best documents?"* — this is the approval queue concept in action. Surfaces candidates, lawyer decides. |
| **Delta Speaks First** | Roxene's morning briefing vision matches this exactly. |
| **The Paralegal Comparison** | Not explicitly tested, but the nurse practitioner cost + Pattern Data cost + CoCounsel cost together exceed the $50-70K paralegal comparison meaningfully. |

**Narrative gap:** The meeting talked mostly about reactive use (query-based) and the "Day One" system (MDL). The morning briefing for active case management was named by Roxene but not deeply explored. The demo should bridge this — show the proactive loop, then show the on-demand query. Both modes matter for this firm.

---

## 8. Competitive Displacement Map

Three separate line items CaseDelta can replace or supplement:

| Competitor | Annual Cost (Est.) | CaseDelta Advantage |
|---|---|---|
| **Westlaw CoCounsel** | ~$6,000/yr on top of Westlaw | Better chronologies, broader document types (not just case law), private enterprise Claude, no 50-result cap. Replace when contract expires in ~18 months. Supplement now for what CoCounsel can't do. |
| **Pattern Data** | Unknown, but enterprise/demo-only pricing suggests $20K-$100K+ per MDL engagement | In-house, no third-party data access, permanent institutional memory vs. per-engagement outsourcing, no security concern |
| **Nurse Practitioner Chronology** | ~$500-$2,500 per case at $35/hr (15-70 hrs) | Automated chronology in minutes, not days. The nurse practitioner's value shifts from chronology building to clinical judgment on the output — shorter engagement, better ROI |
| **Custom MDL Dev Work** | Unknown per-project cost (software engineer hired each time) | Permanent, productized, reusable across every case from day one — not rebuilt per litigation |

**Total displacement potential if all four:** Likely $50K-$200K+ per year in outsourced costs, depending on case volume and MDL size.

---

## 9. The "Send Us Your Resume" Signal

At the end of the meeting, Kirk said:
> "Send us your resume too with that."

This is ambiguous but important. Two possible interpretations:

**Interpretation A — Custom Build Interest:** Kirk is thinking about Camren as a potential custom development resource, similar to how they hired the software engineer for the MDL system. He'd rather "buy Camren's time" than a SaaS subscription.

**Interpretation B — Joke/Rapport:** Meant lightheartedly as a compliment — you're good, we'd hire you if you weren't building this.

**Recommended response:** Acknowledge it without letting it become a "custom dev" conversation. The right framing: *"I'd love to be deeply involved in configuring this for your firm — that's actually how I work with pilot customers, not just hand you a login. But the goal is building something that works for Goza & Honnold permanently, not a one-time project."*

**Why this matters:** If Kirk thinks of CaseDelta as "hiring Camren to build something custom," the relationship is:
- Transactional (one-time cost)
- Non-recurring (no SaaS contract)
- Not scalable (CaseDelta can't grow if it's a dev shop)

If Kirk thinks of CaseDelta as "getting access to what Camren built, with Camren involved in making it work for our firm," the relationship is:
- Subscription
- Recurring
- With Camren's time as a premium service layer (pilot terms)

The "resume" comment is an opportunity to deepen the relationship — just don't let it convert to consulting.

---

## 10. The Referral Play — Potentially the Most Valuable Outcome

At the very end, Kirk volunteered:
> "I'll send you some names of other... I don't know, you probably know people that you'd wanna talk to who kind of do the same thing we do on the same scale. Um, some a little bigger, some a little, you know, probably not as advanced. We actually are getting fairly technologically, moving forward a little bit."

**This is gold.** Kirk Goza is:
- Top 50 lawyer in Kansas and Missouri
- Fellow, American College of Trial Lawyers
- Well-networked in the plaintiff PI and mass tort community
- Actively involved in MDL steering committees (Xarelto, Power Morcellator, JUUL/Altria)
- Known by opposing counsel, co-counsel, and plaintiff bar leadership nationally

Referrals from Kirk Goza carry enormous credibility in the plaintiff PI space. A warm intro from Kirk to another PI/mass tort firm is worth 50 cold emails.

**Action:** In the follow-up, explicitly ask Roxene to remind Kirk about the referral list. Do not let this drop — it is the highest-value item from the meeting. Names to request: plaintiff PI firms, mass tort practices, MDL steering committee co-counsel. These are exactly the firms that have the document volume problem CaseDelta solves.

---

## 11. What Camren Did Well

- Security + HIPAA angle landed immediately: *"Which everybody's gotta be now."* — Kirk affirmed before Camren even finished the sentence
- "Needle in a haystack" framing resonated: *"Yes. You know they're exactly right"*
- Not-instead framing for paralegals was smart: *"Not instead. But having a program that could synthesize..."* — avoided threatening the paralegal relationship
- Clio integration focus worked: Kirk immediately lit up
- Revealing the enterprise Claude agreement at the right moment: this was a signal-grabber that changed the room's energy
- Historical case demo proposal as next step: *"You could do a historical case, dump it, see what it surfaces... And then you can QA"* — brilliant low-commitment pilot framing

---

## 12. What to Do Differently Next Time

- **Don't mention Sandberg Phoenix by name as a reference.** Kirk knows Perry Brandt. If Perry hasn't specifically endorsed CaseDelta, naming him as a client could be checked and create a mismatch in expectations.
- **Have the demo ready before the next meeting.** Kirk asked twice for examples of medical chronologies and timelines. This should have been a leave-behind or live demo at the first meeting. Next meeting: show it running on sample med mal records. Non-negotiable.
- **Identify and name the unknown staff member (speaker_3).** They were engaged and asked technical questions. Get their name from Roxene and include them in follow-up.

---

## 13. Next Steps (Agreed + Recommended)

### What was agreed in the meeting:
1. **Roxene emails Camren** — She confirmed she has his email and will reach out
2. **Roxene sends memo to the firm** — Kirk asked her to do this: internal awareness campaign, no action required from Camren
3. **Camren sends examples** of medical chronologies and timelines
4. **Kirk sends referral names** — firms doing similar PI/mass tort work at similar scale

### Recommended follow-up sequence:

**Within 24 hours (by end of day March 13):**
- Send Roxene a brief, direct email:
  - Thank Kirk for the time
  - Attach 1-2 example medical chronology outputs (if available) or a one-page capability overview focused on: chronology automation, MDL document intelligence, private enterprise Claude
  - Include the paralegal cost comparison
  - Explicitly remind about the referral list: *"Kirk mentioned he'd send some names of firms doing similar work — whenever is convenient, I'd love those introductions"*
  - Propose a 30-minute follow-up with Roxene + whoever manages their Clio instance to walk through the integration

**Within 1 week:**
- If no response from Roxene: one follow-up email (not a call)
- Build a sample med mal chronology on synthetic records to use as a demo artifact — this is the deliverable Kirk specifically requested

**Within 2 weeks:**
- Demo meeting with Roxene: show the chronology output, show the MDL document query use case, show the morning briefing concept
- Propose a 60-day pilot on one active case: *"Pick a case — either an active med mal matter or a mass tort with significant document volume. We run CaseDelta on it for 60 days alongside what you're already using. You see the output. If it doesn't beat what your nurse practitioner produces and what your MDL system delivers, you owe me nothing."*

---

## 14. Open Questions

1. **What is the active MDL case with the custom AI system?** If it's JUUL (which Goza & Honnold is involved in), Pattern Data is already on that case. Understanding the overlap helps position CaseDelta for the *next* case.
2. **Who is "Hather"?** Roxene mentioned "Is it Hather? There's some Hather thing floating around out there." This appears to be a legal tech company she'd seen somewhere. Worth identifying — could be a competitor or a brand confusion opportunity.
3. **Who built their custom MDL system?** If it's a local developer, that's a competitive dynamic to understand. If it's a product company, that's a direct competitor.
4. **What is Roxene's last name?** She was the most engaged technical stakeholder and will be the primary follow-up contact. Confirm via Roxene's outbound email.
5. **Who is speaker_3?** The person who asked about the Clio integration — *"So are you saying when we dump our documents in Clio, your system is just automatically looking at that?"* — was engaged and understood the product. Identifying and cultivating them is valuable.
6. **How many active MDL cases does the firm have?** Kirk referenced "one of our litigations" for the custom AI system. They may have multiple active MDLs. Each is a separate deployment opportunity.

---

## 15. Fit Score vs. ICP

| ICP Criteria | Goza & Honnold | Score |
|---|---|---|
| Partner/founding attorney (not paralegal) | Kirk is founding partner, already engaged | ✅ |
| 5-50 attorneys | 11 attorneys | ✅ |
| High document volume | Med mal + mass tort = 5M+ pages in one case | ✅✅ (exceeds) |
| Security conscious | Explicitly stated, twice | ✅ |
| Clio user | Confirmed | ✅ |
| AI-curious | Already building custom AI systems | ✅✅ (advanced) |
| Capacity ceiling / bandwidth pressure | 140K unread emails, hires nurse practitioners, outsources to Pattern Data | ✅ |
| Budget: "is it worth $500-1K/month" not "can we afford it" | Already spending far more on Pattern Data and custom dev | ✅✅ (well above threshold) |
| **Overall ICP Fit** | | **Exceptional — top 5% of prospects** |

The only complexity: they are more sophisticated than the median ICP, which means the pitch needs to be at a higher technical level. Kirk will compare CaseDelta to the custom system they already built. The bar is set by Relativity + Claude enterprise + a software engineer. CaseDelta needs to be visibly better than that bar, not just "better than nothing."

---

## 16. Market Context

**Pattern Data — the outsourced competitor:**
Pattern Data is the dominant AI platform in mass tort document review. Active on 30+ litigations including JUUL, Roundup, Camp Lejeune, AFFF/PFAS, 3M earplugs, CPAP. They process 1.2M+ cases. Their model: you outsource your document analysis to them. Enterprise pricing, demo-only. The data leaves the firm.

Kirk's explicit concerns — cost and third-party data access — are the exact gaps CaseDelta fills. The CaseDelta counter-position: Pattern Data is the Pattern Data of document review. CaseDelta is the in-house version that builds institutional memory and never touches a third party.

**Westlaw CoCounsel — the incumbent:**
$500/month on top of Westlaw subscription. Known limitations: 50-result search cap regardless of actual document set, unreliable citation validation, poor document synthesis outside of case law. Kirk's complaint that it "does a crappy job of chronologies" is widely validated — it was built as a legal research assistant, not a document intelligence platform. CaseDelta doesn't overlap with legal research (Westlaw's core). It overlaps with everything CoCounsel fails at: document synthesis, chronology, cross-case analysis.

**Medical chronology services — the outsourced analog:**
Manual process: 15-20+ hours by a paralegal, or engagement of a legal nurse consultant at $35/hour. Cost per case: $500-$2,500+. The value-add of the nurse practitioner is clinical judgment on standard of care — CaseDelta doesn't replace that, but dramatically reduces the hours required by automating the chronology portion.

---

*Next review: After follow-up meeting with Roxene. Update pipeline status and next follow-up date in Attio.*
