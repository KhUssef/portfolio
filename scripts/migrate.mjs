// Applies db/schema.sql to the database in DATABASE_URL. Runs before every
// build (see the "build" script in package.json), so each Vercel deployment
// brings the schema up to date. Without DATABASE_URL (local builds) it skips.
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("migrate: DATABASE_URL not set, skipping schema migration");
  process.exit(0);
}

const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

// The HTTP driver runs one statement per call. Comments are stripped first so
// a semicolon inside a comment cannot split a statement.
const statements = schema
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

const sql = neon(url);
for (const statement of statements) {
  await sql.query(statement);
}
console.log(`migrate: applied ${statements.length} statements from db/schema.sql`);
