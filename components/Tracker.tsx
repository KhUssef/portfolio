"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Sends a "view" event per page and a "click" event for every button or link
// press to /api/track. The outreach token (?r=) from the landing URL is kept
// in localStorage so later visits and clicks stay attributed to it.

const ENDPOINT = "/api/track";

function stored(storage: () => Storage, key: string, make: () => string | null): string | null {
  try {
    const existing = storage().getItem(key);
    if (existing) return existing;
    const value = make();
    if (value) storage().setItem(key, value);
    return value;
  } catch {
    return make();
  }
}

function context() {
  const fromUrl = new URLSearchParams(window.location.search).get("r");
  const token = fromUrl
    ? (() => {
        try {
          localStorage.setItem("trk_token", fromUrl);
        } catch {}
        return fromUrl;
      })()
    : stored(() => localStorage, "trk_token", () => null);
  const sid = stored(() => sessionStorage, "trk_sid", () => crypto.randomUUID());
  return { token, sid, path: window.location.pathname };
}

function send(event: { type: "view" | "click"; name?: string; href?: string }) {
  const body = JSON.stringify({ ...event, ...context() });
  if (!navigator.sendBeacon?.(ENDPOINT, body)) {
    fetch(ENDPOINT, { method: "POST", body, keepalive: true }).catch(() => {});
  }
}

function label(el: Element): string {
  const explicit =
    el.getAttribute("data-track") ?? el.getAttribute("aria-label") ?? el.getAttribute("title");
  if (explicit) return explicit;
  return (el.textContent ?? "").replace(/\s+/g, " ").trim() || el.tagName.toLowerCase();
}

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    send({ type: "view" });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest("a, button, [data-track]");
      if (!el) return;
      send({
        type: "click",
        name: `${el.tagName.toLowerCase()}: ${label(el)}`,
        href: el.getAttribute("href") ?? undefined,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
