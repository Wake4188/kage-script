import { describe, expect, it } from "vitest";
import {
  addTranslationFavoriteEntry,
  addTranslationHistoryEntry,
  buildShareableTranslationUrl,
} from "../src/lib/translation-utils";

describe("translation utilities", () => {
  it("adds new history entries and caps the saved list", () => {
    const history = addTranslationHistoryEntry([], {
      mode: "encode",
      input: "hello",
      output: "cipher",
    });

    expect(history).toHaveLength(1);
    expect(history[0]).toMatchObject({ mode: "encode", input: "hello", output: "cipher" });

    const capped = Array.from({ length: 8 }, (_, index) => ({
      id: `${index}`,
      mode: "encode" as const,
      input: `item-${index}`,
      output: `out-${index}`,
      timestamp: Date.now(),
    }));

    const next = addTranslationHistoryEntry(capped, {
      mode: "decode",
      input: "latest",
      output: "translation",
    }, 5);

    expect(next).toHaveLength(5);
    expect(next[0].input).toBe("latest");
  });

  it("builds a shareable translation URL with encoded input", () => {
    const url = buildShareableTranslationUrl("/", "decode", "秘密のメッセージ");
    expect(url).toContain("mode=decode");
    expect(url).toContain("input=%E7%A7%98%E5%AF%86%E3%81%AE%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8");
  });

  it("adds favorite entries without duplicates", () => {
    const favorites = addTranslationFavoriteEntry([], {
      mode: "encode",
      input: "favorite",
      output: "cipher",
    });

    const duplicate = addTranslationFavoriteEntry(favorites, {
      mode: "encode",
      input: "favorite",
      output: "cipher",
    });

    expect(duplicate).toHaveLength(1);
  });
});
