import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { shinobiEncode, shinobiDecode } from "@/lib/shinobi";
import { translateToHiragana, translateFromHiragana } from "@/lib/translate.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAGE / 影" },
      { name: "description", content: "Encode any language into the 1676 ninja cipher 忍びいろは, or decode it back." },
      { property: "og:title", content: "KAGE / 影" },
      { property: "og:description", content: "Encode any language into the 1676 ninja cipher, or decode it back." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Kage",
          alternateName: "影",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          url: "https://ninja-script-app.lovable.app",
          description:
            "Encode any language into the 1676 ninja kanji cipher 忍びいろは, or decode it back.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          author: { "@type": "Person", name: "Noa Wilhide" },
        }),
      },
    ],
  }),
  component: Index,
});

function useTheme() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
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

  return { isDark, toggle, mounted };
}

function Index() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [hiragana, setHiragana] = useState("");
  const [ninja, setNinja] = useState("");
  const [decoded, setDecoded] = useState("");
  const [english, setEnglish] = useState("");
  const [copied, setCopied] = useState(false);
  const { isDark, toggle, mounted } = useTheme();

  const translateFn = useServerFn(translateToHiragana);
  const mutation = useMutation({
    mutationFn: (text: string) => translateFn({ data: { text } }),
    onSuccess: (res) => {
      setHiragana(res.hiragana);
      setNinja(shinobiEncode(res.hiragana));
    },
  });

  const translateBackFn = useServerFn(translateFromHiragana);
  const decodeMutation = useMutation({
    mutationFn: (text: string) => translateBackFn({ data: { text } }),
    onSuccess: (res) => {
      setEnglish(res.english);
    },
  });

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  const submit = () => {
    const t = input.trim();
    if (!t) return;
    if (mode === "encode") {
      if (mutation.isPending) return;
      mutation.mutate(t);
    } else {
      if (decodeMutation.isPending) return;
      const hira = shinobiDecode(t);
      setDecoded(hira);
      setEnglish("");
      decodeMutation.mutate(hira);
    }
  };

  const output = mode === "encode" ? ninja : english;

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
  };

  const switchMode = (next: "encode" | "decode") => {
    if (next === mode) return;
    setMode(next);
    setInput("");
    setHiragana("");
    setNinja("");
    setDecoded("");
    setEnglish("");
  };

  return (
    <main className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10">
        {/* Header — minimal monospace bar */}
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] text-foreground sm:text-xs">
          <span>KAGE/影</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex h-7 w-7 items-center justify-center border border-foreground text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              {mounted && isDark ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
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

        {/* Mode tabs */}
        <div
          role="tablist"
          aria-label="Mode"
          className="mt-10 grid grid-cols-2 border border-foreground font-mono-display text-[11px] uppercase tracking-[0.2em] sm:mt-14"
        >
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              type="button"
              onClick={() => switchMode(m)}
              className={
                "py-3 transition " +
                (mode === m
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-foreground/10")
              }
            >
              {m}
            </button>
          ))}
        </div>

        {/* Input */}
        <section className="mt-8 border-t border-foreground sm:mt-10">
          <div className="flex items-center justify-between py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <label htmlFor="shinobi-input" className="cursor-pointer">
              01 / {mode === "encode" ? "Text" : "Cipher"}
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
            placeholder={mode === "encode" ? "Type anything…" : "Paste ninja cipher…"}
            rows={3}
            spellCheck={false}
            maxLength={2000}
            className="w-full resize-none border-0 bg-transparent py-2 text-xl leading-snug tracking-tight text-foreground placeholder:text-muted-foreground/40 focus:outline-none sm:text-2xl"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!input.trim() || (mode === "encode" && mutation.isPending)}
            style={undefined}
            className="mt-4 inline-flex w-full items-center justify-between border border-foreground bg-foreground px-4 py-3 font-mono-display text-[11px] uppercase tracking-[0.2em] text-background transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-6"
          >
            <span>
              {mode === "encode"
                ? mutation.isPending
                  ? "Encoding…"
                  : "Encode"
                : "Decode"}
            </span>
            <span aria-hidden className="ml-6">→</span>
          </button>
        </section>

        {/* Output */}
        <section className="mt-12 border-t border-foreground sm:mt-16">
          <div className="flex items-center justify-between py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>02 / {mode === "encode" ? "Cipher" : "Hiragana"}</span>
            <button
              type="button"
              onClick={copy}
              disabled={!output}
              className="font-mono-display uppercase tracking-[0.2em] text-foreground transition hover:opacity-60 disabled:opacity-20"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <div className="min-h-[6rem] break-words py-3 text-2xl leading-[1.4] sm:min-h-[8rem] sm:text-3xl" aria-live="polite">
            {output ? (
              output
            ) : mode === "encode" && mutation.isPending ? (
              <span className="text-muted-foreground">…</span>
            ) : mode === "encode" && mutation.isError ? (
              <span className="text-base text-foreground">Failed. Try again.</span>
            ) : (
              <span className="text-muted-foreground/40">𨊂浾⽕紫゙</span>
            )}
          </div>
          {mode === "encode" && hiragana && (
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
              <span className="normal-case">Created by Noa Wilhide in France</span>
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
            <Link to="/bansenshukai-history" className="text-foreground hover:opacity-60">
              History →
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
