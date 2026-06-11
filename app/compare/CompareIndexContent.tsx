"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { BottomCTA } from "@/components/BottomCTA";
import { COMPARISONS } from "@/lib/comparisons";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wrap: React.CSSProperties = { maxWidth: 1080, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" };

export function CompareIndexContent() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      <section style={{ padding: "clamp(120px, 16vw, 200px) 0 clamp(40px, 5vw, 64px)" }}>
        <div style={wrap}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            style={{ fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 700, color: DELTA_BLUE, lineHeight: 0.98, letterSpacing: "-0.04em", margin: 0 }}
          >
            CaseDelta vs the field.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            style={{ fontSize: "clamp(17px, 1.7vw, 22px)", color: SUBTITLE_BLUE, lineHeight: 1.4, letterSpacing: "-0.02em", marginTop: "clamp(20px, 2.5vw, 32px)", maxWidth: 720 }}
          >
            Most legal AI is a destination: you upload work to it, move your firm onto it, or work inside it. Delta is the associate that drives the tools you already run. Here is how it compares, honestly and with sources.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: "clamp(24px, 3vw, 40px) 0 clamp(48px, 7vw, 90px)" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {COMPARISONS.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT }}
              >
                <Link
                  href={`/compare/${c.slug}`}
                  style={{
                    display: "block",
                    height: "100%",
                    textDecoration: "none",
                    border: `1px solid ${BORDER}`,
                    borderRadius: 14,
                    padding: "clamp(22px, 2.5vw, 30px)",
                    backgroundColor: "#FAFAFA",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease",
                  }}
                  className="compare-card"
                >
                  <div style={{ fontSize: "clamp(18px, 1.8vw, 22px)", fontWeight: 700, color: DELTA_BLUE, letterSpacing: "-0.02em", marginBottom: 10 }}>
                    CaseDelta vs {c.competitor}
                  </div>
                  <p style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "#555", lineHeight: 1.6, letterSpacing: "-0.01em", margin: 0 }}>
                    {c.cardBlurb}
                  </p>
                  <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: ACCENT }}>
                    Compare
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <style>{`
            .compare-card:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 28px rgba(0,0,0,0.08);
              border-color: #D4D4D4;
              background: #FFFFFF !important;
            }
          `}</style>
        </div>
      </section>

      <BottomCTA
        ctaHeading="The honest comparison is a live demo."
        ctaSubheading="See Delta drive a sandbox of your firm's actual stack, end to end, in twenty minutes."
        ctaLabel="Book a demo"
        ctaHref="/demo"
      />
      <FooterV2 />
    </main>
  );
}
