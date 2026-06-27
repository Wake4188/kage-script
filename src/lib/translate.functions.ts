import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toHiragana } from "wanakana";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import { callGeminiJson } from "./gemini";

let kuroshiroInstance: Kuroshiro | null = null;

async function getKuroshiro(): Promise<Kuroshiro | null> {
  if (kuroshiroInstance) return kuroshiroInstance;
  try {
    const instance = new Kuroshiro();
    await instance.init(KuromojiAnalyzer as unknown);
    kuroshiroInstance = instance;
    return instance;
  } catch {
    return null;
  }
}

const InputSchema = z.object({
  text: z.string().min(1).max(2000),
  targetLang: z.string().min(2).max(8).optional(),
});

type GTSentence = [string | null, string | null, string | null, ...unknown[]];
type GTResponse = [GTSentence[], ...unknown[]];

type InputToolsResponse = ["SUCCESS" | "FAILED", Array<[string, string[], ...unknown[]]>];

function getRomaji(s: GTSentence): string {
  if (typeof s?.[2] === "string") return s[2];
  if (typeof s?.[3] === "string") return s[3];
  return "";
}

async function gt(text: string, sl: string, tl: string, dt: string[]): Promise<GTResponse> {
  const params = new URLSearchParams({ client: "gtx", sl, tl, q: text });
  for (const d of dt) params.append("dt", d);
  const url = `https://translate.googleapis.com/translate_a/single?${params.toString()}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    console.error("Translate gateway error", res.status);
    throw new Error("Translation service unavailable");
  }
  return (await res.json()) as GTResponse;
}

function normalizeRomaji(s: string): string {
  return s
    .replace(/\u00a0/g, " ")
    .replace(/[“”„]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[‐‑‒–—―]/g, "-")
    .replace(/…/g, "...")
    .replace(/[āĀ]/g, "aa")
    .replace(/[īĪ]/g, "ii")
    .replace(/[ūŪ]/g, "uu")
    .replace(/[ēĒ]/g, "ee")
    .replace(/[ōŌ]/g, "ou")
    .replace(/[âÂ]/g, "aa")
    .replace(/[îÎ]/g, "ii")
    .replace(/[ûÛ]/g, "uu")
    .replace(/[êÊ]/g, "ee")
    .replace(/[ôÔ]/g, "ou")
    .replace(/dzu/gi, "zu")
    .replace(/'/g, "");
}

function romajiToHiragana(romaji: string): string {
  const normalized = normalizeRomaji(romaji);
  const whole = toHiragana(normalized);
  if (!/[A-Za-z]/.test(whole)) return whole;

  // wanakana intentionally returns the whole input untouched when one
  // unsupported punctuation mark is present. Long Google romanizations often
  // contain smart quotes, brackets, or other copied punctuation, so convert in
  // safe ASCII/macron chunks instead of letting one character break the result.
  return normalized.replace(/[A-Za-z0-9\s.,:;!?/()[\]{}"`~\-]+/g, (chunk) => toHiragana(chunk));
}

export async function japaneseToHiragana(japanese: string): Promise<string> {
  const kuroshiro = await getKuroshiro();
  if (!kuroshiro) return romajiToHiragana(japanese);
  try {
    return (await kuroshiro.convert(japanese, { to: "hiragana" })) as string;
  } catch {
    return romajiToHiragana(japanese);
  }
}

export async function translateTextToJapanese(text: string): Promise<{ japanese: string; romaji: string }> {
  const json = await gt(text, "auto", "ja", ["t", "rm"]);
  const sentences = json[0] ?? [];
  let japanese = "";
  let romaji = "";
  for (const s of sentences) {
    if (typeof s?.[0] === "string") japanese += s[0];
    romaji += getRomaji(s);
  }
  return { japanese, romaji };
}

export async function translateJapaneseToEnglish(text: string, targetLang = "en"): Promise<string> {
  const json = await gt(text, "ja", targetLang, ["t"]);
  let english = "";
  for (const s of json[0] ?? []) {
    if (typeof s?.[0] === "string") english += s[0];
  }
  return english.trim();
}

export function repairDecodedKana(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/(^|\s)わ(?=\s|$|[。、,.!?！？])/g, "$1は")
    .replace(/(^|\s)お(?=\s|$|[。、,.!?！？])/g, "$1を")
    .replace(/(^|\s)え(?=\s|$|[。、,.!?！？])/g, "$1へ")
    .trim();
}

async function kanaToJapanese(text: string): Promise<string> {
  const params = new URLSearchParams({
    text,
    itc: "ja-t-i0-und",
    num: "1",
    cp: "0",
    cs: "1",
    ie: "utf-8",
    oe: "utf-8",
  });

  const res = await fetch("https://inputtools.google.com/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0",
    },
    body: params,
  });

  if (!res.ok) throw new Error("Translation service unavailable");

  const json = (await res.json()) as InputToolsResponse;
  if (json[0] !== "SUCCESS") return text;

  return json[1]
    ?.map((entry) => entry?.[1]?.[0] ?? entry?.[0] ?? "")
    .join("")
    .trim() || text;
}

function splitForIme(text: string): string[] {
  const parts = text.match(/[^。！？!?\n]+[。！？!?\n]*/g) ?? [text];
  const chunks: string[] = [];

  for (const part of parts) {
    let rest = part;
    while (rest.length > 80) {
      let cut = Math.max(
        rest.lastIndexOf(" ", 80),
        rest.lastIndexOf("、", 80),
        rest.lastIndexOf(",", 80),
      );
      if (cut < 30) cut = 80;
      chunks.push(rest.slice(0, cut + 1));
      rest = rest.slice(cut + 1);
    }
    if (rest) chunks.push(rest);
  }

  return chunks.filter(Boolean).slice(0, 32);
}

export async function kanaToJapaneseBestEffort(text: string): Promise<string> {
  const chunks = splitForIme(text);
  if (chunks.length <= 1) return kanaToJapanese(text);

  const converted = await Promise.all(
    chunks.map((chunk) => kanaToJapanese(chunk).catch(() => chunk)),
  );
  return converted.join("").trim() || text;
}

function japaneseRecoveryScore(text: string): number {
  const kanji = text.match(/[一-龯々〆ヵヶ]/g)?.length ?? 0;
  const katakana = text.match(/[ァ-ヶー]/g)?.length ?? 0;
  const spaces = text.match(/\s/g)?.length ?? 0;
  return kanji * 4 + katakana * 2 - spaces;
}

async function translateWithGeminiToJapanese(text: string): Promise<{ japanese: string; hiragana: string } | null> {
  if (!text?.trim()) return null;

  const prompt = [
    "You are translating text into Japanese for a kana-based cipher.",
    "Return ONLY JSON with the keys japanese and hiragana.",
    "Requirements:",
    "- Preserve the intended meaning as closely as possible.",
    "- Use natural Japanese.",
    "- Provide the hiragana reading that matches the Japanese sentence exactly.",
    "- Do not include commentary or markdown.",
    `Input text: ${text}`,
  ].join("\n");

  return callGeminiJson<{ japanese: string; hiragana: string }>("encode", text, prompt);
}

async function recoverJapaneseWithGemini(hiragana: string, targetLang: string): Promise<{ japanese: string; translation: string } | null> {
  if (!hiragana?.trim()) return null;

  const targetLabel = {
    en: "English",
    fr: "French",
    es: "Spanish",
    de: "German",
    ja: "Japanese",
  }[targetLang] ?? "English";

  const prompt = [
    "The following input is the phonetic reading of a Japanese sentence, possibly imperfect.",
    "Recover the most likely natural Japanese sentence and translate it to the target language.",
    "Return ONLY JSON with the keys japanese and translation.",
    "Requirements:",
    "- Preserve the intended meaning as closely as possible.",
    "- Keep the Japanese sentence natural and readable.",
    "- Do not include commentary or markdown.",
    `Target language: ${targetLabel}`,
    `Input: ${hiragana}`,
  ].join("\n");

  return callGeminiJson<{ japanese: string; translation: string }>("decode", hiragana, prompt, targetLang);
}

export const translateToHiragana = createServerFn({ method: "POST" })
  .validator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    // Prefer a higher-fidelity Japanese reading path when Gemini is configured.
    const gemini = await translateWithGeminiToJapanese(data.text);
    if (gemini?.hiragana) {
      return { hiragana: gemini.hiragana.trim(), japanese: gemini.japanese.trim() };
    }

    // Fallback: translate input → Japanese, then derive hiragana from romaji.
    const { japanese, romaji } = await translateTextToJapanese(data.text);
    const hiragana = (await japaneseToHiragana(japanese || romaji)).trim();
    return { hiragana, japanese: (japanese || romaji).trim() };
  });

export const translateFromHiragana = createServerFn({ method: "POST" })
  .validator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const target = (data.targetLang ?? "en").toLowerCase();

    // Prefer a higher-fidelity recovery path when Gemini is configured.
    const gemini = await recoverJapaneseWithGemini(data.text, target);
    if (gemini?.translation) {
      return { english: gemini.translation.trim() };
    }

    // The cipher is intentionally lossy: は/わ, を/お, dakuten, and small kana
    // can collapse during encoding. First repair the common romaji particle
    // forms created by Google ("watashi wa", "hon o", etc.), then run Japanese
    // IME conversion to recover likely kanji before translating.
    const repaired = repairDecodedKana(data.text);
    const compact = repaired.replace(/\s+/g, "");
    const candidates = compact !== repaired ? [repaired, compact] : [repaired];
    const recovered = await Promise.all(
      candidates.map((candidate) => kanaToJapaneseBestEffort(candidate).catch(() => candidate)),
    );
    const japanese = recovered.sort((a, b) => japaneseRecoveryScore(b) - japaneseRecoveryScore(a))[0] ?? repaired;

    // Step 2: translate normalized Japanese into the user's language.
    const json = await gt(japanese, "ja", target, ["t"]);
    let english = "";
    for (const s of json[0] ?? []) {
      if (typeof s?.[0] === "string") english += s[0];
    }
    english = english.trim();

    // Fallback: if normalization made it worse and we got nothing, retry direct.
    if (!english) {
      const direct = await gt(data.text, "auto", target, ["t"]);
      for (const s of direct[0] ?? []) {
        if (typeof s?.[0] === "string") english += s[0];
      }
      english = english.trim();
    }

    return { english };
  });