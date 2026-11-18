export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Backend Developer",
    company: "Melyn",
    period: "May 2026 - Present",
    highlights: [
      "Building backend services and REST APIs in .NET for a government licensing platform for healthcare professionals, which covers the full lifecycle from eligibility and exams to payment, licence issuance, renewals and continuing education.",
      "Integrated the platform with external national and industry systems: digital identity sign-in, an online payment gateway, an international exam provider, and a primary-source credential verification service.",
      "Wrote the technical analysis for the credential verification integration, comparing two integration models on document integrity, webhook synchronisation and fit with the existing officer review workflow.",
      "Built the CI/CD pipeline on GitHub Actions: secret and vulnerable-dependency scanning, enforced formatting, warnings-as-errors release builds, automated tests, database migrations, and versioned deployments over SSH with health checks.",
      "Ship releases to the development and UAT environments, taking features through to the client's user acceptance testing.",
    ],
    tags: [".NET", "C#", "REST APIs", "GitHub Actions", "CI/CD", "Third-party integrations"],
  },
  {
    role: "Software Engineering Intern",
    company: "WeeFizz",
    period: "Jun 2025 - Aug 2025",
    highlights: [
      "Designed and shipped production REST APIs in NestJS and a cross-platform Flutter mobile app, owning end-to-end testing, system integration and technical documentation.",
      "Built a fabric identification model on a DenseNet backbone that classifies an image patch by patch and averages the predictions into a ranked top-5 of fabric types with confidence scores.",
      "Engineered a computer vision pipeline in OpenCV that detects garment pattern pieces in scanned images, using adaptive thresholding for uneven lighting and shape analysis to strip arrows and annotations, then returns each piece's outline and dimensions through a FastAPI service.",
      "Automated dataset acquisition and annotation at scale with web scraping pipelines feeding model training.",
    ],
    tags: ["NestJS", "Flutter", "TensorFlow", "DenseNet", "OpenCV", "FastAPI", "Python"],
  },
];
