/**
 * Pause an ad or an ad set.
 *
 * Defaults to DRY RUN — pass --confirm to execute.
 * Pausing a protected ad set (live, with spend) requires --force.
 *
 *   npm run meta:pause -- --ad=52531549521605 --confirm           # pause single ad
 *   npm run meta:pause -- --adset=52531549521005 --confirm --force  # pause whole live ad set
 */
import { metaFetchOne } from '../lib/meta/client';
import { setAdStatus, setAdSetStatus } from '../lib/meta/mutations';
import { checkPauseAdSet, PROTECTED_ADSETS, LIVE_ADS } from '../lib/meta/safety';
import { MetaApiError } from '../lib/meta/client';

interface Args {
  ad?: string;
  adset?: string;
  confirm: boolean;
  force: boolean;
}

function parseArgs(argv: string[]): Args {
  const out: Args = { confirm: false, force: false };
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue;
    const [k, vRaw] = raw.slice(2).split('=');
    const v = vRaw ?? 'true';
    if (k === 'ad') out.ad = v;
    else if (k === 'adset') out.adset = v;
    else if (k === 'confirm') out.confirm = v === 'true';
    else if (k === 'force') out.force = v === 'true';
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
      console.error(`Status: ${current.effective_status} → PAUSED`);

      const blocker = checkPauseAdSet(args.adset, args.force);
      if (blocker) {
        console.error(`\n❌ Blocked: ${blocker}`);
        process.exit(1);
      }

      if (!args.confirm) {
        console.error('\n(dry-run — pass --confirm to execute)');
        return;
      }

      await setAdSetStatus(args.adset, 'PAUSED');
      console.error('\n✓ Ad set paused');
      return;
    }

    if (args.ad) {
      const current = await metaFetchOne<{ name: string; effective_status: string; adset_id: string }>(`/${args.ad}`, {
        fields: 'name,effective_status,adset_id',
      });
      console.error(`Ad: ${current.name} (${args.ad})`);
      console.error(`In ad set: ${current.adset_id}`);
      console.error(`Status: ${current.effective_status} → PAUSED`);

      if (LIVE_ADS[args.ad]) {
        console.error(`⚠️  This is a live ad in active delivery.`);
      }

      if (!args.confirm) {
        console.error('\n(dry-run — pass --confirm to execute)');
        return;
      }

      await setAdStatus(args.ad, 'PAUSED');
      console.error('\n✓ Ad paused');
    }
  } catch (err) {
    if (err instanceof MetaApiError) console.error(`Meta API error: ${err.message}`);
    else console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
