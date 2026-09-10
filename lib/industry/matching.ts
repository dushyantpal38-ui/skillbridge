import { Candidate, CandidateMatch, Opportunity, SkillLevel } from "./types";

// Demo-only candidate pool. In the real system this is replaced by a query
// over actual student skill profiles (lib/skill-test data, aggregated per
// student in a real database instead of per-browser localStorage).
export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Aarav Sharma",
    branch: "CSE",
    yearOfStudy: "3rd Year",
    skills: [
      { subject: "Python", score: 82 },
      { subject: "Machine Learning", score: 71 },
      { subject: "DSA", score: 65 },
      { subject: "Git & GitHub", score: 88 },
    ],
  },
  {
    id: "c2",
    name: "Priya Nair",
    branch: "IT",
    yearOfStudy: "4th Year",
    skills: [
      { subject: "JavaScript", score: 90 },
      { subject: "Web Development", score: 85 },
      { subject: "DBMS & SQL", score: 74 },
      { subject: "Git & GitHub", score: 80 },
    ],
  },
  {
    id: "c3",
    name: "Karan Mehta",
    branch: "CSE",
    yearOfStudy: "2nd Year",
    skills: [
      { subject: "C++", score: 60 },
      { subject: "DSA", score: 55 },
      { subject: "OOP Concepts", score: 62 },
    ],
  },
  {
    id: "c4",
    name: "Ishita Rao",
    branch: "ECE",
    yearOfStudy: "3rd Year",
    skills: [
      { subject: "Python", score: 76 },
      { subject: "Computer Networks", score: 68 },
      { subject: "Operating Systems", score: 70 },
    ],
  },
  {
    id: "c5",
    name: "Dev Patel",
    branch: "CSE",
    yearOfStudy: "4th Year",
    skills: [
      { subject: "Java", score: 88 },
      { subject: "DBMS & SQL", score: 80 },
      { subject: "DSA", score: 84 },
      { subject: "Web Development", score: 66 },
    ],
  },
];

const LEVEL_FLOOR: Record<SkillLevel, number> = {
  Beginner: 0,
  Intermediate: 50,
  Advanced: 75,
};

export function matchCandidates(
  opportunity: Opportunity,
  candidates: Candidate[] = MOCK_CANDIDATES
): CandidateMatch[] {
  const floor = LEVEL_FLOOR[opportunity.minSkillLevel];

  return candidates
    .map((candidate) => {
      const matchedSkills = opportunity.requiredSkills.filter((skill) => {
        const found = candidate.skills.find((s) => s.subject === skill);
        return found && found.score >= floor;
      });
      const missingSkills = opportunity.requiredSkills.filter(
        (skill) => !matchedSkills.includes(skill)
      );

      const coverage =
        opportunity.requiredSkills.length === 0
          ? 0
          : matchedSkills.length / opportunity.requiredSkills.length;

      const avgMatchedScore =
        matchedSkills.length === 0
          ? 0
          : matchedSkills.reduce((sum, skill) => {
              const s = candidate.skills.find((s) => s.subject === skill);
              return sum + (s?.score ?? 0);
            }, 0) / matchedSkills.length;

      // Weighted: how much of the required skill set they cover matters
      // more than how high their scores are within it.
      const matchScore = Math.round(coverage * 70 + (avgMatchedScore / 100) * 30);

      return { ...candidate, matchScore, matchedSkills, missingSkills };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
