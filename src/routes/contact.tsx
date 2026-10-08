import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, LoaderCircle, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { HoursTable } from "@/components/sections/VisitUs";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { SITE, fullAddress, mailLink, mapsLink, telLink, whatsappLink } from "@/config/site";
import { normaliseReg, submitEnquiry } from "@/lib/forms";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: `Contact ${SITE.name} | Garage in ${SITE.placeShort}`,
      description: `Call ${SITE.phone.display}, WhatsApp, email or visit ${SITE.name} at ${SITE.address.street}, ${SITE.place}. Opening hours, directions and a quick contact form.`,
      path: "/contact",
    }),
  component: ContactPage,
});

const METHODS = [
  { icon: Phone, label: "Call", value: SITE.phone.display, href: telLink },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: SITE.whatsapp.display,
    href: whatsappLink(),
    external: true,
  },
  { icon: Mail, label: "Email", value: SITE.email, href: mailLink },
  { icon: MapPin, label: "Address", value: fullAddress, href: mapsLink, external: true },
];

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reg, setReg] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "whatsapp" | "error">("idle");
  const [error, setError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || (!phone.trim() && !email.trim()) || !message.trim()) {
      setError("Please add your name, a phone number or email, and a message.");
      setStatus("error");
      return;
    }
    if (!consent) {
      setError("Please confirm we can reply to your message.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const result = await submitEnquiry({
        subject: "Website enquiry",
        fields: {
          Name: name,
          Phone: phone,
          Email: email,
          Registration: normaliseReg(reg),
          Message: message,
        },
        replyTo: email.trim() || undefined,
        honeypot: honeypotRef.current?.checked,
      });
      setStatus(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Get in touch"
        intro="Questions, quotes or a second opinion on someone else's quote. Call, message or drop in."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      >
        <OpenStatus />
      </PageHero>

      <section
        className="shell grid grid-cols-1 gap-3 pb-12 md:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
        aria-label="Contact details and message form"
      >
        <div className="panel min-w-0 p-6 md:p-7">
          <ul className="divide-y divide-line">
            {METHODS.map((m) => (
              <li key={m.label}>
                <a
                  href={m.href}
                  {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 py-3.5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-volt">
                    <m.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium text-muted">{m.label}</span>
                    <span className="block break-words font-semibold leading-snug group-hover:underline">
                      {m.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 font-semibold">Opening hours</h2>
          <HoursTable className="mt-1" />
        </div>

        <div className="panel min-w-0 p-6 md:p-8">
          {status === "sent" || status === "whatsapp" ? (
            <div className="py-10 text-center" role="status">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-volt text-ink">
                <Check className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold">
                {status === "sent" ? "Message sent" : "Over to WhatsApp"}
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-muted">
                {status === "sent"
                  ? "Thanks. We'll reply during opening hours."
                  : "Your message is ready in WhatsApp. Just press send."}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h2 className="text-xl font-semibold">Send us a message</h2>
              <p className="mt-1 text-sm text-muted">We usually reply the same working day.</p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    className="field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </Field>
                <Field label="Phone">
                  <input
                    className="field"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </Field>
                <Field label="Email" optional>
                  <input
                    className="field"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Field>
                <Field label="Registration" optional>
                  <input
                    className="field uppercase tracking-[0.08em]"
                    value={reg}
                    onChange={(e) => setReg(e.target.value.toUpperCase())}
                    placeholder="AB12 CDE"
                    autoComplete="off"
                  />
                </Field>
                <Field label="Message" className="sm:col-span-2">
                  <textarea
                    className="field resize-y"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Field>
              </div>
              <input
                ref={honeypotRef}
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />
              <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="h-6 w-6 shrink-0 accent-[#0b0c0f]"
                />
                <span>
                  {SITE.name} can reply to me about this enquiry. See our{" "}
                  <Link to="/privacy" className="font-semibold underline underline-offset-4">
                    privacy policy
                  </Link>
                  .
                </span>
              </label>
              {status === "error" && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-danger/30 bg-danger/5 p-3.5 text-sm font-medium text-danger"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="btn btn-volt mt-5 w-full sm:w-auto"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="shell pb-16 md:pb-20" aria-label="Map">
        <MapEmbed className="min-h-[22rem]" />
      </section>
    </>
  );
}

function Field({
  label,
  optional,
  className,
  children,
}: {
  label: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 flex items-center justify-between text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-muted">Optional</span>}
      </span>
      {children}
    </label>
  );
}
