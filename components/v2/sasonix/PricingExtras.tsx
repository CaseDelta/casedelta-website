"use client";

/**
 * The guarantee, under the tier rows.
 *
 * WHY IT IS HERE RATHER THAN IN THE ROWS. Each tier used to expand to a
 * disclosure reading "20 automations included, $104.95 per account, $25,188 a year".
 * Camren cut all of it on 2026-08-28. The arithmetic was derived and correct, and it
 * was still the wrong thing to show: an annual figure is the largest number on the
 * page and the reader meets it before they know what they are buying, and cost per
 * account invites the per-seat comparison this pricing exists to refuse. What a firm
 * wants at that moment is what the money buys and what happens if it does not.
 * Do not reintroduce a per-account or annual figure anywhere near the tiers.
 *
 * AN "EVERY PLAN INCLUDES AUTOMATIONS" BLOCK LIVED HERE and was cut on 2026-08-28,
 * the same day it went in. It was arguing capability on a pricing surface, which is
 * where a reader has already decided they want the thing and is working out what it
 * costs. The automations argument and its real examples moved up into the third
 * capability card in AutomationSection, where capability belongs. Do not bring it
 * back down here.
 *
 * THE GUARANTEE IS A COMMERCIAL PROMISE, not copy. It commits the company to a
 * refund. Camren's wording, deliberately without a number: a specific figure would
 * be a stronger claim and a harder one to honour across firms of different shapes.
 * If a number ever goes in, it needs to be one someone is prepared to pay out on.
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

export function PricingExtras() {
  return (
    <Container>
      <Reveal>
        <p className="sx-guarantee">
          Guaranteed hours back every week, for every person, or your money back.
        </p>
      </Reveal>

      <style>{`
        .sx-guarantee {
          max-width: 860px;
          margin: 44px auto 0;
          padding: 22px 26px;
          border: 1px solid var(--sx-accent);
          border-radius: 14px;
          background: var(--sx-accent-soft);
          text-align: center;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 19px;
          line-height: 29px;
          font-weight: 500;
          color: var(--sx-ink);
        }

        @media (max-width: 760px) {
          .sx-guarantee { font-size: 17px; line-height: 27px; padding: 18px 20px; }
        }
      `}</style>
    </Container>
  );
}
