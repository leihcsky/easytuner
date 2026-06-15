import { noteToFrequency } from "./notes";

let audioContext: AudioContext | null = null;

type ActiveReferenceTone = {
  oscillator: OscillatorNode;
  gainNode: GainNode;
};

let activeReferenceTone: ActiveReferenceTone | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export const REFERENCE_TONE_DURATION = 1.5;

export function stopReferenceTone(): void {
  if (!activeReferenceTone) return;
  const { oscillator, gainNode } = activeReferenceTone;
  const ctx = gainNode.context;
  const now = ctx.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0, now + 0.04);
  oscillator.stop(now + 0.05);
  activeReferenceTone = null;
}

function startReferenceOscillator(note: string, sustain: boolean, duration = REFERENCE_TONE_DURATION): void {
  stopReferenceTone();

  const ctx = getAudioContext();
  const frequency = noteToFrequency(note);
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  const now = ctx.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.28, now + 0.02);

  if (!sustain) {
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.stop(now + duration);
    oscillator.onended = () => {
      if (activeReferenceTone?.oscillator === oscillator) {
        activeReferenceTone = null;
      }
    };
  }

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start(now);

  activeReferenceTone = { oscillator, gainNode };
}

/** One-shot reference tone (~1.5s). */
export function playReferenceTone(note: string, duration = REFERENCE_TONE_DURATION): void {
  startReferenceOscillator(note, false, duration);
}

/** Sustained reference tone until stopReferenceTone(). */
export function playReferenceToneLoop(note: string): void {
  startReferenceOscillator(note, true);
}

export function isReferenceTonePlaying(): boolean {
  return activeReferenceTone !== null;
}

export async function playAllNotes(notes: string[], gap = 0.5): Promise<void> {
  for (let i = 0; i < notes.length; i++) {
    playReferenceTone(notes[i], 1.2);
    if (i < notes.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, (1.2 + gap) * 1000));
    }
  }
}

export async function requestMicrophone(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export function stopMicrophone(stream: MediaStream): void {
  stream.getTracks().forEach((track) => track.stop());
}

/** Short two-tone chime when a string locks in tune. */
export function playSuccessChime(existingCtx?: AudioContext): void {
  const ctx = existingCtx ?? getAudioContext();
  const now = ctx.currentTime;
  const tones = [523.25, 659.25];

  tones.forEach((freq, i) => {
    const start = now + i * 0.1;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = freq;

    gainNode.gain.setValueAtTime(0, start);
    gainNode.gain.linearRampToValueAtTime(0.12, start + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.3);
  });
}
