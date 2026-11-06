export type Education = {
  school: string;
  degree: string;
  // Omitted when the CV gives a result instead of a date range.
  period?: string;
};

export const education: Education[] = [
  {
    school: "National Institute of Applied Science and Technology (INSAT)",
    degree: "Software Engineering Degree (in progress)",
    period: "Sept 2022 - Present",
  },
  {
    school: "High School of Zaouia, Ksiba Thrayet",
    degree: "Baccalaureate - Mathematics, 18.05/20",
  },
];

export const certifications: string[] = [
  "DevOps using Jenkins & Kubernetes",
  "AWS Cloud Practitioner (Beginner)",
];
