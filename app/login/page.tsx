"use client";
import React, { useCallback, useEffect, useState } from "react";
import { getMockStudentDashboard } from "@/lib/student/mock-data";
import type { DashboardFetchState } from "@/lib/student/types";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { StudentTopNav } from "@/components/student/StudentTopNav";
import { ReadinessScore } from "@/components/student/ReadinessScore";
import { AISkillMappingCTA } from "@/components/student/AISkillMappingCTA";
import { SkillOverview } from "@/components/student/SkillOverview";
import { RecommendedOpportunities } from "@/components/student/RecommendedOpportunities";
import { ProgressActivity } from "@/components/student/ProgressActivity";
import { QuickActions } from "@/components/student/QuickActions";
import { DashboardSkeleton } from "@/components/student/DashboardSkeleton";
import { DashboardError } from "@/components/student/DashboardError";

function StudentDashboardContent() {
  const [state, setState] = useState<DashboardFetchState>({ status: "loading" });

  const load = useCallback(() => {
    setState({ status: "loading" });
    getMockStudentDashboard()
      .then((data) => setState({ status: "ready", data }))
      .catch(() =>
        setState({
          status: "error",
          message: "We ran into a problem reaching your dashboard data. Your connection or our servers might be having a moment.",
        })
      );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen bg-black">
      <StudentTopNav profile={state.status === "ready" ? state.data.profile : null} />

      {state.status === "loading" && <DashboardSkeleton />}

      {state.status === "error" && <DashboardError message={state.message} onRetry={load} />}

      {state.status === "ready" && (
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
          <ReadinessScore profile={state.data.profile} />
          <AISkillMappingCTA />
          <SkillOverview skills={state.data.skills} gaps={state.data.gaps} />
          <RecommendedOpportunities opportunities={state.data.opportunities} />
          <ProgressActivity
            applications={state.data.applications}
            portfolio={state.data.portfolio}
            learning={state.data.learning}
          />
          <QuickActions />
        </main>
      )}
    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRole="student">
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}
