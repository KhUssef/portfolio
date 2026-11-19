// Visitor details Vercel attaches to every request as headers.

function decode(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function visitor(headers: Headers) {
  return {
    ip:
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headers.get("x-real-ip"),
    country: headers.get("x-vercel-ip-country"),
    city: decode(headers.get("x-vercel-ip-city")),
    ua: headers.get("user-agent"),
  };
}
