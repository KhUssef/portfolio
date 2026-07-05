import { Desktop } from "@/components/os/Desktop";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export default function Home() {
  return (
    <main>
      {/* Screen readers and crawlers get the full CV as plain document
          structure; sighted visitors get the same content through the
          desktop windows. */}
      <section className="sr-only">
        <h1>
          {profile.name} - {profile.role}
        </h1>
        <p>{profile.tagline}</p>
        <p>{profile.about}</p>
        <p>
          {profile.location}. Email: {profile.email}. GitHub:
          https://github.com/KhUssef
        </p>

        <h2>Projects</h2>
        {projects.map((project) => (
          <article key={project.slug}>
            <h3>
              {project.name} ({project.domain}, {project.year})
            </h3>
            <p>{project.summary}</p>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p>{project.tags.join(", ")}</p>
            {project.repo ? <p>Code: {project.repo}</p> : null}
          </article>
        ))}

        <h2>Experience</h2>
        {experience.map((job) => (
          <article key={`${job.company}-${job.period}`}>
            <h3>
              {job.role}, {job.company} ({job.period})
            </h3>
            <ul>
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}

        <h2>Skills</h2>
        {skills.map((group) => (
          <p key={group.category}>
            {group.category}: {group.items.join(", ")}
          </p>
        ))}
      </section>

      <Desktop />
    </main>
  );
}
