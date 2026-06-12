import type { Metadata } from "next";
import { TunerPageContent } from "@/components/tuner/TunerPage";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import { violin, SITE_URL } from "@/lib/tunings";

const tuning = violin[0];
const url = `${SITE_URL}/violin-tuner`;

export const metadata: Metadata = {
  title: "Violin Tuner - Free Online Violin Tuner",
  description: tuning.description,
  keywords: tuning.keywords,
  alternates: { canonical: url },
  openGraph: {
    title: "Violin Tuner - Free Online Violin Tuner",
    description: tuning.description,
    url,
  },
};

export default function ViolinTunerPage() {
  return (
    <>
      <JsonLd
        data={buildWebAppSchema("Violin Tuner", tuning.description, url)}
      />
      <JsonLd data={buildFaqSchema(tuning.faq)} />

      <TunerPageContent
        tuning={tuning}
        heroTitle="Violin Tuner"
        heroSubtitle="Tune Your Violin Instantly Using Your Microphone"
        showTuningSelector={false}
        showRelated={false}
        chartTitle="Violin Tuning Chart"
      />
    </>
  );
}
