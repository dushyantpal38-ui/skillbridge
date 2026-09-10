import { IndustryProfile, Opportunity } from "./types";

const PROFILE_KEY = "skillbridge_industry_profile";
const OPPS_KEY = "skillbridge_industry_opportunities";

export function getIndustryProfile(): IndustryProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveIndustryProfile(profile: IndustryProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearIndustryProfile() {
  localStorage.removeItem(PROFILE_KEY);
}

export function getOpportunities(): Opportunity[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(OPPS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveOpportunity(opportunity: Opportunity) {
  const existing = getOpportunities();
  localStorage.setItem(OPPS_KEY, JSON.stringify([opportunity, ...existing]));
}

export function updateOpportunityStatus(id: string, status: "Active" | "Closed") {
  const existing = getOpportunities();
  const updated = existing.map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem(OPPS_KEY, JSON.stringify(updated));
}

export function deleteOpportunity(id: string) {
  const existing = getOpportunities();
  localStorage.setItem(OPPS_KEY, JSON.stringify(existing.filter((o) => o.id !== id)));
}
