import { Subject } from "@/lib/skill-test/types";

export type CompanySize = "1-10" | "11-50" | "51-200" | "201-500" | "500+";

export type VerificationStatus = "verified" | "unverified";

export type IndustryProfile = {
  companyName: string;
  website: string;
  contactName: string;
  designation: string;
  officialEmail: string;
  industryType: string;
  companySize: CompanySize;
  verification: VerificationStatus;
  createdAt: string;
};

export type OpportunityType = "Internship" | "Full-Time" | "Placement Drive";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type Opportunity = {
  id: string;
  title: string;
  type: OpportunityType;
  requiredSkills: Subject[];
  minSkillLevel: SkillLevel;
  location: string;
  isRemote: boolean;
  stipendOrCTC: string;
  duration?: string;
  applicationDeadline: string;
  description: string;
  postedAt: string;
  status: "Active" | "Closed";
};

export type CandidateSkill = {
  subject: Subject;
  score: number; // 0-100, from a completed skill test
};

export type Candidate = {
  id: string;
  name: string;
  branch: string;
  yearOfStudy: string;
  skills: CandidateSkill[];
};

export type CandidateMatch = Candidate & {
  matchScore: number; // 0-100, computed against a specific opportunity
  matchedSkills: Subject[];
  missingSkills: Subject[];
};
