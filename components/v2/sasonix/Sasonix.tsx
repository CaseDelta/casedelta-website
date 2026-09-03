"use client";

/**
 * The CaseDelta homepage. Restructured 2026-08-28 (Camren), and again 2026-09-02:
 *   1. Hero              -> what Delta is, and the ask. Carries the firm belt,
 *                           overlaid on the photograph along the bottom of the
 *                           fold (PLACEHOLDER NAMES, see FirmMarquee.tsx)
 *   2. Stakes            -> the problem, in one sentence
 *   3. AutomationSection -> what Delta is, in three capability cards
 *   4. Testimonials      -> proof, before any argument about why we are different
 *   5. WhySasonix        -> why it is different: the Context Wedge, proved row by row
 *   6. Trust             -> security, the objection a firm actually raises
 *   7. Pricing           -> three flat tiers priced by account count
 *   8. SecondProof       -> a second voice, the last word before the ask
 *   9. CtaFooter         -> the ask, an email address
 *
 * THE TWO PROOF SECTIONS STAY TWO. They were merged into a single two-card marquee
 * on 2026-09-02 and Camren reverted it the same day. The quotes do different jobs in
 * different places: Recker sits under AutomationSection as evidence for the
 * capability claim just made, Poletti sits after pricing as the last word before the
 * ask. Merging them stacks both arguments in one place and leaves the whole back half
 * of the page without a voice. Do not consolidate them again.
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
import { Stakes } from "./Stakes";
import { AutomationSection } from "./AutomationSection";
import { Testimonials } from "./Testimonials";
import { SecondProof } from "./SecondProof";
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
      {/* 2. The stakes: one sentence naming the headcount cap, and the question it sets up */}
      <Stakes />
      {/* 3. What Delta is, in three capability cards */}
      <AutomationSection />
      {/* 4. Proof, straight after the capability claim it is evidence for. Recker
             answers "does it really do that" while the claim is still on screen. */}
      <Testimonials />
      {/* 5. Why it is different: the Context Wedge, proved row by row */}
      <WhySasonix />
      {/* 6. Security: the objection a firm actually raises */}
      <Trust />
      {/* 7. Pricing */}
      <Pricing />
      {/* 8. A second, different voice: the last word before the ask. Renders nothing
             until there is a real quote in it; see SecondProof.tsx. */}
      <SecondProof />
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
