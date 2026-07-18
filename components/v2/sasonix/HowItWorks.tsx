"use client";

/**
 * Beat 3 of the CaseDelta /v2 arc: "How it works + integrates + onboards in 5 minutes."
 * A single combined section built from two Sasonix primitives:
 *   - the "How to Work" stepped cards (glowing Step 0X pill + title + copy), and
 *   - the "Integrations" hub-and-spoke (Delta at the center, tools around it).
 * Leads with the five-minute onboarding claim per Camren's framework. The standalone
 * HowToWork.tsx and Integrations.tsx primitives are kept in the repo as a library.
 *
 * Tool tiles use the real integration logos in /public/assets/integrations. Everything
 * else stays Sasonix-styled (orange) until the tokens.ts rebrand.
 */
import { motion } from "framer-motion";
import { SX } from "./tokens";
import { Container, SectionHead, Eyebrow } from "./kit";
import { Reveal, revealProps } from "./reveal";

const STEPS = [
  { n: "Step 01", t: "Connect the tools you already use", d: "Your case manager, email, calendar, drive, and billing. No migration, no rip-out, and nothing new for your team to learn." },
  { n: "Step 02", t: "Hand it work in plain English", d: "Tell Delta what you would tell a new paralegal. Request these records. Draft the demand. Update the file. Chase the client." },
  { n: "Step 03", t: "Review, approve, and it learns", d: "You approve before anything goes out. Over about a month it learns your firm's playbook, so you delegate instead of instruct." },
];

const TOOLS = [
  { src: "/assets/integrations/clio-icon.png", name: "Clio" },
  { src: "/assets/integrations/mycase-icon.jpg", name: "MyCase" },
  { src: "/assets/integrations/filevine-icon.svg", name: "Filevine" },
  { src: "/assets/integrations/google-drive.svg", name: "Google Drive" },
  { src: "/assets/integrations/gmail.svg", name: "Gmail" },
];
const CENTERS = [140, 390, 640, 890, 1140]; // tile centers in the 1280 container

export function HowItWorks() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Onboarding"
            title="Connect your firm in five minutes"
            sub="No engineer, no migration. Tell Delta what your firm runs on, and it connects, learns your matters, and starts working."
            titleMaxW={560}
            subMaxW={460}
          />
        </Reveal>

        {/* the three steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, marginTop: 56 }}>
          {STEPS.map((s, i) => (
            <motion.div key={s.t} {...revealProps({ delay: i * 0.09, amount: 0.35 })} style={{ background: SX.cream, borderRadius: 22, border: "1px solid rgba(26, 23, 18, 0.12)", boxShadow: "0 1px 3px rgba(26, 23, 18, 0.04)", padding: 32 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, background: SX.cream2, borderRadius: 90, padding: "8px 24px" }}>
                <span style={{ position: "relative", width: 8, height: 8, flex: "0 0 auto" }}>
                  <span aria-hidden className="sx-dot-glow" style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 8, transform: "translate(-50%,-50%)", borderRadius: "50%", background: SX.orangeDeep, filter: "blur(6px)", animationDelay: `${i * 0.5}s` }} />
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: SX.orangeDeep }} />
                </span>
                <span style={{ fontFamily: SX.mono, fontSize: 16, letterSpacing: "-0.5px", color: SX.ink }}>{s.n}</span>
              </span>
              <p style={{ fontFamily: SX.body, fontWeight: 500, fontSize: 20, lineHeight: "25.2px", color: SX.ink, margin: "24px 0 0" }}>{s.t}</p>
              <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "12px 0 0" }}>{s.d}</p>
            </motion.div>
          ))}
        </div>

        {/* integration hub: Delta on top of the firm's existing stack */}
        <Reveal style={{ marginTop: 96, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Eyebrow>Works on top of your stack</Eyebrow>
          <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "18px 0 0", maxWidth: 480, textAlign: "center" }}>
            Delta connects to the tools your firm already pays for. No rip-out, no migration, no new logins for your team.
          </p>
          {/* central orange brand mark */}
          <span style={{ marginTop: 48, width: 116, height: 116, borderRadius: 28, background: `linear-gradient(150deg, #ff8a4c, ${SX.orange})`, display: "grid", placeItems: "center", boxShadow: `0 24px 50px -18px rgba(255,112,41,0.55)` }} aria-hidden>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="#fff"><path d="M12 3l3.2 5.5H8.8L12 3zM6 10.5l3.2 5.5H2.8L6 10.5zm12 0l3.2 5.5h-6.4L18 10.5z" /></svg>
          </span>
          {/* connector lines fanning from the mark down to the tiles */}
          <svg viewBox="0 0 1280 92" fill="none" aria-hidden style={{ width: "100%", height: 92, marginTop: 4 }} preserveAspectRatio="xMidYMid meet">
            <g stroke={SX.orange} strokeWidth="1.5" opacity="0.85" strokeLinecap="round" fill="none">
              <path d="M640 0 L640 30" />
              <path d="M140 46 Q140 30 156 30 L1124 30 Q1140 30 1140 46" />
              <path d="M140 30 L140 46 M390 30 L390 76 M640 30 L640 76 M890 30 L890 76 M1140 30 L1140 76" />
            </g>
            <g fill={SX.orange} opacity="0.85">
              {CENTERS.map((c) => (
                <path key={c} d={`M${c - 4} 76 L${c + 4} 76 L${c} 84 Z`} />
              ))}
            </g>
          </svg>
          {/* 5 tool tiles (real integration logos) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24, width: "100%" }}>
            {TOOLS.map((t) => (
              <div key={t.name} className="v2-tool-tile" style={{ aspectRatio: "1 / 1", maxWidth: 156, margin: "0 auto", width: "100%", background: SX.cream2, borderRadius: 24, display: "grid", placeItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.src} alt={t.name} title={t.name} style={{ width: 46, height: 46, objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      <style>{`
        .sx-dot-glow { animation: sx-dot-pulse 2.4s ease-in-out infinite; }
        @keyframes sx-dot-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.85; }
          50%      { transform: translate(-50%,-50%) scale(1.75); opacity: 0.3; }
        }
        .v2-tool-tile { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .v2-tool-tile:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -22px rgba(26,23,18,0.4); }
        @media (prefers-reduced-motion: reduce) { .sx-dot-glow { animation: none; } }
        @media (max-width: 900px){ .sx-hiw-steps { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
