"use client";

import { useEffect, useState } from "react";

const BOOT_SEEN_KEY = "youssefos-booted";
const LINE_MS = 260;
const DONE_DELAY_MS = 600;

const bootLines = [
  "memcheck ............... 640K ok",
  "blackboard.sys ......... loaded",
  "agents.sys ............. loaded",
  "verifier.dll ........... loaded",
  "espresso.drv ........... not found (continuing)",
  "desktop ................ ready",
];

type BootProps = {
  // When true, the boot sequence is skipped for visitors who have already
  // seen it this session or who prefer reduced motion.
  skipIfSeen: boolean;
  onDone: () => void;
};

export function Boot({ skipIfSeen, onDone }: BootProps) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = window.sessionStorage.getItem(BOOT_SEEN_KEY) !== null;
    if (reduced || (skipIfSeen && seen)) {
      window.sessionStorage.setItem(BOOT_SEEN_KEY, "1");
      onDone();
      return;
    }
    let count = 0;
    const interval = window.setInterval(() => {
      count += 1;
      setShown(count);
      if (count >= bootLines.length) {
        window.clearInterval(interval);
        window.sessionStorage.setItem(BOOT_SEEN_KEY, "1");
        window.setTimeout(onDone, DONE_DELAY_MS);
      }
    }, LINE_MS);
    return () => window.clearInterval(interval);
  }, [skipIfSeen, onDone]);

  return (
    <div className="fixed inset-0 z-[9000] flex flex-col justify-between bg-black p-6 text-[#c8ccc8] sm:p-10">
      <div>
        <p className="font-pixel text-2xl font-bold text-white sm:text-4xl">
          youssefOS
        </p>
        <p className="mt-1 font-mono text-xs text-[#7a807a]">
          version 1.0 - Tunis build
        </p>
      </div>
      <div className="font-mono text-xs leading-6 sm:text-sm">
        {bootLines.slice(0, shown).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p aria-hidden="true" className="blink">
          _
        </p>
      </div>
      <p className="font-mono text-[11px] text-[#7a807a]">
        press nothing to continue
      </p>
    </div>
  );
}
