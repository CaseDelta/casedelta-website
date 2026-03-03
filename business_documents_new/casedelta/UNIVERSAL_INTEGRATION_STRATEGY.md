# Universal Integration Strategy v4: OAuth-First + Dedicated Seat Narrative

**Date:** March 2, 2026
**Status:** Updated architecture direction. Supersedes v3 credential-based session approach for platforms with available APIs.

---

## The Decision

CaseDelta integrates with law firm platforms using a clear priority stack:

1. **OAuth (primary)** — For all platforms with public APIs (Clio, MyCase, PracticePanther, Filevine, Docketwise). CaseDelta gets its own OAuth token per firm. Completely independent from the attorney's browser session. Two sessions coexist with zero conflict — this is standard OAuth multi-session behavior.
2. **Dedicated seat login (secondary)** — For platforms where OAuth doesn't cover the needed functionality. CaseDelta has its own user account at the firm's practice management system. The agent authenticates as that user. The attorney's own session is never touched.
3. **Browserbase + Stagehand (UI fallback)** — For UI-only actions not exposed by any API (rare). Runs in an isolated cloud browser context per firm, with pre-authenticated session state stored via Browserbase's Contexts API. Agent's browser context is fully isolated from the attorney's active browser.
4. **Credential-based session management (last resort)** — For legacy platforms with no API and no UI automation path (e.g., Camp Legal). Same approach as v3: POST credentials → capture session cookie → use for all subsequent calls.

**Why this order matters:** The Carmody/MyCase concurrent session conflict was caused by sharing a browser session token. That approach is architecturally wrong for any platform that enforces single-session or that uses session-bound cookies. OAuth tokens are independent by design — two OAuth sessions for the same user can coexist on any standards-compliant platform.

---

## Why This Architecture (Evolution Summary)

| Approach Considered | Verdict | Why |
|---|---|---|
| Per-platform API connectors (MCP) | Rejected as primary | Too much per-platform engineering |
| Zapier bridge | Rejected as primary | Event-driven only, no backfill |
| Chrome extension (DOM scraping) | Rejected | User must visit every page; DOM parsing brittle |
| Chrome extension (API interception) | Rejected | Caused concurrent session conflicts (Carmody lesson) |
| Shared credential session (same user) | Rejected for API platforms | Causes logout conflicts when concurrent sessions not allowed |
| **OAuth (own token per firm)** | **Primary** | Independent sessions, no conflict, platform-blessed |
| **Dedicated seat login** | **Secondary** | Agent as its own user — clean, honest, scalable |
| **Browserbase + Stagehand (cloud browser)** | **UI fallback** | Isolated context per firm, no session interference |
| **Credential-based session** | **Last resort** | Only for legacy platforms with no API path |

---

## Platform Reconnaissance (February 2026)

### Camp Legal
- **Auth:** Plain HTML form POST to `/login` with `username` + `password` fields
- **CAPTCHA:** None
- **CSRF:** None
- **Response:** 302 redirect with session cookie
- **Stack:** AngularJS 1.x (end-of-life), server-rendered
- **Integration path:** Credential-based session management. POST credentials → capture session cookie → use cookie for all subsequent API calls.
- **Difficulty:** Easiest possible case

### Clio
- **Auth:** Form POST to `/login` with `authenticity_token` + `challenge` + credentials
- **CAPTCHA:** Yes — `g-recaptcha-response` required
- **CSRF:** Yes — `authenticity_token` (Rails-style)
- **Integration path:** OAuth only. reCAPTCHA blocks server-side login. Clio has a full public API with 400+ REST endpoints and OAuth 2.0.
- **Difficulty:** Easy (use their OAuth)

### MyCase
- **Auth:** POST to `auth.mycase.com/login_sessions` with `client_id` + `response_type=code` + credentials
- **CAPTCHA:** None observed
- **CSRF:** Yes — `authenticity_token` (Rails CSRF)
- **Stack:** Rails app with OAuth 2.0 authorization code flow
- **Integration path:** Either OAuth (they have the infrastructure; `client_id` + `response_type=code` confirms OAuth flow) or credential-based with CSRF handling (GET page first → parse `authenticity_token` → POST with it).
- **Difficulty:** Moderate (CSRF handling needed for credential path; OAuth cleaner if available)

---

## What You Can Say in Meetings

**Standard integration question:**
> "Tell me what you're using. If they have an API — like Clio does — CaseDelta connects natively via OAuth; it gets its own authenticated access that never touches your active session. If it's a platform without that, CaseDelta can have its own dedicated login — think of it like creating a user account for a digital associate. Same idea as giving a new hire their own credentials. Either way, you don't have to change how you work."

**When asked about the Carmody/concurrent session issue (if it comes up):**
> "We tried to connect through a shared session initially — that was our mistake. The right way is for CaseDelta to have its own independent connection, which is what we use now. It's like the difference between two people sharing one login versus each having their own. We should have done this from the start."

**Dedicated seat pricing conversation (Nowotny / MyCase scenario):**
> "CaseDelta works best when it has its own seat in your system — its own login, its own access. Think of it as creating a user account for a digital associate. The MyCase seat cost is [X/month], and CaseDelta is [Y/month]. Combined that's still a fraction of a paralegal. And unlike a paralegal, it doesn't call in sick or put in two weeks notice."

---

## Handling Integration Cost Objections

**The two objections you'll face:**
- "We'd need to upgrade to an API tier to make this work — that costs extra."
- "Adding another seat costs us [X]/month."

### Warm contacts already in your pipeline (Nowotny, Carmody, Barnds)

Offer to cover the integration cost for 60 days — but structure it as a pilot with obligations, not a free gift:

> "I'll cover the seat/API cost for the first 60 days while we're in pilot. What I need from you in exchange is 30 minutes twice a month to walk through what's working and what isn't. That feedback is worth more to me right now than the $30-50/month. At the end of 60 days, you decide if it's worth continuing at full cost."

**Why this works:**
- They have skin in the game (feedback commitment), not just a free ride
- Time-bounded — converts cleanly to paid at day 61 with no awkward conversation
- You're buying validated signal with an obligation attached, not buying a customer
- Keeps Failure #11 from applying: "they said yes to free" is a yellow flag for *strangers*, not for warm contacts who already have a relationship with you

**The guardrail:** Don't absorb integration costs indefinitely. After the 60-day pilot, the seat/API cost is their responsibility. Make this clear upfront. You're buying signal, not subsidizing their SaaS infrastructure forever.

### Completely new clients

Don't subsidize. Build the integration cost into the pitch from the start so it's never a surprise reveal:

> "CaseDelta is $[X]/month. If you're on Clio or MyCase, there may be a small integration cost — typically $20-50/month for an API tier or an additional user license. Total is $[X+50]/month at most. Compare that to a paralegal at $4,500-6,000/month fully loaded. You're getting the same cognitive labor at about 2% of the headcount cost."

If they still push back on the $30-50 integration cost after that framing:

> "Help me understand — if CaseDelta saves you even one hour of partner time a month, what's the barrier to the $30?"

Their answer tells you what's actually going on. Either they reveal the real objection (pricing, trust, timing) or they realize they're being irrational and move forward. Either way you have better signal than if you just removed the cost.

**Why not subsidize for new clients:** If someone won't absorb a $30/month incremental cost to try something that could save them 8+ hours/month, they don't believe the value proposition yet. The answer is to fix the belief gap, not absorb the cost. Subsidizing for new clients replicates the med spa pattern — you accumulate customers with zero real conviction who give you low-quality feedback.

---

## References

- **Handoff doc:** CONNECTION_ARCHITECTURE_HANDOFF.md (implementation details for Claude Code)
- **AgentFrame doc:** AGENTFRAME.md (Connection primitive as platform feature)
- **Research:** UNIVERSAL_CONNECTOR_RESEARCH.md (tiered approach research, legal precedent, cost analysis)
- **Original thesis:** UNIVERSAL_CONNECTOR_THESIS.md (shower monologue, initial thinking)