import Link from "next/link";
import { guitar, guides } from "@/lib/tunings";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="font-semibold text-gray-900 mb-3">EasyTuner</p>
            <p className="text-sm text-gray-600">
              Free online instrument tuners. Tune your guitar, bass, and ukulele instantly.
            </p>
            <a
              href="https://toolfame.com/item/easytuner"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block opacity-90 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://toolfame.com/badge-light.svg"
                alt="Featured on toolfame.com"
                className="h-8 w-auto"
              />
            </a>
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
        </div>
        <nav
          className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
          aria-label="Legal"
        >
          <Link href="/about" className="text-gray-600 hover:text-brand-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-brand-600">
            Contact
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-brand-600">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-brand-600">
            Terms of Service
          </Link>
        </nav>
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EasyTuner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
