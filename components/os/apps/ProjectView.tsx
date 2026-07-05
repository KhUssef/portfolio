import type { Project } from "@/data/projects";
import { AppIcon, domainFill } from "@/components/os/icons";

export function ProjectView({ project }: { project: Project }) {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <AppIcon accent={domainFill[project.domain]} className="h-9 w-9 shrink-0" />
        <div>
          <h2 className="text-base font-bold">{project.name}</h2>
          <p className="font-mono text-xs text-[var(--color-ink-muted)]">
            {project.domain} / {project.year}
          </p>
        </div>
      </div>

      <p>{project.summary}</p>

      <fieldset className="group-box px-3 pt-1 pb-3">
        <legend className="px-1 text-[11px] font-bold">Highlights</legend>
        <ul className="space-y-2">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="relative pl-4 before:absolute before:left-0 before:content-['-']"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="group-box px-3 pt-1 pb-3">
        <legend className="px-1 text-[11px] font-bold">Stack</legend>
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-[var(--color-chrome-dark)] bg-[var(--color-chrome)] px-1.5 py-0.5 font-mono text-[11px]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="flex flex-wrap gap-2">
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            View code
          </a>
        ) : null}
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Live demo
          </a>
        ) : null}
      </div>
    </div>
  );
}
