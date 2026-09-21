import { LOGO } from '@/components/v2/sasonix/brand';
import s from './ConceptLegal.module.css';
export function LegalPage({title,children,lastUpdated='March 25, 2026'}:{title:string;children:React.ReactNode;lastUpdated?:string}) {
  return <div className={s.page}><header><a href="/"><img src={LOGO.onLight} alt="CaseDelta" width="150"/></a><a href="/">Back to the homepage</a></header><main><h1>{title}</h1><p className={s.date}>Last updated: {lastUpdated}</p>{children}</main><footer><a href="/privacy">Privacy policy</a><a href="/terms">Terms of service</a><span>© 2026 CaseDelta</span></footer></div>;
}
export function LegalSection({title,children}:{title:string;children:React.ReactNode}) { return <section><h2>{title}</h2><div>{children}</div></section>; }
export function LegalClosing({children}:{children:React.ReactNode}) { return <p className={s.closing}>{children}</p>; }
export const LEGAL_LINK_STYLE:React.CSSProperties={color:'inherit',textDecoration:'underline',textUnderlineOffset:'3px'};
