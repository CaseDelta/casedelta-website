/** Security claims for the homepage, /security, /answers and JSON-LD. Edit claims here only. */

export interface SecurityClaim {
  id: string;
  /** Short label, for bands and checklists. A fact, never a sentence of argument. */
  label: string;
  /** The question a buyer actually asks, for a QA heading. */
  question: string;
  /** One to three sentences that state the fact. Never an explanation. */
  answer: string;
}

/** Last change to a claim. Feeds the sitemap lastmod. */
export const SECURITY_UPDATED = "2026-09-29";

export const SECURITY_CLAIMS: SecurityClaim[] = [
  {
    id: "hipaa",
    label: "HIPAA and bar compliant. Built for PII, PHI, and sensitive records.",
    question: "Is CaseDelta HIPAA compliant?",
    answer:
      "Yes. CaseDelta is built for PII, PHI and sensitive client records, and handles them under HIPAA and state bar confidentiality rules.",
  },
  {
    id: "training",
    label: "Your information never trains AI",
    question: "Does CaseDelta train AI on my client data?",
    answer:
      "No. Your client data is never used to train, fine-tune or improve any AI model.",
  },
  {
    id: "in-place",
    label: "Works like a paralegal, right where your files live",
    question: "Do we have to move our files into CaseDelta?",
    answer:
      "No. Delta works like a paralegal at your firm. It goes to the file where it lives, in your case system, your email or your drive, and does the work there. It does not copy your systems over into ours, and your case system stays the system of record.",
  },
  {
    id: "exposure",
    label: "Less exposure than tools that copy your files",
    question: "Does connecting Delta to all our systems increase our security risk?",
    answer:
      "It reduces it. Most AI tools ask you to upload or sync your files into their platform, which creates a second copy of your records somewhere else. Delta works the way a paralegal does: it opens the file where it already lives, does the task, and leaves it there. It acts with each user's own permissions, and when you disconnect a system, its access ends.",
  },
  {
    id: "permissions",
    label: "Acts with each user's own permissions",
    question: "Can Delta see more than our staff can?",
    answer:
      "No. Delta acts with the permissions of the person who connected it, so it can only reach what that person can already reach.",
  },
  {
    id: "approval",
    label: "You approve what leaves the firm",
    question: "Can Delta send email on its own?",
    answer:
      "Delta drafts email for you to review and send. It sends or deletes nothing unless you tell it to.",
  },
  {
    id: "isolation",
    label: "Each firm's data is kept separate",
    question: "Can another firm see our data?",
    answer: "No. Each firm's data is isolated, and every request Delta makes is scoped to one firm.",
  },
  {
    id: "encryption",
    label: "Encrypted at rest and in transit",
    question: "Is our data encrypted?",
    answer: "Yes. Your data is encrypted at rest and in transit.",
  },
  {
    id: "not-sold",
    label: "Never sold or shared",
    question: "Does CaseDelta sell or share our data?",
    answer: "No. Your data is never sold or shared.",
  },
  {
    id: "audit",
    label: "Every action is logged",
    question: "Can we see what Delta did?",
    answer: "Yes. Every action Delta takes is logged with the time, the request and the sources it used.",
  },
  {
    id: "deletion",
    label: "Export or delete your data at any time",
    question: "Can we delete our data?",
    answer: "Yes. You can export your data or ask for it to be deleted at any time.",
  },
  {
    id: "aba",
    label: "Built to support ABA Model Rule 1.6",
    question: "Does CaseDelta meet ABA Rule 1.6?",
    answer:
      "CaseDelta is built to support ABA Model Rule 1.6, which asks for reasonable efforts to protect client confidentiality.",
  },
  {
    id: "aba-512",
    label: "No self-learning on client data (ABA Opinion 512)",
    question: "What does ABA Formal Opinion 512 mean for CaseDelta?",
    answer:
      "Opinion 512 (2024) asks lawyers to check whether an AI tool uses client information to train itself. Delta does not: client data never trains any AI model.",
  },
];

const byId = Object.fromEntries(SECURITY_CLAIMS.map((c) => [c.id, c]));
/** Look a claim up by id. Throws on a typo so a missing claim fails the build, not the page. */
export function claim(id: string): SecurityClaim {
  const c = byId[id];
  if (!c) throw new Error(`Unknown security claim: ${id}`);
  return c;
}

/** The homepage #privacy band: its heading and the three claims it shows, in order. */
export const HOME_SECURITY = {
  heading: "Security first.",
  points: ["in-place", "hipaa", "training"],
};

/** The /security page: its hero and the QA groups, each a list of claim ids. */
export const SECURITY_PAGE = {
  title: "CaseDelta security: your data stays in your systems, and never trains AI",
  heading: "Built for client files.",
  lead: "Built for PII, PHI and sensitive client records.",
};

export const SECURITY_GROUPS: { id: string; title: string; claims: string[] }[] = [
  { id: "client-data", title: "Client data and HIPAA", claims: ["in-place", "exposure", "hipaa", "encryption", "not-sold"] },
  { id: "ai", title: "AI and training", claims: ["training"] },
  { id: "access", title: "Access and isolation", claims: ["permissions", "approval", "isolation", "audit"] },
  { id: "deletion", title: "Deletion and export", claims: ["deletion"] },
  { id: "aba", title: "ABA Rule 1.6 confidentiality", claims: ["aba", "aba-512"] },
];
