import type { TunerDisplayMode } from "@/types/tuning";

interface TunerModeSwitchProps {
  displayMode: TunerDisplayMode;
  onDisplayModeChange: (mode: TunerDisplayMode) => void;
  className?: string;
}

const MODES: { id: TunerDisplayMode; label: string; description: string }[] = [
  {
    id: "guided",
    label: "Guided",
    description: "Step-by-step coach",
  },
  {
    id: "pro",
    label: "Pro",
    description: "You pick · marks in tune",
  },
];

export function TunerModeSwitch({
  displayMode,
  onDisplayModeChange,
  className = "",
}: TunerModeSwitchProps) {
  return (
    <nav
      className={`flex flex-col gap-0.5 ${className}`}
      role="radiogroup"
      aria-label="Tuner display mode"
    >
      {MODES.map(({ id, label, description }) => {
        const selected = displayMode === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onDisplayModeChange(id)}
            className={`rounded-md px-2 py-1.5 text-left transition-colors ${
              selected
                ? "bg-brand-600 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span className="block text-xs font-semibold leading-tight">{label}</span>
            <span
              className={`block mt-0.5 text-[10px] leading-tight ${
                selected ? "text-white/90" : "text-gray-400"
              }`}
            >
              {description}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
