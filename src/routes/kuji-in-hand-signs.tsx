import { createFileRoute, Link } from "@tanstack/react-router";
import { buildCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/kuji-in-hand-signs")({
  head: () => ({
    meta: [
      { title: "Kuji-in: The 9 Ninja Hand Signs & Their Meanings (Japanese Hand Signs)" },
      {
        name: "description",
        content:
          "A guide to Kuji-in, the nine Japanese hand signs (mudras) used by ninja and mikkyō monks. Learn each sign — Rin, Pyō, Tō, Sha, Kai, Jin, Retsu, Zai, Zen — its kanji, mantra and meaning.",
      },
      { property: "og:title", content: "Kuji-in — The 9 Ninja Hand Signs" },
      {
        property: "og:description",
        content:
          "The nine Japanese hand signs of Kuji-in: each mudra, its kanji, mantra, and role in ninjutsu and esoteric Buddhism.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: buildCanonicalUrl("/kuji-in-hand-signs") },
      { name: "twitter:title", content: "Kuji-in — The 9 Ninja Hand Signs" },
      {
        name: "twitter:description",
        content: "The nine Japanese hand signs used by ninja — Rin, Pyō, Tō, Sha, Kai, Jin, Retsu, Zai, Zen — with meanings.",
      },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/kuji-in-hand-signs") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Kuji-in: The 9 Ninja Hand Signs & Their Meanings",
          description:
            "Guide to the nine Japanese hand signs (Kuji-in) used by ninja and esoteric Buddhist practitioners: each mudra, mantra, kanji, and meaning.",
          author: { "@type": "Person", name: "Noa Wilhide" },
          mainEntityOfPage: buildCanonicalUrl("/kuji-in-hand-signs"),
          inLanguage: "en",
          about: [
            { "@type": "Thing", name: "Kuji-in" },
            { "@type": "Thing", name: "Japanese hand signs" },
            { "@type": "Thing", name: "Ninja hand signs" },
            { "@type": "Thing", name: "Mudra" },
          ],
        }),
      },
    ],
  }),
  component: KujiInPage,
});

const SIGNS: {
  kanji: string;
  romaji: string;
  mantra: string;
  mudra: string;
  meaning: string;
}[] = [
  {
    kanji: "臨",
    romaji: "Rin",
    mantra: "On baishiraman taya sowaka",
    mudra: "Dokko-in — interlaced fingers with both middle fingers extended and pressed together.",
    meaning:
      "‘To face’ — strength of body and mind. The opening sign, calling on inner power before any action.",
  },
  {
    kanji: "兵",
    romaji: "Pyō",
    mantra: "On isha naya intara ya sowaka",
    mudra: "Daikongō-in — same as Rin but with index fingers extended alongside the middles.",
    meaning:
      "‘Soldier’ — direction of energy. Channeling ki outward, associated with weapons and combat readiness.",
  },
  {
    kanji: "闘",
    romaji: "Tō",
    mantra: "On jitera shiitara jibaratano sowaka",
    mudra: "Sotoshishi-in — the outer lion seal; thumbs and index fingers touching, other fingers hooked.",
    meaning:
      "‘To fight’ — harmony with the universe. Balancing yin and yang so action follows the flow of events.",
  },
  {
    kanji: "者",
    romaji: "Sha",
    mantra: "On haya baishiraman taya sowaka",
    mudra: "Uchishishi-in — the inner lion seal; fingers interlaced inside the palms.",
    meaning:
      "‘One who / person’ — healing of self and others. Traditionally linked to restoring the body’s vitality.",
  },
  {
    kanji: "皆",
    romaji: "Kai",
    mantra: "On noumaku sanmanda basaradan kan",
    mudra: "Gebaku-in — outer bonds seal; fingers interlocked with thumbs joined outside.",
    meaning:
      "‘All / everyone’ — knowledge of others’ thoughts and premonition. A sign of intuition and awareness.",
  },
  {
    kanji: "陣",
    romaji: "Jin",
    mantra: "On aginiya inta ya sowaka",
    mudra: "Naibaku-in — inner bonds seal; fingers interlocked with thumbs joined inside.",
    meaning:
      "‘Array / battle formation’ — telepathy and reading the enemy. Understanding intention before movement.",
  },
  {
    kanji: "列",
    romaji: "Retsu",
    mantra: "On iro ta iro ta sowaka",
    mudra: "Chiken-in — the wisdom fist; one hand’s index finger clasped by the other hand.",
    meaning:
      "‘Row / to line up’ — mastery of time and space. Traditionally the sign associated with the ninja’s legendary control of dimensions.",
  },
  {
    kanji: "在",
    romaji: "Zai",
    mantra: "On chiri chi iba rota ya sowaka",
    mudra: "Nichirin-in — sun-disc seal; thumbs and index fingers forming a triangle.",
    meaning:
      "‘To exist / to be present’ — control of the elements of nature: sky, wind, fire, water, earth.",
  },
  {
    kanji: "前",
    romaji: "Zen",
    mantra: "On aran aran anaku sowaka",
    mudra: "Ongyō-in — hidden-form seal; the left thumb enclosed by the right hand.",
    meaning:
      "‘Before / in front’ — enlightenment and invisibility. The closing sign, dissolving the practitioner into the surroundings.",
  },
];

function KujiInPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <nav className="mb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Kage</Link>
        </nav>

        <header className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Guide · 九字護身法
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Kuji-in: the nine ninja hand signs
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            The <em>Kuji-in</em> (九字印, “nine syllable seals”) are the nine Japanese
            hand signs — mudras — most closely associated in popular imagination with
            the ninja. Each sign pairs a kanji, a Sanskrit-derived mantra, and a
            specific finger position said to focus one aspect of body, mind or
            environment.
          </p>
        </header>

        <section className="space-y-8 text-[15px] leading-relaxed">
          <p>
            Kuji-in did not originate with the ninja. The practice comes from{" "}
            <strong>mikkyō</strong>, the esoteric Buddhism transmitted to Japan by
            Kūkai in the 9th century, and ultimately traces back to Taoist Chinese
            ritual. Shugendō mountain ascetics adopted it, and shinobi in turn
            adopted it from them. The <em>Bansenshukai</em> (1676) — the same
            encyclopedia that preserved the{" "}
            <Link to="/bansenshukai-history" className="underline">
              Shinobi Iroha cipher
            </Link>{" "}
            — treats spiritual training, including breathwork and mudras, as
            inseparable from the more famous techniques of stealth and disguise.
          </p>
          <p>
            The nine signs are performed in sequence, often accompanied by the{" "}
            <em>kuji-kiri</em> — “nine cuts” — traced in the air with the fingers
            in a grid of four horizontal and five vertical strokes. For the ninja
            the ritual was less magic than a portable, repeatable way to steady
            the nerves before a mission: a somatic anchor for concentration.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            The nine signs
          </h2>
          <ol className="mt-6 divide-y divide-border/60 border-y border-border/60">
            {SIGNS.map((s, i) => (
              <li key={s.romaji} className="grid grid-cols-[auto_1fr] gap-6 py-6">
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-5xl leading-none">{s.kanji}</span>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {s.romaji}
                  </span>
                </div>
                <div>
                  <p className="text-base font-medium">{s.meaning}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Mudra · </span>
                    {s.mudra}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Mantra · </span>
                    <em>{s.mantra}</em>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 space-y-6 text-[15px] leading-relaxed">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            A note on history vs. legend
          </h2>
          <p>
            Later fiction — from Edo-period kabuki to modern manga — turned the
            Kuji-in into a source of superhuman power: invisibility, elemental
            control, mind-reading. The historical practice is more modest. The
            nine signs are a meditation framework shared across mikkyō, Shugendō
            and shinobi lineages, closer to a warrior’s pre-fight breathing
            routine than to sorcery. Their staying power comes from being simple,
            portable, and repeatable under stress.
          </p>
          <p>
            If you enjoyed this, you can also explore the{" "}
            <Link to="/ninja-symbols" className="underline">
              49 ninja symbols of the Shinobi Iroha
            </Link>{" "}
            — the written counterpart to Kuji-in — or read the{" "}
            <Link to="/bansenshukai-history" className="underline">
              history of the Bansenshukai
            </Link>{" "}
            that preserved both traditions.
          </p>
        </section>

        <footer className="mt-16 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to Kage</Link>
        </footer>
      </div>
    </main>
  );
}