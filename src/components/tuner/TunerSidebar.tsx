import type { ReactNode } from "react";
import type { TunerDisplayMode } from "@/types/tuning";
import { TunerModeSwitch } from "@/components/tuner/TunerModeSwitch";

interface TunerSidebarProps {
  tuningSelector: ReactNode;
  displayMode: TunerDisplayMode;
  onDisplayModeChange: (mode: TunerDisplayMode) => void;
}

export function TunerSidebar({
  tuningSelector,
  displayMode,
  onDisplayModeChange,
}: TunerSidebarProps) {
  return (
    <aside className="hidden lg:block w-52 shrink-0 space-y-4">
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
        <TunerModeSwitch
          displayMode={displayMode}
          onDisplayModeChange={onDisplayModeChange}
        />
      </div>
    </aside>
  );
}
