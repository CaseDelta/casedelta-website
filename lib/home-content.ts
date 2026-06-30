/**
 * Shared homepage FAQ data.
 * Rendered visibly in components/marketing/HomeSections.tsx AND emitted as FAQPage
 * JSON-LD in app/page.tsx. Schema must match the visible text (Google self-serving /
 * mismatched-markup rule), so this is the single source for both. Keep them in sync.
 *
 * v2 copy (casedelta-cloud/pi_pain_research/offer/website_copy_v2.md): honest claims only,
 * no "data never leaves" / "no third-party LLM", Delta gender-neutral, no em dashes.
 */
export const HOME_FAQ = [
  {
    q: "Why not just use ChatGPT or Claude?",
    a: "Those are a brain in another tab. Delta is a brain that knows your firm and works inside the tools you already use, so it does the case work instead of just talking about it.",
  },
  {
    q: "Do I have to switch software or migrate my data?",
    a: "No. There is nothing to rip out and nothing to migrate. Delta works on top of the tools you already pay for, so your data stays where it is and your team keeps the systems they know.",
  },
  {
    q: "Will Delta replace my staff?",
    a: "No. It is here so your people stop drowning in routine work, and so your next hire is a choice rather than an emergency. It adds capacity to the team you have. It does not shrink it.",
  },
  {
    q: "Is it accurate? How do I know it is not making things up?",
    a: "Every answer points back to the page it came from. Delta works from the facts already in your file, it does not invent them, and your team approves before anything goes out. You always have the final read.",
  },
  {
    q: "Is my client data safe?",
    a: "Your client matters are handled under enterprise terms, in writing: zero data retention, never used to train anyone's model, encrypted in transit and at rest, with a BAA available. A human on your team signs off before anything leaves the firm.",
  },
  {
    q: "You are early-stage. Why should I trust you?",
    a: "We are early, and for a founding firm that is the advantage: you shape how Delta works for firms like yours, and you lock a rate the next firm will not get.",
  },
] as const;
