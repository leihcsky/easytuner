import type { ReactNode } from "react";
import type { TunerDisplayMode } from "@/types/tuning";

interface TunerSidebarProps {
  tuningSelector: ReactNode;
  displayMode: TunerDisplayMode;
  onDisplayModeChange: (mode: TunerDisplayMode) => void;
  guideMode: boolean;
  autoDetect: boolean;
  soundEnabled: boolean;
  onGuideModeChange: (v: boolean) => void;
  onAutoDetectChange: (v: boolean) => void;
  onSoundChange: (v: boolean) => void;
  showGuideControls: boolean;
}

function MiniToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 py-1.5 text-xs cursor-pointer">
      <span className="text-gray-700 font-medium">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-brand-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

export function TunerSidebar({
  tuningSelector,
  displayMode,
  onDisplayModeChange,
  guideMode,
  autoDetect,
  soundEnabled,
  onGuideModeChange,
  onAutoDetectChange,
  onSoundChange,
  showGuideControls,
}: TunerSidebarProps) {
  return (
    <aside className="w-full lg:w-44 shrink-0 space-y-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Tuning
        </p>
        {tuningSelector}
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Mode
        </p>
        <div className="inline-flex w-full rounded-lg border border-gray-200 bg-gray-50 p-0.5">
          {(["guided", "pro"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onDisplayModeChange(m)}
              className={`flex-1 rounded-md py-1.5 text-xs font-semibold capitalize transition-colors ${
                displayMode === m
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {showGuideControls && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Options
          </p>
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1 divide-y divide-gray-100">
            <MiniToggle label="Guide me" checked={guideMode} onChange={onGuideModeChange} />
            <MiniToggle label="Auto-detect" checked={autoDetect} onChange={onAutoDetectChange} />
            <MiniToggle label="Sound" checked={soundEnabled} onChange={onSoundChange} />
          </div>
        </div>
      )}

      {!showGuideControls && (
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-2">
          <MiniToggle label="Sound" checked={soundEnabled} onChange={onSoundChange} />
        </div>
      )}
    </aside>
  );
}
