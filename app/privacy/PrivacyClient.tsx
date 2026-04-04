"use client";

import {
  LegalPageLayoutV2,
  LegalSectionV2,
  LegalClosingV2,
  LEGAL_LINK_STYLE,
} from "@/components/LegalPageLayoutV2";

export default function PrivacyClient() {
  return (
    <LegalPageLayoutV2 title="Privacy Policy">
      <LegalSectionV2 title="How We Process Your Data">
        <p>
          All document processing happens entirely within CaseDelta&apos;s own infrastructure. Your documents are never sent to any third-party AI provider for processing or training. Every AI model that analyzes your documents runs inside CaseDelta&apos;s secure environment.
        </p>
        <p style={{ marginTop: 12 }}>
          Documents are encrypted both at rest and in transit. Delta processes your files solely to provide the service you&apos;ve requested &mdash; building chronologies, identifying anomalies, generating case briefs, and learning your firm&apos;s preferences over time.
        </p>
        <p style={{ marginTop: 12 }}>
          Every action Delta takes is logged with a timestamp, the document involved, the query, the response, and the sources cited. This audit trail is exportable for bar compliance and your own records.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="What We Never Do">
        <p>These commitments are architectural, not policy. They are built into how CaseDelta works:</p>
        <ul style={{ marginTop: 12, paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 8 }}>
            <strong>We never use your data to train AI models.</strong> Your documents, queries, and Delta&apos;s responses are never fed back into any model&apos;s training pipeline.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>We never share client data across firms.</strong> Each firm&apos;s data is completely isolated. What Delta learns about your firm stays with your firm.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>We never sell your data to third parties.</strong> Not to advertisers, not to data brokers, not to anyone.
          </li>
          <li>
            <strong>We never access your data without authorization.</strong> CaseDelta engineers cannot view your documents or case data without explicit permission for a specific support request.
          </li>
        </ul>
      </LegalSectionV2>

      <LegalSectionV2 title="Data Retention">
        <p>
          Documents are retained according to your firm&apos;s configured retention settings within CaseDelta. You control how long your data is kept.
        </p>
        <p style={{ marginTop: 12 }}>
          Account data is retained while your account is active. If you cancel your subscription, you have 30 days to export all of your data. After that period, all data &mdash; documents, case information, and Delta&apos;s learned intelligence about your firm &mdash; is permanently deleted.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Your Rights">
        <p>You have full control over your data at all times:</p>
        <ul style={{ marginTop: 12, paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Export</strong> &mdash; download all your data, including documents, case files, and audit logs, at any time.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Delete</strong> &mdash; request deletion of any or all data at any time.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Opt out</strong> &mdash; opt out of marketing communications at any time.
          </li>
          <li>
            <strong>Inquire</strong> &mdash; request a summary of what data we hold about you and your firm.
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          For any data request, contact{" "}
          <a href="mailto:support@casedelta.com" style={LEGAL_LINK_STYLE}>
            support@casedelta.com
          </a>
          .
        </p>
      </LegalSectionV2>

      <LegalClosingV2>
        By using CaseDelta, you acknowledge understanding and accepting this Privacy Policy.
      </LegalClosingV2>
    </LegalPageLayoutV2>
  );
}
