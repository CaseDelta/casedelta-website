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
        body: "Build the demand overnight. Reads every record, dates each treatment, drafts the demand in your firm's voice, and leaves it in the file for you to approve.",
      },
      {
        title: "Policy limits",
        body: "Catch the coverage problem early. Reads the dec page and the police report, checks the limits against the damages, and flags the conflict on the file.",
      },
      {
        title: "Records chasing",
        body: "Keep the records moving. Drafts every request, tracks what came back, chases what did not, and leaves the follow ups for you to approve.",
      },
      {
        title: "Client updates",
        body: "Never leave a client wondering. Reads what changed on the file this week, drafts the update in your voice, and parks it for your approval.",
      },
    ],
  },
  {
    key: "masstort",
    label: "Mass tort",
    examples: [
      {
        title: "Chronology at scale",
        body: "Build the chronology on every file, not just the ones someone got to. Reads thousands of pages across hundreds of plaintiffs, cites every fact to its page, and leaves a draft on each.",
      },
      {
        title: "Plaintiff fact sheets",
        body: "Get the fact sheets off the pile. Pulls the answers from the records, drafts every field, cites the page, and parks the sheet for review.",
      },
      {
        title: "Status across the docket",
        body: "Know what moved this week. Reads every file, gathers what changed, and comes back with it in plain English.",
      },
      {
        title: "Bulk records intake",
        body: "Sort the incoming records. Files each one to the right plaintiff, flags what is missing, and leaves the gaps in a list for you.",
      },
    ],
  },
  {
    key: "medmal",
    label: "Medical malpractice",
    examples: [
      {
        title: "Medical chronology",
        body: "Build the treatment timeline. Reads the full chart, dates every entry, links each one to its page, and leaves the chronology for you to approve.",
      },
      {
        title: "New records on arrival",
        body: "Read the record the day it lands. Opens it on arrival with nobody prompting it, and flags what changes the value of the case.",
      },
      {
        title: "Expert packets",
        body: "Get your expert what they asked for. Pulls the records, assembles the packet, drafts the cover letter, and parks it for your approval.",
      },
      {
        title: "Deadlines",
        body: "Never miss a date. Reads the dates off the file, calendars them, drafts the follow up, and leaves it for you to send.",
      },
    ],
  },
  {
    key: "intake",
    label: "Intake",
    examples: [
      {
        title: "New matter opening",
        body: "Open the file the moment it arrives. Reads the intake email, opens the matter, files the documents, and starts the intake steps.",
      },
      {
        title: "Missing documents",
        body: "Close the gaps in the file. Checks what is still missing, drafts the request to the client, and parks it for your approval.",
      },
      {
        title: "First response",
        body: "Answer new intakes fast. Drafts the response in your firm's voice, and never sends it without you.",
      },
      {
        title: "Case briefing",
        body: "Walk into the call ready. Reads every system, gathers where the case stands, and briefs you in plain English.",
      },
    ],
  },
  {
    key: "ops",
    label: "Firm operations",
    examples: [
      {
        title: "Morning briefing",
        body: "Start the day already caught up. Reads what changed across your matters overnight and leaves the briefing before you open the office.",
      },
      {
        title: "Nothing goes quiet",
        body: "Nothing sits still. Finds what is overdue and who has gone quiet, drafts the nudge, and leaves it for you to send.",
      },
      {
        title: "Your own fields",
        body: "Work in the setup you already have. Reads your own tabs and fields live, with no mapping project.",
      },
      {
        title: "Knowledge that stays",
        body: "Keep what your firm knows. Learns how your firm likes work done, and keeps it when people leave.",
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
