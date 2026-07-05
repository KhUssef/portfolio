import type { Domain } from "@/data/projects";

// Maps each project domain to its accent color token. Components set this on
// a local --domain custom property so Tailwind arbitrary values can use it.
export const domainColor: Record<Domain, string> = {
  "Agentic AI": "var(--color-agentic)",
  "Machine Learning": "var(--color-ml)",
  Backend: "var(--color-backend)",
};
