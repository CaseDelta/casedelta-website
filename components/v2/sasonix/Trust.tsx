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
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

const BAND_IMAGE = "/v2/ambient/horizon-blue.webp";

/**
 * ONE SENTENCE AND THREE LABELS. This band used to carry three headed columns
 * with two body lines each: nine lines of prose about security, on a page where
 * the reader has already decided they want the thing and is checking it will not
 * get them disbarred. Nobody reads nine lines of that. They scan for whether the
 * words they were told to look for are present.
 *
 * So the argument is one sentence and the compliance answer is three labels a
 * reader can find in under a second. Cut, not compressed: what went was the
 * explanation, not a claim.
 *
 * EVERY WORD HERE IS BOUND BY THE HOUSE RULES and this is the section where
 * breaking them costs most:
 *   - Never "no third-party LLM", never "your data never leaves our
 *     infrastructure". Both are false. Production runs on enterprise AI under
 *     zero-retention and BAA terms, and the defensible framing is what is here.
 *   - Security is PARITY with the serious competitors, not an advantage. There is
 *     no comparison in this band on purpose, and no competitor is named.
 *   - "We sign a BAA" is a commitment the company honours, not a marketing line.
 *
 * The sentence is the one genuinely differentiated thing and it is the one kept:
 * Delta works where the records already are rather than pulling them somewhere
 * else to be processed.
 */
const LEAD =
  "Delta works inside the systems your records already live in, and leaves them there.";

/** Short enough to scan, specific enough to check. No sentence should join these. */
const LABELS = ["HIPAA and bar compliant", "We sign a BAA", "Never used to train a model"];

export function Trust() {
  return (
    <section
      id="security"
      className="sx-trust-band"
      style={{ position: "relative", overflow: "hidden", padding: "180px 0 190px", margin: "60px 0" }}
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
              }}
            >
              Security first.
            </h2>
            <p
              className="sx-trust-lead"
              style={{
                fontFamily: SX.body,
                fontWeight: 400,
                fontSize: 22,
                lineHeight: "34px",
                color: SX.onMediaMuted,
                margin: "26px 0 0",
                maxWidth: 640,
                textWrap: "pretty",
              }}
            >
              {LEAD}
            </p>
          </div>
        </Reveal>

        {/* The compliance answer, as labels rather than paragraphs. A reader here
            is checking for words, not reading an argument. */}
        <Reveal delay={0.08}>
          <div className="sx-trust-labels">
            {LABELS.map((label) => (
              <span key={label} className="sx-trust-label">
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>

      <style>{`
        /* TALLER AND EMPTIER (Camren, 2026-09-02). 112/120 held three columns of
           prose. With one sentence and three labels in it, the same padding made
           the band look like a section that had lost its content. The height is
           doing the work the copy used to: this is the one place on the page that
           should feel unhurried, because it is where a reader is deciding whether
           they trust us with medical records. */
        .sx-trust-labels {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0 34px;
          margin-top: 72px;
        }
        .sx-trust-label {
          font-family: var(--sx-mono), 'JetBrains Mono Placeholder', monospace;
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 20px;
          color: var(--sx-on-media);
          padding: 0 0 0 34px;
          position: relative;
          white-space: nowrap;
        }
        .sx-trust-label:first-child { padding-left: 0; }
        /* A hairline between, not around. Chips would make three claims look like
           three buttons. */
        .sx-trust-label + .sx-trust-label::before {
          content: "";
          position: absolute;
          left: 0;
          top: 3px;
          bottom: 3px;
          width: 1px;
          background: var(--sx-glass-edge);
        }

        @media (max-width: 900px) {
          .sx-trust-band { padding: 112px 0 120px !important; margin: 44px 0 !important; }
          .sx-trust-lead { font-size: 19px !important; line-height: 30px !important; }
          .sx-trust-labels { flex-direction: column; gap: 16px; margin-top: 48px; }
          .sx-trust-label { padding-left: 0; }
          .sx-trust-label + .sx-trust-label::before { display: none; }
        }
      `}</style>
    </section>
  );
}
