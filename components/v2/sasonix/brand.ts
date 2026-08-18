/**
 * The CaseDelta brand marks.
 *
 * One place, because the nav and the footer have to agree and because the logo
 * comes in two cuts that must stay interchangeable. Both files are the same
 * artwork at the same 1860x567, so swapping between them never moves layout:
 * only the ink changes. The blue swoosh is present in BOTH cuts and is the same
 * #5170FF that theme.ts uses as `accent`, which is where the brand colour was
 * sampled from in the first place.
 *
 * Pick by what is BEHIND the logo, not by the page's theme:
 *   onDark  -> over photography, a dark band, or the transparent nav on the hero
 *   onLight -> over white or any tinted surface, including the scrolled nav
 *
 * These are the trimmed cuts (1860x567), not casedelta-logo-full.png (2307x567),
 * which carries extra side padding meant for a standalone lockup. Trimmed keeps
 * the optical left edge flush with the nav's other content.
 */
export const LOGO = {
  onLight: "/assets/branding/trimmed-logo.png",
  onDark: "/assets/branding/trimmed-logo-white.png",
  /** Intrinsic size of both cuts. Width for a given height is height * RATIO. */
  width: 1860,
  height: 567,
} as const;

/** 3.28. Multiply a rendered height by this to get the matching width. */
export const LOGO_RATIO = LOGO.width / LOGO.height;

/** Rendered width for a target height, rounded to a whole pixel. */
export const logoWidth = (height: number) => Math.round(height * LOGO_RATIO);
