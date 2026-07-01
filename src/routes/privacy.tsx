import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Kage" },
      {
        name: "description",
        content:
          "Privacy policy for Kage, the browser-based Shinobi Iroha translator app and open-source project.",
      },
      { property: "og:title", content: "Privacy Policy — Kage" },
      {
        property: "og:description",
        content:
          "How Kage handles data, browser storage, and third-party services in the translator experience.",
      },
      { property: "og:url", content: buildCanonicalUrl("/privacy") },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/privacy") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          url: buildCanonicalUrl("/privacy"),
        }),
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[760px] flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">
            ← KAGE/影
          </Link>
          <span className="text-muted-foreground">Legal / 01</span>
        </header>

        <article className="mt-12 space-y-8 sm:mt-16">
          <div>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Privacy policy
            </p>
            <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[56px]">
              Your privacy matters.
            </h1>
            <p className="mt-4 max-w-[64ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
              Kage is a lightweight translator experience built for privacy-conscious use. This
              page explains what data is processed locally and what information may be shared with
              third-party services when you use the translation features.
            </p>
          </div>

          <section className="space-y-4 rounded-lg border border-foreground/15 p-6">
            <h2 className="text-xl font-semibold">What we collect</h2>
            <p className="text-sm leading-7 text-foreground/75">
              The app stores a small amount of user preference data in your browser, such as the
              selected language and theme, to improve the experience. Translation input is sent to
              the server only when you submit a translation request and only for the purpose of
              generating the requested output.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">How we use it</h2>
            <p className="text-sm leading-7 text-foreground/75">
              We use the data you provide to process translations and respond to the request. We do
              not build a profile of your browsing activity, and we do not sell your personal data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Third-party services</h2>
            <p className="text-sm leading-7 text-foreground/75">
              The translation flow may rely on hosted services such as Google Translate-compatible
              endpoints and Vercel analytics for reliability and operational insights. These services
              may receive the text submitted for translation as part of processing the request.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Your choices</h2>
            <p className="text-sm leading-7 text-foreground/75">
              You can clear browser storage for this site at any time, and you may stop using the app
              if you do not want your content processed by the translation services.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
