"use client";

import { useRef } from "react";
import { Hero } from "@/components/ui/Hero";
import { TunerTool } from "@/components/tuner/TunerTool";
import { TuningSelector } from "@/components/tuner/TuningSelector";
import { TuningChart } from "@/components/tuner/TuningChart";
import { ReferenceTonePlayer } from "@/components/tuner/ReferenceTonePlayer";
import { FAQ } from "@/components/ui/FAQ";
import { RelatedTunings } from "@/components/ui/RelatedTunings";
import type { Tuning } from "@/types/tuning";

interface TunerPageProps {
  tuning: Tuning;
  allTunings?: Tuning[];
  heroTitle: string;
  heroSubtitle: string;
  showTuningSelector?: boolean;
  showRelated?: boolean;
  chartTitle?: string;
}

export function TunerPageContent({
  tuning,
  allTunings,
  heroTitle,
  heroSubtitle,
  showTuningSelector = true,
  showRelated = true,
  chartTitle,
}: TunerPageProps) {
  const tunerRef = useRef<HTMLDivElement>(null);

  const scrollToTuner = () => {
    tunerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero title={heroTitle} subtitle={heroSubtitle} onStartTuning={scrollToTuner} />

      {showTuningSelector && allTunings && (
        <div className="mb-8">
          <TuningSelector tunings={allTunings} activeSlug={tuning.slug} />
        </div>
      )}

      <div ref={tunerRef}>
        <TunerTool notes={tuning.notes} />
      </div>

      <TuningChart
        notes={tuning.notes}
        title={chartTitle ?? `${tuning.name} Tuning Chart`}
      />

      <ReferenceTonePlayer notes={tuning.notes} />

      <FAQ items={tuning.faq} />

      {showRelated && allTunings && (
        <RelatedTunings
          tunings={allTunings.filter((t) => t.slug !== tuning.slug)}
        />
      )}
    </>
  );
}
