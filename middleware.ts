import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { botReason } from "@/lib/bot";
import { visitor } from "@/lib/request";

// Logs one row per hit on the pages linked from outreach emails, flagged as
// bot or human (see lib/bot.ts). Read-only: the response is never changed, so
// scanners and humans get the same page. Rows go to Postgres (DATABASE_URL);
// a JSON line is also printed to the Vercel runtime logs.
export function middleware(req: NextRequest, event: NextFetchEvent) {
  const h = req.headers;

  // Client-side router fetches (prefetches and in-app navigations) are not
  // page loads; in-app navigations are recorded as "view" events instead.
  if (h.get("rsc") || h.get("next-router-prefetch") || h.get("purpose") === "prefetch") {
    return NextResponse.next();
  }

  const reason = botReason(h, req.method);
  const hit = {
    path: req.nextUrl.pathname,
    token: req.nextUrl.searchParams.get("r"),
    ...visitor(h),
    lang: h.get("accept-language"),
    referer: h.get("referer"),
    sfSite: h.get("sec-fetch-site"),
    sfMode: h.get("sec-fetch-mode"),
    sfDest: h.get("sec-fetch-dest"),
    method: req.method,
    isBot: reason !== null,
    botReason: reason,
  };

  console.log(JSON.stringify({ tag: "hit", ts: new Date().toISOString(), ...hit }));

  const url = process.env.DATABASE_URL;
  if (url) {
    const sql = neon(url);
    // waitUntil: the insert runs after the response is sent, and a failure
    // can never affect the page.
    event.waitUntil(
      sql`insert into hits
            (path, token, ip, country, city, ua, lang, referer, sf_site, sf_mode, sf_dest,
             method, is_bot, bot_reason)
          values
            (${hit.path}, ${hit.token}, ${hit.ip}, ${hit.country}, ${hit.city}, ${hit.ua},
             ${hit.lang}, ${hit.referer}, ${hit.sfSite}, ${hit.sfMode}, ${hit.sfDest},
             ${hit.method}, ${hit.isBot}, ${hit.botReason})`.catch((e: unknown) =>
        console.error("hit insert failed", e),
      ),
    );
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/cv", "/resume/cv.pdf"] };
