"use client";

import { playReferenceTone, playAllNotes } from "@/lib/audio";
import { getNoteDisplay, getStringLabel } from "@/lib/notes";

interface ReferenceTonePlayerProps {
  notes: string[];
  labelMode?: "note" | "number";
}

export function ReferenceTonePlayer({ notes, labelMode = "note" }: ReferenceTonePlayerProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reference Tones</h2>
      <p className="text-gray-600 mb-6">
        Listen to each string&apos;s reference pitch to tune by ear.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        {notes.map((note, index) => (
          <button
            key={index}
            onClick={() => playReferenceTone(note)}
            aria-label={`Play reference tone for ${getStringLabel(index, notes.length)}`}
            className="flex flex-col items-center px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-brand-300 hover:bg-brand-50 transition-all"
          >
            {labelMode === "number" ? (
              <span className="font-bold text-gray-900">
                {getStringLabel(index, notes.length)}
              </span>
            ) : (
              <>
                <span className="text-xs text-gray-500">
                  {getStringLabel(index, notes.length)}
                </span>
                <span className="font-bold text-gray-900">{getNoteDisplay(note)}</span>
              </>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => playAllNotes(notes)}
        className="px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
      >
        Play All Strings
      </button>
    </section>
  );
}
