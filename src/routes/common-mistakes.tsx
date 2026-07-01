import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";
import { ArticleNavigation } from "@/components/learning/ArticleNavigation";
import { ReadingProgress } from "@/components/learning/ReadingProgress";
import { RecentlyViewed } from "@/components/learning/RecentlyViewed";

export const Route = createFileRoute("/common-mistakes")({
  head: () => ({
    meta: [
      { title: "Common Mistakes — Translating Kage Script & Ninja Cipher Tips" },
      {
        name: "description",
        content:
          "Common mistakes people make when encoding and decoding Kage Script, with practical tips for reading the Shinobi Iroha, handling archaic kana, punctuation, and cipher context.",
      },
      { property: "og:title", content: "Common Mistakes — Translating Kage Script" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: buildCanonicalUrl("/common-mistakes") },
      { name: "twitter:title", content: "Common Mistakes — Translating Kage Script" },
      {
        name: "twitter:description",
        content:
          "Avoid common translation pitfalls for the Shinobi Iroha cipher and learn how the Kage translator interprets historical kana and modern input.",
      },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/common-mistakes") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Common Mistakes — Translating Kage Script",
          description:
            "Common mistakes people make when encoding and decoding Kage Script, with practical tips for reading the Shinobi Iroha and handling historical kana.",
          author: { "@type": "Person", name: "Noa Wilhide" },
          mainEntityOfPage: buildCanonicalUrl("/common-mistakes"),
          inLanguage: "en",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: buildCanonicalUrl("/") },
              { "@type": "ListItem", position: 2, name: "Common mistakes", item: buildCanonicalUrl("/common-mistakes") },
            ],
          },
        }),
      },
    ],
  }),
  component: CommonMistakesPage,
});

const mistakes = [
  {
    title: "Treating Kage Script like a secret alphabet",
    description:
      "The Shinobi Iroha is a substitution cipher, not a separate writing system. Each symbol stands for one kana, so focus on sound and context rather than guessing new meanings.",
  },
  {
    title: "Ignoring archaic kana and pronunciation",
    description:
      "The system uses classical kana such as ゐ and ゑ, and modern inputs must be normalized into hiragana before encoding. Don’t assume every voiced or small kana has its own ninja symbol.",
  },
  {
    title: "Expecting punctuation to survive translation",
    description:
      "Punctuation, spaces, and numbers are not part of the historical cipher. The translator treats them as helpers for readability, but the Shinobi Iroha itself is built for syllables, not punctuation marks.",
  },
  {
    title: "Relying only on romanization",
    description:
      "Roman letters can mislead the mapping. The strongest translations always start with clean hiragana, so use the translator’s Japanese normalization rather than guessing kana from romaji.",
  },
  {
    title: "Skipping the symbol reference",
    description:
      "If you want to read or write by hand, memorize the 49 symbol mappings first. The full symbol reference and the learning roadmap help turn recognition into real reading skill.",
  },
];

function CommonMistakesPage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <ReadingProgress targetId="main-content" />
      <div className="mx-auto flex min-h-dvh w-full max-w-[920px] flex-col px-5 pb-12 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">
            ← KAGE/影
          </Link>
          <span className="text-muted-foreground">Guide / 03</span>
        </header>

        <article className="mt-14 sm:mt-20">
          <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Learning / 04
          </p>
          <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[72px]">
            Common
            <br />
            <span className="italic font-normal">translation mistakes.</span>
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
            Avoid the most frequent pitfalls when encoding and decoding the Shinobi Iroha. These practical tips keep your Kage Script results accurate and readable.
          </p>
        </article>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {mistakes.map((item) => (
              <div key={item.title} className="border-t border-foreground pt-6">
                <h2 className="text-2xl font-medium tracking-tight text-foreground">{item.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{item.description}</p>
              </div>
            ))}
          </div>

          <aside className="rounded border border-foreground/10 bg-background p-6 text-sm text-foreground/80">
            <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Quick checklist
            </div>
            <ul className="mt-4 space-y-3">
              <li>• Start with plain hiragana, not roman letters.</li>
              <li>• Treat the cipher as a 1-to-1 substitution.</li>
              <li>• Ignore punctuation when you encode; it is added for clarity.</li>
              <li>• Learn the 49 symbols before you try handwriting.</li>
              <li>• Use context to make decoded text meaningful.</li>
            </ul>
            <div className="mt-8 border-t border-foreground/10 pt-6">
              <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Learn next
              </p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/80">
                <Link to="/" className="block underline underline-offset-4 hover:text-foreground">
                  Translator
                </Link>
                <Link to="/ninja-symbols" className="block underline underline-offset-4 hover:text-foreground">
                  Symbol reference
                </Link>
                <Link to="/learning-resources" className="block underline underline-offset-4 hover:text-foreground">
                  Beginner's guide
                </Link>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="border-t border-foreground pt-6">
              <h2 className="text-2xl font-medium tracking-tight text-foreground">How to use the translator</h2>
              <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-foreground/75">
                The translator is the fastest way to test your understanding. Type a short message, then compare the output with the symbol reference to see which kana are being encoded.
              </p>
            </div>
            <div className="border-t border-foreground pt-6">
              <h2 className="text-2xl font-medium tracking-tight text-foreground">Best follow-up pages</h2>
              <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-foreground/75">
                After reading about mistakes, the most useful next steps are the symbol grid and the translator guide. They turn the same concepts into concrete practice.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <ArticleNavigation />
            <RecentlyViewed />
          </div>
        </section>
      </div>
    </main>
  );
}
