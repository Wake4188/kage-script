export type TranslationRecord = {
  id: string;
  mode: "encode" | "decode";
  input: string;
  output: string;
  timestamp: number;
};

export function addTranslationHistoryEntry(
  history: TranslationRecord[],
  entry: Omit<TranslationRecord, "id" | "timestamp">,
  limit = 8,
): TranslationRecord[] {
  const next = [
    {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    },
    ...history,
  ].slice(0, limit);

  return next;
}

export function addTranslationFavoriteEntry(
  favorites: TranslationRecord[],
  entry: Omit<TranslationRecord, "id" | "timestamp">,
): TranslationRecord[] {
  const exists = favorites.some(
    (favorite) => favorite.mode === entry.mode && favorite.input === entry.input && favorite.output === entry.output,
  );

  if (exists) return favorites;

  return [
    {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    },
    ...favorites,
  ].slice(0, 8);
}

export function buildShareableTranslationUrl(
  path: string,
  mode: "encode" | "decode",
  input: string,
): string {
  const base = path.startsWith("/") ? path : `/${path}`;
  const params = new URLSearchParams({ mode, input });
  return `${base}${base.includes("?") ? "&" : "?"}${params.toString()}`;
}
