interface AutoAdvanceToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  className?: string;
}

export function AutoAdvanceToggle({
  enabled,
  onChange,
  className = "",
}: AutoAdvanceToggleProps) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Auto-advance strings"
        onClick={() => onChange(!enabled)}
        className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
          enabled ? "bg-brand-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
      <div className="min-w-0 pointer-events-none select-none">
        <span className="block text-xs font-semibold text-gray-800 leading-tight">
          Auto-advance strings
        </span>
        <span className="block mt-0.5 text-[10px] text-gray-400 leading-snug">
          Move to the next string after each ✓
        </span>
      </div>
    </div>
  );
}
