import { defineMcp } from "@lovable.dev/mcp-js";
import encodeTool from "./tools/encode";
import decodeTool from "./tools/decode";

export default defineMcp({
  name: "kage-mcp",
  title: "Kage / 影 — Shinobi Iroha",
  version: "0.1.0",
  instructions:
    "Tools for the Kage ninja-cipher translator. Use `encode_kage` to turn any text into the 1676 忍びいろは cipher, and `decode_kage` to reverse it back into readable language.",
  tools: [encodeTool, decodeTool],
});