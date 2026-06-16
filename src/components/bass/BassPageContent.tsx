"use client";

import Link from "next/link";
import { CompactHero } from "@/components/ui/CompactHero";
import { TunerTool } from "@/components/tuner/TunerTool";
import { TuningChart } from "@/components/tuner/TuningChart";
import { FAQ } from "@/components/ui/FAQ";
import {
  HowToTuneBassSection,
  BassTuningQualitySection,
  BassTuningFrequencySection,
} from "@/components/bass/BassInfoSections";
import type { Tuning, FAQItem } from "@/types/tuning";

interface BassPageContentProps {
  tuning: Tuning;
  faq: FAQItem[];
  heroTitle?: string;
  heroSubtitle?: string;
}

export function BassPageContent({
  tuning,
  faq,
  heroTitle = "Online Bass Tuner",
  heroSubtitle = "Free browser-based bass tuner — tap 🔊 for reference tones, or use Tap to tune for live microphone detection with cents-accurate feedback.",
}: BassPageContentProps) {
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
        title="Standard Bass Tuning Chart (E-A-D-G)"
        showNoteBadges={false}
        intro="Standard 4-string bass tuning runs from the lowest (thickest) string to the highest (thinnest). Use this chart as a quick reference while tuning with the fretboard above."
      />

      <HowToTuneBassSection />
      <BassTuningQualitySection />
      <BassTuningFrequencySection />

      <FAQ items={faq} title="Online Bass Tuner FAQ" />

      <section className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">More Instrument Tuners</h2>
        <p className="text-gray-600 mb-6 max-w-3xl">
          EasyTuner also covers guitar, ukulele, and violin — same fretboard layout,
          reference tones, and microphone detection on every page.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Link
            href="/"
            className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Guitar Tuner</span>
            <p className="mt-1 text-xs text-gray-500">Standard &amp; alternate tunings</p>
          </Link>
          <Link
            href="/ukulele-tuner"
            className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Ukulele Tuner</span>
            <p className="mt-1 text-xs text-gray-500">GCEA standard tuning</p>
          </Link>
          <Link
            href="/violin-tuner"
            className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">Violin Tuner</span>
            <p className="mt-1 text-xs text-gray-500">GDAE strings</p>
          </Link>
        </div>
      </section>
    </>
  );
}
