/**
 * Components a blog post can use in its MDX. Facts come from the data files, so a
 * post never retypes a competitor's price or a CaseDelta claim.
 */
import { CASEDELTA_ROW, competitor, type Row } from '@/lib/compare';
import b from './blog.module.css';

interface Entry { name: string; href: string; type: string; row: Row; pricingPrefix?: string }

const c = (slug: string, col = 0) => competitor(slug)!.columns[col].row;

/**
 * The buyer's list, in category order: demand and records tools, a plaintiff AI
 * platform, AI inside a case system, general chatbots, and a cross-system AI
 * paralegal. CaseDelta sits in its own category, not first.
 */
const ENTRIES: Entry[] = [
  { name: 'EvenUp', href: '/compare/casedelta-vs-evenup', type: 'Demand letters and PI documents', row: c('casedelta-vs-evenup') },
  { name: 'Supio', href: '/compare/casedelta-vs-supio', type: 'Records review and mass torts', row: c('casedelta-vs-supio') },
  { name: 'FasterOutcomes', href: '/compare/casedelta-vs-fasteroutcomes', type: 'Document analysis and drafting', row: c('casedelta-vs-fasteroutcomes') },
  { name: 'Eve', href: '/compare/casedelta-vs-eve', type: 'Plaintiff AI platform', row: c('casedelta-vs-eve') },
  { name: 'Filevine AI', href: '/compare/casedelta-vs-filevine-ai', type: 'AI inside your case system', row: c('casedelta-vs-filevine-ai') },
  { name: 'Clio AI', href: '/compare/casedelta-vs-clio-ai', type: 'AI inside your case system', row: c('casedelta-vs-clio-ai') },
  { name: 'General AI chatbots', href: '/compare/casedelta-vs-chatgpt', type: 'General assistant (ChatGPT, Claude, Gemini, Copilot)', row: c('casedelta-vs-chatgpt'), pricingPrefix: 'ChatGPT ' },
  { name: 'CaseDelta', href: '/', type: 'AI paralegal across every system', row: CASEDELTA_ROW },
];

export function BuyersTable() {
  return <div className={b.tableWrap}><table>
    <thead><tr><th scope="col">Tool</th><th scope="col">Type</th><th scope="col">Inside your case system</th><th scope="col">Pricing</th><th scope="col">Best for</th></tr></thead>
    <tbody>{ENTRIES.map((e) => <tr key={e.name}>
      <th scope="row"><a href={e.href}>{e.name}</a></th><td>{e.type}</td><td>{e.row.caseSystem}</td><td>{e.pricingPrefix ?? ''}{e.row.pricing}</td><td>{e.row.bestFor}</td>
    </tr>)}</tbody>
  </table></div>;
}

export function BuyersEntries() {
  return <>{ENTRIES.map((e) => <section key={e.name}>
    <h3>{e.name}</h3>
    <p>{e.row.what}</p>
    <p><strong>Best for:</strong> {e.row.bestFor}</p>
    <p><a href={e.href}>{e.name === 'CaseDelta' ? 'How CaseDelta works' : e.name === 'General AI chatbots' ? 'CaseDelta vs ChatGPT' : `CaseDelta vs ${e.name}`}</a></p>
  </section>)}</>;
}

export const MDX_COMPONENTS = { BuyersTable, BuyersEntries };
