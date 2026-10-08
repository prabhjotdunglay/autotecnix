import { cn } from "@/lib/utils";

/* Brand geometry. Keep in sync with /public/brand/*.svg */
const HEX = "M32 4 56.25 18v28L32 60 7.75 46V18Z";
const SPLIT_X = "M15 19h7.5L30 32l-7.5 13H15l7.5-13ZM49 19h-7.5L34 32l7.5 13H49l-7.5-13Z";

// Wordmark letters on a 32-unit cap height with 7-unit strokes.
const STROKE_LETTERS: { x: number; d: string }[] = [
  { x: 0, d: "M3.5 32V10L10 3.5h10l6.5 6.5V32M3.5 19h23" }, // A
  { x: 35.5, d: "M3.5 0v22l6.5 6.5h10l6.5-6.5V0" }, // U
  { x: 69.5, d: "M0 3.5h28M14 3.5V32" }, // T
  { x: 101.5, d: "M10 3.5h10l6.5 6.5v12L20 28.5H10L3.5 22V10Z" }, // O
  { x: 135.5, d: "M0 3.5h28M14 3.5V32" }, // T
  { x: 167.5, d: "M27 3.5H10L3.5 10v12l6.5 6.5H27M3.5 16H23" }, // E
  { x: 200, d: "M28 3.5H10L3.5 10v12l6.5 6.5H28" }, // C
];
const N_AND_I = "M233.5 0h7v32h-7ZM256.5 0h7v32h-7ZM233.5 0h8l22 32h-8ZM269 0h7v32h-7Z";
const X = "M281.5 0h8.5L311.5 32H303ZM303 0h8.5L290 32h-8.5Z";

/**
 * Hex-nut mark. By default it adapts to its surroundings: ink hex on light
 * backgrounds, volt hex inside `.inverse` areas.
 */
export function Mark({
  className,
  variant = "auto",
}: {
  className?: string;
  variant?: "auto" | "volt" | "ink";
}) {
  const hex = variant === "volt" ? "#d4ff3a" : variant === "ink" ? "#0b0c0f" : "var(--mark-hex)";
  const x = variant === "volt" ? "#0b0c0f" : variant === "ink" ? "#d4ff3a" : "var(--mark-x)";
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d={HEX} style={{ fill: hex, stroke: hex }} strokeWidth={4} strokeLinejoin="round" />
      <path d={SPLIT_X} style={{ fill: x }} />
    </svg>
  );
}

export function Wordmark({
  className,
  gradientId,
}: {
  className?: string;
  /** Optional <linearGradient> id to paint every letter with (giant footer wordmark) */
  gradientId?: string;
}) {
  const paint = gradientId ? `url(#${gradientId})` : "currentColor";
  return (
    <svg
      viewBox="0 0 311.5 32"
      className={cn("w-auto", className)}
      style={{ aspectRatio: "311.5 / 32" }}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke={paint} strokeWidth={7} strokeLinejoin="miter">
        {STROKE_LETTERS.map((l, i) => (
          <path key={i} d={l.d} transform={l.x ? `translate(${l.x} 0)` : undefined} />
        ))}
      </g>
      <path d={N_AND_I} fill={paint} />
      {/* Final X turns volt inside dark (.inverse) areas */}
      <path d={X} style={{ fill: gradientId ? paint : "var(--wordmark-x, currentColor)" }} />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="h-9 w-9" />
      <Wordmark className="h-[15px] text-fg" />
      <span className="sr-only">Autotecnix</span>
    </span>
  );
}
