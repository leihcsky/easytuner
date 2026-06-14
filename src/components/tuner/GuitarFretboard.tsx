"use client";

import { getNoteDisplay } from "@/lib/notes";
import type { StringTuneState } from "@/types/tuning";
import "./guitar-fretboard.css";

interface GuitarFretboardProps {
  notes: string[];
  activeString: number;
  stringStates: StringTuneState[];
  liveState?: StringTuneState;
  onSelectString: (index: number) => void;
  onRequestMic?: () => void;
  isListening: boolean;
}

/** Fret wire positions (% of inset fretboard width). */
const FRET_POSITIONS = [11, 21.5, 32, 42.5, 53, 63.5, 74, 84.5, 95];
/** Inlay dots at 3rd, 5th, 7th, 9th fret spaces. */
const DOT_POSITIONS = [26.75, 47.75, 68.75, 89.75];

function displayStateFor(
  index: number,
  activeString: number,
  stringStates: StringTuneState[],
  liveState?: StringTuneState
): StringTuneState {
  const persisted = stringStates[index];
  if (activeString === index && liveState && persisted !== "in-tune") return liveState;
  return persisted;
}

function stringStateClass(state: StringTuneState, isActive: boolean): string {
  if (!isActive) return "";
  return `guitar-string--active guitar-string--state-${state}`;
}

export function GuitarFretboard({
  notes,
  activeString,
  stringStates,
  liveState,
  onSelectString,
  onRequestMic,
  isListening,
}: GuitarFretboardProps) {
  const visualOrder = notes.map((_, i) => notes.length - 1 - i);

  return (
    <div className="guitar-fretboard relative w-full select-none">
      {/* VG-style outer neck shell (#2E2E2E) */}
      <div className="guitar-neck-frame">
        <div className="guitar-fretboard-inner" role="img" aria-label="Guitar fretboard">
          {/* Headstock / nut — semicircle caps mask top & bottom (VG headstock :before/:after) */}
          <div className="guitar-headstock" aria-hidden>
            <div className="guitar-nut-texture" />
            <div className="guitar-nut-edge" />
          </div>

          {/* Fretboard column — dark frame shows through padding as border */}
          <div className="guitar-neck">
            <div className="guitar-fretboard-inset">
              <div className="guitar-fretboard-surface" aria-hidden />
              {FRET_POSITIONS.map((pos) => (
                <div key={`fret-${pos}`}>
                  <div className="guitar-fret-shadow" style={{ left: `${pos}%` }} />
                  <div className="guitar-fret" style={{ left: `${pos}%` }} />
                </div>
              ))}
              {DOT_POSITIONS.map((pos) => (
                <div key={`dot-${pos}`} className="guitar-fret-dot" style={{ left: `${pos}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strings + note labels + interaction */}
      <div className="guitar-strings-layer">
        {visualOrder.map((noteIndex) => {
          const state = displayStateFor(noteIndex, activeString, stringStates, liveState);
          const isActive = activeString === noteIndex;
          return (
            <div key={noteIndex} className="guitar-string-row">
              <span
                className={`guitar-nut-label ${isActive ? "guitar-nut-label--active" : ""}`}
                aria-hidden
              >
                {getNoteDisplay(notes[noteIndex])}
              </span>

              <button
                type="button"
                className="guitar-string-track"
                onClick={() => onSelectString(noteIndex)}
                aria-label={`${getNoteDisplay(notes[noteIndex])} string`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={[
                    "guitar-string",
                    stringStateClass(state, isActive),
                    state === "untuned" && !isActive ? "opacity-90" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              </button>

              {state === "in-tune" && (
                <span className="guitar-in-tune-mark" aria-hidden>
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!isListening && onRequestMic && (
        <button
          type="button"
          onClick={onRequestMic}
          className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-[1px] transition-opacity hover:bg-black/50"
        >
          <span className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            <MicIcon />
            Tap to tune
          </span>
        </button>
      )}
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />
    </svg>
  );
}
