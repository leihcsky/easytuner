import { noteToFrequency } from "./notes";

let audioContext: AudioContext | null = null;

type ActiveReferenceTone = {
  oscillator: OscillatorNode;
  gainNode: GainNode;
};

let activeReferenceTone: ActiveReferenceTone | null = null;
let activeReferenceAudio: HTMLAudioElement | null = null;
let referenceAudioEndedHandler: (() => void) | null = null;
/** Invalidates in-flight HTMLAudioElement.play() callbacks after stop or new play. */
let referencePlayGeneration = 0;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export const REFERENCE_TONE_DURATION = 1.5;

function detachReferenceAudio(): void {
  if (!activeReferenceAudio) return;
  if (referenceAudioEndedHandler) {
    activeReferenceAudio.removeEventListener("ended", referenceAudioEndedHandler);
    referenceAudioEndedHandler = null;
  }
  activeReferenceAudio.pause();
  activeReferenceAudio.currentTime = 0;
  activeReferenceAudio.src = "";
  activeReferenceAudio.load();
  activeReferenceAudio = null;
}

function safeStopOscillator(oscillator: OscillatorNode, gainNode: GainNode): void {
  try {
    const ctx = gainNode.context;
    const now = ctx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.04);
    oscillator.stop(now + 0.05);
  } catch {
    // Already stopped (scheduled one-shot end or double stop).
  }

  try {
    oscillator.disconnect();
    gainNode.disconnect();
  } catch {
    // ignore
  }
}

export function stopReferenceTone(): void {
  referencePlayGeneration += 1;
  detachReferenceAudio();

  if (!activeReferenceTone) return;
  const { oscillator, gainNode } = activeReferenceTone;
  activeReferenceTone = null;
  safeStopOscillator(oscillator, gainNode);
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

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start(now);

  if (!sustain) {
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    try {
      oscillator.stop(now + duration);
    } catch {
      safeStopOscillator(oscillator, gainNode);
    }
    oscillator.onended = () => {
      if (activeReferenceTone?.oscillator === oscillator) {
        activeReferenceTone = null;
      }
      try {
        oscillator.disconnect();
        gainNode.disconnect();
      } catch {
        // ignore
      }
    };
  }

  activeReferenceTone = { oscillator, gainNode };
}

function playReferenceFromUrl(
  url: string,
  loop: boolean,
  fallbackNote: string,
  onEnded?: () => void
): void {
  stopReferenceTone();
  const generation = referencePlayGeneration;
  let didFallback = false;

  const tryFallback = () => {
    if (didFallback || generation !== referencePlayGeneration) return;
    didFallback = true;
    detachReferenceAudio();
    try {
      if (loop) {
        playReferenceToneLoop(fallbackNote);
      } else {
        playReferenceTone({ note: fallbackNote, onEnded });
      }
    } catch {
      // Swallow so audio.play() rejection does not surface as uncaught promise.
    }
  };

  const audio = new Audio(url);
  audio.preload = "auto";
  audio.loop = loop;

  if (!loop && onEnded) {
    referenceAudioEndedHandler = onEnded;
    audio.addEventListener("ended", onEnded);
  }

  audio.addEventListener("error", tryFallback);

  activeReferenceAudio = audio;
  void audio.play().catch(tryFallback);
}

export type PlayReferenceOptions = {
  note: string;
  audioUrl?: string;
  onEnded?: () => void;
  duration?: number;
};

/** One-shot reference tone (MP3 from R2 when audioUrl set, else synthesized). */
export function playReferenceTone(
  noteOrOptions: string | PlayReferenceOptions,
  duration = REFERENCE_TONE_DURATION
): void {
  const options =
    typeof noteOrOptions === "string"
      ? { note: noteOrOptions, duration }
      : { duration: REFERENCE_TONE_DURATION, ...noteOrOptions };

  if (options.audioUrl) {
    playReferenceFromUrl(options.audioUrl, false, options.note, options.onEnded);
    return;
  }

  startReferenceOscillator(options.note, false, options.duration ?? duration);
  if (options.onEnded) {
    window.setTimeout(options.onEnded, (options.duration ?? duration) * 1000);
  }
}

export type PlayReferenceLoopOptions = {
  note: string;
  audioUrl?: string;
};

/** Sustained reference tone until stopReferenceTone(). */
export function playReferenceToneLoop(
  noteOrOptions: string | PlayReferenceLoopOptions
): void {
  const options =
    typeof noteOrOptions === "string" ? { note: noteOrOptions } : noteOrOptions;

  if (options.audioUrl) {
    playReferenceFromUrl(options.audioUrl, true, options.note);
    return;
  }

  startReferenceOscillator(options.note, true);
}

export function isReferenceTonePlaying(): boolean {
  return activeReferenceTone !== null || activeReferenceAudio !== null;
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
