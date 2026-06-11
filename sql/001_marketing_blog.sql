-- Marketing blog CMS tables (casedelta-website reads these via DATABASE_URL).
-- Additive only. Posts are rendered by the site ONLY when status = 'published'.

create table if not exists public.marketing_blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text not null,
  body_mdx     text not null,
  tags         text[] not null default '{}',
  author       text not null default 'Camren Hall',
  author_slug  text default 'camren-hall',
  og_image     text,
  status       text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_mbp_status_pub
  on public.marketing_blog_posts (status, published_at desc);

-- Editorial-calendar queue the autonomous generator pulls from.
create table if not exists public.marketing_blog_topics (
  id             uuid primary key default gen_random_uuid(),
  topic          text not null,
  angle          text,
  target_keyword text,
  cluster        text,
  status         text not null default 'queued' check (status in ('queued','used','skipped')),
  used_post_slug text,
  created_at     timestamptz not null default now()
);
