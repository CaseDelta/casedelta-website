"use client";

/**
 * legora full-bleed hero, ported verbatim from eclipse-variants/b-legora-fullbleed.html.
 * The video is the star at full opacity; copy is centered and anchored at the bottom
 * with a short tagline next to the pill. A slim logo strip sits directly below.
 */
import type { Theme, CopyVariant } from "@/lib/variants";
import { HERO_HEADLINES, HERO_TAGLINE, PRIMARY_CTA } from "@/lib/variants";
import { HeroHeader, HERO_HEADER_HEIGHT } from "./HeroHeader";
import { HERO_MAXW, HERO_PAD, GoogleRating, HeroStyles, Pill, ScrollCue } from "./shared";

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
          height: "calc(100vh - 128px)",
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
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: `linear-gradient(to bottom, rgba(${scrim}, 0.58) 0%, rgba(${scrim}, 0.16) 13%, rgba(${scrim}, 0) 30%, rgba(${scrim}, 0) 48%, rgba(${scrim}, 0.34) 68%, rgba(${scrim}, 0.80) 88%, rgba(${rgb}, 0.97) 100%), radial-gradient(130% 66% at 50% 100%, rgba(31, 58, 95, 0.34) 0%, rgba(${rgb}, 0) 62%)`,
          }}
        />

        <div className="cd-lg-inner" style={{ position: "relative", zIndex: 10, width: "100%", paddingBottom: 60 }}>
          <div style={{ maxWidth: HERO_MAXW, margin: "0 auto", padding: `0 ${HERO_PAD}px` }}>
            <div className="cd-lg-copy" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 22, maxWidth: 760, margin: "0 auto" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <GoogleRating theme={theme} align="center" />
                <h1
                  className="cd-lg-h1"
                  style={{ fontFamily: theme.serif, fontWeight: 400, fontSize: 56, lineHeight: 1.04, letterSpacing: "-1.2px", color: "#fff", margin: 0 }}
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
              </div>
              <div className="cd-lg-tagline" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
                <span style={{ fontFamily: theme.sans, fontSize: 16, fontWeight: 400, letterSpacing: "-0.2px", color: "rgba(255, 255, 255, 0.9)" }}>
                  {HERO_TAGLINE}
                </span>
                <Pill theme={theme} href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} location="hero" />
              </div>
            </div>
          </div>
        </div>

        <ScrollCue theme={theme} />
      </section>

      <style>{`
        @media (max-width: 1080px) { .cd-lg-hero { height: calc(100vh - 128px); } .cd-lg-h1 { font-size: 50px; } }
        @media (max-width: 480px) {
          .cd-scroll-cue { display: none; }
          .cd-lg-hero { min-height: 560px; }
          .cd-lg-video { object-position: center; }
          .cd-lg-inner { padding-bottom: 42px; }
          .cd-lg-copy { gap: 18px; }
          .cd-lg-h1 { font-size: 38px; letter-spacing: -0.8px; }
          .cd-lg-tagline { flex-direction: column; gap: 14px; }
        }
      `}</style>
    </>
  );
}
