import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "fr" | "es" | "de" | "ja";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "ja", label: "日本語", short: "日" },
];

type Dict = {
  heroLine1: string;
  heroLine2: string;
  subtitle: string;
  encode: string;
  decode: string;
  textLabel: string;
  cipherLabel: string;
  translationLabel: string;
  inputPlaceholderEncode: string;
  inputPlaceholderDecode: string;
  encoding: string;
  decoding: string;
  copy: string;
  copied: string;
  failed: string;
  hiragana: string;
  createdBy: string;
  source: string;
  history: string;
  symbols: string;
  kuji: string;
  learn: string;
  themeLight: string;
  themeDark: string;
  langSwitch: string;
  modeAria: string;
};

const en: Dict = {
  heroLine1: "Ninja",
  heroLine2: "cipher.",
  subtitle: "Any language → 忍びいろは, the secret kanji cipher compiled in 萬川集海.",
  encode: "Encode",
  decode: "Decode",
  textLabel: "Text",
  cipherLabel: "Cipher",
  translationLabel: "Translation",
  inputPlaceholderEncode: "Type anything…",
  inputPlaceholderDecode: "Paste ninja cipher…",
  encoding: "Encoding…",
  decoding: "Decoding…",
  copy: "Copy",
  copied: "Copied ✓",
  failed: "Failed. Try again.",
  hiragana: "Hiragana",
  createdBy: "By Noa Wilhide, France",
  source: "Source ↗",
  history: "History →",
  symbols: "Symbols →",
  kuji: "Kuji-in →",
  themeLight: "Switch to light mode",
  themeDark: "Switch to dark mode",
  langSwitch: "Change language",
  modeAria: "Mode",
};

const fr: Dict = {
  heroLine1: "Chiffre",
  heroLine2: "ninja.",
  subtitle: "Toute langue → 忍びいろは, le chiffre kanji secret compilé dans 萬川集海.",
  encode: "Chiffrer",
  decode: "Déchiffrer",
  textLabel: "Texte",
  cipherLabel: "Chiffre",
  translationLabel: "Traduction",
  inputPlaceholderEncode: "Écrivez n'importe quoi…",
  inputPlaceholderDecode: "Collez le chiffre ninja…",
  encoding: "Chiffrement…",
  decoding: "Déchiffrement…",
  copy: "Copier",
  copied: "Copié ✓",
  failed: "Échec. Réessayez.",
  hiragana: "Hiragana",
  createdBy: "Par Noa Wilhide, France",
  source: "Source ↗",
  history: "Histoire →",
  symbols: "Symboles →",
  kuji: "Kuji-in →",
  themeLight: "Passer en mode clair",
  themeDark: "Passer en mode sombre",
  langSwitch: "Changer de langue",
  modeAria: "Mode",
};

const es: Dict = {
  heroLine1: "Cifrado",
  heroLine2: "ninja.",
  subtitle: "Cualquier idioma → 忍びいろは, el cifrado kanji secreto recopilado en 萬川集海.",
  encode: "Cifrar",
  decode: "Descifrar",
  textLabel: "Texto",
  cipherLabel: "Cifrado",
  translationLabel: "Traducción",
  inputPlaceholderEncode: "Escribe cualquier cosa…",
  inputPlaceholderDecode: "Pega el cifrado ninja…",
  encoding: "Cifrando…",
  decoding: "Descifrando…",
  copy: "Copiar",
  copied: "Copiado ✓",
  failed: "Falló. Intenta de nuevo.",
  hiragana: "Hiragana",
  createdBy: "Por Noa Wilhide, Francia",
  source: "Fuente ↗",
  history: "Historia →",
  symbols: "Símbolos →",
  kuji: "Kuji-in →",
  themeLight: "Cambiar a modo claro",
  themeDark: "Cambiar a modo oscuro",
  langSwitch: "Cambiar idioma",
  modeAria: "Modo",
};

const de: Dict = {
  heroLine1: "Ninja-",
  heroLine2: "Chiffre.",
  subtitle: "Jede Sprache → 忍びいろは, die geheime Kanji-Chiffre aus 萬川集海.",
  encode: "Codieren",
  decode: "Decodieren",
  textLabel: "Text",
  cipherLabel: "Chiffre",
  translationLabel: "Übersetzung",
  inputPlaceholderEncode: "Schreibe etwas…",
  inputPlaceholderDecode: "Ninja-Chiffre einfügen…",
  encoding: "Codiere…",
  decoding: "Decodiere…",
  copy: "Kopieren",
  copied: "Kopiert ✓",
  failed: "Fehlgeschlagen. Erneut versuchen.",
  hiragana: "Hiragana",
  createdBy: "Von Noa Wilhide, Frankreich",
  source: "Quelle ↗",
  history: "Geschichte →",
  symbols: "Symbole →",
  kuji: "Kuji-in →",
  themeLight: "Hellmodus aktivieren",
  themeDark: "Dunkelmodus aktivieren",
  langSwitch: "Sprache ändern",
  modeAria: "Modus",
};

const ja: Dict = {
  heroLine1: "忍びの",
  heroLine2: "暗号。",
  subtitle: "あらゆる言語を 忍びいろは へ。萬川集海 に記された秘密の漢字暗号。",
  encode: "暗号化",
  decode: "復号",
  textLabel: "テキスト",
  cipherLabel: "暗号",
  translationLabel: "翻訳",
  inputPlaceholderEncode: "自由に入力…",
  inputPlaceholderDecode: "忍びの暗号を貼り付け…",
  encoding: "暗号化中…",
  decoding: "復号中…",
  copy: "コピー",
  copied: "コピー済 ✓",
  failed: "失敗。もう一度。",
  hiragana: "ひらがな",
  createdBy: "制作: Noa Wilhide (フランス)",
  source: "ソース ↗",
  history: "歴史 →",
  symbols: "記号 →",
  kuji: "九字護身法 →",
  themeLight: "ライトモードに切替",
  themeDark: "ダークモードに切替",
  langSwitch: "言語を変更",
  modeAria: "モード",
};

const DICTS: Record<Lang, Dict> = { en, fr, es, de, ja };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: en });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang") as Lang | null;
      if (stored && DICTS[stored]) {
        setLangState(stored);
        return;
      }
      const nav = (navigator.language || "en").slice(0, 2).toLowerCase() as Lang;
      if (DICTS[nav]) setLangState(nav);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  return <I18nCtx.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);