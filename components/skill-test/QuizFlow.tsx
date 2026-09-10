"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { AnswerMap, GeneratedQuestion } from "@/lib/skill-test/types";

interface QuizFlowProps {
  questions: GeneratedQuestion[];
  onComplete: (answers: AnswerMap) => void;
}

export function QuizFlow({ questions, onComplete }: QuizFlowProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const question = questions[index];
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;
  const progress = ((index + 1) / questions.length) * 100;

  const selectOption = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const goNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between text-[12px] text-white/40 mb-2">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span className="uppercase tracking-wide text-[10.5px] text-violet-300">{question.skillTag}</span>
      </div>
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-violet-500 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          <h2 className="text-[16.5px] font-medium text-white leading-relaxed mb-6">
            {question.question}
          </h2>

          <div className="space-y-2.5 mb-8">
            {question.options.map((option, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => selectOption(i)}
                  className={`w-full text-left rounded-xl border px-4 py-3.5 text-[13.5px] transition-colors ${
                    isSelected
                      ? "border-violet-400/50 bg-violet-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-white/75 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="inline-flex items-center gap-3">
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected
                          ? "border-violet-400 bg-violet-500 text-white"
                          : "border-white/20 text-white/40"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <button
          onClick={goNext}
          disabled={selected === undefined}
          className="inline-flex items-center gap-1.5 bg-violet-500 hover:bg-violet-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13.5px] font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          {isLast ? "See My Report" : "Next"}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
