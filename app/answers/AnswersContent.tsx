"use client";

/**
 * /answers — the knowledge-base hub, on the v2 kit (components/v2/sasonix/*).
 *
 * This page exists for AI search and for the reader who wants the answer without the
 * pitch, so the shape is deliberate: the question is the heading, in the words a
 * lawyer would actually type, and the first sentence of the answer answers it. No
 * build-up, no "great question", no link where a sentence would do.
 *
 * The same ANSWER_CATEGORIES data renders here and as the FAQPage JSON-LD in
 * page.tsx. Google requires FAQ markup to match text visible on the page, so the two
 * must come from one source. Never hand-write a question into either one.
 *
 * The jump nav is real navigation, not decoration: this page is long, and a reader
 * arriving from a search on "how much does CaseDelta cost" wants the pricing block,
 * not the top.
 */
import { SX } from "@/components/v2/sasonix/tokens";
import { PageShell } from "@/components/v2/sasonix/PageShell";
import { PageHero, Container } from "@/components/v2/sasonix/kit";
import { Reveal } from "@/components/v2/sasonix/reveal";
import { ANSWER_CATEGORIES } from "@/lib/answers";

export function AnswersContent() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Answers"
        title="The questions firms ask, answered directly"
        sub="CaseDelta is an AI associate for plaintiff law firms that drives the tools you already use. Direct, answer-first responses to what firms want to know before a demo."
      >
        <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 36 }}>
          {ANSWER_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="sx-jump"
              style={{
                fontFamily: SX.body,
                fontSize: 14,
                fontWeight: 500,
                color: SX.ink2,
                textDecoration: "none",
                border: `1px solid ${SX.hairline}`,
                borderRadius: 999,
                padding: "9px 18px",
                background: SX.surface,
              }}
            >
              {cat.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {ANSWER_CATEGORIES.map((cat, i) => (
        <section
          key={cat.id}
          id={cat.id}
          /* Alternating surfaces so a long single-column page still has a rhythm and
             a jump link visibly lands somewhere. scroll-margin-top clears the fixed
             nav, which would otherwise sit over the heading a jump link targets. */
          style={{ background: i % 2 === 0 ? SX.bgAlt : SX.bg, padding: "72px 0", scrollMarginTop: 96 }}
        >
          <Container>
            <div style={{ maxWidth: 780, margin: "0 auto" }}>
              <Reveal>
                <div style={{ fontFamily: SX.mono, fontSize: 13, letterSpacing: "0.06em", color: SX.ink3, marginBottom: 12 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 38, lineHeight: "44px", letterSpacing: "-1px", color: SX.ink, margin: 0 }}>
                  {cat.title}
                </h2>
              </Reveal>
              <div style={{ marginTop: 40 }}>
                {cat.items.map((item, j) => (
                  <Reveal
                    key={item.question}
                    delay={0.05 * j}
                    style={{ padding: "28px 0", borderTop: `1px solid ${SX.hairline}` }}
                  >
                    <h3 style={{ fontFamily: SX.body, fontSize: 19, fontWeight: 600, letterSpacing: "-0.3px", color: SX.ink, lineHeight: 1.35, margin: 0 }}>
                      {item.question}
                    </h3>
                    <p style={{ fontFamily: SX.body, fontSize: 16.5, lineHeight: "28px", color: SX.ink2, margin: "12px 0 0" }}>
                      {item.answer}
                    </p>
                    {item.href && (
                      <a
                        href={item.href}
                        className="sx-answer-link"
                        style={{ display: "inline-block", marginTop: 14, fontFamily: SX.body, fontSize: 15.5, fontWeight: 500, color: SX.accentText, textDecoration: "none" }}
                      >
                        {item.hrefLabel ?? "Learn more"}
                      </a>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <style>{`
        .sx-jump { transition: color 0.2s ease, border-color 0.2s ease; }
        .sx-jump:hover { color: ${SX.accentText}; border-color: ${SX.accent}; }
        .sx-answer-link:hover { text-decoration: underline; }
        @media (max-width: 600px) {
          .sx-jump { font-size: 13px; padding: 8px 14px; }
        }
      `}</style>
    </PageShell>
  );
}
