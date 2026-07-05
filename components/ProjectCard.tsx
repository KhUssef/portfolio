import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            {project.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-[var(--color-accent)]">
            {project.domain} · {project.year}
          </p>
        </div>
        <div className="flex shrink-0 gap-3 text-sm">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
            >
              Code
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
            >
              Demo
            </a>
          ) : null}
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-[var(--color-muted)]">
        {project.summary}
      </p>

      <ul className="mb-4 space-y-2">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="relative pl-4 text-sm leading-relaxed text-[var(--color-text)] before:absolute before:left-0 before:text-[var(--color-accent)] before:content-['-']"
          >
            {highlight}
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 font-mono text-xs text-[var(--color-muted)]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
