import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Languages } from "lucide-react";
import { shinobiEncode, shinobiDecode, shinobiDecodeWithMetadata } from "@/lib/shinobi";
import { translateToHiragana, translateFromHiragana } from "@/lib/translate.functions";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";
import { buildCanonicalUrl } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kage / 影 — Ninja Cipher Translator (忍びいろは)" },
      {
        name: "description",
        content: "Encode any language into the 1676 ninja cipher 忍びいろは, or decode it back.",
      },
      { name: "stackscope-claim", content: "mbx3lucv" },
      { property: "og:title", content: "Kage / 影 — Ninja Cipher Translator (忍びいろは)" },
      {
        property: "og:description",
        content: "Encode any language into the 1676 ninja cipher, or decode it back.",
      },
      { property: "og:url", content: buildCanonicalUrl("/") },
      { name: "twitter:title", content: "Kage / 影 — Ninja Cipher Translator" },
      { name: "twitter:description", content: "Encode any language into the secret Shinobi Iroha ninja cipher, or decode it back." },
    ],
    links: [{ rel: "canonical", href: buildCanonicalUrl("/") }],
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
          url: buildCanonicalUrl("/"),
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
  const { lang, setLang, t } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!langOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [langOpen]);

  const translateFn = useServerFn(translateToHiragana);
  const mutation = useMutation({
    mutationFn: (text: string) => translateFn({ data: { text } }),
    onSuccess: (res) => {
      setHiragana(res.hiragana);
      setNinja(shinobiEncode(res.hiragana, res.japanese ? { japanese: res.japanese } : undefined));
    },
  });

  const translateBackFn = useServerFn(translateFromHiragana);
  const decodeMutation = useMutation({
    mutationFn: (text: string) => translateBackFn({ data: { text, targetLang: lang } }),
    onSuccess: (res) => {
      setEnglish(res.english);
    },
  });

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  const resetOutput = () => {
    setHiragana("");
    setNinja("");
    setDecoded("");
    setEnglish("");
    setCopied(false);
  };

  const submit = () => {
    const t = input.trim();
    if (!t) return;
    if (mode === "encode") {
      if (mutation.isPending) return;
      resetOutput();
      mutation.mutate(t);
    } else {
      if (decodeMutation.isPending) return;
      const { decodedText, metadata } = shinobiDecodeWithMetadata(t);
      const hira = decodedText;
      resetOutput();
      setDecoded(hira);
      const translateSource = metadata?.japanese ?? hira;
      decodeMutation.mutate(translateSource);
    }
  };

  const output = mode === "encode" ? ninja : english;

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const switchMode = (next: "encode" | "decode") => {
    if (next === mode) return;
    setMode(next);
    setInput("");
    resetOutput();
  };

  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground font-display">
      <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10">
        {/* Header — minimal monospace bar */}
        <header className="flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] text-foreground sm:text-xs">
          <span>KAGE/影</span>
          <div className="flex items-center gap-3">
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                aria-label={t.langSwitch}
                aria-controls="language-menu"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="inline-flex h-7 min-w-7 items-center justify-center gap-1 border border-foreground px-1.5 text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                <Languages size={12} strokeWidth={1.5} />
                <span className="font-mono-display text-[10px]">
                  {LANGS.find((l) => l.code === lang)?.short ?? "EN"}
                </span>
              </button>
              {langOpen && (
                <ul
                  id="language-menu"
                  role="listbox"
                  className="absolute right-0 z-10 mt-1 min-w-[140px] border border-foreground bg-background py-1 font-mono-display text-[10px] uppercase tracking-[0.2em] shadow-lg"
                >
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={l.code === lang}
                        onClick={() => {
                          setLang(l.code as Lang);
                          setLangOpen(false);
                        }}
                        className={
                          "block w-full px-3 py-2 text-left transition hover:bg-foreground hover:text-background " +
                          (l.code === lang ? "bg-foreground/10" : "")
                        }
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label={mounted && isDark ? t.themeLight : t.themeDark}
              className="inline-flex h-7 w-7 items-center justify-center border border-foreground text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              {mounted && isDark ? (
                <Sun size={14} strokeWidth={1.5} />
              ) : (
                <Moon size={14} strokeWidth={1.5} />
              )}
            </button>
            <span className="hidden text-muted-foreground sm:inline">v1 · 1676</span>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-14 sm:mt-24">
          <h1
            aria-label="Shinobi Iroha Ninja Cipher Translator"
            className="font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[88px]"
          >
            <span aria-hidden="true">
              {t.heroLine1}
              <br />
              <span className="italic font-normal">{t.heroLine2}</span>
            </span>
          </h1>
          <p className="mt-5 max-w-[36ch] font-mono-display text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
            {t.subtitle}
          </p>
        </section>

        {/* Mode tabs */}
        <div
          role="tablist"
          aria-label={t.modeAria}
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
              {m === "encode" ? t.encode : t.decode}
            </button>
          ))}
        </div>

        {/* Input */}
        <section className="mt-8 border-t border-foreground sm:mt-10">
          <h2 className="sr-only">{mode === "encode" ? t.textLabel : t.cipherLabel}</h2>
          <div className="flex items-center justify-between py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <label htmlFor="shinobi-input" className="cursor-pointer">
              01 / {mode === "encode" ? t.textLabel : t.cipherLabel}
            </label>
            <span>{input.length}/2000</span>
          </div>
          <textarea
            id="shinobi-input"
            value={input}
            aria-describedby="translation-help"
            onChange={(e) => setInput(e.target.value.slice(0, 2000))}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
            }}
            placeholder={mode === "encode" ? t.inputPlaceholderEncode : t.inputPlaceholderDecode}
            rows={3}
            spellCheck={false}
            maxLength={2000}
            className="w-full resize-none border-0 bg-transparent py-2 text-xl leading-snug tracking-tight text-foreground placeholder:text-muted-foreground/40 focus:outline-none sm:text-2xl"
          />
          <button
            type="button"
            onClick={submit}
            aria-label={mode === "encode" ? t.encode : t.decode}
            disabled={
              !input.trim() || (mode === "encode" ? mutation.isPending : decodeMutation.isPending)
            }
            className="mt-4 inline-flex w-full items-center justify-between border border-foreground bg-foreground px-4 py-3 font-mono-display text-[11px] uppercase tracking-[0.2em] text-background transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-6"
          >
            <span>
              {mode === "encode"
                ? mutation.isPending
                  ? t.encoding
                  : t.encode
                : decodeMutation.isPending
                  ? t.decoding
                  : t.decode}
            </span>
            <span aria-hidden className="ml-6">
              →
            </span>
          </button>
        </section>

        {/* Output */}
        <section className="mt-12 border-t border-foreground sm:mt-16" aria-labelledby="output-heading">
          <h2 id="output-heading" className="sr-only">{mode === "encode" ? t.cipherLabel : t.translationLabel}</h2>
          <div className="flex items-center justify-between py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>02 / {mode === "encode" ? t.cipherLabel : t.translationLabel}</span>
            <button
              type="button"
              onClick={copy}
              disabled={!output}
              aria-label={copied ? t.copied : t.copy}
              className="font-mono-display uppercase tracking-[0.2em] text-foreground transition hover:opacity-60 disabled:opacity-20"
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>
          <div
            id="translation-help"
            className="min-h-[6rem] break-words py-3 text-2xl leading-[1.4] sm:min-h-[8rem] sm:text-3xl"
            aria-live="polite"
          >
            {output ? (
              output
            ) : (mode === "encode" ? mutation.isPending : decodeMutation.isPending) ? (
              <span className="text-muted-foreground">…</span>
            ) : (mode === "encode" ? mutation.isError : decodeMutation.isError) ? (
              <span className="text-base text-foreground">{t.failed}</span>
            ) : (
              <span className="text-muted-foreground/40">𨊂浾⽕紫゙</span>
            )}
          </div>
          {mode === "encode" && hiragana && (
            <div className="border-t border-foreground/10 pt-3">
              <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.hiragana}
              </p>
              <p className="mt-1 text-sm text-foreground/70 sm:text-base">{hiragana}</p>
            </div>
          )}
          {mode === "decode" && decoded && (
            <div className="border-t border-foreground/10 pt-3">
              <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.hiragana}
              </p>
              <p className="mt-1 text-sm text-foreground/70 sm:text-base">{decoded}</p>
            </div>
          )}
        </section>

        <footer className="mt-auto border-t border-foreground pt-4 font-mono-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]">
          <div className="flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap sm:gap-3">
            <span className="normal-case text-[9px] sm:text-[11px]">{t.createdBy}</span>
            <span className="text-muted-foreground/40">·</span>
            <a
              href="https://github.com/tomill/Text-Shinobi"
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground hover:opacity-60"
            >
              {t.source}
            </a>
            <span className="text-muted-foreground/40">·</span>
            <Link to="/bansenshukai-history" className="text-foreground hover:opacity-60">
              {t.history}
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <Link to="/ninja-symbols" className="text-foreground hover:opacity-60">
              {t.symbols}
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
