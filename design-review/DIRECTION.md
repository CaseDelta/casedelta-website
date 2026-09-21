# CaseDelta: room for the work that needs you

Local preview: http://localhost:3101/concept
Source branch: design/cinematic-concept
Base: 3dd4d2b

The new design uses open photographic compositions, large Geist headings, readable supporting copy, and flat editorial sections. The first screen names Delta and shows the capacity benefit. The product sequence immediately follows the problem. Photography then separates evidence, connected systems, and team oversight. Pricing is an equal-weight table imported from lib/pricing.ts.

## Product media

The homepage contains an interactive graphic, not a recording of the production product. The visible caption states “Illustrative workflow · Fictional records.” All typography, records, citations and controls are deterministic HTML. The illustration explains the real product category of cited chronologies without claiming that this fictional task was executed.

Narrative: one request becomes a chronology the team can check.

1. Request, 0–6.5 seconds. Show the instruction to build a chronology from fictional Morgan medical records, with a source per entry. A single request block and attached file establish the task.
2. Sources, 6.5–13 seconds. Three records appear in an orderly stack: emergency evaluation, orthopedic consultation and physical therapy notes. Preserve readable document names instead of an accelerated scrolling screen.
3. Review, 13–19.5 seconds. A three-entry chronology makes the result concrete. Clicking a source exposes its explicitly fictional excerpt. The final state remains on screen.

The sequence begins only when Play is clicked. Pause and direct chapter selection remain available. No audio is used. Reduced motion removes the visual transitions. The complete chapter copy also serves as its text equivalent. `public/concept/media/chronology-poster.png` is an exported final frame. The React component is the reproducible graphic source.

For a future actual product film, capture this task in a fictional test matter and replace the illustration only after confirming the complete workflow. No customer records, private screenshots, generated UI labels, paid video jobs or unsupported video capability claims were used here. The delivered media for this concept is the interactive graphic and poster; it is not a finished product video.

## Reference observations

https://aevra-r1.vercel.app/ was inspected in Chromium on September 11, 2026. Its first screen is photographic with very large, left-aligned display type. A film follows with short explanatory copy; later compositions vary image scale, open space, technical lists and gallery detail. That variation informed the page rhythm. The CaseDelta concept does not reproduce the car brand's palette, navigation or configurator. Film editing and sound were not independently analyzed shot by shot.

https://casedelta.com/ and the repository supplied product claims and exact quotations. New copy follows the current handoff where the live page conflicts with it. The old Kirschbaum & Nowotny quote and logo wall are not included.

## Photography

The local contact sheet is http://localhost:3101/concept/gallery/index.html. Five user-retained originals are indexed alongside one new built-in-imagegen coastal photograph. Only mountain, cloud-pastel, cloud-swirl and coastal-blue-hour are used on this page. The rejected horizon-blue, water-dark and forest-dark assets are not selected or indexed.

The new image is saved at `public/concept/media/coastal-blue-hour.png`. Full generation prompt is in `public/concept/media/generation-prompt.txt`; source details, dimensions and file sizes are in the adjacent manifest. The five existing images have no newly established photographer/license provenance. Expansion to a 12–16-image library remains optional; this concept deliberately uses a smaller selection.

## Preservation and boundaries

The original casedelta-website-redesign worktree was read only. Its server was not listening on port 3100 at the start of this session. No files in it were changed, and no server was stopped. No merge, push, deployment, production credentials, analytics or consent changes were made.

The fresh worktree has local-only Turbopack configuration for its shared dependency symlink. All new routes are noindex. Legal content and dates match the base source; only its layout, imports and internal links change. Bookings link directly to the public Google appointment URL.

## Verification

`npm run lint` passes. `scripts/concept/verify.mjs` passes 43 browser checks covering 320–1440px layouts, minimum meaningful type size, interactive chapters and citations, menus, FAQs, intended links, noindex, complete legal text and no JavaScript errors on the concept routes. The inherited app/template.tsx reduced-motion mismatch is bypassed for concept routes only. Existing legacy legal routes still exhibit their pre-existing transition mismatch during comparison.

The shared wheel utility in this worktree now releases momentum before anchor, pointer and keyboard actions, and preserves independently scrollable regions. This change does not touch the preserved sibling worktree. Mobile hero height follows its content so the smallest phone does not overlap the bottom navigation.

An optimized production build was not run: available disk space was below 500 MB. No deployment is requested. These are local browser and TypeScript checks, not a production-build or full accessibility certification.
