import type { TuningStatus } from "@/types/tuning";

interface TuneDirectionHintProps {
  status: TuningStatus;
  isListening: boolean;
  hasSignal: boolean;
  compact?: boolean;
}

export function TuneDirectionHint({ status, isListening, hasSignal, compact }: TuneDirectionHintProps) {
  const box = compact
    ? "rounded-lg px-2.5 py-2 min-h-[8.75rem] h-full flex items-center justify-center"
    : "rounded-xl px-4 py-3 min-h-[13rem] h-full flex items-center justify-center";

  if (!isListening) return null;

  if (!hasSignal) {
    return (
      <div className={`${box} bg-amber-50 border border-amber-200 text-center`}>
        <p className={`font-medium text-amber-800 ${compact ? "text-xs" : "text-sm"}`}>
          Pluck a string
        </p>
      </div>
    );
  }

  if (status === "in-tune") {
    return (
      <div className={`${box} bg-brand-50 border border-brand-200 text-center`}>
        <p className={`font-semibold text-brand-700 ${compact ? "text-xs" : "text-sm"}`}>
          Locked in ✓
        </p>
      </div>
    );
  }

  if (status === "flat") {
    return (
      <div className={`${box} bg-blue-50 border border-blue-200 text-center`}>
        <p className={`font-bold text-blue-700 ${compact ? "text-sm" : "text-lg"}`}>Turn ↑</p>
      </div>
    );
  }

  return (
    <div className={`${box} bg-orange-50 border border-orange-200 text-center`}>
      <p className={`font-bold text-orange-700 ${compact ? "text-sm" : "text-lg"}`}>Turn ↓</p>
    </div>
  );
}
