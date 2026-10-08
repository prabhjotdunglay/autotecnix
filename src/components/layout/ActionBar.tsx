import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { SITE, telLink, whatsappLink } from "@/config/site";

/** Thumb-reach actions on mobile. */
export function MobileActionBar() {
  return (
    <div className="vt-actionbar fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <nav
        aria-label="Quick actions"
        className="grid grid-cols-3 gap-1.5 rounded-[1.4rem] border border-line bg-card p-1.5 shadow-[0_-10px_40px_-20px_rgba(11,12,15,0.4)]"
      >
        <a
          href={telLink}
          aria-label={`Call ${SITE.phone.display}`}
          className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold text-fg active:bg-soft"
        >
          <Phone className="h-5 w-5" aria-hidden="true" /> Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold text-fg active:bg-soft"
        >
          <MessageCircle className="h-5 w-5 text-whatsapp-ink" aria-hidden="true" /> WhatsApp
        </a>
        <Link
          to="/book"
          className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl border border-ink/10 bg-volt text-xs font-bold text-ink"
        >
          <CalendarDays className="h-5 w-5" aria-hidden="true" /> Book
        </Link>
      </nav>
    </div>
  );
}

/** Pages with their own WhatsApp options, where a floating button would sit over form controls. */
const FAB_HIDDEN_ON = ["/book", "/contact"];

/** Floating WhatsApp button for tablet/desktop (mobile uses the action bar). */
export function WhatsAppFab() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (FAB_HIDDEN_ON.includes(pathname)) return null;
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 hidden h-14 items-center overflow-hidden rounded-full bg-whatsapp px-4 text-ink shadow-[0_18px_40px_-15px_rgba(18,140,75,0.8)] transition-all duration-500 hover:pr-5 md:flex"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0 fill-ink" aria-hidden="true">
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.77.72 5.45 2.1 7.83L.5 31.5l7.87-2.06A15.43 15.43 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5Zm0 28.18a13.6 13.6 0 0 1-6.93-1.9l-.5-.3-5.16 1.35 1.38-5.02-.33-.52A13.63 13.63 0 1 1 16 28.68Zm7.47-10.2c-.41-.2-2.42-1.19-2.79-1.33-.38-.13-.65-.2-.93.2-.27.41-1.06 1.33-1.3 1.6-.24.28-.48.3-.89.1-.41-.2-1.73-.64-3.3-2.03-1.22-1.09-2.04-2.43-2.28-2.84-.24-.41-.03-.63.18-.84.18-.18.41-.48.61-.72.2-.24.27-.41.41-.68.13-.27.07-.51-.03-.72-.1-.2-.93-2.24-1.27-3.06-.34-.8-.68-.69-.93-.7h-.79c-.27 0-.72.1-1.1.51-.38.41-1.44 1.4-1.44 3.42s1.47 3.97 1.68 4.24c.2.27 2.9 4.43 7.03 6.21.98.42 1.75.67 2.34.86.98.31 1.88.27 2.58.16.79-.12 2.42-.99 2.76-1.94.34-.96.34-1.78.24-1.95-.1-.17-.37-.27-.79-.48Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-500 group-hover:ml-2 group-hover:max-w-40">
        Chat on WhatsApp
      </span>
    </a>
  );
}
