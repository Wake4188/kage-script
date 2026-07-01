import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { N as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as I18nProvider } from "./i18n-CUqn5wZ1.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Analytics } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BEUFqfaI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B027RSC5.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: "Kage"
			},
			{
				property: "og:site_name",
				content: "Kage"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "Kage",
				alternateName: "影",
				url: "https://ninja-script-app.lovable.app",
				description: "Encode any language into the secret 忍びいろは (Shinobi Iroha) ninja cipher, or decode it back."
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(I18nProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Analytics, {})] })
	});
}
var BASE_URL = "https://kage-script.lovable.app";
var Route$3 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/bansenshukai-history",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/ninja-symbols",
				changefreq: "monthly",
				priority: "0.7"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$2 = () => import("./ninja-symbols-DwxNVngD.mjs");
var Route$2 = createFileRoute("/ninja-symbols")({
	head: () => ({
		meta: [
			{ title: "Ninja Symbols — The 49 Shinobi Iroha Characters & Meanings" },
			{
				name: "description",
				content: "Visual reference of the 49 ninja symbols of the Shinobi Iroha cipher (1676): every glyph, its hiragana, romaji, and meaning. The complete ninja alphabet."
			},
			{
				property: "og:title",
				content: "Ninja Symbols — The 49 Shinobi Iroha Characters"
			},
			{
				property: "og:description",
				content: "A visual library of the 49 ninja symbols from the Bansenshukai — each glyph with its hiragana, romaji, and meaning. The full ninja alphabet."
			},
			{
				property: "og:type",
				content: "article"
			},
			{
				property: "og:url",
				content: "https://ninja-script-app.lovable.app/ninja-symbols"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://ninja-script-app.lovable.app/ninja-symbols"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				headline: "Ninja Symbols — The 49 Shinobi Iroha Characters",
				description: "Complete visual reference of the 49 ninja symbols of the Shinobi Iroha cipher from the 1676 Bansenshukai, with hiragana, romaji and meanings.",
				author: {
					"@type": "Person",
					name: "Noa Wilhide"
				},
				mainEntityOfPage: "https://ninja-script-app.lovable.app/ninja-symbols",
				inLanguage: "en",
				about: [
					{
						"@type": "Thing",
						name: "Ninja symbols"
					},
					{
						"@type": "Thing",
						name: "Ninja alphabet"
					},
					{
						"@type": "Thing",
						name: "Shinobi Iroha"
					}
				]
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./bansenshukai-history-D6fEMzxi.mjs");
var Route$1 = createFileRoute("/bansenshukai-history")({
	head: () => ({
		meta: [
			{ title: "Bansenshukai (萬川集海) & the Shinobi Iroha Cipher — Kage" },
			{
				name: "description",
				content: "A history of the Bansenshukai, the 1676 ninja encyclopedia, and the 49-symbol Shinobi Iroha cipher used to encode secret messages."
			},
			{
				property: "og:title",
				content: "Bansenshukai & the Shinobi Iroha Cipher"
			},
			{
				property: "og:description",
				content: "How Fujibayashi Yasutake compiled the Bansenshukai in 1676 and the 49 kanji symbols ninja used to write in secret."
			},
			{
				property: "og:type",
				content: "article"
			},
			{
				property: "og:url",
				content: "https://ninja-script-app.lovable.app/bansenshukai-history"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://ninja-script-app.lovable.app/bansenshukai-history"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				headline: "Bansenshukai (萬川集海) and the Shinobi Iroha Cipher",
				description: "A history of the 1676 ninja encyclopedia Bansenshukai and the 49-symbol Shinobi Iroha cipher.",
				author: {
					"@type": "Person",
					name: "Noa Wilhide"
				},
				mainEntityOfPage: "https://ninja-script-app.lovable.app/bansenshukai-history",
				inLanguage: "en",
				about: [
					{
						"@type": "Thing",
						name: "Bansenshukai"
					},
					{
						"@type": "Thing",
						name: "Shinobi Iroha"
					},
					{
						"@type": "Thing",
						name: "Ninja cipher"
					}
				]
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-DPHnIFl4.mjs");
var Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Kage / 影 — Ninja Cipher Translator (忍びいろは)" },
			{
				name: "description",
				content: "Encode any language into the 1676 ninja cipher 忍びいろは, or decode it back."
			},
			{
				property: "og:title",
				content: "Kage / 影 — Ninja Cipher Translator (忍びいろは)"
			},
			{
				property: "og:description",
				content: "Encode any language into the 1676 ninja cipher, or decode it back."
			},
			{
				property: "og:url",
				content: "https://ninja-script-app.lovable.app/"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://ninja-script-app.lovable.app/"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "SoftwareApplication",
				name: "Kage",
				alternateName: "影",
				applicationCategory: "UtilitiesApplication",
				operatingSystem: "Web",
				url: "https://ninja-script-app.lovable.app",
				description: "Encode any language into the 1676 ninja kanji cipher 忍びいろは, or decode it back.",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD"
				},
				author: {
					"@type": "Person",
					name: "Noa Wilhide"
				}
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SitemapDotxmlRoute = Route$3.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$4
});
var NinjaSymbolsRoute = Route$2.update({
	id: "/ninja-symbols",
	path: "/ninja-symbols",
	getParentRoute: () => Route$4
});
var BansenshukaiHistoryRoute = Route$1.update({
	id: "/bansenshukai-history",
	path: "/bansenshukai-history",
	getParentRoute: () => Route$4
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	BansenshukaiHistoryRoute,
	NinjaSymbolsRoute,
	SitemapDotxmlRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
