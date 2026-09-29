import { createHmac } from 'node:crypto';
import { MetaApiError, type MetaErrorBody } from './client';

const GRAPH_BASE = 'https://graph.facebook.com';

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function appsecretProof(token: string, appSecret: string): string {
  return createHmac('sha256', appSecret).update(token).digest('hex');
}

/**
 * POST to a Graph API endpoint. Used for mutations.
 * Adds appsecret_proof + access_token automatically. Body is form-encoded.
 */
async function metaPost<T>(path: string, body: Record<string, string | number | boolean>): Promise<T> {
  const token = env('META_SYSTEM_USER_TOKEN');
  const appSecret = env('META_APP_SECRET');
  const version = process.env.META_GRAPH_API_VERSION || 'v25.0';
  const proof = appsecretProof(token, appSecret);

  const form = new URLSearchParams();
  for (const [k, v] of Object.entries(body)) form.set(k, String(v));
  form.set('access_token', token);
  form.set('appsecret_proof', proof);

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${GRAPH_BASE}/${version}${cleanPath}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });

  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Meta API non-JSON ${res.status}: ${text.slice(0, 200)}`);
  }
  if (!res.ok || (parsed as MetaErrorBody).error) {
    throw new MetaApiError(parsed as MetaErrorBody, res.status);
  }
  return parsed as T;
}

/** Update an ad set's daily budget. Pass cents (e.g. 2500 for $25/day). */
export async function updateAdSetBudget(adsetId: string, dailyBudgetCents: number): Promise<{ success: true }> {
  return metaPost<{ success: true }>(`/${adsetId}`, { daily_budget: dailyBudgetCents });
}

/** Pause or resume an ad set. */
export async function setAdSetStatus(adsetId: string, status: 'ACTIVE' | 'PAUSED'): Promise<{ success: true }> {
  return metaPost<{ success: true }>(`/${adsetId}`, { status });
}

/** Pause or resume a single ad. */
export async function setAdStatus(adId: string, status: 'ACTIVE' | 'PAUSED'): Promise<{ success: true }> {
  return metaPost<{ success: true }>(`/${adId}`, { status });
}

/** Swap the creative attached to an existing ad. Ad must be paused. */
export async function updateAdCreative(adId: string, creativeId: string): Promise<{ success: true }> {
  return metaPost<{ success: true }>(`/${adId}`, { creative: JSON.stringify({ creative_id: creativeId }) });
}

/** Rename an ad. */
export async function updateAdName(adId: string, name: string): Promise<{ success: true }> {
  return metaPost<{ success: true }>(`/${adId}`, { name });
}

/** Pause or resume a campaign. */
export async function setCampaignStatus(campaignId: string, status: 'ACTIVE' | 'PAUSED'): Promise<{ success: true }> {
  return metaPost<{ success: true }>(`/${campaignId}`, { status });
}

/**
 * Create a new ad. Caller must already have created a creative (via createAdCreative).
 * New ads default to PAUSED so they don't immediately spend. Set status='ACTIVE' to publish.
 */
export async function createAd(args: {
  adAccountId?: string;
  name: string;
  adsetId: string;
  creativeId: string;
  status?: 'ACTIVE' | 'PAUSED';
}): Promise<{ id: string }> {
  const adAccountId = args.adAccountId ?? env('META_AD_ACCOUNT_ID');
  return metaPost<{ id: string }>(`/act_${adAccountId}/ads`, {
    name: args.name,
    adset_id: args.adsetId,
    creative: JSON.stringify({ creative_id: args.creativeId }),
    status: args.status ?? 'PAUSED',
  });
}
