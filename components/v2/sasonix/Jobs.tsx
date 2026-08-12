"use client";

/**
 * "Give Delta a job" — the section the page was missing.
 *
 * WHY IT EXISTS: every other section describes a capability. This one names the
 * work, in the buyer's own vocabulary, because a PI attorney recognises "records
 * and chronology" instantly and has to translate "document intelligence". The copy
 * is lifted from what Camren actually writes to prospects, which was consistently
 * clearer than anything on the site.
 *
 * Each job is one trigger and one result, in short sentences. Pick a job on the
 * left, read the work on the right. No feature nouns, no mechanism.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal } from "./reveal";

type Job = {
  key: string;
  /** The chip label. The job as a firm would name it. */
  label: string;
  /** One line, bolded: the outcome. */
  lead: string;
  /** Two or three short sentences: what actually happens. */
  body: string;
};

const JOBS: Job[] = [
  {
    key: "chronology",
    label: "Records and chronology",
    lead: "Build the chronology.",
    body: "Hand Delta the records and bills. It builds the chronology, every fact linked to its page. Then it drafts the demand. Thirty minutes, not a day.",
  },
  {
    key: "intake",
    label: "New intake",
    lead: "Open the file.",
    body: "A new file arrives by email. Delta opens the matter. It files the documents and starts intake.",
  },
  {
    key: "medical",
    label: "Medical review",
    lead: "Read the record on arrival.",
    body: "An MRI report lands. Delta reads it right away. It flags what changes the value of the case.",
  },
  {
    key: "demand",
    label: "Demand package",
    lead: "Catch the coverage problem.",
    body: "A dec page and police report go in. Delta flags the policy limit problem on the file.",
  },
  {
    key: "deadlines",
    label: "Deadlines and follow up",
    lead: "Keep the file moving.",
    body: "Ask what is overdue and who has gone quiet. Delta calendars the dates and drafts the follow up.",
  },
  {
    key: "briefing",
    label: "Case briefing",
    lead: "Brief the case before the call.",
    body: "Ask Delta where the case stands. It reads every system and answers in plain English.",
  },
];

export function Jobs() {
  const [active, setActive] = useState(JOBS[0].key);
  const job = JOBS.find((j) => j.key === active) ?? JOBS[0];

  return (
    <section id="jobs" style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="The work"
            title="Give Delta a job"
            sub="Tell Delta what you would tell a new hire. It does the whole job, then comes back to you."
            titleMaxW={560}
            subMaxW={470}
          />
        </Reveal>

        <Reveal amount={0.15} style={{ marginTop: 56 }}>
          <div className="sx-jobs-grid">
            {/* LEFT: the jobs, named the way a firm names them */}
            <div className="sx-jobs-chips">
              {JOBS.map((j) => {
                const on = j.key === job.key;
                return (
                  <button
                    key={j.key}
                    onClick={() => setActive(j.key)}
                    aria-pressed={on}
                    className="sx-job-chip"
                    style={{
                      background: on ? SX.accentSoft : SX.surface,
                      borderColor: on ? SX.accent : SX.hairline,
                      color: on ? SX.ink : SX.ink2,
                      fontWeight: on ? 600 : 400,
                    }}
                  >
                    {j.label}
                  </button>
                );
              })}
            </div>

            {/* RIGHT: one trigger, one result */}
            <div className="sx-job-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={job.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    style={{
                      fontFamily: SX.display,
                      fontWeight: 500,
                      fontSize: 30,
                      lineHeight: "38px",
                      letterSpacing: "-0.5px",
                      color: SX.ink,
                      margin: 0,
                      maxWidth: 460,
                    }}
                  >
                    {job.lead}
                  </p>
                  <p
                    style={{
                      fontFamily: SX.body,
                      fontSize: 18,
                      lineHeight: "30px",
                      color: SX.ink2,
                      margin: "16px 0 0",
                      maxWidth: 460,
                    }}
                  >
                    {job.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>

      <style>{`
        .sx-jobs-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 56px;
          align-items: start;
          background: var(--sx-surface-alt);
          border: 1px solid var(--sx-hairline);
          border-radius: 22px;
          padding: 48px 44px;
        }
        .sx-jobs-chips { display: flex; flex-wrap: wrap; gap: 10px; align-content: start; }
        .sx-job-chip {
          border: 1px solid;
          border-radius: 999px;
          padding: 11px 18px;
          font-size: 15px;
          line-height: 1.2;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .sx-job-chip:hover { border-color: var(--sx-accent); }
        .sx-job-body { min-height: 150px; }
        @media (max-width: 900px) {
          .sx-jobs-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; padding: 32px 24px; }
          .sx-job-body { min-height: 0; }
        }
      `}</style>
    </section>
  );
}
