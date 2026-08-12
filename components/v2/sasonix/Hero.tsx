"use client";

/**
 * CaseDelta hero: ambient full-bleed background, copy anchored LEFT, product
 * video bounded on the RIGHT. The Granola and Ada pattern.
 *
 * WHAT CHANGED, 2026-08-11 (Camren's direction)
 *   - The right half was a typing "tell Delta to..." command demo. Killed. A chat
 *     input box is the one thing every AI site does and nobody believes. The right
 *     half is now a bounded video frame, and the video is the thing that explains
 *     what Delta does.
 *   - PROGRESSIVE DISCLOSURE is the organising rule: elements arrive in order of
 *     importance rather than all at once, so the eye is led down the left column
 *     (headline, then sub, then the ask) while the media settles alongside it.
 *
 * THE VIDEO SLOT
 *   `HeroMedia` renders a placeholder frame until an asset exists. To ship the
 *   real thing, pass `src` (and a real `poster`) at the callsite below. Nothing
 *   else changes: the frame, its proportions and its motion already hold the
 *   space. See HERO_MEDIA below.
 *
 * Entrance easing is carried over from the Perform reference: text rises 20px
 * over 0.5s on cubic-bezier(0.44, 0, 0.56, 1); the photo does a 2s 1.05 -> 1
 * settle on cubic-bezier(0.12, 0.23, 0.5, 1). prefers-reduced-motion drops all
 * of it.
 *
 * The background image is still the Sasonix placeholder, hotlinked from Framer's
 * CDN. It MUST be replaced with a CaseDelta asset and self-hosted before launch.
 */
import { useEffect, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SX } from "./tokens";

const EASE_TEXT = [0.44, 0, 0.56, 1] as [number, number, number, number];
const EASE_SOFT = [0.12, 0.23, 0.5, 1] as [number, number, number, number];

const HERO_H = 860; // one viewport, hard cut into the section below

/**
 * The hero video. `src` undefined renders the placeholder frame.
 * Drop the asset in and this hero is finished:
 *   src: "/videos/<the-cut>.mp4", poster: "/v2/<its-first-frame>.jpg"
 */
const HERO_MEDIA: { src?: string; poster?: string; caption: string } = {
  src: undefined,
  poster: undefined,
  caption: "Delta, working a file end to end",
};

/**
 * The ambient backdrop. Self-hosted ICM (intentional camera movement) photography
 * in the cool teal family, which is the one coherent set across the whole page.
 * Swap by name; ?bg=<name> overrides it live for side-by-side judging.
 */
const BACKDROPS = {
  "water-dark": "/v2/ambient/water-dark.webp",
  "valley-mist": "/v2/ambient/valley-mist.webp",
  "cloud-pastel": "/v2/ambient/cloud-pastel.webp",
  "horizon-blue": "/v2/ambient/horizon-blue.webp",
  "cloud-swirl": "/v2/ambient/cloud-swirl.webp",
  "meadow-light": "/v2/ambient/meadow-light.webp",
  "forest-dark": "/v2/ambient/forest-dark.webp",
} as const;

const DEFAULT_BACKDROP: keyof typeof BACKDROPS = "water-dark";

export function Hero() {
  const reduce = useReducedMotion();
  const backdrop = useBackdropOverride();

  /** Perform's text appear: fade plus a 20px rise, ordered by importance. */
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0.001, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease: EASE_TEXT, type: "tween" as const },
        };

  return (
    <section
      className="sx-hero"
      style={{ position: "relative", height: HERO_H, background: SX.ink, fontFamily: SX.body, overflow: "hidden" }}
    >
      <style>{`
        /* Two columns on desktop; the media stacks under the copy on narrow screens. */
        .sx-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr);
          align-items: center;
          gap: 56px;
          height: 100%;
        }

        /* Below the two-column breakpoint the media STACKS under the copy. It is
           never hidden: the video is what explains the product, so a phone
           visitor has to reach it too. */
        @media (max-width: 1100px) {
          .sx-hero { height: auto !important; }
          .sx-hero-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 44px;
            height: auto !important;
            align-content: start;
            padding: 132px 0 72px;
          }
          .sx-hero-copy { max-width: 680px !important; }
          .sx-hero-media { max-width: 620px; }
        }

        @media (max-width: 760px) {
          .sx-hero { height: auto !important; min-height: 760px; }
          .sx-hero-grid {
            height: auto !important;
            align-content: start;
            padding: 112px 0 64px !important;
          }
          .sx-hero-copy { max-width: 100% !important; }
          .sx-hero-title { font-size: 46px !important; line-height: 50px !important; }
          .sx-hero-subhead { max-width: 100% !important; font-size: 17px !important; line-height: 28px !important; }
          .sx-hero-actions { flex-wrap: wrap; }
          .sx-hero-proof { margin-top: 34px !important; }
        }

        @media (max-width: 430px) {
          .sx-hero-title { font-size: 40px !important; line-height: 44px !important; }
        }
      `}</style>

      {/* Ambient background, settling over 2s so the hero is never static on arrival. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={BACKDROPS[backdrop]}
        alt=""
        aria-hidden
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0.001, scale: 1.05 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 2, ease: EASE_SOFT, type: "tween" as const },
            })}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transformOrigin: "center",
          zIndex: 0,
        }}
      />
      {/* Scrim: heaviest on the left so the copy holds, clearing by the media column. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(var(--sx-scrim-rgb),0.66) 0%, rgba(var(--sx-scrim-rgb),0.46) 28%, rgba(var(--sx-scrim-rgb),0.16) 52%, rgba(var(--sx-scrim-rgb),0.04) 72%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 40px",
          height: "100%",
        }}
      >
        <div className="sx-hero-grid">
          {/* LEFT: the argument, disclosed in order of importance. */}
          <div className="sx-hero-copy" style={{ maxWidth: 620 }}>
            <motion.h1
              {...rise(0.15)}
              className="sx-hero-title"
              style={{
                fontFamily: SX.display,
                fontWeight: 500,
                fontSize: 66,
                lineHeight: "70px",
                letterSpacing: 0,
                color: SX.onMedia,
                margin: 0,
                maxWidth: 580,
                textWrap: "balance",
              }}
            >
              Win back your time by having the headcount you could never hire.
            </motion.h1>

            <motion.p
              {...rise(0.4)}
              className="sx-hero-subhead"
              style={{
                fontFamily: SX.body,
                fontWeight: 400,
                fontSize: 18,
                lineHeight: "30px",
                color: SX.onMediaMuted,
                margin: "24px 0 0",
                maxWidth: 470,
              }}
            >
              The best AI paralegal is the one that knows you, your case, and your firm.
            </motion.p>

            <motion.div
              {...rise(0.62)}
              className="sx-hero-actions"
              style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32 }}
            >
              <a
                href="/v2/demo"
                className="sx-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: SX.body,
                  fontSize: 16,
                  fontWeight: 500,
                  color: SX.ink,
                  background: SX.surface,
                  borderRadius: 999,
                  padding: "8px 8px 8px 22px",
                  textDecoration: "none",
                }}
              >
                Book a demo
                <span
                  aria-hidden
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: SX.ink,
                    color: SX.onInk,
                  }}
                >
                  <ArrowUpRight size={17} strokeWidth={2} />
                </span>
              </a>
            </motion.div>

            {/* Proof arrives last: it confirms the claim rather than making it. */}
            <motion.div
              {...rise(0.88)}
              className="sx-hero-proof"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 46,
                textShadow: "0 1px 18px rgba(var(--sx-scrim-rgb),0.35)",
              }}
            >
              <span aria-hidden style={{ width: 1, height: 46, background: SX.glassEdge }} />
              <div>
                <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} />
                  ))}
                </div>
                <div style={{ fontFamily: SX.body, fontSize: 14.5, lineHeight: "20px", color: SX.onMedia }}>
                  &ldquo;Delta gives us back about five hours a week.&rdquo;
                </div>
                <div style={{ fontFamily: SX.body, fontSize: 13, lineHeight: "18px", color: SX.onMediaMuted, marginTop: 2 }}>
                  Kirschbaum &amp; Nowotny, LLC &middot; Overland Park, KS
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: the video. Settles alongside the copy, not before it. */}
          <HeroMedia reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

/**
 * The bounded media frame. Holds its proportions whether it is showing the real
 * video or the placeholder, so wiring the asset never moves the layout.
 */
function HeroMedia({ reduce }: { reduce: boolean }) {
  const { src, poster, caption } = HERO_MEDIA;

  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0.001, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.5, duration: 0.8, ease: EASE_SOFT, type: "tween" as const },
      };

  return (
    <motion.div
      className="sx-hero-media"
      {...anim}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        borderRadius: 20,
        overflow: "hidden",
        background: SX.glass,
        border: `1px solid ${SX.glassEdge}`,
        boxShadow: "0 30px 80px -24px rgba(var(--sx-scrim-rgb),0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {src ? (
        <video
          src={src}
          poster={poster}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={caption}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <PlaceholderFrame caption={caption} />
      )}
    </motion.div>
  );
}

/**
 * Deliberately reads as a reserved slot rather than a broken image: the frame,
 * proportions and motion are final, only the footage is outstanding.
 */
function PlaceholderFrame({ caption }: { caption: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        gap: 14,
        gridAutoRows: "min-content",
        alignContent: "center",
        background: "linear-gradient(160deg, rgba(var(--sx-scrim-rgb),0.20), rgba(var(--sx-scrim-rgb),0.42))",
      }}
    >
      <span
        aria-hidden
        style={{
          display: "grid",
          placeItems: "center",
          width: 62,
          height: 62,
          borderRadius: 999,
          background: SX.glass,
          border: `1px solid ${SX.glassEdge}`,
          color: SX.onMedia,
        }}
      >
        <Play size={22} strokeWidth={1.8} style={{ marginLeft: 3 }} />
      </span>
      <span
        style={{
          fontFamily: SX.ui,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: SX.onMediaMuted,
        }}
      >
        {caption}
      </span>
    </div>
  );
}

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill={SX.accentOnMedia} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z" />
    </svg>
  );
}

/** ?bg=<name> swaps the backdrop live, so candidates can be judged in place. */
function useBackdropOverride(): keyof typeof BACKDROPS {
  const [name, setName] = useState<keyof typeof BACKDROPS>(DEFAULT_BACKDROP);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("bg");
    if (q && q in BACKDROPS) setName(q as keyof typeof BACKDROPS);
  }, []);
  return name;
}
