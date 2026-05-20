import { createHmac } from 'node:crypto';
import { metaFetch, metaFetchOne, MetaApiError, type MetaErrorBody } from './client';

const GRAPH_BASE = 'https://graph.facebook.com';

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function appsecretProof(token: string, appSecret: string): string {
  return createHmac('sha256', appSecret).update(token).digest('hex');
}

export interface AdRef {
  id: string;
  name: string;
  status: string;
  effective_status: string;
  creative?: { id: string };
}

export interface AdCreative {
  id: string;
  name?: string;
  body?: string;
  title?: string;
  link_url?: string;
  image_url?: string;
  image_hash?: string;
  video_id?: string;
  effective_object_story_id?: string;
  object_story_id?: string;
  object_story_spec?: Record<string, unknown>;
  asset_feed_spec?: Record<string, unknown>;
  call_to_action_type?: string;
  thumbnail_url?: string;
}

/** List all ads in an ad account along with their creative reference. */
export async function listAdsWithCreatives(adAccountId?: string): Promise<AdRef[]> {
  const id = adAccountId ?? env('META_AD_ACCOUNT_ID');
  return metaFetch<AdRef>(`/act_${id}/ads`, {
    params: { fields: 'id,name,status,effective_status,creative' },
  });
}

/** Fetch full creative content (body, title, image, etc.) for a creative ID. */
export async function getCreative(creativeId: string): Promise<AdCreative> {
  const fields = [
    'id',
    'name',
    'body',
    'title',
    'link_url',
    'image_url',
    'image_hash',
    'video_id',
    'effective_object_story_id',
    'object_story_id',
    'object_story_spec',
    'asset_feed_spec',
    'call_to_action_type',
    'thumbnail_url',
  ].join(',');
  return metaFetchOne<AdCreative>(`/${creativeId}`, { fields });
}

/** Pull every ad's creative content, in parallel. Returns ad + creative pairs. */
export async function dumpAllCreatives(adAccountId?: string): Promise<Array<{ ad: AdRef; creative: AdCreative }>> {
  const ads = await listAdsWithCreatives(adAccountId);
  const pairs = await Promise.all(
    ads.map(async (ad) => {
      if (!ad.creative?.id) return { ad, creative: { id: '' } as AdCreative };
      const creative = await getCreative(ad.creative.id);
      return { ad, creative };
    }),
  );
  return pairs;
}

/**
 * Create a new ad creative. Most use cases want `object_story_spec` (inline creative)
 * or pass an existing Page post ID via `object_story_id`.
 */
export async function createAdCreative(args: {
  adAccountId?: string;
  name: string;
  objectStorySpec?: Record<string, unknown>;
  objectStoryId?: string;
}): Promise<{ id: string }> {
  const adAccountId = args.adAccountId ?? env('META_AD_ACCOUNT_ID');
  const token = env('META_SYSTEM_USER_TOKEN');
  const appSecret = env('META_APP_SECRET');
  const version = process.env.META_GRAPH_API_VERSION || 'v25.0';
  const proof = appsecretProof(token, appSecret);

  const form = new URLSearchParams();
  form.set('name', args.name);
  if (args.objectStorySpec) form.set('object_story_spec', JSON.stringify(args.objectStorySpec));
  if (args.objectStoryId) form.set('object_story_id', args.objectStoryId);
  form.set('access_token', token);
  form.set('appsecret_proof', proof);

  const url = `${GRAPH_BASE}/${version}/act_${adAccountId}/adcreatives`;
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
  return parsed as { id: string };
}
