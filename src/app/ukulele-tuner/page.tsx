import type { Metadata } from "next";
import { TunerPageContent } from "@/components/tuner/TunerPage";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import { ukulele, SITE_URL } from "@/lib/tunings";

const tuning = ukulele[0];
const url = `${SITE_URL}/ukulele-tuner`;

export const metadata: Metadata = {
  title: "Ukulele Tuner - Free Online Ukulele Tuner",
  description: tuning.description,
  keywords: tuning.keywords,
  alternates: { canonical: url },
  openGraph: {
    title: "Ukulele Tuner - Free Online Ukulele Tuner",
    description: tuning.description,
    url,
  },
};

export default function UkuleleTunerPage() {
  return (
    <>
      <JsonLd
        data={buildWebAppSchema("Ukulele Tuner", tuning.description, url)}
      />
      <JsonLd data={buildFaqSchema(tuning.faq)} />

      <TunerPageContent
        tuning={tuning}
        heroTitle="Ukulele Tuner"
        heroSubtitle="Tune Your Ukulele Instantly Using Your Microphone"
        showTuningSelector={false}
        showRelated={false}
        chartTitle="Ukulele Tuning Chart"
      />
    </>
  );
}
