import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { aboutSections, LEGAL_LAST_UPDATED } from "@/data/legal-content";
import { SITE_URL } from "@/lib/tunings";

export const metadata: Metadata = {
  title: "About EasyTuner",
  description:
    "Learn about EasyTuner — free online guitar, bass, and ukulele tuners with reference tones and browser-based microphone pitch detection.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About EasyTuner",
    description:
      "Free online instrument tuners with reference tones and microphone detection — built for musicians in the browser.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <LegalDocument
      title="About EasyTuner"
      intro="EasyTuner helps musicians tune guitars, basses, and ukuleles online — free, fast, and without installing an app."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={aboutSections}
    />
  );
}
