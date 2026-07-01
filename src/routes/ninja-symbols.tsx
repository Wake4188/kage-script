import { createFileRoute, Link } from "@tanstack/react-router";
import { shinobiEncode } from "@/lib/shinobi";
import { buildCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/ninja-symbols")({
  head: () => ({
    meta: [
      { title: "Ninja Symbols — The 49 Shinobi Iroha Characters & Meanings" },
      {
        name: "description",
        content:
          "Visual reference of the 49 ninja symbols of the Shinobi Iroha cipher (1676): every glyph, its hiragana, romaji, and meaning. The complete ninja alphabet.",
      },
      { property: "og:title", content: "Ninja Symbols — The 49 Shinobi Iroha Characters" },
      {
        property: "og:description",
        content:
          "A visual library of the 49 ninja symbols from the Bansenshukai — each glyph with its hiragana, romaji, and meaning. The full ninja alphabet.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: buildCanonicalUrl("/ninja-symbols") },
      { name: "twitter:title", content: "Ninja Symbols — The 49 Shinobi Iroha Characters" },
      { name: "twitter:description", content: "Visual reference of the 49 symbols of the Shinobi Iroha cipher with hiragana, romaji, and meanings." },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/ninja-symbols") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Ninja Symbols — The 49 Shinobi Iroha Characters",
          description:
            "Complete visual reference of the 49 ninja symbols of the Shinobi Iroha cipher from the 1676 Bansenshukai, with hiragana, romaji and meanings.",
          author: { "@type": "Person", name: "Noa Wilhide" },
          mainEntityOfPage: "https://ninja-script-app.lovable.app/ninja-symbols",
          inLanguage: "en",
          about: [
            { "@type": "Thing", name: "Ninja symbols" },
            { "@type": "Thing", name: "Ninja alphabet" },
            { "@type": "Thing", name: "Shinobi Iroha" },
          ],
        }),
      },
    ],
  }),
  component: NinjaSymbolsPage,
});

// Iroha order (47 classical kana + ゐ ゑ = 49) with romaji and a short note.
const IROHA: { kana: string; romaji: string; note: string }[] = [
  { kana: "い", romaji: "i", note: "Iro — colour, the opening of the iroha poem." },
  { kana: "ろ", romaji: "ro", note: "Continuing iro ha — colours fade." },
  { kana: "は", romaji: "ha", note: "Closes the first line: ‘colours fade.’" },
  { kana: "に", romaji: "ni", note: "Ni-hoheto — fragrant though they are." },
  { kana: "ほ", romaji: "ho", note: "Part of nihoheto, ‘fragrant.’" },
  { kana: "へ", romaji: "he", note: "Part of nihoheto." },
  { kana: "と", romaji: "to", note: "Closes the second line." },
  { kana: "ち", romaji: "chi", note: "Chirinuru — they scatter." },
  { kana: "り", romaji: "ri", note: "Part of chirinuru." },
  { kana: "ぬ", romaji: "nu", note: "Part of chirinuru." },
  { kana: "る", romaji: "ru", note: "Part of chirinuru." },
  { kana: "を", romaji: "wo", note: "Object marker — ‘them.’" },
  { kana: "わ", romaji: "wa", note: "Waga — ‘our.’" },
  { kana: "か", romaji: "ka", note: "Part of waga yo — ‘our world.’" },
  { kana: "よ", romaji: "yo", note: "Yo — world, life, age." },
  { kana: "た", romaji: "ta", note: "Tare zo — ‘who, then…’" },
  { kana: "れ", romaji: "re", note: "Part of tare zo." },
  { kana: "そ", romaji: "so", note: "Part of tare zo." },
  { kana: "つ", romaji: "tsu", note: "Tsune naramu — ‘is unchanging?’" },
  { kana: "ね", romaji: "ne", note: "Part of tsune naramu." },
  { kana: "な", romaji: "na", note: "Part of tsune naramu." },
  { kana: "ら", romaji: "ra", note: "Part of tsune naramu." },
  { kana: "む", romaji: "mu", note: "Closes the line — nothingness, impermanence." },
  { kana: "う", romaji: "u", note: "Ui no okuyama — ‘the deep mountains of karma.’" },
  { kana: "ゐ", romaji: "wi", note: "Archaic kana, used in ui." },
  { kana: "の", romaji: "no", note: "Possessive — ‘of.’" },
  { kana: "お", romaji: "o", note: "Part of okuyama — ‘deep mountain.’" },
  { kana: "く", romaji: "ku", note: "Part of okuyama." },
  { kana: "や", romaji: "ya", note: "Closes okuyama." },
  { kana: "ま", romaji: "ma", note: "Mountain — yama." },
  { kana: "け", romaji: "ke", note: "Kefu — ‘today.’" },
  { kana: "ふ", romaji: "fu", note: "Part of kefu." },
  { kana: "こ", romaji: "ko", note: "Koete — ‘crossing.’" },
  { kana: "え", romaji: "e", note: "Part of koete." },
  { kana: "て", romaji: "te", note: "Closes koete." },
  { kana: "あ", romaji: "a", note: "Asaki — ‘shallow.’" },
  { kana: "さ", romaji: "sa", note: "Part of asaki." },
  { kana: "き", romaji: "ki", note: "Closes asaki." },
  { kana: "ゆ", romaji: "yu", note: "Yume — ‘dream.’" },
  { kana: "め", romaji: "me", note: "Closes yume." },
  { kana: "み", romaji: "mi", note: "Miji — ‘shall not see.’" },
  { kana: "し", romaji: "shi", note: "Part of miji." },
  { kana: "ゑ", romaji: "we", note: "Archaic kana, used in weji." },
  { kana: "ひ", romaji: "hi", note: "Hi mo sezu — ‘nor be drunk by.’" },
  { kana: "も", romaji: "mo", note: "Part of hi mo sezu." },
  { kana: "せ", romaji: "se", note: "Part of sezu." },
  { kana: "す", romaji: "su", note: "Closes sezu — the final line." },
  { kana: "ん", romaji: "n", note: "The terminal nasal — added later to the set." },
];

function NinjaSymbolsPage() {
  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[920px] flex-col px-5 pb-12 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <Link to="/" className="hover:opacity-60">
            ← KAGE/影
          </Link>
          <span className="text-muted-foreground">49 / symbols</span>
        </header>

        <article className="mt-14 sm:mt-20">
          <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Reference / 02
          </p>
          <h1 className="mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[72px]">
            Ninja
            <br />
            <span className="italic font-normal">symbols.</span>
          </h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
            The complete <strong>ninja alphabet</strong>: 49 symbols from the Shinobi Iroha
            (忍びいろは), the substitution cipher recorded in the 1676 ninja encyclopedia
            <em> Bansenshukai</em>. Each glyph below replaces one kana — together they let a ninja
            write any Japanese sentence in symbols that look like obscure literary kanji.
          </p>
        </article>

        <section className="mt-14">
          <div className="flex items-baseline gap-3 border-t border-foreground pt-4 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>01</span>
            <span>/</span>
            <span>The grid</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
            The 49 Shinobi Iroha symbols
          </h2>
          <p className="mt-4 max-w-[62ch] text-foreground/70">
            Ordered by the classical <em>iroha</em> poem. The large character is the ninja symbol;
            below it sits the hiragana it replaces, its romaji, and a short note on the syllable's
            role in the poem.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {IROHA.map((entry, i) => {
              const symbol = shinobiEncode(entry.kana);
              return (
                <li
                  key={entry.kana + i}
                  className="group flex flex-col border border-foreground/20 bg-background p-4 transition hover:border-foreground"
                >
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="mt-3 break-all text-4xl leading-none sm:text-5xl"
                    aria-hidden="true"
                  >
                    {symbol}
                  </span>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl">{entry.kana}</span>
                    <span className="font-mono-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {entry.romaji}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60">{entry.note}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16 border-t border-foreground pt-6">
          <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            02 / Notes
          </div>
          <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
            How to read the ninja alphabet
          </h2>
          <div className="mt-4 max-w-[64ch] space-y-4 text-base leading-relaxed text-foreground/80 sm:text-[17px]">
            <p>
              The Shinobi Iroha is a strict <strong>1-to-1 substitution cipher</strong>: every kana
              has exactly one ninja symbol, and every symbol decodes back to one kana. Many of the
              glyphs are real but rare kanji; others are built by pairing a left-side radical (water
              氵, person 亻, hand 扌) with a right-side component borrowed from common characters
              like 化, 玄, 立 or 黒. The visual logic is intentional — the cipher was meant to look
              like a fragment of obscure scripture, not gibberish.
            </p>
            <p>
              Dakuten (が, ぱ, etc.), katakana, and small kana (っ, ゃ) are folded down to their
              base kana before encoding. There is no separate symbol for them — a ninja reader
              restored them from context, exactly the way a modern reader of unpunctuated hiragana
              would.
            </p>
            <p>
              These symbols are increasingly used today in tattoos, calligraphy, game design and
              historical illustration — anywhere the visual language of the shinobi is referenced.
              To turn your own words into the ninja alphabet, use the
              <Link to="/" className="underline underline-offset-4 hover:opacity-60">
                {" "}
                Kage translator
              </Link>
              , or read the{" "}
              <Link
                to="/bansenshukai-history"
                className="underline underline-offset-4 hover:opacity-60"
              >
                history of the Bansenshukai
              </Link>
              .
            </p>
          </div>
        </section>

        <footer className="mt-16 border-t border-foreground pt-4 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="normal-case">Created by Noa Wilhide in France</span>
            <div className="flex items-center gap-4">
              <Link to="/bansenshukai-history" className="text-foreground hover:opacity-60">
                History →
              </Link>
              <Link to="/" className="text-foreground hover:opacity-60">
                ← Back to Kage
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
