import { MapPin, Navigation, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HOURS, fullAddress, mapsLink, telLink } from "@/config/site";
import { hoursLabel, londonNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

export function HoursTable({ className }: { className?: string }) {
  // Highlight today's row after hydration (London time).
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(londonNow().day), []);

  return (
    <dl className={cn("divide-y divide-line text-sm", className)}>
      {HOURS.map((h) => {
        const isToday = today !== null && h.days.includes(today);
        return (
          <div key={h.label} className="flex items-center justify-between gap-4 py-2.5">
            <dt className={cn("flex flex-wrap items-center gap-2", isToday && "font-semibold")}>
              {h.label}
              {isToday && (
                <span className="rounded-full bg-volt px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-ink">
                  Today
                </span>
              )}
            </dt>
            <dd className={cn("shrink-0 tabular-nums", isToday ? "font-semibold" : "text-muted")}>
              {hoursLabel(h)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/** Address, live status, hours and quick actions. */
export function VisitCard({ className }: { className?: string }) {
  return (
    <div className={cn("panel p-6 md:p-7", className)}>
      <p className="kicker">Visit us</p>
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-start gap-2.5 py-1 font-semibold leading-snug hover:underline"
      >
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {fullAddress}
      </a>
      <OpenStatus className="mt-4" />
      <HoursTable className="mt-3" />
      <div className="mt-5 grid grid-cols-2 gap-2">
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ink min-h-11 text-sm"
        >
          <Navigation className="h-4 w-4" aria-hidden="true" /> Directions
        </a>
        <a href={telLink} className="btn btn-ghost min-h-11 text-sm">
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </a>
      </div>
    </div>
  );
}
