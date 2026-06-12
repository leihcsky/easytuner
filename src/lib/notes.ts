const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const FLAT_TO_SHARP: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
};

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

export function getCentsFromTarget(frequency: number, targetNote: string): number {
  const targetFreq = noteToFrequency(targetNote);
  return Math.round(1200 * Math.log2(frequency / targetFreq));
}

export function formatFrequency(freq: number): string {
  return `${freq.toFixed(1)} Hz`;
}

export function getNoteDisplay(note: string): string {
  return note.replace(/(\d+)$/, "");
}

export function getStringNumber(index: number, total: number): number {
  return total - index;
}

/** Pick the target string whose note is closest to the detected frequency. */
export function findClosestStringIndex(frequency: number, notes: string[]): number {
  let bestIndex = 0;
  let bestCents = Infinity;

  for (let i = 0; i < notes.length; i++) {
    const deviation = Math.abs(getCentsFromTarget(frequency, notes[i]));
    if (deviation < bestCents) {
      bestCents = deviation;
      bestIndex = i;
    }
  }

  return bestIndex;
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
