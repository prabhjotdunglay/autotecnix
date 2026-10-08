import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { SITE, fullAddress, mailLink, telLink } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy",
      description: `How ${SITE.name} collects, uses and protects your personal data.`,
      path: "/privacy",
      noindex: true,
    }),
  component: PrivacyPage,
});

// TODO(client): have this reviewed before launch, and update the date when it changes.
const UPDATED = "October 2026";

function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-3 border-t border-line py-9 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-10">
      <h2 className="flex items-baseline gap-3 text-lg font-semibold md:text-xl">
        <span className="font-mono text-sm text-muted">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="grid gap-4 leading-relaxed text-fg/80 [&_a]:font-semibold [&_a]:text-fg [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-2">
        {children}
      </div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Privacy policy"
        intro={`Last updated ${UPDATED}. This explains what personal data ${SITE.name} collects, why, and the choices you have.`}
        crumbs={[{ label: "Home", to: "/" }, { label: "Privacy" }]}
      />
      <div className="shell pb-20 md:pb-24">
        <div className="panel px-6 py-2 md:px-12 md:py-4">
          <Block n={1} title="Who we are">
            <p>
              {SITE.legalName} ("we", "us") runs this website and is the data controller for
              personal data collected through it, under the UK GDPR and the Data Protection Act
              2018.
            </p>
            <p>
              {fullAddress}
              <br />
              Phone: <a href={telLink}>{SITE.phone.display}</a>
              <br />
              Email: <a href={mailLink}>{SITE.email}</a>
            </p>
          </Block>

          <Block n={2} title="What we collect">
            <ul>
              <li>Contact details you give us: name, phone number and email address.</li>
              <li>Vehicle details: registration, make, model and mileage.</li>
              <li>Booking details: services needed, preferred dates and any notes you add.</li>
              <li>
                Basic technical data our hosting provider logs automatically, such as IP address and
                browser type, for security.
              </li>
            </ul>
          </Block>

          <Block n={3} title="How we use it">
            <ul>
              <li>To reply to your enquiry and arrange your booking.</li>
              <li>To carry out the work you ask for and keep a record of it.</li>
              <li>To contact you about your vehicle, for example when it's ready.</li>
              <li>To keep the website secure and working properly.</li>
            </ul>
            <p>We never sell your data or use it for third-party marketing.</p>
          </Block>

          <Block n={4} title="Lawful basis">
            <p>
              We rely on steps taken at your request before entering into a contract (when you ask
              for a booking or quote), performance of a contract (when we work on your car), and our
              legitimate interests in running a secure website.
            </p>
          </Block>

          <Block n={5} title="Who we share it with">
            <ul>
              <li>
                <strong>Web3Forms</strong>, which delivers website form submissions to our inbox.
              </li>
              <li>
                <strong>WhatsApp (Meta)</strong>, if you choose to message us on WhatsApp.
              </li>
              <li>
                <strong>Cloudflare</strong>, which hosts this website and protects it from attacks.
              </li>
              <li>
                <strong>Google</strong>, only if you choose to load the interactive map.
              </li>
            </ul>
            <p>These providers may process data outside the UK under appropriate safeguards.</p>
          </Block>

          <Block n={6} title="Cookies">
            <p>
              This website doesn't use advertising or analytics cookies, and our fonts are hosted
              locally. The Google map on our contact pages only loads when you press "Show
              interactive map"; Google may then set its own cookies.
            </p>
          </Block>

          <Block n={7} title="How long we keep it">
            <p>
              Enquiries that don't lead to a booking are deleted within 12 months. Records of work
              on your vehicle are kept for up to 6 years to meet our legal and accounting
              obligations.
            </p>
          </Block>

          <Block n={8} title="Your rights">
            <p>
              You can ask to access, correct or delete your data, or object to or restrict how we
              use it. Contact us using the details above and we'll respond within one month.
            </p>
            <p>
              You can also complain to the Information Commissioner's Office at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
                ico.org.uk
              </a>
              .
            </p>
          </Block>

          <Block n={9} title="Changes">
            <p>
              We'll post any changes to this policy on this page and update the date at the top.
            </p>
          </Block>
        </div>
      </div>
    </>
  );
}
