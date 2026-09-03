"use client";

/**
 * The layout for /privacy and /terms, on the v2 kit.
 *
 * These two pages used to carry a THIRD design of their own: their own Inter stack,
 * their own #2563EB accent, their own hairline grey, none of it from the palette.
 * That is why they read as a different company's site. The chrome is now the same
 * PageShell every other page wears and every colour comes from the tokens.
 *
 * THE API IS DELIBERATELY THE SAME as the layout it replaces (a wrapper, a section,
 * a closing note, a link style). Privacy is 230 lines of legal text and Terms is 101,
 * and legal copy is the one thing on this site that must not be casually reworded.
 * Keeping the shape meant the migration touched the frame and not a word of the text.
 *
 * `lastUpdated` is the date the DOCUMENT changed, not the date the page was
 * redesigned. Do not bump it for a styling change: it is a representation to the
 * reader about when the terms they are agreeing to last moved.
 *
 * No CTA band. A firm reading the privacy policy is doing diligence, and closing with
 * an ask reads as tone deaf.
 */
import { SX } from "./tokens";
import { PageShell } from "./PageShell";
import { Container } from "./kit";

export function LegalPage({
  title,
  children,
  lastUpdated = "March 25, 2026",
}: {
  title: string;
  children: React.ReactNode;
  lastUpdated?: string;
}) {
  return (
    <PageShell showCta={false}>
      <section style={{ background: SX.bg, padding: "148px 0 100px" }}>
        <Container>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h1
              className="sx-legal-title"
              style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55px", letterSpacing: "-1.2px", color: SX.ink, margin: 0 }}
            >
              {title}
            </h1>
            <p style={{ fontFamily: SX.body, fontSize: 14, color: SX.ink3, margin: "14px 0 56px" }}>
              Last updated: {lastUpdated}
            </p>
            {children}
          </div>
        </Container>
        <style>{`
          @media (max-width: 760px) {
            .sx-legal-title { font-size: 36px !important; line-height: 42px !important; }
          }
        `}</style>
      </section>
    </PageShell>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 24, lineHeight: 1.3, letterSpacing: "-0.5px", color: SX.ink, margin: "0 0 16px" }}>
        {title}
      </h2>
      <div style={{ fontFamily: SX.body, fontSize: 16.5, fontWeight: 400, color: SX.ink2, lineHeight: 1.7 }}>
        {children}
      </div>
    </section>
  );
}

export function LegalClosing({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink3, lineHeight: 1.7, paddingTop: 24, borderTop: `1px solid ${SX.hairline}` }}>
      {children}
    </p>
  );
}

/** Links inside legal prose stay underlined: in a contract, a link is a citation. */
export const LEGAL_LINK_STYLE: React.CSSProperties = {
  color: SX.accentText,
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};
