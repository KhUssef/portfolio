"use client";

import { useEffect, useState } from "react";
import { traceLines } from "@/data/trace";

// How many ticks the completed trace stays on screen before the loop restarts,
// and how long each tick lasts.
const HOLD_TICKS = 5;
const TICK_MS = 1000;

export function HeroTrace() {
  // Starts fully rendered so the panel is complete on the server and without
  // JavaScript; the effect then restarts the loop for animated playback.
  const [tick, setTick] = useState(traceLines.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setTick(1);
    const id = window.setInterval(() => {
      setTick((t) => (t >= traceLines.length + HOLD_TICKS ? 1 : t + 1));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const visible = traceLines.slice(0, Math.min(tick, traceLines.length));

  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_16px_48px_-24px_rgb(140_147_248/0.35)]"
    >
      <p className="border-b border-[var(--color-border)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
        QuantumBoard run
      </p>
      <div className="min-h-[172px] px-5 py-4 font-mono text-xs leading-6">
        {visible.map((line) => (
          <p key={line.tag} className="text-[var(--color-muted)]">
            <span className="mr-2 inline-block w-24 text-[var(--color-accent)]">
              [{line.tag}]
            </span>
            {line.text}
          </p>
        ))}
        <p className="caret text-[var(--color-accent)]">_</p>
      </div>
    </div>
  );
}
