import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toHiragana } from "wanakana";

const InputSchema = z.object({
  text: z.string().min(1).max(2000),
  targetLang: z.string().min(2).max(8).optional(),
});

type GTSentence = [string | null, string | null, string | null, ...unknown[]];
type GTResponse = [GTSentence[], ...unknown[]];

type InputToolsResponse = ["SUCCESS" | "FAILED", Array<[string, string[], ...unknown[]]>];

async function gt(text: string, sl: string, tl: string, dt: string[]): Promise<GTResponse> {
  const params = new URLSearchParams({ client: "gtx", sl, tl, q: text });
  for (const d of dt) params.append("dt", d);
  const url = `https://translate.googleapis.com/translate_a/single?${params.toString()}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Translate gateway error", res.status, body);
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
    .replace(/d([zj])/gi, "$1")
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

function repairDecodedKana(text: string): string {
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

export const translateToHiragana = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    // 1) Translate input → Japanese, and also request romaji of the result
    const json = await gt(data.text, "auto", "ja", ["t", "rm"]);
    const sentences = json[0] ?? [];
    let japanese = "";
    let romaji = "";
    for (const s of sentences) {
      if (typeof s?.[0] === "string") japanese += s[0];
      if (typeof s?.[2] === "string") romaji += s[2];
    }
    // If the romaji of the Japanese result wasn't returned (rare), ask again
    if (!romaji && japanese) {
      const j2 = await gt(japanese, "ja", "en", ["t", "rm"]);
      for (const s of j2[0] ?? []) {
        if (typeof s?.[2] === "string") romaji += s[2];
      }
    }
    const hiragana = romajiToHiragana(romaji).trim();
    return { hiragana };
  });

export const translateFromHiragana = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const target = (data.targetLang ?? "en").toLowerCase();
    // The cipher is intentionally lossy: は/わ, を/お, dakuten, and small kana
    // can collapse during encoding. First repair the common romaji particle
    // forms created by Google ("watashi wa", "hon o", etc.), then run Japanese
    // IME conversion to recover likely kanji before translating.
    const repaired = repairDecodedKana(data.text);
    let japanese = await kanaToJapanese(repaired).catch(() => repaired);

    if (japanese === repaired) {
      const compact = repaired.replace(/\s+/g, "");
      if (compact !== repaired) {
        japanese = await kanaToJapanese(compact).catch(() => japanese);
      }
    }

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