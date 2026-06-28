/**
 * Shared homepage FAQ data.
 * Rendered visibly in components/marketing/HomeSections.tsx AND emitted as FAQPage
 * JSON-LD in app/page.tsx. Schema must match the visible text (Google self-serving /
 * mismatched-markup rule), so this is the single source for both. Keep them in sync.
 */
export const HOME_FAQ = [
  {
    q: "What is CaseDelta in one sentence?",
    a: "CaseDelta is an AI paralegal that works inside the tools your firm already uses, your case manager, your email, your billing, and does the routine case work for you, while your team reviews and approves.",
  },
  {
    q: "Is CaseDelta accurate? How do I know it is not making things up?",
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
  {
    q: "Will CaseDelta replace my staff?",
    a: "No. It is here so your people stop drowning in routine work, and so your next hire is a choice rather than an emergency. It adds capacity to the team you have. It does not shrink it.",
  },
  {
    q: "How long until it is useful?",
    a: "It is useful on day one for routine tasks you delegate directly. Over about a month it learns your firm's standards and preferences, so you move from instructing it step by step to simply handing it the case.",
  },
  {
    q: "Does CaseDelta act on its own without me?",
    a: "Not by default. It works like a new hire: it drafts and prepares, your team reviews and approves, and it earns more autonomy task by task as it proves itself. You decide what goes out.",
  },
  {
    q: "We are a small firm. Is this overkill for us?",
    a: "It is built for small, growing firms that feel the squeeze of hiring. If you are taking on more work than your team can comfortably carry and your next hire is hard to find, this is squarely for you.",
  },
] as const;
