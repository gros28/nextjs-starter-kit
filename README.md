# Next.js starter kit

A static App Router starter with reusable layout, marketing sections, Radix-based UI components, and login/signup form examples. The forms are client-side UI examples only; this repository does not include authentication or account creation services.

## Requirements

- Node.js 24.11.1 or newer in the 24.x line.
- npm 11.6.2 or newer in the 11.x line (`packageManager` records npm 11.6.2).

The `packageManager` and `engines` fields document the expected toolchain; they do not install Node.js/npm or guarantee enforcement by every package manager. Use the stated versions for the verified path.

## Install and run

```bash
npm ci
npm run dev
```

Open <http://localhost:3000> during development.

## Checks

```bash
npm run check-all
npm run build
npm start -- --hostname 127.0.0.1 --port 3000
```

`check-all` runs TypeScript, ESLint, Prettier, and every `tests/**/*.test.{ts,tsx}` file. Bind the production server to loopback for local smoke checks. The jsdom tests use CSR `createRoot` and dispatched submit events with native validity asserted separately. They check login validator branches, rendered checkbox clicks and synthetic passwords absent from the tested console methods during login/signup submit. They do not prove SSR hydration, arbitrary credential exfiltration prevention or real-browser E2E behavior.

`format` and `format:check` cover application source, tests, and the listed root project files. Guide Markdown is excluded because its fenced snippets are illustrative source and Prettier can change their meaning (for example, converting a `'use server'` directive into a parenthesized expression). Hidden tool directories such as `.claude` and `.vscode`, including local tool settings, are also outside this formatter scope. `lint-staged` uses the same source, test, and root-file groups.

See [the Next.js 16 guide](docs/guides/nextjs-16.md) for runtime requirements and migration notes. Other focused notes are in [docs/guides](docs/guides/).
