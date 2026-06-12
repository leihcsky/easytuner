import { LOGO_NOTE } from "./logo-colors";

interface LogoNoteProps {
  className?: string;
}

const STROKE = 1.2;

/** Thin-stroke eighth note (♪ style) for the pick interior. */
export function LogoNote({ className }: LogoNoteProps) {
  return (
    <g className={className}>
      <ellipse cx="13.6" cy="21.8" rx="2.8" ry="2.4" fill={LOGO_NOTE} />
      <path
        d="M15.9 21.8V11.2"
        stroke={LOGO_NOTE}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.9 11.2C20.8 11.6 22.4 14.6 19.8 16.8"
        stroke={LOGO_NOTE}
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}
