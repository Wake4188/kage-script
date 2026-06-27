import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { N as useRouter, T as isRedirect, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as shinobiEncode, t as shinobiDecodeWithMetadata } from "./shinobi-B8ukdaBB.mjs";
import { n as LANGS, r as useI18n } from "./i18n-CUqn5wZ1.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-iwABwqQ_.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import "../_libs/wanakana.mjs";
import { n as Moon, r as Languages, t as Sun } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C5Pp3EjI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var InputSchema = objectType({
	text: stringType().min(1).max(2e3),
	targetLang: stringType().min(2).max(8).optional()
});
var translateToHiragana = createServerFn({ method: "POST" }).validator((data) => InputSchema.parse(data)).handler(createSsrRpc("15800936c196ae116e4337c805eacb2391492c42dfb93ec61d30fe429beb7c78"));
var translateFromHiragana = createServerFn({ method: "POST" }).validator((data) => InputSchema.parse(data)).handler(createSsrRpc("c31230cc85529b826003c06f9c956713d062fae19193f0be4297d370bc527d91"));
function useTheme() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [isDark, setIsDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsDark(document.documentElement.classList.contains("dark"));
		setMounted(true);
	}, []);
	const toggle = () => {
		const root = document.documentElement;
		const next = !root.classList.contains("dark");
		root.classList.toggle("dark", next);
		try {
			localStorage.setItem("theme", next ? "dark" : "light");
		} catch {}
		setIsDark(next);
	};
	return {
		isDark,
		toggle,
		mounted
	};
}
function Index() {
	const [mode, setMode] = (0, import_react.useState)("encode");
	const [input, setInput] = (0, import_react.useState)("");
	const [hiragana, setHiragana] = (0, import_react.useState)("");
	const [ninja, setNinja] = (0, import_react.useState)("");
	const [decoded, setDecoded] = (0, import_react.useState)("");
	const [english, setEnglish] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const { isDark, toggle, mounted } = useTheme();
	const { lang, setLang, t } = useI18n();
	const [langOpen, setLangOpen] = (0, import_react.useState)(false);
	const langRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!langOpen) return;
		const onDocClick = (e) => {
			if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
		};
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, [langOpen]);
	const translateFn = useServerFn(translateToHiragana);
	const mutation = useMutation({
		mutationFn: (text) => translateFn({ data: { text } }),
		onSuccess: (res) => {
			setHiragana(res.hiragana);
			setNinja(shinobiEncode(res.hiragana, res.japanese ? { japanese: res.japanese } : void 0));
		}
	});
	const translateBackFn = useServerFn(translateFromHiragana);
	const decodeMutation = useMutation({
		mutationFn: (text) => translateBackFn({ data: {
			text,
			targetLang: lang
		} }),
		onSuccess: (res) => {
			setEnglish(res.english);
		}
	});
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = setTimeout(() => setCopied(false), 1500);
		return () => clearTimeout(id);
	}, [copied]);
	const submit = () => {
		const t = input.trim();
		if (!t) return;
		if (mode === "encode") {
			if (mutation.isPending) return;
			mutation.mutate(t);
		} else {
			if (decodeMutation.isPending) return;
			const { decodedText, metadata } = shinobiDecodeWithMetadata(t);
			const hira = decodedText;
			setDecoded(hira);
			setEnglish("");
			decodeMutation.mutate(hira + (metadata?.japanese ? `\n${metadata.japanese}` : ""));
		}
	};
	const output = mode === "encode" ? ninja : english;
	const copy = async () => {
		if (!output) return;
		await navigator.clipboard.writeText(output);
		setCopied(true);
	};
	const switchMode = (next) => {
		if (next === mode) return;
		setMode(next);
		setInput("");
		setHiragana("");
		setNinja("");
		setDecoded("");
		setEnglish("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-background text-foreground font-display",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh w-full max-w-[680px] flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] text-foreground sm:text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "KAGE/影" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								ref: langRef,
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setLangOpen((o) => !o),
									"aria-label": t.langSwitch,
									"aria-haspopup": "listbox",
									"aria-expanded": langOpen,
									className: "inline-flex h-7 min-w-7 items-center justify-center gap-1 border border-foreground px-1.5 text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
										size: 12,
										strokeWidth: 1.5
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono-display text-[10px]",
										children: LANGS.find((l) => l.code === lang)?.short ?? "EN"
									})]
								}), langOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									role: "listbox",
									className: "absolute right-0 z-10 mt-1 min-w-[140px] border border-foreground bg-background py-1 font-mono-display text-[10px] uppercase tracking-[0.2em] shadow-lg",
									children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "option",
										"aria-selected": l.code === lang,
										onClick: () => {
											setLang(l.code);
											setLangOpen(false);
										},
										className: "block w-full px-3 py-2 text-left transition hover:bg-foreground hover:text-background " + (l.code === lang ? "bg-foreground/10" : ""),
										children: l.label
									}) }, l.code))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: toggle,
								"aria-label": mounted && isDark ? t.themeLight : t.themeDark,
								className: "inline-flex h-7 w-7 items-center justify-center border border-foreground text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
								children: mounted && isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
									size: 14,
									strokeWidth: 1.5
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
									size: 14,
									strokeWidth: 1.5
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-muted-foreground sm:inline",
								children: "v1 · 1676"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-14 sm:mt-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"aria-label": "Shinobi Iroha Ninja Cipher Translator",
						className: "font-display text-[44px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[88px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"aria-hidden": "true",
							children: [
								t.heroLine1,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic font-normal",
									children: t.heroLine2
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-[36ch] font-mono-display text-[11px] leading-relaxed text-muted-foreground sm:text-xs",
						children: t.subtitle
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					"aria-label": t.modeAria,
					className: "mt-10 grid grid-cols-2 border border-foreground font-mono-display text-[11px] uppercase tracking-[0.2em] sm:mt-14",
					children: ["encode", "decode"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						role: "tab",
						"aria-selected": mode === m,
						type: "button",
						onClick: () => switchMode(m),
						className: "py-3 transition " + (mode === m ? "bg-foreground text-background" : "bg-transparent text-foreground hover:bg-foreground/10"),
						children: m === "encode" ? t.encode : t.decode
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8 border-t border-foreground sm:mt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "sr-only",
							children: mode === "encode" ? t.textLabel : t.cipherLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "shinobi-input",
								className: "cursor-pointer",
								children: ["01 / ", mode === "encode" ? t.textLabel : t.cipherLabel]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [input.length, "/2000"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "shinobi-input",
							value: input,
							onChange: (e) => setInput(e.target.value.slice(0, 2e3)),
							onKeyDown: (e) => {
								if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
							},
							placeholder: mode === "encode" ? t.inputPlaceholderEncode : t.inputPlaceholderDecode,
							rows: 3,
							spellCheck: false,
							maxLength: 2e3,
							className: "w-full resize-none border-0 bg-transparent py-2 text-xl leading-snug tracking-tight text-foreground placeholder:text-muted-foreground/40 focus:outline-none sm:text-2xl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: submit,
							disabled: !input.trim() || (mode === "encode" ? mutation.isPending : decodeMutation.isPending),
							className: "mt-4 inline-flex w-full items-center justify-between border border-foreground bg-foreground px-4 py-3 font-mono-display text-[11px] uppercase tracking-[0.2em] text-background transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mode === "encode" ? mutation.isPending ? t.encoding : t.encode : decodeMutation.isPending ? t.decoding : t.decode }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "ml-6",
								children: "→"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12 border-t border-foreground sm:mt-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "sr-only",
							children: mode === "encode" ? t.cipherLabel : t.translationLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["02 / ", mode === "encode" ? t.cipherLabel : t.translationLabel] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: copy,
								disabled: !output,
								"aria-label": copied ? t.copied : t.copy,
								className: "font-mono-display uppercase tracking-[0.2em] text-foreground transition hover:opacity-60 disabled:opacity-20",
								children: copied ? t.copied : t.copy
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-[6rem] break-words py-3 text-2xl leading-[1.4] sm:min-h-[8rem] sm:text-3xl",
							"aria-live": "polite",
							children: output ? output : (mode === "encode" ? mutation.isPending : decodeMutation.isPending) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "…"
							}) : (mode === "encode" ? mutation.isError : decodeMutation.isError) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base text-foreground",
								children: t.failed
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/40",
								children: "𨊂浾⽕紫゙"
							})
						}),
						mode === "encode" && hiragana && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-foreground/10 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: t.hiragana
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-foreground/70 sm:text-base",
								children: hiragana
							})]
						}),
						mode === "decode" && decoded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-foreground/10 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: t.hiragana
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-foreground/70 sm:text-base",
								children: decoded
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "mt-auto border-t border-foreground pt-4 font-mono-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap sm:gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "normal-case text-[9px] sm:text-[11px]",
								children: t.createdBy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/40",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://github.com/tomill/Text-Shinobi",
								target: "_blank",
								rel: "noreferrer noopener",
								className: "text-foreground hover:opacity-60",
								children: t.source
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/40",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/bansenshukai-history",
								className: "text-foreground hover:opacity-60",
								children: t.history
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/40",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ninja-symbols",
								className: "text-foreground hover:opacity-60",
								children: t.symbols
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { Index as component };
