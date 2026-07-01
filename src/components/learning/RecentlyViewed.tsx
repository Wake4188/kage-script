"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "kage-recent-pages";

const pages = [
  { title: "Translator", href: "/" },
  { title: "Symbol reference", href: "/ninja-symbols" },
  { title: "Bansenshukai history", href: "/bansenshukai-history" },
  { title: "Kuji-in guide", href: "/kuji-in-hand-signs" },
  { title: "FAQ", href: "/faq" },
  { title: "Learning resources", href: "/learning-resources" },
  { title: "How the translator works", href: "/translator-guide" },
  { title: "Common mistakes", href: "/common-mistakes" },
];

export function trackRecentPage(title: string, href: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list = raw ? (JSON.parse(raw) as Array<{ title: string; href: string }>) : [];
    const existing = list.find((item) => item.href === href);
    const next = [{ title, href }, ...(list.filter((item) => item.href !== href))].slice(0, 5);
    if (!existing || list[0]?.href !== href) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    // Ignore storage failures.
  }
}

export function RecentlyViewed() {
  const [recent, setRecent] = useState<Array<{ title: string; href: string }>>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setRecent(JSON.parse(raw));
      }
    } catch {
      setRecent([]);
    }
  }, []);

  if (recent.length === 0) return null;

  return (
    <aside className="mt-10 rounded border border-foreground/10 bg-background p-5 text-sm leading-relaxed text-foreground/80">
      <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Recently viewed pages
      </div>
      <ul className="mt-4 space-y-2">
        {recent.map((page) => (
          <li key={page.href}>
            <Link to={page.href} className="underline underline-offset-4 hover:text-foreground">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
