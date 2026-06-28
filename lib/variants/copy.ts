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
  control: [{ text: "Run more cases " }, { text: "without hiring", em: true }, { text: "." }],
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

/** Left-contained heroes (harvey-light / harvey-dark) show this subhead. */
export const HERO_SUBHEAD =
  "An AI paralegal that works inside the tools you already use and does the routine case work, so your team takes on more without drowning.";

/** Full-bleed hero (legora) shows this short inline tagline next to the pill instead of a subhead. */
export const HERO_TAGLINE = "The AI paralegal for law firms";

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
 * Hero social proof: a Google rating over a row of trust signals.
 *
 * The Google rating is still a PLACEHOLDER (no real Google reviews yet) and must be
 * made real or removed before launch. The trust signals are honest, mirroring the
 * commitments on the Security page (POSITIONING.md: enterprise terms, zero-retention,
 * no-training, BAA path).
 */
export const SOCIAL_PROOF = {
  rating: "4.9",
  source: "Google",
  signals: [
    "Enterprise-grade security",
    "Zero data retention",
    "Never trained on your data",
    "BAA available",
  ],
};

/** Header nav, labels match the mockups, mapped to the real routes that exist. */
export const HERO_NAV: Array<{ label: string; href: string }> = [
  { label: "Product", href: "/features" },
  { label: "Solutions", href: "/use-cases" },
  { label: "Security", href: "/security" },
  { label: "Integrations", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];
