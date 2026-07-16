"use client";

/**
 * CaseDelta homepage (route /v2), composed to Camren's 7-beat progressive-disclosure
 * framework on top of the Sasonix primitive kit:
 *   1. Hero            -> the dream outcome ("Run more cases without hiring")
 *      + BrandStrip    -> trust strip riding under the hero (placeholder logos)
 *   2. AutomationSection -> "What Delta is" (three capability cards)
 *   3. HowItWorks      -> how it works + integrates + onboards in 5 minutes (combined)
 *   4. Testimonials    -> one real, attributable quote
 *   5. WhySasonix      -> Delta vs a generic AI chatbot
 *   6. Pricing         -> three flat tiers priced by attorney count
 *   7. Faq + CtaFooter -> reinforcement and the ask
 *
 * Copy is CaseDelta; the visual identity is still the Sasonix placeholder (orange,
 * cream, hotlinked imagery) and flips on the tokens.ts rebrand. The unused Sasonix
 * primitives (AutomationFlow, HowToWork, SmartFlow, Integrations) are kept in the repo
 * as a library for future pages.
 */
import { SX } from "./tokens";
import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { BrandStrip } from "./BrandStrip";
import { AutomationSection } from "./AutomationSection";
import { HowItWorks } from "./HowItWorks";
import { Testimonials } from "./Testimonials";
import { WhySasonix } from "./WhySasonix";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { CtaFooter } from "./CtaFooter";

export function Sasonix() {
  return (
    <div style={{ background: SX.white, color: SX.ink, minHeight: "100vh" }}>
      <SmoothScroll />
      <Nav />
      {/* 1. Hero: the dream outcome + trust strip */}
      <Hero />
      <BrandStrip />
      {/* 2. What Delta is */}
      <AutomationSection />
      {/* 3. How it works + integrates + onboards in 5 minutes */}
      <HowItWorks />
      {/* 4. Testimonial */}
      <Testimonials />
      {/* 5. Delta vs a generic AI chatbot */}
      <WhySasonix />
      {/* 6. Pricing */}
      <Pricing />
      {/* 7. Reinforcement + CTA */}
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
