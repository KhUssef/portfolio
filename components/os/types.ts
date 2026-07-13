// Window identifiers: the fixed built-in apps plus one window per project,
// keyed by the project slug.
export type AppId =
  | "welcome"
  | "projects"
  | "about"
  | "skills"
  | "experience"
  | "contact";

export type WindowId = AppId | `project:${string}`;

export type WindowState = {
  id: WindowId;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

export type OpenWindow = (id: WindowId) => void;

// Extracts the project slug from a project window id, or null for app windows.
export function projectSlugFromId(id: WindowId): string | null {
  return id.startsWith("project:") ? id.slice("project:".length) : null;
}
