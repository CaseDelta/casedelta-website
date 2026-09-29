/**
 * /answers, on the site kit. The question is the heading, in the words a buyer
 * would type, and the first sentence of the answer answers it.
 *
 * The same ANSWER_CATEGORIES data renders here and as the FAQPage JSON-LD in
 * page.tsx. Google requires FAQ markup to match visible text, so never hand-write a
 * question into either one. Server rendered: every answer is in the raw HTML.
 */
import { SiteShell } from '@/components/site/SiteShell';
import { Band, JumpLinks, MoreLink, PageHero, QAList } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { ANSWER_CATEGORIES } from '@/lib/answers';

const TONES = ['paper', 'pale'] as const;

export function AnswersContent() {
  return <SiteShell variant="solid">
    <PageHero title="Answers about CaseDelta." lead="What it is, what it works with, what it costs, and how it protects client data.">
      <JumpLinks links={ANSWER_CATEGORIES.map((c) => ({ label: c.title, href: `#${c.id}` }))}/>
    </PageHero>
    {ANSWER_CATEGORIES.map((cat, i) => <Band key={cat.id} id={cat.id} title={cat.title} tone={TONES[i % 2]} split>
      <QAList as="h3" items={cat.items.map((it) => ({
        q: it.question,
        a: <><p>{it.answer}</p>{it.href && it.hrefLabel && <MoreLink href={it.href}>{it.hrefLabel}</MoreLink>}</>,
      }))}/>
    </Band>)}
    <CtaBand/>
  </SiteShell>;
}
