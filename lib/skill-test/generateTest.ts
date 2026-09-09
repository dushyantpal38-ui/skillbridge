import { UserProfile, Subject, GeneratedTest } from "./types";

export async function generateSkillTest(
  subject: Subject,
  profile: UserProfile,
  previousQuestionSamples: string[] = []
): Promise<GeneratedTest> {
  const seed = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const difficultyGuide =
    profile.selfRating === "Beginner"
      ? "Focus on core syntax, definitions, and conceptual understanding. Avoid trick questions."
      : profile.selfRating === "Intermediate"
      ? "Mix conceptual questions with applied/output-prediction questions. Include 1-2 code-fix questions."
      : "Focus heavily on output-prediction, edge cases, code-fix, and 'why does this break' style questions. Assume strong fundamentals.";

  const prompt = `You are an expert technical assessor creating a skill test for a BTech student.

SUBJECT: ${subject}
STUDENT PROFILE:
- Year: ${profile.yearOfStudy}, Branch: ${profile.branch}
- Self-rated level: ${profile.selfRating}
- Has hands-on project experience: ${profile.hasProjectExperience} ${profile.projectDescription ? `(${profile.projectDescription})` : ""}
- Goal: ${profile.learningGoal}

DIFFICULTY CALIBRATION: ${difficultyGuide}

UNIQUENESS REQUIREMENT (critical):
- Generation seed: ${seed}
- Do NOT use generic textbook questions like "What is a variable?" or "What is OOP?".
- Invent fresh scenarios, variable names, and code examples each time.
${previousQuestionSamples.length ? `- AVOID repeating these previously asked questions:\n${previousQuestionSamples.map((q) => `  - ${q}`).join("\n")}` : ""}

Generate exactly 8 questions for ${subject}:
- 4 MCQ (conceptual, with 4 options each, only one correct)
- 2 output-prediction (give a short code snippet, ask what it prints/does)
- 1 code-fix (give buggy code, ask to identify the bug from options)
- 1 short-answer (open conceptual question)

Return ONLY valid JSON, no markdown fences, no preamble, matching exactly this schema:
{
  "questions": [
    {
      "id": "q1",
      "type": "mcq" | "output-prediction" | "code-fix" | "short-answer",
      "question": "string",
      "codeSnippet": "string or null",
      "options": ["string"] or null,
      "correctAnswer": "string",
      "explanation": "string",
      "difficulty": "easy" | "medium" | "hard",
      "points": number
    }
  ]
}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const text = data.content.map((c: any) => c.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return {
    id: `test-${seed}`,
    subject,
    generatedAt: new Date().toISOString(),
    questions: parsed.questions,
  };
}