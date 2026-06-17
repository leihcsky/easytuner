import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { LEGAL_LAST_UPDATED, privacySections } from "@/data/legal-content";
import { SITE_URL } from "@/lib/tunings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "EasyTuner Privacy Policy — how we handle analytics, cookies, microphone tuning, and your data.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: "Privacy Policy | EasyTuner",
    description:
      "How EasyTuner collects and uses information, including Google Analytics and browser-based microphone tuning.",
    url: `${SITE_URL}/privacy`,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="This policy describes how EasyTuner handles information when you use our free online tuners and guides."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={privacySections}
    />
  );
}
