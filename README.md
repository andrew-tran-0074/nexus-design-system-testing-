# nexus-design-system

Nexus-branded React component library. Shared, versioned UI primitives meant
to be installed into multiple projects rather than copy-pasted between them.

## Stack

- **React + TypeScript**, bundled with [tsup](https://tsup.egoist.dev) to
  ESM + CJS + `.d.ts`.
- **Tailwind CSS** for utility styling, with all brand/theme values pulled
  from CSS custom properties in [`src/styles/tokens.css`](src/styles/tokens.css)
  so the whole system re-themes from one file.
- **class-variance-authority + clsx + tailwind-merge** (`cn()` helper) for
  typed, composable component variants.
- **Storybook** for isolated component development and visual docs.
- **Vitest + React Testing Library** for unit tests.
- **Changesets** for versioning and changelog generation.

## Getting started

```bash
npm install
npm run dev          # Storybook at http://localhost:6006
npm run test         # unit tests
npm run build        # emits dist/ (JS + types + compiled styles.css)
```

## Using it in another project

Once published (see [Publishing](#publishing) below):

```bash
npm install nexus-design-system
```

```tsx
import { Button, Card, Badge, Input } from "nexus-design-system";
import "nexus-design-system/styles.css";

function Example() {
  return (
    <Card className="p-4">
      <Button variant="primary">Save</Button>
      <Badge variant="success">Live</Badge>
    </Card>
  );
}
```

The compiled `styles.css` is self-contained — consuming apps do **not** need
Tailwind configured themselves to use it.

## Branding

All brand colors are placeholders right now
([`src/styles/tokens.css`](src/styles/tokens.css), marked `TODO(brand)`).
Replace the `--brand-*` values with the real Nexus palette; every component
reads colors through `var(--brand-primary)` etc. via `tailwind.config.js`, so
changing the tokens re-themes every component with no code changes.

## Project structure

```
src/
  components/<Name>/<Name>.tsx        component
                    <Name>.stories.tsx  Storybook stories
                    <Name>.test.tsx     unit tests (where present)
                    index.ts            barrel export
  lib/cn.ts          className composition helper
  styles/
    tokens.css       brand + design tokens (CSS custom properties)
    globals.css      Tailwind entry point, imports tokens.css
  index.ts           public package entry point
```

Adding a new component means adding one more `components/<Name>/` folder and
re-exporting it from `src/index.ts` — nothing else needs to change to keep it
scaling cleanly.

## Publishing

This repo isn't connected to a remote yet. Suggested flow:

1. Create the GitHub repo (`gh repo create nexus-design-system --public --source=. `
   or via github.com) and push.
2. Decide public npm registry vs. GitHub-only installs:
   - **Public npm**: add an `NPM_TOKEN` secret (npm access token) to the repo
     under Settings → Secrets → Actions. `.github/workflows/release.yml`
     will then open changeset release PRs and publish on merge to `main`.
   - **GitHub-only** (no npm publish): skip the token; consumers install via
     `npm install github:<owner>/nexus-design-system`.
3. Day to day: `npm run changeset` to record a change, merge as usual; the
   release workflow handles version bumps + changelog + publish.

## Scripts

| Script                  | Purpose                                   |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Storybook dev server                       |
| `npm run build`         | Build JS/types (tsup) + compiled CSS       |
| `npm run lint`          | ESLint                                     |
| `npm run typecheck`     | `tsc --noEmit`                             |
| `npm run test`          | Vitest (single run)                        |
| `npm run changeset`     | Record a change for the next release       |
| `npm run release`       | Build + publish via Changesets             |
