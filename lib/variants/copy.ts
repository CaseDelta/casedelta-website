/**
 * Hero copy, abstracted so the headline can be A/B tested independently of the design.
 * The three headline options come from website_rebuild_2026/site_copy.md.
 * "control" is the capacity-first line the user leaned toward.
 *
 * Shared hero strings (subhead, tagline, CTAs, logo wall) are constant across copy
 * variants because the hero-copy flag only swaps the headline (per posthog_split_testing.md).
 */
import type { CopyVariant, HeadlineSegment } from "./types";

export const HERO_HEADLINES: Record<CopyVariant, HeadlineSegment[]> = {
  control: [
    { text: "Win back your time by having the " },
    { text: "headcount you could never hire", em: true },
    { text: "." },
  ],
  teammate: [
    { text: "The teammate you " },
    { text: "can't hire", em: true },
    { text: " fast enough." },
  ],
  problem: [
    { text: "You don't have a case problem. You have a " },
    { text: "capacity problem", em: true },
    { text: "." },
  ],
};

/**
 * The hero subhead, shared by ALL three hero variants (harvey-light, harvey-dark,
 * and legora). It states the category ("AI paralegal") that the headline no longer
 * names, so it is load-bearing for comprehension, not decoration.
 *
 * "knows you, your case, and your firm" is the learned-firm-memory moat
 * (POSITIONING.md section 4), which is the one claim the crowded "AI paralegal"
 * label cannot make on its own.
 */
export const HERO_SUBHEAD =
  "The best AI paralegal is the one that knows you, your case, and your firm.";

export const PRIMARY_CTA = { label: "Book a demo", href: "/demo" } as const;
export const SECONDARY_CTA = { label: "See how firms use it", href: "/use-cases" } as const;
export const LOGIN = { label: "Log in", href: "https://app.casedelta.com" } as const;

export const LOGO_CAP = "Works inside the tools your firm already uses";

export type LogoStyle = "serif" | "wide";
export const LOGOS: Array<{ name: string; style?: LogoStyle }> = [
  { name: "Clio" },
  { name: "MyCase" },
  { name: "Camp Legal", style: "serif" },
  { name: "Google Workspace" },
  { name: "MICROSOFT 365", style: "wide" },
  { name: "Dropbox" },
  { name: "GOHIGHLEVEL", style: "wide" },
];

/**
 * Hero social proof: a rating over a row of the practice areas CaseDelta is built
 * for (signals purpose-built specialization for serious litigation firms).
 *
 * DO NOT REMOVE THE RATING. The 4.9 is REAL: a practicing attorney gave it. An
 * earlier revision of this comment called it a placeholder, an agent believed the
 * comment over the fact, and stripped it off the live site as "fabricated" on
 * 2026-06-29. It had to be reverted. If it looks placeholder-y to you, ask before
 * touching it, do not delete it.
 *
 * `source` is deliberately NOT rendered: StarRating (heroes/shared.tsx) shows the
 * stars + the number only and drops the source, leaving attribution ambiguous on
 * purpose. Keep it that way unless Camren says otherwise. (`source` is read only by
 * HeroSocialProof, which is currently unmounted, so nothing on the live site
 * attributes the rating to Google today.)
 *
 * The practice areas are honest, they are the product's target verticals.
 */
export const SOCIAL_PROOF = {
  rating: "4.9",
  source: "Google",
  // Connective label for the practice-area row. "Built for" (not "used by") keeps it
  // honest, it is about who the product targets, not a claim of real customers.
  practiceAreasLabel: "Built for firms in",
  practiceAreas: ["Personal Injury", "Medical Malpractice", "Mass Tort", "Employment"],
};

/** Header nav, labels match the mockups, mapped to the real routes that exist. */
export const HERO_NAV: Array<{ label: string; href: string }> = [
  { label: "Product", href: "/features" },
  { label: "Solutions", href: "/use-cases" },
  { label: "Security", href: "/security" },
  { label: "Integrations", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];
