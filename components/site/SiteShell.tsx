'use client';
/**
 * The chrome every page on the new design wears: skip link, nav (with the mobile
 * menu and headroom), footer, the smooth scroll, and the motion root that drives
 * data-reveal and data-parallax for everything inside it.
 *
 * Lifted out of ConceptHome.tsx on 2026-09-25 so the homepage, /demo, the legal
 * pages, the 404 and every new page share one nav and one footer. The nav and
 * footer still use the homepage's own classes in ConceptHome.module.css (the root
 * must carry its .site class, whose type scale and resets every section relies on);
 * SiteShell.module.css only adds what the footer columns needed.
 *
 *   variant "photo"  transparent over a photographic hero until the reader scrolls
 *   variant "solid"  paper from the first frame, for a page without a photo hero
 *
 * Children may be server components, so page text stays in the raw HTML.
 */
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { LOGO } from '@/components/site/brand';
import { SmoothScroll } from '@/components/site/SmoothScroll';
import { useMotion } from '@/components/concept/motion';
import '@/components/concept/motion.css';
import h from '@/components/concept/ConceptHome.module.css';
import f from './SiteShell.module.css';
import { BOOK_HREF, FOOTER, LOGIN_HREF, NAV, type NavLink } from './nav';

interface Props {
  children: React.ReactNode;
  variant?: 'photo' | 'solid';
  /** The homepage: nav links scroll to its sections instead of leaving the page. */
  home?: boolean;
  /** Hide "Book a demo" in the nav, on the page that IS the booking page. */
  hideBook?: boolean;
  className?: string;
  mainClassName?: string;
}

export function SiteShell({ children, variant = 'solid', home, hideBook, className, mainClassName }: Props) {
  const site = useRef<HTMLDivElement>(null);
  useMotion(site);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Headroom: the bar leaves on the way down and comes back the moment the reader
  // pulls up, so the viewport belongs to the page and the nav is never hunted for.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;
      setScrolled(y > 40);
      // 8px of intent, so a trackpad's jitter neither hides nor reveals it.
      if (y < 120 || delta < -8) setHidden(false);
      else if (delta > 8) setHidden(true);
      lastY.current = y;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read(); window.addEventListener('scroll', scroll, { passive: true });
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuRef.current?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuRef.current?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); window.removeEventListener('keydown', escape); };
  }, []);
  const solid = variant === 'solid' || scrolled || menu;
  const href = (l: NavLink) => (home && l.home) || l.href;
  return <div ref={site} className={`${h.site} motionSite ${className ?? ''}`}>
    <SmoothScroll/>
    <a className={h.skip} href="#content">Skip to content</a>
    <header className={`${h.navigation} ${solid ? h.navigationSolid : ''} ${hidden && !menu ? h.navigationHidden : ''}`}>
      <a href="/" aria-label="CaseDelta home"><img className={h.logo} src={solid ? LOGO.onLight : LOGO.onDark} alt="CaseDelta"/></a>
      <nav className={h.desktopNav} aria-label="Main navigation">{NAV.map((l) => <a key={l.label} href={href(l)}>{l.label}</a>)}</nav>
      <div className={h.navActions}>
        <a className={h.login} href={LOGIN_HREF}>Log in</a>
        {!hideBook && <a className={h.navBook} href={BOOK_HREF}>Book a demo <ArrowUpRight size={18}/></a>}
        <button ref={menuRef} className={h.menuButton} aria-expanded={menu} aria-controls="site-menu" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Plus/>}</button>
      </div>
      {menu && <nav id="site-menu" className={h.mobileNav} aria-label="Mobile navigation">
        {[...NAV, { label: 'Log in', href: LOGIN_HREF }].map((l) => <a key={l.label} href={href(l)} onClick={() => setMenu(false)}>{l.label}<ArrowUpRight/></a>)}
      </nav>}
    </header>
    <main id="content" className={mainClassName}>{children}</main>
    <footer className={`${h.footer} ${h.container} ${f.foot}`}>
      <div><a href="/"><img src={LOGO.onLight} alt="CaseDelta" className={h.logo}/></a><p>The AI paralegal for law firms.</p></div>
      <nav aria-label="Footer" className={f.cols}>
        {FOOTER.map((col) => <div key={col.title}>
          <p className={f.colTitle}>{col.title}</p>
          <ul>{col.links.map((l) => <li key={l.label}><a href={href(l)}>{l.label}</a></li>)}</ul>
        </div>)}
      </nav>
      <div className={h.copyright}><span>© 2026 CaseDelta</span></div>
    </footer>
  </div>;
}
