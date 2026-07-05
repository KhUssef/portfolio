import { profile } from "@/data/profile";
import type { OpenWindow } from "@/components/os/types";

export function Welcome({ open }: { open: OpenWindow }) {
  return (
    <div className="space-y-3 p-4">
      <p className="font-mono text-xs text-[var(--color-ink-muted)]">
        Welcome to youssefOS 1.0
      </p>
      <p>
        <strong>{profile.name}</strong>. {profile.role}, {profile.location}.
      </p>
      <p>{profile.tagline}</p>
      <p>
        Start with{" "}
        <button
          type="button"
          onClick={() => open("projects")}
          className="link"
        >
          My Projects
        </button>{" "}
        on the desktop, or read{" "}
        <button type="button" onClick={() => open("about")} className="link">
          about.txt
        </button>
        . Windows drag by their title bar.
      </p>
    </div>
  );
}
