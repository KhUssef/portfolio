"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import type { WindowId, WindowState } from "@/components/os/types";
import { getWindowMeta } from "@/components/os/meta";
import { Window } from "@/components/os/Window";
import { Taskbar } from "@/components/os/Taskbar";
import { StartMenu } from "@/components/os/StartMenu";
import { Boot } from "@/components/os/Boot";
import {
  BriefcaseIcon,
  ChipIcon,
  FolderIcon,
  LinkIcon,
  MailIcon,
  TextFileIcon,
} from "@/components/os/icons";

type DesktopShortcut = {
  id: WindowId;
  label: string;
  icon: ReactNode;
};

const shortcuts: DesktopShortcut[] = [
  { id: "projects", label: "My Projects", icon: <FolderIcon /> },
  { id: "welcome", label: "readme.txt", icon: <TextFileIcon /> },
  { id: "about", label: "about.txt", icon: <TextFileIcon /> },
  { id: "skills", label: "skills.sys", icon: <ChipIcon /> },
  { id: "experience", label: "experience.log", icon: <BriefcaseIcon /> },
  { id: "contact", label: "Mail", icon: <MailIcon /> },
];

const externalShortcuts = profile.socials.filter(
  (social) => !social.href.startsWith("mailto:"),
);

// Windows open on first visit, cascaded so both stay visible.
const initialWindows: WindowState[] = [
  { id: "projects", x: 470, y: 170, z: 1, minimized: false },
  { id: "welcome", x: 150, y: 70, z: 2, minimized: false },
];

const shortcutClass =
  "flex w-20 flex-col items-center gap-1.5 p-1.5 text-white focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-white";

const labelClass =
  "max-w-full text-center text-[11px] leading-tight break-words [text-shadow:1px_1px_0_rgb(0_0_0/0.7)]";

export function Desktop() {
  const [wins, setWins] = useState<WindowState[]>(initialWindows);
  const [startOpen, setStartOpen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [skipBootIfSeen, setSkipBootIfSeen] = useState(true);
  const [small, setSmall] = useState(false);
  const zRef = useRef(3);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setSmall(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    zRef.current += 1;
    const z = zRef.current;
    setWins((current) =>
      current.map((win) =>
        win.id === id ? { ...win, z, minimized: false } : win,
      ),
    );
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      setWins((current) => {
        if (current.some((win) => win.id === id)) {
          return current;
        }
        zRef.current += 1;
        const offset = current.length % 5;
        return [
          ...current,
          {
            id,
            x: 90 + offset * 44,
            y: 40 + offset * 38,
            z: zRef.current,
            minimized: false,
          },
        ];
      });
      focusWindow(id);
    },
    [focusWindow],
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWins((current) => current.filter((win) => win.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWins((current) =>
      current.map((win) =>
        win.id === id ? { ...win, minimized: true } : win,
      ),
    );
  }, []);

  const moveWindow = useCallback((id: WindowId, x: number, y: number) => {
    setWins((current) =>
      current.map((win) => (win.id === id ? { ...win, x, y } : win)),
    );
  }, []);

  const visible = wins.filter((win) => !win.minimized);
  const activeId =
    visible.length > 0
      ? visible.reduce((top, win) => (win.z > top.z ? win : top)).id
      : null;

  const toggleFromTaskbar = useCallback(
    (id: WindowId) => {
      if (id === activeId) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [activeId, focusWindow, minimizeWindow],
  );

  const restart = useCallback(() => {
    window.sessionStorage.removeItem("youssefos-booted");
    setSkipBootIfSeen(false);
    setWins(initialWindows);
    zRef.current = 3;
    setBooting(true);
  }, []);

  const finishBoot = useCallback(() => setBooting(false), []);

  return (
    <div aria-label="Desktop" className="fixed inset-0 overflow-hidden">
      <div className="flex h-[calc(100dvh-40px)] flex-col flex-wrap content-start items-start gap-1 p-2">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.id}
            type="button"
            onClick={() => openWindow(shortcut.id)}
            className={shortcutClass}
          >
            <span className="h-8 w-8">{shortcut.icon}</span>
            <span className={labelClass}>{shortcut.label}</span>
          </button>
        ))}
        {externalShortcuts.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={shortcutClass}
          >
            <span className="h-8 w-8">
              <LinkIcon />
            </span>
            <span className={labelClass}>{social.label}</span>
          </a>
        ))}
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none fixed right-4 bottom-14 text-right font-pixel text-2xl font-bold text-[rgb(255_255_255/0.28)] select-none sm:text-4xl"
      >
        youssefOS
        <span className="block text-xs font-normal sm:text-sm">
          {profile.name} / {profile.role}
        </span>
      </p>

      {wins.map((win) => {
        const meta = getWindowMeta(win.id);
        return (
          <div key={win.id} className={win.minimized ? "hidden" : undefined}>
            <Window
              title={meta.title}
              icon={meta.icon}
              x={win.x}
              y={win.y}
              z={win.z}
              width={meta.width}
              active={win.id === activeId}
              fullscreen={small}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => {
                if (win.id !== activeId) focusWindow(win.id);
              }}
              onMove={(x, y) => moveWindow(win.id, x, y)}
            >
              {meta.render(openWindow)}
            </Window>
          </div>
        );
      })}

      {startOpen ? (
        <StartMenu
          onOpen={openWindow}
          onRestart={restart}
          onClose={() => setStartOpen(false)}
        />
      ) : null}

      <Taskbar
        windows={wins}
        activeId={activeId}
        startOpen={startOpen}
        iconFor={(id) => getWindowMeta(id).icon}
        titleFor={(id) => getWindowMeta(id).title}
        onToggleWindow={toggleFromTaskbar}
        onToggleStart={() => setStartOpen((open) => !open)}
      />

      {booting ? (
        <Boot skipIfSeen={skipBootIfSeen} onDone={finishBoot} />
      ) : null}
    </div>
  );
}
