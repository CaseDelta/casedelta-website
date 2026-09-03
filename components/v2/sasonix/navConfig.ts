/**
 * The nav's contents, as data.
 *
 * Separate from Nav.tsx because the shape of this file is the argument the site
 * makes about itself, and it changes far more often than the rendering does.
 *
 * TWO RULES, both learned the hard way on this nav.
 *
 * 1. EVERY DESTINATION MUST EXIST. A "The work" item pointed at /use-cases for
 *    weeks after nothing rendered there. Before that, a "Contact" item pointed
 *    at #contact, an id no element on the page has ever carried, so the link
 *    silently did nothing.
 *
 * 2. NO TWO ITEMS MAY LAND IN THE SAME PLACE. A dropdown of eight rows that all
 *    scroll to #features is worse than no dropdown: it reads as a rich site map
 *    and behaves as one link. This is the reason the menus below are small. The
 *    site has four homepage sections and three real pages, so the menus have
 *    four and three items. Grow them when there is somewhere new to go, not to
 *    make the panel look fuller.
 *
 * `id` scrolls to a homepage section; `href` is a real route.
 */

export interface NavLink {
  label: string;
  /** Homepage section id. Smooth-scrolls, and still renders a working /#id href. */
  id?: string;
  /** A real route. */
  href?: string;
  /** One line under the label. Optional, and only where it earns its space. */
  desc?: string;
}

export interface NavPanel {
  /** Small uppercase column header. */
  head: string;
  links: NavLink[];
}

export interface NavEntry {
  label: string;
  id?: string;
  href?: string;
  /** Present means this entry opens a dropdown rather than navigating. */
  panels?: NavPanel[];
  /** The card in the last column of the panel. */
  feature?: { eyebrow: string; title: string; body: string; href: string };
}

export const NAV: NavEntry[] = [
  {
    label: "Product",
    panels: [
      {
        head: "The platform",
        links: [
          { label: "What it does", id: "features", desc: "The three jobs Delta takes off the desk" },
          { label: "Why Delta", id: "why", desc: "How it differs from the rest of legal AI" },
          { label: "Security", id: "security", desc: "Where your records live, and who sees them" },
          { label: "Pricing", id: "pricing", desc: "Flat, per firm, published" },
        ],
      },
    ],
    feature: {
      eyebrow: "See it live",
      title: "Bring one real case",
      body: "Fifteen minutes on your own file, in your own tools.",
      href: "/demo",
    },
  },
  {
    label: "Company",
    panels: [
      {
        head: "About us",
        links: [
          { label: "About", href: "/about", desc: "Why we build Delta, and who builds it" },
          { label: "Blog", href: "/blog", desc: "Notes on running a firm with an AI teammate" },
          { label: "Answers", href: "/answers", desc: "The questions firms ask before a demo" },
        ],
      },
    ],
  },
];

/**
 * The three right-hand actions, in ascending commitment: read, talk, start.
 *
 * "Get started" is the self-serve door. It points at the signup tab on the app,
 * which is gated server-side by SELF_SERVE_AUTH_ENABLED on
 * authentication_service. If that gate is shut, the app forces the tab back to
 * login and this button becomes a link to a sign-in page. Check the gate before
 * assuming the button works.
 */
export const NAV_ACTIONS = {
  login: { label: "Log in", href: "https://app.casedelta.com" },
  demo: { label: "Book a demo", href: "/demo" },
  start: { label: "Get started", href: "https://app.casedelta.com/signup" },
} as const;
