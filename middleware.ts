import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Logs one row per hit on the pages linked from outreach emails.
// Read-only: the response is never changed, so scanners and humans get the
// same page. Rows go to Postgres (DATABASE_URL); a JSON line is also printed
// to the Vercel runtime logs.
export function middleware(req: NextRequest, event: NextFetchEvent) {
  const h = req.headers;
  const dec = (v: string | null) => {
    if (!v) return null;
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  };

  const hit = {
    path: req.nextUrl.pathname,
    token: req.nextUrl.searchParams.get("r"),
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip"),
    country: h.get("x-vercel-ip-country"),
    city: dec(h.get("x-vercel-ip-city")),
    ua: h.get("user-agent"),
    lang: h.get("accept-language"),
    referer: h.get("referer"),
    sfSite: h.get("sec-fetch-site"),
    sfMode: h.get("sec-fetch-mode"),
    sfDest: h.get("sec-fetch-dest"),
    method: req.method,
  };

  console.log(JSON.stringify({ tag: "hit", ts: new Date().toISOString(), ...hit }));

  const url = process.env.DATABASE_URL;
  if (url) {
    const sql = neon(url);
    // waitUntil: the insert runs after the response is sent, and a failure
    // can never affect the page.
    event.waitUntil(
      sql`insert into hits
            (path, token, ip, country, city, ua, lang, referer, sf_site, sf_mode, sf_dest, method)
          values
            (${hit.path}, ${hit.token}, ${hit.ip}, ${hit.country}, ${hit.city}, ${hit.ua},
             ${hit.lang}, ${hit.referer}, ${hit.sfSite}, ${hit.sfMode}, ${hit.sfDest}, ${hit.method})`.catch(
        (e: unknown) => console.error("hit insert failed", e),
      ),
    );
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/cv", "/resume/cv.pdf"] };
