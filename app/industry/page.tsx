"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, CheckCircle2, AlertTriangle, Briefcase, Users, ListChecks } from "lucide-react";
import { IndustryProfile, Opportunity } from "@/lib/industry/types";
import { getIndustryProfile, getOpportunities } from "@/lib/industry/storage";
import { matchCandidates } from "@/lib/industry/matching";
import { PostOpportunityForm } from "@/components/industry/PostOpportunityForm";
import { ListingsTable } from "@/components/industry/ListingsTable";
import { CandidateMatches } from "@/components/industry/CandidateMatches";

type Tab = "overview" | "post" | "listings";

export default function IndustryPage() {
  const [profile, setProfile] = useState<IndustryProfile | null | undefined>(undefined);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [tab, setTab] = useState<Tab>("overview");
  const [viewingCandidatesFor, setViewingCandidatesFor] = useState<Opportunity | null>(null);

  useEffect(() => {
    setProfile(getIndustryProfile());
    setOpportunities(getOpportunities());
  }, []);

  function refreshOpportunities() {
    setOpportunities(getOpportunities());
  }

  if (profile === undefined) return null;

  if (!profile) {
    return (
      <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-90 pointer-events-none"
          style={{ background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #8C6BFA 100%)" }}
        />
        <div className="relative z-10 max-w-xl flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-400/20 mb-6 text-violet-300">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Industry Dashboard</h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-8">
            Register your company to start posting internships and jobs to verified student talent.
          </p>
          <Link
            href="/industry/signup"
            className="rounded-xl bg-[#7c3aed] px-6 py-3 font-medium text-white hover:bg-[#6d28d9] transition-colors"
          >
            Register your company
          </Link>
        </div>
      </main>
    );
  }

  const activeCount = opportunities.filter((o) => o.status === "Active").length;
  const totalApplicants = opportunities.reduce(
    (sum, o) => sum + matchCandidates(o).filter((m) => m.matchScore >= 50).length,
    0
  );

  return (
    <main className="min-h-screen w-full bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/15 text-violet-300">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{profile.companyName}</h1>
              <p className="flex items-center gap-1 text-xs text-white/50">
                {profile.verification === "verified" ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Verified employer
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" /> Verification pending
                  </>
                )}
              </p>
            </div>
          </div>
          <Link href="/" className="text-sm text-white/60 hover:text-white">
            ← Back to Home
          </Link>
        </header>

        {profile.verification === "unverified" && (
          <div className="mb-6 rounded-xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-200">
            Your listings won't be visible to students until your account is verified. Sign up again
            using an email that matches your company's website domain.
          </div>
        )}

        <div className="mb-6 grid grid-cols-3 gap-4">
          <StatCard icon={Briefcase} label="Active postings" value={activeCount} />
          <StatCard icon={Users} label="Matched candidates" value={totalApplicants} />
          <StatCard icon={ListChecks} label="Total postings" value={opportunities.length} />
        </div>

        {viewingCandidatesFor ? (
          <CandidateMatches opportunity={viewingCandidatesFor} onBack={() => setViewingCandidatesFor(null)} />
        ) : (
          <>
            <div className="mb-6 flex gap-2 border-b border-white/10">
              {(
                [
                  ["overview", "Overview"],
                  ["post", "Post opportunity"],
                  ["listings", "My listings"],
                ] as [Tab, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    tab === key ? "border-[#7c3aed] text-white" : "border-transparent text-white/50 hover:text-white/80"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "overview" && (
              <div className="space-y-3">
                <p className="text-white/60 text-sm">
                  {opportunities.length === 0
                    ? "You haven't posted any opportunities yet. Head to \"Post opportunity\" to get started."
                    : "Here's a quick look at your most recent postings."}
                </p>
                <ListingsTable
                  opportunities={opportunities.slice(0, 3)}
                  onChange={refreshOpportunities}
                  onViewCandidates={setViewingCandidatesFor}
                />
              </div>
            )}

            {tab === "post" && (
              <PostOpportunityForm
                onPosted={() => {
                  refreshOpportunities();
                  setTab("listings");
                }}
              />
            )}

            {tab === "listings" && (
              <ListingsTable opportunities={opportunities} onChange={refreshOpportunities} onViewCandidates={setViewingCandidatesFor} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <Icon className="h-4 w-4 text-violet-300" />
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="text-xs text-white/50">{label}</p>
    </div>
  );
}
