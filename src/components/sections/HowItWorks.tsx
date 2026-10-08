import { SectionHeading } from "@/components/ui/SectionHeading";
import { PHOTOS } from "@/content/photos";

const STEPS = [
  {
    title: "Book in a minute",
    text: "Online, on WhatsApp or by phone. Just tell us your reg and what's wrong.",
  },
  {
    title: "We check and quote",
    text: "We find the cause and send you a clear price. Nothing starts without your OK.",
  },
  {
    title: "Drive away",
    text: "Collect your car with a plain-English summary of what we did.",
  },
];

export function HowItWorks() {
  return (
    <section className="shell py-12 md:py-16" aria-labelledby="how-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-ink lg:aspect-[5/4]">
          <img
            src={PHOTOS.engineBay.src}
            alt={PHOTOS.engineBay.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <SectionHeading
            id="how-title"
            kicker="How it works"
            title="Simple from start to finish"
          />
          <ol className="mt-8 grid grid-cols-1 gap-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="panel flex gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-volt font-mono text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
