/**
 * Resume a paused ad or ad set.
 *
 * Defaults to DRY RUN — pass --confirm to execute.
 *
 *   npm run meta:resume -- --ad=52531549521605 --confirm
 *   npm run meta:resume -- --adset=52531549521005 --confirm
 */
import { metaFetchOne } from '../lib/meta/client';
import { setAdStatus, setAdSetStatus } from '../lib/meta/mutations';
import { MetaApiError } from '../lib/meta/client';

interface Args {
  ad?: string;
  adset?: string;
  confirm: boolean;
}

function parseArgs(argv: string[]): Args {
  const out: Args = { confirm: false };
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue;
    const [k, vRaw] = raw.slice(2).split('=');
    const v = vRaw ?? 'true';
    if (k === 'ad') out.ad = v;
    else if (k === 'adset') out.adset = v;
    else if (k === 'confirm') out.confirm = v === 'true';
    else {
      console.error(`Unknown flag: --${k}`);
      process.exit(2);
    }
  }
  if (!out.ad && !out.adset) {
    console.error('Required: --ad=<id> OR --adset=<id>');
    process.exit(2);
  }
  if (out.ad && out.adset) {
    console.error('Pass either --ad or --adset, not both');
    process.exit(2);
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  try {
    if (args.adset) {
      const current = await metaFetchOne<{ name: string; effective_status: string }>(`/${args.adset}`, {
        fields: 'name,effective_status',
      });
      console.error(`Ad set: ${current.name} (${args.adset})`);
      console.error(`Status: ${current.effective_status} → ACTIVE`);
      if (!args.confirm) {
        console.error('\n(dry-run — pass --confirm to execute)');
        return;
      }
      await setAdSetStatus(args.adset, 'ACTIVE');
      console.error('\n✓ Ad set resumed');
      return;
    }

    if (args.ad) {
      const current = await metaFetchOne<{ name: string; effective_status: string }>(`/${args.ad}`, {
        fields: 'name,effective_status',
      });
      console.error(`Ad: ${current.name} (${args.ad})`);
      console.error(`Status: ${current.effective_status} → ACTIVE`);
      if (!args.confirm) {
        console.error('\n(dry-run — pass --confirm to execute)');
        return;
      }
      await setAdStatus(args.ad, 'ACTIVE');
      console.error('\n✓ Ad resumed');
    }
  } catch (err) {
    if (err instanceof MetaApiError) console.error(`Meta API error: ${err.message}`);
    else console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
