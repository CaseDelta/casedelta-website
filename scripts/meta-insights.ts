/**
 * Meta Marketing API CLI — pull ad performance from the command line.
 *
 * Run: npm run meta:insights -- --level=ad --date-preset=yesterday
 *      npm run meta:insights -- --level=ad --since=2026-05-16 --until=2026-05-18
 *      npm run meta:insights -- --level=campaign --date-preset=last_7d --json
 */
import { getInsights, getActionCount, type InsightLevel, type DatePreset, type InsightRow } from '../lib/meta/insights';
import { MetaApiError } from '../lib/meta/client';

interface Args {
  level: InsightLevel;
  datePreset?: DatePreset;
  since?: string;
  until?: string;
  json: boolean;
  breakdowns?: string[];
  conversionEvent: string;
}

function parseArgs(argv: string[]): Args {
  const out: Args = { level: 'ad', json: false, conversionEvent: 'complete_registration' };
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue;
    const [k, vRaw] = raw.slice(2).split('=');
    const v = vRaw ?? 'true';
    switch (k) {
      case 'level':
        out.level = v as InsightLevel;
        break;
      case 'date-preset':
        out.datePreset = v as DatePreset;
        break;
      case 'since':
        out.since = v;
        break;
      case 'until':
        out.until = v;
        break;
      case 'json':
        out.json = v === 'true';
        break;
      case 'breakdowns':
        out.breakdowns = v.split(',').filter(Boolean);
        break;
      case 'conversion-event':
        out.conversionEvent = v;
        break;
      default:
        console.error(`Unknown flag: --${k}`);
        process.exit(2);
    }
  }
  if (out.since && !out.until) {
    console.error('Error: --since requires --until');
    process.exit(2);
  }
  return out;
}

function csvEscape(v: unknown): string {
  if (v == null) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

interface RenderResult {
  csv: string;
  phantomWarnings: string[];
}

function renderTable(rows: InsightRow[], level: InsightLevel, conversionEvent: string): RenderResult {
  const nameField =
    level === 'campaign' ? 'campaign_name' :
    level === 'adset' ? 'adset_name' :
    level === 'ad' ? 'ad_name' :
    'account_name';

  // `clicks` is Meta's all-engagement counter (text-expand, image-tap, profile click, etc).
  // `link_clicks` (inline_link_clicks) is actual outbound clicks to the landing URL —
  // the ONLY click metric that corresponds to a site visit. Surface both; flag divergence.
  const headers = [
    'name', 'impressions', 'reach',
    'clicks', 'link_clicks',
    'ctr (%)', 'link_ctr (%)',
    'cpc ($)', 'link_cpc ($)',
    'spend ($)', conversionEvent,
  ];
  const lines = [headers.join(',')];
  const phantomWarnings: string[] = [];

  for (const r of rows) {
    const conv = getActionCount(r, conversionEvent);
    const clicks = Number(r.clicks ?? 0);
    const linkClicks = Number(r.inline_link_clicks ?? 0);
    const impressions = Number(r.impressions ?? 0);
    const spend = Number(r.spend ?? 0);
    const linkCtr = impressions > 0 ? (linkClicks / impressions) * 100 : 0;
    const linkCpc = linkClicks > 0 ? spend / linkClicks : 0;

    lines.push([
      csvEscape(r[nameField]),
      r.impressions ?? '0',
      r.reach ?? '',
      r.clicks ?? '0',
      linkClicks,
      r.ctr ?? '',
      linkClicks > 0 || impressions > 0 ? linkCtr.toFixed(4) : '',
      r.cpc ?? '',
      linkClicks > 0 ? linkCpc.toFixed(2) : '',
      r.spend ?? '0',
      conv,
    ].map(csvEscape).join(','));

    // Phantom-click signal: meaningful number of "clicks" with very few/zero link clicks.
    // 5+ clicks and <50% of them are link clicks → likely engagement-counted-as-click noise.
    if (clicks >= 5 && linkClicks / Math.max(clicks, 1) < 0.5) {
      const phantomCount = clicks - linkClicks;
      phantomWarnings.push(
        `${r[nameField]}: ${clicks} reported clicks, only ${linkClicks} actual link clicks (${phantomCount} phantom — non-link engagement)`
      );
    }
  }
  return { csv: lines.join('\n'), phantomWarnings };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  try {
    const rows = await getInsights({
      level: args.level,
      datePreset: args.since ? undefined : (args.datePreset ?? 'yesterday'),
      timeRange: args.since && args.until ? { since: args.since, until: args.until } : undefined,
      breakdowns: args.breakdowns,
    });

    if (args.json) {
      process.stdout.write(JSON.stringify(rows, null, 2) + '\n');
    } else {
      const { csv, phantomWarnings } = renderTable(rows, args.level, args.conversionEvent);
      process.stdout.write(csv + '\n');
      if (rows.length === 0) {
        console.error('(no rows — ads may have had zero impressions, or account is paused)');
      }
      if (phantomWarnings.length > 0) {
        console.error('\n⚠ Phantom-click warning (Meta clicks ≠ actual link clicks):');
        for (const w of phantomWarnings) console.error(`  • ${w}`);
        console.error('Use link_clicks/link_ctr/link_cpc columns for real outbound traffic. `clicks` includes in-feed engagement.');
      }
    }
  } catch (err) {
    if (err instanceof MetaApiError) {
      console.error(`Meta API error [${err.code}/${err.type}]: ${err.message}`);
      if (err.code === 190) console.error('Token may be expired. Run: npm run meta:refresh-token');
      if (err.code === 200) console.error('Permission issue. Verify the System User has access to ad account in BM.');
      if (err.code === 17 || err.code === 4) console.error('Rate limited. Retry in 1h or use async report runs for large queries.');
      process.exit(1);
    }
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
