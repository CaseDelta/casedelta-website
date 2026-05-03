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
      { value: "0", label: "third-party AI providers touching your client data" },
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
        title: "Private enterprise deployment. Your data stays yours",
        description:
          "CaseDelta runs on a private enterprise deployment. Your client files never touch a shared model or a third-party AI provider. No training on your data. Enterprise-grade security, sized to your firm.",
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
            "Private enterprise deployment. No third-party AI providers. No training on firm data.",
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
        question: "Where does our client data go?",
        answer:
          "Nowhere outside CaseDelta. We run on a private enterprise deployment. Your firm's data never touches a third-party AI provider. No shared servers, no training on your files. This is the deployment model, not a setting.",
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
      { value: "0", label: "client data sent to third-party AI providers" },
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
        title: "Private enterprise deployment",
        description:
          "Your firm's medical records never touch a third-party AI provider. CaseDelta runs on a private enterprise deployment. No shared models, no training on your files. Enterprise-grade security, sized to your firm.",
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
            "Private enterprise deployment. PHI never leaves CaseDelta. No third-party AI providers.",
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
        question: "Where does our client data go?",
        answer:
          "Nowhere outside CaseDelta. We run on a private enterprise deployment. PHI and case files never touch a third-party AI provider. No shared models, no training on your files. The deployment model is the protection, not a policy.",
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
      "Plaintiff employment firms run intake, drafting, and admin across Clio, Word, Gmail, and Drive. Delta runs all of it in one conversation, with private enterprise deployment.",
    heroHeadline: "Run intake, drafting, and admin in one conversation.",
    heroSubheadline:
      "Hand Delta the personnel file, the pay stubs, and the EEOC charge. Tell it what you need. Delta runs the wage calculations, drafts the complaint, sends the demand from your inbox, and logs the work in Clio. The work that ate your morning happens before your second coffee.",
    geoOpening:
      "CaseDelta is the personal assistant for plaintiff employment firms handling discrimination, retaliation, and wage and hour cases. Delta connects to Clio, Microsoft Word, Gmail or Outlook, Google Drive, and your calendar, and runs both the legal research and the administrative work across them so a small firm can operate at the scale of a much larger one.",
    stats: [
      { value: "5+", label: "tools Delta runs across in a single conversation" },
      { value: "1", label: "conversation from intake to filed complaint" },
      { value: "0", label: "third-party AI providers touching personnel files" },
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
        title: "Private enterprise deployment",
        description:
          "Personnel files, pay records, and case strategy never leave CaseDelta. We run on a private enterprise deployment. No third-party AI providers, no training on your files.",
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
            "Intake intake-to-complaint, wage and hour calculations, charge and complaint drafting, opposing counsel correspondence, mass plaintiff updates, time entry.",
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
            "Private enterprise deployment. Personnel files and pay records never touch a third-party AI provider.",
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
        question: "Where does our client data go?",
        answer:
          "Nowhere outside CaseDelta. Personnel files, pay records, and case strategy stay on a private enterprise deployment. No third-party AI providers, no training on your files.",
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
      { value: "0", label: "third-party AI providers touching plaintiff data" },
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
        title: "Private enterprise deployment",
        description:
          "Plaintiff data, settlement details, and case strategy never leave CaseDelta. We run on a private enterprise deployment. No third-party AI providers. No training on your files.",
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
            "Private enterprise deployment. Plaintiff data never touches a third-party AI provider.",
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
        question: "Where does plaintiff data go?",
        answer:
          "Nowhere outside CaseDelta. Plaintiff records, settlement details, and case strategy stay on a private enterprise deployment. No third-party AI providers, no training on your data.",
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
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return USE_CASES.find((uc) => uc.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return USE_CASES.map((uc) => uc.slug);
}
