import { shinobiEncode } from "./shinobi";

export type SymbolEntry = {
  kana: string;
  romaji: string;
  note: string;
  symbol: string;
  index: number;
};

const RAW_SYMBOLS = [
  { kana: "い", romaji: "i", note: "Iro — colour, the opening of the iroha poem." },
  { kana: "ろ", romaji: "ro", note: "Continuing iro ha — colours fade." },
  { kana: "は", romaji: "ha", note: "Closes the first line: ‘colours fade.’" },
  { kana: "に", romaji: "ni", note: "Ni-hoheto — fragrant though they are." },
  { kana: "ほ", romaji: "ho", note: "Part of nihoheto, ‘fragrant.’" },
  { kana: "へ", romaji: "he", note: "Part of nihoheto." },
  { kana: "と", romaji: "to", note: "Closes the second line." },
  { kana: "ち", romaji: "chi", note: "Chirinuru — they scatter." },
  { kana: "り", romaji: "ri", note: "Part of chirinuru." },
  { kana: "ぬ", romaji: "nu", note: "Part of chirinuru." },
  { kana: "る", romaji: "ru", note: "Part of chirinuru." },
  { kana: "を", romaji: "wo", note: "Object marker — ‘them.’" },
  { kana: "わ", romaji: "wa", note: "Waga — ‘our.’" },
  { kana: "か", romaji: "ka", note: "Part of waga yo — ‘our world.’" },
  { kana: "よ", romaji: "yo", note: "Yo — world, life, age." },
  { kana: "た", romaji: "ta", note: "Tare zo — ‘who, then…’" },
  { kana: "れ", romaji: "re", note: "Part of tare zo." },
  { kana: "そ", romaji: "so", note: "Part of tare zo." },
  { kana: "つ", romaji: "tsu", note: "Tsune naramu — ‘is unchanging?’" },
  { kana: "ね", romaji: "ne", note: "Part of tsune naramu." },
  { kana: "な", romaji: "na", note: "Part of tsune naramu." },
  { kana: "ら", romaji: "ra", note: "Part of tsune naramu." },
  { kana: "む", romaji: "mu", note: "Closes the line — nothingness, impermanence." },
  { kana: "う", romaji: "u", note: "Ui no okuyama — ‘the deep mountains of karma.’" },
  { kana: "ゐ", romaji: "wi", note: "Archaic kana, used in ui." },
  { kana: "の", romaji: "no", note: "Possessive — ‘of.’" },
  { kana: "お", romaji: "o", note: "Part of okuyama — ‘deep mountain.’" },
  { kana: "く", romaji: "ku", note: "Part of okuyama." },
  { kana: "や", romaji: "ya", note: "Closes okuyama." },
  { kana: "ま", romaji: "ma", note: "Mountain — yama." },
  { kana: "け", romaji: "ke", note: "Kefu — ‘today.’" },
  { kana: "ふ", romaji: "fu", note: "Part of kefu." },
  { kana: "こ", romaji: "ko", note: "Part of koete — ‘crossing.’" },
  { kana: "え", romaji: "e", note: "Part of koete." },
  { kana: "て", romaji: "te", note: "Closes koete." },
  { kana: "あ", romaji: "a", note: "Asaki — ‘shallow.’" },
  { kana: "さ", romaji: "sa", note: "Part of asaki." },
  { kana: "き", romaji: "ki", note: "Closes asaki." },
  { kana: "ゆ", romaji: "yu", note: "Yume — ‘dream.’" },
  { kana: "め", romaji: "me", note: "Closes yume." },
  { kana: "み", romaji: "mi", note: "Miji — ‘shall not see.’" },
  { kana: "し", romaji: "shi", note: "Part of miji." },
  { kana: "ゑ", romaji: "we", note: "Archaic kana, used in weji." },
  { kana: "ひ", romaji: "hi", note: "Hi mo sezu — ‘nor be drunk by.’" },
  { kana: "も", romaji: "mo", note: "Part of hi mo sezu." },
  { kana: "せ", romaji: "se", note: "Part of sezu." },
  { kana: "す", romaji: "su", note: "Closes sezu — the final line." },
  { kana: "ん", romaji: "n", note: "The terminal nasal — added later to the set." },
];

export const IROHA_SYMBOLS: SymbolEntry[] = RAW_SYMBOLS.map((entry, index) => ({
  ...entry,
  symbol: shinobiEncode(entry.kana),
  index: index + 1,
}));

export function filterSymbols(query: string): SymbolEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return IROHA_SYMBOLS;

  return IROHA_SYMBOLS.filter((entry) => {
    return (
      entry.kana.includes(trimmed) ||
      entry.romaji.includes(trimmed) ||
      entry.note.toLowerCase().includes(trimmed) ||
      entry.symbol.includes(trimmed)
    );
  });
}

export function shuffleSymbols<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}
