import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ChevronRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { SITE, telLink, whatsappLink } from "@/config/site";
import { CATEGORIES, servicesIn } from "@/content/services";
import { cn } from "@/lib/utils";

const PAGES = [
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

// Three columns: maintenance | repairs | diagnostics + body
const MENU_COLUMNS = [CATEGORIES.slice(0, 1), CATEGORIES.slice(1, 2), CATEGORIES.slice(2)];

const navLink =
  "rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-fg/70 transition hover:bg-soft hover:text-fg";
const navActive = { className: "!bg-soft !text-fg" };
const mobileRow =
  "flex items-center justify-between px-5 py-4 text-lg font-semibold transition active:bg-soft";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onServices = pathname.startsWith("/services") && pathname !== "/services/mot";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Escape closes menus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setServicesOpen(false);
      setMenuOpen((open) => {
        if (open) menuButton.current?.focus();
        return false;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Tapping outside closes the services menu (touch screens have no mouse-leave)
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  // Mouse users get hover-to-open; touch users tap to toggle.
  const openServices = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (!servicesOpen) hoverOpenedAt.current = Date.now();
    setServicesOpen(true);
  };
  const closeServicesSoon = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 150);
  };
  const toggleServices = () => {
    // A click straight after hover-opening confirms the menu rather than closing it.
    if (servicesOpen && Date.now() - hoverOpenedAt.current < 600) return;
    setServicesOpen((v) => !v);
  };

  return (
    <header className="vt-header fixed inset-x-0 top-0 z-50">
      <div className="shell pt-3">
        <div
          ref={wrapRef}
          onPointerLeave={closeServicesSoon}
          className={cn(
            "flex h-16 items-center justify-between gap-3 rounded-full border border-line bg-card pl-4 pr-2 transition-shadow duration-300 md:pl-5",
            scrolled || servicesOpen || menuOpen
              ? "shadow-[0_12px_32px_-18px_rgba(11,12,15,0.35)]"
              : "shadow-[0_1px_2px_rgba(11,12,15,0.05)]",
          )}
        >
          <Link to="/" aria-label={`${SITE.name} home`} className="shrink-0 rounded-full">
            <Logo />
          </Link>

          <nav aria-label="Main" className="relative hidden items-center gap-0.5 lg:flex">
            <button
              type="button"
              onPointerEnter={openServices}
              onClick={toggleServices}
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              className={cn(
                navLink,
                "inline-flex items-center gap-1",
                (servicesOpen || onServices) && "bg-soft text-fg",
              )}
            >
              Services
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <Link
              to="/services/$slug"
              params={{ slug: "mot" }}
              onMouseEnter={() => setServicesOpen(false)}
              className={navLink}
              activeProps={navActive}
            >
              MOT
            </Link>
            {PAGES.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onMouseEnter={() => setServicesOpen(false)}
                className={navLink}
                activeProps={navActive}
              >
                {l.label}
              </Link>
            ))}

            {servicesOpen && (
              <div
                id="services-menu"
                onPointerEnter={openServices}
                className="absolute left-1/2 top-full w-[42rem] -translate-x-1/2 pt-5"
              >
                <div className="rounded-2xl border border-line bg-card p-5 shadow-[0_24px_60px_-24px_rgba(11,12,15,0.4)]">
                  <div className="grid grid-cols-3 gap-6">
                    {MENU_COLUMNS.map((cats, i) => (
                      <div key={i} className="flex flex-col gap-5">
                        {cats.map((cat) => (
                          <div key={cat.id}>
                            <p className="mb-1.5 font-mono text-[0.64rem] font-medium uppercase tracking-[0.14em] text-muted">
                              {cat.label}
                            </p>
                            <ul>
                              {servicesIn(cat.id).map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    to="/services/$slug"
                                    params={{ slug: s.slug }}
                                    className="-mx-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[0.9rem] font-medium leading-snug hover:bg-soft"
                                  >
                                    <s.icon
                                      className="h-4 w-4 shrink-0 text-muted"
                                      aria-hidden="true"
                                    />
                                    {s.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4 text-sm font-semibold">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 hover:underline"
                    >
                      All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      to="/book"
                      search={{ service: "diagnostics-coding" }}
                      className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
                    >
                      Not sure what's wrong? Book a check{" "}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={telLink}
              className="btn btn-ghost hidden min-h-11 px-3.5 text-sm md:inline-flex"
              aria-label={`Call ${SITE.phone.display}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">{SITE.phone.display}</span>
            </a>
            <Link to="/book" className="btn btn-volt hidden min-h-11 px-5 text-sm sm:inline-flex">
              Book now
            </Link>
            <button
              ref={menuButton}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-card lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 -z-10 overflow-y-auto bg-canvas px-5 pb-32 pt-24 lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card"
          >
            <Link to="/services" className={mobileRow}>
              Services <ChevronRight className="h-5 w-5 text-muted" aria-hidden="true" />
            </Link>
            <Link to="/services/$slug" params={{ slug: "mot" }} className={mobileRow}>
              MOT <ChevronRight className="h-5 w-5 text-muted" aria-hidden="true" />
            </Link>
            {PAGES.map((l) => (
              <Link key={l.to} to={l.to} className={mobileRow}>
                {l.label} <ChevronRight className="h-5 w-5 text-muted" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to="/book" className="btn btn-volt col-span-2">
              Book online <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={telLink} className="btn btn-ghost">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp-ink" aria-hidden="true" /> WhatsApp
            </a>
          </div>
          <OpenStatus className="mt-5" />
        </div>
      )}
    </header>
  );
}
