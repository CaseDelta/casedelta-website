/**
 * The one place a CaseDelta price is written down.
 *
 * This file exists because the site published two different prices at the same
 * time. The homepage said $499 / $999 / $1,999 by account band while /pricing,
 * the answers hub and all six comparison pages said "$349 per user, per month,
 * flat, no tiers". A prospect could read both in one session. Neither surface
 * knew the other existed, because each had typed its own number.
 *
 * So: import from here. Never retype a price into a component, a metadata
 * string, an FAQ answer or a comparison row. If a number has to change, it
 * changes once in TIERS and everything else follows.
 *
 * The unit is ACCOUNTS, the thing a firm actually provisions, and the price is
 * per FIRM, not per seat. That is the wedge against per-seat research tools, and
 * it is why the tiers are bands rather than a multiplier.
 *
 * The three tiers are EQUIVALENT. There is no featured tier, no "most popular"
 * badge and no highlighted middle. A firm picks the band its account count falls
 * into, and that is the whole decision. The value is identical across all three,
 * which is why the included list is written once, below the tiers, rather than
 * repeated three times with checkmarks.
 *
 * "Up to" is inclusive on purpose. A firm sitting on exactly five accounts is in
 * the $599 band, not pushed up into the next one. A brief pass at "less than" was
 * reverted on 2026-08-19 for that reason. Keep the overflow line as "More than
 * 20", which is only correct while the top band includes 20.
 *
 * The BAND BOUNDARIES are confirmed, not inherited: 5, 10 and 20 accounts at
 * $599, $1,099 and $2,099, settled with Camren on 2026-08-28. Worth knowing when
 * you read them: every firm in production today sits at six accounts or fewer, so
 * the top band is headroom rather than a band anyone has reached.
 *
 * "UNLIMITED STAFF" IS RETIRED. DO NOT BRING IT BACK IN ANY FORM. The old copy
 * said "Your whole staff included" and "Flat monthly. Unlimited staff." Those
 * read cleanly against an ATTORNEY count, where the point was that paralegals and
 * admins cost nothing. They are simply false against an ACCOUNT count: an account
 * is one login, a row in platform_users, and law_firms.max_users is enforced both
 * when an operator provisions users and when someone self-registers against a
 * firm access code. Every paralegal and admin who signs in consumes a band slot.
 * Camren's call on 2026-08-28 was to drop the idea outright rather than restate
 * it, so this is settled rather than pending: no "unlimited", no "your whole
 * team", no "regardless of staff size", and nothing implying the number does not
 * move when a firm grows.
 *
 * What IS true and may be said: there is no per-seat multiplier, and the price
 * does not move as a firm adds people inside its own band. Say that instead.
 */

export interface Tier {
  /** The account band, inclusive of its upper bound. */
  band: string;
  /** Formatted monthly price, thousands separated. */
  price: string;
  /** The monthly price as a number, for the derived figures below. */
  monthly: number;
  /** Plain-language band for prose and structured data. */
  accounts: number;
  /** Recurring workflows Delta runs on its own, included in the tier. */
  automations: number;
}

export const TIERS: Tier[] = [
  { band: "Up to 5 accounts", price: "$599", monthly: 599, accounts: 5, automations: 5 },
  { band: "Up to 10 accounts", price: "$1,099", monthly: 1099, accounts: 10, automations: 10 },
  { band: "Up to 20 accounts", price: "$2,099", monthly: 2099, accounts: 20, automations: 20 },
];

/**
 * The two figures a tier row discloses are arithmetic on the tier price and
 * nothing else. That is deliberate. A pricing page is the wrong place to debut a
 * productivity claim we cannot source, so there are no hours-saved numbers, no
 * payback periods and no percentages here. If someone wants to add one, it needs
 * a real source first, and it belongs in copy that can cite it.
 *
 * A hireMultiple() helper lived here briefly, rendering "7.0x to 9.0x" against the
 * published $50,000 to $65,000 loaded-paralegal range. It went with the crowded
 * 2x2 disclosure it was built for: the number needs a sentence of explanation to
 * mean anything, and a one-line disclosure has no room for one. The comparison to
 * a hire is still made, by the "A fraction of another salary" heading and by the
 * comparison table on /pricing, which are both places that can afford the words.
 */

/** Formats a whole-dollar figure with thousands separators. */
const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/** What the tier costs over twelve months. */
export const annualCost = (t: Tier) => usd(t.monthly * 12);

/**
 * The monthly price divided across a full band. Worth showing because it is the
 * one number that IMPROVES as the tiers go up, which is the honest reason a firm
 * near a boundary might size up rather than a manufactured "most popular" badge.
 */
export const perAccount = (t: Tier) =>
  "$" + (t.monthly / t.accounts).toFixed(2);


/** The lowest published price, for "starts at" phrasing. */
export const STARTING_PRICE = TIERS[0].price;

/** The largest band we publish. Firms above it get a custom plan. */
export const TOP_BAND_ACCOUNTS = TIERS[TIERS.length - 1].accounts;

/**
 * The canonical one-line price, for a comparison table cell. A complete sentence.
 */
export const PRICE_LINE =
  "$599 to $2,099 a month per firm by account count. Flat, published, self-serve.";

/**
 * The same fact as a CLAUSE, with no internal sentence break, for dropping into
 * the middle of a paragraph after "CaseDelta is ...".
 *
 * This exists because the comparison pages used to write `FLAT_PRICE.toLowerCase()`
 * mid-sentence, which rendered as "CaseDelta is $349 per user, per month. flat,
 * published, self-serve. No per-case math" on four live pages: a lowercase word
 * opening a sentence, because the constant carried a period the caller could not
 * see. Never lowercase a sentence to make it fit a slot. Use this instead.
 */
export const PRICE_CLAUSE =
  "$599 to $2,099 a month for the firm by account count, flat, published, and self-serve";

/**
 * The canonical paragraph, for FAQ answers and page descriptions where there is
 * room to say what the bands are.
 */
export const PRICE_PARAGRAPH =
  "CaseDelta is priced per firm by account count, not per seat: $599 a month for up to 5 accounts, $1,099 for up to 10, and $2,099 for up to 20. Firms above 20 accounts get a custom plan. There are no add-ons, no per-case or per-demand metering, and no setup fees. The price is published and self-serve, so a firm knows its cost before the demo.";

/*
 * An INCLUDED list lived here and rendered as a checklist under the tiers, first
 * on the homepage and then only on /pricing. Both are gone as of 2026-08-28: the
 * value is identical in all three bands, so a list under three equal rows answered
 * a question nobody had asked. What a firm gets belongs to the sections that can
 * show it. If a list like this comes back, it needs a surface of its own, not a
 * card wedged under the prices.
 */
