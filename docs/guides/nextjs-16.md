# Next.js 16 starter notes

This starter uses the App Router with Next.js 16, React 19, TypeScript, and Turbopack. Next.js 16 uses Turbopack by default for `next dev` and `next build`; the scripts do not need a bundler flag.

## Runtime and upgrade points

- Node.js 20.9.0 or newer is required. Use a supported Node.js LTS release for development and deployment.
- TypeScript 5.1 or newer is required.
- `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are asynchronous request APIs. Await them before reading values.
- Middleware has been renamed to Proxy. This starter does not currently define middleware or proxy files.
- Review the official migration guide before adding older Next.js examples or adopting a new major release.

## Rendering boundaries

App Router components are Server Components by default. Add `'use client'` only where browser state or event handlers are needed. Keep client forms and controls small, and leave static sections server-rendered.

The login and signup forms in this repository are UI examples. They validate input in the browser and do not authenticate users, create accounts, or call a service.

## Local checks

```bash
npm ci
npm run check-all
npm run build
npm start -- --hostname 127.0.0.1 --port 3000
```

The production server command is for local verification. Bind it to loopback when running the smoke check.

## Official references

- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
- [React 19.3 release notes](https://react.dev/blog/2026/09/09/react-19-3)
