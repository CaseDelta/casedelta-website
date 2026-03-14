
## **Sarah Carmody \- Family Law (02/12/2026)**

### **Current Tech Stack**

* **MyCase** (practice management)
* **Slack Free Tier** (30-day message retention)
* **MyCase** for client case data storage
* **External HDD** for backup storage
* **Google Drive** for sharing with opposing counsel
* **Outlook** for email

### **AI Disappointment & Trust Issues**

**Past Failed Experiences**

* **"Nothing has actually saved her time or actually worked"** \- has to review everything anyway
* Tried **Faster Outcomes Suite** \- left disappointed
* Associate tried **Claude** \- couldn't tell difference between two complex parenting plans
* **Feels scammed by AI salespeople**
* **Lacks trust** that AI will return the right data

**BUT: Still Optimistic**

* "I really do want it to work"
* Open to solutions that genuinely deliver

### **Critical Success Factor**

* Solution must be **"very good at recognizing very small details between parenting plans"**
* Accuracy on edge cases and nuance is non-negotiable

### **Dream Features & Use Cases**

**1\. Agentic Document Drafting**

* "Draft a DRA from the clients' documents"
* Agent reviews contract/form
* Agent reviews all documents
* Agent populates fields automatically

**2\. Financial Document Processing**

* **Standard requirement**: Bank statements and financials from **1-3 years back**
* Each month of statements \= **\~4 pages**
* Just bank statements alone:
  * 1 year \= **48 pages**
  * 3 years \= **144 pages**
* **Pain point**: Bank statements begin/end on varying days based on account creation
* **Feature request**: AI ingests statements and **re-aligns them** to consistent date ranges

**3\. Document Export & Formatting**

* Must create **spreadsheet or document from information**
* Copying from AI interface to document **"looks pretty bad and formatting gets messed up"**
* Output format is critical

**4\. Exhibit Management**

* Doesn't bates stamp much (only for trial, which is rare)
* More commonly needs to label documents as **"Exhibit 1", "Exhibit 2"**, etc.
* **Feature request**: Agent responds to query like "grab all the bank statements and label them exhibit 1 and make a PDF"

**5\. Client Communication**

* Wishes clients were **kept more up to date** with case progress
* Reduces "are we there yet?" inquiries

### **Case Volume & Complexity**

* Average case: **\~150 pages of documents**
* Large cases: **1000+ pages of documents**

### **User Experience Requirements**

**Critical UX Principles**

* **"A poor and clunky user-interface will make me quit it immediately"**
* **Doesn't like learning new things** \- appreciates simplicity and intuitiveness
* Values **OAuth** \- doesn't want to remember another password

**Integration Priority**

* Integration with existing platforms "isn't necessarily the most crucial thing"
* Standalone value more important than integration

### **Pricing Sensitivity**

**Subscription Fatigue**

* **Already has many subscriptions** \- apprehensive about another
* Interested in **value-based pricing** or alternative pricing structures
* Understands she must pay somehow
* **Really doesn't like subscription fees**
* Comfortable with: **\~$100/month**

---

## **Sarah Carmody \- In-Person Meeting (03/04/2026)**

**Location:** Sarah Carmody Law, LLC — 8600 W. 110th St, Suite 210, Overland Park, KS
**Attendees:** Camren (CaseDelta), Sarah Carmody (attorney/owner), Amy (admin/paralegal), Laurel (marketing, briefly)
**Context:** Follow-up to Zoom on 2/27. Camren arrived in person to work through the MyCase integration setup.

---

### **Meeting Summary**

This was a short (~17 min) working session intended to configure the MyCase API integration live. It surfaced a significant pre-meeting qualification failure and ended with a clear commitment: Sarah will be CaseDelta's first active integration test user, with weekly Tuesday 2pm feedback sessions agreed to for the next 4-5 weeks.

---

### **The Fail: MyCase Plan Was Never Verified**

**What happened:**

Camren came in prepared for two integration paths:
1. **Option A — MyCase Open API** ($60/mo plan upgrade required, Camren would cover it) — direct programmatic access to her MyCase data
2. **Option B — Agent Seat** ($89/mo) — stand up a second MyCase login the agent could use like a human, similar to what she'd done with her bookkeeper Amy before (shared login, 2FA friction)

Camren brought a **$120 cash envelope** (two months of the upgrade cost) to remove any financial objection to Option A.

**What was never asked — before the meeting, or in prior emails:**
> *"What MyCase plan are you currently on?"*

When Camren explained both options in the room and suggested checking her plan, Sarah navigated to her MyCase settings and discovered she **already has the Advanced plan**, which includes Open API access. No upgrade needed. No cash needed. The envelope was unnecessary.

**Sarah's reaction:** "I'm so sorry I made you come in." Camren's: "I should've picked that up from the beginning."

**Root cause:**
This was knowable before any in-person visit. The qualifying question — MyCase plan tier — was never asked across any of the following touchpoints:
- Feb 12 in-person meeting
- Feb 26 email thread ("Connecting to your MyCase + Slack/Drive + Outlook")
- Feb 27 Zoom
- Mar 2 calendar invite confirmation

**Time wasted:**
- Camren designed a cookie-scraping / session-based auth workaround for the no-API-access scenario
- Camren drove to her office and prepared an $120 cash offer
- ~15-20 min of meeting time explaining two paths when one didn't exist

**The lesson:**
For every future prospect involving an integration, ask plan-tier and API-access questions in the first email or on the first call. A single-sentence pre-call questionnaire ("What plan are you on in [tool]? Do you have API / developer access enabled?") eliminates entire categories of wasted effort.

---

### **What Was Actually Resolved**

**MyCase plan confirmed:** Advanced (Open API included)
**Integration path:** Option A — MyCase Open API. No upgrade, no additional cost to Sarah.
**Next step:** Camren to connect the API integration tonight while Sarah is not working. She may get logged out once; she can re-login tomorrow. She leaves at ~4:30pm, so Camren has the evening window.

**Amy's account:** Sarah revealed that Amy (her admin) previously shared Sarah's login with the bookkeeper, causing 2FA friction — they'd have to text Sarah a code every time. This problem is now moot: MyCase Advanced includes a **free external accountant login**. Amy was in the room and didn't know about it. Sarah told her live: "Amy, if you do their accounting now, they have a free login for your external accountant or bookkeeper now." This is a workflow improvement that may get Amy more engaged with the platform.

---

### **Firm Structure & Users**

| Person | Role | Notes |
|---|---|---|
| **Sarah Carmody** | Owner / Attorney | Decision-maker. Loves feedback loops, direct communicator. Hates clunky UX. |
| **Amy** | Admin / Paralegal | Day-to-day ops. Handles accounting liaison. Potential power user. |
| **Laurel** | Marketing | Not in room but mentioned twice. Loves checking out new systems. Sarah: "Laurel will be the most excited." Potential internal champion. |

**Document storage:** Everything is on MyCase ("yeah, everything's on here"). They technically back up to an external HDD but have only done it once — Amy has the drive physically attached to her computer.

---

### **Feedback Loop Agreed**

Camren asked for a 10–15 min weekly feedback block. Sarah agreed without hesitation.

**Schedule: Tuesdays at 2pm**
- First session: Tuesday, March 10
- Skip: Tuesday, March 17 (Sarah out of town)
- Resume: Tuesday, March 24
- ~4–5 sessions total

**What Camren asked for:** "Could I ask you for feedback every week? Like 10, 15 minutes? Because that's the biggest thing that's been slowing me down."
**Sarah:** "Yeah. That's fine." / "Right. Well, people don't like to give feedback — I've found."

This is a high-signal commitment. She didn't hedge or qualify. She offered a specific day and time.

---

### **Competitive Intel & Social Graph**

**Lauren Babits (Roth Davies):**
- Camren mentioned he's trying to help Lauren at Roth Davies; she doesn't respond.
- Sarah: "We like Lauren." No negative intel. Sarah and Laurel apparently know most of the KC family law community.

**Caitlin DuBois (Barnds Law):**
- Camren asked if she knew her. Sarah: "Lost cause" re: Barnds Law.
- Had only dealt with her once. Described her as "very young."
- **Takeaway:** Sarah's read of Barnds is negative. The Mia-to-Caitlin champion play at Barnds may face institutional friction beyond just Caitlin not responding to Camren.

**Laurel's grudge list:** Sarah mentioned Laurel "remembers all the shared grudges" in the KC family law community — she's the firm's institutional memory for who to like/not like. Laurel was not in the room but passed by. Amy: "She, she really does like [new systems]."

**Interesting case intel:** Sarah is handling a case where she has to facilitate the sale of land in Greece for a client. The clients are "boo-boo rich" (~$95K/mo income), have family in Albania, and purchased cars there. Sarah's role is essentially a case babysitter ("Did you call the realtor? Did you sign the forms?"). No CaseDelta relevance directly, but good relationship texture.

---

### **Sarah's Personality & Communication Style**

- Extremely direct. Quick to decide. Not a tire-kicker.
- Jokes freely — called Camren "nerdy" for the Star Wars concert story; riffed on her pajama outfit ("pajamas but put on a necklace")
- Low patience for tech jargon ("I don't know what word you're saying now" when Camren mentioned "re-hooking the authentication thing")
- The $120 cash envelope move registered positively: "That was really sweet." But she also immediately deflected the money and made it casual.
- Engagement level is genuine — she said "I hope it works out for you" and Camren's closer landed: "I want it to work so good it blows your mind." She responded: "Let's tell people about it."

---

### **Email History Context (Pre-Meeting)**

| Date | Thread | Key Content |
|---|---|---|
| Nov 17, 2025 | CaseDelta platform - Camren | First intro — pitched at paralegal/document collection angle, cc'd Laurel. Old product framing. No response to trial offer. |
| Dec 1, 2025 | Re: CaseDelta platform | Follow-up. Still old framing. No response. |
| Dec 16, 2025 | hi there | Casual re-engage. Offered free account for Laurel. No response. |
| Feb 12, 2026 | (in-person meeting) | Pivoted to new framing. Got engagement. |
| Feb 26, 2026 | Connecting to your MyCase + Slack/Drive + Outlook | Integration-focused pitch post-Feb 12. She replied same day. Agreed to Zoom. |
| Feb 27, 2026 | (Zoom) | Second meeting. Set up March 4 in-person. |
| Mar 2, 2026 | Accepted: Camren / Sarah Call | Calendar confirmation for today's meeting. |

**Pattern:** Three months of silence on the old "paralegal / document collection" pitch. One in-person meeting with the new "integration into your existing stack" framing → immediate response cadence. The reframe unlocked everything.

---

### **CRM Status Post-Meeting**

- **Pipeline status:** Demo / Pilot
- **Last contact:** March 4, 2026
- **Next follow-up:** March 10, 2026 (Tuesday 2pm — first weekly feedback session)
- **Notes to add:** MyCase Advanced confirmed (Open API included). Integration underway. Weekly Tuesdays 2pm agreed. Skip Mar 17. Laurel = internal champion candidate.

---

### **Open Action Items**

| # | Action | Owner | Deadline |
|---|---|---|---|
| 1 | Connect MyCase Open API integration tonight | Camren | Mar 4 (tonight) |
| 2 | Sarah to re-login if kicked out | Sarah | Mar 5 |
| 3 | Set up recurring Tuesday 2pm calendar invite | Camren | ASAP |
| 4 | First feedback session | Both | Mar 10 at 2pm |
| 5 | **Add plan-tier check to standard pre-meeting qualification** | Camren | Process change |

---

### **Key Takeaways**

1. **She's in.** Weekly feedback agreed. API access confirmed. This is the closest thing to a pilot customer CaseDelta has right now.

2. **The plan-tier fail is an operational lesson, not a relationship damage.** Sarah was good-natured about it. But the time cost was real and the pattern would compound across dozens of future prospects. Fix the qualification checklist now.

3. **Laurel is the internal amplifier.** Sarah said it herself: if this works, Laurel will be most excited and will want to tell people. Get Laurel a demo when the integration is stable.

4. **The $120 cash envelope move built trust even though it was unnecessary.** It demonstrated commitment and skin-in-the-game. Sarah noticed. Keep operating this way with warm leads — the gesture matters even when the logistics don't.

5. **Barnds Law read from Sarah:** "Lost cause." Take this with context — she's a competitor of sorts and may have her own biases — but factor it into the Mia/Caitlin DuBois play.

6. **She doesn't respond to cold outreach.** Three months of email silence proved it. In-person or warm intro is the only channel that works with Sarah. Likely true for a significant portion of solo and small-firm KC attorneys.
