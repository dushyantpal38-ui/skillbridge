import type { SkillDomain } from "./types";

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "web-development",
    label: "Web Development",
    description: "Frontend, backend, APIs, and databases",
    suggestedSkillTags: ["Frontend & React", "Backend & APIs", "Databases", "System Design"],
  },
  {
    id: "data-science",
    label: "Data Science & ML",
    description: "Python, statistics, and machine learning fundamentals",
    suggestedSkillTags: ["Python", "Statistics", "Machine Learning", "Data Wrangling"],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    description: "Cloud platforms, CI/CD, and infrastructure",
    suggestedSkillTags: ["Cloud Fundamentals", "CI/CD", "Containers", "Networking"],
  },
  {
    id: "mobile-development",
    label: "Mobile Development",
    description: "Native and cross-platform app development",
    suggestedSkillTags: ["Mobile UI", "State Management", "APIs & Storage", "Performance"],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    description: "Security fundamentals and secure coding practices",
    suggestedSkillTags: ["Network Security", "Cryptography", "Secure Coding", "Threat Modeling"],
  },
];

export const CUSTOM_DOMAIN: SkillDomain = {
  id: "custom",
  label: "Something else",
  description: "Describe any skill area and we'll build a test for it",
  suggestedSkillTags: null,
};
