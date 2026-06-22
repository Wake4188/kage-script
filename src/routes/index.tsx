import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { shinobiEncode } from "@/lib/shinobi";
import { translateToHiragana } from "@/lib/translate.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shinobi — Ninja Text Translator" },
      { name: "description", content: "Encode any language into the 1676 ninja cipher 忍びいろは (Shinobi Iroha)." },
      { property: "og:title", content: "Shinobi — Ninja Text Translator" },
      { property: "og:description", content: "Encode any language into the secret ninja cipher 忍びいろは." },
    ],
  }),
  component: Index,
});

function Index() {
  const [input, setInput] = useState("");
  const [hiragana, setHiragana] = useState("");
  const [ninja, setNinja] = useState("");
  const [copied, setCopied] = useState(false);

  const translateFn = useServerFn(translateToHiragana);
  const mutation = useMutation({
    mutationFn: (text: string) => translateFn({ data: { text } }),
    onSuccess: (res) => {
      setHiragana(res.hiragana);
      setNinja(shinobiEncode(res.hiragana));
    },
  });

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  const submit = () => {
    const t = input.trim();
    if (!t || mutation.isPending) return;
    mutation.mutate(t);
  };

  const copy = async () => {
    if (!ninja) return;
    await navigator.clipboard.writeText(ninja);
    setCopied(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Decorative giant kanji */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 select-none font-brush text-[28rem] leading-none text-foreground/[0.04] sm:-right-24 sm:text-[40rem]"
      >
        忍
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 select-none font-brush text-[18rem] leading-none text-foreground/[0.04] sm:text-[24rem]"
      >
        影
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pt-10">
        {/* Header */}
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground sm:text-xs">
              忍びいろは・Shinobi Iroha
            </p>
            <h1 className="mt-1 truncate font-brush text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Ninja Translator
            </h1>
          </div>
          <span className="hanko shrink-0 px-2 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs">
            忍
          </span>
        </header>

        <p className="mt-3 max-w-prose text-xs leading-relaxed text-muted-foreground sm:text-sm">
          Any language → secret kanji cipher used by ninja, compiled in the 1676
          encyclopedia 萬川集海.
        </p>

        {/* Input card */}
        <section className="mt-5 rounded-lg border-2 border-foreground/80 bg-card p-4 ink-shadow sm:mt-8 sm:p-6">
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
            Plain Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
            }}
            placeholder="Type anything in any language…"
            rows={4}
            className="w-full resize-none border-0 bg-transparent font-jp text-base leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none sm:text-lg"
          />
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-[10px] text-muted-foreground sm:text-xs">
              {input.length}/2000
            </span>
            <button
              type="button"
              onClick={submit}
              disabled={!input.trim() || mutation.isPending}
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-background transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-sm"
            >
              {mutation.isPending ? "Encrypting…" : "Translate 翻訳"}
            </button>
          </div>
        </section>

        {/* Decorative divider */}
        <div className="my-5 flex items-center gap-3 sm:my-8">
          <div className="h-px flex-1 bg-foreground/30" />
          <span className="font-brush text-sm text-foreground/60">秘伝</span>
          <div className="h-px flex-1 bg-foreground/30" />
        </div>

        {/* Output card */}
        <section className="rounded-lg border-2 border-foreground/80 bg-foreground p-4 text-background ink-shadow sm:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-background/60 sm:text-xs">
              Ninja Cipher
            </label>
            <button
              type="button"
              onClick={copy}
              disabled={!ninja}
              className="shrink-0 rounded border border-background/30 px-2.5 py-1 text-[10px] uppercase tracking-widest text-background/90 transition hover:bg-background/10 disabled:opacity-40 sm:text-xs"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-3 min-h-[7rem] break-words font-jp text-2xl leading-[1.5] sm:min-h-[9rem] sm:text-3xl">
            {ninja ? (
              ninja
            ) : mutation.isPending ? (
              <span className="text-background/40">…</span>
            ) : mutation.isError ? (
              <span className="text-base text-[color:var(--shu)] sm:text-lg">
                Encryption failed. Try again.
              </span>
            ) : (
              <span className="text-background/30">
                𨊂浾⽕紫゙
              </span>
            )}
          </div>

          {hiragana && (
            <div className="mt-4 border-t border-background/15 pt-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-background/50 sm:text-xs">
                Hiragana bridge
              </p>
              <p className="mt-1 font-jp text-sm text-background/80 sm:text-base">
                {hiragana}
              </p>
            </div>
          )}
        </section>

        <footer className="mt-auto pt-8 text-center text-[10px] text-muted-foreground sm:text-xs">
          Cipher table from{" "}
          <a
            href="https://github.com/tomill/Text-Shinobi"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Text::Shinobi
          </a>{" "}
          · 萬川集海 · 1676
        </footer>
      </div>
    </main>
  );
}
