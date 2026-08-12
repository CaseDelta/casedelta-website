/**
 * Sasonix design tokens, lifted verbatim from the live site
 * (https://sasonix.framer.website/) via Playwright computed-style extraction.
 * These are the ORIGINAL Sasonix values (orange accent, cream surfaces, Archivo/
 * Geist/JetBrains Mono/Inter). The whole point of tokenizing: the later CaseDelta
 * rebrand is a swap of the values in this one file, not a rewrite of components.
 *
 * Fonts resolve through the CSS variables set in app/v2/layout.tsx (self-hosted
 * via next/font). The `... Placeholder` fallbacks mirror Framer's own metric
 * fallbacks so layout does not shift before the webfont loads.
 */
export const SX = {
  // ---- type ----
  display: "var(--sx-archivo), 'Archivo Placeholder', sans-serif", // headings
  body: "var(--sx-geist), 'Geist Placeholder', sans-serif", // body + buttons
  mono: "var(--sx-mono), 'JetBrains Mono Placeholder', monospace", // eyebrow labels
  ui: "var(--sx-inter), 'Inter Placeholder', sans-serif", // small panel UI

  // ---- color ----
  // Every value resolves to a CSS custom property emitted by theme.ts, so the
  // whole palette hot-swaps from one object. Never write a colour literal in a
  // component: add a role in theme.ts and reference it here.
  //
  // Semantic names are preferred in new code. The legacy Sasonix names below
  // them (orange, cream) are kept so the existing components keep working, and
  // are aliases onto the same roles, not separate values.

  // semantic roles
  accent: "var(--sx-accent)",
  accentDeep: "var(--sx-accent-deep)",
  accentSoft: "var(--sx-accent-soft)",
  onAccent: "var(--sx-on-accent)",
  ink: "var(--sx-ink)", // primary text, also the dark button fill
  ink2: "var(--sx-ink-2)", // secondary text
  ink3: "var(--sx-ink-3)", // tertiary text, eyebrow labels
  onInk: "var(--sx-on-ink)", // text on the ink-filled (dark) button
  bg: "var(--sx-bg)",
  bgAlt: "var(--sx-bg-alt)",
  surface: "var(--sx-surface)",
  surfaceAlt: "var(--sx-surface-alt)",
  hairline: "var(--sx-hairline)",
  accentOnMedia: "var(--sx-accent-on-media)", // the accent, kept legible over media
  onMedia: "var(--sx-on-media)", // text over photography or video
  onMediaMuted: "var(--sx-on-media-muted)",
  glass: "var(--sx-glass)", // frosted panel over media
  glassEdge: "var(--sx-glass-edge)",

  // legacy Sasonix aliases (same roles, old names)
  orange: "var(--sx-accent)",
  orangeDeep: "var(--sx-accent-deep)",
  black: "var(--sx-ink)",
  white: "var(--sx-surface)",
  cream: "var(--sx-bg-alt)",
  cream2: "var(--sx-bg-alt)",
  card: "var(--sx-surface-alt)",

  /** Elevation shadow in the theme's shadow colour. `sh(y, blur, alpha)`. */
  sh: (y: number, blur: number, alpha: number) =>
    `0 ${y}px ${blur}px rgba(var(--sx-shadow-rgb), ${alpha})`,
} as const;

/* Sasonix's own resize-CDN images (hotlinked during the clone-fidelity phase so the
   pixel diff against the live site is exact). PRODUCTION MUST self-host / replace these
   with CaseDelta assets before launch. Base host: framerusercontent.com. */
export const SX_IMG = {
  heroBg: "https://framerusercontent.com/images/V7oDs94vlSH0C2glcaoq4KMBvX0.png?scale-down-to=2048&width=4320&height=2880",
  dashboard: "https://framerusercontent.com/images/sO9ymKFyoj2RVWKzD1vYrzxH6Ak.png?scale-down-to=1024&width=4000&height=1844",
  // The "Untitled Database" card is a composite: this frame PNG (white body + footer)
  // + live header text + code-line images. See Hero.tsx CodeCard.
  codeCard: "https://framerusercontent.com/images/RdMRa8CqEduerfrLwGjNqBmJFc.png?scale-down-to=512&width=1848&height=1200",
  codeWrapper: "https://framerusercontent.com/images/UPLaEWSkwDYI8CfWSgpUb7rIb4.png?scale-down-to=512&width=1752&height=653",
} as const;
