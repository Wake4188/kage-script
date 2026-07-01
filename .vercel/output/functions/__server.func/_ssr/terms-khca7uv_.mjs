import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-khca7uv_.js
var import_jsx_runtime = require_jsx_runtime();
function TermsPage() {
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
					children: "Legal / 02"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-12 space-y-8 sm:mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Terms of service"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[56px]",
							children: "Use the app responsibly."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-[64ch] text-base leading-relaxed text-foreground/80 sm:text-lg",
							children: "By using Kage, you agree to use the service lawfully, respectfully, and in a way that does not interfere with the secure operation of the platform."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4 rounded-lg border border-foreground/15 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Permitted use"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "You may use Kage for personal, educational, or creative purposes. The app is intended to translate or transform text for non-malicious use."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Restrictions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "You must not use Kage for abusive, illegal, or deceptive purposes. Attempting to exploit the service, bypass safeguards, or interfere with the operation of the app is prohibited."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Intellectual property"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "The Kage interface, source code, and educational content are provided as part of an open-source project. Any third-party content or libraries remain subject to their own licenses."
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { TermsPage as component };
