/**
 * The page kit: the sections every subpage is built from. Server components, so
 * every heading, answer and table cell is in the raw HTML a crawler reads. Motion
 * comes from data-reveal, driven by the SiteShell around the page, exactly as on
 * the homepage.
 *
 * Copy rules for anything passed in: headings and short labels; an answer is one
 * to three sentences and states a fact. No em dashes. Delta is "it".
 */
import { ArrowUpRight, Check, X } from 'lucide-react';
import { W } from '@/components/concept/motion';
import h from '@/components/concept/ConceptHome.module.css';
import k from './kit.module.css';

type Tone = 'paper' | 'pale' | 'tint' | 'navy';

/**
 * The top of a subpage. Without a photo it sits on paper under a solid nav; with
 * one it is a photographic band under the homepage's scrim, and the page should
 * give SiteShell variant="photo" so the nav starts transparent over it.
 */
export function PageHero({ title, lead, photo, children }: { title: string; lead?: string; photo?: string; children?: React.ReactNode }) {
  return <section className={`${k.hero} ${photo ? k.heroPhoto : ''}`}>
    {photo && <><img className={k.heroImage} data-parallax=".08" src={photo} alt="" fetchPriority="high"/><div className={k.heroShade}/></>}
    <div className={`${h.container} ${k.heroInner}`}>
      <h1 className={k.heroTitle} data-reveal="words"><W>{title}</W></h1>
      {lead && <p className={k.heroLead} data-reveal="up" data-delay=".3">{lead}</p>}
      {children && <div className={k.heroExtra} data-reveal="up" data-delay=".45">{children}</div>}
    </div>
  </section>;
}

/**
 * A plain band with an optional heading. `split` puts the heading on the left and
 * the content on the right, as the homepage's security band does.
 */
export function Band({ title, tone = 'paper', split, id, children }: { title?: string; tone?: Tone; split?: boolean; id?: string; children: React.ReactNode }) {
  return <section id={id} className={`${k.band} ${k[tone]}`}>
    <div className={`${h.container} ${split ? k.split : ''}`}>
      {title && <h2 className={k.bandTitle} data-reveal="words"><W>{title}</W></h2>}
      <div className={k.bandBody}>{children}</div>
    </div>
  </section>;
}

export interface QAItem { q: string; a: React.ReactNode }

/**
 * One question and its direct answer: the unit AI search cites. The question is a
 * real heading; the answer is one to three sentences that state a fact.
 */
export function QA({ q, a, as: H = 'h3' }: QAItem & { as?: 'h2' | 'h3' }) {
  return <div className={k.qa}><H className={k.q}>{q}</H><div className={k.a}>{a}</div></div>;
}

export function QAList({ items, as }: { items: QAItem[]; as?: 'h2' | 'h3' }) {
  return <div className={k.qaList} data-reveal="stagger" data-delay=".2">{items.map((i) => <QA key={i.q} {...i} as={as}/>)}</div>;
}

/** A plain semantic table. The first cell of each row is its row header. */
export function FactTable({ caption, head, rows, note }: { caption?: string; head: string[]; rows: React.ReactNode[][]; note?: string }) {
  return <div className={k.tableWrap} data-reveal="up">
    <table className={k.table}>
      {caption && <caption>{caption}</caption>}
      <thead><tr>{head.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table>
    {note && <p className={k.tableNote}>{note}</p>}
  </div>;
}

/** What it can and cannot do, as short labels with a mark. */
export function Checklist({ can, cannot, canLabel = 'Can', cannotLabel = 'Cannot' }: { can: string[]; cannot?: string[]; canLabel?: string; cannotLabel?: string }) {
  const col = (label: string, items: string[], yes: boolean) => <div className={k.checkCol}>
    <h3 className={k.checkLabel}>{label}</h3>
    <ul className={k.checkList} data-reveal="stagger" data-delay=".15">{items.map((t) => <li key={t}>
      <i className={yes ? k.markYes : k.markNo} aria-hidden="true">{yes ? <Check size={17} strokeWidth={2.4}/> : <X size={17} strokeWidth={2.4}/>}</i>
      <span><span className={k.srOnly}>{yes ? `${canLabel}: ` : `${cannotLabel}: `}</span>{t}</span>
    </li>)}</ul>
  </div>;
  return <div className={`${k.checklist} ${cannot?.length ? k.checkTwo : ''}`}>{col(canLabel, can, true)}{cannot?.length ? col(cannotLabel, cannot, false) : null}</div>;
}


/** Long text: blog posts and legal pages. Typography on the site's tokens. */
export function ProseArticle({ children }: { children: React.ReactNode }) {
  return <article className={k.prose}>{children}</article>;
}

export interface KitLink { label: string; href: string; note?: string }

/** A column of large row links, as the homepage's step rows look. For hubs and the 404. */
export function LinkList({ links }: { links: KitLink[] }) {
  return <ul className={k.links} data-reveal="stagger" data-delay=".15">{links.map((l) => <li key={l.href}>
    <a href={l.href}><span><span className={k.linkLabel}>{l.label}</span>{l.note && <small>{l.note}</small>}</span><ArrowUpRight size={22}/></a>
  </li>)}</ul>;
}

/** A row of short in-page links, for a long page's sections. */
export function JumpLinks({ links }: { links: KitLink[] }) {
  return <nav className={k.jump} aria-label="On this page">{links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</nav>;
}

/** A short label link under a section, e.g. "See full pricing". No body text. */
export function MoreLink({ href, children, onDark }: { href: string; children: string; onDark?: boolean }) {
  return <a className={`${k.more} ${onDark ? k.moreOnDark : ''}`} href={href}>{children}<ArrowUpRight size={18}/></a>;
}

/** Checklist columns where every item is a yes, e.g. "Reads" and "Updates". */
export function CheckColumns({ columns }: { columns: { label: string; items: string[] }[] }) {
  return <div className={`${k.checklist} ${columns.length > 1 ? k.checkTwo : ''}`}>{columns.map((c) => <div key={c.label} className={k.checkCol}>
    <h3 className={k.checkLabel}>{c.label}</h3>
    <ul className={k.checkList} data-reveal="stagger" data-delay=".15">{c.items.map((t) => <li key={t}>
      <i className={k.markYes} aria-hidden="true"><Check size={17} strokeWidth={2.4}/></i><span>{t}</span>
    </li>)}</ul>
  </div>)}</div>;
}

/** Things a lawyer would type to Delta, shown as prompts. */
export function Prompts({ items }: { items: string[] }) {
  return <ul className={k.prompts} data-reveal="stagger" data-delay=".15">{items.map((t) => <li key={t}><span className={k.promptMark} aria-hidden="true"/>{t}</li>)}</ul>;
}

/** A small label, e.g. "Connected at firms today". */
export function Tag({ children }: { children: string }) {
  return <span className={k.tag}>{children}</span>;
}
