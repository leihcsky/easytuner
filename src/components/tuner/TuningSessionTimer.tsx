import { formatElapsedTime } from "@/lib/format-time";

interface TuningSessionTimerProps {
  elapsedMs: number;
  isListening: boolean;
}

export function TuningSessionTimer({ elapsedMs, isListening }: TuningSessionTimerProps) {
  if (!isListening && elapsedMs === 0) return null;

  return (
    <p className="text-xs text-gray-500 tabular-nums">
      Session: {formatElapsedTime(elapsedMs)}
      {isListening && <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />}
    </p>
  );
}
