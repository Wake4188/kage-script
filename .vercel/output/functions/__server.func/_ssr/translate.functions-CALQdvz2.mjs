import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as toHiragana } from "../_libs/wanakana.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translate.functions-CALQdvz2.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var GEMINI_CACHE_TTL_MS = 600 * 1e3;
var geminiCache = /* @__PURE__ */ new Map();
function buildApiBaseUrl(value = process.env.APP_URL || process.env.VERCEL_URL || "http://127.0.0.1:3000") {
	const trimmed = value?.trim();
	if (!trimmed) return "http://127.0.0.1:3000";
	if (/^https?:\/\//i.test(trimmed)) return trimmed.replace(/\/+$/, "");
	return `https://${trimmed.replace(/\/+$/, "")}`;
}
function buildGeminiCacheKey(kind, input, targetLang) {
	return `${kind}:${targetLang ?? "en"}:${input.trim()}`;
}
function parseGeminiJson(raw) {
	const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
	try {
		return JSON.parse(cleaned);
	} catch {
		return null;
	}
}
async function callGeminiJson(kind, input, prompt, targetLang) {
	const cacheKey = buildGeminiCacheKey(kind, input, targetLang);
	const cached = geminiCache.get(cacheKey);
	if (cached && cached.expiresAt > Date.now()) return parseGeminiJson(cached.value ?? "") ?? null;
	const baseUrl = buildApiBaseUrl();
	const url = new URL("/api/translate", baseUrl).toString();
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				kind,
				input,
				prompt,
				targetLang
			})
		});
		if (!response.ok) return null;
		const payload = await response.json();
		if (payload.result !== null) geminiCache.set(cacheKey, {
			expiresAt: Date.now() + GEMINI_CACHE_TTL_MS,
			value: JSON.stringify(payload.result)
		});
		return payload.result;
	} catch (error) {
		console.warn("Gemini proxy request error", error);
		return null;
	}
}
var kuroshiroInstance = null;
async function getKuroshiro() {
	if (kuroshiroInstance) return kuroshiroInstance;
	if (typeof window !== "undefined") return null;
	try {
		const [{ default: Kuroshiro }, { default: KuromojiAnalyzer }] = await Promise.all([import("../_libs/kuroshiro.mjs").then((n) => n.t), import("../_libs/kuroshiro-analyzer-kuromoji.mjs").then((n) => n.t)]);
		const instance = new Kuroshiro();
		await instance.init(KuromojiAnalyzer);
		kuroshiroInstance = instance;
		return instance;
	} catch {
		return null;
	}
}
var InputSchema = objectType({
	text: stringType().min(1).max(2e3),
	targetLang: stringType().min(2).max(8).optional()
});
function getRomaji(s) {
	if (typeof s?.[2] === "string") return s[2];
	if (typeof s?.[3] === "string") return s[3];
	return "";
}
async function gt(text, sl, tl, dt) {
	const params = new URLSearchParams({
		client: "gtx",
		sl,
		tl,
		q: text
	});
	for (const d of dt) params.append("dt", d);
	const url = `https://translate.googleapis.com/translate_a/single?${params.toString()}`;
	const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
	if (!res.ok) {
		console.error("Translate gateway error", res.status);
		throw new Error("Translation service unavailable");
	}
	return await res.json();
}
function normalizeRomaji(s) {
	return s.replace(/\u00a0/g, " ").replace(/[“”„]/g, "\"").replace(/[‘’]/g, "'").replace(/[‐‑‒–—―]/g, "-").replace(/…/g, "...").replace(/[āĀ]/g, "aa").replace(/[īĪ]/g, "ii").replace(/[ūŪ]/g, "uu").replace(/[ēĒ]/g, "ee").replace(/[ōŌ]/g, "ou").replace(/[âÂ]/g, "aa").replace(/[îÎ]/g, "ii").replace(/[ûÛ]/g, "uu").replace(/[êÊ]/g, "ee").replace(/[ôÔ]/g, "ou").replace(/dzu/gi, "zu").replace(/'/g, "");
}
function romajiToHiragana(romaji) {
	const normalized = normalizeRomaji(romaji);
	const whole = toHiragana(normalized);
	if (!/[A-Za-z]/.test(whole)) return whole;
	return normalized.replace(/[A-Za-z0-9\s.,:;!?/()[\]{}"`~\-]+/g, (chunk) => toHiragana(chunk));
}
async function japaneseToHiragana(japanese) {
	const kuroshiro = await getKuroshiro();
	if (!kuroshiro) return romajiToHiragana(japanese);
	try {
		return await kuroshiro.convert(japanese, { to: "hiragana" });
	} catch {
		return romajiToHiragana(japanese);
	}
}
async function translateTextToJapanese(text) {
	const sentences = (await gt(text, "auto", "ja", ["t", "rm"]))[0] ?? [];
	let japanese = "";
	let romaji = "";
	for (const s of sentences) {
		if (typeof s?.[0] === "string") japanese += s[0];
		romaji += getRomaji(s);
	}
	return {
		japanese,
		romaji
	};
}
function repairDecodedKana(text) {
	return text.replace(/\s+/g, " ").replace(/(^|\s)わ(?=\s|$|[。、,.!?！？])/g, "$1は").replace(/(^|\s)お(?=\s|$|[。、,.!?！？])/g, "$1を").replace(/(^|\s)え(?=\s|$|[。、,.!?！？])/g, "$1へ").trim();
}
async function kanaToJapanese(text) {
	const params = new URLSearchParams({
		text,
		itc: "ja-t-i0-und",
		num: "1",
		cp: "0",
		cs: "1",
		ie: "utf-8",
		oe: "utf-8"
	});
	const res = await fetch("https://inputtools.google.com/request", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": "Mozilla/5.0"
		},
		body: params
	});
	if (!res.ok) throw new Error("Translation service unavailable");
	const json = await res.json();
	if (json[0] !== "SUCCESS") return text;
	return json[1]?.map((entry) => entry?.[1]?.[0] ?? entry?.[0] ?? "").join("").trim() || text;
}
function splitForIme(text) {
	const parts = text.match(/[^。！？!?\n]+[。！？!?\n]*/g) ?? [text];
	const chunks = [];
	for (const part of parts) {
		let rest = part;
		while (rest.length > 80) {
			let cut = Math.max(rest.lastIndexOf(" ", 80), rest.lastIndexOf("、", 80), rest.lastIndexOf(",", 80));
			if (cut < 30) cut = 80;
			chunks.push(rest.slice(0, cut + 1));
			rest = rest.slice(cut + 1);
		}
		if (rest) chunks.push(rest);
	}
	return chunks.filter(Boolean).slice(0, 32);
}
async function kanaToJapaneseBestEffort(text) {
	const chunks = splitForIme(text);
	if (chunks.length <= 1) return kanaToJapanese(text);
	return (await Promise.all(chunks.map((chunk) => kanaToJapanese(chunk).catch(() => chunk)))).join("").trim() || text;
}
function japaneseRecoveryScore(text) {
	const kanji = text.match(/[一-龯々〆ヵヶ]/g)?.length ?? 0;
	const katakana = text.match(/[ァ-ヶー]/g)?.length ?? 0;
	const spaces = text.match(/\s/g)?.length ?? 0;
	return kanji * 4 + katakana * 2 - spaces;
}
async function translateWithGeminiToJapanese(text) {
	if (!text?.trim()) return null;
	return callGeminiJson("encode", text, [
		"You are translating text into Japanese for a kana-based cipher.",
		"Return ONLY JSON with the keys japanese and hiragana.",
		"Requirements:",
		"- Preserve the intended meaning as closely as possible.",
		"- Use natural Japanese.",
		"- Provide the hiragana reading that matches the Japanese sentence exactly.",
		"- Do not include commentary or markdown.",
		`Input text: ${text}`
	].join("\n"));
}
async function recoverJapaneseWithGemini(hiragana, targetLang) {
	if (!hiragana?.trim()) return null;
	return callGeminiJson("decode", hiragana, [
		"The following input is the phonetic reading of a Japanese sentence, possibly imperfect.",
		"Recover the most likely natural Japanese sentence and translate it to the target language.",
		"Return ONLY JSON with the keys japanese and translation.",
		"Requirements:",
		"- Preserve the intended meaning as closely as possible.",
		"- Keep the Japanese sentence natural and readable.",
		"- Do not include commentary or markdown.",
		`Target language: ${{
			en: "English",
			fr: "French",
			es: "Spanish",
			de: "German",
			ja: "Japanese"
		}[targetLang] ?? "English"}`,
		`Input: ${hiragana}`
	].join("\n"), targetLang);
}
var translateToHiragana_createServerFn_handler = createServerRpc({
	id: "15800936c196ae116e4337c805eacb2391492c42dfb93ec61d30fe429beb7c78",
	name: "translateToHiragana",
	filename: "src/lib/translate.functions.ts"
}, (opts) => translateToHiragana.__executeServer(opts));
var translateToHiragana = createServerFn({ method: "POST" }).validator((data) => InputSchema.parse(data)).handler(translateToHiragana_createServerFn_handler, async ({ data }) => {
	const gemini = await translateWithGeminiToJapanese(data.text);
	if (gemini?.hiragana) return {
		hiragana: gemini.hiragana.trim(),
		japanese: gemini.japanese.trim()
	};
	const { japanese, romaji } = await translateTextToJapanese(data.text);
	return {
		hiragana: (await japaneseToHiragana(japanese || romaji)).trim(),
		japanese: (japanese || romaji).trim()
	};
});
var translateFromHiragana_createServerFn_handler = createServerRpc({
	id: "c31230cc85529b826003c06f9c956713d062fae19193f0be4297d370bc527d91",
	name: "translateFromHiragana",
	filename: "src/lib/translate.functions.ts"
}, (opts) => translateFromHiragana.__executeServer(opts));
var translateFromHiragana = createServerFn({ method: "POST" }).validator((data) => InputSchema.parse(data)).handler(translateFromHiragana_createServerFn_handler, async ({ data }) => {
	const target = (data.targetLang ?? "en").toLowerCase();
	const gemini = await recoverJapaneseWithGemini(data.text, target);
	if (gemini?.translation) return { english: gemini.translation.trim() };
	const repaired = repairDecodedKana(data.text);
	const compact = repaired.replace(/\s+/g, "");
	const candidates = compact !== repaired ? [repaired, compact] : [repaired];
	const json = await gt((await Promise.all(candidates.map((candidate) => kanaToJapaneseBestEffort(candidate).catch(() => candidate)))).sort((a, b) => japaneseRecoveryScore(b) - japaneseRecoveryScore(a))[0] ?? repaired, "ja", target, ["t"]);
	let english = "";
	for (const s of json[0] ?? []) if (typeof s?.[0] === "string") english += s[0];
	english = english.trim();
	if (!english) {
		const direct = await gt(data.text, "auto", target, ["t"]);
		for (const s of direct[0] ?? []) if (typeof s?.[0] === "string") english += s[0];
		english = english.trim();
	}
	return { english };
});
//#endregion
export { translateFromHiragana_createServerFn_handler, translateToHiragana_createServerFn_handler };
