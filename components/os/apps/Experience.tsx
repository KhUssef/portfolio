import { experience } from "@/data/experience";

export function Experience() {
  return (
    <div className="space-y-4 p-4">
      {experience.map((job) => (
        <article key={`${job.company}-${job.period}`}>
          <h2 className="text-sm font-bold">
            {job.role} - {job.company}
          </h2>
          <p className="font-mono text-xs text-[var(--color-ink-muted)]">
            {job.period}
          </p>
          <ul className="mt-2 space-y-2">
            {job.highlights.map((highlight) => (
              <li
                key={highlight}
                className="relative pl-4 before:absolute before:left-0 before:content-['-']"
              >
                {highlight}
              </li>
            ))}
          </ul>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {job.tags.map((tag) => (
              <li
                key={tag}
                className="border border-[var(--color-chrome-dark)] bg-[var(--color-chrome)] px-1.5 py-0.5 font-mono text-[11px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
