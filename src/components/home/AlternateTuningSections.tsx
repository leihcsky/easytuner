import type { TuningPageSection } from "@/data/guitar-tuning-page-content";
import { GuideInlineText } from "@/components/guides/GuideInlineText";

function ContentSection({ section }: { section: TuningPageSection }) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>
            <GuideInlineText text={paragraph} />
          </p>
        ))}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="list-disc pl-5 space-y-2 marker:text-brand-600">
            {section.bullets.map((item, index) => (
              <li key={index}>
                <GuideInlineText text={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

interface AlternateTuningSectionsProps {
  whatIs: TuningPageSection;
  howToTune: TuningPageSection;
  whyUse: TuningPageSection;
}

export function AlternateTuningSections({
  whatIs,
  howToTune,
  whyUse,
}: AlternateTuningSectionsProps) {
  return (
    <>
      <ContentSection section={whatIs} />
      <ContentSection section={howToTune} />
      <ContentSection section={whyUse} />
    </>
  );
}
