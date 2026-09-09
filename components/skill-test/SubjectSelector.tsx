"use client";
import { useState } from "react";
import { SUBJECTS } from "@/lib/skill-test/subjects";
import { Subject } from "@/lib/skill-test/types";

export function SubjectSelector({ onNext }: { onNext: (subject: Subject) => void }) {
  const [selected, setSelected] = useState<Subject | null>(null);
  const categories = [...new Set(SUBJECTS.map((s) => s.category))];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-white">What do you want to map your skills on?</h1>
      <p className="mt-2 text-white/60">Pick one subject. You can test more later.</p>

      {categories.map((cat) => (
        <div key={cat} className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">{cat}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SUBJECTS.filter((s) => s.category === cat).map((s) => (
              <button
                key={s.name}
                onClick={() => setSelected(s.name)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  selected === s.name
                    ? "border-[#7c3aed] bg-[#7c3aed]/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <p className="mt-2 text-sm font-medium text-white">{s.name}</p>
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        disabled={!selected}
        onClick={() => selected && onNext(selected)}
        className="mt-10 w-full rounded-xl bg-[#7c3aed] py-3 font-medium text-white disabled:opacity-30"
      >
        Continue
      </button>
    </div>
  );
}