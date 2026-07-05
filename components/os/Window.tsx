"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

type WindowProps = {
  title: string;
  icon: ReactNode;
  x: number;
  y: number;
  z: number;
  width: number;
  active: boolean;
  fullscreen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
};

export function Window({
  title,
  icon,
  x,
  y,
  z,
  width,
  active,
  fullscreen,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  children,
}: WindowProps) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  function startDrag(event: React.PointerEvent<HTMLElement>) {
    if (fullscreen) return;
    if ((event.target as HTMLElement).closest("button")) return;
    drag.current = { dx: event.clientX - x, dy: event.clientY - y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: React.PointerEvent<HTMLElement>) {
    if (!drag.current) return;
    const nx = event.clientX - drag.current.dx;
    const ny = event.clientY - drag.current.dy;
    onMove(
      Math.min(Math.max(nx, 96 - width), window.innerWidth - 96),
      Math.min(Math.max(ny, 0), window.innerHeight - 88),
    );
  }

  function endDrag() {
    drag.current = null;
  }

  return (
    <section
      role="dialog"
      aria-label={title}
      style={
        fullscreen
          ? { zIndex: z }
          : { left: x, top: y, zIndex: z, width }
      }
      className={
        fullscreen
          ? "bevel-out fixed inset-x-0 top-0 bottom-10 flex flex-col p-1"
          : "bevel-out absolute flex max-w-[calc(100vw-16px)] flex-col p-1"
      }
      onPointerDownCapture={onFocus}
    >
      <header
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`flex h-7 touch-none items-center gap-1.5 px-1.5 select-none ${
          active ? "titlebar-active" : "titlebar-idle"
        }`}
      >
        <span className="h-4 w-4 shrink-0">{icon}</span>
        <span className="flex-1 truncate text-[13px] font-bold text-white">
          {title}
        </span>
        <button
          type="button"
          aria-label={`Minimize ${title}`}
          onClick={onMinimize}
          className="bevel-out flex h-5 w-5 items-center justify-center active:shadow-[var(--shadow-in)]"
        >
          <svg viewBox="0 0 8 8" aria-hidden="true" className="h-2 w-2">
            <rect x="0" y="6" width="8" height="2" fill="var(--color-ink)" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={`Close ${title}`}
          onClick={onClose}
          className="bevel-out flex h-5 w-5 items-center justify-center active:shadow-[var(--shadow-in)]"
        >
          <svg viewBox="0 0 8 8" aria-hidden="true" className="h-2 w-2">
            <path
              d="M0 0 L8 8 M8 0 L0 8"
              stroke="var(--color-ink)"
              strokeWidth="1.6"
            />
          </svg>
        </button>
      </header>
      <div
        style={fullscreen ? undefined : { maxHeight: "min(66vh, 560px)" }}
        className="bevel-field mt-1 flex-1 overflow-auto text-[13px] leading-relaxed"
      >
        {children}
      </div>
    </section>
  );
}
