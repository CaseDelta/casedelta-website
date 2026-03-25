"use client";

import {
  LegalPageLayoutV2,
  LegalSectionV2,
  LegalClosingV2,
  LEGAL_LINK_STYLE,
} from "@/components/LegalPageLayoutV2";

export default function PrivacyPage() {
  return (
    <LegalPageLayoutV2 title="Privacy Policy">
      <LegalSectionV2 title="What We Collect">
        <p>
          We collect the information necessary to provide CaseDelta&apos;s service:
        </p>
        <ul style={{ marginTop: 12, paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Account information</strong> &mdash; your name, email address, firm name, and billing details.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Documents</strong> &mdash; the files you upload for Delta to analyze, including case documents, medical records, financial documents, and other legal materials.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Usage data</strong> &mdash; how you interact with CaseDelta, including queries, approvals, and corrections, so Delta can learn your firm&apos;s preferences.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Technical data</strong> &mdash; IP address, browser type, and device information for security and service reliability.
          </li>
          <li>
            <strong>Client portal data</strong> &mdash; when your clients use CaseDelta&apos;s secure upload portal, we collect only their name and email address.
          </li>
        </ul>
      </LegalSectionV2>

      <LegalSectionV2 title="How We Process Your Data">
        <p>
          All document processing happens entirely within CaseDelta&apos;s own infrastructure. Your documents are never sent to OpenAI, Google, Anthropic, or any other third-party AI provider for processing or training. Every AI model that analyzes your documents runs inside CaseDelta&apos;s secure environment.
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

      <LegalSectionV2 title="Third-Party Services">
        <p>We use a limited set of third-party services, each with a narrow scope:</p>
        <ul style={{ marginTop: 12, paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Amazon Web Services (AWS)</strong> &mdash; infrastructure hosting. Your data is stored on encrypted AWS servers in the United States. AWS does not have access to your document content.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Stripe</strong> &mdash; payment processing. Stripe handles your billing information. We never store your credit card details directly.
          </li>
          <li>
            <strong>Google &amp; Microsoft</strong> &mdash; authentication only (OAuth). When you sign in with Google or Microsoft, we receive only your name and email to verify your identity. These providers do not receive any document or case data.
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          No third-party service has access to your document content, case data, or Delta&apos;s analysis of your files.
        </p>
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
          <a href="mailto:privacy@casedelta.com" style={LEGAL_LINK_STYLE}>
            privacy@casedelta.com
          </a>
          .
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Cookies">
        <p>
          CaseDelta uses only essential cookies required for the service to function &mdash; session management and authentication. We use one optional analytics cookie (PostHog) to understand how the service is used. We do not use advertising cookies, tracking pixels, or any third-party marketing trackers.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Changes and Contact">
        <p>
          We may update this Privacy Policy from time to time. When we do, we&apos;ll notify you via email or through the CaseDelta interface. For privacy questions or concerns, contact{" "}
          <a href="mailto:privacy@casedelta.com" style={LEGAL_LINK_STYLE}>
            privacy@casedelta.com
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
