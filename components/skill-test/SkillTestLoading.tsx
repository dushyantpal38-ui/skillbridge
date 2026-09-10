"use client";
import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface SkillTestLoadingProps {
  title: string;
  subtitle: string;
}

export function SkillTestLoading({ title, subtitle }: SkillTestLoadingProps) {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <motion.div
        className="w-12 h-12 rounded-full border border-violet-400/30 bg-violet-500/10 flex items-center justify-center mx-auto mb-5"
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-5 h-5 text-violet-300" />
      </motion.div>
      <h2 className="text-[15px] font-medium text-white mb-1.5">{title}</h2>
      <p className="text-[13px] text-white/45">{subtitle}</p>
    </div>
  );
}
