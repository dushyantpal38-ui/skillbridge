import type { GeneratedQuestion, SkillBreakdownItem } from "./types";

export function buildQuestionGenerationPrompt(params: {
  domainLabel: string;
  suggestedSkillTags: string[];
  questionCount: number;
}): { system: string; user: string } {
  const { domainLabel, suggestedSkillTags, questionCount } = params;

  const system = `You are an expert technical assessor who writes skill-diagnostic multiple-choice
questions for a student career-readiness platform. Your questions must be answerable by someone
with real practical knowledge, not trivia — favor scenario/reasoning questions over pure
definition recall. Each question tests exactly one skill area. Vary difficulty across the set.
Respond with ONLY raw JSON — no markdown code fences, no commentary before or after.`;

  const skillTagInstruction =
    suggestedSkillTags.length > 0
      ? `Use exactly these skill tags (spread questions evenly across them): ${JSON.stringify(
          suggestedSkillTags
        )}.`
      : `Choose exactly 4 specific, well-scoped skill tags that best represent this domain, then use only those tags.`;

  const user = `Domain: "${domainLabel}"

${skillTagInstruction}

Generate exactly ${questionCount} multiple-choice questions assessing practical competence in this
domain. Requirements per question:
- Exactly 4 answer options, plausible distractors (no "all of the above" / joke options)
- Exactly one correct option
- A "difficulty" of "easy", "medium", or "hard" — include a mix
- Assign each question to one of the skill tags

Respond with ONLY this JSON shape, no other text:
{
  "skillTags": ["<tag1>", "<tag2>", "<tag3>", "<tag4>"],
  "questions": [
    {
      "id": "q1",
      "skillTag": "<one of skillTags>",
      "difficulty": "easy" | "medium" | "hard",
      "question": "<question text>",
      "options": ["<option A>", "<option B>", "<option C>", "<option D>"],
      "correctIndex": <0-3>
    }
  ]
}`;

  return { system, user };
}

export function buildReportGenerationPrompt(params: {
  domainLabel: string;
  breakdown: SkillBreakdownItem[];
  overallScore: number;
  missedQuestions: GeneratedQuestion[];
}): { system: string; user: string } {
  const { domainLabel, breakdown, overallScore, missedQuestions } = params;

  const system = `You are an expert career-skills coach writing a short, honest skill-gap report for a
student on an academia-industry collaboration platform. Be specific and encouraging but never
inflate results — if the data shows a weak area, say so plainly and give one concrete next step.
Respond with ONLY raw JSON — no markdown code fences, no commentary before or after.`;

  const user = `Domain: "${domainLabel}"
Overall score: ${overallScore}/100

Per-skill accuracy breakdown:
${breakdown.map((b) => `- ${b.skill}: ${b.correct}/${b.total} correct (${b.percent}%)`).join("\n")}

Questions the student got wrong (for context on specific misconceptions, if any):
${
  missedQuestions.length > 0
    ? missedQuestions.map((q) => `- [${q.skillTag}] ${q.question}`).join("\n")
    : "(none — all questions correct)"
}

Write a skill-gap report as ONLY this JSON shape, no other text:
{
  "overallSummary": "<2-3 sentence honest summary of where this student stands>",
  "strengths": [
    { "skill": "<skill name>", "note": "<one sentence on why this is a strength>" }
  ],
  "gaps": [
    {
      "skill": "<skill name, lowest-scoring skills first>",
      "currentLevel": <percent from the breakdown above>,
      "nextStep": "<one concrete, specific action to close this gap>",
      "actionLabel": "<short 2-4 word button label for that action>"
    }
  ],
  "recommendedFocus": ["<skill to focus on first>", "<second priority>"]
}

Include 1-3 strengths (skip if the student has none — an empty array is fine) and 1-3 gaps,
ordered by lowest score first. Base every claim only on the data given above.`;

  return { system, user };
}
