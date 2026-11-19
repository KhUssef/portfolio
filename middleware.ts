import { NextRequest, NextResponse } from "next/server";

// Logs one JSON line per hit on the pages linked from outreach emails.
// Read-only: the response is never changed, so scanners and humans get the
// same page. Output shows up in Vercel -> Project -> Logs.
export function middleware(req: NextRequest) {
  const h = req.headers;
  console.log(
    JSON.stringify({
      tag: "hit",
      ts: new Date().toISOString(),
      path: req.nextUrl.pathname,
      token: req.nextUrl.searchParams.get("r"),
      ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip"),
      country: h.get("x-vercel-ip-country"),
      city: h.get("x-vercel-ip-city"),
      ua: h.get("user-agent"),
      lang: h.get("accept-language"),
      referer: h.get("referer"),
      sfSite: h.get("sec-fetch-site"),
      sfMode: h.get("sec-fetch-mode"),
      sfDest: h.get("sec-fetch-dest"),
      method: req.method,
    }),
  );
  return NextResponse.next();
}

export const config = { matcher: ["/", "/cv", "/resume/cv.pdf"] };
