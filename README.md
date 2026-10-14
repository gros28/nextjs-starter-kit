# Next.js starter kit

A static App Router starter with reusable layout, marketing sections, Radix-based UI components, and login/signup form examples. The forms are client-side UI examples only; this repository does not include authentication or account creation services.

## Requirements

- Node.js 20.9.0 or newer; use a supported LTS release.
- npm 10 or newer.

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

`check-all` runs TypeScript, ESLint, Prettier, and the form tests. Bind the production server to loopback for local smoke checks.

See [the Next.js 16 guide](docs/guides/nextjs-16.md) for runtime requirements and migration notes. Other focused notes are in [docs/guides](docs/guides/).
