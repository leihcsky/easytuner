import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_LAST_UPDATED, termsSections } from "@/data/legal-content";
import { SITE_URL } from "@/lib/tunings";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "EasyTuner Terms of Service — rules and disclaimers for using our free online instrument tuners.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: "Terms of Service | EasyTuner",
    description: "Terms and conditions for using EasyTuner.org.",
    url: `${SITE_URL}/terms`,
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      intro="Please read these terms carefully before using EasyTuner. By using the site, you agree to them."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={termsSections}
    />
  );
}
