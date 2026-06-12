import { formatFrequency, getNoteDisplay } from "@/lib/notes";
import type { TuningStatus } from "@/types/tuning";

interface PrecisionMeterProps {
  cents: number;
  detectedNote: string;
  frequency: number;
  status: TuningStatus;
  isListening: boolean;
}

export function PrecisionMeter({
  cents,
  detectedNote,
  frequency,
  status,
  isListening,
}: PrecisionMeterProps) {
  const needleRotation = Math.max(-45, Math.min(45, cents * 0.9));

  const statusColors: Record<TuningStatus, string> = {
    flat: "text-blue-600",
    "in-tune": "text-brand-600",
    sharp: "text-orange-600",
  };

  return (
    <div className="text-center">
      <div className="relative mx-auto w-52 h-28 mb-3">
        <div className="absolute inset-x-0 bottom-0 h-28 overflow-hidden">
          <div className="w-52 h-52 rounded-full border-[10px] border-gray-200 border-b-brand-400 mx-auto" />
        </div>
        <div
          className="absolute bottom-0 left-1/2 w-1 h-[4.5rem] bg-gray-800 origin-bottom transition-transform duration-75"
          style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
        />
        <div className="absolute bottom-0 left-1/2 w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-gray-800 border-2 border-white" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-medium text-brand-600/80 bg-white/80 px-2 rounded">
          ±5¢ zone
        </div>
      </div>

      {isListening ? (
        <>
          <p className="text-3xl font-bold text-gray-900 mb-0.5">
            {detectedNote ? getNoteDisplay(detectedNote) : "—"}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {frequency > 0 ? formatFrequency(frequency) : "Play a note…"}
          </p>
          {detectedNote && (
            <p className={`text-base font-semibold ${statusColors[status]}`}>
              {status === "in-tune"
                ? "In Tune ✓"
                : `${Math.abs(cents)}¢ ${status === "flat" ? "flat" : "sharp"}`}
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-sm py-6">
          Enable your microphone to start tuning
        </p>
      )}
    </div>
  );
}
