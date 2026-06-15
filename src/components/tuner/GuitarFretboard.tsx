"use client";

import { getNoteDisplay } from "@/lib/notes";
import type { StringTuneState } from "@/types/tuning";
import "./guitar-fretboard.css";

interface GuitarFretboardProps {
  notes: string[];
  activeString: number;
  stringStates: StringTuneState[];
  liveState?: StringTuneState;
  playingStringIndex?: number | null;
  onSelectString: (index: number) => void;
  onPlayReference?: (index: number) => void;
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
  if (persisted === "in-tune") return "in-tune";
  if (activeString === index && liveState) return liveState;
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
  playingStringIndex = null,
  onSelectString,
  onPlayReference,
}: GuitarFretboardProps) {
  const visualOrder = notes.map((_, i) => notes.length - 1 - i);

  return (
    <div className="guitar-fretboard relative w-full select-none">
      <div className="guitar-neck-frame">
        <div className="guitar-fretboard-inner" role="img" aria-label="Guitar fretboard">
          <div className="guitar-headstock" aria-hidden>
            <div className="guitar-nut-texture" />
            <div className="guitar-nut-edge" />
          </div>

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

      <div className="guitar-strings-layer">
        {visualOrder.map((noteIndex) => {
          const state = displayStateFor(noteIndex, activeString, stringStates, liveState);
          const isActive = activeString === noteIndex;
          const isPlaying = playingStringIndex === noteIndex;
          const noteLabel = getNoteDisplay(notes[noteIndex]);

          return (
            <div key={noteIndex} className="guitar-string-row">
              <div className="guitar-nut-cell">
                {onPlayReference && (
                  <button
                    type="button"
                    className={`guitar-nut-play ${isPlaying ? "guitar-nut-play--playing" : ""}`}
                    onClick={() => onPlayReference(noteIndex)}
                    aria-label={`Play ${noteLabel} reference tone`}
                  >
                    <SpeakerIcon />
                  </button>
                )}
                <span
                  className={`guitar-nut-note ${isActive ? "guitar-nut-note--active" : ""} ${
                    isPlaying ? "guitar-nut-note--playing" : ""
                  }`}
                  aria-hidden
                >
                  {noteLabel}
                </span>
              </div>

              <button
                type="button"
                className={`guitar-string-track ${isPlaying ? "guitar-string-track--playing" : ""}`}
                onClick={() => onSelectString(noteIndex)}
                aria-label={`Select ${noteLabel} string`}
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

              {stringStates[noteIndex] === "in-tune" && (
                <span className="guitar-in-tune-mark" aria-hidden>
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpeakerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}
