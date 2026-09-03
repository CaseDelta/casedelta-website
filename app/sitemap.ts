import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

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
  const now = new Date();
  const posts = await getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/answers`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.frontmatter.updatedAt
      ? new Date(post.frontmatter.updatedAt)
      : new Date(post.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
