import type { TuningStatus } from "@/types/tuning";

interface TuneDirectionHintProps {
  status: TuningStatus;
  isListening: boolean;
  hasSignal: boolean;
}

export function TuneDirectionHint({ status, isListening, hasSignal }: TuneDirectionHintProps) {
  if (!isListening) {
    return (
      <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
        Direction hints appear once you start tuning
      </div>
    );
  }

  if (!hasSignal) {
    return (
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-center">
        <p className="text-sm font-medium text-amber-800">Pluck the active string</p>
        <p className="text-xs text-amber-700/80 mt-0.5">Play near your microphone for best accuracy</p>
      </div>
    );
  }

  if (status === "in-tune") {
    return (
      <div className="rounded-xl bg-brand-50 border border-brand-200 px-4 py-3 text-center transition-colors duration-300">
        <p className="text-sm font-semibold text-brand-700">Perfect — string locked in!</p>
        <p className="text-xs text-brand-600/80 mt-0.5">Move to the next string</p>
      </div>
    );
  }

  if (status === "flat") {
    return (
      <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-center">
        <p className="text-lg font-bold text-blue-700">Turn Peg ↑</p>
        <p className="text-xs text-blue-600/80 mt-0.5">Too low — tighten the string</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 text-center">
      <p className="text-lg font-bold text-orange-700">Turn Peg ↓</p>
      <p className="text-xs text-orange-600/80 mt-0.5">Too high — loosen the string</p>
    </div>
  );
}
