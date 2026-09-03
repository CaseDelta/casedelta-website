import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { SX } from "@/components/v2/sasonix/tokens";
import { PageShell } from "@/components/v2/sasonix/PageShell";
import { PageHero, Container } from "@/components/v2/sasonix/kit";
import { BlogStyles, PostGrid } from "@/components/blog/parts";

const BASE_URL = "https://casedelta.com";

export const revalidate = 600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag.toLowerCase()) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  return {
    title: `${label} posts`,
    description: `CaseDelta posts tagged ${label}. Insights on horizontal AI for law firms and the plaintiff workflows it runs.`,
    alternates: { canonical: `${BASE_URL}/blog/tag/${tag}` },
    openGraph: {
      title: `${label} posts`,
      description: `CaseDelta posts tagged ${label}.`,
      url: `${BASE_URL}/blog/tag/${tag}`,
      type: "website",
    },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { tag } = await params;
  const label = decodeURIComponent(tag);
  const posts = await getPostsByTag(label);

  // A tag with no posts is a dead URL, not an empty page. 404 so it leaves the index
  // rather than sitting in search results as a page with nothing on it.
  if (posts.length === 0) notFound();

  return (
    <PageShell>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: label, url: `${BASE_URL}/blog/tag/${tag}` },
        ]}
      />
      <PageHero
        eyebrow="Blog"
        title={`Posts tagged ${label}`}
        sub={`${posts.length} ${posts.length === 1 ? "post" : "posts"} on this topic.`}
      >
        <Link
          href="/blog"
          className="sx-back"
          style={{ marginTop: 26, fontFamily: SX.body, fontSize: 15, fontWeight: 500, color: SX.ink3, textDecoration: "none" }}
        >
          All posts
        </Link>
      </PageHero>

      <section style={{ padding: "40px 0 100px" }}>
        <Container>
          <PostGrid posts={posts} empty="No posts with this tag yet." />
        </Container>
      </section>

      <BlogStyles />
    </PageShell>
  );
}
