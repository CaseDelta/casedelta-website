import { metaFetch } from './client';

export type InsightLevel = 'account' | 'campaign' | 'adset' | 'ad';

export type DatePreset =
  | 'today'
  | 'yesterday'
  | 'last_3d'
  | 'last_7d'
  | 'last_14d'
  | 'last_30d'
  | 'last_90d'
  | 'this_month'
  | 'last_month'
  | 'maximum';

/** One row of action counts (e.g. complete_registration, link_click). */
export interface ActionEntry {
  action_type: string;
  value: string;
}

export interface InsightRow {
  date_start?: string;
  date_stop?: string;
  account_id?: string;
  account_name?: string;
  campaign_id?: string;
  campaign_name?: string;
  adset_id?: string;
  adset_name?: string;
  ad_id?: string;
  ad_name?: string;
  impressions?: string;
  reach?: string;
  frequency?: string;
  clicks?: string;
  unique_clicks?: string;
  inline_link_clicks?: string;
  ctr?: string;
  cpc?: string;
  cpm?: string;
  spend?: string;
  actions?: ActionEntry[];
  action_values?: ActionEntry[];
  cost_per_action_type?: ActionEntry[];
  [key: string]: unknown;
}

export interface GetInsightsArgs {
  /** Defaults to env META_AD_ACCOUNT_ID. Numeric ID only — `act_` prefix is added. */
  adAccountId?: string;
  level: InsightLevel;
  datePreset?: DatePreset;
  /** Custom time range — overrides datePreset when set. */
  timeRange?: { since: string; until: string };
  /** 1 for daily, 7 for weekly, "monthly", "all_days". Default unspecified (returns one row per period). */
  timeIncrement?: number | 'monthly' | 'all_days';
  /** Default starter set if omitted. */
  fields?: string[];
  /** e.g. ['publisher_platform', 'device_platform']. Each multiplies row count. */
  breakdowns?: string[];
  actionBreakdowns?: string[];
  /** Filter to only ACTIVE entities by default. Pass undefined to disable. */
  filtering?: Array<{ field: string; operator: string; value: unknown }>;
  /** Max rows to fetch across all pages. Safety cap. Default 5000. */
  limit?: number;
}

const DEFAULT_FIELDS = [
  'campaign_name',
  'adset_name',
  'ad_name',
  'impressions',
  'reach',
  'frequency',
  'clicks',
  'unique_clicks',
  'inline_link_clicks',
  'ctr',
  'cpc',
  'cpm',
  'spend',
  'actions',
  'action_values',
  'cost_per_action_type',
];

export async function getInsights(args: GetInsightsArgs): Promise<InsightRow[]> {
  const adAccountId = args.adAccountId ?? process.env.META_AD_ACCOUNT_ID;
  if (!adAccountId) throw new Error('No ad account id (pass adAccountId or set META_AD_ACCOUNT_ID).');

  const fields = (args.fields ?? DEFAULT_FIELDS).join(',');
  const params: Record<string, string | number | undefined> = {
    level: args.level,
    fields,
    limit: 500,
  };

  if (args.timeRange) {
    params.time_range = JSON.stringify(args.timeRange);
  } else {
    params.date_preset = args.datePreset ?? 'yesterday';
  }
  if (args.timeIncrement !== undefined) params.time_increment = String(args.timeIncrement);
  if (args.breakdowns?.length) params.breakdowns = args.breakdowns.join(',');
  if (args.actionBreakdowns?.length) params.action_breakdowns = args.actionBreakdowns.join(',');
  if (args.filtering?.length) params.filtering = JSON.stringify(args.filtering);

  const rows = await metaFetch<InsightRow>(`/act_${adAccountId}/insights`, { params });

  const cap = args.limit ?? 5000;
  return rows.slice(0, cap);
}

/** Extract a specific action count (e.g. `complete_registration`) from a row's `actions` array. */
export function getActionCount(row: InsightRow, actionType: string): number {
  const entry = row.actions?.find((a) => a.action_type === actionType);
  return entry ? Number(entry.value) : 0;
}
