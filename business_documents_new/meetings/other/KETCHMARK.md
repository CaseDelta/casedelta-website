# **MEETING ANALYSIS REPORT**

### **Ketchmark Law — AI Strategy Discussion**

*Prepared for: Camren | CaseDelta*

---

# **Meeting at a Glance**

|  |  |
| ----- | ----- |
| **Participants** | Michael Ketchmark (Attorney), Brett (Paralegal), Camren (CaseDelta) |
| **Context** | Introductory / exploratory AI strategy meeting at Ketchmark's office |
| **Duration** | \~75 minutes |
| **Primary Topics** | Mock trial AI simulation, juror profiling/social media research, document analysis at scale |
| **CaseDelta Demo** | Live demonstration of CaseDelta's document ingestion alongside Grok/ChatGPT comparison |
| **Tone** | Highly engaged, candid, exploratory — Michael is both a sophisticated AI user and a potential power buyer |

---

# **Participant Profiles**

## **Michael Ketchmark — Lead Attorney**

Michael is the senior partner and the decision-maker. He came to this meeting with a very specific vision already partly formed. A few things stand out about him as a potential client:

* He is already a heavy, sophisticated AI user. He actively uses Grok (xAI), ChatGPT, and a tool called "co-counsel" daily, cross-pollinating outputs between them.  
* He is motivated by winning, not by cutting costs. He openly said he would spend "a quarter to half a million dollars" on mock trials for a major case if it meant winning. The AI opportunity, to him, is about gaining a strategic edge, not saving money.  
* He thinks in systems and frameworks. He spontaneously organized the entire conversation into a "Three Towers" model for how AI could serve his practice.  
* He is already doing back-testing. He has used Grok to retroactively analyze past case arguments and found the predictions to be accurate. This gives him confidence in AI's predictive potential.  
* He processes enormous document volumes manually — 8.5 million documents in one real estate case, 1.7 million in a flavoring case — and finds current tools limiting (Grok caps around 3,000 pages).  
* He has reservations about sycophantic AI (ChatGPT's tendency to agree with the user). He values honest, adversarial feedback.

## **Brett — Paralegal**

Brett is the operational layer. He manages day-to-day workflow and is the person who would actually use any tool CaseDelta builds. Key observations:

* He is the institutional memory. When Michael couldn't find a document, Brett immediately knew exactly which one it was and directed him to it ("He's my mini Grok" — Michael's words).  
* He is pragmatic and detail-oriented. He noticed that documents had low file sizes and wanted to understand page counts before testing. He is thinking about workflow fit, not just capability.  
* He is the one who would run any real-time juror research tool in court — the morning-of scenario (looking up jurors before voir dire begins) is his workflow.  
* He is open to adopting new tools if they integrate cleanly. He asked about drag-and-drop, on-computer usage, and whether tools can run locally vs. web-based.

---

# **The "Three Towers" Framework**

The most important structural outcome of this meeting was the spontaneous emergence of a three-part product vision, which Michael named and organized himself during the conversation. These represent three distinct product opportunities for CaseDelta:

| Tower | Name | What It Does | Priority per Michael |
| ----- | ----- | ----- | ----- |
| **Tower 1** | Presentation Coach | Ingest the attorney's PowerPoint \+ transcript before the mock trial; identify weaknesses, unclear framing, and improvements in the presentation. | Medium. Michael thinks he can already get "pretty high-level quality" here with existing tools. Incremental value. |
| **Tower 2** | AI Simulated Jury | Multi-agent AI personas act as jurors, react to the mock presentation, deliberate, and produce a verdict with reasoning. Inputs: transcript \+ PowerPoint (with video clips extracted). | High. Potential to reduce or supplement expensive real mock juries ($25–30K per session; up to 12 mocks per major case). The key question: can AI jurors produce comparable insights to real ones? |
| **Tower 3** | Deliberation Analyzer | Ingest transcripts of real mock jurors deliberating; extract what moved them for/against the plaintiff; identify missed issues; surface actionable changes for the attorney. | Highest (for Michael personally). This directly changes how he presents at real trials. He already has back-catalog data (deliberation videos) to feed in immediately. |

---

# **Key Concept: Back-Testing / "Reverse Punching"**

Michael introduced a concept he calls "reverse punching" (Brett called it "back-testing"). This is one of the most immediately actionable ideas from the meeting:

**The Concept:** Take historical mock jury data from cases where you already know the outcome. Feed the questionnaires and juror profiles into the AI. Ask it to predict which jurors were holdouts or voted against you. Compare its predictions to reality. If it gets it right, confidence in the system increases. If it gets it wrong, correct it — that correction becomes fine-tuning data.

Michael already ran a version of this with Grok on a comparative fault issue (the "Ford case" — 5% vs 10% fault allocation on a person named David) and the model got it right. He views this as a validation methodology before committing to a new platform.

* You (Camren) correctly noted that fine-tuning has become much cheaper and more accessible.  
* The self-learning loop: AI predicts → attorney corrects wrong answers → model improves → future predictions get more accurate.  
* Brett added: "We need to get one where we lose" — though Michael pointed out that their win rate means the more interesting validation is cases with holdout jurors, not full losses.

---

# **Use Case: Real-Time Juror Research**

A specific, near-term product use case that emerged:

**The Scenario:** On the morning of jury selection in Jackson County, the attorney receives a list of jurors. There are often only minutes to research each one. An AI agent that can take a name, occupation, age, and location — then autonomously scrub Facebook, TikTok, and public records for red flags — would be enormously valuable.

Operational details discussed:

* They currently pay humans to manually search social media. This is slow, inconsistent, and expensive.  
* Brett's workflow need: a laptop-based or web interface tool that Brett can run in the courtroom in real time during voir dire.  
* Data input is minimal: name, occupation, age, residence — sometimes prior jury service.  
* Output needed: a quick red-flag summary (e.g., "married to a realtor" for a real estate case; "connected to the medical field" for a PI case), overall political/ideological lean, and a favorable/unfavorable/unknown rating for the case type.  
* Brett confirmed a web interface is acceptable — no need for on-premise deployment for this feature.  
* Scale note: For a major trial (not a mock), the agentic social media scrub is cost-justified. For a 60-person mock, Camren noted it becomes computationally expensive. The distinction matters for pricing.

---

# **Document Analysis: Current State & Gaps**

The second half of the meeting involved a live CaseDelta demo alongside Michael's existing Grok workflow. Here is what was revealed:

## **Michael's Document Volumes**

| Case Type | Document Volume |
| ----- | ----- |
| Real estate class action (NAR verdict) | \~8.5 million documents (emails, contracts) |
| Flavoring PI case (current) | \~1.7 million documents |
| Insurance production example | 16,000 pages (broke into batches of \~3,000) |

## **Current Tooling vs. CaseDelta**

| Dimension | Grok (current) | CaseDelta |
| ----- | ----- | ----- |
| **Document capacity** | \~3,000–4,000 pages per session (hits limits) | Currently \~1,500–2,000 reliably; scalable with tuning |
| **Data privacy** | Third-party cloud (xAI servers) | Owned hardware rack servers; data stays with you |
| **Model** | Grok (xAI) — proprietary | Own fine-tuned open-source models; not Grok/Claude/GPT |
| **File types** | PDF, Excel, Word — confirmed working | Written docs, images, handwritten (OCR), passports |
| **Output format** | Text \+ Excel (demonstrated with lawsuit caption extraction) | Flexible; configurable per workflow |
| **Storage integration** | Uses Box for document storage | Not discussed; potential integration opportunity |
| **Legal doc platform** | Everlaw for e-discovery; Grok for analysis | Potential to complement or integrate with Everlaw |

## **Live Demo Observations**

During the meeting, Michael demonstrated uploading legal documents into Grok and CaseDelta. A few things to note:

* A wrong document was uploaded initially (not the Prior Lawsuits file), causing CaseDelta to return a blank Excel and "couldn't find any lawsuits." Once corrected, it ran an OCR extraction.  
* CaseDelta returned "No recognizable lawsuit caption" on one document — Michael then re-prompted it with natural language ("use common sense") rather than formal query language, which is his instinctive usage pattern.  
* Grok successfully parsed a 3,000-page Prior Litigation document and extracted lawsuit captions when prompted. Michael compared this favorably, saying "in the past, two lawyers would have taken a month to do this for me."  
* The OCR capability in CaseDelta was noted as a key differentiator — Brett flagged that CaseDelta does OCR on every page.  
* Michael stores documents in Box and batches large files (16,000 pages broken into \~3,000-page chunks) for Grok. CaseDelta's scalability to handle much larger batches seamlessly is a potential selling point.

---

# **Concerns & Critical Insights**

## **Sycophancy Problem**

Both Michael and Brett raised the issue of AI "yes-man" behavior — specifically that ChatGPT adapts its tone and answers to please the user, especially when memory is enabled. Michael demonstrated this by showing how his ChatGPT gave a juror reaction that mirrored his own framing back to him.

**Implication for CaseDelta:** This is a direct design requirement. The mock jury simulator must be explicitly non-sycophantic. It needs to disagree, identify problems the attorney missed, and tell them how they lose — not just validate their case. Michael said: "I want to know what the worst juror has to say. I'm always asking: how do we lose?"

## **Real People vs. AI Jurors**

Michael and Brett debated whether AI can fully replicate real juror dynamics. Brett's instinct: AI jurors may not capture the full texture of human reaction, but the comparison between AI jury and real jury output over multiple mocks would itself be valuable data. If they converge, it builds confidence. If they diverge, that divergence is itself informative.

## **Statistical Validity**

Brett noted that the sample sizes from mock trials are rarely large enough for statistically valid demographic segmentation (e.g., "women aged 30–34 who own homes"). This means the AI's value isn't in demographic modeling but in qualitative synthesis — surfacing themes and language that moved jurors.

## **Document Volume Gap**

CaseDelta's current reliable ceiling of \~1,500–2,000 documents is well below Michael's operational scale (millions of documents). You acknowledged this directly and offered to tune it. This is a candid and important gap — it should be addressed in any follow-up proposal.

---

# **Strategic Signals & Intelligence**

## **Budget Signals**

* Michael spends $25–30K per mock trial session and ran 12 sessions on the Ford case — that's \~$300–360K on a single case.  
* He openly said he would spend "a quarter to half a million dollars" on mock trials for a major case.  
* He estimates much of that spend is "given away" on overhead (hotels, logistics, recruiter fees).  
* This firm is clearly not price-sensitive — they are value-sensitive. ROI must be framed in terms of wins, not savings.

## **Case Portfolio Signals**

* $1.8 billion class action verdict (real estate/NAR case) — one of his wins.  
* Current active case: a flavoring injury PI case with 1.7 million documents.  
* Death penalty defense work (capital cases) — where Brett runs extensive juror questionnaires.  
* Mechanical bull injury case mentioned ("Cocaine Cowboy" reference).  
* Flavoring case with sanctions litigation ongoing — actively using AI for argument framing.

## **Current AI Stack**

* **Grok (xAI)** — primary heavy-use tool. Used for document ingestion, legal argument drafting, and back-testing. He runs it with 6 competing agents internally (Heavy Grok). Uses Box for document storage, uploads 3,000-page batches.  
* **ChatGPT** — secondary. Used for some tasks; he noted it handles large document uploads slightly better than Grok in some cases. He dislikes its sycophancy.  
* **Co-counsel** — a third legal-specific AI tool he cross-pollinates with Grok and ChatGPT.  
* **Everlaw** — e-discovery platform for organizing large document productions.

## **Key Relationships & Names Mentioned**

* **Scott Hall** — the person/moment that gave Michael his "wow moment" with AI. Not elaborated on, but clearly a trusted referral source or colleague.  
* **Ford case** — a major prior case with 12 mock trials and a back-testing exercise Michael already ran.  
* **Moncrieff case** — a worker's compensation/fall fatality case Michael used as an example of how juror feedback changed his framing of the story.

---

# **Recommended Next Steps for CaseDelta**

## **Immediate Actions**

* **Prepare a proposal for the April mock trial.** Michael explicitly requested a proposal for using CaseDelta in their upcoming April mock. This is a live, time-sensitive opportunity.  
* The proposal should address two specific things: (1) how CaseDelta can help pre-mock (Tower 1 — presentation coaching), and (2) how it acts as the AI jury during/after the mock (Tower 2). Tower 3 can be introduced as the longer-term opportunity once they have back-catalog data loaded.  
* **Address the document scale gap directly.** Acknowledge that the current 1,500–2,000 document ceiling needs to be expanded. Give a concrete roadmap or estimated timeline for scaling to 10,000+ pages reliably. Michael uses 3,000-page batches with Grok — that's the baseline you need to meet first.

## **Product Recommendations**

* **Build for non-sycophancy by design.** The AI juror simulation must be configured to argue adversarially, identify weaknesses, and produce a "how you lose" analysis — not just affirm the attorney's case.  
* **Multi-agent architecture is the right direction.** Michael already understands and values multi-agent setups (he uses Grok's 6-agent system). Positioning CaseDelta's juror simulator as a multi-agent deliberation system with distinct personas will resonate immediately.  
* **Build a back-testing module as your proof-of-value hook.** Offer to run a validation session on one of their historical cases. If you can correctly predict a holdout juror from an old case, you'll earn the business.  
* **Design for Brett's workflow, not just Michael's vision.** The real-time juror research tool specifically needs to be fast, mobile-friendly or laptop-ready, and operable without IT support in a courtroom.  
* **Box integration would be a meaningful differentiator.** Michael stores all documents in Box. If CaseDelta can pull directly from Box rather than requiring manual uploads, it removes friction at a critical point.

## **Competitive Positioning**

* **Your strongest differentiator is data residency and privacy.** Michael's documents are among the most sensitive in existence (active litigation, class actions, death penalty cases). The fact that CaseDelta runs on your own hardware with your own models — not sending data to OpenAI, Anthropic, or xAI — is a meaningful legal and ethical advantage.  
* **Grok is your biggest competitive threat.** Michael loves it. Don't try to replace it universally — position CaseDelta as purpose-built for legal workflows with privacy guarantees Grok cannot match.  
* **Frame CaseDelta as the "Super Bowl simulation" platform.** Michael's own analogy: the Chiefs would spend anything to simulate a Super Bowl. CaseDelta is that simulation platform for trial lawyers.

---

# **Verbatim Quotes Worth Remembering**

**On motivation:** "I'm gonna go to trial and I'm gonna ask for fifty million, a hundred million, a billion dollars. I don't want to lose."

**On mock trials:** "All of this is just simulation to prepare me for the Super Bowl."

**On AI jurors:** "I want to know what the worst juror has to say. I'm always asking: how do we lose?"

**On back-testing value:** "A validation test is much better when I already know the results."

**On AI pace:** "In the last three or four months, it's gotten remarkably better — it's like a fold. It's the power of doubling."

**On document review:** "In the past, two lawyers would have taken a month to do this for me."

**On CaseDelta's privacy model:** "Does it all not on cloud-based, all secure?" — This was his first question after hearing about CaseDelta's capabilities. Privacy is a top-of-mind concern.

---

# **Open Questions to Resolve**

* What is Michael's timeline for the April mock? You need this to set a realistic proposal deadline.  
* Does he have deliberation videos from prior mocks that could feed Tower 3 immediately?  
* What is the structure of the juror questionnaires he uses (length, type of questions, handwritten vs. digital)?  
* Is there a budget range or engagement model he prefers (flat fee per case, monthly retainer, per-mock pricing)?  
* What is the case type for the April mock? This will determine which juror personas to configure.  
* Are there confidentiality constraints on using prior case data for back-testing, or would he be comfortable sharing anonymized data?  
* Does he use Everlaw's built-in AI features? If so, understanding their limitations would help position CaseDelta.

---

*— End of Report —*