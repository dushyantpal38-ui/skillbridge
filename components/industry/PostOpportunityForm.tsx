"use client";

import { useState } from "react";
import { SUBJECTS } from "@/lib/skill-test/subjects";
import { Subject } from "@/lib/skill-test/types";
import { Opportunity, OpportunityType, SkillLevel } from "@/lib/industry/types";
import { saveOpportunity } from "@/lib/industry/storage";

const initial = {
  title: "",
  type: "Internship" as OpportunityType,
  requiredSkills: [] as Subject[],
  minSkillLevel: "Intermediate" as SkillLevel,
  location: "",
  isRemote: false,
  stipendOrCTC: "",
  duration: "",
  applicationDeadline: "",
  description: "",
};

export function PostOpportunityForm({ onPosted }: { onPosted: () => void }) {
  const [form, setForm] = useState(initial);

  function update<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleSkill(skill: Subject) {
    setForm((f) => ({
      ...f,
      requiredSkills: f.requiredSkills.includes(skill)
        ? f.requiredSkills.filter((s) => s !== skill)
        : [...f.requiredSkills, skill],
    }));
  }

  const isComplete = form.title && form.requiredSkills.length > 0 && form.applicationDeadline;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete) return;

    const opportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      ...form,
      postedAt: new Date().toISOString(),
      status: "Active",
    };
    saveOpportunity(opportunity);
    setForm(initial);
    onPosted();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Title">
          <TextInput value={form.title} onChange={(v) => update("title", v)} placeholder="Frontend Developer Intern" />
        </Field>
        <Field label="Type">
          <select
            value={form.type}
            onChange={(e) => update("type", e.target.value as OpportunityType)}
            className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-2 text-white"
          >
            {(["Internship", "Full-Time", "Placement Drive"] as OpportunityType[]).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Required skills" hint="Pulled from the same taxonomy used in student skill tests">
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => {
            const active = form.requiredSkills.includes(s.name);
            return (
              <button
                type="button"
                key={s.name}
                onClick={() => toggleSkill(s.name)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  active ? "border-[#7c3aed] bg-[#7c3aed]/15 text-white" : "border-white/10 text-white/60 hover:border-white/20"
                }`}
              >
                {s.icon} {s.name}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Minimum skill level required">
        <div className="flex gap-3">
          {(["Beginner", "Intermediate", "Advanced"] as SkillLevel[]).map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => update("minSkillLevel", level)}
              className={`rounded-lg border px-4 py-2 text-sm ${
                form.minSkillLevel === level ? "border-[#7c3aed] bg-[#7c3aed]/10 text-white" : "border-white/10 text-white/60"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Location">
          <TextInput value={form.location} onChange={(v) => update("location", v)} placeholder="Bengaluru" />
        </Field>
        <Field label="Remote?">
          <div className="flex gap-3">
            {[true, false].map((v) => (
              <button
                type="button"
                key={String(v)}
                onClick={() => update("isRemote", v)}
                className={`rounded-lg border px-4 py-2 text-sm ${
                  form.isRemote === v ? "border-[#7c3aed] bg-[#7c3aed]/10 text-white" : "border-white/10 text-white/60"
                }`}
              >
                {v ? "Remote" : "On-site"}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Stipend / CTC">
          <TextInput value={form.stipendOrCTC} onChange={(v) => update("stipendOrCTC", v)} placeholder="₹25,000/month" />
        </Field>
        <Field label="Duration">
          <TextInput value={form.duration} onChange={(v) => update("duration", v)} placeholder="6 months" />
        </Field>
      </div>

      <Field label="Application deadline">
        <input
          type="date"
          value={form.applicationDeadline}
          onChange={(e) => update("applicationDeadline", e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-white [color-scheme:dark]"
        />
      </Field>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          placeholder="What will the student work on?"
          className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-white placeholder:text-white/30"
        />
      </Field>

      <button
        type="submit"
        disabled={!isComplete}
        className="w-full rounded-xl bg-[#7c3aed] py-3 font-medium text-white disabled:opacity-40"
      >
        Post opportunity
      </button>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/80">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-white placeholder:text-white/30"
    />
  );
}
