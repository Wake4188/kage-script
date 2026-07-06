import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { shinobiEncode } from "@/lib/shinobi";
import { translateToHiragana } from "@/lib/translate.functions";

export default defineTool({
  name: "encode_kage",
  title: "Encode to Shinobi Iroha",
  description:
    "Translate any text into Japanese hiragana and encode it into the 1676 忍びいろは (Shinobi Iroha) ninja cipher. Returns cipher text plus the intermediate hiragana.",
  inputSchema: {
    text: z.string().min(1).max(2000).describe("Text in any language to encode."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ text }) => {
    const trimmed = text.trim();
    const res = await translateToHiragana({ data: { text: trimmed } });
    const metadata: Record<string, string> = { original: trimmed };
    if (res.japanese) metadata.japanese = res.japanese;
    const cipher = shinobiEncode(res.hiragana, metadata);
    return {
      content: [{ type: "text", text: cipher }],
      structuredContent: { cipher, hiragana: res.hiragana, japanese: res.japanese ?? null },
    };
  },
});