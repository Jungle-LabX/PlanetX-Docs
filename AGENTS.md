# PlanetX Docs Agent Guide

## Scope

This repository owns the public PlanetX product site, the EN/KO documentation portal, and the publication pipeline. Preserve public accuracy over promotional completeness.

## Content contract

- Treat `source-docs/` as preserved publication input and `content/generated-docs.json` as generated output.
- Make product-document changes in the plugin UserGuide source first when that workspace is available, then synchronize the matching file here.
- Never invent Unreal Engine compatibility, Fab or GitHub URLs, console variables, public APIs, performance claims, or support policy.
- Keep unresolved facts explicitly marked as product review, workflow QA, or translation pending.
- Preserve stable subjects and slugs in `migration/document-map.json` unless a redirect plan accompanies the change.
- Keep EN/KO terminology aligned with `migration/terminology.en-ko.json`.

## Implementation contract

- Keep the site statically exportable and compatible with the configured GitHub Pages base path.
- Prefer existing components and CSS patterns; add no dependency without a concrete need.
- Clean up GSAP and browser event handlers and honor `prefers-reduced-motion`.
- Maintain keyboard access, visible focus, semantic headings, meaningful alt text, and responsive layouts.
- Do not expose credentials, private repository paths, user data, or internal-only implementation notes.

## Required verification

For content-only changes, run:

```bash
npm run docs:generate
npm run docs:check
```

For application or pipeline changes, also run:

```bash
npm run typecheck
npm run lint
npm test
npm run build:pages
```

Report any skipped verification and the reason. Do not claim compatibility or deployment success from source inspection alone.
