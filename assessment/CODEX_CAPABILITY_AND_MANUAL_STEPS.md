# Codex Capability and Manual Steps

## Codex can complete in this repository

- Build the landing page, docs routes, navigation, search, language switcher, responsive layout, and reduced-motion behavior.
- Preserve and compile the supplied Markdown into public routes.
- Generate migration inventories, translation-parity reports, and broken-link checks.
- Add CI and GitHub Pages workflow files.
- Validate TypeScript, lint, production builds, static document routes, and repository-local accessibility rules.
- Prepare asset placeholders and exact capture instructions.

## Codex can inspect but cannot certify alone

- Whether every documented Blueprint and C++ call works in a packaged game.
- Unreal Editor UI labels and full workflow reproducibility.
- Performance and memory guidance across representative projects.
- World Partition, Nanite/material, multiplayer travel, and replication behavior.
- The exact Unreal Engine compatibility matrix.

## GitHub organization owner must complete

1. Create or connect the `PlanetX-Docs` repository remote.
2. Confirm the organization/repository names used for the Pages base URL.
3. In repository settings, set Pages source to GitHub Actions.
4. Review and approve the least-privilege Actions workflow permissions.
5. Configure branch protection and required CI checks.
6. Configure a custom domain and DNS records, if desired.
7. Add any search-service credentials only after choosing a hosted provider. The initial local search requires none.
8. Confirm the public GitHub, Fab, issue tracker, and support URLs before links are enabled.

## Product developer must verify

- Supported Unreal Engine versions for PlanetX 1.0.
- The public status of every type and function referenced by `11_User_API.md`.
- The absence or replacement of `px.Material.DebugMode` and `px.Material.UseLegacyPath`.
- Supported-content claims for Nanite, PCG, World Partition HLOD, skeletal/cloth, spline deformation, and dynamic meshes.
- Performance recommendations and any numeric thresholds.
- External-level travel, Same World transitions, multiplayer ownership, and failure recovery.
- Release-note accuracy and known limitations.

## Human-provided media

The site includes one current Proxy Bake screenshot. The following still require capture from a reviewed build:

| Type | Purpose | Required state | Suggested ratio |
|---|---|---|---|
| Screenshot | Install/enable flow | Plugins window with PlanetX enabled | 16:9 |
| Screenshot | Planet Asset setup | Asset editor with core fields populated | 16:9 |
| Screenshot | Section authoring | Section/coordinate editing UI | 16:9 |
| Screenshot | Successful bake | Proxy Bake review plus completed output | 16:9 |
| Before/after | Proxy result | Ground level and orbit proxy of same content | 16:9 pair |
| Video loop | State journey | Orbit → Transition → Ground in a sample project | 16:9 WebM/MP4, 6–12 s |
| Screenshot | Runtime integration | Blueprint component setup and reference planet | 16:9 |
| Screenshot | Diagnostics | Runtime diagnostics during a valid transition | 16:9 |

Do not fabricate Unreal Editor screenshots or product output.

## Release gate

Public deployment is ready only after the product developer resolves the compatibility matrix and the two unverified CVars, the organization owner supplies destination URLs/settings, all automated checks pass, and the source/translation report contains no accidental broken links.
