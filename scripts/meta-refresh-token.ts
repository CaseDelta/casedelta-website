/**
 * Refresh the 60-day System User token before it expires.
 *
 * Run at ~day 50 of the current token's life:
 *   npm run meta:refresh-token
 *
 * Prints the new 60-day token to stdout. You must then:
 *   1. Replace META_SYSTEM_USER_TOKEN in .env.local
 *   2. Update the prod env in Vercel: vercel env rm META_SYSTEM_USER_TOKEN production -y && \
 *      printf "%s" "<new>" | vercel env add META_SYSTEM_USER_TOKEN production
 */
import { createHmac } from 'node:crypto';

async function main() {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const currentToken = process.env.META_SYSTEM_USER_TOKEN;
  const version = process.env.META_GRAPH_API_VERSION || 'v25.0';

  if (!appId || !appSecret || !currentToken) {
    console.error('Missing META_APP_ID, META_APP_SECRET, or META_SYSTEM_USER_TOKEN in env.');
    process.exit(1);
  }

  const proof = createHmac('sha256', appSecret).update(currentToken).digest('hex');
  const url = new URL(`https://graph.facebook.com/${version}/oauth/access_token`);
  url.searchParams.set('grant_type', 'fb_exchange_token');
  url.searchParams.set('client_id', appId);
  url.searchParams.set('client_secret', appSecret);
  url.searchParams.set('fb_exchange_token', currentToken);
  url.searchParams.set('set_token_expires_in_60_days', 'true');
  url.searchParams.set('appsecret_proof', proof);

  const res = await fetch(url.toString());
  const body = await res.json() as { access_token?: string; expires_in?: number; error?: { message: string } };

  if (!res.ok || body.error || !body.access_token) {
    console.error(`Refresh failed: ${body.error?.message ?? res.statusText}`);
    console.error('If the current token is already expired or invalid, generate a new one manually:');
    console.error('  https://business.facebook.com/settings/system-users');
    process.exit(1);
  }

  const days = body.expires_in ? Math.round(body.expires_in / 86400) : 60;
  console.error(`✓ New token (expires in ~${days} days):`);
  process.stdout.write(body.access_token + '\n');
  console.error('\nNext steps:');
  console.error('  1. Replace META_SYSTEM_USER_TOKEN in .env.local with the value above');
  console.error('  2. Update Vercel prod (only when /api/meta-insights route exists):');
  console.error('     vercel env rm META_SYSTEM_USER_TOKEN production -y');
  console.error('     printf "%s" "<paste>" | vercel env add META_SYSTEM_USER_TOKEN production');
  console.error('  3. Set a calendar reminder for ~50 days from now.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
