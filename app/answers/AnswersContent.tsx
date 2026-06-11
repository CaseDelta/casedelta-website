"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { BottomCTA } from "@/components/BottomCTA";
import { ANSWER_CATEGORIES } from "@/lib/answers";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wrap: React.CSSProperties = { maxWidth: 880, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" };

export function AnswersContent() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* Hero / definition-first opening */}
      <section style={{ padding: "clamp(120px, 16vw, 200px) 0 clamp(32px, 4vw, 56px)" }}>
        <div style={wrap}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            style={{ fontSize: "clamp(40px, 7vw, 78px)", fontWeight: 700, color: DELTA_BLUE, lineHeight: 0.98, letterSpacing: "-0.04em", margin: 0 }}
          >
            Answers.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            style={{ fontSize: "clamp(17px, 1.7vw, 22px)", color: SUBTITLE_BLUE, lineHeight: 1.45, letterSpacing: "-0.02em", marginTop: "clamp(20px, 2.5vw, 32px)", maxWidth: 680 }}
          >
            CaseDelta is an AI associate for plaintiff law firms that drives the tools you already use. Here are direct answers to the questions firms ask most.
          </motion.p>

          {/* on-page nav (internal links + jump links) */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "clamp(28px, 3vw, 40px)" }}
          >
            {ANSWER_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                style={{ fontSize: 13, fontWeight: 600, color: "#444", textDecoration: "none", border: `1px solid ${BORDER}`, borderRadius: 999, padding: "8px 16px", backgroundColor: "#FAFAFA" }}
              >
                {cat.title}
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      {/* Q&A categories */}
      <section style={{ padding: "clamp(24px, 3vw, 40px) 0 clamp(40px, 6vw, 72px)" }}>
        <div style={wrap}>
          {ANSWER_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} style={{ marginBottom: "clamp(40px, 5vw, 64px)", scrollMarginTop: 100 }}>
              <h2 style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 700, color: "#0A0A0A", letterSpacing: "-0.02em", margin: "0 0 8px", paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                {cat.title}
              </h2>
              {cat.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: EASE_OUT }}
                  style={{ padding: "24px 0", borderBottom: `1px solid ${BORDER}` }}
                >
                  <h3 style={{ fontSize: "clamp(16px, 1.5vw, 20px)", fontWeight: 600, color: "#0A0A0A", letterSpacing: "-0.01em", margin: "0 0 10px" }}>
                    {item.question}
                  </h3>
                  <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "#555", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0 }}>
                    {item.answer}
                  </p>
                  {item.href && (
                    <Link
                      href={item.href}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 14, fontWeight: 600, color: ACCENT, textDecoration: "none" }}
                    >
                      {item.hrefLabel ?? "Learn more"}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <BottomCTA
        ctaHeading="The best answer is a live demo."
        ctaSubheading="See Delta drive a sandbox of your firm's actual stack, end to end, in twenty minutes."
        ctaLabel="Book a demo"
        ctaHref="/demo"
      />
      <FooterV2 />
    </main>
  );
}
