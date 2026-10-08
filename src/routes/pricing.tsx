import { Link, createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { SITE } from "@/config/site";
import { PLAN_ITEMS, SERVICE_PLANS } from "@/content/pricing";
import { CATEGORIES, SERVICES, formatPrice } from "@/content/services";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () =>
    seo({
      title: `MOT & Servicing Prices in ${SITE.placeShort}`,
      description: `Guide prices for MOTs, interim, full and major services, diagnostics, air con and more at ${SITE.name}. Your exact price is always confirmed before work starts.`,
      path: "/pricing",
    }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageHero
        kicker="Prices"
        title={
          <>
            Clear prices. <span className="accent">No surprises.</span>
          </>
        }
        intro="Guide prices for most cars, including parts and labour unless stated. Larger engines, vans and premium models can cost more, so we always confirm your exact price before any work starts."
        crumbs={[{ label: "Home", to: "/" }, { label: "Prices" }]}
      />

      <section className="shell pb-12 md:pb-16" aria-labelledby="plans-title">
        <h2 id="plans-title" className="text-xl font-semibold">
          Servicing
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {SERVICE_PLANS.map((plan) => {
            const items = PLAN_ITEMS.filter((i) => i.plans.includes(plan.id));
            return (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col rounded-[1.25rem] p-6",
                  plan.featured ? "border border-ink/10 bg-volt text-ink" : "panel",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{plan.name} service</h3>
                  {plan.featured && (
                    <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-volt">
                      Most popular
                    </span>
                  )}
                </div>
                <p className={cn("mt-1 text-sm", plan.featured ? "text-ink/75" : "text-muted")}>
                  {plan.interval}
                </p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className={cn("text-sm", plan.featured ? "text-ink/70" : "text-muted")}>
                    from
                  </span>
                  <span className="headline text-5xl">£{plan.price}</span>
                </p>
                <ul className="mt-5 grid gap-2 text-sm">
                  {items.map((item) => (
                    <li key={item.label} className="flex items-start gap-2.5 leading-snug">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {item.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link
                    to="/book"
                    search={{ service: "servicing" }}
                    className={cn("btn w-full", plan.featured ? "btn-ink" : "btn-ghost")}
                  >
                    Book {plan.name.toLowerCase()} service
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="shell pb-4" aria-labelledby="list-title">
        <h2 id="list-title" className="text-xl font-semibold">
          All prices
        </h2>
        <div className="panel mt-4 grid grid-cols-1 gap-x-10 px-5 py-2 md:grid-cols-2 md:px-8 md:py-4">
          {CATEGORIES.map((cat) => {
            const rows = SERVICES.filter((s) => s.category === cat.id);
            return (
              <div key={cat.id} className="min-w-0 py-4">
                <h3 className="kicker">{cat.label}</h3>
                <ul className="mt-2 divide-y divide-line">
                  {rows.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="group flex items-baseline justify-between gap-4 py-3"
                      >
                        <span className="min-w-0">
                          <span className="block font-medium leading-snug group-hover:underline">
                            {s.name}
                          </span>
                          {s.priceNote && (
                            <span className="block text-xs text-muted">{s.priceNote}</span>
                          )}
                        </span>
                        <span className="shrink-0 font-mono text-sm font-medium tabular-nums">
                          {formatPrice(s)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted">
          Need a few jobs doing? Book them together, such as an MOT with a full service, and we'll
          do everything in one visit.
        </p>
      </section>

      <CtaBlock />
    </>
  );
}
