# Assets and Project Settings API

## UPlanetXPlanetAsset

Header: `PlanetX/Assets/PlanetXPlanetAsset.h`

### Identity and revision reads

| Category | Functions |
| --- | --- |
| Planet Asset | `GetPlanetId`, `GetRadiusCm` |
| Bake revision | `GetBakeContractRevision`, `GetLastSuccessfulBakeRevision`, `IsProxyBakeStale` |
| Visual and material revision | `GetVisualSettingsRevision`, `GetMaterialBindingRevision`, `GetLastSuccessfulVisualBuildRevision`, `HasSuccessfulVisualBuild`, `IsVisualBuildStale` |
| Environment and preview revision | `GetEnvironmentSettingsRevision`, `GetLastSuccessfulPreviewRevision`, `IsVisualPreviewStale` |

These are Blueprint-pure reads. A zero revision can indicate that no corresponding successful output has been published yet.

### Visual authoring mutations

All functions below are in the `PlanetX|Visual` Blueprint category and return `bool` unless noted.

| Functions | Contract |
| --- | --- |
| `SetSurfaceCompletionSettings`, `SetProxyPaddingSettings`, `SetVisualGenerationSettings` | Updates completion and padding inputs through revision-aware setters. |
| `SetEnvironmentSettings`, `SetActiveSurfacePreset` | Updates environment settings or the active surface preset. |
| `SetSectionPlacement`, `SetSectionGroundProxyVisibility` | Updates a named Section. |
| `IsSectionPlacementLockedToNorthPole`, `IsSectionAtCanonicalNorthPole` | Reads the Same World placement contract for a named Section. |
| `ValidateSectionPlacement`, `ValidateLevelTopology` | Validates placement or the complete topology; reason text is supplied where declared. |
| `SetSectionSurfaceCorrectionSettings`, `RefreshSectionProxyBakeLink` | Updates correction settings or re-links authoritative Bake Data. |

`MarkVisualPreviewBuildSucceeded` is a `void` Blueprint-callable function in `PlanetX|Revision`; call it only after a successful preview build. Prefer these methods and the Planet Asset Editor over direct mutation so revision and staleness tracking remains coherent.

## UPlanetXSurfacePreset

Header: `PlanetX/Visual/Assets/PlanetXSurfacePreset.h`

This Blueprint type has no Blueprint-callable functions. Its editable fields are `PresetId`, `DisplayName`, `PresetType`, `CompletionSettings`, `PaddingSettings`, `BaseSurfaceMaterial`, `OptionalBiomeMask`, and `OptionalHeightMask`. Keep `PresetId` stable and make sure referenced materials and textures are included in the cook.

## Project settings

`UPlanetXRuntimeDeveloperSettings` is declared in `PlanetX/Settings/PlanetXRuntimeDeveloperSettings.h`. Its project-wide config field is `RuntimeBudgetPolicy`, which defaults to `EPlanetXRuntimeBudgetPolicy::FollowEngineScalability`.

`UPlanetXRenderingDeveloperSettings` is declared in `PlanetX/Settings/PlanetXRenderingDeveloperSettings.h`. Its config fields are `bEnableLensFlares`, defaulting to `true`, and `LensFlareQuality`, defaulting to `3` with a valid range of 0 through 3. `ApplyConsoleVariables` is a C++ member, not a Blueprint function.

