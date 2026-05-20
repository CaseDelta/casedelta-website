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

function renderTable(rows: InsightRow[], level: InsightLevel, conversionEvent: string): string {
  const nameField =
    level === 'campaign' ? 'campaign_name' :
    level === 'adset' ? 'adset_name' :
    level === 'ad' ? 'ad_name' :
    'account_name';

  const headers = ['name', 'impressions', 'reach', 'clicks', 'ctr (%)', 'cpc ($)', 'spend ($)', conversionEvent];
  const lines = [headers.join(',')];
  for (const r of rows) {
    const conv = getActionCount(r, conversionEvent);
    lines.push([
      csvEscape(r[nameField]),
      r.impressions ?? '0',
      r.reach ?? '',
      r.clicks ?? '0',
      r.ctr ?? '',
      r.cpc ?? '',
      r.spend ?? '0',
      conv,
    ].map(csvEscape).join(','));
  }
  return lines.join('\n');
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
      process.stdout.write(renderTable(rows, args.level, args.conversionEvent) + '\n');
      if (rows.length === 0) {
        console.error('(no rows — ads may have had zero impressions, or account is paused)');
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
