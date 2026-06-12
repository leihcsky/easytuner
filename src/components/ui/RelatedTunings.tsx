import Link from "next/link";
import type { Tuning } from "@/types/tuning";

interface RelatedTuningsProps {
  tunings: Tuning[];
  title?: string;
}

export function RelatedTunings({
  tunings,
  title = "Related Tunings",
}: RelatedTuningsProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {tunings.map((tuning) => (
          <Link
            key={tuning.slug}
            href={`/guitar-tunings/${tuning.slug}`}
            className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <span className="font-semibold text-gray-900">{tuning.name}</span>
            <p className="mt-1 text-xs text-gray-500">
              {tuning.notes.map((n) => n.replace(/\d+/, "")).join(" ")}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
