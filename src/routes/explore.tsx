import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Kage / 影 (Shinobi Iroha Guides & Reference)" },
      {
        name: "description",
        content:
          "Index of every guide on Kage: the Shinobi Iroha symbol reference, Bansenshukai history, Kuji-in hand signs, learning path, FAQ and more.",
      },
      { property: "og:title", content: "Explore — Kage / 影" },
      {
        property: "og:description",
        content: "Every Shinobi Iroha guide, reference and learning tool on Kage in one place.",
      },
      { property: "og:url", content: buildCanonicalUrl("/explore") },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/explore") }],
  }),
  component: ExplorePage,
});

type Item = { to: string; title: string; desc: string };

const SECTIONS: { label: string; items: Item[] }[] = [
  {
    label: "Translate",
    items: [
      { to: "/", title: "Translator", desc: "Encode or decode text with the Shinobi Iroha cipher." },
      { to: "/translator-guide", title: "Translator guide", desc: "How the encoder and decoder actually work." },
      { to: "/common-mistakes", title: "Common mistakes", desc: "Pitfalls when reading and writing the cipher." },
    ],
  },
  {
    label: "Learn",
    items: [
      { to: "/learn", title: "Interactive lessons", desc: "Explore, flashcards, and a quick quiz." },
      { to: "/ninja-symbols", title: "Symbol reference", desc: "All 49 kana of the Shinobi Iroha." },
      { to: "/learning-resources", title: "Learning resources", desc: "A practical roadmap and further reading." },
      { to: "/faq", title: "FAQ", desc: "Quick answers about the script and its history." },
    ],
  },
  {
    label: "History",
    items: [
      { to: "/bansenshukai-history", title: "Bansenshukai history", desc: "Where the cipher came from and why it mattered." },
      { to: "/kuji-in-hand-signs", title: "Kuji-in hand signs", desc: "The nine ninja mudras and their meanings." },
    ],
  },
  {
    label: "Site",
    items: [
      { to: "/imprint", title: "Imprint", desc: "Who runs Kage." },
      { to: "/privacy", title: "Privacy", desc: "What we store and what we don't." },
      { to: "/terms", title: "Terms", desc: "Terms of use." },
    ],
  },
];

function ExplorePage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] text-foreground sm:text-xs">
          <Link to="/" className="hover:opacity-60">KAGE/影</Link>
          <span className="text-muted-foreground">Explore</span>
        </header>

        <section className="mt-14 sm:mt-24">
          <h1 className="font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[88px]">
            Explore.
          </h1>
          <p className="mt-5 max-w-[42ch] font-mono-display text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
            Every guide, reference and lesson on Kage. Pick a starting point.
          </p>
        </section>

        <div className="mt-12 flex flex-col gap-10 sm:mt-16">
          {SECTIONS.map((section) => (
            <section key={section.label} className="border-t border-foreground pt-4">
              <h2 className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {section.label}
              </h2>
              <ul className="mt-4 divide-y divide-foreground/10">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-baseline justify-between gap-6 py-4 transition hover:opacity-70"
                    >
                      <span className="flex-1">
                        <span className="block text-lg leading-tight text-foreground sm:text-xl">
                          {item.title}
                        </span>
                        <span className="mt-1 block font-mono-display text-[11px] leading-relaxed text-muted-foreground">
                          {item.desc}
                        </span>
                      </span>
                      <span aria-hidden className="font-mono-display text-xs text-muted-foreground">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-foreground pt-4 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="text-foreground hover:opacity-60">← Translator</Link>
        </footer>
      </div>
    </main>
  );
}