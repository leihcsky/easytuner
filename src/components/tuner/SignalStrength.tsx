interface SignalStrengthProps {
  bars: number;
  label: string;
  isListening: boolean;
  className?: string;
  /** Show the "Signal" label prefix (hidden on compact mobile bar). */
  showTitle?: boolean;
}

export function SignalStrength({
  bars,
  label,
  isListening,
  className = "",
  showTitle = true,
}: SignalStrengthProps) {
  const activeBars = isListening ? bars : 0;

  return (
    <div className={`flex items-center gap-1.5 sm:gap-3 min-h-[1.25rem] ${className}`}>
      {showTitle && (
        <span className="text-xs font-medium text-gray-500 shrink-0">Signal</span>
      )}
      <div className="flex items-end gap-1 h-4 shrink-0">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-1.5 rounded-sm transition-colors duration-500 ${
              bar <= activeBars ? "bg-brand-500" : "bg-gray-200"
            }`}
            style={{ height: `${bar * 25}%` }}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600 truncate min-w-0">{label}</span>
    </div>
  );
}
