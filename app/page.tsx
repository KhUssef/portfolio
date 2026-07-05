import { Section } from "@/components/Section";
import { Projects } from "@/components/Projects";
import { HeroTrace } from "@/components/HeroTrace";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <main id="top">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
          <a
            href="#top"
            aria-label="Back to top"
            className="font-display text-lg font-bold tracking-tight text-[var(--color-text)]"
          >
            YK
          </a>
          <div className="flex flex-wrap gap-4 font-mono text-xs sm:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header className="relative mx-auto grid w-full max-w-5xl gap-12 px-6 pt-36 pb-20 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-[0.07] blur-3xl"
        />
        <div>
          <p className="rise font-mono text-sm text-[var(--color-accent)]">
            {profile.role} / {profile.location}
          </p>
          <h1 className="rise rise-2 mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
            {profile.tagline}
          </p>
          <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] transition-opacity hover:opacity-85"
            >
              View projects
            </a>
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="rounded-md border border-[var(--color-border)] px-5 py-2.5 text-sm text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <div className="rise rise-4">
          <HeroTrace />
        </div>
      </header>

      <Section id="about" title="About">
        <p className="max-w-3xl text-base leading-relaxed text-[var(--color-text)]">
          {profile.about}
        </p>
      </Section>

      <Section id="projects" title="Projects">
        <Projects projects={projects} />
      </Section>

      <Section id="experience" title="Experience">
        <div className="grid gap-6">
          {experience.map((job) => (
            <article
              key={`${job.company}-${job.period}`}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"
            >
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  {job.role} / {job.company}
                </h3>
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {job.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-4 text-sm leading-relaxed text-[var(--color-muted)] before:absolute before:left-0 before:text-[var(--color-accent)] before:content-['-']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 font-mono text-xs text-[var(--color-muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text)]">
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
        <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
          The fastest way to reach me is email. I read everything.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 block break-all font-display text-2xl font-semibold tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)] sm:text-4xl"
        >
          {profile.email}
        </a>
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          More of my work lives on{" "}
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

      <footer className="mx-auto w-full max-w-5xl border-t border-[var(--color-border)] px-6 py-10 font-mono text-xs text-[var(--color-muted)]">
        {profile.name} - built with Next.js and Tailwind CSS, deployed on
        Vercel.
      </footer>
    </main>
  );
}
