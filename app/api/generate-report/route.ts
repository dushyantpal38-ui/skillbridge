import { NextRequest, NextResponse } from "next/server";
import { anthropic, SKILL_TEST_MODEL, firstTextBlock, parseModelJson } from "@/lib/skill-test/anthropic-client";
import { buildReportGenerationPrompt } from "@/lib/skill-test/prompts";
import { scoreAnswers } from "@/lib/skill-test/scoring";
import { checkRateLimit } from "@/lib/skill-test/rate-limit";
import type { GenerateReportRequest, SkillMapReport } from "@/lib/skill-test/types";

export const runtime = "nodejs";

// Shape of just the AI-written portion of the report — the score fields
// are computed locally in scoreAnswers() and merged in below.
interface AiReportPortion {
  overallSummary: string;
  strengths: { skill: string; note: string }[];
  gaps: { skill: string; currentLevel: number; nextStep: string; actionLabel: string }[];
  recommendedFocus: string[];
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "You're generating reports too quickly. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: GenerateReportRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { domainLabel, questions, answers } = body;
  if (!domainLabel || !Array.isArray(questions) || questions.length === 0) {
    return NextResponse.json({ error: "domainLabel and questions are required." }, { status: 400 });
  }

  // Scoring is deterministic and never delegated to the model — see
  // lib/skill-test/scoring.ts for why.
  const { overallScore, breakdown, missedQuestions } = scoreAnswers(questions, answers ?? {});

  const { system, user } = buildReportGenerationPrompt({
    domainLabel,
    breakdown,
    overallScore,
    missedQuestions,
  });

  try {
    const message = await anthropic.messages.create({
      model: SKILL_TEST_MODEL,
      max_tokens: 2048,
      system,
      messages: [{ role: "user", content: user }],
    });

    const raw = firstTextBlock(message);
    const aiPortion = parseModelJson<AiReportPortion>(raw);

    if (!aiPortion.overallSummary || !Array.isArray(aiPortion.gaps)) {
      throw new Error("Model report response was missing required fields.");
    }

    const report: SkillMapReport = {
      domainLabel,
      overallScore,
      skillBreakdown: breakdown,
      overallSummary: aiPortion.overallSummary,
      strengths: aiPortion.strengths ?? [],
      gaps: aiPortion.gaps,
      recommendedFocus: aiPortion.recommendedFocus ?? [],
    };

    return NextResponse.json(report satisfies SkillMapReport);
  } catch (err) {
    console.error("[generate-report] failed:", err);
    return NextResponse.json(
      { error: "Couldn't generate your skill gap report right now. Please try again." },
      { status: 502 }
    );
  }
}
