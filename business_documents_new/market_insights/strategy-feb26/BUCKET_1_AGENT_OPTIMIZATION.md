# Bucket 1: Optimizing Your Local Agent Setup
**Date:** February 26, 2026
**Context:** Answers informed by 31 video analyses, CaseDelta codebase, and founder profile

---

## Q1: What cron jobs / proactive routines should Claw be running for you as a founder?

**Answer:** You need exactly 6 scheduled routines. Not 20. Complexity kills solo founders. Here they are, ordered by ROI:

**Daily (morning, 7:00 AM CT):**
1. **Founder Morning Briefing** — Pull last 24 hours of: Gmail inbox summary (camren@casedelta.com + cahall@blueprintsw.com), calendar for today, CRM contacts with overdue follow-ups, any Notion task changes, and a 3-sentence "what matters today" synthesis. Deliver to Slack DM. This replaces 30-45 minutes of inbox triage (Matish from the TWIST episode measured exactly this savings — 150 hours/year, 3 extra weeks).

2. **CRM Stale Contact Scanner** — Query the CaseDelta Law CRM for contacts where `Last Contact` > 14 days ago and `Status` is in active pipeline (Outreach Sent, Meeting Scheduled, Met, Follow-up). Surface the top 3 highest-priority re-engagements with suggested next action. You have 25+ contacts — you cannot afford any to go cold while you're heads-down coding.

**Daily (evening, 10:00 PM CT):**
3. **Competitor / Market Signal Monitor** — Search for "CaseDelta" mentions, "legal AI" news, Harvey AI announcements, Clio product updates, and any new YC legal tech launches. Summarize to 5 bullet points max. Deliver to Slack. This is the "business advisory council lite" pattern from the 8kNv3rjQaVA video, but scoped to what actually matters for a pre-revenue founder.

**Weekly (Sunday, 8:00 PM CT):**
4. **Weekly Reflection + Planning** — Pull all completed tasks from Notion Tasks DB, all CRM interactions from the week, any email threads that went unanswered, and calendar for the coming week. Generate a 1-page "last week / this week / blockers" summary. This is your accountability mechanism as a solo founder with no board and no co-founder.

**Weekly (Wednesday, 2:00 AM CT):**
5. **Self-Optimization Review** — Claw reviews its own CLAUDE.md, memory files, skills, and cron job outputs from the past week. Identifies: stale context that should be pruned, prompts that produced poor results, any integration that errored. Recommends improvements. This is directly from Jason Calacanis's Ultron build — his agent found a timezone bug and a cron scheduler skip. Yours will find similar issues.

**Monthly (1st of month, 9:00 AM CT):**
6. **CRM Pipeline Health Report** — Full pipeline snapshot: contacts by stage, conversion rates between stages, average time in each stage, contacts that dropped off. Compare to prior month. This is the data you'd present to an investor or advisor — having it auto-generated keeps you honest about sales velocity.

**What NOT to build:** Content generation pipelines, social media schedulers, automated LinkedIn outreach, food journals, security councils. You are a pre-revenue solo founder. Every cron job that doesn't directly drive revenue or protect existing relationships is a distraction dressed as productivity.

---

## Q2: Should you implement the "business advisory council" pattern?

**Answer:** No. Not now.

The 8kNv3rjQaVA creator who runs 8 parallel specialist agents nightly has a running business with revenue. He's optimizing. You're not optimizing — you're building from zero to one. The advisory council pattern is a $200/month token cost optimization play that returns marginal insights when you have marginal data.

What you actually need is not 8 AI agents analyzing 14 data sources. You need 5 paying customers. The advisory council will tell you things you already know from the 31 videos you just analyzed: "the market is moving fast, security is the pitch, outcome-based pricing is validated." You don't need an AI to repeat this at 3 AM every night.

**When to revisit:** After you have 10+ paying customers and real usage data flowing through the platform. Then the advisory council has actual data to analyze — churn signals, usage patterns, feature requests, billing trends. That's when it becomes valuable.

---

## Q3: What's the right CLAUDE.md / soul.md / memory.md structure? Are we bloated or lean?

**Answer:** Your CLAUDE.md is comprehensive but has optimization opportunities. The 4MgCMI0NHGA video showed a 69% token reduction from auditing system files — moving stale context into skills and long-term memory.

**Current state:** Your CLAUDE.md is ~39KB (the VPS one). That's loaded into every single message. The video research pipeline details, the LinkedIn prospecting stack, the YouTube research pipeline setup instructions — these are loaded every time you ask Claw to draft an email or check your calendar. That's wasteful.

**Recommended structure:**
- **CLAUDE.md** (always loaded): Identity, credentials/paths, core tool commands (gog, Notion, YouTube). Keep under 15KB. Strip out detailed pipeline instructions, research findings, and workflow documentation.
- **MEMORY.md** (always loaded): Current project state, active decisions, key dates. Keep under 5KB. Prune aggressively — the current one has installation status checkboxes that are no longer relevant.
- **Skills/** (loaded on demand): Move the YouTube research pipeline, LinkedIn prospecting stack, CRM bulk update patterns, and email workflow patterns into separate skill files. They only need to load when invoked.
- **Long-term context/** (referenced, not loaded): The 31-video market analysis, strategy docs, competitive intelligence. These are reference material, not system prompt material.

**Action:** Run an audit prompt: "Review your CLAUDE.md, MEMORY.md, and all system files. List every section, count tokens per section, and recommend what should be moved to skills vs. kept in always-loaded context. Target: reduce always-loaded context by 50%."

---

## Q4: Should you run parallel Claude Code sessions for different workstreams?

**Answer:** Yes, but only 2-3 — not 5-7 like the power users in the videos.

Boris Churnney runs 5 terminals because he's a full-time developer building one product. Alex Finn runs 7 because content creation is his business and each OpenClaw does a different content job. You are a solo founder who needs to build, sell, and operate simultaneously. Your constraint is not compute — it's attention.

**Recommended setup:**
1. **Primary session (this one):** CaseDelta development, strategic thinking, research, codebase work. This is where the deep context lives.
2. **Sales/CRM session:** Dedicated to email drafting, CRM updates, prospect research, meeting prep. Keeps sales context separate from engineering context so neither pollutes the other.
3. **On-demand session (as needed):** Slick Tricks monitoring, one-off research tasks, anything that would clutter the primary sessions.

**Key insight from the videos:** The value of parallel sessions isn't doing more — it's keeping context clean. When you ask a coding agent about email strategy, the context window is full of Lambda code, and the answer is worse. Separate sessions = better answers in each domain.

---

## Q5: What skills should Claw have that it doesn't today?

**Answer:** Based on your current integration set and what the market research says matters for a pre-revenue founder:

**Build immediately:**
1. **Meeting Prep Skill** — Before any CRM contact meeting: pull their Notion CRM entry, search Gmail history on both accounts, check LinkedIn (via Apollo data if available), and generate a 1-page brief with: last interaction, their pain points, what we discussed, what to pitch this time, and any news about their firm. This is the difference between a generic sales call and a prepared one.

2. **Email Draft Skill** — Given a CRM contact and a purpose (follow-up, intro, meeting request, demo offer), generate a draft that matches your voice, references prior interactions, and follows the DRAFTS-ONLY policy. Should auto-create the draft via gog and update CRM Last Contact date.

3. **Demo Script Skill** — Given a practice area (family law, estate planning, immigration, PI) and firm size, generate a tailored 15-minute demo script that highlights the features most relevant to that ICP. Based on the video research: lead with security ("PII never leaves"), show document analysis, show the audit trail, close with pricing ($0.99/outcome).

**Build next month:**
4. **Competitive Intel Skill** — Given a competitor name (Clio, Harvey, Paxton), pull latest news, product updates, pricing changes, and generate a 1-page comparison showing where CaseDelta wins.

5. **Investor Narrative Skill** — Given a prompt like "draft seed pitch email" or "prepare for advisor call," synthesize the strongest data points from the market research into a concise narrative. Should reference the fundraising data points table from the Cluster 6 analysis.

**Do NOT build:** Social media posting skills, content calendar generators, newsletter writers, food trackers. You are pre-revenue. Skills that don't drive sales or product development are distractions.

---

## Q6: Should you build a self-optimization routine?

**Answer:** Yes, but keep it minimal. One weekly review, not a nightly deep scan.

Jason's Ultron found real bugs (timezone, cron skip) through self-optimization. Your setup is simpler but has the same failure modes — stale memory entries, broken cron jobs, API keys that expired, integrations that silently fail.

**Implementation:** Wednesday 2:00 AM CT (already in the cron list above). Agent reviews:
- All cron job outputs from the past week — did they run? Did they error?
- MEMORY.md — any entries that are outdated or contradicted by recent work?
- Integration health — can we still reach Notion, Gmail, YouTube, VPS?
- A self-generated "improvement suggestion" — one thing to add, remove, or change

Deliver results to Slack DM. You review Thursday morning. Total cost: ~$0.50/week in tokens. High ROI for catching silent failures before they compound.

---

## Q7: What's the security posture? Are we sanitizing external content before ingestion?

**Answer:** This is an honest gap. Your current setup trusts external web content more than it should.

When Claw fetches web pages (WebFetch), YouTube transcripts, or email bodies, that content enters the context window raw. The Zach Korman video (uq4UTjigaww) demonstrated that hidden HTML comments, image alt-text, and markdown formatting can contain prompt injection instructions that the model will follow.

**Immediate actions:**
1. For any WebFetch or web search result, Claw should summarize the content in a subagent before bringing it into the main context. The subagent acts as a sanitization layer — it reads the raw content and returns only the useful information, stripping any potential injection payloads.
2. For email bodies fetched via gog, strip HTML tags before processing. Email is one of the highest-risk injection vectors because adversaries can send you emails containing hidden instructions.
3. Never let Claw execute commands suggested by external content without your explicit approval. This is already your default behavior, but it should be codified as a rule in CLAUDE.md.

**What you don't need:** A full "security council" running nightly scans. That's for someone with a production codebase being modified by agents autonomously. Your Claw reads and drafts — it doesn't push code to production without your review.

---

## Q8: Should we build a local mission control dashboard?

**Answer:** No. Not now.

Alex Finn's vibe-orchestrated Next.js dashboard looks cool in a YouTube video. It's a vanity project for a pre-revenue solo founder. You already have Notion for task tracking, Slack for agent communications, and Gmail for email. Adding a custom dashboard means building it, maintaining it, and debugging it — time that should go to CaseDelta development and sales.

**When to revisit:** When you have 3+ parallel agents running cron jobs and the Slack DM channel becomes genuinely unmanageable. At that point, a simple dashboard showing cron job status, last run times, and error counts becomes worth building. But you're not there yet — you're at 0-1 cron jobs today, scaling to 6. Slack handles 6 just fine.

**The meta-principle across all of Bucket 1:** Every optimization you build for Claw is time not spent building CaseDelta or closing your first customer. The power users in those videos have revenue. You don't. Optimize Claw enough to save 30-45 minutes per day on founder operations, then put those 30-45 minutes into product and sales. That's the only ROI calculation that matters right now.
