"use client";

import { useEffect, useRef, useState } from "react";
import type { TuningStatus } from "@/types/tuning";

const PITCH_HOLD_MS = 500;
const DISPLAY_UPDATE_MS = 120;
const IN_TUNE_ENTER = 5;
const IN_TUNE_EXIT = 8;

function stableTuningStatus(cents: number, prev: TuningStatus): TuningStatus {
  const abs = Math.abs(cents);
  if (prev === "in-tune") {
    if (abs <= IN_TUNE_EXIT) return "in-tune";
    return cents < 0 ? "flat" : "sharp";
  }
  if (abs <= IN_TUNE_ENTER) return "in-tune";
  return cents < 0 ? "flat" : "sharp";
}

export type SignalDisplay = {
  bars: number;
  label: string;
  hasSignal: boolean;
  status: TuningStatus;
  displayCents: number;
  displayFrequency: number;
  displayNote: string;
};

export function useStableTunerDisplay(
  clarity: number,
  frequency: number,
  cents: number,
  detectedNote: string,
  isListening: boolean
): SignalDisplay {
  const [hasSignal, setHasSignal] = useState(false);
  const [status, setStatus] = useState<TuningStatus>("in-tune");
  const [displayCents, setDisplayCents] = useState(0);
  const [displayFrequency, setDisplayFrequency] = useState(0);
  const [displayNote, setDisplayNote] = useState("");

  const lastPitchAtRef = useRef(0);
  const lastDisplayUpdateRef = useRef(0);
  const statusRef = useRef<TuningStatus>("in-tune");
  const heldRef = useRef({ cents: 0, frequency: 0, note: "" });

  useEffect(() => {
    if (!isListening) {
      setHasSignal(false);
      setStatus("in-tune");
      statusRef.current = "in-tune";
      setDisplayCents(0);
      setDisplayFrequency(0);
      setDisplayNote("");
      lastPitchAtRef.current = 0;
      return;
    }

    const pitchDetected = frequency > 0 && Boolean(detectedNote);

    if (pitchDetected) {
      lastPitchAtRef.current = Date.now();
      setHasSignal(true);

      const now = Date.now();
      const roundedCents = Math.round(cents);
      const shouldRefresh =
        now - lastDisplayUpdateRef.current >= DISPLAY_UPDATE_MS ||
        Math.abs(roundedCents - heldRef.current.cents) >= 4 ||
        detectedNote !== heldRef.current.note;

      if (shouldRefresh) {
        lastDisplayUpdateRef.current = now;
        heldRef.current = { cents: roundedCents, frequency, note: detectedNote };
        setDisplayCents(roundedCents);
        setDisplayFrequency(frequency);
        setDisplayNote(detectedNote);

        const next = stableTuningStatus(roundedCents, statusRef.current);
        statusRef.current = next;
        setStatus(next);
      }
      return;
    }

    const held = Date.now() - lastPitchAtRef.current < PITCH_HOLD_MS;
    if (held && lastPitchAtRef.current > 0) {
      setHasSignal(true);
      return;
    }

    setHasSignal(false);
    setDisplayCents(0);
    setDisplayFrequency(0);
    setDisplayNote("");
  }, [clarity, frequency, cents, detectedNote, isListening]);

  const bars = !isListening ? 0 : hasSignal ? 4 : 1;
  const label = !isListening ? "By ear" : hasSignal ? "Detected" : "Ready";

  return {
    bars,
    label,
    hasSignal,
    status,
    displayCents,
    displayFrequency,
    displayNote,
  };
}
