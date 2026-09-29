import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, Checklist, FactTable, PageHero, QAList } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';
import {
  ACCOUNT_COUNTS, INCLUDED, NEVER_CHANGES_PRICE, PRICE_LINE, PRICING_HEADING, PRICING_QA,
  PRICING_TITLE, SCALE_NOTE, STARTING_PRICE, TERM_NOTE, TIERS, perAccount,
} from '@/lib/pricing';

const URL = 'https://casedelta.com/pricing';

export const metadata: Metadata = {
  title: { absolute: PRICING_TITLE },
  description: PRICE_LINE,
  alternates: { canonical: URL },
  openGraph: { title: PRICING_TITLE, description: PRICE_LINE, url: URL, type: 'website' },
};

export default function PricingPage() {
  return <>
    <BreadcrumbSchema items={[{ name: 'Home', url: 'https://casedelta.com' }, { name: 'Pricing', url: URL }]}/>
    <SiteShell variant="solid">
      <PageHero title={PRICING_HEADING} lead={`From ${STARTING_PRICE} a month for the firm, priced by account band, never per seat, month to month.`}>
      </PageHero>
      <Band title="Price by account band.">
        <FactTable caption="Monthly price for the firm" head={['Accounts', 'Price per firm, monthly', 'Per account', 'Automations']}
          rows={TIERS.map((t) => [t.band, t.price, perAccount(t), String(t.automations)])}
          note={`${TERM_NOTE} ${SCALE_NOTE}`}/>
      </Band>
      <Band title="What counts as an account." tone="pale" split>
        <Checklist canLabel="Counts as an account" can={ACCOUNT_COUNTS} cannotLabel="Does not count toward your band" cannot={NEVER_CHANGES_PRICE}/>
      </Band>
      <Band title="What is included." split>
        <Checklist canLabel="Every band" can={INCLUDED}/>
      </Band>
      <Band title="Pricing questions." tone="tint">
        <QAList as="h3" items={PRICING_QA.map((q) => ({ q: q.question, a: q.answer }))}/>
      </Band>
      <CtaBand/>
    </SiteShell>
  </>;
}
