import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";
import { ArticleCard } from "@/components/learning/ArticleCard";
import { RelatedLinks } from "@/components/learning/RelatedLinks";

export const Route = createFileRoute("/translator-guide")({
  head: () => ({
    meta: [
      { title: "How the Translator Works — Kage Script Guide" },
      {
        name: "description",
        content:
          "A plain-English explanation of how the Kage translator handles encoding, decoding, and historical symbol mapping for the Shinobi Iroha cipher.",
      },
      { property: "og:title", content: "How the Translator Works — Kage Script" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: buildCanonicalUrl("/translator-guide") },
      { name: "twitter:title", content: "How the Translator Works — Kage Script" },
      { name: "twitter:description", content: "Understand how the Kage translator encodes and decodes the Shinobi Iroha cipher." },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/translator-guide") }],
  }),
  component: TranslatorGuidePage,
});

function TranslatorGuidePage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[920px] flex-col px-5 pb-12 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">
            ← KAGE/影
          </Link>
          <span className="text-muted-foreground">Guide / 02</span>
        </header>

        <article className="mt-14 sm:mt-20">
          <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Learning / 03
          </p>
          <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[72px]">
            How the
            <br />
            <span className="italic font-normal">translator works.</span>
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
            The translation experience is built around a simple historical model: convert text into hiragana, then replace each syllable with its corresponding Shinobi Iroha symbol.
          </p>
        </article>

        <section className="mt-14 space-y-8">
          <div className="border-t border-foreground pt-5">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">Encoding</h2>
            <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-foreground/75">
              When you use the translator in encode mode, the input is first normalized and then converted into hiragana. Each kana is mapped to its symbol in the historical substitution table.
            </p>
          </div>
          <div className="border-t border-foreground pt-5">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">Decoding</h2>
            <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-foreground/75">
              In decode mode, the tool reads the symbol string, restores the kana equivalent, then translates that back into English or another supported target language where possible.
            </p>
          </div>
          <div className="border-t border-foreground pt-5">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">Common limits</h2>
            <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-foreground/75">
              Because the system is a historical cipher, not a modern phonetic writing system, some outputs depend on spelling, context, and the source language. This makes it excellent for learning and experimentation.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Related reading
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ArticleCard
              title="Beginner's guide to reading Kage Script"
              description="A practical roadmap for walking through the alphabet and learning to read the symbols."
              href="/learning-resources"
              eyebrow="Guide"
              meta="5 min read"
            />
            <ArticleCard
              title="Frequently asked questions"
              description="A simple reference for common questions about the translator and its history."
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
