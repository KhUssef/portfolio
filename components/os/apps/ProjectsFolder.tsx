import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import type { OpenWindow } from "@/components/os/types";
import { AppIcon, domainFill } from "@/components/os/icons";

// Projects render as files; the extension encodes the domain.
const domainExtension: Record<Project["domain"], string> = {
  "Agentic AI": "agent",
  "Machine Learning": "model",
  Backend: "server",
};

export function projectFileName(project: Project): string {
  return `${project.slug}.${domainExtension[project.domain]}`;
}

export function ProjectsFolder({ open }: { open: OpenWindow }) {
  return (
    <div className="flex h-full flex-col">
      <ul className="grid flex-1 grid-cols-3 content-start gap-1 p-3 sm:grid-cols-5">
        {projects.map((project) => (
          <li key={project.slug}>
            <button
              type="button"
              onClick={() => open(`project:${project.slug}`)}
              className="flex w-full flex-col items-center gap-1.5 p-2 hover:bg-[var(--color-chrome)] "
            >
              <AppIcon
                accent={domainFill[project.domain]}
                className="h-8 w-8"
              />
              <span className="max-w-full text-center text-[11px] leading-tight break-words">
                {projectFileName(project)}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="statusbar bg-[var(--color-chrome)] px-2 py-0.5 text-[11px] text-[var(--color-ink-muted)]">
        {projects.length} object(s)
      </p>
    </div>
  );
}
