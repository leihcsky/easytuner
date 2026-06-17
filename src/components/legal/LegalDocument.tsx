import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

interface LegalDocumentProps {
  title: string;
  intro?: string;
  lastUpdated: string;
  sections: LegalSection[];
  children?: ReactNode;
}

export function LegalDocument({
  title,
  intro,
  lastUpdated,
  sections,
  children,
}: LegalDocumentProps) {
  return (
    <article className="py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {lastUpdated}</p>
      {intro && (
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{intro}</p>
      )}
      {children}
      <div className="space-y-8 text-gray-600 leading-relaxed">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-3" : ""}>
                <LegalInlineText text={paragraph} />
              </p>
            ))}
            {section.list && (
              <ul className="mt-3 list-disc pl-5 space-y-1.5">
                {section.list.map((item) => (
                  <li key={item}>
                    <LegalInlineText text={item} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <p className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
        Questions? See our{" "}
        <Link href="/contact" className="text-brand-600 hover:underline">
          Contact
        </Link>{" "}
        page or read the{" "}
        <Link href="/privacy" className="text-brand-600 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </article>
  );
}

/** Supports [label](href) inline links in legal copy. */
function LegalInlineText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const href = match[2];
          const isExternal = href.startsWith("http");
          if (isExternal) {
            return (
              <a
                key={i}
                href={href}
                className="text-brand-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {match[1]}
              </a>
            );
          }
          return (
            <Link key={i} href={href} className="text-brand-600 hover:underline">
              {match[1]}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
