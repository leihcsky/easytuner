import type { Metadata } from "next";
import Link from "next/link";
import { guides, SITE_URL } from "@/lib/tunings";

export const metadata: Metadata = {
  title: "Guitar Tuning Guides",
  description:
    "Learn how to tune your guitar with our comprehensive guides on standard tuning, string frequencies, and alternative tunings.",
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: "Guitar Tuning Guides",
    description:
      "Comprehensive guides on guitar tuning, string frequencies, and alternative tunings.",
    url: `${SITE_URL}/guides`,
  },
};

export default function GuidesPage() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Guitar Tuning Guides</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">
        Everything you need to know about tuning your guitar, from beginner basics to
        advanced alternative tunings.
      </p>

      <div className="grid gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block rounded-xl border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900">{guide.title}</h2>
            <p className="mt-2 text-gray-600">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
