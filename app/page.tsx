import { Section } from "@/components/Section";
import { Projects } from "@/components/Projects";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export default function Home() {
  return (
    <main>
      <header className="mx-auto w-full max-w-3xl px-6 pt-28 pb-12">
        <p className="mb-4 font-mono text-sm text-[var(--color-accent)]">
          {profile.role} · {profile.location}
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
          {profile.tagline}
        </p>

        <nav className="mt-8 flex flex-wrap gap-4 text-sm">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="rounded-md border border-[var(--color-border)] px-4 py-2 text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </header>

      <Section id="about" title="About">
        <p className="text-base leading-relaxed text-[var(--color-text)]">
          {profile.about}
        </p>
      </Section>

      <Section id="projects" title="Projects">
        <Projects projects={projects} />
      </Section>

      <Section id="experience" title="Experience">
        <div className="grid gap-6">
          {experience.map((job) => (
            <article key={`${job.company}-${job.period}`}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-[var(--color-text)]">
                  {job.role} · {job.company}
                </h3>
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {job.period}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-4 text-sm leading-relaxed text-[var(--color-muted)] before:absolute before:left-0 before:text-[var(--color-accent)] before:content-['-']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-sm font-semibold text-[var(--color-text)]">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-0.5 font-mono text-xs text-[var(--color-muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <p className="text-base leading-relaxed text-[var(--color-text)]">
          Reach me at{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-[var(--color-accent)] underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
          , or find more of my work on{" "}
          <a
            href="https://github.com/KhUssef"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-accent)] underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </Section>

      <footer className="mx-auto w-full max-w-3xl px-6 py-12 text-sm text-[var(--color-muted)]">
        Built with Next.js and Tailwind CSS. Deployed on Vercel.
      </footer>
    </main>
  );
}
