import { createHmac } from 'node:crypto';

const GRAPH_BASE = 'https://graph.facebook.com';

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function appsecretProof(token: string, appSecret: string): string {
  return createHmac('sha256', appSecret).update(token).digest('hex');
}

export interface MetaErrorBody {
  error: { message: string; type: string; code: number; fbtrace_id?: string };
}

export class MetaApiError extends Error {
  readonly code: number;
  readonly type: string;
  readonly fbtrace_id?: string;
  constructor(body: MetaErrorBody, status: number) {
    super(`Meta API ${status}: [${body.error.code}/${body.error.type}] ${body.error.message}`);
    this.code = body.error.code;
    this.type = body.error.type;
    this.fbtrace_id = body.error.fbtrace_id;
  }
}

export interface MetaFetchOptions {
  /** Query params to merge (auth params injected automatically). */
  params?: Record<string, string | number | boolean | undefined>;
  /** Auto-follow `paging.next` cursors and concatenate `data` arrays. Default true. */
  paginate?: boolean;
  /** Max pages to follow. Default 50 (a hard ceiling against runaway). */
  maxPages?: number;
}

interface PagedResponse<T> {
  data: T[];
  paging?: { next?: string; cursors?: { before?: string; after?: string } };
}

/**
 * Call a Graph API endpoint. Injects access_token + appsecret_proof, follows pagination by default.
 * `path` must NOT include the API version prefix — we add it from META_GRAPH_API_VERSION.
 */
export async function metaFetch<T>(path: string, opts: MetaFetchOptions = {}): Promise<T[]> {
  const token = env('META_SYSTEM_USER_TOKEN');
  const appSecret = env('META_APP_SECRET');
  const version = process.env.META_GRAPH_API_VERSION || 'v25.0';
  const proof = appsecretProof(token, appSecret);

  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(opts.params ?? {})) {
    if (v !== undefined) sp.set(k, String(v));
  }
  sp.set('access_token', token);
  sp.set('appsecret_proof', proof);

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  let url = `${GRAPH_BASE}/${version}${cleanPath}?${sp.toString()}`;

  const out: T[] = [];
  const maxPages = opts.maxPages ?? 50;
  const paginate = opts.paginate ?? true;
  let pages = 0;

  while (url && pages < maxPages) {
    pages++;
    const res = await fetch(url);
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
    const body = parsed as PagedResponse<T> | T;
    if (Array.isArray((body as PagedResponse<T>).data)) {
      out.push(...(body as PagedResponse<T>).data);
      const next = (body as PagedResponse<T>).paging?.next;
      url = paginate && next ? next : '';
    } else {
      // Non-paged response (single object). Wrap as a 1-item array.
      out.push(body as T);
      url = '';
    }
  }

  // Surface throttle headers via stderr for visibility — only on the last page.
  // (Headers from earlier pages aren't tracked here; fine for daily-scale audits.)
  return out;
}

/**
 * Fetch a single object (no `data` array expected at top level).
 * Used for endpoints like /me or /act_{id} that return a bare object.
 */
export async function metaFetchOne<T>(path: string, params: MetaFetchOptions['params'] = {}): Promise<T> {
  const arr = await metaFetch<T>(path, { params, paginate: false });
  if (arr.length === 0) throw new Error(`Empty response from ${path}`);
  return arr[0];
}
