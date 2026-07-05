import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { domainColor } from "@/components/domain";

export function ProjectCard({ project }: { project: Project }) {
  const style = { "--domain": domainColor[project.domain] } as CSSProperties;

  return (
    <article
      style={style}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors duration-300 hover:border-[var(--domain)] sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
        <div>
          <p className="font-mono text-xs text-[var(--domain)]">
            {project.domain} / {project.year}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[var(--color-text)]">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            {project.summary}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 font-mono text-xs text-[var(--color-muted)]"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-5 font-mono text-xs">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--domain)] underline-offset-4 hover:underline"
              >
                View code
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--domain)] underline-offset-4 hover:underline"
              >
                Live demo
              </a>
            ) : null}
          </div>
        </div>

        <ul className="space-y-3 border-[var(--color-border)] lg:border-l lg:pl-8">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="relative pl-4 text-sm leading-relaxed text-[var(--color-text)] before:absolute before:left-0 before:text-[var(--domain)] before:content-['-']"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
