import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  kicker,
  title,
  intro,
  action,
  className,
}: {
  /** Id for the heading, so sections can use aria-labelledby */
  id?: string;
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Optional link/button shown on the right from tablet up */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}
    >
      <div className="min-w-0 max-w-2xl">
        {kicker && <p className="kicker">{kicker}</p>}
        <h2 id={id} className="headline mt-3 text-[clamp(1.6rem,3.4vw,2.4rem)]">
          {title}
        </h2>
        {intro && <p className="mt-3 leading-relaxed text-muted md:text-lg">{intro}</p>}
      </div>
      {action && <div className="hidden shrink-0 md:block">{action}</div>}
    </div>
  );
}
