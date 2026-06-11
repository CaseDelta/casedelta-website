# Blog CMS (database-backed)

The blog is database-backed so posts can be added, edited, and published **without a code push**. Generation runs as a **Codex autonomous agent** in the GTM engine; the website only renders and revalidates.

## Architecture

```
GTM engine (codex exec, subscription)        casedelta-website (Vercel)
  blog_writer skill                            renders marketing_blog_posts via ISR
   - web-researches PI keywords/news    --->   /api/revalidate  (instant publish)
   - writes the post on the spine        |     sitemap + JSON-LD are DB-driven
   - INSERT ... status='published'  -----+
   - curl /api/revalidate
              |
              v
        Supabase: public.marketing_blog_posts
```

- **Source of truth:** the `marketing_blog_posts` table in Supabase (prod). Legacy file posts in `content/blog/*.mdx` are still rendered and merged by slug (DB wins). If the DB is unreachable, the site falls back to file posts so it never breaks.
- **Rendering:** `/blog`, `/blog/[slug]`, `/blog/tag/[tag]` use **ISR** (`revalidate = 600`). Only `status = 'published'` posts are shown.

## SEO: why ISR, not static rebuilds

ISR serves **fully server-rendered static HTML** from the CDN, identical to a hard static build, so crawlers and AI engines see complete content with no indexing delay and **no SEO penalty**. New posts become static HTML the instant they publish via the revalidate webhook, with **no full rebuild**. This (ISR + on-demand revalidation) is the standard production pattern for DB/headless-CMS-backed Next.js sites. Rebuilding the whole site on every post (classic SSG) is the older pattern the industry moved away from; we do not need it.

## Generation: the `blog_writer` Codex skill

Lives in `openclaw-vps/engine/skills/blog_writer.md`, run via the GTM engine's `runner.sh` (`codex exec` on the ChatGPT subscription, with web access). Each run:
1. web-researches current personal-injury-lawyer SEO keywords, trends, and news hooks
2. writes a full post on the Context Wedge spine: plain human language, short scannable paragraphs, no dashes, definition-first opening, internal links, defensible security framing only
3. dedupes, inserts as `status = 'published'`
4. calls `/api/revalidate` so it goes live immediately

It **auto-publishes** (no human review step). A banned-claim guardrail in the skill prevents the disavowed security overclaims.

## Manage posts by hand (when needed)

Edit rows in the Supabase dashboard or via SQL, then revalidate:
```sql
-- unpublish
update public.marketing_blog_posts set status='draft' where slug='your-slug';
-- edit; bump updated_at (becomes dateModified)
update public.marketing_blog_posts set body_mdx='...', updated_at=now() where slug='your-slug';
```
```bash
curl -X POST "https://casedelta.com/api/revalidate?secret=$REVALIDATE_SECRET" \
  -H "content-type: application/json" \
  -d '{"paths":["/blog","/blog/your-slug","/sitemap.xml"]}'
```

## Env vars (Vercel, website)

| var | purpose |
|-----|---------|
| `DATABASE_URL` | Supabase connection string (no `sslmode`; the pool sets SSL) |
| `REVALIDATE_SECRET` | authorizes the revalidate webhook |

Generation creds (DB URL, revalidate secret, website base URL) live on the codex box, not on the website.

## Schema

`sql/001_marketing_blog.sql` (tables) and `sql/002_seed_topics.sql` (optional editorial seeds). Applied to QA + prod.
