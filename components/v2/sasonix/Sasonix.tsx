"use client";

/**
 * Sasonix pixel-exact clone (route /v2). Built section-by-section against the live
 * site (https://sasonix.framer.website/) with a Playwright pixel-diff gate. Sasonix
 * as-is now; rebrand to CaseDelta later by swapping tokens.ts.
 *
 * Sections (Framer's own names): Hero, Brand strip, Automation Flow, Automation
 * (3 feature cards), How to Work, Smart Process Flow, Integrations, Why Sasonix,
 * Testimonials, Pricing, FAQ, CTA, Footer. Currently: Hero.
 */
import { SX } from "./tokens";
import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { BrandStrip } from "./BrandStrip";
import { AutomationFlow } from "./AutomationFlow";
import { AutomationSection } from "./AutomationSection";
import { HowToWork } from "./HowToWork";
import { SmartFlow } from "./SmartFlow";
import { Integrations } from "./Integrations";
import { WhySasonix } from "./WhySasonix";
import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { CtaFooter } from "./CtaFooter";

export function Sasonix() {
  return (
    <div style={{ background: SX.white, color: SX.ink, minHeight: "100vh" }}>
      <SmoothScroll />
      <Nav />
      <Hero />
      <BrandStrip />
      <AutomationFlow />
      <AutomationSection />
      <HowToWork />
      <SmartFlow />
      <Integrations />
      <WhySasonix />
      <Testimonials />
      <Pricing />
      <Faq />
      <CtaFooter />
      {/* Shared hover polish (nav links dim, logo softens, buttons scale up). */}
      <style>{`
        .sx-navlink { transition: opacity 0.2s ease, color 0.3s ease; }
        .sx-navlink:hover { opacity: 0.6; }
        .sx-logo { transition: opacity 0.2s ease; }
        .sx-logo:hover { opacity: 0.82; }
        .sx-btn { transition: transform 0.24s cubic-bezier(0.22,1,0.36,1); will-change: transform; }
        .sx-btn:hover { transform: scale(1.04); }
        @media (prefers-reduced-motion: reduce) { .sx-btn { transition: none; } .sx-btn:hover { transform: none; } }
      `}</style>
    </div>
  );
}
