# Website Handoff, 2026-07-15

Session context for continuing marketing-site development. Read this first, then
`CLAUDE.md` in this repo (refreshed this session, it is current as of today).

---

## 1. State right now

- **Repo:** `~/Documents/CaseDelta/Github/casedelta-website` (GitHub `CaseDelta/casedelta-website`)
- **Branch:** `feat/how-it-works-graphic`, branched from `origin/main`
- **Commit:** `0abd321` (WIP commit, 9 files, +428/-115). Tree is clean.
- **Merged?** NO. Nothing is on `main`. Nothing is deployed.
- **Gates:** `npx tsc --noEmit` clean, `npm run build` clean.
- **Dev server:** `npm run dev -- -p 3100` (see the port gotcha in section 5).

**`main` is production on Vercel and there is no CI.** A merge is live on
casedelta.com within a minute or two. Camren's standing rule: visual changes get
a screenshot and his sign-off BEFORE merging. This branch is waiting on that.

Everything below the fold was iterated locally against real screenshots. Nothing
here was shipped blind.

---

## 2. What changed, and why

### Hero (`components/marketing/heroes/HeroLegora.tsx`, `lib/variants/copy.ts`)

New copy, given verbatim by Camren:

> **Win back your time by having the _headcount you could never hire_.**
> The best AI paralegal is the one that knows you, your case, and your firm.

- The headline replaced the `control` copy variant (was "Run more cases without
  hiring."). Italic accent falls on "headcount you could never hire" so it takes
  its own line.
- **legora had no subhead slot.** It showed a short inline tagline next to the
  star rating and the pill. Since the new subheader says "The best AI paralegal
  is...", the tagline was redundant. It is now a real subhead line, and
  `HERO_TAGLINE` was deleted (it had no other callers).
- `HERO_SUBHEAD` is now shared by all three hero variants, not just legora.

### The scrim regrade (this is the one to understand)

`legora.mp4` is a **29.5s montage** that cuts between a dark glass tower, white
interiors, a backlit portrait, and a bright silver product mockup.

Measured luminance of the footage directly behind the h1, sampled every 1.5s:

```
t=0.0s   27/255      t=10.5s  185/255  BRIGHT
t=1.5s   27/255      t=12.0s  211/255  BRIGHT
t=3.0s  222/255  B   t=13.5s  185/255  BRIGHT
t=4.5s  222/255  B   t=15.0s  193/255  BRIGHT
t=6.0s   71/255      t=16.5s   98/255
t=7.5s  224/255  B   t=18.0s   20/255
t=9.0s  126/255      t=19.5s  201/255  BRIGHT
                     t=22.5s  216/255  BRIGHT
                     t=25.5s  207/255  BRIGHT
```

**Roughly half the frames are near-white behind the headline.** White serif was
unreadable on those frames. Every screenshot before this measurement happened to
catch a dark frame, which is exactly how this survived.

The scrim's lower stops are now graded to ~0.8 alpha. Verified by measuring the
**composited** backdrop (video + scrim) at the bright frames: ~47/255, giving
**13:1** white-text contrast (WCAG AA needs 4.5:1). Mobile has its own heavier
grade because the copy occupies most of a phone viewport instead of sitting in
the dark lower third.

**If you lighten these stops, re-measure at t=3s / 7.5s / 12s / 22.5s. Do not
eyeball one frame.** There is a comment in the file saying so.

Cost: this dims the bottom ~40% of the footage, on a hero whose whole premise is
"the video is the star." **The honest fix is different footage, not a lighter
scrim.** Open decision for Camren.

### Below the fold (`components/marketing/HomeSections.tsx`)

Order is now: hero → **primer (new)** → what it is → how it works → what it does
→ why different → testimonial → stats/price → security → integrations → FAQ → CTA.

**1. Demo video replaced with a three-node flow graphic.** Camren: "that demo
video sucks." The product's differentiator is *where Delta sits*, between the
person delegating and the systems the firm already runs on. A video buried that
behind a play button.

```
You delegate  ->  Delta does the work  ->  You run more cases
 (chat icon)      (PERSON icon, filled)     (4 real tool logos)
```

- Delta is **personified** (a person glyph, not the triangle mark) per Camren:
  "we want to personify Delta." Matches the "teammate you cannot hire" positioning.
- Node 3 carries the **dream outcome**, not the plumbing. Camren rejected "Your
  systems stay current" as "a bad articulation of the value proposition." Landing
  work in the firm's systems is the MECHANISM, so it lives in the body.
- Node 3 shows real logos because that is the one node where concreteness beats
  iconography.
- Connectors are rails with a CSS pulse and an arrowhead. CSS not Framer, so the
  media query can flip the axis when nodes stack. That meant an explicit
  `prefers-reduced-motion` opt-out (the global rule only covers scroll behavior,
  and CSS keyframes do not inherit Framer's `useReducedMotion`).
- An approval-gate pill sits under it, because that is the #1 buyer objection.
- Old `.cd-video` CSS was deleted from `globals.css`.

**2. New primer section** (`id="problem"`, off-white so the answer lands on white):

> **Your case lives in _five places at once._**
> Email, your case manager, your drive, your billing, and a note in someone's
> head. Stitching it together falls on the people you cannot hire fast enough.

That is POSITIONING.md line 95, the approved problem line.

**3. New "what it is" header/subheader**, given verbatim by Camren:

> **CaseDelta is the AI that _actually does the work_ in the systems your firm already uses.**
> Hand off work to Delta just like you would a paralegal.

**4. All 8 eyebrow labels removed** from the homepage. The `Eyebrow` primitive is
kept because 10 subpages still use it.

**5. `text-wrap: balance` added to the kit `H` primitive** (`kit.tsx`). The new
85-char headline orphaned "uses." on its own line. This is **global** (every
section heading and subpage `H`). Checked `/pricing` and `/security`: both fine.

---

## 3. The copy rule that will bite the next agent

**Enumerating systems is CORRECT in the primer and WRONG in the section below it.**

- **Primer:** the list IS the pain. It is the buyers' own language ("log in to 20
  different platforms"). Keep it.
- **"What it is":** the same list reads as a CAP on what Delta can touch. Camren
  killed it: "limiting to what CaseDelta can actually do."

Same nouns, opposite jobs. Both sections have comments explaining this so nobody
"fixes" either one. Do not collapse them.

---

## 4. Research findings (GH issues, mined this session)

Sources: **#3925** (PI pain map, 931 verbatim quotes), **#3905** (Virtual
Paralegal positioning + message library, LOCKED), **#3657** (competitive
intelligence), and **`POSITIONING.md`**.

**`POSITIONING.md` lives in `casedelta-cloud`, NOT this repo.** Nine files here
cite it in their docstrings ("Honest claims only (POSITIONING.md)") but the file
is not present to read. That is why this drifts. **Open action:** decide whether
to update it, and whether it should be copied/symlinked into this repo.

**The "case manager, email, billing" line Camren rejected is a verbatim lift from
POSITIONING.md line 27** (and line 32's 10s pitch). It is not a copywriting slip.
It will keep regenerating until the source doc changes.

**Do not "fix" breadth by claiming more.** #3657: *"Don't over-rotate on 'we do
everything.' The funded field (EvenUp, Eve, Supio) all claim breadth too; breadth
is parity."* The differentiator is **shape, not category count**: Delta lives in
your tools, competitors make you move into theirs.

**"Any tool with a login" is not approved anywhere.** It postdates these docs
(Kernel session-auth landed July; the issues are June). #3657 flags the adjacent
claim as a live risk: *"Don't promise self-serve onboarding you can't demo. The
'any-platform' claim is the crown jewel. If it stalls in a live demo it
discredits the whole thesis."* **The integrations section already says it** ("If
it has a login, Delta can learn to drive it"), so the site is currently ahead of
the canonical doc. Flagged, not touched.

**PI buyer pain, verbatim** (tool sprawl is the broadest pain, 12 source types):
- *"not having to go and log in to 20 different platforms"*
- *"I am tired of toggling between these different myriad of spreadsheets"*
- *"scattered, trapped in individual emails, handwritten notes, and isolated spreadsheets"*
- Drafted angle from the research file: *"You spent $60,000 migrating your case
  software. You're still the one logging into 20 platforms to find out what's
  happening in a case."* **Camren has not used this yet.** It is a problem line,
  so it fits the hero or the primer. Worth pitching.

**Value-equation constraint:** the dominant lever for this ICP is **effort DOWN**,
because *"they have tried the high-effort fixes (hire, migrate, delegate) and been
burned. Every 'After' must feel low-effort and low-risk."* A sweeping "operates
anything" claim reads as effort/risk UP to a buyer with migration scar tissue.

**Landmines:**
- Never "no third-party LLM" / "data never leaves our infrastructure." False; prod
  runs on enterprise AI under zero-retention/BAA terms. **#3657's security wedge is
  built entirely on this and is STALE** (retracted by #3905, banned by
  POSITIONING.md line 168). Its integration/shape wedge still stands.
- Never claim a competitor "sends your data to OpenAI" or name their subprocessor.
- Never imply autonomy. Delta drafts on instruction; a human approves.
- Never "replace an FTE." Salary is the internal pricing anchor; sell leverage.
- **`pi_pain_research/FINDINGS.md` genders Delta as "she" throughout.** Do not lift
  its copy angles verbatim.

---

## 5. Gotchas that cost time this session

**Port 3000 is occupied** by another Claude Code session's Vite dashboard, running
out of `casedelta-cloud/.claude/worktrees/reach-map/`. `next dev` will print
"Local: http://localhost:3000" while a *different app* answers there. Verify with
the page `<title>`. Use `-p 3100`. **Do not kill a server you did not start.**

**`npm run lint` is broken** and has been since the Next 16 upgrade (`next lint`
was removed from the CLI). Use `npx tsc --noEmit` + `npm run build`. Documented in
CLAUDE.md, not fixed.

**Full-page screenshots come out blank.** Framer's `whileInView` never fires for
offscreen sections, so they sit at `opacity: 0`. Fix: launch the Playwright
context with `reducedMotion: 'reduce'`, which makes `useRise()` a no-op.

**Do not trust a single video frame** when checking hero legibility. See section 2.

**The 4.9 rating is REAL.** An attorney gave it. `lib/variants/copy.ts` used to
call it a "PLACEHOLDER... must be made real or removed before launch"; an agent
believed the comment over the fact and stripped it from the live site on
2026-06-29. It had to be reverted. That comment is now fixed and says so loudly.

---

## 6. Open items

**Needs Camren's decision:**
1. **Merge this branch?** It is waiting on sign-off. `gh pr create --base main`.
2. **The hero video.** Half its frames are bright behind the headline. Current fix
   dims the bottom 40%. Different footage is the real answer.
3. **`legora.mp4` is 10.2 MB above the fold**, no `preload` hint, served to every
   cold paid-Meta click. LCP-relevant and unmeasured.
4. **POSITIONING.md line 27** is the root cause of the enumeration problem. Update
   it? Separate PR against `casedelta-cloud`.
5. **Strip eyebrows from the 10 subpages** for consistency? Homepage has none now.
6. **The "20 platforms" verbatim** as a hero or primer line.

**Known, not blocking:**
- **Dev overlay shows "1 Issue" on the homepage only** (`/pricing`, `/terms` are
  clean). Never identified: it uses a closed shadow root, clicking dismisses it,
  and console + server + build + tsc are all clean. Likely tied to the dynamic
  route or VariantProvider. **Not resolved, do not assume it is.**
- **`teammate` and `problem` copy variants are stale** relative to the new control
  headline. Inactive (no live experiment), so nothing is broken.
- **Node 1 duplicates the subhead.** Subhead says "Hand off work to Delta just like
  you would a paralegal"; node 1 says "Tell Delta what you would tell a new
  paralegal, in plain English." ~100px apart. Proposed trimming node 1; Camren has
  not answered.
- **The dream outcome shifted from capacity to time.** New hero leads with "Win
  back your time"; node 3 still says "You run more cases" (aligned to the OLD
  hero). Still ladders, but may want a time-shaped payoff.
- **Dead code to delete:** `lib/socialProof.ts` + `components/SocialProof.tsx`
  (unimported, but contain **fictional firm names** "Whitfield & Hayes LLP", "The
  Brennan Firm"), `lib/theme.ts` (unimported, tokens drifted), `HeroV2.tsx`,
  `BelowFold.tsx`, and `HeroSocialProof` / `HeroLogoWall` in `heroes/shared.tsx`.
- **`META_SYSTEM_USER_TOKEN` is likely expired.** 60-day token generated
  2026-05-19, refresh guidance is day ~50, today is day ~57. Symptom: Graph error
  `190`. Fix: `npm run meta:refresh-token`.

---

## 7. Orientation for a fresh agent

- **Design system:** `components/marketing/kit.tsx` is the source of truth for the
  below-the-fold and every subpage. Import from it.
- **Two systems coexist deliberately, do not merge them:** `kit.tsx` (fixed light,
  below-fold + subpages) vs `lib/variants/themes.ts` + `heroes/shared.tsx` (themed,
  hero only). `HomeClient.tsx` bridges them.
- **Variants:** two PostHog flags, `design-variant` and `hero-copy`. **The default
  design is `legora`, NOT `control`** despite the naming. Flags are wired but no
  live experiment is running.
- **Blog is DB-backed** (Supabase + ISR), auto-published by the `blog_writer` Codex
  agent with no human review. See `docs/BLOG_CMS.md`.
- **House rules:** no em dashes anywhere. Delta is never gendered. Never invent
  social proof. See CLAUDE.md "House Rules".
</content>
