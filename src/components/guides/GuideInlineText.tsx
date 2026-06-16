import Link from "next/link";
import { splitGuideInlineText } from "@/lib/guide-inline-links";

interface GuideInlineTextProps {
  text: string;
}

export function GuideInlineText({ text }: GuideInlineTextProps) {
  const parts = splitGuideInlineText(text);

  return (
    <>
      {parts.map((part, index) =>
        part.type === "link" ? (
          <Link
            key={index}
            href={part.href}
            className="text-brand-600 font-medium hover:text-brand-700"
          >
            {part.label}
          </Link>
        ) : (
          <span key={index}>{part.value}</span>
        )
      )}
    </>
  );
}
