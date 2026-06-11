import { Pool } from "pg";

/* Server-only Postgres pool for the marketing blog CMS (Supabase).
   Returns null when DATABASE_URL is not configured, so callers can fall back
   to file-based content and the site never breaks if the DB is unwired. */

let pool: Pool | null = null;

export function getDbPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
      ssl: { rejectUnauthorized: false },
    });
    pool.on("error", (err) => {
      console.error("[db] pool error", err.message);
    });
  }
  return pool;
}
