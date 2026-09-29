/**
 * The blog: MDX files in content/blog, nothing else.
 *
 * Until 2026-09-25 posts could also come from a Supabase table
 * (public.marketing_blog_posts), written by an autonomous blog_writer agent. That
 * writer is gone: its launchd job was unloaded, the GTM engine that inherited it
 * was deleted, and the last row is from 2026-06-15. The three published rows were
 * exported here verbatim and then edited, so the files are now the only source and
 * a post ships like any other page, reviewed in a PR.
 *
 * Frontmatter: title, description, date (YYYY-MM-DD), optional updatedAt, optional
 * related (links shown under the post), optional draft.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  image?: string;
  draft?: boolean;
  /** A short related-links block under the post: integration or compare pages. */
  related?: { label: string; href: string }[];
}

export interface Post { slug: string; frontmatter: PostFrontmatter }
export interface PostWithContent extends Post { content: string }

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const iso = (d: unknown) => (d instanceof Date ? d.toISOString().split("T")[0] : (d as string | undefined));

function read(filename: string): PostWithContent | null {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = { ...data, date: iso(data.date), updatedAt: iso(data.updatedAt) } as PostFrontmatter;
  if (IS_PRODUCTION && frontmatter.draft) return null;
  return { slug: filename.replace(/\.mdx?$/, ""), frontmatter, content };
}

function all(): PostWithContent[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(read)
    .filter((p): p is PostWithContent => p !== null)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export async function getAllPosts(): Promise<Post[]> {
  return all().map(({ slug, frontmatter }) => ({ slug, frontmatter }));
}

export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  return all().find((p) => p.slug === slug) ?? null;
}
