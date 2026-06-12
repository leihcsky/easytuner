import { LOGO_GREEN } from "./logo-colors";
import { LogoNote } from "./LogoNote";
import { PICK_PATH } from "./logo-shapes";

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function LogoMark({ className, size = 32 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d={PICK_PATH} fill={LOGO_GREEN} />
      <LogoNote />
    </svg>
  );
}
