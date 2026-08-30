"use client";

/**
 * The second testimonial, between pricing and the CTA.
 *
 * CARRIES ALAN POLETTI since 2026-08-28. Kirschbaum & Nowotny held this slot for a
 * few hours and are now only in the hero.
 *
 * IT RENDERS THE SAME CARD AS THE LEADING TESTIMONIAL, by importing QuoteCard from
 * Testimonials.tsx rather than restating it (Camren, 2026-08-28). This section had
 * its own plain-type treatment and the mismatch read as an oversight. Sharing the
 * component means a restyle of one is a restyle of both; only the photograph differs.
 *
 * WHY THE LAST CLAUSE MATTERS. "Named what was blocking each one" is the part that
 * stops this reading as a saved report. A case system can show you rows of settled
 * matters; the blocker on each, across all of them, is synthesis. Do not trim the
 * quote to just the money.
 *
 * THE PATTERN IT COMES FROM is real and repeatable, from Rudin Law in production:
 * Delta reported ten settlement and disbursement matters carrying $502,102 in
 * settlement value with open checklist friction, naming the specific blocker on
 * each, unprompted, inside a morning brief. Poletti's $400,000 is his own firm's
 * figure from his own call, not that one. Never mix them.
 *
 * A NOTE ON THE WORDING. This opened "In our fifteen-minute Zoom, it found" and
 * Camren changed it to "In our demo, it already found" (2026-08-28). Both halves of
 * that earn their place: "demo" is the moment a reader recognises, where a Zoom of a
 * stated length is a detail about a call they were not on, and "already" is what
 * makes the sentence land, because the money was found before the firm had bought
 * anything. Do not tidy "already" out as redundant against "had already settled";
 * the two are doing different jobs, one about the timing of the discovery and one
 * about the state of the cases.
 *
 * A USAGE STAT LIVED HERE and left with Kirschbaum & Nowotny. It was theirs: 328
 * requests from 4 people over 86 days on which someone actually used it, from
 * assistant_conversations where role='user'. It has no support for any other firm.
 *
 * WHAT REPLACED WHAT. This slot held IntegrationClose, a "Delta is working your cases
 * this afternoon" section carrying the five-minute onboarding argument. That file is
 * still in the repo, unmounted.
 *
 * IT RENDERS NOTHING WHEN QUOTES IS EMPTY, on purpose. Never fill it to close a gap.
 */
import { QuoteCard, type Testimonial } from "./Testimonials";

/** Real and attributable, or empty. There is no third option. */
const QUOTES: Testimonial[] = [
  {
    quote:
      "In our demo, it already found $400,000 sitting in cases we had already settled, and named what was blocking each one.",
    name: "Alan Poletti",
    // No `title` yet, and no `stat`: the usage figure that used to sit here was
    // Kirschbaum & Nowotny's and has no meaning attached to anyone else.
    //
    // cloud-swirl, NOT cloud-pastel: the leading testimonial has that one, and the
    // same photograph twice on one page reads as a mistake. Also not mountain (hero)
    // or forest-dark (the security band).
    bg: "/v2/ambient/cloud-swirl.webp",
  },
];

export function SecondProof() {
  if (QUOTES.length === 0) return null;
  return <QuoteCard c={QUOTES[0]} />;
}
