"use client";

/**
 * /v2/demo — Book a demo page. First of the secondary pages, built from the same
 * Sasonix primitive kit as the homepage so it reads as one site: the shared Nav (in
 * its solid/light variant, since there's no dark hero behind it here), the same
 * eyebrow + Archivo display type + tokens, scroll-in reveals, and the slim footer
 * (CtaFooter with the big CTA band removed, since this page IS the call to action).
 *
 * Booking is a Calendly inline embed (15 minute demo). Instant, in-session
 * scheduling is the single biggest lever on demo-booking conversion, and Calendly's
 * own booking questions capture firm + size for prep, so no separate lead form. The
 * left column carries the pitch, what-to-expect, and one real proof quote; the right
 * column holds the scheduler. Layout mirrors the homepage hero's split.
 */
import { MotionConfig } from "framer-motion";
import { SX } from "./tokens";
import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { CtaFooter } from "./CtaFooter";
import { Container, Eyebrow } from "./kit";
import { Reveal } from "./reveal";
import { CalendlyEmbed } from "./CalendlyEmbed";

const EXPECT = [
  "15 minutes, live over video",
  "Run on your firm's actual case files",
  "See Delta drive the tools you already use",
  "No setup or prep on your side",
];

export function DemoPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div style={{ background: SX.white, color: SX.ink, minHeight: "100vh" }}>
        <SmoothScroll />
        <Nav solid />

        <section style={{ background: SX.white, padding: "156px 0 112px" }}>
          <Container>
            <div className="sx-demo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
              {/* LEFT: the pitch */}
              <Reveal>
                <div style={{ maxWidth: 520 }}>
                  <Eyebrow>Book a demo</Eyebrow>
                  <h1 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 54, lineHeight: "60px", letterSpacing: "-2px", color: SX.ink, margin: "24px 0 0", maxWidth: 480 }}>
                    See Delta on your real cases
                  </h1>
                  <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 18, lineHeight: "30px", color: SX.ink2, margin: "20px 0 0", maxWidth: 460 }}>
                    Book a 15 minute walkthrough. We connect Delta to the tools your firm already uses, then run it on one of your real matters, so you see the work, not a slideshow.
                  </p>

                  {/* what to expect */}
                  <div style={{ marginTop: 34 }}>
                    <div style={{ fontFamily: SX.mono, fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: SX.ink2, marginBottom: 16 }}>
                      What to expect
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {EXPECT.map((t) => (
                        <span key={t} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink }}>
                          <Check />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* proof: one real, attributable quote */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
                    <span aria-hidden style={{ width: 1, height: 46, background: SX.hairline }} />
                    <div>
                      <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                        {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
                      </div>
                      <div style={{ fontFamily: SX.body, fontSize: 14.5, lineHeight: "20px", color: SX.ink }}>
                        &ldquo;Delta gives us back about five hours a week.&rdquo;
                      </div>
                      <div style={{ fontFamily: SX.body, fontSize: 13, lineHeight: "18px", color: SX.ink2, marginTop: 2 }}>
                        Kirschbaum &amp; Nowotny, LLC &middot; Overland Park, KS
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* RIGHT: the Calendly scheduler, in a card */}
              <Reveal delay={0.08} style={{ background: "#fff", border: `1px solid ${SX.hairline}`, borderRadius: 20, boxShadow: "0 30px 70px -34px rgba(26,23,18,0.28)", overflow: "hidden" }}>
                <CalendlyEmbed />
              </Reveal>
            </div>
          </Container>
          <style>{`@media (max-width: 900px){ .sx-demo-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
        </section>

        {/* slim footer: no CTA band (this page is the CTA) */}
        <CtaFooter showCta={false} />
      </div>
    </MotionConfig>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SX.orange} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill={SX.orange} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z" />
    </svg>
  );
}
