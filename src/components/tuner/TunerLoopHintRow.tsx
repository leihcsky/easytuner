import { ReferenceLoopToggle } from "@/components/tuner/ReferenceLoopToggle";

interface TunerLoopHintRowProps {
  referenceLoop: boolean;
  onReferenceLoopChange: (enabled: boolean) => void;
  isListening: boolean;
}

export function TunerLoopHintRow({
  referenceLoop,
  onReferenceLoopChange,
  isListening,
}: TunerLoopHintRowProps) {
  return (
    <div className="flex items-center justify-between gap-2 mt-1.5 min-h-5">
      <ReferenceLoopToggle enabled={referenceLoop} onChange={onReferenceLoopChange} />
      {isListening && (
        <p className="text-[10px] text-gray-400 whitespace-nowrap shrink-0 text-right">
          Pluck the open string
        </p>
      )}
    </div>
  );
}
