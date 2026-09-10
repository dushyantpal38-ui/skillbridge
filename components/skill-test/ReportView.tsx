"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, RotateCw } from "lucide-react";
import type { SkillMapReport } from "@/lib/skill-test/types";

interface ReportViewProps {
  report: SkillMapReport;
  onRetake: () => void;
}

export function ReportView({ report, onRetake }: ReportViewProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (report.overallScore / 100) * circumference;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Score header */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#8C6BFA"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-display font-semibold text-white">{report.overallScore}</span>
            <span className="text-[10px] text-white/40 tracking-wide">SCORE</span>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-[11px] uppercase tracking-wide text-violet-300 mb-1">{report.domainLabel}</p>
          <h1 className="font-display text-xl sm:text-2xl font-medium text-white mb-2">Your Skill Map</h1>
          <p className="text-[13.5px] text-white/60 leading-relaxed max-w-md">{report.overallSummary}</p>
        </div>
      </div>

      {/* Skill breakdown */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <h2 className="text-[13px] font-medium text-white/70 mb-4">Skill Breakdown</h2>
        <div className="space-y-3.5">
          {report.skillBreakdown.map((item) => (
            <div key={item.skill}>
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="text-white/85">{item.skill}</span>
                <span className="text-white/45">
                  {item.correct}/{item.total} · {item.percent}%
                </span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-violet-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Strengths */}
        {report.strengths.length > 0 && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
            <h2 className="text-[13px] font-medium text-emerald-200 mb-4">Strengths</h2>
            <div className="space-y-3">
              {report.strengths.map((s) => (
                <div key={s.skill} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] text-white/85">{s.skill}</div>
                    <div className="text-[12px] text-white/50">{s.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gaps with next steps — the "gap to action" element */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
          <h2 className="text-[13px] font-medium text-amber-200 mb-4">Gaps to Close</h2>
          <div className="space-y-4">
            {report.gaps.map((gap) => (
              <div key={gap.skill}>
                <div className="flex items-center justify-between text-[13px] mb-1">
                  <span className="text-white/85">{gap.skill}</span>
                  <span className="text-white/40">{gap.currentLevel}%</span>
                </div>
                <p className="text-[12px] text-white/55 leading-relaxed mb-1.5">{gap.nextStep}</p>
                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-amber-300">
                  {gap.actionLabel}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended focus order */}
      {report.recommendedFocus.length > 0 && (
        <div className="rounded-2xl border border-violet-400/20 bg-violet-500/[0.04] p-5">
          <h2 className="text-[13px] font-medium text-violet-200 mb-3">Recommended Focus Order</h2>
          <ol className="space-y-1.5">
            {report.recommendedFocus.map((item, i) => (
              <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-white/80">
                <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-300 text-[11px] flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href="/student"
          className="inline-flex items-center gap-1.5 bg-violet-500 hover:bg-violet-400 text-white text-[13.5px] font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Back to Dashboard
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-1.5 border border-white/15 hover:bg-white/5 text-white text-[13.5px] font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
          Map a different skill
        </button>
      </div>
    </div>
  );
}
