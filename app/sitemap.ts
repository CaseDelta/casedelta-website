import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { PRICING_UPDATED } from "@/lib/pricing";
import { SECURITY_UPDATED } from "@/lib/security";
import { INTEGRATIONS_CHECKED, PAGE_PLATFORMS } from "@/lib/integrations";
import { COMPARE_LINKS } from "@/lib/compare-links";
import { COMPARE_UPDATED, competitor } from "@/lib/compare";
import { ANSWERS_UPDATED } from "@/lib/answers";

/** The homepage's last content change (the redesign). Bump it when the home copy changes. */
const HOME_UPDATED = "2026-09-25";
/** The dates printed on the legal pages themselves. */
const PRIVACY_UPDATED = "2026-05-06";
const TERMS_UPDATED = "2026-03-25";

const BASE_URL = "https://casedelta.com";

/**
 * The sitemap lists every page that still exists and is indexable.
 *
 * It used to carry /features, /pricing, /security, /use-cases (index + four practice
 * areas) and /compare (index + six competitors). Those pages were folded into the
 * homepage on 2026-09-02 and now 308 to its sections. A redirecting URL in a sitemap
 * is a soft error in Search Console, so they are gone rather than pointed at "/".
 *
 * /demo is deliberately absent: its own metadata sets robots noindex, because it is a
 * booking form rather than a page anyone should arrive at from a search. So are /setup,
 * /install.sh, /install.ps1 and /outreach-kit.zip, which are internal rep-onboarding
 * routes on a public domain.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const d = (iso: string) => new Date(`${iso}T12:00:00Z`);
  // Real dates only: each page's lastmod is the date its data file says it changed.
  const newestPost = posts.map((p) => p.frontmatter.updatedAt ?? p.frontmatter.date).sort().at(-1) ?? HOME_UPDATED;

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: d(HOME_UPDATED), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: d(newestPost), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: d(PRICING_UPDATED), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/security`, lastModified: d(SECURITY_UPDATED), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/integrations`, lastModified: d(INTEGRATIONS_CHECKED), changeFrequency: "monthly", priority: 0.9 },
    ...PAGE_PLATFORMS.map((p) => ({ url: `${BASE_URL}/integrations/${p.slug}`, lastModified: d(INTEGRATIONS_CHECKED), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${BASE_URL}/compare`, lastModified: d(COMPARE_UPDATED), changeFrequency: "monthly" as const, priority: 0.6 },
    // Derived from lib/compare.ts via lib/compare-links.ts.
    ...COMPARE_LINKS.map((c) => ({ url: `${BASE_URL}/compare/${c.slug}`, lastModified: d(competitor(c.slug)?.checkedAt ?? COMPARE_UPDATED), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${BASE_URL}/answers`, lastModified: d(ANSWERS_UPDATED), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: d(PRIVACY_UPDATED), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: d(TERMS_UPDATED), changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: d(post.frontmatter.updatedAt ?? post.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
