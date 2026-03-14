# OpenClaw VPS Handoff: Automated Prospecting & Email Optimization Flywheel

**Document type:** Engineering implementation spec + strategic playbook
**Date:** March 13, 2026
**Author:** Claw (AI strategic partner)
**Audience:** Future Claw conversation on the openclaw-vps repo — assumes full access to VPS, CLAUDE.md context, Gmail (gog), Apollo, Attio CRM, and all existing scheduled agent infrastructure.

---

## Executive Summary

CaseDelta is preparing for national launch. Today, outreach is founder-led: Camren manually identifies prospects, writes emails, sends them, tracks replies, and iterates. Two cold batches have gone out (19 contacts Mar 4, 37 contacts Mar 10). The process works but doesn't scale — it's the work of 1 founder, and we need the output of 10+.

This spec builds an **automated prospecting and email optimization flywheel** on the existing OpenClaw VPS. The system:

1. **Discovers** new prospects automatically via Apollo API (firm search by practice area, location, size)
2. **Enriches** each prospect (website scrape, practice areas, partner names, email addresses)
3. **Generates** personalized cold emails using an AI agent that reads the prospect's context
4. **Sends** (as Gmail drafts — Camren reviews and sends manually per existing policy)
5. **Tracks** results (reply rate, positive/negative classification) in a persistent SQLite database
6. **Learns** from results — the agent reads all previous email performance data before writing the next batch, automatically evolving copy that converts better over time
7. **Repeats** on a scheduled loop, getting better with every cycle

This is the same self-improving pattern that Karpathy's AutoResearch uses for ML model training and that marketers use for cold email optimization — but applied to CaseDelta's go-to-market motion. The key insight: **if you have a metric you can measure (reply rate) and a lever you can change (email copy), an AI agent running in a loop will optimize it faster than any human can.**

---

## The Self-Learning Email Pattern (Plain English)

Here's what happens, step by step:

### The Loop

```
Every Monday & Thursday at 6 AM CT:

1. DISCOVER
   Agent queries Apollo for new law firms matching our ICP
   (5-50 attorneys, target practice areas, target geographies)

2. ENRICH
   For each new firm: pull website, identify managing partner,
   find email address, determine practice area focus, assess ICP fit

3. SCORE
   Rate each prospect: Excellent / Good / Moderate / Skip
   Only Excellent and Good prospects get emails

4. GENERATE
   Agent reads the "email playbook" (accumulated learnings from all previous
   sends) and generates a personalized cold email for each prospect.
   The playbook tells the agent what subject lines work, what opening lines
   convert, what CTAs get replies, what to avoid.

5. DRAFT
   Create Gmail drafts via gog CLI. Camren reviews and sends.

6. TRACK (runs separately, daily)
   Agent checks Gmail for replies to previously sent emails.
   Classifies each reply: positive (interested), negative (not interested),
   neutral (OOO, wrong person), or no reply.

7. LEARN (runs weekly)
   Agent analyzes all email performance data from the SQLite database.
   Which subject lines got the highest reply rate? Which opening lines?
   Which practice areas respond best? Which geographies? Which firm sizes?
   Updates the email playbook with new learnings.
   The NEXT batch of emails will be written using these learnings.

8. REPEAT
   Next cycle, the agent is smarter. Emails are better targeted.
   Reply rates go up. Pipeline grows. Compounding.
```

### Why This Works

Most founders write cold emails based on intuition and gut feel. They might A/B test occasionally, but they're not tracking results systematically or feeding learnings back into the next batch.

This system does what a 10-person sales team does:
- **Prospecting analyst** (Apollo queries, enrichment)
- **ICP scorer** (fit assessment based on firm size, practice area, geography)
- **Copywriter** (email generation from accumulated best practices)
- **Sales ops** (CRM updates, pipeline tracking, reply monitoring)
- **Data analyst** (performance measurement, pattern detection)
- **Sales strategist** (learnings synthesis, playbook updates)

All automated. All running on a loop. All getting better over time.

---

## Current State (What Already Exists)

### Infrastructure (VPS — 65.21.153.94)

| Component | Status | Details |
|-----------|--------|---------|
| Claude Code agent | Running | Authenticated, runs `claude -p` for scheduled tasks |
| Cron/systemd timers | Active | 6 scheduled jobs already running (morning briefing, CRM scanner, etc.) |
| Slack notifications | Working | `notify.sh` posts to #openclaw |
| Gmail access | Working | `gog` CLI, both accounts (camren@casedelta.com, cahall@blueprintsw.com) |
| Apollo API | Working | Professional plan, `~/.config/apollo/api_key` |
| Attio CRM | Working | `~/.config/attio/api_key`, 1,419+ companies, 954+ people |

### CRM Data (Attio)

- **1,419+ companies** — KC firms, CA firms, KC Metro Directory imports
- **954+ people** — attorneys linked to firms
- **Pipeline stages:** Not Contacted → Email Sent → Call Scheduled → Meeting Scheduled → Met → Follow-up → Demo/Pilot → Proposal Sent → Customer
- **ICP scoring:** Excellent / Good / Moderate / Low / Not a Fit
- **Outreach status:** Not Contacted / Email Sent / Met / etc.

### Email History

- **Batch #1 (Mar 4):** 19 partners, 6 personalized + 13 standard template
- **Batch #2 (Mar 10):** 37 partners, KCMBA-referenced template
- **No systematic tracking** of reply rates per template variant
- **No persistent database** of which copy performed best

### Apollo API Capabilities

Working endpoints (Professional plan):
- `POST /v1/organizations/search` — find firms by industry, location, size, keywords
- `POST /v1/organizations/enrich` — enrich firm by domain (phone, address, keywords)
- `POST /v1/contacts/search` — search saved contacts

Blocked (plan restriction):
- People search (`/v1/mixed_people/search`, `/v1/people/search`) — can't find individual attorneys via Apollo
- **Workaround:** Scrape firm websites for partner pages, or use Attio existing data

### Email Policy (NON-NEGOTIABLE)

**Never send emails via CLI. Always create drafts only.** Camren reviews and sends all email manually from Gmail UI. This is a hard constraint — the system creates drafts, Camren sends.

---

## Implementation: The Flywheel Components

### Component 1: SQLite Metrics Database

**Location:** `/root/prospecting/data/outreach.db`

This is the persistent memory of the entire system. Every email sent, every reply received, every metric measured.

```sql
-- Email campaigns and variants
CREATE TABLE email_variants (
    variant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    variant_name TEXT NOT NULL,          -- "v1_standard", "v2_concise", "v3_security_lead"
    subject_line TEXT NOT NULL,
    body_template TEXT NOT NULL,         -- with {{placeholders}}
    hypothesis TEXT,                     -- "Shorter subject lines get more opens"
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1
);

-- Individual emails sent
CREATE TABLE emails_sent (
    email_id INTEGER PRIMARY KEY AUTOINCREMENT,
    variant_id INTEGER REFERENCES email_variants(variant_id),
    attio_person_id TEXT,               -- Attio record ID
    attio_company_id TEXT,              -- Attio record ID
    recipient_email TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    firm_name TEXT NOT NULL,
    practice_area TEXT,
    geography TEXT,                      -- "Kansas City", "Orange County", etc.
    firm_size TEXT,                      -- "1-5", "6-10", "11-20", "21-50"
    personalization_notes TEXT,          -- what was customized for this recipient
    subject_line_actual TEXT NOT NULL,   -- after personalization
    body_actual TEXT NOT NULL,           -- after personalization
    sent_date TEXT NOT NULL,
    gmail_message_id TEXT,              -- for threading replies
    gmail_thread_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Reply tracking
CREATE TABLE replies (
    reply_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email_id INTEGER REFERENCES emails_sent(email_id),
    reply_date TEXT NOT NULL,
    reply_type TEXT NOT NULL,            -- 'positive', 'negative', 'neutral', 'ooo', 'bounce'
    reply_snippet TEXT,                  -- first 200 chars of reply
    full_reply TEXT,                     -- complete reply text
    detected_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Aggregated metrics per variant (updated by learning agent)
CREATE TABLE variant_metrics (
    variant_id INTEGER REFERENCES email_variants(variant_id),
    total_sent INTEGER DEFAULT 0,
    total_replied INTEGER DEFAULT 0,
    positive_replies INTEGER DEFAULT 0,
    negative_replies INTEGER DEFAULT 0,
    reply_rate REAL DEFAULT 0.0,
    positive_reply_rate REAL DEFAULT 0.0,
    last_updated TEXT,
    PRIMARY KEY (variant_id)
);

-- Prospect pipeline
CREATE TABLE prospects (
    prospect_id INTEGER PRIMARY KEY AUTOINCREMENT,
    apollo_org_id TEXT,
    attio_company_id TEXT,
    firm_name TEXT NOT NULL,
    website TEXT,
    practice_areas TEXT,                 -- comma-separated
    attorney_count INTEGER,
    geography TEXT,
    icp_score TEXT,                      -- 'excellent', 'good', 'moderate', 'low'
    managing_partner TEXT,
    partner_email TEXT,
    enrichment_data TEXT,                -- JSON blob from Apollo + web scrape
    status TEXT DEFAULT 'discovered',    -- 'discovered', 'enriched', 'scored', 'emailed', 'replied', 'skip'
    discovered_at TEXT DEFAULT CURRENT_TIMESTAMP,
    enriched_at TEXT,
    emailed_at TEXT
);

-- The playbook: accumulated learnings (the most important table)
CREATE TABLE playbook_entries (
    entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,             -- 'subject_line', 'opening', 'cta', 'practice_area', 'geography', 'timing', 'general'
    finding TEXT NOT NULL,              -- "Subject lines under 6 words get 2.1x reply rate"
    confidence TEXT DEFAULT 'low',      -- 'low' (< 20 emails), 'medium' (20-50), 'high' (50+)
    supporting_data TEXT,               -- JSON with the numbers behind the finding
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT
);
```

### Component 2: Prospect Discovery Agent

**Schedule:** Monday & Thursday, 6:00 AM CT
**Script:** `/root/prospecting/discover.py`

```python
"""
Prospect Discovery Agent

Queries Apollo for new law firms matching CaseDelta ICP.
Checks against Attio CRM to avoid duplicates.
Enriches new firms and scores ICP fit.
Stores in SQLite for the email generation pipeline.
"""

import os, json, subprocess, sqlite3
from datetime import datetime

APOLLO_KEY = open(os.path.expanduser("~/.config/apollo/api_key")).read().strip()
ATTIO_KEY = open(os.path.expanduser("~/.config/attio/api_key")).read().strip()
DB_PATH = '/root/prospecting/data/outreach.db'

# Target geographies for national expansion
TARGET_GEOS = [
    # Phase 1: KC Metro (existing)
    "Kansas City, Missouri", "Overland Park, Kansas",
    "Kansas City, Kansas", "Lee's Summit, Missouri",

    # Phase 2: National launch markets (high density of 5-50 attorney firms)
    "Denver, Colorado",
    "Phoenix, Arizona",
    "Nashville, Tennessee",
    "Austin, Texas", "San Antonio, Texas", "Dallas, Texas",
    "Atlanta, Georgia",
    "Charlotte, North Carolina",
    "Minneapolis, Minnesota",
    "Portland, Oregon",
    "Orange County, California", "San Diego, California",
    "Tampa, Florida", "Jacksonville, Florida",
]

# Target practice areas (ordered by CaseDelta readiness)
TARGET_PRACTICE_AREAS = [
    "family law",
    "personal injury",
    "immigration",
    "estate planning",
    "employment law",
    "medical malpractice",
    "workers compensation",
    "criminal defense",
    "bankruptcy",
    "commercial litigation",
]

def discover_firms(geo, practice_keyword, page=1):
    """Query Apollo for firms matching criteria."""
    body = {
        "organization_industry_tag_ids": ["5567ce1f7369644d391c0000"],  # Law practice
        "organization_locations": [geo],
        "organization_num_employees_ranges": ["1,10", "11,20", "21,50"],
        "q_organization_keyword_tags": [practice_keyword],
        "per_page": 50,
        "page": page
    }
    return apollo("POST", "/v1/organizations/search", body)


def enrich_firm(domain):
    """Get detailed firm info from Apollo."""
    return apollo("POST", "/v1/organizations/enrich", {"domain": domain})


def check_attio_exists(firm_name):
    """Check if firm already exists in Attio CRM."""
    result = attio("POST", "/v2/objects/companies/records/query", {
        "filter": {"name": {"$contains": firm_name}},
        "limit": 1
    })
    return len(result.get('data', [])) > 0


def score_icp(firm_data):
    """
    Score ICP fit based on firm characteristics.

    Excellent: 5-30 attorneys, target practice area, tech-forward signals
    Good: 5-50 attorneys, adjacent practice area, or right size wrong area
    Moderate: Solo or 50+, or practice area we don't serve well yet
    Low: BigLaw, government, or no website
    """
    # Use Claude to score based on enrichment data
    prompt = f"""Score this law firm's fit for CaseDelta (AI legal associate for small-mid firms).

    Firm: {firm_data.get('name')}
    Size: {firm_data.get('estimated_num_employees', 'unknown')} employees
    Location: {firm_data.get('city')}, {firm_data.get('state')}
    Website: {firm_data.get('website_url')}
    Keywords: {firm_data.get('keywords', [])}

    ICP: 5-50 attorney boutique firms in document-heavy practice areas
    (family law, PI, immigration, estate, employment, med mal, workers comp,
    criminal defense, bankruptcy, commercial lit).

    Score as: excellent, good, moderate, or low.
    One sentence explanation.
    Return as JSON: {{"score": "...", "reason": "..."}}"""

    return call_claude(prompt)


def run_discovery():
    conn = sqlite3.connect(DB_PATH)

    for geo in TARGET_GEOS:
        for practice in TARGET_PRACTICE_AREAS:
            firms = discover_firms(geo, practice)

            for firm in firms.get('organizations', []):
                # Skip if already in our pipeline
                if prospect_exists(conn, firm['name']):
                    continue
                if check_attio_exists(firm['name']):
                    continue

                # Enrich
                enriched = {}
                if firm.get('website_url'):
                    enriched = enrich_firm(firm['website_url'].replace('https://', '').replace('http://', '').split('/')[0])

                # Score
                score = score_icp({**firm, **enriched.get('organization', {})})

                # Store
                conn.execute('''
                    INSERT INTO prospects (apollo_org_id, firm_name, website, practice_areas,
                    attorney_count, geography, icp_score, enrichment_data, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'discovered')
                ''', (
                    firm.get('id'),
                    firm['name'],
                    firm.get('website_url'),
                    practice,
                    firm.get('estimated_num_employees'),
                    geo,
                    score.get('score', 'moderate'),
                    json.dumps({**firm, **enriched}),
                ))

    conn.commit()

    # Summary
    new_count = conn.execute(
        "SELECT COUNT(*) FROM prospects WHERE status = 'discovered' AND date(discovered_at) = date('now')"
    ).fetchone()[0]

    notify(f"Discovery complete: {new_count} new prospects found across {len(TARGET_GEOS)} markets")
    conn.close()
```

### Component 3: Email Generation Agent

**Schedule:** Monday & Thursday, 7:00 AM CT (1 hour after discovery)
**Script:** `/root/prospecting/generate_emails.py`

This is where the self-learning magic happens. The agent reads the **playbook** (accumulated learnings from all previous email campaigns) before writing each email.

```python
"""
Email Generation Agent

Reads enriched prospects, reads the email playbook,
generates personalized cold emails, creates Gmail drafts.
"""

BATCH_SIZE = 25  # max drafts per run
PLAYBOOK_PATH = '/root/prospecting/playbook.md'

def generate_batch():
    conn = sqlite3.connect(DB_PATH)

    # 1. Load the playbook (accumulated learnings)
    playbook = read_file(PLAYBOOK_PATH)

    # 2. Load current best-performing variant metrics
    metrics = get_variant_metrics(conn)

    # 3. Get prospects ready for email
    prospects = conn.execute('''
        SELECT * FROM prospects
        WHERE status = 'enriched' AND icp_score IN ('excellent', 'good')
        ORDER BY icp_score ASC, discovered_at ASC
        LIMIT ?
    ''', (BATCH_SIZE,)).fetchall()

    if not prospects:
        notify("No prospects ready for email. Run enrichment first.")
        return

    # 4. For each prospect, generate a personalized email
    for prospect in prospects:
        email = generate_email(prospect, playbook, metrics)

        # 5. Create Gmail draft
        draft_id = create_gmail_draft(
            to=email['to'],
            subject=email['subject'],
            body=email['body']
        )

        # 6. Store in database
        conn.execute('''
            INSERT INTO emails_sent (variant_id, attio_person_id, attio_company_id,
            recipient_email, recipient_name, firm_name, practice_area, geography,
            firm_size, personalization_notes, subject_line_actual, body_actual, sent_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, date('now'))
        ''', (
            email['variant_id'],
            prospect['attio_company_id'],
            None,  # Will link when person is in Attio
            email['to'],
            email['recipient_name'],
            prospect['firm_name'],
            prospect['practice_areas'],
            prospect['geography'],
            str(prospect['attorney_count']),
            email['personalization_notes'],
            email['subject'],
            email['body'],
        ))

        # 7. Update prospect status
        conn.execute(
            "UPDATE prospects SET status = 'emailed', emailed_at = datetime('now') WHERE prospect_id = ?",
            (prospect['prospect_id'],)
        )

    conn.commit()
    notify(f"Email batch generated: {len(prospects)} drafts created in Gmail. Review and send.")


def generate_email(prospect, playbook, metrics):
    """
    Generate a personalized cold email using the prospect's context
    and the accumulated email playbook.
    """

    prompt = f"""You are writing a cold email to a law firm partner on behalf of Camren Hall,
    founder of CaseDelta. CaseDelta is an AI associate for small-to-mid law firms — it connects
    to their existing tools (Clio, MyCase, Google Drive), runs in the background, and handles
    document review, deadline tracking, and case briefings. It costs $500-1,000/month versus
    $50-70K/year for a paralegal.

    PROSPECT:
    Name: {prospect['managing_partner'] or 'Managing Partner'}
    Firm: {prospect['firm_name']}
    Practice: {prospect['practice_areas']}
    Location: {prospect['geography']}
    Size: ~{prospect['attorney_count']} attorneys
    Website: {prospect['website']}

    EMAIL PLAYBOOK (learnings from all previous campaigns — FOLLOW THESE):
    {playbook}

    CURRENT BEST-PERFORMING METRICS:
    {format_metrics(metrics)}

    HARD RULES:
    - Never lead with "AI." Lead with the outcome (more capacity, less admin).
    - Never say "I'd be happy to help" or sound like a chatbot.
    - Camren's voice: direct, conversational, not corporate. Uses ".." for trailing off.
      Uses "&" for casual pairs. No em-dashes.
    - Reference something specific about the firm (practice area, location, something
      from their website) in the first sentence.
    - CTA: specific and low-commitment. "Worth a 10-minute call?" or "Can I show you
      a quick demo on [practice area] docs?"
    - Keep under 100 words total. Shorter is better.
    - Subject line: under 6 words, curiosity-driven, no spam triggers.

    Generate:
    1. subject_line
    2. body (with {{first_name}} placeholder if name unknown)
    3. personalization_notes (what you customized and why)
    4. hypothesis (what you're testing with this particular email's approach)

    Return as JSON."""

    return call_claude(prompt)


def create_gmail_draft(to, subject, body):
    """Create a draft in Gmail via gog CLI. NEVER SEND."""
    cmd = [
        'env', f'GOG_KEYRING_PASSWORD=openclaw', f'GOG_ACCOUNT=camren@casedelta.com',
        'gog', 'gmail', 'drafts', 'create',
        '--to', to,
        '--subject', subject,
        '--body-html', f'<p>{body.replace(chr(10), "</p><p>")}</p>'
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout.strip()
```

### Component 4: Reply Tracker

**Schedule:** Daily, 8:00 PM CT
**Script:** `/root/prospecting/track_replies.py`

```python
"""
Reply Tracker

Searches Gmail for replies to previously sent cold emails.
Classifies each reply and stores in the database.
Updates variant metrics.
"""

def track_replies():
    conn = sqlite3.connect(DB_PATH)

    # Get all emails sent in the last 30 days that haven't been tracked
    untracked = conn.execute('''
        SELECT es.* FROM emails_sent es
        LEFT JOIN replies r ON es.email_id = r.email_id
        WHERE r.reply_id IS NULL
        AND es.sent_date >= date('now', '-30 days')
    ''').fetchall()

    for email in untracked:
        # Search Gmail for replies from this recipient
        query = f'from:{email["recipient_email"]} after:{email["sent_date"]}'
        replies = search_gmail(query)

        for reply in replies:
            # Classify the reply
            classification = classify_reply(reply['body'], email['body_actual'])

            conn.execute('''
                INSERT INTO replies (email_id, reply_date, reply_type, reply_snippet, full_reply)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                email['email_id'],
                reply['date'],
                classification['type'],
                reply['body'][:200],
                reply['body']
            ))

    # Update variant metrics
    conn.execute('''
        INSERT OR REPLACE INTO variant_metrics (variant_id, total_sent, total_replied,
        positive_replies, negative_replies, reply_rate, positive_reply_rate, last_updated)
        SELECT
            es.variant_id,
            COUNT(DISTINCT es.email_id) as total_sent,
            COUNT(DISTINCT r.reply_id) as total_replied,
            COUNT(DISTINCT CASE WHEN r.reply_type = 'positive' THEN r.reply_id END),
            COUNT(DISTINCT CASE WHEN r.reply_type = 'negative' THEN r.reply_id END),
            CAST(COUNT(DISTINCT r.reply_id) AS REAL) / COUNT(DISTINCT es.email_id),
            CAST(COUNT(DISTINCT CASE WHEN r.reply_type = 'positive' THEN r.reply_id END) AS REAL)
                / COUNT(DISTINCT es.email_id),
            datetime('now')
        FROM emails_sent es
        LEFT JOIN replies r ON es.email_id = r.email_id
        GROUP BY es.variant_id
    ''')

    conn.commit()

    # Summary
    new_replies = conn.execute(
        "SELECT COUNT(*) FROM replies WHERE date(detected_at) = date('now')"
    ).fetchone()[0]
    notify(f"Reply tracker: {new_replies} new replies detected and classified")


def classify_reply(reply_text, original_email):
    """Use Claude to classify the reply."""
    prompt = f"""Classify this email reply to a cold outreach about CaseDelta (AI for law firms).

    ORIGINAL EMAIL:
    {original_email[:300]}

    REPLY:
    {reply_text}

    Classify as:
    - "positive" — interested, wants to learn more, open to a call/demo
    - "negative" — not interested, asked to be removed, declined
    - "neutral" — out of office, forwarded to someone else, generic acknowledgment
    - "ooo" — explicit out-of-office auto-reply
    - "bounce" — delivery failure

    Return JSON: {{"type": "...", "reason": "one sentence"}}"""

    return call_claude(prompt)
```

### Component 5: Weekly Learning Agent (The Playbook Builder)

**Schedule:** Sunday, 11:00 PM CT
**Script:** `/root/prospecting/learn.py`

This is the most important component. It's the "brain" that makes the whole system self-improving.

```python
"""
Weekly Learning Agent

Analyzes all email performance data and updates the playbook.
The playbook is a markdown file that the email generation agent reads
before writing each batch. It contains accumulated wisdom about what works.
"""

PLAYBOOK_PATH = '/root/prospecting/playbook.md'

def run_learning():
    conn = sqlite3.connect(DB_PATH)

    # 1. Pull all performance data
    variant_data = get_all_variant_performance(conn)
    segment_data = get_performance_by_segment(conn)  # by practice area, geography, firm size
    reply_analysis = get_reply_content_analysis(conn)  # what positive replies say vs negative

    # 2. Load current playbook
    current_playbook = read_file(PLAYBOOK_PATH)

    # 3. Ask Claude to analyze and update the playbook
    new_playbook = generate_playbook_update(
        current_playbook=current_playbook,
        variant_data=variant_data,
        segment_data=segment_data,
        reply_analysis=reply_analysis,
        total_emails_sent=get_total_sent(conn),
        weeks_running=get_weeks_running(conn)
    )

    # 4. Write updated playbook
    write_file(PLAYBOOK_PATH, new_playbook)

    # 5. Store individual findings
    for finding in new_playbook.get('new_findings', []):
        conn.execute('''
            INSERT INTO playbook_entries (category, finding, confidence, supporting_data)
            VALUES (?, ?, ?, ?)
        ''', (finding['category'], finding['text'], finding['confidence'], json.dumps(finding['data'])))

    conn.commit()

    # 6. Notify
    notify(f"""Weekly Playbook Update
━━━━━━━━━━━━━━━━━━━━
Total emails sent: {get_total_sent(conn)}
Overall reply rate: {get_overall_reply_rate(conn):.1%}
Positive reply rate: {get_positive_reply_rate(conn):.1%}
New findings this week: {len(new_playbook.get('new_findings', []))}

Top performing variant: {variant_data[0]['name']} ({variant_data[0]['reply_rate']:.1%} reply rate)
Best geography: {segment_data['best_geo']}
Best practice area: {segment_data['best_practice']}

Playbook updated with {len(new_playbook.get('new_findings', []))} new learnings.""")


def generate_playbook_update(current_playbook, variant_data, segment_data, reply_analysis, total_emails_sent, weeks_running):
    """
    Ask Claude to analyze performance data and update the playbook.
    """

    prompt = f"""You are the email optimization strategist for CaseDelta's outbound sales.
    Your job is to analyze email campaign performance data and update the playbook that
    guides future email generation.

    CURRENT PLAYBOOK:
    {current_playbook}

    VARIANT PERFORMANCE (each row is a different email template):
    {format_variant_data(variant_data)}

    SEGMENT PERFORMANCE:
    By practice area: {json.dumps(segment_data['by_practice'])}
    By geography: {json.dumps(segment_data['by_geography'])}
    By firm size: {json.dumps(segment_data['by_size'])}
    By day of week sent: {json.dumps(segment_data['by_day'])}

    REPLY CONTENT ANALYSIS:
    What positive responders said: {reply_analysis['positive_themes']}
    What negative responders said: {reply_analysis['negative_themes']}
    Common objections: {reply_analysis['objections']}

    STATS: {total_emails_sent} total emails sent over {weeks_running} weeks.

    Update the playbook. The playbook should contain:

    1. CONFIRMED RULES (high confidence, 50+ emails supporting)
       - Specific subject line patterns that work/don't
       - Opening line formulas that convert
       - CTA phrasings that get replies
       - Length/format rules

    2. EMERGING PATTERNS (medium confidence, 20-50 emails)
       - Trends worth continuing to test
       - Segment-specific observations

    3. HYPOTHESES TO TEST (low confidence, observations that need more data)
       - Things that might work based on small sample

    4. ANTI-PATTERNS (confirmed failures — don't do these)
       - Subject lines that got 0 replies
       - Approaches that generated negative replies
       - Segments that don't convert

    5. SEGMENT PLAYBOOK
       - Per-practice-area messaging tips
       - Per-geography messaging tips
       - Per-firm-size messaging tips

    Be specific. "Short subject lines work" is useless. "Subject lines under 5 words
    with a question get 2.3x reply rate vs. 7+ word declarative subjects" is useful.

    Return the complete updated playbook as markdown, plus a JSON array of new_findings."""

    return call_claude(prompt)
```

### Initial Playbook (Before Any Data)

`/root/prospecting/playbook.md` — starting content based on existing knowledge:

```markdown
# CaseDelta Cold Email Playbook
Last updated: 2026-03-13 (initial — pre-data)

## CONFIRMED RULES
- (none yet — will be populated after first 50 emails are tracked)

## STARTING HYPOTHESES (from founder experience + batch 1-2 observations)
- KCMBA references ("fellow KCMBA member") may increase trust in KC market
- Practice-area-specific pain points in the opening line beat generic "AI for lawyers"
- The paralegal cost comparison ($500/mo vs $50-70K/yr) resonates — use it, but not as the lead
- Subject lines should be casual and curiosity-driven, not salesy
- Under 100 words total. Lawyers are busy. Respect their time.
- Never lead with "AI." Lead with the outcome.
- Camren's voice: direct, no corporate speak, uses ".." and "&" naturally
- CTA should be specific and low-commitment: "10-minute call this week?" not "let me know if interested"

## ANTI-PATTERNS
- (none confirmed — will be populated from negative signal data)

## SEGMENT NOTES
- Family law: Document-heavy (financial disclosures, custody docs). Pain = time spent reviewing.
- PI: Med records review is the killer use case. Chronologies.
- Immigration: Form-heavy, deadline-sensitive. USCIS processing anxiety.
- Estate: Complex asset tracing, beneficiary tracking.
- Med mal: Massive document sets (1000+ pages). Highest value per engagement.

## OPEN QUESTIONS
- Does mentioning security upfront help or hurt? (Lawyers care, but leading with it might sound defensive)
- Does mentioning the free pilot / covered integration cost drive more replies?
- Do morning sends vs. afternoon sends matter for lawyers?
- Does firm size affect which messaging works? (5-person firm vs. 30-person firm)
```

---

## Component 6: Attio CRM Sync

After each batch and after reply tracking, sync results back to Attio:

```python
def sync_to_attio(conn):
    """
    Create Attio records for newly emailed prospects
    and update pipeline status for replies.
    """

    # New prospects that were emailed but not yet in Attio
    new_emails = conn.execute('''
        SELECT * FROM emails_sent
        WHERE attio_company_id IS NULL
        AND sent_date >= date('now', '-7 days')
    ''').fetchall()

    for email in new_emails:
        # Create company in Attio
        company = create_attio_company(
            name=email['firm_name'],
            practice_areas=email['practice_area'],
            source='Prospecting Flywheel',
            outreach_status='Email Sent'
        )

        # Create person in Attio
        person = create_attio_person(
            name=email['recipient_name'],
            email=email['recipient_email'],
            company_id=company['id'],
            pipeline_status='Email Sent',
            last_contact=email['sent_date']
        )

        # Update SQLite with Attio IDs
        conn.execute(
            "UPDATE emails_sent SET attio_company_id = ?, attio_person_id = ? WHERE email_id = ?",
            (company['id'], person['id'], email['email_id'])
        )

    # Update pipeline for positive replies
    positive_replies = conn.execute('''
        SELECT es.attio_person_id, r.reply_date
        FROM replies r
        JOIN emails_sent es ON r.email_id = es.email_id
        WHERE r.reply_type = 'positive'
        AND es.attio_person_id IS NOT NULL
        AND r.detected_at >= datetime('now', '-1 day')
    ''').fetchall()

    for reply in positive_replies:
        update_attio_person(reply['attio_person_id'], {
            'pipeline_status': 'Follow-up',
            'last_contact': reply['reply_date']
        })

    conn.commit()
```

---

## Scheduling (VPS Systemd Timers)

```bash
# Discovery — Monday & Thursday 6 AM CT
cat > /etc/systemd/system/prospecting-discover.timer << EOF
[Unit]
Description=CaseDelta Prospect Discovery
[Timer]
OnCalendar=Mon,Thu *-*-* 06:00:00 America/Chicago
Persistent=true
[Install]
WantedBy=timers.target
EOF

# Email generation — Monday & Thursday 7 AM CT
cat > /etc/systemd/system/prospecting-generate.timer << EOF
[Unit]
Description=CaseDelta Email Generation
[Timer]
OnCalendar=Mon,Thu *-*-* 07:00:00 America/Chicago
Persistent=true
[Install]
WantedBy=timers.target
EOF

# Reply tracking — Daily 8 PM CT
cat > /etc/systemd/system/prospecting-track.timer << EOF
[Unit]
Description=CaseDelta Reply Tracker
[Timer]
OnCalendar=*-*-* 20:00:00 America/Chicago
Persistent=true
[Install]
WantedBy=timers.target
EOF

# Weekly learning — Sunday 11 PM CT
cat > /etc/systemd/system/prospecting-learn.timer << EOF
[Unit]
Description=CaseDelta Email Playbook Update
[Timer]
OnCalendar=Sun *-*-* 23:00:00 America/Chicago
Persistent=true
[Install]
WantedBy=timers.target
EOF

# CRM sync — Daily 9 PM CT (after reply tracking)
cat > /etc/systemd/system/prospecting-crm-sync.timer << EOF
[Unit]
Description=CaseDelta Attio CRM Sync
[Timer]
OnCalendar=*-*-* 21:00:00 America/Chicago
Persistent=true
[Install]
WantedBy=timers.target
EOF
```

---

## Scaling: From 1 Founder to 10+ Cofounders

Here's what this system replaces at scale:

| Human Role | System Component | Output |
|------------|-----------------|--------|
| **Prospecting analyst** | Discovery agent (Apollo queries, enrichment) | 50-100 new prospects/week |
| **ICP scorer** | Scoring agent (Claude-powered fit assessment) | Scored and prioritized pipeline |
| **Copywriter** | Email generation agent (playbook-driven) | 25 personalized emails, 2x/week |
| **Sales ops** | Reply tracker + CRM sync | Pipeline always current |
| **Data analyst** | Weekly learning agent | Performance insights, playbook updates |
| **Sales strategist** | Playbook accumulation over time | Self-improving email strategy |
| **Market researcher** | Multi-geo, multi-practice discovery | National coverage without manual research |
| **Follow-up coordinator** | (future) Auto-generate follow-up drafts for non-responders | 2x touch rate without manual effort |
| **Content marketer** | (future) LinkedIn post optimization loop | Founder brand at scale |
| **Competitive intel** | (future) Market monitor → auto-generate objection handling | Always-current competitive positioning |

### Additional Growth Loops to Build (After Core Flywheel is Running)

**1. Automated Follow-Up Sequences**
After 7 days with no reply, auto-generate a follow-up draft. After 14 days, one more. After that, mark dormant. Each follow-up uses playbook learnings for timing and copy.

**2. LinkedIn Content Optimization**
Same playbook pattern applied to Camren's LinkedIn posts:
- Post 3x/week about legal AI, security, practice management
- Track engagement (likes, comments, profile views, connection requests)
- Agent learns which topics, formats, and posting times drive the most inbound
- The LinkedIn → inbound funnel compounds alongside the outbound email funnel

**3. Demo Prep Automation**
When a positive reply comes in, auto-generate a prep doc:
- Firm details from Attio + Apollo enrichment
- Practice area pain points from the playbook
- Suggested demo scenarios based on their document types
- Competitive intel (if they mention Harvey, Paxton, or ChatGPT in their reply)
- Calendar availability from `gog calendar`

**4. Referral Loop Optimization**
Track which contacts generate introductions (Perry Brandt → Vickie Mauck, etc.). Auto-surface "referral ask" drafts at optimal intervals for high-value connectors.

**5. Bar Association & CLE Opportunity Scanner**
Weekly scan of state bar websites for:
- CLE submission deadlines (talks = inbound pipeline)
- Sponsorship opportunities
- Committee openings (networking + credibility)
- Affinity program applications (like the KCBA opportunity via Perry)

**6. Inbound SEO Content Loop**
- Agent writes blog posts targeting "legal AI for small firms", "Clio AI alternative", "secure AI for lawyers"
- Publish to casedelta.com/blog
- Track organic traffic per post via Google Analytics API
- Agent learns which topics and keywords drive traffic
- Playbook for content evolves alongside the email playbook

**7. Pricing Frame Optimization**
Test different pricing presentations in emails:
- "$500/month" vs "$6K/year" vs "fraction of a paralegal salary"
- Track which framing appears in emails that get positive replies
- Agent learns the optimal way to present pricing per segment

**8. Competitive Intelligence Auto-Responder**
The existing `market-monitor` cron watches Harvey, Clio, Paxton news. Add:
- When a competitor announces a new feature, auto-generate updated positioning
- Draft a LinkedIn post responding to the news from CaseDelta's angle
- Update the email playbook's competitive section

---

## File Structure on VPS

```
/root/prospecting/
├── data/
│   ├── outreach.db              # SQLite database (all metrics, all state)
│   └── backups/                 # Daily DB backups
├── discover.py                  # Prospect discovery agent
├── enrich.py                    # Prospect enrichment
├── generate_emails.py           # Email generation agent
├── track_replies.py             # Reply tracking and classification
├── learn.py                     # Weekly playbook update agent
├── crm_sync.py                  # Attio CRM synchronization
├── playbook.md                  # Accumulated email learnings (THE key file)
├── templates/                   # Email variant templates (for reference)
├── utils.py                     # Shared utilities (Apollo, Attio, Gmail, Claude calls)
├── config.py                    # API keys, paths, constants
└── README.md
```

---

## Build Sequence

| Step | What | Effort | When |
|------|------|--------|------|
| 1 | SQLite schema + utilities | 0.5 day | First |
| 2 | Backfill existing batch #1 and #2 data into SQLite | 0.5 day | With step 1 |
| 3 | Reply tracker (start collecting metrics immediately) | 1 day | Week 1 |
| 4 | Email generation agent + initial playbook | 1.5 days | Week 1 |
| 5 | Prospect discovery agent (Apollo integration) | 1 day | Week 1 |
| 6 | CRM sync (Attio) | 0.5 day | Week 1 |
| 7 | All cron timers configured | 0.5 day | Week 1 |
| 8 | Weekly learning agent (playbook builder) | 1 day | Week 2 |
| 9 | Follow-up sequence automation | 1 day | Week 2 |
| 10 | LinkedIn content loop | 1 day | Week 3 |
| 11 | Demo prep automation | 0.5 day | Week 3 |
| **Total** | | **~9 days** | 3 weeks |

---

## Success Metrics

| Metric | Current (Manual) | Target (3 Months) |
|--------|-----------------|-------------------|
| Prospects discovered per week | ~10 (manual research) | 100+ (automated) |
| Personalized emails sent per week | ~20 (manual) | 50+ (semi-automated drafts) |
| Reply rate | Unknown (not tracked) | 5%+ positive reply rate |
| Time spent on outreach per week | 10+ hours | < 2 hours (review drafts + send) |
| Pipeline growth | ~20 new contacts/month | 200+ new contacts/month |
| CRM accuracy | Inconsistent manual updates | Auto-synced after every batch |
| Playbook learnings | Zero (no system) | 50+ confirmed findings after 3 months |

---

## Key Principles

1. **Drafts only. Never auto-send.** Camren reviews every email before it goes out.
2. **The playbook is the asset.** After 6 months, the playbook contains distilled knowledge about what converts lawyers in every practice area, geography, and firm size. No competitor has this.
3. **Start with what we have.** Backfill batch #1 and #2 data into SQLite immediately. Don't wait to start tracking.
4. **Compound, don't restart.** Every email's result feeds the next batch. Never throw away learnings.
5. **National doesn't mean spray-and-pray.** The agent personalizes every email using firm-specific context. Volume with relevance, not volume alone.

---

*This system turns Camren from a single founder sending 20 emails a week into a machine that discovers, enriches, scores, emails, tracks, and learns across 14+ metro areas simultaneously. The playbook compounds. The pipeline grows. The emails get better every week. That's how one person does the work of ten.*
