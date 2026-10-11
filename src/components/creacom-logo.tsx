import { withBase } from "@/lib/base-path";

/**
 * Official Creacom logo — colour gradient symbol + white wordmark, transparent
 * background (from the brand .ai file, variant 2). For dark backgrounds only.
 * Vector SVG; PNG fallbacks live next to it (creacom-logo-white.png / @2x.png).
 */
export function CreacomLogo({ className = "h-7 w-auto md:h-8" }: { className?: string }) {
  return (
    <img
      src={withBase("/images/creacom-logo-white.svg")}
      alt="Creacom"
      width={314}
      height={73}
      decoding="async"
      className={`block ${className}`}
    />
  );
}
