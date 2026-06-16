import Link from "next/link";
import type { GuideCta as GuideCtaConfig } from "@/data/guide-cta";

interface GuideCtaProps {
  cta: GuideCtaConfig;
}

export function GuideCta({ cta }: GuideCtaProps) {
  return (
    <div className="mt-12 p-6 rounded-xl bg-brand-50 border border-brand-200">
      <p className="font-semibold text-gray-900 mb-2">{cta.title}</p>
      <p className="text-gray-600 mb-4">{cta.description}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={cta.primary.href}
          className="inline-flex px-6 py-2 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
        >
          {cta.primary.label}
        </Link>
        {cta.secondary && (
          <Link
            href={cta.secondary.href}
            className="inline-flex px-6 py-2 rounded-full border border-brand-600 text-brand-700 font-medium hover:bg-brand-100 transition-colors"
          >
            {cta.secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
