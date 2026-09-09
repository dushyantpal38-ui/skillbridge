"use client";

import { GraduationCap } from "lucide-react";
import { RoleSignInCard } from "@/components/ui/role-sign-in-card";

export default function StudentLoginPage() {
  return (
    <RoleSignInCard
      roleLabel="Student"
      roleIcon={GraduationCap}
      redirectPath="/student"
      subtitle="Sign in to view your skill gap report and matched opportunities"
    />
  );
}
