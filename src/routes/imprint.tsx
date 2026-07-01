import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/imprint")({
  head: () => ({
    meta: [
      { title: "Imprint — Kage" },
      {
        name: "description",
        content: "Imprint and legal contact information for the Kage translator project.",
      },
      { property: "og:title", content: "Imprint — Kage" },
      {
        property: "og:description",
        content: "Contact and legal notice information for the Kage project.",
      },
      { property: "og:url", content: buildCanonicalUrl("/imprint") },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/imprint") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Imprint",
          url: buildCanonicalUrl("/imprint"),
        }),
      },
    ],
  }),
  component: ImprintPage,
});

function ImprintPage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[760px] flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">
            ← KAGE/影
          </Link>
          <span className="text-muted-foreground">Legal / 03</span>
        </header>

        <article className="mt-12 space-y-8 sm:mt-16">
          <div>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Imprint
            </p>
            <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[56px]">
              Legal notice.
            </h1>
            <p className="mt-4 max-w-[64ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
              Kage is an open-source web application maintained as a public project. This notice is
              a template intended for deployment and may be updated with project-specific contact
              details.
            </p>
          </div>

          <section className="space-y-4 rounded-lg border border-foreground/15 p-6">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="text-sm leading-7 text-foreground/75">
              For legal inquiries, accessibility feedback, or questions related to this project,
              please contact the maintainer through the project repository or hosting provider.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Responsible operator</h2>
            <p className="text-sm leading-7 text-foreground/75">
              This website is operated as a public-facing web application and is subject to the
              terms of the hosting platform and the project maintainer.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
