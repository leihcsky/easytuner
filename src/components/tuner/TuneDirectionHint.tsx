import type { TuningStatus } from "@/types/tuning";

interface TuneDirectionHintProps {
  status: TuningStatus;
  hasSignal: boolean;
  compact?: boolean;
  variant?: "panel" | "inline";
}

function hintContent(status: TuningStatus, hasSignal: boolean): { label: string; className: string } {
  if (!hasSignal) {
    return {
      label: "Pluck a string",
      className: "bg-amber-50 text-amber-800 border-amber-200",
    };
  }
  if (status === "in-tune") {
    return {
      label: "Locked in ✓",
      className: "bg-brand-50 text-brand-700 border-brand-200",
    };
  }
  if (status === "flat") {
    return {
      label: "Tune up",
      className: "bg-blue-50 text-blue-700 border-blue-200",
    };
  }
  return {
    label: "Tune down",
    className: "bg-orange-50 text-orange-700 border-orange-200",
  };
}

export function TuneDirectionHint({
  status,
  hasSignal,
  compact,
  variant = "panel",
}: TuneDirectionHintProps) {
  const { label, className } = hintContent(status, hasSignal);

  if (variant === "inline") {
    return (
      <p
        className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold mt-2 ${className}`}
        aria-live="polite"
      >
        {label}
      </p>
    );
  }

  const box = compact
    ? "rounded-lg px-2.5 py-2 h-full min-h-[10.5rem] flex flex-col items-center justify-center"
    : "rounded-xl px-4 py-3 h-full min-h-[13rem] flex flex-col items-center justify-center";

  return (
    <div className={`${box} border text-center ${className}`}>
      <p className={`font-semibold ${compact ? "text-sm" : "text-base"}`}>{label}</p>
    </div>
  );
}
