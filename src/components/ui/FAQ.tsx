import type { FAQItem } from "@/types/tuning";

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  return (
    <section className="py-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
        {title}
      </h2>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
        {items.map((item, index) => (
          <article key={index} className="px-5 py-5 sm:px-6 sm:py-6">
            <h3 className="text-base font-semibold text-gray-900 leading-snug pr-2">
              {item.question}
            </h3>
            <p className="mt-2.5 text-sm sm:text-[0.9375rem] text-gray-600 leading-relaxed">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
