"use client";

import { useRef } from "react";
import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { TunerTool } from "@/components/tuner/TunerTool";
import { TuningSelector } from "@/components/tuner/TuningSelector";
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
  const tunerRef = useRef<HTMLDivElement>(null);

  const scrollToTuner = () => {
    tunerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero
        title="Online Guitar Tuner"
        subtitle="Pluck any string — we detect it, guide you, and advance when you're in tune"
        onStartTuning={scrollToTuner}
      />

      <div className="mb-6">
        <TuningSelector tunings={allTunings} activeSlug={tuning.slug} />
      </div>

      <div ref={tunerRef}>
        <div className="mb-4 text-center max-w-xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900">Smart Guitar Tuner</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use <strong>Guide</strong> mode for step-by-step coaching, or switch to{" "}
            <strong>Pro</strong> for strobe-precision tuning. Auto-detect, direction hints,
            and session timer included.
          </p>
        </div>
        <TunerTool notes={tuning.notes} stringLabelMode="number" />
      </div>

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
