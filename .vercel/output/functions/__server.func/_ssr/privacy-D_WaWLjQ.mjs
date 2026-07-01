import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-D_WaWLjQ.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		id: "main-content",
		className: "min-h-dvh bg-background text-foreground font-display",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh w-full max-w-[760px] flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between font-mono-display text-[10px] uppercase tracking-[0.2em] sm:text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "hover:opacity-60",
					children: "← KAGE/影"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "Legal / 01"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-12 space-y-8 sm:mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Privacy policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[56px]",
							children: "Your privacy matters."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-[64ch] text-base leading-relaxed text-foreground/80 sm:text-lg",
							children: "Kage is a lightweight translator experience built for privacy-conscious use. This page explains what data is processed locally and what information may be shared with third-party services when you use the translation features."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4 rounded-lg border border-foreground/15 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "What we collect"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "The app stores a small amount of user preference data in your browser, such as the selected language and theme, to improve the experience. Translation input is sent to the server only when you submit a translation request and only for the purpose of generating the requested output."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "How we use it"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "We use the data you provide to process translations and respond to the request. We do not build a profile of your browsing activity, and we do not sell your personal data."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Third-party services"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "The translation flow may rely on hosted services such as Google Translate-compatible endpoints and Vercel analytics for reliability and operational insights. These services may receive the text submitted for translation as part of processing the request."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Your choices"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "You can clear browser storage for this site at any time, and you may stop using the app if you do not want your content processed by the translation services."
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { PrivacyPage as component };
