import { SignalStrength } from "@/components/tuner/SignalStrength";
import { TuningSessionTimer } from "@/components/tuner/TuningSessionTimer";
import { MicIcon } from "@/components/tuner/MicIcon";

interface TunerMicControlBarProps {
  isListening: boolean;
  bars: number;
  signalLabel: string;
  isComplete: boolean;
  elapsedMs: number;
  finalElapsedMs: number;
  tunedCount: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  startLabel?: string;
  stopLabel?: string;
}

export function TunerMicControlBar({
  isListening,
  bars,
  signalLabel,
  isComplete,
  elapsedMs,
  finalElapsedMs,
  tunedCount,
  onStart,
  onStop,
  onReset,
  startLabel = "Tap to tune",
  stopLabel = "Stop mic",
}: TunerMicControlBarProps) {
  const startButton = (
    <button
      type="button"
      onClick={onStart}
      className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand-600/30 hover:bg-brand-700 active:scale-[0.98] transition-all"
    >
      <MicIcon />
      {startLabel}
    </button>
  );

  const stopButton = (
    <button
      type="button"
      onClick={onStop}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all sm:px-4 justify-self-center"
    >
      {stopLabel}
    </button>
  );

  const timerBlock = (
    <>
      <TuningSessionTimer
        elapsedMs={isComplete ? finalElapsedMs : elapsedMs}
        isListening={isListening && !isComplete}
      />
      {tunedCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-gray-500 hover:text-gray-800 underline shrink-0"
        >
          Reset
        </button>
      )}
    </>
  );

  return (
    <div className="mt-2 pt-2 border-t border-gray-100">
      {/* Mobile */}
      <div className="sm:hidden">
        {!isListening ? (
          <div className="flex justify-center min-h-[2.75rem] items-center">{startButton}</div>
        ) : (
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 min-h-[2.75rem]">
            <div className="min-w-0 justify-self-start">
              <SignalStrength
                bars={bars}
                label={signalLabel}
                isListening={isListening}
                showTitle={false}
              />
            </div>
            {stopButton}
            <div className="flex items-center justify-end gap-2 min-w-0 justify-self-end">
              {timerBlock}
            </div>
          </div>
        )}
      </div>

      {/* Tablet/desktop */}
      <div className="hidden sm:flex items-center gap-2 min-h-[2.75rem]">
        <div className="flex-1 min-w-0">
          <SignalStrength bars={bars} label={signalLabel} isListening={isListening} />
        </div>
        <div className="shrink-0 px-1">{isListening ? stopButton : startButton}</div>
        <div className="flex-1 min-w-0 flex items-center justify-end gap-2">{timerBlock}</div>
      </div>
    </div>
  );
}
