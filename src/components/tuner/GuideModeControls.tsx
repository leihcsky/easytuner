interface GuideModeControlsProps {
  guideMode: boolean;
  autoDetect: boolean;
  soundEnabled: boolean;
  onGuideModeChange: (value: boolean) => void;
  onAutoDetectChange: (value: boolean) => void;
  onSoundChange: (value: boolean) => void;
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 hover:bg-gray-100/80 transition-colors">
      <span>
        <span className="block text-sm font-medium text-gray-900">{label}</span>
        <span className="block text-xs text-gray-500">{description}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-brand-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

export function GuideModeControls({
  guideMode,
  autoDetect,
  soundEnabled,
  onGuideModeChange,
  onAutoDetectChange,
  onSoundChange,
}: GuideModeControlsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
      <Toggle
        label="Guide Me"
        description="Auto-advance to the next string"
        checked={guideMode}
        onChange={onGuideModeChange}
      />
      <Toggle
        label="Auto-detect"
        description="Recognize which string you pluck"
        checked={autoDetect}
        onChange={onAutoDetectChange}
      />
      <Toggle
        label="Sound"
        description="Chime when a string is in tune"
        checked={soundEnabled}
        onChange={onSoundChange}
      />
    </div>
  );
}
