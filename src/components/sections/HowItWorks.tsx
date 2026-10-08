import { SectionHeading } from "@/components/ui/SectionHeading";

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
      <SectionHeading id="how-title" kicker="How it works" title="Simple from start to finish" />
      <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="panel flex gap-4 p-5 md:flex-col md:p-6">
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
    </section>
  );
}
