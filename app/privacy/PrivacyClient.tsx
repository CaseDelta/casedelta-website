"use client";

import {
  LegalPageLayoutV2,
  LegalSectionV2,
  LegalClosingV2,
  LEGAL_LINK_STYLE,
} from "@/components/LegalPageLayoutV2";

export default function PrivacyClient() {
  return (
    <LegalPageLayoutV2 title="Privacy Policy" lastUpdated="May 1, 2026">
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

      <LegalSectionV2 title="Google Workspace API Data">
        <p>
          CaseDelta integrates with Google Workspace APIs &mdash; Google Drive, Gmail, and Google Calendar &mdash; to act on behalf of attorneys within their own Google accounts. The agent reads case documents from Drive (read-only), reads and drafts client correspondence in Gmail, and reads and creates case-related events in Calendar.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>
            CaseDelta&apos;s use and transfer to any other app of information received from Google APIs will adhere to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={LEGAL_LINK_STYLE}
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </strong>
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          Scopes We Request and Why
        </h3>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 10 }}>
            <strong>Google Drive</strong> (<code>drive.readonly</code>) &mdash; to read and search case documents (including Google Docs and Sheets files, which reside in Drive) across the firm&apos;s Drive. Attorneys query the CaseDelta agent in natural language (e.g., &ldquo;pull every filing in Smith v. Jones&rdquo;), and the agent must be able to discover and retrieve relevant documents firm-wide. The narrower <em>drive.file</em> scope is incompatible with this use case because it requires users to pre-select files before the agent can reason over them, which defeats the purpose of an AI research assistant. Drive access is strictly read-only &mdash; CaseDelta never modifies, deletes, or writes documents to your Drive.
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>Gmail</strong> (<code>gmail.readonly</code> + <code>gmail.compose</code>) &mdash; to read case-related correspondence for context and draft replies. CaseDelta never sends email without explicit user confirmation; outgoing messages are created as drafts for the attorney to review and send manually from Gmail.
          </li>
          <li>
            <strong>Google Calendar</strong> (<code>calendar.readonly</code> + <code>calendar.events</code>) &mdash; to read case events and create deadline reminders (filing dates, hearings, depositions).
          </li>
        </ul>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          How Google User Data Is Used
        </h3>
        <p>
          Data received from Google APIs is used solely to provide the services the attorney has requested: document retrieval, chronology generation, correspondence drafting, and calendaring. It is processed inside CaseDelta&apos;s secure infrastructure, segregated per firm, and returned to the attorney as answers, drafts, or generated documents.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          How Google User Data Is Stored and Secured
        </h3>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 8 }}>All Google user data is encrypted in transit (TLS 1.2+) and at rest (AES-256).</li>
          <li style={{ marginBottom: 8 }}>Data is isolated per firm; no firm&apos;s data is ever commingled with or accessible to another firm.</li>
          <li style={{ marginBottom: 8 }}>Access is restricted by OAuth tokens scoped to individual users; CaseDelta engineers cannot view firm data without explicit, time-bound authorization for a specific support request.</li>
          <li>All access is logged with timestamps, query, response, and source citations; logs are exportable by the firm.</li>
        </ul>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          How Google User Data Is Shared
        </h3>
        <p>
          CaseDelta does not share, sell, or transfer Google user data to any third party. We do not use Google user data for advertising, and we do not allow humans to read Google user data except (a) with the user&apos;s explicit consent for a specific support issue, (b) for security investigations, or (c) to comply with applicable law.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          AI/ML Model Training
        </h3>
        <p>
          CaseDelta does not use Google Workspace data &mdash; including Gmail messages, Drive documents, or Calendar events &mdash; to train, retrain, or fine-tune any AI model. Your data is never fed back into any model&apos;s training pipeline.
        </p>
        <p style={{ marginTop: 12 }}>
          When Delta answers a question, it reads the specific documents and firm context (such as your firm&apos;s preferred document formats, recurring client names, and prior instructions) needed to respond in that moment. This context stays inside your firm&apos;s private environment, is never visible to any other firm, and is permanently deleted when your subscription ends. The underlying AI models themselves are not modified by your data in any way.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          Data Retention and Deletion of Google Data
        </h3>
        <p>
          Google user data is retained only as long as needed to provide the service. Attorneys and firms can request deletion of any or all Google-derived data at any time by contacting{" "}
          <a href="mailto:support@casedelta.com" style={LEGAL_LINK_STYLE}>
            support@casedelta.com
          </a>
          . When a subscription is canceled, all Google-derived data is permanently deleted 30 days after cancellation.
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
