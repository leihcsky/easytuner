import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { JsonLd, buildFaqSchema, buildWebAppSchema } from "@/components/seo/JsonLd";
import { guitar, SITE_URL } from "@/lib/tunings";

const standardTuning = guitar.find((t) => t.slug === "standard")!;

const homepageFaq = [
  {
    question: "How does an online guitar tuner work?",
    answer:
      "Our online guitar tuner uses your device's microphone to detect the pitch of each string. It analyzes the frequency in real-time and shows whether you need to tune up or down.",
  },
  {
    question: "Is this guitar tuner free?",
    answer:
      "Yes, EasyTuner is completely free to use. No registration, no downloads, and no ads required.",
  },
  {
    question: "Can I tune an acoustic guitar online?",
    answer:
      "Absolutely. Our tuner works with acoustic guitars, electric guitars, and any guitar with a built-in pickup. Just allow microphone access and pluck each string.",
  },
  {
    question: "How often should I tune my guitar?",
    answer:
      "Tune before every practice session or performance. New strings may need retuning after each song until they stretch and settle. Temperature and humidity changes also affect tuning.",
  },
];

const pageDescription =
  "Free online guitar tuner. Tune your guitar instantly using your microphone. " +
  "Accurate real-time pitch detection helps you tune each string to the correct note.";

export const metadata: Metadata = {
  title: "Online Guitar Tuner - Free Guitar Tuning with Microphone",
  description: pageDescription,
  keywords: ["guitar tuner", "online guitar tuner", "guitar tuner online", "free guitar tuner"],
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
