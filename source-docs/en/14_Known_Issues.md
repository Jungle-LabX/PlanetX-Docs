# Known Issues

Confirmed issues and their current response status. This page does not list unverified reports as product defects.

## Status definitions

| Status | Meaning |
|---|---|
| Investigating | The report is acknowledged and reproduction is being confirmed. |
| Patch in progress | The cause is understood and a change is being implemented or verified. |
| Workaround available | A documented recovery path is available before the permanent change ships. |
| Resolved | The correction is included in the current published documentation or product release. |

## Documentation portal

| Issue | Status | Current response |
|---|---|---|
| Mermaid blocks appeared as raw source | Patch in progress | Mermaid blocks now render as theme-aware SVG diagrams; final cross-browser verification is in progress. |
| Light and dark mode were inconsistent on nested documentation surfaces | Patch in progress | Global surface, border, text, table, code, search, and diagram tokens are being audited together. |
| Sidebar, table metadata, and table-of-contents text were too small | Patch in progress | Documentation typography now uses larger minimum sizes and is undergoing responsive verification. |
| Navigation labels did not always match their destination | Patch in progress | Header, sidebar, FAQ, Known Issues, and support routes are moving to one canonical navigation registry. |

## PlanetX plugin

No confirmed public runtime or editor defect is currently listed here. Product issues will be added only after a reproducible case and affected scope have been verified.

## Before reporting a new issue

1. Check [Troubleshooting](/docs/en/troubleshooting) and the [FAQ](/faq).
2. Record PlanetX and Unreal Engine versions.
3. Include exact reproduction steps and whether the problem occurs in Editor, PIE, packaged builds, or all three.
4. Include relevant logs, diagnostics, and the smallest reproducible project state that can be shared safely.
