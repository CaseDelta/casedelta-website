# VSL Build — Handoff (2026-05-02, structural pass complete)

Picking this up next session. Source-of-truth script: `VSL_SCRIPT.md`.

## TL;DR

**State**: every scene is still on white-mode (`ATMOSPHERICS = false` everywhere). The structural pass is largely complete — every scene now has its UI mockups, animations, timing, and copy mostly locked. The atmospheric landscape work from prior sessions remains preserved under the per-scene flag.

**Two AppFrame chrome variants** now exist:
- `chrome="minimal"` (default) — 64px icon-only sidebar, empty 44px topbar. Used by **Solution** to keep eyes on the integration cards.
- `chrome="full"` — 268px sidebar with workspace switcher + ASSOCIATE/WORKSPACES/SETTINGS section labels + labeled nav items, 54px topbar with centered search + 3 action icons. Mirrors the actual CaseDelta UI. Used by **Demo**.

**Big visual additions this session**:
- Dream now has a **rising sun arc** (semicircle path + warm gold sun) that visualizes "before the day started" on white-mode (independent of ATMOSPHERICS).
- Dream's **scales-of-justice convergence + emblem** sequence after BeatIcons visualizes "So you can focus on winning more cases" — 4 admin icons converge inward, scales emblem fades in at center.
- Solution has a full **cursor-driven Connect interaction**: cards cascade in, non-target cards blur, cursor visits Clio/Outlook/Word, clicks each through `Available → Connecting… → Connected` states, then chat bar zooms in centered with the query.
- Demo has been **rewritten as a Delta chat conversation** with structured response (chronology table, gaps flagged, email drafted, time logged) progressively revealing in sync with the VO.
- BrandLogoReveal now does a **two-phase reveal** (icon enters at scene center → text emerges from the icon position) with a **shimmer sweep** during the icon-hold phase.
- Outro: **`casedelta.com` URL removed** — wordmark stands alone.

**Next session focus**: run the full sequence end-to-end on `/video/play`, tune any pacing/positioning rough edges scene-by-scene, then restore atmospherics for capture.

---

## What changed this session vs the prior handoff

1. **Dream — added two new visual beats**:
   - **Convergence + ScalesEmblem (9.4s–11.7s)**: the 4 admin glyphs (Email/Drafts/Discovery/Billing) reappear at NW/NE/SW/SE around center, drift inward shrinking and fading, and a scales-of-justice SVG emblem fades in at center. Visual sentence under "So you can focus on winning more cases."
   - **RisingSunArc (4.0s–8.5s)**: faint dashed semicircle traces the sun's path; a warm gold sun rises from the left horizon to peak at 5.8s (matches "before the day started"), holds, fades. Renders independent of ATMOSPHERICS so it's visible on white-mode.
   - Resolution text: `"were already handled."` → `"were already handled for you."`

2. **Solution — rewritten as a cursor-driven Connect interaction**:
   - Integration list became a **3×3 card grid** (was a tile grid earlier, then a scrolling list, now stable as a viewport-fitted grid). Each card is **logo + name + Connect button** only — descriptions and lead-in subtitle dropped.
   - **Big "Integrations" header** (38px bold, tight tracking) anchors the page.
   - Cards cascade in row-by-row; non-target cards then blur out; cursor enters from off-screen left and visits **Clio, Outlook, Word** Connect buttons in order. Each click flashes a press-pulse, flips the button to **"Connecting…"** (spinner pill, 0.30s) then **"Connected"** (green pill).
   - Cursor stays at the Word button after the final click (no off-screen exit).
   - **~1.1s celebration pause** showing all 3 Connected before the chat bar takes over.
   - **Chat bar zooms in centered**, AppFrame fades + blurs behind it. Sample query types: **"Pull Clio production, build a chronology PDF, attach to Outlook draft."** Context chips: Clio · Word · Outlook.
   - Scene duration: `11.0s → 13.3s`.

3. **Demo — full rewrite as a chat conversation**:
   - Now uses `chrome="full"` AppFrame (sidebar + topbar mirror real CaseDelta UI).
   - Firm name: "Kirschbaum & Nowotny LLP" / "K" badge (matches the user's reference screenshot).
   - **Page header bar** with **"↻ History"** pill on the right.
   - **User query bubble** at top right: *"Build the medical chronology for Garcia v. Northwest Hospital."*
   - **Delta response** with 4 sections progressively revealing in sync with VO:
     - **Chronology heading + 5-row table** at 2.5s (date / event / provider for Garcia v. Northwest Hospital)
     - **Gaps flagged** bullet list at 4.5s (3 items)
     - **Email drafted** note at 6.5s (mentions Outlook drafts)
     - **Time logged** note at 8.0s (2.4 hours, Clio)
   - **Message input at bottom** with formatting toolbar (B/I/S/link/ordered/bullet), "Message Delta…" placeholder, paperclip + mic icons, send arrow.
   - Doc-stack-and-result-cards animation gone — replaced entirely.

4. **AppFrame** — added `chrome` prop variant system:
   - `chrome="minimal"` keeps the icon-only narrow rail + empty topbar (Solution uses this).
   - `chrome="full"` renders the workspace switcher + section'd nav + search-bar topbar (Demo uses this).
   - Helpers: `appFrameSidebarWidth(chrome)` / `appFrameTopBarHeight(chrome)` for scene-side layout math.

5. **BrandLogoReveal** — significant polish:
   - **Two-phase reveal**: icon enters at scene center; after `iconHoldDuration` (0.95s default), text emerges FROM the icon (icon slides left to natural position while text slides right + fades in from the same origin point). Uses two clipped wordmark layers (Layer 1 = icon, Layer 2 = text).
   - **Shimmer sweep** during icon-hold phase — diagonal light gradient sweeps across the icon (`mix-blend-mode: screen` so it brightens only the dark glyph, not the white background).
   - **No-collapse-on-fade**: internal `hasRevealed` state. Once Phase B completes, inner layers stay locked at their final positions — only outer wrapper opacity fades, so logo + text don't slide back together when the scene cuts.
   - Smoother eases (no overshoot bezier on entrance), longer text reveal (0.85s → 1.4s) + slower shimmer sweep.

6. **IntegrationLogos**:
   - Type pruned to 15 brands (the 17 filler integrations added then removed are gone).
   - **Improved 4 brand-marks**: Outlook (split panel with envelope), Microsoft Word (white doc with notched corner + blue W badge), Excel (same pattern with green grid + X badge), DocuSign (yellow square with stylized signature swoop), QuickBooks (overlapping qb letterforms drawn as paths).

7. **Outro** — `casedelta.com` URL removed. Wordmark stands alone.

---

## Current scene structure (white-mode state, post-pass)

### Dream — `/video/dream` (12s)

VO:
> "Imagine if hours of case prep and admin work / were already handled for you before the day started." (0–6s)
> "Email. Drafts. Discovery. Billing." (6–8.5s)
> "So you can focus on winning more cases." (8.5–11s)

What plays (scene t):
- **0.4–3.4s**: Setup text reveals letter-by-letter. Two-group choreography: prefix "Imagine if hours of " + core "case prep and admin work" with continuous stagger.
- **2.8s**: prefix fades out per-char (layout preserved).
- **3.4s**: core fades out per-char.
- **3.8–5.7s**: Resolution text **"were already handled for you."** wipes in at center, holds, exits.
- **4.0–8.5s**: **Rising sun arc** — faint dashed semicircle visible; warm gold sun rises from left horizon (4.0s) to peak (5.8s, syncs with "before the day started"), holds, fades.
- **6.2–9.0s**: BeatIcons cycle — 360×280 stage at center swaps:
  - 6.2s: ✉ Email
  - 6.8s: 📄 Drafts
  - 7.4s: 📁 Discovery
  - 8.0s: 🕐 Billing
- **9.4–10.6s**: Convergence — 4 admin icons reappear at NW/NE/SW/SE corners, drift inward shrinking + fading.
- **10.0–11.5s**: ScalesEmblem fades in at center, holds, fades out.
- **11.7s**: scene end.

**Gone in white-mode** (ATMOSPHERICS-gated): pre-dawn aurora, opening warm wash, HeavenlyArc (sun/moon nighttime traversal), focal blooms, depth vignette.

### Solution — `/video/solution` (13.3s)

VO:
> "Meet CaseDelta." / "The personal assistant for your law firm." / "CaseDelta connects every tool your firm uses." / "And lets you manage all of them — from one spot — with a single sentence."

What plays (scene t):
- **0.4–4.2s**: Wordmark — icon enters at scene center → 0.95s hold (shimmer sweep plays) → text emerges from icon → holds → fades. (BrandLogoReveal two-phase + shimmer.)
- **4.7s**: AppFrame eases in (chrome="minimal"). Integrations page.
- **5.0–6.1s**: Card grid cascades in row-by-row. **9 cards visible** (3 rows × 3):
  - Row 0 (click targets): **Clio · Outlook · Word**
  - Row 1: Google · QuickBooks · Dropbox
  - Row 2: Microsoft 365 · DocuSign · Slack
- **6.8s**: Non-target cards blur (depth-of-field push); top row stays sharp with subtle blue border + lifted shadow.
- **7.3s**: Cursor enters from off-screen-left.
- **7.8s / 8.8s / 9.8s**: Cursor visits Clio / Outlook / Word Connect buttons. Each click → press-pulse → "Connecting…" (0.30s) → green "Connected" pill.
- **10.15s**: All 3 Connected. **~1.15s celebration pause**.
- **11.3s**: Cursor fades out in place at Word button. Chat bar zooms in centered (1240px wide); AppFrame fades to ~28% + blurs.
- **11.55–13.15s**: Sample query types: **"Pull Clio production, build a chronology PDF, attach to Outlook draft."** at 22px. Context chips: Clio · Word · Outlook.
- **13.3s**: scene end.

**Gone in white-mode**: ocean-sky aurora landscape, focal bloom, depth vignette.

### Demo — `/video/demo` (12s)

VO:
> "Hand Delta thousands of pages of discovery." / "Tell Delta what to do." / "Delta builds the chronology, flags the gaps, emails opposing counsel, and logs your time." / "Many tools. Hours of work. Done all in one go."

What plays (scene t):
- **0.4s**: AppFrame eases in (`chrome="full"` — workspace switcher "Kirschbaum & Nowotny LLP" / K, ASSOCIATE/WORKSPACES/SETTINGS sections with labeled nav, search topbar with help/theme/gear actions).
- **0.6s**: User query bubble visible at top-right: *"Build the medical chronology for Garcia v. Northwest Hospital."*
- **1.5–2.6s**: Typing indicator (3 bouncing dots).
- **2.5s**: Section 1 reveals: **Medical Chronology** heading + 5-row table (date / event / provider for Garcia v. Northwest Hospital).
- **4.5s**: Section 2: **Gaps flagged** bullet list (3 items — missing stress test, missing Patel notes, 2-day gap).
- **6.5s**: Section 3: **Email drafted** note (mentions Outlook drafts).
- **8.0s**: Section 4: **Time logged** (2.4 hours, Clio).
- **8.5–11.6s**: Full response visible; viewer reads while VO closes.
- **11.6s**: fade out.

**Page header**: **↻ History** pill, right-aligned. **Bottom**: message input with B/I/S/link/list toolbar + paperclip/mic + send arrow.

**Gone in white-mode**: golden aurora, focal bloom, depth vignette.

### UseCases — `/video/usecases` (11s)

Untouched this session. Per prior handoff:

VO:
> "From a single demand letter / to three hundred client updates." / "From a medical chronology / to a class wage calculation." / "You make the calls. / Delta makes them happen."

- **0.0–7.5s**: PI / Mass Tort / Med Mal / Employment cards appear sequentially.
- **7.4–10.6s**: 4-card mosaic.
- **10.6s**: fade out.

### Outro — `/video/outro` (9.5s)

VO:
> "The tools you already use." / "With your new personal assistant." / "CaseDelta."

What plays:
- **1.8s**: BrandLogoReveal "CaseDelta" wordmark at center (dark variant).
- **8.8s**: fade out begins.
- **9.5s**: scene end.

**`casedelta.com` URL removed this session.** Wordmark stands alone.

---

## Routes (unchanged)

- `/video` — capture index. Lists all 5 scenes with ready/todo pills + "Play full sequence" button.
- `/video/play` — combined playback. Scenes back-to-back with 0.4s crossfades.
- `/video/dream`, `/video/solution`, `/video/demo`, `/video/usecases`, `/video/outro` — per-scene capture routes.

`?debug=1` on any scene route shows a timing overlay.

---

## Key primitives + recent improvements

### `components/video/primitives/AppFrame.tsx`

**`AppFrame`** now takes a `chrome: "minimal" | "full"` prop:
- `minimal` (default): 64px icon-only rail (firm initial badge + 4 icon nav buttons), empty 44px topbar.
- `full`: 268px sidebar with `WorkspaceSwitcher` + 3 `NavSection` (ASSOCIATE/WORKSPACES/SETTINGS) + labeled `NavItem`s, 54px topbar with centered `SearchField` + `TopBarActions` (help / theme / gear).

Helpers exported: `appFrameSidebarWidth(chrome)`, `appFrameTopBarHeight(chrome)`.

`Cursor` primitive unchanged — still takes `x, y, visible, pulsing, transition`.

### `components/video/primitives/BrandLogo.tsx`

**`BrandLogoReveal`** now does a deliberate two-phase reveal:
- Phase A: icon enters at scene center (Layer 1 — wordmark clipped to icon-only, translated +30%).
- Phase B (after `enterDuration + iconHoldDuration`): icon slides left to natural position; text Layer 2 (wordmark clipped to text-only) fades in + slides right from a -18% overlap with the icon.
- **`hasRevealed` state** set via `useEffect + setTimeout` — once true, inner layers stay at Phase B positions even when `visible` flips false. Outer wrapper handles fade-out only. **No more collapse-back animation when scenes cut.**
- **Shimmer sweep** plays during the icon-hold phase. Container sized to icon area, diagonal gradient `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.92) 50%, transparent 70%)` with `mix-blend-mode: screen`. Animates `x: -115% → 115%` over `iconHoldDuration + 0.45` (~1.4s default).

Defaults: `enterDuration=1.0`, `iconHoldDuration=0.95`, `textRevealDuration=1.4`. Opt out of shimmer with `showShimmer={false}`.

### `components/video/primitives/IntegrationLogos.tsx`

15 integration brands. Improved Outlook / Word / Excel / DocuSign / QuickBooks logos to look more brand-accurate (gradient backgrounds, distinctive letterforms, brand-marker details like Word's notched-corner document + W badge, DocuSign's signature swoop). The 17 filler integrations from earlier iterations (Westlaw, Lexis, Zoom, Teams, etc.) and the `MonogramLogo` helper have been removed.

---

## Tunable knobs (most-touched)

### Dream
- `RisingSunArc`: `SUN_START_T=4.0`, `SUN_PEAK_T=5.8`, `SUN_FADE_OUT_S=7.5`, `SUN_FADE_OUT_E=8.5`. Arc geometry: `R=320`, sun body `r=48`, glow `r=140`.
- BeatIcon timing: `at: [6.2, 6.8, 7.4, 8.0]`. Group fades at `9.0`.
- Convergence: `CONV_ENTER_START=9.4`, `CONV_ENTER_END=9.75`, `CONV_DRIFT_END=10.6`.
- ScalesEmblem: `EMBLEM_IN_START=10.0`, `EMBLEM_IN_END=10.7`, `EMBLEM_OUT_START=11.4`, `EMBLEM_OUT_END=11.7`.

### Solution
- `CLICK_TIMES_T = [2.8, 3.8, 4.8]` (tileT; t = 7.8, 8.8, 9.8). 1.0s spacing.
- `CONNECTING_DUR = 0.35`. `BLUR_START_T = 1.8`. `CURSOR_ENTER_T = 2.3`.
- `CURSOR_EXIT_T = 6.3`, `CHAT_ZOOM_T = 6.3`. ~1.1s celebration pause between Word connecting and chat zoom.
- `CASCADE_GAP_T = 0.13`, `CARD_ENTRY_DUR = 0.55` (slow row cascade).
- `CARD_HEIGHT = 184`, `CARD_PAD = 24`, `BUTTON_HALF_W = 48`. Cursor coords auto-derived from these via `buttonCenterInBody(idx)`.
- `SOLUTION_DURATION_MS = 13300`.

### Demo
- Section reveal times: `sectionVisible[i]` thresholds at `2.5 / 4.5 / 6.5 / 8.0`.
- `DEMO_DURATION_MS = 12000` (unchanged).

---

## File structure

```
app/video/
├── layout.tsx                    # Open Sauce Sans font loader
├── page.tsx                      # Capture index
├── play/page.tsx                 # Combined sequence (Stage bg = white)
├── dream/page.tsx                # (Stage bg = white)
├── solution/page.tsx             # (Stage bg = white)
├── demo/page.tsx                 # (Stage bg = white)
├── usecases/page.tsx             # (Stage bg = white)
└── outro/page.tsx                # (Stage bg = white)

components/video/
├── Stage.tsx                     # Scene wrapper, clock, SPACE replay
├── primitives/
│   ├── tokens.ts                 # Colors, fonts, easing
│   ├── Landscape.tsx             # ALL atmospheric primitives (still used by gated paths)
│   ├── AppFrame.tsx              # CaseDelta app chrome — minimal + full variants
│   ├── BrandLogo.tsx             # Real brand assets, two-phase reveal + shimmer
│   ├── IntegrationLogos.tsx      # 15 integration brand marks
│   ├── StaggeredText.tsx         # Letter-by-letter reveal
│   ├── WipeText.tsx              # Clip-path L→R reveal
│   ├── CheckBubble.tsx           # Green ✓ bubble
│   ├── GlassCard.tsx             # Glass surface helper (legacy)
│   ├── Background.tsx            # ORPHANED — no importers
│   └── Sweep.tsx                 # ORPHANED — no importers
└── scenes/
    ├── DreamScene.tsx            # ATMOSPHERICS = false; rising sun arc + scales emblem
    ├── SolutionScene.tsx         # ATMOSPHERICS = false; cursor-driven Connect interaction
    ├── DemoScene.tsx             # ATMOSPHERICS = false; chrome="full" chat conversation
    ├── UseCasesScene.tsx         # ATMOSPHERICS = false (unchanged this session)
    └── OutroScene.tsx            # ATMOSPHERICS = false; URL removed
```

**Orphaned primitives** (`Background.tsx`, `Sweep.tsx`, plus several functions in `Landscape.tsx`): per the user's prior direction, **don't delete unless explicitly asked**.

---

## Memory references

In `~/.claude/projects/-Users-camrenhall-Documents-CaseDelta-Github-casedelta-website/memory/`:

| File | Content |
|---|---|
| `MEMORY.md` | Top-level index |
| `feedback_vsl_cinematic_design.md` | VSL design rules |
| `feedback_full_realization_increments.md` | 99.9% increments rule |
| `feedback_practice_area_scope.md` | PI/MedMal/Employment/MassTort only |
| `feedback_no_em_dashes.md` | No em-dashes |
| `feedback_casedelta_positioning.md` | "Delta learns your firm" identity |
| `feedback_casedelta_capability_scope.md` | Capability boundaries |
| `feedback_casedelta_pricing_positioning.md` | Pricing differentiator |
| `feedback_casedelta_horizontal_layer.md` | Horizontal-layer thesis |
| `feedback_v2_design_principles.md` | V2 design principles |
| `feedback_heading_hierarchy.md` | Heading hierarchy |
| `user_camren_profile.md` | Founder profile |
| `project_seo_overhaul.md` | SEO project context |

---

## Capture pipeline

- **Production build for capture**: `npm run build && npm start -- -p 3002`. Never `npm run dev` for capture (HMR throws off Framer Motion timing).
- **Don't run `npm run build` while a dev server is running** — corrupts Turbopack cache. If you do: kill server, `rm -rf .next`, restart.
- A background task on this machine sometimes auto-restarts a server on port 3002. Check `lsof -ti:3002 -sTCP:LISTEN` if the port keeps getting reclaimed.
- Production build, fullscreen Chrome at exactly 1920×1080.
- Cmd+Shift+5 → Record Selected Portion → drag over the page area.
- SPACE replays the active scene.

---

## Restoring atmospherics

Five scene files have `const ATMOSPHERICS = false;` near the top:

- `components/video/scenes/DreamScene.tsx`
- `components/video/scenes/SolutionScene.tsx`
- `components/video/scenes/DemoScene.tsx`
- `components/video/scenes/UseCasesScene.tsx`
- `components/video/scenes/OutroScene.tsx`

Flip each to `true`. Then revert the Stage backgrounds in the per-scene pages:

- `app/video/dream/page.tsx` → `background={DREAM_BACKGROUND}`
- `app/video/solution/page.tsx` → `background={SOLUTION_BACKGROUND}`
- `app/video/demo/page.tsx` → `background={DEMO_BACKGROUND}`
- `app/video/usecases/page.tsx` → `background={USECASES_BACKGROUND}`
- `app/video/outro/page.tsx` → `background={OUTRO_BACKGROUND}`
- `app/video/play/page.tsx` → `background="#000"`

The full Dream pre-dawn aurora, Solution ocean-sky, Demo golden, UseCases 4-palette, and Outro twilight setups all return.

**Note**: when atmospherics are restored, the `RisingSunArc` (white-mode) overlaps with the existing `HeavenlyArc` (atmospherics). Decide whether to keep one or the other. Easiest: gate `<RisingSunArc>` behind `!ATMOSPHERICS` in `DreamScene`.

---

## Open questions / candidates for next session

1. **Run `/video/play` end-to-end**. The scene-by-scene polish is done, but the combined sequence with 0.4s crossfades hasn't been re-verified since the timing changes (Solution is now 13.3s, Demo unchanged at 12s). Total runtime is ~58s — slightly over the 52s script target. Consider whether to compress Solution further or accept the longer total.

2. **VO sync pass**. Once ElevenLabs VO is recorded, scene timings will likely need ±200ms shifts. Use the timing constants documented above. The chat-bar typing in Solution and section reveals in Demo are the most sync-sensitive moments.

3. **Atmospherics restoration**. The strip was always meant to be temporary. Pick a session to flip the flags, verify the rich landscapes work with the new content (especially the Solution scene's cursor + cards on the dark blue ocean-sky), and decide on the RisingSunArc / HeavenlyArc question above.

4. **Frame-by-frame render pipeline** (still planned, not built). High-leverage one-time investment for shipping deterministic video. Sketch:
   - `?t=2.4` URL param to Stage to override the clock and disable transitions.
   - `/video/render?scene=dream&t=…` route returning a single deterministic frame.
   - Playwright headless Chromium loops frames at 30fps, screenshots each.
   - ffmpeg → ProRes (.mov for CapCut) + h264 (.mp4 for web).
   - One-time infra build ~4–6 hrs; ~30–40 min total render time per VSL.

5. **UseCases scene** — untouched this session. Per the prior handoff it works, but should be reviewed against the (now improved) AppFrame quality bar. May want to add the `chrome="full"` variant or polish the practice-area cards.

---

## How to start the next session

1. Read this file.
2. Read `VSL_SCRIPT.md` for the locked VO script.
3. Check that no dev server is running on port 3002 (`lsof -ti:3002 -sTCP:LISTEN`).
4. Production build for capture: `npm run build && npm start -- -p 3002`.
5. Visit `/video/play` to see the full sequence on white. Or hit each scene route individually (`/video/dream`, `/video/solution`, `/video/demo`, `/video/usecases`, `/video/outro`).
6. Ask the user which scene they want to iterate on, or whether to start the atmospherics restoration / render pipeline work.
