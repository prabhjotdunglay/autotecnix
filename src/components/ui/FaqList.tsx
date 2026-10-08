import { Plus } from "lucide-react";
import type { Faq } from "@/content/services";
import { cn } from "@/lib/utils";

/** Native <details> accordion: works without JS; `name` makes it exclusive in modern browsers. */
export function FaqList({
  items,
  group = "faq",
  className,
}: {
  items: Faq[];
  group?: string;
  className?: string;
}) {
  return (
    <div className={cn("panel divide-y divide-line px-5 md:px-6", className)}>
      {items.map((f) => (
        <details key={f.q} name={group} className="group">
          <summary className="flex items-center justify-between gap-4 py-4 text-left font-semibold leading-snug">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong transition group-open:border-ink group-open:bg-volt group-open:text-ink"
            >
              <Plus className="h-4 w-4 transition duration-300 group-open:rotate-45" />
            </span>
          </summary>
          <p className="pb-5 pr-10 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
