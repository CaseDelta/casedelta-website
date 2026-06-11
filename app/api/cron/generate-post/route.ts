import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

/* ── Autonomous blog generator ──
   Scheduled by Vercel Cron (see vercel.json). Each run:
   1. pulls the next queued topic from marketing_blog_topics
   2. drafts a full SEO/GEO-optimized post via an OpenAI-compatible LLM
      (default: Together AI) on the Context Wedge spine
   3. inserts it into marketing_blog_posts as status='draft' (a human publishes
      by flipping status to 'published' in the DB; auto-publishing AI-written
      legal content is intentionally avoided)
   4. marks the topic used
   Posts never go live until a human publishes them. */

const LLM_BASE_URL = process.env.LLM_BASE_URL || "https://api.together.xyz/v1";
const LLM_MODEL = process.env.LLM_MODEL || "Qwen/Qwen3-235B-A22B-Instruct-2507-tput";

const SYSTEM_PROMPT = `You are the content writer for CaseDelta, an AI associate for plaintiff law firms (personal injury, medical malpractice, mass tort, employment). You write SEO and GEO optimized blog posts for casedelta.com.

POSITIONING SPINE (follow it):
1. Benefit hook: Delta is an AI associate that knows the firm's actual cases. Every answer is grounded in the real matter, not generic law.
2. Mechanism: Delta drives the tools the firm already runs (Clio, Filevine, MyCase, Google, Microsoft, billing) from one chat, instead of being another destination to upload to.
3. Trust close: per-firm data isolation, full audit trail for ABA Rule 1.6, client data never sold, shared, or used to train AI.

HARD RULES:
- NEVER claim "no third-party LLM", "data never leaves our infrastructure", or that CaseDelta uses no outside AI model. Use only the defensible data-handling framing above.
- NEVER claim a competitor "sends your data to OpenAI" or names a subprocessor. Compete on shape (integration layer vs destination), transparent flat $349 pricing, chronologies in minutes with no human-review queue, breadth, and context.
- NEVER pin a specific hallucination statistic to a named vendor.
- Do not invent statistics, case outcomes, or customer names. Only state facts you are confident are true and generic.
- Avoid dashes entirely (no em dash, no en dash, no " - " used as a pause). Use periods, commas, and colons.
- Write in a confident, plain, practitioner-to-practitioner voice. No hype words like "revolutionary" or "game-changing".

SEO/GEO REQUIREMENTS:
- Open with a definition-first sentence ("CaseDelta is ..." or a direct one-sentence answer to the post's core question).
- Use clear H2 (##) and H3 (###) structure. Include at least one short direct-answer paragraph (40 to 60 words) that answers the title's implied question.
- 1200 to 1700 words. Include concrete, defensible specifics where natural.
- Include 2 to 4 internal markdown links to relevant pages: /features, /use-cases, /use-cases/personal-injury, /use-cases/medical-malpractice, /compare, /security, /pricing, /answers. Use descriptive anchor text.
- End with a short closing paragraph that points to booking a demo at /demo.
- Body is MDX (markdown). Do not include the H1 title in the body (the page renders the title separately). Start the body at the intro paragraph.

OUTPUT FORMAT: respond with ONLY a single JSON object, no markdown fences and no prose outside it, with these keys:
{"slug": "kebab-case-3-to-8-words-no-dates", "title": "SEO title 50 to 65 chars", "description": "meta description 140 to 160 chars, definition-first", "tags": ["3 to 5 lowercase tags"], "body_mdx": "the full MDX body, no H1"}`;

interface GeneratedPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  body_mdx: string;
}

async function llmJson(systemPrompt: string, userPrompt: string): Promise<GeneratedPost> {
  const key = process.env.LLM_API_KEY;
  if (!key) throw new Error("LLM_API_KEY not configured");

  let lastErr: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(`${LLM_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
        body: JSON.stringify({
          model: LLM_MODEL,
          max_tokens: 8000,
          temperature: 0.6,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });
      if (res.status === 429 || res.status >= 500) {
        lastErr = new Error(`LLM ${res.status}`);
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1) * (attempt + 1)));
        continue;
      }
      if (!res.ok) throw new Error(`LLM ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const data = await res.json();
      const content: string = data?.choices?.[0]?.message?.content ?? "";
      const cleaned = content.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
      return JSON.parse(cleaned) as GeneratedPost;
    } catch (err) {
      lastErr = err;
      if (err instanceof SyntaxError) throw err; // bad JSON, don't retry blindly
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("LLM call failed");
}

async function generate(): Promise<{ ok: boolean; detail: string; slug?: string }> {
  const db = getDbPool();
  if (!db) return { ok: false, detail: "DATABASE_URL not configured" };
  if (!process.env.LLM_API_KEY) return { ok: false, detail: "LLM_API_KEY not configured" };

  // 1. next queued topic
  const topicRes = await db.query<{ id: string; topic: string; angle: string | null; target_keyword: string | null; cluster: string | null }>(
    `select id, topic, angle, target_keyword, cluster
     from public.marketing_blog_topics
     where status = 'queued'
     order by created_at asc
     limit 1`
  );
  if (topicRes.rows.length === 0) return { ok: false, detail: "no queued topics" };
  const topic = topicRes.rows[0];

  // 2. generate
  const userPrompt = `Write the next blog post.

Topic: ${topic.topic}
Angle: ${topic.angle ?? "(use your judgment)"}
Primary keyword to target: ${topic.target_keyword ?? "(infer from the topic)"}
Content cluster: ${topic.cluster ?? "general"}`;

  const post = await llmJson(SYSTEM_PROMPT, userPrompt);
  if (!post?.slug || !post?.title || !post?.body_mdx) {
    return { ok: false, detail: "generated post missing required fields (topic kept queued)" };
  }

  // House style: strip em/en dashes (best-effort; a human still reviews the draft).
  const stripDashes = (s: string) => s.replace(/\s*[—–]\s*/g, ", ");
  post.title = stripDashes(post.title);
  post.description = stripDashes(post.description);
  post.body_mdx = stripDashes(post.body_mdx);
  // The page metadata template already appends " | CaseDelta"; strip any the model added.
  post.title = post.title.replace(/\s*[|·\-–—]\s*CaseDelta\s*$/i, "").trim();

  // guardrail: reject if it slipped a banned absolute security claim or a competitor data-flow claim
  const banned = /no third[- ]party (llm|ai)|data never leaves|never touches an outside|sends? your (data|files) to openai/i;
  if (banned.test(post.body_mdx) || banned.test(post.description)) {
    return { ok: false, detail: `generated post tripped the banned-claim guardrail (topic kept queued): ${topic.topic}` };
  }

  // unique slug
  let slug = (post.slug || "").toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || `post-${topic.id.slice(0, 8)}`;
  const exists = await db.query("select 1 from public.marketing_blog_posts where slug = $1", [slug]);
  if (exists.rows.length > 0) slug = `${slug}-${topic.id.slice(0, 6)}`;

  // 3. insert as draft
  await db.query(
    `insert into public.marketing_blog_posts (slug, title, description, body_mdx, tags, status)
     values ($1, $2, $3, $4, $5, 'draft')`,
    [slug, post.title, post.description, post.body_mdx, Array.isArray(post.tags) ? post.tags : []]
  );

  // 4. mark topic used
  await db.query(
    `update public.marketing_blog_topics set status = 'used', used_post_slug = $2 where id = $1`,
    [topic.id, slug]
  );

  return { ok: true, detail: `drafted "${post.title}" from topic "${topic.topic}"`, slug };
}

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization");
  const qs = req.nextUrl.searchParams.get("secret");
  return auth === `Bearer ${secret}` || qs === secret;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const result = await generate();
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (err) {
    console.error("[generate-post] error", err);
    return NextResponse.json({ ok: false, detail: (err as Error).message }, { status: 500 });
  }
}

export const POST = GET;
