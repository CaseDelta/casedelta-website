"use client";

/**
 * harvey-dark hero, ported verbatim from eclipse-variants/harvey-dark.html.
 * Same left-contained layout as harvey-light on a cool near-black canvas with a
 * strong left scrim and a faint blue wash.
 */
import type { Theme, CopyVariant } from "@/lib/variants";
import { HERO_HEADLINES, HERO_SUBHEAD, PRIMARY_CTA } from "@/lib/variants";
import { HeroHeader, HERO_HEADER_HEIGHT } from "./HeroHeader";
import { HERO_MAXW, HERO_PAD, HeroLogoWall, HeroStyles, Pill } from "./shared";

export function HeroHarveyDark({ theme, copy }: { theme: Theme; copy: CopyVariant }) {
  const c = theme.canvas;
  const rgb = theme.canvasRgb;
  return (
    <>
      <HeroStyles theme={theme} />
      <HeroHeader theme={theme} />

      <section
        className="cd-hd-hero"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: 788,
          overflow: "hidden",
          marginTop: -HERO_HEADER_HEIGHT,
          paddingTop: HERO_HEADER_HEIGHT,
          background: c,
        }}
      >
        <video
          className="cd-hd-video"
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
            background: c,
          }}
        >
          <source src={theme.heroVideo} type={theme.heroVideoType} />
        </video>

        <div
          aria-hidden
          className="cd-hd-scrim"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: `linear-gradient(to bottom, rgba(${rgb}, 0.58) 0%, rgba(${rgb}, 0) 30%), linear-gradient(to right, rgba(${rgb}, 0.96) 0%, rgba(${rgb}, 0.88) 26%, rgba(${rgb}, 0.52) 52%, rgba(${rgb}, 0.16) 76%, rgba(${rgb}, 0.30) 100%), radial-gradient(90% 84% at 82% 32%, rgba(58, 120, 224, 0.22) 0%, rgba(${rgb}, 0) 60%)`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: 280,
            zIndex: 1,
            pointerEvents: "none",
            background: `linear-gradient(to bottom, rgba(${rgb}, 0) 0%, rgba(${rgb}, 0.86) 72%, ${c} 100%)`,
          }}
        />

        <div style={{ position: "relative", zIndex: 10, flex: "1 1 auto", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: HERO_MAXW, margin: "0 auto", padding: `0 ${HERO_PAD}px`, width: "100%" }}>
            <div className="cd-hd-copy" style={{ display: "flex", flexDirection: "column", gap: 30, maxWidth: 620, padding: "80px 0" }}>
              <h1
                className="cd-hd-h1"
                style={{ fontFamily: theme.serif, fontWeight: 400, fontSize: 70, lineHeight: 1.03, letterSpacing: "-1.6px", color: theme.ink, margin: 0 }}
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
                className="cd-hd-sub"
                style={{ fontFamily: theme.sans, fontSize: 19, fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.2px", color: theme.muted, maxWidth: 500, margin: 0 }}
              >
                {HERO_SUBHEAD}
              </p>
              <div style={{ alignSelf: "flex-start" }}>
                <Pill theme={theme} href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} location="hero" />
              </div>
            </div>
          </div>
        </div>

        <HeroLogoWall theme={theme} variant="pinned" capAlign="left" />
      </section>

      <style>{`
        @media (min-height: 920px) { .cd-hd-hero { min-height: 100vh; } }
        @media (max-width: 880px) {
          .cd-hd-hero { min-height: 680px; }
          .cd-hd-video { object-position: 70% center; }
          .cd-hd-scrim {
            background:
              linear-gradient(to bottom, rgba(${rgb}, 0.55) 0%, rgba(${rgb}, 0) 26%),
              linear-gradient(to bottom, rgba(${rgb}, 0) 30%, rgba(${rgb}, 0.62) 64%, rgba(${rgb}, 0.95) 100%),
              radial-gradient(120% 90% at 80% 30%, rgba(58, 120, 224, 0.18) 0%, rgba(${rgb}, 0) 60%) !important;
          }
          .cd-hd-copy { padding: 64px 0 40px !important; max-width: 100% !important; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .cd-hd-h1 { font-size: 42px; line-height: 1.05; letter-spacing: -1px; }
          .cd-hd-sub { font-size: 16.5px; }
        }
      `}</style>
    </>
  );
}
