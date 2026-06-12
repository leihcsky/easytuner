interface TuningProgressBarProps {
  tunedCount: number;
  total: number;
}

export function TuningProgressBar({ tunedCount, total }: TuningProgressBarProps) {
  const percent = total > 0 ? (tunedCount / total) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900">Tuning Progress</span>
        <span className="text-sm font-medium text-brand-600">
          {tunedCount} / {total} strings in tune
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      {tunedCount === total && total > 0 && (
        <p className="mt-2 text-sm font-medium text-brand-600 text-center">
          All strings tuned — ready to play!
        </p>
      )}
    </div>
  );
}
