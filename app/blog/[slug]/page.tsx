import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { BreadcrumbSchema, BlogPostSchema } from "@/components/JsonLd";
import { FooterV2 } from "@/components/FooterV2";

/* ─── Constants ─── */

const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const ACCENT = "#2563EB";
const BORDER = "#EDEDED";
const BASE_URL = "https://casedelta.com";

/* ─── Static params ─── */

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/* ─── Metadata ─── */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
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

/* ─── Helpers ─── */

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 250));
}

/* ─── Page ─── */

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const readingTime = getReadingTime(content);

  return (
    <>
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

      <div
        style={{
          fontFamily: FONT,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Spacer for fixed navbar */}
        <div style={{ height: 80 }} />

        {/* Article header */}
        <header
          style={{
            maxWidth: 720,
            width: "100%",
            margin: "0 auto",
            padding: "64px clamp(24px, 4vw, 48px) 0",
          }}
        >
          {/* Back link */}
          <Link
            href="/blog"
            style={{
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 500,
              color: "#999",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              letterSpacing: "-0.01em",
              transition: "color 0.2s ease",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M10 4L6 8L10 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All posts
          </Link>

          {/* Tags */}
          {frontmatter.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 32,
              }}
            >
              {frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                  style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    fontWeight: 500,
                    color: ACCENT,
                    backgroundColor: `${ACCENT}08`,
                    padding: "3px 10px",
                    borderRadius: 100,
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontFamily: FONT,
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              margin: "20px 0 0",
            }}
          >
            {frontmatter.title}
          </h1>

          {/* Meta line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 20,
              paddingBottom: 32,
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 500,
                color: "#555",
                letterSpacing: "-0.01em",
              }}
            >
              {frontmatter.author}
            </span>
            <span style={{ color: "#DDD", fontSize: 14 }}>|</span>
            <time
              dateTime={frontmatter.date}
              style={{
                fontFamily: FONT,
                fontSize: 14,
                color: "#999",
                letterSpacing: "-0.01em",
              }}
            >
              {formatDate(frontmatter.date)}
            </time>
            <span style={{ color: "#DDD", fontSize: 14 }}>|</span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 14,
                color: "#999",
                letterSpacing: "-0.01em",
              }}
            >
              {readingTime} min read
            </span>
            {frontmatter.updatedAt && (
              <>
                <span style={{ color: "#DDD", fontSize: 14 }}>|</span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    color: "#999",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Updated {formatDate(frontmatter.updatedAt)}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Article body */}
        <article
          className="blog-prose"
          style={{
            maxWidth: 720,
            width: "100%",
            margin: "0 auto",
            padding: "40px clamp(24px, 4vw, 48px) 80px",
            flex: 1,
          }}
        >
          <MDXRemote source={content} />
        </article>

        {/* Bottom nav */}
        <div
          style={{
            maxWidth: 720,
            width: "100%",
            margin: "0 auto",
            padding: "0 clamp(24px, 4vw, 48px) 64px",
          }}
        >
          <div
            style={{
              borderTop: `1px solid ${BORDER}`,
              paddingTop: 32,
            }}
          >
            <Link
              href="/blog"
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 500,
                color: ACCENT,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                letterSpacing: "-0.01em",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>

        <FooterV2 />
      </div>

      {/* Article typography */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-prose {
              font-family: ${FONT};
              color: #1A1A1A;
              line-height: 1.75;
              letter-spacing: -0.01em;
            }

            .blog-prose h2 {
              font-size: 24px;
              font-weight: 650;
              color: #0A0A0A;
              letter-spacing: -0.03em;
              line-height: 1.3;
              margin: 48px 0 16px;
            }

            .blog-prose h3 {
              font-size: 20px;
              font-weight: 600;
              color: #0A0A0A;
              letter-spacing: -0.025em;
              line-height: 1.35;
              margin: 40px 0 12px;
            }

            .blog-prose h4 {
              font-size: 17px;
              font-weight: 600;
              color: #1A1A1A;
              letter-spacing: -0.02em;
              line-height: 1.4;
              margin: 32px 0 8px;
            }

            .blog-prose p {
              font-size: 16px;
              margin: 0 0 20px;
            }

            .blog-prose a {
              color: ${ACCENT};
              text-decoration: underline;
              text-decoration-color: ${ACCENT}40;
              text-underline-offset: 3px;
              transition: text-decoration-color 0.2s ease;
            }

            .blog-prose a:hover {
              text-decoration-color: ${ACCENT};
            }

            .blog-prose strong {
              font-weight: 600;
              color: #0A0A0A;
            }

            .blog-prose ul, .blog-prose ol {
              padding-left: 24px;
              margin: 0 0 20px;
            }

            .blog-prose li {
              font-size: 16px;
              margin-bottom: 8px;
            }

            .blog-prose li::marker {
              color: #CCC;
            }

            .blog-prose blockquote {
              border-left: 3px solid ${ACCENT};
              margin: 28px 0;
              padding: 16px 24px;
              background: #F9FAFB;
              border-radius: 0 8px 8px 0;
            }

            .blog-prose blockquote p {
              color: #555;
              font-style: italic;
              margin: 0;
            }

            .blog-prose code {
              font-family: "SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace;
              font-size: 14px;
              background: #F4F4F5;
              padding: 2px 6px;
              border-radius: 4px;
              color: #1A1A1A;
            }

            .blog-prose pre {
              background: #1A1A1A;
              color: #E5E5E5;
              border-radius: 8px;
              padding: 20px 24px;
              overflow-x: auto;
              margin: 24px 0;
              font-size: 14px;
              line-height: 1.6;
            }

            .blog-prose pre code {
              background: transparent;
              padding: 0;
              border-radius: 0;
              color: inherit;
              font-size: inherit;
            }

            .blog-prose hr {
              border: none;
              border-top: 1px solid ${BORDER};
              margin: 40px 0;
            }

            .blog-prose img {
              max-width: 100%;
              border-radius: 8px;
              margin: 24px 0;
            }

            .blog-prose table {
              width: 100%;
              border-collapse: collapse;
              margin: 24px 0;
              font-size: 15px;
            }

            .blog-prose th {
              text-align: left;
              font-weight: 600;
              color: #0A0A0A;
              padding: 10px 16px;
              border-bottom: 2px solid ${BORDER};
            }

            .blog-prose td {
              padding: 10px 16px;
              border-bottom: 1px solid ${BORDER};
              color: #555;
            }

            /* Back link hover */
            header a:hover {
              color: #555 !important;
            }
          `,
        }}
      />
    </>
  );
}
