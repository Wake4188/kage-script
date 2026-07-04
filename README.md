<div align="center">

# Kage Script (影文字)

A modern web app for encoding and decoding the historical Shinobi Iroha cipher used in the 17th-century Bansenshūkai.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-black?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<a href="https://www.producthunt.com/products/kage-3?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-kage-4" target="_blank" rel="noopener noreferrer"><img alt="Kage - Kage is a website that translates text into Shinobi cipher | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1182427&amp;theme=light&amp;t=1782569084677"></a>

</div>

## What this project does

Kage Script brings an obscure but fascinating piece of Japanese history into a fast, elegant browser experience. It lets you:

- encode ordinary text into the historical Shinobi Iroha cipher
- decode cipher text back into readable output
- translate between languages before encoding, using a modern Japanese-language pipeline
- explore the result in a clean, minimal interface built for both desktop and mobile

This is not a gimmick cipher toy. It aims to stay faithful to the historical system while making it practical to use today.

## Why it exists

The Shinobi Iroha cipher appears in the Bansenshūkai, a 1676 ninja manual from Japan’s Edo period. Rather than inventing a fictional "ninja alphabet," this project recreates the documented process using historical mappings and a modern interface.

## Key features

- Encode and decode text in the Shinobi Iroha style
- Support for large input blocks up to 2,000 characters
- Language-aware translation flow for more natural encoding
- Minimal, monochrome UI with dark mode support
- Fast, responsive experience powered by React and TanStack Start
- Built with TypeScript for maintainability and confidence

## Quick example

```text
Hello World

↓

𣘸⾝⻩熿⼟⾊...
```

## Quick start

### Prerequisites

- Bun 1.x or newer
- Node.js 20+ (if needed by your local setup)

### Install

```bash
git clone https://github.com/Wake4188/kage-script.git
cd kage-script
bun install
```

### Run locally

```bash
bun run dev
```

Then open http://localhost:8080.

## Useful commands

```bash
bun run dev      # start the local development server
bun run build    # create a production build
bun run preview  # preview the production build locally
bun run test     # run the test suite
bun run lint     # lint the project
```

## Project structure

```text
src/
  components/   # UI building blocks and app components
  lib/          # cipher logic, translation helpers, i18n, and utilities
  routes/       # page-level route definitions
  styles.css    # global styles
tests/          # Vitest test coverage
```

## Deployment notes

The app is designed to run as a modern web app and can be deployed to platforms such as:

- Vercel
- Netlify
- Cloudflare Pages
- Any Node-compatible hosting provider

If you use the translation pipeline that depends on the Lovable integration, make sure to provide the required environment configuration, for example:

```bash
LOVABLE_API_KEY=your_key_here
```

## Benchmarking of pipeline vs old pipeline. 
I had an independent AI (Scouts by Yutori) make an unbiased benchmark of the pipeline. Here it is: 
```bash 
https://passive-white-fixqmfpa.edgeone.dev/
```

## History and inspiration

This project is based on the research and implementation work from the original Text-Shinobi project, adapted into a polished modern experience for browsers and mobile devices.

## Contributing

Contributions are welcome. If you want to improve the cipher logic, UI, translations, or documentation, please open an issue or submit a pull request.

## License

Kage Script is released under the MIT License. See the LICENSE file for details.
