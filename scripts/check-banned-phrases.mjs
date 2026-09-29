// Fails the build if public copy contains a phrase we must never publish.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "lib", "content"];
const EXT = /\.(tsx?|mdx?|html)$/;
const BANNED = [
  /\b(AI|software) associate\b/i,
  /\bSOC ?2\b/i,
  /third[- ]party (enterprise )?(AI|LLM|models?)/i,
  /outside AI provider/i,
  /\bwe are early\b/i,
  /\bour own models\b/i,
  /never leaves our/i,
  /googleapis\.com\/auth/i,
  /\b\d+\s?(-|to|–)\s?\d+\s?(attorneys?|lawyers?)\b/i,
];

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  statSync(p).isDirectory() ? walk(p) : EXT.test(p) && files.push(p);
});
ROOTS.forEach(walk);

const hits = [];
for (const f of files) {
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    for (const re of BANNED) if (re.test(line)) hits.push(`${f}:${i + 1}: ${re} -> ${line.trim().slice(0, 120)}`);
  });
}
if (hits.length) {
  console.error("Banned phrases in public copy:\n" + hits.join("\n"));
  process.exit(1);
}
console.log(`Banned-phrase check passed (${files.length} files).`);
