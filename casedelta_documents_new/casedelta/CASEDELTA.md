# CASEDELTA

**Last updated:** May 8, 2026
**Purpose:** The canonical reference for what CaseDelta is, who it's for, and how it works. Single source of truth for business operations and product ground-truth.

---

## What CaseDelta Is

CaseDelta is the operational layer that connects every tool a law firm uses — case management, document storage, email, billing, intake, accounting — and drives them all through one chat surface. **Delta** is the AI associate that lives inside it.

The promise: take a matter from intake to resolution faster by collapsing the integration plumbing and cognitive overhead a partner currently absorbs. Both sides flow through Delta — the legal work (pre-litigation prep, drafting, chronologies, demands) and the admin work (billing, accounting, client communications, intake processing).

Delta operates the way a paralegal or associate would. It logs into platforms, reads APIs, drives workflows, and learns the firm's quirks over time. The platform a firm uses doesn't matter — Delta adapts to it.

---

## Ideal Customer Profile

### Primary (80% of focus — outbound, sales-led, white-glove)

- Plaintiff-side **mass tort** firms.
- Plaintiff-side **personal injury** firms.
- Plaintiff-side **medical malpractice** firms.

These three share document-heavy workflows, high operational burden, and high revenue per matter. Pre-litigation prep and chronology generation across thousands of pages of medical records is the hero use case. Admin work — intake processing, plaintiff communications, billing across hundreds of claimants — is the second-order win.

Outbound, manual onboarding, and direct sales engagement focus here.

### Secondary (20% — self-serve)

Every other practice area: business litigation, real estate, immigration, family, employment, civil rights, commercial, in-house counsel, government / municipal — anyone.

Same product. Different motion. A solo, a 5-attorney boutique, or a 20-attorney mid-sized firm in any field can sign up, integrate their tools, and be productive without a sales conversation or any manual onboarding lift on our side.

We do not turn anyone away. We simply don't spend outbound energy outside the primary ICP.

---

## Operating Principle: Build the Mechanism, Not the Code

This governs every technical and product decision.

When a bug or inefficiency arises, the question is not *"what code do we write to patch this."* The question is *"can we improve Delta's autonomous capability so it handles this — and every variant of it — itself."*

- **Code-bound product = engineering-bound product.** Every new firm requires custom work. Every new platform requires an integration sprint. Growth is gated by engineering hours.
- **Mechanism-bound product = compounding product.** Delta learns one platform for one firm; the resulting skill gets better the more it runs; that improvement propagates across every firm using that platform. Adoption drives capability. Engineering hours unlock the substrate, not the features.

Concretely, this means:
- Integrations are markdown files (skills), not Python handlers.
- Memory is durable natural language surfaced at runtime, not hardcoded rules.
- Instructions are markdown blocks Delta reads dynamically, not branching logic.
- The agent fixes its own gaps via the self-healing flywheel, not human-written patches per defect.

We build the mechanism that lets Delta be the thing, not the thing itself.

---

## The Skill Flywheel

The skill flywheel is the central mechanism. It has four properties.

**1. Anything is integrable.** Public REST API, OAuth, API key, static bearer, or no public API at all (session-cookie scrape via Playwright) — these distinctions don't matter at the product level. Delta uses `bash` + `curl` against external systems the way a human would. If a paralegal can log in and do work in the platform, Delta can do that work.

**2. Onboarding happens at runtime.** A lawyer says *"I use [PlatformX]."* Delta researches the API, determines the auth shape, drafts a SKILL.md describing the workflows, and validates with one read-only call. Five minutes, no engineer involved. Activation writes three database rows (`provider_configs` + `firm_skills` + credentials) atomically. No deploy.

**3. Skills self-improve.** When Delta encounters a quirk during real work, the SKILL.md updates. The next invocation — for that firm and every other firm on that platform — handles the quirk natively. One firm's friction becomes every firm's smoothness.

**4. Memory is the same substrate.** Durable knowledge about the firm — preferences, judges, opposing counsel, voice, workflow patterns — lives as natural-language memories surfaced ranked on every invocation. Behavioral guidance discovered by the self-healing loop is written back as memory, not as code. Skills, instructions, and memory are the same kind of thing: natural-language artifacts the agent reads to do its job better.

**The compounding loop:** more firms → more integration coverage → better skills → more value per firm → more adoption.

---

## What Delta Does Today

### Integration coverage (live)

- **Case management:** Clio, MyCase, Camp Legal, GoHighLevel.
- **Productivity:** Google Workspace (Drive, Gmail, Calendar, Docs), Microsoft Workspace (OneDrive, Outlook, Calendar, Word, Excel via Graph).
- **Skill-only by default.** Microsoft and Google handlers were deleted May 2026 — both run skill-only via `curl`. Wrapped Python integrations remain only where they must: the Camp Legal local cache (no public API), multimodal page inspection, async orchestration callbacks, sandboxed code execution, and the Phase 3c browser session executor.
- **New platforms are onboarded by Delta at runtime**, not by engineering.

### Document chronologies (hero capability for the primary ICP)

- Recursive multi-agent fan-out across 100–5,000+ page document sets.
- Sub-agents extract structured entries; orchestrator synthesizes hierarchically. Output is XLSX + PDF with citations.
- Vision OCR for scanned and handwritten documents.
- On-demand visual page inspection — Delta can see any page of any document, not just read indexed text. Enables learning new templates from a single example.

### Document operations

- AI classification: medical records, depositions, expert reports, W-2s, bank statements, QDROs, parenting plans, etc.
- Cross-document anomaly detection: income discrepancies, conflicting dates, treatment gaps, missing pages, unsigned docs.
- Bates stamping for production.

### Drafting and communication

- Demand letters, follow-ups, status updates, intake responses — generated in the firm's voice via per-user voice profiles.
- Email automation with three-tier cascade (firm defaults → case overrides → task queue), auto-pause on bounce or complaint.

### Case operations

- Case lifecycle: create / promote / update / track. Firm and per-user workspaces.
- Magic-link client portals for document collection.
- Audit trail: every action recorded and exportable for bar compliance reviews.

### Self-healing

- Automated probes detect integration capability gaps in the background.
- A remediation loop fixes the issue at the lowest tier that works: prompt tweak → behavioral memory rule → code PR → manual escalation. Re-probe verifies the fix.
- Primary-source indexing: Delta cites pleadings, orders, and medical records — not paralegal notes. Notes are leads, not answers.

---

## How It Works (Architecture Summary)

A few durable ideas govern the system. Implementation details live in the code and `CLAUDE.md`.

- **Model-agnostic agent layer.** The agent runs on whichever model is currently best; a fallback handles the rest. Both paths consume the same skills, the same memory, and the same auth dispatch. Swapping models is configuration, not a rewrite.
- **Integrations are data, not deploys.** A new platform is a row in the integration substrate (auth shape + skill content + encrypted credentials). No engineering work is required to add or update one.
- **Multi-tenancy by firm.** Every record and every call is scoped to the firm. Per-user grant isolation applies wherever credentials are personal rather than firm-wide.
- **Documents flow through a staged pipeline.** Conversion, vision OCR, classification, and synthesis are separate stages so each can evolve independently as models improve.
- **Security by architecture.** Credentials encrypted at rest. No client data sent to any third-party LLM. Every action audit-logged. Compliance is a property of the design, not a policy layer on top.

---

## Delta's Voice

Confident, direct, capable. A sharp associate who respects the lawyer's time.

Delta does not say *"Sure! I'd be happy to help with that! Let me take a look!"*

Delta says: *"Pulled the Wheeler medicals. 142 pages across 6 providers, treatment gap of 47 days between Aug 12 and Sep 28. Demand letter drafted, ready for review."*

Delta shows the result and ends with a clear next action. Memory disclosures are surfaced in plain words — *"got it, I'll remember that"* — not framed as a system event.

---

## What CaseDelta Is Not

- **Not a Clio / MyCase replacement.** Sits on top of them, drives them, gives Delta a place to work.
- **Not a legal research tool.** That's Westlaw, Lexis, Paxton. Delta handles the firm's own work — its matters, documents, communications, integrations.
- **Not a replacement for attorney judgment.** Delta drafts; the attorney approves. Every output is reviewed before action. This is the design, not a limitation.
- **Not "personalized" AI.** Personalization is a settings panel. Delta builds compounding institutional knowledge over months and years and operates inside the firm's actual tool stack.
- **Not vertical software.** It is the integration and cognitive layer that runs across whatever stack the firm already chose.

---

## North Star

A lawyer should be able to run their entire firm by voice while sitting at a Starbucks: drafting, client communications, billing, accounting, status reads — all through natural language. Eventually, firms should build their own dashboards by talking to Delta the way they would talk to a developer (*"give me a view of pending demands, billable hours by attorney, and outstanding intake responses"*) — no code, no engineer, no procurement cycle.

The path to both is the same: keep building the mechanism.