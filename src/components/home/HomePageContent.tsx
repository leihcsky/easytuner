"use client";

import Link from "next/link";
import { CompactHero } from "@/components/ui/CompactHero";
import { TunerTool } from "@/components/tuner/TunerTool";
import { TuningSelectorCompact } from "@/components/tuner/TuningSelectorCompact";
import { TuningChart } from "@/components/tuner/TuningChart";
import { FAQ } from "@/components/ui/FAQ";
import {
  HowToTuneSection,
  TuningQualitySection,
  TuningFrequencySection,
} from "@/components/home/HomeInfoSections";
import type { Tuning, FAQItem } from "@/types/tuning";

const POPULAR_TUNING_DESCRIPTIONS: Record<string, string> = {
  standard: "Most common — EADGBE",
  "drop-d": "Heavy rock & metal riffs",
  "drop-c": "Deep metal & hardcore",
  "open-g": "Blues & slide guitar",
  dadgad: "Celtic & folk fingerstyle",
};

const DEFAULT_HERO = {
  title: "Online Guitar Tuner",
  subtitle:
    "Free browser-based guitar tuner — tap 🔊 on the fretboard for reference tones, or use Tap to tune for live microphone detection with cents-accurate feedback.",
};

function formatNoteSequence(notes: string[]): string {
  return notes.map((n) => n.replace(/\d+/, "")).join("-");
}

function tuningHref(slug: string): string {
  return slug === "standard" ? "/" : `/guitar-tunings/${slug}`;
}

function defaultChartIntro(tuning: Tuning): string {
  const sequence = formatNoteSequence(tuning.notes);
  if (tuning.slug === "standard") {
    return "Standard online guitar tuning runs from the lowest (thickest) string to the highest (thinnest). Use this chart as a quick reference while tuning with the fretboard above.";
  }
  return `${tuning.name} tuning (${sequence}) from lowest to highest string. Use this chart as a quick reference while tuning with the fretboard above.`;
}

function defaultHeroSubtitle(tuning: Tuning): string {
  if (tuning.slug === "standard") {
    return DEFAULT_HERO.subtitle;
  }
  const sequence = formatNoteSequence(tuning.notes);
  return `Free browser-based ${tuning.name} guitar tuner (${sequence}) — tap 🔊 on the fretboard for reference tones, or use Tap to tune for live microphone detection.`;
}

export interface HomePageContentProps {
  tuning: Tuning;
  allTunings: Tuning[];
  faq: FAQItem[];
  heroTitle?: string;
  heroSubtitle?: string;
  chartTitle?: string;
  chartIntro?: string;
  faqTitle?: string;
  showPopularTunings?: boolean;
}

export function HomePageContent({
  tuning,
  allTunings,
  faq,
  heroTitle = DEFAULT_HERO.title,
  heroSubtitle,
  chartTitle,
  chartIntro,
  faqTitle,
  showPopularTunings = true,
}: HomePageContentProps) {
  const resolvedSubtitle = heroSubtitle ?? defaultHeroSubtitle(tuning);
  const resolvedChartTitle =
    chartTitle ??
    (tuning.slug === "standard"
      ? "Standard Guitar Tuning Chart (EADGBE)"
      : `${tuning.name} Tuning Chart`);
  const resolvedChartIntro = chartIntro ?? defaultChartIntro(tuning);
  const resolvedFaqTitle =
    faqTitle ??
    (tuning.slug === "standard"
      ? "Online Guitar Tuner FAQ"
      : `${tuning.name} Guitar Tuner FAQ`);

  const relatedTunings = allTunings.filter((t) => t.slug !== tuning.slug);

  return (
    <>
      <CompactHero title={heroTitle} subtitle={resolvedSubtitle} />

      <TunerTool
        notes={tuning.notes}
        instrument={tuning.instrument}
        tuningSlug={tuning.slug}
        stringLabelMode="number"
        layout="home"
        tuningSelector={
          <TuningSelectorCompact tunings={allTunings} activeSlug={tuning.slug} />
        }
      />

      <TuningChart
        notes={tuning.notes}
        title={resolvedChartTitle}
        showNoteBadges={false}
        intro={resolvedChartIntro}
      />

      <HowToTuneSection />
      <TuningQualitySection />
      <TuningFrequencySection />

      <FAQ items={faq} title={resolvedFaqTitle} />

      {showPopularTunings && relatedTunings.length > 0 && (
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">More Guitar Tunings</h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            {tuning.slug === "standard"
              ? "Beyond standard EADGBE, use our online guitar tuner for drop tunings, open chords, and folk setups — each page includes the same fretboard, reference tones, and microphone detection."
              : "Switch tunings anytime — each page includes the same fretboard, reference tones, and microphone detection."}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedTunings.map((t) => (
              <Link
                key={t.slug}
                href={tuningHref(t.slug)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-gray-900">
                  {t.slug === "standard" ? "Standard Tuner" : `${t.name} Tuner`}
                </span>
                <p className="mt-1 text-xs text-gray-500">
                  {POPULAR_TUNING_DESCRIPTIONS[t.slug] ?? "Alternative tuning"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
