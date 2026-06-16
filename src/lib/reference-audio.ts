/** Public R2 bucket base (no trailing slash). Override via env in production. */
const DEFAULT_REFERENCE_AUDIO_BASE_URL =
  "https://pub-e7d7c3543c7a4ac28cf60048c60e8a46.r2.dev";

export function getReferenceAudioBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_REFERENCE_AUDIO_BASE_URL ??
    DEFAULT_REFERENCE_AUDIO_BASE_URL
  ).replace(/\/$/, "");
}

/**
 * Reference MP3 URL: {base}/{instrument}/{slug}/{01-e2}.mp3
 * String index 0 = lowest string (01), note lowercased to match R2 keys.
 */
export function getReferenceAudioUrl(
  instrument: string,
  tuningSlug: string,
  stringIndex: number,
  note: string
): string {
  const seq = String(stringIndex + 1).padStart(2, "0");
  const noteKey = note.toLowerCase();
  return `${getReferenceAudioBaseUrl()}/${instrument}/${tuningSlug}/${seq}-${noteKey}.mp3`;
}
