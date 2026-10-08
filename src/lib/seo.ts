import { HOURS, SITE, fullAddress } from "@/config/site";
import type { Faq, Service } from "@/content/services";

const SCHEMA_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const OG_IMAGE = `${SITE.url}/og-image.png`;

interface SeoInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

/** Per-page meta + canonical link. Spread into a route's `head()`. */
export function seo({ title, description, path, noindex }: SeoInput) {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function localBusinessSchema() {
  const sameAs = Object.values(SITE.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon-512.png`,
    image: `${SITE.url}/og-image.png`,
    description: SITE.description,
    telephone: SITE.phone.tel,
    email: SITE.email,
    priceRange: SITE.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.street}, ${SITE.address.area}`,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postcode || undefined,
      addressCountry: SITE.address.country,
    },
    ...(SITE.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng } }
      : {}),
    areaServed: SITE.areasServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: HOURS.filter((h) => h.open && h.close).map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => SCHEMA_DAYS[d]),
      opens: h.open,
      closes: h.close,
    })),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seoDescription,
    serviceType: service.name,
    url: `${SITE.url}/services/${service.slug}`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: SITE.areasServed.map((name) => ({ "@type": "Place", name })),
    ...(service.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: service.priceFrom,
            description: `From £${service.priceFrom}`,
          },
        }
      : {}),
  };
}

export { fullAddress };
