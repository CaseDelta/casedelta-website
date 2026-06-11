# Blog CMS (database-backed)

The blog is database-backed so posts can be added, edited, and published **without a code push**. An autonomous generator drafts SEO/GEO-optimized posts on a schedule; a human publishes them.

## How it works

- **Source of truth:** the `marketing_blog_posts` table in Supabase (prod). The site also still renders the legacy file posts in `content/blog/*.mdx`; the two are merged by slug (DB wins). If the DB is unreachable, the site falls back to file posts so it never breaks.
- **Rendering:** `/blog`, `/blog/[slug]`, and `/blog/tag/[tag]` use ISR (`revalidate = 600`). New published posts appear within 10 minutes, or instantly via the revalidate webhook below. Sitemap and JSON-LD are DB-driven.
- **Only `status = 'published'` posts are shown.** Drafts are never public.

## Manage posts (like a CMS)

Edit rows in the Supabase dashboard (table `marketing_blog_posts`) or via SQL.

**Publish a draft:**
```sql
update public.marketing_blog_posts
set status = 'published', published_at = now()
where slug = 'your-slug';
```
Then make it appear immediately (otherwise it shows within 10 min):
```bash
curl -X POST "https://casedelta.com/api/revalidate?secret=$REVALIDATE_SECRET" \
  -H "content-type: application/json" \
  -d '{"paths":["/blog","/blog/your-slug","/sitemap.xml"]}'
```

**Unpublish:** set `status = 'draft'` (or `'archived'`) and revalidate.

**Edit:** change `title`, `description`, `body_mdx` (MDX/markdown), `tags`, `og_image`; set `updated_at = now()` and revalidate. `updated_at` becomes the post's `dateModified` (a freshness signal).

## The autonomous generator

- **Schedule:** Vercel Cron, weekly Monday 14:00 UTC (`vercel.json`). It pulls the next `queued` topic from `marketing_blog_topics`, drafts a post on the Context Wedge spine with the defensible security framing, strips dashes, runs a banned-claim guardrail, and inserts it as a **draft**. It never publishes on its own.
- **Add topics** (the editorial calendar) any time:
```sql
insert into public.marketing_blog_topics (topic, angle, target_keyword, cluster)
values ('Your topic', 'the angle', 'target keyword', 'cluster');
```
- **Run it now** (instead of waiting for the cron):
```bash
curl "https://casedelta.com/api/cron/generate-post?secret=$CRON_SECRET"
```
- **Review then publish:** read the new draft, edit if needed, then publish as above.

## Env vars (set in Vercel)

| var | purpose |
|-----|---------|
| `DATABASE_URL` | Supabase connection string (no `sslmode`; the pool sets SSL) |
| `LLM_API_KEY` | inference key for the generator (Together AI) |
| `LLM_BASE_URL` | default `https://api.together.xyz/v1` |
| `LLM_MODEL` | default `Qwen/Qwen3-235B-A22B-Instruct-2507-tput` |
| `CRON_SECRET` | authorizes the generator endpoint (Vercel Cron sends it automatically) |
| `REVALIDATE_SECRET` | authorizes the revalidate webhook |

## Schema

`sql/001_marketing_blog.sql` (tables) and `sql/002_seed_topics.sql` (initial topics). Already applied to QA + prod.

## Notes

- The generator uses Together AI (a dedicated inference key) rather than the Claude subscription, because that token pool is shared with production agents and rate-limits unpredictably. Quality is good for a draft; a human reviews before publishing.
- Auto-publishing AI-written legal content is intentionally avoided. Drafts require a human publish step (a DB flip, not a code push).
