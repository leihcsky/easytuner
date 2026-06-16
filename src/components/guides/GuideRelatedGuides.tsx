import Link from "next/link";
import { getRelatedGuides } from "@/data/guide-related";

interface GuideRelatedGuidesProps {
  slug: string;
}

export function GuideRelatedGuides({ slug }: GuideRelatedGuidesProps) {
  const related = getRelatedGuides(slug);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-10 border-t border-gray-200" aria-labelledby="related-guides-heading">
      <h2 id="related-guides-heading" className="text-xl font-bold text-gray-900 mb-2">
        Related guides
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Continue learning with these tuning guides.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="block h-full rounded-xl border border-gray-200 bg-white p-5 hover:border-brand-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-gray-900">{guide.title}</span>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{guide.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
