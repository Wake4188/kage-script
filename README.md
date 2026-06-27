# SHINOBI / 忍

A minimal, high-contrast black-and-white web app that translates any language into **忍びいろは** — the secret ninja kanji cipher recorded in the 1676 text *萬川集海*.

## Features

- Translate any text up to 2000 characters into the Shinobi cipher.
- Faithful TypeScript port of [tomill/Text-Shinobi](https://github.com/tomill/Text-Shinobi).
- Pure black & white UI inspired by Nothing Phone and [mathi.jp](https://mathi.jp/).
- Manual dark mode toggle.
- Mobile-first layout, designed for very small screens.

## Stack

- [TanStack Start](https://tanstack.com/start) — full-stack React framework
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query)
- [Lovable AI Gateway](https://docs.lovable.dev/features/cloud) for hiragana translation

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Build

```bash
bun run build
```

## Deployment

The project is configured for Lovable's one-click publish.  
To deploy on **Vercel**, set the Nitro preset to `vercel` in your build configuration and add `LOVABLE_API_KEY` as an environment variable.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Credits

Created by **Noa Wilhide** in France.  
Cipher logic ported from [tomill/Text-Shinobi](https://github.com/tomill/Text-Shinobi).
