/**
 * Reading an iClosed webhook into what the CRM and Slack need.
 *
 * iClosed posts one JSON object per delivery. Contact hooks carry the answers
 * under questionsAndAnswers keyed by the question's label; call hooks carry
 * them under questions_and_responses. The labels are matched loosely here so
 * a wording change on the form does not silently drop a field.
 */
import { TIERS } from "@/lib/pricing";

export type Stage =
  | "potential"
  | "qualified"
  | "disqualified"
  | "booked"
  | "cancelled"
  | "rescheduled"
  | "outcome";

export interface Lead {
  iclosedId: number | null;
  stage: Stage;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  firm: string | null;
  system: string | null;
  practice: string | null;
  attorneys: string | null;
  logins: string | null;
  role: string | null;
  /** The role vocabulary crm.contacts.role already uses. */
  crmRole: "partner" | "attorney" | "office_manager" | "staff" | "other";
  side: "plaintiff" | "defense" | "unknown";
  attorneyCount: number | null;
  tier: string | null;
  utm: Record<string, string>;
  previewUrl: string | null;
  callStart: string | null;
  callOutcome: string | null;
  disqualifiedBy: string | null;
  rawStatus: string | null;
}

const FREE_MAIL = /^(gmail|yahoo|hotmail|outlook|icloud|aol|me|live|msn|proton|protonmail)\.(com|net|org|me)$/i;

export function domainOf(email: string | null): string | null {
  const d = email?.split("@")[1]?.toLowerCase().trim();
  if (!d || FREE_MAIL.test(d)) return null;
  return d;
}

type Answers = Record<string, unknown>;

/** First answer whose question label matches the pattern. */
function answer(answers: Answers, pattern: RegExp): string | null {
  for (const [label, value] of Object.entries(answers)) {
    if (/^\d+_(question|response)$/.test(label)) continue;
    if (pattern.test(label) && typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function crmRole(role: string | null): Lead["crmRole"] {
  const r = (role ?? "").toLowerCase();
  if (/owner|partner|founder/.test(r)) return "partner";
  if (/attorney|lawyer|counsel/.test(r)) return "attorney";
  if (/admin|operations|ops|manager/.test(r)) return "office_manager";
  if (/paralegal|assistant|staff/.test(r)) return "staff";
  return "other";
}

function side(practice: string | null): Lead["side"] {
  const p = (practice ?? "").toLowerCase();
  if (!p) return "unknown";
  if (/defen/.test(p)) return "defense";
  return "plaintiff";
}

/** "3 to 5" reads as 5, "16+" as 16, "1" as 1: the band's upper edge, so a tier lookup lands in the right band. */
function upperOf(band: string | null): number | null {
  if (!band) return null;
  const nums = band.match(/\d+/g)?.map(Number);
  if (!nums?.length) return null;
  return /\+/.test(band) ? nums[0] : Math.max(...nums);
}

function tierFor(logins: string | null): string | null {
  const n = upperOf(logins);
  if (n == null) return null;
  const tier = TIERS.find((t) => n <= t.accounts) ?? TIERS[TIERS.length - 1];
  return `${tier.price} per firm / month (${tier.band})`;
}

function utmOf(tracking: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!tracking || typeof tracking !== "object") return out;
  for (const [k, v] of Object.entries(tracking as Record<string, unknown>)) {
    if (typeof v === "string" && v && !/^utm(Key|Value)_/.test(k)) out[k] = v;
  }
  return out;
}

function stageOf(p: Record<string, unknown>): Stage {
  const hook = String(p.hookType ?? p.event_type ?? "").toLowerCase();
  const status = String(p.status ?? "").toUpperCase();
  if (hook.includes("outcome")) return "outcome";
  if (hook.includes("cancel")) return "cancelled";
  if (hook.includes("reschedul")) return "rescheduled";
  if (hook === "callbooked" || hook.includes("scheduled") || /BOOKED/.test(status)) return "booked";
  if (status === "DISQUALIFIED") return "disqualified";
  if (status === "QUALIFIED") return "qualified";
  return "potential";
}

export function readLead(p: Record<string, unknown>): Lead {
  const call = (p.event_type && p.event ? p : null) as null | {
    invitee?: { name?: string; email?: string; text_reminder_number?: string };
    event?: { utc_start_time?: string; uuid?: string };
    questions_and_responses?: Answers;
    tracking?: unknown;
  };
  const answers: Answers = {
    ...((p.questionsAndAnswers as Answers) ?? {}),
    ...((call?.questions_and_responses as Answers) ?? {}),
  };
  const inviteeName = call?.invitee?.name?.trim() ?? "";
  const [inviteeFirst, ...inviteeRest] = inviteeName.split(/\s+/);
  const email =
    (p.email as string) ?? call?.invitee?.email ?? answer(answers, /e-?mail/i) ?? null;
  const practice = answer(answers, /practice/i);
  const role = answer(answers, /role/i);
  const attorneys = answer(answers, /attorney/i);
  const logins = answer(answers, /log ?in|people|accounts/i);
  const dq = Array.isArray(p.disqualifyingGroup) && p.disqualifyingGroup.length
    ? JSON.stringify(p.disqualifyingGroup)
    : null;
  return {
    iclosedId: typeof p.id === "number" ? p.id : typeof p.contactId === "number" ? p.contactId : null,
    stage: stageOf(p),
    firstName: (p.firstName as string) ?? (inviteeFirst || null),
    lastName: (p.lastName as string) ?? (inviteeRest.join(" ") || null),
    email: email ? email.toLowerCase() : null,
    phone: (p.phoneNumber as string) ?? call?.invitee?.text_reminder_number ?? null,
    firm: answer(answers, /firm name|company/i),
    system: answer(answers, /system|software|manage/i),
    practice,
    attorneys,
    logins,
    role,
    crmRole: crmRole(role),
    side: side(practice),
    attorneyCount: upperOf(attorneys),
    tier: tierFor(logins),
    utm: utmOf(p.tracking ?? call?.tracking),
    previewUrl: (p.previewUrl as string) ?? null,
    callStart: (p.startTime as string) ?? call?.event?.utc_start_time ?? null,
    callOutcome: (p.callOutcome as string) ?? null,
    disqualifiedBy: dq,
    rawStatus: (p.status as string) ?? null,
  };
}

const STAGE_LINE: Record<Stage, string> = {
  potential: "started the demo form",
  qualified: "qualified on the demo form",
  disqualified: "was disqualified on the demo form",
  booked: "booked a demo",
  cancelled: "cancelled their demo",
  rescheduled: "rescheduled their demo",
  outcome: "demo outcome recorded",
};

export function slackText(lead: Lead): string {
  const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ") || lead.email || lead.phone || "Someone";
  const lines = [`*${name}* ${STAGE_LINE[lead.stage]}.`];
  const facts = [
    lead.firm && `Firm: ${lead.firm}`,
    lead.system && `System: ${lead.system}`,
    lead.practice && `Practice: ${lead.practice}`,
    lead.attorneys && `Attorneys: ${lead.attorneys}`,
    lead.logins && `Logins: ${lead.logins}`,
    lead.tier && `Tier: ${lead.tier}`,
    lead.role && `Role: ${lead.role}`,
    lead.email && `Email: ${lead.email}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.callStart && `Call: ${new Date(lead.callStart).toLocaleString("en-US", { timeZone: "America/Chicago" })} CT`,
    lead.callOutcome && `Outcome: ${lead.callOutcome}`,
    lead.disqualifiedBy && `Rule: ${lead.disqualifiedBy}`,
    lead.utm.utm_source && `Source: ${lead.utm.utm_source}${lead.utm.utm_campaign ? " / " + lead.utm.utm_campaign : ""}`,
  ].filter(Boolean);
  if (facts.length) lines.push(facts.join("  ·  "));
  if (lead.side === "defense") lines.push("Defense side. Cancel or keep it short.");
  if (lead.previewUrl) lines.push(`<${lead.previewUrl}|Open in iClosed>`);
  return lines.join("\n");
}
