import type { MetadataRoute } from "next";
import {
  getGuitarTuningSlugs,
  getGuideSlugs,
  SITE_URL,
} from "@/lib/tunings";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/bass-tuner`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/ukulele-tuner`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const tuningPages: MetadataRoute.Sitemap = getGuitarTuningSlugs()
    .filter((slug) => slug !== "standard")
    .map((slug) => ({
      url: `${SITE_URL}/guitar-tunings/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const guidePages: MetadataRoute.Sitemap = getGuideSlugs().map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...tuningPages, ...guidePages];
}
