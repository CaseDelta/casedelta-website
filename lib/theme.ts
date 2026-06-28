/**
 * CaseDelta marketing design tokens — "harvey-light" direction.
 * Light bone canvas, deep-blue accent, Newsreader serif display + Hanken Grotesk body.
 * Shared by the rebuilt marketing pages (navbar, hero, sections, footer).
 * Fonts are loaded via next/font in app/layout.tsx and exposed as CSS variables.
 */

// ---- canvas + surfaces ----
export const CANVAS = "#F6F3EE"; // warm bone page background
export const CARD = "#FBF9F5"; // lifted card surface
export const CARD_HOVER = "#FFFFFF";

// ---- text ----
export const INK = "#14171F"; // primary text
export const MUTED = "#5B5650"; // secondary text
export const FAINT = "#8A857D"; // labels, logo wall, captions

// ---- lines ----
export const HAIRLINE = "rgba(20, 23, 31, 0.10)";
export const HAIRLINE_STRONG = "rgba(20, 23, 31, 0.16)";

// ---- accent (deep blue on light) ----
export const ACCENT = "#2F6FE0"; // primary blue, italic accent word + links
export const ACCENT_DEEP = "#1F3A5F"; // deep stop, the pill button
export const ACCENT_SOFT = "rgba(47, 111, 224, 0.10)";

// ---- type ----
export const SANS = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
export const SERIF = "var(--font-newsreader), Georgia, 'Times New Roman', serif";

// ---- layout grid (matches the global navbar/footer container) ----
export const MAXW = 1320;
export const PAGE_PAD = "clamp(24px, 4vw, 48px)";

// ---- motion (framer-motion springs, repo idiom) ----
export const SPRING = { type: "spring" as const, stiffness: 500, damping: 30 };
