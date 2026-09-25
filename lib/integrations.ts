/**
 * The one place a CaseDelta integration is described. Read by /integrations,
 * /integrations/[slug], /answers and the sitemap. Never retype a platform's
 * capabilities into a component.
 *
 * WHAT IS TRUE, and the reason this file can name any platform (Camren,
 * 2026-09-25): Delta connects to anything a firm's team signs into. The lawyer
 * signs in once, on the platform's own sign-in page (or with Salesforce, Microsoft
 * or Google's own sign-in), and Delta works through that session or the platform's
 * API. There is no bespoke integration per platform, so a platform being listed
 * here is a statement about the connect path, not about a partnership.
 *
 * Rules for this file:
 *   - Reads, updates and example tasks describe what the PLATFORM holds (its own
 *     objects: Filevine projects and custom fields, Lead Docket leads, Clio
 *     matters). Never an invented feature, never "certified partner", never
 *     "official integration".
 *   - No firm names and no counts of customers. `live` marks the platforms
 *     connected at working firms today (checked in production 2026-09-25):
 *     Filevine, Clio, Lead Docket, Salesforce, Microsoft and Google. MyCase,
 *     SmartAdvocate, CASEpeer, Needles/Neos and Law Ruler have nobody live yet, so
 *     their pages say only what Delta does through a sign-in.
 *   - Email is drafted, never sent on Delta's own: the team reviews and sends.
 *   - Example names (Garcia, Martinez) are illustrative, as on the homepage.
 */

export type Category =
  | "case" | "intake" | "email" | "documents" | "legal-ai" | "research" | "billing" | "esign";

export const CATEGORIES: { id: Category; title: string }[] = [
  { id: "case", title: "Case management" },
  { id: "intake", title: "Intake and CRM" },
  { id: "email", title: "Email, calendar and chat" },
  { id: "documents", title: "Documents" },
  { id: "legal-ai", title: "Legal AI" },
  { id: "research", title: "Research" },
  { id: "billing", title: "Billing and phones" },
  { id: "esign", title: "E-signature" },
];

export interface PlatformPage {
  /** What Delta reads there, as short labels. */
  reads: string[];
  /** What Delta updates there, as short labels. */
  updates: string[];
  /** Two or three things a lawyer would ask, specific to what this platform holds. */
  tasks: string[];
  /** Answer to "Does it need <Name>'s API?" */
  api: string;
  /** Shown in the connect demo's address bar. Illustrative; omitted when unknown. */
  host?: string;
  /** Logo file in /public/concept/logos, when we have one. */
  logo?: string;
  /** What the connect demo finds once connected. No counts. */
  found: string;
  /** Connected at working firms today (production, checked date below). */
  live?: boolean;
  /** Answer-page title and description. */
  title: string;
  description: string;
}

export interface Platform {
  slug: string;
  name: string;
  category: Category;
  /** One line: what Delta does there. A fact, no argument. */
  does: string;
  /** How the lawyer signs in, when it is not the platform's own sign-in page. */
  signIn?: string;
  page?: PlatformPage;
}

/** When every entry below was last checked. */
export const INTEGRATIONS_CHECKED = "2026-09-25";

export const PLATFORMS: Platform[] = [
  /* ── The twelve platforms with their own page ── */
  {
    slug: "filevine", name: "Filevine", category: "case",
    does: "Delta reads and updates your Filevine projects, phases, custom fields and notes.",
    page: {
      live: true, logo: "filevine-mark.svg", host: "app.filevine.com", found: "Your projects found",
      reads: ["Projects and phases", "Custom fields and sections", "Notes and tasks", "Documents on a project", "Contacts on a project"],
      updates: ["Adds notes to a project", "Updates custom fields", "Creates tasks"],
      tasks: [
        "Which projects in the treatment phase have no note in the last 30 days?",
        "Update the settlement amount field on the Garcia project to $85,000.",
        "Add the adjuster's email from this morning as a note on the Martinez project.",
      ],
      api: "No. Delta works through the same Filevine sign-in your team uses, so you do not need an API key or any setup inside Filevine.",
      title: "AI for Filevine: an AI paralegal that works inside your projects",
      description: "Delta signs in to Filevine once and reads and updates your projects, phases, custom fields and notes, alongside your email and intake.",
    },
  },
  {
    slug: "clio", name: "Clio", category: "case",
    does: "Delta reads and updates your Clio matters, contacts, activities and tasks, and files email to the right matter.",
    page: {
      live: true, host: "app.clio.com", found: "Your matters found",
      reads: ["Matters and their status", "Contacts and related parties", "Activities and time entries", "Tasks and calendar entries", "Documents on a matter"],
      updates: ["Files emails to the right matter", "Creates tasks", "Adds notes to a matter"],
      tasks: [
        "File every email from the Garcia thread in Gmail to his Clio matter.",
        "Which open matters have had no activity logged this month?",
        "Create a task on the Martinez matter to request the updated medical records.",
      ],
      api: "No setup is needed on your side. You sign in once with your Clio account, and Delta works with Clio from there.",
      title: "AI for Clio: an AI paralegal that works inside your matters",
      description: "Delta signs in to Clio once, reads your matters, contacts and activities, and files email from Gmail or Outlook to the right matter.",
    },
  },
  {
    slug: "mycase", name: "MyCase", category: "case",
    does: "Delta reads and updates your MyCase cases, contacts, tasks and events.",
    page: {
      logo: "mycase-mark.png", host: "mycase.com", found: "Your cases found",
      reads: ["Cases and case stages", "Contacts and clients", "Tasks and events", "Case notes", "Documents on a case"],
      updates: ["Adds case notes", "Creates tasks", "Adds events to a case"],
      tasks: [
        "Which cases have a court date this week and no open prep task?",
        "Add a note to the Garcia case summarizing the call with the adjuster.",
        "List every case still in the intake stage after 14 days.",
      ],
      api: "No. Delta signs in with the same MyCase account your team uses, so there is nothing to install or configure in MyCase.",
      title: "AI for MyCase: an AI paralegal that works inside your cases",
      description: "Delta signs in to MyCase once and reads and updates your cases, tasks, events and notes, alongside your email and documents.",
    },
  },
  {
    slug: "litify", name: "Litify", category: "case", signIn: "with your Salesforce sign-in",
    does: "Delta reads and updates your Litify matters, intakes, injuries and negotiations through your Salesforce sign-in.",
    page: {
      logo: "litify-mark.png", host: "login.salesforce.com", found: "Your matters found",
      reads: ["Matters and intakes", "Injuries and damages", "Negotiations and offers", "Roles and related parties", "Any custom field your firm added"],
      updates: ["Updates matter fields", "Creates tasks", "Adds notes to a matter"],
      tasks: [
        "Which matters have an open negotiation with no new offer in 60 days?",
        "List every intake converted to a matter this month, by referral source.",
        "Update the demand amount on the Garcia matter.",
      ],
      api: "No setup on your side. Litify runs on Salesforce, so you sign in once with Salesforce and Delta queries your Litify objects from there.",
      title: "AI for Litify: an AI paralegal that works inside your matters",
      description: "Delta signs in through Salesforce and reads and updates your Litify matters, intakes, injuries and negotiations, including your custom fields.",
    },
  },
  {
    slug: "smartadvocate", name: "SmartAdvocate", category: "case",
    does: "Delta reads and updates your SmartAdvocate cases, insurance, treatment and notes.",
    page: {
      logo: "smartadvocate-mark.png", host: "smartadvocate.com", found: "Your cases found",
      reads: ["Cases and case status", "Insurance and adjusters", "Medical providers and treatment", "Negotiations", "Notes and documents"],
      updates: ["Adds case notes", "Creates tasks", "Updates case fields"],
      tasks: [
        "Which cases are still treating with no new medical record in 45 days?",
        "List every case where the policy limits are not recorded yet.",
        "Add a note to the Martinez case with today's settlement offer.",
      ],
      api: "No. Delta signs in with the same SmartAdvocate account your team uses, so there is nothing to install or configure in SmartAdvocate.",
      title: "AI for SmartAdvocate: an AI paralegal that works inside your cases",
      description: "Delta signs in to SmartAdvocate once and reads and updates your cases, insurance, treatment and negotiations, alongside your email.",
    },
  },
  {
    slug: "casepeer", name: "CASEpeer", category: "case",
    does: "Delta reads and updates your CASEpeer cases, treatment, medical bills and settlement details.",
    page: {
      logo: "casepeer-mark.png", host: "casepeer.com", found: "Your cases found",
      reads: ["Cases and case phases", "Treatment and providers", "Medical bills and liens", "Settlement and negotiation", "Tasks and notes"],
      updates: ["Adds case notes", "Creates tasks", "Updates case fields"],
      tasks: [
        "Which cases have medical bills with no matching record?",
        "Total the outstanding liens on the Garcia case.",
        "List every case that moved to the demand phase this week.",
      ],
      api: "No. Delta works through the same CASEpeer sign-in your team uses, so you do not need to request API access.",
      title: "AI for CASEpeer: an AI paralegal that works inside your cases",
      description: "Delta signs in to CASEpeer once and reads and updates your cases, treatment, medical bills, liens and settlement details.",
    },
  },
  {
    slug: "needles", name: "Needles and Neos", category: "case",
    does: "Delta reads and updates your Needles or Neos cases, parties, insurance and values.",
    page: {
      found: "Your cases found",
      reads: ["Cases and case types", "Parties and contacts", "Insurance and claims", "Case values, bills and liens", "Checklists and notes"],
      updates: ["Adds case notes", "Completes checklist items", "Updates case fields"],
      tasks: [
        "Which cases have an overdue checklist item assigned to intake?",
        "List the insurance carrier and claim number on every open auto case.",
        "Add a note to the Garcia case that the records request went out today.",
      ],
      api: "No. Delta signs in the same way your team does, with your Needles or Neos account.",
      title: "AI for Needles and Neos: an AI paralegal that works inside your cases",
      description: "Delta signs in to Needles or Neos once and reads and updates your cases, parties, insurance, values and checklists.",
    },
  },
  {
    slug: "lead-docket", name: "Lead Docket", category: "intake",
    does: "Delta reads and updates your Lead Docket leads, intake status and notes.",
    page: {
      live: true, logo: "leaddocket-mark.png", host: "yourfirm.leaddocket.com", found: "Your leads found",
      reads: ["Leads and intake status", "Referral and marketing sources", "Intake questionnaire answers", "Notes and follow-ups", "Signed and rejected leads"],
      updates: ["Adds notes to a lead", "Updates intake status", "Creates follow-up tasks"],
      tasks: [
        "Which leads from last week are still pending with no follow-up?",
        "How many signed cases came from each referral source this quarter?",
        "Check that every signed lead from this month has a case in Filevine.",
      ],
      api: "No. Delta signs in to your firm's Lead Docket once, the same way your intake team does.",
      title: "AI for Lead Docket: an AI paralegal that works inside your intake",
      description: "Delta signs in to Lead Docket once and reads and updates your leads, intake status, sources and notes, then checks them against your case system.",
    },
  },
  {
    slug: "law-ruler", name: "Law Ruler", category: "intake",
    does: "Delta reads and updates your Law Ruler leads, intake forms and statuses.",
    page: {
      host: "lawruler.com", found: "Your leads found",
      reads: ["Leads and lead status", "Intake forms", "Marketing sources", "Retainer and signing status", "Tasks and notes"],
      updates: ["Adds notes to a lead", "Updates lead status", "Creates tasks"],
      tasks: [
        "Which leads were sent a retainer more than three days ago and have not signed?",
        "List this month's new leads by marketing source.",
        "Add a note to the Martinez lead with the details from today's call.",
      ],
      api: "No. Delta signs in with the same Law Ruler account your intake team uses.",
      title: "AI for Law Ruler: an AI paralegal that works inside your intake",
      description: "Delta signs in to Law Ruler once and reads and updates your leads, intake forms, sources and retainer status.",
    },
  },
  {
    slug: "salesforce", name: "Salesforce", category: "intake", signIn: "with your Salesforce sign-in",
    does: "Delta queries and updates any Salesforce object your firm uses, standard or custom.",
    page: {
      live: true, logo: "salesforce.svg", host: "login.salesforce.com", found: "Your records found",
      reads: ["Any standard object: accounts, contacts, leads", "Your custom objects and fields", "Reports built from a query", "Activity history", "Files on a record"],
      updates: ["Updates fields on a record", "Creates tasks", "Logs activity on a record"],
      tasks: [
        "Pull every intake created this month, grouped by source and status.",
        "Which accounts have an open opportunity with no activity in 30 days?",
        "Update the status field on the Garcia intake record.",
      ],
      api: "It uses Salesforce's own sign-in. You sign in once, and Delta runs queries against your objects, including the custom ones.",
      title: "AI for Salesforce: an AI paralegal that queries your firm's objects",
      description: "Delta signs in with Salesforce and queries and updates any object your firm uses, standard or custom, including legal apps built on it.",
    },
  },
  {
    slug: "outlook", name: "Outlook", category: "email", signIn: "with your Microsoft sign-in",
    does: "Delta reads your Outlook mail and attachments, drafts replies, and files threads to the right case.",
    page: {
      live: true, logo: "outlook.svg", host: "login.microsoftonline.com", found: "Your email found",
      reads: ["Email threads and folders", "Attachments", "Calendar events", "Contacts"],
      updates: ["Drafts replies for your review", "Files threads to the right case", "Saves attachments to the case"],
      tasks: [
        "Which carriers asked for a demand we never sent?",
        "File every email from the Martinez adjuster to his case.",
        "Draft a reply asking the carrier for the declarations page.",
      ],
      api: "It uses Microsoft's own sign-in. You sign in once with your work account, and nothing is installed in Outlook.",
      title: "AI for Outlook: an AI paralegal that files your email to the right case",
      description: "Delta signs in with Microsoft and reads your Outlook mail and attachments, files threads to the right case and drafts replies for your review.",
    },
  },
  {
    slug: "gmail", name: "Gmail", category: "email", signIn: "with your Google sign-in",
    does: "Delta reads your Gmail threads and attachments, drafts replies, and files email to the right matter.",
    page: {
      live: true, logo: "gmail.svg", host: "accounts.google.com", found: "Your email found",
      reads: ["Threads and labels", "Attachments", "Senders and recipients", "Google Calendar events"],
      updates: ["Drafts replies for your review", "Files threads to the right matter", "Saves attachments to the case"],
      tasks: [
        "File every Garcia email to his matter in Clio.",
        "Which client emails from this week have no reply yet?",
        "Draft a reply to the defense attorney confirming the deposition date.",
      ],
      api: "It uses Google's own sign-in. You sign in once with your Google Workspace account, and nothing is installed in Gmail.",
      title: "AI for Gmail: an AI paralegal that files your email to the right matter",
      description: "Delta signs in with Google and reads your Gmail threads and attachments, files them to the right matter and drafts replies for your review.",
    },
  },

  /* ── Listed on the hub, no page of their own ── */
  { slug: "smokeball", name: "Smokeball", category: "case", does: "Reads and updates matters and tasks." },
  { slug: "practicepanther", name: "PracticePanther", category: "case", does: "Reads and updates matters, contacts and tasks." },
  { slug: "cloudlex", name: "CloudLex", category: "case", does: "Reads and updates cases and their details." },
  { slug: "trialworks", name: "TrialWorks", category: "case", does: "Reads and updates cases and notes." },
  { slug: "lawmatics", name: "Lawmatics", category: "intake", does: "Reads and updates leads and intake status." },
  { slug: "clio-grow", name: "Clio Grow", category: "intake", does: "Reads and updates leads and intake forms." },
  { slug: "google-calendar", name: "Google Calendar", category: "email", signIn: "with your Google sign-in", does: "Reads and adds case events and deadlines." },
  { slug: "teams", name: "Microsoft Teams", category: "email", signIn: "with your Microsoft sign-in", does: "Reads channel and chat messages." },
  { slug: "slack", name: "Slack", category: "email", does: "Reads channel messages." },
  { slug: "google-drive", name: "Google Drive", category: "documents", signIn: "with your Google sign-in", does: "Reads and saves case files and folders." },
  { slug: "onedrive", name: "OneDrive and SharePoint", category: "documents", signIn: "with your Microsoft sign-in", does: "Reads and saves case files and folders." },
  { slug: "dropbox", name: "Dropbox", category: "documents", does: "Reads and saves case files and folders." },
  { slug: "box", name: "Box", category: "documents", does: "Reads and saves case files and folders." },
  { slug: "netdocuments", name: "NetDocuments", category: "documents", does: "Reads and saves documents in your workspaces." },
  { slug: "imanage", name: "iManage", category: "documents", does: "Reads and saves documents in your workspaces." },
  { slug: "eve", name: "Eve", category: "legal-ai", does: "Reads the work it has produced for your cases." },
  { slug: "evenup", name: "EvenUp", category: "legal-ai", does: "Reads the demands and summaries it has produced." },
  { slug: "supio", name: "Supio", category: "legal-ai", does: "Reads the summaries and chronologies it has produced." },
  { slug: "fasteroutcomes", name: "FasterOutcomes", category: "legal-ai", does: "Reads the demands it has produced." },
  { slug: "precedent", name: "Precedent", category: "legal-ai", does: "Reads the demands it has produced." },
  { slug: "cocounsel", name: "CoCounsel", category: "legal-ai", does: "Reads the work it has produced." },
  { slug: "harvey", name: "Harvey", category: "legal-ai", does: "Reads the work it has produced." },
  { slug: "lexis", name: "Lexis+ AI", category: "research", does: "Runs searches on your firm's own subscription." },
  { slug: "westlaw", name: "Westlaw", category: "research", does: "Runs searches on your firm's own subscription." },
  { slug: "quickbooks", name: "QuickBooks", category: "billing", does: "Reads invoices, payments and expenses." },
  { slug: "lawpay", name: "LawPay", category: "billing", does: "Reads payments and deposits." },
  { slug: "ringcentral", name: "RingCentral", category: "billing", does: "Reads call logs and text messages." },
  { slug: "docusign", name: "DocuSign", category: "esign", does: "Checks who has signed and what is still out." },
];

/** The closing row of the hub list. */
export const ANYTHING_ELSE = { name: "Anything your firm signs into", does: "If your team signs in to it, Delta can work inside it." };

export const PAGE_PLATFORMS = PLATFORMS.filter((p): p is Platform & { page: PlatformPage } => !!p.page);

export function platform(slug: string) {
  return PLATFORMS.find((p) => p.slug === slug);
}

/** The page path for a platform, or undefined when it has no page. */
export const platformHref = (p: Platform) => (p.page ? `/integrations/${p.slug}` : undefined);

/** "on Filevine's own sign-in page" or "with your Microsoft sign-in". */
export const signInPhrase = (p: Platform) => p.signIn ?? `on ${p.name}'s own sign-in page`;

/** The answer to "Does CaseDelta work with <Name>?", used on the platform page and /answers. */
export const worksWithAnswer = (p: Platform) => `Yes. You sign in once ${signInPhrase(p)}. ${doesSentence(p)}`;

/** The one-liner as a full sentence with Delta as the subject. Hub entries are written without it. */
export const doesSentence = (p: Platform) => p.does.startsWith("Delta") ? p.does : `Delta ${p.does[0].toLowerCase()}${p.does.slice(1)}`;
