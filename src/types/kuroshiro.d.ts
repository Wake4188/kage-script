declare module 'kuroshiro' {
  export default class Kuroshiro {
    init(analyzer: unknown): Promise<void>;
    convert(text: string, options?: { to?: string }): Promise<string>;
  }
}

declare module 'kuroshiro-analyzer-kuromoji' {
  const KuromojiAnalyzer: unknown;
  export default KuromojiAnalyzer;
}
