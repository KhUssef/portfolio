export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  about: string;
  email: string;
  location: string;
  socials: SocialLink[];
};

export const profile: Profile = {
  name: "Youssef Khalifa",
  role: "Software Engineer",
  tagline:
    "Final-year software engineering student building production-grade systems end to end - from multi-agent AI pipelines to real-time collaborative platforms.",
  about:
    "Final-year software engineering student at INSAT with experience across full-stack development, machine learning, and DevOps. I design and deliver systems from scratch, with a focus on clean architecture, performance, and end-to-end ownership. My recent work spans agentic AI orchestration, computer vision, and real-time backends.",
  email: "khalifayoussef628@gmail.com",
  location: "Tunis, Tunisia",
  socials: [
    { label: "GitHub", href: "https://github.com/KhUssef" },
    { label: "Email", href: "mailto:khalifayoussef628@gmail.com" },
  ],
};
