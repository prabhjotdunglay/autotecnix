import { ArrowUpRight, MapPin } from "lucide-react";
import { useState } from "react";
import { Mark } from "@/components/brand/Logo";
import { SITE, fullAddress, mapsEmbed, mapsLink } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Click-to-load Google Map. Nothing is requested from Google (and no Google
 * cookies are set) until the visitor asks for the map, so no cookie banner
 * is needed.
 */
export function MapEmbed({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("panel relative isolate overflow-hidden", className)}>
      {loaded ? (
        <iframe
          title={`Map showing ${SITE.name}`}
          src={mapsEmbed}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          {/* Stylised street map */}
          <svg
            viewBox="0 0 800 500"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 -z-10 h-full w-full text-fg"
            aria-hidden="true"
          >
            <rect width="800" height="500" fill="#ecece5" />
            <g stroke="currentColor" strokeOpacity="0.05" strokeWidth="1">
              {Array.from({ length: 14 }, (_, i) => (
                <path key={`v${i}`} d={`M${i * 60} 0V500`} />
              ))}
              {Array.from({ length: 9 }, (_, i) => (
                <path key={`h${i}`} d={`M0 ${i * 60}H800`} />
              ))}
            </g>
            <path
              d="M-20 400 C150 360 260 430 420 380 S700 300 820 330"
              stroke="#9cc4ff"
              strokeOpacity="0.55"
              strokeWidth="26"
              fill="none"
            />
            <g stroke="#ffffff" fill="none" strokeLinecap="round">
              <path d="M-10 120 L820 210" strokeWidth="16" />
              <path d="M300 -10 L380 510" strokeWidth="12" />
              <path d="M560 -10 C540 160 600 300 520 510" strokeWidth="10" />
              <path d="M-10 290 L380 250 L820 90" strokeWidth="8" />
              <path d="M120 -10 L200 510" strokeWidth="6" />
            </g>
          </svg>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_0,rgba(244,244,239,0.85)_75%)]" />

          <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-5 p-8 text-center">
            <span className="relative grid h-16 w-16 place-items-center">
              <span className="ping absolute inset-0 rounded-full bg-volt" aria-hidden="true" />
              <span className="relative grid h-16 w-16 place-items-center rounded-full border border-line bg-card shadow-[var(--shadow-card)]">
                <Mark className="h-8 w-8" />
              </span>
            </span>
            <p className="flex max-w-xs items-start gap-2 text-sm font-medium">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {fullAddress}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="btn btn-ink min-h-11 px-5 text-sm"
              >
                Show interactive map
              </button>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost min-h-11 px-5 text-sm"
              >
                Open in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="max-w-xs text-xs text-muted">
              The interactive map is provided by Google and may set cookies once loaded.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
