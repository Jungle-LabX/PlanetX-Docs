# Implementation Plan

Baseline: canonical PlanetX 1.0 package documentation reviewed 2026-08-11.

## Phase 1 — Synchronize the corpus

- Preserve `Docs/docs/{en,ko}` under the matching `source-docs/{en,ko}` paths.
- Use `source-docs/docs-manifest.json` as the authority for 11 categories, document order, titles, the `quick-start-same-world` default, supplemental pages, and aliases.
- Maintain 48 core documents per language with complete EN/KO pairs.
- Keep FAQ and Known Issues as two web-only supplemental documents per language.

Exit: the canonical package sources and repository inputs match without translation-pending records.

## Phase 2 — Generate publication artifacts

- Compile the 96 core inputs and four supplemental inputs into 100 online records.
- Rewrite local-file query links to stable `/docs/{lang}/{slug}` routes.
- Copy referenced source media to generated public assets and deduplicate repeated files.
- Generate downloads, source inventory, document map, terminology output, and unresolved-review data deterministically.
- Preserve old public URLs through manifest aliases instead of duplicating stale documents.

Exit: generation is repeatable and `npm run docs:check` detects source, route, image, download, or parity drift.

## Phase 3 — Align the documentation UI

- Build navigation from the 11 manifest categories and route new users to `quick-start-same-world`.
- Render canonical and alias routes statically for English and Korean.
- Keep FAQ, Known Issues, and Version 1.0 available at their standalone routes without duplicating release content.
- Search all 100 generated records locally and prefer the active language.
- Preserve keyboard access, visible focus, semantic headings, responsive layouts, and reduced-motion behavior.

Exit: current and legacy routes resolve to one canonical content set.

## Phase 4 — Automated QA

- Run `npm run docs:generate` and `npm run docs:check`.
- Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build:pages` for pipeline or application changes.
- Inspect the generated diff for accidental private paths, internal notes, unsupported claims, and stale artifacts.
- Confirm 48 core records and two supplements per language, 100 records total, and 14 physical images serving 28 EN/KO references: six overview images and eight Same World Quick Start images.

Exit: the repository is locally ready immediately before commit or upload.

## Phase 5 — Manual product and publication gates

- Reproduce the Same World and Level Handoff procedures in the submitted UE 5.8 build.
- Validate exact UI labels and expected results across the remaining workflow documents.
- Review the eight Same World Quick Start screenshots against the submitted build, capture additional screenshots where the text is insufficient, and note that the Level Handoff guide still has none.
- Product-review FAQ, Known Issues, release facts, and any public destination URL.
- Confirm the external GitHub Pages and Fab listing settings against the same package.

Exit: a human reviewer can follow the documented steps to the stated result, and the published site and Fab submission point to the same approved documentation.
