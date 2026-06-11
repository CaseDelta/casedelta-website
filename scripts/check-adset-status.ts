import { metaFetchOne } from '../lib/meta/client';
(async () => {
  const adset = await metaFetchOne('/52531549521005', { fields: 'name,status,effective_status,daily_budget,start_time,end_time' });
  console.log('ADSET:', JSON.stringify(adset, null, 2));
  const ads = await metaFetchOne('/52531549521005/ads', { fields: 'name,effective_status,status' });
  console.log('ADS:', JSON.stringify(ads, null, 2));
})();
