import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bansenshukai-history-CC2xvdr8.js
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-background text-foreground font-display",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-12 pt-6 sm:px-8 sm:pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:opacity-60",
						children: "← KAGE/影"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "v1 · 1676"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mt-14 sm:mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Field notes / 01"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[72px]",
							children: [
								"Bansenshukai",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic font-normal",
									children: "& the ninja cipher."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 max-w-[60ch] text-base leading-relaxed text-foreground/80 sm:text-lg",
							children: [
								"A short history of the 1676 ninja encyclopedia ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Bansenshukai" }),
								" (萬川集海) and the 49-symbol Shinobi Iroha cipher Kage encodes with."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-14 space-y-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
							n: "01",
							title: "What is the Bansenshukai?",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Bansenshukai" }),
								" — literally",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono-display",
									children: "“sea of ten thousand rivers gathered”"
								}),
								" — is a Japanese ninjutsu manual compiled in 1676 by ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fujibayashi Yasutake" }),
								", a samurai-scholar from Iga descended from one of the three great Iga shinobi families. By the early Edo period the wars that defined the ninja's trade had ended, and Fujibayashi gathered the surviving oral traditions of Iga and Kōga into a single 22-volume encyclopedia so the craft would not be lost."
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The book covers ideology, strategy, infiltration techniques, weapons, tools, weather lore, and communications. It was presented to the Tokugawa shogunate but never widely circulated; for most of its life it sat in the shogunal library, copied by hand, treated as sensitive material." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
							n: "02",
							title: "The Shinobi Iroha — 49 symbols",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Inside the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Bansenshukai" }),
								"'s communications chapter is a writing system called the",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: " Shinobi Iroha" }),
								" (忍びいろは) — “the ninja iroha.” The classical Japanese iroha is a poem that uses every kana exactly once, so it functions as an alphabet. The Shinobi Iroha replaces each of the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "49 kana" }),
								" with a distinct kanji-like glyph. The result is a simple, rigorous",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "substitution cipher" }),
								": any Japanese sentence can be transcribed, character by character, into a string that looks like obscure literary kanji."
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The glyphs were not invented from scratch. Many are real but rare characters; others are built by combining a left-side radical (water 氵, person 亻, etc.) with a right-side component drawn from common kanji like 化, 玄, 立, or 黒. The pattern is internally consistent — once you know the grid, you can decode a message without a key, but to anyone who has never seen the system it reads as nonsense." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
							n: "03",
							title: "How a message was encoded",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The mechanic is straightforward:" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
									className: "ml-5 list-decimal space-y-2 text-foreground/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Write the plain message in Japanese." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Reduce it to pure hiragana (kana only)." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Replace each kana with its assigned Shinobi Iroha glyph." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"The cipher's strength was never mathematical — it is a 1-to-1 substitution, trivial to break with a frequency table. Its strength was ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "contextual" }),
									". A captured letter looked like a fragment of an obscure Buddhist text or a copying error, not military intelligence. Couriers could carry encoded notes hidden inside legitimate documents, and a casual reader would simply skim past them."
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Block, {
							n: "04",
							title: "Why it still matters",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Shinobi Iroha is one of the earliest documented Japanese ciphers and one of the only ninja-era cryptographic systems to survive with a full key intact. It is studied today as a piece of cryptographic history, a window into Edo-period communications practice, and — for modern audiences — a small but vivid artifact of how the ninja actually worked, away from the folklore." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Kage" }),
								" implements the Shinobi Iroha exactly as it appears in the",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: " Bansenshukai" }),
								": 49 kana mapped to 49 glyphs, with dakuten and katakana folded down to their base kana before substitution.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "underline underline-offset-4 hover:opacity-60",
									children: "Try it here"
								}),
								"."
							] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "mt-16 border-t border-foreground pt-4 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "normal-case",
							children: "Created by Noa Wilhide in France"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-foreground hover:opacity-60",
							children: "← Back to Kage"
						})]
					})
				})
			]
		})
	});
}
function Block({ n, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-foreground pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-3 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4 text-base leading-relaxed text-foreground/80 sm:text-[17px]",
				children
			})
		]
	});
}
//#endregion
export { HistoryPage as component };
