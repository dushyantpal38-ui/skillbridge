"use client";
import { useState } from "react";
import { UserProfile } from "@/lib/skill-test/types";
import { saveProfile, getUserContext } from "@/lib/skill-test/storage";

const initial: UserProfile = {
  yearOfStudy: "2nd Year",
  branch: "",
  selfRating: "Beginner",
  hasProjectExperience: false,
  learningGoal: "Placements",
  weeklyTimeAvailable: "2-5 hrs",
};

export function ProfilingForm({ onNext }: { onNext: (profile: UserProfile) => void }) {
  const existing = getUserContext()?.profile;
  const [profile, setProfile] = useState<UserProfile>(existing ?? initial);

  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function submit() {
    saveProfile(profile);
    onNext(profile);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-white">Quick questions before we build your test</h1>
      <p className="text-white/60 text-sm">This helps the AI calibrate difficulty and won't be asked again.</p>

      <Field label="Year of Study">
        <Select value={profile.yearOfStudy} onChange={(v) => update("yearOfStudy", v as any)}
          options={["1st Year", "2nd Year", "3rd Year", "4th Year"]} />
      </Field>

      <Field label="Branch">
        <input
          value={profile.branch}
          onChange={(e) => update("branch", e.target.value)}
          placeholder="e.g. CSE, ECE, Mechanical"
          className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-white placeholder:text-white/30"
        />
      </Field>

      <Field label="How would you rate yourself in this subject?">
        <Select value={profile.selfRating} onChange={(v) => update("selfRating", v as any)}
          options={["Beginner", "Intermediate", "Advanced"]} />
      </Field>

      <Field label="Have you built any project using this?">
        <div className="flex gap-3">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              onClick={() => update("hasProjectExperience", v)}
              className={`rounded-lg border px-4 py-2 text-sm ${
                profile.hasProjectExperience === v ? "border-[#7c3aed] bg-[#7c3aed]/10 text-white" : "border-white/10 text-white/60"
              }`}
            >
              {v ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </Field>

      {profile.hasProjectExperience && (
        <Field label="Briefly describe it">
          <input
            value={profile.projectDescription ?? ""}
            onChange={(e) => update("projectDescription", e.target.value)}
            placeholder="e.g. Built a REST API for a todo app"
            className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-white placeholder:text-white/30"
          />
        </Field>
      )}

      <Field label="What's your goal?">
        <Select value={profile.learningGoal} onChange={(v) => update("learningGoal", v as any)}
          options={["Placements", "Higher Studies", "Skill Building", "Hackathons"]} />
      </Field>

      <button onClick={submit} className="w-full rounded-xl bg-[#7c3aed] py-3 font-medium text-white">
        Generate My Test
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/80">{label}</label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-2 text-white"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}