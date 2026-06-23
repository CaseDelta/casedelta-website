import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllComparisonSlugs } from "@/lib/comparisons";
import { getAllUseCaseSlugs } from "@/lib/use-cases";

const BASE_URL = "https://casedelta.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPosts();

  // Static marketing pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/features`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/answers`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Use-case pages (litigation practice areas) — derived from the source of truth
  const useCaseSlugs = getAllUseCaseSlugs();
  const useCasePages: MetadataRoute.Sitemap = useCaseSlugs.map((slug) => ({
    url: `${BASE_URL}/use-cases/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Use-cases index
  const useCasesIndex: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/use-cases`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Comparison pages (index + per-competitor)
  const compareIndex: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
  const comparePages: MetadataRoute.Sitemap = getAllComparisonSlugs().map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts (dynamic from MDX files)
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.frontmatter.updatedAt ? new Date(post.frontmatter.updatedAt) : new Date(post.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...useCasesIndex, ...useCasePages, ...compareIndex, ...comparePages, ...blogPages];
}
