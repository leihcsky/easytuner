import type { Metadata } from "next";
import { BassPageContent } from "@/components/bass/BassPageContent";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import { bass, SITE_URL } from "@/lib/tunings";

const tuning = bass[0];
const url = `${SITE_URL}/bass-tuner`;

const bassFaq = [
  {
    question: "What is standard bass guitar tuning?",
    answer:
      "Standard 4-string bass tuning is E-A-D-G from the 4th string (lowest) to the 1st string (highest). The pitches are E1, A1, D2, and G2 — one octave below the bottom four strings on a guitar.",
  },
  {
    question: "Why is tuning a bass different from tuning a guitar?",
    answer:
      "Bass fundamentals are much lower (the open E string is about 41 Hz). Microphones need a firm pluck and a quiet room to track those waves. EasyTuner is configured for bass string targets and a four-string layout, not a six-string guitar neck.",
  },
  {
    question: "Can I tune an electric or acoustic bass online?",
    answer:
      "Yes. Pluck each open string near your device microphone. Electric basses work unplugged or through an amp at low volume; acoustic basses should be played naturally without heavy room noise.",
  },
  {
    question: "How do reference tones help tune a bass by ear?",
    answer:
      "Tap the speaker beside each string to hear the correct bass pitch, then match your open string by turning the tuning key. Loop holds the reference so you can tune hands-free — useful when the low E is hard to remember by memory alone.",
  },
  {
    question: "Can I tune a 5-string bass with this page?",
    answer:
      "This tuner is set up for standard 4-string E-A-D-G bass. The low B on a 5-string is not included. You can still tune strings 4 through 1 on a five-string instrument using the four targets shown.",
  },
  {
    question: "Is this online bass tuner free?",
    answer:
      "Yes. No registration, download, or app install — open the page in your browser and tune all four strings with reference tones or your microphone.",
  },
];

const pageTitle = "Online Bass Tuner - Free Bass Tuning";
const pageDescription =
  "Tune your bass online with a microphone! Free 4-string bass tuner for E-A-D-G — no download or sign-up.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "online bass tuner",
    "bass tuner",
    "bass guitar tuning",
    "standard bass tuning",
    "tune bass online",
    "E A D G bass tuning",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url,
  },
};

export default function BassTunerPage() {
  return (
    <>
      <JsonLd data={buildWebAppSchema(pageTitle, pageDescription, url)} />
      <JsonLd data={buildFaqSchema(bassFaq)} />

      <BassPageContent tuning={tuning} faq={bassFaq} />
    </>
  );
}
