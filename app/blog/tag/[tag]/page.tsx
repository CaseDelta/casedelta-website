import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { FooterV2 } from "@/components/FooterV2";

/* ─── Constants ─── */

const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const ACCENT = "#2563EB";
const BORDER = "#EDEDED";
const BASE_URL = "https://casedelta.com";

/* ─── Static params ─── */

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.toLowerCase() }));
}

/* ─── Metadata ─── */

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const displayTag = decodeURIComponent(tag);
  const capitalized = displayTag.charAt(0).toUpperCase() + displayTag.slice(1);

  return {
    title: `${capitalized} — Blog`,
    description: `Articles about ${displayTag} from the CaseDelta team. Insights on legal AI, practice management, and building smarter law firms.`,
    alternates: {
      canonical: `${BASE_URL}/blog/tag/${tag}`,
    },
  };
}

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

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const displayTag = decodeURIComponent(tag);
  const capitalized = displayTag.charAt(0).toUpperCase() + displayTag.slice(1);
  const posts = getPostsByTag(displayTag);
  const allTags = getAllTags();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: capitalized, url: `${BASE_URL}/blog/tag/${tag}` },
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

          <h1
            style={{
              fontFamily: FONT,
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              margin: "24px 0 0",
            }}
          >
            {capitalized}
          </h1>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 18,
              color: "#666",
              lineHeight: 1.6,
              marginTop: 12,
              letterSpacing: "-0.01em",
            }}
          >
            {posts.length} {posts.length === 1 ? "post" : "posts"} tagged with{" "}
            <span style={{ color: ACCENT, fontWeight: 500 }}>{displayTag}</span>
          </p>
        </header>

        {/* Other tags */}
        {allTags.length > 1 && (
          <nav
            style={{
              maxWidth: 1320,
              width: "100%",
              margin: "0 auto",
              padding: "28px clamp(24px, 4vw, 48px) 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {allTags.map((t) => {
                const isActive = t.toLowerCase() === displayTag.toLowerCase();
                return (
                  <Link
                    key={t}
                    href={
                      isActive
                        ? "/blog"
                        : `/blog/tag/${encodeURIComponent(t.toLowerCase())}`
                    }
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      fontWeight: 500,
                      color: isActive ? "#FFF" : "#666",
                      backgroundColor: isActive ? ACCENT : "transparent",
                      textDecoration: "none",
                      padding: "6px 14px",
                      borderRadius: 100,
                      border: `1px solid ${isActive ? ACCENT : BORDER}`,
                      letterSpacing: "-0.01em",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {t}
                  </Link>
                );
              })}
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
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  color: "#999",
                  letterSpacing: "-0.01em",
                }}
              >
                No posts with this tag yet.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
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
                        {post.frontmatter.tags.map((tagName) => (
                          <span
                            key={tagName}
                            style={{
                              fontFamily: FONT,
                              fontSize: 12,
                              fontWeight: 500,
                              color:
                                tagName.toLowerCase() ===
                                displayTag.toLowerCase()
                                  ? "#FFF"
                                  : ACCENT,
                              backgroundColor:
                                tagName.toLowerCase() ===
                                displayTag.toLowerCase()
                                  ? ACCENT
                                  : `${ACCENT}08`,
                              padding: "3px 10px",
                              borderRadius: 100,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {tagName}
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

      {/* Hover styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            article a:hover {
              border-color: #D0D0D0 !important;
              box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04) !important;
            }
            header a:hover {
              color: #555 !important;
            }
            nav a:not([style*="background-color: ${ACCENT}"]):hover {
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
