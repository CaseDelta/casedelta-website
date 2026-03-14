## **Heidi Nowotny \- Immigration Law (07/14/2025)**

### **Current Tech Stack**

* **Camp Legal** (Immigration Law Software) \- likes it very much

### **Favorite Features in Current Tool**

* **Ability to put down notes on client**  
* **Pin notes** \- this is the main feature she uses

### **Unmet Needs**

**1\. LLM-Style Question Answering**

* Wishes current software **could answer questions like an LLM**  
* Google Drive \+ Gemini integration **not satisfying** for pulling answers across documents

**2\. Client Communication at Scale**

* **1,500 active cases** simultaneously  
* Case duration varies:  
  * Short end: **3-5 months**  
  * Long end: **10 years**  
* Needs to keep clients notified via:  
  * Letters  
  * Emails  
  * Texts/WhatsApp  
* Must communicate **progress updates** across massive caseload

**3\. Government System Issues**

* Government promoting **online filing**  
* Government UI is **very bad**  
* (Note: Playwright MCP mentioned \- potential automation opportunity)

### **Key Insights for Product**

* **Scale**: Managing 1,500 active cases requires robust automation  
* **Long-tail cases**: Some cases span a decade \- long-term data retention critical  
* **Multi-channel communication**: Needs to reach clients where they are (WhatsApp, email, text)  
* **Document-based Q\&A**: RAG across case documents is highly valuable



# **Meeting Analysis: Heidi Nowotny, Immigration Attorney on February 24th 2026**

**Met by: Camren Hall, CaseDelta** **Meeting Type: In-person at Heidi's office**

---

## **Who Is Heidi Nowotny**

Heidi is an immigration lawyer who runs a firm with 11 staff members. The firm was founded in 1996 (not by Heidi), meaning it has roughly 30 years of accumulated case data. She handles a mix of immigration case types — employment-based visas, family petitions, USCIS filings, Department of State consular cases — with cases that can span 10+ years and involve life events (births, arrests, address changes) that continuously alter case trajectories. She estimates having around 2,000+ cases. Her firm is currently under extreme workload pressure driven by daily immigration policy changes under the current political environment.

---

## **Their Current Tech Stack**

Heidi's firm runs on a fragmented but functional set of tools:

**Camp Legal** — Their primary case management software. They use it mainly for two things: case notes (chronological activity logs per client) and USCIS form pre-population (client profile data auto-fills immigration forms). They ignore most of Camp Legal's other features — its calendar is weak, its client portal/questionnaire feature isn't used, its billing module isn't used, and they turn off its bidirectional sync because it's buggy. Camp Legal is described as "not the highest end" case management but is cheap and focused on forms and note-taking. They previously used Immigrant Pro, which was even more bare-bones but reliable for just form filling. Camp Legal is a small, approachable company — Heidi can call them directly when things break.

**Google Drive** — Their document storage backbone. Every scanned document, USCIS notice, client submission, and closed-case archive lives here. The firm has been scanning documents since 1996, so there's a massive volume. Folders are organized per client but can be cluttered with drafts, research samples, and works-in-progress during active cases. Google Drive is where the "real" final documents end up once cases close.

**Google Calendar** — Their shared scheduling system. Color-coded by staff member, visible to all 11 employees, used for appointments, availability blocking, and as a quick reference when clients call ("Who's available to talk to this person?"). They don't use Camp Legal's calendar at all.

**QuickBooks** — Billing and accounting. Entirely separate from Camp Legal.

**LawPay** — Credit card payment processing. Camp Legal claims to integrate with LawPay, but the integration apparently doesn't work well.

**USCIS Online Portal** — They file visa applications online through the government portal. These completed forms are printed, reviewed with the client, signed, and stored in a physical folder. They're not saved electronically during the active case — only scanned into Google Drive after case closure.

**Department of State Platform** — For consular cases, a separate government online system.

**Physical paper files** — Still heavily used. Heidi takes handwritten notes during consultations (she values the relational aspect — clients can see what she's writing). Staff use sticky notes. Physical folders hold signed forms, handwritten notes, and documents in progress. These are eventually scanned but not always promptly.

**Slack** — Used frequently for internal team communication. Camp Legal integrates with Slack.

---

## **Key Pain Points Identified**

### **1\. Data Fragmentation (The \#1 Barrier)**

Heidi's case data lives across at minimum five locations: Camp Legal (notes and forms), Google Drive (stored documents), physical files (signed forms, handwritten notes), USCIS online portal (filed applications), and the Department of State platform (consular filings). No single system has a complete picture of any case. To answer even a basic question about a client — "What's their current status? What did we file? What's pending?" — someone has to check multiple systems and possibly dig through a physical folder.

Heidi said this explicitly: "If a platform is gonna work, we'd need all that information in one place. So what do we have to do to get it in one place?" And then, critically: "Even if we tried it with one case and it works perfectly, what about my other two thousand?"

This is the adoption barrier. It's not skepticism about AI — it's a practical migration/integration question.

### **2\. Policy Change Overload**

Immigration attorneys are currently getting hit with daily policy changes. Requirements shift, cases that were "good when we started" are getting denied under new rules, and there's not enough time to react. The firm has to track injunctions, new orders, practice changes, and then figure out which of their active cases are affected. Heidi described being mentally fatigued — not just busy, but overwhelmed by the cognitive load of tracking constantly shifting rules across a large case portfolio.

She said: "We're getting policy changes every single day... nothing's reliable anymore."

### **3\. Case History Retrieval**

This is the core "doctor analogy" use case Heidi described — and it's the feature she wants most. Just like a doctor enters visit notes and can later query a patient's history to make a diagnosis, Heidi wants to enter case notes and later ask questions across those notes without re-reading years of accumulated records. With cases spanning 10+ years and notes becoming "less and less readable, or less and less reliable" as they accumulate handwritten amendments, sticky notes, and additions from different staff members, finding specific information is time-consuming and error-prone.

Her exact words: "Better would be if you could just query all your notes."

When she gave a use-case example, it was urgent and high-stakes: "Say somebody is calling, 'ICE is at my house right now,' or 'I'm getting ready to travel, I'm at the airport.'" She needs instant case recall in emergency situations.

### **4\. AI Trust / Hallucination Concerns**

Heidi has used ChatGPT for legal queries and found it completely unreliable. She told ChatGPT "don't lie," and it responded with "You're right to ask that\! Good catch\!" before providing another fabricated case citation. She described this as making AI useless for legal research — "checking up on things, I might as well do it myself." However, she clearly distinguishes between AI that fabricates information and AI that retrieves and synthesizes real data from her own documents with source citations. She was impressed when CaseDelta showed source attribution in its answers.

### **5\. Zero Tolerance for Learning Curves**

"No time for a learning curve and no ability to transform our systems or our style." This was stated plainly. Any solution has to work within their existing workflow — not require them to change how or where they store data.

### **6\. Handwritten Document OCR**

The firm deals extensively with handwritten documents — Heidi's own consultation notes, client-submitted foreign documents (birth certificates from Honduras with "little scripty" handwriting), sticky notes, and amended case records. She acknowledged this is a challenge for machines and was interested when Camren mentioned CaseDelta's OCR capabilities with handwritten text.

### **7\. Client Communication Under Uncertainty**

Heidi can't tell all her clients about every policy change — she doesn't have time. But clients are calling scared ("Is it safe for me to travel?"). She creates general guidelines for front-desk staff to relay, but they can't give legal advice. She doesn't want to put everything in writing. There's a real gap between client communication needs and the firm's capacity.

---

## **What Heidi Wants (In Priority Order)**

1. **Query her case notes across Camp Legal and Google Drive** — the "doctor" use case. Ask a question, get an answer with sources, don't re-read ten years of notes.  
2. **Integration with Camp Legal** — this is the make-or-break requirement. Camp Legal holds the most up-to-date case activity. If CaseDelta can't read Camp Legal data, the tool is incomplete. Heidi even said the MVP could be "possibly even just Camp Legal" without Google Drive.  
3. **Preservation of existing workflows** — no system migration, no learning curve. Plug into what they already use.  
4. **Reliable OCR for handwritten notes and foreign documents** — so case records that are currently on paper or in scanned images become queryable.  
5. **Document organization and completeness tracking** — she was impressed by CaseDelta's ability to identify what documents a client still needs to upload.

---

## **What She Explicitly Doesn't Want**

* A separate platform that requires changing how they work  
* A tool that requires them to upload everything manually to a new location  
* AI that makes things up (ChatGPT-style hallucination)  
* More complexity or tools to learn during an already overwhelming period

---

## **Outcome and Next Steps**

Heidi is interested and willing to try a prototype for free in exchange for feedback. She said to send her something when it's ready. She suggested starting with her systems manager, who handles platform integration. Camren committed to researching whether Camp Legal has an API, and to follow up via email.

The meeting ended warmly — she said "Keep me posted" and asked only for patience on response times.

**Note on prior relationship:** This was not a cold meeting. Camren and Heidi had a previous conversation where she described her vision (the "doctor analogy"), and Camren had sent her a formal proposal afterward. Time had passed — enough for Camren to build significant product improvements. Heidi acknowledged the proposal was good but she'd been too busy to follow up. This is a warm, returning lead.

---

## **Details I Want to Make Sure Are Captured**

### **Third Person Present**

The transcript shows a speaker\_2 who appears during the demo portion of the meeting (around the 6-minute mark onward). This person asked practical questions like "So just as a starting point, how would this case get in?" and "So you could connect it to Drive. I saw Calendar." This is likely a staff member or paralegal who was either in Heidi's office or came in during the demo. Worth noting — Camren had a second audience member whose reactions were also positive ("Oh, wow\!" at the connector view).

### **Trigger-Based Automation Request**

Separate from the querying use case, Heidi specifically asked for automated actions on triggers. She said: "I just want a way to query and maybe automate some — there are some things that happen on triggers... that probably could be more like an algorithm or something." This is a distinct feature request — event-driven workflow automation (e.g., "when a receipt comes in, log it"; "when a policy change affects this case type, alert me"). This maps directly to AgentFrame's event-driven agent architecture.

### **Consultation vs. Active Case — Two Distinct Workflows**

Heidi's handwritten notes are primarily for initial consultations, and she explicitly said "half the time, I'm like: Listen, I don't think you should do anything." These consultation notes get saved as a record of the conversation but no Camp Legal case is opened. Only when someone becomes a client do they enter Camp Legal's formal case system. This means CaseDelta needs to account for pre-case records — a lightweight intake/consultation record that may or may not convert to a full case.

### **Vendor Lock-In Fear ("Data Hostage")**

Heidi explicitly said they don't store documents in Camp Legal because "we don't want our stuff to be hostage to something that we can't control." This is a direct vendor lock-in concern. She stores everything in Google Drive precisely because she owns that data independently of any case management software. This is powerful marketing intelligence — CaseDelta should emphasize data ownership and portability in its pitch. Lawyers fear getting locked into platforms.

### **Pinned Notes Overload and Safety Flagging**

Camp Legal has a pinning feature and pop-up alerts for critical notes, but the firm hit a practical limit — staff pushed back about too many pinned notes, which made them all irrelevant. Critically, some pinned notes are safety-related: "This person lives with an abuser, don't take a call or don't leave a message." These safety flags compete for attention with operational pins.

This is a real product insight: a querying system that surfaces critical safety notes contextually (when anyone pulls up that client, the safety flag appears automatically) would be more effective than a pin-based system that degrades with volume. This is a feature CaseDelta should build.

### **Physical File Location Tracking**

Camp Legal is used partly as a "library card" — tracking the physical location of paper files and who currently has them. This is a surprisingly important feature for a firm that still relies on paper. CaseDelta should note this if it ever aims to replace Camp Legal.

### **USCIS Receipt Tracking Workflow**

When USCIS sends receipts for filed applications, the firm enters receipt numbers, dates, and status updates into Camp Legal notes. This is a core operational workflow — receipt tracking is how they know a case is progressing. An agent that could automatically flag when expected receipts haven't arrived (based on typical processing times) would save significant manual tracking.

### **Active ICE Enforcement Creating Urgency**

Heidi said directly: "People are getting picked up, so we're scrambling." This isn't hypothetical — ICE is actively detaining clients, creating emergency situations where the firm needs instant access to case status, filing history, and legal strategy. The speed-of-access problem isn't just a convenience issue; it has immediate, real-world consequences for people's liberty.

### **Old Clients Calling Back**

Even clients whose cases are closed are reaching out with fear-based questions: "Is it safe for me to travel?" This means CaseDelta's value extends beyond active cases — the ability to quickly query a closed case's history and provide accurate guidance for returning clients is valuable. The firm's 30 years of closed-case data in Google Drive becomes an asset, not just an archive.

### **Court Listservs and Attorney Intelligence Networks**

Heidi mentioned being "on" (presumably listservs or online communities) where immigration attorneys share chatter about judge-specific practices, injunctions, and policy nuances. This informal intelligence network is how she stays current. A tool that could aggregate and synthesize this kind of community intelligence — or at minimum, monitor Federal Register updates and USCIS policy memos — would directly reduce her research burden.

### **Evidence Supplementation Workflow**

When policy changes affect pending cases, the firm sometimes needs to proactively send additional evidence to strengthen cases that were filed under old rules. Heidi said: "We're gonna supplement, we're gonna send more evidence." This requires first identifying which cases are affected (across 2,000+ active cases), then coordinating with each client to gather new documentation, then filing supplements. This is exactly the kind of cross-portfolio analysis where an AI agent would save enormous time.

### **Camp Legal's Client Portal — Unused but Relevant**

Camp Legal has questionnaire and document upload features for clients, but Heidi doesn't use them — she described them as "not the best" for client interaction and said that's why she can "afford to have a cheaper platform." This means CaseDelta's client document upload and verification feature fills a gap that Camp Legal isn't filling. If Heidi saw value in the "remind the client to upload, then verify what they uploaded" feature (which she did react positively to — "But it'd save time if they just—"), this could become a secondary value proposition.

### **Demo Reactions and Practical Thinking**

Heidi's reactions during the demo were consistently positive but practically-minded. Her first question was "How would this case get in?" — not "what does it do?" but "how does it fit into my workflow?" She asked for a specific query ("What's his average bank balance?") to test real-world accuracy. She was impressed by the connector view ("Oh, wow\!"), the agentic reasoning display ("searching documents, reflecting back on it"), and the source citations. Her comment "Wow, you've been busy" signals genuine respect for the progress.

### **Camren's Product Pivot Was Well-Received**

Camren explained during the meeting that CaseDelta pivoted from being a standalone platform ("say you had to sign in to a different Case Delta") to being an integration-first agent that connects to existing tools. Heidi's response — "That was kind of a big barrier, was thinking about, like, do we have to change everything we do to accommodate the platform?" — confirms this pivot was exactly right. The integration-first approach directly addresses the adoption barrier.

---

## **Business Insights for CaseDelta**

### **Insight 1: The Integration Problem Is the Entire Go-to-Market**

Heidi's firm is a textbook example of CaseDelta's target customer: a small-to-mid firm, document-heavy practice, tech-curious but time-poor, using fragmented tools. But the single biggest barrier to adoption isn't price, AI skepticism, or feature gaps — it's whether CaseDelta can connect to Camp Legal. She said it three times in different ways.

This generalizes across the entire market. Every law firm has its own "Camp Legal" — it's Clio, PracticePanther, MyCase, Smokeball, CosmoLex, or one of dozens of niche tools like Immigrant Pro. CaseDelta's ability to integrate with these systems is the key to distribution. Building connectors for the top 5-10 legal practice management platforms should be treated as a core product priority, not a "nice to have."

Camp Legal specifically appears to be a niche immigration-focused tool. Whether it has an API is an open question. If it does, build a connector. If it doesn't, the Slack integration Heidi mentioned could serve as a bridge — Camp Legal pushes data to Slack, CaseDelta reads Slack. This "hop step" approach Camren mentioned in the meeting is worth pursuing.

### **Insight 2: "Query My Notes" Is the Killer Feature — Not Document Analysis**

Every CaseDelta document and pitch frames the product around document analysis (upload PDFs, extract data, generate spreadsheets). But Heidi didn't ask for any of that. What she wants is case note search — the ability to ask a natural-language question and get an answer synthesized from years of accumulated case activity notes. This is fundamentally a RAG problem over structured text records (chronological notes in Camp Legal), not a document extraction problem.

This suggests CaseDelta should consider a feature tier or mode that's purely "case intelligence" — no document upload required, just connect your case management notes and start querying. This would be dramatically easier to onboard (no document migration) and would hit the pain point lawyers feel most acutely.

### **Insight 3: Immigration Law Is a Particularly Strong Vertical**

The current political environment has created an acute crisis for immigration lawyers: daily policy changes, case denials mid-stream, overwhelmed firms, scared clients. This is exactly the kind of "hair on fire" problem where AI-powered tools see fastest adoption — the pain is immediate, the alternative (manually tracking policy changes across 2,000 cases) is unsustainable, and the willingness to try something new is high.

CaseDelta could build a specialized immigration module that monitors policy changes (Federal Register, USCIS policy updates, court injunctions) and automatically flags which active cases may be affected. This connects to the "Guardian Agents" concept in the Future Features document but applied to regulatory monitoring rather than just PII compliance.

### **Insight 4: The "Doctor Analogy" Is a Powerful Sales Narrative**

Heidi spontaneously described her ideal tool using the doctor analogy — visit notes you can query later for diagnosis. This is a more intuitive framing than "AI-powered document analysis" for lawyers who don't think in tech terms. Consider adopting this language in marketing: "CaseDelta gives your case files a memory. Ask questions about any client, any case, any time — and get answers with sources, not hallucinations."

### **Insight 5: OCR for Handwritten Notes Is a Real Differentiator**

This isn't just about foreign birth certificates. Heidi takes all her consultation notes by hand because she values the relational dynamic — clients see her writing, not hiding behind a laptop. Her staff use sticky notes. These handwritten records are foundational to case management but are currently unsearchable. If CaseDelta's OCR can reliably transcribe handwritten legal notes and make them queryable alongside typed Camp Legal records, that alone is a compelling value proposition.

This connects directly to the PaddleOCR v3.0 opportunity identified in the open-source research — its handwritten text recognition was specifically enhanced in the latest version.

### **Insight 6: The "2,000 Cases" Migration Problem Needs a Solution**

Even if CaseDelta works perfectly on one case, Heidi immediately asked: "What about my other two thousand?" Any firm with decades of case history needs a bulk onboarding path — either through direct integration (so existing data doesn't need to move) or through a batch migration tool. This should be part of the onboarding design, not an afterthought.

### **Insight 7: Camp Legal Is Probably Replaceable Long-Term**

Heidi described Camp Legal as cheap, limited, and buggy (they turn off bidirectional sync, ignore most features, don't use its calendar or billing). She chose it because it's "more focused on forms and note-taking" and is cheaper than alternatives. This firm is not deeply wedded to Camp Legal — they're using it because it's adequate, not because they love it. If CaseDelta eventually builds the CRM \+ form-filling \+ note-taking capabilities (the Odoo-based CRM from the open-source research, plus USCIS form integration), there's a path to replacing Camp Legal entirely. But that's a long-term play — the immediate play is integration.

### **Insight 8: Calendar Integration Matters More Than Expected**

Heidi specifically called out calendars as "pretty key to us." They use Google Calendar as their primary scheduling tool (not Camp Legal's calendar). CaseDelta already has a Google Calendar connector — this is a quick win that should be emphasized in the pitch. Being able to query "What appointments does Heidi have this week?" or "When is the client's next hearing?" alongside case notes makes the tool immediately practical for front-desk staff fielding phone calls.

### **Insight 9: The Front Desk Is an Underappreciated User**

Heidi mentioned that front-desk staff handle incoming calls from panicked clients ("ICE is at my house"), need to look up cases quickly, and can't give legal advice but need to relay accurate information. These are high-frequency, time-sensitive interactions where a "query your case notes" tool would be used most. The front desk is potentially CaseDelta's most active daily user persona — not the attorney herself. Product design and onboarding should account for this.

### **Insight 10: Vendor Lock-In Fear Is a Marketing Weapon**

Heidi stores documents in Google Drive specifically because she doesn't want data "hostage to something we can't control." This fear is widespread among lawyers. CaseDelta should weaponize this in its positioning: "Your data stays in your systems. We connect to it — we don't capture it." This is the opposite of how most SaaS tools work (import everything into our platform), and it directly supports the integration-first architecture. It also differentiates CaseDelta from competitors who require data migration.

### **Insight 11: Trigger-Based Automation Is a Separate, Valuable Feature Track**

Heidi's request for "things that happen on triggers" is distinct from querying. She wants automated workflows — when a receipt arrives, log it; when a deadline approaches, alert someone; when a policy change matches a case profile, flag it. This maps perfectly to AgentFrame's event-driven architecture. Building even basic trigger automations (deadline reminders, document receipt logging, status change alerts) into the CaseDelta pilot would differentiate it from a simple "ask questions about your notes" tool and demonstrate the platform's agent capabilities.

### **Insight 12: Safety Flagging Solves a Real Problem**

The "client lives with an abuser — don't leave a message" scenario is a liability issue, not just a convenience one. If a staff member accidentally calls and leaves a voicemail that alerts an abuser to the client's legal activity, the consequences could be severe. A contextual safety-flagging system — where critical alerts surface automatically whenever anyone accesses that client's record, regardless of how many other notes exist — is a feature Camp Legal's pin system fails at and CaseDelta could excel at.

### **Insight 13: Closed-Case Data Is an Untapped Asset**

With 30 years of data and old clients calling back, the firm's archive isn't dead storage — it's active reference material. CaseDelta's ability to query closed cases as easily as active ones means the entire Google Drive archive becomes instantly useful. This also means the "2,000 case" migration question has a flip side: once connected, Heidi gets value from all 2,000 cases simultaneously, not just the one she's testing.

### **Insight 14: The Pivot Validation Is a Go-to-Market Proof Point**

Heidi's explicit reaction — "That was kind of a big barrier, was thinking about, like, do we have to change everything we do to accommodate the platform?" — is a direct validation of CaseDelta's pivot from standalone platform to integration-first agent. This quote (with permission) could be used in marketing materials. The pivot wasn't just a technical decision; it removed the \#1 adoption barrier for this class of customer.

### **Insight 15: Firm Offered for Free Pilot — Close the Loop**

Heidi explicitly agreed to test a prototype for free in exchange for feedback. She suggested routing it through her systems manager. This is a warm lead with a concrete next step: research Camp Legal's API, build a connector (or Slack bridge), and deliver a prototype that queries Camp Legal notes \+ Google Drive documents for a single test case. The commitment is low (free), the feedback is high-value (real immigration workflow), and a successful pilot creates CaseDelta's first reference customer in immigration law.

---

## **Immediate Action Items**

1. **Research Camp Legal's API** — Check if Camp Legal (the immigration case management software) has a public API or integration capabilities beyond Slack. Contact the company directly, as Heidi confirmed they're small and approachable.  
2. **Explore Slack bridge as fallback** — If Camp Legal has no API but does push data to Slack, build a Slack-to-CaseDelta connector that ingests case activity from Slack channels.  
3. **Build a "case notes query" mode** — A lightweight feature that connects to a case management system's notes and lets the lawyer ask questions, with source citations. No document upload required.  
4. **Prototype for Heidi** — Single-case demo connecting Camp Legal notes \+ Google Drive folder. Goal: she asks "What's the status of \[client\]'s case?" and gets an accurate, sourced answer.  
5. **Follow up via email** — Update Heidi on Camp Legal API findings. Introduce timeline for prototype. Ask for intro to her systems manager.  
6. **Add immigration policy monitoring to feature roadmap** — Track Federal Register updates, USCIS policy memos, and court injunctions, then cross-reference against active case profiles to surface affected cases automatically.  
7. **Design contextual safety flagging** — When a client record has safety-critical metadata (abuser in household, don't leave voicemails, etc.), surface this immediately and automatically whenever anyone accesses the record.  
8. **Build trigger-based automation MVP** — Even basic automations (deadline reminders, USCIS receipt expected-by alerts, policy change cross-referencing) would demonstrate AgentFrame's event-driven architecture in a real legal workflow.  
9. **Design for closed-case querying** — Make sure the Google Drive connector handles the archive structure (closed case folders, 30 years of scanned documents) and that old-client lookups work as smoothly as active-case queries.  
10. **Capture Heidi's "pivot validation" quote** — With permission, her reaction to the integration-first approach is a powerful testimonial for marketing: lawyers don't want to change their systems, and CaseDelta doesn't make them.
