"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatTuningPitchSequence } from "@/lib/notes";
import type { Tuning } from "@/types/tuning";

interface TuningSelectorCompactProps {
  tunings: Tuning[];
  activeSlug: string;
}

function tuningHref(slug: string): string {
  return slug === "standard" ? "/" : `/guitar-tunings/${slug}`;
}

export function TuningSelectorCompact({ tunings, activeSlug }: TuningSelectorCompactProps) {
  const router = useRouter();

  return (
    <>
      {/* Mobile: compact dropdown */}
      <div className="lg:hidden w-full min-w-0">
        <label htmlFor="tuning-select" className="sr-only">
          Select tuning
        </label>
        <select
          id="tuning-select"
          value={activeSlug}
          onChange={(e) => router.push(tuningHref(e.target.value))}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          {tunings.map((tuning) => (
            <option key={tuning.slug} value={tuning.slug}>
              {tuning.name} · {formatTuningPitchSequence(tuning.notes)}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop sidebar: list */}
      <nav className="hidden lg:flex flex-col gap-0.5">
        {tunings.map((tuning) => {
          const isActive = tuning.slug === activeSlug;
          const pitchSequence = formatTuningPitchSequence(tuning.notes);

          return (
            <Link
              key={tuning.slug}
              href={tuningHref(tuning.slug)}
              className={`rounded-md px-2 py-1.5 transition-colors ${
                isActive
                  ? "bg-brand-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="block text-xs font-semibold leading-tight">{tuning.name}</span>
              <span
                className={`block mt-0.5 text-[10px] font-mono leading-tight tracking-tight ${
                  isActive ? "text-white/90" : "text-gray-400"
                }`}
              >
                {pitchSequence}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
