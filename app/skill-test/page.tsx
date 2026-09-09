"use client";
import { useState } from "react";
import { SubjectSelector } from "@/components/skill-test/SubjectSelector";
import { ProfilingForm } from "@/components/skill-test/ProfilingForm";
import { generateSkillTest } from "@/lib/skill-test/generateTest";
import { Subject, UserProfile, GeneratedTest } from "@/lib/skill-test/types";

type Step = "subject" | "profile" | "generating" | "test";

export default function SkillTestPage() {
  const [step, setStep] = useState<Step>("subject");
  const [subject, setSubject] = useState<Subject | null>(null);
  const [test, setTest] = useState<GeneratedTest | null>(null);

  async function handleProfileSubmit(profile: UserProfile) {
    setStep("generating");
    const generated = await generateSkillTest(subject!, profile);
    setTest(generated);
    setStep("test");
  }

  return (
    <div className="min-h-screen bg-black px-6 py-16">
      {step === "subject" && (
        <SubjectSelector onNext={(s) => { setSubject(s); setStep("profile"); }} />
      )}
      {step === "profile" && <ProfilingForm onNext={handleProfileSubmit} />}
      {step === "generating" && (
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#7c3aed] border-t-transparent" />
          <p className="mt-4 text-white/60">Building a unique {subject} test for you...</p>
        </div>
      )}
      {step === "test" && test && (
        <div className="mx-auto max-w-2xl text-white">
          <p className="text-white/40 text-sm">Test ID: {test.id}</p>
          <h2 className="text-2xl font-bold mt-2">{test.subject} — Skill Test</h2>
        </div>
      )}
    </div>
  );
}