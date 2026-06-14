interface SignalStrengthProps {
  bars: number;
  label: string;
  isListening: boolean;
}

export function SignalStrength({ bars, label, isListening }: SignalStrengthProps) {
  const activeBars = isListening ? bars : 0;
  const activeLabel = isListening ? label : "Mic off";

  return (
    <div className="flex items-center gap-3 min-h-[1.25rem]">
      <span className="text-xs font-medium text-gray-500 shrink-0">Signal</span>
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
      <span className="text-xs text-gray-600 w-[4.75rem] shrink-0">{activeLabel}</span>
    </div>
  );
}
