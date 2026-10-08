import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
} from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import archivoFont from "../assets/fonts/archivo-latin.woff2?url";
import appCss from "../styles.css?url";
import { MobileActionBar, WhatsAppFab } from "@/components/layout/ActionBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CarBlueprint } from "@/components/visuals/CarBlueprint";
import { SITE } from "@/config/site";
import { OG_IMAGE, jsonLd, localBusinessSchema } from "@/lib/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${SITE.name} | Garage, MOT & Diagnostics in ${SITE.placeShort}` },
      { name: "description", content: SITE.description },
      { name: "theme-color", content: "#f4f4ef" },
      { name: "color-scheme", content: "light" },
      { name: "author", content: SITE.name },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE.name}: ${SITE.tagline}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        href: archivoFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [jsonLd(localBusinessSchema())],
  }),
  shellComponent: RootShell,
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: RouteError,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <Chrome>
      <Outlet />
    </Chrome>
  );
}

/** Header, footer and quick actions around every page (including 404/error pages). */
function Chrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <MobileActionBar />
      <WhatsAppFab />
    </>
  );
}

function FaultScreen({
  code,
  title,
  text,
  action,
}: {
  code: string;
  title: string;
  text: string;
  action: ReactNode;
}) {
  return (
    <section className="pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="shell text-center">
        <p className="kicker justify-center">Fault code {code}</p>
        <h1 className="headline mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.4rem)]">{title}</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted md:text-lg">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">{action}</div>
        <CarBlueprint className="mx-auto mt-10 max-w-xl opacity-60" />
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <FaultScreen
      code="P0404"
      title="This page has gone off-road."
      text="The page you're looking for doesn't exist or has moved. Let's get you back on track."
      action={
        <>
          <Link to="/" className="btn btn-volt">
            Back to home <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/services" className="btn btn-ghost">
            Browse services
          </Link>
        </>
      }
    />
  );
}

function RouteError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <FaultScreen
      code="P0500"
      title="Something didn't load."
      text="That's on us, not you. Try again, or call us if you need help right away."
      action={
        <>
          <button
            type="button"
            className="btn btn-volt"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Try again
          </button>
          <a href="/" className="btn btn-ghost">
            Go home
          </a>
        </>
      }
    />
  );
}
