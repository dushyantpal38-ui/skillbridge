"use client";

import { Building2 } from "lucide-react";
import { RoleSignInCard } from "@/components/ui/role-sign-in-card";

export default function IndustryLoginPage() {
  return (
    <RoleSignInCard
      roleLabel="Industry"
      roleIcon={Building2}
      redirectPath="/industry"
      subtitle="Sign in to access your student talent pipeline"
    />
  );
}
