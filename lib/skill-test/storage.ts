import { StoredUserContext, UserProfile, Subject } from "./types";

const KEY = "skillbridge_user_context";

export function getUserContext(): StoredUserContext | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveProfile(profile: UserProfile) {
  const existing = getUserContext();
  const updated: StoredUserContext = {
    profile,
    subjectHistory: existing?.subjectHistory ?? [],
  };
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function recordAttempt(subject: Subject, testId: string, score?: number) {
  const ctx = getUserContext();
  if (!ctx) return;
  const filtered = ctx.subjectHistory.filter((h) => h.subject !== subject);
  ctx.subjectHistory = [
    ...filtered,
    { subject, lastTestId: testId, lastScore: score, lastAttemptedAt: new Date().toISOString() },
  ];
  localStorage.setItem(KEY, JSON.stringify(ctx));
}