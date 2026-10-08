import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Cpu,
  Gauge,
  ScanLine,
  SprayCan,
  Thermometer,
  Wrench,
} from "lucide-react";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: `About ${SITE.name} | Independent Garage in ${SITE.placeShort}`,
      description: `${SITE.name} is an independent garage in ${SITE.place} combining dealer-level diagnostics with honest, straightforward service.`,
      path: "/about",
    }),
  component: AboutPage,
});

// TODO(client): every promise here must reflect how the workshop actually operates.
const PROMISES = [
  "A clear price before any work starts",
  "Nothing extra without your OK",
  "Photos of anything we recommend",
  "Plain-English explanations, no jargon",
  "Servicing that keeps your warranty valid",
];

// TODO(client): confirm the equipment list matches the workshop.
const KIT = [
  {
    icon: Cpu,
    title: "Dealer-level diagnostics",
    text: "Manufacturer-grade software for fault finding, coding and programming.",
  },
  {
    icon: ScanLine,
    title: "Live data and testing",
    text: "We measure what's really happening instead of guessing from a code.",
  },
  {
    icon: Thermometer,
    title: "Air con stations",
    text: "For both R134a and the newer R1234yf refrigerant.",
  },
  {
    icon: Gauge,
    title: "Alignment and balancing",
    text: "Accurate geometry so tyres last and the car drives straight.",
  },
  {
    icon: Wrench,
    title: "Mechanical workshop",
    text: "From brakes and clutches to timing belts and gearboxes.",
  },
  {
    icon: SprayCan,
    title: "Body and paint",
    text: "Colour-matched repairs, resprays and alloy wheel refurbishment.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About us"
        title={
          <>
            Modern kit. <span className="accent">Honest advice.</span>
          </>
        }
        intro={`${SITE.name} is an independent garage in ${SITE.place}. We pair dealer-level diagnostic technology with straightforward, explain-everything service.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* TODO(client): replace with the real Autotecnix story, people and history */}
      <section
        className="shell grid grid-cols-1 gap-3 pb-12 md:pb-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
        aria-labelledby="story-title"
      >
        <div className="panel p-6 md:p-8">
          <h2 id="story-title" className="text-xl font-semibold">
            Why we started Autotecnix
          </h2>
          <div className="mt-4 grid gap-4 leading-relaxed text-fg/80">
            <p>
              Too many drivers leave a garage with a bill they don't understand and a fault that
              comes back a week later. Modern cars need more than a spanner and a guess.
            </p>
            <p>
              So we built a garage around two things: dealer-level kit to find the real cause, and a
              team that explains what we found and never touches your car without your OK.
            </p>
          </div>
        </div>
        <div className="panel flex flex-col p-6 md:p-8">
          <h2 className="text-xl font-semibold">What you can expect</h2>
          <ul className="mt-4 grid gap-3">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-3 leading-snug">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-volt">
                  <Check className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link to="/book" className="btn btn-volt mt-6 self-start">
            Book your car in <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="shell pb-4" aria-labelledby="kit-title">
        <SectionHeading
          id="kit-title"
          kicker="The workshop"
          title="The right kit for every job"
          intro="Proper equipment means faster fixes, fewer guesses and lower bills."
        />
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KIT.map((k) => (
            <div key={k.title} className="panel flex gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-volt">
                <k.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{k.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{k.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
