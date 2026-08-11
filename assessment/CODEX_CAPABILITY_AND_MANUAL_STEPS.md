# Codex Capability and Manual Steps

Assessment baseline: 2026-08-11

## Codex can complete in this repository

- Preserve the manifest-driven EN/KO corpus and compile it into static routes, downloads, images, and local search records.
- Validate the 11 categories, 48 core documents per language, two web-only supplemental documents per language, and all EN/KO pairs.
- Normalize internal links, preserve legacy URL aliases, and verify the `quick-start-same-world` default route.
- Check Markdown structure, meaningful image alt text, generated artifacts, TypeScript, lint, tests, and the GitHub Pages build.
- Inspect source for private paths, internal-only notes, unsupported claims, and broken references.

## Canonical 1.0 contract

- Unreal Engine 5.8
- Win64
- Required plugins: GeometryProcessing and PCG
- Runtime module: `PlanetX`
- Editor module: `PlanetXEditor`
- Packaged documentation source: `Docs/docs/{en,ko}`

These facts are publication inputs, not pending guesses. Any broader compatibility, platform, support, performance, or API claim still requires an approved product source.

## Codex can inspect but cannot certify alone

- Whether every documented Editor and Blueprint step reproduces in the submitted plugin build.
- Whether all UI labels, menu paths, default values, and expected results match Unreal Engine 5.8 exactly.
- Whether C++ and Blueprint examples behave correctly in PIE and packaged Win64 builds.
- Performance and memory behavior across representative production projects.
- Fab listing configuration, package contents, reviewer access, and external destination URLs.

## Product developer must verify

1. Run the canonical Same World quick start from a clean UE 5.8 project and confirm every step and expected result.
2. Run the complete Level Handoff guide. It currently has no step screenshots, so confirm that its text alone is reproducible and capture reviewed images where they materially remove ambiguity.
3. Validate all other workflow instructions against the actual Editor UI, especially installation, Planet Asset creation, Proxy Bake, transitions, diagnostics, and packaging.
4. Confirm that the six overview images and eight Same World Quick Start screenshots, reused by 28 EN/KO references, still represent the submitted product. Treat the Quick Start images as milestone evidence, not proof that unpictured steps are reproducible.
5. Product-review FAQ and Known Issues before publication and provide a public support URL only if one is officially approved.
6. Review performance limits, failure messages, public APIs, and release notes against the exact submitted build.

Do not fabricate Unreal Editor screenshots or infer a support destination.

## Repository and Fab owner must complete

1. Confirm the GitHub organization, repository, Pages base path, and public site URL.
2. Set GitHub Pages to GitHub Actions, review workflow permissions, and configure branch protection.
3. Configure a custom domain and DNS only if one is approved.
4. Verify the Fab listing, documentation URL, package version, supported platform fields, and reviewer instructions against the same 1.0 build.
5. Confirm any public GitHub, issue tracker, Fab, and support URLs before enabling links.

The generated local search for 100 records requires no hosted-search account or credentials.

## Release gate

Publication is ready only when automated checks pass, the actual UE 5.8 workflows are reproduced, necessary step screenshots are reviewed, FAQ and Known Issues receive product review, and the GitHub/Fab owner settings and public URLs are confirmed. Source synchronization alone does not certify Fab review readiness.
