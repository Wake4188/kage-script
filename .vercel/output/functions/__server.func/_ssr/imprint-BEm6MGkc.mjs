import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/imprint-BEm6MGkc.js
var import_jsx_runtime = require_jsx_runtime();
function ImprintPage() {
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
					children: "Legal / 03"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-12 space-y-8 sm:mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Imprint"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-[40px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[56px]",
							children: "Legal notice."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-[64ch] text-base leading-relaxed text-foreground/80 sm:text-lg",
							children: "Kage is an open-source web application maintained as a public project. This notice is a template intended for deployment and may be updated with project-specific contact details."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4 rounded-lg border border-foreground/15 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Contact"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "For legal inquiries, accessibility feedback, or questions related to this project, please contact the maintainer through the project repository or hosting provider."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Responsible operator"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-foreground/75",
							children: "This website is operated as a public-facing web application and is subject to the terms of the hosting platform and the project maintainer."
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { ImprintPage as component };
