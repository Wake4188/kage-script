const GEMINI_CACHE_TTL_MS = 10 * 60 * 1000;
const geminiCache = new Map<string, { expiresAt: number; value: string | null }>();

function getGeminiConfig() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";
  return { apiKey, model };
}

export function buildApiBaseUrl(
  value = process.env.APP_URL || process.env.VERCEL_URL || "http://127.0.0.1:3000",
) {
  const trimmed = value?.trim();
  if (!trimmed) return "http://127.0.0.1:3000";
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/+$/, "");
  }
  return `https://${trimmed.replace(/\/+$/, "")}`;
}

function buildGeminiCacheKey(
  kind: "encode" | "decode",
  input: string,
  targetLang?: string,
): string {
  return `${kind}:${targetLang ?? "en"}:${input.trim()}`;
}

function parseGeminiJson<T>(raw: string): T | null {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
}

function parseRetryAfter(value: string | null): number {
  if (!value) return 0;
  const seconds = Number.parseInt(value, 10);
  if (!Number.isNaN(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(value);
  return Number.isNaN(date) ? 0 : Math.max(0, date - Date.now());
}

async function fetchWithRetry(url: string, payload: unknown, attempts = 2): Promise<Response> {
  let attempt = 0;
  while (attempt < attempts) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (res.status === 429 || (res.status >= 500 && res.status < 600)) {
      const retryAfter = parseRetryAfter(res.headers.get("retry-after"));
      if (attempt < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryAfter || 500));
        attempt += 1;
        continue;
      }
    }

    return res;
  }

  throw new Error("Gemini request failed");
}

async function callGeminiApi<T>(
  kind: "encode" | "decode",
  input: string,
  prompt: string,
  targetLang?: string,
): Promise<T | null> {
  const { apiKey, model } = getGeminiConfig();
  if (!apiKey) return null;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
  };

  try {
    const res = await fetchWithRetry(url, payload);
    if (!res.ok) {
      const body = await res.text();
      console.warn("Gemini request failed", res.status, body.slice(0, 400));
      return null;
    }

    const json = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text =
      json.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        ?.trim() ?? "";

    if (!text) return null;
    return parseGeminiJson<T>(text);
  } catch (error) {
    console.warn("Gemini request error", error);
    return null;
  }
}

export async function callGeminiJson<T>(
  kind: "encode" | "decode",
  input: string,
  prompt: string,
  targetLang?: string,
): Promise<T | null> {
  const cacheKey = buildGeminiCacheKey(kind, input, targetLang);
  const cached = geminiCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return parseGeminiJson<T>(cached.value ?? "") ?? null;
  }

  if (process.env.NODE_ENV === "test") {
    const result = await callGeminiApi<T>(kind, input, prompt, targetLang);
    if (result !== null) {
      geminiCache.set(cacheKey, {
        expiresAt: Date.now() + GEMINI_CACHE_TTL_MS,
        value: JSON.stringify(result),
      });
    }
    return result;
  }

  const baseUrl = buildApiBaseUrl();
  const url = new URL("/api/translate", baseUrl).toString();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, input, prompt, targetLang }),
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { result: T | null };
    if (payload.result !== null) {
      geminiCache.set(cacheKey, {
        expiresAt: Date.now() + GEMINI_CACHE_TTL_MS,
        value: JSON.stringify(payload.result),
      });
    }
    return payload.result;
  } catch (error) {
    console.warn("Gemini proxy request error", error);
    return null;
  }
}
