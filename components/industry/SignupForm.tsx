"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, CheckCircle2, AlertTriangle } from "lucide-react";
import { IndustryProfile, CompanySize } from "@/lib/industry/types";
import { verifyIndustryDomain } from "@/lib/industry/verify";
import { saveIndustryProfile } from "@/lib/industry/storage";

const initial = {
  companyName: "",
  website: "",
  contactName: "",
  designation: "",
  officialEmail: "",
  industryType: "",
  companySize: "11-50" as CompanySize,
};

export function IndustrySignupForm() {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState<"verified" | "unverified" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const isComplete =
    form.companyName && form.website && form.contactName && form.officialEmail && form.industryType;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete) return;
    setSubmitting(true);

    const verification = verifyIndustryDomain(form.officialEmail, form.website) ? "verified" : "unverified";

    const profile: IndustryProfile = {
      ...form,
      verification,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      saveIndustryProfile(profile);
      setResult(verification);
      setSubmitting(false);
    }, 700);
  }

  if (result) {
    return (
      <div className="mx-auto max-w-md text-center text-white">
        {result === "verified" ? (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
            <h2 className="text-xl font-bold">You're verified</h2>
            <p className="mt-2 text-white/60 text-sm">
              {form.officialEmail.split("@")[1]} matches your company website, so your account is
              marked as a verified employer right away.
            </p>
          </>
        ) : (
          <>
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-amber-400" />
            <h2 className="text-xl font-bold">Account created — verification pending</h2>
            <p className="mt-2 text-white/60 text-sm">
              We couldn't confirm that {form.officialEmail.split("@")[1] || "your email"} belongs to{" "}
              {form.website || "your company's website"}. Your listings will stay hidden from students
              until this is resolved — try signing up again with your official work email.
            </p>
          </>
        )}
        <button
          onClick={() => router.push("/industry")}
          className="mt-6 w-full rounded-xl bg-[#7c3aed] py-3 font-medium text-white"
        >
          Go to dashboard
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/15 text-violet-300">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Register your company</h1>
          <p className="text-sm text-white/60">Verified employers can post internships and jobs to students.</p>
        </div>
      </div>

      <Field label="Company name">
        <TextInput value={form.companyName} onChange={(v) => update("companyName", v)} placeholder="Acme Technologies Pvt. Ltd." />
      </Field>

      <Field label="Company website" hint="Used to auto-verify your official email domain">
        <TextInput value={form.website} onChange={(v) => update("website", v)} placeholder="acmetech.com" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Your name">
          <TextInput value={form.contactName} onChange={(v) => update("contactName", v)} placeholder="Contact person" />
        </Field>
        <Field label="Designation">
          <TextInput value={form.designation} onChange={(v) => update("designation", v)} placeholder="HR Manager" />
        </Field>
      </div>

      <Field label="Official work email" hint="Must match your company domain, not gmail/yahoo/etc.">
        <TextInput type="email" value={form.officialEmail} onChange={(v) => update("officialEmail", v)} placeholder="hr@acmetech.com" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Industry type">
          <TextInput value={form.industryType} onChange={(v) => update("industryType", v)} placeholder="e.g. IT Services, Fintech" />
        </Field>
        <Field label="Company size">
          <select
            value={form.companySize}
            onChange={(e) => update("companySize", e.target.value as CompanySize)}
            className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-2 text-white"
          >
            {(["1-10", "11-50", "51-200", "201-500", "500+"] as CompanySize[]).map((s) => (
              <option key={s} value={s}>{s} employees</option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        disabled={!isComplete || submitting}
        className="w-full rounded-xl bg-[#7c3aed] py-3 font-medium text-white disabled:opacity-40"
      >
        {submitting ? "Verifying..." : "Create account"}
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

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-white placeholder:text-white/30"
    />
  );
}
