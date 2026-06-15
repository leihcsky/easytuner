import { noteToFrequency, refineDetectedPitch } from "./notes";

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

/** Pitchy clarity is lower on bass strings — scale threshold down below ~120 Hz. */
export function clarityMinForPitch(pitch: number, notes: string[]): number {
  if (pitch <= 0) return PITCH_CLARITY_MIN;
  const { minHz } = getInstrumentFreqRange(notes);
  if (pitch < minHz * 1.1) return 0.78;
  if (pitch < 120) return 0.85;
  if (pitch < 200) return 0.88;
  return PITCH_CLARITY_MIN;
}

/** Bass plucks often have lower RMS in the analyser buffer. */
export function rmsMinForPitch(pitch: number, notes: string[]): number {
  if (pitch <= 0) return PITCH_RMS_MIN;
  const { minHz } = getInstrumentFreqRange(notes);
  if (pitch < minHz * 1.15) return 0.005;
  if (pitch < 120) return 0.007;
  if (pitch < 200) return 0.008;
  return PITCH_RMS_MIN;
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
    const inRange =
      (p >= minHz && p <= maxHz) || (p * 0.5 >= minHz && p * 0.5 <= maxHz);
    if (inRange) return true;
  }
  return false;
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
