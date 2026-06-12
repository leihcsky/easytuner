interface SignalStrengthProps {
  clarity: number;
  isListening: boolean;
}

function getSignalLevel(clarity: number, isListening: boolean) {
  if (!isListening) return { label: "Microphone off", bars: 0, color: "bg-gray-300" };
  if (clarity >= 0.92) return { label: "Strong", bars: 4, color: "bg-brand-500" };
  if (clarity >= 0.85) return { label: "Good", bars: 3, color: "bg-brand-400" };
  if (clarity >= 0.75) return { label: "Weak — pluck louder", bars: 2, color: "bg-amber-400" };
  return { label: "No signal — pluck a string", bars: 1, color: "bg-gray-300" };
}

export function SignalStrength({ clarity, isListening }: SignalStrengthProps) {
  const signal = getSignalLevel(clarity, isListening);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-gray-500 shrink-0">Signal</span>
      <div className="flex items-end gap-1 h-4">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-1.5 rounded-sm transition-colors ${
              bar <= signal.bars ? signal.color : "bg-gray-200"
            }`}
            style={{ height: `${bar * 25}%` }}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600">{signal.label}</span>
    </div>
  );
}
