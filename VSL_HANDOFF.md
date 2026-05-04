# VSL Build — Handoff (2026-05-04, demo PDF flow complete)

Picking up next session. Source-of-truth script: `VSL_SCRIPT.md`. Branch:
**`feature/intro-vsl-overhaul`** (all session work committed + pushed).

## TL;DR — where we are

Every scene is on white-mode (`ATMOSPHERICS = false` everywhere). Structural
content pass is largely complete — every scene has its UI mockups,
animations, timing, and copy mostly locked. Deferred: atmospherics, polish,
VO sync, render pipeline.

The **Demo** scene now has a full **cursor-driven click-and-zoom flow** into
a detailed two-page chronology PDF view. The **Dream** scene was reworked
this session with new text choreography (split into Resolution-A and
Resolution-B with simultaneous arc fade), a wide moon→sun crescent arc that
sits above the text, and accumulate-then-clear BeatIcons that resolve into
a case-file-with-check focal element.

## CRITICAL: Branch + worktree setup

Another agent / another terminal has been actively switching branches on the
**main checkout** at `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-website`
during this session. To work around it, the VSL work lives in a **git
worktree** at `/tmp/vsl-work` checked out to `feature/intro-vsl-overhaul`.

**The worktree is the source of truth for development.** Do all editing,
building, and serving from `/tmp/vsl-work`. It shares `.git` with the main
checkout but has its own working tree, so it's immune to the parallel
branch-flipping.

If the worktree is gone (system reboot, manual cleanup), recreate it:
```bash
cd /Users/camrenhall/Documents/CaseDelta/Github/casedelta-website
git worktree add /tmp/vsl-work feature/intro-vsl-overhaul
cp .env* /tmp/vsl-work/                          # Resend API key etc
cp -al node_modules /tmp/vsl-work/node_modules   # hard-link, fast
cd /tmp/vsl-work
rm -rf .next && npm run build && npm start -- -p 3002
```

The hard-link of `node_modules` matters — Turbopack rejects symlinks pointing
"out of the filesystem root." Use `cp -al` (hard links) instead.

## Branch state

`feature/intro-vsl-overhaul` is pushed to origin. Recent commits:

```
dc4bc5f feat(vsl/demo): clean product-style PDF card + smooth zoom from card position
2c35079 feat(vsl/demo): production-grade chronology entries with clinical specificity
811b90a feat(vsl/demo): expand chronology to 25 entries, denser table layout
9b49d5b feat(vsl/demo): cursor click on PDF → zoom to detailed chronology view
7b70c14 feat(video): scaffold VSL demo video routes and scene primitives
```

`7b70c14` is the original session scaffold (all Dream changes from earlier
in this session, attachment chip, etc., baked into one commit). The four
newer commits are this session's Demo-scene work.

**Note:** PR #16 was opened from `feature/intro-vsl-overhaul` and then
**reverted on main** by the parallel agent. The branch + work survives;
just don't expect the video files to exist on `main`.

## What changed this session (vs prior handoff)

### Dream — `/video/dream` (15.0s)

1. **Resolution text split into A→B with arc-aligned transition**:
   - **Resolution-A** "were already handled for you" — visible 4.5–5.7s,
     faster reveal (charDelay 0.020, enterDur 0.55) so it forms in ~1.1s
     and exits cleanly by ~6.3s.
   - **Resolution-B** "before the day started." — visible 6.0–8.2s. By the
     time the arc starts at 6.7s, B has been entering for 0.7s and is
     substantially visible. Brief ~0.3s cross-fade overlap with A.
   - Both A and B exit before BeatIcons start.

2. **Sky arc reworked** — sits **above** the text now (was below), endpoints
   aligned with the resolution-text edges (CX=960, CY=430, RX=643, RY=220).
   Wide elliptical sweep, 180° from left endpoint to right endpoint.
   - **Crescent moon** (path-based, 🌙-style with concave right side, lit
     edge on left) on the left half.
   - **Sun** (full circle with warm radial gradient + halo) on the right half.
   - Crossfades at u ∈ [0.4, 0.6], around peak.
   - Arc completes at 8.2s; arc + text-B fade together at 8.2–9.0s.

3. **Setup text simplified** to a single block — dropped the prefix/core
   split-fade. Whole sentence "Imagine if hours of case prep and admin work"
   reveals as one continuous letter stagger and exits as one block.

4. **BeatIcons re-choreographed**: accumulate at 4 corners (NW/NE/SW/SE)
   instead of swapping at center. Each beat (Email/Drafts/Discovery/Billing)
   adds a tile that **stays visible** — by 11.0s all 4 are present together,
   visualizing the *breadth* of admin pain. Then 12.0–12.7s all 4 drift
   outward (40% past home) and fade.

5. **ScalesEmblem replaced with FocalReveal/CaseFileWon**: a single case
   file (manila folder + content lines + check badge in top-right corner)
   fades in at 12.5s, holds, fades by 14.7s. Replaces the static "scales of
   justice" with an action-coded "case won" focal element.

6. **DREAM_DURATION_MS**: 12000 → 15000.

### Demo — `/video/demo` (13.0s)

1. **Discovery attachment chip** — appears at 0.7s, synced to VO "Hand Delta
   thousands of pages of discovery": doc-stack icon + "Garcia v. Northwest
   — Discovery" + "1,247 pages · 84 MB". User query bubble pushed from 0.6s
   → 1.7s, synced to VO "Tell Delta what to do."

2. **Section 1 PDF preview redesigned** as a clean product-style file card
   (replaces the inline ChronologyTable, then later replaces the fanned-pages
   mock):
   - Cover-page thumbnail on the left (80×100, "MEDICAL CHRONOLOGY" + case
     name + faint content lines + "Page 1 of 23")
   - Filename: `Garcia v. Northwest Hospital — Medical Chronology.pdf`
   - Metadata: `[PDF] 23 pages · 2.4 MB · just now`
   - "Open ↗" affordance
   - Modeled after Claude.ai / ChatGPT inline file-output cards

3. **Cursor click + zoom into detailed view**:
   - Cursor enters from off-screen-right at 8.5s, glides to PDF card center
     by 9.3s, hovers (pulse begins), clicks at 9.5s.
   - **Zoom transition** 9.5–10.2s: AppFrame opacity 1 → 0.22, blur 0 → 14px.
     Detailed view starts at scale 0.18 anchored at the card position
     (PDF_TARGET = 864, 375), translates and scales up to viewport center
     (960, 540) at scale 1.0. Eliminates the abrupt "popup" feel.
   - **Detailed view holds 10.2–12.6s** (~2.4s read time): cover page (left,
     540×720) + landscape Fact Chronology table page (right, 880×720) side
     by side. 25 dense entries with production-grade clinical descriptions
     (specific timestamps, vitals, lab values with reference ranges, cath
     findings with SYNTAX score, operative report detail, dictation excerpts).
   - Fade out 12.6–13.0s.

4. **DEMO_DURATION_MS**: 12000 → 13000.

### Solution / UseCases / Outro

Untouched this session. Per prior state:
- Solution (13.3s): cursor-driven Connect on Clio/Outlook/Word, chat zoom
- UseCases (11s): 4 practice-area cards
- Outro (9.5s): wordmark only — **content gap noted**: "The tools you
  already use" and "With your new personal assistant" VO lines have no
  visual.

## Current scene structure (all 5)

### Dream — 15.0s
```
0.4–3.6   Setup text "Imagine if hours of case prep and admin work"
3.4–~4.4  Setup exits
4.5       Resolution-A "were already handled for you" enters (faster)
5.7       Resolution-A begins exiting (~6.3s gone)
6.0       Resolution-B "before the day started." begins entering
6.7       Sky arc begins — moon at left endpoint
~7.45     Body crosses peak; moon→sun crossfade
8.2       Arc reaches right endpoint; arc + text-B fade together
9.0       Arc + text-B gone
9.2       Email tile appears NW
9.8       Drafts tile NE
10.4      Discovery tile SW
11.0      Billing tile SE — all 4 visible
11.4–12.0 All 4 hold
12.0–12.7 All 4 drift outward and fade
12.5–13.2 Case-file focal element enters at center
13.2–14.4 Focal holds
14.4–14.7 Focal fades
15.0      Scene end
```

### Solution — 13.3s (unchanged this session)
- 0.4–4.2: Wordmark (BrandLogoReveal two-phase + shimmer)
- 4.7: AppFrame (chrome="minimal") eases in, integrations page
- 5.0–6.1: Card grid cascades (3×3, 9 cards)
- 6.8: Non-target cards blur
- 7.3: Cursor enters from off-screen-left
- 7.8 / 8.8 / 9.8: Cursor visits Clio / Outlook / Word
- 11.3: Chat bar zooms in centered, AppFrame fades to ~28%
- 11.55–13.15: Sample query types
- 13.3: Scene end

### Demo — 13.0s
```
0.4    AppFrame eases in (chrome="full")
0.7    Discovery attachment chip
1.7    User query bubble
1.9–2.6 Typing indicator
2.5    Section 1: PDF preview card (cover thumbnail + filename + "Open ↗")
4.5    Section 2: Gaps flagged
6.5    Section 3: Email drafted
8.0    Section 4: Time logged
8.5    Cursor enters from off-screen-right
9.3    Cursor reaches PDF card, pulse begins
9.5    Click
9.5–10.2 Zoom: chat blurs/dims, detailed view grows from card → center
10.2–12.6 Detailed PDF holds (cover + landscape table side-by-side)
12.6–13.0 Fade out
```

### UseCases — 11s (unchanged this session, still untouched)
- 0.0–7.5: PI / Mass Tort / Med Mal / Employment cards appear sequentially
- 7.4–10.6: 4-card mosaic
- 10.6: fade out

### Outro — 9.5s (unchanged this session)
- 1.8: BrandLogoReveal "CaseDelta" wordmark at center (dark variant)
- 8.8: fade out begins
- 9.5: Scene end

## File map

```
app/video/
├── layout.tsx              # Open Sauce Sans font loader
├── page.tsx                # Capture index
├── play/page.tsx           # Combined sequence (Stage bg = white)
├── dream/page.tsx
├── solution/page.tsx
├── demo/page.tsx
├── usecases/page.tsx
└── outro/page.tsx

components/video/
├── Stage.tsx                       # Scene wrapper, clock, SPACE replay
├── primitives/
│   ├── tokens.ts
│   ├── Landscape.tsx               # ATMOSPHERICS-gated primitives
│   ├── AppFrame.tsx                # chrome="minimal"|"full"; exports Cursor
│   ├── BrandLogo.tsx               # Two-phase reveal + shimmer
│   ├── IntegrationLogos.tsx        # 15 brands
│   ├── StaggeredText.tsx           # Letter-by-letter reveal
│   ├── WipeText.tsx
│   ├── CheckBubble.tsx
│   ├── GlassCard.tsx
│   ├── Background.tsx              # ORPHANED
│   └── Sweep.tsx                   # ORPHANED
└── scenes/
    ├── DreamScene.tsx              # ATMOSPHERICS=false; arc above text + crescent moon + accumulate-disperse beats + case-file focal
    ├── SolutionScene.tsx           # ATMOSPHERICS=false; cursor-driven Connect (untouched this session)
    ├── DemoScene.tsx               # ATMOSPHERICS=false; chrome="full" chat → cursor click → zoom into detailed PDF
    ├── UseCasesScene.tsx           # ATMOSPHERICS=false (untouched this session)
    └── OutroScene.tsx              # ATMOSPHERICS=false (untouched this session)
```

## Tunable knobs (most-touched)

### Dream
- Resolution-A: `t > 4.5 && t < 5.7`, charDelay 0.020, enterDur 0.55
- Resolution-B: `t > 6.0 && t < 8.2` (default 0.030 / 0.75)
- Arc: `ARC_START_T=6.7`, `ARC_END_T=8.2`, `ARC_FADE_OUT_S=8.2`,
  `ARC_FADE_OUT_E=9.0`. Geometry: CX=960, CY=430, RX=643, RY=220
- Crescent moon path uses outer radius 48, inner concavity radius 16
- BeatIcons accumulate: tiles at (±300, ±160) from center; `BEATS_HOLD_END=12.0`,
  `BEATS_DISPERSE_END=12.7`. Each tile fades in over 0.40s after its `at`
- Focal: `FOCAL_IN_START=12.5`, `FOCAL_IN_END=13.2`, `FOCAL_OUT_START=14.4`,
  `FOCAL_OUT_END=14.7`

### Demo
- Sections at `[2.5, 4.5, 6.5, 8.0]`
- Cursor: `CURSOR_ENTER_T=8.5`, `CURSOR_OVER_T=9.3`, `CURSOR_CLICK_T=9.5`
- Zoom: `ZOOM_START_T=9.5`, `ZOOM_END_T=10.2`. Detail starts at scale 0.18
  at PDF_TARGET=(864, 375), animates to scale 1.0 at center (960, 540)
- `DETAIL_FADE_OUT_S=12.6`, `DETAIL_FADE_OUT_E=13.0`
- AppFrame zoom-out: opacity `1 - zoomK*0.78`, scale `1 - zoomK*0.04`,
  blur `zoomK * 14`px
- 25 chronology entries in `SAMPLE_CHRONOLOGY_ROWS` (modeled after the
  alford_nfl_406pg.pdf production in casedelta-cloud/test_data/med_records)

## Open questions / next candidates

1. **Outro content gap.** First two VO lines ("The tools you already use" /
   "With your new personal assistant") have no visual. Currently only the
   wordmark renders for the third line. Need callback montage of integration
   logos + Delta avatar/icon, or some equivalent.

2. **UseCases audit.** Untouched all session — review against the new
   AppFrame quality bar (especially compared to the new Demo). May need
   chrome="full" variant or polished practice-area cards.

3. **Full `/video/play` end-to-end.** Total runtime is now ~62s (Dream 15
   + Solution 13.3 + Demo 13 + UseCases 11 + Outro 9.5, less crossfade
   overlap). Script target was 52s. Consider compressing.

4. **Sample chronology entries.** The 25 entries in `SAMPLE_CHRONOLOGY_ROWS`
   have rich clinical detail but weren't legally fact-checked. If we want
   real-feeling Garcia v. Northwest case work product, may want to consult
   actual MMI/cardiac-case chronology examples from real PI firms.

5. **Atmospherics restoration.** Strip was always meant to be temporary.
   Five scenes have `const ATMOSPHERICS = false`. Restore + revert per-scene
   page backgrounds (see prior handoff for paths). Note: `RisingSunArc`
   (white-mode crescent arc) overlaps with the existing `HeavenlyArc`
   (atmospherics-mode sun/moon). Decide which to keep, or gate
   `<RisingSunArc>` behind `!ATMOSPHERICS`.

6. **Frame-by-frame render pipeline.** Still planned, not built. See prior
   handoff for sketch.

7. **VO sync pass.** Once ElevenLabs VO is recorded, scene timings will
   need ±200ms shifts.

## Capture pipeline

- Production build only: `npm run build && npm start -- -p 3002`. Never
  `npm run dev` for capture (HMR throws off Framer Motion timing).
- **Don't run `npm run build` while a dev server is running** — corrupts
  Turbopack cache. If you do: kill server, `rm -rf .next`, restart.
- Build + serve from the **worktree** (`/tmp/vsl-work`), not the main
  checkout. The main checkout's branch is being flipped by a parallel agent.
- A background task on this machine sometimes auto-restarts a server on
  port 3002. Check `lsof -ti:3002 -sTCP:LISTEN` if the port keeps getting
  reclaimed.
- Production build, fullscreen Chrome at exactly 1920×1080.
- Cmd+Shift+5 → Record Selected Portion → drag over the page area.
- SPACE replays the active scene.
- `?debug=1` on any scene route shows a timing overlay.

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

## How to start the next session

1. Read this file.
2. Read `VSL_SCRIPT.md` for the locked VO script (in repo root if it
   survived the revert; otherwise check the prior handoff or main branch).
3. Verify the worktree exists: `ls /tmp/vsl-work/components/video/scenes/`.
   If gone, recreate per the "CRITICAL" section above.
4. Check that no dev server is running on port 3002.
5. Build + serve from worktree:
   ```
   cd /tmp/vsl-work
   rm -rf .next && npm run build && npm start -- -p 3002
   ```
6. Visit `/video/demo` (the freshest scene), `/video/dream` (recent
   re-choreography), or `/video/play` for the full sequence.
7. Ask the user which scene to iterate on, or whether to start the
   atmospherics restoration / Outro content / render pipeline work.
