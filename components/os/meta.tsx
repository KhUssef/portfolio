import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import type { OpenWindow, WindowId } from "@/components/os/types";
import { projectSlugFromId } from "@/components/os/types";
import {
  AppIcon,
  BriefcaseIcon,
  ChipIcon,
  domainFill,
  FolderIcon,
  MailIcon,
  TextFileIcon,
} from "@/components/os/icons";
import { Welcome } from "@/components/os/apps/Welcome";
import { About } from "@/components/os/apps/About";
import {
  ProjectsFolder,
  projectFileName,
} from "@/components/os/apps/ProjectsFolder";
import { ProjectView } from "@/components/os/apps/ProjectView";
import { Skills } from "@/components/os/apps/Skills";
import { Experience } from "@/components/os/apps/Experience";
import { Contact } from "@/components/os/apps/Contact";

export type WindowMeta = {
  title: string;
  width: number;
  icon: ReactNode;
  render: (open: OpenWindow) => ReactNode;
};

// Central registry: every window id resolves to its chrome (title, icon,
// width) and content. Project windows are derived from data/projects.ts.
export function getWindowMeta(id: WindowId): WindowMeta {
  const slug = projectSlugFromId(id);
  if (slug !== null) {
    const project = projects.find((entry) => entry.slug === slug);
    if (!project) {
      return {
        title: "File not found",
        width: 320,
        icon: <TextFileIcon />,
        render: () => <p className="p-4">This file does not exist.</p>,
      };
    }
    return {
      title: projectFileName(project),
      width: 620,
      icon: <AppIcon accent={domainFill[project.domain]} />,
      render: () => <ProjectView project={project} />,
    };
  }

  // Non-project ids are app ids; the cast lets the switch prove exhaustiveness.
  switch (id as Exclude<WindowId, `project:${string}`>) {
    case "welcome":
      return {
        title: "readme.txt",
        width: 400,
        icon: <TextFileIcon />,
        render: (open) => <Welcome open={open} />,
      };
    case "projects":
      return {
        title: "My Projects",
        width: 560,
        icon: <FolderIcon />,
        render: (open) => <ProjectsFolder open={open} />,
      };
    case "about":
      return {
        title: "about.txt",
        width: 440,
        icon: <TextFileIcon />,
        render: () => <About />,
      };
    case "skills":
      return {
        title: "skills.sys",
        width: 560,
        icon: <ChipIcon />,
        render: () => <Skills />,
      };
    case "experience":
      return {
        title: "experience.log",
        width: 560,
        icon: <BriefcaseIcon />,
        render: () => <Experience />,
      };
    case "contact":
      return {
        title: "Mail",
        width: 400,
        icon: <MailIcon />,
        render: () => <Contact />,
      };
  }
}
