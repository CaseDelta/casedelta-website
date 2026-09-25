/**
 * The one nav and footer config for every page on the shell.
 *
 * `home` is where the link points ON THE HOMEPAGE, so the homepage keeps its
 * in-page scrolling while every other page goes to the real route. /pricing and
 * /security are real pages (2026-09-25); on the homepage their nav links still
 * scroll to the #pricing and #privacy bands, and each band links on to its page.
 */
import { COMPARE_LINKS } from "../../lib/compare-links";
import { PAGE_PLATFORMS } from "../../lib/integrations";

export interface NavLink { label: string; href: string; home?: string }

export const BOOK_HREF = "/demo";
export const LOGIN_HREF = "https://app.casedelta.com";

export const NAV: NavLink[] = [
  { label: "How it works", href: "/#how", home: "#how" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing", home: "#pricing" },
  { label: "Security", href: "/security", home: "#privacy" },
];

/**
 * Every indexable page, planned or built. Footer links are how a crawler finds a
 * page that is not in the nav, so a new indexable page gets a row here the same
 * day. Links to pages not yet built are expected while the overhaul is in flight.
 */
export const FOOTER: { title: string; links: NavLink[] }[] = [
  { title: "Product", links: [
    { label: "How it works", href: "/#how", home: "#how" },
    { label: "Integrations", href: "/integrations" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Book a demo", href: BOOK_HREF },
  ] },
  { title: "Integrations", links: [
    { label: "All integrations", href: "/integrations" },
    ...PAGE_PLATFORMS.map((p) => ({ label: p.name, href: `/integrations/${p.slug}` })),
  ] },
  { title: "Compare", links: COMPARE_LINKS.map((c) => ({ label: c.label, href: `/compare/${c.slug}` })) },
  { title: "Resources", links: [
    { label: "Answers", href: "/answers" },
    { label: "Blog", href: "/blog" },
  ] },
  { title: "Legal", links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ] },
];
