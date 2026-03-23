"use client";

import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";
import { CONTACT_EMAILS } from "@/lib/constants/contact";

export default function AboutPage() {
  return (
    <LegalPageLayout title="About CaseDelta">
      <LegalSection title="Who We Are">
        <p>
          CaseDelta is the only legal AI that learns how your firm works. Delta connects to your existing tools, learns your cases, your clients, your team's workflows and preferences — and gets smarter every day. Built for the 80% of firms that enterprise legal AI ignores.
        </p>
      </LegalSection>

      <LegalSection title="What Delta Does">
        <p>
          Delta is your firm's AI associate — one that builds persistent institutional memory and never walks out the door:
        </p>
        <ul style={{
          listStyleType: "disc",
          paddingLeft: "1.5rem",
          marginTop: "1rem",
          color: "var(--color-text-primary)",
          fontSize: "var(--font-size-base)",
          lineHeight: "var(--line-height-relaxed)"
        }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Learns Your Firm:</strong> Connects to your Clio, documents, and email. Builds a compounding understanding of your clients, cases, document patterns, and workflows that deepens every day.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Proactive Intelligence:</strong> Morning briefings across all active cases. Missing documents flagged, deadlines surfaced, anomalies caught, drafts ready for review — before you ask.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Intelligence Network:</strong> Anonymized intelligence across all firms on the platform — jurisdictional insights, practice patterns, court-specific knowledge. The first network effect in legal tech.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Secure by Architecture:</strong> No client data ever leaves CaseDelta's environment. No OpenAI, no Google, no third-party AI. Full audit trail for bar compliance.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Contact Information">
        <div style={{
          marginBottom: "1.5rem",
          lineHeight: "var(--line-height-relaxed)"
        }}>
          <p style={{ marginBottom: "1rem" }}>
            <strong style={{ color: "var(--color-text-high-contrast)" }}>Business Name:</strong><br />
            CaseDelta, LLC
          </p>

          <p style={{ marginBottom: "1rem" }}>
            <strong style={{ color: "var(--color-text-high-contrast)" }}>Business Address:</strong><br />
            11130 W 114th Ter<br />
            Overland Park, KS 66220<br />
            United States
          </p>

          <p style={{ marginBottom: "1rem" }}>
            <strong style={{ color: "var(--color-text-high-contrast)" }}>Phone:</strong><br />
            <a
              href="tel:+19136020456"
              style={{
                color: "var(--color-text-high-contrast)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              +1 (913) 602-0456
            </a>
          </p>

          <p style={{ marginBottom: "1rem" }}>
            <strong style={{ color: "var(--color-text-high-contrast)" }}>Email Contact:</strong><br />
            <a
              href={`mailto:${CONTACT_EMAILS.SUPPORT}`}
              style={{
                color: "var(--color-text-high-contrast)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              {CONTACT_EMAILS.SUPPORT}
            </a>
          </p>

          <p>
            <strong style={{ color: "var(--color-text-high-contrast)" }}>Business Hours:</strong><br />
            Monday - Friday: 9:00 AM - 6:00 PM CST<br />
            Saturday - Sunday: Closed
          </p>
        </div>
      </LegalSection>

      <LegalSection title="SMS Notifications">
        <p>
          CaseDelta uses text messaging to send important notifications about case updates and Delta's findings to our customers. We comply with all carrier regulations and 10DLC requirements.
        </p>
        <p style={{ marginTop: "1rem" }}>
          To opt in to text notifications, visit our{" "}
          <a
            href="/sms-opt-in"
            style={{
              color: "var(--color-text-high-contrast)",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            SMS Opt-In page
          </a>
          . You can opt out at any time by replying STOP to any message or contacting our support team.
        </p>
      </LegalSection>

      <LegalSection title="Service Areas">
        <p>
          CaseDelta serves law firms of all sizes throughout the United States — from solo practitioners to firms with 50+ attorneys. Delta works across every practice area where institutional knowledge compounds: personal injury, medical malpractice, employment law, commercial litigation, business law, insurance defense, and more.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
