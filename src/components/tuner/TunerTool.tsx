"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { PitchDetector } from "pitchy";
import {
  frequencyToNote,
  findClosestStringIndex,
  getCentsFromTarget,
  getTuningStatus,
  getStringLabel,
  getNoteDisplay,
} from "@/lib/notes";
import {
  computeRms,
  isPitchCandidateValid,
  PitchGate,
} from "@/lib/pitch-gate";
import { playSuccessChime } from "@/lib/audio";
import { GuitarHeadstock } from "@/components/tuner/GuitarHeadstock";
import { GuitarFretboard } from "@/components/tuner/GuitarFretboard";
import { TuningProgressBar } from "@/components/tuner/TuningProgressBar";
import { SignalStrength } from "@/components/tuner/SignalStrength";
import { useStableTunerDisplay } from "@/hooks/useStableTunerDisplay";
import { PrecisionMeter } from "@/components/tuner/PrecisionMeter";
import { StrobeTuner } from "@/components/tuner/StrobeTuner";
import { TuneDirectionHint } from "@/components/tuner/TuneDirectionHint";
import { GuideModeControls } from "@/components/tuner/GuideModeControls";
import { TunerModeToggle } from "@/components/tuner/TunerModeToggle";
import { TunerSidebar } from "@/components/tuner/TunerSidebar";
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
  layout?: "default" | "home";
  tuningSelector?: ReactNode;
}

function initialStringStates(count: number): StringTuneState[] {
  return Array(count).fill("untuned") as StringTuneState[];
}

function firstUntunedIndex(states: StringTuneState[]): number {
  const idx = states.findIndex((s) => s !== "in-tune");
  return idx >= 0 ? idx : 0;
}

/** Next untuned string in guide order (6th → 1st), scanning from current string upward. */
function nextGuideStringIndex(states: StringTuneState[], fromIndex: number): number {
  for (let i = fromIndex + 1; i < states.length; i++) {
    if (states[i] !== "in-tune") return i;
  }
  return states.findIndex((s) => s !== "in-tune");
}

function guideHintText(
  activeString: number,
  stringStates: StringTuneState[],
  total: number
): string | null {
  if (stringStates.every((s) => s === "in-tune")) return null;

  const activeLabel = getStringLabel(activeString, total);
  if (stringStates[activeString] !== "in-tune") {
    return `Tuning ${activeLabel}`;
  }

  const nextIdx = nextGuideStringIndex(stringStates, activeString);
  if (nextIdx < 0) return null;
  return `Next: ${getStringLabel(nextIdx, total)}`;
}

export function TunerTool({
  notes,
  id = "tuner-tool",
  stringLabelMode = "note",
  layout = "default",
  tuningSelector,
}: TunerToolProps) {
  const isHome = layout === "home";
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
  const startListeningRef = useRef<() => Promise<void>>(async () => {});
  const pitchGateRef = useRef(new PitchGate());

  activeStringRef.current = activeString;
  notesRef.current = notes;
  autoDetectRef.current = autoDetect;

  const tunedCount = stringStates.filter((s) => s === "in-tune").length;
  const display = useStableTunerDisplay(
    clarity,
    frequency,
    cents,
    detectedNote,
    isListening
  );
  const guideHint = guideHintText(activeString, stringStates, notes.length);
  const targetLabel =
    stringLabelMode === "number"
      ? getStringLabel(activeString, notes.length)
      : getNoteDisplay(notes[activeString]);

  const liveState: StringTuneState | undefined =
    display.hasSignal && display.status === "in-tune"
      ? "in-tune"
      : display.hasSignal && Math.abs(display.displayCents) <= CLOSE_THRESHOLD
        ? "close"
        : display.hasSignal
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
    const rms = computeRms(buffer);
    setClarity(pitchClarity);

    const candidateValid = isPitchCandidateValid(
      { pitch, clarity: pitchClarity, rms },
      notesRef.current
    );
    pitchGateRef.current.update(candidateValid);

    if (pitchGateRef.current.isOpen && pitch > 0 && candidateValid) {
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
    } else if (!pitchGateRef.current.isOpen) {
      setFrequency(0);
      setDetectedNote("");
      setCents(0);
    }

    rafRef.current = requestAnimationFrame(detectPitch);
  }, []);

  const startListening = useCallback(async () => {
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
      pitchGateRef.current.reset();

      const startIdx = guideMode ? firstUntunedIndex(stringStates) : activeString;
      setActiveString(startIdx);
      activeStringRef.current = startIdx;

      setIsListening(true);
      detectPitch();
    } catch {
      setError("Microphone access denied. Please allow microphone access to use the tuner.");
    }
  }, [guideMode, stringStates, activeString, detectPitch]);

  startListeningRef.current = startListening;

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
    pitchGateRef.current.reset();
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

  useEffect(() => {
    if (!isListening || !sessionStartRef.current) return;
    const interval = setInterval(() => {
      if (sessionStartRef.current) {
        setElapsedMs(Date.now() - sessionStartRef.current);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isListening]);

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

  useEffect(() => {
    if (isComplete && elapsedMs > 0) setFinalElapsedMs(elapsedMs);
  }, [isComplete, elapsedMs]);

  useEffect(() => {
    if (!guideMode || !isListening || isComplete) {
      prevForAdvanceRef.current = stringStates;
      return;
    }

    const prev = prevForAdvanceRef.current;
    const justLocked =
      stringStates[activeString] === "in-tune" && prev[activeString] !== "in-tune";

    if (justLocked) {
      const nextIdx = nextGuideStringIndex(stringStates, activeString);
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

  const meterPanel =
    displayMode === "guided" ? (
      <PrecisionMeter
        cents={display.displayCents}
        detectedNote={display.displayNote}
        frequency={display.displayFrequency}
        status={display.status}
        isListening={isListening}
        compact={isHome}
      />
    ) : (
      <StrobeTuner
        cents={display.displayCents}
        detectedNote={display.displayNote}
        frequency={display.displayFrequency}
        status={display.status}
        isListening={isListening}
        targetLabel={targetLabel}
      />
    );

  const sidebarEl = tuningSelector ? (
    <TunerSidebar
      tuningSelector={tuningSelector}
      displayMode={displayMode}
      onDisplayModeChange={setDisplayMode}
      guideMode={guideMode}
      autoDetect={autoDetect}
      soundEnabled={soundEnabled}
      onGuideModeChange={setGuideMode}
      onAutoDetectChange={setAutoDetect}
      onSoundChange={setSoundEnabled}
      showGuideControls={displayMode === "guided"}
    />
  ) : null;

  if (isHome) {
    return (
      <section id={id} className="py-0">
        <div className="rounded-xl border border-gray-200 bg-white p-3 md:p-4 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <div className="flex-1 min-w-0 order-2 lg:order-1">
              <TuningProgressBar tunedCount={tunedCount} total={notes.length} compact />

              {guideMode && isListening && !isComplete && guideHint && (
                <p className="text-xs text-brand-700 font-medium text-center mb-1.5">
                  {guideHint}
                </p>
              )}

              <GuitarFretboard
                notes={notes}
                activeString={activeString}
                stringStates={stringStates}
                liveState={liveState}
                onSelectString={handleSelectString}
                onRequestMic={() => startListeningRef.current()}
                isListening={isListening}
              />

              <div className="grid grid-cols-2 gap-2 mt-2 items-stretch">
                {isComplete ? (
                  <TuningComplete
                    compact
                    total={notes.length}
                    elapsedMs={finalElapsedMs}
                    onReset={resetProgress}
                  />
                ) : (
                  <>
                    {meterPanel}
                    <TuneDirectionHint
                      status={display.status}
                      isListening={isListening}
                      hasSignal={display.hasSignal}
                      compact
                    />
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100">
                <SignalStrength
                  bars={display.bars}
                  label={display.label}
                  isListening={isListening}
                />
                <div className="flex items-center gap-3">
                  <TuningSessionTimer
                    elapsedMs={isComplete ? finalElapsedMs : elapsedMs}
                    isListening={isListening}
                  />
                  {isListening ? (
                    <button
                      type="button"
                      onClick={stopListening}
                      className="text-xs text-gray-500 hover:text-gray-800 underline"
                    >
                      Stop mic
                    </button>
                  ) : null}
                  {tunedCount > 0 && (
                    <button
                      type="button"
                      onClick={resetProgress}
                      className="text-xs text-gray-500 hover:text-gray-800 underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {error && <p className="mt-2 text-xs text-red-500 text-center">{error}</p>}
            </div>

            {sidebarEl && (
              <div className="order-1 lg:order-2 lg:border-l lg:border-gray-100 lg:pl-4">
                {sidebarEl}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
        <TunerModeToggle mode={displayMode} onChange={setDisplayMode} />

        <TunerOnboarding
          isListening={isListening}
          hasSignal={display.hasSignal}
          status={display.status}
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
            hasSignal={display.hasSignal}
            onSwitch={() => {
              if (detectedStringIndex !== null) handleSelectString(detectedStringIndex);
            }}
          />
        )}

        {displayMode === "guided" && isListening && !isComplete && guideMode && guideHint && (
          <p className="mb-4 text-center text-sm text-brand-700 font-medium">
            {guideHint}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-stretch">
          <GuitarHeadstock
            notes={notes}
            activeString={activeString}
            stringStates={stringStates}
            liveState={liveState}
            onSelectString={handleSelectString}
            stringLabelMode={stringLabelMode}
          />
          <div className="flex flex-col gap-4">
            {meterPanel}
            <TuneDirectionHint
              status={display.status}
              isListening={isListening}
              hasSignal={display.hasSignal}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-1">
          <SignalStrength
            bars={display.bars}
            label={display.label}
            isListening={isListening}
          />
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-sm text-gray-500">
              {displayMode === "pro" || autoDetect ? "Detected" : "Tuning"}:{" "}
              <span className="font-semibold text-gray-800">{targetLabel}</span>
            </p>
            <TuningSessionTimer
              elapsedMs={isComplete ? finalElapsedMs : elapsedMs}
              isListening={isListening}
            />
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
