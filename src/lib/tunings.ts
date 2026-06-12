import guitarTunings from "../../data/tunings/guitar.json";
import bassTunings from "../../data/tunings/bass.json";
import ukuleleTunings from "../../data/tunings/ukulele.json";
import violinTunings from "../../data/tunings/violin.json";
import guidesData from "../../data/guides.json";
import type { Tuning, Guide } from "@/types/tuning";

export const guitar = guitarTunings as Tuning[];
export const bass = bassTunings as Tuning[];
export const ukulele = ukuleleTunings as Tuning[];
export const violin = violinTunings as Tuning[];
export const guides = guidesData as Guide[];

export function getGuitarTuning(slug: string): Tuning | undefined {
  return guitar.find((t) => t.slug === slug);
}

export function getGuitarTuningSlugs(): string[] {
  return guitar.map((t) => t.slug);
}

export function getInstrumentTuning(instrument: string, slug = "standard"): Tuning | undefined {
  const map: Record<string, Tuning[]> = { guitar, bass, ukulele, violin };
  return map[instrument]?.find((t) => t.slug === slug);
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}

export function getRelatedGuitarTunings(currentSlug: string): Tuning[] {
  return guitar.filter((t) => t.slug !== currentSlug);
}

export const SITE_URL = "https://easytuner.com";
export const SITE_NAME = "EasyTuner";
