"use client";

/**
 * Shared primitives for the Sasonix clone, matching the live site's measured values.
 *   Container: max-width 1360, 40px gutters (content 1280, x=80 at 1440).
 *   Eyebrow: JetBrains Mono label in a cream pill with a left orange rule.
 *   SectionHead: centered eyebrow + Archivo 48px heading + Geist sub.
 */
import { SX } from "./tokens";

export function Container({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 40px", ...style }}>{children}</div>;
}

/* Mono eyebrow pill: cream bg + 3px orange left rule + JetBrains Mono, per the live. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", background: SX.bgAlt, borderLeft: `3px solid ${SX.accent}`, padding: "10px 20px", fontFamily: SX.mono, fontSize: 16, letterSpacing: "-1px", lineHeight: "25.6px", color: SX.ink }}>
      {children}
    </span>
  );
}

/* Centered section header: optional eyebrow -> Archivo 500 48px / -1px / lh55.2 heading -> Geist sub.
   The eyebrow is OPTIONAL and the homepage passes none. Its 24px top margin on the
   heading exists only to clear the pill, so with no eyebrow the heading starts the
   block and takes margin 0; leaving the 24px in would open a gap under nothing. */
export function SectionHead({ eyebrow, title, sub, titleMaxW = 640, subMaxW = 560 }: { eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode; titleMaxW?: number; subMaxW?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: eyebrow ? "24px 0 0" : 0, maxWidth: titleMaxW }}>
        {title}
      </h2>
      {sub && (
        <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "18px 0 0", maxWidth: subMaxW }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/**
 * The standard header for a page that is not the homepage: eyebrow pill, then an
 * Archivo display heading, then an optional sub. Centered, in a narrow measure.
 *
 * The top padding clears the fixed nav (67px) with room to breathe. It is on the
 * SECTION rather than on the page, so a page can put something else above the hero
 * without inheriting a gap it did not ask for.
 *
 * The heading is an h1 and takes the page's only one. Every section heading below
 * it is an h2 via SectionHead, so the document outline stays legal.
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  maxWidth = 780,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  children?: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <section style={{ background: SX.bg, padding: "148px 0 60px" }}>
      <Container>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1
            className="sx-page-title"
            style={{
              fontFamily: SX.display,
              fontWeight: 500,
              fontSize: 54,
              lineHeight: "60px",
              letterSpacing: "-1.4px",
              color: SX.ink,
              margin: eyebrow ? "24px 0 0" : 0,
              maxWidth,
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
          {sub && (
            <p
              style={{
                fontFamily: SX.body,
                fontWeight: 400,
                fontSize: 18,
                lineHeight: "30px",
                color: SX.ink2,
                margin: "20px 0 0",
                maxWidth: 620,
              }}
            >
              {sub}
            </p>
          )}
          {children}
        </div>
      </Container>
      <style>{`
        @media (max-width: 760px) {
          .sx-page-title { font-size: 40px !important; line-height: 46px !important; }
        }
      `}</style>
    </section>
  );
}

/**
 * Long-form body copy: legal pages, blog posts, anything that is paragraphs rather
 * than a layout. One place so the reading measure, the type scale and the heading
 * rhythm are the same wherever prose appears.
 *
 * Styled by element rather than by class, so a Markdown renderer or a dangerously-set
 * HTML string inherits it without every tag needing a wrapper.
 *
 * 720px is the measure. It lands around 80 characters at 17px, which is the top of
 * the comfortable range; wider and the eye loses the line return.
 */
export function Prose({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="sx-prose" style={{ maxWidth: 720, margin: "0 auto", ...style }}>
      {children}
      <style>{`
        .sx-prose { font-family: ${SX.body}; font-size: 17px; line-height: 1.7; color: ${SX.ink2}; }
        .sx-prose h2 {
          font-family: ${SX.display}; font-weight: 500; font-size: 30px; line-height: 1.22;
          letter-spacing: -0.8px; color: ${SX.ink}; margin: 56px 0 16px;
        }
        .sx-prose h3 {
          font-family: ${SX.display}; font-weight: 500; font-size: 22px; line-height: 1.3;
          letter-spacing: -0.4px; color: ${SX.ink}; margin: 36px 0 12px;
        }
        .sx-prose h2:first-child, .sx-prose h3:first-child { margin-top: 0; }
        .sx-prose p { margin: 0 0 20px; }
        /* Markers are off globally (globals.css) because every other list on the site
           is a layout. Prose is the exception: a bulleted list in a blog post that
           renders without bullets reads as a formatting bug. */
        .sx-prose ul { list-style: disc; }
        .sx-prose ol { list-style: decimal; }
        .sx-prose ul, .sx-prose ol { margin: 0 0 20px; padding-left: 24px; }
        .sx-prose li { margin: 0 0 10px; }
        .sx-prose li::marker { color: ${SX.ink3}; }
        .sx-prose strong { color: ${SX.ink}; font-weight: 600; }
        .sx-prose a { color: ${SX.accentText}; text-decoration: none; }
        .sx-prose a:hover { text-decoration: underline; }
        .sx-prose blockquote {
          margin: 28px 0; padding: 4px 0 4px 22px; border-left: 3px solid ${SX.accent};
          color: ${SX.ink}; font-size: 19px; line-height: 1.6;
        }
        .sx-prose code {
          font-family: ${SX.mono}; font-size: 15px; background: ${SX.bgAlt};
          border: 1px solid ${SX.hairline}; border-radius: 5px; padding: 1px 6px;
        }
        .sx-prose pre {
          font-family: ${SX.mono}; font-size: 14px; line-height: 1.6; background: ${SX.bgAlt};
          border: 1px solid ${SX.hairline}; border-radius: 12px; padding: 20px 22px;
          overflow-x: auto; margin: 0 0 22px;
        }
        .sx-prose pre code { background: none; border: 0; padding: 0; }
        .sx-prose img { max-width: 100%; height: auto; border-radius: 12px; }
        .sx-prose hr { border: 0; border-top: 1px solid ${SX.hairline}; margin: 44px 0; }
        .sx-prose table { width: 100%; border-collapse: collapse; margin: 0 0 24px; font-size: 15.5px; }
        .sx-prose th, .sx-prose td { text-align: left; padding: 12px 14px; border-bottom: 1px solid ${SX.hairline}; }
        .sx-prose th { color: ${SX.ink}; font-weight: 600; }
      `}</style>
    </div>
  );
}
