import type { ReactNode } from "react";
import { AutoAdvanceToggle } from "@/components/tuner/AutoAdvanceToggle";

interface TunerSidebarProps {
  tuningSelector?: ReactNode;
  autoAdvance: boolean;
  onAutoAdvanceChange: (enabled: boolean) => void;
}

export function TunerSidebar({
  tuningSelector,
  autoAdvance,
  onAutoAdvanceChange,
}: TunerSidebarProps) {
  return (
    <aside className="hidden lg:block w-52 shrink-0 space-y-4">
      {tuningSelector && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Tuning
          </p>
          {tuningSelector}
        </div>
      )}

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Guide
        </p>
        <AutoAdvanceToggle enabled={autoAdvance} onChange={onAutoAdvanceChange} />
      </div>
    </aside>
  );
}
