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