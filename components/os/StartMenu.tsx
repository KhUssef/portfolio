"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import type { AppId, OpenWindow } from "@/components/os/types";
import {
  BriefcaseIcon,
  ChipIcon,
  FolderIcon,
  LinkIcon,
  MailIcon,
  TextFileIcon,
} from "@/components/os/icons";

type StartMenuProps = {
  onOpen: OpenWindow;
  onRestart: () => void;
  onClose: () => void;
};

type MenuEntry = {
  id: AppId;
  label: string;
  icon: ReactNode;
};

const entries: MenuEntry[] = [
  { id: "projects", label: "My Projects", icon: <FolderIcon /> },
  { id: "welcome", label: "readme.txt", icon: <TextFileIcon /> },
  { id: "about", label: "about.txt", icon: <TextFileIcon /> },
  { id: "skills", label: "skills.sys", icon: <ChipIcon /> },
  { id: "experience", label: "experience.log", icon: <BriefcaseIcon /> },
  { id: "contact", label: "Mail", icon: <MailIcon /> },
];

// Socials that open in a new tab; mail is a window of its own.
const externalLinks = profile.socials.filter(
  (social) => !social.href.startsWith("mailto:"),
);

const itemClass =
  "flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[13px] hover:bg-[var(--color-title-from)] hover:text-white focus-visible:bg-[var(--color-title-from)] focus-visible:text-white";

export function StartMenu({ onOpen, onRestart, onClose }: StartMenuProps) {
  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[6500]"
      />
      <nav
        aria-label="Start menu"
        className="bevel-out fixed bottom-[42px] left-1 z-[7000] flex w-60 p-1"
      >
        <span
          aria-hidden="true"
          className="titlebar-active flex w-6 items-end justify-center pb-2 font-pixel text-[11px] font-bold text-white [writing-mode:vertical-rl] rotate-180"
        >
          youssefOS 1.0
        </span>
        <ul className="min-w-0 flex-1">
          {entries.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => {
                  onOpen(entry.id);
                  onClose();
                }}
                className={itemClass}
              >
                <span className="h-5 w-5 shrink-0">{entry.icon}</span>
                {entry.label}
              </button>
            </li>
          ))}
          <li aria-hidden="true" className="mx-2 my-1 h-px bg-[var(--color-chrome-dark)]" />
          <li>
            <Link href="/cv" onClick={onClose} className={itemClass}>
              <span className="h-5 w-5 shrink-0">
                <TextFileIcon />
              </span>
              cv.doc
            </Link>
          </li>
          <li>
            <a
              href="/resume/cv.pdf"
              target="_blank"
              onClick={onClose}
              className={itemClass}
            >
              <span className="h-5 w-5 shrink-0">
                <TextFileIcon />
              </span>
              cv.pdf
            </a>
          </li>
          <li aria-hidden="true" className="mx-2 my-1 h-px bg-[var(--color-chrome-dark)]" />
          {externalLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className={itemClass}
              >
                <span className="h-5 w-5 shrink-0">
                  <LinkIcon />
                </span>
                {social.label}
              </a>
            </li>
          ))}
          <li aria-hidden="true" className="mx-2 my-1 h-px bg-[var(--color-chrome-dark)]" />
          <li>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRestart();
              }}
              className={itemClass}
            >
              <span className="inline-block h-5 w-5 shrink-0" />
              Restart
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
