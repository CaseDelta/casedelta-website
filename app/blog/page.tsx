import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { FooterV2 } from "@/components/FooterV2";

/* ─── Constants ─── */

const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const ACCENT = "#2563EB";
const BORDER = "#EDEDED";
const BASE_URL = "https://casedelta.com";

/* ─── Metadata ─── */

export const metadata: Metadata = {
  title: "Blog — Legal AI Insights for Plaintiff Firms",
  description:
    "Insights on horizontal AI for law firms, plaintiff workflows, and how CaseDelta runs across the tools your firm already uses. Written by the CaseDelta team.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Blog — Legal AI Insights for Plaintiff Firms",
    description:
      "Insights on horizontal AI for law firms, plaintiff workflows, and how CaseDelta runs across the tools your firm already uses.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
};

/* ─── Helpers ─── */

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ─── Page ─── */

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
        ]}
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

        {/* Header */}
        <header
          style={{
            maxWidth: 1320,
            width: "100%",
            margin: "0 auto",
            padding: "64px clamp(24px, 4vw, 48px) 0",
          }}
        >
          <h1
            style={{
              fontFamily: FONT,
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Blog
          </h1>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 18,
              color: "#666",
              lineHeight: 1.6,
              marginTop: 16,
              maxWidth: 560,
              letterSpacing: "-0.01em",
            }}
          >
            Notes on horizontal AI for law firms, plaintiff workflows, and the
            tools your firm already uses.
          </p>
        </header>

        {/* Tags */}
        {tags.length > 0 && (
          <nav
            style={{
              maxWidth: 1320,
              width: "100%",
              margin: "0 auto",
              padding: "32px clamp(24px, 4vw, 48px) 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#666",
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: 100,
                    border: `1px solid ${BORDER}`,
                    letterSpacing: "-0.01em",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </nav>
        )}

        {/* Posts */}
        <main
          style={{
            maxWidth: 1320,
            width: "100%",
            margin: "0 auto",
            padding: "48px clamp(24px, 4vw, 48px)",
            flex: 1,
          }}
        >
          {posts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
              }}
            >
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  color: "#999",
                  letterSpacing: "-0.01em",
                }}
              >
                No posts yet. Check back soon.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
                gap: 32,
              }}
            >
              {posts.map((post) => (
                <article key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      textDecoration: "none",
                      display: "block",
                      padding: 28,
                      borderRadius: 12,
                      border: `1px solid ${BORDER}`,
                      transition: "all 0.25s ease",
                      height: "100%",
                    }}
                  >
                    {/* Date */}
                    <time
                      dateTime={post.frontmatter.date}
                      style={{
                        fontFamily: FONT,
                        fontSize: 13,
                        color: "#999",
                        letterSpacing: "-0.01em",
                        display: "block",
                      }}
                    >
                      {formatDate(post.frontmatter.date)}
                    </time>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: FONT,
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#0A0A0A",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.35,
                        margin: "12px 0 0",
                      }}
                    >
                      {post.frontmatter.title}
                    </h2>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: FONT,
                        fontSize: 15,
                        color: "#666",
                        lineHeight: 1.55,
                        margin: "10px 0 0",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {post.frontmatter.description}
                    </p>

                    {/* Tags */}
                    {post.frontmatter.tags.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                          marginTop: 16,
                        }}
                      >
                        {post.frontmatter.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: FONT,
                              fontSize: 12,
                              fontWeight: 500,
                              color: ACCENT,
                              backgroundColor: `${ACCENT}08`,
                              padding: "3px 10px",
                              borderRadius: 100,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </main>

        <FooterV2 />
      </div>

      {/* Hover styles for post cards */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            article a:hover {
              border-color: #D0D0D0 !important;
              box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04) !important;
            }
            nav a:hover {
              color: ${ACCENT} !important;
              border-color: ${ACCENT}30 !important;
              background-color: ${ACCENT}06 !important;
            }
          `,
        }}
      />
    </>
  );
}
