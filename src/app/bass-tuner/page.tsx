import type { Metadata } from "next";
import { TunerPageContent } from "@/components/tuner/TunerPage";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import { bass, SITE_URL } from "@/lib/tunings";

const tuning = bass[0];
const url = `${SITE_URL}/bass-tuner`;

export const metadata: Metadata = {
  title: "Bass Tuner - Free Online Bass Guitar Tuner",
  description: tuning.description,
  keywords: tuning.keywords,
  alternates: { canonical: url },
  openGraph: {
    title: "Bass Tuner - Free Online Bass Guitar Tuner",
    description: tuning.description,
    url,
  },
};

export default function BassTunerPage() {
  return (
    <>
      <JsonLd
        data={buildWebAppSchema("Bass Tuner", tuning.description, url)}
      />
      <JsonLd data={buildFaqSchema(tuning.faq)} />

      <TunerPageContent
        tuning={tuning}
        heroTitle="Bass Tuner"
        heroSubtitle="Tune Your Bass Instantly Using Your Microphone"
        showTuningSelector={false}
        showRelated={false}
        chartTitle="Bass Tuning Chart"
      />
    </>
  );
}
