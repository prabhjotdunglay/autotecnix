import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Service } from "@/content/services";
import { cn } from "@/lib/utils";

const lift = "transition duration-300 hover:-translate-y-0.5 hover:border-line-strong";

/** Listing card: icon, name, one-line description and guide price. */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const Icon = service.icon;
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className={cn("panel group flex gap-4 p-5", lift, className)}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-volt">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="font-semibold leading-snug">{service.name}</span>
          <ArrowUpRight
            className="mt-0.5 h-4 w-4 shrink-0 text-muted transition group-hover:text-fg"
            aria-hidden="true"
          />
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{service.short}</span>
        <span className="mt-2.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em]">
          {formatPrice(service)}
          {service.priceNote ? ` · ${service.priceNote}` : ""}
        </span>
      </span>
    </Link>
  );
}

/** Compact tile for grids of popular services. */
export function ServiceTile({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className={cn("panel group flex flex-col justify-between gap-5 p-4 md:p-5", lift)}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-volt">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-muted transition group-hover:text-fg"
          aria-hidden="true"
        />
      </span>
      <span>
        <span className="block font-semibold leading-snug hyphens-auto">{service.name}</span>
        <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
          {formatPrice(service)}
        </span>
      </span>
    </Link>
  );
}
