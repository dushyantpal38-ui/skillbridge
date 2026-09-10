"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SKILL_DOMAINS, CUSTOM_DOMAIN } from "@/lib/skill-test/domains";
import type { SkillDomain } from "@/lib/skill-test/types";

interface DomainPickerProps {
  onSelect: (domain: SkillDomain, customLabel?: string) => void;
}

export function DomainPicker({ onSelect }: DomainPickerProps) {
  const [customText, setCustomText] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 border border-violet-400/30 bg-violet-500/10 rounded-full px-3 py-1 text-[11px] text-violet-300 mb-4">
          <Sparkles className="w-3 h-3" />
          AI-generated assessment
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-white mb-2">
          What should we map first?
        </h1>
        <p className="text-[14px] text-white/50 max-w-md mx-auto">
          Pick a domain and we'll generate a short, adaptive skill test on the spot — then turn your
          results into a real gap report.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        {SKILL_DOMAINS.map((domain, i) => (
          <motion.button
            key={domain.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(domain)}
            className="group text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:border-violet-400/40 hover:bg-white/[0.05] p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[14.5px] font-medium text-white mb-1">{domain.label}</h3>
              <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-violet-300 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-[12.5px] text-white/45 leading-relaxed">{domain.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Custom domain */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: SKILL_DOMAINS.length * 0.05 }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
      >
        {!showCustomInput ? (
          <button
            onClick={() => setShowCustomInput(true)}
            className="w-full text-left flex items-center justify-between group"
          >
            <div>
              <h3 className="text-[14.5px] font-medium text-white mb-1">{CUSTOM_DOMAIN.label}</h3>
              <p className="text-[12.5px] text-white/45">{CUSTOM_DOMAIN.description}</p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-violet-300 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customText.trim()) onSelect(CUSTOM_DOMAIN, customText.trim());
            }}
          >
            <label htmlFor="custom-domain" className="text-[13px] font-medium text-white/80 mb-2 block">
              Describe the skill area
            </label>
            <div className="flex gap-2">
              <input
                id="custom-domain"
                autoFocus
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. Embedded Systems, UX Research, Digital Marketing..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13.5px] text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400/40 focus:bg-white/[0.07] transition-colors"
              />
              <button
                type="submit"
                disabled={!customText.trim()}
                className="flex-shrink-0 bg-violet-500 hover:bg-violet-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Start
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
