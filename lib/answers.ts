/**
 * Knowledge base / answers hub data.
 *
 * Each answer is a self-contained 40 to 60 word direct answer, definition-first
 * where it can be ("CaseDelta is a ..."). It renders the visible /answers page AND a
 * single FAQPage JSON-LD block, from the same source, because Google requires FAQ
 * markup to match the text visible on the page.
 *
 * Security answers use the defensible data-handling framing. Never write "no
 * third-party LLM" or "client data never leaves our infrastructure": production runs
 * on enterprise AI under zero-retention and BAA terms, so both are false.
 *
 * EVERY `href` POINTS AT SOMETHING THAT EXISTS. This file used to link /features,
 * /use-cases, /compare, /compare/casedelta-vs-clio, /use-cases/medical-malpractice,
 * /pricing and /security. All seven were deleted on 2026-09-02, so they now point at
 * the homepage sections that carry the same argument. Two answers lost their link
 * entirely rather than being pointed somewhere approximate: there is no longer a
 * practice-area page or a med-mal page, and a "Med-mal use case" link that lands on a
 * general capability band is worse than no link.
 *
 * The price is imported, never retyped. See lib/pricing.ts for why.
 */
import { PRICE_PARAGRAPH } from "./pricing";

export interface AnswerItem {
  question: string;
  answer: string;
  /** optional internal link to a deeper page */
  href?: string;
  hrefLabel?: string;
}

export interface AnswerCategory {
  id: string;
  title: string;
  items: AnswerItem[];
}

export const ANSWER_CATEGORIES: AnswerCategory[] = [
  {
    id: "basics",
    title: "The basics",
    items: [
      {
        question: "What is CaseDelta?",
        answer:
          "CaseDelta is an AI associate for plaintiff law firms. The assistant, Delta, drives the tools a firm already uses, including Clio, Filevine, MyCase, Google, Microsoft, and billing, from one chat. It works real cases end to end: chronologies, demand letters, discovery, intake, and client follow-up.",
        href: "/#features",
        hrefLabel: "See what Delta does",
      },
      {
        question: "Who is CaseDelta built for?",
        answer:
          "CaseDelta is built for plaintiff law firms of 5 to 50 attorneys, with a primary focus on personal injury, medical malpractice, and mass tort. The same product also serves employment and other litigation practices. It is designed for document-heavy, integration-rich, chronology-driven work.",
      },
      {
        question: "What makes CaseDelta different from other legal AI?",
        answer:
          "Most legal AI is a destination: you upload work to it, move your firm onto it, or work inside it. CaseDelta is the opposite shape. Delta drives the tools you already run, so every answer is grounded in your real case, not generic law.",
        href: "/#why",
        hrefLabel: "See how it compares",
      },
      {
        question: "Is Delta the same as CaseDelta?",
        answer:
          "CaseDelta is the platform, and Delta is the AI associate that works inside it. When a firm connects its tools, Delta becomes another seat at the firm: it reads the case files, drafts the work, and operates the systems the firm already uses.",
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    items: [
      {
        question: "Does CaseDelta integrate with Clio?",
        answer:
          "Yes. Delta drives Clio directly from one chat: it reads matters, builds chronologies, drafts and logs work, and updates the case file. Unlike a built-in assistant that only sees Clio's own data, Delta also unifies the rest of a firm's stack, including email, drive, and billing.",
        href: "/#why",
        hrefLabel: "See how it compares",
      },
      {
        question: "What tools does CaseDelta connect to?",
        answer:
          "Delta drives Clio, Filevine, MyCase, Google Workspace, Microsoft, Dropbox, and billing tools from one chat. The goal is five-minute self-serve onboarding for any platform that has a public API, so a firm can connect Delta to the systems it already runs without an engineer.",
      },
      {
        question: "Do I have to switch case-management systems to use CaseDelta?",
        answer:
          "No. CaseDelta is a layer over the tools you already run, not a replacement for them. There is nothing to migrate and no rip-and-replace implementation. Delta works with your existing case manager, email, drive, and billing instead of forcing your firm onto a new platform.",
      },
    ],
  },
  {
    id: "chronologies",
    title: "Chronologies and case work",
    items: [
      {
        question: "How does CaseDelta build medical chronologies?",
        answer:
          "Delta uses multi-agent orchestration to build cited chronologies from 100 to 5,000-plus page document sets in minutes, with citations to the primary source. There is no human-review queue, so a firm gets a chronology in real time inside its own stack rather than waiting days for a reviewed deliverable.",
      },
      {
        question: "How long does a chronology take with CaseDelta?",
        answer:
          "Minutes. Because the work runs inside the firm's own tools with no human-review queue, Delta returns a cited chronology in real time, even on large medical-record sets. Tools that rely on a human-QA tier typically state turnaround in days rather than minutes.",
      },
      {
        question: "What work can Delta do besides chronologies?",
        answer:
          "Delta runs the whole case: intake, medical chronologies, demand letters, discovery responses, complaints, damages math, client follow-up, calendaring, and case-file updates. It also produces a morning briefing on every active matter, so the week's groundwork is done before the firm opens for the day.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    items: [
      {
        question: "How much does CaseDelta cost?",
        answer:
          `${PRICE_PARAGRAPH} There is also no required underlying subscription, the way a research add-on assumes Westlaw or a CRM assistant assumes Salesforce.`,
        href: "/#pricing",
        hrefLabel: "See pricing",
      },
      {
        question: "Does CaseDelta charge per case or per document?",
        answer:
          "No. CaseDelta is a flat monthly subscription for the firm, priced by account count rather than by deliverable. A heavy case with thousands of pages does not change the bill, and neither does adding a matter, which is a deliberate contrast to per-case, per-demand, and usage-credit models in the market.",
      },
    ],
  },
  {
    id: "security",
    title: "Security and compliance",
    items: [
      {
        question: "Is CaseDelta secure?",
        answer:
          "Each firm's data is isolated and encrypted at rest and in transit. Client data is never sold, never shared, and never used to train AI models. Every action Delta takes is logged in a full audit trail you can export, which supports reasonable efforts under ABA Rule 1.6.",
        href: "/#security",
        hrefLabel: "Security details",
      },
      {
        question: "Does CaseDelta train AI on my client data?",
        answer:
          "No. Your client data is never used to train, fine-tune, or improve any AI model, and the enterprise AI Delta uses is bound by no-retention and no-training agreements. Your information is also never sold or shared, and it is isolated to your firm.",
      },
      {
        question: "Is CaseDelta ABA Rule 1.6 compliant?",
        answer:
          "CaseDelta is built to support ABA Rule 1.6, which requires reasonable efforts to protect client confidentiality. It provides per-firm data isolation, encryption at rest and in transit, a full exportable audit trail of every action, and enterprise AI used under no-retention and no-training agreements.",
      },
    ],
  },
];

export function getAllAnswers(): AnswerItem[] {
  return ANSWER_CATEGORIES.flatMap((c) => c.items);
}
