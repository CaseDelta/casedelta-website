/**
 * The /answers hub: questions and direct answers, rendered on the page AND as one
 * FAQPage JSON-LD block from the same source, because Google requires FAQ markup
 * to match the visible text.
 *
 * COMPOSED, NOT RETYPED. Pricing answers come from lib/pricing.ts and security
 * answers from lib/security.ts. Only the questions that belong to neither file are
 * written here. If a price or a security claim is wrong on this page, fix it in
 * its own file.
 *
 * Rules (Camren, 2026-09-25): no law firm names, no customer names, no quotes, no
 * founder or company details. Answers are one to three sentences and state a fact.
 * Integrations: Delta connects to anything a team signs into, so any platform may
 * be named. Never name the AI model; never "no third-party AI"; never "never
 * stores anything" (see the DO NOT SAY list in lib/security.ts).
 */
import { PRICING_QA } from "./pricing";
import { claim } from "./security";
import { PAGE_PLATFORMS, platform, platformHref, worksWithAnswer, type Platform } from "./integrations";

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

/** Shown as "Updated <date>" on /answers. */
export const ANSWERS_UPDATED = "2026-09-25";

/** Shared with /integrations and every platform page. Confirmed true by Camren 2026-09-25. */
export const CONNECT_TIME_ANSWER =
  "Minutes. You ask Delta to connect a system, sign in once on its own page, and Delta is working the same day.";
export const NOT_LISTED_ANSWER =
  "Delta can connect to any system your team signs into. You sign in once, and Delta checks it can see your cases before the connection is done.";

/** One question per platform with a page (linked), plus the two document stores firms ask about. */
const platformAnswer = (p: Platform): AnswerItem => ({
  question: `Does CaseDelta work with ${p.name}?`,
  answer: worksWithAnswer(p),
  href: platformHref(p),
  hrefLabel: p.page ? `Delta in ${p.name}` : undefined,
});
const INTEGRATION_ANSWERS = [...PAGE_PLATFORMS, platform("google-drive")!, platform("dropbox")!].map(platformAnswer);

const pricing = (id: string): AnswerItem => {
  const q = PRICING_QA.find((x) => x.id === id);
  if (!q) throw new Error(`Unknown pricing question: ${id}`);
  return { question: q.question, answer: q.answer, href: "/pricing", hrefLabel: "See full pricing" };
};
const security = (id: string): AnswerItem => {
  const c = claim(id);
  return { question: c.question, answer: c.answer, href: "/security", hrefLabel: "How we protect client data" };
};

export const ANSWER_CATEGORIES: AnswerCategory[] = [
  {
    id: "what",
    title: "What CaseDelta is",
    items: [
      {
        question: "What is CaseDelta?",
        answer:
          "CaseDelta is an AI paralegal for law firms. Its assistant, Delta, works inside the systems your firm already uses, such as case management, intake, email and documents, and does the case work across all of them.",
      },
      {
        question: "Who is CaseDelta built for?",
        answer: "Plaintiff law firms, especially personal injury, mass tort and medical malpractice practices.",
      },
      {
        question: "Is Delta the same as CaseDelta?",
        answer: "CaseDelta is the platform. Delta is the AI paralegal that works inside it.",
      },
      {
        question: "What case work can Delta do?",
        answer:
          "Delta pulls reports across the whole firm, updates cases, builds spreadsheets and drafts documents. It reads case documents and medical records and cites the page each answer came from.",
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    items: [
      ...INTEGRATION_ANSWERS,
      { question: "What if my system is not listed?", answer: NOT_LISTED_ANSWER, href: "/integrations", hrefLabel: "Every system Delta works in" },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    items: ["cost", "per-seat", "account", "setup", "metering"].map(pricing),
  },
  {
    id: "security",
    title: "Security",
    items: ["hipaa", "training", "provider", "isolation", "deletion", "aba"].map(security),
  },
  {
    id: "start",
    title: "Getting started",
    items: [
      {
        question: "How long does it take to connect a system?",
        // Confirmed true by Camren 2026-09-25.
        answer: "Minutes. You ask Delta to connect a system, sign in once on its own page, and Delta is working the same day.",
      },
      { ...security("in-place"), href: undefined, hrefLabel: undefined },
      {
        question: "What does our team do?",
        answer: "Ask Delta in plain English, review what it drafts, and approve anything before it goes out.",
      },
      {
        question: "Can Delta run on a schedule?",
        answer: "Yes. You can set Delta to run a task on a schedule, such as a briefing on your cases every morning.",
      },
    ],
  },
];

export function getAllAnswers(): AnswerItem[] {
  return ANSWER_CATEGORIES.flatMap((c) => c.items);
}
