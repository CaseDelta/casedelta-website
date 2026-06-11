"use client";

import {
  LegalPageLayoutV2,
  LegalSectionV2,
  LegalClosingV2,
  LEGAL_LINK_STYLE,
} from "@/components/LegalPageLayoutV2";

export default function PrivacyClient() {
  return (
    <LegalPageLayoutV2 title="Privacy Policy" lastUpdated="May 6, 2026">
      <LegalSectionV2 title="How We Process Your Data">
        <p>
          Each firm&apos;s data is isolated and encrypted both at rest and in transit. Your documents are never used to train AI, and never sold or shared. You control your data: you can export it and request its deletion at any time.
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
            <strong>Google Drive</strong> (<code>drive</code>) &mdash; to read, search, organize, and write case documents (including Google Docs and Sheets, which reside in Drive) across the firm&apos;s Drive. Attorneys query the CaseDelta agent in natural language (e.g., &ldquo;pull every filing in Smith v. Jones,&rdquo; &ldquo;file the deposition transcripts under Smith&nbsp;v.&nbsp;Jones / Discovery,&rdquo; or &ldquo;remove the duplicate intake forms&rdquo;), and the agent must be able to (1) discover and retrieve relevant documents firm-wide for analysis, (2) save AI-generated work product (chronologies, demand letters, deposition outlines, exhibit indexes) back into the matter folder, (3) organize files into per-case folder structures, and (4) delete files at explicit attorney direction (duplicates, superseded drafts, completed-case archives). The narrower <em>drive.file</em> scope is incompatible with this use case because it only grants per-file access to files the user pre-selects, which defeats the agent&apos;s ability to discover or organize firm-wide. The narrower <em>drive.readonly</em> scope cannot satisfy use cases (2)&ndash;(4). Write and delete actions are always initiated from the attorney&apos;s natural-language instruction; CaseDelta does not autonomously modify or delete user files.
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
          Data received from Google APIs is used solely to provide the services the attorney has requested: document retrieval, chronology generation, correspondence drafting, and calendaring. It is processed under per-firm isolation, encrypted in transit and at rest, and returned to the attorney as answers, drafts, or generated documents.
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
        <p>These commitments are core to how CaseDelta operates:</p>
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

      <LegalSectionV2 title="Cookies, Analytics, and Advertising">
        <p>
          The CaseDelta marketing site (the public pages at casedelta.com) uses a small set of third-party tools to measure how people find this site and to attribute the performance of our paid ad campaigns. These tools have no access to client data inside the CaseDelta product. They only see public marketing-site activity such as which pages you visit, when you submit our demo form, and basic device and browser information.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          Tools we use on the marketing site
        </h3>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 10 }}>
            <strong>PostHog</strong> for product analytics. PostHog records page views, the demo-booking conversion funnel, and a session-replay-style record of how visitors navigate. PostHog stores data in the United States. We do not share PostHog data with advertisers.
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>LinkedIn Insight Tag</strong> for matching site visitors to LinkedIn ad campaigns. LinkedIn receives your IP address, browser fingerprint, and (where you have submitted it) a hashed copy of your email address.
          </li>
          <li>
            <strong>Meta Pixel (Facebook)</strong> for matching site visitors to Meta ad campaigns. Meta receives your IP address, a first-party cookie identifier, and (where you have submitted them on this site) a hashed copy of your name and email address. We do not transmit any client data, case information, or product activity to Meta.
          </li>
        </ul>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          Visitors from the EU, EEA, UK, and Switzerland
        </h3>
        <p>
          For visitors detected as originating from the European Union, the European Economic Area, the United Kingdom, or Switzerland, the Meta Pixel is suppressed at our edge layer and never loads in the browser. This is automated based on the country header provided by our hosting provider; no consent prompt is shown because no advertising pixel runs.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginTop: 28, marginBottom: 12, letterSpacing: "-0.015em" }}>
          How to opt out
        </h3>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 8 }}>
            Opt out of Meta ad personalization at your{" "}
            <a
              href="https://accountscenter.facebook.com/ads/settings"
              target="_blank"
              rel="noopener noreferrer"
              style={LEGAL_LINK_STYLE}
            >
              Meta Accounts Center ad preferences
            </a>
            .
          </li>
          <li style={{ marginBottom: 8 }}>
            Opt out of LinkedIn ad personalization at your{" "}
            <a
              href="https://www.linkedin.com/psettings/advertising"
              target="_blank"
              rel="noopener noreferrer"
              style={LEGAL_LINK_STYLE}
            >
              LinkedIn advertising preferences
            </a>
            .
          </li>
          <li style={{ marginBottom: 8 }}>
            Opt out of PostHog tracking by emailing{" "}
            <a href="mailto:support@casedelta.com" style={LEGAL_LINK_STYLE}>
              support@casedelta.com
            </a>
            {" "}with your request.
          </li>
          <li>
            You can also block all of the above with a tracking-blocker browser extension or your browser&apos;s built-in privacy controls.
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
