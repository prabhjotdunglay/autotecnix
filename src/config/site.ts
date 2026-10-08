/**
 * Single source of truth for Autotecnix business details.
 *
 * Anything still marked `TODO(client)` needs confirming before launch.
 */

export interface OpeningHours {
  label: string;
  /** JS weekday numbers: 0 = Sunday … 6 = Saturday */
  days: number[];
  /** 24h "HH:MM" in Europe/London time. Omit both for "Closed". */
  open?: string;
  close?: string;
}

export const SITE = {
  name: "Autotecnix",
  /** Shown in the footer and privacy policy. TODO(client): registered name, e.g. "Autotecnix Ltd" */
  legalName: "Autotecnix",
  url: "https://autotecnix.com",
  tagline: "Your car, decoded.",
  description:
    "Independent garage in Leytonstone, East London for MOTs, servicing, dealer-level diagnostics and coding, mechanical repairs, bodywork and alloy wheel refurbishment. Clear quotes before any work starts.",

  /** How the location reads in body copy, and the shorter form used in page titles */
  place: "Leytonstone, East London",
  placeShort: "Leytonstone, E11",

  phone: { display: "020 8556 5999", tel: "+442085565999" },
  whatsapp: { number: "447342477731", display: "07342 477731" },
  email: "mkautos.mot@gmail.com",

  address: {
    street: "250 Joseph Ray Rd",
    area: "Leytonstone",
    locality: "London",
    region: "Greater London",
    postcode: "E11 4RA",
    country: "GB",
  },
  /** Centre of postcode E11 4RA (postcodes.io), used in Google structured data */
  geo: { lat: 51.5639, lng: 0.008199 } as { lat: number; lng: number } | undefined,

  areasServed: [
    "Leytonstone",
    "Leyton",
    "Wanstead",
    "Walthamstow",
    "Stratford",
    "Forest Gate",
    "Manor Park",
    "Ilford",
    "Hackney",
    "Canning Town",
  ],

  // TODO(client): add profile URLs to show icons in the footer and add them to structured data.
  socials: {
    instagram: "",
    facebook: "",
    tiktok: "",
    googleReviews: "",
  },

  /**
   * UK limited companies must show these on their website (Companies Act 2006).
   * Anything left empty is hidden. TODO(client)
   */
  legal: {
    companyNumber: "",
    registeredOffice: "",
    vatNumber: "",
  },

  /**
   * Booking and contact forms post to Web3Forms (free, no backend needed).
   * This is the same access key as the MK Autos site, so submissions land in the
   * same inbox (subjects are tagged "Autotecnix"). Web3Forms access keys are public
   * by design. To give Autotecnix its own key, set VITE_WEB3FORMS_KEY at build time.
   */
  web3formsKey:
    (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ||
    "aea13bab-5f34-4c82-b12e-c97f50cb3400",

  priceRange: "££",
} as const;

export const HOURS: OpeningHours[] = [
  { label: "Monday – Friday", days: [1, 2, 3, 4, 5], open: "08:30", close: "18:30" },
  { label: "Saturday", days: [6], open: "08:30", close: "17:00" },
  { label: "Sunday", days: [0] },
];

/** "250 Joseph Ray Rd, Leytonstone, London E11 4RA" */
export const fullAddress = `${SITE.address.street}, ${SITE.address.area}, ${SITE.address.locality} ${SITE.address.postcode}`;

export const mapsQuery = encodeURIComponent(fullAddress);
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:${SITE.phone.tel}`;
export const mailLink = `mailto:${SITE.email}`;
