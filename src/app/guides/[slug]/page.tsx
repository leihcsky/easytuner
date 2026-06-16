import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, getGuideSlugs, SITE_URL } from "@/lib/tunings";
import { guideContent } from "@/data/guide-content";
import { JsonLd, buildArticleSchema } from "@/components/seo/JsonLd";

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
  const pageTitle = guide.absolute ?? guide.title;

  return {
    title: guide.absolute ? { absolute: pageTitle } : guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: guide.description,
      url,
      type: "article",
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

  const url = `${SITE_URL}/guides/${slug}`;
  const articleTitle = guide.absolute ?? guide.title;

  return (
    <article className="py-12">
      <JsonLd
        data={buildArticleSchema(articleTitle, guide.description, url)}
      />

      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/guides" className="hover:text-brand-600">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{guide.title}</span>
      </nav>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">{guide.title}</h1>

      <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl">
        {guide.description}
      </p>

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
            {section.image && (
              <figure className="my-8">
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  width={section.image.width}
                  height={section.image.height}
                  className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                />
                {section.image.caption && (
                  <figcaption className="mt-3 text-sm text-gray-500 text-center">
                    {section.image.caption}
                  </figcaption>
                )}
              </figure>
            )}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed mb-4">
                {section.bullets.map((item, bIndex) => (
                  <li key={bIndex}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-brand-50 border border-brand-200">
        <p className="font-semibold text-gray-900 mb-2">Ready to tune your guitar?</p>
        <p className="text-gray-600 mb-4">
          Open EasyTuner&apos;s free online guitar tuner — reference tones, strobe dial,
          and auto-advance are ready when you are.
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
