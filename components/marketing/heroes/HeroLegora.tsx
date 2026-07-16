"use client";

/**
 * legora full-bleed hero, ported verbatim from eclipse-variants/b-legora-fullbleed.html.
 * The video is the star at full opacity; copy is centered and anchored at the bottom
 * with a short tagline next to the pill. A slim logo strip sits directly below.
 */
import type { Theme, CopyVariant } from "@/lib/variants";
import { HERO_HEADLINES, HERO_SUBHEAD, PRIMARY_CTA } from "@/lib/variants";
import { HeroHeader, HERO_HEADER_HEIGHT } from "./HeroHeader";
import { HERO_MAXW, HERO_PAD, StarRating, HeroStyles, Pill, ScrollCue } from "./shared";

export function HeroLegora({ theme, copy }: { theme: Theme; copy: CopyVariant }) {
  const rgb = theme.canvasRgb; // 15, 14, 13
  const scrim = "11, 13, 18"; // legora's slightly cooler scrim base
  return (
    <>
      <HeroStyles theme={theme} />
      <HeroHeader theme={theme} />

      <section
        className="cd-lg-hero"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          marginTop: -HERO_HEADER_HEIGHT,
          overflow: "hidden",
          isolation: "isolate",
          display: "flex",
          alignItems: "flex-end",
          background: "#0b0d12",
        }}
      >
        <video
          className="cd-lg-video"
          autoPlay
          muted
          loop
          playsInline
          poster={theme.heroPoster}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 1,
          }}
        >
          <source src={theme.heroVideo} type={theme.heroVideoType} />
        </video>

        <div
          aria-hidden
          className="cd-lg-scrim"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            /* The lower stops are MUCH heavier than the original legora mockup, and
               that is deliberate. Measured across the 29.5s loop, the raw luminance of
               the footage behind the h1 swings from 20 to 224 out of 255: roughly half
               the frames are near-white there (glass, pale interiors, a silver UI
               mockup). White serif needs ~0.75+ alpha to stay legible against L=224,
               so the copy zone is graded to ~0.8. The footage still reads across the
               top 55%, which is where it is actually doing work.
               If you lighten these stops, re-measure against the bright frames
               (t=3s, 7.5s, 12s, 22.5s) before shipping, do not eyeball one frame. */
            background: `linear-gradient(to bottom, rgba(${scrim}, 0.58) 0%, rgba(${scrim}, 0.18) 13%, rgba(${scrim}, 0.06) 30%, rgba(${scrim}, 0.20) 44%, rgba(${scrim}, 0.72) 58%, rgba(${scrim}, 0.88) 74%, rgba(${scrim}, 0.94) 88%, rgba(${rgb}, 0.99) 100%), radial-gradient(130% 66% at 50% 100%, rgba(31, 58, 95, 0.34) 0%, rgba(${rgb}, 0) 62%)`,
          }}
        />

        <div className="cd-lg-inner" style={{ position: "relative", zIndex: 10, width: "100%", paddingBottom: 104 }}>
          <div style={{ maxWidth: HERO_MAXW, margin: "0 auto", padding: `0 ${HERO_PAD}px` }}>
            <div className="cd-lg-copy" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 22, maxWidth: 880, margin: "0 auto" }}>
              <h1
                className="cd-lg-h1"
                style={{ fontFamily: theme.serif, fontWeight: 400, fontSize: 62, lineHeight: 1.05, letterSpacing: "-1.4px", color: "#fff", margin: 0, textShadow: "0 2px 40px rgba(6, 8, 12, 0.55)" }}
              >
                {HERO_HEADLINES[copy].map((seg, i) =>
                  seg.em ? (
                    <em key={i} style={{ fontStyle: "italic", color: theme.accent, fontWeight: 400 }}>
                      {seg.text}
                    </em>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  )
                )}
              </h1>
              {/* Real subhead, not the old short inline tagline: the headline no longer
                  says "paralegal", so this line has to carry the category. */}
              <p
                className="cd-lg-sub"
                /* maxWidth fits the line on one row at desktop (660 orphaned "firm.");
                   text-wrap: balance keeps the break even once it does wrap. */
                style={{ fontFamily: theme.sans, fontSize: 21, fontWeight: 400, lineHeight: 1.45, letterSpacing: "-0.2px", color: "rgba(255, 255, 255, 0.94)", margin: 0, maxWidth: 780, textWrap: "balance", textShadow: "0 1px 24px rgba(6, 8, 12, 0.6)" }}
              >
                {HERO_SUBHEAD}
              </p>
              <div className="cd-lg-tagline" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                <StarRating theme={theme} align="center" onLight />
                <Pill theme={theme} href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} location="hero" />
              </div>
            </div>
          </div>
        </div>

        <ScrollCue theme={theme} />
      </section>

      <style>{`
        @media (max-width: 1080px) { .cd-lg-hero { height: 100vh; } .cd-lg-h1 { font-size: 52px; } }
        @media (max-width: 480px) {
          .cd-scroll-cue { display: none; }
          .cd-lg-hero { min-height: 560px; }
          .cd-lg-video { object-position: center; }
          .cd-lg-inner { padding-bottom: 42px; }
          .cd-lg-copy { gap: 16px; }
          .cd-lg-h1 { font-size: 34px; letter-spacing: -0.7px; }
          .cd-lg-sub { font-size: 17px; }
          .cd-lg-tagline { flex-direction: column; gap: 14px; }
          /* The copy column occupies most of a phone viewport, so it cannot rely on
             the footage being dark where it lands. legora.mp4 loops through bright
             frames (white glass, pale interiors) that leave white serif unreadable,
             so the phone scrim is weighted much heavier and starts higher up. */
          .cd-lg-scrim {
            background: linear-gradient(
              to bottom,
              rgba(${scrim}, 0.62) 0%,
              rgba(${scrim}, 0.42) 14%,
              rgba(${scrim}, 0.58) 28%,
              rgba(${scrim}, 0.80) 46%,
              rgba(${scrim}, 0.90) 68%,
              rgba(${rgb}, 0.98) 100%
            ) !important;
          }
        }
      `}</style>
    </>
  );
}
