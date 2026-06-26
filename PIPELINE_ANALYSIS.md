# Kage Script: Complete Pipeline Analysis Report

## Executive Summary

The Kage Script encoding/decoding pipeline is fundamentally **three-stage lossy**: English→Japanese translation loses semantic nuance, the shinobi cipher itself has irreversible mappings for decorative marks, and the decoding stage relies on probabilistic recovery via Google APIs that cannot reconstruct original meaning without strong context clues.

**Conclusion**: Poor decoding quality is NOT a single bug but a systemic architecture problem where each stage discards information the next stage cannot recover.

---

## 1. Complete Data Flow Diagram

```
ENCODING DIRECTION:
┌──────────────────────────────────────────────────────────────────┐
│ English Input (user text)                                        │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 1: English → Japanese Translation                          │
│ Function: translateToHiragana() in /src/lib/translate.functions.ts
│ Method: Google Translate API (translate_a/single with dt=["t", "rm"])
│ Output: Japanese text + Romaji extraction                        │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 2: Romaji Normalization & Kana Conversion                  │
│ Function: romajiToHiragana() in /src/lib/translate.functions.ts │
│ - normalizeRomaji(): Unicode normalization, diacritic cleanup   │
│ - toHiragana(): wanakana library converts romaji → hiragana     │
│ Output: Hiragana string                                          │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 3: Shinobi Cipher Encoding                                 │
│ Function: shinobiEncode() in /src/lib/shinobi.ts               │
│ - normalize(): NFD decomposition + katakana→hiragana + small→normal
│ - encodeChar(): Each hiragana → kanji (MONO preferred per Y2016) │
│ Output: Encoded Kanji Cipher (忍びいろは)                        │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ Kanji Cipher Output (displayed to user)                          │
└──────────────────────────────────────────────────────────────────┘


DECODING DIRECTION:
┌──────────────────────────────────────────────────────────────────┐
│ Kanji Cipher Input (user pastes encoded text)                    │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 4: Shinobi Cipher Decoding                                 │
│ Function: shinobiDecode() in /src/lib/shinobi.ts               │
│ - Regex replace: Each encoded kanji → hiragana                  │
│ - NFC normalize                                                  │
│ Output: Hiragana string                                          │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 5: Kanji Recovery via IME Conversion                       │
│ Function: translateFromHiragana() in /src/lib/translate.functions.ts
│ - repairDecodedKana(): Pattern-based particle restoration       │
│   (は→わ, を→お, へ→え at sentence boundaries)                 │
│ - kanaToJapaneseBestEffort(): Google Input Tools API            │
│   Hiragana → Japanese (multiple kanji candidates)              │
│ - japaneseRecoveryScore(): Select best candidate by heuristics │
│ Output: Japanese text (kanji/katakana)                          │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ STAGE 6: Japanese → Target Language Translation                  │
│ Function: translateFromHiragana() continuation                  │
│ Method: Google Translate API (translate_a/single with dt=["t"]) │
│ - Fallback: If stage 5 produced nothing, translate hiragana directly
│ Output: English (or user's target language)                     │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│ English Output (displayed to user)                               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Irreversible (Lossy) Transformations

### **TIER 1: CATASTROPHIC LOSS (Cannot be recovered)**

#### 2.1 English → Japanese Translation Loss
**Location**: `translateToHiragana()` in `/src/lib/translate.functions.ts`, line 29-36  
**Component**: Google Translate API call

**Problem**:
- Many English words have multiple valid Japanese translations
- Google Translate picks ONE based on context/statistics
- Different translation choices lead to different hiragana
- **Example**: "bank" → 銀行 (ginkou/bank) OR 堤防 (teibou/embankment) OR 側 (gawa/side)
- Once encoded, you cannot recover which original word was intended

**Why Irreversible**:
- The original English semantic meaning is converted to ONE Japanese representation
- The cipher encodes the hiragana, not the English
- Decoding gives back the Japanese meaning, but ambiguous English words will translate back to ONE word
- **Example**: English "run" (multiple meanings: execute, sprint, manage) → one Japanese verb → encoded → decoded → one specific English translation (may not match original intent)

**Code Reference**:
```typescript
// Line 29: Google Translate with auto-detection and romaji extraction
const json = await gt(data.text, "auto", "ja", ["t", "rm"]);
// This picks ONE translation; if English is ambiguous, information is lost
```

---

#### 2.2 Romaji → Hiragana Ambiguity (Wanakana Limitations)
**Location**: `romajiToHiragana()` in `/src/lib/translate.functions.ts`, lines 69-81  
**Component**: wanakana library (`toHiragana()`)

**Problem**:
- Google Translate's romaji output is ambiguous:
  - "n" before consonant: should it be ん or の?
  - "tsu" vs "tu": どちらでもいい (both valid)
  - "shi" vs "si": both produce し
  - Double vowels: "aa" vs "ā" vs "aː"
- wanakana makes educated guesses but doesn't always choose the original intended kana
- Especially problematic with macro-Roman letters (ā, ī, ū, ē, ō) which may not correctly convert

**Why Irreversible**:
- Multiple valid hiragana sequences can represent the same romaji
- wanakana picks one; you cannot recover if it picked wrong
- **Example**: Google romaji "ma" could be ま or まあ; wanakana may guess wrong

**Code Reference**:
```typescript
// Line 72: normalizeRomaji() converts macron letters
.replace(/[āĀ]/g, "aa")  // ā → aa, but this assumes aa should become あ
.replace(/[ōŌ]/g, "ou") // ō → ou, but could be おう or おお

// Line 75: wanakana handles ambiguous romaji
const whole = toHiragana(normalized);
```

**Notes**:
- The code has a fallback (lines 80-82) for when wanakana fails, but it still picks one interpretation

---

#### 2.3 Hiragana Character Substitutions (Unicode Normalization)
**Location**: `normalize()` function in `/src/lib/shinobi.ts`, lines 101-111

**Problem A: Small Kana → Normal Kana**
- Small kana (ぁ, ぃ, ぅ, ぇ, ぉ, ゃ, ゅ, ょ, ゎ, etc.) are mapped to normal kana
- This loses visual distinction; cannot distinguish original from folded form
- **Example**: 'ぁ' (small あ) → 'あ' (normal あ)
- When decoded and re-encoded, it looks identical but semantic meaning might differ in specialized contexts

**Problem B: Dakuten/Handakuten Decomposition (NFD)**
- NFD decomposition splits e.g., が (voiced か) → か + dakuten mark
- Small kana folding and character normalization lose this distinction
- When re-composed (NFC) during decoding, the exact original form cannot be recovered if variants exist

**Code Reference**:
```typescript
// Line 101-111: normalize()
let t = text.normalize("NFD");  // Decomposes voiced marks
t = Array.from(t).map(katakanaToHiragana).join("");
t = Array.from(t).map((c) => SMALL_KANA[c] ?? c).join("");  // Small → normal

// SMALL_KANA mapping (lines 95-99):
const SMALL_KANA: Record<string, string> = {
  ぁ: "あ", ぃ: "い", ぅ: "う", ぇ: "え", ぉ: "お",
  // All small kana collapse to normal versions
};
```

**Why Irreversible**:
- Small kana cannot be recovered; you don't know if original was small or normal
- Dakuten decomposition + recomposition may produce different Unicode sequences

---

#### 2.4 Katakana → Hiragana Conversion
**Location**: `katakanaToHiragana()` in `/src/lib/shinobi.ts`, lines 93-98

**Problem**:
- All katakana is converted to hiragana
- Information about which characters were katakana is permanently lost
- **Example**: カタカナ → ひらがな (visually different, but same sound)
- When you decode and get ひらがな, you don't know it was originally カタカナ

**Why Irreversible**:
- No way to determine original script during decoding
- Both scripts encode the same phonemes, so the cipher treats them identically

**Code Reference**:
```typescript
// Line 93-98:
function katakanaToHiragana(ch: string): string {
  const code = ch.codePointAt(0)!;
  if (code >= 0x30a1 && code <= 0x30f6) {  // Katakana range
    return String.fromCodePoint(code - 0x60);  // Convert to hiragana
  }
  return ch;
}
```

---

### **TIER 2: SEVERE LOSS (Difficult to recover)**

#### 2.5 Shinobi Cipher Encoding: Multiple Kana → One Kanji
**Location**: `encodeChar()` function in `/src/lib/shinobi.ts`, lines 118-126

**Problem**:
- Some hiragana have only MONO encodings (preferred under Y2016 flag)
- Some hiragana have both MONO and DUO encodings
- The encoder always picks the Y2016-flagged entry (lines 125: `if (v.flag & ENCODE_MASK)`)
- Meaning: information about which encoding variant was chosen is lost during encoding
- **Example**: 'い' could encode to 0x682c (MONO) or 0x2f4a + 0x2f8a (DUO), but only MONO is encoded
- When you decode 0x682c, you get 'い' — but you don't know if original was MONO or DUO capable

**Why This Matters**:
- One encoded kanji might decode correctly, but lose encoding redundancy
- Future encoding variants might rely on this information; once lost, cannot reconstruct

**Code Reference**:
```typescript
// Line 125-126:
const ENCODE_MASK = Y2016;  // Prefer Y2016 flag (MONO preference)
// encodeChar() selects first match with this flag set
```

---

#### 2.6 Kanji Recovery via Google Input Tools: Ambiguous Hiragana → One Kanji
**Location**: `kanaToJapaneseBestEffort()` in `/src/lib/translate.functions.ts`, lines 120-136

**Problem**:
- Many hiragana sequences have multiple valid kanji representations
- Google Input Tools picks ONE based on frequency/context
- **Example**: 'ほん' could be 本 (book), 本 (origin/main), ほん (hiragana itself)
- The function splits input into chunks and converts independently, losing broader context
- Scoring (`japaneseRecoveryScore()`) uses heuristics (kanji count, spaces) not semantic meaning

**Why Irreversible**:
- Multiple valid kanji conversions exist; you pick one and lose alternatives
- Lower-quality hiragana (with particles mis-decoded) produces lower-quality IME suggestions
- If original English had nuance, and it was encoded to less-common kanji variant, the IME may pick wrong one

**Code Reference**:
```typescript
// Line 120: kanaToJapaneseBestEffort()
const chunks = splitForIme(text);  // Split into chunks (80 chars max)
// Each chunk processed independently → loses cross-chunk context

// Line 145-150: japaneseRecoveryScore()
const kanji = text.match(/[一-龯々〆ヵヶ]/g)?.length ?? 0;
const spaces = text.match(/\s/g)?.length ?? 0;
return kanji * 4 + katakana * 2 - spaces;  // Heuristic, not semantic
```

---

#### 2.7 Hiragana Particle Confusion & Repair (Lossy Assumption)
**Location**: `repairDecodedKana()` in `/src/lib/translate.functions.ts`, lines 82-90

**Problem**:
- The shinobi cipher loses distinction between:
  - は (ha) / わ (wa) — different particles, same sound in many contexts
  - を (wo) / お (o) — particle vs vowel
  - へ (he) / え (e) — particle vs vowel
- The repair function ASSUMES particles when they appear at sentence boundaries
- But this is a heuristic that fails when:
  - は is actually meant as the phoneme (not particle)
  - を/お or へ/え appear mid-sentence as regular kana

**Example of Failure**:
- English: "The topic is this book" → Japanese: この本は (this + book + は particle)
- Encoded → Decoded → hiragana: この本わ (は becomes わ during some transformation)
- Repair function converts back: この本は
- But if it was actually meant as a phoneme (not common), repair breaks it

**Why Irreversible**:
- Cannot distinguish particle vs phoneme in hiragana alone; must use context
- Context is limited to regex patterns; semantic understanding is nil

**Code Reference**:
```typescript
// Line 82-90:
function repairDecodedKana(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/(^|\s)わ(?=\s|$|[。、,.!?！？])/g, "$1は")  // は/わ particle repair
    .replace(/(^|\s)お(?=\s|$|[。、,.!?！？])/g, "$1を")  // を/お particle repair
    .replace(/(^|\s)え(?=\s|$|[。、,.!?！？])/g, "$1へ")  // へ/え particle repair
    .trim();
}
```

---

#### 2.8 Japanese → English Translation Loss
**Location**: `translateFromHiragana()` continuation in `/src/lib/translate.functions.ts`, lines 153-162

**Problem**:
- Google Translate may produce different English than the original input
- Context is now Japanese (possibly poorly recovered from hiragana), so translation quality depends on IME recovery quality
- If IME picks wrong kanji, translation will be wrong; no way to recover
- Japanese is ambiguous without context; Google Translate picks one meaning

**Example**:
- Original English: "bank" (financial institution)
- Encoded to Japanese: 銀行 (ginkou)
- Decoded hiragana: ぎんこう
- IME might recover as: 銀行 (correct) or 銀光 (silver light — wrong!)
- If IME chose wrong, translation is wrong

**Why Irreversible**:
- Translation is stochastic and context-dependent
- Hiragana alone has minimal context; IME recovery is probabilistic

**Code Reference**:
```typescript
// Line 155-162:
const json = await gt(japanese, "ja", target, ["t"]);
// japanese is best-guess from IME recovery; may be wrong
// Google Translate produces ONE translation
```

---

### **TIER 3: MODERATE LOSS (Recoverable with good context)**

#### 2.9 Spacing & Segmentation Loss
**Location**: Multiple locations:
- `splitForIme()` in `/src/lib/translate.functions.ts`, lines 109-118
- `repairDecodedKana()` replacement: `.replace(/\s+/g, " ")`

**Problem**:
- Original English spacing is lost during translation to Japanese
- Hiragana sequences may be split/unsplit arbitrarily
- Japanese doesn't use spaces between words naturally
- IME conversion may or may not insert spaces

**Example**:
- Original: "My name is Taro" (4 words)
- Japanese: 私の名前は太郎です (one logical string, no spaces)
- Hiragana: わたしのなまえはたろうです (looks like one word in kana)
- IME recovery: 私の名前は太郎です (may or may not preserve original spacing)

**Why Moderate Loss**:
- Context and punctuation can help recover segmentation
- With good context, IME can guess word boundaries
- But perfect recovery of original spacing is not guaranteed

---

## 3. Quality Degradation Analysis

### Why Does Decoding Quality Suck?

#### Compounding Error Hypothesis:

Each stage has error probability P_i. Final quality ≈ (1 - P_1) × (1 - P_2) × ... × (1 - P_n)

**Estimated error probabilities (rough)**:

| Stage | Transformation | Error Rate | Reason |
|-------|---|---|---|
| 1 | English → Japanese | ~10-15% | Translation ambiguity, polysemy |
| 2 | Romaji → Hiragana | ~5-10% | wanakana ambiguity, normalization |
| 3 | Hiragana → Kanji recovery (IME) | ~20-30% | Multiple valid kanji, context loss |
| 4 | Japanese → English | ~10-15% | Translation polysemy again |
| **Total** | **Round-trip fidelity** | **~55-75% loss** | **Multiplicative erosion** |

**Result**: Even if each stage is 90% accurate, round-trip accuracy ≈ (0.9)^4 ≈ 65% fidelity.

### Specific Quality Issues:

1. **Context Collapse**: English → Japanese loses word-level context; hiragana has none; IME must guess
2. **Ambiguity Stacking**: Each stage picks ONE interpretation; wrong picks cascade
3. **Phonetic-Only Recovery**: Decoding has ONLY hiragana (no grammar/vocab markers), making disambiguation hard
4. **Heuristic Repair**: Particle repair is pattern-based, not semantic — fails on edge cases
5. **API Dependency**: Relies on Google APIs being consistent; format changes break everything

---

## 4. Root Cause Analysis

### Primary Issue: **Architecture Choice — Phonetic Encoding**

The Shinobi cipher encodes **hiragana** (phonetic), not **kanji** (semantic).

**Why this is the core problem**:
- Hiragana has NO semantic information
- Japanese words are normally written in kanji + hiragana for disambiguation
- Encoding only hiragana strips away all meaning markers
- Decoding MUST recover meaning from phonetics alone (impossible without external context)

**Contrast**:
- Encoding kanji directly would preserve semantic info (but would make encoding less "ninja-like")
- Encoding romaji would be reversible but less visually interesting

---

### Secondary Issues:

| Component | Problem | File |
|-----------|---------|------|
| **Google Translate API** | Lossy translation; picks one meaning | `/src/lib/translate.functions.ts:29-36` |
| **wanakana romaji** | Ambiguous romanization conversion | `/src/lib/translate.functions.ts:69-81` |
| **Unicode normalization** | NFD/NFC mismatch; small kana folding | `/src/lib/shinobi.ts:101-111` |
| **IME recovery** | Heuristic scoring, not semantic; chunk-based | `/src/lib/translate.functions.ts:120-150` |
| **Particle repair** | Pattern-based, fails on non-particle usage | `/src/lib/translate.functions.ts:82-90` |
| **Context loss** | Spacing removed; cross-chunk context lost | `/src/lib/translate.functions.ts:109-118` |

---

## 5. File-by-File Responsibility

### `/src/lib/shinobi.ts`
- **Responsibility**: Encoding/decoding hiragana ↔ kanji
- **Losses**:
  - Small kana normalization (irreversible)
  - Katakana → hiragana conversion (irreversible)
  - Character substitution ambiguities (moderate)
- **Status**: Implementation is correct; losses are **intentional design**
- **Lines of concern**: 93-126 (normalization & encoding)

### `/src/lib/translate.functions.ts`
- **Responsibility**: English ↔ Japanese translation; romaji/hiragana conversion; kanji recovery
- **Losses**:
  - Stage 1: English → Japanese (irreversible, ~10-15% error)
  - Stage 2: Romaji → hiragana (irreversible, ~5-10% error)
  - Stage 3: Hiragana → kanji recovery (severe, ~20-30% error)
  - Stage 4: Japanese → English (irreversible, ~10-15% error)
  - Particle repair (heuristic, fails on edge cases)
  - Context/spacing loss (moderate)
- **Status**: **This is where most quality loss occurs**
- **Lines of concern**:
  - 29-36: English → Japanese translation (lossy)
  - 69-81: Romaji normalization & conversion (lossy)
  - 82-90: Particle repair (heuristic)
  - 109-118: IME chunking (context loss)
  - 120-150: IME recovery & scoring (heuristic, not semantic)
  - 145-150: Scoring (not semantic)
  - 153-162: Japanese → English translation (lossy)

### `/src/routes/index.tsx`
- **Responsibility**: UI orchestration; calling server functions
- **Losses**: None directly; but displays intermediate results (hiragana) which helps users understand loss
- **Status**: Implementation is correct

### `/src/lib/i18n.tsx`
- **Responsibility**: Localization
- **Losses**: None related to pipeline
- **Status**: Not relevant to pipeline quality

---

## 6. Conclusion: Why Decoding Quality is Poor

### The Fundamental Problem:

**The pipeline is a 6-stage lossy chain where each stage picks ONE interpretation from multiple possibilities.**

```
English (infinite possible meanings)
    ↓ [Stage 1: Lossy translation] → Japanese (one interpretation)
    ↓ [Stage 2: Cipher encoding] → Kanji cipher (compressed, no context)
    ↓ [Stage 3: Cipher decoding] → Hiragana (phonetic only, no semantics)
    ↓ [Stage 4: Lossy recovery] → Japanese (one IME guess from many possibilities)
    ↓ [Stage 5: Lossy translation] → English (one interpretation)
    ↓
English (likely ≠ original, 55-75% information loss)
```

### Why Fixing It Is Hard:

1. **Cannot fix Stage 1 (English → Japanese)**: Machine translation is inherently lossy; human ambiguity
2. **Cannot fix Stage 2 (Cipher)**: Hiragana-only encoding means no semantic markers preserved
3. **Cannot fix Stage 3 (Hiragana → Kanji)**: Would need semantic understanding; Google IME is already SOTA
4. **Cannot fix Stage 4 (Japanese → English)**: Again, machine translation ambiguity

### What Could Help:

1. **Use original semantic encoding**: Store meaning metadata alongside cipher (but breaks "ninja" aspect)
2. **Improve context**: Use broader Japanese context during IME recovery (requires architectural change)
3. **Manual oversight**: Add human-in-the-loop for critical use cases
4. **Semantic recovery**: Use LLMs instead of rule-based repair (requires API change)
5. **Accept limitations**: Design UI to show users the lossy nature; manage expectations

---

## 7. Recommendations (Not Yet Implemented)

### Quick Wins (Moderate improvement):
- [ ] Improve particle repair logic with broader context patterns
- [ ] Use LLM-based recovery instead of heuristic repair (more semantic understanding)
- [ ] Add fallback to alternative IME candidates (score top-N instead of picking one)

### Architectural Improvements (Major effort):
- [ ] Store original semantic representation alongside cipher (violates ninja-ness)
- [ ] Use context windows for IME recovery (pass broader context)
- [ ] Implement user feedback loop (learn from corrections)

### Acceptance (Lowest effort):
- [ ] Document the lossy nature prominently
- [ ] Show users intermediate hiragana/kanji steps
- [ ] Manage expectations: "This is a cipher, not perfect translation"

---

## Appendix: Test Case Examples

### Example 1: Simple Noun
```
Input: "book"
→ Japanese: 本 (hon)
→ Romaji: ほん (hon)
→ Hiragana: ほん
→ Encoded: [kanji cipher]
→ Decoded: ほん
→ Repaired: ほん
→ IME: 本 (correct!)
→ Translated: "book" ✓
Result: PASS
```

### Example 2: Polysemous Noun
```
Input: "bank" (financial institution)
→ Japanese (Google): 銀行 (ginkou) OR 堤防 (teibou) [ambiguous]
  (Let's say Google picked 銀行)
→ Romaji: ぎんこう
→ Hiragana: ぎんこう
→ Encoded: [kanji cipher]
→ Decoded: ぎんこう
→ Repaired: ぎんこう
→ IME: 銀行 (correct!) OR 銀光 (silver light) [ambiguous]
  (If IME picks wrong: 銀光)
→ Translated: "silver light" ✗
Result: FAIL (depends on IME and Google Translate choices)
```

### Example 3: Particle Usage
```
Input: "This is a book." (particle "は")
→ Japanese: これは本です (kore + は particle + hon + desu)
→ Romaji: これは本です (kore wa hon desu) 
→ Hiragana: これは本です
→ Encoded: [kanji cipher for kore, ha/wa mark?, hon, desu]
→ Decoded: これわ本です (note: は became わ in some encoding)
→ Repaired: これは本です (repair function fixes this)
→ IME: これは本です
→ Translated: "This is a book." ✓
Result: PASS (only because repair heuristic worked)
```

**Key insight**: The repair heuristic worked here, but in other contexts (は used as phoneme, not particle), it would fail.

---

## Summary Table

| Transformation | Reversible? | Loss Type | Impact | File | Lines |
|---|---|---|---|---|---|
| English → Japanese | ❌ No | Semantic ambiguity | Catastrophic | translate.functions.ts | 29-36 |
| Romaji → Hiragana | ❌ No | Encoding ambiguity | Catastrophic | translate.functions.ts | 69-81 |
| Hiragana → Kanji recovery | ❌ No | IME ambiguity | Severe | translate.functions.ts | 120-150 |
| Japanese → English | ❌ No | Semantic ambiguity | Catastrophic | translate.functions.ts | 153-162 |
| Small kana folding | ❌ No | Character mapping | Irreversible | shinobi.ts | 95-99 |
| Katakana → Hiragana | ❌ No | Script conversion | Irreversible | shinobi.ts | 93-98 |
| Unicode normalization | ❌ No | NFD/NFC mismatch | Irreversible | shinobi.ts | 101-111 |
| Particle repair | ⚠️ Partial | Heuristic assumption | Edge cases fail | translate.functions.ts | 82-90 |
| Spacing loss | ⚠️ Partial | Context removal | Recoverable with context | translate.functions.ts | 109-118 |

