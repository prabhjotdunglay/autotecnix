import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Line drawing of a saloon in a 1000×400 viewBox.
 * Wheel centres: (240, 280) and (749, 280), radius 58. Ground at y = 338.
 * Line colour follows the surrounding text colour (ink on light, bone on dark).
 */

const BODY =
  "M92 302 L173.55 302 A70 70 0 1 1 306.45 302 L682.55 302 A70 70 0 1 1 815.45 302 L900 302 C912 300 920 290 921 272 L922 238 C922 222 918 200 912 186 L904 178 C880 172 858 168 840 164 C800 140 745 112 690 102 C640 94 560 94 505 102 C460 120 410 158 372 184 C300 196 200 206 120 220 C98 224 86 236 82 252 L80 276 C80 292 84 300 92 302 Z";
const GLASS =
  "M404 186 C440 158 478 128 515 116 C565 108 640 108 688 114 C730 124 770 146 800 166 Z";
const PANEL_LINES = [
  "M388 190 L352 300", // front door leading edge
  "M598 180 L597 300", // door shut line
  "M792 168 L790 222", // rear door trailing edge
  "M112 238 C300 228 600 214 914 206", // shoulder line
  "M320 288 L668 288", // sill
  "M86 284 H150", // front intake
  "M372 184 C330 190 300 194 250 200", // bonnet shut line
];
const MIRROR = "M412 186 C404 176 412 168 428 168 L440 172 L436 188 Z";
const HEADLIGHT = "M90 236 C120 230 150 226 178 225 L172 235 C142 239 114 243 88 246 Z";
const TAILLIGHT = "M866 184 C888 186 904 190 918 197 L917 207 C900 202 884 198 864 194 Z";
const SPOKES = [
  "M0 -10V-41",
  "M9.5 -3.1 39 -12.7",
  "M5.9 8.1 24.1 33.2",
  "M-5.9 8.1-24.1 33.2",
  "M-9.5 -3.1-39 -12.7",
];

/** Dark tyre with light rim detail, so wheels read on any background. */
function Wheel({ x, y, lit }: { x: number; y: number; lit: boolean }) {
  const rim = lit ? "#d4ff3a" : "#f2f2ec";
  const o = (v: number) => (lit ? 1 : v);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={58} fill="#0b0c0f" stroke="currentColor" strokeWidth={2} strokeOpacity={o(0.9)} />
      <g fill="none" stroke={rim}>
        <circle r={51} strokeWidth={1} strokeOpacity={o(0.3)} strokeDasharray="2 5" />
        <circle r={42} strokeWidth={1.5} strokeOpacity={o(0.75)} />
        <circle r={29} strokeWidth={1} strokeOpacity={o(0.35)} strokeDasharray="3 3" />
        <g strokeWidth={1.5} strokeOpacity={o(0.65)}>
          {SPOKES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <circle r={8} strokeWidth={1.5} strokeOpacity={o(0.85)} />
      </g>
      {/* Brake caliper */}
      <path
        d="M-25 -17 A 30 30 0 0 1 -6 -29.4"
        fill="none"
        stroke="#d4ff3a"
        strokeWidth={8}
        strokeLinecap="round"
      />
    </g>
  );
}

function CarLines({ lit = false }: { lit?: boolean }) {
  const o = (v: number) => (lit ? 1 : v);
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={lit ? "text-volt" : undefined}
    >
      <path
        d={BODY}
        strokeWidth={lit ? 2.5 : 2}
        strokeOpacity={o(0.9)}
        fill={lit ? "none" : "currentColor"}
        fillOpacity={lit ? undefined : 0.04}
      />
      <path
        d={GLASS}
        strokeWidth={1.5}
        strokeOpacity={o(0.55)}
        fill={lit ? "none" : "currentColor"}
        fillOpacity={lit ? undefined : 0.06}
      />
      <path d="M606 110 L598 178" strokeWidth={5} strokeOpacity={o(0.55)} strokeLinecap="butt" />
      {PANEL_LINES.map((d) => (
        <path key={d} d={d} strokeWidth={1.25} strokeOpacity={o(0.4)} />
      ))}
      <g strokeWidth={1.5} strokeOpacity={o(0.6)}>
        <rect x={500} y={200} width={36} height={6} rx={3} />
        <rect x={690} y={193} width={34} height={6} rx={3} />
        <path d={MIRROR} />
        <rect x={872} y={296} width={26} height={8} rx={4} />
      </g>
      <Wheel x={240} y={280} lit={lit} />
      <Wheel x={749} y={280} lit={lit} />
    </g>
  );
}

export function CarBlueprint({
  className,
  scan = false,
  label,
  children,
}: {
  className?: string;
  /** Animated diagnostic sweep (use on dark backgrounds) */
  scan?: boolean;
  /** Accessible description; omit for purely decorative use */
  label?: string;
  /** Extra SVG content drawn on top, in car coordinates */
  children?: ReactNode;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const sweep = (
    <animateTransform
      attributeName="transform"
      type="translate"
      values="-220 0; 1220 0; 1220 0"
      keyTimes="0; 0.72; 1"
      calcMode="spline"
      keySplines="0.65 0 0.35 1; 0 0 1 1"
      dur="6.5s"
      repeatCount="indefinite"
    />
  );

  return (
    <svg
      viewBox="0 0 1000 400"
      className={cn("block h-auto w-full overflow-visible text-fg", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {scan && (
        <defs>
          <linearGradient id={`${uid}-fade`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.82" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-beam`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#d4ff3a" stopOpacity="0" />
            <stop offset="1" stopColor="#d4ff3a" stopOpacity="0.22" />
          </linearGradient>
          <mask
            id={`${uid}-mask`}
            maskUnits="userSpaceOnUse"
            x="-300"
            y="0"
            width="1600"
            height="400"
          >
            <rect x={0} y={0} width={200} height={400} fill={`url(#${uid}-fade)`}>
              {sweep}
            </rect>
          </mask>
        </defs>
      )}

      {/* Ground line */}
      <path d="M40 338H960" stroke="currentColor" strokeOpacity={0.2} strokeWidth={1} />

      <CarLines />

      {/* Lights */}
      <path
        d={HEADLIGHT}
        fill="#d4ff3a"
        stroke="currentColor"
        strokeOpacity={0.5}
        strokeWidth={1}
      />
      <path d={TAILLIGHT} fill="#ff5a1f" fillOpacity={0.9} />

      {scan && (
        <g className="scan-layer">
          <g mask={`url(#${uid}-mask)`}>
            <CarLines lit />
          </g>
          <g>
            {sweep}
            <rect x={60} y={40} width={140} height={300} fill={`url(#${uid}-beam)`} />
            <rect x={198} y={40} width={2} height={300} fill="#d4ff3a" />
          </g>
        </g>
      )}

      {children}
    </svg>
  );
}
