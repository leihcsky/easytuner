import { useEffect, useState } from "react";
import { formatFrequency } from "@/lib/notes";
import type { TuningStatus } from "@/types/tuning";

interface StrobeTunerProps {
  cents: number;
  detectedNote: string;
  frequency: number;
  status: TuningStatus;
  isListening: boolean;
  targetLabel: string;
  targetNote?: string;
  compact?: boolean;
}

type Reading = {
  cents: number;
  detectedNote: string;
  frequency: number;
  status: TuningStatus;
};

export function StrobeTuner({
  cents,
  detectedNote,
  frequency,
  status,
  isListening,
  targetLabel,
  targetNote,
  compact,
}: StrobeTunerProps) {
  const [lastReading, setLastReading] = useState<Reading | null>(null);

  const hasLive = frequency > 0 && Boolean(detectedNote);

  useEffect(() => {
    if (hasLive) {
      setLastReading({ cents, detectedNote, frequency, status });
    }
  }, [hasLive, cents, detectedNote, frequency, status]);

  useEffect(() => {
    if (!isListening) {
      setLastReading(null);
    }
  }, [isListening]);

  useEffect(() => {
    setLastReading(null);
  }, [targetNote]);

  const reading = hasLive
    ? { cents, detectedNote, frequency, status }
    : lastReading;

  const idle = !isListening;
  const hasReading = isListening && reading !== null;
  const inTune = hasReading && reading.status === "in-tune";
  const absCents = reading ? Math.abs(reading.cents) : 0;
  const rotationDuration = idle
    ? 3.5
    : inTune
      ? 0
      : Math.max(0.12, 2.5 - absCents * 0.08);
  const rotateDirection = reading && reading.cents < 0 ? "normal" : "reverse";
  const idleNote = targetNote ?? "—";

  const ringClass = idle
    ? "border-gray-200 shadow-sm"
    : inTune
      ? "border-brand-500 shadow-[0_0_20px_rgba(34,197,94,0.35)]"
      : reading?.status === "flat"
        ? "border-blue-400"
        : reading?.status === "sharp"
          ? "border-orange-400"
          : "border-gray-300";

  const ringSize = compact ? "w-44 h-44" : "w-52 h-52";
  const innerInset = compact ? "inset-2.5" : "inset-3";

  return (
    <div className="text-center h-full min-h-[10.5rem] flex flex-col items-center justify-center">
      {!compact && (
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
          Strobe · Target {targetLabel}
        </p>
      )}

      <div
        className={`relative mx-auto ${ringSize} rounded-full border-4 overflow-hidden transition-colors ${ringClass}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-conic-gradient(
              from 0deg,
              #1f2937 0deg 8deg,
              #f9fafb 8deg 16deg
            )`,
            animation: idle
              ? "strobe-spin 3.5s linear infinite"
              : inTune
                ? "none"
                : `strobe-spin ${rotationDuration}s linear infinite`,
            animationDirection: idle ? "normal" : rotateDirection,
          }}
        />
        <div
          className={`absolute ${innerInset} rounded-full bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center shadow-inner`}
        >
          {isListening ? (
            hasReading && reading ? (
              <>
                <p
                  className={`font-mono font-bold text-gray-900 tabular-nums ${compact ? "text-3xl" : "text-4xl"}`}
                >
                  {reading.cents > 0 ? "+" : ""}
                  {reading.cents}
                  <span className="text-lg text-gray-500">¢</span>
                </p>
                <p
                  className={`font-bold text-gray-800 mt-1 ${compact ? "text-xl" : "text-2xl"}`}
                >
                  {reading.detectedNote}
                </p>
                <p className="text-xs text-gray-500 mt-1 tabular-nums">
                  {formatFrequency(reading.frequency)}
                </p>
                {inTune && (
                  <p className="mt-2 text-sm font-semibold text-brand-600">Locked ✓</p>
                )}
                {!inTune && (
                  <p className="mt-2 text-xs font-medium text-gray-600">
                    {reading.status === "flat" ? "Tighten" : "Loosen"}
                  </p>
                )}
              </>
            ) : (
              <>
                <p
                  className={`font-mono font-bold text-gray-300 tabular-nums ${compact ? "text-3xl" : "text-4xl"}`}
                >
                  —
                </p>
                <p
                  className={`font-bold text-gray-400 mt-1 ${compact ? "text-xl" : "text-2xl"}`}
                >
                  {idleNote}
                </p>
                <p className="text-xs text-gray-400 mt-1">Pluck to start</p>
              </>
            )
          ) : (
            <>
              <p
                className={`font-bold text-gray-300 tabular-nums ${compact ? "text-2xl" : "text-3xl"}`}
              >
                {idleNote}
              </p>
              <p className="text-xs text-gray-400 mt-1.5 px-2 leading-snug">
                {targetLabel}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
