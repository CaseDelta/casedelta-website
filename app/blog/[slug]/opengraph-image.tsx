import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CaseDelta Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

/**
 * Derive a human-readable title from the URL slug.
 * Edge runtime cannot use Node.js fs/path, so we format the slug
 * instead of reading the MDX file. The actual <title> and OG title
 * meta tags come from generateMetadata in the page, which runs in
 * the Node.js runtime and reads the real frontmatter.
 */
function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function OGImage({ params }: RouteProps) {
  const { slug } = await params;
  const title = formatSlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0A0A0A",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top: Logo wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
            }}
          >
            Case
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#2563EB",
              letterSpacing: "-0.03em",
            }}
          >
            Delta
          </span>
        </div>

        {/* Middle: Post title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Blue accent bar */}
          <div
            style={{
              width: 48,
              height: 4,
              backgroundColor: "#2563EB",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: title.length > 60 ? 38 : 46,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: URL */}
        <div
          style={{
            fontSize: 18,
            color: "#666666",
            letterSpacing: "-0.01em",
          }}
        >
          casedelta.com/blog
        </div>
      </div>
    ),
    { ...size }
  );
}
