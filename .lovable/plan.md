## Kage v1.0 — Scope & Approach

This is a large multi-week effort. I need to break it into shippable phases rather than attempt everything in one turn (which would produce shallow, broken work across 40+ files). Here's my proposed sequencing.

### Current state (audit)

Already done in earlier turns:
- Translator (encode/decode) with Gemini + Google fallback
- i18n (EN/FR/ES/DE/JA), dark mode, favicon, footer credit
- Articles: `/bansenshukai-history`, `/ninja-symbols`, `/kuji-in-hand-signs`, `/faq`, `/translator-guide`, `/common-mistakes`, `/learning-resources`, `/imprint`, `/privacy`, `/terms`
- Learning components scaffolded: `ArticleCard`, `ArticleNavigation`, `ReadingProgress`, `RecentlyViewed`, `RelatedLinks`
- `translation-utils.ts` with history/favorites/share URL helpers + tests
- `benchmark-corpus.json`, pipeline tests, Vercel deployment, Vercel Analytics, sitemap, robots, llms.txt, manifest, apple-touch-icon
- CHANGELOG, CONTRIBUTING, SECURITY, LICENSE, README, AGENTS

### Proposed phases (pick one to start)

**Phase A — Translator UX completion** (~1 turn)
Wire the existing `translation-utils.ts` into `src/routes/index.tsx`:
- History drawer + favorites (localStorage)
- Character/word count, live stats
- Copy confirmation (already partial)
- Shareable URL with `?mode=&input=` autoload
- Download PNG / SVG / TXT
- Import/export history JSON
- Clear history

**Phase B — Interactive learning** (~1–2 turns)
New route `/learn` with:
- Alphabet explorer (uses `kage-symbols.ts`)
- Search, symbol detail modal
- Flashcards, quiz mode, progress in localStorage

**Phase C — Missing articles** (~1 turn)
Only genuinely missing: `/numbers`, `/punctuation`, `/cheat-sheet`, `/how-it-works`, `/roadmap`. Each with TOC, breadcrumbs, reading time, FAQ schema, related links.

**Phase D — Navigation & 404** (~1 turn)
- Global search (`/search`)
- Custom 404 (`notFoundComponent`)
- Better footer + mobile nav
- Breadcrumb schema everywhere

**Phase E — PWA + offline** (~1 turn)
Follow the PWA skill: `vite-plugin-pwa` with guarded registration wrapper. Offline translation works because encoding is pure client-side (Gemini/Google is only for input translation to JP — offline mode falls back gracefully).

**Phase F — GitHub, CI, tests, polish** (~1 turn)
GH Actions (build/lint/typecheck/test), issue+PR templates, CODE_OF_CONDUCT, expand Playwright E2E, a11y sweep, final SEO pass.

### Recommendation

I'd start with **Phase A (Translator UX)** because:
1. It's the core product and highest user-visible value
2. All helper code (`translation-utils.ts`) already exists but is unused
3. It's self-contained and shippable independently

**Please confirm**: start with Phase A, or reorder? Attempting all six phases in one response would burn hundreds of credits and produce buggy half-finished work across every subsystem — I'd rather ship each phase properly.
