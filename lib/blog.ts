import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

/* ─── Helpers ─── */

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

  // gray-matter auto-parses YAML dates into Date objects — normalize to strings
  if ((frontmatter.date as unknown) instanceof Date) {
    frontmatter.date = (frontmatter.date as unknown as Date).toISOString().split("T")[0];
  }
  if (frontmatter.updatedAt && (frontmatter.updatedAt as unknown) instanceof Date) {
    frontmatter.updatedAt = (frontmatter.updatedAt as unknown as Date).toISOString().split("T")[0];
  }

  // Filter out drafts in production
  if (IS_PRODUCTION && frontmatter.draft) return null;

  return { slug, frontmatter, content };
}

/* ─── Public API ─── */

/**
 * Returns all published posts sorted by date (newest first).
 */
export function getAllPosts(): Post[] {
  const files = getMdxFiles();
  const posts: Post[] = [];

  for (const file of files) {
    const post = parsePost(file);
    if (post) {
      posts.push({ slug: post.slug, frontmatter: post.frontmatter });
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Returns a single post by slug, including raw MDX content.
 */
export function getPostBySlug(slug: string): PostWithContent | null {
  const files = getMdxFiles();
  const filename = files.find(
    (f) => f.replace(/\.mdx?$/, "") === slug
  );
  if (!filename) return null;
  return parsePost(filename);
}

/**
 * Returns all posts matching the given tag (case-insensitive).
 */
export function getPostsByTag(tag: string): Post[] {
  const normalizedTag = tag.toLowerCase();
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === normalizedTag)
  );
}

/**
 * Returns all unique tags across published posts, sorted alphabetically.
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
}
