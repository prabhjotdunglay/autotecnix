import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SITE } from "@/config/site";
import { CATEGORIES, SERVICES, type ServiceCategory } from "@/content/services";
import { breadcrumbSchema, jsonLd, seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => ({
    ...seo({
      title: `Car Services in ${SITE.placeShort}`,
      description: `Every service ${SITE.name} offers in ${SITE.place}: MOTs, servicing, diagnostics and coding, brakes, clutches, air con, bodywork and alloy wheel refurbishment.`,
      path: "/services",
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      ),
    ],
  }),
  component: ServicesPage,
});

type Filter = "all" | ServiceCategory;

function ServicesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? SERVICES : SERVICES.filter((s) => s.category === filter);
  const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...CATEGORIES];

  return (
    <>
      <PageHero
        kicker="Services"
        title={
          <>
            Everything your car <span className="accent">needs.</span>
          </>
        }
        intro="Maintenance, repairs, diagnostics, electrics, bodywork and wheels, all done in-house for every make and model."
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="shell pb-12 md:pb-16" aria-label="Service list">
        <div role="group" aria-label="Filter services" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={cn(
                  "min-h-10 rounded-full border px-4 text-sm font-medium transition",
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line-strong bg-card text-fg/80 hover:border-ink/40 hover:text-fg",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <CtaBlock
        title="Not sure what you need?"
        text="Tell us the symptoms and we'll find the cause before quoting. No obligation."
      />
    </>
  );
}
