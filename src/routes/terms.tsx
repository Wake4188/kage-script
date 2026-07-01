import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Kage" },
      {
        name: "description",
        content: "Terms of service for the Kage translator application and related web services.",
      },
      { property: "og:title", content: "Terms of Service — Kage" },
      {
        property: "og:description",
        content: "The terms governing use of Kage and the translation experience.",
      },
      { property: "og:url", content: buildCanonicalUrl("/terms") },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/terms") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          url: buildCanonicalUrl("/terms"),
        }),
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[760px] flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">
            ← KAGE/影
          </Link>
          <span className="text-muted-foreground">Legal / 02</span>
        </header>

        <article className="mt-12 space-y-8 sm:mt-16">
          <div>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Terms of service
            </p>
            <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[56px]">
              Use the app responsibly.
            </h1>
            <p className="mt-4 max-w-[64ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
              By using Kage, you agree to use the service lawfully, respectfully, and in a way that
              does not interfere with the secure operation of the platform.
            </p>
          </div>

          <section className="space-y-4 rounded-lg border border-foreground/15 p-6">
            <h2 className="text-xl font-semibold">Permitted use</h2>
            <p className="text-sm leading-7 text-foreground/75">
              You may use Kage for personal, educational, or creative purposes. The app is intended
              to translate or transform text for non-malicious use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Restrictions</h2>
            <p className="text-sm leading-7 text-foreground/75">
              You must not use Kage for abusive, illegal, or deceptive purposes. Attempting to
              exploit the service, bypass safeguards, or interfere with the operation of the app is
              prohibited.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Intellectual property</h2>
            <p className="text-sm leading-7 text-foreground/75">
              The Kage interface, source code, and educational content are provided as part of an
              open-source project. Any third-party content or libraries remain subject to their own
              licenses.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
