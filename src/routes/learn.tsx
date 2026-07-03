import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { IROHA, type IrohaEntry } from "@/lib/iroha";
import { shinobiEncode } from "@/lib/shinobi";
import { buildCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn the Shinobi Iroha — Kage / 影" },
      {
        name: "description",
        content:
          "Study the 49 kana of the Shinobi Iroha ninja cipher. Explore each symbol, drill with flashcards, and test yourself with a quiz.",
      },
      { property: "og:title", content: "Learn the Shinobi Iroha" },
      {
        property: "og:description",
        content: "Explore, flash, and quiz the 49 ninja cipher kana from 萬川集海.",
      },
      { property: "og:url", content: buildCanonicalUrl("/learn") },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/learn") }],
  }),
  component: Learn,
});

type Mode = "explore" | "flash" | "quiz";

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function symbolFor(entry: IrohaEntry): string {
  return shinobiEncode(entry.kana);
}

function Learn() {
  const [mode, setMode] = useState<Mode>("explore");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return IROHA;
    return IROHA.filter(
      (e) => e.kana.includes(q) || e.romaji.includes(q) || e.note.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10">
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em]">
          <Link to="/" className="hover:opacity-60">← KAGE/影</Link>
          <span className="text-muted-foreground">Learn / 49</span>
        </header>

        <section className="mt-14 sm:mt-24">
          <h1 className="font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[72px]">
            Learn the
            <br />
            <span className="italic font-normal">iroha.</span>
          </h1>
          <p className="mt-5 max-w-[44ch] font-mono-display text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
            Forty-nine kana. One classical poem. Explore each symbol, flip flashcards, or take a quick quiz.
          </p>
        </section>

        <div
          role="tablist"
          aria-label="Learning mode"
          className="mt-10 grid grid-cols-3 border border-foreground font-mono-display text-[11px] uppercase tracking-[0.2em] sm:mt-14"
        >
          {(["explore", "flash", "quiz"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              type="button"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={
                "py-3 transition " +
                (mode === m
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-foreground/10")
              }
            >
              {m === "explore" ? "Explore" : m === "flash" ? "Flashcards" : "Quiz"}
            </button>
          ))}
        </div>

        {mode === "explore" && (
          <section className="mt-10">
            <div className="flex items-center justify-between border-t border-foreground py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <label htmlFor="learn-search">01 / Search</label>
              <span>{filtered.length}/49</span>
            </div>
            <input
              id="learn-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kana, romaji, meaning…"
              className="w-full border-0 bg-transparent py-2 text-xl leading-snug text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
            />
            <ul className="mt-6 divide-y divide-foreground/10 border-t border-foreground/10">
              {filtered.map((entry) => (
                <li key={entry.kana} className="grid grid-cols-[auto_auto_1fr] items-baseline gap-6 py-4">
                  <span className="font-display text-3xl leading-none">{entry.kana}</span>
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {entry.romaji}
                  </span>
                  <span className="text-sm text-foreground/75">{entry.note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {mode === "flash" && <Flashcards />}
        {mode === "quiz" && <Quiz />}

        <footer className="mt-auto border-t border-foreground pt-4 font-mono-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
          <Link to="/" className="text-foreground hover:opacity-60">← Back to translator</Link>
        </footer>
      </div>
    </main>
  );
}

function Flashcards() {
  const [deck, setDeck] = useState<IrohaEntry[]>(() => shuffle(IROHA));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kage-learn-known");
      if (raw) setKnown(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("kage-learn-known", JSON.stringify(Array.from(known)));
    } catch {}
  }, [known]);

  const card = deck[index];
  const next = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between border-t border-foreground py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>02 / Card</span>
        <span>
          {index + 1}/{deck.length} · {known.size} learned
        </span>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="mt-6 flex min-h-[16rem] w-full flex-col items-center justify-center border border-foreground px-6 py-10 text-center transition hover:bg-foreground/5"
      >
        {flipped ? (
          <>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {card.romaji}
            </p>
            <p className="mt-2 font-display text-5xl">{card.kana}</p>
            <p className="mt-4 max-w-[36ch] text-sm text-foreground/70">{card.note}</p>
          </>
        ) : (
          <>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Ninja symbol
            </p>
            <p className="mt-3 font-display text-6xl leading-none">{symbolFor(card)}</p>
            <p className="mt-4 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Tap to flip
            </p>
          </>
        )}
      </button>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono-display text-[10px] uppercase tracking-[0.2em]">
        <button
          type="button"
          onClick={() => {
            setKnown((k) => {
              const n = new Set(k);
              n.add(card.kana);
              return n;
            });
            next();
          }}
          className="text-foreground hover:opacity-60"
        >
          Know it →
        </button>
        <button type="button" onClick={next} className="text-muted-foreground hover:text-foreground">
          Skip →
        </button>
        <button
          type="button"
          onClick={() => {
            setDeck(shuffle(IROHA));
            setIndex(0);
            setFlipped(false);
          }}
          className="text-muted-foreground hover:text-foreground"
        >
          Shuffle
        </button>
        <button
          type="button"
          onClick={() => setKnown(new Set())}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset progress
        </button>
      </div>
    </section>
  );
}

function makeQuestion() {
  const deck = shuffle(IROHA);
  const answer = deck[0];
  const choices = shuffle([answer, deck[1], deck[2], deck[3]]);
  return { answer, choices };
}

function Quiz() {
  const [q, setQ] = useState(() => makeQuestion());
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const pick = (kana: string) => {
    if (picked) return;
    setPicked(kana);
    setScore((s) => ({
      correct: s.correct + (kana === q.answer.kana ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const nextQ = () => {
    setPicked(null);
    setQ(makeQuestion());
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between border-t border-foreground py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>03 / Which kana?</span>
        <span>
          {score.correct}/{score.total}
        </span>
      </div>

      <div className="mt-8 flex flex-col items-center py-6 text-center">
        <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Ninja symbol
        </p>
        <p className="mt-3 font-display text-6xl leading-none">{symbolFor(q.answer)}</p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {q.choices.map((c) => {
          const isAnswer = c.kana === q.answer.kana;
          const isPicked = picked === c.kana;
          const state = !picked
            ? "border-foreground/30 hover:border-foreground"
            : isAnswer
              ? "border-foreground bg-foreground text-background"
              : isPicked
                ? "border-foreground/60 opacity-60"
                : "border-foreground/10 opacity-40";
          return (
            <li key={c.kana}>
              <button
                type="button"
                onClick={() => pick(c.kana)}
                className={"flex w-full flex-col items-center gap-1 border py-6 transition " + state}
              >
                <span className="font-display text-3xl leading-none">{c.kana}</span>
                <span className="font-mono-display text-[10px] uppercase tracking-[0.2em]">
                  {c.romaji}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em]">
        <span className="text-muted-foreground">
          {picked
            ? picked === q.answer.kana
              ? "Correct."
              : `Answer: ${q.answer.kana} (${q.answer.romaji})`
            : "Pick one."}
        </span>
        <button
          type="button"
          onClick={nextQ}
          disabled={!picked}
          className="text-foreground transition hover:opacity-60 disabled:opacity-20"
        >
          Next →
        </button>
      </div>
    </section>
  );
}