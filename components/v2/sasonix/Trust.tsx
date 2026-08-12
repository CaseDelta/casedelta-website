"use client";

/**
 * Trust. Sits where the "Delta vs a generic AI chatbot" comparison used to, because
 * the objection a firm actually raises is not "how is this different from ChatGPT",
 * it is "can I put client files in it". Camren answers that same objection in every
 * prospect thread, and the analogy he uses does more work than any spec sheet:
 * a paralegal would never take client files home.
 *
 * WhySasonix.tsx is untouched and still in the repo, so restoring the comparison is
 * one line in Sasonix.tsx.
 */
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal } from "./reveal";

const POINTS: { title: string; body: string }[] = [
  {
    title: "Your files stay put",
    body: "Your files never leave your systems. A paralegal would never take them home. Neither does Delta.",
  },
  {
    title: "Every answer shows its source",
    body: "Every answer shows the page it came from. You check it yourself.",
  },
  {
    title: "Built for client data",
    body: "Your data stays yours. It is encrypted and kept apart from other firms. It never trains a model. HIPAA and bar compliant.",
  },
];

export function Trust() {
  return (
    <section id="security" style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Trust"
            title="Safe to put a client file in"
            titleMaxW={520}
          />
        </Reveal>

        <div className="sx-trust-grid">
          {POINTS.map((p, i) => (
            <Reveal
              key={p.title}
              amount={0.2}
              delay={i * 0.06}
              style={{
                background: SX.surfaceAlt,
                border: `1px solid ${SX.hairline}`,
                borderRadius: 18,
                padding: "32px 28px",
              }}
            >
              <h3
                style={{
                  fontFamily: SX.display,
                  fontWeight: 500,
                  fontSize: 22,
                  lineHeight: "28px",
                  letterSpacing: "-0.3px",
                  color: SX.ink,
                  margin: 0,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: SX.body,
                  fontSize: 16,
                  lineHeight: "26px",
                  color: SX.ink2,
                  margin: "12px 0 0",
                }}
              >
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>

      <style>{`
        .sx-trust-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 56px;
        }
        @media (max-width: 900px) {
          .sx-trust-grid { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </section>
  );
}
