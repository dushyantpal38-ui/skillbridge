// Shared types for the AI Skill Mapping feature.
// The two API routes (generate-test, generate-report) and the frontend
// flow (app/student/skill-mapping) all import from here so the contract
// between them can't silently drift.

export interface SkillDomain {
  id: string;
  label: string;
  description: string;
  /** Pass null for the "describe your own" custom domain option. */
  suggestedSkillTags: string[] | null;
}

export interface GeneratedQuestion {
  id: string;
  skillTag: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[]; // exactly 4
  correctIndex: number; // 0-3
}

export interface GenerateTestRequest {
  domainLabel: string;
  /** Present for preset domains; omitted/empty for a custom, free-text domain. */
  suggestedSkillTags?: string[];
  questionCount?: number; // defaults server-side
}

export interface GenerateTestResponse {
  skillTags: string[];
  questions: GeneratedQuestion[];
}

/** Selected option index per question id, e.g. { "q1": 2 } */
export type AnswerMap = Record<string, number>;

export interface GenerateReportRequest {
  domainLabel: string;
  skillTags: string[];
  questions: GeneratedQuestion[];
  answers: AnswerMap;
}

export interface SkillBreakdownItem {
  skill: string;
  percent: number;
  correct: number;
  total: number;
}

export interface SkillStrength {
  skill: string;
  note: string;
}

export interface SkillGapItem {
  skill: string;
  currentLevel: number;
  nextStep: string;
  actionLabel: string;
}

export interface SkillMapReport {
  domainLabel: string;
  overallScore: number; // 0-100, computed server-side from answers
  skillBreakdown: SkillBreakdownItem[]; // computed server-side
  overallSummary: string; // AI-written
  strengths: SkillStrength[]; // AI-written
  gaps: SkillGapItem[]; // AI-written
  recommendedFocus: string[]; // AI-written, ordered
}

// Legacy types preserved for existing components
export type Subject =
  | "Python" | "C++" | "Java" | "JavaScript"
  | "DSA" | "DBMS & SQL" | "Operating Systems" | "Computer Networks"
  | "OOP Concepts" | "Web Development" | "Machine Learning" | "Git & GitHub";

export type UserProfile = {
  yearOfStudy: "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
  branch: string;
  selfRating: "Beginner" | "Intermediate" | "Advanced";
  hasProjectExperience: boolean;
  projectDescription?: string;
  learningGoal: "Placements" | "Higher Studies" | "Skill Building" | "Hackathons";
  weeklyTimeAvailable: "< 2 hrs" | "2-5 hrs" | "5-10 hrs" | "10+ hrs";
};

export type TestQuestion = {
  id: string;
  type: "mcq" | "output-prediction" | "code-fix" | "short-answer";
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
};

export type GeneratedTest = {
  id: string;
  subject: Subject;
  generatedAt: string;
  questions: TestQuestion[];
};

export type StoredUserContext = {
  profile: UserProfile;
  subjectHistory: {
    subject: Subject;
    lastTestId: string;
    lastScore?: number;
    lastAttemptedAt: string;
  }[];
};