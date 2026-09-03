import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { PageShell } from "@/components/v2/sasonix/PageShell";
import { PageHero, Container } from "@/components/v2/sasonix/kit";
import { BlogStyles, PostGrid, TagPill } from "@/components/blog/parts";

const BASE_URL = "https://casedelta.com";

export const metadata: Metadata = {
  title: "Blog: Legal AI Insights for Plaintiff Firms",
  description:
    "Insights on horizontal AI for law firms, plaintiff workflows, and how CaseDelta runs across the tools your firm already uses. Written by the CaseDelta team.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Blog: Legal AI Insights for Plaintiff Firms",
    description:
      "Insights on horizontal AI for law firms, plaintiff workflows, and how CaseDelta runs across the tools your firm already uses.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
};

/**
 * ISR, because posts are published straight into Postgres by the blog_writer agent
 * with no code push. 600s is the ceiling on how stale the index can be; a publish
 * calls POST /api/revalidate to make it immediate.
 */
export const revalidate = 600;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <PageShell>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
        ]}
      />
      <PageHero
        eyebrow="Blog"
        title="Notes on running a firm with an AI teammate"
        sub="Horizontal AI for law firms, plaintiff workflows, and the tools your firm already uses."
      >
        {tags.length > 0 && (
          <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </nav>
        )}
      </PageHero>

      <section style={{ padding: "40px 0 100px" }}>
        <Container>
          <PostGrid posts={posts} empty="No posts yet. Check back soon." />
        </Container>
      </section>

      <BlogStyles />
    </PageShell>
  );
}
