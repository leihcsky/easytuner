"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";
import {
  frequencyToNote,
  findClosestStringIndex,
  getCentsFromTarget,
  getTuningStatus,
  getStringLabel,
  getNoteDisplay,
} from "@/lib/notes";
import { playSuccessChime } from "@/lib/audio";
import { GuitarHeadstock } from "@/components/tuner/GuitarHeadstock";
import { TuningProgressBar } from "@/components/tuner/TuningProgressBar";
import { SignalStrength } from "@/components/tuner/SignalStrength";
import { PrecisionMeter } from "@/components/tuner/PrecisionMeter";
import { StrobeTuner } from "@/components/tuner/StrobeTuner";
import { TuneDirectionHint } from "@/components/tuner/TuneDirectionHint";
import { GuideModeControls } from "@/components/tuner/GuideModeControls";
import { TunerModeToggle } from "@/components/tuner/TunerModeToggle";
import { TunerOnboarding } from "@/components/tuner/TunerOnboarding";
import { TuningComplete } from "@/components/tuner/TuningComplete";
import { TuningSessionTimer } from "@/components/tuner/TuningSessionTimer";
import { AutoDetectBanner } from "@/components/tuner/AutoDetectBanner";
import type { StringTuneState, TunerDisplayMode, TuningStatus } from "@/types/tuning";

const CLOSE_THRESHOLD = 15;
const AUTO_DETECT_MAX_CENTS = 50;
const ADVANCE_DELAY_MS = 1000;

interface TunerToolProps {
  notes: string[];
  id?: string;
  stringLabelMode?: "note" | "number";
}

function initialStringStates(count: number): StringTuneState[] {
  return Array(count).fill("untuned") as StringTuneState[];
}

function firstUntunedIndex(states: StringTuneState[]): number {
  const idx = states.findIndex((s) => s !== "in-tune");
  return idx >= 0 ? idx : 0;
}

export function TunerTool({ notes, id = "tuner-tool", stringLabelMode = "note" }: TunerToolProps) {
  const [displayMode, setDisplayMode] = useState<TunerDisplayMode>("guided");
  const [isListening, setIsListening] = useState(false);
  const [guideMode, setGuideMode] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [activeString, setActiveString] = useState(0);
  const [detectedStringIndex, setDetectedStringIndex] = useState<number | null>(null);
  const [stringStates, setStringStates] = useState<StringTuneState[]>(() =>
    initialStringStates(notes.length)
  );
  const [detectedNote, setDetectedNote] = useState("");
  const [frequency, setFrequency] = useState(0);
  const [cents, setCents] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [status, setStatus] = useState<TuningStatus>("in-tune");
  const [error, setError] = useState("");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [finalElapsedMs, setFinalElapsedMs] = useState(0);

  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const detectorRef = useRef<PitchDetector<Float32Array> | null>(null);
  const rafRef = useRef<number>(0);
  const activeStringRef = useRef(activeString);
  const notesRef = useRef(notes);
  const autoDetectRef = useRef(autoDetect);
  const prevStringStatesRef = useRef(stringStates);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevForAdvanceRef = useRef(stringStates);
  const sessionStartRef = useRef<number | null>(null);

  activeStringRef.current = activeString;
  notesRef.current = notes;
  autoDetectRef.current = autoDetect;

  const tunedCount = stringStates.filter((s) => s === "in-tune").length;
  const hasSignal = clarity >= 0.9 && frequency > 0;
  const nextUntunedIndex = stringStates.findIndex((s) => s !== "in-tune");
  const targetLabel =
    stringLabelMode === "number"
      ? getStringLabel(activeString, notes.length)
      : getNoteDisplay(notes[activeString]);

  const liveState: StringTuneState | undefined =
    hasSignal && status === "in-tune"
      ? "in-tune"
      : hasSignal && Math.abs(cents) <= CLOSE_THRESHOLD
        ? "close"
        : hasSignal
          ? "untuned"
          : undefined;

  const detectPitch = useCallback(() => {
    const analyser = analyserRef.current;
    const detector = detectorRef.current;
    const ctx = audioContextRef.current;
    if (!analyser || !detector || !ctx) return;

    const buffer = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(buffer);

    const [pitch, pitchClarity] = detector.findPitch(buffer, ctx.sampleRate);
    setClarity(pitchClarity);

    if (pitchClarity > 0.9 && pitch > 0) {
      const currentNotes = notesRef.current;
      const closest = findClosestStringIndex(pitch, currentNotes);
      const closestCents = Math.abs(getCentsFromTarget(pitch, currentNotes[closest]));

      setDetectedStringIndex(closest);

      let stringIdx = activeStringRef.current;
      if (autoDetectRef.current && closestCents <= AUTO_DETECT_MAX_CENTS) {
        stringIdx = closest;
        if (stringIdx !== activeStringRef.current) {
          activeStringRef.current = stringIdx;
          setActiveString(stringIdx);
        }
      }

      const target = currentNotes[stringIdx];
      const targetCents = getCentsFromTarget(pitch, target);
      const tuningStatus = getTuningStatus(targetCents);
      const { note } = frequencyToNote(pitch);

      setDetectedNote(note);
      setFrequency(pitch);
      setCents(targetCents);
      setStatus(tuningStatus);

      if (tuningStatus === "in-tune") {
        setStringStates((prev) => {
          if (prev[stringIdx] === "in-tune") return prev;
          const next = [...prev];
          next[stringIdx] = "in-tune";
          return next;
        });
      }
    }

    rafRef.current = requestAnimationFrame(detectPitch);
  }, []);

  const startListening = async () => {
    try {
      setError("");
      setIsComplete(false);
      setFinalElapsedMs(0);
      sessionStartRef.current = Date.now();
      setElapsedMs(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      detectorRef.current = PitchDetector.forFloat32Array(analyser.fftSize);

      const startIdx =
        displayMode === "guided" && guideMode
          ? firstUntunedIndex(stringStates)
          : activeString;
      setActiveString(startIdx);
      activeStringRef.current = startIdx;

      setIsListening(true);
      detectPitch();
    } catch {
      setError("Microphone access denied. Please allow microphone access to use the tuner.");
    }
  };

  const stopListening = () => {
    cancelAnimationFrame(rafRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close();
    streamRef.current = null;
    audioContextRef.current = null;
    analyserRef.current = null;
    detectorRef.current = null;
    sessionStartRef.current = null;
    setIsListening(false);
    setDetectedNote("");
    setFrequency(0);
    setCents(0);
    setClarity(0);
    setDetectedStringIndex(null);
  };

  const resetProgress = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    const fresh = initialStringStates(notes.length);
    setStringStates(fresh);
    setActiveString(0);
    activeStringRef.current = 0;
    setIsComplete(false);
    setDetectedStringIndex(null);
    setElapsedMs(0);
    setFinalElapsedMs(0);
    sessionStartRef.current = null;
    prevStringStatesRef.current = fresh;
    prevForAdvanceRef.current = fresh;
  };

  // Session timer tick
  useEffect(() => {
    if (!isListening || !sessionStartRef.current) return;
    const interval = setInterval(() => {
      if (sessionStartRef.current) {
        setElapsedMs(Date.now() - sessionStartRef.current);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isListening]);

  // Chime when a string newly locks in tune
  useEffect(() => {
    const prev = prevStringStatesRef.current;
    stringStates.forEach((state, i) => {
      if (state === "in-tune" && prev[i] !== "in-tune" && soundEnabled) {
        playSuccessChime(audioContextRef.current ?? undefined);
      }
    });
    prevStringStatesRef.current = stringStates;

    if (stringStates.length > 0 && stringStates.every((s) => s === "in-tune")) {
      setIsComplete(true);
      setFinalElapsedMs((prev) => (prev > 0 ? prev : elapsedMs));
    }
  }, [stringStates, soundEnabled, elapsedMs]);

  // Freeze elapsed time on completion
  useEffect(() => {
    if (isComplete && elapsedMs > 0) {
      setFinalElapsedMs(elapsedMs);
    }
  }, [isComplete, elapsedMs]);

  // Guide mode: auto-advance to next untuned string
  useEffect(() => {
    if (displayMode !== "guided" || !guideMode || !isListening || isComplete) {
      prevForAdvanceRef.current = stringStates;
      return;
    }

    const prev = prevForAdvanceRef.current;
    const justLocked =
      stringStates[activeString] === "in-tune" && prev[activeString] !== "in-tune";

    if (justLocked) {
      const nextIdx = stringStates.findIndex((s) => s !== "in-tune");
      if (nextIdx >= 0 && nextIdx !== activeString) {
        if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = setTimeout(() => {
          setActiveString(nextIdx);
          activeStringRef.current = nextIdx;
        }, ADVANCE_DELAY_MS);
      }
    }

    prevForAdvanceRef.current = stringStates;

    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, [stringStates, activeString, guideMode, isListening, isComplete, displayMode]);

  useEffect(() => {
    if (displayMode === "pro") {
      setAutoDetect(true);
      autoDetectRef.current = true;
    }
  }, [displayMode]);

  useEffect(() => {
    const fresh = initialStringStates(notes.length);
    setStringStates(fresh);
    setActiveString(0);
    activeStringRef.current = 0;
    setIsComplete(false);
    setDetectedStringIndex(null);
    setElapsedMs(0);
    setFinalElapsedMs(0);
    prevStringStatesRef.current = fresh;
    prevForAdvanceRef.current = fresh;
  }, [notes]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioContextRef.current?.close();
    };
  }, []);

  const handleSelectString = (index: number) => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    setActiveString(index);
    activeStringRef.current = index;
  };

  return (
    <section id={id} className="py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
        <TunerModeToggle mode={displayMode} onChange={setDisplayMode} />

        <TunerOnboarding
          isListening={isListening}
          hasSignal={hasSignal}
          status={status}
        />

        {displayMode === "guided" && (
          <GuideModeControls
            guideMode={guideMode}
            autoDetect={autoDetect}
            soundEnabled={soundEnabled}
            onGuideModeChange={setGuideMode}
            onAutoDetectChange={setAutoDetect}
            onSoundChange={setSoundEnabled}
          />
        )}

        {displayMode === "pro" && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              Strobe mode — stripes freeze when pitch is locked (±5¢)
            </p>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              Success chime
            </label>
          </div>
        )}

        {isComplete && (
          <TuningComplete
            total={notes.length}
            elapsedMs={finalElapsedMs}
            onReset={resetProgress}
          />
        )}

        <TuningProgressBar tunedCount={tunedCount} total={notes.length} />

        {displayMode === "guided" && (
          <AutoDetectBanner
            detectedIndex={detectedStringIndex}
            activeIndex={activeString}
            total={notes.length}
            autoDetect={autoDetect}
            isListening={isListening}
            hasSignal={hasSignal}
            onSwitch={() => {
              if (detectedStringIndex !== null) handleSelectString(detectedStringIndex);
            }}
          />
        )}

        {displayMode === "guided" && isListening && !isComplete && nextUntunedIndex >= 0 && guideMode && (
          <p className="mb-4 text-center text-sm text-brand-700 font-medium">
            {stringStates[activeString] === "in-tune"
              ? `Advancing to ${getStringLabel(nextUntunedIndex, notes.length)}…`
              : `Now tuning: ${getStringLabel(activeString, notes.length)}`}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <GuitarHeadstock
            notes={notes}
            activeString={activeString}
            stringStates={stringStates}
            liveState={liveState}
            onSelectString={handleSelectString}
            stringLabelMode={stringLabelMode}
          />

          <div className="flex flex-col gap-4">
            {displayMode === "guided" ? (
              <PrecisionMeter
                cents={cents}
                detectedNote={detectedNote}
                frequency={frequency}
                status={status}
                isListening={isListening}
              />
            ) : (
              <StrobeTuner
                cents={cents}
                detectedNote={detectedNote}
                frequency={frequency}
                status={status}
                isListening={isListening}
                targetLabel={targetLabel}
              />
            )}
            <TuneDirectionHint
              status={status}
              isListening={isListening}
              hasSignal={hasSignal}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-1">
          <SignalStrength clarity={clarity} isListening={isListening} />
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-sm text-gray-500">
              {(displayMode === "pro" || autoDetect) ? "Detected" : "Tuning"}:{" "}
              <span className="font-semibold text-gray-800">{targetLabel}</span>
            </p>
            <TuningSessionTimer elapsedMs={isComplete ? finalElapsedMs : elapsedMs} isListening={isListening} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {!isListening ? (
            <button
              onClick={startListening}
              className="px-8 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/25"
            >
              Enable Microphone
            </button>
          ) : (
            <button
              onClick={stopListening}
              className="px-8 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
            >
              Stop
            </button>
          )}
          {tunedCount > 0 && (
            <button
              onClick={resetProgress}
              className="px-5 py-3 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Reset Progress
            </button>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
      </div>
    </section>
  );
}
