import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { shinobiDecodeWithMetadata } from "@/lib/shinobi";
import { translateFromHiragana } from "@/lib/translate.functions";

export default defineTool({
  name: "decode_kage",
  title: "Decode from Shinobi Iroha",
  description:
    "Decode 忍びいろは (Shinobi Iroha) ninja cipher text back into hiragana and translate the result into the requested language.",
  inputSchema: {
    cipher: z.string().min(1).max(4000).describe("Shinobi Iroha cipher text to decode."),
    targetLang: z
      .string()
      .default("en")
      .describe("ISO language code for the final translation (default en)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ cipher, targetLang }) => {
    const { decodedText, metadata } = shinobiDecodeWithMetadata(cipher);
    const source = metadata?.japanese ?? decodedText;
    const res = await translateFromHiragana({
      data: { text: source, targetLang, original: metadata?.original },
    });
    return {
      content: [{ type: "text", text: res.english }],
      structuredContent: { translation: res.english, hiragana: decodedText },
    };
  },
});