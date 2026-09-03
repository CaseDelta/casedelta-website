import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { BreadcrumbSchema, BlogPostSchema } from "@/components/JsonLd";
import { SX } from "@/components/v2/sasonix/tokens";
import { PageShell } from "@/components/v2/sasonix/PageShell";
import { Container, Prose } from "@/components/v2/sasonix/kit";
import { BlogStyles, TagPill } from "@/components/blog/parts";
import { formatDate, readingTime } from "@/lib/blog-format";

const BASE_URL = "https://casedelta.com";

/** ISR: posts are published into Postgres by an agent, with no code push. */
export const revalidate = 600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: frontmatter.date,
      ...(frontmatter.updatedAt && { modifiedTime: frontmatter.updatedAt }),
      authors: [frontmatter.author],
      ...(frontmatter.image && {
        images: [
          {
            url: frontmatter.image.startsWith("http")
              ? frontmatter.image
              : `${BASE_URL}${frontmatter.image}`,
            width: 1200,
            height: 630,
            alt: frontmatter.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}

/** The meta line's separators. A span rather than a character in the text so a
 *  screen reader does not read "pipe" between the author and the date. */
function Dot() {
  return <span aria-hidden style={{ color: SX.hairline, fontSize: 14 }}>|</span>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const minutes = readingTime(content);
  const metaStyle = { fontFamily: SX.body, fontSize: 14, color: SX.ink3 } as const;

  return (
    <PageShell>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: frontmatter.title, url: `${BASE_URL}/blog/${slug}` },
        ]}
      />
      <BlogPostSchema
        title={frontmatter.title}
        description={frontmatter.description}
        slug={slug}
        publishedAt={frontmatter.date}
        updatedAt={frontmatter.updatedAt}
        authorName={frontmatter.author}
        authorSlug={frontmatter.authorSlug}
        image={frontmatter.image}
      />

      <article style={{ padding: "148px 0 100px" }}>
        <Container>
          <header style={{ maxWidth: 720, margin: "0 auto" }}>
            <Link
              href="/blog"
              className="sx-back"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: SX.body, fontSize: 14, fontWeight: 500, color: SX.ink3, textDecoration: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden style={{ flexShrink: 0 }}>
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All posts
            </Link>

            {frontmatter.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 30 }}>
                {frontmatter.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} small />
                ))}
              </div>
            )}

            <h1
              className="sx-post-title"
              style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 42, lineHeight: "50px", letterSpacing: "-1.1px", color: SX.ink, margin: "20px 0 0" }}
            >
              {frontmatter.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, margin: "20px 0 0", paddingBottom: 32, borderBottom: `1px solid ${SX.hairline}` }}>
              <span style={{ ...metaStyle, color: SX.ink2, fontWeight: 500 }}>{frontmatter.author}</span>
              <Dot />
              <time dateTime={frontmatter.date} style={metaStyle}>{formatDate(frontmatter.date)}</time>
              <Dot />
              <span style={metaStyle}>{minutes} min read</span>
              {frontmatter.updatedAt && (
                <>
                  <Dot />
                  <span style={metaStyle}>Updated {formatDate(frontmatter.updatedAt)}</span>
                </>
              )}
            </div>
          </header>

          {/* MDXRemote is a server component passed as children to Prose, a client
              component, so the markdown is still rendered on the server. */}
          <Prose style={{ marginTop: 40 }}>
            <MDXRemote source={content} />
          </Prose>

          <div style={{ maxWidth: 720, margin: "64px auto 0", paddingTop: 32, borderTop: `1px solid ${SX.hairline}` }}>
            <Link
              href="/blog"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: SX.body, fontSize: 15, fontWeight: 500, color: SX.accentText, textDecoration: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden style={{ flexShrink: 0 }}>
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </Container>
      </article>

      <BlogStyles />
      <style>{`
        @media (max-width: 760px) {
          .sx-post-title { font-size: 32px !important; line-height: 39px !important; }
        }
      `}</style>
    </PageShell>
  );
}
