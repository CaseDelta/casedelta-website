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
  // v2: dream outcome is peace + control, never "the firm runs without you."
  control: [{ text: "Your firm, off your shoulders. " }, { text: "Still in your hands.", em: true }],
  teammate: [{ text: "Get the weight off. " }, { text: "Keep the wheel.", em: true }],
  problem: [{ text: "More cases. Same team. " }, { text: "Nothing slips.", em: true }],
};

/** Left-contained heroes (harvey-light / harvey-dark) show this subhead. */
export const HERO_SUBHEAD =
  "Delta is an AI teammate that does your firm's case work inside the tools you already use. No migration, nothing new to learn, and your team approves every move.";

/** Full-bleed hero (legora) shows this short inline tagline next to the pill instead of a subhead. */
export const HERO_TAGLINE = "An AI teammate inside the tools you already use";

export const PRIMARY_CTA = { label: "See it on your case", href: "/demo" } as const;
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
 * Hero social proof: a Google rating over a row of the practice areas CaseDelta is
 * built for (signals purpose-built specialization for serious litigation firms).
 *
 * The Google rating is still a PLACEHOLDER (no real Google reviews yet) and must be
 * made real or removed before launch. The practice areas are honest, they are the
 * product's target verticals.
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
