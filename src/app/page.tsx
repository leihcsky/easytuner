import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import { guitar, SITE_URL } from "@/lib/tunings";

const standardTuning = guitar.find((t) => t.slug === "standard")!;

const homepageFaq = [
  {
    question: "How does this online guitar tuner work?",
    answer:
      "Tap Tap to tune and allow microphone access. Pluck an open string and the strobe dial shows how sharp or flat you are in cents, with Tune up or Tune down hints. A checkmark appears when a string locks in tune. With auto-advance on, the tuner moves to the next string automatically.",
  },
  {
    question: "Is this online guitar tuner free?",
    answer:
      "Yes. EasyTuner is a free online guitar tuner — no registration, no download, and no app install. Open the page in your browser and start tuning.",
  },
  {
    question: "Can I hear reference pitches before tuning?",
    answer:
      "Yes. Tap the speaker icon next to each string on the fretboard to hear that string's target pitch. Turn on Loop to hold the reference tone while you compare by ear, or use it once to learn what each note should sound like.",
  },
  {
    question: "Can I tune an acoustic guitar online?",
    answer:
      "Absolutely. This online guitar tuner works with acoustic guitars, electric guitars, and guitars with a pickup. Use your device microphone in a reasonably quiet room and pluck each open string clearly.",
  },
  {
    question: "What is auto-advance and when should I turn it off?",
    answer:
      "Auto-advance moves you to the next string after each one is tuned — ideal when you want to work through every string in order, from lowest to highest. Turn it off in the sidebar if you want to jump between strings manually or revisit a single string without the tuner switching for you.",
  },
  {
    question: "How accurate is the online guitar tuner?",
    answer:
      "The tuner measures pitch in real time and displays deviation in cents (1/100 of a semitone). When a string is within the in-tune window, it locks with a checkmark on the fretboard — accurate enough for practice, recording, and most live playing.",
  },
  {
    question: "Can I tune alternate guitar tunings online?",
    answer:
      "Yes. Use the tuning selector to switch between Standard, Drop D, Drop C, Open G, DADGAD, and more. Each tuning updates the fretboard, reference tones, and target notes for every string.",
  },
];

const pageDescription =
  "Tune your guitar online with a microphone! Free guitar tuner for acoustic and electric — standard and alternate tunings, no download or sign-up.";

export const metadata: Metadata = {
  title: "Online Guitar Tuner - Free Guitar Tuning with Microphone",
  description: pageDescription,
  keywords: [
    "online guitar tuner",
    "guitar tuner",
    "guitar tuner online",
    "free guitar tuner",
    "tune guitar online",
    "EADGBE tuner",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Online Guitar Tuner - Free Guitar Tuning with Microphone",
    description: pageDescription,
    url: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={buildWebAppSchema("Online Guitar Tuner", pageDescription, SITE_URL)}
      />
      <JsonLd data={buildFaqSchema(homepageFaq)} />

      <HomePageContent
        tuning={standardTuning}
        allTunings={guitar}
        faq={homepageFaq}
      />
    </>
  );
}
