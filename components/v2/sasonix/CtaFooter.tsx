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
import { useState } from "react";
import Image from "next/image";
import { SX } from "./tokens";
import { LOGO, logoWidth } from "./brand";
import { Reveal } from "./reveal";
import { scrollToSection } from "./scrollToSection";

/**
 * The site map. `id` is a homepage section, `href` a real route.
 *
 * The Product column used to list five pages: /features, /use-cases, /pricing,
 * /security and /compare. All five were folded into the homepage on 2026-09-02 and
 * redirect to the sections named here, so linking the anchor directly saves the
 * reader a redirect and keeps the footer honest about what exists.
 *
 * An `id` link still renders a real href ("/#features"), so it is a working link
 * with the middle button, on another page, and with JavaScript off. The click
 * handler only upgrades a same-page jump into the eased scroll.
 *
 * The Product column runs in the page's own top-to-bottom order, and matches the
 * nav's. Security before pricing, because Trust comes before Pricing on the page.
 */
const COLS: { head: string; links: { label: string; href?: string; id?: string }[] }[] = [
  {
    head: "Product",
    links: [
      { label: "What it does", id: "features" },
      { label: "Why Delta", id: "why" },
      { label: "Security", id: "security" },
      { label: "Pricing", id: "pricing" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Answers", href: "/answers" },
      { label: "Contact", href: "/demo" },
    ],
  },
  {
    head: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

/** Footer lockup. Always the dark cut: the footer surface is light in every theme
 *  that ships, and the glow behind it is a tint, not a fill. */
function Wordmark() {
  const h = 34;
  return (
    <Image
      src={LOGO.onLight}
      alt="CaseDelta"
      width={LOGO.width}
      height={LOGO.height}
      style={{ width: logoWidth(h), height: h, objectFit: "contain" }}
    />
  );
}

/* Layered "sunrise" glow: concentric blurred orange circles centered on the page's
   bottom edge. Measured verbatim from the live Framer "Shape" stack (outer faint halo
   -> orange mids -> near-white core). overflow:hidden on the parent clips the lower half. */
function FooterGlow() {
  const layers = [
    { d: 424, bg: "color-mix(in srgb, var(--sx-accent) 24%, transparent)", blur: 50 },
    { d: 365, bg: "var(--sx-accent)", blur: 50 },
    { d: 301, bg: "color-mix(in srgb, var(--sx-accent) 82%, white)", blur: 20 },
    { d: 242, bg: "color-mix(in srgb, var(--sx-accent) 52%, white)", blur: 27.5 },
    { d: 242, bg: "var(--sx-accent)", blur: 12.5 },
    { d: 178, bg: "color-mix(in srgb, var(--sx-accent) 90%, white)", blur: 15 },
    { d: 123, bg: "color-mix(in srgb, var(--sx-accent) 14%, white)", blur: 12.5 },
  ];
  return (
    <div aria-hidden style={{ position: "absolute", left: "50%", bottom: -30, width: 0, height: 0, zIndex: 0, pointerEvents: "none" }}>
      {layers.map((l, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: l.d, height: l.d, transform: "translate(-50%,-50%)", borderRadius: "100%", background: l.bg, filter: `blur(${l.blur}px)` }} />
      ))}
    </div>
  );
}

/**
 * LinkedIn is the only profile CaseDelta actually has (it is also the one claimed in
 * the Organization JSON-LD on /about). The X, Facebook and Instagram icons that
 * shipped with the template pointed at href="#", which is a dead link on a real site.
 * Add an entry here when a profile genuinely exists.
 */
const SOCIALS: { label: string; href: string; path: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/casedelta", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.555V9h3.559v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" },
];

function Socials() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      {SOCIALS.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="sx-social">
          <svg width="19" height="19" viewBox="0 0 24 24" fill={SX.ink} aria-hidden><path d={s.path} /></svg>
        </a>
      ))}
    </div>
  );
}

/**
 * The closing email capture. Posts to /api/send, the same Resend route the pricing
 * and demo forms use, with source "home" so the notification says where it came from.
 *
 * The route required a name until 2026-08-28 and now does not, which is what lets
 * this be a single field. If it starts rejecting email-only posts again, that
 * requirement came back.
 *
 * Failure is shown in the form rather than in an alert(). The other form on the site
 * still alerts; that is worth fixing there too.
 */
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "home" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <p className="sx-cta-done" role="status">
        Thank you. We will be in touch at {email}.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="sx-cta-form">
      <label htmlFor="sx-cta-email" className="sx-cta-label">Work email</label>
      <div className="sx-cta-row">
        <input
          id="sx-cta-email"
          className="sx-cta-input"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@yourfirm.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state === "error" || undefined}
          aria-describedby={state === "error" ? "sx-cta-error" : undefined}
        />
        <button type="submit" className="sx-btn sx-cta-submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Get a walkthrough"}
        </button>
      </div>
      {state === "error" && (
        <p id="sx-cta-error" className="sx-cta-error" role="alert">{error}</p>
      )}
      <p className="sx-cta-alt">
        Or <a href="/demo" className="sx-cta-alt-link">book a time</a> and see it on a real file.
      </p>
      <style>{`
        .sx-cta-form { margin: 36px auto 0; max-width: 560px; text-align: left; }
        /* The label is for assistive technology; the placeholder carries it visually,
           and a placeholder alone leaves a screen reader with an unnamed field. */
        .sx-cta-label {
          position: absolute; width: 1px; height: 1px;
          margin: -1px; padding: 0; border: 0;
          overflow: hidden; clip-path: inset(50%); white-space: nowrap;
        }
        .sx-cta-row { display: flex; gap: 10px; }
        .sx-cta-input {
          flex: 1 1 auto;
          min-width: 0;
          padding: 16px 18px;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 17px;
          color: var(--sx-ink);
          background: var(--sx-surface);
          border: 1px solid var(--sx-hairline);
          border-radius: 12px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .sx-cta-input::placeholder { color: var(--sx-ink-3); }
        .sx-cta-input:focus-visible {
          border-color: var(--sx-accent);
          box-shadow: 0 0 0 3px var(--sx-accent-soft);
        }
        .sx-cta-submit {
          flex: 0 0 auto;
          border: 0;
          cursor: pointer;
          background: var(--sx-ink);
          color: var(--sx-surface);
          border-radius: 12px;
          padding: 16px 26px;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 17px;
          font-weight: 500;
          white-space: nowrap;
        }
        .sx-cta-submit:disabled { opacity: 0.6; cursor: default; }
        .sx-cta-error {
          margin: 12px 0 0;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 15px;
          color: var(--sx-accent-text);
        }
        .sx-cta-alt {
          margin: 16px 0 0;
          text-align: center;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 16px;
          color: var(--sx-ink-2);
        }
        .sx-cta-alt-link { color: var(--sx-accent-text); text-decoration: none; font-weight: 500; }
        .sx-cta-alt-link:hover { text-decoration: underline; }
        .sx-cta-done {
          margin: 36px auto 0;
          max-width: 560px;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 18px;
          line-height: 28px;
          color: var(--sx-ink);
        }
        @media (max-width: 620px) {
          .sx-cta-row { flex-direction: column; }
          .sx-cta-submit { width: 100%; }
        }
      `}</style>
    </form>
  );
}

export function CtaFooter({ showCta = true }: { showCta?: boolean } = {}) {
  return (
    <div id={showCta ? "contact" : undefined} style={{ position: "relative", overflow: "hidden", background: SX.bgAlt }}>
      {/* faint grid (masked to the CTA area) */}
      {showCta && (
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.55, backgroundImage: `linear-gradient(${SX.hairline} 1px, transparent 1px), linear-gradient(90deg, ${SX.hairline} 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(80% 55% at 50% 30%, black, transparent)", WebkitMaskImage: "radial-gradient(80% 55% at 50% 30%, black, transparent)" }} />
      )}
      {/* layered sunrise glow at the bottom-center edge */}
      <FooterGlow />

      {/* CTA */}
      {showCta && (
      <Reveal style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "clamp(90px,10vw,140px) 40px 40px", textAlign: "center" }}>
        <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: "0 auto", maxWidth: 760 }}>
          An associate that knows the whole case, and does the work. The judgment stays yours.
        </h2>
        <p style={{ fontFamily: SX.body, fontSize: 18, lineHeight: "30.6px", color: SX.ink2, margin: "20px auto 0", maxWidth: 560 }}>
          Leave your email and we will show you Delta on your own cases.
        </p>
        {/* An email field, not a button, since 2026-08-28. This band was an inline
            Calendly scheduler, then a link to /demo. Both asked for a calendar slot,
            which is the largest commitment on the page, from the reader least ready
            to make it. An address is the smallest useful thing someone can give, and
            the demo link is still one line below for anyone who is ready.

            ONE FIELD ONLY. The API accepts a name and does not require one; every
            extra box on a closing capture costs completions. */}
        <EmailCapture />
      </Reveal>
      )}

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "clamp(56px,7vw,90px) 40px 44px" }}>
        <Reveal className="sx-foot-grid" style={{ display: "grid", gridTemplateColumns: "740fr 166fr 219fr 155fr", gap: 0 }}>
          <div style={{ maxWidth: 420 }}>
            <Wordmark />
            <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, marginTop: 18 }}>
              CaseDelta is an AI associate for law firms. It works inside the tools you already use and handles the routine case work, so your team runs more cases without hiring.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.head}>
              <div style={{ fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink, marginBottom: 16 }}>{col.head}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href ?? `/#${l.id}`}
                    onClick={l.id ? (e) => { e.preventDefault(); scrollToSection(l.id as string); } : undefined}
                    className="sx-navlink"
                    style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink2, textDecoration: "none" }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="sx-foot-base" delay={0.06} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginTop: 60, paddingTop: 28, borderTop: `1px solid ${SX.hairline}`, flexWrap: "wrap" }}>
          <span style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>© 2026 CaseDelta. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>Follow us on:</span>
            <Socials />
          </div>
        </Reveal>
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
