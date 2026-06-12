import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, getGuideSlugs, SITE_URL } from "@/lib/tunings";
import { guideContent } from "@/data/guide-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = `${SITE_URL}/guides/${slug}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const content = guideContent[slug];

  if (!guide || !content) {
    notFound();
  }

  return (
    <article className="py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/guides" className="hover:text-brand-600">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{guide.title}</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">{guide.title}</h1>

      <div className="prose prose-gray max-w-none">
        {content.map((section, index) => (
          <section key={index} className="mb-8">
            {section.heading && (
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-gray-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-brand-50 border border-brand-200">
        <p className="font-semibold text-gray-900 mb-2">Ready to tune your guitar?</p>
        <p className="text-gray-600 mb-4">
          Use our free online guitar tuner to tune your instrument instantly.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-2 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
        >
          Open Guitar Tuner
        </Link>
      </div>
    </article>
  );
}
