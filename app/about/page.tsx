"use client";

import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";
import { CONTACT_EMAILS } from "@/lib/constants/contact";

export default function AboutPage() {
  return (
    <LegalPageLayout title="About CaseDelta">
      <LegalSection title="Who We Are">
        <p>
          CaseDelta is a legal technology platform that helps law firms collect and verify documents from clients efficiently. We eliminate the follow-up headache of document collection by automating reminders, verification, and organization—allowing legal professionals to focus on their cases, not chasing paperwork.
        </p>
      </LegalSection>

      <LegalSection title="What We Do">
        <p>
          Our AI-powered platform streamlines the document collection process for law firms by:
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
            <strong>Automated Client Reminders:</strong> Smart, timely text and email reminders that adapt to client behavior, reducing manual follow-up by 80%
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Document Verification:</strong> AI-powered verification ensures documents are complete, legible, and properly formatted before submission
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Secure Portal:</strong> Client-friendly upload portal with bank-level encryption and compliance with legal industry standards
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Workflow Integration:</strong> Seamlessly integrates with existing legal practice management systems
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
            Monday - Friday: 9:00 AM - 6:00 PM PST<br />
            Saturday - Sunday: Closed
          </p>
        </div>
      </LegalSection>

      <LegalSection title="SMS Notifications">
        <p>
          CaseDelta uses text messaging to send important notifications about document requests and case updates to our customers. We comply with all carrier regulations and 10DLC requirements.
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
          CaseDelta serves law firms throughout the United States. Our platform is designed to work with firms of all sizes, from solo practitioners to large multi-office practices.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
