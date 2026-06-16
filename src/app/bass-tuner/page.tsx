import type { Metadata } from "next";
import { BassPageContent } from "@/components/bass/BassPageContent";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import { bass, SITE_URL } from "@/lib/tunings";

const tuning = bass[0];
const url = `${SITE_URL}/bass-tuner`;

const bassFaq = [
  {
    question: "How does this online bass tuner work?",
    answer:
      "Tap Tap to tune and allow microphone access. Pluck an open string and the strobe dial shows how sharp or flat you are in cents, with tune up or tune down hints. A checkmark appears when a string locks in tune. With auto-advance on, the tuner moves to the next string automatically.",
  },
  {
    question: "Is this online bass tuner free?",
    answer:
      "Yes. EasyTuner is a free online bass tuner — no registration, no download, and no app install. Open the page in your browser and start tuning.",
  },
  {
    question: "What is standard bass tuning?",
    answer:
      "Standard 4-string bass tuning is E-A-D-G from the lowest (4th) string to the highest (1st) string — the same note names as a guitar's bottom four strings, one octave lower.",
  },
  {
    question: "Can I hear reference pitches before tuning?",
    answer:
      "Yes. Tap the speaker icon next to each string on the fretboard to hear that string's target pitch. Turn on Loop to hold the reference tone while you compare by ear.",
  },
  {
    question: "Can I tune an electric bass online?",
    answer:
      "Yes. This tuner works with electric and acoustic bass guitars. Pluck each open string clearly near your device's microphone in a quiet room for the most accurate reading.",
  },
];

const pageDescription =
  "Tune your bass online with a microphone! Free 4-string bass tuner for E-A-D-G — no download or sign-up.";

export const metadata: Metadata = {
  title: "Online Bass Tuner - Free Bass Guitar Tuning with Microphone",
  description: pageDescription,
  keywords: [
    "online bass tuner",
    "bass tuner",
    "bass guitar tuner",
    "tune bass online",
    "free bass tuner",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Online Bass Tuner - Free Bass Guitar Tuning with Microphone",
    description: pageDescription,
    url,
  },
};

export default function BassTunerPage() {
  return (
    <>
      <JsonLd data={buildWebAppSchema("Online Bass Tuner", pageDescription, url)} />
      <JsonLd data={buildFaqSchema(bassFaq)} />

      <BassPageContent tuning={tuning} faq={bassFaq} />
    </>
  );
}
