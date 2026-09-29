/**
 * LOCAL ONLY. Every page-kit component on one page, for design iteration.
 * noindex, not in the sitemap, and must never ship: delete before merging.
 */
import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import {
  Band, CheckColumns, Checklist, FactTable, JumpLinks, LinkList, MoreLink, PageHero,
  Prompts, ProseArticle, QAList, Tag,
} from '@/components/site/kit/kit';
import { ConnectBand } from '@/components/site/kit/ConnectBand';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { Quote } from '@/components/site/kit/Quote';

export const metadata: Metadata = { title: 'Kit preview', robots: { index: false, follow: false } };

const PALETTE = ['navy', 'blue', 'tint', 'paper', 'orange', 'muted', 'on-navy', 'muted-tint', 'line', 'rule-soft', 'line-tint'];

const QA = [
  { q: 'What does Delta connect to?', a: 'Any system your firm signs into, including ones with no API.' },
  { q: 'How long does it take to connect?', a: 'Under thirty minutes. Nothing is migrated.' },
];

const LINKS = [
  { label: 'Pricing', href: '#tables', note: 'FactTable' },
  { label: 'Checklists', href: '#checks', note: 'Checklist and CheckColumns' },
  { label: 'Prose', href: '#prose' },
];

export default function KitPreview() {
  return <SiteShell variant="photo">
    <PageHero title="The page kit, every piece." lead="PageHero with a photo, a lead and children." photo="/concept/media/coastal-blue-hour.png">
      <Tag>Tag inside the hero</Tag>
    </PageHero>

    <Band title="Palette.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
        {PALETTE.map((c) => <div key={c}>
          <div style={{ height: 88, borderRadius: 14, background: `var(--${c})`, border: '1px solid var(--line)' }}/>
          <code>--{c}</code>
        </div>)}
      </div>
    </Band>

    <Band title="JumpLinks and LinkList." tone="tint">
      <JumpLinks links={LINKS}/>
      <LinkList links={LINKS}/>
    </Band>

    <Band title="QAList, split." split>
      <QAList items={QA}/>
      <MoreLink href="#tables">MoreLink</MoreLink>
    </Band>

    <Band title="On navy." tone="navy" split>
      <QAList items={QA}/>
      <MoreLink href="#tables" onDark>MoreLink on dark</MoreLink>
    </Band>

    <Band id="tables" title="FactTable.">
      <FactTable caption="Caption" head={['Accounts', 'Price', 'Automations']}
        rows={[['Up to 5', '$599', '5'], ['Up to 10', '$1,099', '10'], ['Up to 20', '$2,099', '20']]} note="Table note."/>
    </Band>

    <Band id="checks" title="Checklist and CheckColumns." tone="tint">
      <div style={{ display: 'grid', gap: 72 }}>
        <Checklist can={['Reads every system', 'Runs unprompted']} cannot={['Sign a filing', 'Give legal advice']}/>
        <CheckColumns columns={[{ label: 'Reads', items: ['Matters', 'Documents'] }, { label: 'Updates', items: ['Notes', 'Tasks'] }]}/>
      </div>
    </Band>

    <Band title="Prompts.">
      <Prompts items={['Which cases have a lien over $50,000?', 'Draft the demand for Bell v. Hartung.']}/>
    </Band>

    <ConnectBand flat/>

    <Quote flat name="Sample Name" quote="Quote card, sample text for layout only."/>

    <Band id="prose" title="ProseArticle.">
      <ProseArticle>
        <h2>Heading two</h2>
        <p>A paragraph of body text with a <a href="#prose">link</a>.</p>
        <ul><li>List item</li><li>List item</li></ul>
      </ProseArticle>
    </Band>

    <CtaBand/>
  </SiteShell>;
}
