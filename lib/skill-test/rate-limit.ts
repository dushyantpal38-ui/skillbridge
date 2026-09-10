/**
 * Simple in-memory sliding-window rate limiter.
 *
 * NOTE: This resets on server restart/redeploy and does not work across
 * multiple serverless instances — it's a basic safety net for hackathon demos
 * to prevent runaway Anthropic API costs, not a substitute for an Upstash/Redis-backed
 * rate limiter if this project needs production-scale abuse prevention.
 */

const ipRequestMap = new Map<string, number[]>();

export function checkRateLimit(
  identifier: string,
  limit: number = 8,
  windowMs: number = 60_000
): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Retrieve existing timestamps and prune entries older than windowMs
  const timestamps = (ipRequestMap.get(identifier) ?? []).filter(
    (time) => time > windowStart
  );

  if (timestamps.length >= limit) {
    // Update map with cleaned timestamps so memory stays bounded
    ipRequestMap.set(identifier, timestamps);
    return false;
  }

  timestamps.push(now);
  ipRequestMap.set(identifier, timestamps);

  // Periodically prune stale keys to prevent memory leak
  if (ipRequestMap.size > 1000) {
    for (const [key, times] of ipRequestMap.entries()) {
      const activeTimes = times.filter((t) => t > windowStart);
      if (activeTimes.length === 0) {
        ipRequestMap.delete(key);
      } else {
        ipRequestMap.set(key, activeTimes);
      }
    }
  }

  return true;
}
