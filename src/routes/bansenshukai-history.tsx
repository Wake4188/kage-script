import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/bansenshukai-history")({
  head: () => ({
    meta: [
      { title: "Bansenshukai (萬川集海) & the Shinobi Iroha Cipher — Kage" },
      {
        name: "description",
        content:
          "A history of the Bansenshukai, the 1676 ninja encyclopedia, and the 49-symbol Shinobi Iroha cipher used to encode secret messages.",
      },
      { property: "og:title", content: "Bansenshukai & the Shinobi Iroha Cipher" },
      {
        property: "og:description",
        content:
          "How Fujibayashi Yasutake compiled the Bansenshukai in 1676 and the 49 kanji symbols ninja used to write in secret.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://ninja-script-app.lovable.app/bansenshukai-history" },
    ],
    links: [
      { rel: "canonical", href: "https://ninja-script-app.lovable.app/bansenshukai-history" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Bansenshukai (萬川集海) and the Shinobi Iroha Cipher",
          description:
            "A history of the 1676 ninja encyclopedia Bansenshukai and the 49-symbol Shinobi Iroha cipher.",
          author: { "@type": "Person", name: "Noa Wilhide" },
          mainEntityOfPage: "https://ninja-script-app.lovable.app/bansenshukai-history",
          inLanguage: "en",
          about: [
            { "@type": "Thing", name: "Bansenshukai" },
            { "@type": "Thing", name: "Shinobi Iroha" },
            { "@type": "Thing", name: "Ninja cipher" },
          ],
        }),
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-12 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">← KAGE/影</Link>
          <span className="text-muted-foreground">v1 · 1676</span>
        </header>

        <article className="mt-14 sm:mt-20">
          <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Field notes / 01
          </p>
          <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[72px]">
            Bansenshukai
            <br />
            <span className="italic font-normal">&amp; the ninja cipher.</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
            A short history of the 1676 ninja encyclopedia <em>Bansenshukai</em> (萬川集海)
            and the 49-symbol Shinobi Iroha cipher Kage encodes with.
          </p>
        </article>

        <section className="mt-14 space-y-10">
          <Block n="01" title="What is the Bansenshukai?">
            <p>
              <em>Bansenshukai</em> — literally <span className="font-mono-display">“sea of ten thousand rivers gathered”</span> —
              is a Japanese ninjutsu manual compiled in 1676 by <strong>Fujibayashi Yasutake</strong>, a samurai-scholar from
              Iga descended from one of the three great Iga shinobi families. By the early Edo period the
              wars that defined the ninja's trade had ended, and Fujibayashi gathered the surviving oral
              traditions of Iga and Kōga into a single 22-volume encyclopedia so the craft would not be lost.
            </p>
            <p>
              The book covers ideology, strategy, infiltration techniques, weapons, tools, weather lore, and
              communications. It was presented to the Tokugawa shogunate but never widely circulated; for
              most of its life it sat in the shogunal library, copied by hand, treated as sensitive material.
            </p>
          </Block>

          <Block n="02" title="The Shinobi Iroha — 49 symbols">
            <p>
              Inside the <em>Bansenshukai</em>'s communications chapter is a writing system called the
              <strong> Shinobi Iroha</strong> (忍びいろは) — “the ninja iroha.” The classical Japanese
              iroha is a poem that uses every kana exactly once, so it functions as an alphabet. The
              Shinobi Iroha replaces each of the <strong>49 kana</strong> with a distinct kanji-like glyph.
              The result is a simple, rigorous <em>substitution cipher</em>: any Japanese sentence can be
              transcribed, character by character, into a string that looks like obscure literary kanji.
            </p>
            <p>
              The glyphs were not invented from scratch. Many are real but rare characters; others are built
              by combining a left-side radical (water 氵, person 亻, etc.) with a right-side component drawn
              from common kanji like 化, 玄, 立, or 黒. The pattern is internally consistent — once you know
              the grid, you can decode a message without a key, but to anyone who has never seen the system
              it reads as nonsense.
            </p>
          </Block>

          <Block n="03" title="How a message was encoded">
            <p>The mechanic is straightforward:</p>
            <ol className="ml-5 list-decimal space-y-2 text-foreground/80">
              <li>Write the plain message in Japanese.</li>
              <li>Reduce it to pure hiragana (kana only).</li>
              <li>Replace each kana with its assigned Shinobi Iroha glyph.</li>
            </ol>
            <p>
              The cipher's strength was never mathematical — it is a 1-to-1 substitution, trivial to break
              with a frequency table. Its strength was <strong>contextual</strong>. A captured letter looked
              like a fragment of an obscure Buddhist text or a copying error, not military intelligence.
              Couriers could carry encoded notes hidden inside legitimate documents, and a casual reader
              would simply skim past them.
            </p>
          </Block>

          <Block n="04" title="Why it still matters">
            <p>
              The Shinobi Iroha is one of the earliest documented Japanese ciphers and one of the only
              ninja-era cryptographic systems to survive with a full key intact. It is studied today as a
              piece of cryptographic history, a window into Edo-period communications practice, and — for
              modern audiences — a small but vivid artifact of how the ninja actually worked, away from the
              folklore.
            </p>
            <p>
              <strong>Kage</strong> implements the Shinobi Iroha exactly as it appears in the
              <em> Bansenshukai</em>: 49 kana mapped to 49 glyphs, with dakuten and katakana folded down to
              their base kana before substitution. <Link to="/" className="underline underline-offset-4 hover:opacity-60">Try it here</Link>.
            </p>
          </Block>
        </section>

        <footer className="mt-16 border-t border-foreground pt-4 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="normal-case">Created by Noa Wilhide in France</span>
            <Link to="/" className="text-foreground hover:opacity-60">← Back to Kage</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-foreground pt-4">
      <div className="flex items-baseline gap-3 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>{n}</span>
        <span>/</span>
        <span>{title}</span>
      </div>
      <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80 sm:text-[17px]">
        {children}
      </div>
    </div>
  );
}
