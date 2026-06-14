"use client";

import Link from "next/link";
import type { Tuning } from "@/types/tuning";

interface TuningSelectorCompactProps {
  tunings: Tuning[];
  activeSlug: string;
}

export function TuningSelectorCompact({ tunings, activeSlug }: TuningSelectorCompactProps) {
  return (
    <nav className="flex flex-col gap-0.5">
      {tunings.map((tuning) => {
        const isActive = tuning.slug === activeSlug;
        const href =
          tuning.slug === "standard" ? "/" : `/guitar-tunings/${tuning.slug}`;

        return (
          <Link
            key={tuning.slug}
            href={href}
            className={`rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "bg-brand-600 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {tuning.name}
          </Link>
        );
      })}
    </nav>
  );
}
