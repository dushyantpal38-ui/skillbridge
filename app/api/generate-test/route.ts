import { NextRequest, NextResponse } from "next/server";
import { anthropic, SKILL_TEST_MODEL, firstTextBlock, parseModelJson } from "@/lib/skill-test/anthropic-client";
import { buildQuestionGenerationPrompt } from "@/lib/skill-test/prompts";
import { checkRateLimit } from "@/lib/skill-test/rate-limit";
import type { GenerateTestRequest, GenerateTestResponse } from "@/lib/skill-test/types";

export const runtime = "nodejs";

const DEFAULT_QUESTION_COUNT = 8;
const MAX_QUESTION_COUNT = 15;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "You're generating tests too quickly. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: GenerateTestRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const domainLabel = body.domainLabel?.trim();
  if (!domainLabel) {
    return NextResponse.json({ error: "domainLabel is required." }, { status: 400 });
  }

  const questionCount = Math.min(
    Math.max(body.questionCount ?? DEFAULT_QUESTION_COUNT, 4),
    MAX_QUESTION_COUNT
  );
  const suggestedSkillTags = body.suggestedSkillTags ?? [];

  const { system, user } = buildQuestionGenerationPrompt({
    domainLabel,
    suggestedSkillTags,
    questionCount,
  });

  try {
    const message = await anthropic.messages.create({
      model: SKILL_TEST_MODEL,
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    });

    const raw = firstTextBlock(message);
    const parsed = parseModelJson<GenerateTestResponse>(raw);

    // Basic shape validation so a malformed model response fails loudly
    // here instead of breaking the quiz UI downstream.
    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new Error("Model returned no questions.");
    }
    for (const q of parsed.questions) {
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Question "${q.id}" did not have exactly 4 options.`);
      }
    }

    return NextResponse.json(parsed satisfies GenerateTestResponse);
  } catch (err) {
    console.error("[generate-test] failed:", err);
    return NextResponse.json(
      { error: "Couldn't generate your skill test right now. Please try again." },
      { status: 502 }
    );
  }
}
