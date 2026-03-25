"use client";

import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { BottomCTA } from "@/components/BottomCTA";

const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];


export default function SecurityPage() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* ═══════════════════════════════════════
          HERO — Full viewport, massive type
          ═══════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(140px, 18vw, 220px) clamp(24px, 4vw, 48px) 0",
          }}
        >
          {/* Heading — two-tier */}
          <motion.h1
            initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            style={{ margin: 0 }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: "clamp(64px, 11vw, 150px)",
                fontWeight: 700,
                color: DELTA_BLUE,
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
                display: "block",
              }}
            >
              No third parties.
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: "clamp(28px, 4.5vw, 58px)",
                fontWeight: 400,
                color: SUBTITLE_BLUE,
                lineHeight: 1.25,
                letterSpacing: "-0.03em",
                display: "block",
                marginTop: "clamp(12px, 1.5vw, 24px)",
              }}
            >
              your documents never leave our servers
            </span>
          </motion.h1>

          {/* Subheading — how */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.4vw, 20px)",
              fontWeight: 400,
              color: "#666",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              marginTop: "clamp(28px, 3vw, 44px)",
              maxWidth: 560,
            }}
          >
            Unlike nearly every other legal tech company, all AI processing runs on our own servers.
          </motion.p>

          {/* Founder quote — testimonial style */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE_OUT }}
            style={{
              marginTop: "clamp(32px, 3vw, 48px)",
              maxWidth: 560,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: DELTA_BLUE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                }}
              >
                CH
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  letterSpacing: "-0.01em",
                  marginBottom: 6,
                }}
              >
                Camren Hall
                <span style={{ fontWeight: 400, color: "#999", marginLeft: 8 }}>
                  Founder
                </span>
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  fontWeight: 400,
                  color: "#555",
                  lineHeight: 1.65,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                &ldquo;Trust is the fundamental unit that drives the legal
                field. In an AI-skeptical world, we absorb the extra cost of
                self-hosting in order to ensure complete security.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          BELOW FOLD — 4 cards
          ═══════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(80px, 10vw, 120px) clamp(24px, 4vw, 48px) 80px",
        }}
      >
        <style>{`
          .security-card {
            padding: clamp(28px, 3vw, 44px);
            border-radius: 12px;
            border: 1px solid ${BORDER};
            background: #FAFAFA;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                        border-color 0.3s ease,
                        background 0.3s ease;
          }
          .security-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            border-color: #D4D4D4;
            background: #FFFFFF;
          }
        `}</style>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 16 }}
        >
          {[
            {
              title: "Your client data never touches another company.",
              body: "Most AI tools send your documents to outside companies for processing. With CaseDelta, everything stays on our servers. No forwarding. No exceptions.",
            },
            {
              title: "Your bar license is safe.",
              body: "ABA Rule 1.6 requires you to protect client information. CaseDelta is built so that using AI doesn't put your ethical obligations at risk.",
            },
            {
              title: "Your work stays yours.",
              body: "Nothing you upload, ask, or receive is ever used to train AI models. Your legal strategy will never end up in someone else's output.",
            },
            {
              title: "Built for the cases that actually matter.",
              body: "Most lawyers only trust AI on low-risk work. CaseDelta's architecture is designed so you can use it on every case — not just the ones you can afford to experiment with.",
            },
          ].map((card, i) => (
            <div key={i} className="security-card">
              <h3
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(17px, 1.6vw, 22px)",
                  fontWeight: 600,
                  color: "#0A0A0A",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  fontWeight: 400,
                  color: "#666",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Questions CTA */}
        <p
          style={{
            fontFamily: FONT,
            fontSize: "clamp(14px, 1.1vw, 16px)",
            color: "#999",
            lineHeight: 1.7,
            marginTop: 40,
          }}
        >
          Have security questions? Contact{" "}
          <a
            href="mailto:security@casedelta.com"
            style={{
              color: "#2563EB",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            security@casedelta.com
          </a>
          . For our full data handling practices, see our{" "}
          <a
            href="/privacy"
            style={{
              color: "#2563EB",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <BottomCTA
        quote="I used AI on a small deal and saved 2-3x the time. But I'd never put real client data in it. Delta is the first AI where I actually feel safe using it on the cases that matter."
        attribution="Attorney at a 13-person firm"
        attributionDetail="Kansas City, MO"
        ctaHeading="Your data stays inside your firm."
        ctaSubheading="Start with $25 in free credits. No third parties. No exceptions."
      />
      <FooterV2 />
    </main>
  );
}
