import { LogoMark } from "./LogoMark";
import { LOGO_GREEN, LOGO_TEXT } from "./logo-colors";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={32} />
      {showText && (
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: LOGO_TEXT }}
        >
          Easy<span style={{ color: LOGO_GREEN }}>Tuner</span>
        </span>
      )}
    </span>
  );
}
