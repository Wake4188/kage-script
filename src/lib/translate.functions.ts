import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toHiragana } from "wanakana";

const InputSchema = z.object({
  text: z.string().min(1).max(2000),
});

type GTSentence = [string | null, string | null, string | null, ...unknown[]];
type GTResponse = [GTSentence[], ...unknown[]];

async function gt(text: string, sl: string, tl: string, dt: string[]): Promise<GTResponse> {
  const params = new URLSearchParams({ client: "gtx", sl, tl, q: text });
  for (const d of dt) params.append("dt", d);
  const url = `https://translate.googleapis.com/translate_a/single?${params.toString()}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Translate error ${res.status}`);
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
    const json = await gt(data.text, "ja", "en", ["t"]);
    let english = "";
    for (const s of json[0] ?? []) {
      if (typeof s?.[0] === "string") english += s[0];
    }
    english = english.trim();
    return { english };
  });