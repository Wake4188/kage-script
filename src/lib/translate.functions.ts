import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  text: z.string().min(1).max(2000),
});

export const translateToHiragana = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You translate any input into Japanese, then convert the Japanese into pure hiragana (no kanji, no katakana, no romaji, no punctuation other than basic spaces). Output ONLY the hiragana translation, nothing else — no quotes, no explanation, no labels. If the input is already Japanese, just convert it to hiragana.",
          },
          { role: "user", content: data.text },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`AI gateway error ${res.status}: ${body}`);
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const hiragana = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { hiragana };
  });