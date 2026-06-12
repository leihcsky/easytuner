import { noteToFrequency, getNoteDisplay, formatFrequency } from "@/lib/notes";

interface TuningChartProps {
  notes: string[];
  title?: string;
  showFrequencies?: boolean;
  showNoteBadges?: boolean;
  intro?: string;
}

export function TuningChart({
  notes,
  title = "Guitar Tuning Chart",
  showFrequencies = true,
  showNoteBadges = true,
  intro,
}: TuningChartProps) {
  const stringCount = notes.length;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {intro && <p className="text-gray-600 mb-6 leading-relaxed">{intro}</p>}

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                String
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Note
              </th>
              {showFrequencies && (
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Frequency
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {stringCount - index}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {getNoteDisplay(note)}
                </td>
                {showFrequencies && (
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatFrequency(noteToFrequency(note))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNoteBadges && (
        <div className="mt-6 flex justify-center gap-3">
          {notes.map((note, index) => (
            <div
              key={index}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-800 font-bold text-sm"
            >
              {getNoteDisplay(note)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
