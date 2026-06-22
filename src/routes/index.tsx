import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { shinobiEncode } from "@/lib/shinobi";
import { translateToHiragana } from "@/lib/translate.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHINOBI / 忍" },
      { name: "description", content: "Translate any language into the 1676 ninja cipher 忍びいろは." },
      { property: "og:title", content: "SHINOBI / 忍" },
      { property: "og:description", content: "Translate any language into the 1676 ninja cipher." },
    ],
  }),
  component: Index,
});

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };

  return { isDark, toggle };
}

function Index() {
  const [input, setInput] = useState("");
  const [hiragana, setHiragana] = useState("");
  const [ninja, setNinja] = useState("");
  const [copied, setCopied] = useState(false);
  const { isDark, toggle } = useTheme();

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
    <main className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10">
        {/* Header — minimal monospace bar */}
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] text-foreground sm:text-xs">
          <span>SHINOBI/忍</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex h-7 w-7 items-center justify-center border border-foreground text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              {isDark ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
            </button>
            <span className="text-muted-foreground">v1 · 1676</span>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-14 sm:mt-24">
          <h1 className="font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[88px]">
            Ninja
            <br />
            <span className="italic font-normal">cipher.</span>
          </h1>
          <p className="mt-5 max-w-[36ch] font-mono-display text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
            Any language → 忍びいろは, the secret kanji cipher compiled in 萬川集海.
          </p>
        </section>

        {/* Input */}
        <section className="mt-12 border-t border-foreground sm:mt-16">
          <div className="flex items-center justify-between py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <label htmlFor="shinobi-input" className="cursor-pointer">
              01 / Input
            </label>
            <span>{input.length}/2000</span>
          </div>
          <textarea
            id="shinobi-input"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 2000))}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
            }}
            placeholder="Type anything…"
            rows={3}
            spellCheck={false}
            maxLength={2000}
            className="w-full resize-none border-0 bg-transparent py-2 text-xl leading-snug tracking-tight text-foreground placeholder:text-muted-foreground/40 focus:outline-none sm:text-2xl"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!input.trim() || mutation.isPending}
            className="mt-4 inline-flex w-full items-center justify-between border border-foreground bg-foreground px-4 py-3 font-mono-display text-[11px] uppercase tracking-[0.2em] text-background transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-6"
          >
            <span>{mutation.isPending ? "Encrypting…" : "Translate"}</span>
            <span aria-hidden className="ml-6">→</span>
          </button>
        </section>

        {/* Output */}
        <section className="mt-12 border-t border-foreground sm:mt-16">
          <div className="flex items-center justify-between py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>02 / Cipher</span>
            <button
              type="button"
              onClick={copy}
              disabled={!ninja}
              className="font-mono-display uppercase tracking-[0.2em] text-foreground transition hover:opacity-60 disabled:opacity-20"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <div className="min-h-[6rem] break-words py-3 text-2xl leading-[1.4] sm:min-h-[8rem] sm:text-3xl" aria-live="polite">
            {ninja ? (
              ninja
            ) : mutation.isPending ? (
              <span className="text-muted-foreground">…</span>
            ) : mutation.isError ? (
              <span className="text-base text-foreground">Failed. Try again.</span>
            ) : (
              <span className="text-muted-foreground/40">𨊂浾⽕紫゙</span>
            )}
          </div>
          {hiragana && (
            <div className="border-t border-foreground/10 pt-3">
              <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Hiragana
              </p>
              <p className="mt-1 text-sm text-foreground/70 sm:text-base">{hiragana}</p>
            </div>
          )}
        </section>

        <footer className="mt-auto border-t border-foreground pt-4 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <span>Created by Noa Wilhide in France</span>
              <span className="hidden text-muted-foreground/40 sm:inline">·</span>
              <span>萬川集海</span>
            </div>
            <a
              href="https://github.com/tomill/Text-Shinobi"
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground hover:opacity-60"
            >
              Source ↗
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
