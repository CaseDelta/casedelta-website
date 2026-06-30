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
    q: "Do I have to switch software or migrate my data?",
    a: "No. There is nothing to rip out and nothing to migrate. CaseDelta works on top of the tools you already pay for, so your data stays where it is and your team keeps the systems they know.",
  },
  {
    q: "Will CaseDelta replace my staff?",
    a: "No. It is here so your people stop drowning in routine work, and so your next hire is a choice rather than an emergency. It adds capacity to the team you have. It does not shrink it.",
  },
] as const;
