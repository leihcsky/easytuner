export interface GuideCtaLink {
  href: string;
  label: string;
}

export interface GuideCta {
  title: string;
  description: string;
  primary: GuideCtaLink;
  secondary?: GuideCtaLink;
}

export const guideCtas: Record<string, GuideCta> = {
  "how-to-tune-a-guitar": {
    title: "Ready to tune your guitar?",
    description:
      "Open the free online guitar tuner and follow along — reference tones, strobe dial, and auto-advance are built in.",
    primary: { href: "/", label: "Open Guitar Tuner" },
    secondary: {
      href: "/guides/guitar-string-frequencies",
      label: "Guitar String Frequencies",
    },
  },
  "guitar-string-frequencies": {
    title: "Match these frequencies on your guitar",
    description:
      "Use EasyTuner to hear each target pitch and lock in with the microphone strobe dial.",
    primary: { href: "/", label: "Open Guitar Tuner" },
    secondary: {
      href: "/guides/how-to-tune-a-guitar",
      label: "How to Tune a Guitar",
    },
  },
  "standard-guitar-tuning": {
    title: "Tune to standard EADGBE",
    description:
      "EasyTuner loads E2–E4 targets by default. Open the tuner when you are ready to match each open string.",
    primary: { href: "/", label: "Open Guitar Tuner" },
    secondary: {
      href: "/guides/how-to-tune-a-guitar",
      label: "How to Tune a Guitar",
    },
  },
  "drop-d-vs-standard": {
    title: "Try Drop D for yourself",
    description:
      "Open the Drop D tuner with D-A-D-G-B-E targets, reference tones, and microphone detection — or return to standard tuning on the home page.",
    primary: { href: "/guitar-tunings/drop-d", label: "Open Drop D Tuner" },
    secondary: { href: "/", label: "Standard Guitar Tuner" },
  },
};

const defaultCta: GuideCta = {
  title: "Ready to tune your guitar?",
  description:
    "Open EasyTuner's free online guitar tuner — reference tones, strobe dial, and auto-advance are ready when you are.",
  primary: { href: "/", label: "Open Guitar Tuner" },
  secondary: { href: "/guides", label: "All Guides" },
};

export function getGuideCta(slug: string): GuideCta {
  return guideCtas[slug] ?? defaultCta;
}
