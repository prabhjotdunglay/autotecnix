import { useEffect, useState } from "react";
import { getOpenState, openDaysSummary, type OpenState } from "@/lib/hours";
import { cn } from "@/lib/utils";

/**
 * Live "Open now · until 6:30pm" pill, computed in London time.
 * Renders a neutral summary on the server, then updates after hydration
 * so server and client markup always match.
 */
export function OpenStatus({ className, bare = false }: { className?: string; bare?: boolean }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-2 font-mono text-[0.68rem] font-medium uppercase leading-tight tracking-[0.12em] text-fg",
        !bare && "rounded-full border border-line bg-card px-3 py-1.5",
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        {state?.open && <span className="ping absolute inset-0 rounded-full bg-go" />}
        <span
          className={cn(
            "relative h-2 w-2 rounded-full",
            state ? (state.open ? "bg-go" : "bg-signal") : "bg-muted",
          )}
        />
      </span>
      <span>{state ? state.label : openDaysSummary()}</span>
    </span>
  );
}
