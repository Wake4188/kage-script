import { describe, expect, it, vi } from "vitest";

describe("translate functions", () => {
  it("does not import the kuromoji analyzer during module initialization", async () => {
    vi.resetModules();
    vi.doMock("kuroshiro-analyzer-kuromoji", () => {
      throw new Error("kuromoji analyzer should not be imported on the client");
    });

    await expect(import("../src/lib/translate.functions")).resolves.toBeDefined();
  });
});
