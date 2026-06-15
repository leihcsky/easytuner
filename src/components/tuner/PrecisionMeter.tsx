import { useEffect, useId, useState } from "react";
import { formatFrequency, getNoteDisplay } from "@/lib/notes";
import type { TuningStatus } from "@/types/tuning";

interface PrecisionMeterProps {
  cents: number;
  detectedNote: string;
  frequency: number;
  status: TuningStatus;
  isListening: boolean;
  compact?: boolean;
  centered?: boolean;
  targetNote?: string;
}

const MAX_CENTS = 50;

function needleAngle(cents: number): number {
  const clamped = Math.max(-MAX_CENTS, Math.min(MAX_CENTS, cents));
  return (clamped / MAX_CENTS) * 45;
}

function statusText(status: TuningStatus, cents: number, hasReading: boolean): string {
  if (!hasReading) return "—";
  if (status === "in-tune") return "In tune ✓";
  return `${Math.abs(cents)}¢ ${status === "flat" ? "flat" : "sharp"}`;
}

function ringClassFor(status: TuningStatus, inTune: boolean, hasReading: boolean): string {
  if (!hasReading) return "border-gray-300";
  if (inTune) return "border-brand-500 shadow-[0_0_20px_rgba(34,197,94,0.35)]";
  if (status === "flat") return "border-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.2)]";
  if (status === "sharp") return "border-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.2)]";
  return "border-gray-300";
}

function GaugeNeedle({
  cents,
  status,
  hasReading,
}: {
  cents: number;
  status: TuningStatus;
  hasReading: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const angle = hasReading ? needleAngle(cents) : 0;
  const cx = 80;
  const cy = 78;
  const r = 52;

  const needleColor =
    !hasReading
      ? "#9ca3af"
      : status === "in-tune"
        ? "#22c55e"
        : status === "flat"
          ? "#3b82f6"
          : "#f97316";

  const tickAngles = [-45, -22.5, 0, 22.5, 45];

  return (
    <svg
      viewBox="0 0 160 88"
      className="absolute inset-x-0 top-0 w-full h-[42%] pointer-events-none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`gaugeFace-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="45%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#fff7ed" />
        </linearGradient>
        <linearGradient id={`flatZone-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`sharpZone-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.55" />
        </linearGradient>
        <filter id={`gaugeNeedleShadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodOpacity="0.3" />
        </filter>
      </defs>

      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} L ${cx} ${cy} Z`}
        fill={`url(#gaugeFace-${uid})`}
        opacity="0.9"
      />

      {/* Flat zone (left arc) */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r * 0.02} L ${cx} ${cy} Z`}
        fill={`url(#flatZone-${uid})`}
      />
      {/* Sharp zone (right arc) */}
      <path
        d={`M ${cx} ${cy - r * 0.02} A ${r} ${r} 0 0 1 ${cx + r} ${cy} L ${cx} ${cy} Z`}
        fill={`url(#sharpZone-${uid})`}
      />

      {/* In-tune center band */}
      {(() => {
        const z = 5;
        const radL = (-z * Math.PI) / 180;
        const radR = (z * Math.PI) / 180;
        const xL = cx + r * Math.sin(radL);
        const yL = cy - r * Math.cos(radL);
        const xR = cx + r * Math.sin(radR);
        const yR = cy - r * Math.cos(radR);
        return (
          <path
            d={`M ${xL} ${yL} A ${r} ${r} 0 0 1 ${xR} ${yR}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.75"
          />
        );
      })()}

      {/* Outer arc ring */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="#d1d5db"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {tickAngles.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = cx + (r - 8) * Math.sin(rad);
        const y1 = cy - (r - 8) * Math.cos(rad);
        const x2 = cx + (r - 1) * Math.sin(rad);
        const y2 = cy - (r - 1) * Math.cos(rad);
        const isCenter = deg === 0;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isCenter ? "#16a34a" : "#94a3b8"}
            strokeWidth={isCenter ? 2.5 : 1.5}
            strokeLinecap="round"
          />
        );
      })}

      <text x={cx - r + 4} y={cy + 2} fontSize="8" fill="#2563eb" fontWeight="700">
        ♭
      </text>
      <text x={cx + r - 14} y={cy + 2} fontSize="8" fill="#ea580c" fontWeight="700">
        ♯
      </text>

      <g transform={`rotate(${angle} ${cx} ${cy})`} filter={`url(#gaugeNeedleShadow-${uid})`}>
        <polygon
          points={`${cx},${cy - 2} ${cx - 3},${cy + 5} ${cx},${cy + 1.5} ${cx + 3},${cy + 5}`}
          fill={needleColor}
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - r + 12}
          stroke={needleColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      <circle cx={cx} cy={cy} r="6" fill="#1f2937" stroke="#fff" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="2.5" fill="#4b5563" />
    </svg>
  );
}

export function PrecisionMeter({
  cents,
  detectedNote,
  frequency,
  status,
  isListening,
  compact,
  centered,
  targetNote,
}: PrecisionMeterProps) {
  const statusColors: Record<TuningStatus, string> = {
    flat: "text-blue-600",
    "in-tune": "text-brand-600",
    sharp: "text-orange-600",
  };

  type Reading = {
    cents: number;
    detectedNote: string;
    frequency: number;
    status: TuningStatus;
  };

  const [lastReading, setLastReading] = useState<Reading | null>(null);

  const hasLiveReading = Boolean(detectedNote && frequency > 0);

  useEffect(() => {
    if (hasLiveReading) {
      setLastReading({ cents, detectedNote, frequency, status });
    }
  }, [hasLiveReading, cents, detectedNote, frequency, status]);

  useEffect(() => {
    if (!isListening) {
      setLastReading(null);
    }
  }, [isListening]);

  useEffect(() => {
    setLastReading(null);
  }, [targetNote]);

  const reading = hasLiveReading
    ? { cents, detectedNote, frequency, status }
    : lastReading;

  const hasDisplay = reading !== null;
  const inTune = reading?.status === "in-tune";
  const noteDisplay = reading ? getNoteDisplay(reading.detectedNote) : "—";
  const freqDisplay = reading && reading.frequency > 0 ? formatFrequency(reading.frequency) : "—";
  const centsDisplay = reading
    ? statusText(reading.status, reading.cents, true)
    : statusText(status, cents, false);

  const ringSize = compact ? "w-44 h-44" : "w-52 h-52";
  const innerInset = compact ? "inset-2.5" : "inset-3";
  const noteSize = compact ? "text-3xl" : "text-4xl";
  const subNoteSize = compact ? "text-xl" : "text-2xl";

  const panelClass = centered
    ? "flex flex-col items-center justify-center text-center w-full"
    : compact
      ? "flex flex-col items-center text-center h-full min-h-[11rem]"
      : "flex flex-col items-center text-center min-h-[14rem]";

  const idleNote = targetNote ? getNoteDisplay(targetNote) : "—";

  return (
    <div className={panelClass}>
      <div
        className={`relative mx-auto ${ringSize} rounded-full border-4 overflow-hidden transition-all duration-200 ${ringClassFor(
          reading?.status ?? status,
          Boolean(inTune && hasDisplay),
          isListening && hasDisplay
        )}`}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 225deg,
              rgba(59, 130, 246, 0.18) 0deg,
              rgba(34, 197, 94, 0.22) 90deg,
              rgba(249, 115, 22, 0.18) 180deg,
              rgba(59, 130, 246, 0.12) 270deg,
              rgba(59, 130, 246, 0.18) 360deg
            )`,
          }}
        />

        <GaugeNeedle
          cents={reading?.cents ?? 0}
          status={reading?.status ?? "in-tune"}
          hasReading={isListening && hasDisplay}
        />

        <div
          className={`absolute ${innerInset} rounded-full bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center shadow-inner`}
        >
          {isListening ? (
            hasDisplay && reading ? (
              <>
                <p className={`font-mono font-bold text-gray-900 tabular-nums leading-none ${noteSize}`}>
                  {reading.cents > 0 ? "+" : ""}
                  {reading.cents}
                  <span className="text-lg text-gray-500">¢</span>
                </p>
                <p className={`font-bold text-gray-800 mt-1 leading-none ${subNoteSize}`}>
                  {noteDisplay}
                </p>
                <p className="text-xs text-gray-500 mt-1 tabular-nums">{freqDisplay}</p>
                {inTune && (
                  <p className="mt-2 text-sm font-semibold text-brand-600">In tune ✓</p>
                )}
                {!inTune && (
                  <p className={`mt-2 text-xs font-medium ${statusColors[reading.status]}`}>
                    {centsDisplay}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className={`font-bold text-gray-300 tabular-nums leading-none ${noteSize}`}>—</p>
                <p className={`font-bold text-gray-400 mt-1 leading-none ${subNoteSize}`}>
                  {idleNote}
                </p>
                <p className="text-xs text-gray-400 mt-1">Pluck to start</p>
              </>
            )
          ) : (
            <>
              <p className={`font-bold text-gray-300 tabular-nums ${subNoteSize}`}>{idleNote}</p>
              <p className="text-xs text-gray-400 mt-1">Target note</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
