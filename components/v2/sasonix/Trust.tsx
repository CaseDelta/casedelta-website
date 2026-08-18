"use client";

/**
 * Trust, as the page's second full-bleed band.
 *
 * WHY IT IS A BAND: the objection a firm actually raises is not "how is this
 * different from ChatGPT", it is "can I put a client file in it". That question
 * deserves to interrupt the page rather than sit in three cream cards the eye
 * slides past. Camren answers it in every prospect thread with an analogy that does
 * more work than any spec sheet: a paralegal would never take client files home.
 *
 * WHY IT DOES NOT LOOK LIKE THE ONBOARDING BAND: two identical dark slides read as
 * a template repeating itself. The differences are deliberate and worth keeping:
 *   - forest-dark, near black with VERTICAL streaks, against the onboarding band's
 *     horizontal teal water. Different texture, much lower key.
 *   - No glass cards. The three statements sit directly on the image, divided by
 *     hairlines. Card chrome reads as UI; bare type on a dark field reads as a
 *     statement, which is the right register for a trust claim.
 *
 * WhySasonix.tsx (the old "Delta vs a generic AI chatbot" comparison) is still in
 * the repo, unmounted.
 */
import { motion } from "framer-motion";
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal, revealProps } from "./reveal";

const BAND_IMAGE = "/v2/ambient/forest-dark.webp";

const POINTS: { title: string; body: string[] }[] = [
  {
    title: "Your files stay put",
    body: [
          "Your files never leave your systems.",
          "A paralegal would never take them home.",
          "Neither does Delta.",
        ],
  },
  {
    title: "Every answer shows its source",
    body: [
          "Every answer shows the page it came from.",
          "You check it yourself.",
        ],
  },
  {
    title: "Built for client data",
    body: [
          "Your data stays yours.",
          "It is encrypted and kept apart from other firms.",
          "It never trains a model.",
          "HIPAA and bar compliant.",
        ],
  },
];

export function Trust() {
  return (
    <section
      id="security"
      className="sx-trust-band"
      style={{ position: "relative", overflow: "hidden", padding: "112px 0 120px", margin: "60px 0" }}
    >
      {/* full-width ambient backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BAND_IMAGE}
        alt=""
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      {/* bare type rather than glass panels, so this band scrims harder than the other */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(var(--sx-scrim-rgb),0.78) 0%, rgba(var(--sx-scrim-rgb),0.64) 50%, rgba(var(--sx-scrim-rgb),0.80) 100%)",
        }}
      />

      <Container style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: SX.mono,
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: SX.onMediaMuted,
                border: `1px solid ${SX.glassEdge}`,
                borderRadius: 999,
                padding: "7px 16px",
              }}
            >
              Trust
            </span>
            <h2
              style={{
                fontFamily: SX.display,
                fontWeight: 500,
                fontSize: 48,
                lineHeight: "55.2px",
                letterSpacing: "-1px",
                color: SX.onMedia,
                margin: "24px 0 0",
                maxWidth: 620,
              }}
            >
              Safe to put a client file in
            </h2>
          </div>
        </Reveal>

        {/* three statements on the image, divided by hairlines. No card chrome. */}
        <div className="sx-trust-row">
          {POINTS.map((p, i) => (
            <motion.div key={p.title} {...revealProps({ delay: i * 0.09, amount: 0.3 })} className="sx-trust-col">
              <h3
                style={{
                  fontFamily: SX.display,
                  fontWeight: 500,
                  fontSize: 22,
                  lineHeight: "28px",
                  letterSpacing: "-0.3px",
                  color: SX.onMedia,
                  margin: 0,
                }}
              >
                {p.title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "12px 0 0" }}>
                {p.body.map((line) => (
                  <p
                    key={line}
                    style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "26px", color: SX.onMediaMuted, margin: 0 }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <style>{`
        .sx-trust-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 64px;
        }
        .sx-trust-col { padding: 0 36px; }
        .sx-trust-col:first-child { padding-left: 0; }
        .sx-trust-col:last-child { padding-right: 0; }
        .sx-trust-col + .sx-trust-col { border-left: 1px solid var(--sx-glass-edge); }

        @media (max-width: 900px) {
          .sx-trust-band { padding: 80px 0 88px !important; margin: 44px 0 !important; }
          .sx-trust-row { grid-template-columns: minmax(0, 1fr); gap: 34px; margin-top: 44px; }
          .sx-trust-col { padding: 0; }
          .sx-trust-col + .sx-trust-col {
            border-left: 0;
            border-top: 1px solid var(--sx-glass-edge);
            padding-top: 34px;
          }
        }
      `}</style>
    </section>
  );
}
