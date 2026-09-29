'use client';
// Client component because the copy lives in client modules (ConceptHome, TextDelta).
import { PRICE_UNIT, PRICING_HEADING, SCALE_NOTE, TERM_NOTE, TIERS } from '@/lib/pricing';
import { HOME_SECURITY, claim } from '@/lib/security';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, CheckColumns, FactTable, JumpLinks, LinkList, MoreLink, PageHero, Prompts, QAList } from '@/components/site/kit/kit';
import { ConnectBand } from '@/components/site/kit/ConnectBand';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { Quote } from '@/components/site/kit/Quote';
import { HeroBook, HeroFilm, SOLUTION_STEPS, USE_CASES } from '@/components/concept/ConceptHome';
import { MAP_STEPS } from '@/components/concept/SystemMap';
import { MOMENTS } from '@/components/concept/TextDelta';

const plain = (t: string) => t.replaceAll('*', '');

// Section for section, the kit preview's order, components and background colours.
const SECTIONS = [
  { label: 'What Delta does', href: '#work', note: 'Ask, update, run on its own' },
  { label: 'Text Delta', href: '#text', note: 'No app' },
  { label: 'Pricing', href: '#pricing', note: 'One flat price for the firm' },
  { label: 'Security', href: '#security', note: 'Built for client files' },
  { label: 'Use cases', href: '#uses', note: 'Real work at real firms' },
];

export function HomeKit() {
  return <SiteShell variant="photo">
    <PageHero title="Run the firm like there were 100 of you." photo="/concept/media/coastal-blue-hour.png" media={<HeroFilm/>}>
      <HeroBook/>
    </PageHero>

    <Band title="Your case info lives in several places that don’t talk to each other.">
      <MoreLink href="#work">See what Delta does</MoreLink>
    </Band>

    <Band title="Everything Delta does, in one place." tone="tint">
      <JumpLinks links={SECTIONS}/>
      <LinkList links={SECTIONS}/>
    </Band>

    <Band id="work" title="Delta works across every system your firm uses." split>
      <QAList items={SOLUTION_STEPS.map((st, i) => ({ q: st.title, a: `${MAP_STEPS[i].systems}. ${MAP_STEPS[i].result.text}` }))}/>
    </Band>

    <Band id="text" title="Your whole firm, one text away." tone="navy" split>
      <QAList items={MOMENTS.map((m) => ({ q: m.ask, a: `${m.where}. Delta: ${m.reply}` }))}/>
      <MoreLink href="#text" onDark>No app. Just text Delta.</MoreLink>
    </Band>

    <Band id="pricing" title={PRICING_HEADING}>
      <FactTable head={['Accounts', `Price, ${PRICE_UNIT}`]} rows={TIERS.map((t) => [t.band, t.price])} note={`${TERM_NOTE} ${SCALE_NOTE}`}/>
      <MoreLink href="/pricing">See full pricing</MoreLink>
    </Band>

    <Band id="security" title={HOME_SECURITY.heading} tone="tint">
      <CheckColumns columns={[{ label: 'Client data', items: HOME_SECURITY.points.map((id) => claim(id).label) }]}/>
      <MoreLink href="/security">How we protect client data</MoreLink>
    </Band>

    <Band id="uses" title="If a person can do it in a browser, so can Delta.">
      <Prompts items={USE_CASES.map((u) => plain(u.text))}/>
    </Band>

    <ConnectBand id="how" flat/>

    <Quote flat name="James Recker" quote="It signed into the verdict database we pay for and pulled the five biggest results in my circuit for a two-level lumbar with no fusion, in today's dollars."/>

    <Quote flat tone="paper" name="Alan Poletti" quote="In our demo, it already found $400,000 sitting in cases we had already settled, and named what was blocking each one."/>

    <CtaBand/>
  </SiteShell>;
}
