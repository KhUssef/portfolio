import type { Domain } from "@/data/projects";

// Pixel-style icon set drawn as inline SVG on a 16x16 grid. Icons are
// decorative; the label next to each icon carries the accessible name.

type IconProps = {
  className?: string;
};

// Fill used by project file icons, keyed by the project's domain.
export const domainFill: Record<Domain, string> = {
  "Agentic AI": "var(--color-agentic)",
  "Machine Learning": "var(--color-ml)",
  Backend: "var(--color-backend)",
};

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function FolderIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="0" y="2" width="7" height="4" fill="#3d3524" />
      <rect x="0" y="4" width="16" height="10" fill="#3d3524" />
      <rect x="1" y="3" width="5" height="2" fill="#f7d876" />
      <rect x="1" y="5" width="14" height="8" fill="#e9c04c" />
      <rect x="1" y="5" width="14" height="2" fill="#f7d876" />
    </Svg>
  );
}

export function TextFileIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2" y="0" width="12" height="16" fill="#46443f" />
      <rect x="3" y="1" width="10" height="14" fill="#ffffff" />
      <rect x="10" y="1" width="3" height="3" fill="#c9c8c0" />
      <rect x="5" y="5" width="6" height="1" fill="#87847c" />
      <rect x="5" y="7" width="6" height="1" fill="#87847c" />
      <rect x="5" y="9" width="6" height="1" fill="#87847c" />
      <rect x="5" y="11" width="4" height="1" fill="#87847c" />
    </Svg>
  );
}

export function ChipIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="1" width="2" height="3" fill="#46443f" />
      <rect x="7" y="1" width="2" height="3" fill="#46443f" />
      <rect x="10" y="1" width="2" height="3" fill="#46443f" />
      <rect x="4" y="12" width="2" height="3" fill="#46443f" />
      <rect x="7" y="12" width="2" height="3" fill="#46443f" />
      <rect x="10" y="12" width="2" height="3" fill="#46443f" />
      <rect x="1" y="4" width="3" height="2" fill="#46443f" />
      <rect x="1" y="7" width="3" height="2" fill="#46443f" />
      <rect x="1" y="10" width="3" height="2" fill="#46443f" />
      <rect x="12" y="4" width="3" height="2" fill="#46443f" />
      <rect x="12" y="7" width="3" height="2" fill="#46443f" />
      <rect x="12" y="10" width="3" height="2" fill="#46443f" />
      <rect x="3" y="3" width="10" height="10" fill="#2c4a40" />
      <rect x="5" y="5" width="6" height="6" fill="#7fd0b7" />
    </Svg>
  );
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="5" y="2" width="6" height="4" fill="#3d2c15" />
      <rect x="6" y="3" width="4" height="2" fill="#d4d0c8" />
      <rect x="1" y="5" width="14" height="9" fill="#3d2c15" />
      <rect x="2" y="6" width="12" height="7" fill="#a5691f" />
      <rect x="2" y="6" width="12" height="2" fill="#c68430" />
      <rect x="7" y="8" width="2" height="2" fill="#f7d876" />
    </Svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="1" y="3" width="14" height="10" fill="#46443f" />
      <rect x="2" y="4" width="12" height="8" fill="#ffffff" />
      <path d="M2 4 L8 9 L14 4" stroke="#46443f" strokeWidth="1" fill="none" />
    </Svg>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="1" y="1" width="14" height="14" fill="#46443f" />
      <rect x="2" y="2" width="12" height="12" fill="#ffffff" />
      <rect x="4" y="10" width="2" height="2" fill="#1d24a8" />
      <rect x="6" y="8" width="2" height="2" fill="#1d24a8" />
      <rect x="8" y="6" width="2" height="2" fill="#1d24a8" />
      <rect x="7" y="4" width="5" height="2" fill="#1d24a8" />
      <rect x="10" y="4" width="2" height="5" fill="#1d24a8" />
    </Svg>
  );
}

export function AppIcon({
  className,
  accent,
}: IconProps & { accent: string }) {
  return (
    <Svg className={className}>
      <rect x="1" y="2" width="14" height="12" fill="#46443f" />
      <rect x="2" y="3" width="12" height="3" fill={accent} />
      <rect x="2" y="6" width="12" height="7" fill="#ffffff" />
      <rect x="4" y="8" width="8" height="1" fill="#87847c" />
      <rect x="4" y="10" width="6" height="1" fill="#87847c" />
    </Svg>
  );
}
