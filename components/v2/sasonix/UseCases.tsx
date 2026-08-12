"use client";

/**
 * "How law firms are using Delta" — modelled on Grok Bot's "How the SpaceXAI team
 * is using Grok Bot": pick a lane, see real examples.
 *
 * The adaptation Camren called for: Grok tabs by internal TEAM (Sales, Growth,
 * Engineering). We tab by PRACTICE AREA, because that is how our buyer identifies.
 * A PI attorney does not scan for "document intelligence", they scan for "demand
 * packages" and stop when they see their own work described.
 *
 * It doubles as social proof without a testimonial: naming the work precisely is
 * itself evidence that we have done it. Every card is a capability Camren has
 * described to a real prospect, not an aspiration. Do NOT add a card for something
 * Delta cannot do today; the whole section's value is that it survives a demo.
 *
 * THREE per practice, not four (2026-08-12). Three fills one row at a size where
 * the icon, the title and the sentence all have room; four forced a 2x2 that read
 * as a list. Copy follows Grok's job-card shape: outcome imperative, verbs in the
 * middle, finished artifact and approval gate at the close.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BellRing,
  Brain,
  ClipboardList,
  FileSearch,
  FileText,
  FileWarning,
  FolderPlus,
  HeartPulse,
  Layers,
  MailPlus,
  Package,
  Send,
  ShieldAlert,
  Sunrise,
} from "lucide-react";
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

type Icon = typeof FileText;
type Example = { title: string; body: string; Icon: Icon };
type Practice = { key: string; label: string; examples: Example[] };

const PRACTICES: Practice[] = [
  {
    key: "pi",
    label: "Personal injury",
    examples: [
      {
        Icon: FileText,
        title: "Demand packages",
        body: "Build the demand overnight. Reads every record, dates each treatment, drafts the demand in your firm's voice, and leaves it in the file for you to approve.",
      },
      {
        Icon: ShieldAlert,
        title: "Policy limits",
        body: "Catch the coverage problem early. Reads the dec page and the police report, checks the limits against the damages, and flags the conflict on the file.",
      },
      {
        Icon: Send,
        title: "Records chasing",
        body: "Keep the records moving. Drafts every request, tracks what came back, chases what did not, and leaves the follow ups for you to approve.",
      },
    ],
  },
  {
    key: "masstort",
    label: "Mass tort",
    examples: [
      {
        Icon: Layers,
        title: "Chronology at scale",
        body: "Build the chronology on every file, not just the ones someone got to. Reads thousands of pages across hundreds of plaintiffs and cites every fact to its page.",
      },
      {
        Icon: ClipboardList,
        title: "Plaintiff fact sheets",
        body: "Get the fact sheets off the pile. Pulls the answers from the records, drafts every field, cites the page, and parks the sheet for review.",
      },
      {
        Icon: Activity,
        title: "Status across the docket",
        body: "Know what moved this week. Reads every file, gathers what changed, and comes back with it in plain English.",
      },
    ],
  },
  {
    key: "medmal",
    label: "Medical malpractice",
    examples: [
      {
        Icon: HeartPulse,
        title: "Medical chronology",
        body: "Build the treatment timeline. Reads the full chart, dates every entry, links each one to its page, and leaves the chronology for you to approve.",
      },
      {
        Icon: FileSearch,
        title: "New records on arrival",
        body: "Read the record the day it lands. Opens it on arrival with nobody prompting it, and flags what changes the value of the case.",
      },
      {
        Icon: Package,
        title: "Expert packets",
        body: "Get your expert what they asked for. Pulls the records, assembles the packet, drafts the cover letter, and parks it for your approval.",
      },
    ],
  },
  {
    key: "intake",
    label: "Intake",
    examples: [
      {
        Icon: FolderPlus,
        title: "New matter opening",
        body: "Open the file the moment it arrives. Reads the intake email, opens the matter, files the documents, and starts the intake steps.",
      },
      {
        Icon: MailPlus,
        title: "First response",
        body: "Answer new intakes fast. Drafts the response in your firm's voice, and never sends it without you.",
      },
      {
        Icon: FileWarning,
        title: "Missing documents",
        body: "Close the gaps in the file. Checks what is still missing, drafts the request to the client, and parks it for your approval.",
      },
    ],
  },
  {
    key: "ops",
    label: "Firm operations",
    examples: [
      {
        Icon: Sunrise,
        title: "Morning briefing",
        body: "Start the day already caught up. Reads what changed across your matters overnight and leaves the briefing before you open the office.",
      },
      {
        Icon: BellRing,
        title: "Nothing goes quiet",
        body: "Nothing sits still. Finds what is overdue and who has gone quiet, drafts the nudge, and leaves it for you to send.",
      },
      {
        Icon: Brain,
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
    <section id="jobs" style={{ background: SX.white, padding: "60px 0 60px" }}>
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

        {/* three examples for the selected practice */}
        <div style={{ marginTop: 32 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={practice.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="sx-uc-grid"
            >
              {practice.examples.map(({ title, body, Icon }, i) => (
                <motion.div
                  key={title}
                  className="sx-uc-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  /* The lift MUST come from framer. It owns the inline transform on
                     motion components, so a CSS :hover transform is silently
                     overridden. Same trap as the pricing tiers. */
                  whileHover={{ y: -6 }}
                >
                  <span className="sx-uc-chip" aria-hidden>
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <h3 className="sx-uc-title">{title}</h3>
                  <p className="sx-uc-body">{body}</p>
                </motion.div>
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        /* Shadow routes through a variable so the hover state can change it even
           though the resting value is set here. Same pattern as the pricing tiers,
           deliberately: one hover language across the page. */
        .sx-uc-card {
          --sx-uc-shadow: 0 1px 2px rgba(var(--sx-shadow-rgb), 0.04);
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--sx-surface-alt);
          border: 1px solid var(--sx-hairline);
          border-radius: 20px;
          padding: 32px 30px 34px;
          box-shadow: var(--sx-uc-shadow);
          overflow: hidden;
          transition: box-shadow 0.28s ease, border-color 0.28s ease;
          will-change: transform;
        }
        .sx-uc-card:hover {
          --sx-uc-shadow: 0 26px 50px -28px rgba(var(--sx-shadow-rgb), 0.28);
          border-color: color-mix(in srgb, var(--sx-accent) 38%, transparent);
        }

        /* an accent rule that draws across the top edge on hover */
        .sx-uc-card::after {
          content: "";
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 2px;
          background: var(--sx-accent);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .sx-uc-card:hover::after { transform: scaleX(1); }

        .sx-uc-chip {
          display: grid;
          place-items: center;
          width: 48px; height: 48px;
          border-radius: 14px;
          background: var(--sx-surface);
          border: 1px solid var(--sx-hairline);
          color: var(--sx-accent);
          margin-bottom: 22px;
          transition: background 0.28s ease, border-color 0.28s ease;
        }
        .sx-uc-card:hover .sx-uc-chip {
          background: var(--sx-accent-soft);
          border-color: color-mix(in srgb, var(--sx-accent) 30%, transparent);
        }

        .sx-uc-title {
          margin: 0;
          font-family: var(--sx-archivo), sans-serif;
          font-weight: 500;
          font-size: 22px;
          line-height: 28px;
          letter-spacing: -0.3px;
          color: var(--sx-ink);
        }
        .sx-uc-body {
          margin: 12px 0 0;
          font-size: 16px;
          line-height: 26px;
          color: var(--sx-ink-2);
        }

        @media (prefers-reduced-motion: reduce) {
          .sx-uc-card, .sx-uc-card::after, .sx-uc-chip { transition: none; }
          .sx-uc-card::after { display: none; }
        }
        @media (max-width: 980px) {
          .sx-uc-grid { grid-template-columns: minmax(0, 1fr); }
          .sx-uc-card { padding: 26px 24px 28px; }
        }
      `}</style>
    </section>
  );
}
