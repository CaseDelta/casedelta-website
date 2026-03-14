# Medical Malpractice Demo Sprint — Handoff Document
**Created:** March 12, 2026
**Author:** Claw (Claude Code agent for Camren Hall)
**Purpose:** Everything an engineer needs to pick up the med mal demo sprint from scratch
**Target Repository:** `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-cloud/aws`

---

## TABLE OF CONTENTS
1. [Business Context — Why This Sprint Exists](#1-business-context)
2. [The Customer — Kirk Goza & Goza & Honnold](#2-the-customer)
3. [What They Asked For — Explicit Deliverables](#3-what-they-asked-for)
4. [Current CaseDelta Architecture](#4-current-casedelta-architecture)
5. [The Gaps — What Doesn't Exist Yet](#5-the-gaps)
6. [Test Data — What We Have](#6-test-data)
7. [Reference Outputs — What the Deliverable Should Look Like](#7-reference-outputs)
8. [Sprint Tracks — The Execution Plan](#8-sprint-tracks)
9. [Competitor Intelligence](#9-competitor-intelligence)
10. [Technical Implementation Guide](#10-technical-implementation-guide)
11. [The Smoking Gun Benchmark Strategy](#11-smoking-gun-benchmark)
12. [Follow-Up Actions After Sprint](#12-follow-up-actions)
13. [Key Files & Locations](#13-key-files)
14. [Strategic Context](#14-strategic-context)

---

## 1. Business Context — Why This Sprint Exists <a name="1-business-context"></a>

**CaseDelta** is a legal AI SaaS platform targeting 5-50 attorney boutique law firms. It integrates with existing case management (Clio, MyCase), provides secure AI document analysis (PII never leaves the ecosystem), and positions itself as "another associate in your firm" — not a tool, but a colleague.

**The AI associate is named Delta.** Delta connects to a firm's Clio, runs in the background, and surfaces findings proactively. The core product loop: documents come in → Delta analyzes → findings queued for attorney review → attorney approves/dismisses. Think "morning briefing" not "chatbot."

**Current stage:** Pre-revenue. One active pilot (Barnds Law — family law). ~1,419 companies and ~954 people in Attio CRM. First 5 paying customers must come from warm contacts in Kansas City.

**This sprint exists because:** On March 12, 2026, founder Camren Hall had a meeting with Kirk Goza (Founding Partner, Goza & Honnold LLC) — a 30-year veteran medical malpractice and mass tort plaintiff attorney in KC. Kirk gave multiple strong buy signals and explicitly asked for sample medical chronology outputs. CaseDelta has never processed medical records, never tested at 500+ pages, never built chronology generation, and has zero benchmarking. This sprint closes that gap so we can send Kirk's office manager Roxene a compelling demo artifact.

**The constraint:** Days, not weeks. Kirk asked for "examples of medical chronologies and timelines" — we need to deliver before the opportunity cools.

---

## 2. The Customer — Kirk Goza & Goza & Honnold <a name="2-the-customer"></a>

### Firm Profile
- **Firm:** Goza & Honnold, LLC — `gohonlaw.com`
- **Location:** 9500 Nall Ave, Overland Park, KS 66207
- **Size:** 11 attorneys, 11-50 total staff
- **Practice:** Medical Malpractice, Products Liability, Mass Tort (plaintiff side)
- **Founded:** 2005 by Kirk Goza (left defense side) and Honnold
- **Revenue est:** $1M-$10M ARR
- **ICP Fit:** Excellent — top 5% of prospects

### Key People
- **Kirk J. Goza** — Founding Partner. 30-year trial lawyer. Fellow of the American College of Trial Lawyers (~1% of lawyers). Top 50 in KS and MO for 20 consecutive years. Key positions in Xarelto, Power Morcellator, JUUL/Altria MDLs. **Vision holder but NOT the software buyer.** Email: kgoza@gohonlaw.com
- **Roxene** — Office Manager / IT Gatekeeper. **The actual software decision-maker.** Kirk said so in the first 90 seconds of the meeting. She handles IT, programs, and will send the firm-wide memo about CaseDelta. Last name unknown — confirm via her outbound email. **All follow-up communications should be directed to Roxene.**
- **Unknown staff member (speaker_3 in transcript)** — Paralegal or associate who attended the meeting and asked technical questions about the Clio integration. Identify via Roxene.

### CRM Status (Attio)
- Record ID: `4715d558-642c-466e-8897-e6b45cc12e37`
- Pipeline status: **Met** (updated Mar 12)
- Last contact: Mar 12, 2026
- Next follow-up: **Mar 13, 2026** — send chronology examples to Roxene

### Meeting Transcript
Full transcript saved at: `openclaw-vps/transcript_goza.txt`
Full debrief saved at: `openclaw-vps/casedelta_documents_new/meetings/med_mal/GOZA.md`

---

## 3. What They Asked For — Explicit Deliverables <a name="3-what-they-asked-for"></a>

Kirk and Roxene made these specific requests during the March 12 meeting:

### Deliverable 1: Sample Medical Chronology (Kirk's explicit ask)
> "Do you have like examples of medical chronologies and timelines and things? I think it would be good for us to see examples."

A formatted medical timeline showing dates, providers, events, and source page citations. This is what their nurse practitioners produce at $35/hour over 15-20 hours. The deliverable is a PDF or document artifact — not a chat response.

### Deliverable 2: On-Demand Case Summary (Kirk's personal use case)
> "Pull up the documents in case so-and-so and do a medical summary for me."

The reactive mode: give Delta a case, get back a synthesis across all records.

### Deliverable 3: MDL Document Intelligence (Kirk's big vision)
> "What are the 50 best documents to cross-examine this witness? What are the 100 best documents for an opening statement?"

Query across a massive document corpus and get ranked, cited results. This is the long-term play — not the immediate deliverable but the thing that gets Kirk deeply engaged.

### Deliverable 4: Proactive Morning Briefing (Roxene's use case)
> "Every morning I'm gonna come in and I'm gonna get a report from CaseDelta that says, 'This is what happened in Clio yesterday.'"

The proactive loop — Delta monitors and reports without being asked.

**Priority for this sprint:** Deliverable 1 (chronology artifact). Everything else is future.

---

## 4. Current CaseDelta Architecture <a name="4-current-casedelta-architecture"></a>

**Codebase location:** `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-cloud/aws`

### Architecture Overview
- **Compute:** AWS Lambda (21 functions across 11 microservices)
- **Orchestration:** Step Functions state machine for document processing
- **Storage:** S3 (3 buckets: original, processed, downloads), Supabase PostgreSQL
- **AI/LLM:** AWS Bedrock (Qwen3-VL for OCR, GPT-OSS-120B for synthesis, Amazon Nova for cheap text)
- **RAG:** S3 Vectors + Amazon Titan Embeddings V2 (512-dim)
- **API:** API Gateway (HTTP API with JWT auth)
- **Notifications:** SQS (email), SNS (Slack)
- **IaC:** AWS SAM (CloudFormation)

### Document Processing Pipeline (4-Tier)

```
Upload PDF → S3 trigger
    ↓
Tier 1: Document Ingestion (Lambda)
    - CloudConvert PDF→PNG (50MB max)
    - PyMuPDF for PDF processing
    - Idempotency checking
    ↓
Tier 2: Page Analysis (Step Functions, parallel, MaxConcurrency 10,000)
    - Qwen3-VL 235B vision model on each PNG page
    - OCR: image → text extraction
    - Stores to s3_document_pages table
    ↓
Tier 3: Document Synthesis (Lambda)
    - GPT-OSS-120B for document-level summarization
    - Classification (type, date, parties)
    - Abstracted filename generation
    - Markdown analysis content
    ↓
Tier 3.5: RAG Indexing (Lambda)
    - Amazon Titan Embeddings V2 (512-dim, L2-normalized)
    - S3 Vectors storage (NOT Bedrock KB — direct API for higher concurrency)
    - Chunking: ~1200 chars, 200-char overlap
    - Contextual headers via Amazon Nova Micro
    - 20 concurrent embedding workers
    - Similarity threshold: 0.15 (cosine distance)
    ↓
Tier 4: Post-Processing (EventBridge trigger)
    - Bates stamping (PyPDF2 + reportlab)
    - Final validation
```

### AI Models in Use

| Model | Purpose | Cost/1M tokens | Context Window |
|---|---|---|---|
| Qwen3-VL 235B | Vision OCR (page-level) | $0.53 in / $2.66 out | ~128K |
| GPT-OSS-120B | Text synthesis | $0.15 in / $0.60 out | ~200K |
| Amazon Nova Lite | Cheap text tasks | $0.06 in / $0.24 out | ~300K |
| Amazon Nova Micro | Context header gen | Low | ~64K |
| Amazon Titan Embeddings V2 | Document vectorization | ~$0.02/1M | 8192 tokens |

### Agent Capabilities (Lyra S2)
The conversational agent uses AWS Bedrock Converse API with tool calling.

**Always-available tools:**
- `search_documents` — semantic search across case documents (RAG)
- `get_page_content` — retrieve full OCR text by page_id or document+page
- `list_documents` — list all documents with types and summaries
- `remember` — store user/firm memory
- `web_search` / `read_webpage` — external web
- `create_case` — create new case

**Integration tools (when connected):**
- Clio: `search_clio` (matters, contacts, documents, notes, activities, tasks)
- MyCase: `search_mycase`
- GoHighLevel: `get_pipeline_overview`, `search_gohighlevel`
- Google: `search_gmail`, `search_google_calendar`, `create_google_calendar_event`, `search_google_drive`, etc.
- Microsoft: `search_outlook`, `search_outlook_calendar`, `search_onedrive`, etc.

**Agent limits:** Max 30 iterations. Context compaction at ~100K tokens (keeps last 10 messages uncompacted).

### Clio Integration (Current State)
- OAuth flow: Working (private app, callback handled)
- Capabilities: Read-only — contact search and matter search only
- Missing: Deep matter details, write operations, document pull/push, time tracking

### What Works Today
- Document OCR via Qwen3-VL vision model
- Document classification + summarization
- Semantic search (RAG with S3 Vectors)
- Agent Q&A with tool calling
- Clio OAuth + read-only search
- Bates stamping
- Multi-firm data isolation
- Batch processing via Step Functions
- Email processing (SQS + Lambda)

### What Does NOT Work / Exist
- **No chronology generation** — the agent can synthesize answers conversationally but cannot produce a formatted timeline document
- **No medical-record-specific parsing** — treated as generic documents
- **No report/artifact generation** — everything is chat text, not downloadable PDFs
- **No 500+ page testing** — pipeline untested at scale
- **No needle-in-a-haystack benchmarking** — RAG similarity threshold (0.15) is unvalidated for precision in large document sets
- **Clio integration is shallow** — read-only contact/matter search, no document pull
- **No proactive loop** — no morning briefing, no event-driven alerts, no approval queue UI

---

## 5. The Gaps — What Doesn't Exist Yet <a name="5-the-gaps"></a>

### Gap 1: No Medical Records Ever Tested
The OCR pipeline works on generic documents. Medical records are different: handwritten physician notes, multi-column nursing flow sheets, faxed records with artifacts, lab result tables, stamps, signatures. OCR quality on these is unknown.

### Gap 2: No Chronology Generation Feature
There is no `generate_chronology` capability. The agent answers questions conversationally but cannot produce a structured medical timeline with: Date | Provider | Facility | Event/Finding | Source Page. This is the #1 deliverable Kirk asked for.

### Gap 3: No PDF Report Output
Everything is conversational (chat). Kirk wants downloadable artifacts — a chronology PDF, a case summary. The system produces chat text, not formatted documents. **reportlab is already in the codebase** (used for Bates stamping) so PDF generation infrastructure exists.

### Gap 4: Never Tested at 500+ Pages
The architecture supports it (Step Functions parallelizes at 10,000 concurrency, embeddings at 20 workers). But it's never been tested. Potential issues: token costs at scale, processing time, RAG retrieval degradation with thousands of chunks, Step Functions timeout edge cases.

### Gap 5: No Retrieval Accuracy Benchmarking
The RAG pipeline's 0.15 similarity threshold is unvalidated. Can it find one critical nursing note in 3,000 pages? We don't know. This is the entire value proposition.

---

## 6. Test Data — What We Have <a name="6-test-data"></a>

### Real Medical Records from Federal Court Filings
**Location:** `/tmp/med_records_search/` (24 PDFs, 243MB total, 2,655+ verified pages)

These are ACTUAL medical records filed as exhibits in federal cases on CourtListener (free, public). They are authentic — scanned paper records with handwriting, Bates stamps, real clinical content.

**Top files for testing:**

| File | Pages | Case | Contents | Best For |
|---|---|---|---|---|
| `burch_southern_hills_137pg.pdf` | 137 | Burch v. HCA Healthcare (D. Nevada) | Complete hospital records — neurology notes, provider reports, diagnostics, vitals, labs, discharge notes, medication records. **Scanned images only (no text layer)** — 54MB | **Hardest OCR test.** Pure image PDFs, exactly how production records look. If the pipeline handles this, it handles anything. |
| `burch_hca_323pg.pdf` | 323 | Same case, additional records | More hospital records from same case | Volume + OCR stress test |
| `triolo_us_122pg.pdf` | 122 | Triolo v. United States (M.D. Florida) — **FTCA medical malpractice** | Complete pain clinic records: intake forms, pain assessments, consent, health history, SOAP notes, **operative reports** (lumbar facet arthropathy), physical exams with vitals, MRI findings, medication lists, billing. Bates-stamped SJIPS_0001-0122. | **Primary demo case.** This IS a real med mal case record set. Handwritten patient forms, mixed scanned/digital, Bates-stamped. |
| `alford_nfl_406pg.pdf` | 406 | Alford v. NFL (D. Maryland) | 15-year multi-provider medical history: H&Ps, MRI reports, operative reports, PT notes, workers comp, team injury reports. Bates-stamped DL-00221 through DL-00620+. | Volume test. Multi-provider retrieval test ("find all MRI reports across all providers"). |
| `carson_rankin_48pg.pdf` | 48 | Carson v. Rankin County (S.D. Mississippi) | Complete patient record from **intake through death.** COWS assessments, medication administration, nursing notes, death narrative. Wrongful death case. | Focused, dense, complete chronological arc. Perfect for chronology generation test. |
| `alencar_aetna_131pg.pdf` | 131 | Alencar v. Aetna (D. Massachusetts) | Multi-provider orthopedic + hospital records: problem lists, encounter notes, MRI reports, progress notes, pre-surgical clearance, insurance claims. | Multi-provider, multi-document-type test. |
| `dean_wexford_625pg.pdf` | 625 | Dean v. Wexford Health Source (C.D. Illinois) | Court-appointed expert report reviewing healthcare system. Contains individual patient case reviews with clinical detail. | Scale test (625 pages in one file). |

**IMPORTANT:** These files are in `/tmp/` and will be lost on reboot. **Copy them to a persistent location before starting the sprint:**
```bash
cp -r /tmp/med_records_search/ /Users/camrenhall/Documents/CaseDelta/Github/casedelta-cloud/test_data/med_records/
```

### Verified Content of Key Files
- **Triolo (122pg):** Pages 1-2 are the subpoena cover page. Pages 3+ are ACTUAL medical records with handwritten patient names, handwritten clinical notes ("Lower back / Neck"), circled pain ratings, patient signatures, staff witness signatures. Page 5 is a new patient intake form with handwritten demographics. Page ~71 has an operative report (lumbar facet joint arthropathy, lumbar spondylosis). SOAP notes throughout.
- **Burch (137pg):** Pure scanned images with NO extractable text layer. This forces the OCR pipeline to work on raw images — exactly the format Kirk's firm receives.
- **Carson (48pg):** CorEMR electronic health record system printout. Full patient history from medical intake through death. Includes COWS (Clinical Opiate Withdrawal Scale) assessments, medication administration records, medical watch rounds documentation.

### Synthetic Data Sources (For Volume)
- **Synthetic-EHR.com** — API-based, instant generation, reportedly can create custom med-mal cohorts. Unverified — needs signup and evaluation.
- **Synthea (MITRE)** — Free, 1M+ patients, FHIR/C-CDA/CSV. Not PDFs — would need conversion. Download: `synthea.mitre.org/downloads`
- **MedSynth** — Python package generating records with OCR artifacts. Outputs NDJSON. `pip install medsynth`
- **Kaggle MTSamples** — 4,998 medical transcriptions across 40 specialties. CSV. Free. `kaggle.com/datasets/tboyle10/medicaltranscriptions`

### Key Research Finding
> "No one sells ready-made realistic medical malpractice record PDFs. This is a genuine market gap that every legal tech company faces."

Full research saved at: `openclaw-vps/research/MEDICAL_RECORDS_DEMO_DATA_RESEARCH.md`

---

## 7. Reference Outputs — What the Deliverable Should Look Like <a name="7-reference-outputs"></a>

### Medical Chronology Format
The standard format attorneys expect from a nurse practitioner:

```
Date       | Provider        | Facility          | Event/Finding                           | Source
-----------+-----------------+-------------------+-----------------------------------------+--------
2024-01-15 | Dr. Smith, MD   | St. Luke's        | Admitted w/ chest pain, BP 180/110       | Doc 3, p.2
2024-01-15 | RN Williams     | St. Luke's ICU    | Vitals q15min ordered, first set normal  | Doc 7, p.14
2024-01-16 | Dr. Smith, MD   | St. Luke's        | Echo ordered, EF 35%                    | Doc 3, p.4
```

### Reference Chronology Downloads (Already Downloaded)
- **Godoy Medical Full Fact Chronology** — `godoymedical.net/wp-content/uploads/2021/11/Sample-Full-Fact-Chron.pdf`
- **Godoy Medical Simple Fact Chronology** — `godoymedical.net/wp-content/uploads/2021/11/Sample-Simple-Fact-Chron.pdf`
- **InQuery.ai Templates** — `inquery.ai/post/chronology-templates/` (free Excel/Google Sheets)
- **MedSum Legal Samples** — `medsumlegal.com/our-samples/`
- **LezDo TechMed Samples** — `lezdotechmed.com/medical-chronology-samples/`

### What These References Show
The chronology must include:
- Dates (chronological order)
- Provider name and credentials
- Facility name
- Event description (clinical, concise)
- Source reference (document name + page number or Bates number)
- Optional: significance/comments column for attorney notes

**Output format:** PDF (primary), also exportable as Excel/CSV.

---

## 8. Sprint Tracks — The Execution Plan <a name="8-sprint-tracks"></a>

### Track A: Pipeline Validation on Real Records (PRIMARY)

**Goal:** Prove CaseDelta can process real medical records and produce useful output.

**Steps:**
1. Copy test data to persistent location
2. Upload Triolo (122pg real med mal case) to CaseDelta as a new case
3. Monitor the pipeline: ingestion → OCR → synthesis → RAG indexing
4. Evaluate OCR quality on handwritten forms (pages 3-5 have handwritten patient info)
5. Test agent Q&A:
   - "What is the patient's name and date of birth?"
   - "What was the preoperative diagnosis?"
   - "When was the lumbar facet procedure performed?"
   - "What medications was the patient prescribed?"
   - "What were the patient's vital signs at the most recent visit?"
6. Document results: what worked, what didn't, what needs improvement

**Then test harder:**
7. Upload Burch (137pg, scanned images, NO text layer) — hardest OCR test
8. Upload Alford (406pg, multi-provider) — volume + multi-provider test
9. Test cross-document queries: "Find all MRI reports" / "List all procedures by date"

### Track B: Build Chronology Generation Feature (CRITICAL DELIVERABLE)

**Goal:** New capability that produces a structured medical chronology from a case's documents.

**Implementation approach:**

Option 1 — New agent tool `generate_chronology`:
1. Retrieves all pages for all documents in a case
2. Sends pages through a medical-event extraction prompt (date, provider, facility, event, significance)
3. Aggregates all extracted events
4. Sorts chronologically, deduplicates
5. Formats into standard chronology template
6. Generates PDF via reportlab (already in codebase for Bates stamping)

Option 2 — Standalone Lambda:
1. Triggered via API endpoint: `POST /cases/{case_id}/chronology`
2. Reads all document pages from the database
3. Processes in batches through the extraction model
4. Returns structured JSON + generates PDF
5. Stores in S3 downloads bucket

**The extraction prompt is the hardest part.** It needs to:
- Identify date-stamped medical events (not just any text with a date)
- Distinguish significant clinical events from routine charting
- Extract provider name and credentials
- Extract facility name
- Produce concise clinical descriptions (not verbatim quotes)
- Reference source document and page number

**Suggested extraction prompt structure:**
```
You are a legal nurse consultant reviewing medical records for a plaintiff attorney.

For each page of medical records provided, extract ALL significant medical events.

For each event, provide:
- date: The exact date (and time if available) of the event
- provider: Name and credentials of the healthcare provider (e.g., "Dr. Jane Smith, MD")
- facility: Name of the healthcare facility
- event: Concise clinical description of what happened (1-2 sentences)
- significance: Why this matters clinically (optional, 1 sentence)
- page_reference: The page number in the source document

A "significant medical event" includes:
- Admissions, discharges, transfers
- Diagnoses (new or changed)
- Procedures (surgical, diagnostic, therapeutic)
- Medication changes (new, stopped, dosage changed)
- Abnormal test results (labs, imaging, vitals outside normal range)
- Clinical assessments that change the care plan
- Patient complaints or symptoms reported
- Consultations requested or received
- Complications or adverse events
- Nursing observations of clinical changes

Do NOT include:
- Routine vital signs that are within normal limits (unless they change significantly)
- Administrative entries (insurance, billing) unless clinically relevant
- Duplicate entries of the same event
```

### Track C: PDF Artifact Generation

**Goal:** Produce a downloadable chronology PDF matching the Godoy Medical reference format.

**Implementation:** Use reportlab (already in codebase at `lambda/document_processing/` for Bates stamping).

The PDF should include:
- Header: "MEDICAL CHRONOLOGY — [Case Name]"
- Subheader: "Generated by CaseDelta | [Date] | [Page Count] pages reviewed"
- Table with columns: Date | Provider | Facility | Event/Finding | Source
- Page numbers
- Footer: "This chronology was generated by AI and should be reviewed by qualified personnel."

### Track D: Smoking Gun Benchmark (see Section 11)

### Track E: Competitor Demo (Parallel)
- Sign up for Superinsight.ai free demo (1,000 pages free)
- Upload Triolo to their system
- Compare their chronology output to CaseDelta's
- Document differences for competitive positioning

---

## 9. Competitor Intelligence <a name="9-competitor-intelligence"></a>

### Goza's Current Stack (What CaseDelta Competes With)

| Tool | Annual Cost (Est.) | CaseDelta Advantage |
|---|---|---|
| **Westlaw CoCounsel** | ~$6,000/yr ($500/mo) on top of Westlaw | Kirk calls it "that stupid thing." Does "crappy job of chronologies." Hard 50-result cap on searches. Locked in 18 more months. CaseDelta supplements now, replaces when contract expires. |
| **Pattern Data** | Enterprise pricing (est. $20K-$100K+/MDL) | They're the dominant mass tort document review platform (30+ litigations, 1.2M+ cases, including JUUL, Roundup, Camp Lejeune). Kirk's complaint: "not inexpensive" + third-party data access concerns. CaseDelta is in-house, no data leaves. |
| **Nurse Practitioner Chronologies** | ~$500-$2,500/case ($35/hr × 15-20 hrs) | CaseDelta automates the chronology. Nurse practitioner engagement becomes shorter and more targeted (clinical judgment on CaseDelta's output, not building from scratch). |
| **Custom MDL AI System** | Unknown (hired a software engineer) | Kirk has a custom closed-Claude deployment for one MDL — querying "what are the 50 best documents for cross-exam." CaseDelta = the productized, reusable version from Day One of the next case. |

### Direct AI Chronology Competitors
- **Superinsight.ai** — #1 AI medical chronology service. 500+ attorneys. Claims 70% time savings, 15-30 min processing. Free demo: 1,000 pages. Sign up and compare.
- **InQuery.ai** — AI medical record review. Source-linked chronologies. Free templates available.
- **Dodon.ai** — AI medical chronology + record summaries.
- **Pattern Data** — Mass tort focused. Court-appointed settlement administrator.

---

## 10. Technical Implementation Guide <a name="10-technical-implementation-guide"></a>

### Step 1: Copy Test Data
```bash
mkdir -p /Users/camrenhall/Documents/CaseDelta/Github/casedelta-cloud/test_data/med_records
cp /tmp/med_records_search/*.pdf /Users/camrenhall/Documents/CaseDelta/Github/casedelta-cloud/test_data/med_records/
```

### Step 2: Upload Triolo to CaseDelta
Use the existing upload endpoint:
```
POST /v1/documents/upload
```
Or upload via the S3 trigger path — place the PDF in the original documents bucket with the proper key pattern:
```
original_case_id_{case_uuid}_id_{batch_uuid}/triolo_us_122pg.pdf
```

### Step 3: Monitor Pipeline Execution
The Step Functions state machine `document_analysis.asl.json` orchestrates:
```
ListPNGFiles → CheckFilesFound → ParallelOCR (Map) → DocumentSummary → RAGIndex → EmitCompletionEvent
```

Check CloudWatch logs for each Lambda in the chain:
- `document_ingestion` — PDF → PNG conversion
- `page_analysis` — Qwen3-VL OCR on each page
- `document_analysis` — GPT-OSS-120B synthesis
- `rag/indexer` — Titan embeddings + S3 Vectors indexing

### Step 4: Test Agent Q&A
```
POST /v1/assistant/ask
{
  "case_id": "<case_id>",
  "message": "What is the patient's preoperative diagnosis?"
}
```
Poll: `GET /v1/assistant/runs/{run_id}`

### Step 5: Build Chronology Generation

**Key files to modify/create:**

1. **New Lambda or agent tool** — `lambda/lyra_s2/tools/generate_chronology.py` (or new Lambda)
2. **Extraction prompt** — Add to `lambda/shared/ai/ai_config.yaml`
3. **PDF generation** — Extend the existing reportlab code at `lambda/document_processing/`
4. **New API endpoint** — `POST /v1/cases/{case_id}/chronology`

**The extraction flow:**
```python
# Pseudocode
def generate_chronology(case_id):
    # 1. Get all document pages for this case
    pages = get_all_pages(case_id)

    # 2. For each page, extract medical events
    all_events = []
    for page in pages:
        events = extract_medical_events(page.content, page.document_name, page.page_number)
        all_events.extend(events)

    # 3. Sort chronologically, deduplicate
    all_events.sort(key=lambda e: e['date'])
    all_events = deduplicate(all_events)

    # 4. Generate PDF
    pdf = render_chronology_pdf(all_events, case_name)

    # 5. Store in S3 downloads bucket
    s3.put_object(Bucket=downloads_bucket, Key=f"chronologies/{case_id}.pdf", Body=pdf)

    return {"chronology": all_events, "pdf_url": presigned_url}
```

### Step 6: Benchmark & Iterate
After generating the chronology from Triolo:
1. Manually verify 10 entries against the source records
2. Check: Are dates correct? Are providers attributed correctly? Are findings accurately described?
3. Check: Did it miss any significant events?
4. Check: Are source page references correct?
5. Compare against the Godoy Medical reference format

---

## 11. The Smoking Gun Benchmark Strategy <a name="11-smoking-gun-benchmark"></a>

### Concept
Don't generate a full 500-page synthetic case. Take the real Triolo file (122 pages) and INSERT 5-10 synthetic pages at known locations. These pages contain specific, critical findings that we can benchmark against.

### Why This Works
- 122 pages of real records provide authentic noise and context
- 5-10 planted pages are realistic because they're surrounded by real data
- We know exactly what the system should find and where
- We can measure precision (did it find the planted finding?) and recall (did it also find real findings?)

### Suggested Planted Findings
1. **Page ~35:** A nursing note documenting the RN called the attending physician about a medication reaction (tachycardia, BP spike). No callback documented for 3 hours. → Tests: Can the system identify a standard-of-care deviation?
2. **Page ~65:** A lab result showing critically elevated potassium (K+ 6.8) that was not flagged or acted upon until the next day. → Tests: Can the system identify abnormal lab values?
3. **Page ~95:** A progress note with a date inconsistency — the physician references "the surgery on March 5" but the operative report shows the surgery was March 3. → Tests: Can the system catch factual inconsistencies across documents?

### How to Insert
Use PyPDF2 (already in the codebase):
```python
from PyPDF2 import PdfReader, PdfWriter

reader = PdfReader("triolo_us_122pg.pdf")
writer = PdfWriter()

for i, page in enumerate(reader.pages):
    if i == 34:  # Insert before page 35
        writer.add_page(synthetic_nursing_note_page)
    writer.add_page(page)

writer.write("triolo_augmented.pdf")
```

Generate the synthetic pages as PDFs using reportlab, formatted to match the St. Joseph Interventional Pain Specialists document style visible in the Triolo file.

---

## 12. Follow-Up Actions After Sprint <a name="12-follow-up-actions"></a>

### Immediate (within 24 hours of sprint completion)
1. **Email Roxene** with:
   - Thank you to Kirk for the meeting
   - 1-2 example medical chronology outputs (the PDF artifact from the sprint)
   - Brief capability overview focused on: chronology automation, private enterprise Claude, Clio integration
   - Reminder about Kirk's referral offer: "Kirk mentioned he'd send some names of firms doing similar work"
   - Propose a 30-minute follow-up with Roxene to walk through the Clio integration

2. **Update Attio CRM:**
   - Kirk: pipeline_status → Follow-up, last_contact → sprint completion date
   - Add Roxene as a Person record linked to Goza & Honnold if not already there

### Short-term (within 2 weeks)
3. **Demo meeting with Roxene:** Show chronology output, show MDL document query use case, show morning briefing concept
4. **Propose 60-day pilot:** "Pick a case — either an active med mal matter or a mass tort with significant document volume. We run CaseDelta for 60 days alongside what you're using. You see the output."
5. **Follow up on Kirk's referral list** — other PI/mass tort firms

### Strategic Context for the Demo
- **Biggest threat to securing this deal:** No burning platform. Kirk has patchwork solutions for every individual pain point (nurse practitioners, Pattern Data, CoCounsel, custom MDL system). The value of CaseDelta is integrative — it replaces multiple vendors — but integrative value is harder to close on than solving one acute pain.
- **Entry point:** The nurse practitioner / individual med mal chronology use case has zero lock-in and recurring per-case cost. Start there.
- **Pitch framing:** "Let's start with one thing. Your next med mal intake. Send me the records, I'll have a chronology back before your nurse practitioner picks up the phone."

---

## 13. Key Files & Locations <a name="13-key-files"></a>

### This Repository (openclaw-vps)
| File | Purpose |
|---|---|
| `transcript_goza.txt` | Full meeting transcript (speaker-tagged, timestamped) |
| `casedelta_documents_new/meetings/med_mal/GOZA.md` | Meeting debrief + strategic analysis |
| `casedelta_documents_new/MEDMAL_SPRINT_HANDOFF.md` | This document |
| `casedelta_documents_new/casedelta/CASEDELTA_NARRATIVE.md` | Product narrative ("tool vs. colleague"), Delta identity, UX philosophy |
| `casedelta_documents_new/casedelta/CASEDELTA_CONSOLIDATED.md` | Full strategy doc: pitch arsenal, feature set, competitive landscape, GTM |
| `research/MEDICAL_RECORDS_DEMO_DATA_RESEARCH.md` | Full research on medical record data sources |

### CaseDelta Repository (casedelta-cloud/aws)
| Path | Purpose |
|---|---|
| `lambda/document_processing/` | Document ingestion, page analysis, synthesis |
| `lambda/shared/ai/ai_config.yaml` | Model configs and system prompts |
| `lambda/shared/infrastructure/bedrock.py` | Bedrock model constants, retry logic |
| `lambda/shared/infrastructure/rag_vectors.py` | Vector embedding, chunking, retrieval |
| `lambda/lyra_s2/` | Agent (Lyra S2) — conversational AI with tool calling |
| `statemachine/document_analysis.asl.json` | Step Functions pipeline orchestration |
| `infrastructure/app-stack/template.yaml` | AWS SAM stack (all nested stacks) |
| `lambda/platform_api/app.py` | Platform API endpoints |
| `lambda/case_management/app.py` | Case management API endpoints |

### Test Data (MUST COPY FROM /tmp/ BEFORE REBOOT)
| File | Location | Pages | Use |
|---|---|---|---|
| All 24 PDFs | `/tmp/med_records_search/` | 2,655+ | Copy to `casedelta-cloud/test_data/med_records/` |
| Triolo (primary) | `triolo_us_122pg.pdf` | 122 | Primary demo case (real FTCA med mal) |
| Burch (OCR test) | `burch_southern_hills_137pg.pdf` | 137 | Hardest OCR test (pure scanned images) |
| Alford (volume) | `alford_nfl_406pg.pdf` | 406 | Volume + multi-provider test |
| Carson (chronology) | `carson_rankin_48pg.pdf` | 48 | Focused chronology test (intake → death) |

---

## 14. Strategic Context <a name="14-strategic-context"></a>

### CaseDelta Positioning
- **Not a tool — a colleague.** Delta shows up, notices things, brings findings before you ask.
- **Never lead with "AI."** Lead with the outcome: more capacity, less admin.
- **The paralegal comparison:** A paralegal is $50-70K/year. Delta is $6-12K/year. Same cognitive labor.
- **Security framing:** "Delta works inside your firm's walls and never leaves." PII never touches OpenAI, Google, or any third party.
- **The Harvey gap:** Harvey owns Am Law 100 (25-seat minimum, $1K/lawyer/month). CaseDelta owns the 80% they ignore.
- **Moat (in order):** (1) Firm-specific institutional memory, (2) PII enclave, (3) Integration hub

### Kirk Goza Specific Context
- He's seen everything. 30 years. Don't pitch down.
- He already has a custom AI system for one MDL — CaseDelta is competing with something that works, not nothing.
- The "send us your resume" comment means he might try to hire Camren as a custom developer. Position CaseDelta as the product, with Camren's involvement as a premium pilot service.
- Roxene is the champion. Kirk gives vision. Roxene executes.
- Kirk offered referrals to other PI/mass tort firms. This is potentially the highest-value outcome of the entire engagement. Do not let it drop.

### The Enterprise Claude Angle
During the meeting, Roxene asked: "Are we getting a version of Claude that's closed so that we can use it more?" Kirk said they can't — enterprise Claude requires 80+ users. Camren revealed having an enterprise agreement. This is a KEY differentiator. CaseDelta gives small firms private enterprise Claude without the 80-user minimum.

### Med Mal Domain Knowledge
- **Standard of care** — the benchmark for negligence
- **Causation** — proving negligence caused the harm (the harder fight)
- **Chronology** — the timeline of care, built from records. This is what paralegals/nurse practitioners spend days creating.
- **The smoking gun** — the one entry in thousands of pages that makes or breaks the case (nursing note showing doctor didn't respond, lab value that was ignored)
- **MDL (Multi-District Litigation)** — when thousands of similar cases are consolidated. Kirk has been on steering committees for Xarelto (~25K cases, $775M settlement), Power Morcellator, JUUL/Altria.
- **Kirk's specific pain:** 5 million pages from opposing counsel in one MDL. "Keeping all that straight and in mind is like the most [challenging thing]."
- **Nurse practitioner chronology cost:** $35/hour × 15-20 hours = $500-$2,500/case
- **CoCounsel (Westlaw):** $500/month, 50-result search cap, unreliable citations, "crappy chronologies" — Kirk's words
- **Pattern Data:** Dominant mass tort doc review platform. 30+ litigations, 1.2M+ cases. Enterprise pricing. Data leaves the firm.

---

*This document is designed to be self-contained. An engineer reading only this document should be able to understand the business context, the customer requirement, the current system state, the gaps, the available test data, and the execution plan for the sprint.*
