# V2 Landing Page — Handoff Document

**Branch:** `feature/v2-hero-redesign`
**Route:** `/v2` (localhost:3002/v2)
**Last updated:** March 25, 2026

---

## 1. Architecture Overview

### Files

| File | Purpose |
|---|---|
| `app/v2/page.tsx` | Page shell — hero, below-fold, footer, scroll progress bar, intro sequence gating |
| `app/v2/layout.tsx` | Meta tags, OG tags, Twitter card |
| `app/v2/opengraph-image.tsx` | Dynamic OG image (Next.js edge runtime, 1200x630 PNG) |
| `components/HeroV2.tsx` | Hero section — intro animation, cycling subtitles, mockup, CTA |
| `components/HeroDecorations.tsx` | Animated SVG curves (bottom-right cluster, pathLength draw-in) |
| `components/BelowFold.tsx` | All 6 below-fold sections + decorative SVG curves |
| `components/NavbarV2.tsx` | Fixed navbar with bounded background, active section indicator, smooth underline hover |
| `components/FooterV2.tsx` | Minimal footer — logo, copyright, legal links, sign-in |
| `public/assets/integrations/` | 9 self-hosted integration logos (SVG/WebP) |
| `public/assets/branding/delta-icon-light.svg` | Delta logo mark used in the mockup |

### Design System (V2-specific)

All V2 components use inline styles with these shared constants — NOT the global CSS design system (which is the old CaseDelta/Harvey styles):

```
FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
ACCENT = "#2563EB" (blue — CTAs, rotating text, active states)
DELTA_BLUE = "#1D4ED8" (darker blue — hover states, "Delta" wordmark)
BORDER = "#EDEDED" (ruler lines, section dividers)
```

Inter is loaded via Google Fonts in `app/layout.tsx`. Every heading and text element in V2 sets `fontFamily: FONT` explicitly to override the global Harvey Serif / CaseDelta Sans rules in `globals.css`.

### Ruler Lines

Vertical ruler lines run the full height of the page, creating a continuous visual grid. They sit at `-16px` from each edge of the content area inside a `maxWidth: 1320` container with `padding: 0 clamp(24px, 4vw, 48px)`. The hero, below-fold, and navbar all share this exact grid.

The navbar's hover background is bounded by these same ruler lines using `left/right: clamp(8px, calc(4vw - 16px), 32px)`.

Horizontal rules separate each below-fold section (1px, `#EDEDED`, full viewport width).

---

## 2. Marketing & Copy Principles

### The Core Framing

Delta is an **associate**, not a tool. Every piece of copy should reinforce this. Delta is a "who," not a "what." This framing appears in:
- Hero subtitle: "Your associate attorney..."
- Section 1: "An associate that analyzes..."
- Section 4: "Like a great associate..."
- Section 6 CTA: "Meet the associate..."

The strategy document (`casedelta_documents_new/casedelta/CASEDELTA.md`) is the source of truth for all positioning, voice, and competitive framing. Key rules from that doc:
- Never say "AI chatbot," "AI assistant," "AI tool," "virtual paralegal"
- Never say "I'd be happy to help" (chatbot voice)
- Never say "powered by AI" (AI is not the subject; Delta is)
- Never say "personalized" or "customized" (generic, every AI claims this)

### Heading Hierarchy

The entire page is designed so that **if a visitor reads ONLY the headings and nothing else, they understand the full value proposition.**

**Headings** make the claim and sell the outcome. They address the relevant point (value prop, security, integration, learning). They must stand completely alone.

**Subheadings** (used sparingly — only on sections 2 and 4) address the reader's #1 doubt about the heading. They explain HOW we deliver or WHY the claim is true. If the heading says "your data stays inside your firm," the subheading kills the skepticism: "Most legal AI sends your data to outside companies. We don't."

**Body text** is assumed to be unread by nearly everyone. It exists only as optional depth. Keep it minimal or don't add it.

The hierarchy is: heading >>>>> subheading >>>>>>>>>>>>>>>>>> body text.

### The "X enables Y so that Z" Framework

Every heading should implicitly answer: what does the user GET? Not what does Delta DO. Frame from the user's perspective, not the product's.

- Bad: "Cross-platform intelligence" (feature, jargon)
- Good: "Nothing falls through the cracks" (outcome)
- Bad: "Knowledge that compounds, never resets" (abstract)
- Good: "Delta gets smarter with every case" (tangible)

### Current Headings (in scroll order)

| Section | Heading | Purpose |
|---|---|---|
| Hero (intro) | "Delta" + cycling: "remembers how your firm works" / "learns your judges and jurisdiction" / "gets smarter every week" | First impression — establish Delta as a learning associate |
| Hero (settled) | "Your associate attorney that reviews every detail and has a briefing ready before your morning coffee." | Core value prop — sell the outcome |
| 1. Value prop | "An associate that analyzes thousands of [medical records] and builds chronologies, anomaly reports, and case briefs." | What Delta does — with rotating ICP terms |
| 2. Security | "Your client data stays inside your firm. Nothing is ever shared." | Kill the #1 objection (78% cite data privacy) |
| 3. Integrations | "Delta works with what you already use. No switching. No learning curve." | Remove friction — no migration fear |
| 4. Learning | "Delta gets smarter with every case. Like a great associate, except it never forgets." | The key differentiator — compounding memory |
| 5. Quote | "I handed Delta a case with 2,000 pages of medical records. Had a full chronology and anomaly report back in minutes." | Social proof — concrete, believable |
| 6. CTA | "Meet the associate that already knows your judges." | Close with FOMO + associate framing |

### Rotating ICP Terms (Section 1)

The first heading cycles through practice-area-specific record types to signal breadth and make each visitor see their specialty:

| Practice area | Record type |
|---|---|
| Med mal | medical records |
| Commercial lit | financial documents |
| Employment | employment files |
| Insurance defense | claims records |
| General litigation | discovery documents |

These rotate every 3 seconds with a vertical slide animation. Each sits on its own line in blue (`ACCENT`) to avoid layout reflow.

### Language to Avoid on the Website

- "AI" as a leading descriptor (say "Delta," not "our AI")
- Technical jargon: models, infrastructure, tokens, neural networks
- Generic SaaS language: "personalized," "customized," "seamless"
- Promising things Delta doesn't do yet (Intelligence Network is Phase 3, full proactive loop is limited to morning reports currently)
- "Summarize" or "summaries" (every AI claims this)
- Anything implying Delta trains on user data across firms (the network intelligence angle must be framed carefully)

---

## 3. Section-by-Section Design Notes

### Hero

- **Intro sequence**: Big "Delta" wordmark fades in, then three subtitles cycle with a clip-reveal animation. After the last subtitle holds, the intro fades out and the final hero layout fades in (left column text + right column mockup).
- **Below-fold is hidden** (`height: 0, overflow: hidden`) during the intro to prevent scrolling into blank space.
- **Mockup**: Slack-like chat interface showing a Delta morning briefing (Chen v. Mercy med mal case). Three messages animate in with staggered delays. Non-selectable (`userSelect: none`).
- **CTA button**: White background with Google + Microsoft OAuth icons, "Sign up - Free $25 Credit."

### Below-Fold Sections

**Sections 1 & 4** (value props): Full-scale headings (`clamp(32px, 4.5vw, 56px)`, weight 700, black). These are the big sells — generous vertical padding (`120-200px`).

**Sections 2 & 3** (security/integrations): Smaller, quieter headings (`clamp(24px, 3.2vw, 42px)`, weight 600, `#333`). The reassurance part of the heading is in `#888`. Tighter padding (`80-140px`). These are objection-killers, not headlines.

**Section 3** includes 9 integration logos that stagger-fade in left to right, shown at 50% opacity with full opacity on hover. Followed by "+ any service you use" in light gray.

**Section 4** has a `DecoTopLeft` SVG animation (curves flowing from top-left, mirroring the hero's bottom-right) with parallax scrolling (±80px).

**Section 5** (quote): Centered layout with SVG quotation marks (blue, 12% opacity) above and below. Avatar circle with "KG" initials in blue. The quote itself has no `"` characters in the text — the SVG marks handle it visually.

**Section 6** (CTA): Centered, gradient background (`#FFFFFF` to `#F8FAFF`), `DecoWide` SVG animation with parallax (±60px). Button has a subtle pulse animation (`ctaPulse` keyframe, 3s cycle, pauses on hover). "Sign Up — Free $25 Credit."

### Navbar

- **Scroll behavior**: Shows at top, hides on scroll-down, reappears on scroll-up.
- **Hover background**: Bounded by the vertical ruler lines with `borderRadius: 0 0 12px 12px` (rounded bottom corners).
- **Link hover**: Thin underline scales in from center (0.8s), text shifts to `#555`. Both with slow, gentle easing.
- **Active section**: Underline persists on the link whose target section is in view (tracked via `IntersectionObserver`-style scroll check in the scroll handler).
- **Links**: Features -> `#value-prop`, Security -> `#security`, Get Started -> `#cta`. Smooth scrolling via `scroll-behavior: smooth` on `html`.

### Scroll Progress Bar

Thin blue line (`2px`, `ACCENT`) fixed at the very top of the viewport (`zIndex: 200`). Lives in `app/v2/page.tsx`, NOT in the navbar. Uses Framer Motion `useScroll` + `useSpring` for smooth tracking.

### Footer

Minimal: CaseDelta logo (22px height, 60% opacity), "© 2026 CaseDelta", Privacy/Terms/Sign in links. Hover color shift on links.

---

## 4. Animation Inventory

| Element | Type | Trigger | Duration |
|---|---|---|---|
| Hero intro subtitles | Clip-reveal (`clipReveal` keyframe) | Sequential timers | 1.2s each |
| Hero SVG curves | `pathLength` draw-in | Page load | 2s, staggered 0.3s |
| Hero mockup messages | Fade-in + slide up | Staggered delays after reveal | 0.6s each |
| Below-fold headings | Fade-in + slide up (`fade()`) | Scroll into view (`whileInView`) | 0.8s |
| Rotating ICP terms | Vertical slide (`AnimatePresence`) | 3s interval | 0.4s |
| Integration logos | Staggered fade-in + slide up | Scroll into view | 0.5s, 80ms stagger |
| Section 4 SVG curves | `pathLength` draw-in | Scroll into view | 2s, staggered 0.25s |
| Section 4 parallax | Y-axis shift (±80px) | Scroll position | Continuous |
| Section 6 SVG curves | `pathLength` draw-in | Scroll into view | 2.5s, staggered 0.3s |
| Section 6 parallax | Y-axis shift (±60px) | Scroll position | Continuous |
| CTA button pulse | Box-shadow breathe | Always (CSS keyframe) | 3s cycle |
| Navbar underline | Scale-X from center + opacity | Hover / active section | 0.8s |
| Scroll progress bar | Scale-X | Scroll position (spring-smoothed) | Continuous |

---

## 5. What's Built vs. What's Aspirational

**Accurately represented on the website (built today):**
- Document analysis (classification, completeness tracking, anomaly detection)
- Agentic Q&A with source citations
- Draft email generation
- Case management
- Google Drive integration
- Audit trail logging
- Morning briefing concept (the mockup shows this)

**Mentioned but not fully built yet:**
- Clio read/write integration (finishing this month per strategy doc)
- Morning briefing automation (currently manual/limited)
- Learning/memory that compounds over time (infrastructure in progress)
- Intelligence Network / cross-firm intelligence (Phase 3)
- Judge/jurisdiction research (30-60 day roadmap)
- QuickBooks, Dropbox, Outlook, DocuSign, MyCase integrations (logos shown, not all built)

**Not mentioned on the website (intentionally):**
- Pricing (no pricing page yet — "Get Started" nav link goes to CTA)
- Intelligence Network details (too early, risks "training on your data" perception)
- Specific competitor comparisons

---

## 6. Known Issues & Forward Work

### Issues
- The old global CSS (`globals.css`) applies Harvey Serif to all `h1-h6` and CaseDelta Sans to `body`, plus a `14px` base font size. V2 components override these inline, but any new element without explicit `fontFamily: FONT` will inherit the old styles.
- Privacy and Terms footer links point to `/privacy` and `/terms` which may be old pages or non-existent on the v2 route.
- The `prefers-reduced-motion` media query in `globals.css` kills ALL animations. V2 relies heavily on animations — may need a more nuanced approach.

### Forward Development
- **Integration logos as a dedicated feature**: The logos are currently just images. A future iteration could link to dedicated integration pages or show connection status.
- **Pricing section/page**: Currently absent. The nav link "Get Started" points to the CTA section.
- **Mobile responsiveness**: The rotating text has `whiteSpace: nowrap` with overflow safety nets, but the full page needs thorough mobile testing (hero grid, mockup sizing, logo row wrapping).
- **Real testimonials**: The current quote is placeholder. Replace with actual customer quotes as they come in.
- **A/B testing**: The v2 page is a separate route. When ready, the middleware can route traffic between the old page and v2.
- **Demo video**: The hero mockup is a static HTML recreation. When a real demo video exists, it can replace the mockup.

---

## 7. How to Continue Development

1. **Read CASEDELTA.md first** (`casedelta_documents_new/casedelta/CASEDELTA.md`) — it's the single source of truth for positioning, voice, and strategy. Every copy decision should pass the test: "Does this make Delta's learning more visible, more valuable, and more irreplaceable?"

2. **Headings do all the work.** Before adding any text, ask: does the heading alone convey the value? If yes, you probably don't need a subheading. If you add a subheading, it should address the reader's doubt about the heading, not repeat it.

3. **Associate framing is non-negotiable.** Delta is a who, not a what. If copy describes Delta as a "tool," "platform," or "system," rewrite it.

4. **Less is more.** The current page is intentionally sparse. Every element earned its place through iteration. Resist adding cards, grids, feature lists, or decorative elements unless they directly serve a heading.

5. **Match the design language.** New sections should use the same constants (`FONT`, `ACCENT`, `BORDER`), the same ruler line grid (`maxWidth: 1320`, same padding), and the same `fade()` animation helper. Value props get full-scale headings; reassurances get quieter headings.

6. **Test the headings-only scan.** After any change, read just the headings top to bottom. Do they tell a complete story? Does a managing partner scrolling fast get the full value proposition?
