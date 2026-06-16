import type { Metadata } from "next";
import { UkulelePageContent } from "@/components/ukulele/UkulelePageContent";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import { ukulele, SITE_URL } from "@/lib/tunings";

const tuning = ukulele[0];
const url = `${SITE_URL}/ukulele-tuner`;

const ukuleleFaq = [
  {
    question: "What is standard ukulele tuning?",
    answer:
      "Standard ukulele tuning is G-C-E-A from the 4th string to the 1st. On most soprano, concert, and tenor ukuleles the pitches are G4, C4, E4, and A4, with the G string tuned high above the C string (re-entrant tuning).",
  },
  {
    question: "What is re-entrant ukulele tuning?",
    answer:
      "Re-entrant tuning means the 4th string (G) sounds higher than the 3rd string (C), unlike guitar strings that ascend in pitch from low to high. That high G gives ukulele chords their characteristic bright sound. This tuner expects G4 on the 4th string — not a low G an octave down.",
  },
  {
    question: "How is ukulele tuning different from guitar tuning?",
    answer:
      "Guitar strings run from low to high in pitch. Ukulele G-C-E-A breaks that pattern because of the high G. Tuning a uke as if it were the top four guitar strings is a common mistake — use the G4-C4-E4-A4 targets on this page instead.",
  },
  {
    question: "Can I tune a soprano, concert, or tenor ukulele online?",
    answer:
      "Yes. This page is built for standard G-C-E-A on soprano, concert, and tenor ukuleles. Pluck each open string near your device microphone in a quiet room. Baritone ukuleles typically use D-G-B-E and are not the target of this tuner.",
  },
  {
    question: "How do reference tones help tune a ukulele by ear?",
    answer:
      "Tap the speaker beside each string to hear the correct ukulele pitch, then match your open string by turning the tuning key. Loop holds the reference tone so you can tune hands-free — useful when nylon strings are hard to judge from memory alone.",
  },
  {
    question: "Is this online ukulele tuner free?",
    answer:
      "Yes. No registration, download, or app install — open the page in your browser and tune all four strings with reference tones or your microphone.",
  },
];

const pageTitle = "Online Ukulele Tuner - Free Ukulele Tuning";
const pageDescription =
  "Tune your ukulele online with a microphone! Free ukulele tuner for G-C-E-A — no download or sign-up.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "online ukulele tuner",
    "ukulele tuner",
    "ukulele tuning",
    "GCEA tuning",
    "re-entrant ukulele tuning",
    "tune ukulele online",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url,
  },
};

export default function UkuleleTunerPage() {
  return (
    <>
      <JsonLd data={buildWebAppSchema(pageTitle, pageDescription, url)} />
      <JsonLd data={buildFaqSchema(ukuleleFaq)} />

      <UkulelePageContent tuning={tuning} faq={ukuleleFaq} />
    </>
  );
}
