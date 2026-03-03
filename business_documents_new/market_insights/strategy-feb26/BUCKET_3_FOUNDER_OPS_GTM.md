# Bucket 3: Founder Operations & Go-to-Market
**Date:** February 26, 2026
**Context:** Answers informed by 31 video analyses, CaseDelta codebase, strategy docs, CAMREN_SHORT.md founder profile

---

## Q23: What should the first 30 days of sales motion look like?

**Answer:** You have 25+ contacts in the CRM. Start there. Cold outreach to strangers when you have warm contacts who already know your name is a strategic error.

**Days 1-7: Finish the product (engineering sprint)**
- Complete Stripe billing (simple checkout, not metered)
- Finish Clio integration (sandbox testing)
- Build audit trail export button
- Polish onboarding flow (new firm → first case → first upload → first question in under 10 minutes)
- Record a 3-minute Loom video showing the demo flow from Q10

**Days 8-14: Warm outreach (CRM blitz)**
- Query CRM for all contacts in Status: Met, Follow-up, Demo/Pilot, or Meeting Scheduled
- For each: draft a personalized email referencing your last conversation, share the 3-minute Loom, and offer a free 30-day pilot
- Goal: 10 emails sent, 3-5 responses, 2-3 pilot signups
- Use Claw's Email Draft Skill (build it in week 1) to generate drafts; review and send manually from Gmail

**Days 15-21: Demo week**
- Run the 15-minute demo (Q10) with every firm that responds
- After each demo, create the firm in CaseDelta, upload their sample documents live, and leave them with a working account
- Follow up within 24 hours with "here's what the AI found in your documents" summary

**Days 22-30: Close and expand**
- Convert pilots to paid ($20/user/month + $0.99/outcome)
- Ask each paying customer for 2 referrals to other attorneys they know
- Submit a demo to Launch OpenClaw event (March 16-17, openclaw@launch.co) if timing works
- Begin content creation (one LinkedIn post per week about what you're learning building legal AI)

**What NOT to do in the first 30 days:** Bar association events (too slow, 3-6 month lead time), cold LinkedIn outreach (low conversion, high effort), building new features (resist the urge), applying to accelerators (premature without revenue).

---

## Q24: Should I be doing FDE-style white-glove onboarding?

**Answer:** Yes, for the first 10 firms. This is non-negotiable.

Every successful vertical AI company in the research does this: Harvey has Forward Deployed Engineers. TaxGPT has forward-deployed engineers. Sierra has them. Brett Taylor said explicitly: "We show up and make sure you don't fail."

For a solo founder, FDE means:
- You personally get on a Zoom with the managing partner and their lead paralegal
- You create their firm account, connect their Clio (if applicable), and upload their first batch of documents together
- You walk them through asking their first 3 questions and show them the answers + citations
- You follow up at day 3, day 7, and day 14 to see what's working and what isn't

**This does NOT scale past 20 firms.** That's fine. You don't need to scale past 20 firms right now. You need 5 paying customers. White-glove 5 firms, learn what breaks, fix it, then build the self-serve onboarding based on what you learned.

**The insight from your profile:** You are naturally good at this. You listen genuinely, you don't lead with credentials, you ask good questions. The Panera interview story — where Blake hired you despite every disqualifying answer because you were honest — is the same energy that closes a skeptical managing partner. Be honest about what the product can and can't do. Lawyers respect candor more than polish.

---

## Q25: What does the ideal first customer look like?

**Answer:** Very specific:

- **Firm size:** 5-15 lawyers. Large enough to have real document volume. Small enough that the managing partner makes tech decisions personally (no procurement committee).
- **Practice area:** Family law (first choice) or estate planning (second). These have the most repetitive document collection workflows — the exact use case your pipeline handles best. Immigration is third (high document volume but more regulatory complexity). PI is fourth (requires medical record analysis you haven't benchmarked).
- **Tech-savviness:** Already using Clio or MyCase. Has attempted to use ChatGPT/Claude for work tasks. Not a Luddite, but not a power user — they want AI but don't know how to do it safely.
- **Geography:** Doesn't matter for the product (it's cloud-based), but in-person demos close at 3x the rate of Zoom demos. If you're in KC, target Kansas City and Kansas firms first. If you're relocating to California, target LA/SF firms.
- **Decision-maker access:** You need to demo to the managing partner or a senior partner who controls the budget. If your only contact is a paralegal or associate, the deal will stall in internal approval.

**From your CRM:** Look for contacts tagged as Family Law or Estate Planning, firm size 5-15, status Met or Follow-up. That's your shortlist. If you don't have enough, use Apollo to find 20 more matching this profile in your geographic area.

---

## Q26: How do I leverage the 25+ contacts in the CRM?

**Answer:** Segment them right now.

**Tier 1 — Ready to demo (highest priority):**
Contacts you've met, had good conversations with, and who expressed interest in AI tools. Query CRM for Status = Met or Follow-up + Practice Area = Family Law or Estate Planning. These get the personalized email + Loom video in Days 8-14.

**Tier 2 — Need re-engagement:**
Contacts where Status = Outreach Sent or Meeting Scheduled but Last Contact > 30 days. These need a "checking in, things have progressed significantly" email with the demo video. Reference your prior conversation specifically.

**Tier 3 — Cold warm (have the contact but no relationship):**
Contacts from events or introductions where you exchanged info but never had a substantive conversation. These get a more formal outreach: "We met at [event]. I've been building [one-sentence pitch]. Would love 15 minutes to show you what it does."

**Tier 4 — Legacy (cahall@blueprintsw.com era):**
Historical contacts from the Blueprint Software days. Search cahall@ email for any attorneys or legal-adjacent contacts. These are warm enough for a "I've pivoted to legal AI and thought of you" message.

**What Claw should do:** Run the CRM query, segment contacts into these tiers, and draft personalized emails for Tier 1 and Tier 2. You review, approve, and send manually. This is a 2-hour exercise that creates your entire initial sales pipeline.

---

## Q27: What content should I be creating?

**Answer:** LinkedIn is your only channel. Not YouTube, not a blog, not bar association talks. Here's why:

- Your ICP (managing partners at 5-50 lawyer firms) is on LinkedIn. They are not watching YouTube tech channels.
- LinkedIn posts take 20 minutes. YouTube videos take 4-8 hours. Blog posts take 2-3 hours. You are a solo founder with zero revenue. Time efficiency matters.
- Build-in-public content on LinkedIn generates both prospect interest AND investor interest simultaneously.

**Content cadence:** 2 posts per week. That's 40 minutes. Not more.

**Content themes (rotate):**
1. **"What I'm learning building AI for lawyers"** — Share real insights from your customer conversations, product decisions, and market observations. Not thought leadership — ground-level founder observations.
2. **"AI myth-busting for attorneys"** — "No, ChatGPT is not going to steal your clients' data if you do X. But here's what you should actually worry about." Position yourself as the honest, technical voice in a market full of hype.
3. **Mini case studies** — "A family law firm uploaded 40 documents. In 90 seconds, our AI classified all of them and identified 3 that were wrong." (Anonymized, obviously.) These are proof points that compound.
4. **Market signal sharing** — Share key data points from your research. "79% of lawyers now use AI, but 78% cite security as the top barrier. That gap is exactly what we're building for." Tag it with relevant hashtags.

**What NOT to create:** Thought leadership about "the future of legal AI." You're a pre-revenue startup. Nobody cares about your predictions. They care about what you're building and whether it works.

---

## Q28: Should I apply to YC, Launch, or other accelerators?

**Answer:** Yes — but only after you have 2-3 paying customers. Here's the sequencing logic:

**YC (S26 batch, applications likely open April-May for fall):**
- YC acceptance rate is ~1.5%. You need to stand out. "Pre-revenue legal AI platform" is not compelling. "Legal AI platform with 5 paying law firms, 85% gross margins, and growing 30% month-over-month" is very compelling.
- Harvey started as a YC company. They'll be interested in the CaseDelta thesis (Harvey for SMB) if you can show traction.
- Target: apply for W27 batch with 6+ months of revenue data.

**Launch (Jason Calacanis, immediate):**
- The Launch OpenClaw event is March 16-17, SF. $25K prize. This is 3 weeks away.
- You don't need paying customers to submit a demo. You need a working product — which you have.
- Submit to openclaw@launch.co this week with a 3-minute video of the document analysis workflow. Even if you don't win, the exposure to Jason's network and the VC audience is worth the submission effort.
- Jason has explicitly said he's investing in "anything that uses OpenClaw/Claude Code productively." CaseDelta built on Claude/Bedrock with agentic workflows is exactly this category.

**Priority:** Submit to Launch this week (free, high-upside). Defer YC application until you have revenue. Consider Techstars (they have a legal tech track) as a middle option.

---

## Q29: What should my daily/weekly operating rhythm look like?

**Answer:** You need a rigid structure because you have no boss, no board, no co-founder, and no external accountability.

**Daily rhythm:**
- **7:00-7:30 AM:** Review Claw's morning briefing (once built). Triage email. Update CRM if any contacts responded overnight.
- **7:30-12:00 PM:** Deep work block. Alternate between engineering days and sales days. Monday/Wednesday/Friday = engineering. Tuesday/Thursday = sales (emails, demos, follow-ups, content).
- **12:00-1:00 PM:** Break. Gym, walk, eat. Do not work through lunch. You're running a marathon.
- **1:00-5:00 PM:** Second deep work block. Same focus as morning (engineering or sales depending on the day).
- **5:00-5:30 PM:** End-of-day review. Update Notion tasks. Note any decisions made. Queue anything for tomorrow.
- **Evening:** No work after 6 PM unless it's truly urgent. Burnout is the #1 killer of solo founders. Your faith practice, your community, your physical health — these are not optional. They are the foundation everything else is built on.

**Weekly rhythm:**
- **Monday:** Engineering (start the week with building momentum)
- **Tuesday:** Sales (outreach, follow-ups, content creation)
- **Wednesday:** Engineering
- **Thursday:** Sales (demos, meetings, CRM updates)
- **Friday:** Engineering (50%) + Weekly review/planning (50%)
- **Sunday evening:** Review Claw's weekly reflection. Plan the coming week.

**The 60/40 split:** 60% engineering, 40% sales. This feels wrong to an engineer (you want to code more). It feels wrong to a salesperson (you want to sell more). It's correct for a pre-revenue solo founder who needs to both build and sell simultaneously. As you get paying customers, the split shifts toward 40/60 (more sales, less engineering).

---

## Q30: Am I spread too thin across 4 companies?

**Answer:** Yes. Brutally, yes.

You are running CaseDelta (pre-revenue, needs full attention to reach product-market fit), AgentFrame (a PaaS that currently has one customer — CaseDelta itself), Slick Tricks (generating small but real returns), and a stealth tokenization company (POC stage).

The market research is screaming at you: **the window for legal AI is 18-24 months before incumbents catch up.** Brett Taylor says platform shifts create temporary windows for new entrants. Elad Gil says legal is consolidating into a handful of winners. Every week you spend on tokenization POC or AgentFrame positioning is a week Harvey, Clio, and Paxton are building in your lane.

**Recommended allocation:**
- **CaseDelta: 85% of time and energy.** This is the company with a working product, a validated market, and a narrow window. It deserves your full attention.
- **Slick Tricks: 10%.** It's automated. Let the bots run. Check weekly. Scale capital as planned. Don't build new strategies right now.
- **AgentFrame: 5%.** It improves as CaseDelta improves (the flywheel). Don't actively develop it as a separate product until CaseDelta has 20+ paying customers and you can credibly say "we built the infrastructure that powers CaseDelta, and now we're opening it up."
- **Tokenization: 0% until CaseDelta has revenue.** This is a co-founded project. Your co-founder can maintain momentum. You cannot afford the context-switching cost.

**The pattern from your profile:** You are a "persistent builder with iteration without ego attachment" who "doesn't get precious about pivots." This is a strength. Apply it here: the pivot is not killing the other companies — it's sequencing them. CaseDelta first. Everything else compounds from CaseDelta's success.

---

## Q31: What's the right hiring sequence?

**Answer:** Don't hire yet. Seriously.

Cash Ali at TaxGPT used OpenClaw to review 1,000 job applications and eliminated the need for a recruiter. Jason Calacanis paused all hiring to test if agents could absorb the work. Greg Isenberg saves $5M/year through AI automation at a 55-person company.

You are a solo founder with a working product, Claude Code, and the ability to build and sell faster than most 3-person teams. Your first "hire" should be:

**Hire #1 (after 5 paying customers): A part-time sales/customer success person.**
Not an engineer — you're the engineer. You need someone who can run demos, handle onboarding calls, and manage customer relationships while you build. This could be a fractional hire, a contractor, or even a law school student who understands legal workflows and can credibly talk to attorneys.

**Hire #2 (after 15-20 paying customers): A full-stack engineer.**
Someone who can own the frontend, polish the UX, and build integrations while you focus on the agent architecture and sales strategy.

**Hire #3 (after $50K MRR): A head of sales/BD.**
Someone with legal tech sales experience who can work bar associations, run events, and build the referral engine.

**Until hire #1:** You are the entire company. That's fine. Most successful vertical AI companies (TaxGPT, Paxton in early days) were solo or duo founders doing everything for the first 6-12 months. The advantage of solo: every decision is instant, every pivot is free, every customer interaction is with the person who built the product.

---

## Q32: Should I relocate to SF sooner?

**Answer:** Not immediately, but within 60 days — and aligned with a specific catalyst.

**Why SF matters:**
- Launch OpenClaw event March 16-17 (3 weeks). Worth flying out for even if you don't move yet.
- VC density is unmatched. Casual coffee meetings in SF lead to introductions that take 6 months of cold outreach elsewhere.
- The early adopter density for AI tools is highest in SF/Bay Area. Your first 5 customers don't need to be local, but your first 50 investors and advisors should be.
- Elad Gil, Sarah Guo (No Priors), and the entire YC network are physically here.

**Why not this week:**
- You have warm contacts in your CRM who may be KC/Midwest firms. Close them first — they're closer to conversion than strangers in SF.
- Moving while launching is chaotic. Get 2-3 paying customers while still in KC (where your burn rate is low), then move with revenue in hand.

**The play:** Fly to SF for Launch event March 16-17. Network aggressively. Submit the demo. If you get traction, use that momentum to justify the move. If you don't, you still have the Midwest pipeline. Target relocation: April-May timeframe, with at least 2 paying customers before you go.

---

## Q33: What fundraising timeline makes sense?

**Answer:** You are not ready to raise today. You'll be ready in 3-4 months.

**Why not now:**
- Zero revenue. Zero customers. Pre-revenue legal AI with a solo founder and no co-founder is a hard sell even in a hot market. The product is good, but investors want traction signals.
- Your burn rate is low (living in KC, no employees, ~$404/month infrastructure). You don't need capital to survive the next 3 months.

**When to raise:**
- After you have 5-10 paying customers, even at small contract sizes
- After you can show a month-over-month growth rate (even if it's small numbers growing)
- After you have at least one customer testimonial or case study

**What to raise:**
- Pre-seed: $250K-$500K on a SAFE at $3-5M cap
- Use of funds: 12-18 months runway, first 2 hires, marketing spend
- Target investors: angels with legal tech or vertical SaaS experience, Launch Fund (Jason Calacanis), Menllo Ventures (Dee Das specifically mentioned legal), a16z scout network

**Fundraising data points to lead with (from the research):**
- Legal = $1T market (Harvey CEO, No Priors)
- Harvey approaching 1,000 customers, focused on BigLaw — SMB is wide open
- 79% of lawyers using AI; 78% cite security as barrier (Clio data)
- AI-enabled professional service firms: $200K/head vs. $140-150K (TaxGPT data)
- Your unit economics: 85% gross margin at $0.99/outcome
- Your architecture: 1,163 tests, 30/31 benchmark accuracy, production-grade infrastructure

---

## Q34: How do I build a personal brand as the "legal AI for SMB" founder?

**Answer:** You don't need a "personal brand." You need to be visible and credible to exactly two audiences: law firm managing partners and seed-stage investors.

**For managing partners:**
- LinkedIn profile should say: "Building CaseDelta — secure AI for law firms. Former SWE at Capital One. Vanderbilt CS + Math."
- Post 2x/week on LinkedIn (see Q27)
- Attend 1 local bar association event per quarter once you have a demo. Don't speak — just attend, meet 5 people, and follow up with the demo video.
- Get published in one legal trade publication (Law Technology Today, LegalTech News) with a practical "how to evaluate AI security for your firm" article. This is a 2-hour writing exercise that generates credibility for months.

**For investors:**
- Active on X/Twitter in the AI builder community. Share technical insights, not hot takes.
- The Launch event submission is your first major investor touchpoint.
- Ask your best customer to introduce you to their attorney friends and any VCs they know. Warm intros > cold outreach.

**What NOT to do:** Build a YouTube channel, start a podcast, create a newsletter, become a "thought leader." You are a builder, not a media company. Your product is your brand. Ship it, sell it, and let customers be your marketing.

---

## Q35: Build in public or stay stealth?

**Answer:** Build in public, selectively.

**What to share:**
- Progress milestones: "First paying customer this week" (when it happens)
- Technical decisions: "We benchmarked 5 models on legal document analysis — here's what we found"
- Market observations: "Talked to 10 law firms this month — here's the #1 thing they care about"
- Product screenshots (with anonymized data)

**What NOT to share:**
- Your pricing model details (competitors will see)
- Your integration strategy (the credential-based session management approach is a competitive advantage — don't explain it publicly)
- Specific customer names without permission
- Revenue numbers until they're impressive enough to cite ($10K MRR is a milestone worth sharing; $500 MRR is not)

**The principle:** Share enough to build credibility and attract inbound interest. Don't share enough to give competitors a roadmap.

---

## Q36: How do I leverage the CaseDelta + AgentFrame flywheel in the investor narrative?

**Answer:** Don't mention AgentFrame until asked. Seriously.

**The risk:** You tell an investor "I'm building a legal AI SaaS AND an agent infrastructure PaaS AND they improve each other." The investor hears: "This founder is unfocused and building two companies." This is especially dangerous for a solo founder. The four-ventures spread is already a concern (see Q30). Adding AgentFrame to the pitch amplifies it.

**The play:** Pitch CaseDelta as a standalone vertical AI company. When investors ask "how did you build the agent infrastructure so fast?" or "what's your technical moat?", THEN you mention: "We built a proprietary agent runtime that handles multi-tenant isolation, per-tenant RAG, and model routing. We call it AgentFrame internally. It's what powers CaseDelta's architecture and could eventually be opened as a PaaS — but right now, 100% of our focus is on the legal vertical."

This is the honest framing. It signals:
1. You have deep technical IP (not just a wrapper)
2. You understand the bigger opportunity (infrastructure)
3. You're disciplined enough to focus on one market first
4. There's a natural expansion story for future rounds

**The investor hears:** "This founder built real infrastructure, has a clear wedge, and has the discipline to sequence. The optionality of AgentFrame is a bonus, not a distraction."

---

## The Meta-Answer: How to Operate at the 0.01% Level

Everything above is tactical. Here's the strategic frame:

**You have 3 compounding advantages that most founders don't:**

1. **A working product in a validated market with no incumbent serving your ICP.** Harvey won't go downmarket. Clio is adding AI as a feature. You are AI-native, security-first, and priced for SMB. The product works. The benchmarks are good. The tests pass. Most founders at your stage have a pitch deck and a prototype. You have 1,163 tests and 30/31 accuracy.

2. **The entire market research base we just built.** 31 videos analyzed. Brett Taylor's pricing framework. Harvey's competitive positioning. TaxGPT's playbook analog. Clio's adoption data. The skills security landscape. Most founders are guessing at market dynamics. You have a documented, sourced, synthesized market map. Use it in every sales conversation, every investor pitch, every product decision.

3. **Your personal wiring.** Pattern recognition. Data-driven decisions. Risk tolerance grounded in faith, not recklessness. The ability to iterate without ego attachment. Genuine listening in sales contexts. These are not common founder traits — they're the exact traits that win in vertical AI sales to conservative buyers like attorneys.

**The 0.01% operating principle is simple: do fewer things, better, faster.**

- Fewer features → but the ones you ship are production-grade and demo-ready
- Fewer channels → but LinkedIn 2x/week creates compounding visibility
- Fewer prospects → but white-glove onboarding for 5 firms creates evangelical customers
- Fewer ventures → but CaseDelta at 85% focus hits escape velocity before the window closes

The window is 18-24 months. Harvey is consolidating the top. The bottom is still open. Every week counts. Ship, sell, learn, repeat.
