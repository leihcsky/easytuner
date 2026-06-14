import { noteToFrequency } from "@/lib/notes";

/** Minimum pitchy clarity — raised above library default to reject noise. */
export const PITCH_CLARITY_MIN = 0.93;

/** RMS floor for Float32 analyser buffers (typical silence < 0.005, pluck > 0.02). */
export const PITCH_RMS_MIN = 0.012;

/** Consecutive valid frames required before accepting a pitch (~50–80ms at 60fps). */
export const PITCH_CONFIRM_FRAMES = 5;

/** Consecutive invalid frames before dropping an accepted pitch. */
export const PITCH_RELEASE_FRAMES = 6;

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
    minHz: min * 0.82,
    maxHz: max * 1.35,
  };
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
  if (pitch <= 0 || clarity < PITCH_CLARITY_MIN || rms < PITCH_RMS_MIN) {
    return false;
  }
  const { minHz, maxHz } = getInstrumentFreqRange(notes);
  return pitch >= minHz && pitch <= maxHz;
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

    this.confirmStreak = 0;
    if (!this.accepted) return false;

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
