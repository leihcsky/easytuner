"use client";

import Link from "next/link";
import { CompactHero } from "@/components/ui/CompactHero";
import { TunerTool } from "@/components/tuner/TunerTool";
import { TuningChart } from "@/components/tuner/TuningChart";
import { FAQ } from "@/components/ui/FAQ";
import {
  WhatIsStandardUkuleleTuningSection,
  HowToTuneUkuleleSection,
  UkuleleVsGuitarTuningSection,
  UkuleleTuningFrequencySection,
} from "@/components/ukulele/UkuleleInfoSections";
import type { Tuning, FAQItem } from "@/types/tuning";

interface UkulelePageContentProps {
  tuning: Tuning;
  faq: FAQItem[];
  heroTitle?: string;
  heroSubtitle?: string;
}

export function UkulelePageContent({
  tuning,
  faq,
  heroTitle = "Online Ukulele Tuner",
  heroSubtitle = "Standard ukulele tuning G-C-E-A with re-entrant high G — tap 🔊 for reference tones or use Tap to tune with microphone detection on a four-string fretboard.",
}: UkulelePageContentProps) {
  return (
    <>
      <CompactHero title={heroTitle} subtitle={heroSubtitle} />

      <TunerTool
        notes={tuning.notes}
        instrument={tuning.instrument}
        tuningSlug={tuning.slug}
        stringLabelMode="number"
        layout="home"
        showGuideSidebar
      />

      <TuningChart
        notes={tuning.notes}
        title="Standard Ukulele Tuning Chart (GCEA)"
        showNoteBadges={false}
        intro="Standard ukulele tuning uses G4, C4, E4, and A4 from the 4th string to the 1st. The 4th-string G is higher than the 3rd-string C (re-entrant tuning). Use this chart with the ukulele fretboard above."
      />

      <WhatIsStandardUkuleleTuningSection />
      <HowToTuneUkuleleSection />
      <UkuleleVsGuitarTuningSection />
      <UkuleleTuningFrequencySection />

      <FAQ items={faq} title="Online Ukulele Tuner FAQ" />

      <section className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">More Instrument Tuners</h2>
        <p className="text-gray-600 mb-6 max-w-3xl">
          EasyTuner also covers guitar and bass — each page is built for that
          instrument&apos;s string count, pitches, and tuning layout.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/"
            className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Guitar Tuner</span>
            <p className="mt-1 text-xs text-gray-500">Standard &amp; alternate tunings</p>
          </Link>
          <Link
            href="/bass-tuner"
            className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Bass Tuner</span>
            <p className="mt-1 text-xs text-gray-500">E-A-D-G standard tuning</p>
          </Link>
        </div>
      </section>
    </>
  );
}
