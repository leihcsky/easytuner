import { formatElapsedTime } from "@/lib/format-time";

interface TuningCompleteProps {
  total: number;
  elapsedMs: number;
  onReset: () => void;
  compact?: boolean;
}

export function TuningComplete({ total, elapsedMs, onReset, compact }: TuningCompleteProps) {
  if (compact) {
    return (
      <div className="col-span-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 flex items-center justify-between gap-3 min-h-[2.25rem]">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-brand-700 truncate">
            All {total} strings tuned! ✓
          </p>
          {elapsedMs > 0 && (
            <p className="text-xs text-gray-500 tabular-nums">
              {formatElapsedTime(elapsedMs)}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 text-xs font-medium text-brand-700 hover:text-brand-800 underline"
        >
          Tune again
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 text-center">
      <div className="text-4xl mb-2">🎸</div>
      <h3 className="text-xl font-bold text-gray-900">All {total} Strings Tuned!</h3>
      <p className="mt-2 text-sm text-gray-600">
        Your guitar is ready to play. Great job!
      </p>
      {elapsedMs > 0 && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white border border-brand-200 px-4 py-1.5 text-sm font-medium text-brand-700">
          <span>⏱</span>
          Tuned in {formatElapsedTime(elapsedMs)}
        </p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="mt-4 px-6 py-2.5 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
      >
        Tune Again
      </button>
    </div>
  );
}
