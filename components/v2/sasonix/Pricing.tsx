"use client";

/**
 * Beat 6: Pricing. Priced per FIRM by account count, flat monthly, with no
 * per-seat multiplier. That is the wedge against per-seat research tools. The
 * numbers, the bands and every derived figure live in lib/pricing.ts and are not
 * to be retyped here; this file owns how they LOOK and nothing about what they are.
 *
 * This used to read "regardless of staff size", which is the retired unlimited-staff
 * claim and is false: an account is a login, so staff DO count against the band.
 * The header of lib/pricing.ts has the whole reasoning. Do not reintroduce it.
 *
 * This was three SaaS pricing cards with a highlighted middle tier until
 * 2026-08-28. It is now three horizontal line items that expand, and the highlight
 * is gone. Both of those matter and neither is decoration:
 *
 *   - Cards invite comparison shopping between the tiers. There is nothing to
 *     compare. The value is identical in all three and the only variable is how
 *     many accounts the firm provisions, so a row that reads "band ....... price"
 *     answers the actual question and a card full of repeated checkmarks does not.
 *   - A featured middle tier tells a reader that one band is the normal choice and
 *     the other two are the compromise. Account count is a fact about the firm, not
 *     a preference, so steering is worse than useless here: it makes a five-person
 *     firm feel like it is buying the cheap one. All three rows are styled
 *     identically. Do not reintroduce a "most popular" badge.
 *
 * FLAT IS SAID OUTRIGHT (Camren, 2026-08-28). It was implicit before: the bands are
 * account counts, so a careful reader could work out that the price is per firm, and
 * a skimming one read three numbers and assumed a per-seat ladder like every other
 * legal tool they have priced. It is the single most important fact in this section
 * and the one thing a prospect gets wrong unprompted.
 *
 * THE SUBHEAD IS ONE SENTENCE AND STAYS ONE SENTENCE. It briefly carried "Never per
 * seat" plus a sentence ruling out the other things that do not move the price, and
 * Camren cut both the same day. The rows underneath already say what the bands are,
 * so the elaboration was answering a question the reader had not asked yet.
 *
 * THE ROWS ARE NOT CLICKABLE ANY MORE. Each one expanded to "20 automations
 * included, $104.95 per account, $25,188 a year". Camren cut the disclosure and all
 * three figures on 2026-08-28. The arithmetic was derived and correct and it was
 * still the wrong thing to show: the annual figure is the largest number on the page
 * and a reader met it before knowing what they were buying, and cost per account
 * invites exactly the per-seat comparison this pricing exists to refuse. Do not put
 * a per-account or annual figure back anywhere near the tiers.
 *
 * What replaced it is PricingExtras: the guarantee, and what automations actually
 * are, with real examples from real firms. That is what a reader wants at this
 * moment, and it does not need a click.
 *
 * There are still no hours-saved figures, payback periods or percentages IN THE
 * TIERS. The guarantee below is a commercial promise Camren is making, which is a
 * different thing from a productivity statistic invented to fill a pricing page.
 */
import { motion } from "framer-motion";
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal, revealProps } from "./reveal";
import { TIERS, TOP_BAND_ACCOUNTS } from "@/lib/pricing";

export function Pricing() {
  return (
    <section id="pricing" style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <Container>
        <Reveal>
          {/* ONE LINE, NOT TWO (Camren, 2026-09-02). This was a heading, "Delta
              does the work of multiple staff members. You pay a fraction of
              one.", over a bolded sub, "One flat price for the whole firm."
              Both said the same thing at different volumes, and the heading
              spent two sentences setting up a comparison the prices underneath
              make on their own.

              "A fraction of payroll." led that line for one revision and was cut
              the same day. The salary comparison is still the argument this
              section rests on, and it is now made by the prices themselves and
              by the comparison table on the page, rather than announced.

              No sub: the tiers are the next thing, and a line between them and
              this would be a line about nothing. */}
          <SectionHead
            title="One flat price for the whole firm."
            titleMaxW={780}
          />
        </Reveal>

        {/* Three equivalent bands as rows. No cards, no featured tier. */}
        <div style={{ maxWidth: 860, margin: "52px auto 0", borderTop: `1px solid ${SX.hairline}` }}>
          {TIERS.map((t, i) => (
              <motion.div key={t.band} {...revealProps({ delay: i * 0.06, amount: 0.3 })} style={{ borderBottom: `1px solid ${SX.hairline}` }}>
                <div
                  className="sx-price-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 20,
                    padding: "26px 4px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="sx-price-band" style={{ fontFamily: SX.body, fontSize: 19, fontWeight: 500, color: SX.ink }}>
                      {t.band}
                    </span>
                  </span>
                  <span style={{ display: "flex", alignItems: "baseline", gap: 6, flex: "0 0 auto" }}>
                    <span className="sx-price-amt" style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 40, letterSpacing: "-1px", color: SX.ink, lineHeight: 1 }}>
                      {t.price}
                    </span>
                    <span className="sx-price-per" style={{ fontFamily: SX.body, fontSize: 17, fontWeight: 400, color: SX.ink2 }}>/month</span>
                  </span>
                </div>
              </motion.div>
          ))}

          {/* THE OVERFLOW BAND IS A ROW, not a footnote (Camren, 2026-09-02). It
              was a sentence under the table, "More than N accounts? Contact us
              for a custom plan.", which put the largest firms outside the thing
              they were reading. A firm at 25 accounts is a customer, not an
              exception, and the table is the place that answers "what do I pay".

              It is NOT a TIERS entry. TIERS carries a monthly number that
              annualCost and perAccount do arithmetic on, and TOP_BAND_ACCOUNTS
              is derived from its last element, so a fourth entry with no price
              would either break those or need a fake one. The band label reads
              off TOP_BAND_ACCOUNTS so it follows the table rather than repeating
              a number that lives in lib/pricing.ts. */}
          <motion.div {...revealProps({ delay: TIERS.length * 0.06, amount: 0.3 })} style={{ borderBottom: `1px solid ${SX.hairline}` }}>
            <div
              className="sx-price-row"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 20,
                padding: "26px 4px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="sx-price-band" style={{ fontFamily: SX.body, fontSize: 19, fontWeight: 500, color: SX.ink }}>
                  More than {TOP_BAND_ACCOUNTS} accounts
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: 6, flex: "0 0 auto" }}>
                {/* Set at the price size, not as body copy: it occupies the same
                    slot as $599 and has to read as an answer to the same
                    question, not as an apology for not having one. */}
                <a
                  href="/demo"
                  className="sx-price-custom"
                  style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 40, letterSpacing: "-1px", color: SX.accentText, lineHeight: 1, textDecoration: "none" }}
                >
                  Let&rsquo;s talk
                </a>
              </span>
            </div>
          </motion.div>
        </div>

      </Container>

      <Container>
        <Reveal>
          <div style={{ maxWidth: 860, margin: "50px auto 0", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 20, flexWrap: "wrap" }} className="sx-price-foot">
            <a href="/demo" className="sx-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: SX.ink, color: SX.surface, borderRadius: 12, padding: "14px 26px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, textDecoration: "none", ["--v2-btn-hover" as string]: SX.accentDeep }}>
              Book a demo
            </a>
          </div>
        </Reveal>
      </Container>
      <style>{`
        .sx-price-custom { transition: color 0.2s ease; }
        .sx-price-custom:hover { color: var(--sx-accent); text-decoration: underline; }

        /* Narrow screens: shrink the row rather than stacking it. The band and the
           price belong on one line, which is the whole point of a line item, and at
           these sizes the longest pair still fits a 360px viewport. */
        @media (max-width: 560px) {
          .sx-price-row { padding: 20px 2px !important; gap: 12px !important; }
          .sx-price-band { font-size: 16px !important; white-space: nowrap; }
          .sx-price-amt, .sx-price-custom { font-size: 30px !important; }
          /* "/month" contracts to "/mo" so the longest pair still holds one line. */
          .sx-price-per { font-size: 0 !important; }
          .sx-price-per::after { content: "/mo"; font-size: 14px; }
        }
        @media (max-width: 700px) {
          .sx-price-foot { flex-direction: column !important; align-items: stretch !important; }
          .sx-price-foot p { text-align: center; }
        }
      `}</style>
    </section>
  );
}
