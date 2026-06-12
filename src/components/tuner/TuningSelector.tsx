"use client";

import Link from "next/link";
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
        const href = tuning.slug === "standard" && basePath === "/guitar-tunings"
          ? "/"
          : `${basePath}/${tuning.slug}`;

        return (
          <Link
            key={tuning.slug}
            href={href}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-brand-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tuning.name}
          </Link>
        );
      })}
    </div>
  );
}
