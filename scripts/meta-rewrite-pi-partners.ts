/**
 * One-off rewrite of the PI_Partners - Copy ad set creatives.
 *
 * 1. Builds 6 new inline creatives (cross-dimensional pain headlines + universal body + LEARN_MORE)
 * 2. Swaps the creative reference on 5 existing ads
 * 3. Creates a new 6th ad (Missing Key Evidence) in the same ad set
 * 4. Renames each ad to match its new dimension
 * 5. Leaves the ad set PAUSED for UI review
 *
 * Run: npx tsx --env-file=.env.local scripts/meta-rewrite-pi-partners.ts
 */
import { createAdCreative } from '../lib/meta/creatives';
import { createAd, updateAdCreative, updateAdName } from '../lib/meta/mutations';
import { MetaApiError } from '../lib/meta/client';

// ---------- CONFIGURATION ----------

const ADSET_ID = '52531549521005'; // PI_Partners - Copy
const PAGE_ID = '1160399907138144';
const INSTAGRAM_USER_ID = '17841421772868520';
const IMAGE_HASH = '68353eb71ed2c3dd32cb7ad5bcb83b56';

const LINK = 'https://casedelta.com/?utm_source=fb&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}';

const BODY = `I've spent the last year with dozens of law firms. Every practice area, every size.

The pattern is the same in every one of them:

The AI tools their firm has tried haven't worked.

The reason isn't that they're bad…

It's that each one only handles one specific slice of the work, like research or drafting.

Which leaves the lawyer to do all the work in between.

I hear this from clients all the time:

It's 9 PM on a Thursday.

Piecing the case timeline together by hand.

Doing the work an associate should be doing.

A dozen tabs open for one case.

Their family ate without them. Again.

One missed fact can decide the case.

Sound familiar?

So they've tried things.

❌ Put more work on the paralegals last year.
❌ Hired more help last quarter.
❌ Bought another AI tool last month.

And after all of this…

They are STILL the one doing all the work.

Here's the truth: the firm doesn't need another tool.

It needs something that runs across all of them.

We built CaseDelta to be that.

It's not an AI that handles one piece of the work and leaves you bouncing between tabs.

Delta is the associate that integrates with every tool your firm uses.

Outlook. Clio. Quickbooks. Litify. Anything your firm runs.

Delta logs in the way an associate would.

You just tell Delta what you need, in one sentence.

→ "Pull every medical record. Build the chronology. Flag the treatment gaps."
✅ Done.

→ "Draft a response to opposing counsel's offer. Pull our top 3 exhibits."
✅ In your drafts.

→ "Show me every case stalled more than 30 days."
✅ Done.

→ "Watch every deadline. Every case. Every platform. Catch what I'd miss."
✅ Running.

The work that used to take a dozen tabs, three associates, and a Sunday afternoon?

Now it takes one sentence.

So you can focus on the work that wins cases and brings them in…

…instead of associate-level grunt work.

You can sign up for a 100% FREE demo at:

casedelta.com

Keep what you have. CaseDelta works with the tools your firm already runs.

Your client data stays secure. Zero third parties.

See what 20 minutes with CaseDelta could do for your evenings.

The partners winning bigger cases right now aren't working more hours…

…they just stopped doing the work nobody's paying them for.

Book your free demo with CaseDelta at the link below👇

casedelta.com`;

interface DimensionPlan {
  /** Internal ad name (Meta UI only). */
  adName: string;
  /** Headline shown under the image. */
  title: string;
  /** Existing ad ID to update; null means "create new ad". */
  existingAdId: string | null;
}

const PLAN: DimensionPlan[] = [
  {
    adName: 'Partners_Functional-Chronologies',
    title: 'How Partners Go From Building Chronologies By Hand To Winning Bigger Cases',
    existingAdId: '52531549520805', // was ManualCaseTimelines- Copy 3
  },
  {
    adName: 'Partners_Identity-AssociateWork',
    title: 'How Partners Go From Doing Associate Work To Winning Bigger Cases',
    existingAdId: '52531549521405', // was EndlessDiscovery
  },
  {
    adName: 'Partners_Tech-Platforms',
    title: 'How Partners Go From Juggling Six Platforms To Winning Bigger Cases',
    existingAdId: '52531549521605', // was BuriedCaseFacts- Copy
  },
  {
    adName: 'Partners_Lifestyle-Weekends',
    title: 'How Partners Go From Working Through Every Weekend To Winning Bigger Cases',
    existingAdId: '52531549521805', // was BriefPrepMarathons- Copy 2
  },
  {
    adName: 'Partners_Social-AI',
    title: 'How Partners Go From Watching Competitors Adopt AI To Winning Bigger Cases',
    existingAdId: '52531549521205', // was DrowningInRecords-2
  },
  {
    adName: 'Partners_Fear-MissingEvidence',
    title: 'How Partners Go From Missing Key Evidence To Winning Bigger Cases',
    existingAdId: null, // NEW ad
  },
];

// ---------- EXECUTION ----------

function buildObjectStorySpec(title: string): Record<string, unknown> {
  return {
    page_id: PAGE_ID,
    instagram_user_id: INSTAGRAM_USER_ID,
    link_data: {
      link: LINK,
      message: BODY,
      name: title,
      caption: 'https://casedelta.com/',
      image_hash: IMAGE_HASH,
      call_to_action: {
        type: 'LEARN_MORE',
        value: { link: LINK },
      },
    },
  };
}

async function main() {
  console.error(`Rewriting PI_Partners - Copy ad set creative across ${PLAN.length} ads.\n`);

  // Build all 6 creatives first. If any fail, abort before touching ads.
  console.error('Step 1: Creating 6 inline creatives...');
  const creatives: { adName: string; creativeId: string }[] = [];
  for (const item of PLAN) {
    const creative = await createAdCreative({
      name: `${item.adName}-creative-2026-05-19`,
      objectStorySpec: buildObjectStorySpec(item.title),
    });
    console.error(`  ✓ Created creative ${creative.id} for "${item.adName}"`);
    creatives.push({ adName: item.adName, creativeId: creative.id });
  }
  console.error(`Step 1 done. 6 creatives created.\n`);

  // Now update existing 5 ads + create the 6th.
  console.error('Step 2: Updating ads...');
  for (let i = 0; i < PLAN.length; i++) {
    const item = PLAN[i];
    const creative = creatives[i];

    if (item.existingAdId) {
      // Existing ad: swap creative only (preserve user's manual renames)
      await updateAdCreative(item.existingAdId, creative.creativeId);
      console.error(`  ✓ Ad ${item.existingAdId}: creative swapped to ${creative.creativeId}`);
    } else {
      // New ad
      const newAd = await createAd({
        name: item.adName,
        adsetId: ADSET_ID,
        creativeId: creative.creativeId,
        status: 'PAUSED',
      });
      console.error(`  ✓ Created new ad ${newAd.id} ("${item.adName}") in adset ${ADSET_ID}`);
    }
  }
  console.error(`Step 2 done.\n`);

  console.error('✓ Rewrite complete. Ad set remains PAUSED — do UI review before resuming.');
}

main().catch((err) => {
  if (err instanceof MetaApiError) {
    console.error(`\n❌ Meta API error: ${err.message}`);
  } else {
    console.error(`\n❌ Error: ${err instanceof Error ? err.message : err}`);
  }
  process.exit(1);
});
