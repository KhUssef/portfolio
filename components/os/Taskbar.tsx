"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { WindowId, WindowState } from "@/components/os/types";

type TaskbarProps = {
  windows: WindowState[];
  activeId: WindowId | null;
  startOpen: boolean;
  iconFor: (id: WindowId) => ReactNode;
  titleFor: (id: WindowId) => string;
  onToggleWindow: (id: WindowId) => void;
  onToggleStart: () => void;
};

function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="statusbar flex h-7 min-w-16 items-center justify-center px-2 font-mono text-xs">
      {time ?? ""}
    </span>
  );
}

export function Taskbar({
  windows,
  activeId,
  startOpen,
  iconFor,
  titleFor,
  onToggleWindow,
  onToggleStart,
}: TaskbarProps) {
  return (
    <div className="bevel-out fixed inset-x-0 bottom-0 z-[6000] flex h-10 items-center gap-1.5 px-1.5">
      <button
        type="button"
        onClick={onToggleStart}
        aria-expanded={startOpen}
        className={`flex h-7 items-center gap-1.5 px-2.5 font-pixel text-xs font-bold ${
          startOpen ? "bevel-in" : "bevel-out active:shadow-[var(--shadow-in)]"
        }`}
      >
        <span className="inline-block h-3 w-3 bg-[var(--color-title-from)]" />
        start
      </button>
      <span className="mx-0.5 h-6 w-px bg-[var(--color-chrome-dark)]" />
      <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
        {windows.map((win) => {
          const isActive = win.id === activeId && !win.minimized;
          return (
            <button
              key={win.id}
              type="button"
              onClick={() => onToggleWindow(win.id)}
              className={`flex h-7 w-40 max-w-40 shrink items-center gap-1.5 px-2 text-left text-xs ${
                isActive ? "bevel-in font-bold" : "bevel-out"
              }`}
            >
              <span className="h-4 w-4 shrink-0">{iconFor(win.id)}</span>
              <span className="truncate">{titleFor(win.id)}</span>
            </button>
          );
        })}
      </div>
      <Clock />
    </div>
  );
}
