"use client";

/**
 * Trust, as the page's second full-bleed band.
 *
 * THE HEADING IS "Security first." (Camren, 2026-08-28). It read "Safe to put a
 * client file in", which named the objection but buried the category; a reader
 * scanning for whether this is the security section had to parse a sentence first.
 *
 * WHY IT IS A BAND: the objection a firm actually raises is not "how is this
 * different from ChatGPT", it is "can I put a client file in it". That question
 * deserves to interrupt the page rather than sit in three cream cards the eye
 * slides past. Camren answers it in every prospect thread with an analogy that does
 * more work than any spec sheet: a paralegal would never take client files home.
 *
 * THE BACKDROP IS horizon-blue (Camren, 2026-08-28), after forest-dark and then
 * water-dark were both rejected. Worth knowing before the next swap: the ambient set
 * has EIGHT images and only TWO of them are dark, and those two are the ones already
 * turned down. This one is pale, so it only works because the scrim below is heavy
 * (0.78 / 0.64 / 0.80). If the scrim is ever lightened, this section becomes
 * unreadable white-on-white. Measured after the swap: the heading holds well above
 * AA against the scrimmed image.
 *
 * IT ALSO APPEARS IN AutomationSection's first capability card, which is a duplicate
 * on one page. It reads differently at that size and behind a floating panel, but
 * the honest fix is a new dark asset in /public/v2/ambient rather than a ninth reuse
 * of the same eight.
 *
 * NO GLASS CARDS. The three statements sit directly on the image, divided by
 * hairlines. Card chrome reads as UI; bare type on a dark field reads as a
 * statement, which is the right register for a trust claim.
 *
 * WHAT THE THREE POINTS MUST COVER (Camren, 2026-08-28): the paralegal metaphor,
 * HIPAA and bar compliance including PHI, and what happens to the data once a
 * request leaves the firm. In that order, because the metaphor earns the reader's
 * attention for the two compliance claims that follow it.
 *
 * TWO CLAIMS WERE ASKED FOR AND ARE NOT WRITTEN HERE, both because they are false
 * against our own systems and against casedelta.com/security. Do not add them.
 *
 *   "Delta never stores anything." Production stores case documents in S3 and PHI
 *   arrives through that path today. Integration reads are cached as well. The true
 *   version is the one below: Delta works where the records already live.
 *
 *   "No client data is sent to third-party providers or AI." Delta runs on
 *   enterprise models from an outside provider. /security says so outright, in a
 *   FAQ answer that begins "Yes, and we are direct about it, the same way Clio and
 *   MyCase are." A homepage that denies it puts two contradictory answers on one
 *   site, which is exactly the defect the pricing rewrite existed to fix. The
 *   defensible claim, and the one used here and on /security, is what the provider
 *   may DO with the data: never trained on, never retained, never sold or shared,
 *   under an enterprise agreement, isolated per firm.
 *
 * THE "TRUST" PILL IS GONE, along with every other section eyebrow on this page.
 */
import { motion } from "framer-motion";
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal, revealProps } from "./reveal";

const BAND_IMAGE = "/v2/ambient/horizon-blue.webp";

const POINTS: { title: string; body: string[] }[] = [
  {
    title: "A paralegal does not take the records home",
    body: [
      "Neither does Delta.",
      "It works inside your systems, where your records already live, and leaves them there.",
    ],
  },
  {
    title: "Safe for protected health information",
    body: [
      "HIPAA and bar compliant.",
      "Medical records and identifiable health information are in scope, and we sign a BAA.",
    ],
  },
  {
    title: "Your client data is never the product",
    body: [
      "It never trains a model, and it is never sold or shared.",
      "The provider keeps nothing once a request completes, and your firm is walled off from every other firm.",
    ],
  },
];

export function Trust() {
  return (
    <section
      id="security"
      className="sx-trust-band"
      style={{ position: "relative", overflow: "hidden", padding: "112px 0 120px", margin: "60px 0" }}
    >
      {/* full-width ambient backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BAND_IMAGE}
        alt=""
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      />
      {/* bare type rather than glass panels, so this band scrims harder than the other */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(var(--sx-scrim-rgb),0.78) 0%, rgba(var(--sx-scrim-rgb),0.64) 50%, rgba(var(--sx-scrim-rgb),0.80) 100%)",
        }}
      />

      <Container style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: SX.display,
                fontWeight: 500,
                fontSize: 48,
                lineHeight: "55.2px",
                letterSpacing: "-1px",
                color: SX.onMedia,
                margin: 0,
                maxWidth: 620,
              }}
            >
              Security first.
            </h2>
          </div>
        </Reveal>

        {/* three statements on the image, divided by hairlines. No card chrome. */}
        <div className="sx-trust-row">
          {POINTS.map((p, i) => (
            <motion.div key={p.title} {...revealProps({ delay: i * 0.09, amount: 0.3 })} className="sx-trust-col">
              <h3
                style={{
                  fontFamily: SX.display,
                  fontWeight: 500,
                  fontSize: 22,
                  lineHeight: "28px",
                  letterSpacing: "-0.3px",
                  color: SX.onMedia,
                  margin: 0,
                }}
              >
                {p.title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "12px 0 0" }}>
                {p.body.map((line) => (
                  <p
                    key={line}
                    style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "26px", color: SX.onMediaMuted, margin: 0 }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <style>{`
        .sx-trust-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 64px;
        }
        .sx-trust-col { padding: 0 36px; }
        .sx-trust-col:first-child { padding-left: 0; }
        .sx-trust-col:last-child { padding-right: 0; }
        .sx-trust-col + .sx-trust-col { border-left: 1px solid var(--sx-glass-edge); }

        @media (max-width: 900px) {
          .sx-trust-band { padding: 80px 0 88px !important; margin: 44px 0 !important; }
          .sx-trust-row { grid-template-columns: minmax(0, 1fr); gap: 34px; margin-top: 44px; }
          .sx-trust-col { padding: 0; }
          .sx-trust-col + .sx-trust-col {
            border-left: 0;
            border-top: 1px solid var(--sx-glass-edge);
            padding-top: 34px;
          }
        }
      `}</style>
    </section>
  );
}
