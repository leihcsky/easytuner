import Link from "next/link";
import { guitar, guides } from "@/lib/tunings";
import { BadgeMarquee } from "./BadgeMarquee";

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <p className="font-semibold text-gray-900 mb-3">EasyTuner</p>
            <p className="text-sm text-gray-600">
              Free online instrument tuners. Tune your guitar, bass, and ukulele instantly.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Guitar Tunings</p>
            <ul className="space-y-2">
              {guitar.map((tuning) => (
                <li key={tuning.slug}>
                  <Link
                    href={
                      tuning.slug === "standard"
                        ? "/"
                        : `/guitar-tunings/${tuning.slug}`
                    }
                    className="text-sm text-gray-600 hover:text-brand-600"
                  >
                    {tuning.name} Tuner
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Instruments</p>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-brand-600">
                  Guitar Tuner
                </Link>
              </li>
              <li>
                <Link href="/bass-tuner" className="text-sm text-gray-600 hover:text-brand-600">
                  Bass Tuner
                </Link>
              </li>
              <li>
                <Link href="/ukulele-tuner" className="text-sm text-gray-600 hover:text-brand-600">
                  Ukulele Tuner
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Guides</p>
            <ul className="space-y-2">
              <li>
                <Link href="/guides" className="text-sm text-gray-600 hover:text-brand-600">
                  All Guides
                </Link>
              </li>
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-sm text-gray-600 hover:text-brand-600"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-3">Legal</p>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="mx-auto w-full sm:w-1/3">
            <BadgeMarquee />
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EasyTuner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
