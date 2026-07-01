import { Link } from "@tanstack/react-router";

export function RelatedLinks() {
  return (
    <aside className="mt-10 border-t border-foreground pt-6">
      <div className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Learn next
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Link to="/" className="border border-foreground/15 p-4 transition hover:border-foreground">
          <p className="text-sm font-medium text-foreground">Translator</p>
          <p className="mt-2 text-sm text-foreground/70">Encode or decode your text with the Shinobi Iroha cipher.</p>
        </Link>
        <Link to="/ninja-symbols" className="border border-foreground/15 p-4 transition hover:border-foreground">
          <p className="text-sm font-medium text-foreground">Symbol reference</p>
          <p className="mt-2 text-sm text-foreground/70">Explore the complete 49-symbol alphabet and core meanings.</p>
        </Link>
        <Link to="/bansenshukai-history" className="border border-foreground/15 p-4 transition hover:border-foreground">
          <p className="text-sm font-medium text-foreground">Shinobi history</p>
          <p className="mt-2 text-sm text-foreground/70">Understand where the cipher came from and why it mattered.</p>
        </Link>
        <Link to="/faq" className="border border-foreground/15 p-4 transition hover:border-foreground">
          <p className="text-sm font-medium text-foreground">FAQ</p>
          <p className="mt-2 text-sm text-foreground/70">Find quick answers about reading, decoding, and usage.</p>
        </Link>
        <Link to="/learning-resources" className="border border-foreground/15 p-4 transition hover:border-foreground">
          <p className="text-sm font-medium text-foreground">Learning resources</p>
          <p className="mt-2 text-sm text-foreground/70">Follow a practical roadmap for learning the script.</p>
        </Link>
      </div>
    </aside>
  );
}
