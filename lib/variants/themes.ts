/**
 * The three design themes, values lifted verbatim from the mockup `:root` blocks:
 *   competitor_design_analysis/recreations/eclipse-variants/{harvey-light,harvey-dark,b-legora-fullbleed}.html
 *
 * harvey-light = control. harvey-dark and legora are dark. legora is full-bleed.
 * harvey-dark reuses the harvey footage on a dark canvas; legora uses its own footage.
 */
import type { Theme, DesignVariant } from "./types";

const SERIF = "var(--font-newsreader), Georgia, 'Times New Roman', serif";
const SANS =
  "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const HARVEY_LIGHT: Theme = {
  key: "control",
  name: "harvey-light",
  mode: "light",
  heroLayout: "left-contained",

  canvas: "#f6f3ee",
  canvasRgb: "246, 243, 238",
  card: "#fbf9f5",
  card2: "#ffffff",

  ink: "#14171f",
  muted: "#5b5650",
  faint: "#8a857d",

  hairline: "rgba(20, 23, 31, 0.10)",
  hairlineStrong: "rgba(20, 23, 31, 0.16)",

  accent: "#2f6fe0",
  accentDeep: "#1f3a5f",
  accentSoft: "rgba(47, 111, 224, 0.10)",
  accentBorderHover: "rgba(47, 111, 224, 0.42)",

  pillBg: "#1f3a5f",
  pillBgHover: "#284b78",
  pillText: "#ffffff",
  pillDotStroke: "#1f3a5f",

  heroVideo: "/hero/harvey.webm",
  heroVideoType: "video/webm",
  heroPoster: "/hero/harvey-poster.webp",

  serif: SERIF,
  sans: SANS,
};

export const HARVEY_DARK: Theme = {
  key: "harvey-dark",
  name: "harvey-dark",
  mode: "dark",
  heroLayout: "left-contained",

  canvas: "#0d0f14",
  canvasRgb: "13, 15, 20",
  card: "#12151c",
  card2: "#141925",

  ink: "#f4f6fa",
  muted: "rgba(244, 246, 250, 0.56)",
  faint: "rgba(244, 246, 250, 0.40)",

  hairline: "rgba(244, 246, 250, 0.12)",
  hairlineStrong: "rgba(244, 246, 250, 0.20)",

  accent: "#6aa6ff",
  accentDeep: "#1f3a5f",
  accentSoft: "rgba(58, 120, 224, 0.16)",
  accentBorderHover: "rgba(106, 166, 255, 0.42)",

  pillBg: "#3a78e0",
  pillBgHover: "#4f86e8",
  pillText: "#ffffff",
  pillDotStroke: "#1f3a5f",

  heroVideo: "/hero/harvey.webm",
  heroVideoType: "video/webm",
  heroPoster: "/hero/harvey-poster.webp",

  serif: SERIF,
  sans: SANS,
};

export const LEGORA: Theme = {
  key: "legora",
  name: "legora",
  mode: "dark",
  heroLayout: "full-bleed",

  canvas: "#0f0e0d",
  canvasRgb: "15, 14, 13",
  card: "#141311",
  card2: "#141821",

  ink: "#fafaf9",
  muted: "rgba(250, 250, 249, 0.56)",
  faint: "rgba(250, 250, 249, 0.40)",

  hairline: "rgba(250, 250, 249, 0.12)",
  hairlineStrong: "rgba(250, 250, 249, 0.20)",

  accent: "#6aa6ff",
  accentDeep: "#1f3a5f",
  accentSoft: "rgba(58, 120, 224, 0.16)",
  accentBorderHover: "rgba(106, 166, 255, 0.40)",

  pillBg: "#3a78e0",
  pillBgHover: "#4f86e8",
  pillText: "#ffffff",
  pillDotStroke: "#1f3a5f",

  heroVideo: "/hero/legora.mp4",
  heroVideoType: "video/mp4",
  heroPoster: "/hero/legora-poster.webp",

  serif: SERIF,
  sans: SANS,
};

export const THEMES: Record<DesignVariant, Theme> = {
  control: HARVEY_LIGHT,
  "harvey-dark": HARVEY_DARK,
  legora: LEGORA,
};

export function getTheme(key: DesignVariant): Theme {
  return THEMES[key] ?? HARVEY_LIGHT;
}
