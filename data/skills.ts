export type SkillGroup = {
  category: string;
  items: string[];
};

// Grouped for the skills section. Renders directly from this array.
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C#", "C", "C++"],
  },
  {
    category: "Backend",
    items: ["Node.js", "NestJS", "FastAPI", "Spring Boot", "ASP.NET / .NET", "PHP", "Flask"],
  },
  {
    category: "Databases",
    items: ["MySQL", "MSSQL", "PostgreSQL", "Stored procedures", "Indexed views", "CTEs"],
  },
  {
    category: "AI / ML",
    items: [
      "RAG pipelines",
      "FAISS",
      "Vector DB",
      "TensorFlow / Keras",
      "EfficientNet",
      "Scikit-learn",
      "OpenCV",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "Automation",
    items: ["n8n", "Playwright", "Selenium", "BeautifulSoup"],
  },
  {
    category: "DevOps & Cloud",
    items: ["GitHub Actions", "Docker", "Kubernetes", "Jenkins", "AWS"],
  },
  {
    category: "Mobile",
    items: ["Flutter"],
  },
];
