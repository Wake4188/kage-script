import { Link } from "@tanstack/react-router";

const pages = [
  { title: "Translator", href: "/" },
  { title: "Symbol reference", href: "/ninja-symbols" },
  { title: "Bansenshukai history", href: "/bansenshukai-history" },
  { title: "Kuji-in guide", href: "/kuji-in-hand-signs" },
  { title: "FAQ", href: "/faq" },
  { title: "Learning resources", href: "/learning-resources" },
];

export function ArticleNavigation() {
  return (
    <aside className="mt-12 rounded border border-foreground/10 bg-background p-5 text-sm leading-relaxed text-foreground/80">
      <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Explore the site
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.href}
            to={page.href}
            className="block rounded border border-foreground/10 p-4 transition hover:border-foreground hover:text-foreground"
          >
            <p className="font-medium text-foreground">{page.title}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
