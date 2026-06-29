/**
 * Flag keys, defaults, and type guards. Kept separate from index.ts so the
 * server-only resolver and the client provider can both import without a cycle.
 *
 * The flag keys and the "control"-first variant order are the forward-compat
 * contract that lets these raw multivariate flags graduate into a PostHog
 * Experiment with no rebuild (see posthog_split_testing.md).
 */
import type { DesignVariant, CopyVariant } from "./types";

export const DESIGN_FLAG = "design-variant" as const;
export const COPY_FLAG = "hero-copy" as const;

export const DESIGN_VARIANTS: readonly DesignVariant[] = [
  "control",
  "harvey-dark",
  "legora",
] as const;
export const COPY_VARIANTS: readonly CopyVariant[] = [
  "control",
  "teammate",
  "problem",
] as const;

// Primary look served when no flag/override is present (i.e. everyone, pre-split-test).
// "control" === harvey-light, "harvey-dark" === the dark variant. Set to harvey-dark
// per the current direction; the PostHog flag keeps "control" first for experiments.
export const DEFAULT_DESIGN: DesignVariant = "harvey-dark";
export const DEFAULT_COPY: CopyVariant = "control";

export function isDesignVariant(v: unknown): v is DesignVariant {
  return typeof v === "string" && (DESIGN_VARIANTS as readonly string[]).includes(v);
}
export function isCopyVariant(v: unknown): v is CopyVariant {
  return typeof v === "string" && (COPY_VARIANTS as readonly string[]).includes(v);
}

/** QA convenience: accept human-readable design names as aliases for the flag keys. */
const DESIGN_ALIASES: Record<string, DesignVariant> = {
  "harvey-light": "control",
  light: "control",
  dark: "harvey-dark",
};
export function coerceDesign(v: unknown): DesignVariant | undefined {
  if (isDesignVariant(v)) return v;
  if (typeof v === "string" && DESIGN_ALIASES[v]) return DESIGN_ALIASES[v];
  return undefined;
}
