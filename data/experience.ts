export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "WeeFizz",
    period: "Jun 2025 - Aug 2025",
    highlights: [
      "Designed and implemented production REST APIs in NestJS and delivered a cross-platform Flutter mobile app, covering end-to-end testing, system integration, and technical documentation.",
      "Trained a CNN for automated fabric classification and an object detection model with OpenCV and TensorFlow.",
      "Engineered web scraping pipelines to automate dataset acquisition and annotation at scale.",
    ],
    tags: ["NestJS", "Flutter", "TensorFlow", "OpenCV", "Python"],
  },
];
