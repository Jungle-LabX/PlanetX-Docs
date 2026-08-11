# Planet Asset and Visual Settings

Distances and sizes are in Unreal Units (centimeters) unless noted otherwise.

## Planet contract established at creation

| Setting | Meaning |
| --- | --- |
| Planet ID | The unique `FName` that identifies the planet across the project and at runtime. It is immutable after creation. |
| Radius | The planet radius. The creation UI may accept kilometers, but the Asset stores centimeters and requires at least 1 cm. Radius participates in the bake and visual-build contract and is not intended for direct changes after creation. |
| Coordinate Convention | Defines the North Pole and longitude axes, longitude direction, Source X/Y/Z mapping, and `UnrealUnitToCm`. The defaults are Up/Forward/Right, counterclockwise longitude, X=East, Y=North, Z=Up, and 1 uu=1 cm. It is immutable after creation. |

## Authoring Geometry Settings

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `DetailLevel` | `Medium` | Chooses the `Low`, `Medium`, `High`, or `Custom` preview-planet mesh tier. |
| `PreviewSegmentCount` | 64, 8–512 | Segment count for the procedural preview sphere. More segments improve the silhouette but increase preview cost. |
| `PreviewVertexBudget` | 10,000, 128–1,000,000 | Maximum vertex budget for preview generation. |
| `ProxyTextureResolution` | 2048, 256–8192 | Target texture resolution used by proxy and visual authoring. Consider both memory and build time. |
| `bUseCustomPreviewMesh` | false | Uses `CustomPreviewMesh` instead of the generated preview mesh. |
| `CustomPreviewMesh` | None | Static Mesh used while custom preview is enabled. |
| `LowPreviewMesh` | None | Explicit Static Mesh for the Low preview tier. |
| `MediumPreviewMesh` | None | Explicit Static Mesh for the Medium preview tier. |
| `HighPreviewMesh` | None | Explicit Static Mesh for the High preview tier. |

## Surface Completion Settings

These settings generate the portion of the planet not covered by Sections.

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `CompletionMeshDetailLevel` | 6, 0–7 | Detail level of the completion sphere. Higher values increase vertex count and build cost. |
| `CompletionNoiseSeed` | 1337 | Selects a reproducible terrain-noise layout. |
| `CompletionNoiseStrengthPercent` | 10%, 0–25 | Strength of surface-height variation relative to planet radius. |
| `CompletionNoiseScale` | 3.0, 0.001–25 | Controls the spatial frequency/scale of the noise. |
| `TerrainRegionProfiles` | 4 entries | Strength/sharpness pairs for noise regions. Use 1–8 entries. Defaults are `(0.20,1.25)`, `(0.45,2.00)`, `(0.70,3.25)`, and `(1.00,4.50)`. |
| `TerrainRegionProfiles[].Strength` | 0.5, 0–1 | Height influence of that region. |
| `TerrainRegionProfiles[].Sharpness` | 2.0, 0.5–8 | Concentration of the region boundary. |
| `CompletionMaterial` | None | Material applied to completion geometry. Inspect the Visual Build result to ensure that it joins Section materials as intended. |
| `BlendSharpness` | 1.0, 0.01–8 | Sharpness of the material blend between completion and adjacent surfaces. |

## Proxy Padding Settings

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `GeometryPaddingWidthCm` | 100,000, at least 0 | Width of the geometric bridge from a Section Proxy to completion. |
| `MaterialTransitionWidthRatio` | 0.1, 0–0.5 | Fraction of total padding width used for material transition. |
| `PaddingMaterialBakeResolution` | 2048, 256–2048 | Output resolution for Padding Material Bake. |
| `MaterialBakeBindings` | Empty | Generated Section-to-padding-material records written by Visual Build. Do not edit entries manually. |
| `PaddingSegmentCount` | 8, 1–128 | Number of geometry segments across the padding width. |
| `RingDistributionStrength` | 2.0, 1–4 | Controls how strongly padding rings are concentrated toward the boundary. |
| `HeightTransitionStrength` | 1.0, 0–4 | Strength of height correction between proxy and completion. |

### Padding Performance Budget

Warning values produce warnings; Hard values stop an excessive build. Do not set a Hard value below its corresponding Warning value.

| Settings | Defaults | Measurement |
| --- | ---: | --- |
| `WarningBoundaryEdgeCount` / `HardBoundaryEdgeCount` | 10,000 / 100,000 | Extracted boundary edges |
| `WarningGeneratedVertexCount` / `HardGeneratedVertexCount` | 200,000 / 5,000,000 | Generated vertices |
| `WarningIndexCount` / `HardIndexCount` | 1,000,000 / 15,000,000 | Generated indices |
| `WarningCompactBindingCount` / `HardCompactBindingCount` | 64 / 256 | Compact material bindings |
| `WarningTotalMidCount` / `HardTotalMidCount` | 64 / 256 | Total intermediate rings/results |

## Transition Distance Settings

| Setting | Default | Purpose |
| --- | ---: | --- |
| `TransitionStartDistance` | 50,000 | Reference distance at which Ground/Proxy transition begins. |
| `ApproachStartDistance` | 75,000 | Reference distance at which approach begins; it is normally outside the transition distance. |
| `LandingSelectionDistance` | 30,000 | Distance used to choose a candidate landing Section. |
| `CameraBlendDistance` | 15,000 | Distance used for camera blending during transition presentation. |

All values must be non-negative. Actual runtime Section load and visibility alpha thresholds are owned by the Level Pair's `TransitionPolicy`.

## Preview and Build Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `bPreviewProxyRegion` | true | Shows the proxy region in Preview. |
| `bPreviewVisualBlendPadding` | true | Shows visual-blend padding. |
| `bPreviewGeometricPadding` | true | Shows geometric padding. |
| `bPreviewCompletionRegion` | true | Shows the completion region. |
| `bPreviewTransitionDistance` | true | Shows transition-distance visualization. |
| `bRealtimeMaterialPreview` | true | Refreshes material preview while settings change. |
| `PreviewDebugMode` | `FinalSurface` | Selects `FinalSurface`, `ProxyRegion`, `VisualPaddingRegion`, `GeometricPaddingRegion`, `CompletionRegion`, `BlendMask`, `LandingMask`, or `TransitionDistance`. |
| `FakeProxyRegion.ProxyUVMin` / `ProxyUVMax` | (0.35,0.35) / (0.65,0.65) | Test proxy UV rectangle used when no real Section is available. |
| `FakeProxyRegion.FakeProxyColor` | (0.1,0.6,0.2,1) | Color of the test proxy. |
| `FakeProxyRegion.FakeProxyHeightOffset` | 500 | Height offset of the test proxy. |
| `FakeProxyRegion.FakeCompletionHeightOffset` | 0 | Height offset of the test completion surface. |
| `AuthoringOutputFolder` | Empty | Output folder for generated Visual Build assets. When empty, the editor resolves a path from the target Asset. |
| `bAllowGeneratedAssetOverwrite` | false | Allows replacement of assets at the generated path. Enable it only after confirming the output target. |

## Section Settings

The Planet Asset Editor and Proxy Bake manage the Section list.

| Setting | Default | Purpose |
| --- | --- | --- |
| `SectionId` | None | Stable Section identifier within the planet. |
| `DisplayName` | Empty | Editor-facing name. Runtime identity uses `SectionId`. |
| `Placement.CenterGeo` | (0°,0°,0 cm) | Latitude, longitude, and altitude of the Section center. |
| `Placement.YawDeg` | 0° | Section rotation relative to its Surface Frame. |
| `Placement.Scale` | 1.0, greater than 0 | Uniform Section scale. |
| `Placement.LocalExtentCm` | (100,000,100,000) | Section-local X/Y half extent. |
| `Placement.bLockToSurface` | true | Locks the center to the planet-surface contract. |
| `SurfaceCorrectionSettings.Mode` | `Disabled` | Chooses `Disabled`, bake-vertex-derived `Automatic`, or direct-offset `Manual`. |
| `SurfaceClearanceCm` | 1.0, at least 0 | Additional outward clearance after Automatic moves the lowest baked vertex to the surface. |
| `ManualOffsetCm` | 0, at least 0 | Outward offset applied by Manual mode. |
| `LevelPairId` | None | Level Pair referenced by the Section. |
| `bEnabled` | true | A disabled Section is excluded from runtime presentation and travel targets. |

The Same World north-pole anchor contract locks latitude, longitude, yaw, and scale. Only Altitude remains available for Ground contact-height correction. `Bounds`, `RegionSet`, `SourceRef`, `ProxyBakeData`, rectangles, and hashes are Scan/Bake output and should not be edited manually.

## Level Pair and Transition Policy

| Setting | Default | Purpose |
| --- | --- | --- |
| `LevelPairId`, `PlanetId`, `SectionId` | None | Stable IDs joining the Pair. Let the editor and bake workflow keep them consistent. |
| `EntryMode` | `SameWorld` | Chooses same-World presentation or travel to a separate World through `LevelHandoff`. |
| `HandoffBackend` | `OpenLevel` | Records the `OpenLevel`, `SeamlessTravel`, or `PreparedMapChange` contract. PlanetX does not open the Level for you. |
| `PlanetSyncMode` | `None` | Planet Actor synchronization policy during travel. Change it only when the project explicitly requires synchronization. |
| `OrbitWorld` / `GroundWorld` | None | Same World requires the same package; Level Handoff requires two distinct, saved Worlds. |
| `bCanEnterGround` | true | Whether gameplay may enter Ground. |
| `bVisualOnly` | false | Treats the Pair as presentation-only rather than a gameplay entry target. |
| `TransitionPolicy.PreloadAlpha` | 0.0, 0–1 | Transition alpha at which Runtime Preview preload is requested. |
| `TransitionPolicy.VisibleAlpha` | 0.25, 0–1 | Alpha at which Preview becomes visible. |
| `TransitionPolicy.HideAlpha` | 0.15, 0–1 | Alpha at which Preview is hidden on return. Keep it below `VisibleAlpha` for hysteresis. |
| `TransitionPolicy.UnloadDelaySeconds` | 5 s, at least 0 | Delay before unloading a hidden Preview. |
| `TransitionPolicy.bKeepPreviewLoaded` | false | Keeps Runtime Preview resident while hidden. |
| `TransitionPolicy.GroundProxyVisibility` | `Hidden` | Chooses `Hidden`, `HorizonOnly`, or `FullProxy` for Planet/Section Proxy visibility while Ground is active. |

## Surface Preset

| Setting | Default | Purpose |
| --- | --- | --- |
| `PresetId` | None | Preset identifier. |
| `DisplayName` | Empty | Editor-facing name. |
| `PresetType` | `Custom` | Preset classification. |
| `CompletionSettings` | Structure defaults | The completion settings documented above. |
| `PaddingSettings` | Structure defaults | The padding settings documented above. |
| `BaseSurfaceMaterial` | None | Base surface material supplied by the preset. |
| `OptionalBiomeMask` | None | Optional biome-mask texture. |
| `OptionalHeightMask` | None | Optional height-mask texture. |

After assigning `ActiveSurfacePreset` to a Planet Asset, inspect the effective build input in Preview and run Apply & Build.

## Planet Asset setting-group names

In Details and the API, `AuthoringGeometrySettings`, `SurfaceCompletionSettings`, `ProxyPaddingSettings`, `TransitionDistanceSettings`, and `ShapeEditorSettings` own the corresponding groups above. `ProxyPaddingSettings.PerformanceBudget` owns the Padding Warning/Hard limits.
