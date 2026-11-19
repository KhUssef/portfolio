import { NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { botReason } from "@/lib/bot";
import { visitor } from "@/lib/request";

export const runtime = "edge";

const TYPES = new Set(["view", "click"]);

function field(value: unknown, max: number): string | null {
  return typeof value === "string" && value.length > 0 ? value.slice(0, max) : null;
}

// Receives events from components/Tracker.tsx (sent with navigator.sendBeacon,
// so the body arrives as text) and stores them in the events table.
export async function POST(req: NextRequest): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text()) as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 400 });
  }

  const type = field(body.type, 16);
  if (!type || !TYPES.has(type)) return new Response(null, { status: 400 });

  const url = process.env.DATABASE_URL;
  if (!url) return new Response(null, { status: 204 });

  const reason = botReason(req.headers, "GET");
  const v = visitor(req.headers);
  const sql = neon(url);
  try {
    await sql`insert into events
                (type, name, href, path, token, sid, ip, country, city, ua, is_bot, bot_reason)
              values
                (${type}, ${field(body.name, 160)}, ${field(body.href, 500)},
                 ${field(body.path, 200)}, ${field(body.token, 100)}, ${field(body.sid, 64)},
                 ${v.ip}, ${v.country}, ${v.city}, ${v.ua}, ${reason !== null}, ${reason})`;
  } catch (e) {
    console.error("event insert failed", e);
  }
  return new Response(null, { status: 204 });
}
