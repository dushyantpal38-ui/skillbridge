"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { RoleSignInCard } from "@/components/ui/role-sign-in-card";

export default function IndustryLoginPage() {
  return (
    <div>
      <RoleSignInCard
        roleLabel="Industry"
        roleIcon={Building2}
        redirectPath="/industry"
        subtitle="Sign in to access your student talent pipeline"
      />
      <div className="relative z-20 -mt-16 text-center">
        <Link href="/industry/signup" className="text-sm text-white/50 hover:text-white/80">
          New company? Register &amp; get verified →
        </Link>
      </div>
    </div>
  );
}
