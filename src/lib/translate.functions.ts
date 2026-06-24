import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toHiragana } from "wanakana";

const InputSchema = z.object({
  text: z.string().min(1).max(2000),
  targetLang: z.string().min(2).max(8).optional(),
});

type GTSentence = [string | null, string | null, string | null, ...unknown[]];
type GTResponse = [GTSentence[], ...unknown[]];

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
    .replace(/[āĀ]/g, "aa")
    .replace(/[īĪ]/g, "ii")
    .replace(/[ūŪ]/g, "uu")
    .replace(/[ēĒ]/g, "ee")
    .replace(/[ōŌ]/g, "ou")
    .replace(/['’]/g, "");
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
    const hiragana = toHiragana(normalizeRomaji(romaji)).trim();
    return { hiragana };
  });

export const translateFromHiragana = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const target = (data.targetLang ?? "en").toLowerCase();
    // Step 1: ask Google to "normalize" the lossy hiragana back into natural
    // Japanese (kanji + dakuten). Using auto detection + ja target lets the
    // engine restore voicing marks and small kana from context.
    const norm = await gt(data.text, "auto", "ja", ["t"]);
    let japanese = "";
    for (const s of norm[0] ?? []) {
      if (typeof s?.[0] === "string") japanese += s[0];
    }
    japanese = japanese.trim() || data.text;

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