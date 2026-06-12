import { getNoteDisplay, getStringLabel } from "@/lib/notes";
import type { StringTuneState } from "@/types/tuning";

interface GuitarHeadstockProps {
  notes: string[];
  activeString: number;
  stringStates: StringTuneState[];
  liveState?: StringTuneState;
  onSelectString: (index: number) => void;
  stringLabelMode?: "note" | "number";
}

const stateStyles: Record<StringTuneState, string> = {
  untuned: "bg-gray-200 border-gray-300",
  close: "bg-amber-100 border-amber-400 ring-amber-200",
  "in-tune": "bg-brand-100 border-brand-500 ring-brand-200",
};

const pegStyles: Record<StringTuneState, string> = {
  untuned: "bg-gray-300",
  close: "bg-amber-400",
  "in-tune": "bg-brand-500",
};

export function GuitarHeadstock({
  notes,
  activeString,
  stringStates,
  liveState,
  onSelectString,
  stringLabelMode = "number",
}: GuitarHeadstockProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-amber-50 to-amber-100/80 p-4">
      <p className="text-xs font-medium text-amber-900/60 mb-3 text-center uppercase tracking-wide">
        Headstock
      </p>
      <div className="space-y-2">
        {notes.map((note, index) => {
          const isActive = activeString === index;
          const persisted = stringStates[index];
          const displayState =
            isActive && liveState && persisted !== "in-tune" ? liveState : persisted;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectString(index)}
              aria-label={`Select ${getStringLabel(index, notes.length)}`}
              aria-current={isActive ? "true" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg border-2 px-3 py-2 transition-all ${stateStyles[displayState]} ${
                isActive ? "ring-2 ring-brand-400 ring-offset-1 shadow-sm" : "hover:opacity-90"
              }`}
            >
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${pegStyles[displayState]}`}
              />
              <span className="w-14 text-left text-xs font-semibold text-gray-700">
                {stringLabelMode === "number"
                  ? getStringLabel(index, notes.length)
                  : getNoteDisplay(note)}
              </span>
              <span className="h-0.5 flex-1 rounded bg-gray-400/50" />
              {displayState === "in-tune" ? (
                <span className="text-brand-600 text-sm font-bold">✓</span>
              ) : isActive ? (
                <span className="text-xs font-medium text-brand-700">●</span>
              ) : (
                <span className="w-3" />
              )}
              <span className="sr-only">{getNoteDisplay(note)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
