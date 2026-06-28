"use client";

/**
 * harvey-light hero, ported verbatim from eclipse-variants/harvey-light.html.
 * Full-bleed footage faded into the bone canvas on the left so dark copy stays
 * crisp; logo wall pinned at the bottom of the 100vh hero.
 */
import type { Theme, CopyVariant } from "@/lib/variants";
import { HERO_HEADLINES, HERO_SUBHEAD, PRIMARY_CTA } from "@/lib/variants";
import { HeroHeader, HERO_HEADER_HEIGHT } from "./HeroHeader";
import { HERO_MAXW, HERO_PAD, HeroLogoWall, HeroStyles, Pill } from "./shared";

export function HeroHarveyLight({ theme, copy }: { theme: Theme; copy: CopyVariant }) {
  const c = theme.canvas;
  const rgb = theme.canvasRgb;
  return (
    <>
      <HeroStyles theme={theme} />
      <HeroHeader theme={theme} />

      <section
        className="cd-hl-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          isolation: "isolate",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginTop: -HERO_HEADER_HEIGHT,
          paddingTop: HERO_HEADER_HEIGHT,
          background: c,
        }}
      >
        <video
          className="cd-hl-video"
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
            objectPosition: "78% center",
          }}
        >
          <source src={theme.heroVideo} type={theme.heroVideoType} />
        </video>

        {/* light treatment: top scrim, bottom fade, and the cream LEFT fade */}
        <div
          aria-hidden
          className="cd-hl-scrim"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: `linear-gradient(to bottom, rgba(${rgb}, 0.62) 0%, rgba(${rgb}, 0) 20%), linear-gradient(to bottom, rgba(${rgb}, 0) 52%, rgba(${rgb}, 0.55) 80%, rgba(${rgb}, 0.94) 94%, ${c} 100%), linear-gradient(to right, ${c} 0%, rgba(${rgb}, 0.99) 26%, rgba(${rgb}, 0.86) 42%, rgba(${rgb}, 0.40) 55%, rgba(${rgb}, 0.06) 64%, rgba(${rgb}, 0) 72%)`,
          }}
        />
        {/* whisper of brand blue in the cool of the footage, top right */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "radial-gradient(60% 60% at 86% 16%, rgba(47, 111, 224, 0.16) 0%, rgba(47, 111, 224, 0) 60%)",
            mixBlendMode: "multiply",
          }}
        />

        <div style={{ position: "relative", zIndex: 10, flex: "1 1 auto", display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ maxWidth: HERO_MAXW, margin: "0 auto", padding: `0 ${HERO_PAD}px`, width: "100%" }}>
            <div className="cd-hl-copy" style={{ display: "flex", flexDirection: "column", gap: 30, maxWidth: 620, padding: "96px 0 64px" }}>
              <h1
                className="cd-hl-h1"
                style={{
                  fontFamily: theme.serif,
                  fontWeight: 400,
                  fontSize: 70,
                  lineHeight: 1.03,
                  letterSpacing: "-1.6px",
                  color: theme.ink,
                  margin: 0,
                }}
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
              <p
                className="cd-hl-sub"
                style={{
                  fontFamily: theme.sans,
                  fontSize: 19,
                  fontWeight: 400,
                  lineHeight: 1.55,
                  letterSpacing: "-0.2px",
                  color: theme.muted,
                  maxWidth: 470,
                  margin: 0,
                }}
              >
                {HERO_SUBHEAD}
              </p>
              <div style={{ marginTop: 4 }}>
                <Pill theme={theme} href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} location="hero" />
              </div>
            </div>
          </div>
        </div>

        <HeroLogoWall theme={theme} variant="pinned" capAlign="center" />
      </section>

      <style>{`
        @media (max-width: 960px) { .cd-hl-h1 { font-size: 56px; letter-spacing: -1.3px; } }
        @media (max-width: 720px) {
          .cd-hl-hero { min-height: auto; }
          .cd-hl-video { object-position: 64% center; opacity: 0.96; }
          .cd-hl-scrim {
            background: linear-gradient(to bottom, ${c} 0%, rgba(${rgb}, 0.97) 34%, rgba(${rgb}, 0.42) 52%, rgba(${rgb}, 0.18) 64%, rgba(${rgb}, 0.90) 90%, ${c} 100%) !important;
          }
          .cd-hl-copy { padding: 80px 0 320px !important; max-width: 100% !important; }
          .cd-hl-h1 { font-size: 44px; letter-spacing: -1px; }
          .cd-hl-sub { font-size: 17px; max-width: 100% !important; }
        }
        @media (max-width: 400px) {
          .cd-hl-h1 { font-size: 39px; }
          .cd-hl-copy { padding-bottom: 300px !important; }
        }
      `}</style>
    </>
  );
}
