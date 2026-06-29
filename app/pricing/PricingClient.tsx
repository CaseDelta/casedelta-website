"use client";

import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { BottomCTA } from "@/components/BottomCTA";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

const INCLUDED = [
  "Connects to the tools your firm already uses. No platform migration.",
  "Admin coordination and legal research, in one assistant.",
  "Delta learns your firm. Not a generic legal AI.",
];

/**
 * Honest value card: the "priced against a hire" anchor. Replaces the old fabricated
 * social-proof card (fake rating + fictional firm names). The hiring figures are honest
 * market framing (also used on the homepage stats band), not invented product metrics.
 */
function ValueCard() {
  const anchor = [
    { label: "A full-time paralegal", value: "$4–5k / mo" },
    { label: "Plus recruiting and ramp", value: "weeks to hire" },
  ];
  return (
    <aside
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "36px 36px 34px 40px",
        border: `1px solid ${BORDER}`,
        borderRadius: 14,
        backgroundColor: "#FAFAFA",
        width: "100%",
        maxWidth: 360,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{ position: "absolute", top: 24, bottom: 24, left: 0, width: 3, backgroundColor: ACCENT, borderRadius: "0 2px 2px 0" }}
      />
      <p
        style={{
          fontFamily: FONT, fontSize: 11, fontWeight: 600, color: "#888",
          letterSpacing: "0.12em", textTransform: "uppercase", margin: 0, marginBottom: 22,
        }}
      >
        Priced against a hire
      </p>

      {anchor.map((row) => (
        <div
          key={row.label}
          style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 14 }}
        >
          <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 500, color: "#64748B", letterSpacing: "-0.01em" }}>{row.label}</span>
          <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: "#475569", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{row.value}</span>
        </div>
      ))}

      <div style={{ height: 1, backgroundColor: BORDER, margin: "12px 0 20px" }} />

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 6 }}>
        <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: "#0A0A0A", letterSpacing: "-0.02em" }}>CaseDelta</span>
        <span style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: "#0A0A0A", letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>
          $349 <span style={{ fontSize: 13, fontWeight: 500, color: "#777" }}>/ user</span>
        </span>
      </div>
      <p style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 400, color: "#64748B", lineHeight: 1.5, letterSpacing: "-0.005em", margin: "14px 0 0" }}>
        Live in days, flat monthly fee. The help you can&rsquo;t hire, not another per-seat tool.
      </p>
    </aside>
  );
}

export default function PricingClient() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      <section style={{ position: "relative" }}>
        {/* Ruler grid */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 1320,
            padding: "0 clamp(24px, 4vw, 48px)",
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: -16, width: 1, backgroundColor: BORDER }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, right: -16, width: 1, backgroundColor: BORDER }} />
          </div>
        </div>

        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(140px, 18vw, 220px) clamp(24px, 4vw, 48px) clamp(120px, 14vw, 200px)",
          }}
        >
          <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">

            {/* ── LEFT: Content (single-column, grouped for rhythm) ── */}
            <div
              style={{
                flex: "1 1 0",
                maxWidth: 720,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 48,
              }}
            >
              {/* Block 1: Headline */}
              <h1
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(40px, 5.5vw, 72px)",
                  fontWeight: 700,
                  color: "#0A0A0A",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.08,
                  margin: 0,
                }}
              >
                Pays for itself.
              </h1>

              {/* Block 2: Price + subline (tight group) */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(64px, 8vw, 104px)",
                      fontWeight: 700,
                      color: "#0A0A0A",
                      letterSpacing: "-0.045em",
                      lineHeight: 1,
                    }}
                  >
                    $349
                  </span>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(16px, 1.3vw, 19px)",
                      fontWeight: 500,
                      color: "#888",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    per user / month
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(16px, 1.3vw, 19px)",
                    fontWeight: 400,
                    color: "#475569",
                    lineHeight: 1.55,
                    letterSpacing: "-0.005em",
                    margin: 0,
                  }}
                >
                  Flat. No tiers, no add-ons, no setup fees.
                </p>
              </div>

              {/* Block 3: Included */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
                {INCLUDED.map((item, i, arr) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      padding: "16px 0",
                      borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        flexShrink: 0,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: `${ACCENT}10`,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 2,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M4 10.5L8 14.5L16 6.5"
                          stroke={ACCENT}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#1E293B",
                        lineHeight: 1.5,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Block 4: CTA */}
              <motion.a
                href="/demo"
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT,
                  height: 52,
                  padding: "0 30px",
                  fontSize: 15,
                  fontWeight: 600,
                  backgroundColor: ACCENT,
                  color: "#FFFFFF",
                  borderRadius: 10,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  boxShadow: `0 1px 3px ${ACCENT}25`,
                }}
                whileHover={{ y: -2, backgroundColor: DELTA_BLUE, boxShadow: `0 8px 24px ${ACCENT}35` }}
                whileTap={{ y: 0, scale: 0.98 }}
                transition={springBounce}
              >
                Book a demo
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginLeft: 8 }}
                  aria-hidden
                >
                  <path
                    d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </div>

            {/* ── RIGHT: value card (priced-against-a-hire anchor) ── */}
            <aside style={{ width: 360, flexShrink: 0 }}>
              <ValueCard />
            </aside>

          </div>
        </div>
      </section>

      <BottomCTA
        ctaHeading="See Delta inside your firm&rsquo;s stack."
        ctaSubheading="Twenty-minute live demo. We connect Delta to a sandbox of your stack and run a real workflow end to end."
        ctaLabel="Book a demo"
        ctaHref="/demo"
      />
      <FooterV2 />
    </main>
  );
}
