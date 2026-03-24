# Engineering Handoff: Judicial Intelligence Network
**Author:** Camren Hall
**Date:** March 18, 2026
**Priority:** Critical path — this is CaseDelta's primary moat
**Reference:** `CASEDELTA_NARRATIVE.md` > "The Judicial Intelligence Network" section

---

## What We're Building

A system where every case that runs through CaseDelta automatically contributes anonymized intelligence about judges, opposing counsel, and jurisdictions — and every firm on the platform benefits from the aggregate. Think Waze: every driver contributes traffic data by driving. No one sees anyone else's route. Everyone gets better navigation.

The headline feature is the **Trifecta Brief**: when a new case enters CaseDelta, Delta automatically generates a Case Intelligence Brief covering the assigned judge's history, the opposing counsel's track record, and the jurisdiction's patterns — before the attorney opens the file.

---

## Architecture: Two Layers, Not Three

This is simpler than it sounds. There are two data concerns, not three:

### Layer 1: Firm Data (with RBAC)

This is the existing multi-tenant data model. Each firm's data is isolated. Within a firm, role-based access control determines visibility:

- **Standard visibility:** All firm users see it. Case outcomes, judge notes, general opposing counsel patterns logged by anyone at the firm.
- **Partner-only visibility:** A boolean flag on a record. When an attorney with a partner role tags an insight as sensitive (e.g., strategic assessment of opposing counsel, internal personnel concern, candid judge tendency note), it is filtered from non-partner views. Delta still ingests it for partner-level analysis, but it never surfaces to associates, staff, or discoverable outputs.

This is not a separate database. It's a permission flag on records within the existing firm data store. Standard RBAC.

### Layer 2: Aggregate Pipeline (new)

A separate data pipeline that:
1. Reads from firm-level case data on case closure (or on a scheduled basis)
2. Strips all identifying information (firm name, client names, case names, attorney names)
3. Extracts structured intelligence: judge ID, opposing counsel ID, jurisdiction, case type, outcome category, duration, motion outcomes
4. Writes to a shared aggregate stats layer accessible to all firms on the platform

The aggregate layer is **read-only for firms** — they query it, they never write to it directly. The pipeline populates it from their firm data automatically.

---

## Audit: What Do We Have Today?

Before building anything new, audit the current codebase and infrastructure against these requirements. For each item, answer: **have it / partially have it / don't have it**, and if partially or don't, what's the gap.

### Data Model

- [ ] **Case records store structured metadata:** judge name/ID, opposing counsel name/ID, jurisdiction (court + county + state), case type/practice area, case outcome (won/lost/settled/dismissed), case duration (open date to close date)
  - If we don't capture these fields on case records today, this is the first thing to add. Everything downstream depends on structured case metadata.

- [ ] **People/entity records for judges and opposing counsel:** Do we have a way to represent judges and opposing counsel as entities that persist across cases? Or are they just free-text fields on a case?
  - We need normalized entities so we can aggregate across cases. "Judge Robert Miller" entered on 15 different cases by 8 different firms needs to resolve to one judge entity.
  - Consider: how do we handle deduplication? Fuzzy matching on name + court? Integration with state bar records or court clerk data for canonical IDs?

- [ ] **Role-based access control within a firm:** Can we flag a record (e.g., a note, an insight, a judge assessment) as partner-only? Does the current permission model support role-based visibility within a single tenant?
  - If not: this is a simple addition. A `visibility` field on relevant record types (`all` | `partner_only`), filtered in queries based on the requesting user's role.

### Integrations (Passive Data Collection)

- [ ] **Case management sync (Clio/MyCase):** Can we detect when a case is closed or its status changes? Can we read case metadata (judge, parties, outcome) from Clio's API?
  - Clio's API exposes matters, contacts, and custom fields. Audit what fields we currently pull and what we'd need to add.
  - This is the primary passive collection mechanism. If we can read case closure + structured metadata from Clio, the flywheel works without the attorney doing anything extra.

- [ ] **Email integration:** Do we read incoming email? Can we detect ruling notifications, settlement confirmations, hearing recaps?
  - This is secondary priority. The flywheel works without email integration (case management sync is sufficient for MVP). But email enriches the data significantly — attorneys email clients hearing outcomes, settlement terms, judge observations.

- [ ] **Calendar integration:** Can we read hearing dates and trial dates? Can we correlate a hearing date with a case outcome that arrives later?
  - This enables the "post-hearing nudge" — Delta follows up after a hearing to ask how it went. Secondary priority but high-value for active collection.

### Public Data Sources

- [ ] **Court records (CaseNet for Missouri, equivalents for other states):** Do we have any scrapers or API integrations for public court record systems?
  - CaseNet (Missouri) is the starting point. Documents are public, watermarked, sequential numbering. We need to parse: case filings, motions, orders, rulings, and outcomes. Filter out noise (certificates of service, routine filings).
  - This is the cold-start data source — it lets us populate judge/jurisdiction intelligence before firms contribute enough organic data.
  - Other states have their own systems. Don't boil the ocean — start with Missouri, expand state by state.

- [ ] **Bar records:** Can we look up attorney records (bar number, disciplinary history, firm affiliations) from state bar APIs or scraping?
  - This enriches opposing counsel profiles. Lower priority than court records.

### Aggregate Pipeline

- [ ] **ETL pipeline for anonymization + aggregation:** Do we have any infrastructure for reading from tenant databases, stripping PII, and writing to a shared analytics layer?
  - If we're on AWS Lambda + DynamoDB (or whatever the current data store is): can we run a scheduled Lambda that reads closed cases, extracts structured fields, anonymizes, and writes to a separate aggregate table/index?
  - If we're on a relational DB: this is a materialized view or a scheduled job.
  - Key concern: the anonymization must be genuine. No firm names, no client names, no case names, no attorney names in the aggregate layer. Only: judge ID, opposing counsel ID, jurisdiction, case type enum, outcome enum, duration, motion outcomes.

- [ ] **Entity resolution for judges and opposing counsel across firms:** When Firm A records "Judge R. Miller, Jackson County" and Firm B records "Robert Miller, 16th Circuit", these need to resolve to the same entity.
  - Options: fuzzy matching (name + court), canonical IDs from court records, or a human-in-the-loop resolution queue.
  - This is the hardest technical problem in the whole system. Get it right and the aggregate is gold. Get it wrong and the data is noise.

### Trifecta Brief Generation

- [ ] **Agent/prompt that generates the Trifecta Brief:** Given a case's judge, opposing counsel, and jurisdiction, can we query the aggregate layer + firm-specific data + public records and produce a structured intelligence brief?
  - This is an agent orchestration problem — CaseDelta's core competency. The agent needs to:
    1. Query aggregate stats for this judge (grant rates, verdict ranges, duration averages)
    2. Query firm-specific history with this judge (past cases, outcomes, notes)
    3. Query aggregate stats for this opposing counsel (settlement patterns, motion practice)
    4. Query firm-specific history with this opposing counsel
    5. Query jurisdiction patterns (venue-level stats)
    6. Pull from public records if available (recent rulings, case filings)
    7. Synthesize into a structured brief with clear sections

- [ ] **Trigger mechanism:** Can this fire automatically when a new case is created in CaseDelta (via Clio sync or manual entry)?
  - This should be an event-driven trigger, not a manual action. The attorney never asks for the brief — it's waiting when they open the case.

### Active Collection (Post-Hearing Nudges)

- [ ] **Scheduled follow-up after hearing/trial dates:** Can Delta send a follow-up message to the attorney after a hearing date on the calendar?
  - Pattern: calendar event for hearing -> hearing date passes -> Delta sends a nudge in the case thread: "How did the hearing go? Anything worth noting?"
  - Attorney's response is logged as a structured insight (tagged to judge + case + outcome type).
  - This is lower priority than passive collection. Build it after the core flywheel is working.

---

## Implementation Priority

**Phase 1 — Data foundation (do this first):**
1. Add structured case metadata fields (judge, opposing counsel, jurisdiction, case type, outcome, duration) to case records if they don't exist
2. Ensure Clio sync pulls these fields (or can be configured to)
3. Add partner-only visibility flag (RBAC) to relevant record types
4. Build normalized entity tables for judges and opposing counsel

**Phase 2 — Aggregate pipeline:**
5. Build the ETL job: read closed cases -> anonymize -> extract structured fields -> write to aggregate layer
6. Build entity resolution for judges and opposing counsel across firms (start simple: exact name + court match, then add fuzzy matching)
7. Build query APIs for the aggregate layer (stats by judge, by opposing counsel, by jurisdiction)

**Phase 3 — Trifecta Brief:**
8. Build the agent that generates the Trifecta Brief from aggregate + firm-specific + public data
9. Wire the trigger: new case created -> Trifecta Brief generated -> appears in case thread
10. Start with Missouri (CaseNet) as the public data source for cold-start intelligence

**Phase 4 — Active collection + expansion:**
11. Post-hearing nudges (calendar-triggered follow-ups)
12. Expand public data sources state by state
13. Email integration for passive outcome detection

---

## What This Is NOT

- This is not a separate product. It's a feature layer on the existing CaseDelta platform.
- This is not a data warehouse project. The aggregate layer is lightweight — structured stats, not document storage.
- This is not a machine learning project (yet). Phase 1-3 is structured data extraction, aggregation, and retrieval. ML/pattern detection can be layered on later once there's enough data.
- The entity resolution problem (Phase 2, step 6) is the only genuinely hard technical problem. Everything else is plumbing. Don't let entity resolution block the rest — start with exact matching and improve iteratively.

---

## Success Criteria

- A new case created in CaseDelta triggers a Trifecta Brief within 60 seconds
- The brief contains: judge history (if available), opposing counsel history (if available), jurisdiction patterns (if available), and a clear "no data yet" indicator for any axis without data
- Partner-only notes are invisible to non-partner users at the firm
- The aggregate pipeline runs on case closure with zero manual intervention
- No firm-identifying information exists in the aggregate layer (auditable)

---

## Reference Documents

- `CASEDELTA.md` > "The Intelligence Network: Delta Learns From Everyone" — three-tier intelligence system, Trifecta Brief design, passive flywheel, and network effect positioning
- `CASEDELTA.md` > "Competitive Landscape" — moat ranking (Intelligence Network moat is #1) and differentiation table
- `GROWTH_PLAYBOOK.md` > Phase 3 (Scale) — Intelligence Network beta launch, Trifecta Brief delivery, FOMO flywheel activation
- `casedelta_documents_new/meetings/employment/REMINGTON.md` — meeting debrief with Remington B. Smith (Ensz & Jester) that originated this strategy. Contains detailed practitioner pain points and workflow descriptions.
