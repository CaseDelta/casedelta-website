"use client";

/**
 * Cta & Footer (live top 10407): a centered CTA band on a faint grid background, then
 * the footer (logo + blurb + 3 link columns + copyright + socials) on a warm cream
 * field with an orange radial glow.
 */
import { SX } from "./tokens";

const COLS = [
  { head: "Main Pages", links: ["About", "Pricing", "Careers", "Case Study", "Blogs", "Contact us"] },
  { head: "Inner Pages", links: ["Blog details", "Case Study Details", "Career details"] },
  { head: "Other pages", links: ["Privacy policy", "Terms and conditions", "404 error"] },
];

function Wordmark() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span aria-hidden style={{ width: 34, height: 34, borderRadius: 9, background: SX.orange, display: "grid", placeItems: "center" }}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff"><path d="M12 3l3.2 5.5H8.8L12 3zM6 10.5l3.2 5.5H2.8L6 10.5zm12 0l3.2 5.5h-6.4L18 10.5z" /></svg>
      </span>
      <span style={{ fontFamily: SX.body, fontWeight: 600, fontSize: 24, letterSpacing: "-0.4px", color: SX.ink }}>Sasonix</span>
    </span>
  );
}

export function CtaFooter() {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: SX.cream }}>
      {/* faint grid + orange glow */}
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.55, backgroundImage: `linear-gradient(${SX.hairline} 1px, transparent 1px), linear-gradient(90deg, ${SX.hairline} 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(80% 55% at 50% 30%, black, transparent)", WebkitMaskImage: "radial-gradient(80% 55% at 50% 30%, black, transparent)" }} />
      <div aria-hidden style={{ position: "absolute", left: "50%", bottom: -240, width: 720, height: 460, transform: "translateX(-50%)", background: `radial-gradient(circle, rgba(255,112,41,0.18), transparent 62%)` }} />

      {/* CTA */}
      <div style={{ position: "relative", maxWidth: 1360, margin: "0 auto", padding: "clamp(90px,10vw,140px) 40px 40px", textAlign: "center" }}>
        <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: "0 auto", maxWidth: 620 }}>
          Automate your business with AI-powered solutions
        </h2>
        <p style={{ fontFamily: SX.body, fontSize: 18, lineHeight: "30.6px", color: SX.ink2, margin: "20px auto 0", maxWidth: 560 }}>
          Turn ideas into execution with intelligent ai agents that plan, act, and deliver results automatically.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 34 }}>
          <a href="#" className="sx-btn" style={{ background: SX.ink, color: "#fff", borderRadius: 12, padding: "14px 24px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none", ["--v2-btn-hover" as string]: "#2c2820" }}>Get Started Free</a>
          <a href="#" className="sx-btn-outline" style={{ background: "transparent", color: SX.ink, border: "1px solid rgba(26, 23, 18, 0.18)", borderRadius: 12, padding: "14px 24px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>Book a Demo</a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ position: "relative", maxWidth: 1360, margin: "0 auto", padding: "clamp(56px,7vw,90px) 40px 44px" }}>
        <div className="sx-foot-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40 }}>
          <div style={{ maxWidth: 320 }}>
            <Wordmark />
            <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, marginTop: 18 }}>
              Sasonix is an AI agent platform that helps teams automate workflows, reduce manual effort, and scale operations with smarter execution.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.head}>
              <div style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink, marginBottom: 16 }}>{col.head}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <a key={l} href="#" className="sx-navlink" style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink2, textDecoration: "none" }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="sx-foot-base" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginTop: 60, paddingTop: 28, borderTop: `1px solid ${SX.hairline}`, flexWrap: "wrap" }}>
          <span style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>© 2026 Sasonix. All Rights Reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>Follow us on:</span>
            {["x", "facebook", "instagram", "linkedin"].map((s) => (
              <span key={s} style={{ width: 34, height: 34, borderRadius: 8, background: SX.ink, display: "grid", placeItems: "center", color: "#fff" }} aria-hidden>
                <span style={{ fontFamily: SX.mono, fontSize: 12 }}>{s[0].toUpperCase()}</span>
              </span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 860px){ .sx-foot-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } .sx-foot-base { flex-direction: column; align-items: flex-start; } }
        @media (max-width: 520px){ .sx-foot-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
