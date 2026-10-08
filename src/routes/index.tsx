import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  Cpu,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServiceTile } from "@/components/sections/ServiceCard";
import { VisitCard } from "@/components/sections/VisitUs";
import { FaqList } from "@/components/ui/FaqList";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { PlateInput } from "@/components/ui/PlateInput";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE, telLink, whatsappLink } from "@/config/site";
import { GENERAL_FAQS } from "@/content/faqs";
import { PHOTOS } from "@/content/photos";
import { SERVICE_PLANS } from "@/content/pricing";
import { SERVICES, getService, type Service } from "@/content/services";
import { normaliseReg } from "@/lib/forms";
import { faqSchema, jsonLd, seo } from "@/lib/seo";
import { cn, delay } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({
      title: `${SITE.name} | Garage, MOT & Diagnostics in ${SITE.placeShort}`,
      description: SITE.description,
      path: "/",
    }),
    scripts: [jsonLd(faqSchema(GENERAL_FAQS))],
  }),
  component: Home,
});

const POPULAR = [
  "mot",
  "servicing",
  "diagnostics-coding",
  "brakes",
  "tyres-alignment",
  "air-conditioning",
  "clutch-gearbox",
  "bodywork-accident-repair",
]
  .map(getService)
  .filter((s): s is Service => Boolean(s));

function Home() {
  return (
    <>
      <Hero />
      <PopularServices />
      <HowItWorks />
      <Prices />
      <FaqAndVisit />
      <CtaBlock />
    </>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function QuickQuote() {
  const navigate = useNavigate();
  const [reg, setReg] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const clean = normaliseReg(reg);
    navigate({ to: "/book", search: clean ? { reg: clean } : {} });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 sm:flex-row"
      aria-label="Start a booking"
    >
      <PlateInput value={reg} onChange={setReg} className="sm:flex-1" />
      <button type="submit" className="btn btn-volt min-h-16 shrink-0 px-6 text-base">
        Get a quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
}

const TRUST = [
  { icon: BadgeCheck, title: "Quote before any work", text: "Nothing starts without your OK" },
  { icon: Cpu, title: "Dealer-level diagnostics", text: "For modern, software-heavy cars" },
  { icon: ShieldCheck, title: "Warranty-safe servicing", text: "To manufacturer schedules" },
  { icon: Car, title: "All makes and models", text: "City cars to premium German" },
];

function Hero() {
  return (
    <section
      className="relative isolate overflow-clip pb-10 pt-28 md:pb-12 md:pt-32"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[32rem] w-[32rem] rounded-full bg-volt/30 blur-[120px]"
      />

      <div className="shell grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <OpenStatus className="rise" />
          <h1
            id="hero-title"
            className="headline rise mt-5 text-[clamp(2.4rem,6vw,4.4rem)]"
            style={delay(60)}
          >
            Your car, <span className="accent">decoded.</span>
          </h1>
          <p className="rise mt-5 max-w-lg text-lg leading-relaxed text-muted" style={delay(120)}>
            MOTs, servicing, diagnostics, repairs and bodywork in {SITE.place}. You always get a
            clear price before any work starts.
          </p>
          <div className="rise mt-7 max-w-lg" style={delay(180)}>
            <QuickQuote />
            {/* Phones get these from the sticky action bar instead */}
            <div className="mt-3 hidden flex-wrap gap-2 md:flex">
              <a href={telLink} className="btn btn-ghost min-h-11 text-sm">
                <Phone className="h-4 w-4" aria-hidden="true" /> {SITE.phone.display}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost min-h-11 text-sm"
              >
                <MessageCircle className="h-4 w-4 text-whatsapp-ink" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Workshop photo */}
        <div
          className="rise relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink shadow-[0_30px_60px_-30px_rgba(11,12,15,0.5)]"
          style={delay(240)}
        >
          <img
            src={PHOTOS.hero.src}
            srcSet={PHOTOS.hero.srcSet}
            sizes="(min-width: 1024px) 560px, 100vw"
            alt={PHOTOS.hero.alt}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent"
          />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-sm md:bottom-5 md:left-5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {SITE.place}
          </span>
        </div>
      </div>

      <div className="shell mt-8 md:mt-10">
        <ul className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-4">
          {TRUST.map((t) => (
            <li
              key={t.title}
              className="flex flex-col gap-2.5 rounded-2xl border border-line bg-card p-3.5 sm:flex-row sm:items-center sm:gap-3 md:p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-volt text-ink">
                <t.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug">{t.title}</span>
                <span className="hidden text-xs text-muted sm:block">{t.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────────────────────── */

function PopularServices() {
  const allLink = (
    <Link to="/services" className="btn btn-ghost min-h-11 text-sm">
      All {SERVICES.length} services <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
  return (
    <section className="shell py-12 md:py-16" aria-labelledby="services-title">
      <SectionHeading
        id="services-title"
        kicker="Services"
        title="What can we help with?"
        intro="Everything is done in-house, for every make and model."
        action={allLink}
      />
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {POPULAR.map((s) => (
          <ServiceTile key={s.slug} service={s} />
        ))}
      </div>
      <div className="mt-4 md:hidden [&>a]:w-full">{allLink}</div>
    </section>
  );
}

/* ─── Prices ────────────────────────────────────────────────────────────── */

interface PriceCard {
  name: string;
  price: number;
  note: string;
  service: string;
  featured?: boolean;
}

function Prices() {
  const mot = getService("mot");
  const cards: PriceCard[] = [
    ...(mot?.priceFrom
      ? [{ name: "MOT", price: mot.priceFrom, note: "Cars · vans from £50", service: "mot" }]
      : []),
    ...SERVICE_PLANS.map((p) => ({
      name: `${p.name} service`,
      price: p.price,
      note: p.short,
      service: "servicing",
      featured: p.featured,
    })),
  ];

  return (
    <section className="shell py-12 md:py-16" aria-labelledby="prices-title">
      <SectionHeading
        id="prices-title"
        kicker="Prices"
        title="Clear prices, up front"
        intro="Guide prices for most cars. We confirm your exact price before we start."
        action={
          <Link to="/pricing" className="btn btn-ghost min-h-11 text-sm">
            Full price list <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.name}
            to="/book"
            search={{ service: c.service }}
            className={cn(
              "group flex flex-col rounded-[1.25rem] p-4 transition duration-300 hover:-translate-y-0.5 md:p-5",
              c.featured
                ? "border border-ink/10 bg-volt text-ink"
                : "panel hover:border-line-strong",
            )}
          >
            <span className="flex items-start justify-between gap-2">
              <span className="font-semibold leading-snug">{c.name}</span>
              {c.featured && (
                <span className="hidden rounded-full bg-ink px-2.5 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-volt md:inline-block">
                  Popular
                </span>
              )}
            </span>
            <span className="mt-3 flex flex-wrap items-baseline gap-x-1.5">
              <span className={cn("text-xs", c.featured ? "text-ink/70" : "text-muted")}>from</span>
              <span className="headline text-[1.75rem] md:text-4xl">£{c.price}</span>
            </span>
            <span
              className={cn(
                "mt-2 text-xs leading-snug md:text-sm",
                c.featured ? "text-ink/75" : "text-muted",
              )}
            >
              {c.note}
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold">
              Book{" "}
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
      <Link to="/pricing" className="btn btn-ghost mt-4 min-h-11 w-full text-sm md:hidden">
        Full price list <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

/* ─── FAQ + visit ───────────────────────────────────────────────────────── */

function FaqAndVisit() {
  return (
    <section className="shell py-12 md:py-16" aria-labelledby="faq-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <SectionHeading id="faq-title" kicker="FAQs" title="Good questions" />
          <FaqList items={GENERAL_FAQS} group="home-faq" className="mt-8" />
        </div>
        <VisitCard className="lg:mt-[5.25rem]" />
      </div>
    </section>
  );
}
