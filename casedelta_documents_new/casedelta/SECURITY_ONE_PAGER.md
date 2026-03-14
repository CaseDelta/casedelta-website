# CaseDelta — Data Security & Privacy Overview

**Prepared for:** Kirschbaum & Nowotny, LLC
**Date:** March 2026

> **Document context:** This one-pager uses intentionally technical language because Kirschbaum & Nowotny is an immigration firm that explicitly requested technical detail on data handling. This is NOT the general customer-facing security narrative — it's a compliance document for a specific prospect. For the security story to use in sales conversations and marketing, see `CASEDELTA_NARRATIVE.md` — "The Security Narrative" section, which uses the "belonging" framing rather than technical specifications.

---

## What CaseDelta Does

CaseDelta connects to your existing case management and calendar systems — like Camp Legal and Google Calendar — and lets you ask plain-English questions about your clients and cases. It reads your data, generates answers, and nothing more.

---

## Your Data Never Leaves Your Control

- **We do not store your client data on our servers.** CaseDelta reads from your systems (Camp Legal, Google Calendar) at query time and returns a response. We do not maintain a copy of your case records.
- **We do not share your data with any third party** — not with AI companies, not with cloud vendors, not with anyone.
- **We do not use your data to train any AI model**, now or in the future.

---

## No Third-Party AI

CaseDelta does **not** use ChatGPT, OpenAI, Google AI, or any external AI service. Every AI model we use is developed and operated by CaseDelta on infrastructure we own and control. Your clients' names, A-numbers, case notes, and documents are never transmitted to any external AI system.

---

## Access & Credentials

- CaseDelta connects to Camp Legal using a **dedicated account** created specifically for integration — no shared staff credentials are ever used. We may explore a route to directly connect with Camp Legal's API, depending on their public capability.
- Google Calendar is connected via **Google's standard OAuth authorization**, meaning you grant and can revoke access at any time directly from your Google account settings.
- You can disconnect CaseDelta from any system at any time, instantly.

---

## Encryption & Transmission

- All data in transit between your systems and CaseDelta is encrypted using **TLS 1.2 or higher** (the same standard your bank uses).
- Queries and responses are processed in memory and not written to disk.

---

## Confidentiality Commitment

We understand that immigration law involves some of the most sensitive personal data that exists — immigration status, criminal history, A-numbers, family records. We treat this data with the seriousness it deserves.

CaseDelta will:
- Access only the systems and data you explicitly authorize
- Never disclose client information to any party
- Immediately notify you of any security incident that could affect your firm's data
- Comply with any confidentiality or data processing agreement your firm requires

---

## Questions?

**Camren Hall — Founder, CaseDelta**
camren@casedelta.com

*We are happy to sign a confidentiality or data processing agreement, provide additional documentation, or walk through any of the above in more detail.*
