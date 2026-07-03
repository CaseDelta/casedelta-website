/**
 * Shared homepage FAQ data.
 * Rendered visibly in components/marketing/HomeSections.tsx (as click-to-open
 * drawers) AND emitted as FAQPage JSON-LD in app/page.tsx. Schema must match the
 * visible text (Google self-serving / mismatched-markup rule), so this is the
 * single source for both. Keep them in sync. Kept concise (4 questions): the
 * clarity line plus the three objections that actually block a first-time buyer.
 * The full question set lives on /answers.
 */
export const HOME_FAQ = [
  {
    q: "What is CaseDelta in one sentence?",
    a: "CaseDelta is an AI paralegal that works inside the tools your firm already uses, your case manager, your email, your billing, and does the routine case work for you, while your team reviews and approves.",
  },
  {
    q: "How do I know it is not making things up?",
    a: "Every answer points back to the source it came from. It works from the facts already in your file, it does not invent them, and your team approves before anything goes out. You always have the final read.",
  },
  {
    q: "Why not just use Claude or ChatGPT?",
    a: "A general chatbot is a brain in another tab. It does not know your firm, it does not work inside your case manager, and it cannot move a matter forward. CaseDelta is a brain that knows your firm and operates the tools you already run on.",
  },
  {
    q: "Do I have to switch software or migrate my data?",
    a: "No. There is nothing to rip out and nothing to migrate. CaseDelta works on top of the tools you already pay for, so your data stays where it is and your team keeps the systems they know.",
  },
] as const;
