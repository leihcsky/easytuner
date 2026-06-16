"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { PitchDetector } from "pitchy";
import {
  frequencyToNote,
  findClosestStringIndex,
  getTuningStatus,
  getStringLabel,
  getNoteDisplay,
  pitchLocksTargetNote,
  getStringCentsDeviation,
  resolvePitchForString,
  getInTuneThresholdForNote,
} from "@/lib/notes";
import {
  computeRms,
  isPitchCandidateValid,
  PitchGate,
} from "@/lib/pitch-gate";
import { playSuccessChime, playReferenceTone, playReferenceToneLoop, stopReferenceTone } from "@/lib/audio";
import { getReferenceAudioUrl } from "@/lib/reference-audio";
import { GuitarHeadstock } from "@/components/tuner/GuitarHeadstock";
import { GuitarFretboard } from "@/components/tuner/GuitarFretboard";
import { TuningProgressBar } from "@/components/tuner/TuningProgressBar";
import { SignalStrength } from "@/components/tuner/SignalStrength";
import { useStableTunerDisplay } from "@/hooks/useStableTunerDisplay";
import { StrobeTuner } from "@/components/tuner/StrobeTuner";
import { TuneDirectionHint } from "@/components/tuner/TuneDirectionHint";
import { AutoAdvanceToggle } from "@/components/tuner/AutoAdvanceToggle";
import { ReferenceLoopToggle } from "@/components/tuner/ReferenceLoopToggle";
import { TunerSidebar } from "@/components/tuner/TunerSidebar";
import { TunerOnboarding } from "@/components/tuner/TunerOnboarding";
import { TuningComplete } from "@/components/tuner/TuningComplete";
import { TuningSessionTimer } from "@/components/tuner/TuningSessionTimer";
import type { StringTuneState, TuningStatus } from "@/types/tuning";

const CLOSE_THRESHOLD = 15;
const AUTO_DETECT_MAX_CENTS = 50;
const ADVANCE_DELAY_MS = 1000;
const IN_TUNE_LOCK_FRAMES = 6;
const IN_TUNE_LOCK_MS = 200;
const GATE_LOCK_MIN_STREAK = Math.ceil(IN_TUNE_LOCK_FRAMES / 2);
const GATE_LOCK_MIN_MS = IN_TUNE_LOCK_MS * 0.55;

interface TunerToolProps {
  notes: string[];
  instrument?: string;
  tuningSlug?: string;
  id?: string;
  stringLabelMode?: "note" | "number";
  layout?: "default" | "home";
  tuningSelector?: ReactNode;
  showGuideSidebar?: boolean;
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
  instrument,
  tuningSlug,
  id = "tuner-tool",
  stringLabelMode = "note",
  layout = "default",
  tuningSelector,
  showGuideSidebar = false,
}: TunerToolProps) {
  const isHome = layout === "home";
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [activeString, setActiveString] = useState(0);
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
  const [playingStringIndex, setPlayingStringIndex] = useState<number | null>(null);
  const [referenceLoop, setReferenceLoop] = useState(false);

  const autoAdvanceRef = useRef(autoAdvance);
  autoAdvanceRef.current = autoAdvance;

  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const detectorRef = useRef<PitchDetector<Float32Array> | null>(null);
  const rafRef = useRef<number>(0);
  const activeStringRef = useRef(activeString);
  const notesRef = useRef(notes);
  const prevStringStatesRef = useRef(stringStates);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevForAdvanceRef = useRef(stringStates);
  const sessionStartRef = useRef<number | null>(null);
  const startListeningRef = useRef<() => Promise<void>>(async () => {});
  const pitchGateRef = useRef(new PitchGate());
  const playReferenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inTuneStreakRef = useRef(0);
  const lockedStringRef = useRef<number | null>(null);
  const lockStartMsRef = useRef<number | null>(null);
  const pendingLockStringRef = useRef<number | null>(null);
  const lastGoodLockRef = useRef<{ closest: number; pitch: number } | null>(null);
  const stringStatesRef = useRef(stringStates);

  activeStringRef.current = activeString;
  notesRef.current = notes;
  stringStatesRef.current = stringStates;

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

  const persistStringLock = useCallback(
    (stringIndex: number, rawPitch: number, noteList: string[]) => {
      if (stringStatesRef.current[stringIndex] === "in-tune") return;
      const target = noteList[stringIndex];
      if (!pitchLocksTargetNote(rawPitch, target)) return;

      setStringStates((prev) => {
        if (prev[stringIndex] === "in-tune") return prev;
        const next = [...prev];
        next[stringIndex] = "in-tune";
        return next;
      });
    },
    []
  );

  const resetLockTracking = useCallback(() => {
    inTuneStreakRef.current = 0;
    lockedStringRef.current = null;
    lockStartMsRef.current = null;
    pendingLockStringRef.current = null;
    lastGoodLockRef.current = null;
  }, []);

  const detectPitch = useCallback(() => {
    const analyser = analyserRef.current;
    const detector = detectorRef.current;
    const ctx = audioContextRef.current;
    if (!analyser || !detector || !ctx) return;

    const buffer = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(buffer);

    const [rawPitch, pitchClarity] = detector.findPitch(buffer, ctx.sampleRate);
    const rms = computeRms(buffer);
    setClarity(pitchClarity);

    const candidateValid = isPitchCandidateValid(
      { pitch: rawPitch, clarity: pitchClarity, rms },
      notesRef.current
    );
    pitchGateRef.current.update(candidateValid);

    if (pitchGateRef.current.isOpen && rawPitch > 0 && candidateValid) {
      const currentNotes = notesRef.current;
      const activeIdx = activeStringRef.current;
      const closest = findClosestStringIndex(rawPitch, currentNotes);
      const closestTarget = currentNotes[closest];
      const closestCents = getStringCentsDeviation(rawPitch, closestTarget);

      // Coach mode: stay on the guided target. Free mode: only jump after current string is ✓.
      let stringIdx = activeIdx;
      const activeIsLocked = stringStatesRef.current[activeIdx] === "in-tune";
      if (
        !autoAdvanceRef.current &&
        activeIsLocked &&
        closest !== activeIdx &&
        closestCents <= AUTO_DETECT_MAX_CENTS
      ) {
        stringIdx = closest;
      }

      if (stringIdx !== activeIdx) {
        activeStringRef.current = stringIdx;
        setActiveString(stringIdx);
        resetLockTracking();
      }

      const target = currentNotes[stringIdx];
      const resolved = resolvePitchForString(rawPitch, target);
      const targetCents = resolved.cents;
      const inTuneThreshold = getInTuneThresholdForNote(target);
      const tuningStatus = getTuningStatus(targetCents, inTuneThreshold);
      const { note } = frequencyToNote(resolved.normalizedPitch);

      setDetectedNote(note);
      setFrequency(resolved.normalizedPitch);
      setCents(targetCents);
      setStatus(tuningStatus);

      let lockTargetIdx: number | null = null;

      if (pitchLocksTargetNote(rawPitch, target)) {
        lockTargetIdx = stringIdx;
      }

      if (lockTargetIdx !== null) {
        lastGoodLockRef.current = { closest: lockTargetIdx, pitch: rawPitch };
        pendingLockStringRef.current = lockTargetIdx;

        if (lockedStringRef.current !== lockTargetIdx) {
          lockedStringRef.current = lockTargetIdx;
          inTuneStreakRef.current = 0;
          lockStartMsRef.current = performance.now();
        }

        inTuneStreakRef.current += 1;
        const lockElapsed =
          lockStartMsRef.current !== null
            ? performance.now() - lockStartMsRef.current
            : 0;

        if (
          inTuneStreakRef.current >= IN_TUNE_LOCK_FRAMES &&
          lockElapsed >= IN_TUNE_LOCK_MS
        ) {
          persistStringLock(lockTargetIdx, rawPitch, currentNotes);
        }
      } else if (lockedStringRef.current !== null) {
        inTuneStreakRef.current = Math.max(0, inTuneStreakRef.current - 1);
        if (inTuneStreakRef.current === 0) {
          lockedStringRef.current = null;
          lockStartMsRef.current = null;
          pendingLockStringRef.current = null;
        }
      }
    } else if (!pitchGateRef.current.isOpen) {
      const pending = pendingLockStringRef.current;
      const lastGood = lastGoodLockRef.current;
      const lockElapsed =
        lockStartMsRef.current !== null
          ? performance.now() - lockStartMsRef.current
          : 0;
      if (
        pending !== null &&
        lastGood &&
        lastGood.closest === pending &&
        inTuneStreakRef.current >= GATE_LOCK_MIN_STREAK &&
        lockElapsed >= GATE_LOCK_MIN_MS
      ) {
        persistStringLock(pending, lastGood.pitch, notesRef.current);
      }

      resetLockTracking();
      setFrequency(0);
      setDetectedNote("");
      setCents(0);
    }

    rafRef.current = requestAnimationFrame(detectPitch);
  }, [persistStringLock, resetLockTracking]);

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
      analyser.fftSize = 8192;
      source.connect(analyser);
      analyserRef.current = analyser;

      detectorRef.current = PitchDetector.forFloat32Array(analyser.fftSize);
      pitchGateRef.current.reset();

      const startIdx = autoAdvanceRef.current
        ? firstUntunedIndex(stringStates)
        : activeStringRef.current;
      setActiveString(startIdx);
      activeStringRef.current = startIdx;

      setIsListening(true);
      detectPitch();
    } catch {
      setError("Microphone access denied. Please allow microphone access to use the tuner.");
    }
  }, [stringStates, detectPitch]);

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
    resetLockTracking();
    setIsListening(false);
    setDetectedNote("");
    setFrequency(0);
    setCents(0);
    setClarity(0);
  };

  const resetProgress = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    const fresh = initialStringStates(notes.length);
    setStringStates(fresh);
    setActiveString(0);
    activeStringRef.current = 0;
    setIsComplete(false);
    setElapsedMs(0);
    setFinalElapsedMs(0);
    sessionStartRef.current = isListening ? Date.now() : null;
    prevStringStatesRef.current = fresh;
    prevForAdvanceRef.current = fresh;
  };

  useEffect(() => {
    if (!isListening || !sessionStartRef.current || isComplete) return;
    const interval = setInterval(() => {
      if (sessionStartRef.current) {
        setElapsedMs(Date.now() - sessionStartRef.current);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isListening, isComplete]);

  useEffect(() => {
    const prev = prevStringStatesRef.current;

    stringStates.forEach((state, i) => {
      if (state === "in-tune" && prev[i] !== "in-tune") {
        playSuccessChime(audioContextRef.current ?? undefined);
      }
    });
    prevStringStatesRef.current = stringStates;

    if (
      autoAdvanceRef.current &&
      stringStates.length > 0 &&
      stringStates.every((s) => s === "in-tune")
    ) {
      setIsComplete(true);
      if (sessionStartRef.current) {
        const final = Date.now() - sessionStartRef.current;
        setFinalElapsedMs(final);
        setElapsedMs(final);
      }
    }
  }, [stringStates]);

  useEffect(() => {
    if (!autoAdvance) {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      if (isComplete) setIsComplete(false);
      prevForAdvanceRef.current = stringStates;
      return;
    }

    if (isComplete) {
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
          resetLockTracking();
          setFrequency(0);
          setDetectedNote("");
          setCents(0);
          setActiveString(nextIdx);
          activeStringRef.current = nextIdx;
        }, ADVANCE_DELAY_MS);
      }
    }

    prevForAdvanceRef.current = stringStates;
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, [stringStates, activeString, isComplete, autoAdvance]);

  useEffect(() => {
    const fresh = initialStringStates(notes.length);
    setStringStates(fresh);
    setActiveString(0);
    activeStringRef.current = 0;
    setIsComplete(false);
    setElapsedMs(0);
    setFinalElapsedMs(0);
    prevStringStatesRef.current = fresh;
    prevForAdvanceRef.current = fresh;
  }, [notes]);

  useEffect(() => {
    if (!referenceLoop) {
      stopReferenceTone();
      if (playReferenceTimeoutRef.current) clearTimeout(playReferenceTimeoutRef.current);
      setPlayingStringIndex(null);
    }
  }, [referenceLoop]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      if (playReferenceTimeoutRef.current) clearTimeout(playReferenceTimeoutRef.current);
      stopReferenceTone();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioContextRef.current?.close();
    };
  }, []);

  const handleSelectString = (index: number) => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (index !== activeStringRef.current) {
      resetLockTracking();
    }
    setActiveString(index);
    activeStringRef.current = index;
  };

  const handlePlayReference = useCallback(
    (index: number) => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);

      if (playingStringIndex === index) {
        stopReferenceTone();
        if (playReferenceTimeoutRef.current) clearTimeout(playReferenceTimeoutRef.current);
        setPlayingStringIndex(null);
        return;
      }

      setActiveString(index);
      activeStringRef.current = index;
      stopReferenceTone();
      if (playReferenceTimeoutRef.current) clearTimeout(playReferenceTimeoutRef.current);

      const note = notes[index];
      const audioUrl =
        instrument && tuningSlug
          ? getReferenceAudioUrl(instrument, tuningSlug, index, note)
          : undefined;

      const clearPlaying = () => {
        setPlayingStringIndex(null);
        playReferenceTimeoutRef.current = null;
      };

      if (referenceLoop) {
        playReferenceToneLoop({ note, audioUrl });
        setPlayingStringIndex(index);
        return;
      }

      playReferenceTone({
        note,
        audioUrl,
        onEnded: clearPlaying,
      });
      setPlayingStringIndex(index);
      if (!audioUrl) {
        playReferenceTimeoutRef.current = setTimeout(clearPlaying, 1500);
      }
    },
    [notes, instrument, tuningSlug, referenceLoop, playingStringIndex]
  );

  const meterPanel = (
    <StrobeTuner
      cents={display.displayCents}
      detectedNote={display.displayNote}
      frequency={display.displayFrequency}
      status={display.status}
      isListening={isListening}
      targetLabel={targetLabel}
      targetNote={notes[activeString]}
      compact={isHome}
    />
  );

  const sidebarEl =
    tuningSelector || showGuideSidebar ? (
      <TunerSidebar
        tuningSelector={tuningSelector}
        autoAdvance={autoAdvance}
        onAutoAdvanceChange={setAutoAdvance}
      />
    ) : null;

  if (isHome) {
    return (
      <section id={id} className="py-0">
        <div className="rounded-xl border border-gray-200 bg-white p-3 md:p-4 shadow-sm">
          {(tuningSelector || showGuideSidebar) && (
            <div className="lg:hidden space-y-2 mb-3">
              {tuningSelector}
              <AutoAdvanceToggle
                enabled={autoAdvance}
                onChange={setAutoAdvance}
                className="px-1"
              />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <div className="flex-1 min-w-0">
              {(isListening || tunedCount > 0) && (
                <TuningProgressBar tunedCount={tunedCount} total={notes.length} compact />
              )}

              {isListening && !isComplete && guideHint && (
                <p className="text-xs text-brand-700 font-medium text-center mb-1.5 mt-1">
                  {guideHint}
                </p>
              )}

              <GuitarFretboard
                notes={notes}
                activeString={activeString}
                stringStates={stringStates}
                liveState={liveState}
                playingStringIndex={playingStringIndex}
                instrument={instrument}
                onSelectString={handleSelectString}
                onPlayReference={handlePlayReference}
              />

              <div className="relative flex items-center mt-1.5 min-h-5">
                <ReferenceLoopToggle enabled={referenceLoop} onChange={setReferenceLoop} />
                {isListening && (
                  <p className="absolute left-1/2 -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap pointer-events-none">
                    Pluck the open string
                  </p>
                )}
              </div>

              <div className="mt-1.5 min-h-[11.5rem] flex flex-col items-center justify-center">
                {meterPanel}
                {isListening && (
                  <TuneDirectionHint
                    status={display.status}
                    hasSignal={display.hasSignal}
                    variant="inline"
                  />
                )}
              </div>

              {autoAdvance && isComplete && isListening && (
                <div className="mt-2">
                  <TuningComplete
                    compact
                    total={notes.length}
                    elapsedMs={finalElapsedMs}
                    onReset={resetProgress}
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 min-h-[2.75rem]">
                <div className="flex-1 min-w-0">
                  <SignalStrength
                    bars={display.bars}
                    label={display.label}
                    isListening={isListening}
                  />
                </div>

                <div className="shrink-0 px-1">
                  {!isListening ? (
                    <button
                      type="button"
                      onClick={() => startListeningRef.current()}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand-600/30 hover:bg-brand-700 active:scale-[0.98] transition-all"
                    >
                      <MicIcon />
                      Tap to tune
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopListening}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all"
                    >
                      Stop mic
                    </button>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex items-center justify-end gap-2">
                  <TuningSessionTimer
                    elapsedMs={isComplete ? finalElapsedMs : elapsedMs}
                    isListening={isListening && !isComplete}
                  />
                  {tunedCount > 0 && (
                    <button
                      type="button"
                      onClick={resetProgress}
                      className="text-xs text-gray-500 hover:text-gray-800 underline shrink-0"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {error && <p className="mt-2 text-xs text-red-500 text-center">{error}</p>}
            </div>

            {sidebarEl && (
              <div className="lg:border-l lg:border-gray-100 lg:pl-4">
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
        <TunerOnboarding
          isListening={isListening}
          hasSignal={display.hasSignal}
          status={display.status}
        />

        <p className="mb-4 text-sm text-gray-600">
          Strobe stripes slow down as you approach the target — they freeze when locked (±5¢).
        </p>

        <div className="mb-4 max-w-xs">
          <AutoAdvanceToggle enabled={autoAdvance} onChange={setAutoAdvance} />
        </div>

        {autoAdvance && isComplete && (
          <TuningComplete
            total={notes.length}
            elapsedMs={finalElapsedMs}
            onReset={resetProgress}
          />
        )}

        <TuningProgressBar tunedCount={tunedCount} total={notes.length} />

        {!isComplete && isListening && guideHint && (
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
          <div className="flex flex-col items-center gap-3">
            {isListening ? (
              <p className="text-[10px] text-gray-400 text-center -mb-1">
                Pluck the open string
              </p>
            ) : null}
            <StrobeTuner
              cents={display.displayCents}
              detectedNote={display.displayNote}
              frequency={display.displayFrequency}
              status={display.status}
              isListening={isListening}
              targetLabel={targetLabel}
              targetNote={notes[activeString]}
            />
            {isListening && (
              <TuneDirectionHint
                status={display.status}
                hasSignal={display.hasSignal}
                variant="inline"
              />
            )}
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
              Tuning:{" "}
              <span className="font-semibold text-gray-800">{targetLabel}</span>
            </p>
            <TuningSessionTimer
              elapsedMs={isComplete ? finalElapsedMs : elapsedMs}
              isListening={isListening && !isComplete}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {!isListening ? (
            <button
              onClick={startListening}
              className="px-8 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/25"
            >
              Enable Microphone (optional)
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

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />
    </svg>
  );
}
