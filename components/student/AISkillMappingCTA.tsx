"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function AISkillMappingCTA() {
  return (
    <Link
      href="/student/skill-mapping"
      className="group relative block rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/[0.08] via-white/[0.02] to-transparent hover:border-violet-400/40 p-6 sm:p-7 overflow-hidden transition-colors"
    >
      <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-violet-500/15 blur-[90px] rounded-full" />
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-400/25 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-violet-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[15px] font-medium text-white">Map Your Current Skill</h3>
              <span className="text-[10px] uppercase tracking-wide text-violet-300 border border-violet-400/30 bg-violet-500/10 rounded-full px-2 py-0.5">
                AI-powered
              </span>
            </div>
            <p className="text-[13px] text-white/55 leading-relaxed max-w-md">
              Pick any skill area and get an AI-generated test on the spot — then a real gap report with
              concrete next steps, in under 5 minutes.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 flex-shrink-0 bg-violet-500 group-hover:bg-violet-400 text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap">
          Start Mapping
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
