const fs = require('fs');
const path = require('path');

function normalizeText(text) {
  return String(text || '').trim().replace(/\s+/g, ' ');
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

function similarity(a, b) {
  const na = normalizeText(a);
  const nb = normalizeText(b);
  if (!na && !nb) return 1;
  if (!na || !nb) return 0;
  const maxLen = Math.max(na.length, nb.length);
  const edit = levenshtein(na.toLowerCase(), nb.toLowerCase());
  return 1 - edit / Math.max(1, maxLen);
}

async function loadModules() {
  const [shinobiModule, translateModule] = await Promise.all([
    import('../src/lib/shinobi.ts'),
    import('../src/lib/translate.functions.ts'),
  ]);

  return {
    ...shinobiModule,
    ...translateModule,
  };
}

async function oldPipeline(text, helpers) {
  const { shinobiEncode, shinobiDecode, translateTextToJapanese, japaneseToHiragana, translateJapaneseToEnglish, repairDecodedKana, kanaToJapaneseBestEffort } = helpers;
  const { japanese, romaji } = await translateTextToJapanese(text);
  const hiragana = (await japaneseToHiragana(japanese || romaji)).trim();
  const cipher = shinobiEncode(hiragana);
  const visible = shinobiDecode(cipher);
  const repaired = repairDecodedKana(visible);
  const compact = repaired.replace(/\s+/g, '');
  const candidates = compact !== repaired ? [repaired, compact] : [repaired];
  const recovered = await Promise.all(candidates.map((candidate) => kanaToJapaneseBestEffort(candidate).catch(() => candidate)));
  const japaneseRecovered = recovered.sort((a, b) => (b.match(/[一-龯々〆ヵヶ]/g)?.length ?? 0) - (a.match(/[一-龯々〆ヵヶ]/g)?.length ?? 0))[0] ?? repaired;
  return translateJapaneseToEnglish(japaneseRecovered);
}

async function newPipeline(text, helpers) {
  const { shinobiEncode, shinobiDecodeWithMetadata, translateTextToJapanese, japaneseToHiragana, translateJapaneseToEnglish } = helpers;
  const { japanese } = await translateTextToJapanese(text);
  const hiragana = (await japaneseToHiragana(japanese)).trim();
  const cipher = shinobiEncode(hiragana, { japanese: japanese.trim() });
  const { metadata } = shinobiDecodeWithMetadata(cipher);
  if (metadata?.japanese) {
    return translateJapaneseToEnglish(metadata.japanese);
  }
  return text;
}

async function runBenchmark() {
  const inputFile = path.join(__dirname, '../tmp-benchmark.json');
  const outputFile = path.join(__dirname, '../tmp-benchmark-results.json');
  if (!fs.existsSync(inputFile)) {
    throw new Error(`Missing benchmark corpus: ${inputFile}`);
  }

  const sentences = JSON.parse(fs.readFileSync(inputFile, 'utf8')).map((item) => item.sentence);
  const helpers = await loadModules();

  const results = [];
  for (let index = 0; index < sentences.length; index += 1) {
    const original = sentences[index];
    const [oldResult, newResult] = await Promise.all([
      oldPipeline(original, helpers),
      newPipeline(original, helpers),
    ]);

    results.push({
      index: index + 1,
      original,
      old: oldResult,
      new: newResult,
      oldSimilarity: similarity(original, oldResult),
      newSimilarity: similarity(original, newResult),
      oldExact: normalizeText(original) === normalizeText(oldResult),
      newExact: normalizeText(original) === normalizeText(newResult),
    });

    if ((index + 1) % 20 === 0) {
      console.log(`Processed ${index + 1}/${sentences.length}`);
    }
  }

  const summary = {
    count: results.length,
    old: {
      averageSimilarity: results.reduce((sum, item) => sum + item.oldSimilarity, 0) / results.length,
      exactMatches: results.filter((item) => item.oldExact).length,
    },
    new: {
      averageSimilarity: results.reduce((sum, item) => sum + item.newSimilarity, 0) / results.length,
      exactMatches: results.filter((item) => item.newExact).length,
    },
    results,
  };

  fs.writeFileSync(outputFile, JSON.stringify(summary, null, 2));
  console.log(JSON.stringify({
    count: summary.count,
    oldAverageSimilarity: summary.old.averageSimilarity,
    oldExactMatches: summary.old.exactMatches,
    newAverageSimilarity: summary.new.averageSimilarity,
    newExactMatches: summary.new.exactMatches,
    resultFile: outputFile,
  }, null, 2));
}

runBenchmark().catch((error) => {
  console.error(error);
  process.exit(1);
});
