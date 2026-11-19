// Classifies a request as automated or human from its headers. Returns the
// reason it looks automated, or null when it looks like a real browser.
//
// Email security scanners (Outlook / Microsoft Defender Safe Links,
// Proofpoint, Mimecast, Barracuda, Gmail's image proxy, ...) open every link
// in an email before the recipient does. Some announce themselves in the
// user agent; the rest spoof a browser but skip headers that every modern
// browser sends on a real navigation (Sec-Fetch-*, Accept-Language).

const SCANNER_UA =
  /(microsoft office|ms-office|outlook|safelinks|office365|proofpoint|mimecast|barracuda|googleimageproxy|google-safety|ymailing|symantec|forcepoint|trend ?micro|sophos|fireeye|ironport|cisco|zscaler|messagelabs|checkpoint|bitdefender|kaspersky|avast|norton)/i;

const AUTOMATION_UA =
  /(bot\b|bot\/|crawl|spider|slurp|preview|headless|phantom|selenium|puppeteer|playwright|lighthouse|python|curl|wget|go-http|java\/|okhttp|axios|node-fetch|undici|httpclient|libwww|scan|monitor|facebookexternalhit|embedly|whatsapp|telegram|discord|slack)/i;

export function botReason(headers: Headers, method: string): string | null {
  const ua = headers.get("user-agent");
  if (!ua) return "no-ua";

  const scanner = ua.match(SCANNER_UA);
  if (scanner) return `scanner:${scanner[1].toLowerCase()}`;

  const automation = ua.match(AUTOMATION_UA);
  if (automation) return `ua:${automation[1].toLowerCase()}`;

  if (method === "HEAD") return "head";
  if (!headers.get("sec-fetch-mode")) return "no-sec-fetch";
  if (!headers.get("accept-language")) return "no-lang";

  return null;
}
