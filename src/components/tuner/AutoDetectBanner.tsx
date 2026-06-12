import { getStringLabel } from "@/lib/notes";

interface AutoDetectBannerProps {
  detectedIndex: number | null;
  activeIndex: number;
  total: number;
  autoDetect: boolean;
  isListening: boolean;
  hasSignal: boolean;
  onSwitch: () => void;
}

export function AutoDetectBanner({
  detectedIndex,
  activeIndex,
  total,
  autoDetect,
  isListening,
  hasSignal,
  onSwitch,
}: AutoDetectBannerProps) {
  if (
    !isListening ||
    !hasSignal ||
    autoDetect ||
    detectedIndex === null ||
    detectedIndex === activeIndex
  ) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5">
      <p className="text-sm text-amber-900">
        Sounds like the{" "}
        <span className="font-semibold">
          {getStringLabel(detectedIndex, total)}
        </span>
        — not your current selection.
      </p>
      <button
        type="button"
        onClick={onSwitch}
        className="text-sm font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-2"
      >
        Switch to it
      </button>
    </div>
  );
}
