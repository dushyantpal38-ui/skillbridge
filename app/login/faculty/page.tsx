"use client";

import { Users } from "lucide-react";
import { RoleSignInCard } from "@/components/ui/role-sign-in-card";

export default function FacultyLoginPage() {
  return (
    <RoleSignInCard
      roleLabel="Faculty"
      roleIcon={Users}
      redirectPath="/faculty"
      subtitle="Sign in to find FDPs and industrial exposure programs"
    />
  );
}
