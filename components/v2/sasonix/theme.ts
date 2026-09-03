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
 *   - Preview any theme live, no rebuild:  /?theme=sasonix   /?theme=achromatic   /?theme=dark
 *   - Make one the default:                change DEFAULT_THEME below.
 *   - Add a new brand:                     add a PALETTES entry. Nothing else.
 *
 * Roles are SEMANTIC, never named after a colour. `accent` is the brand colour
 * whatever it happens to be, which is what let the brand go from orange to blue
 * by editing this file and nothing else. Add a role here rather than writing a
 * literal in a component.
 */

export type ThemeName = "casedelta" | "sasonix" | "achromatic" | "dark";

/** The theme that ships when no ?theme= override is present. */
export const DEFAULT_THEME: ThemeName = "casedelta";

export interface Palette {
  /** Brand colour: primary CTA fill, active states, icon accents. */
  accent: string;
  /** Pressed / deeper variant of the brand colour.
   *
   *  Also the correct fill for any accent-coloured SURFACE THAT CARRIES SMALL
   *  TEXT. White on #5170FF is 4.11:1, so a brand-filled card or bar with a 13px
   *  label on it fails AA while looking perfectly fine to whoever built it. Fill
   *  with this instead; nobody reads it as a different colour. In use on the
   *  featured pricing tier and the Stakes "working through the night" bar. */
  accentDeep: string;
  /** Brand colour at low opacity, for tinted chips and icon wells. */
  accentSoft: string;
  /** The accent AS TEXT on the page background.
   *
   *  Not the same as `accent`, and the difference is the whole reason this role
   *  exists. CaseDelta blue is #5170FF, which scores 4.11:1 on white: fine for a
   *  button fill or an icon (AA wants 3.0 for UI), and a FAIL for body text (AA
   *  wants 4.5). A link painted in the raw brand colour is the standard way a
   *  brand palette quietly ships an accessibility bug, so text gets the deeper
   *  value and fills keep the brand one. */
  accentText: string;
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
  /** A card that inverts: dark fill carrying light type, on a light page.
   *
   *  NOT the same as `ink`. `ink` is the primary TEXT colour and doubles as the
   *  dark button fill, and it is near-black by design. A near-black panel the
   *  width of the container reads as a hole in the page; the reference this was
   *  measured from uses a lifted grey (#313131, L*20) for exactly that reason.
   *  Its value is warm, so ours is not a copy of it: warm neutrals under a blue
   *  accent read as a mistake, which is the same reason the rest of this
   *  palette went cool. */
  surfaceInverse: string;

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
   * CaseDelta. THE BRAND, and the default.
   *
   * `accent` is #5170FF sampled straight out of the logo artwork, not picked by
   * eye: it is the exact blue of the swoosh under the delta mark in
   * public/assets/branding/casedelta-logo-full.png, so the mark in the nav and
   * the buttons under it are the same colour by construction rather than by
   * coincidence.
   *
   * The neutrals turned cool with it. The Sasonix set was warm (ink #120a04 is a
   * brown, bgAlt #fcf8f4 a cream) because it hung off an orange. Warm greys under
   * a blue accent read as a mistake, so ink is now a faintly cool near-black and
   * the tinted surfaces are a cool off-white.
   *
   * Contrast, measured rather than assumed: ink 18.9:1 on white, ink2 7.8:1,
   * ink3 ~5.6:1, accentText 5.8:1, white on accent 4.1:1 (fills and large type
   * only, which is why accentText exists), accentOnMedia 9.4:1 over the scrim.
   */
  casedelta: {
    accent: "#5170FF",
    accentDeep: "#3B54E8",
    accentText: "#3B54E8",
    accentSoft: "rgba(81,112,255,0.10)",
    onAccent: "#ffffff",
    ink: "#0F1115",
    ink2: "#4C5260",
    ink3: "rgba(15,17,21,0.66)",
    onInk: "#ffffff",
    bg: "#ffffff",
    bgAlt: "#f5f7fc",
    surface: "#ffffff",
    surfaceAlt: "#f9fafe",
    // L*20, matching the reference's lift off black, in this palette's cool cast.
    surfaceInverse: "#272B34",
    hairline: "rgba(15,23,42,0.10)",
    shadowRgb: "15,23,42",
    // The brand blue over photography is a real risk on this page: the hero
    // backdrop is a mountain under a blue sky, and #5170FF sits down into it.
    // A light brand tint keeps the family and stays legible against the scrim.
    accentOnMedia: "#9cb0ff",
    onMedia: "#ffffff",
    onMediaMuted: "rgba(255,255,255,0.88)",
    scrimRgb: "8,12,24",
    glass: "rgba(255,255,255,0.44)",
    glassEdge: "rgba(255,255,255,0.66)",
  },

  /**
   * The original Sasonix template values, extracted from the live Framer site.
   * Kept only as a reference and as a contrast test. Nothing ships on it.
   */
  sasonix: {
    accent: "#ff7029",
    accentDeep: "#ff6c02",
    accentText: "#b34700",
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
    surfaceInverse: "#313131",
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
   * The achromatic direction: no chromatic accent at all, near-black in its
   * place, colour carried entirely by the product media.
   * The Granola and Linear register. This was called "casedelta" until the brand
   * blue landed; it is kept because swapping to it is the cheapest contrast test
   * available and it has caught four separate invisible-element bugs.
   */
  achromatic: {
    accent: "#212121",
    accentDeep: "#0d0d0d",
    accentText: "#212121",
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
    surfaceInverse: "#2b2b2b",
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
    accent: "#7d93ff",
    accentDeep: "#9db0ff",
    accentText: "#9db0ff",
    accentSoft: "rgba(125,147,255,0.14)",
    onAccent: "#0d0d0d",
    ink: "#f2f2f2",
    ink2: "#a8a8a8",
    ink3: "#7c7c7c",
    onInk: "#0d0d0d",
    bg: "#0b0b0c",
    bgAlt: "#121214",
    surface: "#161618",
    surfaceAlt: "#1c1c1f",
    // Inverts the other way in a dark theme: the card lifts OFF the page.
    surfaceInverse: "#2a2a2e",
    hairline: "rgba(255,255,255,0.10)",
    shadowRgb: "0,0,0",
    accentOnMedia: "#9db0ff",
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
  accentText: "--sx-accent-text",
  onAccent: "--sx-on-accent",
  ink: "--sx-ink",
  ink2: "--sx-ink-2",
  ink3: "--sx-ink-3",
  onInk: "--sx-on-ink",
  bg: "--sx-bg",
  bgAlt: "--sx-bg-alt",
  surface: "--sx-surface",
  surfaceAlt: "--sx-surface-alt",
  surfaceInverse: "--sx-surface-inverse",
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
