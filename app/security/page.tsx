"use client";

import { FooterV2 } from "@/components/FooterV2";

const ACCENT = "#2563EB";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function SecuritySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2
        style={{
          fontFamily: FONT,
          fontSize: "clamp(20px, 2.2vw, 28px)",
          fontWeight: 600,
          color: "#0A0A0A",
          letterSpacing: "-0.025em",
          lineHeight: 1.25,
          marginBottom: 16,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: FONT,
          fontSize: "clamp(15px, 1.2vw, 17px)",
          fontWeight: 400,
          color: "#555",
          lineHeight: 1.7,
          letterSpacing: "-0.01em",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Commitment({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: `${ACCENT}10`,
          border: `1px solid ${ACCENT}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.5 8.5L6.5 11.5L12.5 4.5"
            stroke={ACCENT}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>

      <div style={{ position: "relative" }}>
        {/* Ruler lines */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 1320,
            padding: "0 clamp(24px, 4vw, 48px)",
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: -16,
                width: 1,
                backgroundColor: BORDER,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: -16,
                width: 1,
                backgroundColor: BORDER,
              }}
            />
          </div>
        </div>

        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "120px clamp(24px, 4vw, 48px) 80px",
          }}
        >
          {/* Hero heading */}
          <div style={{ maxWidth: 720, marginBottom: 64 }}>
            <h1
              style={{
                fontFamily: FONT,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 700,
                color: "#0A0A0A",
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Your client data stays inside your firm.
            </h1>
            <p
              style={{
                fontFamily: FONT,
                fontSize: "clamp(16px, 1.4vw, 20px)",
                fontWeight: 400,
                color: "#666",
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
              }}
            >
              Most legal AI sends your documents to outside companies for
              processing. CaseDelta is different. Everything Delta learns about
              your firm stays inside CaseDelta&apos;s secure environment. These
              aren&apos;t policies we wrote down &mdash; they&apos;re how the
              system is built.
            </p>
          </div>

          {/* Commitments grid */}
          <div
            style={{
              borderTop: `1px solid ${BORDER}`,
              paddingTop: 48,
              marginBottom: 64,
            }}
          >
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(13px, 1vw, 14px)",
                fontWeight: 600,
                color: "#999",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              Our commitments
            </h2>

            <div
              className="grid grid-cols-1 lg:grid-cols-2"
              style={{ gap: "8px 48px" }}
            >
              <Commitment>
                <strong style={{ color: "#0A0A0A" }}>
                  Your documents never leave CaseDelta.
                </strong>{" "}
                Every AI model that reads your files runs inside our own
                infrastructure. Nothing is sent to OpenAI, Google, or any other
                outside service.
              </Commitment>
              <Commitment>
                <strong style={{ color: "#0A0A0A" }}>
                  We never train on your data.
                </strong>{" "}
                Your documents, your queries, and Delta&apos;s responses are
                never used to train or improve AI models. Your work product
                stays yours.
              </Commitment>
              <Commitment>
                <strong style={{ color: "#0A0A0A" }}>
                  Each firm is completely isolated.
                </strong>{" "}
                Delta learns your firm and only your firm. No other firm on
                CaseDelta can see your data, your cases, or what Delta has
                learned about your practice.
              </Commitment>
              <Commitment>
                <strong style={{ color: "#0A0A0A" }}>
                  Every action is logged.
                </strong>{" "}
                Full audit trail &mdash; every document Delta reviews, every
                query, every response, timestamped and exportable. Your bar
                association won&apos;t question it.
              </Commitment>
              <Commitment>
                <strong style={{ color: "#0A0A0A" }}>
                  You control your data completely.
                </strong>{" "}
                Export everything at any time. Delete anything at any time. If
                you cancel, you get 30 days to take your data before it&apos;s
                permanently removed.
              </Commitment>
              <Commitment>
                <strong style={{ color: "#0A0A0A" }}>
                  We can&apos;t see your files.
                </strong>{" "}
                CaseDelta engineers cannot access your documents or case data
                without your explicit permission for a specific support request.
              </Commitment>
            </div>
          </div>

          {/* How it works sections */}
          <div style={{ maxWidth: 680 }}>
            <SecuritySection title="How Delta connects to your tools">
              <p>
                Delta connects to your Clio, Google Drive, and other services
                using the same secure sign-in (OAuth) your bank uses. Delta gets
                its own set of credentials &mdash; separate from yours. When you
                disconnect a service, Delta&apos;s access is revoked instantly.
              </p>
              <p style={{ marginTop: 12 }}>
                Delta never stores your third-party passwords. It only receives
                the specific permissions you grant, and only accesses what it
                needs to do its job.
              </p>
            </SecuritySection>

            <SecuritySection title="How your data is protected">
              <p>
                Everything is encrypted &mdash; both when it&apos;s stored and
                when it&apos;s moving between your browser and our servers. Your
                data is hosted on secure infrastructure in the United States.
              </p>
              <p style={{ marginTop: 12 }}>
                Access to production systems requires multi-factor
                authentication and is restricted to a small number of
                authorized team members. We monitor for unauthorized access
                continuously.
              </p>
            </SecuritySection>

            <SecuritySection title="How Delta learns without compromising privacy">
              <p>
                Delta builds two kinds of knowledge. First, it learns your firm
                &mdash; your cases, your preferences, your clients. This
                knowledge is private to your firm and invisible to everyone
                else.
              </p>
              <p style={{ marginTop: 12 }}>
                Second, CaseDelta aggregates anonymized patterns across all
                firms &mdash; things like how often a particular judge grants
                motions for summary judgment, or how long cases typically take
                in a given jurisdiction. No firm names, no case details, no
                client information. Just statistical patterns that make every
                firm on the platform smarter.
              </p>
            </SecuritySection>

            <SecuritySection title="What happens when you cancel">
              <p>
                You retain access through the end of your billing period. After
                that, you have 30 days to export all of your data &mdash;
                documents, case files, audit logs, everything Delta has learned
                about your firm.
              </p>
              <p style={{ marginTop: 12 }}>
                After the export window, all data is permanently deleted. Not
                archived, not retained &ldquo;just in case.&rdquo; Deleted.
              </p>
            </SecuritySection>
          </div>

          {/* Questions CTA */}
          <div
            style={{
              borderTop: `1px solid ${BORDER}`,
              paddingTop: 40,
              marginTop: 16,
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: "clamp(15px, 1.2vw, 17px)",
                color: "#999",
                lineHeight: 1.7,
              }}
            >
              Have security questions? Contact{" "}
              <a
                href="mailto:security@casedelta.com"
                style={{
                  color: ACCENT,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                security@casedelta.com
              </a>
              . For our full data handling practices, see our{" "}
              <a
                href="/privacy"
                style={{
                  color: ACCENT,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <FooterV2 />
    </main>
  );
}
