import { formatFrequency, getNoteDisplay } from "@/lib/notes";
import type { TuningStatus } from "@/types/tuning";

interface StrobeTunerProps {
  cents: number;
  detectedNote: string;
  frequency: number;
  status: TuningStatus;
  isListening: boolean;
  targetLabel: string;
}

export function StrobeTuner({
  cents,
  detectedNote,
  frequency,
  status,
  isListening,
  targetLabel,
}: StrobeTunerProps) {
  const inTune = status === "in-tune" && isListening && frequency > 0;
  const absCents = Math.abs(cents);
  const rotationDuration = inTune ? 0 : Math.max(0.12, 2.5 - absCents * 0.08);
  const rotateDirection = cents < 0 ? "normal" : "reverse";

  const ringClass = inTune
    ? "border-brand-500 shadow-[0_0_20px_rgba(34,197,94,0.35)]"
    : status === "flat"
      ? "border-blue-400"
      : status === "sharp"
        ? "border-orange-400"
        : "border-gray-300";

  return (
    <div className="text-center">
      <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
        Pro Strobe · Target {targetLabel}
      </p>

      <div
        className={`relative mx-auto w-52 h-52 rounded-full border-4 overflow-hidden transition-colors ${ringClass}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-conic-gradient(
              from 0deg,
              #1f2937 0deg 8deg,
              #f9fafb 8deg 16deg
            )`,
            animation: inTune || !isListening ? "none" : `strobe-spin ${rotationDuration}s linear infinite`,
            animationDirection: rotateDirection,
          }}
        />
        <div className="absolute inset-3 rounded-full bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center shadow-inner">
          {isListening ? (
            <>
              <p className="text-4xl font-mono font-bold text-gray-900 tabular-nums">
                {frequency > 0 ? (
                  <>
                    {cents > 0 ? "+" : ""}
                    {cents}
                    <span className="text-lg text-gray-500">¢</span>
                  </>
                ) : (
                  "—"
                )}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {detectedNote ? getNoteDisplay(detectedNote) : "—"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {frequency > 0 ? formatFrequency(frequency) : "Waiting for signal…"}
              </p>
              {inTune && (
                <p className="mt-2 text-sm font-semibold text-brand-600">Locked ✓</p>
              )}
              {!inTune && frequency > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  {status === "flat" ? "Strobe → tighten" : "Strobe ← loosen"}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500 px-4">Enable mic for strobe tuning</p>
          )}
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        {inTune
          ? "Strobe stopped — pitch is locked"
          : "Spinning stripes slow down as you approach the target pitch"}
      </p>
    </div>
  );
}
