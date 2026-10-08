import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { HoursTable } from "@/components/sections/VisitUs";
import { SITE, fullAddress, mailLink, mapsLink, telLink, whatsappLink } from "@/config/site";
import { getService, type Service } from "@/content/services";

const FOOTER_SERVICES = [
  "mot",
  "servicing",
  "diagnostics-coding",
  "brakes",
  "tyres-alignment",
  "bodywork-accident-repair",
]
  .map(getService)
  .filter((s): s is Service => Boolean(s));

const link = "inline-flex items-center gap-2.5 py-1 text-fg/80 transition hover:text-volt";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { companyNumber, registeredOffice, vatNumber } = SITE.legal;

  // Bottom padding keeps the last row clear of the mobile action bar and WhatsApp button.
  return (
    <footer className="inverse bg-canvas pb-28 md:pb-24">
      <div className="shell grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Independent garage in {SITE.place} for MOTs, servicing, diagnostics, repairs and
            bodywork. All makes and models.
          </p>
          {(SITE.socials.instagram || SITE.socials.facebook) && (
            <div className="mt-5 flex gap-2">
              {SITE.socials.instagram && (
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line-strong transition hover:border-volt hover:text-volt"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {SITE.socials.facebook && (
                <a
                  href={SITE.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line-strong transition hover:border-volt hover:text-volt"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <nav aria-label="Popular services">
          <p className="kicker mb-3">Services</p>
          <ul className="grid text-sm">
            {FOOTER_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className={link}>
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className={`${link} font-semibold !text-volt`}>
                All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="kicker mb-3">Opening hours</p>
          <HoursTable className="max-w-xs" />
        </div>

        <div>
          <p className="kicker mb-3">Get in touch</p>
          <ul className="grid text-sm">
            <li>
              <a href={telLink} className={link}>
                <Phone className="h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                {SITE.phone.display}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={link}>
                <MessageCircle className="h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={mailLink} className={`${link} break-all`}>
                <Mail className="h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} items-start`}
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                {fullAddress}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell">
        <div className="flex flex-col gap-2 border-t border-line py-5 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.legalName}.
            {companyNumber && ` Registered in England & Wales no. ${companyNumber}.`}
            {registeredOffice && ` Registered office: ${registeredOffice}.`}
            {vatNumber && ` VAT no. ${vatNumber}.`}
          </p>
          <div className="flex gap-4">
            <Link to="/about" className="inline-block py-1 hover:text-fg">
              About
            </Link>
            <Link to="/privacy" className="inline-block py-1 hover:text-fg">
              Privacy
            </Link>
            <a href="/sitemap.xml" className="inline-block py-1 hover:text-fg">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
