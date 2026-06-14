interface TuningProgressBarProps {
  tunedCount: number;
  total: number;
  compact?: boolean;
}

export function TuningProgressBar({ tunedCount, total, compact }: TuningProgressBarProps) {
  const percent = total > 0 ? (tunedCount / total) * 100 : 0;

  return (
    <div className={compact ? "mb-2" : "mb-6"}>
      <div className={`flex items-center justify-between ${compact ? "mb-1" : "mb-2"}`}>
        <span className={`font-semibold text-gray-900 ${compact ? "text-xs" : "text-sm"}`}>
          {compact ? "Progress" : "Tuning Progress"}
        </span>
        <span className={`font-medium text-brand-600 ${compact ? "text-xs" : "text-sm"}`}>
          {tunedCount}/{total}
        </span>
      </div>
      <div className={`w-full rounded-full bg-gray-100 overflow-hidden ${compact ? "h-1.5" : "h-2.5"}`}>
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      {!compact && tunedCount === total && total > 0 && (
        <p className="mt-2 text-sm font-medium text-brand-600 text-center">
          All strings tuned — ready to play!
        </p>
      )}
    </div>
  );
}
