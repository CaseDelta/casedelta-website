/**
 * Create a new ad from a JSON spec file.
 *
 * Defaults to DRY RUN — pass --confirm to execute. New ads default to PAUSED;
 * pass --activate to publish immediately (requires --confirm and --force).
 *
 *   npm run meta:create-ad -- --spec=./my-ad.json
 *   npm run meta:create-ad -- --spec=./my-ad.json --confirm                 # creates PAUSED
 *   npm run meta:create-ad -- --spec=./my-ad.json --confirm --activate --force  # creates ACTIVE
 *
 * Spec file shape (creating from inline creative):
 *   {
 *     "name": "Partners_Pain-Manual_v2",
 *     "adset_id": "52531549521005",
 *     "creative": {
 *       "name": "Manual v2 creative",
 *       "object_story_spec": {
 *         "page_id": "<your-fb-page-id>",
 *         "link_data": {
 *           "message": "Primary text here...",
 *           "name": "Headline here",
 *           "description": "News feed link description",
 *           "link": "https://casedelta.com/?utm_source=fb&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}",
 *           "call_to_action": { "type": "LEARN_MORE", "value": { "link": "https://casedelta.com/" } },
 *           "image_hash": "<image-hash-from-meta-upload>"
 *         }
 *       }
 *     }
 *   }
 *
 * Or to reference an existing FB Page post:
 *   { "creative": { "name": "...", "object_story_id": "<page_id>_<post_id>" } }
 */
import { readFileSync } from 'node:fs';
import { createAdCreative } from '../lib/meta/creatives';
import { createAd } from '../lib/meta/mutations';
import { MetaApiError } from '../lib/meta/client';

interface AdSpec {
  name: string;
  adset_id: string;
  creative: {
    name: string;
    object_story_spec?: Record<string, unknown>;
    object_story_id?: string;
  };
}

interface Args {
  spec: string;
  confirm: boolean;
  activate: boolean;
  force: boolean;
}

function parseArgs(argv: string[]): Args {
  const out: Partial<Args> = { confirm: false, activate: false, force: false };
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue;
    const [k, vRaw] = raw.slice(2).split('=');
    const v = vRaw ?? 'true';
    if (k === 'spec') out.spec = v;
    else if (k === 'confirm') out.confirm = v === 'true';
    else if (k === 'activate') out.activate = v === 'true';
    else if (k === 'force') out.force = v === 'true';
    else {
      console.error(`Unknown flag: --${k}`);
      process.exit(2);
    }
  }
  if (!out.spec) {
    console.error('Required: --spec=<path-to-json>');
    process.exit(2);
  }
  return out as Args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.activate && !args.force) {
    console.error('❌ --activate requires --force (publishes the new ad immediately, real spend).');
    process.exit(1);
  }

  let spec: AdSpec;
  try {
    spec = JSON.parse(readFileSync(args.spec, 'utf8'));
  } catch (e) {
    console.error(`Failed to read/parse ${args.spec}: ${(e as Error).message}`);
    process.exit(1);
  }

  if (!spec.name || !spec.adset_id || !spec.creative?.name) {
    console.error('Spec must include: name, adset_id, creative.name (plus object_story_spec or object_story_id).');
    process.exit(2);
  }
  if (!spec.creative.object_story_spec && !spec.creative.object_story_id) {
    console.error('Spec creative must include either object_story_spec (inline) or object_story_id (existing post).');
    process.exit(2);
  }

  console.error(`Ad name: ${spec.name}`);
  console.error(`Ad set: ${spec.adset_id}`);
  console.error(`Creative name: ${spec.creative.name}`);
  console.error(`Source: ${spec.creative.object_story_id ? 'existing post (' + spec.creative.object_story_id + ')' : 'inline creative'}`);
  console.error(`Will be: ${args.activate ? '🚨 ACTIVE (publishes for review immediately)' : 'PAUSED (safe default)'}`);

  if (!args.confirm) {
    console.error('\n(dry-run — pass --confirm to execute)');
    return;
  }

  try {
    const creative = await createAdCreative({
      name: spec.creative.name,
      objectStorySpec: spec.creative.object_story_spec,
      objectStoryId: spec.creative.object_story_id,
    });
    console.error(`✓ Creative created: ${creative.id}`);

    const ad = await createAd({
      name: spec.name,
      adsetId: spec.adset_id,
      creativeId: creative.id,
      status: args.activate ? 'ACTIVE' : 'PAUSED',
    });
    console.error(`✓ Ad created: ${ad.id} (status: ${args.activate ? 'ACTIVE' : 'PAUSED'})`);
    if (!args.activate) {
      console.error('To activate later: npm run meta:resume -- --ad=' + ad.id + ' --confirm');
    } else {
      console.error('Ad is in PENDING_REVIEW until Meta approves (usually 1-24h).');
    }
  } catch (err) {
    if (err instanceof MetaApiError) console.error(`Meta API error: ${err.message}`);
    else console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
