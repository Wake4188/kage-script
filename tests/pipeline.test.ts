import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { shinobiDecode, shinobiDecodeWithMetadata, shinobiEncode } from '../src/lib/shinobi';
import { repairDecodedKana } from '../src/lib/translate.functions';
import { callGeminiJson } from '../src/lib/gemini';

const corpus = JSON.parse(readFileSync(join(process.cwd(), 'tests/fixtures/benchmark-corpus.json'), 'utf8')) as string[];

function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

describe('encode/decode pipeline', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('round-trips simple text through the visible cipher without changing the mapping', () => {
    const text = 'hello world';
    const encoded = shinobiEncode(text);
    const decoded = shinobiDecode(encoded);

    expect(encoded).toContain(text);
    expect(decoded).toBe(text);
  });

  it('preserves hidden metadata when present and decodes it safely', () => {
    const payload = { japanese: 'こんにちは世界' };
    const encoded = shinobiEncode('hello world', payload);
    const decoded = shinobiDecodeWithMetadata(encoded);

    expect(decoded.decodedText).toBe('hello world');
    expect(decoded.metadata).toEqual(payload);
  });

  it('repairs common kana particle ambiguities in decoded text', () => {
    expect(repairDecodedKana('わ')).toBe('は');
    expect(repairDecodedKana('お')).toBe('を');
    expect(repairDecodedKana('え')).toBe('へ');
  });

  it('handles the benchmark corpus without throwing', () => {
    for (const sentence of corpus) {
      const encoded = shinobiEncode(sentence);
      const decoded = shinobiDecode(encoded);
      expect(normalize(decoded)).toBe(normalize(sentence));
    }
  });

  it('keeps the benchmark corpus stable when metadata is attached', () => {
    for (const sentence of corpus) {
      const encoded = shinobiEncode(sentence, { japanese: sentence });
      const { decodedText, metadata } = shinobiDecodeWithMetadata(encoded);
      expect(normalize(decodedText)).toBe(normalize(sentence));
      expect(metadata?.japanese).toBe(sentence);
    }
  });

  it('caches identical Gemini requests so repeated calls do not hit the network again', async () => {
    process.env.GEMINI_API_KEY = 'test-key';
    const fetchMock = vi.fn().mockResolvedValueOnce(
      new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '{"japanese":"こんにちは"}' }] } }] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    vi.stubGlobal('fetch', fetchMock);

    const first = await callGeminiJson('encode', 'hello', 'prompt');
    const second = await callGeminiJson('encode', 'hello', 'prompt');

    expect(first).toEqual({ japanese: 'こんにちは' });
    expect(second).toEqual({ japanese: 'こんにちは' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
