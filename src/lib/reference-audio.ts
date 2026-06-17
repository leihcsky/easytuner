/** Public R2 bucket base (no trailing slash). Override via env in production. */
const DEFAULT_REFERENCE_AUDIO_BASE_URL =
  "https://audio.easytuner.org";

/** Instrument + tuning slugs with reference MP3s uploaded to R2. */
const REFERENCE_AUDIO_TUNINGS: Record<string, ReadonlySet<string>> = {
  guitar: new Set(["standard", "drop-d", "drop-c", "open-g", "dadgad"]),
  ukulele: new Set(["standard"]),
  bass: new Set(["standard"]),
};

export function hasReferenceAudioOnR2(instrument: string, tuningSlug: string): boolean {
  return REFERENCE_AUDIO_TUNINGS[instrument]?.has(tuningSlug) ?? false;
}

export function getReferenceAudioBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_REFERENCE_AUDIO_BASE_URL ??
    DEFAULT_REFERENCE_AUDIO_BASE_URL
  ).replace(/\/$/, "");
}

/** Guitar tunings on R2 where 01 = 1st string (highest) … 06 = 6th string (lowest). */
const GUITAR_REVERSED_FILE_SEQUENCE = new Set(["drop-c", "open-g", "dadgad"]);

function referenceFileSequence(
  instrument: string,
  tuningSlug: string,
  stringIndex: number,
  stringCount: number
): string {
  // Ukulele & bass standard on R2: 01 = 1st string (highest) … 04 = 4th (lowest);
  // app notes[0] is the 4th string.
  if (
    tuningSlug === "standard" &&
    (instrument === "ukulele" || instrument === "bass")
  ) {
    return String(stringCount - stringIndex).padStart(2, "0");
  }
  // Some guitar alternate tunings: 01 = 1st string … 06 = 6th string.
  if (instrument === "guitar" && GUITAR_REVERSED_FILE_SEQUENCE.has(tuningSlug)) {
    return String(stringCount - stringIndex).padStart(2, "0");
  }
  return String(stringIndex + 1).padStart(2, "0");
}

/**
 * Reference MP3 URL: {base}/{instrument}/{slug}/{01-note}.mp3
 * Guitar: string index 0 = 01 (lowest string).
 * Ukulele/bass standard: 01 = 1st string, 04 = 4th string.
 * Guitar standard/drop-d: 01 = 6th string (lowest) … 06 = 1st string.
 * Guitar drop-c: 01-d4 … 06-c2 (01 = 1st string).
 * Guitar open-g: 01-d4 … 06-d2 (01 = 1st string).
 * Guitar dadgad: 01-d4 … 06-d2 (01 = 1st string).
 */
export function getReferenceAudioUrl(
  instrument: string,
  tuningSlug: string,
  stringIndex: number,
  note: string,
  stringCount?: number
): string | undefined {
  if (!hasReferenceAudioOnR2(instrument, tuningSlug)) return undefined;

  const count = stringCount ?? (instrument === "ukulele" || instrument === "bass" ? 4 : 6);
  const seq = referenceFileSequence(instrument, tuningSlug, stringIndex, count);
  const noteKey = note.toLowerCase();
  return `${getReferenceAudioBaseUrl()}/${instrument}/${tuningSlug}/${seq}-${noteKey}.mp3`;
}
