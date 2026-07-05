"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import type { Domain, Project } from "@/data/projects";
import { domains } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { domainColor } from "@/components/domain";

type Filter = Domain | "All";

const filters: Filter[] = ["All", ...domains];

// Each tab carries the accent of the domain it filters; "All" stays neutral.
const filterColor: Record<Filter, string> = {
  All: "var(--color-text)",
  ...domainColor,
};

export function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((project) => project.domain === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by domain"
        className="mb-8 flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = filter === active;
          const style = { "--domain": filterColor[filter] } as CSSProperties;
          return (
            <button
              key={filter}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter)}
              style={style}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                isActive
                  ? "border-[var(--domain)] bg-[var(--domain)] text-[var(--color-bg)]"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--domain)] hover:text-[var(--domain)]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${
                  isActive ? "bg-[var(--color-bg)]" : "bg-[var(--domain)]"
                }`}
              />
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
