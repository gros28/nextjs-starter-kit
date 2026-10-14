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

`check-all` runs TypeScript, ESLint, Prettier, and every `tests/**/*.test.{ts,tsx}` file. `npm run test:e2e` starts an isolated local Next.js dev server and runs login/signup interaction checks in headless Chromium; install the Playwright Chromium browser first with `npx playwright install chromium`. Bind the production server to loopback for local smoke checks. The jsdom tests use CSR `createRoot` and dispatched submit events with native validity asserted separately. They check login validator branches, rendered checkbox clicks and synthetic password markers in JSON-serializable or iterable arguments of the tested console methods during login/signup submit. The browser suite checks keyboard interaction, native validity, visible validation errors, and that signup makes no POST request. Neither suite proves behavior in other browsers/operating systems, non-enumerable or custom-formatted console objects, later asynchronous logging, SSR hydration, or arbitrary credential exfiltration prevention.

`format` and `format:check` cover application source, tests, and the listed root project files. Guide Markdown is excluded because its fenced snippets are illustrative source and Prettier can change their meaning (for example, converting a `'use server'` directive into a parenthesized expression). Hidden tool directories such as `.claude` and `.vscode`, including local tool settings, are also outside this formatter scope. `lint-staged` uses the same source, test, and root-file groups.

See [the Next.js 16 guide](docs/guides/nextjs-16.md) for runtime requirements and migration notes. Other focused notes are in [docs/guides](docs/guides/).

## Follow-up work

- **Recheck the Next.js security update before adopting this refresh.** On 2026-10-14 the [official blog](https://nextjs.org/blog) still showed the 2026-10-08 notice as upcoming, and npm's `next/latest` remained 16.4.0; the promised advisory and fixed version range could not be verified. Version 16.4.0 is above the patched versions for the previously published 16.x advisories, but that does not settle the announced update. Keep adoption on hold until the new advisory and installed versions agree; then rerun `npm ci`, `npm run check-all`, `npm run build`, `npm audit`, and the loopback production HTTP smoke.
- **Revisit the development dependency audit when a compatible fix exists.** The full audit reported eight High findings through `braces <=3.0.3` in the `micromatch`/`fast-glob` toolchain used by development dependencies. The advisory had no patched `braces` release at review time, and `npm audit fix --force` proposed downgrading `shadcn` to a breaking major. Do not force that downgrade; update the affected chain when compatible patched releases are available, and confirm both the full audit and `npm audit --omit=dev`. The latter was clean in this refresh, but does not establish reachability or safety of the development tool path.
- **Upgrade ESLint when the Next.js plugin chain supports it.** ESLint 10.12.0 is now the latest registry version and `eslint-config-next` declares an ESLint peer range of `>=9`, but its bundled `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-react` still declare peer ranges ending at ESLint 9. Keep ESLint 9 until those plugins support 10, then validate the flat config and lint results before upgrading.
- **Run the new cross-platform CI matrix.** The recorded checks ran on Windows with Node.js 24.11.1 and npm 11.6.2, including Chromium E2E for login/signup validation, keyboard interaction, and confirmation that signup makes no account API request. macOS and Linux results are still pending CI execution; the E2E suite currently targets Chromium only.
- **Define service behavior before turning the form examples into real flows.** Login and signup are client-side UI examples; there is no authentication or account-creation service. If these screens later need to submit real accounts, first agree on the API contract and success, validation-error, retry, and failure states, then implement and test against that contract.
