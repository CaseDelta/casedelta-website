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

  // ---- color (exact) ----
  orange: "#ff7029", // rgb(255,112,41) primary accent
  orangeDeep: "#ff6c02", // rgb(255,108,2)
  ink: "#120a04", // rgb(18,10,4) near-black brown (also the dark button bg)
  ink2: "#5c4c3f", // rgb(92,76,63) secondary text
  black: "#020202",
  white: "#ffffff",
  cream: "#fcf8f4", // rgb(252,248,244) page cream
  cream2: "#f8f3ec", // rgb(248,243,236) deeper cream / eyebrow pill bg
  card: "#fefaf6", // rgb(254,250,246) feature-card surface
  hairline: "rgba(44,24,11,0.10)",
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
