export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  about: string;
  availability: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  socials: SocialLink[];
};

export const profile: Profile = {
  name: "Youssef Khalifa",
  role: "Software Engineer",
  tagline:
    "I build systems that check their own work: self-verifying multi-agent AI, confidence-weighted ML pipelines, and real-time backends shipped through CI.",
  about:
    "Final-year software engineering student at INSAT, building multi-agent AI systems and RAG pipelines on top of production backend engineering: LLM orchestration, retrieval services, containerised deployment, and CI/CD. I ship systems end to end, from architecture to running interface.",
  availability:
    "Available for a 6-month engineering internship (end-of-studies thesis), February - July 2027.",
  email: "khalifayoussef628@gmail.com",
  phone: "+216 50 196 402",
  website: "https://khalifa-youssef.vercel.app",
  location: "Tunis, Tunisia",
  socials: [
    { label: "GitHub", href: "https://github.com/KhUssef" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/youssef-khalifa-840a75217/",
    },
    { label: "Email", href: "mailto:khalifayoussef628@gmail.com" },
  ],
};
