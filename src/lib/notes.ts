const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const FLAT_TO_SHARP: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
};

/** Cents window for raw string auto-detect (no octave fold). */
export const STRING_MATCH_WINDOW_CENTS = 50;

/** Only treat ~2× frequency as a harmonic fold (low E fundamental detection). */
const HARMONIC_RATIO_MIN = 1.75;
const HARMONIC_RATIO_MAX = 2.25;

/**
 * Wound bass strings: the 2nd partial is typically ~8–12¢ sharp of a perfect octave.
 * When pitchy locks onto that partial, f0 = pitch/2 reads sharp by about this amount.
 */
const BASS_HARMONIC_SHARP_CENTS = 10;

export function parseNote(note: string): { name: string; octave: number } {
  const match = note.match(/^([A-G][#b]?)(\d+)$/);
  if (!match) throw new Error(`Invalid note: ${note}`);

  let name = match[1];
  if (name.length === 2 && name[1] === "b") {
    const sharp = FLAT_TO_SHARP[name];
    if (sharp) name = sharp;
  }

  return { name, octave: parseInt(match[2], 10) };
}

export function noteToFrequency(note: string): number {
  const { name, octave } = parseNote(note);
  const semitone = NOTE_NAMES.indexOf(name);
  if (semitone === -1) throw new Error(`Unknown note: ${name}`);

  const midi = (octave + 1) * 12 + semitone;
  const a4Midi = 69;
  return 440 * Math.pow(2, (midi - a4Midi) / 12);
}

export function frequencyToNote(frequency: number): { note: string; cents: number } {
  const a4Midi = 69;
  const midi = 12 * Math.log2(frequency / 440) + a4Midi;
  const roundedMidi = Math.round(midi);
  const cents = Math.round((midi - roundedMidi) * 100);

  const noteIndex = ((roundedMidi % 12) + 12) % 12;
  const octave = Math.floor(roundedMidi / 12) - 1;
  const note = `${NOTE_NAMES[noteIndex]}${octave}`;

  return { note, cents };
}

export function getTuningStatus(cents: number, threshold = 5): "flat" | "in-tune" | "sharp" {
  if (cents < -threshold) return "flat";
  if (cents > threshold) return "sharp";
  return "in-tune";
}

/** Wider lock window for bass fundamentals (mic/speaker chains, harmonics). */
export function getInTuneThresholdForNote(targetNote: string): number {
  const freq = noteToFrequency(targetNote);
  if (freq < 95) return 12;
  if (freq < 130) return 8;
  return 5;
}

export function getCentsFromTarget(frequency: number, targetNote: string): number {
  const targetFreq = noteToFrequency(targetNote);
  return Math.round(1200 * Math.log2(frequency / targetFreq));
}

/** Fold detected pitch to the octave nearest a reference (handles 2× harmonics on low strings). */
export function foldToNearestOctave(frequency: number, referenceHz: number): number {
  if (frequency <= 0 || referenceHz <= 0) return frequency;
  const octaves = Math.round(Math.log2(frequency / referenceHz));
  return frequency / Math.pow(2, octaves);
}

export function foldToTargetNote(frequency: number, targetNote: string): number {
  return foldToNearestOctave(frequency, noteToFrequency(targetNote));
}

export function formatFrequency(freq: number): string {
  return `${freq.toFixed(1)} Hz`;
}

export function getNoteDisplay(note: string): string {
  return note.replace(/(\d+)$/, "");
}

/** Open-string pitch sequence, low → high (e.g. E2-A2-D3-G3-B3-E4). */
export function formatTuningPitchSequence(notes: string[]): string {
  return notes.join("-");
}

export function getStringNumber(index: number, total: number): number {
  return total - index;
}

/** Detected frequency is ~2× the string fundamental (not 4× E4→E2). */
export function isLikelySecondHarmonic(pitch: number, targetNote: string): boolean {
  const targetFreq = noteToFrequency(targetNote);
  if (pitch <= 0 || targetFreq <= 0) return false;
  const ratio = pitch / targetFreq;
  return ratio >= HARMONIC_RATIO_MIN && ratio <= HARMONIC_RATIO_MAX;
}

/** Map detected pitch to a string target (raw first; 2× harmonic fold for bass only). */
export function resolvePitchForString(
  pitch: number,
  targetNote: string
): { normalizedPitch: number; cents: number; fromHarmonic: boolean } {
  const targetFreq = noteToFrequency(targetNote);
  const detected = frequencyToNote(pitch);

  if (detected.note === targetNote) {
    return {
      normalizedPitch: pitch,
      cents: getCentsFromTarget(pitch, targetNote),
      fromHarmonic: false,
    };
  }

  const rawCents = getCentsFromTarget(pitch, targetNote);
  if (Math.abs(rawCents) <= STRING_MATCH_WINDOW_CENTS) {
    return { normalizedPitch: pitch, cents: rawCents, fromHarmonic: false };
  }

  if (targetFreq < 130 && isLikelySecondHarmonic(pitch, targetNote)) {
    const normalizedPitch = foldToTargetNote(pitch, targetNote);
    const cents = Math.round(
      getCentsFromTarget(normalizedPitch, targetNote) - BASS_HARMONIC_SHARP_CENTS
    );
    const correctedHz = targetFreq * Math.pow(2, cents / 1200);
    return { normalizedPitch: correctedHz, cents, fromHarmonic: true };
  }
  return { normalizedPitch: pitch, cents: rawCents, fromHarmonic: false };
}

/** Cents deviation for string matching. */
export function getStringCentsDeviation(frequency: number, targetNote: string): number {
  return Math.abs(resolvePitchForString(frequency, targetNote).cents);
}

/** When several strings match within the window (e.g. E2/E4), pick nearest Hz. */
function breakPitchClassTie(frequency: number, notes: string[], windowCents: number): number {
  const candidates: number[] = [];
  for (let i = 0; i < notes.length; i++) {
    if (Math.abs(getCentsFromTarget(frequency, notes[i])) <= windowCents) {
      candidates.push(i);
    }
  }
  if (candidates.length <= 1) return candidates[0] ?? 0;

  let best = candidates[0];
  let bestDiff = Infinity;
  for (const i of candidates) {
    const diff = Math.abs(frequency - noteToFrequency(notes[i]));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}

/** Pick the target string whose note is closest to the detected frequency. */
export function findClosestStringIndex(frequency: number, notes: string[]): number {
  let bestRawIdx = 0;
  let bestRawDev = Infinity;

  for (let i = 0; i < notes.length; i++) {
    const rawDev = Math.abs(getCentsFromTarget(frequency, notes[i]));
    if (rawDev < bestRawDev) {
      bestRawDev = rawDev;
      bestRawIdx = i;
    }
  }

  if (bestRawDev <= STRING_MATCH_WINDOW_CENTS) {
    return breakPitchClassTie(frequency, notes, STRING_MATCH_WINDOW_CENTS);
  }

  let bestIdx = 0;
  let bestDev = Infinity;
  for (let i = 0; i < notes.length; i++) {
    const dev = getStringCentsDeviation(frequency, notes[i]);
    if (dev < bestDev) {
      bestDev = dev;
      bestIdx = i;
    }
  }
  return bestIdx;
}

/**
 * Optional bass correction — never downshift a pitch that already matches a string exactly.
 */
export function refineDetectedPitch(pitch: number, notes: string[]): number {
  if (pitch <= 0) return pitch;

  const rawIdx = findClosestStringIndex(pitch, notes);
  const targetNote = notes[rawIdx];
  const detected = frequencyToNote(pitch);

  if (detected.note === targetNote) {
    return pitch;
  }

  if (Math.abs(getCentsFromTarget(pitch, targetNote)) <= STRING_MATCH_WINDOW_CENTS) {
    if (parseNote(detected.note).octave === parseNote(targetNote).octave) {
      return pitch;
    }
  }

  for (const note of notes) {
    if (noteToFrequency(note) >= 130) continue;
    if (isLikelySecondHarmonic(pitch, note)) {
      return foldToTargetNote(pitch, note);
    }
  }

  return pitch;
}

/** True when pitch matches target note within lock threshold. */
export function pitchMatchesTargetNote(
  pitch: number,
  targetNote: string,
  maxCents?: number
): { matches: boolean; normalizedPitch: number; cents: number } {
  const threshold = maxCents ?? getInTuneThresholdForNote(targetNote);
  const resolved = resolvePitchForString(pitch, targetNote);
  const detected = frequencyToNote(resolved.normalizedPitch);

  if (detected.note !== targetNote) {
    return { matches: false, normalizedPitch: pitch, cents: resolved.cents };
  }

  if (resolved.fromHarmonic && noteToFrequency(targetNote) >= 130) {
    return { matches: false, normalizedPitch: pitch, cents: resolved.cents };
  }

  return {
    matches: Math.abs(resolved.cents) <= threshold,
    normalizedPitch: resolved.normalizedPitch,
    cents: resolved.cents,
  };
}

/** Lock when strict note match passes OR display would show in-tune for this target. */
export function pitchLocksTargetNote(pitch: number, targetNote: string): boolean {
  const threshold = getInTuneThresholdForNote(targetNote);
  if (pitchMatchesTargetNote(pitch, targetNote, threshold).matches) return true;
  const resolved = resolvePitchForString(pitch, targetNote);
  return getTuningStatus(resolved.cents, threshold) === "in-tune";
}

export function getStringLabel(index: number, total: number): string {
  const num = getStringNumber(index, total);
  const ordinals: Record<number, string> = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
    5: "5th",
    6: "6th",
  };
  return `${ordinals[num] ?? `${num}th`} string`;
}
