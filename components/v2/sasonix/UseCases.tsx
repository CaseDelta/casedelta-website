"use client";

/**
 * "How law firms are using Delta" — modelled directly on Grok Bot's "How the
 * SpaceXAI team is using Grok Bot": pick a lane, see four real examples.
 *
 * The adaptation Camren called for: Grok tabs by internal TEAM (Sales, Growth,
 * Engineering). We tab by PRACTICE AREA, because that is how our buyer identifies.
 * A PI attorney does not scan for "document intelligence", they scan for "demand
 * packages" and stop when they see their own work described.
 *
 * It doubles as social proof without a testimonial: naming the work precisely is
 * itself evidence that we have done it. Every card here is a capability Camren has
 * described to a real prospect, not an aspiration. Do NOT add a card for something
 * Delta cannot do today; the whole section's value is that it survives a demo.
 *
 * Replaces Jobs.tsx, which cut the same material by work type. One section, richer.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

type Example = { title: string; body: string };
type Practice = { key: string; label: string; examples: Example[] };

const PRACTICES: Practice[] = [
  {
    key: "pi",
    label: "Personal injury",
    examples: [
      {
        title: "Demand packages",
        body: "Delta builds the chronology from the records, then drafts the demand from your own template. It lands in the file for review.",
      },
      {
        title: "Policy limits",
        body: "A dec page and a police report go in. Delta flags the policy limit problem on the file before it becomes one.",
      },
      {
        title: "Records chasing",
        body: "Delta drafts the records requests, tracks what came back, and follows up on what did not.",
      },
      {
        title: "Client updates",
        body: "Delta drafts the update from what changed on the file this week. You approve, then it sends.",
      },
    ],
  },
  {
    key: "masstort",
    label: "Mass tort",
    examples: [
      {
        title: "Chronology at scale",
        body: "Thousands of pages across hundreds of plaintiffs. Delta builds a cited chronology on every file, not just the ones someone got to.",
      },
      {
        title: "Plaintiff fact sheets",
        body: "Delta pulls the answers out of the records and drafts the sheet, every fact linked to its page.",
      },
      {
        title: "Status across the docket",
        body: "Ask what moved this week. Delta reads every file and answers in plain English.",
      },
      {
        title: "Bulk records intake",
        body: "Records arrive in bulk. Delta files them to the right plaintiff and flags what is missing.",
      },
    ],
  },
  {
    key: "medmal",
    label: "Medical malpractice",
    examples: [
      {
        title: "Medical chronology",
        body: "Delta reads the full chart and builds the treatment timeline, every entry linked to its page.",
      },
      {
        title: "New records on arrival",
        body: "An MRI report lands. Delta reads it right away and flags what changes the value of the case.",
      },
      {
        title: "Expert packets",
        body: "Delta assembles the records your expert asked for and drafts the cover letter.",
      },
      {
        title: "Deadlines",
        body: "Delta calendars the dates off the file and drafts the follow up.",
      },
    ],
  },
  {
    key: "intake",
    label: "Intake",
    examples: [
      {
        title: "New matter opening",
        body: "A file arrives by email. Delta opens the matter, files the documents, and starts intake.",
      },
      {
        title: "Missing documents",
        body: "Delta checks what the file still needs and drafts the request to the client.",
      },
      {
        title: "First response",
        body: "Delta drafts the intake response in your firm's voice. A person approves before it sends.",
      },
      {
        title: "Case briefing",
        body: "Ask where a case stands before the call. Delta reads every system and briefs you.",
      },
    ],
  },
  {
    key: "ops",
    label: "Firm operations",
    examples: [
      {
        title: "Morning briefing",
        body: "Delta reports on what changed across your matters overnight, before you open the office.",
      },
      {
        title: "Nothing goes quiet",
        body: "Ask what is overdue and who has gone quiet. Delta drafts the nudge.",
      },
      {
        title: "Your own fields",
        body: "Delta reads your own tabs and fields live, with no mapping project.",
      },
      {
        title: "Knowledge that stays",
        body: "Delta learns how your firm works. That knowledge stays when people leave.",
      },
    ],
  },
];

export function UseCases() {
  const [active, setActive] = useState(PRACTICES[0].key);
  const practice = PRACTICES.find((p) => p.key === active) ?? PRACTICES[0];

  return (
    <section id="jobs" style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <Reveal>
          <h2
            style={{
              fontFamily: SX.display,
              fontWeight: 500,
              fontSize: 48,
              lineHeight: "55.2px",
              letterSpacing: "-1px",
              color: SX.ink,
              margin: 0,
              maxWidth: 720,
            }}
          >
            How law firms are using Delta
          </h2>
        </Reveal>

        {/* practice tabs */}
        <Reveal amount={0.2} style={{ marginTop: 36 }}>
          <div className="sx-uc-tabs" role="tablist">
            {PRACTICES.map((p) => {
              const on = p.key === practice.key;
              return (
                <button
                  key={p.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(p.key)}
                  className="sx-uc-tab"
                  style={{
                    background: on ? SX.accentSoft : "transparent",
                    color: on ? SX.ink : SX.ink2,
                    fontWeight: on ? 600 : 400,
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* four examples for the selected practice */}
        <div style={{ marginTop: 28 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={practice.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="sx-uc-grid"
            >
              {practice.examples.map((ex) => (
                <div key={ex.title} className="sx-uc-card">
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
                    {ex.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: SX.body,
                      fontSize: 16,
                      lineHeight: "26px",
                      color: SX.ink2,
                      margin: "10px 0 0",
                    }}
                  >
                    {ex.body}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      <style>{`
        .sx-uc-tabs { display: flex; flex-wrap: wrap; gap: 6px; }
        .sx-uc-tab {
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 15px;
          line-height: 1.2;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .sx-uc-tab:hover { background: var(--sx-surface-alt); }
        .sx-uc-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }
        .sx-uc-card {
          background: var(--sx-surface-alt);
          border: 1px solid var(--sx-hairline);
          border-radius: 18px;
          padding: 28px 28px 32px;
        }
        @media (max-width: 860px) {
          .sx-uc-grid { grid-template-columns: minmax(0, 1fr); }
          .sx-uc-card { padding: 24px 22px 26px; }
        }
      `}</style>
    </section>
  );
}
