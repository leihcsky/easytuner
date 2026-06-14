import { useId } from "react";
import { formatFrequency, getNoteDisplay } from "@/lib/notes";
import type { TuningStatus } from "@/types/tuning";

interface PrecisionMeterProps {
  cents: number;
  detectedNote: string;
  frequency: number;
  status: TuningStatus;
  isListening: boolean;
  compact?: boolean;
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

function TunerDial({
  cents,
  status,
  compact,
}: {
  cents: number;
  status: TuningStatus;
  compact?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const angle = needleAngle(cents);
  const size = compact ? 144 : 208;
  const vbW = 160;
  const vbH = 96;
  const cx = 80;
  const cy = 82;
  const r = 58;

  const zoneColor =
    status === "in-tune"
      ? "#22c55e"
      : status === "flat"
        ? "#3b82f6"
        : status === "sharp"
          ? "#f97316"
          : "#9ca3af";

  const tickAngles = [-45, -22.5, 0, 22.5, 45];

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={size}
      height={compact ? size * 0.56 : size * 0.56}
      className="mx-auto block"
      aria-hidden
    >
      <defs>
        <linearGradient id={`dialFace-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f9fafb" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
        <linearGradient id={`dialRing-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="50%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
        <filter id={`needleShadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Face background */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} L ${cx} ${cy} Z`}
        fill={`url(#dialFace-${uid})`}
      />

      {/* Outer ring */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={`url(#dialRing-${uid})`}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* In-tune zone arc (center ±5¢) */}
      {(() => {
        const z = 4.5;
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
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.55"
          />
        );
      })()}

      {/* Tick marks */}
      {tickAngles.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = cx + (r - 10) * Math.sin(rad);
        const y1 = cy - (r - 10) * Math.cos(rad);
        const x2 = cx + (r - 2) * Math.sin(rad);
        const y2 = cy - (r - 2) * Math.cos(rad);
        const isCenter = deg === 0;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isCenter ? "#22c55e" : "#9ca3af"}
            strokeWidth={isCenter ? 2 : 1.5}
            strokeLinecap="round"
          />
        );
      })}

      {/* Flat / Sharp labels */}
      <text x={cx - r + 6} y={cy + 4} fontSize="7" fill="#6b7280" fontWeight="600">
        ♭
      </text>
      <text x={cx + r - 12} y={cy + 4} fontSize="7" fill="#6b7280" fontWeight="600">
        ♯
      </text>

      {/* Needle */}
      <g transform={`rotate(${angle} ${cx} ${cy})`} filter={`url(#needleShadow-${uid})`}>
        <polygon
          points={`${cx},${cy - 2} ${cx - 2.5},${cy + 4} ${cx},${cy + 1} ${cx + 2.5},${cy + 4}`}
          fill={zoneColor}
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - r + 14}
          stroke={zoneColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Hub */}
      <circle cx={cx} cy={cy} r="5.5" fill="#1f2937" stroke="#fff" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="2" fill="#4b5563" />
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
}: PrecisionMeterProps) {
  const statusColors: Record<TuningStatus, string> = {
    flat: "text-blue-600",
    "in-tune": "text-brand-600",
    sharp: "text-orange-600",
  };

  const hasReading = Boolean(detectedNote && frequency > 0);
  const noteDisplay = detectedNote ? getNoteDisplay(detectedNote) : "—";
  const freqDisplay = frequency > 0 ? formatFrequency(frequency) : "—";
  const centsDisplay = statusText(status, cents, hasReading);

  if (!isListening) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center ${
          compact ? "min-h-[8.75rem]" : "min-h-[13rem] py-4"
        }`}
      >
        <p className="text-gray-400 text-xs">Tap fretboard to start</p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col text-center ${
        compact ? "min-h-[8.75rem] h-full" : "min-h-[13rem]"
      }`}
    >
      <div className={`shrink-0 ${compact ? "pt-0.5" : "pt-1"}`}>
        <TunerDial cents={hasReading ? cents : 0} status={hasReading ? status : "in-tune"} compact={compact} />
      </div>

      {/* Fixed-height readout — prevents Signal row from jumping */}
      <div className={`mt-auto ${compact ? "space-y-0.5 pt-1" : "space-y-1 pt-2"}`}>
        <p
          className={`font-bold text-gray-900 leading-none tabular-nums ${
            compact ? "text-xl h-6" : "text-3xl h-9"
          }`}
        >
          {noteDisplay}
        </p>
        <p
          className={`text-gray-500 tabular-nums leading-none ${
            compact ? "text-xs h-4" : "text-sm h-5"
          }`}
        >
          {freqDisplay}
        </p>
        <p
          className={`font-semibold leading-none tabular-nums ${
            compact ? "text-xs h-4" : "text-sm h-5"
          } ${hasReading ? statusColors[status] : "text-gray-300"}`}
        >
          {centsDisplay}
        </p>
      </div>
    </div>
  );
}
