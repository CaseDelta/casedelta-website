/**
 * The one place a CaseDelta security claim is written down.
 *
 * Same reason lib/pricing.ts exists: a claim typed into a component is a claim
 * that gets fixed in one place and stays wrong in three others. The homepage
 * #privacy band, /security, /answers and any JSON-LD read from here. Never retype
 * a security claim into a component, a metadata string or an FAQ answer.
 *
 * Every claim carries a comment saying WHY IT IS TRUE, against the product as it
 * runs in production. If you cannot write that comment for a new claim, the claim
 * does not go on the site.
 *
 * Security is PARITY with the serious competitors, not an advantage. Never compare,
 * never name a competitor or a competitor's subprocessor.
 *
 * ── DO NOT SAY. Each of these was asked for, or published, and is false or off
 *    the site on purpose. Carried over from components/v2/sasonix/Trust.tsx. ──
 *
 *   "Delta never stores anything."  FALSE. Production stores case documents in S3
 *     and PHI arrives through that path today. Integration reads are cached as well.
 *     The true version is `in-place` below: Delta works where the records already
 *     live, and nothing is migrated.
 *
 *   "No client data is sent to third-party providers or AI."  FALSE. Delta runs on
 *     enterprise AI from an outside provider. Say so plainly (`provider` below). The
 *     defensible claim is what the provider may DO with the data: never trained on,
 *     never retained, never sold or shared, under an enterprise agreement.
 *
 *   "No third-party LLM", "your data never leaves our infrastructure."  FALSE, same
 *     reason as above.
 *
 *   "We sign a BAA" / "BAA available."  TRUE, but OFF THE SITE (Camren, 2026-09-02).
 *     It is a term a firm negotiates with us, not a property of the product, and it
 *     belongs in a conversation with a firm's compliance lead.
 *
 *   Any certification or audit ("SOC 2", "certified", "audited", "HITRUST"). None is
 *     held. HIPAA below is a compliance posture, never a certificate.
 *
 *   The name of the AI model or its provider. Never.
 */

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
export const SECURITY_UPDATED = "2026-09-25";

export const SECURITY_CLAIMS: SecurityClaim[] = [
  {
    // WHY TRUE: on the live homepage since 2026-08-28 (Camren). Documents are
    // encrypted at rest and in transit, every firm is isolated, the AI provider works
    // under no-training and no-retention terms, and the company signs a BAA when a
    // firm asks (that last part stays off the site, see DO NOT SAY). A posture, not
    // a certificate: never write "certified".
    id: "hipaa",
    label: "HIPAA and bar compliant. Built for PII, PHI, and sensitive records.",
    question: "Is CaseDelta HIPAA compliant?",
    answer:
      "Yes. CaseDelta is built for PII, PHI and sensitive client records, and handles them under HIPAA and state bar confidentiality rules.",
  },
  {
    // WHY TRUE: nothing in the product trains or fine-tunes a model, and the
    // enterprise AI Delta runs on is bound by no-training and no-retention terms.
    // Also stated in the privacy policy ("never used to train AI").
    id: "training",
    label: "Your information never trains AI",
    question: "Does CaseDelta train AI on my client data?",
    answer:
      "No. Your client data is never used to train, fine-tune or improve any AI model.",
  },
  {
    // WHY TRUE: Delta reads and writes through each platform's own API or signed-in
    // session, so the firm's case system stays the system of record and nothing is
    // migrated. NOT "leaves nothing behind": documents Delta imports are stored, see
    // DO NOT SAY.
    id: "in-place",
    label: "Works inside the systems you already use",
    question: "Do we have to move our files into CaseDelta?",
    answer:
      "No. Delta works inside the systems your firm already uses. Nothing is migrated, and your case system stays the system of record.",
  },
  {
    // WHY TRUE: the enterprise AI provider is an outside company. Say it, because
    // the privacy policy and every security review will. Never name it.
    id: "provider",
    label: "Enterprise AI, under no-training and no-retention terms",
    question: "Does CaseDelta use an outside AI provider?",
    answer:
      "Yes. Delta runs on enterprise AI from an outside provider, under terms that forbid training on your data or retaining it.",
  },
  {
    // WHY TRUE: every query in the platform filters on the firm, and every signed-in
    // user carries exactly one firm. Stated in the privacy policy.
    id: "isolation",
    label: "Each firm's data is kept separate",
    question: "Can another firm see our data?",
    answer: "No. Each firm's data is isolated, and every request Delta makes is scoped to one firm.",
  },
  {
    // WHY TRUE: storage is encrypted at rest, connection tokens are encrypted with
    // managed keys, and every connection is TLS with HSTS. Stated in the privacy policy.
    id: "encryption",
    label: "Encrypted at rest and in transit",
    question: "Is our data encrypted?",
    answer: "Yes. Your data is encrypted at rest and in transit.",
  },
  {
    // WHY TRUE: stated in the privacy policy; there is no data sale or sharing
    // anywhere in the business.
    id: "not-sold",
    label: "Never sold or shared",
    question: "Does CaseDelta sell or share our data?",
    answer: "No. Your data is never sold or shared.",
  },
  {
    // WHY TRUE: every run records each step Delta took, what it read and what it
    // answered. Stated in the privacy policy.
    id: "audit",
    label: "Every action is logged",
    question: "Can we see what Delta did?",
    answer: "Yes. Every action Delta takes is logged with the time, the request and the sources it used.",
  },
  {
    // WHY TRUE: a full firm erasure exists and covers files, search indexes,
    // connections and accounts. Stated in the privacy policy.
    id: "deletion",
    label: "Export or delete your data at any time",
    question: "Can we delete our data?",
    answer: "Yes. You can export your data or ask for it to be deleted at any time.",
  },
  {
    // WHY TRUE: Rule 1.6(c) asks for reasonable efforts to prevent unauthorized
    // access; isolation, encryption, logging and the provider terms above are those
    // efforts. Say "built to support", never "certified" or "approved by the ABA".
    id: "aba",
    label: "Built to support ABA Model Rule 1.6",
    question: "Does CaseDelta meet ABA Rule 1.6?",
    answer:
      "CaseDelta is built to support ABA Model Rule 1.6, which asks for reasonable efforts to protect client confidentiality.",
  },
  {
    // WHY TRUE: ABA Formal Opinion 512 (July 29, 2024) applies Rule 1.6 to
    // generative AI and singles out "self-learning" tools that use inputs to train
    // themselves. Delta does not train on client data (`training` above). Folded in
    // from the retired /blog/legal-ai-security-aba-rule-1-6 post, 2026-09-25.
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
  points: ["hipaa", "training", "in-place"],
};

/** The /security page: its hero and the QA groups, each a list of claim ids. */
export const SECURITY_PAGE = {
  title: "CaseDelta security: HIPAA compliant, and client data never trains AI",
  heading: "Built for client files.",
  lead: "Built for PII, PHI and sensitive client records.",
};

export const SECURITY_GROUPS: { id: string; title: string; claims: string[] }[] = [
  { id: "client-data", title: "Client data and HIPAA", claims: ["hipaa", "encryption", "not-sold", "in-place"] },
  { id: "ai", title: "AI and training", claims: ["training", "provider"] },
  { id: "access", title: "Access and isolation", claims: ["isolation", "audit"] },
  { id: "deletion", title: "Deletion and export", claims: ["deletion"] },
  { id: "aba", title: "ABA Rule 1.6 confidentiality", claims: ["aba", "aba-512"] },
];
