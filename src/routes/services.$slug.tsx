import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  MessageCircle,
  Phone,
  PoundSterling,
  TriangleAlert,
} from "lucide-react";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE, telLink, whatsappLink } from "@/config/site";
import { CATEGORY_PHOTOS } from "@/content/photos";
import { CATEGORIES, SERVICES, formatPrice, getService, type Service } from "@/content/services";
import { breadcrumbSchema, faqSchema, jsonLd, seo, serviceSchema } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    // Only serialisable data crosses the server/client boundary.
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const service = loaderData ? getService(loaderData.slug) : undefined;
    if (!service) return {};
    return {
      ...seo({
        title: service.seoTitle,
        description: service.seoDescription,
        path: `/services/${service.slug}`,
      }),
      scripts: [
        jsonLd(serviceSchema(service)),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ),
        ...(service.faqs.length ? [jsonLd(faqSchema(service.faqs))] : []),
      ],
    };
  },
  component: ServiceDetail,
});

const GOV_LINKS = [
  {
    href: "https://www.gov.uk/check-mot-history",
    title: "Check when your MOT is due",
    text: "MOT history and expiry date on GOV.UK",
  },
  {
    href: "https://www.gov.uk/mot-reminder",
    title: "Get a free MOT reminder",
    text: "By text or email from GOV.UK",
  },
];

function BookCard({ service }: { service: Service }) {
  return (
    <div className="panel p-5 md:p-6">
      <dl className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-soft p-3.5">
          <dt className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <PoundSterling className="h-3.5 w-3.5" aria-hidden="true" /> Guide price
          </dt>
          <dd className="mt-1 text-lg font-semibold">{formatPrice(service)}</dd>
          {service.priceNote && (
            <dd className="text-xs leading-snug text-muted">{service.priceNote}</dd>
          )}
        </div>
        <div className="rounded-xl bg-soft p-3.5">
          <dt className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Typical time
          </dt>
          <dd className="mt-1 text-lg font-semibold leading-snug">{service.duration}</dd>
        </div>
      </dl>
      <Link to="/book" search={{ service: service.slug }} className="btn btn-volt mt-4 w-full">
        Book now <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <a href={telLink} className="btn btn-ghost min-h-11 text-sm">
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </a>
        <a
          href={whatsappLink(
            `Hi ${SITE.name}, I'd like a quote for ${service.name.toLowerCase()}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost min-h-11 text-sm"
        >
          <MessageCircle className="h-4 w-4 text-whatsapp-ink" aria-hidden="true" /> WhatsApp
        </a>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Your exact price is confirmed before any work starts.
      </p>
    </div>
  );
}

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const service = getService(slug)!;
  const category = CATEGORIES.find((c) => c.id === service.category);
  const photo = CATEGORY_PHOTOS[service.category];
  const related = SERVICES.filter((s) => s.category === service.category && s.slug !== slug)
    .concat(SERVICES.filter((s) => s.category !== service.category && s.slug !== slug))
    .slice(0, 3);

  return (
    <>
      <PageHero
        kicker={category?.label}
        title={service.name}
        intro={service.intro}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.name },
        ]}
        aside={<BookCard service={service} />}
      />

      <div className="shell pb-3">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-ink sm:aspect-[5/2] lg:aspect-[3/1]">
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <section
        className="shell grid grid-cols-1 gap-3 pb-12 md:pb-16 lg:grid-cols-2"
        aria-label={`${service.name} details`}
      >
        <div className="panel p-6 md:p-7">
          <h2 className="text-lg font-semibold">Signs you need it</h2>
          <ul className="mt-4 grid gap-3">
            {service.signs.map((sign) => (
              <li key={sign} className="flex items-start gap-3 leading-snug">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-signal/10">
                  <TriangleAlert className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
                </span>
                {sign}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel p-6 md:p-7">
          <h2 className="text-lg font-semibold">What's included</h2>
          <ul className="mt-4 grid gap-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-snug">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-volt">
                  <Check className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {service.slug === "mot" &&
          GOV_LINKS.map((g) => (
            <a
              key={g.href}
              href={g.href}
              target="_blank"
              rel="noopener noreferrer"
              className="panel group flex items-center justify-between gap-4 p-5 transition hover:border-line-strong"
            >
              <span>
                <span className="block font-semibold">{g.title}</span>
                <span className="mt-0.5 block text-sm text-muted">{g.text}</span>
              </span>
              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-muted transition group-hover:text-fg"
                aria-hidden="true"
              />
            </a>
          ))}
      </section>

      {service.faqs.length > 0 && (
        <section className="shell pb-12 md:pb-16" aria-labelledby="service-faq-title">
          <SectionHeading id="service-faq-title" kicker="FAQs" title="Common questions" />
          <FaqList items={service.faqs} group={`faq-${service.slug}`} className="mt-6" />
        </section>
      )}

      <section className="shell pb-4" aria-labelledby="related-title">
        <h2 id="related-title" className="text-lg font-semibold">
          Related services
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {related.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <CtaBlock
        title={`Book your ${service.name.toLowerCase()}`}
        text="Pick a day online or give us a call. We'll confirm your price before we start."
      />
    </>
  );
}
