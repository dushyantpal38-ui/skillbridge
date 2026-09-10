import type { AnswerMap, GeneratedQuestion, SkillBreakdownItem } from "./types";

/**
 * Scoring is computed locally from the known correct answers — never by
 * asking the model "how did they do?". This keeps scores trustworthy and
 * reproducible; the model's job (see prompts.ts) is only to explain the
 * scores in plain language and suggest next steps.
 */
export function scoreAnswers(
  questions: GeneratedQuestion[],
  answers: AnswerMap
): {
  overallScore: number;
  breakdown: SkillBreakdownItem[];
  missedQuestions: GeneratedQuestion[];
} {
  const bySkill = new Map<string, { correct: number; total: number }>();
  const missedQuestions: GeneratedQuestion[] = [];

  let totalCorrect = 0;

  for (const q of questions) {
    const entry = bySkill.get(q.skillTag) ?? { correct: 0, total: 0 };
    entry.total += 1;

    const isCorrect = answers[q.id] === q.correctIndex;
    if (isCorrect) {
      entry.correct += 1;
      totalCorrect += 1;
    } else {
      missedQuestions.push(q);
    }

    bySkill.set(q.skillTag, entry);
  }

  const breakdown: SkillBreakdownItem[] = Array.from(bySkill.entries()).map(
    ([skill, { correct, total }]) => ({
      skill,
      correct,
      total,
      percent: total > 0 ? Math.round((correct / total) * 100) : 0,
    })
  );

  const overallScore =
    questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;

  return { overallScore, breakdown, missedQuestions };
}
