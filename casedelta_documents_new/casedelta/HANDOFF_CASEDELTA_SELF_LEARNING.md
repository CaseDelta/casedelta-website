# CaseDelta Engineering Handoff: Self-Learning Agent System

**Document type:** Engineering implementation spec
**Date:** March 13, 2026
**Author:** Claw (AI strategic partner), synthesized from Karpathy AutoResearch analysis, CaseDelta architecture review, and founder direction
**Audience:** Any engineer working on CaseDelta — assumes no prior knowledge of the self-learning pattern

---

## Executive Summary

Delta (CaseDelta's AI associate) currently gets smarter through two mechanisms: (1) the `remember` tool saves facts about individual users and firms during conversations, and (2) the `read_knowledge`/`write_knowledge` tools store reusable SOPs and schemas. Both require Delta to notice something worth saving *during* the conversation.

This spec adds a **third mechanism: automated self-improvement from real user feedback.** A nightly background agent reviews every negative signal from the day's conversations, analyzes what went wrong, and writes corrective memories and knowledge entries that immediately improve Delta's next interaction.

The result: Delta doesn't just remember what attorneys tell it — Delta learns from its mistakes overnight and shows up better the next morning. This is the behavioral promise in the CaseDelta narrative ("Delta gets smarter the longer it's there") made technically real.

---

## The Self-Learning Pattern (Plain English)

Think of how a good associate improves at a law firm:

1. **They do work.** (Delta answers questions, drafts emails, flags issues)
2. **The partner corrects them.** ("No, I wanted this formatted differently." "You missed the income from the second W-2.")
3. **They remember the correction.** (Next time, they do it right without being told)
4. **Over time, they learn patterns.** ("This partner always wants bullet points, not paragraphs." "Family law cases at this firm always need the QDRO checked first.")

Right now, Delta handles steps 1 and partially 2-3 (when the attorney explicitly corrects Delta during a conversation and Delta's `remember` tool fires). But Delta misses corrections that happen *implicitly* — a thumbs-down, an edit to a draft, a dismissal of a suggestion.

The self-learning system closes this gap with three layers:

- **Layer 1:** Capture every signal (thumbs up/down, edits, dismissals)
- **Layer 2:** A nightly agent analyzes negative signals and writes corrective memories/knowledge
- **Layer 3:** A weekly optimizer detects cross-firm patterns and proposes system-wide improvements

---

## What Already Exists (Current Architecture)

These are the building blocks already deployed. The self-learning system plugs into all of them.

### Memory System
- **`agent_memory` table** — per-user and per-firm facts. Loaded into every Delta invocation via the `remember` tool.
- **`saveUserMemory()` / `saveFirmMemory()`** in `lyra_s2/db.mjs` — direct DB writes.
- **`remember` tool** — Delta calls this during conversation to save a fact. Works for personal scope (one user) or firm scope (everyone at the firm).

### Knowledge System
- **`agent_knowledge` table** — SOPs, schemas, document extraction formats. Loaded on demand via `read_knowledge` tool.
- **`write_knowledge` internal endpoint** — creates/updates knowledge entries. Accessible from any Lambda via internal API.
- **Global knowledge** seeded from `config/knowledge/global/` — med mal chronology schema, domestic relations affidavit schema, document extraction SOP.
- **Firm-specific knowledge** — firms can customize schemas, and Delta can update them when attorneys correct output formats.

### Conversation Storage
- **`assistant_conversations` table** — full conversation history (question, answer, sources, execution steps). Append-only audit trail.
- **`platform_invocations` table** — per-invocation metadata (run_id, status, duration, model used).

### Agent Configuration
- **`config/agents/casedelta/SOUL.md`** — behavioral prompt (voice, principles, workflow, examples). Auto-deployed via CI/CD on merge.
- **`config/agents/casedelta/skills/*.md`** — per-tool behavioral guidance. Lazy-loaded at runtime.
- **`config/agents/casedelta/config.yaml`** — model selection, temperature, max_tokens.

### Scheduling Infrastructure
- **EventBridge** — already used for reminder system (8am ET daily). Can schedule any Lambda invocation on a cron.
- **Lambda timeouts** — business Lambdas have 300s timeout, sufficient for analysis work.

---

## Implementation: Phase 1 — Feedback Capture (Ship First)

**Goal:** Capture explicit user feedback on every Delta response.

### 1.1 Database: `assistant_feedback` table

```sql
CREATE TABLE assistant_feedback (
  feedback_id    UUID DEFAULT uuid_generate_v7() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  message_id     UUID,           -- specific assistant message being rated
  user_id        UUID NOT NULL,  -- who gave the feedback
  firm_id        UUID NOT NULL,  -- for multi-tenant queries
  rating         SMALLINT NOT NULL,  -- 1 = thumbs up, -1 = thumbs down
  reason         TEXT,           -- optional: "too verbose", "wrong number", "missed the second W-2"
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_feedback_firm_date ON assistant_feedback (firm_id, created_at);
CREATE INDEX idx_feedback_rating ON assistant_feedback (rating) WHERE rating = -1;
```

### 1.2 Backend: New endpoint in `case_management`

**`POST /assistant/feedback`**

```python
# In case_management/handlers/assistant_handlers.py

def submit_feedback(event, context):
    """Store user feedback on an assistant response."""
    body = parse_body(event)
    user = get_authenticated_user(event)

    data = {
        'conversation_id': body['conversation_id'],
        'message_id': body.get('message_id'),
        'user_id': user['user_id'],
        'firm_id': user['firm_id'],
        'rating': body['rating'],       # 1 or -1
        'reason': body.get('reason'),    # optional text
    }

    result = supabase_post('assistant_feedback', data)
    return success_response(result[0])
```

Route: Add to `app.py` wildcard routing — `POST /assistant/feedback`.

### 1.3 Frontend: Thumbs up/down in `CaseAssistant.tsx`

Below each assistant message bubble, add two small icon buttons:

```tsx
// Simplified — integrate into the existing message rendering
<div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
  <button
    onClick={() => submitFeedback(message.id, 1)}
    className={cn("p-1 rounded", feedbackGiven === 1 && "text-[var(--color-success-text)]")}
  >
    <ThumbsUp size={14} />
  </button>
  <button
    onClick={() => submitFeedback(message.id, -1)}
    className={cn("p-1 rounded", feedbackGiven === -1 && "text-[var(--color-error-text)]")}
  >
    <ThumbsDown size={14} />
  </button>
</div>

// On thumbs-down, show a small text input: "What went wrong? (optional)"
// Submit via POST /assistant/feedback
```

**Design notes:**
- Buttons appear on hover over assistant messages only (not user messages)
- Once clicked, the selected button stays highlighted, other button fades
- Thumbs-down expands a single-line text input for optional reason
- Use existing design tokens — no new visual values
- Store feedback state in React Query cache to persist across re-renders

### Estimated Effort: 1.5 days
- 0.5 day: table + backend endpoint
- 1 day: frontend component + integration

---

## Implementation: Phase 2 — Nightly Learning Agent (Core)

**Goal:** Automatically analyze negative feedback and write corrective memories/knowledge entries that improve Delta's next interaction.

### 2.1 New Lambda: `learning_agent`

**Location:** `aws/lambda/learning_agent/`

**Trigger:** EventBridge rule — runs at 2:00 AM UTC daily for each active firm (or a single invocation that iterates across firms with feedback).

**Logic:**

```python
def handler(event, context):
    """
    Nightly self-improvement agent.

    For each firm with negative feedback today:
    1. Pull all thumbs-down messages from the past 24 hours
    2. For each, load the full conversation context
    3. Analyze what went wrong using an LLM
    4. Decide: write a corrective memory, update knowledge, or skip
    5. Log all actions for audit
    """

    # 1. Get firms with negative feedback in the last 24 hours
    cutoff = (datetime.utcnow() - timedelta(hours=24)).isoformat()
    feedback_rows = supabase_get(
        'assistant_feedback',
        f'rating=eq.-1&created_at=gte.{cutoff}&select=*,assistant_conversations(*)'
    )

    # Group by firm
    firms = group_by(feedback_rows, 'firm_id')

    for firm_id, firm_feedback in firms.items():
        process_firm_feedback(firm_id, firm_feedback)


def process_firm_feedback(firm_id, feedback_items):
    """Analyze negative feedback for one firm and generate improvements."""

    # Load existing firm context
    firm_memories = get_firm_memories(firm_id)
    firm_knowledge = get_firm_knowledge(firm_id)

    for item in feedback_items:
        # Get the full conversation around the bad response
        conversation = get_conversation_context(
            item['conversation_id'],
            item['message_id'],
            window=5  # 5 messages before and after
        )

        # Ask the LLM to analyze what went wrong
        analysis = analyze_failure(
            conversation=conversation,
            user_reason=item.get('reason'),
            existing_memories=firm_memories,
            existing_knowledge=firm_knowledge
        )

        # Act on the analysis
        if analysis['action'] == 'add_user_memory':
            save_user_memory(item['user_id'], firm_id, analysis['fact'])
            log_learning(firm_id, 'user_memory', analysis)

        elif analysis['action'] == 'add_firm_memory':
            save_firm_memory(firm_id, analysis['fact'])
            log_learning(firm_id, 'firm_memory', analysis)

        elif analysis['action'] == 'update_knowledge':
            update_knowledge(firm_id, analysis['slug'], analysis['content'])
            log_learning(firm_id, 'knowledge_update', analysis)

        elif analysis['action'] == 'skip':
            log_learning(firm_id, 'skipped', analysis)


def analyze_failure(conversation, user_reason, existing_memories, existing_knowledge):
    """
    Use an LLM to determine what went wrong and what corrective action to take.

    Returns: {
        action: 'add_user_memory' | 'add_firm_memory' | 'update_knowledge' | 'skip',
        fact: str (for memory actions),
        slug: str (for knowledge actions),
        content: str (for knowledge actions),
        reasoning: str (always — audit trail)
    }
    """

    prompt = f"""You are analyzing a conversation where the attorney gave negative feedback
    on Delta's response. Your job is to determine what went wrong and what corrective action
    will prevent this from happening again.

    CONVERSATION:
    {format_conversation(conversation)}

    ATTORNEY'S REASON (if provided): {user_reason or 'Not specified'}

    EXISTING MEMORIES FOR THIS USER:
    {format_memories(existing_memories)}

    EXISTING KNOWLEDGE:
    {format_knowledge(existing_knowledge)}

    Analyze the failure and choose ONE action:

    1. add_user_memory — if the issue is specific to this person's preferences
       (e.g., "too verbose", "wrong format", "prefers tables over paragraphs")
       Write one clear sentence that will prevent this exact mistake next time.

    2. add_firm_memory — if the issue applies to everyone at this firm
       (e.g., firm uses specific terminology, firm has a standard process)

    3. update_knowledge — if a SOP or schema needs correction
       (e.g., chronology format was wrong, extraction schema missed a field)

    4. skip — if this was a one-off error (hallucination, bad search result)
       that doesn't indicate a repeatable pattern worth remembering.

    CRITICAL: Check existing memories first. If a memory already addresses this issue,
    choose 'skip' — don't create duplicates. If an existing memory is WRONG or INCOMPLETE
    based on this feedback, note that in your reasoning.

    Respond as JSON: {{action, fact?, slug?, content?, reasoning}}"""

    return call_llm(prompt)  # Bedrock invoke, parse JSON response
```

### 2.2 Database: `learning_log` table

```sql
CREATE TABLE learning_log (
  log_id       UUID DEFAULT uuid_generate_v7() PRIMARY KEY,
  firm_id      UUID NOT NULL,
  feedback_id  UUID REFERENCES assistant_feedback(feedback_id),
  action_taken VARCHAR(50) NOT NULL,  -- 'user_memory', 'firm_memory', 'knowledge_update', 'skipped'
  details      JSONB NOT NULL,        -- full analysis output including reasoning
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_learning_firm_date ON learning_log (firm_id, created_at);
```

### 2.3 Notification

After processing all firms, send a summary to Slack (`#openclaw`):

```
Learning Agent — March 14, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Firms with feedback: 3
Total thumbs-down: 7
Actions taken:
  • 2 user memories added (Barnds Law — Kyra formatting pref, Kaitlin deadline style)
  • 1 firm memory added (Clevenger — "community estate" terminology)
  • 1 knowledge update (domestic_relations_affidavit_schema — added support calculation row)
  • 3 skipped (one-off search misses, no pattern)
```

### 2.4 EventBridge Rule

```yaml
# In infrastructure — or manual setup via AWS console
LearningAgentSchedule:
  Type: AWS::Events::Rule
  Properties:
    Name: casedelta-learning-agent-nightly
    ScheduleExpression: "cron(0 2 * * ? *)"  # 2 AM UTC daily
    State: ENABLED
    Targets:
      - Id: LearningAgentLambda
        Arn: !GetAtt LearningAgentFunction.Arn
```

### Estimated Effort: 3-4 days
- 1 day: Lambda + analysis prompt engineering
- 1 day: `learning_log` table + logging + notification
- 1 day: EventBridge setup + testing
- 0.5 day: edge cases (no feedback, duplicate detection, rate limiting)

---

## Implementation: Phase 3 — Approval Queue Feedback (When Proactive Loop Ships)

**Goal:** Capture the richest feedback signal — attorney edits to Delta's drafts.

When the approval queue UI ships (proactive cards with Approve/Edit/Dismiss), each action becomes a feedback signal:

| Action | Signal | What to Learn |
|--------|--------|---------------|
| **Approve** (no edit) | Positive — Delta got it right | Reinforce the pattern |
| **Edit then Approve** | Mixed — right idea, wrong execution | The diff between Delta's draft and the attorney's edit is pure gold. Extract exactly what changed. |
| **Dismiss** | Negative — Delta shouldn't have surfaced this | Learn what types of proactive alerts this attorney doesn't want |

The edit diff is the most valuable signal in the entire system. When an attorney changes "Dear Mr. Wheeler, I am writing to follow up regarding..." to "Tom — quick follow-up on the missing docs:", that diff teaches Delta this attorney's exact communication style without them ever having to articulate it.

### Implementation

Store approval actions in a new table:

```sql
CREATE TABLE approval_actions (
  action_id     UUID DEFAULT uuid_generate_v7() PRIMARY KEY,
  card_id       UUID NOT NULL,        -- the proactive card
  user_id       UUID NOT NULL,
  firm_id       UUID NOT NULL,
  action_type   VARCHAR(20) NOT NULL,  -- 'approve', 'edit_approve', 'dismiss'
  original_content TEXT,               -- Delta's draft
  edited_content   TEXT,               -- attorney's version (null if approve/dismiss)
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

Feed into the same nightly learning agent. For `edit_approve` actions, the analysis prompt changes:

```
Delta drafted: "{original}"
Attorney changed it to: "{edited}"

What specific preference does this edit reveal? Write a memory that will help Delta
match this attorney's style next time.
```

### Estimated Effort: 2 days (after approval queue ships)

---

## Implementation: Phase 4 — Weekly Prompt Optimizer (Month 2)

**Goal:** Detect cross-firm patterns and propose improvements to SOUL.md and skills files.

### 4.1 Logic

Weekly Lambda (Sunday 3 AM UTC):

1. Read all `learning_log` entries from the past week across ALL firms
2. Anonymize firm-specific details
3. Cluster by pattern type:
   - Voice/tone corrections → potential SOUL.md `<VOICE>` update
   - Tool usage failures → potential skills/*.md update
   - Format corrections across multiple firms → potential global knowledge update
4. For each cluster with 3+ occurrences:
   - Generate a proposed diff to the relevant config file
   - Post to Slack for human review
5. Track which proposals are accepted/rejected over time

### 4.2 Output Format (Slack)

```
Weekly Prompt Optimizer — Week of March 10-16
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patterns detected: 2

PROPOSAL 1: SOUL.md <VOICE> section
Signal: 4 firms corrected Delta for being too verbose on deadline alerts
Proposed addition after "Be concise" bullet:
  + - **Deadline alerts: one sentence max.** "Expert disclosure due Thursday — draft ready, want me to file?"
  +   Not a paragraph. Not a reminder of what the deadline is for.
Action: [Approve in next PR] [Reject] [Modify]

PROPOSAL 2: skills/search_documents.md
Signal: 3 firms had search misses when asking about "income" — Delta searched for
literal "income" instead of expanding to W-2, 1099, pay stub, bank statement
Proposed addition:
  + When searching for financial/income data, expand the query to include: W-2, 1099,
  + pay stub, bank statement, financial disclosure, tax return. Income is rarely labeled
  + as "income" in source documents.
Action: [Approve in next PR] [Reject] [Modify]
```

### 4.3 Tracking

```sql
CREATE TABLE prompt_proposals (
  proposal_id  UUID DEFAULT uuid_generate_v7() PRIMARY KEY,
  target_file  VARCHAR(200) NOT NULL,  -- 'SOUL.md', 'skills/search_documents.md'
  pattern_desc TEXT NOT NULL,
  proposed_diff TEXT NOT NULL,
  firm_count   INT NOT NULL,           -- how many firms exhibited this pattern
  status       VARCHAR(20) DEFAULT 'pending',  -- 'pending', 'accepted', 'rejected'
  created_at   TIMESTAMPTZ DEFAULT now(),
  resolved_at  TIMESTAMPTZ
);
```

### Estimated Effort: 3 days
- 1 day: aggregation + clustering logic
- 1 day: diff generation + Slack formatting
- 1 day: tracking table + acceptance/rejection flow

---

## Why This Architecture (Design Decisions)

### Why memories/knowledge instead of code modification?
Karpathy's AutoResearch modifies Python code (`train.py`). We modify natural language context (memories and knowledge entries). This is safer because:
- Bad memories are easy to review and delete. Bad code can crash production.
- Memories take effect immediately on next invocation. Code changes require deploy.
- Memories are per-firm isolated. Code changes affect everyone.

### Why nightly instead of real-time?
- Lawyers don't generate enough feedback in an hour for meaningful patterns
- Nightly allows batching — seeing 5 thumbs-down in one day reveals patterns that a single correction can't
- Avoids thrashing (flip-flopping between contradictory corrections)
- 2 AM processing doesn't compete with daytime Lambda capacity

### Why not fine-tune the model?
- Fine-tuning is expensive, slow, and requires significant data volume
- Memory + knowledge achieves the same effect (Delta behaves differently per firm) without any ML infrastructure
- The prompt is already the primary lever — enriching it with firm-specific context is more effective than adjusting model weights
- Fine-tuning would break multi-tenancy (one model per firm = operational nightmare)

### Why thumbs up/down instead of CSAT scores or NPS?
- Lawyers won't fill out surveys. They will click a button.
- Binary signal is noisy per-instance but clear in aggregate
- The optional "reason" on thumbs-down captures the 20% who bother to explain — and those explanations are the highest-value data
- Thumbs-up matters too: it confirms Delta's approach and prevents the learning agent from "fixing" things that work

---

## Success Metrics

| Metric | Baseline (Before) | Target (3 Months) | How to Measure |
|--------|-------------------|-------------------|----------------|
| Thumbs-down rate | Unknown (no tracking) | < 10% of responses | `assistant_feedback` table |
| Thumbs-down → corrective memory rate | 0% (no system) | > 60% of negatives result in an action | `learning_log` table |
| Repeat negative (same issue, same user) | Unknown | < 5% (issue fixed on first occurrence) | Compare feedback reasons week over week |
| Memories per firm after 30 days | ~2-5 (manual only) | 20-50 (automated + manual) | `agent_memory` count per firm |
| Attorney quote: "Delta is getting better" | Anecdotal | At least 1 unprompted comment per pilot firm | Sales calls, feedback sessions |

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `aws/lambda/learning_agent/` | **Create** | Nightly learning agent Lambda |
| `aws/lambda/learning_agent/handler.py` | **Create** | Main handler + analysis logic |
| `aws/lambda/case_management/handlers/assistant_handlers.py` | **Modify** | Add `submit_feedback` endpoint |
| `aws/cloudfront/src/client/components/cases/CaseAssistant.tsx` | **Modify** | Add thumbs up/down UI |
| `aws/cloudfront/src/client/lib/services/case-service.ts` | **Modify** | Add `submitFeedback()` API call |
| `aws/infrastructure/app-stack/nested-stacks/lambda-learning.yaml` | **Create** | CloudFormation for learning Lambda |
| `docs/DATABASE_SCHEMA.md` | **Modify** | Add `assistant_feedback`, `learning_log`, `prompt_proposals` tables |

---

## Sequencing

```
Week 1:  Phase 1 — Feedback capture (table + endpoint + UI)
         Ship to QA. Start collecting signal immediately.

Week 2:  Phase 2 — Nightly learning agent
         Deploy to QA. Monitor via Slack notifications.
         Manually review first week of auto-generated memories for quality.

Week 3:  Phase 3 — Approval queue feedback (if approval queue is ready)
         Add edit-diff capture. Feed into nightly agent.

Month 2: Phase 4 — Weekly prompt optimizer
         Only after we have 4+ weeks of feedback data across multiple firms.
         Start with Slack proposals only — no auto-merging.
```

---

*This system turns Delta's narrative promise — "gets smarter the longer it's there" — from marketing into measurable engineering reality. The first firm to use CaseDelta for 6 months will have a Delta that no competitor can replicate, because the institutional knowledge was built from their own corrections and preferences, compounding daily.*
