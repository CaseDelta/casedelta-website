/* Shared design tokens for the VSL.
 *
 * The video uses the locked Dream design language (cream + multi-blue auras +
 * Open Sauce Sans). These tokens are the source of truth for every scene that
 * follows after Dream — Solution, Demo, Use Cases, Outro all import from here.
 */

export const FONT =
  'var(--font-open-sauce), "Open Sauce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const FONT_MONO = '"SF Mono", ui-monospace, Menlo, monospace';

/* Surface */
export const BG_CREAM = "#FAFAFA";
export const SURFACE_RAISED = "#F5F6F8";

/* Text */
export const TEXT_PRIMARY = "#0F1729";
export const TEXT_SECONDARY = "#64748B";
export const TEXT_TERTIARY = "#94A3B8";

/* Multi-blue palette */
export const BLUE_DEEP = "#1D4ED8";
export const BLUE = "#2563EB";
export const BLUE_LIGHT = "#60A5FA";
export const BLUE_FAINT = "#93C5FD";
export const BLUE_PALE = "#BFDBFE";
export const BLUE_TINT = "#EFF4FF";
export const INDIGO = "#818CF8";

/* Practice-area accents (Use Cases scene) */
export const AMBER_DEEP = "#D97706";
export const AMBER = "#F59E0B";
export const AMBER_LIGHT = "#FCD34D";
export const EMERALD_DEEP = "#047857";
export const EMERALD = "#10B981";
export const EMERALD_LIGHT = "#6EE7B7";
export const VIOLET_DEEP = "#6D28D9";
export const VIOLET = "#8B5CF6";
export const VIOLET_LIGHT = "#C4B5FD";

/* State */
export const SUCCESS_GREEN = "#10B981";
export const SUCCESS_GREEN_TINT = "#ECFDF5";
export const SUCCESS_GREEN_BORDER = "#A7F3D0";

export const BORDER = "#E5E7EB";
export const BORDER_BLUE = "rgba(37,99,235,0.20)";
export const BORDER_BLUE_FAINT = "rgba(37,99,235,0.10)";

/* Easing */
export const SWEEP_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const SOFT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/* Glass surface — used for every elevated card across the VSL */
export const GLASS_BG =
  "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.80) 100%)";
export const GLASS_BORDER = BORDER_BLUE;
export const GLASS_SHADOW =
  "0 18px 50px rgba(37,99,235,0.18), 0 0 0 1px rgba(37,99,235,0.06), 0 4px 14px rgba(15,23,41,0.06)";
export const GLASS_SHADOW_SM =
  "0 10px 28px rgba(37,99,235,0.14), 0 0 0 1px rgba(37,99,235,0.05), 0 2px 8px rgba(15,23,41,0.04)";
