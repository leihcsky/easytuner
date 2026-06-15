"use client";

import Link from "next/link";
import { formatTuningPitchSequence } from "@/lib/notes";
import type { Tuning } from "@/types/tuning";

interface TuningSelectorProps {
  tunings: Tuning[];
  activeSlug: string;
  basePath?: string;
}

export function TuningSelector({
  tunings,
  activeSlug,
  basePath = "/guitar-tunings",
}: TuningSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tunings.map((tuning) => {
        const isActive = tuning.slug === activeSlug;
        const href =
          tuning.slug === "standard" && basePath === "/guitar-tunings"
            ? "/"
            : `${basePath}/${tuning.slug}`;
        const pitchSequence = formatTuningPitchSequence(tuning.notes);

        return (
          <Link
            key={tuning.slug}
            href={href}
            className={`inline-flex flex-col items-center rounded-full px-4 py-2 transition-colors ${
              isActive
                ? "bg-brand-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="text-sm font-semibold leading-tight">{tuning.name}</span>
            <span
              className={`mt-0.5 text-[10px] font-mono leading-tight tracking-tight ${
                isActive ? "text-white/90" : "text-gray-500"
              }`}
            >
              {pitchSequence}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
