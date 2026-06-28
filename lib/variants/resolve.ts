import type { DesignVariant, CopyVariant } from "./types";
import { DEFAULT_DESIGN, DEFAULT_COPY, coerceDesign, isCopyVariant } from "./constants";

export interface ResolvedVariants {
  design: DesignVariant;
  copy: CopyVariant;
  source: "url-override" | "default";
}

/**
 * Lightweight, SSR-safe variant resolution.
 *
 * Precedence today: `?variant=` / `?hero=` URL override (QA/preview only) -> default (control).
 *
 * Real PostHog flag assignment runs CLIENT-side in VariantProvider, so the server
 * HTML stays crawler-safe: Googlebot sends no cookie and no `?variant=`, so it
 * deterministically gets control (Google's sanctioned, no-cloaking A/B pattern).
 *
 * To graduate to no-flicker server-decided variants later, install `posthog-node`,
 * set a stable id cookie in proxy.ts (Next 16's middleware file), and insert a
 * flag-eval step here between the override and the default. The rest of the system
 * already consumes the result.
 */
export function resolveVariants(
  params: { variant?: string | string[]; hero?: string | string[] },
  opts: { allowOverride: boolean }
): ResolvedVariants {
  if (opts.allowOverride) {
    const rawDesign = Array.isArray(params.variant) ? params.variant[0] : params.variant;
    const rawCopy = Array.isArray(params.hero) ? params.hero[0] : params.hero;
    const design = coerceDesign(rawDesign);
    const copy = isCopyVariant(rawCopy) ? rawCopy : undefined;
    if (design || copy) {
      return {
        design: design ?? DEFAULT_DESIGN,
        copy: copy ?? DEFAULT_COPY,
        source: "url-override",
      };
    }
  }
  return { design: DEFAULT_DESIGN, copy: DEFAULT_COPY, source: "default" };
}
