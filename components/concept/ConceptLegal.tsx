import { SiteShell } from '@/components/site/SiteShell';
import { PageHero, ProseArticle } from '@/components/site/kit/kit';
import h from './ConceptHome.module.css';
import s from './ConceptLegal.module.css';
/** The legal pages, on the site shell with the kit's hero and long-text typography. */
export function LegalPage({title,children}:{title:string;children:React.ReactNode}) {
  return <SiteShell variant="solid"><PageHero title={title}/><div className={`${h.container} ${s.body}`}><ProseArticle>{children}</ProseArticle></div></SiteShell>;
}
export function LegalSection({title,children}:{title:string;children:React.ReactNode}) { return <section><h2>{title}</h2><div>{children}</div></section>; }
export const LEGAL_LINK_STYLE:React.CSSProperties={color:'inherit',textDecoration:'underline',textUnderlineOffset:'3px'};
