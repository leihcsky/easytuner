interface ReferenceLoopToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function ReferenceLoopToggle({ enabled, onChange }: ReferenceLoopToggleProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Loop reference tone"
        onClick={() => onChange(!enabled)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          enabled ? "bg-brand-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-[11px] text-gray-500">
        Loop <span className="text-gray-400">· tap 🔊 again to stop</span>
      </span>
    </label>
  );
}
