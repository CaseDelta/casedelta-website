"use client";

/**
 * Cta & Footer (live top 10407, h979): a centered CTA band on a faint grid background,
 * flowing into the footer (logo + blurb + 3 link columns + copyright + socials) on a
 * warm cream field. A layered orange "sunrise" glow blooms from the bottom-center edge.
 *
 * Measured against the live (Playwright, desktop 1440):
 *  - Footer columns at exact x: logo x80, "Main Pages" x820, "Inner Pages" x986,
 *    "Other pages" x1205 (content 80..1360) -> grid 740:166:219:155.
 *  - Glow: a stack of concentric blurred circles (Framer "Shape" layers) centered on the
 *    page's bottom edge; the section clips overflow so only the rising top half shows.
 *  - Socials: plain dark brand glyphs (X, Facebook, Instagram, LinkedIn), no background box.
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

/* Layered "sunrise" glow: concentric blurred orange circles centered on the page's
   bottom edge. Measured verbatim from the live Framer "Shape" stack (outer faint halo
   -> orange mids -> near-white core). overflow:hidden on the parent clips the lower half. */
function FooterGlow() {
  const layers = [
    { d: 424, bg: "rgba(255,108,2,0.24)", blur: 50 },
    { d: 365, bg: "rgb(255,112,41)", blur: 50 },
    { d: 301, bg: "rgb(252,151,78)", blur: 20 },
    { d: 242, bg: "rgb(251,190,145)", blur: 27.5 },
    { d: 242, bg: "rgb(255,112,41)", blur: 12.5 },
    { d: 178, bg: "rgb(245,137,59)", blur: 15 },
    { d: 123, bg: "rgb(253,236,224)", blur: 12.5 },
  ];
  return (
    <div aria-hidden style={{ position: "absolute", left: "50%", bottom: -30, width: 0, height: 0, zIndex: 0, pointerEvents: "none" }}>
      {layers.map((l, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: l.d, height: l.d, transform: "translate(-50%,-50%)", borderRadius: "100%", background: l.bg, filter: `blur(${l.blur}px)` }} />
      ))}
    </div>
  );
}

const SOCIALS: { label: string; path: string }[] = [
  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" },
  { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" },
  { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.227.415.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.249 1.805-.413 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.382.896-.422.164-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.053-1.805-.249-2.227-.413a3.716 3.716 0 0 1-1.382-.896 3.716 3.716 0 0 1-.896-1.382c-.164-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.249-1.805.413-2.227.217-.562.477-.961.896-1.381.42-.42.82-.679 1.382-.896.422-.166 1.057-.362 2.227-.415C8.416 2.175 8.796 2.163 12 2.163Zm0 3.678a6.159 6.159 0 1 0 0 12.318 6.159 6.159 0 0 0 0-12.318ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" },
  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.555V9h3.559v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" },
];

function Socials() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      {SOCIALS.map((s) => (
        <a key={s.label} href="#" aria-label={s.label} className="sx-social">
          <svg width="19" height="19" viewBox="0 0 24 24" fill={SX.ink} aria-hidden><path d={s.path} /></svg>
        </a>
      ))}
    </div>
  );
}

export function CtaFooter() {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: SX.cream }}>
      {/* faint grid (masked to the CTA area) */}
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.55, backgroundImage: `linear-gradient(${SX.hairline} 1px, transparent 1px), linear-gradient(90deg, ${SX.hairline} 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(80% 55% at 50% 30%, black, transparent)", WebkitMaskImage: "radial-gradient(80% 55% at 50% 30%, black, transparent)" }} />
      {/* layered sunrise glow at the bottom-center edge */}
      <FooterGlow />

      {/* CTA */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "clamp(90px,10vw,140px) 40px 40px", textAlign: "center" }}>
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
      <footer style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "clamp(56px,7vw,90px) 40px 44px" }}>
        <div className="sx-foot-grid" style={{ display: "grid", gridTemplateColumns: "740fr 166fr 219fr 155fr", gap: 0 }}>
          <div style={{ maxWidth: 420 }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>Follow us on:</span>
            <Socials />
          </div>
        </div>
      </footer>

      <style>{`
        .sx-social { display: grid; place-items: center; opacity: 0.9; transition: opacity 0.2s ease, transform 0.2s ease; }
        .sx-social:hover { opacity: 0.55; transform: translateY(-1px); }
        @media (max-width: 900px){ .sx-foot-grid { grid-template-columns: 1.4fr 1fr 1fr 1fr !important; gap: 24px !important; } }
        @media (max-width: 720px){ .sx-foot-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } .sx-foot-base { flex-direction: column; align-items: flex-start; } }
        @media (max-width: 460px){ .sx-foot-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
