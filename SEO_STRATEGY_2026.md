# CaseDelta SEO Strategy Bible — 2026

> Comprehensive SEO research and implementation guide for CaseDelta, a B2B SaaS legal tech platform (AI-powered document collection for law firms). Built on Next.js 15 App Router.
>
> Last updated: April 2026

---

## Table of Contents

1. [Technical SEO Foundations](#1-technical-seo-foundations)
2. [On-Page SEO](#2-on-page-seo)
3. [AI and Search in 2026](#3-ai-and-search-in-2026)
4. [Content Strategy for SEO](#4-content-strategy-for-seo)
5. [Local and Industry-Specific SEO](#5-local-and-industry-specific-seo)
6. [Link Building and Off-Page SEO](#6-link-building-and-off-page-seo)
7. [Measurement and Analytics](#7-measurement-and-analytics)
8. [Next.js Specific SEO Implementation](#8-nextjs-specific-seo-implementation)
9. [Emerging SEO Trends](#9-emerging-seo-trends)
10. [Implementation Roadmap](#10-implementation-roadmap)

---

## 1. Technical SEO Foundations

### 1.1 Core Web Vitals (2026 Thresholds)

**Priority: CRITICAL**

The three Core Web Vitals are confirmed Google ranking signals measured from real Chrome users (CrUX data) at the 75th percentile. After the March 2026 core update, Google strengthened the weight of performance metrics — performance shifted from tiebreaker to quality filter.

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5–4s | > 4s |
| **INP** (Interaction to Next Paint) | < 200ms | 200–500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 | > 0.25 |

**Key data points:**
- Only 47% of sites meet Google's "good" thresholds in 2026; the remaining 53% lose 8–35% of conversions, traffic, and revenue
- 43% of sites fail the 200ms INP threshold — INP is the most commonly failed metric
- Pages in position 1 show 10% higher Core Web Vitals pass rates than position 9
- 60% of Google searches occur on mobile; mobile scores now determine desktop rankings
- Each second of delay beyond the 2.5s LCP threshold increases bounce rates by 32%
- Sites reaching "good" thresholds see conversion improvements of 15–30%

**INP replaced FID as of March 2024.** INP measures ALL interactions (every click, tap, keypress) at the 98th percentile, not just the first interaction.

**LCP Optimization Recommendations for CaseDelta:**
- Convert all images to WebP/AVIF; size to exact rendered dimensions
- Preload critical resources: `<link rel="preload" as="image" href="hero.webp">`
- Deploy CDN (Vercel Edge Network handles this automatically)
- Defer non-critical CSS/JS with `async` or `defer` attributes
- Optimize TTFB through server-side caching and edge rendering
- Do NOT lazy-load the hero image (LCP element) — this is the most common performance regression seen in 2026 audits

**INP Optimization Recommendations:**
- Audit and eliminate unnecessary third-party scripts (chat widgets, analytics pixels)
- Break JavaScript tasks exceeding 50ms using `requestAnimationFrame` or `scheduler.yield()`
- Lazy-load non-critical features below the fold
- Implement code splitting and tree shaking in Next.js
- 57% of JavaScript execution time comes from third-party code — audit ruthlessly

**CLS Optimization Recommendations:**
- Set explicit width/height or `aspect-ratio` CSS on all images and videos
- Reserve space for ads, embeds, and dynamically injected content
- Use `font-display: swap` with preloaded web fonts
- Prefer `transform` and `opacity` animations over layout-triggering properties (height, width, top)
- CSS `transform` animations are GPU-accelerated and do not cause layout shifts

**Measurement Tools (all free):**
- Google Search Console: Field data (real users)
- PageSpeed Insights: Combined field + lab analysis
- Chrome DevTools: Lab debugging
- Lighthouse: Comprehensive audits
- CrUX Dashboard: Trend tracking over time

Sources:
- [Google Search Central: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [Mewa Studio: SEO & Core Web Vitals 2026](https://www.mewastudio.com/en/blog/seo-core-web-vitals-2026)
- [CoreWebVitals.io: LCP, INP & CLS Explained](https://www.corewebvitals.io/core-web-vitals)
- [DebugBear: Core Web Vitals Metrics](https://www.debugbear.com/docs/core-web-vitals-metrics)

---

### 1.2 Structured Data / JSON-LD

**Priority: CRITICAL**

Google recommends JSON-LD over Microdata and RDFa. In 2026, the primary value of JSON-LD is no longer just rich snippets — it is AI visibility across every system that reads your site. Schema markup is now the foundation of both traditional SEO and Answer Engine Optimization (AEO).

**Schema Types CaseDelta Must Implement:**

| Schema Type | Where | Priority |
|-------------|-------|----------|
| `Organization` | Homepage | Critical |
| `WebSite` with `SearchAction` | Homepage | Critical |
| `WebApplication` | Product / homepage | Critical |
| `FAQPage` | FAQ sections, product pages | High |
| `BreadcrumbList` | All pages | High |
| `BlogPosting` / `Article` | Blog posts | High |
| `HowTo` | Tutorial / guide content | Medium |
| `SoftwareApplication` with `AggregateOffer` | Pricing page | High |
| `Review` / `AggregateRating` | Testimonial pages | Medium |
| `Person` | Author pages, about page | Medium |

**WebApplication Schema for SaaS (JSON-LD example):**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CaseDelta",
  "url": "https://casedelta.com",
  "applicationCategory": "BusinessApplication",
  "browserRequirements": "Requires JavaScript and HTML5 support",
  "description": "AI-powered document collection and verification for law firms",
  "offers": {
    "@type": "AggregateOffer",
    "priceSpecification": [
      {
        "@type": "UnitPriceSpecification",
        "price": "XX",
        "priceCurrency": "USD",
        "name": "Monthly subscription",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitCode": "MON"
        }
      }
    ]
  }
}
```

**Organization Schema (homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CaseDelta",
  "url": "https://casedelta.com",
  "logo": "https://casedelta.com/logo.png",
  "description": "AI-powered document collection platform for law firms",
  "sameAs": [
    "https://twitter.com/casedelta",
    "https://linkedin.com/company/casedelta"
  ]
}
```

**Implementation best practices:**
- Use `@id` references to connect entities into a coherent knowledge graph
- Ensure structured data accurately represents visible page content
- Test with Google's Rich Results Test and Schema Markup Validator
- Monitor in Google Search Console under Enhancements
- Companies that implement advanced schema markup see up to 30% improvement in search visibility within 90 days

**FAQ Schema — Still Valuable in 2026:**
While Google restricted FAQ rich results to government/health sites in August 2023, FAQ schema still feeds Google's knowledge graph, improves entity understanding, and increases chances of being cited in AI-generated answers. Implement 3-10 high-quality Q&A pairs per page.

Sources:
- [Google: Intro to Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google: General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Dan Taylor: Schema for SaaS Products](https://dantaylor.online/blog/schema-for-saas-subscription-products/)
- [Schema Pilot: JSON-LD Complete Guide 2026](https://www.schemapilot.app/blog/json-ld-guide/)
- [ALM Corp: Schema Markup 2026](https://almcorp.com/blog/schema-markup-detailed-guide-2026-serp-visibility/)
- [Ignite Visibility: JSON-LD SEO](https://ignitevisibility.com/everything-to-know-about-json-ld-for-seo/)

---

### 1.3 Sitemap and robots.txt

**Priority: CRITICAL**

**Sitemap Best Practices:**
- Generate sitemaps programmatically via `app/sitemap.ts` (see Section 8 for Next.js implementation)
- Include `lastModified` dates for each URL — critical for content freshness signals
- Include `changeFrequency` and `priority` values
- Google's limit is 50,000 URLs per sitemap file; use `generateSitemaps` for larger sites
- Submit sitemap URL in robots.txt and Google Search Console
- Only include canonical, indexable URLs — exclude paginated, filtered, or duplicate pages

**robots.txt Best Practices:**
- Generate via `app/robots.ts` (see Section 8)
- Allow all important content paths
- Disallow admin, API, and internal-only routes
- Reference sitemap location
- Do NOT block CSS or JavaScript files that Googlebot needs for rendering

Sources:
- [Next.js: Sitemap Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js: robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js: generateSitemaps](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps)

---

### 1.4 Canonical URLs and Duplicate Content

**Priority: HIGH**

Canonical tags tell search engines which version of a page is the "preferred" version. Google treats canonicals as suggestions (disregards up to 35% of the time if conflicting signals exist).

**Best Practices:**
- Every page must have a self-referencing canonical tag
- Use consistent absolute URLs (always `https://casedelta.com/...`, not relative)
- Canonical tags MUST appear inside `<head>` — anywhere else is ignored
- Align canonicals with internal links and sitemaps (no conflicting signals)
- Never combine `noindex` + canonical — these create conflicting signals
- Never point canonical to a URL that redirects
- For A/B testing variants: canonical all variants to the primary URL

**CaseDelta-Specific Consideration:**
The A/B testing system uses URL rewriting (users see `casedelta.com`, backend serves `/light/side` etc.). Ensure the canonical URL points to the user-facing URL, NOT the internal variant path. The edge middleware must set the canonical correctly.

**For Pagination:**
Each paginated page should have its own self-referencing canonical and should be indexable. Do NOT collapse paginated pages with a single canonical to Page 1.

**GEO Consideration:**
As AI engines (ChatGPT, Perplexity, Gemini) also rely on canonical signals to identify the "true" version of a page, proper canonicalization is becoming even more important for AI search visibility.

Sources:
- [Google: Consolidate Duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Search Engine Land: Canonicalization SEO 2026](https://searchengineland.com/canonicalization-seo-448161)
- [Semrush: Canonical URL Guide](https://www.semrush.com/blog/canonical-url-guide/)

---

### 1.5 Internal Linking Strategy

**Priority: HIGH**

Internal linking can boost search rankings by up to 40%, improve crawl efficiency by 40–70%, and drive traffic increases of 31%+.

**Best Practices:**
- Keep key pages within 3 clicks of the homepage (pyramid structure)
- Aim for 2–5 contextual links per 1,000 words
- Keep total page links under 150 to maintain link equity
- Use descriptive, varied anchor text (avoid overusing exact-match keywords)
- Build topic cluster architecture: pillar pages link to cluster pages and vice versa
- Connect content that naturally belongs together — relevance over hierarchy
- Link from high-authority pages to critical conversion pages to transfer PageRank

**CaseDelta Internal Linking Architecture:**
```
Homepage
├── /features (pillar page)
│   ├── /features/document-collection
│   ├── /features/ai-verification
│   └── /features/client-portal
├── /pricing
├── /security
├── /blog (content hub)
│   ├── /blog/[category]/[slug] (cluster pages)
│   └── links back to features, pricing, use-case pages
├── /use-cases (practice area pages)
│   ├── /use-cases/personal-injury
│   ├── /use-cases/family-law
│   └── /use-cases/immigration
├── /compare (comparison pages)
│   ├── /compare/casedelta-vs-[competitor]
│   └── /compare/[competitor]-alternatives
└── /resources
    ├── /glossary
    └── /guides
```

**Regular Auditing:**
Crawl the site quarterly to find orphaned pages, broken links, and content buried too deep. Tools: Screaming Frog, Ahrefs Site Audit.

Sources:
- [ClickRank: Internal Linking Structure Guide](https://www.clickrank.ai/effective-internal-linking-structure/)
- [Shopify: Internal Links SEO Best Practices 2026](https://www.shopify.com/blog/internal-links-seo)
- [Mavic Labs: Internal Linking Strategy 2026](https://www.maviklabs.com/blog/internal-linking-strategy-2026)

---

### 1.6 Page Speed Optimization

**Priority: CRITICAL**

Sites loading under 2 seconds show 9% bounce rates; those exceeding 5 seconds reach 38%. A one-second delay reduces conversions by 7%.

**Font Loading:**
- Use `font-display: swap` to show fallback fonts while custom fonts load
- Preload critical fonts with `<link rel="preload" as="font">`
- Use font subsetting — only include characters you actually use
- Choose fallback fonts that closely match custom fonts to minimize CLS

**CSS Optimization:**
- Inline critical (above-the-fold) CSS directly in `<head>`
- Defer non-critical CSS
- Remove unused CSS (tree shake with PurgeCSS or Tailwind's built-in purging)
- Use CSS `transform` and `opacity` for animations (GPU-accelerated, no layout shifts)

**JavaScript Optimization:**
- Code split with Next.js dynamic imports: `dynamic(() => import(...))`
- Minify all JS (Terser in Next.js build pipeline)
- Remove unused code / dead code elimination
- Minimize third-party scripts — they account for 57% of JS execution time
- Use `defer` or `async` on non-critical scripts

**Infrastructure:**
- CDN: Vercel Edge Network serves from nearest edge node (sub-10ms latency vs 180ms+ for origin)
- TTFB (Time to First Byte) sets the ceiling — optimize server response first
- Enable Brotli/gzip compression
- HTTP/2 or HTTP/3 for multiplexed connections

Sources:
- [IndexCraft: Site Speed Optimization Guide 2026](https://indexcraft.in/blog/technical/site-speed-optimization-guide)
- [Elementor: Website Speed Optimization Techniques 2026](https://elementor.com/blog/website-speed-optimization-techniques/)
- [PageSpeedMatters: Web Performance Optimization Guide](https://www.pagespeedmatters.com/resources/guides/web-performance-optimization-complete-guide)

---

### 1.7 Mobile-First Indexing

**Priority: CRITICAL**

Google uses the mobile version of your site as the canonical version for ranking. Mobile-first indexing is fully rolled out since October 2023 — there is no opt-out.

**Requirements:**
- Responsive design (CaseDelta uses Tailwind CSS mobile-first breakpoints — already correct)
- Same content on mobile and desktop (no hidden content on mobile)
- Same structured data on both versions
- Same meta tags (title, description, robots) on both versions
- Touch targets minimum 48x48px
- Text readable without zooming (minimum 16px body text equivalent)
- No horizontal scrolling
- Test with Google's Mobile-Friendly Test tool

**CaseDelta Note:** The current base font size is 14px per brand guidelines. This may cause mobile readability issues — consider increasing to 16px for body text on mobile breakpoints to meet accessibility and mobile-first standards.

Sources:
- [Digital Applied: Mobile SEO 2026](https://www.digitalapplied.com/blog/mobile-seo-2026-mobile-first-indexing-guide)
- [ClickRank: Mobile-First Indexing Guide](https://www.clickrank.ai/mobile-first-indexing/)

---

### 1.8 HTTPS and Security Signals

**Priority: CRITICAL**

HTTPS is a confirmed ranking signal. Google's page experience signal incorporates HTTPS alongside Core Web Vitals and the absence of intrusive interstitials.

**Requirements:**
- HTTPS everywhere (Vercel provides automatic SSL)
- HSTS headers enabled
- No mixed content (all resources loaded over HTTPS)
- Valid SSL certificate (auto-renewed by Vercel)
- Security headers: CSP, X-Frame-Options, X-Content-Type-Options

Sources:
- [Google: Page Experience](https://developers.google.com/search/docs/appearance/page-experience)
- [Wix SEO Expert: Google Ranking Factors 2026](https://www.wixseoexpert.com/post/google-ranking-factors-the-complete-list-2026)

---

## 2. On-Page SEO

### 2.1 Title Tags

**Priority: CRITICAL**

According to First Page Sage data, "keyword in title tag" is the #2 ranking factor (14% weight), second only to content quality (23%).

**Specifications:**
- Length: 50–60 characters (approximately 580 pixels)
- Sticking to 50–60 characters ensures correct display in ~90% of search results
- True limiting factor is pixel width: ~600 pixels on desktop

**Best Practices:**
- Front-load the primary keyword at the beginning of the title
- Include brand name (typically at the end, separated by ` | ` or ` — `)
- Each page must have a unique title tag
- Write for humans first, search engines second
- Avoid special characters that break displays (curly quotes, ampersands)
- Consider punchy 30–40 character titles when competitors pad to the limit

**CaseDelta Title Tag Templates:**
- Homepage: `CaseDelta — AI Document Collection for Law Firms`
- Features: `AI Document Collection Features | CaseDelta`
- Pricing: `CaseDelta Pricing — Plans for Law Firms of Every Size`
- Blog: `[Post Title] | CaseDelta Blog`
- Comparison: `CaseDelta vs [Competitor]: Document Collection Compared`
- Use case: `Document Collection for [Practice Area] | CaseDelta`

Sources:
- [Straight North: Title Tags & Meta Descriptions 2026](https://www.straightnorth.com/blog/title-tags-and-meta-descriptions-how-to-write-and-optimize-them-in-2026/)
- [Zyppy: Meta Title Tag Length Data](https://zyppy.com/title-tags/meta-title-tag-length/)
- [Scalenut: Meta Title Length Best Practices 2026](https://www.scalenut.com/blogs/meta-title-length-best-practices-2026)

---

### 2.2 Meta Descriptions

**Priority: HIGH**

Meta descriptions are NOT a ranking factor but directly impact click-through rate, which IS a ranking signal.

**Specifications:**
- Length: 140–160 characters (920 pixels desktop, 680 pixels mobile)
- Mobile: approximately 120 characters

**Best Practices:**
- Write as ad copy — sell the click
- Include the primary keyword naturally (Google bolds matching terms)
- Include a call-to-action ("Learn how...", "See why 500+ firms trust...")
- Focus on intent-based, conversational phrases
- Each page needs a unique meta description
- If omitted, Google will auto-generate from page content — not ideal

**CaseDelta Meta Description Templates:**
- Homepage: `CaseDelta uses AI to collect, verify, and organize legal documents from clients — no follow-up emails needed. See how 500+ law firms save 10+ hours per case.`
- Features: `Explore CaseDelta's AI-powered document collection, automated verification, and smart client portal. Purpose-built for litigation teams.`
- Pricing: `Transparent pricing for AI document collection. Start free, scale as you grow. Plans for solo practitioners to AmLaw 200 firms.`

Sources:
- [Straight North: Title Tags & Meta Descriptions 2026](https://www.straightnorth.com/blog/title-tags-and-meta-descriptions-how-to-write-and-optimize-them-in-2026/)
- [WSCubeTech: Meta Title Description Character Limit 2026](https://www.wscubetech.com/blog/meta-title-description-length/)

---

### 2.3 Header Hierarchy (H1–H6)

**Priority: HIGH**

Proper heading structure serves three audiences: users, search engines, and AI systems (screen readers, LLMs, AI Overviews).

**Best Practices:**
- ONE H1 per page — describes the primary topic (usually the page title)
- H2s represent major sections under the H1 (align with user questions/tasks)
- H3s and below introduce sub-sections supporting the H2 above
- NEVER skip heading levels (H1 -> H3 without H2 is wrong)
- Use H3 tags when content under an H2 exceeds ~300 words
- Headings are not typography shortcuts — use CSS for visual sizing
- Avoid vague labels ("Introduction", "More Information") — be descriptive
- Do NOT wrap CTAs or UI labels in heading tags unless they are section titles

**CaseDelta Heading Example (Homepage):**
```
H1: Get Documents From Clients Without the Follow-Up Headache
  H2: How CaseDelta Works
    H3: Send a Secure Collection Request
    H3: AI Verifies Documents Automatically
    H3: Review Everything in One Dashboard
  H2: Built for Every Practice Area
    H3: Personal Injury
    H3: Family Law
    H3: Immigration
  H2: What Law Firms Say About CaseDelta
  H2: Enterprise-Grade Security
  H2: Frequently Asked Questions
```

Sources:
- [Design in DC: Header Structure SEO 2026](https://designindc.com/blog/why-header-structure-still-matters-in-2026/)
- [Conductor: How to Structure H1-H6 Headings for SEO and AI](https://www.conductor.com/academy/headings/)
- [Search Engine Journal: How to Use Header Tags](https://www.searchenginejournal.com/on-page-seo/header-tags/)

---

### 2.4 Image Optimization

**Priority: HIGH**

Visual search experienced a 73% jump in usage in 2025–2026.

**Format Hierarchy (serve in this order):**
1. AVIF — 50% smaller than JPEG at equivalent quality
2. WebP — 25–35% smaller than JPEG, near-universal browser support
3. JPEG/PNG — final fallback only

**Alt Text Best Practices:**
- Descriptive alt text is the single highest-impact image SEO action
- Write for accessibility first (screen readers), not keyword stuffing
- Describe what is in the image, naturally — aim for 125 characters or less
- Include relevant context (e.g., "CaseDelta dashboard showing document collection status for a personal injury case")
- Decorative images: use empty alt (`alt=""`)

**Lazy Loading:**
- Lazy-load all images below the fold
- NEVER lazy-load the LCP image (hero/above-fold) — causes major performance regression
- Next.js `Image` component handles lazy loading automatically for non-priority images

**Next.js Image Component Benefits:**
- Automatically serves WebP/AVIF based on browser support
- Serves exact image size needed (responsive srcset)
- Built-in lazy loading for off-screen images
- Automatic `width`/`height` attributes (prevents CLS)
- Use `priority` prop for LCP images

**Implementation:**
```tsx
import Image from 'next/image'

// Hero image (LCP) - priority loading
<Image src="/hero.webp" alt="..." width={1200} height={630} priority />

// Below-fold image - automatic lazy loading
<Image src="/feature.webp" alt="..." width={600} height={400} />
```

Sources:
- [Digital Applied: Image SEO Guide 2026](https://www.digitalapplied.com/blog/image-seo-visual-search-optimization-guide-2026)
- [DebugBear: Next.js Image Optimization](https://www.debugbear.com/blog/nextjs-image-optimization)
- [Ignite Visibility: Image SEO in the Age of AI](https://ignitevisibility.com/image-seo/)

---

### 2.5 URL Structure

**Priority: HIGH**

Descriptive slugs can improve CTR by 25–35%. GEO relies heavily on clean URLs — AI engines like Perplexity and Gemini prefer clean, trustworthy URLs when citing sources.

**Best Practices:**
- Slug length: 3–5 words (30–50 characters)
- Use hyphens as word separators (NOT underscores)
- All lowercase (prevents duplicate content from case sensitivity)
- Place primary keyword near the beginning
- Avoid stop words (a, the, and, or) unless they aid readability
- Avoid dates and numbers that make content appear dated
- Follow logical hierarchy: `/category/subcategory/page-name`
- Per Google's John Mueller: "Keywords in URLs are overrated for Google SEO" — but they help users and AI citation

**CaseDelta URL Structure:**
```
/                           # Homepage
/features                   # Features pillar page
/features/document-collection
/features/ai-verification
/pricing                    # Pricing page
/security                   # Security page
/blog                       # Blog index
/blog/document-collection/how-to-collect-client-documents
/use-cases/personal-injury
/use-cases/family-law
/compare/casedelta-vs-lawmatics
/resources/glossary
/resources/guides/document-collection-best-practices
```

Sources:
- [Slug Genius: URL Slug Best Practices 2026](https://sluggenius.com/blog/url-slug-best-practices)
- [Yoast: What is a Slug](https://yoast.com/slug/)
- [Shopify: SEO URL Structure](https://www.shopify.com/blog/seo-url)

---

### 2.6 E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

**Priority: CRITICAL**

Google's March 2026 core update massively amplified E-E-A-T signals. Trust is the most important of the four components. E-E-A-T is not a direct ranking factor — it is a framework that Google's algorithms are trained to detect through on-page and off-page signals.

**Experience (first E) — Now the Primary Differentiator:**
- Content demonstrating genuine first-hand experience outranks comprehensive but impersonal pages
- For CaseDelta: Include specific details, original outcomes, verifiable author credentials
- Practical examples: "Here is how we helped [anonymized firm] collect 500 documents in 3 days"
- Case studies with real metrics, timelines, and process descriptions

**Expertise:**
- Author pages with verifiable credentials, industry affiliations, and byline consistency
- Sites that added structured author pages saw measurable ranking improvements within weeks of the March 2026 update
- Demonstrate domain knowledge through depth of coverage, not breadth

**Authoritativeness:**
- Build topical authority through comprehensive coverage of your niche
- Earn citations from other authoritative legal tech publications
- Maintain consistent presence in legal industry publications and forums

**Trustworthiness:**
- Transparent about who you are: About page, team pages, contact information
- Clear privacy policy, terms of service, security certifications
- HTTPS, clear data handling practices
- Customer testimonials with real names and firms (with permission)

**CaseDelta E-E-A-T Implementation Checklist:**
- [ ] Create detailed author/team pages with credentials and headshots
- [ ] Add author bylines to all blog posts with links to author pages
- [ ] Publish case studies with specific, verifiable metrics
- [ ] Add clear "About Us" page with company history, mission, team
- [ ] Display security certifications prominently (SOC 2, encryption, etc.)
- [ ] Include customer testimonials with real names and firm identifiers
- [ ] Link to legal industry publications that reference CaseDelta
- [ ] Maintain structured `Person` schema for all authors

Sources:
- [Digital Applied: E-E-A-T March 2026 Guide](https://www.digitalapplied.com/blog/e-e-a-t-march-2026-google-rewards-experience-content-guide)
- [Google: Creating Helpful, Reliable, People-First Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Heroic Rankings: Google E-E-A-T in 2026](https://heroicrankings.com/seo/content-creation/google-eeat-and-seo-in-2026/)
- [CloudSwitched: March 2026 Core Update](https://www.cloudswitched.com/news/google-march-2026-core-update-seo-strategy)

---

### 2.7 Keyword Research and Intent Matching

**Priority: CRITICAL**

58.5% of searches now result in zero clicks — making keyword intent more important than volume. Search engines in 2026 understand concepts, entities, and relationships, not just keyword matches.

**Search Intent Types (evolved for 2026):**
1. **Informational** — "how to collect client documents for litigation"
2. **Navigational** — "CaseDelta login"
3. **Commercial Investigation** — "best document collection software for law firms"
4. **Transactional** — "CaseDelta pricing" / "sign up CaseDelta"
5. **Comparison** — "CaseDelta vs Lawmatics"
6. **Job-to-be-done** — "automate client document requests" (highest intent)

**Long-tail Keywords for CaseDelta:**
91.8% of searches are long-tail (3+ words) and they convert at 2.5x the rate of short-tail terms.

**High-Intent Keyword Categories for CaseDelta:**

| Category | Example Keywords | Intent | Priority |
|----------|-----------------|--------|----------|
| Product | CaseDelta pricing, CaseDelta demo | Transactional | Critical |
| Comparison | CaseDelta vs Lawmatics, CaseDelta alternatives | Commercial | Critical |
| Solution | AI document collection law firm | Commercial | Critical |
| Problem | how to collect client documents faster | Informational | High |
| Use case | document collection personal injury | Commercial | High |
| Job-to-be-done | automate legal document requests | Commercial | High |
| Industry | legal tech document management 2026 | Informational | Medium |
| Education | what is legal document automation | Informational | Medium |

**B2B Funnel-Based Approach:**
- **Top of funnel (TOFU):** Educational keywords ("what is document automation")
- **Middle of funnel (MOFU):** Comparison keywords ("best legal document collection tools")
- **Bottom of funnel (BOFU):** Buyer-intent keywords ("CaseDelta pricing", "document collection software free trial")

Sources:
- [Whitehat SEO: Keyword Research 2026 B2B Guide](https://whitehat-seo.co.uk/blog/secrets-of-keyword-research)
- [IRIScale: Keyword Research B2B SaaS](https://iriscale.com/resources/learn/seo-strategy/keyword-research-b2b-saas-high-intent-keywords)
- [Rank Math: Search Intent 2026](https://rankmath.com/blog/search-intent/)
- [TripleDart: High-Intent Keywords](https://www.tripledart.com/saas-seo/high-intent-keywords)

---

## 3. AI and Search in 2026

### 3.1 Google AI Overviews (formerly SGE)

**Priority: CRITICAL**

AI Overviews appear in ~50%+ of all searches (86% of keywords by some estimates). They are AI-generated summaries at the very top of search results (position 0).

**Key Statistics:**
- Average AI Overview response contains 10 links from 4 unique domains
- 93.8% of linked websites come from OUTSIDE the first page of organic results — this is a massive opportunity for newer sites
- 95% of ecommerce queries have AI Overviews, compared to 54% for YMYL and 16% for finance
- Page load time below 500ms is recommended for AI Overview eligibility

**How to Appear in AI Overviews:**

Per Google's official documentation: "There are no additional requirements to appear in AI Overviews... a page must be indexed and eligible to be shown in Google Search with a snippet."

**Practical Optimization Strategies:**
1. **Place direct answers in the first 50–70 words** of each section
2. **Use simple, conversational language** — write like a helpful expert explaining something
3. **Create comparison content and pro/con lists** — reviews and comparisons are heavily favored
4. **Include relevant visuals** with descriptive alt text — AI Overviews frequently include images
5. **Demonstrate E-E-A-T** — case studies, real client results, documented processes
6. **Implement schema markup** — FAQPage, HowTo, and structured data help AI parse content
7. **Target long-tail and question-based queries** — these trigger AI Overviews most frequently
8. **Keep content fresh** — recent, timely topics increase sourcing likelihood
9. **Index user reviews and testimonials** — Google favors pages with authentic social proof

**Content Structure for AI Overview Citation:**
```
[Direct answer in 40-60 words]
[Supporting data point or statistic]
[Bullet list of key points]
[Deeper explanation with examples]
[FAQ section with question-answer pairs]
```

Sources:
- [Nightwatch: Google AI Overviews Guide 2026](https://nightwatch.io/blog/google-ai-overviews-guide/)
- [Google: AI Features and Your Website](https://developers.google.com/search/docs/appearance/ai-features)
- [EnFuse: How Google AI Overviews Are Changing SEO 2026](https://www.enfuse-solutions.com/how-googles-ai-overviews-are-changing-seo-in-2026/)
- [SEO HQ: AI Overviews Optimization 2026](https://seohq.github.io/ai-overviews-optimization-2026)

---

### 3.2 Generative Engine Optimization (GEO)

**Priority: CRITICAL**

GEO is the practice of optimizing content to appear as sources and citations in AI-generated responses from ChatGPT, Perplexity, Google AI Overviews, Gemini, and Claude.

**Market Context:**
- 31.3% of the US population will use generative AI search in 2026
- Gartner projects organic search traffic will decline 25% by 2026 as consumers shift to AI search
- 40% of purchase-stage research decisions now involve AI engines
- Only 12% of marketing teams have documented GEO strategies (first-mover advantage)
- AI-sourced traffic converts at 4.4x the rate of traditional organic search

**The 10 Core GEO Practices:**

1. **Definition-First Opening:** Start pages with `"[Entity] is a [category] that [differentiator]"` — AI engines extract this format preferentially
   - Example: "CaseDelta is an AI-powered document collection platform that eliminates follow-up emails for law firms"

2. **Quantified Statistics:** Include 2–3 data points per 300 words; content with 3+ statistics per 300 words gets 2.1x higher citation frequency

3. **Schema Markup:** Deploy FAQ, HowTo, and Speakable JSON-LD for machine-readable answer blocks

4. **Brand Knowledge Base:** Consolidate product facts, pricing, and differentiators in a centralized `/knowledge-base/` or `/about/` page

5. **Listicle Formatting:** Ranking/list pages earn 3–5x more AI citations than long-form tutorials

6. **Third-Party Citations:** Secure press coverage and expert bylines for multi-source corroboration

7. **Engine-Specific Optimization:**

| Engine | Citation Rate | Key Optimization |
|--------|---------------|------------------|
| Copilot | Highest (18%+) | Bing indexing, tables/lists, FAQ schema |
| Perplexity | 10–14% | High domain authority, backlinks, fresh data |
| Gemini | 10–14% | Top-10 organic rankings, E-E-A-T signals |
| ChatGPT | 10–14% | Information density, clear H2/H3 hierarchy |

8. **Freshness Signals:** Update pages quarterly with `dateModified` metadata and substantive new content

9. **Direct-Answer Blocks:** Create 40–60 word self-contained paragraphs directly answering specific queries

10. **Weekly Metrics Tracking:** Monitor mention rate, citation rate, and URL-level visibility across engines

**Implementation Timeline:**
- New content typically begins appearing in AI answers within 14–21 days of publication and indexing
- Month 1: Audit top 15–20 pages; add definition openings, schema, statistical density
- Month 2: Build brand knowledge base; implement dateModified signals
- Month 3: Launch listicle pages; secure 2–3 press mentions
- Ongoing: Monitor 15–25 target prompts weekly across engines

Sources:
- [GenOptima: GEO Best Practices 2026](https://www.gen-optima.com/geo/generative-engine-optimization-best-practices-2026/)
- [Frase.io: What is GEO](https://www.frase.io/blog/what-is-generative-engine-optimization-geo)
- [LLMrefs: GEO 2026 Guide](https://llmrefs.com/generative-engine-optimization)
- [EMARKETER: FAQ on GEO and AEO 2026](https://www.emarketer.com/content/faq-on-geo-aeo--where-ai-search-seo-overlap-2026)
- [Versalence: GEO Is the New SEO](https://blogs.versalence.ai/geo-generative-engine-optimization-new-seo-2026)
- [Enrich Labs: GEO Complete Guide 2026](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026)

---

### 3.3 Impact of AI on Search Behavior

**Priority: HIGH**

Search behavior has fundamentally changed. Users are no longer limited to short keyword phrases — they ask full questions, add qualifiers, describe context, and use search as a live assistant.

**Key Behavioral Shifts:**
- Voice search hit 27% of all queries in 2026; voice queries average 7–10 words
- Queries in Google AI Mode are 3x longer than traditional text searches
- 60% of searches end without a click to any website (zero-click searches)
- 94% of B2B buyers use LLMs during purchasing decisions
- Users combine text, voice, camera, and gestures into complex multimodal questions

**What This Means for CaseDelta:**
- Write content in conversational, natural language that mirrors how people ask questions
- Optimize for full-sentence queries: "What is the best way to collect legal documents from clients using AI?"
- Provide direct, concise answers that AI can extract and quote
- Ensure content satisfies the underlying intent, not just keyword matches
- Consider multimodal content: images, videos, interactive tools alongside text

Sources:
- [ALM Corp: AI Search Behavior 2026](https://almcorp.com/blog/ai-search-behavior-search-advertising-2026/)
- [SearchesEverywhere: From Keywords to Conversations](https://www.searcheseverywhere.com/blog/seo-2026-from-keywords-to-conversations)
- [Jeff Lenney: Search Intent 2026 New Intent Types](https://jefflenney.com/blog/search-intent-in-2026/)

---

## 4. Content Strategy for SEO

### 4.1 Blog / Content Hub Architecture

**Priority: CRITICAL**

B2B SaaS SEO averages 702% ROI with a break-even time of 7 months. However, generic informational content is no longer effective — AI can summarize it instantly. What works: original data, first-hand experience, and expert-driven content.

**Content Hub Structure for CaseDelta:**
```
/blog                          # Blog index
├── /blog/document-collection  # Category hub
│   ├── Pillar: "Complete Guide to Legal Document Collection"
│   ├── Cluster: "10 Documents Every PI Attorney Needs"
│   ├── Cluster: "How to Reduce Client Follow-Up by 80%"
│   └── Cluster: "Document Checklist for Family Law Cases"
├── /blog/legal-tech          # Category hub
│   ├── Pillar: "Legal Technology Guide for Law Firms"
│   ├── Cluster: "AI in Law: 2026 State of the Industry"
│   └── Cluster: "How to Evaluate Legal Tech Software"
├���─ /blog/compliance          # Category hub
│   ├── Pillar: "Data Security & Compliance for Law Firms"
│   └── Cluster: "SOC 2 Compliance for Legal Tech"
└── /blog/case-studies        # Social proof
    ├── "How [Firm] Collected 500 Documents in 3 Days"
    └── "From 20 Hours to 2: [Firm]'s Document Collection Story"
```

Sources:
- [Position Digital: B2B SaaS Content Marketing Strategy 2026](https://www.position.digital/blog/b2b-saas-content-marketing-strategy/)
- [Growth.cx: B2B SaaS SEO Agency Guide 2026](https://growth.cx/blog/b2b-saas-seo-agency-guide/)
- [Gravitate: B2B SaaS SEO Strategies 2026](https://www.gravitatedesign.com/blog/b2b-saas-seo-strategies/)

---

### 4.2 Pillar Page + Topic Cluster Model

**Priority: CRITICAL**

A study of 50 B2B SaaS websites showed pillar-cluster architectures led to 63% more keyword rankings within 90 days and an average domain authority increase of 8 points. Clustered content receives 3.2x more AI citations than standalone posts.

**Pillar Page Specifications:**
- Length: 3,000–5,000 words (comprehensive, authoritative)
- Targets high-volume, broad keywords
- Acts as the main entry point for top-of-funnel traffic
- Links to ALL cluster pages within the topic
- Updated quarterly to maintain freshness

**Cluster Page Specifications:**
- Length: 1,500–2,500 words (focused, specific)
- Targets long-tail, specific keywords
- MUST link back to pillar page using descriptive anchor text
- Links to 2–3 related cluster pages within the same topic
- Published on a regular cadence (see Section 4.4)

**CaseDelta Topic Clusters:**

**Cluster 1: Document Collection (Primary)**
- Pillar: "The Complete Guide to AI-Powered Document Collection for Law Firms"
- Clusters: checklists by practice area, client communication templates, automation workflows, compliance guides, common mistakes

**Cluster 2: Legal Tech Evaluation**
- Pillar: "How to Choose Legal Technology for Your Firm"
- Clusters: comparison guides, ROI calculators, implementation guides, security evaluation checklists

**Cluster 3: Client Communication**
- Pillar: "Client Communication Best Practices for Law Firms"
- Clusters: document request templates, follow-up strategies, client portal benefits, onboarding workflows

**Internal Linking Rules:**
- Every cluster page links back to pillar with anchor text containing the pillar's target keyword
- Cluster pages are 2–3 clicks from homepage
- Pillar pages link to all associated cluster pages
- Cluster pages link to 2–3 sibling cluster pages

Sources:
- [Digital Applied: SEO Content Clusters 2026](https://www.digitalapplied.com/blog/seo-content-clusters-2026-topic-authority-guide)
- [Niumatrix: How to Build Pillar Content 2026](https://niumatrix.com/pillar-cluster-content-guide/)
- [Siteimprove: Pillar and Cluster Content Strategy](https://www.siteimprove.com/blog/pillar-and-cluster-content-strategy/)

---

### 4.3 Content Types That Perform Best for B2B Legal Tech

**Priority: HIGH**

| Content Type | SEO Value | Conversion Value | Priority |
|-------------|-----------|-----------------|----------|
| Comparison pages (vs competitors) | Very High | Very High | Critical |
| Alternatives pages | Very High | Very High | Critical |
| Use case pages (by practice area) | High | Very High | Critical |
| Case studies | Medium | Very High | High |
| Original research/data reports | Very High | Medium | High |
| Document checklists by practice area | High | High | High |
| How-to guides | High | Medium | High |
| Glossary/resource pages | Medium | Low | Medium |
| FAQ pages | Medium | Medium | Medium |
| Industry trend reports | Medium | Low | Medium |

**Comparison Pages Strategy:**

Two types:
1. **"Vs" pages**: "CaseDelta vs [Competitor]" — direct feature comparison
2. **"Alternatives" pages**: "Best [Competitor] Alternatives for [Use Case]" — capture unhappy competitor users

URL structure: `/compare/casedelta-vs-[competitor]/`

Content layout:
- H1: Include primary search term (e.g., "CaseDelta vs Lawmatics")
- Feature comparison table with checkmarks
- 3–5 qualitative differentiator sections
- "When to choose [competitor]" section (builds trust)
- Customer testimonials from switchers
- FAQ accordion with pricing, implementation, and results questions
- High-contrast CTA section

Napkin math shows ~172% ROI for typical B2B SaaS comparison pages.

**Use Case Pages Strategy:**

Create dedicated pages for each practice area:
- `/use-cases/personal-injury`
- `/use-cases/family-law`
- `/use-cases/immigration`
- `/use-cases/corporate-litigation`
- `/use-cases/real-estate`

Each page: specific pain points, how CaseDelta solves them, relevant testimonials, document checklists, pricing note.

Sources:
- [Backstage SEO: B2B Comparison Pages Complete Guide](https://backstageseo.com/blog/b2b-comparison-pages/)
- [Pipe Rocket: How to Write SaaS Comparison Pages 2026](https://piperocket.digital/blogs/how-to-write-saas-comparison-pages-for-seo/)
- [Powered by Search: Best SaaS Comparison Pages](https://www.poweredbysearch.com/learn/best-saas-comparison-pages/)

---

### 4.4 Publishing Frequency and Content Freshness

**Priority: HIGH**

**Recommended Frequency:**
- Baseline: 1 high-quality post per week (4/month)
- Competitive niches: 2–3 posts per week (8–12/month)
- 55% of content marketers say frequent posting positively impacts search rankings

**Content Freshness Signals:**
- Freshness matters more for fast-changing topics
- Updates every 30–90 days stabilize AI search inclusion
- Google looks for evidence of sustained expertise — continuity outperforms bursts
- Add `dateModified` to structured data on every content update

**Quality Over Quantity:**
- A quality-first consistency schedule wins over aggressive volume
- High-frequency + low quality = actively harmful
- Each post should be 1,500–3,000+ words with visuals, case studies, and actionable advice

**Recommended CaseDelta Publishing Calendar:**
- Week 1: In-depth guide or pillar content update
- Week 2: Case study or customer story
- Week 3: Industry analysis or original data piece
- Week 4: Comparison page or use-case page
- Monthly: Update 2–3 existing posts with new data/examples

Sources:
- [Kexworks: Posting Frequency 2026](https://www.kexworks.com/website-content/website-posting-frequency-2026/)
- [Ahrefs: Fresh Content and Publish Dates](https://ahrefs.com/blog/fresh-content/)
- [Series X Marketing: Content Velocity 2026](https://www.seriesxmarketing.com/blog/content-velocity/)
- [The Rank Masters: B2B SaaS Content Benchmarks 2026](https://www.therankmasters.com/insights/benchmarks/b2b-saas-content-benchmarks)

---

### 4.5 Programmatic SEO Opportunities

**Priority: MEDIUM**

Programmatic SEO uses templates and data to create hundreds of targeted landing pages at scale. AI-sourced traffic converts at 4.4x the rate of traditional organic search.

**CaseDelta Programmatic Page Opportunities:**
- `/documents/[document-type]` — "How to Collect [Document Type] from Clients" (medical records, tax returns, employment records, etc.)
- `/practice-areas/[area]/[document-type]` — "Collecting [Document] for [Practice Area] Cases"
- `/integrations/[tool]` — "CaseDelta + [Tool] Integration"
- `/templates/[template-type]` — "Document Request Template for [Use Case]"

**Quality Warning:**
In 2026, Google's Authenticity Update punishes mass-generated thin content. Each page must have unique, valuable content beyond template fill-in. Add practice-area-specific context, real examples, and expert insights.

Sources:
- [Averi: Programmatic SEO for B2B SaaS 2026](https://www.averi.ai/blog/programmatic-seo-for-b2b-saas-startups-the-complete-2026-playbook)
- [SmartClick: Programmatic SEO for SaaS 2026](https://smartclick.agency/blog/programmatic-seo-for-saas/)

---

### 4.6 FAQ and Glossary Pages

**Priority: MEDIUM**

**FAQ Pages:**
- FAQ rich results restricted to government/health sites since August 2023
- However, FAQ schema still feeds Google's knowledge graph and increases AI citation chances
- Implement 3–10 high-quality Q&A pairs per page
- All FAQ content must be visible to users on the source page
- Align FAQ questions with People Also Ask queries for your target keywords

**Glossary/Resource Pages:**
- Create `/resources/glossary` with legal tech terminology
- Each term gets its own URL: `/resources/glossary/document-automation`
- Short, clear definitions (ideal for AI extraction)
- Internal links to related product features and blog posts
- Programmatic SEO opportunity: generate pages from a data source

Sources:
- [Google: FAQPage Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Search Engine Land: Rise and Fall of FAQ Schema](https://searchengineland.com/faq-schema-rise-fall-seo-today-463993)
- [HI WebApp: FAQ Schema in 2026](https://hi-webapp.com/why-faqs-matter-how-they-shape-seo-geo/)

---

## 5. Local and Industry-Specific SEO

### 5.1 B2B SaaS SEO Strategies

**Priority: HIGH**

**Top Ranking Factors for 2026 (First Page Sage data):**

| Factor | Weight |
|--------|--------|
| Content quality | 23% |
| Keyword in title tag | 14% |
| Backlinks | 13% |
| Niche expertise | 13% |
| Searcher engagement | 12% |
| **Total top 5** | **75%** |

These 5 factors account for 75% of the algorithm. Focus resources here first.

**SaaS-Specific Strategies:**
- Build product-led content (document your product's capabilities as solutions to problems)
- Create "Bottom of Funnel" content first (comparison pages, pricing, alternatives) — highest conversion
- Invest in original data and research that becomes the cited source
- Feature pages should be SEO-optimized landing pages, not just product docs
- Integration pages capture partner ecosystem traffic
- Free tools (calculators, templates) earn links and traffic simultaneously

Sources:
- [Gravitate: B2B SaaS SEO Strategies 2026](https://www.gravitatedesign.com/blog/b2b-saas-seo-strategies/)
- [Marketer Milk: SaaS SEO Guide 2026](https://www.marketermilk.com/blog/saas-seo)
- [SeoProfy: B2B SaaS SEO 2026](https://seoprofy.com/blog/b2b-saas-seo/)

---

### 5.2 Legal Industry SEO

**Priority: HIGH**

**The firms winning with SEO in 2026 focus on:**
- Trust signals strong enough to be cited by AI models
- Practice-area-specific content with deep expertise signals
- Technical performance (Core Web Vitals)
- E-E-A-T above all else

**Legal Industry Content That Works:**
- Anonymized case-pattern explainers
- Common mistakes clients make before calling
- Document collection timelines and checklists
- Evidence requirements by case type
- Fee/pricing transparency content
- "When to use [legal tech tool]" guides

**GEO for Legal:**
The evolution from SEO to GEO is especially important for legal — the goal is no longer just website visits but ensuring your trust signals are strong enough to be cited when AI answers legal tech questions.

**CaseDelta Opportunity:**
CaseDelta sits at the intersection of legal + tech — target both "legal professionals searching for tech solutions" AND "tech-savvy buyers evaluating legal workflow tools."

Sources:
- [W3Era: Law Firm SEO Complete Guide 2026](https://www.w3era.com/blog/seo/law-firm-seo-complete-guide/)
- [Above the Law: AI SEO for Law Firms 2026](https://abovethelaw.com/2025/10/ai-seo-for-law-firms-website-changes-for-2026/)
- [Martindale-Avvo: State of Legal Consumer 2026](https://www.martindale-avvo.com/blog/the-state-of-the-legal-consumer-2026-from-seo-to-geo-how-ai-is-reshaping-legal-client-acquisition/)

---

### 5.3 Customer Story / Case Study SEO

**Priority: HIGH**

Case studies are among the highest-converting content types for B2B SaaS.

**SEO-Optimized Case Study Template:**
- Title: "How [Firm Name] [Achieved Specific Result] with CaseDelta"
- URL: `/case-studies/[firm-name]-[result]`
- Include specific metrics (time saved, documents collected, error rate reduction)
- Schema markup: `Article` with `author` and `datePublished`
- Include testimonial quotes (can trigger review rich results with proper schema)
- Link to relevant feature pages and use-case pages

**Case Study Content Structure:**
1. Challenge (what problem the firm faced)
2. Solution (how CaseDelta was implemented)
3. Results (specific, quantifiable outcomes)
4. Quote (direct testimonial from the client)
5. CTA (request a demo, start free trial)

---

## 6. Link Building and Off-Page SEO

### 6.1 Earning Backlinks (2026)

**Priority: HIGH**

Backlinks remain the #3 ranking factor (13% weight). Quality matters infinitely more than quantity — 100 relevant authoritative links outperform 100,000 low-quality links.

**Strategies Ranked by Effectiveness:**

1. **Digital PR** — Earn editorial links from high-authority news/media sites. The single most powerful B2B SaaS link building strategy.
   - Publish original research reports (e.g., "State of Legal Document Collection 2026")
   - Create data-driven stories journalists want to cover
   - Use PR wire services for broader distribution

2. **Original Research & Data** — Become the cited source
   - Survey law firms about document collection pain points
   - Publish annual industry benchmarks
   - Share internal data (anonymized) about document collection volumes, error rates

3. **Feature/Integration Page Links** — Higher ROI than blog post links
   - Partner with integration providers for co-marketing
   - Create integration-specific landing pages that partners link to

4. **Unlinked Brand Mentions** — Convert existing mentions to links
   - Monitor brand mentions with Google Alerts, Ahrefs, or Brand24
   - Reach out to site owners requesting a backlink
   - Minimal effort, high impact (they already know and reference your brand)

5. **Guest Posting** — Still valuable but quality-dependent
   - Contribute genuine expertise to relevant legal tech publications
   - Avoid mass-producing low-quality guest posts (penalized in 2026)
   - Target: Legal Technology Today, Law.com, ABA publications, Legal Tech Monitor

6. **Resource Page Links** — Create linkable assets
   - Document collection templates and checklists
   - Legal tech buyer's guides
   - Interactive tools (ROI calculators, document requirement checkers)

**Timeline:** Most SaaS companies see ranking movement in 3–6 months. High-competition keywords: 9–12 months. Long-tail: faster response.

Sources:
- [Jeena Infotech: B2B SaaS Link Building 2026](https://jeenaminfotech.com/blog/b2b-saas-link-building-made-simple/)
- [ALM Corp: Definitive Guide to Link Building 2026](https://almcorp.com/blog/definitive-guide-link-building-2026/)
- [Skale: SaaS Link Building Strategies 2026](https://skale.so/saas-seo/link-building/)

---

### 6.2 Brand Signals and Social Signals

**Priority: MEDIUM**

Social signals (likes, shares, comments) are NOT direct ranking factors but heavily influence content reach, backlink acquisition, and brand authority.

**Key 2026 Insight:**
AI tools look at co-citations and entity relationships — if your brand is frequently mentioned in the same paragraph as industry leaders, AI learns you are part of that "authority cluster." Unlinked mentions in high-quality articles help your brand be cited by AI-driven search engines.

**Strategies:**
- Maintain active presence on LinkedIn (primary for B2B legal tech)
- Share original content that gets reshared and discussed
- Engage in legal tech communities and forums
- Monitor and claim unlinked brand mentions
- Build relationships with legal tech influencers and thought leaders

Sources:
- [SiteCentre: Off-Page SEO Factors 2026](https://www.sitecentre.com.au/blog/off-page-seo-factors)
- [Diamond Group: Google's Social Indexing Shift 2026](https://www.diamond-group.co/blog/googles-social-indexing-shift-what-it-means-for-brands-in-2026)

---

## 7. Measurement and Analytics

### 7.1 SEO Metrics That Matter in 2026

**Priority: HIGH**

The search landscape has fundamentally changed. Traditional metrics like raw organic traffic, average keyword position, and domain authority are now inadequate.

**Metrics to RETIRE:**

| Old Metric | Why It Fails | Replace With |
|-----------|-------------|-------------|
| Organic traffic (standalone) | No context; low-quality visitors meaningless | Revenue/pipeline from organic |
| Total impressions (unsegmented) | Informational vs commercial intent buried | Conversion-weighted visibility |
| Average keyword position | Distorted by SERP personalization | Topic cluster performance |
| Domain Authority/Rating | Proprietary scores don't correlate with rankings | SERP real estate ownership |
| Total backlink volume | Quality matters more than quantity | Referring domain authority distribution |
| Bounce rate | Users finding answers = success, not failure | GA4 engagement rate |
| Isolated keyword tracking | Search engines understand topics, not keywords | Topic-level visibility |

**Metrics to TRACK:**

| Metric | Tool | Frequency |
|--------|------|-----------|
| Revenue from organic | GA4 + CRM | Monthly |
| Qualified leads from organic | GA4 + CRM | Weekly |
| AI platform visibility (citations) | Manual audits + monitoring tools | Weekly |
| Conversion-weighted visibility | GSC + GA4 | Weekly |
| Core Web Vitals pass rates | GSC, PageSpeed Insights | Monthly |
| Topic cluster performance | Ahrefs/Semrush | Monthly |
| SERP feature ownership | Ahrefs/Semrush | Monthly |
| Engagement rate | GA4 | Weekly |
| Click-through rate (by intent) | GSC | Weekly |
| Indexing coverage | GSC | Weekly |

Sources:
- [Search Engine Land: Retire These 9 SEO Metrics 2026](https://searchengineland.com/retire-these-9-seo-metrics-before-they-derail-your-2026-strategy-469461)
- [ClickRank: SEO Performance Metrics 2026](https://www.clickrank.ai/seo-performance-metrics/)
- [Backlinko: SEO Metrics to Track 2026](https://backlinko.com/hub/seo/metrics)

---

### 7.2 Google Search Console Best Practices

**Priority: CRITICAL**

**Setup:**
- Use Domain property for full coverage across subdomains and protocols
- Link GSC with Google Analytics 4 for combined keyword + behavior data
- Verify all URL variants (www, non-www, http, https)

**2026 Updates:**
- AI-assisted configuration (February 2026): describe analysis in natural language
- AI Overview and AI Mode data now in standard Performance report
- Impressions counted when AI result is scrolled into view or expanded
- Clicks counted when users click through from AI-generated summary

**Weekly Monitoring Routine:**
1. Check Performance report for URLs with biggest click drops (week-over-week)
2. Review indexing coverage for new errors
3. Check Core Web Vitals report for regressions
4. Monitor structured data enhancements for errors/warnings
5. Review AI Overview impressions and clicks (new for 2026)
6. Check for manual actions or security issues

**Custom Dimensions to Track in GA4:**
- Keyword groupings (branded vs non-branded vs comparison vs educational)
- Conversion goals for organic revenue
- Audience segments for search traffic
- Content performance by topic cluster

Sources:
- [SEO Hacker: Google Search Console Guide 2026](https://seo-hacker.com/google-search-console-guide-2026/)
- [ALM Corp: Google Search Console Complete Guide](https://almcorp.com/blog/google-search-console-complete-guide/)
- [Google: Using Search Console with GA](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console)

---

## 8. Next.js Specific SEO Implementation

### 8.1 Metadata API

**Priority: CRITICAL**

Next.js App Router provides a first-class metadata system. Define base metadata in root layout, override in nested layouts, and customize at page level.

**Root Layout Metadata (app/layout.tsx):**
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://casedelta.com'),
  title: {
    default: 'CaseDelta — AI Document Collection for Law Firms',
    template: '%s | CaseDelta',
  },
  description: 'Get documents from clients without the follow-up headache. AI-powered document collection and verification for law firms.',
  keywords: ['legal document collection', 'AI document verification', 'law firm automation', 'client document portal'],
  authors: [{ name: 'CaseDelta' }],
  creator: 'CaseDelta',
  publisher: 'CaseDelta',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://casedelta.com',
    siteName: 'CaseDelta',
    title: 'CaseDelta — AI Document Collection for Law Firms',
    description: 'Get documents from clients without the follow-up headache. AI-powered document collection and verification for law firms.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CaseDelta — AI Document Collection for Law Firms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CaseDelta — AI Document Collection for Law Firms',
    description: 'Get documents from clients without the follow-up headache.',
    images: ['/og-image.png'],
    creator: '@casedelta',
  },
  alternates: {
    canonical: 'https://casedelta.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}
```

**Page-Level Dynamic Metadata (e.g., blog posts):**
```typescript
import type { Metadata } from 'next'

interface BlogPostParams {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,  // Uses template: "Post Title | CaseDelta"
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [{ url: post.ogImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://casedelta.com/blog/${params.slug}`,
    },
  }
}
```

**Key Rules:**
- `metadata` object and `generateMetadata` are only supported in Server Components
- Fetch requests inside `generateMetadata` are automatically memoized
- Use `metadataBase` in root layout — all relative URLs resolve against it
- Use the `title.template` pattern for consistent branding across pages

Sources:
- [Next.js: generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js: Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Kodaps: Next.js App Router SEO Features](https://www.kodaps.dev/en/blog/nextjs-app-seo-features)
- [GlobalInkz: Next.js SEO Best Practices 2026](https://globalinkz.com/blog/next-js-seo-best-practices-complete-2026-guide.html)

---

### 8.2 Sitemap Generation (app/sitemap.ts)

**Priority: CRITICAL**

```typescript
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://casedelta.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
  
  // Dynamic pages (blog posts, case studies, etc.)
  const posts = await getAllPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...blogPages]
}
```

**For Large Sitemaps (50,000+ URLs), use `generateSitemaps`:**
```typescript
export async function generateSitemaps() {
  const totalPosts = await getPostCount()
  const sitemapsNeeded = Math.ceil(totalPosts / 50000)
  return Array.from({ length: sitemapsNeeded }, (_, i) => ({ id: i }))
}
```

Sources:
- [Next.js: Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js: generateSitemaps](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps)

---

### 8.3 Robots.txt Generation (app/robots.ts)

**Priority: CRITICAL**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/',
          '/light/',     // A/B test variants (internal only)
          '/dark/',      // A/B test variants (internal only)
        ],
      },
    ],
    sitemap: 'https://casedelta.com/sitemap.xml',
  }
}
```

Sources:
- [Next.js: robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)

---

### 8.4 JSON-LD Structured Data in Next.js

**Priority: CRITICAL**

**Recommended approach using `schema-dts` for type safety:**

```bash
npm install schema-dts
```

**Organization Schema Component:**
```typescript
import { Organization, WithContext } from 'schema-dts'

export function OrganizationSchema() {
  const schema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CaseDelta',
    url: 'https://casedelta.com',
    logo: 'https://casedelta.com/logo.png',
    description: 'AI-powered document collection and verification for law firms',
    sameAs: [
      'https://twitter.com/casedelta',
      'https://linkedin.com/company/casedelta',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**WebApplication Schema (homepage):**
```typescript
import { WebApplication, WithContext } from 'schema-dts'

export function WebAppSchema() {
  const schema: WithContext<WebApplication> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CaseDelta',
    url: 'https://casedelta.com',
    applicationCategory: 'BusinessApplication',
    description: 'AI-powered document collection platform for law firms',
    browserRequirements: 'Requires JavaScript and HTML5 support',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      // Add pricing tiers
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**BlogPosting Schema (blog posts):**
```typescript
import { BlogPosting, WithContext } from 'schema-dts'

export function BlogPostSchema({ post }: { post: BlogPost }) {
  const schema: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `https://casedelta.com/team/${post.author.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CaseDelta',
      logo: {
        '@type': 'ImageObject',
        url: 'https://casedelta.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://casedelta.com/blog/${post.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**BreadcrumbList Schema:**
```typescript
import { BreadcrumbList, WithContext } from 'schema-dts'

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

Sources:
- [Kodaps: Next.js App Router SEO Features](https://www.kodaps.dev/en/blog/nextjs-app-seo-features)
- [Strapi: Complete Next.js SEO Guide](https://strapi.io/blog/nextjs-seo)
- [Adeel Imran: Complete Next.js SEO Guide](https://www.adeelhere.com/blog/2025-12-09-complete-nextjs-seo-guide-from-zero-to-hero)

---

### 8.5 Dynamic Open Graph Image Generation

**Priority: HIGH**

Open Graph image dimensions: **1200 x 630 pixels** (aspect ratio 1.91:1) — universal standard across all platforms.

**Dynamic OG Image (app/opengraph-image.tsx):**
```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'CaseDelta — AI Document Collection for Law Firms'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 700 }}>CaseDelta</div>
        <div style={{ fontSize: 30, marginTop: 20, opacity: 0.8 }}>
          AI Document Collection for Law Firms
        </div>
      </div>
    ),
    { ...size }
  )
}
```

**Route-Specific OG Images (e.g., app/blog/[slug]/opengraph-image.tsx):**
Generate unique OG images per blog post using post title, author, and date.

**Requirements:**
- Always use HTTPS URLs (HTTP blocked on all platforms)
- Include `og:image:width` (1200), `og:image:height` (630), and `og:image:alt`
- File size under 5MB for fast loading
- Use next/og `ImageResponse` (preferred over @vercel/og)
- Keep focal content centered (platforms crop edges)

Sources:
- [Next.js: opengraph-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Next.js: ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [Cruip: Generate Dynamic OG Images](https://cruip.com/generate-dynamic-open-graph-and-twitter-images-in-next-js/)
- [OG Image Generator: OG Image Size Guide 2026](https://myogimage.com/blog/og-image-size-meta-tags-complete-guide)

---

### 8.6 Rendering Strategy for SEO

**Priority: HIGH**

**Decision Framework:**

| Rendering | Use When | SEO Benefit | CaseDelta Usage |
|-----------|----------|-------------|-----------------|
| **SSG** (Static) | Content changes infrequently | Sub-100ms latency, perfect CWV | Homepage, features, pricing, legal pages |
| **ISR** | Content changes periodically | Fast + fresh; revalidates in background | Blog posts, case studies |
| **SSR** | Content changes per request | Always fresh data | Dashboard (not SEO-relevant), dynamic comparison pages |
| **CSR** | Interactive UI only | None (bad for SEO) | Analytics dashboards, internal tools |

**Rules:**
- If content matters for SEO, render it on the server (SSG, ISR, or SSR)
- Use client components ONLY for interactivity, NOT for primary content
- Server Components reduce JavaScript sent to client (better INP)
- Lean on SSG and ISR as much as possible; only use SSR when you need per-request freshness

**ISR Configuration Example:**
```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  return <article>{/* ... */}</article>
}
```

Sources:
- [Next.js: Rendering Strategies](https://nextjs.org/learn/seo/rendering-strategies)
- [Vercel: How to Choose Best Rendering Strategy](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app)
- [BitsKingdom: When to Use SSR, SSG, or ISR](https://bitskingdom.com/blog/nextjs-when-to-use-ssr-vs-ssg-vs-isr/)

---

## 9. Emerging SEO Trends

### 9.1 Zero-Click Search and SERP Features

**Priority: HIGH**

~58.5% of US Google searches end without a click. Mobile users are 66% more likely to experience zero-click searches.

**Featured Snippet Optimization:**
- Start each section with a direct answer (40–50 words)
- Use structured formats: tables, numbered lists, bullet lists
- Match the format Google already shows for your target query
- Target long-tail question queries

**People Also Ask (PAA) Optimization:**
- PAA boxes reveal the exact questions Google associates with your topics
- Each PAA question can become a section heading with a structured answer
- Use PAA questions as content frameworks for blog posts
- Answer in 2–3 concise sentences, then expand

**Zero-Click Strategy:**
- Accept that not all impressions will generate clicks
- Optimize for brand visibility even in zero-click scenarios
- Structured data is essential infrastructure for SERP feature eligibility
- Focus on commercial/transactional queries where clicks still happen

Sources:
- [GoodFirms: SEO Statistics 2026](https://www.goodfirms.co/resources/seo-statistics-ai-search-rankings-zero-click-trends)
- [Ekamoira: Zero-Click Search 2026](https://www.ekamoira.com/blog/zero-click-search-2026-seo)
- [Search Engine Land: Featured Snippets Guide](https://searchengineland.com/guide/featured-snippets)

---

### 9.2 Voice Search Optimization

**Priority: MEDIUM**

Voice search accounts for 27% of all queries in 2026; 30% of all web browsing sessions use voice.

**Optimization Strategies:**
- Write in natural, conversational language
- Target full-sentence queries (7–10 words average)
- Provide concise, direct answers to common questions
- Implement `Speakable` schema markup for voice-ready content
- Optimize for "near me" queries if applicable
- Focus on question words: who, what, where, when, how, why

Sources:
- [ALM Corp: Voice Search SEO 2026](https://almcorp.com/blog/voice-search-seo-2026-complete-guide/)
- [Digital Applied: Voice Search Optimization 2026](https://www.digitalapplied.com/blog/voice-search-optimization-2026-conversational-queries-ai)

---

### 9.3 Multimodal Search (Google Lens, Search Live)

**Priority: MEDIUM**

Google Search Live launched globally on March 26, 2026 — multimodal voice and camera search across 200+ countries. Visual search usage jumped 73%.

**Optimization Strategies:**
- High-quality product images with comprehensive schema markup
- Descriptive alt text on all images
- Product schema with accurate pricing and availability
- Ensure images are accessible and well-lit
- Implement ImageObject schema for key product screenshots
- Optimize for visual discovery: infographics, charts, diagrams

Sources:
- [Digital Applied: Google Search Live 2026](https://www.digitalapplied.com/blog/google-search-live-200-countries-voice-video-ai)
- [Think4AI: Multimodal Search Optimization 2026](https://think4ai.com/multimodal-search-optimization/)

---

### 9.4 Google March 2026 Core Update Impact

**Priority: CRITICAL**

Began rolling out March 27, 2026. Over 55% of monitored websites experienced ranking shifts. Some sites reported organic traffic drops of 20–35%.

**What Changed:**
- Greater emphasis on unique insights and "information gain"
- Stronger focus on E-E-A-T (especially for YMYL topics — legal is YMYL)
- Unreviewed AI-generated content increasingly filtered out
- Core Web Vitals play a more significant role
- Topical authority prioritized over content volume

**Implications for CaseDelta:**
- Legal tech falls under YMYL — E-E-A-T signals are paramount
- Do NOT publish unreviewed AI-generated content
- Every piece of content should demonstrate genuine expertise and experience
- Invest in topical depth, not content volume
- Maintain and update existing content, not just publish new

Sources:
- [Search Engine Land: Google March 2026 Core Update](https://searchengineland.com/google-march-2026-core-update-rolling-out-now-472759)
- [ALM Corp: March 2026 Core Update Guide](https://almcorp.com/blog/google-march-2026-core-update/)
- [Coalition Technologies: March 2026 Algorithm Update](https://coalitiontechnologies.com/blog/the-march-2026-google-core-algorithm-update-what-you-need-to-know)

---

## 10. Implementation Roadmap

### Phase 1: Technical Foundation (Weeks 1–2) — CRITICAL

- [ ] Create `app/sitemap.ts` with all pages
- [ ] Create `app/robots.ts` with proper allow/disallow rules
- [ ] Update `app/layout.tsx` with comprehensive metadata (see Section 8.1)
- [ ] Add `metadataBase` to root layout
- [ ] Add canonical URLs to all pages via `alternates.canonical`
- [ ] Implement Organization JSON-LD schema on homepage
- [ ] Implement WebApplication JSON-LD schema
- [ ] Implement BreadcrumbList JSON-LD schema on all pages
- [ ] Add `priority` prop to hero images (LCP optimization)
- [ ] Ensure all images use Next.js `Image` component
- [ ] Set explicit `width`/`height` on all images and videos
- [ ] Verify `font-display: swap` on all custom fonts
- [ ] Test and pass Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] Set up Google Search Console (Domain property)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify HTTPS everywhere, no mixed content

### Phase 2: On-Page SEO (Weeks 3–4) — CRITICAL

- [ ] Audit and optimize all title tags (50–60 characters, keyword front-loaded)
- [ ] Write unique meta descriptions for every page (140–160 characters)
- [ ] Audit heading hierarchy on all pages (single H1, logical H2/H3 structure)
- [ ] Optimize all image alt text
- [ ] Review and clean up URL structure
- [ ] Implement internal linking strategy (2–5 contextual links per 1,000 words)
- [ ] Add FAQ schema to relevant pages
- [ ] Create/improve About page, team pages, author pages (E-E-A-T)

### Phase 3: Content Infrastructure (Weeks 5–8) — HIGH

- [ ] Create blog architecture with topic clusters
- [ ] Build first pillar page: "Complete Guide to AI-Powered Document Collection"
- [ ] Create 5–10 comparison pages (vs top competitors)
- [ ] Create 5+ use-case pages (by practice area)
- [ ] Add `BlogPosting` JSON-LD schema to blog posts
- [ ] Create dynamic Open Graph image generation (opengraph-image.tsx)
- [ ] Implement ISR for blog posts (revalidate: 3600)

### Phase 4: GEO Optimization (Weeks 9–12) — CRITICAL

- [ ] Audit top 15–20 pages for GEO readiness
- [ ] Add definition-first openings to key pages
- [ ] Increase statistical density (2–3 data points per 300 words)
- [ ] Create direct-answer blocks (40–60 words) for target queries
- [ ] Build brand knowledge base page
- [ ] Implement `dateModified` in structured data
- [ ] Set up monitoring for 15–25 target prompts across AI engines
- [ ] Optimize for Copilot (tables/lists), Perplexity (fresh data), ChatGPT (information density)

### Phase 5: Content Velocity & Link Building (Ongoing) — HIGH

- [ ] Publish 1 high-quality post per week (minimum)
- [ ] Update 2–3 existing posts monthly with fresh data
- [ ] Launch original research report ("State of Legal Document Collection 2026")
- [ ] Begin digital PR outreach to legal tech publications
- [ ] Monitor and convert unlinked brand mentions
- [ ] Create linkable assets (templates, checklists, calculators)
- [ ] Build comparison pages for each major competitor
- [ ] Expand use-case pages to cover additional practice areas

### Phase 6: Analytics & Measurement (Ongoing) — HIGH

- [ ] Set up GA4 with proper conversion tracking for organic
- [ ] Link GA4 with Google Search Console
- [ ] Track revenue/pipeline attribution from organic
- [ ] Monitor AI platform visibility weekly
- [ ] Quarterly Core Web Vitals audit
- [ ] Monthly content performance review by topic cluster
- [ ] Weekly GSC performance review (AI Overview metrics)

---

## Current State Assessment: CaseDelta Site

Based on reviewing the existing codebase:

**Gaps Identified:**
1. **No `app/sitemap.ts`** — CRITICAL gap, create immediately
2. **No `app/robots.ts`** — CRITICAL gap, create immediately
3. **No `metadataBase`** in root layout — needed for relative URL resolution
4. **No canonical URLs** set via `alternates.canonical`
5. **No JSON-LD structured data** anywhere on the site
6. **No `robots` meta** configuration in metadata
7. **No dynamic OG image generation** — using static metadata only
8. **Missing `keywords`** in metadata (minor, but helps)
9. **No `verification`** property for Google Search Console
10. **Fonts loaded via Google Fonts link tag** — consider using `next/font` for better performance (eliminates render-blocking request, automatic `font-display: swap`, subset optimization)
11. **No breadcrumb navigation** or BreadcrumbList schema
12. **A/B test variant paths (/light/, /dark/)** need to be disallowed in robots.txt

**What's Already Good:**
- Open Graph and Twitter Card metadata present in root layout
- Proper `lang="en"` attribute on `<html>` element
- PostHog lazy-loads after page render (zero CWV impact)
- Tailwind CSS with built-in purging (minimal CSS)
- Next.js 15 App Router (modern, SEO-friendly architecture)

---

## Summary: Priority Matrix

| Priority | Area | Actions |
|----------|------|---------|
| **CRITICAL** | Technical | sitemap.ts, robots.ts, metadataBase, canonical URLs |
| **CRITICAL** | Structured Data | Organization, WebApplication, BreadcrumbList JSON-LD |
| **CRITICAL** | Metadata | Complete metadata with robots, verification, keywords |
| **CRITICAL** | Performance | Core Web Vitals optimization, image priority props |
| **CRITICAL** | E-E-A-T | Author pages, case studies, first-hand experience content |
| **CRITICAL** | GEO | Definition-first content, statistical density, AI engine optimization |
| **HIGH** | On-Page | Title tags, meta descriptions, heading hierarchy, alt text |
| **HIGH** | Content | Blog with topic clusters, comparison pages, use-case pages |
| **HIGH** | Internal Linking | Topic cluster links, pillar-cluster architecture |
| **HIGH** | Analytics | GSC + GA4 setup, AI visibility tracking |
| **HIGH** | Link Building | Digital PR, original research, unlinked mention conversion |
| **MEDIUM** | Programmatic SEO | Document type pages, integration pages |
| **MEDIUM** | FAQ/Glossary | FAQ schema, glossary pages |
| **MEDIUM** | Voice/Visual | Speakable schema, image schema, multimodal optimization |
| **LOW** | Social Signals | LinkedIn presence, community engagement |

---

*This document should be reviewed and updated quarterly as search algorithms, AI platforms, and industry best practices evolve.*
