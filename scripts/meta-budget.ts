/**
 * Change an ad set's daily budget.
 *
 * Defaults to DRY RUN — pass --confirm to actually execute.
 *
 *   npm run meta:budget -- --adset=52531549521005 --daily=25            # dry-run
 *   npm run meta:budget -- --adset=52531549521005 --daily=25 --confirm  # execute
 *   npm run meta:budget -- --adset=52531549521005 --daily=200 --confirm --force  # bypass 10x ceiling
 */
import { metaFetchOne } from '../lib/meta/client';
import { updateAdSetBudget } from '../lib/meta/mutations';
import { checkBudgetChange, formatDollars } from '../lib/meta/safety';
import { MetaApiError } from '../lib/meta/client';

interface AdSetInfo {
  id: string;
  name: string;
  daily_budget: string;
  effective_status: string;
}

interface Args {
  adset: string;
  daily: number;
  confirm: boolean;
  force: boolean;
}

function parseArgs(argv: string[]): Args {
  const out: Partial<Args> = { confirm: false, force: false };
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue;
    const [k, vRaw] = raw.slice(2).split('=');
    const v = vRaw ?? 'true';
    if (k === 'adset') out.adset = v;
    else if (k === 'daily') out.daily = Number(v);
    else if (k === 'confirm') out.confirm = v === 'true';
    else if (k === 'force') out.force = v === 'true';
    else {
      console.error(`Unknown flag: --${k}`);
      process.exit(2);
    }
  }
  if (!out.adset) {
    console.error('Required: --adset=<id>');
    process.exit(2);
  }
  if (out.daily === undefined || Number.isNaN(out.daily) || out.daily <= 0) {
    console.error('Required: --daily=<dollars>, must be > 0');
    process.exit(2);
  }
  return out as Args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const newCents = Math.round(args.daily * 100);

  try {
    const current = await metaFetchOne<AdSetInfo>(`/${args.adset}`, {
      fields: 'name,daily_budget,effective_status',
    });
    const currentCents = Number(current.daily_budget);

    console.error(`Ad set: ${current.name} (${args.adset})`);
    console.error(`Status: ${current.effective_status}`);
    console.error(`Current: ${formatDollars(currentCents)}/day  →  Proposed: ${formatDollars(newCents)}/day`);

    const blocker = checkBudgetChange({ currentCents, newCents, force: args.force });
    if (blocker) {
      console.error(`\n❌ Blocked: ${blocker}`);
      process.exit(1);
    }

    if (newCents > currentCents * 1.2) {
      console.error(`⚠️  Increase >20% in one step. Meta recommends ≤20%/day to preserve learning phase.`);
    }

    if (!args.confirm) {
      console.error('\n(dry-run — pass --confirm to execute)');
      return;
    }

    await updateAdSetBudget(args.adset, newCents);
    console.error(`\n✓ Budget changed to ${formatDollars(newCents)}/day`);
  } catch (err) {
    if (err instanceof MetaApiError) console.error(`Meta API error: ${err.message}`);
    else console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
