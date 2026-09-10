"use client";
import React from "react";
import { AlertCircle, RotateCw } from "lucide-react";

interface SkillTestErrorProps {
  message: string;
  onRetry: () => void;
}

export function SkillTestError({ message, onRetry }: SkillTestErrorProps) {
  return (
    <div className="max-w-sm mx-auto text-center py-20">
      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-5 h-5 text-amber-400" />
      </div>
      <h2 className="text-[15px] font-medium text-white mb-1.5">Something went wrong</h2>
      <p className="text-[13.5px] text-white/50 leading-relaxed mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 bg-violet-500 hover:bg-violet-400 text-white text-[13.5px] font-medium px-4 py-2.5 rounded-lg transition-colors"
      >
        <RotateCw className="w-3.5 h-3.5" />
        Try again
      </button>
    </div>
  );
}
