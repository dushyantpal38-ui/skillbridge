import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// Server-only module — never import this from a "use client" component.
// The API key stays on the server; nothing here is exposed to the browser.
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Model used for both question generation and report writing.
// Sonnet-class model: strong enough for structured reasoning about skill
// gaps, fast/cheap enough to run per-assessment without noticeable lag.
export const SKILL_TEST_MODEL = "claude-sonnet-5";

/**
 * Claude sometimes wraps JSON in ```json fences or adds a short preamble
 * even when instructed not to. This strips both before parsing, and throws
 * a descriptive error (rather than a cryptic JSON.parse failure) if the
 * result still isn't valid JSON, so the API route can return a clean 502.
 */
export function parseModelJson<T>(raw: string): T {
  const stripped = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    return JSON.parse(stripped) as T;
  } catch {
    throw new Error("Model did not return valid JSON.");
  }
}

/** Pulls the first text block out of a Messages API response. */
export function firstTextBlock(message: Anthropic.Message): string {
  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("Model response contained no text content.");
  }
  return block.text;
}
