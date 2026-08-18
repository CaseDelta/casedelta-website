/**
 * The /v2 brand layer. ONE object per brand direction, every colour in the page
 * derived from it.
 *
 * Why this exists: the palette was previously literal Sasonix values scattered
 * across the components (orange #ff7029 baked into gradients, #fff written inline),
 * so "try a different brand" meant editing fourteen files. Now a palette is data.
 * Every component reads CSS custom properties through the `SX` tokens, this file
 * emits those properties once per theme, and switching brand is one word.
 *
 * HOW TO SWAP THE BRAND
 *   - Preview any theme live, no rebuild:  /v2?theme=casedelta   /v2?theme=dark
 *   - Make one the default:                change DEFAULT_THEME below.
 *   - Add a new brand:                     add a PALETTES entry. Nothing else.
 *
 * Roles are SEMANTIC, never named after a colour. `accent` is the brand colour
 * whatever it happens to be, so a blue brand does not leave the code saying
 * "orange". Add a role here rather than writing a literal in a component.
 */

export type ThemeName = "sasonix" | "casedelta" | "dark";

/** The theme that ships when no ?theme= override is present. */
export const DEFAULT_THEME: ThemeName = "sasonix";

export interface Palette {
  /** Brand colour: primary CTA fill, active states, icon accents. */
  accent: string;
  /** Pressed / deeper variant of the brand colour. */
  accentDeep: string;
  /** Brand colour at low opacity, for tinted chips and icon wells. */
  accentSoft: string;
  /** Text and icons placed ON the accent. */
  onAccent: string;

  /** Primary text, and the dark button fill. */
  ink: string;
  /** Secondary text. */
  ink2: string;
  /** Tertiary text, captions, eyebrow labels. */
  ink3: string;
  /** Text placed ON an ink-filled surface, such as the dark button. Not simply
   *  white: in a dark theme `ink` is light, so this inverts with it. */
  onInk: string;

  /** Page background. */
  bg: string;
  /** Secondary page background, the banded / tinted sections. */
  bgAlt: string;
  /** Card and panel surface. */
  surface: string;
  /** Card surface, alternate depth. */
  surfaceAlt: string;

  /** Hairline borders and dividers. */
  hairline: string;
  /** Base colour for elevation shadows, as an "r,g,b" triplet. */
  shadowRgb: string;

  /** The accent AS USED OVER MEDIA. Not always the same as `accent`: a dark or
   *  achromatic accent disappears against photography, so this stays legible
   *  there while `accent` stays correct on the page's own surfaces. */
  accentOnMedia: string;

  /** Text placed over photography or video. */
  onMedia: string;
  /** Secondary text over media. */
  onMediaMuted: string;
  /** Scrim colour laid over media so text stays legible, as an "r,g,b" triplet. */
  scrimRgb: string;

  /** Frosted-glass panel fill sitting over media. */
  glass: string;
  /** Frosted-glass panel border. */
  glassEdge: string;
}

export const PALETTES: Record<ThemeName, Palette> = {
  /**
   * The original Sasonix template values, extracted from the live Framer site.
   * Kept as the default so the rebrand is a deliberate flip, never a side effect.
   */
  sasonix: {
    accent: "#ff7029",
    accentDeep: "#ff6c02",
    accentSoft: "rgba(255,112,41,0.12)",
    onAccent: "#ffffff",
    ink: "#120a04",
    ink2: "#5c4c3f",
    ink3: "rgba(18,10,4,0.58)",
    onInk: "#ffffff",
    bg: "#ffffff",
    bgAlt: "#fcf8f4",
    surface: "#ffffff",
    surfaceAlt: "#fefaf6",
    hairline: "rgba(44,24,11,0.10)",
    shadowRgb: "26,23,18",
    accentOnMedia: "#ff7029",
    onMedia: "#ffffff",
    onMediaMuted: "rgba(255,255,255,0.88)",
    scrimRgb: "6,6,10",
    glass: "rgba(255,255,255,0.44)",
    glassEdge: "rgba(255,255,255,0.66)",
  },

  /**
   * CaseDelta's own palette, from design-tokens.json. Deliberately achromatic:
   * the brand carries no chromatic accent, so near-black is the accent and the
   * colour in the page comes from the product media, which is the Granola and
   * Linear register.
   */
  casedelta: {
    accent: "#212121",
    accentDeep: "#0d0d0d",
    accentSoft: "rgba(33,33,33,0.08)",
    onAccent: "#ffffff",
    ink: "#282828",
    ink2: "#5d5d5d",
    ink3: "#757575",
    onInk: "#ffffff",
    bg: "#ffffff",
    bgAlt: "#f3f3f3",
    surface: "#ffffff",
    surfaceAlt: "#f8f8f8",
    hairline: "#ededed",
    shadowRgb: "24,24,24",
    accentOnMedia: "#ffffff",
    onMedia: "#ffffff",
    onMediaMuted: "rgba(255,255,255,0.86)",
    scrimRgb: "10,10,10",
    glass: "rgba(255,255,255,0.46)",
    glassEdge: "rgba(255,255,255,0.68)",
  },

  /**
   * Dark-first, the Vapi register: the page recedes and the product media carries
   * the light. Included so the direction can be judged live rather than imagined.
   */
  dark: {
    accent: "#e8e8e8",
    accentDeep: "#ffffff",
    accentSoft: "rgba(255,255,255,0.10)",
    onAccent: "#0d0d0d",
    ink: "#f2f2f2",
    ink2: "#a8a8a8",
    ink3: "#7c7c7c",
    onInk: "#0d0d0d",
    bg: "#0b0b0c",
    bgAlt: "#121214",
    surface: "#161618",
    surfaceAlt: "#1c1c1f",
    hairline: "rgba(255,255,255,0.10)",
    shadowRgb: "0,0,0",
    accentOnMedia: "#ffffff",
    onMedia: "#ffffff",
    onMediaMuted: "rgba(255,255,255,0.84)",
    scrimRgb: "0,0,0",
    glass: "rgba(22,22,24,0.58)",
    glassEdge: "rgba(255,255,255,0.14)",
  },
};

/** CSS custom property name for each palette role. */
const VAR: Record<keyof Palette, string> = {
  accent: "--sx-accent",
  accentDeep: "--sx-accent-deep",
  accentSoft: "--sx-accent-soft",
  onAccent: "--sx-on-accent",
  ink: "--sx-ink",
  ink2: "--sx-ink-2",
  ink3: "--sx-ink-3",
  onInk: "--sx-on-ink",
  bg: "--sx-bg",
  bgAlt: "--sx-bg-alt",
  surface: "--sx-surface",
  surfaceAlt: "--sx-surface-alt",
  hairline: "--sx-hairline",
  shadowRgb: "--sx-shadow-rgb",
  accentOnMedia: "--sx-accent-on-media",
  onMedia: "--sx-on-media",
  onMediaMuted: "--sx-on-media-muted",
  scrimRgb: "--sx-scrim-rgb",
  glass: "--sx-glass",
  glassEdge: "--sx-glass-edge",
};

function declarations(p: Palette): string {
  return (Object.keys(VAR) as (keyof Palette)[])
    .map((role) => `${VAR[role]}:${p[role]};`)
    .join("");
}

/**
 * The full stylesheet: the default theme on :root, then every theme behind a
 * [data-sx-theme] attribute so a swap is one attribute, with no reload and no
 * rebuild. Emitted once, in ThemeVars.
 */
export function themeStylesheet(): string {
  const base = `:root{${declarations(PALETTES[DEFAULT_THEME])}}`;
  const rest = (Object.keys(PALETTES) as ThemeName[])
    .map((name) => `[data-sx-theme="${name}"]{${declarations(PALETTES[name])}}`)
    .join("");
  return base + rest;
}

export function isThemeName(value: string | null | undefined): value is ThemeName {
  return !!value && value in PALETTES;
}
