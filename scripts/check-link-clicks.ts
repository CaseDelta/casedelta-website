import { metaFetch } from '../lib/meta/client';
(async () => {
  const rows = await metaFetch('/act_238417253/insights', {
    params: {
      level: 'ad',
      date_preset: 'today',
      fields: 'ad_name,impressions,clicks,inline_link_clicks,outbound_clicks,unique_clicks,unique_inline_link_clicks,actions,spend,ctr,inline_link_click_ctr',
    },
  });
  console.log('=== TODAY (May 20 PDT) ===');
  for (const r of rows as any[]) {
    const outboundClicks = (r.outbound_clicks || []).reduce((sum: number, a: any) => sum + Number(a.value || 0), 0);
    console.log(`${r.ad_name}: imp=${r.impressions} | clicks=${r.clicks} | inline_link_clicks=${r.inline_link_clicks || 0} | outbound=${outboundClicks} | unique_link_clicks=${r.unique_inline_link_clicks || 0} | spend=$${r.spend}`);
  }
  const yrows = await metaFetch('/act_238417253/insights', {
    params: {
      level: 'ad',
      date_preset: 'yesterday',
      fields: 'ad_name,impressions,clicks,inline_link_clicks,outbound_clicks,unique_clicks,unique_inline_link_clicks,actions,spend',
    },
  });
  console.log('\n=== YESTERDAY (May 19 PDT) ===');
  for (const r of yrows as any[]) {
    const outboundClicks = (r.outbound_clicks || []).reduce((sum: number, a: any) => sum + Number(a.value || 0), 0);
    console.log(`${r.ad_name}: imp=${r.impressions} | clicks=${r.clicks} | inline_link_clicks=${r.inline_link_clicks || 0} | outbound=${outboundClicks} | unique_link_clicks=${r.unique_inline_link_clicks || 0} | spend=$${r.spend}`);
  }
})();
