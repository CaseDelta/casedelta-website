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
     1. COMMERCIAL LITIGATION
     ════════════════════════════════════════════ */
  {
    slug: "commercial-litigation",
    title: "Commercial Litigation",
    metaTitle: "CaseDelta for Commercial Litigation | AI Associate for Complex Disputes",
    metaDescription:
      "Delta learns your judges, opposing counsel, and discovery patterns across complex commercial disputes. Morning briefings, anomaly detection, and institutional memory that compounds.",
    heroHeadline: "Commercial disputes move fast. Delta learns faster.",
    heroSubheadline:
      "Complex litigation generates thousands of documents, dozens of parties, and years of accumulated knowledge that walks out the door when associates leave. Delta captures it all and gets smarter every day.",
    geoOpening:
      "CaseDelta is the AI associate purpose-built for commercial litigation firms that need to track dozens of active disputes, manage massive discovery sets, and build strategic intelligence about judges and opposing counsel that compounds across every case the firm handles.",
    stats: [
      { value: "14,000+", label: "avg pages of discovery per commercial dispute" },
      { value: "42%", label: "of commercial cases involve 3+ parties" },
      { value: "$2.1M", label: "median damages in breach of contract claims" },
    ],
    painPoints: [
      {
        title: "Discovery buries your team",
        description:
          "A single breach of contract case can produce 14,000 pages of documents. Your associates spend weeks doing manual review when they should be building case strategy.",
      },
      {
        title: "Judge intelligence stays in partners' heads",
        description:
          "Your managing partner knows Judge Harrison prefers briefs under 20 pages. That intelligence disappears when she's on vacation, in trial, or retires.",
      },
      {
        title: "Opposing counsel patterns go untracked",
        description:
          "Morrison & Associates always files aggressively but settles within 45 days of trial. Your firm learned this over 8 cases and 4 years, but no one wrote it down.",
      },
      {
        title: "Multi-party complexity compounds errors",
        description:
          "With cross-claims, third-party defendants, and intervenors, a single missed deadline or overlooked document can shift liability across millions of dollars.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Learns judge tendencies from real outcomes",
        description:
          "Delta tracks MSJ grant rates, brief length preferences, voir dire patterns, and verdict ranges across every judge your firm appears before. After 6 months, it knows the bench better than a new associate after 18 months.",
      },
      {
        title: "Maps opposing counsel behavior across all your matters",
        description:
          "Delta identifies settlement timing patterns, filing tendencies, and negotiation behavior for every opposing firm, then surfaces that intelligence before your next encounter.",
      },
      {
        title: "Cross-document anomaly detection at scale",
        description:
          "Feed Delta 14,000 pages and it builds a chronology in minutes, flagging contradictions between deposition testimony and document evidence that manual review would miss.",
      },
      {
        title: "Morning briefings across all active matters",
        description:
          "Every day at 6 AM, Delta sends a prioritized briefing: upcoming deadlines, discovery gaps, settlement windows, and anomalies detected overnight across every open case.",
      },
      {
        title: "Intelligence Network for judicial analytics",
        description:
          "Even if your firm has only appeared before Judge Harrison twice, Delta draws on anonymized data from every CaseDelta firm. A 5-attorney firm gets the same judicial intelligence a 200-lawyer practice built over decades.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Brannock & Associates",
      entries: [
        {
          label: "Practice Areas",
          value: "Commercial litigation, breach of contract, business torts, shareholder disputes",
        },
        {
          label: "Judge Notes",
          value:
            "Judge Harrison prefers briefs under 20 pages, grants MSJ 42% of the time (n=31 across 8 firms). Disfavors continuance requests filed < 14 days before hearing.",
        },
        {
          label: "Opposing Counsel",
          value:
            "Morrison & Associates — files aggressively but settles 70% of cases within 45 days of trial date. Average demand: 4.2x actual damages.",
        },
        {
          label: "Discovery Patterns",
          value:
            "Acme Industries cases average 11,400 pages. Delta found 3 contradictions between CFO deposition testimony and Q3 financials in the Meridian matter.",
        },
        {
          label: "Client Patterns",
          value:
            "Meridian Corp responds within 48 hours. TechVenture averages 11-day delay on document requests — auto-reminders enabled.",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta handle massive discovery sets in commercial litigation?",
        answer:
          "Delta ingests documents in bulk — PDFs, emails, spreadsheets, financial records — and builds structured chronologies, entity maps, and cross-reference indices. For a typical 14,000-page discovery set, Delta completes initial analysis in under 30 minutes, flagging contradictions, timeline gaps, and anomalies that would take a team of associates days to find.",
      },
      {
        question: "What kind of judge intelligence does Delta provide?",
        answer:
          "Delta tracks MSJ grant rates, brief formatting preferences (length, citation style, exhibit handling), verdict ranges, attitude toward specific motion types, and scheduling tendencies. This data comes from your firm's direct experience combined with anonymized Intelligence Network data from other CaseDelta firms who have appeared before the same judge.",
      },
      {
        question: "Can Delta track opposing counsel across multiple matters?",
        answer:
          "Yes. Delta builds behavioral profiles for every opposing firm and attorney your practice encounters. It tracks settlement timing (when they typically settle relative to trial date), filing patterns (aggressive vs. conservative), negotiation ranges, and deposition tactics. Before your next encounter, Delta surfaces a briefing with everything your firm has learned.",
      },
      {
        question: "Is Delta's Intelligence Network actually useful for commercial litigation?",
        answer:
          "The Intelligence Network is most valuable in commercial litigation because the same judges, opposing firms, and expert witnesses appear repeatedly across firms. Even if your firm has only been before a particular judge twice, you get the benefit of data from dozens of other firms' experiences — all fully anonymized and aggregated.",
      },
      {
        question: "How does CaseDelta handle privilege and confidential documents?",
        answer:
          "Delta processes documents within CaseDelta's secure infrastructure — no data is sent to third-party AI providers. Privilege-flagged documents are tagged and excluded from any shared analytics. Full audit trail of every document access, every analysis, every query. ABA Rule 1.6 compliant.",
      },
    ],
    ctaText: "See what Delta learns about your commercial litigation practice in the first 30 minutes.",
  },

  /* ════════════════════════════════════════════
     2. EMPLOYMENT LAW / LABOR DEFENSE
     ════════════════════════════════════════════ */
  {
    slug: "employment-law",
    title: "Employment Law",
    metaTitle: "CaseDelta for Employment Law | AI Associate for Labor Defense",
    metaDescription:
      "Delta learns your EEOC patterns, repeat judges, opposing counsel settlement behavior, and drafts position statements in your firm's style. Purpose-built for employment defense.",
    heroHeadline: "Same judges. Same opposing firms. Delta remembers everything.",
    heroSubheadline:
      "Employment defense means high volume, repeat players, and tight agency deadlines. Delta learns the patterns that make your firm efficient and surfaces the intelligence that wins cases.",
    geoOpening:
      "CaseDelta is the AI associate purpose-built for employment law firms that handle high volumes of discrimination, wrongful termination, and wage-and-hour cases where repeat judges, repeat opposing counsel, and agency-specific patterns determine outcomes more than any individual case fact.",
    stats: [
      { value: "73,000+", label: "EEOC charges filed annually" },
      { value: "38%", label: "of employment cases settle before discovery" },
      { value: "$165K", label: "median settlement in Title VII cases" },
    ],
    painPoints: [
      {
        title: "Volume overwhelms individual attention",
        description:
          "Your managing partner juggles 60+ active employment matters. Each one needs EEOC responses, discovery management, and deposition prep. The difference between a good outcome and a bad one is often just bandwidth.",
      },
      {
        title: "Repeat players, but no systematic tracking",
        description:
          "You've faced the same plaintiff's firms dozens of times. You know their playbook intuitively, but that knowledge lives in individual partners' heads, not in a system your whole firm can access.",
      },
      {
        title: "Agency deadlines punish disorganization",
        description:
          "EEOC position statement deadlines, DOL audit responses, and state agency filings have hard deadlines with real consequences. When you're managing 60 matters, one missed deadline can cost a client six figures.",
      },
      {
        title: "Client-side patterns repeat but go unanalyzed",
        description:
          "Your largest client averages 3 employment claims per quarter with a seasonal spike in Q1. That pattern matters for staffing, reserves, and prevention advice, but nobody tracks it.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Learns employment-specific patterns fast",
        description:
          "Employment defense has natural repetition — same judges, same opposing firms, same claim types. Delta leverages this repetition to build deep expertise faster than any other practice area. Within weeks, it knows every judge's discovery tendencies in Title VII cases.",
      },
      {
        title: "Tracks opposing counsel settlement behavior",
        description:
          "Delta builds profiles for every plaintiff's firm: average demand multiples, settlement timing relative to mediation, willingness to try cases, and preferred experts. Before your next mediation, Delta tells you exactly what to expect.",
      },
      {
        title: "Drafts position statements in your firm's voice",
        description:
          "Delta learns your firm's writing style — structure, tone, how you frame affirmative defenses, which precedent you cite first. It prepares EEOC position statement drafts that need editing, not rewriting.",
      },
      {
        title: "Identifies claim patterns across your client base",
        description:
          "Delta spots trends: which departments generate the most claims, seasonal patterns in filings, correlation between manager tenure and claim frequency. This transforms you from reactive defense counsel to proactive risk advisor.",
      },
      {
        title: "Agency deadline management with context",
        description:
          "Delta doesn't just track deadlines — it understands them. It knows which judges penalize late filings, which agencies grant extensions freely, and which responses need partner review based on claim value and complexity.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Palmer Employment Group",
      entries: [
        {
          label: "Practice Areas",
          value: "Employment discrimination, wrongful termination, wage & hour, FMLA, ADA accommodation",
        },
        {
          label: "Judge Notes",
          value:
            "Judge Chen allows broader discovery in Title VII cases, 28% MSJ grant rate. Judge Rivera rules on MTC within 5 business days — fastest in the district.",
        },
        {
          label: "Opposing Counsel",
          value:
            "Davis Employment Law — average demand: 2.8x lost wages, settles 65% at mediation. Files detailed 30(b)(6) notices targeting HR policies.",
        },
        {
          label: "Client Patterns",
          value:
            "Acme Corp averages 3 employment claims per quarter — seasonal spike in Q1. 78% involve the distribution division. Recommended targeted supervisor training.",
        },
        {
          label: "Draft Style",
          value:
            "Firm prefers chronological EEOC responses, affirmative defenses front-loaded, max 12 pages. Cites McDonnell Douglas framework in every disparate treatment response.",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta help with high-volume employment defense?",
        answer:
          "Delta thrives on volume. Employment defense has natural repetition — same claim types, same judges, same opposing firms — and Delta uses that repetition to build deep pattern recognition. It identifies which matters need immediate partner attention versus which can follow standard workflows, drafts initial position statements in your firm's style, and ensures no deadline slips across 60+ active matters.",
      },
      {
        question: "Can Delta track patterns across a single client's employment claims?",
        answer:
          "Yes. Delta identifies trends in your clients' employment exposure: which departments generate claims, seasonal filing patterns, correlation between specific management practices and claim types, and comparison to industry benchmarks using anonymized Intelligence Network data. This shifts your role from reactive defense to proactive risk counselor.",
      },
      {
        question: "How does Delta handle EEOC position statements?",
        answer:
          "Delta learns your firm's specific approach to EEOC responses — structure, tone, how you frame affirmative defenses, citation preferences, and typical length. When a new charge comes in, Delta prepares a draft position statement that follows your established patterns, pre-populated with relevant facts from the client file and applicable precedent. Associates review and refine rather than starting from scratch.",
      },
      {
        question: "Does Delta work with state employment agencies, not just EEOC?",
        answer:
          "Delta handles all employment agency matters — EEOC, state HRC commissions, DOL audits, OSHA complaints. It learns the specific procedural requirements, timeline expectations, and filing formats for each agency you practice before.",
      },
      {
        question: "How quickly does Delta learn employment law patterns?",
        answer:
          "Employment defense is where Delta learns fastest because of natural case repetition. Most firms see meaningful pattern recognition within 30-60 days. By 6 months, Delta's knowledge of your judges, opposing counsel, and client patterns exceeds what a new associate would build in their first 18 months.",
      },
    ],
    ctaText: "See what Delta learns about your employment practice in the first 30 minutes.",
  },

  /* ════════════════════════════════════════════
     3. INSURANCE DEFENSE
     ════════════════════════════════════════════ */
  {
    slug: "insurance-defense",
    title: "Insurance Defense",
    metaTitle: "CaseDelta for Insurance Defense | AI Associate for Carrier-Appointed Counsel",
    metaDescription:
      "Delta learns your carriers' reporting preferences, tracks plaintiff firm tactics across all cases, and prioritizes 150+ active files by deadline urgency. Built for insurance defense volume.",
    heroHeadline: "150 active files. One associate that never drops a deadline.",
    heroSubheadline:
      "Insurance defense runs on efficiency, carrier relationships, and pattern recognition across hundreds of similar cases. Delta learns how each carrier wants to be managed and how each plaintiff firm operates.",
    geoOpening:
      "CaseDelta is the AI associate purpose-built for insurance defense firms where managing partners carry 150+ active files, carrier reporting requirements dictate workflow, and the difference between profit and loss is measured in minutes per file, not hours.",
    stats: [
      { value: "150+", label: "avg active files per insurance defense partner" },
      { value: "$45B", label: "annual US insurance defense legal spend" },
      { value: "68%", label: "of insurance defense cases settle before trial" },
    ],
    painPoints: [
      {
        title: "Carrier reporting is a second full-time job",
        description:
          "StateFarm wants monthly reports by the 5th. Hartford prefers quarterly with reserve breakdowns. Nationwide requires immediate notification when reserves exceed $10K. Miss a reporting deadline and you lose the panel.",
      },
      {
        title: "Volume requires inhuman efficiency",
        description:
          "At 150+ active files and insurance defense billing rates, every file gets about 45 minutes of attorney attention per month. You need to identify which files need more and which can follow the standard playbook.",
      },
      {
        title: "Plaintiff firm intelligence is scattered",
        description:
          "You've faced Davis & Clark 30 times. Their average demand is 3x specials and they settle at 1.8x. But that's in your head, not in a system your junior associates can access when they're handling their first mediation.",
      },
      {
        title: "Reserve accuracy affects carrier relationships",
        description:
          "Carriers evaluate outside counsel partly on reserve accuracy. Consistently over- or under-reserving erodes trust. But tracking claim valuation patterns across hundreds of files is beyond manual capacity.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Learns every carrier's reporting preferences",
        description:
          "Delta learns each carrier's exact requirements: report format, frequency, reserve thresholds that trigger notifications, preferred terminology, and the specific metrics each adjuster cares about. Reports are drafted to spec, not generic templates.",
      },
      {
        title: "Tracks plaintiff firm tactics across all your matters",
        description:
          "Delta builds profiles from every encounter: demand patterns (3x specials? 5x?), settlement timing, preferred experts, motion practice tendencies, and trial willingness. Your newest associate walks into mediation with the same intelligence your most experienced partner has.",
      },
      {
        title: "Morning briefings prioritized by deadline urgency",
        description:
          "Across 150+ files, Delta surfaces what matters today: discovery responses due, carrier reports approaching deadline, settlement authority expiring, and the 3 files that need partner attention this week.",
      },
      {
        title: "Pattern-based claim valuation",
        description:
          "Delta analyzes your firm's historical outcomes against claim characteristics — injury type, venue, judge, plaintiff counsel — to flag files where current reserves may be significantly off, before the carrier notices.",
      },
      {
        title: "Intelligence Network for venue-specific data",
        description:
          "Assigned a case in a new venue? Delta draws on anonymized data from every CaseDelta firm practicing there: median verdicts by case type, judge tendencies, local plaintiff firm intelligence. No more flying blind in unfamiliar jurisdictions.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Kendrick Defense Group",
      entries: [
        {
          label: "Practice Areas",
          value: "Insurance defense, coverage disputes, bad faith, premises liability, auto negligence",
        },
        {
          label: "Carrier Notes",
          value:
            "StateFarm prefers monthly reporting by the 5th, wants reserve updates > $10K flagged immediately. Hartford requires quarterly litigation budgets with 90-day forecasts.",
        },
        {
          label: "Opposing Counsel",
          value:
            "Davis & Clark — average demand: 3x specials, settles at 1.8x. Files detailed written discovery but rarely deposes more than 2 witnesses. Trial rate: 4%.",
        },
        {
          label: "Claim Valuations",
          value:
            "Soft tissue, Judge Peters venue: median settlement $28K (n=43 across 6 firms). Firm's own results: $24K avg — 14% below market, strong carrier relationship metric.",
        },
        {
          label: "File Priorities",
          value:
            "3 files need attention today: Garcia discovery response (due Friday), Morrison carrier report (due 5th), Wheeler settlement authority (expires EOW).",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta handle different carrier reporting requirements?",
        answer:
          "Delta learns each carrier's specific preferences: report format, submission cadence, reserve notification thresholds, preferred terminology, and individual adjuster expectations. When a carrier report is due, Delta prepares a draft in the exact format that carrier expects, populated with current case status, recent activity, and reserve analysis. You review and send — not build from scratch.",
      },
      {
        question: "Can Delta really help manage 150+ active files?",
        answer:
          "That's exactly what Delta is built for. It continuously monitors every file for approaching deadlines, discovery gaps, carrier reporting requirements, and settlement opportunities. Each morning, it delivers a prioritized briefing: the 5 files that need partner attention today, the 12 with deadlines this week, and any anomalies detected overnight. The other 133 files are tracked and managed proactively.",
      },
      {
        question: "How does Delta track plaintiff firm patterns in insurance defense?",
        answer:
          "Delta builds detailed profiles from every encounter with opposing counsel: demand-to-settlement ratios (e.g., demands at 3x specials, settles at 1.8x), typical motion practice, preferred experts, deposition strategy, and trial willingness. Combined with Intelligence Network data from other defense firms, even your most junior associate has the same tactical intelligence as your most experienced partner.",
      },
      {
        question: "Does Delta help with reserve accuracy?",
        answer:
          "Yes. Delta analyzes your firm's historical outcomes correlated with claim characteristics — injury type, venue, judge, plaintiff counsel, treatment duration — and flags files where current reserves appear significantly above or below the predicted range. This helps maintain the reserve accuracy that carriers use to evaluate panel counsel.",
      },
      {
        question: "How does CaseDelta's pricing work for high-volume insurance defense?",
        answer:
          "CaseDelta's usage-based pricing means you pay for what you use. For insurance defense firms managing 150+ files, Delta's per-matter cost is typically less than 15 minutes of associate time — and it saves hours. Volume discounts are available for firms with 200+ active matters.",
      },
    ],
    ctaText: "See what Delta learns about your insurance defense practice in the first 30 minutes.",
  },

  /* ════════════════════════════════════════════
     4. MEDICAL MALPRACTICE
     ════════════════════════════════════════════ */
  {
    slug: "medical-malpractice",
    title: "Medical Malpractice",
    metaTitle: "CaseDelta for Medical Malpractice | AI Associate for Med Mal Defense",
    metaDescription:
      "Delta processes thousands of pages of medical records, detects anomalies in timelines, and learns judge-specific defense strategies for high-stakes medical malpractice cases.",
    heroHeadline: "2,400 pages of medical records. Delta reads them in minutes.",
    heroSubheadline:
      "Medical malpractice cases live or die on what's buried in the records: the unsigned order, the 6-day gap in nursing notes, the inconsistent vital signs. Delta finds what human review misses.",
    geoOpening:
      "CaseDelta is the AI associate purpose-built for medical malpractice defense firms that process thousands of pages of medical records per case, coordinate with expert witnesses across specialties, and build defense strategies where a single missed detail in the medical chronology can shift a case worth $200K to $5M.",
    stats: [
      { value: "2,400+", label: "avg pages of medical records per med mal case" },
      { value: "$309K", label: "median medical malpractice payout (NPDB 2023)" },
      { value: "85%", label: "of med mal cases are decided on expert testimony" },
    ],
    painPoints: [
      {
        title: "Record volume buries the critical details",
        description:
          "A standard hospital malpractice case produces 2,400+ pages of records from multiple providers. The 3 unsigned physician orders and 6-day nursing note gap that decide the case are hidden in there. Associates spend 40+ hours on initial review alone.",
      },
      {
        title: "Expert coordination is a logistical nightmare",
        description:
          "You need a cardiologist who's available in August, has testified in this jurisdiction before, and whose opinions won't conflict with your existing defense theory. That search takes days and relies on institutional memory that's hard to systematize.",
      },
      {
        title: "High stakes amplify every mistake",
        description:
          "Medical malpractice cases regularly involve damages between $200K and $5M+. A missed detail in records review or an expert whose testimony contradicts your other witnesses doesn't just lose the case — it defines your carrier relationship for years.",
      },
      {
        title: "Daubert challenges require deep judge knowledge",
        description:
          "Some judges require Daubert hearings for all expert testimony. Others apply a permissive standard. Knowing the difference before you select and prepare your experts determines whether your best evidence even reaches the jury.",
      },
    ],
    howDeltaHelps: [
      {
        title: "Builds medical chronologies in minutes, not days",
        description:
          "Delta ingests thousands of pages of medical records — hospital charts, nursing notes, lab results, imaging reports, pharmacy records — and produces structured, searchable chronologies with provider-level attribution. What takes an associate 40 hours takes Delta 30 minutes.",
      },
      {
        title: "Detects anomalies across records automatically",
        description:
          "Delta cross-references every record against every other record, flagging timeline gaps (6-day nursing note absence), contradictions (vital signs that don't match nursing assessment), unsigned orders, missing informed consent, and documentation that appears back-dated.",
      },
      {
        title: "Learns expert preferences and availability",
        description:
          "Delta tracks which experts your firm has used, their availability patterns, which jurisdictions they've testified in, how they performed under cross-examination (partner notes), and whether their opinions align with your defense theories.",
      },
      {
        title: "Judge-specific defense strategy intelligence",
        description:
          "Delta knows which judges require Daubert hearings, their expert qualification standards, attitude toward specific defense theories (res ipsa, lost chance, informed consent), and verdict patterns by case type. Your defense strategy is calibrated to the actual judge, not a generic playbook.",
      },
      {
        title: "Intelligence Network for standard-of-care benchmarks",
        description:
          "When Delta analyzes your case records, it draws on patterns from anonymized medical malpractice data across all CaseDelta firms — typical documentation practices, common defense strategies by specialty, and outcome data that helps you evaluate case strength early.",
      },
    ],
    deltaLearnsExample: {
      firmName: "Whitfield Medical Defense",
      entries: [
        {
          label: "Practice Areas",
          value: "Medical malpractice defense, hospital liability, nursing home litigation, dental malpractice",
        },
        {
          label: "Document Patterns",
          value:
            "Average 2,400 pages per case. Delta found 3 unsigned physician orders and a 6-day gap in nursing notes in the Morrison matter. Auto-flagged for partner review.",
        },
        {
          label: "Judge Notes",
          value:
            "Judge Williams requires Daubert hearings for all expert testimony. Judge Park permits stipulated experts without hearing if both sides agree — saves 2-3 weeks of prep.",
        },
        {
          label: "Expert Database",
          value:
            "Dr. Patel (cardiology): available Aug-Oct, testified 4x in this district, strong on cross. Dr. Singh (neurology): 6-week lead time, prefers written reports over deposition.",
        },
        {
          label: "Case Intelligence",
          value:
            "Surgical error cases in this venue: plaintiff verdict 34% (n=47 across 12 firms), median award $1.2M. Defendant-favorable when records show contemporaneous documentation.",
        },
      ],
    },
    faq: [
      {
        question: "How does Delta process thousands of pages of medical records?",
        answer:
          "Delta ingests medical records in any format — PDFs, scanned images, EMR exports, faxed records — and builds structured, searchable chronologies organized by date, provider, and record type. It identifies and links related entries across different providers, flags anomalies (gaps, contradictions, unsigned orders), and produces a navigable timeline that attorneys can review in a fraction of the time manual review requires.",
      },
      {
        question: "What anomalies does Delta detect in medical records?",
        answer:
          "Delta detects timeline gaps (periods with no documentation when there should be), contradictions between records (vital signs that don't match nursing assessments), unsigned physician orders, missing informed consent documentation, entries that appear back-dated or modified, and inconsistencies between the medical record and deposition testimony. These are the details that decide cases.",
      },
      {
        question: "Can Delta help with expert witness selection and coordination?",
        answer:
          "Delta maintains a knowledge base of every expert your firm has worked with: their specialties, availability patterns, jurisdictions where they've testified, fee structures, and how they've performed (based on partner-entered notes). When you need a cardiologist available in August who's testified in your jurisdiction, Delta provides a shortlist in seconds rather than hours of phone calls.",
      },
      {
        question: "How does Delta handle judge-specific strategies in medical malpractice?",
        answer:
          "Delta tracks each judge's approach to medical malpractice specifics: Daubert hearing requirements, expert qualification standards, attitude toward common defense theories (res ipsa loquitur, lost chance doctrine, informed consent), typical verdict ranges, and procedural preferences. Combined with Intelligence Network data from other defense firms, you calibrate strategy to the actual judge assigned to your case.",
      },
      {
        question: "Is Delta accurate enough for high-stakes medical malpractice cases?",
        answer:
          "Delta is a tool that augments attorney review — it doesn't replace it. It finds the needles in the haystack (the unsigned orders, the timeline gaps, the contradictions) so attorneys can focus on strategy rather than page-by-page review. Every flagged anomaly includes the source document reference for verification. In cases worth $200K to $5M+, Delta ensures nothing gets missed.",
      },
    ],
    ctaText: "See what Delta learns about your medical malpractice practice in the first 30 minutes.",
  },
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return USE_CASES.find((uc) => uc.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return USE_CASES.map((uc) => uc.slug);
}
