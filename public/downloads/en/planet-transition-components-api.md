# Planet and Transition Component API

## UPlanetXPlanetComponent

Header: `PlanetX/Components/PlanetXPlanetComponent.h`

| Return | Functions |
| --- | --- |
| `bool` | `RegisterToPlanetXRuntime`, `RefreshRuntimeRegistration`, `GetGravityAccelerationAtWorldLocation` |
| `void` | `UnregisterFromPlanetXRuntime`, `SetTransitionMorphAlpha`, `SetTransitionMorphActive`, `SetTransitionMorphVisible`, `SetTransitionMorphState` |
| value or object | `GetPlanetId`, `GetPlanetBindingId`, `GetPlanetAsset`, `GetPlanetToWorldTransform`, `GetGravitySettings`, `GetTransitionMorphState` |

Registration requires a valid World, Planet Asset, and identity. When several components share a Planet ID, use the Binding ID for deterministic lookup.

## UPlanetXPlanetProxyComponent

Header: `PlanetX/Components/PlanetXPlanetProxyComponent.h`

### Planet-wide presentation

- Set or read sources with `SetPlanetAsset`, `GetPlanetAsset`, `SetPlanetMaterialOverride`, `GetPlanetMaterialOverride`, `SetPlanetSphereMeshOverride`, and `GetPlanetSphereMeshOverride`.
- Rebuild or clear presentation with `RefreshProxy`, `RebuildPlanetProxy`, `RebuildSectionProxiesFromPlanetAsset`, and `ClearSectionProxies`.
- Control visibility with `SetPlanetProxyVisible`, `SetSectionProxiesVisible`, `SetSectionProxyMorphAlpha`, and `GetSectionProxyMorphAlpha`.
- Inspect presentation with `GetPlanetSphereComponent`, `GetSectionProxyResidencyState`, and `GetSectionProxyRealizedComponentCount`.

`RebuildSectionProxiesFromPlanetAsset` returns the number created. The other rebuild, clear, and visibility commands in this group return `void`; inspect residency and counts afterward when the result matters.

### Section and layer presentation

| Return | Functions |
| --- | --- |
| `int32` | `SetSectionProxyBakeData`, `ClearSectionProxyBakeData`, `SetProxyLayerVisible`, `SetSectionProxyPartitionVisible`, `RemoveProxyLayer`, `GetSectionProxyLayerCount`, `GetProxyLayerCount` |
| `bool` | `SetSectionProxyLayer`, `SetSectionProxyMesh`, `RemoveSectionProxyLayer`, `SetSectionProxyLayerVisible`, `HasSectionProxyLayer` |
| `void` | `RemoveSectionProxyLayers` |
| array | `GetSectionProxyLayerIds`, `GetSectionProxySectionIds` |

Count-returning mutations use the affected-entry count; `0` means no matching entry was changed. Boolean mutations report whether their requested operation succeeded.

Debug presentation uses `SetDebugOverlaySettings`, `GetDebugOverlaySettings`, and `SetDebugOverlaysVisible`.

## UPlanetXTransitionMorphComponent

Header: `PlanetX/Components/PlanetXTransitionMorphComponent.h`

| Return | Functions |
| --- | --- |
| `void` | `SetProxyBakeData`, `SetProxyMeshOverride`, `SetTransitionResources` |
| object | `GetProxyBakeData`, `GetProxyMeshOverride`, `GetTransitionResources` |
| `bool` | `HasCompatibleTransitionResources`, `IsUsingGpuMorph`, `IsUsingStaticMeshGpuMorph`, `HasRenderableTransitionPresentation` |
| `void` | `BuildMorphMesh`, `ApplyMorphState`, `SetTransitionAlpha`, `SetTransitionActive`, `SetMorphVisible`, `ApplyMorphRenderPolicy` |

Build and apply commands are `void`; use compatibility and renderability queries to verify the selected presentation path.

## Viewpoint and Travel Receiver

`UPlanetXViewpointComponent` is declared in `PlanetX/Components/PlanetXViewpointComponent.h`. `GetTransitionFrame` and `MapViewDirectionToMovement` return `bool`; use their outputs only after success.

`UPlanetXTravelReceiverComponent` is declared in `PlanetX/Components/PlanetXTravelReceiverComponent.h`. It has no Blueprint-callable functions. Configure `bAutoResumePendingTravel`, `bApplyControlRotation`, and `ArrivalRetryTimeoutSeconds`; inspect `bLastResumeSucceeded`, `LastResumeError`, and `State`, or bind `OnTravelResumed` and `OnTravelResumeFailed`. The component does not own level opening, spawning, possession, or GameMode selection.
