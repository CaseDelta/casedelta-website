import { LegalPage, LegalSection, LEGAL_LINK_STYLE } from "@/components/concept/ConceptLegal";

/*
 * Written 2026-09-25 to cover every dimension in plain terms, without describing
 * individual features, so it does not need editing each time the product changes.
 *
 * Two sections are required by outside parties and must not be cut:
 *  - "Google user data": Google's OAuth verification checks for the Limited Use
 *    statement, the AI training statement, and how data is used, stored, shared
 *    and deleted.
 *  - "Text messages": carrier registration for business texting (A2P 10DLC) checks
 *    that mobile numbers are never shared for marketing, and for STOP/HELP.
 */
const SUPPORT = "support@casedelta.com";
const Mail = () => <a href={`mailto:${SUPPORT}`} style={LEGAL_LINK_STYLE}>{SUPPORT}</a>;

export default function PrivacyClient() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="September 25, 2026">
      <LegalSection title="About this policy">
        <p>This policy covers the CaseDelta service, including Delta, our AI paralegal, and this website. Questions go to <Mail/>.</p>
      </LegalSection>

      <LegalSection title="What we collect">
        <ul>
          <li><strong>Account information.</strong> Names, work email addresses, phone numbers and firm details for the people who use CaseDelta.</li>
          <li><strong>Firm data.</strong> The documents, case records, email, calendar entries and other information Delta reads or creates in the systems your firm connects, at your direction.</li>
          <li><strong>Sign-in access.</strong> The access your firm grants to connected systems, such as sign-in sessions, tokens or keys. These are stored encrypted.</li>
          <li><strong>Activity records.</strong> A log of what Delta did, when, and at whose request.</li>
          <li><strong>Website data.</strong> Pages visited, forms submitted, and basic device and browser information from visitors to this website.</li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use it">
        <ul>
          <li>To provide the service: answering questions, doing the work you ask for, and running the tasks you schedule.</li>
          <li>To support you, keep the service secure, and fix problems.</li>
          <li>To communicate with you about your account.</li>
          <li>On this website only, to measure visits and the performance of our advertising.</li>
        </ul>
        <p>We never use your firm&apos;s data to train AI models, and we never sell it.</p>
      </LegalSection>

      <LegalSection title="AI processing">
        <p>Delta uses AI models from established providers to read and write on your behalf. Those providers process your data only to return a response to us, under terms that prohibit them from using it to train their models. The models are not changed by your data.</p>
      </LegalSection>

      <LegalSection title="How we share it">
        <p>We share data only with service providers that help us run CaseDelta, such as cloud hosting, databases, AI model providers, browser infrastructure, email and text message delivery, payments and website analytics. They act on our instructions and must protect the data. We may also disclose data when the law requires it, to protect rights and safety, or as part of a merger or sale of the business, under this policy.</p>
        <p>Each firm&apos;s data is kept separate. No other firm can see it.</p>
      </LegalSection>

      <LegalSection title="Text messages">
        <p>If you give us a mobile number, we use it to send the messages you ask for, such as demo confirmations, sign-in codes and messages from Delta. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</p>
      </LegalSection>

      <LegalSection title="Google user data">
        <p>When a user connects Google, Delta accesses Gmail, Google Drive and Google Calendar only to do what that user asks: reading and organizing case documents, reading and drafting email, and reading and creating calendar events. Delta does not send email or delete files unless the user directs it to.</p>
        <p>CaseDelta&apos;s use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" style={LEGAL_LINK_STYLE}>Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
        <p>Google user data is encrypted in transit and at rest and kept separate for each firm. We do not sell it, use it for advertising, or use it to train, retrain or fine-tune any AI or machine learning model. People at CaseDelta do not read it except with the user&apos;s permission for a support request, for security investigations, or where the law requires. It is deleted on request, and within 30 days after a subscription ends.</p>
        <p>Data from other connected platforms, such as Microsoft 365, is handled the same way.</p>
      </LegalSection>

      <LegalSection title="Security">
        <p>Data is encrypted in transit and at rest, access is limited to what the service needs, and activity is logged. CaseDelta is built to handle protected health information and client confidences under HIPAA and the confidentiality rules lawyers follow. People at CaseDelta access firm data only with the firm&apos;s permission for a support request, for security investigations, or where the law requires. No system is perfectly secure, and we will notify affected customers of a breach as the law requires.</p>
      </LegalSection>

      <LegalSection title="Cookies and advertising on this website">
        <p>This website uses PostHog for analytics, including recordings of how visitors navigate, and the LinkedIn Insight Tag and Meta Pixel to measure our advertising. These tools see activity on this website only, never data inside the CaseDelta service. The Meta Pixel does not load for visitors in the EU, EEA, UK or Switzerland.</p>
        <p>You can opt out through your <a href="https://accountscenter.facebook.com/ads/settings" style={LEGAL_LINK_STYLE}>Meta ad settings</a>, your <a href="https://www.linkedin.com/psettings/advertising" style={LEGAL_LINK_STYLE}>LinkedIn ad settings</a>, your browser&apos;s privacy controls, or by emailing <Mail/>.</p>
      </LegalSection>

      <LegalSection title="Retention and deletion">
        <p>We keep data while your firm&apos;s account is active. After cancellation, your firm has 30 days to export its data, and then it is deleted. You can ask us to delete any data sooner. Copies in backups are removed on their normal cycle.</p>
      </LegalSection>

      <LegalSection title="Your choices and rights">
        <p>You can ask to see, export, correct or delete your data, and opt out of marketing email at any time. Depending on where you live, you may have further rights under laws such as the California Consumer Privacy Act; we honor them and will not treat you differently for using them. We process client information on behalf of the law firm that controls it, so requests from a firm&apos;s clients go to that firm. Send requests to <Mail/>.</p>
      </LegalSection>

      <LegalSection title="Other terms">
        <p>CaseDelta is for businesses and is not directed to anyone under 18. We store and process data in the United States. We may update this policy; if a change is material, we will tell account holders by email or in the service before it takes effect.</p>
      </LegalSection>
    </LegalPage>
  );
}
