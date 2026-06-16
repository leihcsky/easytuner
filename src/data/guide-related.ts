import { getGuide, guides } from "@/lib/tunings";
import type { Guide } from "@/types/tuning";

/** 2–3 related guide slugs per article (current slug excluded at render time). */
export const guideRelatedSlugs: Record<string, string[]> = {
  "how-to-tune-a-guitar": [
    "guitar-string-frequencies",
    "standard-guitar-tuning",
    "drop-d-vs-standard",
  ],
  "guitar-string-frequencies": [
    "how-to-tune-a-guitar",
    "standard-guitar-tuning",
    "drop-d-vs-standard",
  ],
  "standard-guitar-tuning": [
    "how-to-tune-a-guitar",
    "guitar-string-frequencies",
    "drop-d-vs-standard",
  ],
  "drop-d-vs-standard": [
    "standard-guitar-tuning",
    "guitar-string-frequencies",
    "how-to-tune-a-guitar",
  ],
};

export function getRelatedGuides(currentSlug: string): Guide[] {
  const configured = guideRelatedSlugs[currentSlug];
  const slugs =
    configured ??
    guides.filter((g) => g.slug !== currentSlug).map((g) => g.slug).slice(0, 3);

  return slugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => getGuide(slug))
    .filter((guide): guide is Guide => guide !== undefined)
    .slice(0, 3);
}
