/**
 * Variant system types.
 *
 * Two independent axes so design and copy can be A/B tested separately:
 *  - DesignVariant: the look (the three finalist mockups). "control" === harvey-light.
 *  - CopyVariant: the hero headline framing.
 *
 * Flag keys keep "control" first so the raw multivariate PostHog flags graduate
 * cleanly into a PostHog Experiment later (see lib/variants/resolve.ts + the
 * posthog_split_testing research).
 */

export type DesignVariant = "control" | "harvey-dark" | "legora";
export type DesignName = "harvey-light" | "harvey-dark" | "legora";
export type CopyVariant = "control" | "teammate" | "problem";
export type Mode = "light" | "dark";
export type HeroLayout = "left-contained" | "full-bleed";

/**
 * The full token set a themed page consumes. Values are pulled verbatim from the
 * three mockup `:root` blocks in competitor_design_analysis/recreations/eclipse-variants/.
 */
export interface Theme {
  key: DesignVariant;
  name: DesignName;
  mode: Mode;
  heroLayout: HeroLayout;

  // surfaces
  canvas: string;
  canvasRgb: string; // "r, g, b" for composing scrim gradients
  card: string; // lifted surface
  card2: string; // nested / hover surface

  // text
  ink: string; // primary text
  muted: string; // secondary text
  faint: string; // labels, logo wall, captions

  // lines
  hairline: string;
  hairlineStrong: string;

  // accent
  accent: string; // bright highlight: italic word, links, card icons
  accentDeep: string; // deep blue stop (#1f3a5f), also the dark proof band
  accentSoft: string; // tinted background for icon chips / highlights
  accentBorderHover: string; // card hover border

  // pill button
  pillBg: string;
  pillBgHover: string;
  pillText: string;
  pillDotStroke: string; // arrow stroke inside the white dot

  // hero media (the exact harvey / legora footage from the mockups)
  heroVideo: string;
  heroVideoType: string;
  heroPoster: string;

  // type
  serif: string;
  sans: string;
}

export interface HeadlineSegment {
  text: string;
  em?: boolean; // rendered italic in the accent color
}
