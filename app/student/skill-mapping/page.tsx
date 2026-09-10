"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { StudentTopNav } from "@/components/student/StudentTopNav";
import { DomainPicker } from "@/components/skill-test/DomainPicker";
import { QuizFlow } from "@/components/skill-test/QuizFlow";
import { ReportView } from "@/components/skill-test/ReportView";
import { SkillTestLoading } from "@/components/skill-test/SkillTestLoading";
import { SkillTestError } from "@/components/skill-test/SkillTestError";
import type {
  AnswerMap,
  GeneratedQuestion,
  GenerateReportRequest,
  GenerateTestRequest,
  GenerateTestResponse,
  SkillDomain,
  SkillMapReport,
} from "@/lib/skill-test/types";

type Step =
  | { kind: "domain" }
  | { kind: "loading-questions" }
  | { kind: "quiz" }
  | { kind: "analyzing" }
  | { kind: "report" }
  | { kind: "error"; message: string; retry: () => void };

export default function SkillMappingPage() {
  const [step, setStep] = useState<Step>({ kind: "domain" });

  // Carried across steps once known.
  const [domainLabel, setDomainLabel] = useState<string>("");
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [report, setReport] = useState<SkillMapReport | null>(null);

  const generateQuestions = useCallback(async (label: string, suggestedSkillTags: string[]) => {
    setStep({ kind: "loading-questions" });
    try {
      const payload: GenerateTestRequest = { domainLabel: label, suggestedSkillTags };
      const res = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to generate the skill test.");
      }
      const data: GenerateTestResponse = await res.json();
      setSkillTags(data.skillTags);
      setQuestions(data.questions);
      setStep({ kind: "quiz" });
    } catch (err) {
      setStep({
        kind: "error",
        message: err instanceof Error ? err.message : "Failed to generate the skill test.",
        retry: () => generateQuestions(label, suggestedSkillTags),
      });
    }
  }, []);

  const handleDomainSelect = useCallback(
    (domain: SkillDomain, customLabel?: string) => {
      const label = domain.id === "custom" ? customLabel ?? "Custom Skill Area" : domain.label;
      setDomainLabel(label);
      generateQuestions(label, domain.suggestedSkillTags ?? []);
    },
    [generateQuestions]
  );

  const generateReport = useCallback(
    async (label: string, tags: string[], qs: GeneratedQuestion[], answers: AnswerMap) => {
      setStep({ kind: "analyzing" });
      try {
        const payload: GenerateReportRequest = { domainLabel: label, skillTags: tags, questions: qs, answers };
        const res = await fetch("/api/generate-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to generate your skill gap report.");
        }
        const data: SkillMapReport = await res.json();
        setReport(data);
        setStep({ kind: "report" });
      } catch (err) {
        setStep({
          kind: "error",
          message: err instanceof Error ? err.message : "Failed to generate your skill gap report.",
          retry: () => generateReport(label, tags, qs, answers),
        });
      }
    },
    []
  );

  const handleQuizComplete = useCallback(
    (answers: AnswerMap) => {
      generateReport(domainLabel, skillTags, questions, answers);
    },
    [domainLabel, skillTags, questions, generateReport]
  );

  const handleRetake = useCallback(() => {
    setDomainLabel("");
    setSkillTags([]);
    setQuestions([]);
    setReport(null);
    setStep({ kind: "domain" });
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <StudentTopNav profile={null} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {step.kind !== "domain" && step.kind !== "error" && (
          <div className="max-w-3xl mx-auto mb-6">
            <Link href="/student" className="text-[12.5px] text-white/40 hover:text-white/70 transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        )}

        {step.kind === "domain" && <DomainPicker onSelect={handleDomainSelect} />}

        {step.kind === "loading-questions" && (
          <SkillTestLoading
            title="Building your skill test"
            subtitle={`Generating questions for ${domainLabel || "your domain"}...`}
          />
        )}

        {step.kind === "quiz" && <QuizFlow questions={questions} onComplete={handleQuizComplete} />}

        {step.kind === "analyzing" && (
          <SkillTestLoading
            title="Analyzing your results"
            subtitle="Scoring your answers and writing your skill gap report..."
          />
        )}

        {step.kind === "report" && report && (
          <ReportView report={report} onRetake={handleRetake} />
        )}

        {step.kind === "error" && <SkillTestError message={step.message} onRetry={step.retry} />}
      </main>
    </div>
  );
}
