"use client";

/**
 * The pieces the three blog surfaces share: the index, a tag listing, and a post.
 *
 * They used to each carry their own copy of the card, the tag pill and the date
 * formatter, in their own Inter-and-#2563EB styling that matched nothing else on the
 * site. One file, on the palette, so a change to a card is one change.
 *
 * formatDate and readingTime live in lib/blog-format.ts rather than here, because the
 * post page is a server component and calls them directly. A plain function exported
 * from a "use client" module cannot be called from the server.
 */
import Link from "next/link";
import { SX } from "@/components/v2/sasonix/tokens";
import { formatDate } from "@/lib/blog-format";
import type { Post } from "@/lib/blog";

export function TagPill({ tag, small = false }: { tag: string; small?: boolean }) {
  return (
    <Link
      href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
      className="sx-tag"
      style={{
        fontFamily: SX.body,
        fontSize: small ? 12 : 13,
        fontWeight: 500,
        color: SX.accentText,
        background: SX.accentSoft,
        padding: small ? "3px 10px" : "6px 14px",
        borderRadius: 100,
        textDecoration: "none",
      }}
    >
      {tag}
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post;
  return (
    <article style={{ height: "100%" }}>
      <Link
        href={`/blog/${slug}`}
        className="sx-post-card"
        style={{
          display: "block",
          height: "100%",
          padding: 28,
          borderRadius: 16,
          border: `1px solid ${SX.hairline}`,
          background: SX.surface,
          textDecoration: "none",
        }}
      >
        <time dateTime={frontmatter.date} style={{ display: "block", fontFamily: SX.body, fontSize: 13, color: SX.ink3 }}>
          {formatDate(frontmatter.date)}
        </time>
        <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 22, lineHeight: 1.28, letterSpacing: "-0.5px", color: SX.ink, margin: "12px 0 0" }}>
          {frontmatter.title}
        </h2>
        <p style={{ fontFamily: SX.body, fontSize: 15.5, lineHeight: "25px", color: SX.ink2, margin: "10px 0 0" }}>
          {frontmatter.description}
        </p>
        {frontmatter.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 18 }}>
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                style={{ fontFamily: SX.body, fontSize: 12, fontWeight: 500, color: SX.accentText, background: SX.accentSoft, padding: "3px 10px", borderRadius: 100 }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}

/**
 * The grid, and the empty state. The blog is auto-published by an agent, so an
 * empty index is a real state to render rather than an impossible one.
 */
export function PostGrid({ posts, empty }: { posts: Post[]; empty: string }) {
  if (posts.length === 0) {
    return (
      <p style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink3, textAlign: "center", padding: "80px 0" }}>
        {empty}
      </p>
    );
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 24 }}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

export function BlogStyles() {
  return (
    <style>{`
      .sx-post-card { transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease; }
      .sx-post-card:hover {
        border-color: ${SX.accent};
        box-shadow: 0 18px 40px -26px rgba(var(--sx-shadow-rgb), 0.30);
        transform: translateY(-2px);
      }
      .sx-tag { transition: filter 0.2s ease; }
      .sx-tag:hover { filter: brightness(0.94); }
      .sx-back { transition: color 0.2s ease; }
      .sx-back:hover { color: ${SX.ink} !important; }
      @media (prefers-reduced-motion: reduce) {
        .sx-post-card, .sx-post-card:hover { transition: none; transform: none; }
      }
    `}</style>
  );
}
