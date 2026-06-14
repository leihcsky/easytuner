"use client";

import Link from "next/link";
import { CompactHero } from "@/components/ui/CompactHero";
import { TunerTool } from "@/components/tuner/TunerTool";
import { TuningSelectorCompact } from "@/components/tuner/TuningSelectorCompact";
import { TuningChart } from "@/components/tuner/TuningChart";
import { ReferenceTonePlayer } from "@/components/tuner/ReferenceTonePlayer";
import { FAQ } from "@/components/ui/FAQ";
import {
  HowToTuneSection,
  TuningQualitySection,
  TuningFrequencySection,
} from "@/components/home/HomeInfoSections";
import type { Tuning, FAQItem } from "@/types/tuning";

const POPULAR_TUNING_DESCRIPTIONS: Record<string, string> = {
  "drop-d": "Heavy rock & metal riffs",
  "drop-c": "Deep metal & hardcore",
  "open-g": "Blues & slide guitar",
  dadgad: "Celtic & folk fingerstyle",
};

interface HomePageContentProps {
  tuning: Tuning;
  allTunings: Tuning[];
  faq: FAQItem[];
}

export function HomePageContent({ tuning, allTunings, faq }: HomePageContentProps) {
  return (
    <>
      <CompactHero
        title="Online Guitar Tuner"
        subtitle="Pluck a string on the fretboard — tune instantly with your microphone"
      />

      <TunerTool
        notes={tuning.notes}
        stringLabelMode="number"
        layout="home"
        tuningSelector={
          <TuningSelectorCompact tunings={allTunings} activeSlug={tuning.slug} />
        }
      />

      <ReferenceTonePlayer notes={tuning.notes} labelMode="number" />

      <TuningChart
        notes={tuning.notes}
        title="Guitar Tuning Chart"
        showNoteBadges={false}
        intro="Standard six-string tuning from the lowest (thickest) string to the highest (thinnest). Use the chart below as a reference while tuning."
      />

      <HowToTuneSection />
      <TuningQualitySection />
      <TuningFrequencySection />

      <FAQ items={faq} />

      <section className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Guitar Tunings</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allTunings
            .filter((t) => t.slug !== "standard")
            .map((t) => (
              <Link
                key={t.slug}
                href={`/guitar-tunings/${t.slug}`}
                className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-gray-900">{t.name} Tuner</span>
                <p className="mt-1 text-xs text-gray-500">
                  {POPULAR_TUNING_DESCRIPTIONS[t.slug] ?? "Alternative tuning"}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
