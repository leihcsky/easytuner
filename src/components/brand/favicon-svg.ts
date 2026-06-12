import { LOGO_GREEN, LOGO_NOTE } from "./logo-colors";
import { FAVICON_SCALE, PICK_PATH } from "./logo-shapes";

/** SVG markup for favicon / app icon — kept in sync with LogoMark. */
export function getFaviconSvg(): string {
  const s = FAVICON_SCALE;
  return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(16 16) scale(${s}) translate(-16 -16)">
    <path d="${PICK_PATH}" fill="${LOGO_GREEN}"/>
    <ellipse cx="13.6" cy="21.8" rx="2.8" ry="2.4" fill="${LOGO_NOTE}"/>
    <path d="M15.9 21.8V11.2" stroke="${LOGO_NOTE}" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M15.9 11.2C20.8 11.6 22.4 14.6 19.8 16.8" stroke="${LOGO_NOTE}" stroke-width="1.2" stroke-linecap="round"/>
  </g>
</svg>`;
}
