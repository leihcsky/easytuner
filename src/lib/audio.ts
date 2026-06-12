import { noteToFrequency } from "./notes";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function playReferenceTone(note: string, duration = 1.5): void {
  const ctx = getAudioContext();
  const frequency = noteToFrequency(note);

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
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
