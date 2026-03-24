# Delta Agent Architecture

**Purpose:** High-level design document for Delta's self-learning flywheel. Not implementation details (those change) — this is the *why* and *how* at a business level.

**Last updated:** 2026-03-21

---

## The Core Loop

Delta is not a chatbot — it's an associate that gets smarter every day. The architecture has two halves:

**Interactive (user-facing):** Lawyers ask questions, Delta answers with tools and citations. Every interaction teaches Delta something — corrections, preferences, patterns.

**Autonomous (nightly flywheel):** While lawyers sleep, Delta evaluates its own work, mines connected data for institutional knowledge, diagnoses its own failures, and fixes itself. By morning, Delta is better than yesterday.

```
INTERACTIVE                          AUTONOMOUS (nightly)

User asks question                   Mining: learn from firm's integrations
  → Delta answers                    Learning: process thumbs-down feedback
  → User gives feedback              Self-eval: score recent responses
    → Stored for nightly analysis     Quality: probe integration capabilities
                                     Orchestrator: diagnose failures
                                       ↓
                                     All findings → delta_memory
                                       ↓
                                     Remediation: auto-fix what it can
                                       ↓
                                     Delta is smarter tomorrow
```

---

## Three Layers of Knowledge

Delta's knowledge is separated by scope and persistence:

### Layer 1 — Identity (SOUL.md)

Who Delta is. Voice, principles, data routing, tool discipline. Static. Never auto-modified. Changes here are operator decisions, not automated fixes.

**Examples:** "Lead with the finding, not the preamble." "Exhaust all sources before saying you can't find something."

**Size:** ~8KB. Must stay under 12KB to leave headroom.

### Layer 2 — Behavioral Guidance (delta_memory, scope=global)

Operational rules Delta has learned across ALL firms. Written by the remediation agent when it identifies patterns. Injected into every interaction via `<BEHAVIORAL_GUIDANCE>` in the system prompt.

**Examples:** "Always run discovery before reporting limitations." "Never fabricate data points — report tool failures instead." "Search for documents before telling the user you can't find one."

**Scale:** Up to 20 active rules (~4KB). Old rules naturally age out or get deactivated. No size limit on the underlying storage.

### Layer 3 — Institutional Memory (delta_memory, scope=firm and scope=user)

What Delta has learned about THIS firm and THIS user. Written by the learning agent (from feedback), the mining agent (from connected data), and Delta itself (via the `remember` tool during conversations).

**Examples:** "This firm prefers briefs under 15 pages." "Judge Miller grants MSJ 34% in employment cases." "Client Johnson submits documents within 48 hours."

**Scale:** Unlimited per firm. Loaded on demand via the `recall` tool (JIT retrieval), not bulk-injected. The system prompt shows a lightweight index of categories + counts.

---

## The Self-Healing Flywheel

### Finding Issues

| Source | What it finds | Frequency |
|--------|--------------|-----------|
| **Thumbs-down feedback** | User dissatisfaction → corrective memory | As feedback arrives |
| **Self-evaluation** | Low quality responses (score < 3/5) | Daily, 10 random samples |
| **Integration quality** | Broken or degraded integration features | Daily per firm |
| **Orchestrator** | Failed invocations, stuck processes, expired tokens | Hourly |

### Fixing Issues

| Tier | What it fixes | How | Autonomy |
|------|--------------|-----|----------|
| **0** | Workflow prompt issues | Updates prompts in delta_memory | Fully autonomous |
| **1** | Behavioral patterns | Creates rule in delta_memory (injected at runtime) | Fully autonomous |
| **2** | Code bugs | Creates GitHub PR via Claude Code Worker | Human reviews PR |
| **3** | Infrastructure issues | Logs for manual intervention | Human required |

### Guards Against Runaway

- **Dedup:** Every workflow checks for existing findings/remediations before creating new ones
- **Rate limit:** Max 1 code PR per remediation run
- **Claim-before-process:** Findings are marked inactive before long-running operations (prevents concurrent runs from duplicating work)
- **Staleness monitoring:** Orchestrator alerts if the flywheel stops producing output for 48h
- **SOUL.md immutability:** Remediation never touches SOUL.md — behavioral fixes go to delta_memory

---

## The Intelligence Network (Phase 3)

Every firm contributes anonymized intelligence to the network. When 3+ firms have data about the same entity (judge, opposing counsel, jurisdiction), Delta aggregates it into global network intelligence.

**Flow:**
```
Firm memories (scope=firm)
  → Weekly aggregation (wf 18)
  → Anonymized patterns (scope=global, category=network_intelligence)
  → Available to all firms via recall tool
```

**Anonymization:** No firm names, case names, client names, or attorney names. Only patterns and statistics: "Based on observations across 3 firms: Judge Miller grants MSJ 34% in employment cases."

**Cold start:** Network intelligence requires 3+ firms with data on the same entity. Firm-specific learning is day-one value; network intelligence is Phase 3 value.

---

## Observability

Every workflow reports to three channels:

| Channel | What | When |
|---------|------|------|
| **CloudWatch** | All logs (INFO, WARNING, ERROR) | Always |
| **Slack** | Actionable events + errors | On findings, fixes, failures, crashes |
| **Sentry** | Exceptions with stack traces | On any workflow crash |

**Color coding in Slack:**
- Green (#36a64f) — successful action taken
- Orange (#ff9800) — warnings, errors, staleness
- Red (#ff0000) — critical failures, workflow crashes
- Purple (#9c27b0) — prompt fixes applied
- Blue (#2196f3) — code PRs created

---

## Design Principles

1. **Learning is the product.** Every architectural decision should make Delta's learning more visible, more valuable, and more irreplaceable.

2. **Separation of concerns.** Identity (SOUL.md) vs. learned behavior (delta_memory) vs. code (Lambda functions). Each layer scales independently.

3. **Autonomy with guardrails.** The flywheel runs fully autonomously for Tier 0-1 fixes. Tier 2 requires human review. Tier 3 requires human action. This isn't a limitation — it's trust-building.

4. **Generalizable, not hardcoded.** Nothing in the architecture assumes a specific practice area, integration, or firm structure. The same flywheel works for employment law, immigration, med mal, and any future practice area.

5. **Visible learning.** When Delta learns from feedback, the user sees "Noted. Based on your feedback, I've updated my approach." When morning reports run, they reference firm knowledge. The intelligence is not hidden.

---

## Key Decisions Log

| Date | Decision | Why |
|------|----------|-----|
| 2026-03-21 | Move Tier 1 from SOUL.md append to delta_memory behavioral rules | SOUL.md hit 15KB cap in one run. Doesn't scale with 200 firms. |
| 2026-03-21 | Extract SOUL.md `<ORCHESTRATION>` and `<EXAMPLES>` to knowledge files | Reduced SOUL.md from 15KB to 8.5KB. Content loaded on demand via `read_knowledge`. |
| 2026-03-21 | Add self-eval dedup via `self_eval_log` category | Same invocations were being re-evaluated across runs. |
| 2026-03-21 | Add flywheel staleness monitoring to orchestrator | No visibility when quality audit or self-eval silently stopped producing. |
| 2026-03-21 | Add learning-moment messages to conversation stream | Users never saw proof that Delta learned from their feedback. |
| 2026-03-21 | Wrap all agentic workflows with Sentry capture | 97 error paths had zero Sentry coverage. Crashes were invisible. |
| 2026-03-21 | Close remediation regeneration cycle | Quality audit recreated findings remediation had already processed. 40+ duplicate PRs. |
