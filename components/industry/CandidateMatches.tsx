"use client";

import { Opportunity } from "@/lib/industry/types";
import { matchCandidates } from "@/lib/industry/matching";
import { ArrowLeft } from "lucide-react";

export function CandidateMatches({ opportunity, onBack }: { opportunity: Opportunity; onBack: () => void }) {
  const matches = matchCandidates(opportunity);

  return (
    <div>
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-sm text-white/60 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to listings
      </button>
      <h2 className="text-lg font-semibold text-white">Candidates for {opportunity.title}</h2>
      <p className="mb-4 text-xs text-white/40">
        Ranked by skill-test performance against this role's required skills. Demo data — a live system
        would query real student skill profiles instead of a fixed sample.
      </p>

      <div className="space-y-3">
        {matches.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">{c.name}</h3>
                <p className="text-xs text-white/50">{c.branch} · {c.yearOfStudy}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  c.matchScore >= 70
                    ? "bg-emerald-500/15 text-emerald-300"
                    : c.matchScore >= 50
                    ? "bg-amber-500/15 text-amber-300"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {c.matchScore}% match
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.matchedSkills.map((s) => (
                <span key={s} className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                  {s}
                </span>
              ))}
              {c.missingSkills.map((s) => (
                <span key={s} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/30 line-through">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
