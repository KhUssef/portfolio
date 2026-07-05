import { profile } from "@/data/profile";

export function About() {
  return (
    <div className="space-y-3 p-4">
      <p>{profile.about}</p>
      <ul className="space-y-1 font-mono text-xs text-[var(--color-ink-muted)]">
        <li>location: {profile.location}</li>
        <li>email: {profile.email}</li>
        {profile.socials.map((social) => (
          <li key={social.label}>
            {social.label.toLowerCase()}:{" "}
            <a
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="link"
            >
              {social.href.replace("mailto:", "").replace("https://", "")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
