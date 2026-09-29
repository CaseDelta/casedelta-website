/**
 * Dump all current ad creatives. Read-only.
 *
 * Run: npm run meta:creatives                  # markdown to stdout
 *      npm run meta:creatives -- --json        # full JSON dump
 */
import { dumpAllCreatives } from '../lib/meta/creatives';
import { MetaApiError } from '../lib/meta/client';

async function main() {
  const json = process.argv.includes('--json');

  try {
    const pairs = await dumpAllCreatives();

    if (json) {
      process.stdout.write(JSON.stringify(pairs, null, 2) + '\n');
      return;
    }

    process.stdout.write(`# Ad Creatives (${pairs.length} ads)\n\n`);
    for (const { ad, creative } of pairs) {
      process.stdout.write(`## ${ad.name}\n`);
      process.stdout.write(`- **Ad ID:** \`${ad.id}\`  •  **Status:** ${ad.effective_status}\n`);
      process.stdout.write(`- **Creative ID:** \`${creative.id}\`\n`);
      if (creative.title) process.stdout.write(`- **Title:** ${creative.title}\n`);
      if (creative.body) process.stdout.write(`- **Body:**\n  > ${creative.body.replace(/\n/g, '\n  > ')}\n`);
      if (creative.link_url) process.stdout.write(`- **Link URL:** ${creative.link_url}\n`);
      if (creative.call_to_action_type) process.stdout.write(`- **CTA:** ${creative.call_to_action_type}\n`);
      if (creative.image_url) process.stdout.write(`- **Image:** ${creative.image_url}\n`);
      if (creative.video_id) process.stdout.write(`- **Video ID:** \`${creative.video_id}\`\n`);
      if (creative.effective_object_story_id) {
        process.stdout.write(`- **FB Post:** \`${creative.effective_object_story_id}\` (existing Page post)\n`);
      }
      process.stdout.write('\n');
    }
  } catch (err) {
    if (err instanceof MetaApiError) console.error(`Meta API error: ${err.message}`);
    else console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
