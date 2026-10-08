import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, LoaderCircle, MessageCircle, Phone } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { PageHero } from "@/components/sections/PageHero";
import { HoursTable } from "@/components/sections/VisitUs";
import { PlateInput } from "@/components/ui/PlateInput";
import { SITE, telLink, whatsappLink } from "@/config/site";
import { SERVICES, getService } from "@/content/services";
import { normaliseReg, openWhatsApp, submitEnquiry, summarise } from "@/lib/forms";
import { isOpenDay } from "@/lib/hours";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface BookSearch {
  reg?: string;
  service?: string;
}

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    reg: typeof search.reg === "string" ? normaliseReg(search.reg) || undefined : undefined,
    service:
      typeof search.service === "string" && getService(search.service) ? search.service : undefined,
  }),
  head: () =>
    seo({
      title: "Book Online",
      description: `Book an MOT, service or repair with ${SITE.name} in about a minute. Choose what you need and a day that suits, and we'll confirm your slot.`,
      path: "/book",
    }),
  component: BookPage,
});

const UNSURE = { slug: "not-sure", name: "Not sure, needs a check" };
const TIMES = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "any", label: "Any time" },
] as const;
type TimeId = (typeof TIMES)[number]["id"];

interface DayOption {
  iso: string;
  short: string;
  label: string;
}

/** Next open days in London time. Computed on the client to avoid timezone drift. */
function upcomingOpenDays(count: number): DayOption[] {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .split("-")
    .map(Number);
  const out: DayOption[] = [];
  for (let i = 0; out.length < count && i < 30; i++) {
    const date = new Date(Date.UTC(y, m - 1, d + i, 12));
    if (!isOpenDay(date.getUTCDay())) continue;
    const fmt = (o: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...o }).format(date);
    out.push({
      iso: date.toISOString().slice(0, 10),
      short:
        i === 0
          ? "Today"
          : i === 1
            ? "Tomorrow"
            : fmt({ weekday: "short", day: "numeric", month: "short" }),
      label: fmt({ weekday: "long", day: "numeric", month: "long" }),
    });
  }
  return out;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function BookPage() {
  const search = Route.useSearch();
  const [services, setServices] = useState<string[]>(search.service ? [search.service] : []);
  const [reg, setReg] = useState(search.reg ?? "");
  const [makeModel, setMakeModel] = useState("");
  const [days, setDays] = useState<DayOption[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<TimeId>("any");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "whatsapp" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => setDays(upcomingOpenDays(6)), []);
  useEffect(() => {
    if (status === "sent" || status === "whatsapp") doneRef.current?.focus();
  }, [status]);

  const serviceNames = services.map((s) =>
    s === UNSURE.slug ? UNSURE.name : (getService(s)?.name ?? s),
  );
  const dayLabel =
    date === "asap" ? "As soon as possible" : days.find((d) => d.iso === date)?.label;

  const fields = () => ({
    Services: serviceNames.join(", "),
    Registration: normaliseReg(reg),
    "Make and model": makeModel,
    "Preferred day": dayLabel,
    "Preferred time": TIMES.find((t) => t.id === time)?.label,
    Name: name,
    Phone: phone,
    Email: email,
    Notes: notes,
  });

  /** Validates everything; focuses the first problem. */
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (normaliseReg(reg).length < 2) e.reg = "Enter your registration.";
    if (services.length === 0) e.services = "Choose at least one option.";
    if (!date) e.date = "Pick a day, or choose 'As soon as possible'.";
    if (!name.trim()) e.name = "Enter your name.";
    if (phone.replace(/\D/g, "").length < 10) e.phone = "Enter a phone number we can call.";
    if (email.trim() && !isEmail(email.trim())) e.email = "Check your email address.";
    if (!consent) e.consent = "Please tick to let us contact you about this booking.";
    setErrors(e);

    const order: [string, string][] = [
      ["reg", "book-reg"],
      ["services", "svc-0"],
      ["date", "day-0"],
      ["name", "f-name"],
      ["phone", "f-phone"],
      ["email", "f-email"],
      ["consent", "f-consent"],
    ];
    const first = order.find(([key]) => e[key]);
    if (first) document.getElementById(first[1])?.focus();
    return !first;
  };

  const clear = (key: string) => setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const result = await submitEnquiry({
        subject: `Booking request: ${serviceNames.join(", ")}`,
        fields: fields(),
        replyTo: email.trim() || undefined,
        honeypot: honeypotRef.current?.checked,
      });
      setStatus(result);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const sendViaWhatsApp = () => {
    if (!validate()) return;
    openWhatsApp(summarise("Booking request", fields()));
    setStatus("whatsapp");
  };

  const toggleService = (slug: string) => {
    clear("services");
    setServices((list) => (list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]));
  };

  const done = status === "sent" || status === "whatsapp";
  const choices = [...SERVICES.map((s) => ({ slug: s.slug, name: s.name })), UNSURE];

  return (
    <>
      <PageHero
        kicker="Book online"
        title={
          <>
            Book your car <span className="accent">in.</span>
          </>
        }
        intro="It takes about a minute. We'll confirm your slot and price by phone or WhatsApp."
        crumbs={[{ label: "Home", to: "/" }, { label: "Book online" }]}
      />

      <section
        className="shell grid grid-cols-1 gap-3 pb-16 md:pb-20 lg:grid-cols-[minmax(0,1fr)_19rem]"
        aria-label="Booking form"
      >
        <div className="panel min-w-0 p-5 sm:p-7 md:p-8">
          {done ? (
            <div className="py-8 text-center md:py-12" role="status">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-volt text-ink">
                <Check className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 ref={doneRef} tabIndex={-1} className="mt-6 text-2xl font-semibold outline-none">
                {status === "sent" ? "Request sent" : "Over to WhatsApp"}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-muted">
                {status === "sent"
                  ? "Thanks. We'll be in touch during opening hours to confirm your slot and price."
                  : "We've opened WhatsApp with your booking details filled in. Just press send."}
              </p>
              <Link to="/" className="btn btn-ghost mt-7">
                Back to home
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-8">
              <Group n={1} title="Your car" error={errors.reg} errorId="reg-error">
                <PlateInput
                  id="book-reg"
                  value={reg}
                  onChange={(v) => {
                    setReg(v);
                    clear("reg");
                  }}
                  invalid={Boolean(errors.reg)}
                  aria-describedby={errors.reg ? "reg-error" : undefined}
                  className="max-w-sm"
                />
                <input
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  placeholder="Make and model (optional), e.g. VW Golf"
                  aria-label="Make and model (optional)"
                  className="field mt-3 max-w-sm"
                />
              </Group>

              <Group
                n={2}
                title="What do you need?"
                hint="Pick one or more."
                error={errors.services}
                errorId="services-error"
              >
                <div className="flex flex-wrap gap-2">
                  {choices.map((c, i) => {
                    const on = services.includes(c.slug);
                    return (
                      <button
                        key={c.slug}
                        id={`svc-${i}`}
                        type="button"
                        onClick={() => toggleService(c.slug)}
                        aria-pressed={on}
                        className={cn(
                          "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition",
                          on
                            ? "border-ink bg-ink text-white"
                            : "border-line-strong bg-card hover:border-ink/40",
                        )}
                      >
                        {on && <Check className="h-4 w-4 text-volt" aria-hidden="true" />}
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </Group>

              <Group n={3} title="When suits you?" error={errors.date} errorId="date-error">
                <div className="flex flex-wrap gap-2">
                  {days.length === 0
                    ? Array.from({ length: 6 }, (_, i) => (
                        <span key={i} className="h-10 w-24 animate-pulse rounded-full bg-soft" />
                      ))
                    : days.map((d, i) => (
                        <Pill
                          key={d.iso}
                          id={`day-${i}`}
                          name="day"
                          checked={date === d.iso}
                          onChange={() => {
                            setDate(d.iso);
                            clear("date");
                          }}
                          label={d.label}
                        >
                          {d.short}
                        </Pill>
                      ))}
                  <Pill
                    name="day"
                    checked={date === "asap"}
                    onChange={() => {
                      setDate("asap");
                      clear("date");
                    }}
                    label="As soon as possible"
                  >
                    As soon as possible
                  </Pill>
                </div>
                <div
                  className="mt-3 flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-label="Time of day"
                >
                  {TIMES.map((t) => (
                    <Pill
                      key={t.id}
                      name="time"
                      checked={time === t.id}
                      onChange={() => setTime(t.id)}
                      label={t.label}
                      tone="soft"
                    >
                      {t.label}
                    </Pill>
                  ))}
                </div>
              </Group>

              <Group n={4} title="Your details">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextField
                    id="f-name"
                    label="Name"
                    value={name}
                    onChange={(v) => {
                      setName(v);
                      clear("name");
                    }}
                    autoComplete="name"
                    error={errors.name}
                  />
                  <TextField
                    id="f-phone"
                    label="Phone"
                    type="tel"
                    value={phone}
                    onChange={(v) => {
                      setPhone(v);
                      clear("phone");
                    }}
                    autoComplete="tel"
                    inputMode="tel"
                    error={errors.phone}
                  />
                  <TextField
                    id="f-email"
                    label="Email"
                    optional
                    type="email"
                    value={email}
                    onChange={(v) => {
                      setEmail(v);
                      clear("email");
                    }}
                    autoComplete="email"
                    error={errors.email}
                    className="sm:col-span-2"
                  />
                  <label className="sm:col-span-2">
                    <span className="mb-1.5 flex items-center justify-between text-sm font-semibold">
                      Anything we should know?{" "}
                      <span className="font-normal text-muted">Optional</span>
                    </span>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="field resize-y"
                      placeholder="Noises, warning lights, when it started…"
                    />
                  </label>
                </div>
              </Group>

              {/* Spam trap for bots; hidden from people and assistive tech */}
              <input
                ref={honeypotRef}
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-5 border-t border-line pt-6">
                <div>
                  <label className="flex items-start gap-3 text-sm leading-relaxed">
                    <input
                      id="f-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        clear("consent");
                      }}
                      aria-invalid={Boolean(errors.consent) || undefined}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      className="h-6 w-6 shrink-0 accent-[#0b0c0f]"
                    />
                    <span>
                      {SITE.name} can contact me about this booking. See our{" "}
                      <Link to="/privacy" className="font-semibold underline underline-offset-4">
                        privacy policy
                      </Link>
                      .
                    </span>
                  </label>
                  <FieldError id="consent-error" message={errors.consent} />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-xl border border-danger/30 bg-danger/5 p-3.5 text-sm font-medium text-danger"
                  >
                    We couldn't send that ({errorMessage}). Please try again, use WhatsApp, or call{" "}
                    <a href={telLink} className="underline">
                      {SITE.phone.display}
                    </a>
                    .
                  </p>
                )}

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button type="button" onClick={sendViaWhatsApp} className="btn btn-ghost">
                    <MessageCircle className="h-4 w-4 text-whatsapp-ink" aria-hidden="true" />
                    Send via WhatsApp
                  </button>
                  <button type="submit" className="btn btn-volt" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send booking request <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        <aside className="flex min-w-0 flex-col gap-3 self-start lg:sticky lg:top-24">
          <div className="panel p-5 md:p-6">
            <p className="font-semibold">Prefer to talk?</p>
            <p className="mt-1 text-sm text-muted">Call or message us and we'll book you in.</p>
            <div className="mt-4 grid gap-2">
              <a href={telLink} className="btn btn-ink min-h-11 text-sm">
                <Phone className="h-4 w-4" aria-hidden="true" /> {SITE.phone.display}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost min-h-11 text-sm"
              >
                <MessageCircle className="h-4 w-4 text-whatsapp-ink" aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
          <div className="panel p-5 md:p-6">
            <p className="font-semibold">Opening hours</p>
            <HoursTable className="mt-1" />
          </div>
        </aside>
      </section>
    </>
  );
}

/* ─── Form building blocks ──────────────────────────────────────────────── */

function Group({
  n,
  title,
  hint,
  error,
  errorId,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  error?: string;
  errorId?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="min-w-0" aria-describedby={error && errorId ? errorId : undefined}>
      <legend className="flex items-center gap-3 text-lg font-semibold">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-volt font-mono text-xs font-bold text-ink">
          {n}
        </span>
        {title}
      </legend>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      <div className="mt-4">{children}</div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

function Pill({
  id,
  name,
  checked,
  onChange,
  label,
  tone = "ink",
  children,
}: {
  id?: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  tone?: "ink" | "soft";
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative inline-flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
        checked
          ? tone === "ink"
            ? "border-ink bg-ink text-white"
            : "border-ink bg-volt text-ink"
          : "border-line-strong bg-card hover:border-ink/40",
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="sr-only"
      />
      {children}
    </label>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  optional,
  error,
  className,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "id">) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center justify-between text-sm font-semibold"
      >
        {label}
        {optional && <span className="font-normal text-muted">Optional</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
        {...rest}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-danger">
      {message}
    </p>
  );
}
