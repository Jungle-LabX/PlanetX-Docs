# Source Document Audit

Audit date: 2026-08-11

## Source of truth

The plugin package stores canonical documentation under `Docs/docs/{en,ko}`. The repository preserves matching inputs under `source-docs/{en,ko}`, while `source-docs/docs-manifest.json` defines categories, order, titles, the default document, supplemental records, standalone routes, and aliases. Generated files must never overwrite these inputs.

## Corpus

| Language | Core documents | Web supplements | Generated records | Core pairing |
|---|---:|---:|---:|---|
| English | 48 | 2 | 50 | Complete |
| Korean | 48 | 2 | 50 | Complete |
| Total | 96 | 4 | 100 | Complete |

The web supplements are FAQ and Known Issues. They are not part of the 48-document plugin package corpus and remain subject to product review.

## Category inventory

| Category | Documents per language |
|---|---:|
| Overview and Requirements | 3 |
| Setup and First Project | 4 |
| Data Model and Core Concepts | 5 |
| Editor Workflows | 4 |
| Runtime Integration | 7 |
| Visual Authoring | 4 |
| Configuration Reference | 7 |
| Public API Reference | 8 |
| Troubleshooting | 4 |
| Release Notes | 1 |
| Licenses and Attribution | 1 |
| **Total** | **48** |

`quick-start-same-world` is the canonical first-use and default document. `quick-start-level-handoff` is the advanced multi-Level path. Former slugs, including the old overview, getting-started, workflow, reference, troubleshooting, user API, runtime actor integration, and support/release routes, are retained as aliases to canonical subjects.

## Language parity

- Every core slug has an English and Korean source.
- The former Korean-only User API and Runtime Actor Integration topics are now represented by paired canonical API and runtime documents.
- There are no translation-pending core records.
- EN/KO terminology remains governed by `migration/terminology.en-ko.json`.

## Links and media

- Local-file `?lang=...&doc=...` links are normalized to stable documentation routes during generation.
- Fourteen physical PNG files are reused by 28 Markdown image references: six overview images across 12 EN/KO references and eight Same World Quick Start images across 16 EN/KO references.
- Images require meaningful alt text and are copied to generated public assets without duplicating the canonical source files.
- The updated corpus adds eight Same World Quick Start screenshots. The Level Handoff guide still contains none.
- No public support URL is established; the site must not invent one.

## Canonical 1.0 publication facts

- Unreal Engine 5.8
- Win64
- GeometryProcessing and PCG required
- Runtime module `PlanetX`
- Editor module `PlanetXEditor`

Broader platform, compatibility-history, performance, API-stability, or support-policy claims require separate approved evidence.

## Outstanding manual verification

- Reproduce the Same World quick start and full Level Handoff procedure in the exact submitted build.
- Check every visible UI label, menu path, default value, expected result, and recovery step.
- Capture reviewed step screenshots where text alone is insufficient, without fabricating Unreal Editor output.
- Product-review FAQ, Known Issues, and release/support wording.
- Confirm external GitHub Pages and Fab settings, package metadata, reviewer instructions, and public destination URLs.

The machine-readable inventory is maintained in `migration/source-inventory.json` and `migration/document-map.json`; publication validation must keep them synchronized with the manifest and generated records.
