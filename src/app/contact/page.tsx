import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, LEGAL_LAST_UPDATED } from "@/data/legal-content";
import { SITE_URL } from "@/lib/tunings";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact EasyTuner for support, feedback, privacy requests, and partnership inquiries.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact EasyTuner",
    description: "Get in touch with the EasyTuner team.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <article className="py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {LEGAL_LAST_UPDATED}</p>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        We read every message. Whether you found a bug, have a tuning question, or want
        to discuss privacy or partnerships, reach out using the email below.
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Email</h2>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-brand-600 font-medium hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          We aim to reply within a few business days. Please include the page URL and
          your browser/device if you are reporting a technical issue.
        </p>
      </div>

      <div className="mt-10 space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            What we can help with
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Microphone permissions or tuner accuracy on your device</li>
            <li>Broken reference tones or page errors</li>
            <li>Privacy requests and data questions</li>
            <li>Feedback on guides and new tuning pages</li>
            <li>Copyright or content concerns</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Before you write
          </h2>
          <p>
            EasyTuner does not offer phone support or instrument repair services. For
            legal and privacy details, see our{" "}
            <Link href="/privacy" className="text-brand-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-brand-600 hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
