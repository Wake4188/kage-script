// Text Shinobi (忍びいろは) encoding — port of https://github.com/tomill/Text-Shinobi
// Substitution cipher mapping Japanese kana to kanji used by ninja.

const MONO = 1 << 1;
const DUO = 1 << 0;
const UTF8MB3 = 1 << 3;
const JIS = 1 << 2;
const Y2016 = 1 << 10;

type Entry = { char: string; code: string; flag: number };

const cp = (n: number) => String.fromCodePoint(n);

const MAP: Entry[] = [
  // Single-character (MONO) entries — preferred under Y2016 default
  { char: "い", code: cp(0x682c), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "に", code: cp(0x92ab), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "ほ", code: cp(0x23d0a), flag: MONO },
  { char: "へ", code: cp(0x2021c), flag: MONO },
  { char: "と", code: cp(0x28246), flag: MONO },
  { char: "ち", code: cp(0x68c8), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "ぬ", code: cp(0x57e5), flag: MONO | UTF8MB3 | Y2016 },
  { char: "る", code: cp(0x9306), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "を", code: cp(0x6e05), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "わ", code: cp(0x5029), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "よ", code: cp(0x6a2a), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "た", code: cp(0x71bf), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "れ", code: cp(0x58b4), flag: MONO | UTF8MB3 | Y2016 },
  { char: "そ", code: cp(0x9404), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "つ", code: cp(0x6f62), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "ね", code: cp(0x50d9), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "な", code: cp(0x28287), flag: MONO },
  { char: "む", code: cp(0x7103), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "う", code: cp(0x212fd), flag: MONO | JIS | Y2016 },
  { char: "ゐ", code: cp(0x4932), flag: MONO | UTF8MB3 | Y2016 },
  { char: "の", code: cp(0x6d7e), flag: MONO | UTF8MB3 | Y2016 },
  { char: "や", code: cp(0x67cf), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "ま", code: cp(0x241e2), flag: MONO | Y2016 },
  { char: "け", code: cp(0x2129a), flag: MONO },
  { char: "ふ", code: cp(0x9251), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "こ", code: cp(0x6cca), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "え", code: cp(0x4f2f), flag: MONO | UTF8MB3 | JIS | Y2016 },
  { char: "あ", code: cp(0x23638), flag: MONO | JIS | Y2016 },
  { char: "さ", code: cp(0x3df5), flag: MONO | UTF8MB3 | Y2016 },
  { char: "ゆ", code: cp(0x28b46), flag: MONO | Y2016 },
  { char: "め", code: cp(0x6f76), flag: MONO | UTF8MB3 | Y2016 },
  { char: "み", code: cp(0x20381), flag: MONO | JIS | Y2016 },
  { char: "し", code: cp(0x28282), flag: MONO | JIS | Y2016 },
  { char: "ゑ", code: cp(0x6a74), flag: MONO | UTF8MB3 | Y2016 },

  // DUO (double-character) — used as fallback for kana with no MONO entry
  { char: "い", code: cp(0x2f4a) + cp(0x2f8a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ろ", code: cp(0x2f55) + cp(0x2f8a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "は", code: cp(0x2f1f) + cp(0x2f8a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "に", code: cp(0x2fa6) + cp(0x2f8a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ほ", code: cp(0x6c35) + cp(0x2f8a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "へ", code: cp(0x4ebb) + cp(0x2f8a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "と", code: cp(0x2f9d) + cp(0x2f8a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ち", code: cp(0x2f4a) + cp(0x2ed8), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "り", code: cp(0x2f55) + cp(0x2ed8), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ぬ", code: cp(0x2f1f) + cp(0x2ed8), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "る", code: cp(0x2fa6) + cp(0x2ed8), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "を", code: cp(0x6c35) + cp(0x2ed8), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "わ", code: cp(0x4ebb) + cp(0x2ed8), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "か", code: cp(0x2f9d) + cp(0x2ed8), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "よ", code: cp(0x2f4a) + cp(0x2ee9), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "た", code: cp(0x2f55) + cp(0x2ee9), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "れ", code: cp(0x2f1f) + cp(0x2ee9), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "そ", code: cp(0x2fa6) + cp(0x2ee9), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "つ", code: cp(0x6c35) + cp(0x2ee9), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ね", code: cp(0x4ebb) + cp(0x2ee9), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "な", code: cp(0x2f9d) + cp(0x2ee9), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ら", code: cp(0x2f4a) + cp(0x2f9a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "む", code: cp(0x2f55) + cp(0x2f9a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "う", code: cp(0x2f1f) + cp(0x2f9a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ゐ", code: cp(0x2fa6) + cp(0x2f9a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "の", code: cp(0x6c35) + cp(0x2f9a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "お", code: cp(0x4ebb) + cp(0x2f9a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "く", code: cp(0x2f9d) + cp(0x2f9a), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "や", code: cp(0x2f4a) + cp(0x2f69), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ま", code: cp(0x2f55) + cp(0x2f69), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "け", code: cp(0x2f1f) + cp(0x2f69), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ふ", code: cp(0x2fa6) + cp(0x2f69), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "こ", code: cp(0x6c35) + cp(0x2f69), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "え", code: cp(0x4ebb) + cp(0x2f69), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "て", code: cp(0x2f9d) + cp(0x2f69), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "あ", code: cp(0x2f4a) + cp(0x9ed2), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "さ", code: cp(0x2f55) + cp(0x9ed2), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "き", code: cp(0x2f1f) + cp(0x9ed2), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ゆ", code: cp(0x2fa6) + cp(0x9ed2), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "め", code: cp(0x6c35) + cp(0x9ed2), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "み", code: cp(0x4ebb) + cp(0x9ed2), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "し", code: cp(0x2f9d) + cp(0x9ed2), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ゑ", code: cp(0x2f4a) + cp(0x7d2b), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ひ", code: cp(0x2f55) + cp(0x7d2b), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "も", code: cp(0x2f1f) + cp(0x7d2b), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "せ", code: cp(0x2fa6) + cp(0x7d2b), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "す", code: cp(0x6c35) + cp(0x7d2b), flag: DUO | UTF8MB3 | JIS | Y2016 },
  { char: "ん", code: cp(0x4ebb) + cp(0x7d2b), flag: DUO | UTF8MB3 | JIS | Y2016 },
];

const ENCODE_MASK = Y2016;

const encodeMap = new Map<string, Entry[]>();
for (const e of MAP) {
  const list = encodeMap.get(e.char) ?? [];
  list.push(e);
  encodeMap.set(e.char, list);
}

// Small kana folding tables
const SMALL_KANA: Record<string, string> = {
  ぁ: "あ", ぃ: "い", ぅ: "う", ぇ: "え", ぉ: "お",
  っ: "つ", ゃ: "や", ゅ: "ゆ", ょ: "よ", ゎ: "わ",
  ゕ: "か", ゖ: "け",
};

function katakanaToHiragana(ch: string): string {
  const code = ch.codePointAt(0)!;
  if (code >= 0x30a1 && code <= 0x30f6) {
    return String.fromCodePoint(code - 0x60);
  }
  return ch;
}

function normalize(text: string): string {
  // NFD to decompose dakuten/handakuten
  let t = text.normalize("NFD");
  // katakana -> hiragana
  t = Array.from(t).map(katakanaToHiragana).join("");
  // small kana -> normal
  t = Array.from(t).map((c) => SMALL_KANA[c] ?? c).join("");
  return t;
}

function encodeChar(ch: string): string {
  const list = encodeMap.get(ch);
  if (!list) return ch;
  for (const v of list) {
    if (v.flag & ENCODE_MASK) return v.code;
  }
  return ch;
}

export function shinobiEncode(text: string): string {
  const norm = normalize(text);
  return Array.from(norm).map(encodeChar).join("");
}

// Build decode regex (longest first)
const decodeMap = new Map<string, string>();
for (const e of MAP) decodeMap.set(e.code, e.char);
const decodeKeys = [...decodeMap.keys()].sort((a, b) => b.length - a.length);
const decodeRe = new RegExp(decodeKeys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gu");

export function shinobiDecode(text: string): string {
  return text.replace(decodeRe, (m) => decodeMap.get(m) ?? m).normalize("NFC");
}