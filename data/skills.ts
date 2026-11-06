export type SkillGroup = {
  category: string;
  items: string[];
};

// Grouped for the skills section. Renders directly from this array.
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C#", "Java", "C", "C++"],
  },
  {
    category: "Backend",
    items: ["Node.js", "NestJS", "FastAPI", "ASP.NET / .NET", "Spring Boot", "Flask", "PHP"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "Angular"],
  },
  {
    category: "Mobile & Game Dev",
    items: ["Flutter", "Unity"],
  },
  {
    category: "Databases",
    items: [
      "MySQL",
      "PostgreSQL",
      "MSSQL",
      "Indexing strategy",
      "Triggers",
      "Stored procedures",
      "Indexed views",
      "CTEs",
      "Window functions",
    ],
  },
  {
    category: "AI / ML",
    items: [
      "Multi-agent orchestration",
      "RAG pipelines",
      "Vector DB (FAISS)",
      "TensorFlow / Keras",
      "EfficientNet",
      "Scikit-learn",
      "OpenCV",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "Quantum",
    items: ["Qiskit", "IBM Quantum", "Oracle construction", "Circuit transpilation"],
  },
  {
    category: "Automation",
    items: ["n8n", "Playwright", "Selenium", "BeautifulSoup", "Firecrawl"],
  },
  {
    category: "DevOps & Cloud",
    items: ["GitHub Actions", "Docker", "Kubernetes", "Jenkins", "AWS"],
  },
];
