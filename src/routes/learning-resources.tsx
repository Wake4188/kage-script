import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";
import { ArticleCard } from "@/components/learning/ArticleCard";
import { RelatedLinks } from "@/components/learning/RelatedLinks";

export const Route = createFileRoute("/learning-resources")({
  head: () => ({
    meta: [
      { title: "Learning Resources — Read Kage Script & Learn Ninja Symbols" },
      {
        name: "description",
        content:
          "A practical roadmap for learning Kage Script, reading the Shinobi Iroha symbols, and understanding the cipher step by step.",
      },
      { property: "og:title", content: "Learning Resources — Read Kage Script" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: buildCanonicalUrl("/learning-resources") },
      { name: "twitter:title", content: "Learning Resources — Read Kage Script" },
      { name: "twitter:description", content: "Follow a practical learning roadmap for Kage Script and ninja symbols." },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/learning-resources") }],
  }),
  component: LearningResourcesPage,
});

function LearningResourcesPage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[960px] flex-col px-5 pb-12 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">
            ← KAGE/影
          </Link>
          <span className="text-muted-foreground">Guide / 01</span>
        </header>

        <article className="mt-14 sm:mt-20">
          <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Learning / 02
          </p>
          <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[72px]">
            Beginner's guide
            <br />
            <span className="italic font-normal">to reading Kage Script.</span>
          </h1>
          <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
            A focused roadmap for learning the Shinobi Iroha step by step, from the first symbol to a confident reading habit.
          </p>
        </article>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="border-t border-foreground pt-5">
              <h2 className="text-2xl font-medium tracking-tight text-foreground">1. Start with the alphabet</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/75">
                Memorize the 49 kana-to-symbol mapping in order. Learn the system as a pattern rather than a list of isolated glyphs.
              </p>
            </div>
            <div className="border-t border-foreground pt-5">
              <h2 className="text-2xl font-medium tracking-tight text-foreground">2. Practice reading short syllables</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/75">
                Begin with simple words and names, then move to short phrases. The goal is to recognize repeated shapes, not to memorize every character at once.
              </p>
            </div>
            <div className="border-t border-foreground pt-5">
              <h2 className="text-2xl font-medium tracking-tight text-foreground">3. Use context to restore meaning</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/75">
                Kage Script is a substitution cipher, so context matters. Read the output as a series of syllables and let the meaning emerge naturally.
              </p>
            </div>
          </div>
          <div className="border border-foreground/15 bg-background p-6">
            <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Quick path
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/75">
              <li>• Study the complete symbol reference.</li>
              <li>• Test yourself with the translator output.</li>
              <li>• Read the history page for cultural context.</li>
              <li>• Compare your interpretations with a trusted reading.</li>
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Related articles
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ArticleCard
              title="How the translator works"
              description="Learn how the app converts a plain text input into a symbol sequence and back again."
              href="/translator-guide"
              eyebrow="How it works"
              meta="4 min read"
            />
            <ArticleCard
              title="Frequently asked questions"
              description="Get quick answers on accuracy, reading strategy, and what the cipher really is."
              href="/faq"
              eyebrow="FAQ"
              meta="3 min read"
            />
          </div>
        </section>

        <RelatedLinks />
      </div>
    </main>
  );
}
