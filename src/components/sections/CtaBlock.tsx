import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { SITE, telLink } from "@/config/site";
import { PHOTOS } from "@/content/photos";

export function CtaBlock({
  title = "Ready to book your car in?",
  text = "Book online in about a minute, or call and talk to a technician.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="shell py-12 md:py-16" aria-labelledby="cta-title">
      <div className="inverse relative isolate flex flex-col gap-6 overflow-clip rounded-[1.5rem] bg-canvas px-6 py-9 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
        {/* Workshop photo behind a dark wash so the text stays readable */}
        <img
          src={PHOTOS.workshopLift.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-ink/80 md:bg-transparent md:bg-gradient-to-r md:from-ink md:via-ink/85 md:to-ink/40"
        />
        <div className="min-w-0 max-w-xl">
          <h2 id="cta-title" className="headline text-[clamp(1.6rem,3.4vw,2.4rem)]">
            {title}
          </h2>
          <p className="mt-3 text-fg/80">{text}</p>
        </div>
        <div className="grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-2">
          <Link to="/book" className="btn btn-volt">
            Book online <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a href={telLink} className="btn btn-ghost">
            <Phone className="h-4 w-4" aria-hidden="true" /> {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
