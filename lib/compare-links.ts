/**
 * The comparison pages as links: slug and footer label, DERIVED from lib/compare.ts
 * so a new comparison page reaches the footer, the sitemap and the redirect
 * exclusion in next.config.ts without anyone retyping its slug.
 *
 * Relative imports only (compare.ts -> pricing.ts), so next.config.ts can import it.
 */
import { COMPETITORS } from "./compare";

/** Where "CaseDelta vs <name>" reads wrong as a footer label. */
const LABEL: Record<string, string> = { "casedelta-vs-general-ai": "CaseDelta vs general AI" };

export const COMPARE_LINKS: { slug: string; label: string }[] = COMPETITORS.map((c) => ({
  slug: c.slug,
  label: LABEL[c.slug] ?? `CaseDelta vs ${c.name}`,
}));
