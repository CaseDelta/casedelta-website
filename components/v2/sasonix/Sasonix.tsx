"use client";

/**
 * CaseDelta homepage (route /v2), composed to Camren's 7-beat progressive-disclosure
 * framework on top of the Sasonix primitive kit:
 *   1. Hero            -> what Delta is, and the ask
 *   2. AutomationSection -> "What Delta is" (three capability cards)
 *   3. HowItWorks      -> how it works + integrates + onboards in 5 minutes (combined)
 *   4. Testimonials    -> real, attributable quotes only; empty today, renders nothing
 *   5. WhySasonix      -> Delta vs a generic AI chatbot
 *   6. Pricing         -> three flat tiers priced by account count
 *   7. CtaFooter    -> reinforcement and the ask
 *
 * SECTION SPACING CONVENTION: every section carries 60px top AND 60px bottom, so
 * the gap between any two is 120px and DELETING a section leaves its neighbours'
 * 60+60 intact. Do not go back to bottom-only padding: that was the old shape, and
 * removing BrandStrip under the hero silently collapsed the gap to zero.
 * Two exceptions, both deliberate: AutomationSection takes 120px on top because the
 * hero is full bleed and contributes no half-gap, and HowItWorks paints a
 * background so it owns internal padding plus a 60px outer margin on each side.
 *
 * Copy is CaseDelta; the visual identity is still the Sasonix placeholder (orange,
 * cream, hotlinked imagery) and flips on the tokens.ts rebrand. The unused Sasonix
 * primitives (AutomationFlow, HowToWork, SmartFlow, Integrations, Faq) are kept in the
 * repo as a library for future pages.
 */
import { MotionConfig } from "framer-motion";
import { SX } from "./tokens";
import { ThemeVars, useThemeOverride } from "./ThemeVars";
import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Stakes } from "./Stakes";
import { AutomationSection } from "./AutomationSection";
import { UseCases } from "./UseCases";
import { HowItWorks } from "./HowItWorks";
import { Testimonials } from "./Testimonials";
import { Trust } from "./Trust";
import { Pricing } from "./Pricing";
import { CtaFooter } from "./CtaFooter";

export function Sasonix() {
  const theme = useThemeOverride();
  return (
    <MotionConfig reducedMotion="user">
    <ThemeVars />
    <div data-sx-theme={theme} style={{ background: SX.bg, color: SX.ink, minHeight: "100vh" }}>
      <SmoothScroll />
      <Nav />
      {/* 1. Hero */}
      <Hero />
      {/* 2. The stakes: the pain, and the evening they want back */}
      <Stakes />
      {/* 3. What Delta is */}
      <AutomationSection />
      {/* 3. How it works, onboarding and the stack, in one banded section */}
      <HowItWorks />
      {/* 4. Testimonials: renders nothing until there are real, attributable quotes.
             Kept mounted so that adding one to Testimonials.tsx is the only step. */}
      <Testimonials />
      {/* 5. The work, cut by practice area */}
      <UseCases />
      {/* 6. Trust: the objection a firm actually raises */}
      <Trust />
      {/* 7. Pricing */}
      <Pricing />
      {/* 8. Reinforcement + CTA */}
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
    </MotionConfig>
  );
}
