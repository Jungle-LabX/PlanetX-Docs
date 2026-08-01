# PlanetX Docs Project Readiness

Assessment date: 2026-08-01

## Decision summary

PlanetX is ready for a public product site and documentation portal, but the source set is not yet release-complete. The current corpus contains 11 English and 13 Korean documents. Ten document pairs cover the same subjects; the Korean set has two additional deep guides (`11_User_API.md` and `12_Runtime_Actor_Integration.md`) with no English equivalent.

Docusaurus 3.10.2 is a strong fit for a GitHub Pages-only documentation portal: it provides Markdown/MDX, i18n, versioning, navigation, and static output. The current repository, however, was initialized by the Codex Sites workflow as a Next 16 + vinext application. The first implementation therefore keeps a single Next/vinext site and treats Markdown as immutable source input. This gives the landing page and documentation one design system and preserves a deployable Codex Sites preview. The migration manifest keeps a later Docusaurus cut-over reversible.

Official references:

- [Docusaurus installation](https://docusaurus.io/docs/installation)
- [Docusaurus versions](https://docusaurus.io/versions)
- [Docusaurus deployment](https://docusaurus.io/docs/deployment)
- [Docusaurus versioning](https://docusaurus.io/docs/versioning)
- [Docusaurus search](https://docusaurus.io/docs/search)

## Readiness matrix

| Area | Status | Assessment |
|---|---|---|
| Product facts | Partial | Version 1.0, Runtime/Editor modules, GeometryProcessing dependency, and the main public runtime types are verified in source. |
| English documentation | Partial | Eleven public-facing documents exist. Deep API and Runtime Actor guides are missing. |
| Korean documentation | Ready with review | Thirteen documents exist, including the two deepest guides. API behavior still needs product-owner validation. |
| Public/private separation | Ready | No credential, personal data, or private repository URL was found in the supplied UserGuide corpus. |
| Product imagery | Partial | One current Unreal Editor screenshot and reusable PlanetX brand/PVE assets exist. Workflow and runtime screenshots are still missing. |
| Static hosting | Ready with configuration | The content model is static. GitHub Pages still needs repository URL/base path and owner-side Pages settings. |
| Search | Ready | Device-local static search can cover the current 24-document corpus with no service dependency. |
| Versioning | Foundation only | Product version 1.0 is known. No snapshot should be created until a real release baseline is approved. |
| i18n | Partial | Language routing is feasible, but EN/KO section parity is incomplete. |
| Accessibility | Implementable | Keyboard navigation, reduced motion, focus management, table overflow, and semantic headings are all achievable statically. |
| GSAP | Suitable on landing only | Use `useGSAP()`/context cleanup; do not animate documentation reading flow. |

## Verified product facts

- `PlanetX.uplugin` declares `VersionName: "1.0"`.
- Modules: `PlanetX` (Runtime) and `PlanetXEditor` (Editor).
- Plugin dependency: `GeometryProcessing`.
- Verified public types: `APlanetXPlanetActor`, `UPlanetXSubsystem`, `UPlanetXCoordinateComponent`, `UPlanetXMovementComponent`, and `UPlanetXTravelReceiverComponent`.
- `PlanetX.MemoryBudgetMB` exists in source.
- `px.Material.DebugMode` and `px.Material.UseLegacyPath` were not found in the current codebase and must not be presented as verified controls.

## Main risks

1. The English documentation is materially behind Korean for public API and Runtime Actor integration.
2. The supplied plugin descriptor does not declare an Unreal Engine compatibility range. Compatibility must remain “product review required” until the developer supplies a tested matrix.
3. Several performance recommendations and troubleshooting strings require reproduction in Unreal Editor.
4. A custom docs renderer carries more maintenance than stock Docusaurus; source Markdown and migration metadata must stay framework-neutral.
5. GitHub Pages repository/organization names, custom domain, and access policy are not yet known.
6. The package audit currently reports transitive dependency findings; do not run a breaking forced upgrade without a separate dependency review.

## Recommendation

Proceed with the public v1 site using only verified facts. Publish the shared EN/KO chapters, label Korean-only deep guides clearly, exclude unverified CVars from compatibility claims, and gate the final public release on the product-owner checks listed in `CODEX_CAPABILITY_AND_MANUAL_STEPS.md`.
