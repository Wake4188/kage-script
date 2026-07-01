import { Link } from "@tanstack/react-router";

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  meta?: string;
};

export function ArticleCard({ title, description, href, eyebrow, meta }: ArticleCardProps) {
  return (
    <article className="flex h-full flex-col border border-foreground/15 bg-background p-5 transition hover:border-foreground">
      <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-xl font-medium tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">{description}</p>
      {meta ? <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">{meta}</p> : null}
      <Link to={href} className="mt-5 inline-flex items-center text-sm font-medium text-foreground underline underline-offset-4">
        Read article →
      </Link>
    </article>
  );
}
