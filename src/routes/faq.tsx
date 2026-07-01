import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";
import { ArticleCard } from "@/components/learning/ArticleCard";
import { RelatedLinks } from "@/components/learning/RelatedLinks";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Kage Script Translator & Ninja Cipher Guide" },
      {
        name: "description",
        content:
          "Answers to common questions about the Kage translator, the Shinobi Iroha cipher, how to read ninja symbols, and how the translator works.",
      },
      { property: "og:title", content: "FAQ — Kage Script Translator & Ninja Cipher Guide" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: buildCanonicalUrl("/faq") },
      { name: "twitter:title", content: "FAQ — Kage Script Translator & Ninja Cipher Guide" },
      { name: "twitter:description", content: "Practical answers about reading, decoding, and learning Kage Script." },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/faq") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Kage Script?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kage Script is a web-based translator for the Shinobi Iroha, a 49-symbol cipher used in the historical Bansenshukai ninja manual.",
              },
            },
            {
              "@type": "Question",
              name: "How accurate is the translator?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The translator reflects the historical 49-symbol substitution model used by Kage, but transliteration can vary with modern Japanese spelling and context.",
              },
            },
            {
              "@type": "Question",
              name: "Can I learn to read the symbols?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Start with the symbol reference, then practice with short examples and the learning resources page to build familiarity.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[920px] flex-col px-5 pb-12 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">
            ← KAGE/影
          </Link>
          <span className="text-muted-foreground">FAQ / 01</span>
        </header>

        <article className="mt-14 sm:mt-20">
          <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Learning / 01
          </p>
          <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[72px]">
            Frequently asked
            <br />
            <span className="italic font-normal">questions.</span>
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
            Clear answers for beginners, curious readers, and anyone trying to understand how Kage
            Script works in practice.
          </p>
        </article>

        <section className="mt-14 space-y-8">
          {faqItems.map((item) => (
            <div key={item.question} className="border-t border-foreground pt-5">
              <h2 className="text-xl font-medium tracking-tight text-foreground">{item.question}</h2>
              <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-foreground/75">{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Related reading
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ArticleCard
              title="Beginner's guide to reading Kage Script"
              description="A practical introduction to recognizing the symbols and building confidence with short examples."
              href="/learning-resources"
              eyebrow="Guide"
              meta="5 min read"
            />
            <ArticleCard
              title="How the translator works"
              description="A clear explanation of the encoding and decoding pipeline used by the modern tool."
              href="/translator-guide"
              eyebrow="How it works"
              meta="4 min read"
            />
          </div>
        </section>

        <RelatedLinks />
      </div>
    </main>
  );
}

const faqItems = [
  {
    question: "What is Kage Script?",
    answer:
      "Kage Script is the modern name for the Shinobi Iroha cipher used in the historical Bansenshukai and recreated in this translator. It turns kana into a 49-symbol alphabet that resembles obscure literary kanji.",
  },
  {
    question: "Is this the same as a real ninja alphabet?",
    answer:
      "It is a historically grounded cipher rather than a full spoken language. The symbols stand for kana, and the system is meant to disguise a message rather than replace spoken Japanese entirely.",
  },
  {
    question: "How accurate is the translation?",
    answer:
      "Accuracy depends on the input and the modern Japanese reading you want. The tool is strongest when the message is written in clear hiragana or when the decoded text is read with context in mind.",
  },
  {
    question: "Can I learn to read it by hand?",
    answer:
      "Yes. A good first step is to memorize the symbol-to-kana mapping and then practice reading short phrases. The symbol reference and learning roadmap are the fastest routes to fluency for a beginner.",
  },
  {
    question: "Why does it look so complex?",
    answer:
      "The visual complexity is intentional. The cipher was designed to look like a fragment of solemn or literary writing so that anyone who saw it would assume it was a normal document rather than a hidden message.",
  },
];
