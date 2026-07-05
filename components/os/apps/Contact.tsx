import { profile } from "@/data/profile";

export function Contact() {
  return (
    <div className="space-y-4 p-4">
      <p>
        The fastest way to reach me is email. I read everything and reply
        quickly.
      </p>
      <p className="bevel-field break-all px-3 py-2 font-mono text-sm">
        {profile.email}
      </p>
      <div className="flex flex-wrap gap-2">
        {profile.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="btn"
          >
            {social.href.startsWith("mailto:")
              ? "Send mail"
              : `Open ${social.label}`}
          </a>
        ))}
      </div>
    </div>
  );
}
