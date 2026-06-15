import type { TunerDisplayMode } from "@/types/tuning";

interface TunerModeToggleProps {
  mode: TunerDisplayMode;
  onChange: (mode: TunerDisplayMode) => void;
}

const modes: { id: TunerDisplayMode; label: string; description: string }[] = [
  { id: "guided", label: "Guided", description: "Step-by-step coach" },
  { id: "pro", label: "Pro", description: "You pick · marks in tune" },
];

export function TunerModeToggle({ mode, onChange }: TunerModeToggleProps) {
  return (
    <nav className="mb-4 flex flex-col gap-0.5 max-w-xs" role="radiogroup" aria-label="Tuner display mode">
      {modes.map((m) => {
        const selected = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(m.id)}
            className={`rounded-md px-2 py-1.5 text-left transition-colors ${
              selected
                ? "bg-brand-600 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span className="block text-xs font-semibold leading-tight">{m.label}</span>
            <span
              className={`block mt-0.5 text-[10px] leading-tight ${
                selected ? "text-white/90" : "text-gray-400"
              }`}
            >
              {m.description}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
