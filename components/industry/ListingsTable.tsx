"use client";

import { Opportunity } from "@/lib/industry/types";
import { updateOpportunityStatus, deleteOpportunity } from "@/lib/industry/storage";
import { matchCandidates } from "@/lib/industry/matching";
import { Trash2 } from "lucide-react";

export function ListingsTable({
  opportunities,
  onChange,
  onViewCandidates,
}: {
  opportunities: Opportunity[];
  onChange: () => void;
  onViewCandidates: (opportunity: Opportunity) => void;
}) {
  if (opportunities.length === 0) {
    return <p className="text-white/40 text-sm">No opportunities posted yet.</p>;
  }

  return (
    <div className="space-y-3">
      {opportunities.map((opp) => {
        const matches = matchCandidates(opp).filter((m) => m.matchScore >= 50);
        return (
          <div
            key={opp.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-white">{opp.title}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    opp.status === "Active" ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-white/50"
                  }`}
                >
                  {opp.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/50">
                {opp.type} · {opp.location || "Location not set"} · {opp.requiredSkills.join(", ")}
              </p>
              <button
                onClick={() => onViewCandidates(opp)}
                className="mt-2 text-xs font-medium text-violet-300 hover:text-violet-200"
              >
                {matches.length} matched candidate{matches.length !== 1 ? "s" : ""} →
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  updateOpportunityStatus(opp.id, opp.status === "Active" ? "Closed" : "Active");
                  onChange();
                }}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:border-white/20"
              >
                {opp.status === "Active" ? "Close" : "Reopen"}
              </button>
              <button
                onClick={() => {
                  deleteOpportunity(opp.id);
                  onChange();
                }}
                className="rounded-lg border border-white/10 p-1.5 text-white/40 hover:text-red-400 hover:border-red-400/30"
                aria-label="Delete opportunity"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
