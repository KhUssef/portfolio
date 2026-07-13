import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

type CvDocumentProps = {
  // When false, contact and repo references render as plain text instead of
  // anchors. Used by the visually hidden copy on the desktop page so hidden
  // content adds no keyboard tab stops.
  interactive?: boolean;
};

function Reference({
  href,
  label,
  interactive,
}: {
  href: string;
  label: string;
  interactive: boolean;
}) {
  if (!interactive) {
    return <span>{label}</span>;
  }
  return (
    <a href={href} className="link">
      {label}
    </a>
  );
}

// The full CV as one semantic document, rendered from data/. Shown visually
// on /cv and exposed to screen readers and crawlers on the desktop page.
export function CvDocument({ interactive = true }: CvDocumentProps) {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="font-pixel text-2xl font-bold sm:text-3xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          {profile.role} - {profile.location}
        </p>
        <p className="mt-4">{profile.tagline}</p>
        <p className="mt-2">{profile.about}</p>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
          <Reference
            href={`mailto:${profile.email}`}
            label={profile.email}
            interactive={interactive}
          />
          {profile.socials
            .filter((social) => !social.href.startsWith("mailto:"))
            .map((social) => (
              <Reference
                key={social.label}
                href={social.href}
                label={social.href.replace("https://", "")}
                interactive={interactive}
              />
            ))}
        </p>
      </header>

      <section>
        <h2 className="border-b border-[var(--color-chrome-dark)] pb-1 font-pixel text-base font-bold">
          Projects
        </h2>
        <div className="mt-4 space-y-6">
          {projects.map((project) => (
            <article key={project.slug}>
              <h3 className="font-bold">
                {project.name}{" "}
                <span className="font-normal text-[var(--color-ink-muted)]">
                  ({project.domain}, {project.year})
                </span>
              </h3>
              <p className="mt-1">{project.summary}</p>
              <ul className="mt-2 space-y-1">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-4 before:absolute before:left-0 before:content-['-']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-mono text-xs text-[var(--color-ink-muted)]">
                {project.tags.join(", ")}
              </p>
              {project.repo ? (
                <p className="mt-1 font-mono text-xs">
                  Code:{" "}
                  <Reference
                    href={project.repo}
                    label={project.repo.replace("https://", "")}
                    interactive={interactive}
                  />
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="border-b border-[var(--color-chrome-dark)] pb-1 font-pixel text-base font-bold">
          Experience
        </h2>
        <div className="mt-4 space-y-6">
          {experience.map((job) => (
            <article key={`${job.company}-${job.period}`}>
              <h3 className="font-bold">
                {job.role}, {job.company}{" "}
                <span className="font-normal text-[var(--color-ink-muted)]">
                  ({job.period})
                </span>
              </h3>
              <ul className="mt-2 space-y-1">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-4 before:absolute before:left-0 before:content-['-']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-mono text-xs text-[var(--color-ink-muted)]">
                {job.tags.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="border-b border-[var(--color-chrome-dark)] pb-1 font-pixel text-base font-bold">
          Skills
        </h2>
        <dl className="mt-4 space-y-2">
          {skills.map((group) => (
            <div key={group.category} className="sm:flex sm:gap-2">
              <dt className="shrink-0 font-bold sm:w-40">{group.category}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
