import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";
import { readLead, domainOf, slackText, type Lead } from "@/lib/inbound";

/**
 * POST /api/lead?key=...   The iClosed webhook receiver.
 *
 * iClosed posts here on every stage of the demo form: contact created (phone
 * and name only), each update, qualified or disqualified, call booked,
 * cancelled, rescheduled, outcome added. Each delivery becomes one crm.touches
 * row, upserts the person into crm.contacts and their firm into crm.companies,
 * and posts to Slack. iClosed does not sign deliveries, so the URL carries a
 * key that has to match ICLOSED_WEBHOOK_KEY.
 *
 * Always answers 200 once the key matches: iClosed retries on anything else,
 * and a retry storm on a malformed payload helps nobody. Failures are logged.
 */
export async function POST(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  if (!process.env.ICLOSED_WEBHOOK_KEY || key !== process.env.ICLOSED_WEBHOOK_KEY) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "not json" });
  }
  const lead = readLead(payload);
  const results = await Promise.allSettled([
    writeCrm(lead, payload),
    postSlack(lead),
    capturePosthog(lead),
  ]);
  const errors = results
    .map((r, i) => (r.status === "rejected" ? `${["crm", "slack", "posthog"][i]}: ${String(r.reason?.message ?? r.reason)}` : null))
    .filter(Boolean);
  if (errors.length) console.error("[lead]", lead.stage, lead.email ?? lead.phone, errors.join(" | "));
  return NextResponse.json({ ok: errors.length === 0, stage: lead.stage, errors });
}

const STATUS_FOR_STAGE: Partial<Record<Lead["stage"], string>> = {
  booked: "meeting",
  rescheduled: "meeting",
  cancelled: "callback",
};

async function writeCrm(lead: Lead, payload: Record<string, unknown>) {
  const pool = getDbPool();
  if (!pool) throw new Error("DATABASE_URL is not set");
  const client = await pool.connect();
  try {
    await client.query("begin");
    const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(" ");

    // The firm, by the work email's domain when there is one, else by the name typed.
    let companyId: number | null = null;
    const domain = domainOf(lead.email);
    if (domain || lead.firm) {
      const found = await client.query<{ id: number }>(
        `select id from crm.companies
          where ($1::text is not null and lower(domain) = $1)
             or ($2::text is not null and lower(name) = lower($2))
          order by (lower(domain) = $1) desc nulls last limit 1`,
        [domain, lead.firm],
      );
      if (found.rows[0]) {
        companyId = found.rows[0].id;
        await client.query(
          `update crm.companies set
             practice_areas = coalesce(practice_areas, $2),
             attorney_count = coalesce(attorney_count, $3),
             domain = coalesce(domain, $4),
             external_refs = coalesce(external_refs, '{}'::jsonb) || $5::jsonb
           where id = $1`,
          [companyId, lead.practice, lead.attorneyCount, domain, JSON.stringify({ iclosed_contact_id: lead.iclosedId })],
        );
      } else {
        const ins = await client.query<{ id: number }>(
          `insert into crm.companies (name, domain, lead_source, practice_areas, attorney_count, external_refs)
           values ($1, $2, 'website_demo', $3, $4, $5::jsonb) returning id`,
          [lead.firm ?? domain, domain, lead.practice, lead.attorneyCount, JSON.stringify({ iclosed_contact_id: lead.iclosedId, self_declared: true })],
        );
        companyId = ins.rows[0].id;
      }
    }

    // The person, by the iClosed id first, then by email.
    const existing = await client.query<{ id: number }>(
      `select id from crm.contacts
        where (external_refs->>'iclosed_id') = $1
           or ($2::text is not null and exists (
                select 1 from jsonb_array_elements(coalesce(email_jsonb,'[]'::jsonb)) e
                 where lower(e->>'email') = $2))
        order by ((external_refs->>'iclosed_id') = $1) desc limit 1`,
      [String(lead.iclosedId), lead.email],
    );
    const emailJson = lead.email ? JSON.stringify([{ type: "Work", email: lead.email }]) : null;
    const phoneJson = lead.phone ? JSON.stringify([{ type: "Work", number: lead.phone }]) : null;
    const signalDetail = JSON.stringify({
      form: { system: lead.system, practice: lead.practice, attorneys: lead.attorneys, logins: lead.logins, role: lead.role, firm: lead.firm },
      tier: lead.tier, utm: lead.utm, stage: lead.stage, status: lead.rawStatus,
    });
    const refs = JSON.stringify({ iclosed_id: lead.iclosedId, iclosed_preview: lead.previewUrl, source: "website_demo" });
    const status = STATUS_FOR_STAGE[lead.stage] ?? null;
    let contactId: number;
    if (existing.rows[0]) {
      contactId = existing.rows[0].id;
      await client.query(
        `update crm.contacts set
           first_name = coalesce(nullif($2,''), first_name),
           last_name  = coalesce(nullif($3,''), last_name),
           email_jsonb = case when $4::jsonb is null then email_jsonb
                              when coalesce(email_jsonb,'[]'::jsonb) @> $4::jsonb then email_jsonb
                              else coalesce(email_jsonb,'[]'::jsonb) || $4::jsonb end,
           phone_jsonb = coalesce(phone_jsonb, $5::jsonb),
           company_id = coalesce(company_id, $6),
           role = case when role is null or role = 'other' then $7 else role end,
           practice_area = coalesce($8, practice_area),
           practice_side = case when $9 <> 'unknown' then $9 else practice_side end,
           practice_seen_at = case when $9 <> 'unknown' then now() else practice_seen_at end,
           signal = coalesce(signal, 'inbound_demo'),
           signal_at = coalesce(signal_at, now()),
           signal_detail = coalesce(signal_detail,'{}'::jsonb) || $10::jsonb,
           status = coalesce($11, status),
           last_seen = now(),
           external_refs = coalesce(external_refs,'{}'::jsonb) || $12::jsonb
         where id = $1`,
        [contactId, lead.firstName, lead.lastName, emailJson, phoneJson, companyId, lead.crmRole, lead.practice, lead.side, signalDetail, status, refs],
      );
    } else {
      // A lead with no email yet (phone and name only) cannot be named by the judgment
      // trigger, so it waits in Slack until the next delivery carries one.
      if (!lead.email) {
        await client.query("rollback");
        return;
      }
      await client.query(`select set_config('crm.judgment', $1, true)`, [
        JSON.stringify({ mode: "self_declared", email: lead.email, firm: lead.firm ?? domain ?? "(not given)", by: "iclosed_webhook", read: `demo form ${new Date().toISOString()}` }),
      ]);
      const ins = await client.query<{ id: number }>(
        `insert into crm.contacts
           (first_name, last_name, email_jsonb, phone_jsonb, company_id, role, practice_area,
            practice_side, practice_seen_at, signal, signal_at, signal_detail, status,
            first_seen, last_seen, external_refs, tags)
         values ($1, $2, $3::jsonb, $4::jsonb, $5, $6, $7, $8, now(), 'inbound_demo', now(), $9::jsonb,
                 coalesce($10, 'new'), now(), now(), $11::jsonb, '{}')
         returning id`,
        [lead.firstName, lead.lastName, emailJson, phoneJson, companyId, lead.crmRole, lead.practice, lead.side, signalDetail, status, refs],
      );
      contactId = ins.rows[0].id;
    }

    const dedupe = `iclosed:${lead.iclosedId}:${lead.stage}:${lead.callStart ?? ""}:${lead.callOutcome ?? ""}`;
    await client.query(
      `insert into crm.touches (contact_id, company_id, channel, action, direction, outcome, provider, provider_ref, dedupe_key, occurred_at, happened_at, meta, source)
       values ($1, $2, 'web', $3, 'inbound', $4, 'iclosed', $5, $6, now(), now(), $7::jsonb, 'agent')
       on conflict do nothing`,
      [contactId, companyId, `demo_${lead.stage}`, lead.callOutcome?.toLowerCase() ?? lead.rawStatus?.toLowerCase() ?? null,
       String(lead.iclosedId), dedupe, JSON.stringify({ stage: lead.stage, form: JSON.parse(signalDetail).form, tier: lead.tier, utm: lead.utm, call_start: lead.callStart, disqualified_by: lead.disqualifiedBy, hook: payload.hookType ?? payload.event_type })],
    );
    await client.query("commit");
  } catch (e) {
    await client.query("rollback").catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}

async function postSlack(lead: Lead) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_INBOUND_CHANNEL;
  if (!token || !channel) throw new Error("SLACK_BOT_TOKEN or SLACK_INBOUND_CHANNEL is not set");
  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ channel, text: slackText(lead), unfurl_links: false }),
  });
  const body = await res.json();
  if (!body.ok) throw new Error(`slack ${body.error}`);
}

/** demo_booked is the conversion source of truth; it used to fire from the browser on a click. */
async function capturePosthog(lead: Lead) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  if (!key) return;
  const event = { potential: "demo_form_started", qualified: "demo_qualified", disqualified: "demo_disqualified", booked: "demo_booked", cancelled: "demo_cancelled", rescheduled: "demo_rescheduled", outcome: "demo_outcome" }[lead.stage];
  await fetch(`${host}/capture/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: key, event,
      distinct_id: lead.email ?? lead.phone ?? `iclosed:${lead.iclosedId}`,
      properties: { source: "iclosed", system: lead.system, practice: lead.practice, attorneys: lead.attorneys, logins: lead.logins, tier: lead.tier, outcome: lead.callOutcome, ...Object.fromEntries(Object.entries(lead.utm).map(([k, v]) => ["$" + k, v])) },
    }),
  });
}
