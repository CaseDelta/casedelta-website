import { ANSWER_CATEGORIES } from "@/lib/answers";

/** /llms.txt: a plain-text summary for AI assistants, composed from the /answers content. */
export const dynamic = "force-static";

export function GET() {
  const sections = ANSWER_CATEGORIES.map(
    (c) => `## ${c.title}\n\n` + c.items.map((i) => `- ${i.question} ${i.answer}`).join("\n"),
  ).join("\n\n");
  const body = `# CaseDelta

> CaseDelta makes Delta, the AI paralegal for plaintiff law firms. Delta sees your entire case, in every system your firm uses, and does the work inside them.

Key pages:
- [Answers](https://casedelta.com/answers): direct answers to common questions
- [Security](https://casedelta.com/security): how client data is protected
- [Pricing](https://casedelta.com/pricing)
- [Integrations](https://casedelta.com/integrations)

${sections}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
