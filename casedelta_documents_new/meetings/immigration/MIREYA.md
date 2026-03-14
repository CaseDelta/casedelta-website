# MIREYA GUTIERREZ — Meeting Debrief
**Date:** March 3, 2026
**Attendees:** Camren Hall (CaseDelta), Mireya Gutierrez (Systems Manager, Kirschbaum & Nowotny LLC), + unknown third speaker who joined mid-meeting (speaker_3, likely a colleague or Heidi)
**Context:** Discovery and technical scoping meeting at Kirschbaum & Nowotny's office in Overland Park, KS — purpose was to understand the firm's tech stack, explore CaseDelta's integration with Camp Legal and Google Calendar, and attempt a live authentication demo.

---

## 1. The Firm's Tech Stack

### Camp Legal
- **What it is:** The firm's primary case management system. All case activity, notes, documents, and client data is tracked here.
- **How it's used:** Attorneys and staff document everything that happens in a case — calls received, updates, status changes, criminal history summaries, receipts. Each case has typed notes; there are structured "note types," the most important being the **"contract note"** which contains highly relevant case-specific data including: case type, A-numbers (alien registration numbers), receipts, and key case facts.
- **Documents stored:** Notices received from Immigration (USCIS, immigration courts, etc.) are stored as documents within the case.
- **Access model:** Seat-based licensing. Every staff member has their own account. Logging in from a new location/session invalidates existing sessions (single active session per credential). Seat cost estimated by Mireya at ~$100–$300/month or/year — she was genuinely uncertain.
- **API status:** No published/public API. No OAuth integration. Camren's approach was session cookie scraping via the `lawyer.camplegal.com/login` endpoint. This was confirmed live to kick out the existing logged-in user when a second login happens.
- **Pain with current state:** Data lives in isolation. No cross-referencing with Google Calendar without manually checking both systems.

### Google Calendar
- **What it is:** Shared team calendar used heavily for client appointment tracking and deadline management.
- **How it's used:** Color-coded per attorney/staff member. Each calendar event for a client appointment contains: client name, client phone number, appointment description, and appointment type. All-day events are used as **deadline markers** for case deadlines.
- **Data significance:** Mireya considers it equally important to Camp Legal: *"I feel like this is equally as important as Camp Able."* Frequently cross-referenced alongside Camp Legal notes to understand a client's full history.
- **Integration:** Currently no integration between Google Calendar and Camp Legal. Staff manually check both.

### Gmail
- Current email client. Firm is considering migrating to **ProtonMail** due to data privacy concerns — *"our data is so sensitive and we know we don't trust Google."* Migration is on the horizon but not imminent.

### Google Drive
- Secondary document storage. Referenced in the context of the broader data ecosystem CaseDelta could connect. Specific data types not elaborated.

### Password Manager
- Unnamed. Used firm-wide. Mireya mentioned it while juggling multiple credentials during the live demo: *"I'm grateful for our password manager."*

---

## 2. Workflow & Pain Points (Deep Extraction)

### Theme 1: Data Fragmentation Across Systems
The most structurally significant pain. Client information is split across Camp Legal and Google Calendar with no automatic synchronization. Staff manually check both to answer basic questions about a client.

Mireya described needing to reference "a lot of different things" to get a complete picture. To understand a client like "Gustavo," you need to look at his Camp Legal case notes AND his appointment history in Google Calendar — neither system knows what's in the other.

### Theme 2: No Programmatic Access to Camp Legal Data
Camp Legal has no published API. Camren tested session cookie scraping live — it worked technically but immediately kicked out the logged-in user (Mireya). This is a real blocker for real-time integration.

**Quote (Camren):** *"Since you're the first person that I've integrated with Camp Legal with, I don't have, like, the backend APIs, like, figured out... so I would have to, like, go home and see what the API schema is like."*

**Quote (Mireya):** *"It does. Um, yeah. I don't remember how much it is, you know, but, like, people come and go, so we'll just add their accounts. I do know it's a bit extra."*

### Theme 3: Manual Cross-Referencing Is the Primary Workflow
Staff navigate between systems manually to build a complete picture of a client. Mireya articulated the desired alternative clearly: *"Maybe we want to know very broadly over a client, the times that they've been in, maybe why they were in. So the description of the calendar event and the contract note."*

### Theme 4: Specific Tracking Queries That Are Currently Painful
Queries Mireya generated spontaneously — these are real daily friction points:
- "How many times has [client] been in?"
- "Have we sent a Packet 3 letter to this client?"
- "What is the status of this client's FOIA/FBI records request?"
- "What kind of criminal history does this person have?"
- "When did this person first come in? Why?"

### Theme 5: Staff Turnover Creates Account Management Overhead
The firm regularly adds and deactivates Camp Legal accounts. Mireya mentioned she had "just deactivated one today." This is relevant to CaseDelta's integration model — a dedicated non-human account is unusual but workable.

### Theme 6: Security Anxiety Around Sharing Access
Mireya paused the conversation mid-meeting to check with Heidi before handing over even an inactive Camp Legal account. She did not hand it over without Heidi's approval.

**Quote:** *"Um, we, I think we are just very concerned with, like, the privacy of our data, because, you know, we deal with a lot of sensitive information."*

---

## 3. What They Actually Want (Use Cases & Desired Outcomes)

**Primary desired use case:** A unified client overview pulling from both Camp Legal and Google Calendar — showing appointment history, why the client came in, and key case notes — in one query.

**Quote:** *"Maybe we want to know very broadly over a client, the times that they've been in, maybe why they were in. So the description of the calendar event and the contract note."*

**Specific queries they want to run:**
- "Have we sent a Packet 3 letter to this client?" — status check on a specific outgoing document
- "What is the status of this client's FOIA or FBI records request?" — tracking outstanding records requests
- "What kind of criminal history does this person have?" — synthesizing attorney-recorded notes
- "How many times has [client] been in?" — appointment frequency query

**Form factor preference:** Web-based ("something we log into online") with a familiar AI/chat interface. Mireya described it as "like a pretty little dashboard." She understood the concept immediately: *"A specific person. Tell me about Mary Dekar Nelson's case."*

**Integration model preference:** Keep existing systems, don't migrate. Camren's framing of "don't even upload it to our systems — just keep it in your existing systems" resonated immediately.

**Quote (Mireya completing Camren's thought):** *"And, like, report it. Like a pretty little dashboard and stuff."*

---

## 4. People & Roles

### Mireya Gutierrez — Systems Manager
- CS degree. Former data engineer (Cosmic Pet — AWS, SQL, Python, reporting). Left due to imposter syndrome + bad manager.
- Been at K&N on-and-off since a cousin there needed maternity leave coverage; eventually returned full-time after moving back to KC.
- **Tech savviness:** High. Immediately understood session cookie scraping, API concepts, cloud architecture. Asked smart questions.
- **Decision power:** Operational gatekeeper, NOT final decision-maker. Reports to Heidi Nowotny. Will not approve tooling without Heidi's sign-off.
- **Attitude:** Genuinely enthusiastic and curious. Warm, builds rapport. Has personal entrepreneurial aspirations ("I have so many great app ideas"). Security hesitation was procedural, not adversarial.
- **Role in her words:** *"I don't think I do, like, one, like, very specific thing. I'm, I'm pretty much everywhere."*

### Heidi Nowotny — Principal/Managing Attorney
- The owner or managing attorney. Original contact from Camren's prior outreach (~a year ago discussing software solutions). Ultimate decision-maker on any new platform adoption.
- Was "with a client" during most of this meeting. Joined very briefly at the end (appears as speaker_3 starting ~00:30:36).
- Already knows pricing is "don't worry about that" — Heidi framed this as a no-cost exploration when briefing Mireya.
- Prior engagement: Heidi re-engaged Camren recently after he circled back from their meeting a year ago.

### Speaker_3 — Unknown Colleague (joined ~00:30:36)
- Unidentified. Likely a paralegal, associate attorney, or another admin staff member.
- Confirmed criminal history is collected during intake and stored in Camp Legal notes. Confirmed FOIA/FBI records request workflow.
- Expressed authentic interest: *"I was thinking about it the other night like, 'Man, that's a very cool job.' Like, and it, to me, it sounds like so simple because I like building things... collecting data and different events, just makes it pretty neat."*
- Agreed to Camren's proposal of weekly 15-minute check-ins. Prefers afternoons.

### Connor — CaseDelta Software Engineer (mentioned by Camren)
- Part-time engineering collaborator. Former Capital One colleague. Helps "from time to time."

---

## 5. Security, Compliance & Trust Signals

### Primary Security Concern
The firm deals with immigration clients whose data (A-numbers, criminal history, immigration status, FOIA records) is extraordinarily sensitive. Any breach could have catastrophic consequences for clients and the firm.

**Quote:** *"We are just very concerned with, like, the privacy of our data, because, you know, we deal with a lot of sensitive information."*

### What Reassured Them: On-Premise / No Third-Party AI
Camren's claim that CaseDelta owns all servers and does not send data to ChatGPT/OpenAI was a strong trust signal. Mireya had already been planning to ask this question.

**Quote (Camren):** *"We own all, all of our rack servers. We own... Like the AI models are completely ours. Like, we don't send it off to ChatGPT or OpenAI or anything like that. Like we do all the processing on our own hardware servers."*

**Quote (Mireya):** *"Cool, cool, cool. Yeah, that was one of my other questions. Like, do you have your own machine learning tool software that you do, so you're not like using ChatGPT?"*

### What They Want Before Granting Access
- Heidi's explicit approval for even an inactive Camp Legal account
- A security attestation or one-pager from Camren explaining data handling
- Possibly a systems architecture diagram

**Quote (Mireya reacting to "systems diagram"):** *"Whatever that means"* [laughs] — she is not familiar with formal security documentation vocabulary. The one-pager needs to be simple and jargon-free.

### ProtonMail Migration
The firm is planning to eventually migrate from Gmail to ProtonMail. Mireya raised it as a future integration question: *"I don't know if you can integrate with that at some point."* Not blocking now but worth tracking.

---

## 6. Camp Legal — Detailed Notes

### Platform Overview
- Web-based case management. URL: `lawyer.camplegal.com` (login endpoint confirmed live)
- Immigration law focus implied by data types (A-numbers, immigration notices, FOIA/FBI records)
- No published public API. No OAuth. No documented developer portal.
- Authentication: username/password → session cookie issued. Single active session enforced per credential.

### Session Management — Critical Technical Finding
Camp Legal enforces **single active session per credential**. When a new login occurs, the previously active session cookie is immediately invalidated and the previous user is forcibly logged out. This was confirmed live in the meeting. This means:
- Real-time scraping via shared credentials is not viable without disrupting live users
- A **dedicated inactive seat** (separate credentials not used by any human) is the required architecture for real-time integration
- Alternative: **nightly batch scrape** — functional but introduces 8–12 hour data staleness

### Data Model (as described by Mireya)
- **Cases:** Primary entity. Each case contains:
  - **Notes:** Most important and most-used section. Notes have typed categories.
  - **Contract note:** Mandatory note type on every case. Contains case type, A-numbers, receipt numbers, and key case facts. Described as *"the most important one."*
  - **Documents:** Uploaded files — primarily immigration notices received from USCIS and immigration courts.
- **Clients:** Each client links to their cases. Criminal history from FOIA/FBI requests is documented in notes by reviewing attorneys.
- **Users:** Seat-based. Accounts created/deactivated as staff come and go.

### API Status
- No published API. Confirmed by Camren: *"Camp Legal doesn't have a published API and everything... like Clio or my case would."*
- **Mireya had independently contacted Camp Legal to request API documentation.** Camren had also called them.
- Shared commitment: if either receives a response from Camp Legal about API access, they will relay it to the other.

### Camren's Integration Approach (Described Live)
1. Hit `lawyer.camplegal.com/login` with credentials
2. Capture the returned session cookie
3. Use cookie for all subsequent authenticated backend calls
4. Works technically, fails operationally due to single-session enforcement
5. **Workaround:** Dedicated inactive Camp Legal account assigned exclusively to CaseDelta integration

---

## 7. Other Integrations & Data Sources

### Google Calendar
- Shared firm calendar. Color-coded per staff member.
- Contains: client name, client phone number, appointment description, appointment type, deadlines (all-day events).
- Has a standard OAuth API — straightforward to integrate.
- Camren confirmed he can connect it but needs to create a new "firm" for K&N in CaseDelta first: *"I'll have to create a new firm on CaseDelta for you, so I can't connect that right now today. But I can link back with you and then get that connected."*

### Gmail
- Currently in use. Future migration to ProtonMail being evaluated.

### Google Drive
- Mentioned briefly as a secondary data store. Specific data types not elaborated.

### ProtonMail (Future)
- Being evaluated as Gmail replacement for encrypted communications. Mireya raised it as a future integration question.

---

## 8. CaseDelta Fit Assessment

**Rating: Strong — with two solvable technical hurdles**

**Why the fit is strong:**
- Boutique immigration law firm: document-heavy, complex multi-year cases, data scattered across systems. Exact ICP.
- Specific use cases Mireya articulated (Packet 3 letter status, FOIA tracking, appointment history synthesis, criminal history summary) are precisely what CaseDelta's RAG + query layer is designed to answer.
- Mireya is technically sophisticated and personally enthusiastic. Strong internal champion.
- Firm is already thinking about AI and security — primed for this conversation.
- No competing tools mentioned. No other AI solution in use or being evaluated.
- Heidi has been in the conversation for ~a year. Pre-existing trust.

**Highest-value demo to build first:**
A unified client overview: "Tell me about [client name]'s case" → synthesizes Camp Legal contract note + Google Calendar appointment history → returns: case type, A-number, how many times they've been in, dates of each visit, what each visit was for, and current deadlines. Exact output Mireya described wanting.

**Second priority demo:**
Document-status tracking: "Have we sent a Packet 3 letter to [client]?" — natural language query against Camp Legal notes.

**Biggest technical risk:**
Camp Legal's single-session enforcement. If adding a dedicated seat is cost-prohibitive or Heidi declines to provide credentials, the real-time path is blocked. Nightly batch is a fallback but meaningfully degrades value.

**Biggest relationship risk:**
Heidi is the decision-maker and was not deeply engaged in this technical meeting. Camren needs a direct touchpoint with Heidi before this advances to actual data access.

---

## 9. Open Commitments & Next Steps

### Camren's Explicit Commitments
1. **Send security one-pager/attestation** to Mireya — simple, jargon-free, focused on: no third-party AI, all data stays in CaseDelta infrastructure, client data protection promise.
2. **Send update email** to Mireya (and Heidi) with Camp Legal integration progress.
3. **Set up recurring 15-minute weekly check-ins** with Mireya (and Heidi). Afternoons preferred. Proposed Tuesdays at 3 PM.
4. **Loop Mireya in if Camp Legal responds** to his API inquiry. She will do the same.
5. **Build out Camp Legal backend integration** — figure out API schema/endpoints, make it work.
6. **Create new firm in CaseDelta for Kirschbaum & Nowotny** to connect Google Calendar. Requires backend setup.

### Items Pending on Mireya/Heidi's Side
1. Heidi's approval to provide an inactive Camp Legal account credential.
2. Camp Legal API response — Mireya submitted an independent request. Will forward response to Camren.
3. NDA/confidentiality agreement — Mireya mentioned sending one over; Camren agreed to sign and return quickly.
4. ProtonMail migration decision — future integration question.

### Implicit / Unresolved Items
- **Who actually uses the product** is unresolved. Mireya said "maybe everyone" when asked. Needs clarification before building the onboarding flow.
- **Pricing is indefinitely deferred.** Heidi already knows it's free beta. No trigger or timeline for pricing conversation.
- **Camp Legal API availability** — neither party knows if an enterprise/developer API exists. If it does, session scraping is unnecessary. Both are waiting on Camp Legal's response.
- **Security documentation form** — Camren committed to it but was vague about format. Mireya said "whatever that means" about "systems diagram" — keep it simple.

---

## 10. Key Quotes (Verbatim, High-Signal)

1. **[Mireya, ~00:12:22]** — Tech stack + data privacy concern:
   > *"That's pretty much it. Yeah, Gmail. Um, yeah, that's pretty much it. I think eventually because our data is so sensitive and we know we don't trust Google..."*

2. **[Mireya, ~00:12:27]** — ProtonMail as future email:
   > *"It's just another email platform that's supposed to be, like, super encrypted, and it's a lot more—"*

3. **[Mireya, ~00:19:22]** — Security concern before sharing account:
   > *"Um, we, I think we are just very concerned with, like, the privacy of our data, because, you know, we deal with a lot of sensitive information."*

4. **[Mireya, ~00:20:12]** — Independent Camp Legal API inquiry:
   > *"I had requested, like, an API information from Camp Able [sic]."*

5. **[Camren, ~00:13:32]** — Disclosing technical limitations in real time:
   > *"Since you're the first person that I've integrated with Camp Legal with, I don't have, like, the backend APIs, like, figured out and all that, so I would have to, like, go home and see what the API schema is like and try to figure that all out."*

6. **[Mireya, ~00:23:21]** — Inviting Google Calendar deep dive:
   > *"So scraping the data. Um, hmm. I wonder if... And you'll also connect to Google? Can I scare you with our calendar? Because we use the calendar a lot."*

7. **[Mireya, ~00:24:22]** — Calendar data model:
   > *"Obviously each person, each color is each person, you know? And when you click on here, you always have, like, the client's name, client's phone number... the all-day events are pretty much, like, deadlines."*

8. **[Mireya, ~00:25:31]** — Naming desired CaseDelta query:
   > *"It would be great also if maybe one of our searches in your app could be like how many times has [client been in]—"*

9. **[Mireya, ~00:26:17]** — The most important Camp Legal data object:
   > *"Usually the notes is, like, our most important, mm, the most important section in here. The documents just have, like, any notices that we've received from Immigration."*

10. **[Mireya, ~00:26:33]** — Contract note contents (the most valuable data):
    > *"I would say is, like, the most important one, 'cause it has, um, very relevant information on their case, like the kind of case, their A numbers, um, receipts—"*

11. **[Mireya, ~00:29:16]** — Defining the single most wanted CaseDelta function:
    > *"Maybe we want to know very broadly over a client, the times that they've been in, maybe why they were in. So the description of the calendar event and the contract note."*

12. **[Mireya, ~00:29:59]** — Packet 3 letter use case:
    > *"Maybe you'd be able to ask, have we sent a Packet 3 letter to this client?"*

13. **[Mireya, ~00:22:07]** — Trust probe on pricing / value exchange:
    > *"She had mentioned, like, you... I don't know, when you guys were talking about pricing or what you're looking for, and you're like, 'Oh, don't worry about that'... So what are you getting out of this?"*

14. **[Mireya, ~00:22:30]** — Confirming she understood the beta framing:
    > *"Like beta."*

15. **[Speaker_3, ~00:33:09]** — Broad internal receptivity signal:
    > *"I was thinking about it the other night like, 'Man, that's a very cool job.' Like, and it, to me, it sounds like so simple because I like building things. You know? And going through and using it to like collect data and different events, just makes it pretty neat. And putting it to a different look, like seeing like, 'Oh, I wanna know that.'"*

---

## 11. Strategic Observations

### 1. This Firm Is a High-Quality Early Pilot Candidate — but Heidi Is the Actual Gate
Mireya is enthusiastic, technically literate, and clearly sees the value. But she cannot approve access to firm data on her own — she checked for Heidi mid-meeting and deferred on the Camp Legal account. The next critical step is a Camren-to-Heidi touchpoint. Mireya is a strong champion who will open that door, but she cannot close the loop herself.

### 2. The Camp Legal Integration Problem Is Solvable Through Relationship, Not Just Code
The core blocker is not technical — session cookie scraping works. It's organizational: Heidi needs to agree to provision a dedicated Camp Legal seat for integration. The cost is likely nominal ($100–$300/yr). Frame it clearly in the follow-up: "We need one inactive account — you can create it for a fictitious user — and I won't use any real staff credentials." This resolves the session conflict and the privacy concern simultaneously.

### 3. The Independent Camp Legal API Request Is a Significant Signal
Mireya independently requested API documentation from Camp Legal before this meeting, unprompted. This tells you: (a) the firm was already thinking about integration, (b) they are proactive about solving the problem, and (c) there may be an official API path that hasn't surfaced yet. Both parties should be listening for this response. If Camp Legal has a developer API tier, the session-scraping architecture becomes unnecessary.

### 4. The Google Calendar Integration Is Easy and Should Be Built First
Google Calendar has a standard OAuth API. Camren can set up the K&N firm in CaseDelta and connect their calendar without any Heidi approval or security discussion. This creates immediate, visible value (appointment history, deadline tracking) while the Camp Legal access question is still being resolved. It gives Mireya something to demo to Heidi. **Build this first. Send Mireya a connect link.**

### 5. The "We Own Our Servers" Claim Needs a Document — Fast
Camren claimed on the spot that CaseDelta owns rack servers and runs its own models. Mireya bought it and was reassured. She will need to relay this to Heidi, and Heidi may ask for documentation. The security one-pager must be sent soon. It should be simple and jargon-free — Mireya said "whatever that means" when Camren mentioned "systems diagram." Focus the document on one promise: client data never leaves the CaseDelta environment, no third-party AI APIs used.

### 6. The "Packet 3 Letter" Use Case Is the Killer Demo
Immigration lawyers track specific procedural letters that have to be manually checked. "Have we sent a Packet 3 letter to this client?" is a query that gets asked daily. If CaseDelta can answer this accurately from Camp Legal notes, it demonstrates concrete ROI immediately. This should be the centerpiece of any live demo — not a generic pitch, but a specific query against a specific immigration workflow document.

### 7. The Firm Is Ripe for Notes-Layer Intelligence — That's the Goldmine
Mireya explicitly said notes are the most important data in Camp Legal, specifically the contract note (A-numbers, case type, receipts). This data is entered manually and currently requires eyes-on review to extract. Building a reliable notes extraction and synthesis layer on Camp Legal is the highest-leverage technical investment for this firm. Every query they want runs back to notes data.

### 8. Mireya Has Value Beyond This Deal
She has a CS background, is actively thinking about building apps, and explicitly resonated with what Camren is doing. She could become a product feedback engine, a referral source to other small firms, or an informal advisor. Invest in this relationship beyond the transactional pilot.

### 9. The Weekly Check-in Commitment Must Be Honored
Camren proposed 15-minute weekly check-ins. Both agreed. This is now an implicit contract. Missing the first check-in or not sending the follow-up email will stall the deal. The window of enthusiasm is open right now.

### 10. Pitch Immigration-Specific, Not Generic
Kirschbaum & Nowotny is an immigration firm with a highly specific, process-driven workflow — A-numbers, FOIA requests, deadlines, Packet 3 letters, FBI records reviews. Every demo and communication for this firm should be immigration-workflow-specific. Generic AI demos will land cold here. Specific immigration workflow demos will land hot.
