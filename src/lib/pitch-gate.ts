import {
  noteToFrequency,
  refineDetectedPitch,
  isBassTuningNotes,
  isUkuleleTuningNotes,
} from "./notes";

/** Default pitchy clarity — high strings. Low strings use a lower floor (see clarityMinForPitch). */
export const PITCH_CLARITY_MIN = 0.93;

/** RMS floor for Float32 analyser buffers (typical silence < 0.005, pluck > 0.02). */
export const PITCH_RMS_MIN = 0.012;

/** Consecutive valid frames required before accepting a pitch (~50ms at 60fps). */
export const PITCH_CONFIRM_FRAMES = 3;

/** Consecutive invalid frames before dropping an accepted pitch. */
export const PITCH_RELEASE_FRAMES = 8;

export function computeRms(buffer: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  return Math.sqrt(sum / buffer.length);
}

/** Instrument frequency bounds from tuning notes (with margin for detune + harmonics). */
export function getInstrumentFreqRange(notes: string[]): { minHz: number; maxHz: number } {
  const freqs = notes.map(noteToFrequency);
  const min = Math.min(...freqs);
  const max = Math.max(...freqs);
  return {
    minHz: min * 0.75,
    maxHz: max * 1.35,
  };
}

/** Pitchy clarity — lower for bass fundamentals and soft nylon ukulele plucks. */
export function clarityMinForPitch(pitch: number, notes: string[]): number {
  if (pitch <= 0) return PITCH_CLARITY_MIN;
  const bass = isBassTuningNotes(notes);
  const ukulele = isUkuleleTuningNotes(notes);
  const { minHz } = getInstrumentFreqRange(notes);
  if (bass && pitch < 55) return 0.72;
  if (pitch < minHz * 1.1) return bass ? 0.75 : 0.78;
  if (ukulele && pitch < 450) return 0.88;
  if (pitch < 120) return bass ? 0.82 : 0.85;
  if (pitch < 200) return bass ? 0.86 : 0.88;
  return PITCH_CLARITY_MIN;
}

/** Bass and ukulele plucks often have lower RMS in the analyser buffer. */
export function rmsMinForPitch(pitch: number, notes: string[]): number {
  if (pitch <= 0) return PITCH_RMS_MIN;
  const bass = isBassTuningNotes(notes);
  const ukulele = isUkuleleTuningNotes(notes);
  const { minHz } = getInstrumentFreqRange(notes);
  if (bass && pitch < 55) return 0.004;
  if (pitch < minHz * 1.15) return bass ? 0.0045 : 0.005;
  if (ukulele && pitch < 450) return 0.009;
  if (pitch < 120) return bass ? 0.006 : 0.007;
  if (pitch < 200) return bass ? 0.0075 : 0.008;
  return PITCH_RMS_MIN;
}

function pitchInInstrumentRange(p: number, minHz: number, maxHz: number): boolean {
  if (p >= minHz && p <= maxHz) return true;
  const partials = [0.5, 2, 3];
  for (const multiple of partials) {
    const fundamental = multiple < 1 ? p * 2 : p / multiple;
    if (fundamental >= minHz && fundamental <= maxHz) return true;
  }
  return false;
}

export type PitchCandidate = {
  pitch: number;
  clarity: number;
  rms: number;
};

export function isPitchCandidateValid(
  { pitch, clarity, rms }: PitchCandidate,
  notes: string[]
): boolean {
  if (pitch <= 0) return false;

  const refined = refineDetectedPitch(pitch, notes);
  const pitches = refined !== pitch ? [refined, pitch] : [pitch];

  for (const p of pitches) {
    const clarityMin = clarityMinForPitch(p, notes);
    const rmsMin = rmsMinForPitch(p, notes);
    if (clarity < clarityMin || rms < rmsMin) continue;

    const { minHz, maxHz } = getInstrumentFreqRange(notes);
    const inRange = pitchInInstrumentRange(p, minHz, maxHz);
    if (inRange) return true;
  }
  return false;
}

/** Larger FFT improves low-E (E1) fundamental detection for bass. */
export function getAnalyserFftSize(instrument?: string): number {
  return instrument === "bass" ? 16384 : 8192;
}

export class PitchGate {
  private confirmStreak = 0;
  private releaseStreak = 0;
  private accepted = false;

  reset(): void {
    this.confirmStreak = 0;
    this.releaseStreak = 0;
    this.accepted = false;
  }

  /** Returns true while pitch is confirmed or still within release hold. */
  update(valid: boolean): boolean {
    if (valid) {
      this.releaseStreak = 0;
      this.confirmStreak += 1;
      if (this.confirmStreak >= PITCH_CONFIRM_FRAMES) {
        this.accepted = true;
      }
      return this.accepted;
    }

    if (!this.accepted) {
      // Soft decay — a single noisy frame won't zero the whole confirm streak.
      this.confirmStreak = Math.max(0, this.confirmStreak - 1);
      return false;
    }

    this.confirmStreak = 0;
    this.releaseStreak += 1;
    if (this.releaseStreak >= PITCH_RELEASE_FRAMES) {
      this.accepted = false;
    }
    return this.accepted;
  }

  get isOpen(): boolean {
    return this.accepted;
  }
}
