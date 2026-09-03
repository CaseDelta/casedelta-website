"use client";

/**
 * The CaseDelta homepage. Restructured 2026-08-28 (Camren), and again 2026-09-02:
 *   1. Hero              -> what Delta is, and the ask
 *   2. FirmMarquee       -> who else uses it (PLACEHOLDER NAMES, see that file)
 *   3. Stakes            -> the problem, in one sentence
 *   4. AutomationSection -> what Delta is, in three capability cards
 *   5. Testimonials      -> proof, before any argument about why we are different
 *   6. WhySasonix        -> why it is different: the Context Wedge, proved row by row
 *   7. Trust             -> security, the objection a firm actually raises
 *   8. Pricing           -> three flat tiers priced by account count
 *   9. CtaFooter         -> the ask, an email address
 *
 * THE TWO PROOF SECTIONS ARE NOW ONE (2026-09-02). A SecondProof section carried the
 * Poletti quote between pricing and the ask, four sections below the first quote.
 * Both quotes are in Testimonials now, which already renders a marquee at two or
 * more, so the page argues its proof once instead of twice.
 *
 * PROOF SITS BEFORE THE ARGUMENT, which is the reordering that matters most here.
 * A reader who has just been told what Delta does wants evidence, not a comparison
 * table; the table then lands on someone who already believes the thing works.
 *
 * THREE SECTIONS LEFT THE HOMEPAGE and are still in the repo, routed from nowhere.
 * IntegrationClose carried the five-minute onboarding argument under the heading
 * "Delta is working your cases this afternoon" and was replaced by SecondProof on
 * 2026-08-28. Putting it back is better than a gap here if that quote never lands.
 * Also:
 * HowItWorks (the onboarding band, now condensed into IntegrationClose and carried
 * in full on /features) and UseCases (the practice-area tabs, which live on
 * /use-cases). Both were removed rather than reordered: HowItWorks was the page's
 * second full-bleed dark band and cost the Trust band its impact, and UseCases sat
 * between proof and pricing arguing capability the reader had already accepted.
 * The nav's "The work" link now points at /use-cases rather than an anchor.
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
import { FirmMarquee } from "./FirmMarquee";
import { Stakes } from "./Stakes";
import { AutomationSection } from "./AutomationSection";
import { Testimonials } from "./Testimonials";
import { WhySasonix } from "./WhySasonix";
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
      {/* 2. The firm belt. Directly under the fold, where a reader who has just
             been told what Delta is asks who else uses it.
             ⚠️ THE NAMES ARE PLACEHOLDERS. See the banner in FirmMarquee.tsx. */}
      <FirmMarquee />
      {/* 3. The stakes: one sentence naming the headcount cap, and the question it sets up */}
      <Stakes />
      {/* 4. What Delta is, in three capability cards */}
      <AutomationSection />
      {/* 5. Proof, before any argument about why we are different. BOTH real quotes
             now, in one row; there is no second proof section further down. */}
      <Testimonials />
      {/* 6. Why it is different: the Context Wedge, proved row by row */}
      <WhySasonix />
      {/* 7. Security: the objection a firm actually raises */}
      <Trust />
      {/* 8. Pricing */}
      <Pricing />
      {/* 9. The ask: an email address */}
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
