import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDbPool } from "./db";

/* ─── Types ─── */

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  authorSlug?: string;
  tags: string[];
  image?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
}

export interface PostWithContent extends Post {
  content: string;
}

/* ─── Constants ─── */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const IS_PRODUCTION = process.env.NODE_ENV === "production";

/* ─── File-based source (legacy posts committed in content/blog) ─── */

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

function parsePost(filename: string): PostWithContent | null {
  const slug = filename.replace(/\.mdx?$/, "");
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = data as PostFrontmatter;

  if ((frontmatter.date as unknown) instanceof Date) {
    frontmatter.date = (frontmatter.date as unknown as Date).toISOString().split("T")[0];
  }
  if (frontmatter.updatedAt && (frontmatter.updatedAt as unknown) instanceof Date) {
    frontmatter.updatedAt = (frontmatter.updatedAt as unknown as Date).toISOString().split("T")[0];
  }

  if (IS_PRODUCTION && frontmatter.draft) return null;

  return { slug, frontmatter, content };
}

function getFilePosts(): PostWithContent[] {
  return getMdxFiles()
    .map(parsePost)
    .filter((p): p is PostWithContent => p !== null);
}

/* ─── DB-based source (CMS posts in marketing_blog_posts) ─── */

interface DbRow {
  slug: string;
  title: string;
  description: string;
  body_mdx: string;
  tags: string[] | null;
  author: string;
  author_slug: string | null;
  og_image: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function toIsoDate(d: string | Date | null): string {
  if (!d) return new Date().toISOString().split("T")[0];
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toISOString().split("T")[0];
}

function rowToPost(row: DbRow): PostWithContent {
  return {
    slug: row.slug,
    frontmatter: {
      title: row.title,
      description: row.description,
      date: toIsoDate(row.published_at ?? row.created_at),
      updatedAt: toIsoDate(row.updated_at),
      author: row.author,
      authorSlug: row.author_slug ?? undefined,
      tags: row.tags ?? [],
      image: row.og_image ?? undefined,
    },
    content: row.body_mdx,
  };
}

/** Fetch published CMS posts. Returns [] (never throws) if the DB is unwired or errors. */
async function getDbPosts(): Promise<PostWithContent[]> {
  const db = getDbPool();
  if (!db) return [];
  try {
    const { rows } = await db.query<DbRow>(
      `select slug, title, description, body_mdx, tags, author, author_slug, og_image,
              published_at, created_at, updated_at
       from public.marketing_blog_posts
       where status = 'published'`
    );
    return rows.map(rowToPost);
  } catch (err) {
    console.error("[blog] DB fetch failed, falling back to file posts:", (err as Error).message);
    return [];
  }
}

/* ─── Merge ─── */

async function getAllPostsWithContent(): Promise<PostWithContent[]> {
  const [filePosts, dbPosts] = await Promise.all([
    Promise.resolve(getFilePosts()),
    getDbPosts(),
  ]);
  // DB takes precedence on slug collision.
  const bySlug = new Map<string, PostWithContent>();
  for (const p of filePosts) bySlug.set(p.slug, p);
  for (const p of dbPosts) bySlug.set(p.slug, p);
  return Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/* ─── Public API (async) ─── */

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getAllPostsWithContent();
  return posts.map(({ slug, frontmatter }) => ({ slug, frontmatter }));
}

export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  const posts = await getAllPostsWithContent();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const normalizedTag = tag.toLowerCase();
  const posts = await getAllPosts();
  return posts.filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === normalizedTag)
  );
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.frontmatter.tags) tagSet.add(tag);
  }
  return Array.from(tagSet).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}
