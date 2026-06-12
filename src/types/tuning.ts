export interface FAQItem {
  question: string;
  answer: string;
}

export interface Tuning {
  instrument: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  notes: string[];
  faq: FAQItem[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}

export type TuningStatus = "flat" | "in-tune" | "sharp";

export type StringTuneState = "untuned" | "close" | "in-tune";

export type TunerDisplayMode = "guided" | "pro";

export interface PitchResult {
  note: string;
  frequency: number;
  cents: number;
  status: TuningStatus;
}
