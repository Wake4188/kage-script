import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/i18n-CUqn5wZ1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LANGS = [
	{
		code: "en",
		label: "English",
		short: "EN"
	},
	{
		code: "fr",
		label: "Français",
		short: "FR"
	},
	{
		code: "es",
		label: "Español",
		short: "ES"
	},
	{
		code: "de",
		label: "Deutsch",
		short: "DE"
	},
	{
		code: "ja",
		label: "日本語",
		short: "日"
	}
];
var en = {
	heroLine1: "Ninja",
	heroLine2: "cipher.",
	subtitle: "Any language → 忍びいろは, the secret kanji cipher compiled in 萬川集海.",
	encode: "Encode",
	decode: "Decode",
	textLabel: "Text",
	cipherLabel: "Cipher",
	translationLabel: "Translation",
	inputPlaceholderEncode: "Type anything…",
	inputPlaceholderDecode: "Paste ninja cipher…",
	encoding: "Encoding…",
	decoding: "Decoding…",
	copy: "Copy",
	copied: "Copied ✓",
	failed: "Failed. Try again.",
	hiragana: "Hiragana",
	createdBy: "By Noa Wilhide, France",
	source: "Source ↗",
	history: "History →",
	symbols: "Symbols →",
	themeLight: "Switch to light mode",
	themeDark: "Switch to dark mode",
	langSwitch: "Change language",
	modeAria: "Mode"
};
var DICTS = {
	en,
	fr: {
		heroLine1: "Chiffre",
		heroLine2: "ninja.",
		subtitle: "Toute langue → 忍びいろは, le chiffre kanji secret compilé dans 萬川集海.",
		encode: "Chiffrer",
		decode: "Déchiffrer",
		textLabel: "Texte",
		cipherLabel: "Chiffre",
		translationLabel: "Traduction",
		inputPlaceholderEncode: "Écrivez n'importe quoi…",
		inputPlaceholderDecode: "Collez le chiffre ninja…",
		encoding: "Chiffrement…",
		decoding: "Déchiffrement…",
		copy: "Copier",
		copied: "Copié ✓",
		failed: "Échec. Réessayez.",
		hiragana: "Hiragana",
		createdBy: "Par Noa Wilhide, France",
		source: "Source ↗",
		history: "Histoire →",
		symbols: "Symboles →",
		themeLight: "Passer en mode clair",
		themeDark: "Passer en mode sombre",
		langSwitch: "Changer de langue",
		modeAria: "Mode"
	},
	es: {
		heroLine1: "Cifrado",
		heroLine2: "ninja.",
		subtitle: "Cualquier idioma → 忍びいろは, el cifrado kanji secreto recopilado en 萬川集海.",
		encode: "Cifrar",
		decode: "Descifrar",
		textLabel: "Texto",
		cipherLabel: "Cifrado",
		translationLabel: "Traducción",
		inputPlaceholderEncode: "Escribe cualquier cosa…",
		inputPlaceholderDecode: "Pega el cifrado ninja…",
		encoding: "Cifrando…",
		decoding: "Descifrando…",
		copy: "Copiar",
		copied: "Copiado ✓",
		failed: "Falló. Intenta de nuevo.",
		hiragana: "Hiragana",
		createdBy: "Por Noa Wilhide, Francia",
		source: "Fuente ↗",
		history: "Historia →",
		symbols: "Símbolos →",
		themeLight: "Cambiar a modo claro",
		themeDark: "Cambiar a modo oscuro",
		langSwitch: "Cambiar idioma",
		modeAria: "Modo"
	},
	de: {
		heroLine1: "Ninja-",
		heroLine2: "Chiffre.",
		subtitle: "Jede Sprache → 忍びいろは, die geheime Kanji-Chiffre aus 萬川集海.",
		encode: "Codieren",
		decode: "Decodieren",
		textLabel: "Text",
		cipherLabel: "Chiffre",
		translationLabel: "Übersetzung",
		inputPlaceholderEncode: "Schreibe etwas…",
		inputPlaceholderDecode: "Ninja-Chiffre einfügen…",
		encoding: "Codiere…",
		decoding: "Decodiere…",
		copy: "Kopieren",
		copied: "Kopiert ✓",
		failed: "Fehlgeschlagen. Erneut versuchen.",
		hiragana: "Hiragana",
		createdBy: "Von Noa Wilhide, Frankreich",
		source: "Quelle ↗",
		history: "Geschichte →",
		symbols: "Symbole →",
		themeLight: "Hellmodus aktivieren",
		themeDark: "Dunkelmodus aktivieren",
		langSwitch: "Sprache ändern",
		modeAria: "Modus"
	},
	ja: {
		heroLine1: "忍びの",
		heroLine2: "暗号。",
		subtitle: "あらゆる言語を 忍びいろは へ。萬川集海 に記された秘密の漢字暗号。",
		encode: "暗号化",
		decode: "復号",
		textLabel: "テキスト",
		cipherLabel: "暗号",
		translationLabel: "翻訳",
		inputPlaceholderEncode: "自由に入力…",
		inputPlaceholderDecode: "忍びの暗号を貼り付け…",
		encoding: "暗号化中…",
		decoding: "復号中…",
		copy: "コピー",
		copied: "コピー済 ✓",
		failed: "失敗。もう一度。",
		hiragana: "ひらがな",
		createdBy: "制作: Noa Wilhide (フランス)",
		source: "ソース ↗",
		history: "歴史 →",
		symbols: "記号 →",
		themeLight: "ライトモードに切替",
		themeDark: "ダークモードに切替",
		langSwitch: "言語を変更",
		modeAria: "モード"
	}
};
var I18nCtx = (0, import_react.createContext)({
	lang: "en",
	setLang: () => {},
	t: en
});
function I18nProvider({ children }) {
	const [lang, setLangState] = (0, import_react.useState)("en");
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem("lang");
			if (stored && DICTS[stored]) {
				setLangState(stored);
				return;
			}
			const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
			if (DICTS[nav]) setLangState(nav);
		} catch {}
	}, []);
	const setLang = (l) => {
		setLangState(l);
		try {
			localStorage.setItem("lang", l);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nCtx.Provider, {
		value: {
			lang,
			setLang,
			t: DICTS[lang]
		},
		children
	});
}
var useI18n = () => (0, import_react.useContext)(I18nCtx);
//#endregion
export { LANGS as n, useI18n as r, I18nProvider as t };
