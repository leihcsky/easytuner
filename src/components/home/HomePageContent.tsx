"use client";

import Link from "next/link";
import { CompactHero } from "@/components/ui/CompactHero";
import { TunerTool } from "@/components/tuner/TunerTool";
import { TuningSelectorCompact } from "@/components/tuner/TuningSelectorCompact";
import { TuningChart } from "@/components/tuner/TuningChart";
import { FAQ } from "@/components/ui/FAQ";
import { AlternateTuningSections } from "@/components/home/AlternateTuningSections";
import {
  HowToTuneSection,
  TuningQualitySection,
  TuningFrequencySection,
} from "@/components/home/HomeInfoSections";
import { getGuitarTuningPageCopy } from "@/data/guitar-tuning-page-content";
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

function tuningLinkLabel(tuning: Tuning): string {
  if (tuning.slug === "standard") return "Standard Tuning";
  return `${tuning.name} Tuning`;
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
  return `Free online ${tuning.name} guitar tuning (${sequence}) — tap 🔊 for reference tones or use Tap to tune with microphone detection.`;
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
  heroTitle,
  heroSubtitle,
  chartTitle,
  chartIntro,
  faqTitle,
  showPopularTunings = true,
}: HomePageContentProps) {
  const isStandard = tuning.slug === "standard";
  const pageCopy = !isStandard ? getGuitarTuningPageCopy(tuning.slug) : undefined;

  const resolvedHeroTitle =
    heroTitle ?? (isStandard ? DEFAULT_HERO.title : tuning.title);
  const resolvedSubtitle =
    heroSubtitle ?? pageCopy?.heroSubtitle ?? defaultHeroSubtitle(tuning);
  const resolvedChartTitle =
    chartTitle ??
    pageCopy?.chartTitle ??
    (isStandard
      ? "Standard Guitar Tuning Chart (EADGBE)"
      : `${tuning.name} Guitar Tuning Chart`);
  const resolvedChartIntro =
    chartIntro ?? pageCopy?.chartIntro ?? defaultChartIntro(tuning);
  const resolvedFaqTitle =
    faqTitle ??
    pageCopy?.faqTitle ??
    (isStandard ? "Online Guitar Tuner FAQ" : `${tuning.name} Guitar Tuning FAQ`);

  const relatedTunings = allTunings.filter((t) => t.slug !== tuning.slug);

  return (
    <>
      <CompactHero title={resolvedHeroTitle} subtitle={resolvedSubtitle} />

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

      {isStandard ? (
        <>
          <HowToTuneSection />
          <TuningQualitySection />
          <TuningFrequencySection />
        </>
      ) : pageCopy ? (
        <AlternateTuningSections
          whatIs={pageCopy.whatIs}
          howToTune={pageCopy.howToTune}
          whyUse={pageCopy.whyUse}
        />
      ) : null}

      <FAQ items={faq} title={resolvedFaqTitle} />

      {showPopularTunings && relatedTunings.length > 0 && (
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">More Guitar Tunings</h2>
          <p className="text-gray-600 mb-6 max-w-3xl">
            {isStandard
              ? "Beyond standard EADGBE, explore drop tunings, open chords, and folk setups — each page explains that tuning and includes a dedicated online tuner."
              : "Compare alternate tunings side by side — each page explains what makes that tuning different and loads the correct string targets in the tuner above."}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedTunings.map((t) => (
              <Link
                key={t.slug}
                href={tuningHref(t.slug)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-gray-900">{tuningLinkLabel(t)}</span>
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
