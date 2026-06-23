/* ─── Use Case Data ─── */

export interface UseCasePainPoint {
  title: string;
  description: string;
}

export interface UseCaseCapability {
  title: string;
  description: string;
}

export interface DeltaKnowsEntry {
  label: string;
  value: string;
}

export interface UseCaseFAQ {
  question: string;
  answer: string;
}

export interface UseCase {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  geoOpening: string;
  stats: { value: string; label: string }[];
  painPoints: UseCasePainPoint[];
  howDeltaHelps: UseCaseCapability[];
  deltaLearnsExample: {
    firmName: string;
    entries: DeltaKnowsEntry[];
  };
  faq: UseCaseFAQ[];
  ctaText: string;
}

export const USE_CASES: UseCase[] = [
  /* ════════════════════════════════════════════
     1. PERSONAL INJURY
     ════════════════════════════════════════════ */
  {
    slug: "personal-injury",
    title: "Personal Injury",
    metaTitle: "CaseDelta for Personal Injury Firms | One Assistant Across Your Whole Stack",
    metaDescription:
      "Delta runs your PI practice across Clio, Drive, Word, Gmail, and Outlook. Hand it discovery, get back chronologies, demand letters, and opposing counsel emails in one conversation.",
    heroHeadline: "Run your PI practice in a single conversation.",
    heroSubheadline:
      "Hand Delta the medical records, the police report, and the carrier correspondence. Tell it what you need. Delta builds the chronology in Word, drafts the demand letter, emails the adjuster from your inbox, and logs the time in Clio. One sentence. Many tools. Hours of work, done in one go.",
    geoOpening:
      "CaseDelta is the personal assistant for personal injury firms that work across Clio, Word, Gmail or Outlook, Google Drive, and Calendar. Delta connects to the tools your firm already uses and runs both the legal research and the administrative work across them, so you can focus on winning more cases instead of switching between five apps to manage one.",
    stats: [
      { value: "5", label: "tools Delta runs across in a single conversation" },
      { value: "1 sentence", label: "to draft, send, and log a demand letter" },
      { value: "0", label: "of your client data used to train AI models" },
    ],
    painPoints: [
      {
        title: "Your stack is fragmented across five apps",
        description:
          "Records in Drive. Drafts in Word. Adjuster threads in Outlook. Case data in Clio. Time entries somewhere else. Every workflow means switching contexts and copying details by hand.",
      },
      {
        title: "Demand packages take days, not hours",
        description:
          "Pulling records, building a chronology, calculating damages, drafting the letter, attaching exhibits, sending to the carrier, logging the work. Each step lives in a different tool. The full sequence eats a day per case.",
      },
      {
        title: "Vertical AI tools force you to adopt yet another platform",
        description:
          "Every legal AI on the market lives inside one app and only handles one slice of the workflow. Your firm ends up with another silo to manage instead of one assistant that connects what you already have.",
      },
      {
        title: "Client data ends up in places it should not be",
        description:
          "Free AI tools route prompts and attachments through third-party providers. For a firm holding medical records and settlement details, that is a malpractice and HIPAA exposure waiting to happen.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Connects across the tools your firm already uses",
        description:
          "Clio, Microsoft Word, Gmail or Outlook, Google Drive, Calendar, DocuSign, Westlaw. Delta works inside your existing stack rather than asking your firm to migrate to a new one.",
      },
      {
        title: "Runs full demand workflows in one conversation",
        description:
          "Tell Delta what you need. It pulls medical records from Drive, builds the chronology in Word, computes specials, drafts the demand letter, sends it from your inbox to opposing counsel, and logs the time in Clio. One conversation. One sentence.",
      },
      {
        title: "Handles thousands of pages of records in minutes",
        description:
          "Hand Delta the full medical and billing record set. It extracts treatment timelines, providers, billing totals, and gaps. You get a structured chronology and a billing summary you can drop into the demand package.",
      },
      {
        title: "Morning briefing across your active cases",
        description:
          "Walk in to a briefing of what changed over the weekend, what is due this week, and which adjusters owe you a response. Built across Clio, Outlook, and your calendar. The only proactive feature on Delta, by design.",
      },
      {
        title: "Enterprise security. Your data stays yours",
        description:
          "Delta runs on enterprise AI under strict agreements: your data is never used to train any model and never retained by the provider. Each firm's data is isolated to the firm, encrypted at rest and in transit, with a signed BAA so client PII and PHI are secure, and a full audit trail of every action.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Sample PI firm",
      entries: [
        {
          label: "Tools connected",
          value: "Clio, Microsoft Word, Outlook, Google Drive, Google Calendar, DocuSign",
        },
        {
          label: "Workflows Delta runs",
          value:
            "Records review and chronology, demand letter drafting, opposing counsel correspondence, time entry, calendar holds, exhibit prep.",
        },
        {
          label: "One-sentence example",
          value:
            "\"Build the chronology for Hernandez from the records in Drive, draft the demand at 3x specials, email it to the adjuster, and log my time.\"",
        },
        {
          label: "Daily briefing",
          value:
            "Cases needing attention today, deadlines this week, adjusters who have not responded, settlement authority expiring.",
        },
        {
          label: "Data handling",
          value:
            "Per-firm isolation. Encrypted at rest and in transit. Never used to train AI, never sold or shared.",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta fit into a personal injury firm's existing stack?",
        answer:
          "Delta connects to the tools your firm already uses (Clio, Word, Gmail or Outlook, Drive, Calendar, DocuSign, Westlaw) and runs work across them in one conversation. Your firm does not adopt a new platform. You keep your stack and add an assistant that works on top of it.",
      },
      {
        question: "Can Delta build a full demand package end to end?",
        answer:
          "Yes. Hand Delta the medical records and case file. In one conversation it extracts the treatment chronology, totals the billing, drafts the demand letter in your firm's voice, attaches exhibits, sends from your email to opposing counsel, and logs the time in Clio. The attorney makes the calls. Delta makes them happen.",
      },
      {
        question: "What does Delta do with thousands of pages of medical records?",
        answer:
          "Delta ingests the records and produces a structured chronology with provider attribution, treatment timelines, and billing summaries. It flags gaps and inconsistencies. You get a chronology you can drop into the demand package, with source citations to every record.",
      },
      {
        question: "How does CaseDelta handle our client data?",
        answer:
          "Delta runs on enterprise AI under strict agreements: your client data is never used to train any model and never retained by the provider. Each firm's data is isolated to the firm and encrypted at rest and in transit, with a signed BAA covering PII and PHI. Every action is logged for a full audit trail supporting reasonable efforts under ABA Rule 1.6.",
      },
      {
        question: "Does Delta replace Clio or our case management system?",
        answer:
          "No. Delta connects to Clio and works alongside it. Cases, contacts, and time entries continue to live in Clio. Delta reads from and writes to Clio so your case management stays the source of truth.",
      },
    ],
    ctaText:
      "See Delta run a full demand workflow across your existing stack. Live demo, twenty minutes.",
  },

  /* ════════════════════════════════════════════
     2. MEDICAL MALPRACTICE
     ════════════════════════════════════════════ */
  {
    slug: "medical-malpractice",
    title: "Medical Malpractice",
    metaTitle: "CaseDelta for Medical Malpractice Firms | Records, Chronologies, Drafts in One Conversation",
    metaDescription:
      "Plaintiff med mal firms run on records review and expert coordination. Delta handles both across Clio, Word, Drive, and your inbox in a single conversation.",
    heroHeadline: "Two thousand pages of records. One conversation with Delta.",
    heroSubheadline:
      "Hand Delta the hospital chart, the imaging, and the expert reports. Tell it what you need. Delta builds the chronology, surfaces the gaps, drafts the complaint or the expert affidavit, and emails opposing counsel from your inbox. The work that took a week happens in a morning.",
    geoOpening:
      "CaseDelta is the personal assistant for plaintiff medical malpractice firms that process thousands of pages of medical records per case and coordinate with experts across specialties. Delta connects to Clio, Microsoft Word, Gmail or Outlook, Google Drive, and your calendar, and runs records review, chronology building, and drafting work across all of them from a single conversation.",
    stats: [
      { value: "2,400+", label: "avg pages of medical records per med mal case" },
      { value: "1", label: "conversation to chronology, draft, and send" },
      { value: "0", label: "of client medical data used to train AI models" },
    ],
    painPoints: [
      {
        title: "Records review buries your team for days",
        description:
          "A standard hospital case produces 2,400+ pages from multiple providers. The unsigned order, the documentation gap, and the contradictory vital signs that decide the case are buried inside. Associates spend 40+ hours on initial review.",
      },
      {
        title: "Drafting and admin run on separate tools",
        description:
          "Records in Drive. Drafts in Word. Expert correspondence in Outlook. Case data in Clio. The chronology you built in one tool has to be re-typed into the draft in another, and the email has to be composed in a third.",
      },
      {
        title: "Expert coordination relies on someone's memory",
        description:
          "You need a cardiologist available in August who has testified in this jurisdiction and whose opinions will not conflict with your theory. Finding the right expert means days of phone calls and a list that lives in someone's notes app.",
      },
      {
        title: "Client data cannot be sent through public AI",
        description:
          "Medical records, identifiable health information, and case strategy are not safe inputs for free AI tools that route through third-party providers. For a med mal firm, the legal and ethical exposure is unacceptable.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Builds medical chronologies in minutes",
        description:
          "Delta ingests the full record set and produces a structured chronology with provider attribution, treatment timelines, and billing summaries. Gaps, contradictions, and unsigned orders are flagged automatically. Source citations to every record.",
      },
      {
        title: "Drafts complaints and affidavits in your firm's voice",
        description:
          "Once the chronology is built, ask Delta to draft the complaint, the certificate of merit, the expert affidavit, or the demand letter in Word. Drafted in your firm's style, attached to the case in Clio, ready for review.",
      },
      {
        title: "Runs expert correspondence across your inbox",
        description:
          "Delta sends and tracks expert outreach from your email. It pulls availability, follows up on retention agreements, and keeps the case file in Clio current with every exchange. No CRM to maintain.",
      },
      {
        title: "Morning briefing across active matters",
        description:
          "What changed in your cases overnight, which deadlines hit this week, which experts owe responses, which deposition dates need a hold on the calendar. Built across Clio, Outlook, and Calendar.",
      },
      {
        title: "Enterprise security for medical records",
        description:
          "Delta runs on enterprise AI under strict agreements: your data is never used to train any model and never retained by the provider. Your firm's medical records are isolated to the firm and encrypted at rest and in transit, with a signed BAA so PHI is secure and HIPAA-compliant, and a full audit trail of every action.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Sample med mal firm",
      entries: [
        {
          label: "Tools connected",
          value: "Clio, Microsoft Word, Outlook, Google Drive, Google Calendar, Westlaw",
        },
        {
          label: "Workflows Delta runs",
          value:
            "Medical records ingestion, chronology building, complaint and affidavit drafting, expert correspondence, deposition prep, time entry.",
        },
        {
          label: "One-sentence example",
          value:
            "\"Build the chronology for Chen from the OR record set, flag any documentation gaps, draft the certificate of merit, and email Dr. Patel for a retention call.\"",
        },
        {
          label: "Anomalies surfaced",
          value:
            "Unsigned physician orders, multi-day documentation gaps, vital sign contradictions, back-dated entries. All cited to source.",
        },
        {
          label: "Data handling",
          value:
            "Per-firm isolation. Medical records encrypted at rest and in transit, never used to train AI, never sold or shared.",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta process thousands of pages of medical records?",
        answer:
          "Delta ingests the records in any format, builds a structured chronology organized by date, provider, and record type, and produces a navigable timeline with source citations. Gaps and contradictions are flagged automatically. What takes an associate 40 hours takes Delta about half an hour, with the attorney reviewing rather than building from scratch.",
      },
      {
        question: "What anomalies does Delta detect?",
        answer:
          "Documentation gaps, vital signs that contradict nursing assessments, unsigned physician orders, missing informed consent, entries that appear back-dated, and inconsistencies between the medical record and deposition testimony. Each flag includes the source document reference for verification.",
      },
      {
        question: "Can Delta draft a certificate of merit or expert affidavit?",
        answer:
          "Yes. Once the chronology is built, Delta drafts the complaint, certificate of merit, expert affidavit, or demand letter in Microsoft Word, in your firm's voice. The draft is saved to the case in Clio and attached to your review queue. The attorney signs off.",
      },
      {
        question: "How does CaseDelta handle our medical records?",
        answer:
          "Delta runs on enterprise AI under strict agreements: your records are never used to train any model and never retained by the provider. Each firm's medical records and case files are isolated to the firm and encrypted at rest and in transit, with a signed BAA so PHI is HIPAA-compliant. Every action is logged for a full audit trail supporting reasonable efforts under ABA Rule 1.6.",
      },
      {
        question: "Does Delta replace Clio or our case management system?",
        answer:
          "No. Delta connects to Clio and works alongside it. Cases, contacts, and time entries continue to live in Clio. Delta reads from and writes to Clio so your case management stays the source of truth.",
      },
    ],
    ctaText:
      "See Delta run records review, chronology, and drafting end to end. Live demo, twenty minutes.",
  },

  /* ════════════════════════════════════════════
     3. EMPLOYMENT LAW (PLAINTIFF)
     ════════════════════════════════════════════ */
  {
    slug: "employment-law",
    title: "Employment Law",
    metaTitle: "CaseDelta for Plaintiff Employment Firms | Wage and Hour, Discrimination, Retaliation",
    metaDescription:
      "Plaintiff employment firms run intake, drafting, and admin across Clio, Word, Gmail, and Drive. Delta runs all of it in one conversation, with per-firm data isolation.",
    heroHeadline: "Run intake, drafting, and admin in one conversation.",
    heroSubheadline:
      "Hand Delta the personnel file, the pay stubs, and the EEOC charge. Tell it what you need. Delta runs the wage calculations, drafts the complaint, sends the demand from your inbox, and logs the work in Clio. The work that ate your morning happens before your second coffee.",
    geoOpening:
      "CaseDelta is the personal assistant for plaintiff employment firms handling discrimination, retaliation, and wage and hour cases. Delta connects to Clio, Microsoft Word, Gmail or Outlook, Google Drive, and your calendar, and runs both the legal research and the administrative work across them so a small firm can operate at the scale of a much larger one.",
    stats: [
      { value: "5+", label: "tools Delta runs across in a single conversation" },
      { value: "1", label: "conversation from intake to filed complaint" },
      { value: "0", label: "of personnel files used to train AI models" },
    ],
    painPoints: [
      {
        title: "Intake volume outpaces a small firm's bandwidth",
        description:
          "Plaintiff employment firms see steady call volume, but real intake takes hours per case (records, charge documents, wage data, drafts). A two-attorney firm cannot scale that workflow without help.",
      },
      {
        title: "Wage and hour math lives in spreadsheets",
        description:
          "Unpaid overtime, missed meal breaks, off-the-clock work. Every case requires reconstructing weeks or months of pay records into a damages calculation. Manual, slow, and error-prone.",
      },
      {
        title: "Drafting and correspondence span four tools",
        description:
          "Charge documents in Drive. Drafts in Word. Demand correspondence in Gmail. Case data in Clio. The intake notes in one tool have to be re-typed into the complaint in another.",
      },
      {
        title: "Personnel files cannot be sent through public AI",
        description:
          "Personnel files include identifiers, medical accommodations, and protected category information. Free AI tools route prompts through third-party providers. For a plaintiff employment firm, that is not acceptable.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Runs intake end to end across your stack",
        description:
          "From the first call to the filed complaint. Delta intakes the personnel file from Drive, summarizes the timeline, runs the wage calculation, drafts the complaint or charge in Word, and saves the case file to Clio. One conversation.",
      },
      {
        title: "Wage and hour calculations in seconds",
        description:
          "Hand Delta the pay records and the work schedule. It computes unpaid overtime, missed-break premiums, liquidated damages, and statute of limitations cutoffs. Numbers cited to source. Drop straight into the demand or complaint.",
      },
      {
        title: "Drafts complaints and demand letters in your voice",
        description:
          "Delta drafts EEOC charges, NLRB filings, demand letters, and complaints in Microsoft Word in your firm's drafting style. Drafts land in Clio attached to the matter, ready for attorney review.",
      },
      {
        title: "Three hundred client updates in a morning",
        description:
          "Mass tort overlap or large class case? Delta drafts and sends personalized status updates to hundreds of plaintiffs at once, from your firm's email, with case-specific details. The attorney makes the calls. Delta makes them happen.",
      },
      {
        title: "Per-firm isolation",
        description:
          "Personnel files, pay records, and case strategy are isolated per firm, encrypted at rest and in transit, and never used to train AI. Your files are never sold or shared, with a full audit trail of every action.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Sample plaintiff employment firm",
      entries: [
        {
          label: "Tools connected",
          value: "Clio, Microsoft Word, Gmail, Google Drive, Google Calendar, DocuSign",
        },
        {
          label: "Workflows Delta runs",
          value:
            "Intake to filed complaint, wage and hour calculations, charge and complaint drafting, opposing counsel correspondence, mass plaintiff updates, time entry.",
        },
        {
          label: "One-sentence example",
          value:
            "\"Run unpaid overtime for the Reyes pay records, draft the FLSA complaint, attach the schedule analysis, and email it to opposing counsel.\"",
        },
        {
          label: "Mass updates",
          value:
            "Send personalized status emails to three hundred class members from the firm's inbox, populated with case-specific details.",
        },
        {
          label: "Data handling",
          value:
            "Per-firm isolation. Personnel files and pay records encrypted at rest and in transit, never used to train AI, never sold or shared.",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta handle wage and hour calculations?",
        answer:
          "Delta ingests pay records and schedules and computes unpaid overtime, missed-break premiums, liquidated damages, and statute of limitations cutoffs. Every figure is cited to a source record. The output drops directly into the demand letter or complaint.",
      },
      {
        question: "Can Delta send personalized updates to hundreds of plaintiffs?",
        answer:
          "Yes. For class or mass-plaintiff cases, Delta drafts and sends personalized status updates to hundreds of plaintiffs from your firm's inbox in a single morning, populated with case-specific details. The attorney sets the message and recipient list. Delta sends them.",
      },
      {
        question: "Does Delta draft EEOC charges and FLSA complaints?",
        answer:
          "Yes. Delta drafts charges, complaints, demand letters, and discovery responses in Microsoft Word in your firm's voice. Drafts are saved to the matter in Clio for attorney review.",
      },
      {
        question: "How does CaseDelta handle our client data?",
        answer:
          "Personnel files, pay records, and case strategy are isolated per firm and encrypted at rest and in transit. They are never used to train AI, and never sold or shared. Every action Delta takes is logged for a full audit trail and reasonable efforts under ABA Rule 1.6.",
      },
      {
        question: "Does Delta replace Clio or our case management system?",
        answer:
          "No. Delta connects to Clio and works alongside it. Cases and time entries continue to live in Clio as the source of truth. Delta reads from and writes to it.",
      },
    ],
    ctaText:
      "See Delta run intake, wage calculations, and drafting in one conversation. Live demo, twenty minutes.",
  },

  /* ════════════════════════════════════════════
     4. MASS TORT
     ════════════════════════════════════════════ */
  {
    slug: "mass-tort",
    title: "Mass Tort",
    metaTitle: "CaseDelta for Mass Tort Firms | Plaintiff Operations at Scale",
    metaDescription:
      "Mass tort and class firms run plaintiff operations across thousands of cases at once. Delta runs intake, status updates, drafts, and admin across your stack in one conversation.",
    heroHeadline: "Three hundred plaintiff updates. Sent before lunch.",
    heroSubheadline:
      "Mass tort firms run thousands of cases in parallel. Delta sends personalized status updates to every plaintiff, builds chronologies for new intakes, drafts demand letters at scale, and keeps Clio current. All in one conversation, across the tools your firm already uses.",
    geoOpening:
      "CaseDelta is the personal assistant for mass tort and class action firms that operate plaintiff workflows across thousands of cases at once. Delta connects to Clio, Microsoft Word, Gmail or Outlook, Google Drive, and your calendar, and runs both the per-case work and the firm-wide operations from a single conversation.",
    stats: [
      { value: "300+", label: "personalized plaintiff updates Delta can send in a morning" },
      { value: "1", label: "conversation to operate at firm-wide scale" },
      { value: "0", label: "of plaintiff data used to train AI models" },
    ],
    painPoints: [
      {
        title: "Plaintiff communication is the unspoken full-time job",
        description:
          "Three hundred plaintiffs each expecting status updates means a full-time staffer doing nothing else. Templated emails feel impersonal. Personal emails take days. Neither scales.",
      },
      {
        title: "Intake at scale buries the firm",
        description:
          "Every new plaintiff means records, retainer, intake summary, case-file creation, calendar holds. Multiplied across hundreds or thousands of cases, the admin alone consumes the firm.",
      },
      {
        title: "Tool fragmentation compounds at scale",
        description:
          "What is annoying at twenty cases is fatal at two thousand. Records in Drive, drafts in Word, plaintiff inbox in Gmail, case data in Clio. Every workflow multiplied across thousands of plaintiffs.",
      },
      {
        title: "Plaintiff data cannot route through public AI",
        description:
          "Mass tort plaintiff intake includes medical, financial, and identifying information. Free AI tools that route through third-party providers create exposure your firm cannot accept.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Personalized plaintiff updates at scale",
        description:
          "In a single morning, Delta drafts and sends personalized status updates to hundreds of plaintiffs from your firm's email, populated with case-specific details from Clio. Templated does not mean impersonal.",
      },
      {
        title: "Intake automation across the stack",
        description:
          "New plaintiff comes in. Delta intakes the records from Drive, summarizes the timeline in Word, creates the case in Clio, books the intake call on the calendar, and sends the retainer through DocuSign. One conversation.",
      },
      {
        title: "Drafts demand letters and discovery in bulk",
        description:
          "Delta drafts plaintiff-specific demand letters, complaints, and discovery responses across your matter set in Word, customized to each plaintiff's facts. Saved to Clio attached to the right case.",
      },
      {
        title: "Firm-wide morning briefing",
        description:
          "Across thousands of plaintiffs: which cases hit deadlines this week, which need partner attention, which plaintiffs have not responded in 30 days. Built across Clio, Outlook, and Calendar.",
      },
      {
        title: "Per-firm isolation",
        description:
          "Plaintiff data, settlement details, and case strategy are isolated per firm, encrypted at rest and in transit, and never used to train AI. Your files are never sold or shared, with a full audit trail of every action.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Sample mass tort firm",
      entries: [
        {
          label: "Tools connected",
          value: "Clio, Microsoft Word, Outlook, Google Drive, Google Calendar, DocuSign",
        },
        {
          label: "Workflows Delta runs",
          value:
            "Per-plaintiff intake, mass-personalized updates, demand and discovery drafting, retainer execution, calendar holds, time entry, daily firm briefing.",
        },
        {
          label: "One-sentence example",
          value:
            "\"Send a personalized monthly update to every plaintiff in the Helix MDL, pulling case status from Clio and noting next steps.\"",
        },
        {
          label: "Daily briefing",
          value:
            "Cases needing partner attention, deadlines this week, plaintiffs who have gone silent, retainers awaiting signature.",
        },
        {
          label: "Data handling",
          value:
            "Per-firm isolation. Plaintiff data encrypted at rest and in transit, never used to train AI, never sold or shared.",
        },
      ],
    },
    faq: [
      {
        question: "Can Delta really send hundreds of personalized plaintiff updates at once?",
        answer:
          "Yes. Delta drafts and sends personalized status updates to hundreds of plaintiffs from your firm's email in a single conversation. Each message is populated with case-specific details from Clio. The attorney sets the cadence and tone. Delta sends.",
      },
      {
        question: "How does Delta handle new plaintiff intake at scale?",
        answer:
          "Delta intakes the records from Drive, summarizes the timeline, creates the case in Clio with the right matter type, books the intake call on the calendar, and sends the retainer through DocuSign. One conversation per plaintiff, automated end to end.",
      },
      {
        question: "Does Delta draft demand letters and discovery in bulk?",
        answer:
          "Yes. Delta produces plaintiff-specific drafts across your matter set in Microsoft Word, customized to each plaintiff's facts and saved to the right case in Clio. The attorney reviews and signs off.",
      },
      {
        question: "How does CaseDelta handle plaintiff data?",
        answer:
          "Plaintiff records, settlement details, and case strategy are isolated per firm and encrypted at rest and in transit. They are never used to train AI, and never sold or shared. Every action Delta takes is logged for a full audit trail and reasonable efforts under ABA Rule 1.6.",
      },
      {
        question: "Does Delta replace Clio or our case management system?",
        answer:
          "No. Delta connects to Clio and works alongside it. Cases, plaintiffs, and time entries continue to live in Clio. Delta reads from and writes to it so case management stays the source of truth.",
      },
    ],
    ctaText:
      "See Delta operate plaintiff workflows at scale. Live demo, twenty minutes.",
  },

  /* ════════════════════════════════════════════
     5. INSURANCE DEFENSE
     ════════════════════════════════════════════ */
  {
    slug: "insurance-defense",
    title: "Insurance Defense",
    metaTitle: "CaseDelta for Insurance Defense Firms | Every Matter Current, Billable Time Protected",
    metaDescription:
      "Insurance defense bills by the hour, so saved time is real money. Delta connects across your claims files, email, calendar, and case manager, tracks every deadline, and drafts the work, with a cited source for every answer.",
    heroHeadline: "Hourly work, faster. Every matter, current.",
    heroSubheadline:
      "Defense work bills by the hour, so the hours you don't spend re-reading the file are billable hours back. Delta connects across your claims files, email, calendar, and case manager, keeps every matter current, tracks every court and carrier deadline, and drafts the answer, the motion response, and the status report, with a cited source for every fact.",
    geoOpening:
      "CaseDelta is the AI associate for insurance defense firms that carry heavy caseloads across multiple carriers and standard, integratable stacks. Delta connects to Clio, Filevine, Microsoft 365, Google Workspace, and your calendar, keeps a current picture of every matter, and does the document-heavy work that eats billable time, so attorneys spend their hours on work that bills.",
    stats: [
      { value: "Every", label: "deadline and carrier deadline tracked across your matters" },
      { value: "1", label: "connected picture of every file, always current" },
      { value: "0", label: "of your client data used to train AI models" },
    ],
    painPoints: [
      {
        title: "Billable time disappears into re-reading the file",
        description:
          "Every status report, every motion response, every carrier update starts with re-reading the claims file. On an hourly matter, the time spent reconstructing what you already know is time you cannot bill for value.",
      },
      {
        title: "Deadlines hide across carriers and courts",
        description:
          "Reporting deadlines, discovery cutoffs, expert disclosures, and carrier reporting requirements live in different systems. Missing one is a malpractice and coverage problem, and tracking them by hand is its own job.",
      },
      {
        title: "A growing defense team starts dropping balls",
        description:
          "Once a firm grows past the partner who remembers everything, matters slip. Status reports go out late, carrier updates lapse, and no one has a current, shared picture of every file.",
      },
      {
        title: "Accuracy is non-negotiable",
        description:
          "A misquoted record or an invented citation in a brief is a credibility loss in front of a judge. Generic AI that hallucinates citations is not usable on a real defense matter.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Connects across your claims files and stack",
        description:
          "Clio, Filevine, Microsoft 365 or Google Workspace, your calendar, and your document store. Delta reads the file so you don't have to re-read it, and works inside the tools your firm already runs.",
      },
      {
        title: "Tracks every deadline, every matter",
        description:
          "Court deadlines, discovery cutoffs, expert disclosures, and carrier reporting requirements, surfaced before they hit. Delta keeps one current picture of every matter for the whole team.",
      },
      {
        title: "Drafts the responses and reports",
        description:
          "Answers, motion responses, discovery responses, and carrier status reports, drafted in your firm's voice from the real file and saved to the matter for attorney review. The attorney signs off; Delta does the reconstruction.",
      },
      {
        title: "Cites the exact source for every fact",
        description:
          "Every claim Delta makes links to the page it came from. No invented case law, no hallucinated citations. You can click through and verify before anything goes to a carrier or a court.",
      },
      {
        title: "Enterprise security, isolated to your firm",
        description:
          "Delta runs on enterprise AI under strict agreements: your data is never used to train any model and never retained by the provider. Every matter is isolated to your firm with a full, exportable audit trail, and a signed BAA covers PHI for bodily-injury defense.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Sample insurance defense firm",
      entries: [
        {
          label: "Tools connected",
          value: "Clio or Filevine, Microsoft 365, Outlook, OneDrive or Google Drive, Calendar",
        },
        {
          label: "Workflows Delta runs",
          value:
            "File review and status reconstruction, deadline tracking, answer and motion-response drafting, carrier status reports, deposition summaries, time entry.",
        },
        {
          label: "One-sentence example",
          value:
            "\"Brief me on the Delgado matter: status, open deadlines, the latest from the carrier, and the single most urgent next action.\"",
        },
        {
          label: "Citations",
          value:
            "Every fact links to the source page, so a status report or motion response can be verified before it leaves the firm.",
        },
        {
          label: "Data handling",
          value:
            "Enterprise AI under no-retention and no-training agreements. Isolated to your firm, encrypted at rest and in transit, with a signed BAA for PHI.",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta save billable time on an hourly matter?",
        answer:
          "Delta reads the claims file so attorneys don't re-read it for every status report, motion response, or carrier update. It produces the cited reconstruction in minutes, and the attorney spends billable hours on judgment and strategy rather than reassembling the file.",
      },
      {
        question: "Can Delta track court and carrier deadlines across matters?",
        answer:
          "Yes. Delta keeps one current picture of every matter across your calendar, case manager, and email, and surfaces court deadlines, discovery cutoffs, expert disclosures, and carrier reporting requirements before they hit.",
      },
      {
        question: "How accurate are Delta's citations?",
        answer:
          "Delta grounds every answer in the real file and cites the exact source page. If it cannot find the source, it says so instead of inventing one. You can click through and verify before anything goes to a carrier or a court.",
      },
      {
        question: "How does CaseDelta handle carrier and PHI data?",
        answer:
          "Delta runs on enterprise AI under no-retention and no-training agreements, with each firm's data isolated to the firm and encrypted at rest and in transit. A signed BAA covers PHI in bodily-injury defense, and every action is logged for a full audit trail supporting ABA Rule 1.6.",
      },
      {
        question: "Does Delta replace our case management system?",
        answer:
          "No. Delta connects to Clio, Filevine, or your existing case manager and works alongside it. Matters and time entries continue to live in your system of record; Delta reads from and writes to it.",
      },
    ],
    ctaText:
      "See Delta keep every defense matter current and billable. Live demo, twenty minutes.",
  },

  /* ════════════════════════════════════════════
     6. COMMERCIAL LITIGATION
     ════════════════════════════════════════════ */
  {
    slug: "commercial-litigation",
    title: "Commercial Litigation",
    metaTitle: "CaseDelta for Commercial Litigation Firms | Discovery at Scale, Every Matter Current",
    metaDescription:
      "Commercial and business litigation runs on large document sets and tight deadlines. Delta connects across your stack, keeps every matter current, summarizes depositions, and works discovery at scale, with cited sources.",
    heroHeadline: "Discovery at scale. Every matter, current.",
    heroSubheadline:
      "Commercial disputes run on large document sets, many moving deadlines, and a team that has to stay coordinated. Delta connects across your case manager, email, calendar, and document store, keeps one current picture of every matter, summarizes depositions, and works discovery at scale, with a cited source for every fact.",
    geoOpening:
      "CaseDelta is the AI associate for commercial and business litigation firms working large document sets across standard, integratable stacks. Delta connects to Clio, Filevine, Microsoft 365, Google Workspace, and your document store, keeps every matter current for the whole team, and does the document-heavy work that eats billable time.",
    stats: [
      { value: "Thousands", label: "of pages of discovery, summarized with citations" },
      { value: "1", label: "current picture of every matter, shared across the team" },
      { value: "0", label: "of your client data used to train AI models" },
    ],
    painPoints: [
      {
        title: "Document volume outpaces the team",
        description:
          "A single commercial matter can produce tens of thousands of pages of contracts, correspondence, and financial records. Finding the decisive document and keeping the record straight is a constant drain.",
      },
      {
        title: "A growing team loses the thread",
        description:
          "As a litigation group adds associates, no single person holds the full picture of every matter. Deadlines, deposition prep, and discovery status fragment across inboxes and folders.",
      },
      {
        title: "Deposition and document review eat associate hours",
        description:
          "Summarizing depositions, building issue chronologies, and reviewing productions are exactly the cognitive work that consumes billable time without requiring partner judgment.",
      },
      {
        title: "Accuracy in front of the court is non-negotiable",
        description:
          "A misquoted exhibit or a hallucinated citation undermines credibility. Generic AI that cannot reliably cite its sources is not usable on a real matter.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Connects across your stack and document store",
        description:
          "Clio, Filevine, Microsoft 365 or Google Workspace, your calendar, and your document store. Delta keeps one current picture of every matter and works inside the tools your firm already runs.",
      },
      {
        title: "Works discovery at scale",
        description:
          "Delta reviews large productions, builds issue chronologies, surfaces the decisive documents, and flags gaps, with a citation to the exact source for every finding.",
      },
      {
        title: "Summarizes depositions and drafts the work",
        description:
          "Deposition summaries, issue outlines, motion responses, and status memos, drafted in your firm's voice from the real record and saved to the matter for attorney review.",
      },
      {
        title: "Keeps a growing team organized",
        description:
          "Every deadline, every open task, every matter's status in one shared place, so the firm can add associates without losing the thread. Oversight that doesn't depend on one person remembering everything.",
      },
      {
        title: "Enterprise security, isolated to your firm",
        description:
          "Delta runs on enterprise AI under strict agreements: your data is never used to train any model and never retained by the provider. Every matter is isolated to your firm with a full, exportable audit trail.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Sample commercial litigation firm",
      entries: [
        {
          label: "Tools connected",
          value: "Clio or Filevine, Microsoft 365, Outlook, OneDrive or Google Drive, Calendar",
        },
        {
          label: "Workflows Delta runs",
          value:
            "Discovery review at scale, issue chronologies, deposition summaries, motion-response drafting, deadline tracking, status memos, time entry.",
        },
        {
          label: "One-sentence example",
          value:
            "\"Summarize the Whitman deposition, build an issue chronology on the breach claim, and tell me what's due on this matter in the next two weeks.\"",
        },
        {
          label: "Oversight",
          value:
            "One current, shared picture of every matter: deadlines, open tasks, and status, so a growing team stays coordinated.",
        },
        {
          label: "Data handling",
          value:
            "Enterprise AI under no-retention and no-training agreements. Isolated to your firm, encrypted at rest and in transit, with a full audit trail.",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta handle large commercial document sets?",
        answer:
          "Delta reviews large productions, builds issue chronologies, surfaces the decisive documents, and flags gaps, with a citation to the exact source for every finding. What takes associates days of review, Delta produces in minutes for attorney verification.",
      },
      {
        question: "Can Delta summarize depositions?",
        answer:
          "Yes. Delta produces deposition summaries and issue outlines from the real transcript, in your firm's voice, with citations, saved to the matter for attorney review.",
      },
      {
        question: "How does Delta help a growing litigation team stay organized?",
        answer:
          "Delta keeps one current, shared picture of every matter across your case manager, calendar, and email: every deadline, every open task, every matter's status. The firm can add associates without any single person having to hold the whole picture.",
      },
      {
        question: "How does CaseDelta handle our client data?",
        answer:
          "Delta runs on enterprise AI under no-retention and no-training agreements, with each firm's data isolated to the firm and encrypted at rest and in transit. Every action is logged for a full, exportable audit trail supporting reasonable efforts under ABA Rule 1.6.",
      },
      {
        question: "Does Delta replace our case management system?",
        answer:
          "No. Delta connects to Clio, Filevine, or your existing case manager and works alongside it. Matters and time entries continue to live in your system of record; Delta reads from and writes to it.",
      },
    ],
    ctaText:
      "See Delta work discovery and keep every matter current. Live demo, twenty minutes.",
  },
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return USE_CASES.find((uc) => uc.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return USE_CASES.map((uc) => uc.slug);
}
