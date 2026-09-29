import { metaFetch } from '../lib/meta/client';
(async () => {
  for (const preset of ['today', 'yesterday']) {
    console.log(`\n========= ${preset.toUpperCase()} =========`);
    const rows = await metaFetch('/act_238417253/insights', {
      params: {
        level: 'ad',
        date_preset: preset,
        fields: 'ad_name,impressions,clicks,actions',
      },
    });
    for (const r of rows as any[]) {
      console.log(`\n-- ${r.ad_name} (imp=${r.impressions}, clicks=${r.clicks}) --`);
      if (r.actions) {
        for (const a of r.actions) {
          console.log(`   ${a.action_type}: ${a.value}`);
        }
      } else {
        console.log('   (no actions)');
      }
    }
  }
})();
