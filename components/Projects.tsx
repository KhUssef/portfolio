"use client";

import { useState } from "react";
import type { Domain, Project } from "@/data/projects";
import { domains } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

type Filter = Domain | "All";

const filters: Filter[] = ["All", ...domains];

export function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((project) => project.domain === active);

  return (
    <div>
      <div role="tablist" aria-label="Filter projects by domain" className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                isActive
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)]"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
