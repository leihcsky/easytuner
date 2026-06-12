import type { TunerDisplayMode } from "@/types/tuning";

interface TunerModeToggleProps {
  mode: TunerDisplayMode;
  onChange: (mode: TunerDisplayMode) => void;
}

const modes: { id: TunerDisplayMode; label: string; description: string }[] = [
  { id: "guided", label: "Guide", description: "Step-by-step headstock coach" },
  { id: "pro", label: "Pro", description: "Strobe precision display" },
];

export function TunerModeToggle({ mode, onChange }: TunerModeToggleProps) {
  return (
    <div className="mb-4">
      <div className="inline-flex w-full sm:w-auto rounded-xl border border-gray-200 bg-gray-100 p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === m.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="block">{m.label}</span>
            <span className="hidden sm:block text-xs font-normal text-gray-500 mt-0.5">
              {m.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
