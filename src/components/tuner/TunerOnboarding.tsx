"use client";

import { useEffect, useState } from "react";
import { hasCompletedOnboarding, markOnboardingComplete } from "@/lib/tuner-storage";
import type { TuningStatus } from "@/types/tuning";

interface TunerOnboardingProps {
  isListening: boolean;
  hasSignal: boolean;
  status: TuningStatus;
}

const STEPS = [
  {
    title: "Allow microphone access",
    body: "Tap Enable Microphone below and approve access in your browser.",
  },
  {
    title: "Pluck the 6th string",
    body: "Play the thickest (lowest) string clearly near your device.",
  },
  {
    title: "Turn the tuning peg",
    body: "Follow the Turn Peg ↑ or ↓ hint until the string turns green.",
  },
];

export function TunerOnboarding({ isListening, hasSignal, status }: TunerOnboardingProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setVisible(!hasCompletedOnboarding());
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (step === 0 && isListening) setStep(1);
    if (step === 1 && hasSignal) setStep(2);
    if (step === 2 && (status === "flat" || status === "sharp" || status === "in-tune")) {
      finish();
    }
  }, [visible, step, isListening, hasSignal, status]);

  const finish = () => {
    markOnboardingComplete();
    setVisible(false);
  };

  if (!visible) return null;

  const current = STEPS[step];

  return (
    <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50/80 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-brand-700 uppercase tracking-wide mb-1">
            Quick start · Step {step + 1} of {STEPS.length}
          </p>
          <h3 className="text-base font-bold text-gray-900">{current.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{current.body}</p>
        </div>
        <button
          type="button"
          onClick={finish}
          className="text-xs text-gray-500 hover:text-gray-700 shrink-0"
        >
          Skip
        </button>
      </div>
      <div className="flex gap-1.5 mt-4">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-brand-500" : "bg-brand-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
