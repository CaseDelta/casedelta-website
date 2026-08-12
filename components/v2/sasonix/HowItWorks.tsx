"use client";

/**
 * Onboarding and "works on top of your stack", consolidated into ONE banded section.
 *
 * WHY IT LOOKS DIFFERENT FROM ITS NEIGHBOURS: the page was a long run of white
 * sections with cream cards, and the eye stopped reading. This one is full bleed on
 * an ambient photograph with light type over it, so the page has a dark band in the
 * middle and the reader gets a beat. It is the only banded section; if a second one
 * appears, the device stops working.
 *
 * NO VENDOR LOGOS, deliberately (Camren, 2026-08-11). The old version fanned
 * connector lines out to Clio, MyCase, Filevine, Drive and Gmail tiles. Naming
 * logos dates the page, invites "do you support X" objections we then have to
 * answer, and implies a fixed integration list when the actual claim is the
 * opposite: Delta signs in to whatever the firm already runs. A category-pill row
 * replaced the logos briefly and was also cut: it restated the copy above it. The
 * claim lives in the sentence, not in a row of chips. Do not put either back.
 */
import { motion } from "framer-motion";
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal, revealProps } from "./reveal";

const STEPS = [
  { n: "Step 01", t: "Connect", d: "Delta signs in to your case system, inbox, calendar and files. No migration. Nothing new to learn. Five minutes." },
  { n: "Step 02", t: "Ask", d: "Give Delta your onboarding doc and the flow your firm already runs. Same as a new hire." },
  { n: "Step 03", t: "Approve", d: "You approve before anything goes out. Delta learns how your firm works. That knowledge stays when people leave." },
];

/** The one banded section on the page. */
const BAND_IMAGE = "/v2/ambient/water-dark.webp";

export function HowItWorks() {
  return (
    <section id="howitworks" className="sx-band" style={{ position: "relative", overflow: "hidden", padding: "112px 0 120px", margin: "60px 0" }}>
      {/* full-width ambient backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BAND_IMAGE}
        alt=""
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      {/* scrim: the band carries body copy, so it needs more cover than the hero does */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(var(--sx-scrim-rgb),0.72) 0%, rgba(var(--sx-scrim-rgb),0.58) 45%, rgba(var(--sx-scrim-rgb),0.74) 100%)",
        }}
      />

      <Container style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: SX.display,
                fontWeight: 500,
                fontSize: 48,
                lineHeight: "55.2px",
                letterSpacing: "-1px",
                color: SX.onMedia,
                margin: 0,
                maxWidth: 640,
              }}
            >
              Working in five minutes, on top of what you already run
            </h2>
            <p
              style={{
                fontFamily: SX.body,
                fontSize: 18,
                lineHeight: "30px",
                color: SX.onMediaMuted,
                margin: "18px 0 0",
                maxWidth: 520,
              }}
            >
              Delta connects to the tools your firm already pays for. No rip out, no migration, no new logins for your team.
            </p>
          </div>
        </Reveal>

        {/* the three steps, as glass panels over the photograph */}
        <div className="sx-hiw-steps" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56 }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              {...revealProps({ delay: i * 0.09, amount: 0.35 })}
              style={{
                background: SX.glass,
                borderRadius: 22,
                border: `1px solid ${SX.glassEdge}`,
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                padding: 32,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ position: "relative", width: 8, height: 8, flex: "0 0 auto" }}>
                  <span
                    aria-hidden
                    className="sx-dot-glow"
                    style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 8, transform: "translate(-50%,-50%)", borderRadius: "50%", background: SX.onMedia, filter: "blur(6px)", animationDelay: `${i * 0.5}s` }}
                  />
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: SX.onMedia }} />
                </span>
                <span style={{ fontFamily: SX.mono, fontSize: 14, letterSpacing: "-0.5px", color: SX.onMediaMuted }}>{s.n}</span>
              </span>
              <p style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 24, lineHeight: "30px", color: SX.onMedia, margin: "20px 0 0" }}>{s.t}</p>
              <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.onMediaMuted, margin: "12px 0 0" }}>{s.d}</p>
            </motion.div>
          ))}
        </div>

      </Container>

      <style>{`
        .sx-dot-glow { animation: sx-dot-pulse 2.4s ease-in-out infinite; }
        @keyframes sx-dot-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.85; }
          50%      { transform: translate(-50%,-50%) scale(1.75); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) { .sx-dot-glow { animation: none; } }
        @media (max-width: 900px){
          .sx-hiw-steps { grid-template-columns: 1fr !important; }
          .sx-band { padding: 80px 0 88px !important; margin: 44px 0 !important; }
        }
      `}</style>
    </section>
  );
}
