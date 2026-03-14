# CaseDelta — Narrative, Positioning & Product Philosophy

**Document type:** North star — governs marketing, product design, UX, and sales language
**Last updated:** March 7, 2026
**Author:** Claw (synthesized from Reddit behavioral research, customer discovery, and first-principles analysis)

---

## The Core Insight: Tool vs. Colleague

Every legal AI on the market today is a tool. You go to it. You open it. You paste something in. You wait for a response. You close it.

Paxton. Harvey. ChatGPT with a legal prompt. All tools. All reactive. All requiring the lawyer to initiate.

CaseDelta is not a tool. It's a colleague.

The distinction is behavioral, not technical. A tool waits to be used. A colleague shows up. A colleague notices things. A colleague brings you findings before you ask. A colleague does the work while you're in court, and by the time you're back, there's a briefing waiting. A colleague gets smarter the longer they work with you. A colleague you trust.

This insight — tool vs. colleague — is the single lens through which every product decision, every UX choice, every line of marketing copy, and every sales conversation should be evaluated.

**The question to ask before any decision:** Does this make CaseDelta feel more like a tool or more like a colleague?

---

## Why This Matters More for Lawyers Than Anyone Else

The open-source AI community discovered this behavioral truth first. Users of autonomous AI agents describe their agents in colleague terms: "It works while I sleep." "I built a relationship with it." "It's mine — it knows how I work."

Developers value this because they *want* to step away from the computer. For them, an agent running autonomously is an upgrade.

For lawyers, **being away from the computer is the default state.** Partners are in court from 9 to noon. In depositions from 1 to 5. In client meetings. On calls. At hearings. The desk is the exception, not the norm.

A legal AI that only works when a lawyer is actively querying it is functionally useless for a managing partner. They don't have time to query anything. They have 47 active files, a court appearance in an hour, and a client who just submitted the wrong documents.

What they need is someone who handled it while they were gone.

This is not a feature. This is the entire product philosophy.

---

## The Narrative: What CaseDelta Is

CaseDelta is a firm's AI associate.

Not a chatbot. Not a document scanner. Not a search engine for your files. An associate — a capable, always-present member of the firm who handles the cognitive work that's eating billable time, who notices things without being asked, who prepares what needs to be prepared, and who gets more valuable every single day.

When a paralegal joins a firm, they show up on day one ready to work. They get access to Clio, to the document folders, to the email system. They start learning how the firm operates. Over time, they understand this firm's clients, this firm's style, this opposing counsel's patterns. After six months, they're indispensable. After two years, losing them means losing institutional knowledge that took years to build.

CaseDelta is that colleague — but it shows up already knowing how to do the work, it's available 24 hours a day, and it never walks out the door taking two years of institutional knowledge with it.

The paralegal comparison is not marketing language. It is the most honest thing you can say about what CaseDelta does and what it costs. A paralegal runs $50–70K per year fully loaded. CaseDelta is $6–12K per year. Same cognitive labor. No turnover. No training ramp. Nothing walking out the door.

---

## The Assistant Identity: Delta

The platform is CaseDelta. The assistant is **Delta**.

This distinction matters. "CaseDelta" is the secure environment — the firm's dedicated platform. "Delta" is who lives inside it — the associate who handles the work.

Delta has a consistent voice: confident, direct, capable. Not formal and corporate. Not casual and chatty. Like a sharp associate who respects your time. Delta brings you findings, not essays. Delta surfaces what matters, not everything it processed. Delta drafts for your approval, not for your entertainment.

Delta never says: "Sure! I'd be happy to help with that! Let me take a look!"
Delta says: "Reviewed the Wheeler file. Income discrepancy of $23K between the W-2 and bank statements. Flagged. Want me to add this to the case notes?"

Delta never explains what it can do. It just does it and shows you the result.

Delta always ends with a clear next action. "Want me to send this?" "Should I flag this for review?" "Ready to draft the follow-up — want to see it first?" The lawyer's job is to approve or redirect, not to prompt.

---

## The Behavioral Model: How Delta Fits Into a Lawyer's Day

This is the lived experience CaseDelta should create. Every feature, every UX decision, every integration should serve this behavioral arc.

### Morning (7:00 AM)
The managing partner opens CaseDelta before the court day starts. Delta has already been working.

Delta's opening message in the dashboard:
> "Good morning. Here's what I've been tracking overnight. Client A submitted 8 of the 12 required documents for the Wheeler matter — still missing the 2023 tax return and the QDRO. I drafted a follow-up email. The Martinez deposition is in 4 days and the expert witness disclosure hasn't been filed yet — I've prepared a draft. One flag on the Robertson matter: the bank deposit total in the statements doesn't match the income reported on the W-2. Difference is $31K."

Three findings. Three prepared actions. The partner's job: review and approve. Total time: 4 minutes.

### During the Day (In Court, In Meetings)
Delta runs in the background. A client submits documents. Delta analyzes them. A deadline approaches. Delta flags it. An email from opposing counsel arrives (if email is integrated). Delta reads the attachment.

Delta doesn't interrupt unless it's urgent. It queues findings for the next time the partner opens the platform.

### End of Day (Brief Check-in)
The partner opens CaseDelta for two minutes. There's a queue of items Delta has prepared. Review, approve, dismiss. The work is done. The cases are advanced. Nothing fell through the cracks.

### The Compounding Effect
After a week, Delta knows this firm's document types. After a month, Delta knows which clients are slow to submit. After six months, Delta knows how this firm writes, how this attorney approaches cross-examination prep, which opposing counsel files late. The longer Delta is here, the more Delta knows. The more Delta knows, the less the partner has to do. This is the flywheel.

---

## The UX Philosophy: What CaseDelta Feels Like

The interface should feel like iMessage, not like ChatGPT.

This is a specific, concrete design directive. Here's what it means:

### Delta Speaks First
When a lawyer opens CaseDelta — whether it's the case dashboard, a matter thread, or the main feed — Delta has already sent something. There is no blank input box waiting. There are messages from Delta, findings from Delta, drafts from Delta. The lawyer enters a conversation already in progress, not an empty canvas waiting to be prompted.

The psychological effect: you are entering Delta's workspace, where work is already happening. Not a tool that waits to be activated.

### The Approval Queue is Primary
The central UI is not a chat input. It's a feed of things Delta has prepared for review:

- [Document Alert] "Client submitted 8/12 required documents for Wheeler matter. 4 still missing. Draft follow-up ready — review?"
- [Deadline Alert] "Expert witness disclosure due in 4 days for Martinez. No filing confirmed. Draft prepared."
- [Income Flag] "Robertson matter: $31K discrepancy between W-2 income and bank deposits. Add to case notes?"

Each card has two or three buttons: [Approve & Send] [Edit First] [Dismiss]. The lawyer's primary interaction is not typing — it's deciding. Review and approve. Like an executive reviewing their assistant's prepared correspondence before signing.

### Conversation Threads per Case
Each matter has its own thread with Delta. Scrolling up shows Delta's history on that case: what was found, what was flagged, what was drafted, what was approved. This is not a chat log — it's a case journal written by Delta, in Delta's voice. The managing partner can hand this to an associate and they have complete context.

### The Message Aesthetic
Delta's messages use bubbles on the left (incoming from Delta), the lawyer's messages on the right. Same visual grammar as iMessage. Not a back-and-forth prompting interface. A conversation.

Delta's bubbles are structured, not conversational. Short. Clear. Actionable. One finding per message, not a wall of text. Like a capable associate giving a verbal briefing.

### No Technical Exposure
The lawyer never sees tokens, model names, processing status, API calls, or anything technical. Delta is a person, not a system. The infrastructure is invisible. The only thing the lawyer sees is Delta's work product.

If something takes time, Delta says: "Reviewing all documents on the Robertson matter — will have findings shortly." Not a spinner. Not a loading bar. A message from a colleague who's working on it.

### Secure by Belonging, Not by Warning
The security UI never says "your data is encrypted." It never shows security certificates or compliance badges prominently. Instead, the interface physically looks and feels like a closed, private environment — your firm's space. Delta's identity is firm-specific (the firm name appears in the header; Delta's context is entirely your firm's data). The experience communicates: this is your firm's associate, working inside your firm's walls. Not a third-party tool you've given access to your data.

The security story is told through belonging, not through protection language.

---

## The Language Guide

### Words That Create the Colleague Frame
Use these:
- "Delta noticed..." / "Delta flagged..." / "Delta found..."
- "While you were in court..." / "Overnight..."
- "Ready for your review"
- "Delta prepared..." / "Draft ready"
- "Delta will handle..." / "Delta is tracking..."
- "Your associate" / "Your firm's AI associate"

### Words That Create the Tool Frame
Never use these:
- "AI chatbot" / "AI assistant" / "AI tool"
- "Document analysis platform"
- "Virtual paralegal" (tool framing, not colleague framing)
- "Legal tech"
- "I'd be happy to help" (chatbot voice)
- "Enter a prompt" / "Ask me anything" (input-first design)
- "Powered by AI" (makes the AI the subject; Delta is the subject)

### The Paralegal Comparison
Use this math openly in sales conversations — it closes skepticism faster than any feature list:

> "A paralegal runs $50–70K per year fully loaded — salary, benefits, turnover, training ramp, the institutional knowledge that walks out when they leave. Delta is $6–12K per year. Same cognitive labor. Available 24 hours. Doesn't call in sick. And everything it learns about your firm stays."

This is not a pitch line. It is an honest comparison that most lawyers immediately validate from personal experience.

### The Security Line (for sales conversations)
Not: "Your data is encrypted end-to-end and never leaves our secure infrastructure."
Instead: "Delta works inside your firm. It connects to your Clio, reads your documents, and everything stays in CaseDelta's environment — never sent to OpenAI, never processed by Google, never shared with anyone. Think of it as giving a new associate their own login to everything on day one, but one that never leaves the building."

### The Competitor Response
If a lawyer says they use ChatGPT or Claude for AI work:
> "That's actually the most common starting point. The problem most firms run into is that pasting client information into ChatGPT is a malpractice exposure — your data goes to OpenAI's servers, potentially used for training, and there's no audit trail. Delta is the version of that that your bar association won't question. Same capability, built for the legal context."

If a lawyer has heard of Harvey:
> "Harvey is for Am Law 100 — 25-seat minimum, $1,000 per lawyer per month, built for firms that have 200 attorneys and an IT department. Delta is for firms like yours: 5 to 50 attorneys, works inside Clio, fraction of the cost."

---

## The Security Narrative (Full Version)

The security story has two layers. Both matter. Neither should lead with technical language.

### Layer 1: Belonging
Delta is your firm's associate. Associates work inside your firm. Delta does too.

Delta connects to your Clio account and your document storage through standard OAuth — the same secure handshake your bank uses when you link accounts. Delta gets its own credentials. Your attorney's login is never shared. Two independent sessions coexist cleanly, the way two different attorneys can both be logged into Clio simultaneously.

When you disconnect CaseDelta, Delta's access is revoked instantly — directly from your Clio settings, no CaseDelta involvement required. You are always in control.

### Layer 2: Data Never Leaves
No client names, A-numbers, case notes, or documents are ever sent to OpenAI, Google, Anthropic, or any third party. Every AI model Delta uses runs inside CaseDelta's own infrastructure — not on any external AI company's servers.

When Delta analyzes a financial disclosure or reviews immigration documents, that processing happens entirely within CaseDelta's environment. The result comes back to you. Nothing else moves.

Every action Delta takes is logged with a timestamp, the document accessed, the query asked, the answer generated, and the sources cited. If your bar association asks how your firm uses AI, you show them the audit trail. It's that clean.

### The One-Sentence Version
> "Delta works inside your firm's walls and never leaves."

---

## Positioning Statements by Audience

### Managing Partner (Prospect)
> "CaseDelta is another associate in your firm — one that reviews your documents, tracks what's missing, flags what needs attention, and has a briefing ready before you ask. Works while you're in court. Costs less than a paralegal's salary in a month. Knows your firm better every day."

### Investor (Seed Pitch)
> "Harvey owns AmLaw 100 — minimum 25 seats at $1,000/lawyer/month. CaseDelta owns the 80% they ignore: 1–50 attorney boutique firms. It's the AI associate for the other 80% of the legal market — built on a proactive agent loop, with per-tenant data isolation, a Clio integration, and outcome-based pricing. Think TaxGPT for law firms. The legal AI market is $2.67B in 2026 growing to $4.42B by 2031. We're the only player purpose-built for this segment with a working product."

### Press / Content (LinkedIn, Podcast)
> "We built the coding agent for lawyers — an AI associate that connects to your Clio, learns your firm, and runs your practice in the background while you're in court."

### Bar Association / CLE Context
> "CaseDelta is a secure AI associate built specifically for small and mid-size law firms. Every action is logged with a full audit trail. No client data ever leaves the platform. ABA Rule 1.6 compliant by architecture, not by policy."

### Warm Referral / Word of Mouth (How a Happy Customer Describes It)
> "It's like having an extra person in the firm who's always working. I come out of a three-hour deposition and there's a summary waiting — here's what happened with all my cases, here's what still needs attention. It just runs."

---

## The Proactive Loop: What Makes This Real

The behavioral positioning described above requires a specific technical capability: the proactive loop. This is not a future roadmap item. It is the core product behavior that separates CaseDelta from every other legal AI tool.

### What the Proactive Loop Is
A scheduled, event-driven agent that runs continuously in the background, monitoring cases and surfacing findings without being asked. It has two modes:

**Scheduled (cron-driven):**
- Morning briefing: 7 AM daily for each firm. Runs across all active cases. Surfaces deadlines, missing documents, case flags, and drafted actions.
- Weekly summary: Friday EOD. Case velocity, completed tasks, upcoming week.
- Stale case alerts: Any case with no activity in 14 days surfaces for review.

**Event-driven (webhook/trigger):**
- Client submits documents via portal → Delta analyzes → flags missing items → prepares follow-up draft → notifies partner
- Deadline within 7 days and no filing confirmed → Delta prepares a draft → notifies
- (Future, requires email integration) Email from opposing counsel arrives with attachment → Delta reads it → surfaces summary and flags → notifies

### What This Requires to Build
1. **Clio integration (read/write)** — The single highest priority. Without Clio access, the proactive loop has nothing to monitor. This is the "bash" of the legal environment. Estimate: 2–3 days to finish.
2. **EventBridge scheduling** — Wire the morning briefing cron to Strands agent invocations. Already exists in AWS infrastructure, needs agent output routing.
3. **Per-firm context file (Firm CLAUDE.md)** — Loaded into every agent invocation. Defines practice areas, common document types, attorney preferences. This is what makes Delta's output feel firm-specific, not generic. Estimate: 1–2 days to design and implement the schema.
4. **Notification delivery** — In-app (primary), email (secondary for morning briefing). Not Telegram, not WhatsApp — lawyers live in email and their platform. Estimate: 2 days.
5. **Approval queue UI** — The feed of pending actions. Cards with [Approve] [Edit] [Dismiss]. This replaces the blank chat input as the primary interface element. Estimate: 3–4 days for MVP.

### The Full Sequence (When All Pieces Are in Place)
```
7:00 AM → EventBridge fires morning briefing job
         → Strands agent loads firm context (Firm CLAUDE.md)
         → Agent queries Clio: all active matters, recent activity, upcoming deadlines
         → Agent queries document store: pending submissions, recent uploads
         → Agent identifies: missing documents, approaching deadlines, anomalies
         → Agent prepares: follow-up drafts, deadline alerts, case summaries
         → Results posted to approval queue in CaseDelta dashboard
         → Optional: morning briefing email sent to managing partner

Client submits documents →
         → Webhook fires to CaseDelta
         → Strands agent analyzes documents (OCR → classification → completeness check)
         → Agent compares against case template
         → Agent identifies missing items
         → Agent drafts client follow-up email
         → Card added to approval queue: "Review follow-up for [Client]"
         → Partner reviews on next login, approves in one click
```

---

## The Institutional Memory System (Firm CLAUDE.md)

Every firm that uses CaseDelta should have a persistent context file that Delta loads on every run. This is the technical foundation of "Delta knows your firm."

**What it contains:**
```
Firm: [Name]
Managing Partner: [Name], [email]
Practice areas: [list]
Common document types: [list, e.g., "W-2s, bank statements, QDROs, parenting plans"]
Billing rates: [partner/associate rates]
Client communication preferences: [e.g., "formal, always CC managing partner"]
Opposing counsel notes: [e.g., "Jones & Associates files motions late — add 3 days to estimates"]
Integration status: Clio (read/write), Google Drive (read)
Preferred draft style: [e.g., "concise, no legalese, action items bolded"]
Active integrations: [list]
```

This file is:
- **Visible and editable** by the managing partner from within CaseDelta — it's their associate's instruction set
- **Updated automatically** as Delta learns patterns (with partner review/approval)
- **The switching cost moat** — after 6 months, this file contains years of institutional knowledge. Canceling CaseDelta means starting Delta from zero. No other legal AI builds this.

The managing partner should be able to open this file, read it, edit it, and feel like they're reading their associate's notes about the firm. The psychological experience: "This is ours. Delta knows us."

---

## What CaseDelta Is Not

Stated explicitly, because every sales conversation will test these boundaries:

**Not a replacement for Clio.** Clio is the practice management system. CaseDelta sits on top of Clio, reads from it, and enhances it. Firms with 500 active cases in Clio are not migrating. They shouldn't have to. Delta gets its own login to Clio, works alongside it, and makes it more valuable.

**Not a legal research tool.** Delta doesn't search case law or statutes. That's Westlaw, Lexis, or Paxton. Delta handles the firm's own documents, cases, and client work — not external legal research. (This distinction matters: lawyers are used to paying for legal research tools. CaseDelta is not one. It's for their own practice, not the law.)

**Not a replacement for attorney judgment.** Delta drafts. The attorney approves. Delta flags. The attorney decides. Delta surfaces. The attorney acts. This is not a limitation to apologize for — it is the design. Lawyers are ethically and legally responsible for their practice. Delta handles the cognitive labor. The attorney provides the judgment. This division is explicit, visible in the UI (every Delta output requires approval), and is what makes CaseDelta bar-compliant.

**Not a consumer AI product.** CaseDelta is a secure, firm-specific platform. Client data stays inside it. Nothing is shared with OpenAI, Google, or any external AI service. The security is architectural, not a policy. This is not a checkbox on a compliance form — it is how the system is built.

---

## The Long-Term Vision (What We're Building Toward)

In three to five years, CaseDelta is not a tool law firms use. It is a member of the firm that every attorney at every 5–50 person practice considers as fundamental as Clio itself.

Delta knows every active case. Delta knows every client. Delta knows every opposing counsel. Delta knows how each attorney at the firm prefers to work. Delta knows the patterns — which types of cases tend to have document compliance problems, which clients need more hand-holding, which matters are generating the most time relative to billing.

Delta is the institutional memory of the firm. Not backed up somewhere. Not retrievable if you look hard enough. Present, active, and continuously compounding.

The firms that adopt CaseDelta in the first year get two years of Delta's learning for free. That advantage is not acquirable later at any price. The institutional memory is proprietary to the firm that built it, and it compounds without limit.

That is the moat. Not the feature set. Not the pricing. Not the integrations. The compounding knowledge of a firm's practice, built by an associate who never leaves.

---

*This document governs narrative, product, and UX decisions. When in doubt: does this make Delta feel more like a tool or more like a colleague? The answer determines the decision.*
