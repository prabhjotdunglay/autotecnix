import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  to?: "/" | "/services" | "/pricing" | "/about" | "/contact" | "/book";
}

/** Compact hero for inner pages. */
export function PageHero({
  kicker,
  title,
  intro,
  crumbs,
  children,
  aside,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Optional right-hand column on large screens (stacks below on mobile) */
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("relative isolate overflow-clip pb-8 pt-28 md:pb-10 md:pt-32", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[28rem] w-[28rem] rounded-full bg-volt/25 blur-[110px]"
      />
      <div
        className={cn(
          "shell",
          aside &&
            "grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-10",
        )}
      >
        <div className="min-w-0">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1">
                    {c.to ? (
                      <Link to={c.to} className="inline-block py-1 hover:text-fg hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-fg">
                        {c.label}
                      </span>
                    )}
                    {i < crumbs.length - 1 && (
                      <ChevronRight className="h-3 w-3" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {kicker && <p className="kicker">{kicker}</p>}
          <h1 className={cn("headline text-[clamp(2rem,5vw,3.4rem)]", kicker && "mt-3")}>
            {title}
          </h1>
          {intro && <p className="mt-4 max-w-2xl leading-relaxed text-muted md:text-lg">{intro}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </div>
    </section>
  );
}
