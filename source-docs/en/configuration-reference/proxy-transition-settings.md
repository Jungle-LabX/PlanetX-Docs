# Proxy, Morph, and Preview Settings

Use runtime-budget overrides only for diagnostics or an explicit per-Actor requirement; ordinary content should follow Project Settings.

## Planet Proxy Component

### Presentation and generation

| Setting | Default | Purpose |
| --- | --- | --- |
| `bShowPlanetProxy` | true | Shows the whole-planet proxy, including completion. |
| `PlanetSphereMeshOverride` | None | Advanced Static Mesh used instead of the generated planet visual. |
| `bReversePlanetSphereCulling` | false | Reverses sphere culling. Use it only for an asset whose winding/material contract requires the opposite direction. |
| `bShowSectionProxies` | true | Shows baked Section Proxy layers. |
| `bEnableRuntimeSurfaceCutout` | true | Cuts the planet surface under Section regions at runtime. |
| `bEnableRuntimeProxyPadding` | true | Generates/shows runtime proxy padding while Surface Cutout is enabled. |
| `bAutoRebuildSectionProxiesFromPlanetAsset` | true | Rebuilds proxy layers when Section or bake links change on the Planet Asset. |
| `bAutoRefreshOnRegister` | true | Refreshes presentation from Asset and runtime state when the Component registers. |
| `FallbackRadiusCm` | 100,000 cm, at least 1 | Radius used when a valid Planet Asset radius cannot be resolved. |

### Section Proxy Layer Descriptor

The ordinary workflow generates these entries from the Planet Asset and bake output. Edit them only in an advanced manual construction path.

| Setting | Default | Purpose |
| --- | --- | --- |
| `SectionId` / `LayerId` | None | Stable identities of the owning Section and the layer. |
| `Mesh` / `Material` | None | Layer Static Mesh and optional Material override. |
| `RelativeTransform` | Identity | Layer transform relative to the Planet Proxy Component. |
| `bLayerVisible` | true | Controls visibility of the individual layer. |
| `bPartitionScoped` | false | Couples residency/culling of the layer to a bake partition. |
| `PartitionCoord` | (0,0) | Partition coordinate for a partition-scoped layer. |

### Section Proxy Runtime Budget Override

When `bOverrideSectionProxyRuntimeBudget=false`, the Component uses the project Runtime Budget.

| Setting | Default | Purpose |
| --- | ---: | --- |
| `MaximumSectionProxyPayloadsPerRequest` | 8 | Child payload packages retained by one request. |
| `MaximumSectionProxyDependenciesPerRequest` | 64 | Mesh/material dependencies in one streamable batch. |
| `MaximumSectionProxyComponentsPerFrame` | 2 | New render Components created in one Game Thread frame. |
| `MaximumSectionProxyInstancesPerFrame` | 512 | Instance transforms validated and uploaded in one frame. |
| `MaximumSectionProxyCorrectionVerticesPerFrame` | 4,096 | Morph vertices inspected by Automatic Surface Correction in one frame. |
| `SectionProxyRealizationTimeBudgetMs` | 2.0 ms, at least 0.1 | Shared frame-time limit for correction scanning and Component/Instance realization. |

### Surface Correction Override

| Setting | Default | Purpose |
| --- | --- | --- |
| `bOverrideSectionSurfaceCorrectionSettings` | false | Uses this Actor-wide override instead of per-Section Planet Asset settings. |
| `SectionSurfaceCorrectionMode` | `Disabled` | Chooses `Disabled`, lowest-bake-vertex `Automatic`, or fixed-offset `Manual`. |
| `SectionSurfaceClearanceCm` | 1 cm, at least 0 | Additional outward clearance in Automatic mode. |
| `ManualSectionSurfaceCorrectionCm` | 0 cm, at least 0 | Outward offset applied to all Section Proxies in Manual mode. |

### Debug Overlay

`DebugOverlaySettings` owns the visualization values below.

| Setting | Default | Purpose |
| --- | --- | --- |
| `bShowSectionBounds` | false | Shows Section bounds. |
| `bShowSectionFrames` | false | Shows Section-local frame axes. |
| `FrameAxisLengthCm` | 1,000 cm, at least 1 | Length of displayed frame axes. |

## Transition Morph Component

### Source and morph geometry

| Setting | Default | Purpose |
| --- | --- | --- |
| `ProxyBakeData` | None | Bake Data supplying flat/curved morph payload. A Transition Resource Set normally connects it. |
| `ProxyMeshOverride` | None | Advanced source mesh used instead of the Bake Data proxy mesh. |
| `SourceLODIndex` | 0, at least 0 | LOD read from the override/source mesh. |
| `bUseProxyMeshMaterials` | true | Uses material slots from the source proxy mesh. |
| `TransitionAlpha` | 0, 0–1 | Position along the morph. Runtime transition normally updates it. |
| `bAutoRebuildOnRegister` | true | Rebuilds render/morph representation on registration. |
| `bUseBakeDataPartitionDesc` | true | Uses the projection frame and radius stored in Bake Data. |
| `bOverridePlanetRadius` | false | Uses `PlanetRadiusOverride` instead of the bake/planet radius. Outside diagnostics, this can violate the authored contract. |
| `PlanetRadiusOverride` | 100,000 cm, at least 1 | Curvature radius while override is enabled. |
| `ManualPartitionDesc` | Structure defaults | Origin, East/North/Up axes, radii, and sphere segments used when Bake Data Partition is disabled. |
| `bUseProxyBoundsCenterAsPivot` | false | Uses source-proxy bounds center as morph pivot. |
| `bMoveComponentToPivotOnBuild` | false | Moves the Component itself to the resolved pivot during build. Keep it off when an external transform contract owns placement. |
| `bUseTangentPreservingCurvature` | true | Uses the curvature path that preserves tangent direction and shading continuity. |

### GPU WPO Morph

| Setting | Default | Purpose |
| --- | --- | --- |
| `bUseGpuWpoMorph` | true | Prefers Material WPO-based GPU morphing. |
| `bPreferStaticMeshComponentForGpuMorph` | true | Prefers a StaticMesh Component on the GPU path. |
| `bFallbackToDynamicMeshWhenStaticGpuMorphInflates` | true | Falls back to Dynamic Mesh when rendered Static Mesh vertices exceed the permitted ratio. |
| `StaticGpuMorphMaxRenderVertexRatio` | 1.25, at least 1 | Maximum rendered-to-source vertex ratio for the Static GPU path. |
| `bBuildTransientStaticMeshForGpuMorph` | false | Builds a transient Static Mesh when no GPU asset is assigned. Consider runtime cost and lifetime. |
| `GpuMorphStaticMeshAsset` | None | Prebuilt Static Mesh for GPU morphing. |
| `GpuMorphMaterialOverride` | None | One GPU morph Material override for every slot. |
| `GpuMorphMaterialOverrides` | Empty | Per-slot GPU morph Material overrides; these are more specific than the single override. |
| `GpuMorphAlphaParameterName` | `PlanetXMorphAlpha` | Scalar Material parameter receiving Transition Alpha. It must match the Material exactly. |

### GPU Render Pass Policy

These options affect only PlanetX-owned Transition Morph render Components.

| Setting | Default | Purpose |
| --- | --- | --- |
| `MorphShadowMode` | `FullMorphMesh` | Disables morph shadows or renders the complete morph representation into shadows. |
| `MorphRayTracingMode` | `EvaluateWpo` | Chooses `Disabled`, `StaticGeometry` without WPO, or the more expensive `EvaluateWpo`. |
| `MorphVelocityMode` | `Enabled` | Enables velocity output for accurate motion vectors and temporal effects. |
| `MorphDepthPassMode` | `Enabled` | Enables the depth pass for depth-effect compatibility. |

### Morph performance and visibility

| Setting | Default | Purpose |
| --- | --- | --- |
| `MinimumAlphaChange` | 0.002, 0–1 | Skips a morph update when alpha changes by less than this amount. |
| `bUpdateNormalsDuringMorph` | false | Updates normals with positions on CPU/Dynamic paths. It may improve quality at additional cost. |
| `bUseFastPositionUpdates` | true | Uses position-only updates without rebuilding topology. |
| `bCollectRuntimeMorphDiagnostics` | false | Collects runtime morph diagnostics. Enable it only when needed during performance investigation. |
| `bOverrideTransitionRuntimeBudget` | false | Uses the following Transition-specific values instead of Project Runtime Budget. |
| `MaximumTransitionDependenciesPerRequest` | 64, 1–512 | Dependency limit for one Transition stream request. |
| `MaximumTransitionComponentsPerFrame` | 2, 1–64 | Transition render Components realized in one frame. |
| `TransitionRealizationTimeBudgetMs` | 2.0 ms, 0.1–10 | Game Thread time limit for Transition realization. |
| `bVisibleOnlyDuringTransition` | true | Shows the Morph Component only during Transition state. |
| `bTransitionActive` | false | Current transition-presentation state. Runtime normally owns it, though it is available for manual testing. |

## Runtime Preview Actor

External Level Proxy Bake creates this Actor in the Preview World. It is not a gameplay Actor, and the generation pipeline owns its `PreviewBakeData` link.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PreviewBakeData` | None | Visual-only Bake Data loaded when the Preview World streams in. |
| `bOverrideRuntimeBudget` | false | Uses this Preview Actor's values instead of Project Runtime Budget. |
| `MaximumPayloadsPerRequest` | 8, at least 1 | Child payload limit for one request. |
| `MaximumDependenciesPerRequest` | 64, at least 1 | Dependency limit for one streamable batch. |
| `MaximumComponentsPerFrame` | 2, at least 1 | Component creation limit per frame. |
| `MaximumInstancesPerFrame` | 512, at least 1 | Instance realization limit per frame. |
| `RealizationTimeBudgetMs` | 2.0 ms, at least 0.1 | Frame-time limit for Preview realization. |

Do not duplicate GameMode, Pawn, Controller, gameplay Actor logic, navigation, or Ground gameplay collision into Runtime Preview. Those remain the responsibility of the actual Ground World.
