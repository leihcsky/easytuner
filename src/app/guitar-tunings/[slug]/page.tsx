import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TunerPageContent } from "@/components/tuner/TunerPage";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import {
  getGuitarTuning,
  getGuitarTuningSlugs,
  guitar,
  SITE_URL,
} from "@/lib/tunings";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGuitarTuningSlugs()
    .filter((slug) => slug !== "standard")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tuning = getGuitarTuning(slug);
  if (!tuning) return {};

  const url = `${SITE_URL}/guitar-tunings/${slug}`;

  return {
    title: tuning.title,
    description: tuning.description,
    keywords: tuning.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tuning.title,
      description: tuning.description,
      url,
    },
  };
}

export default async function GuitarTuningPage({ params }: PageProps) {
  const { slug } = await params;
  const tuning = getGuitarTuning(slug);

  if (!tuning || slug === "standard") {
    notFound();
  }

  const url = `${SITE_URL}/guitar-tunings/${slug}`;

  return (
    <>
      <JsonLd
        data={buildWebAppSchema(tuning.title, tuning.description, url)}
      />
      <JsonLd data={buildFaqSchema(tuning.faq)} />

      <TunerPageContent
        tuning={tuning}
        allTunings={guitar}
        heroTitle={tuning.title}
        heroSubtitle={`Tune your guitar to ${tuning.name} (${tuning.notes.map((n) => n.replace(/\d+/, "")).join(" ")}) using your microphone`}
        chartTitle={`${tuning.name} Tuning Chart`}
      />
    </>
  );
}
