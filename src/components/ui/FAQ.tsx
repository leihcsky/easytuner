import type { FAQItem } from "@/types/tuning";

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <details
            key={index}
            className="group rounded-xl border border-gray-200 bg-white overflow-hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium text-gray-900 hover:bg-gray-50">
              {item.question}
              <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="px-6 pb-4 text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
