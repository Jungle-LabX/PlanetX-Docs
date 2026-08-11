# Runtime Preview and Budget

Runtime Preview is a gameplay-independent render host used to present an External Level Section's Ground content in Orbit or Transition worlds.

## Loading lifecycle

`APlanetXRuntimePreviewActor` can move through Idle, LoadingRoot, LoadingPayloads, LoadingResources, Realizing, WaitingForRender, Resident, and Failed residency states.

The Game Instance facade provides:

- LoadRuntimePreview
- SetRuntimePreviewVisible
- UnloadRuntimePreview
- GetRuntimePreviewStatus

When controlling an actor directly, use AssignPreviewBakeData, LoadPreviewFromBakeData, SetPreviewVisible, UnloadPreview, and the renderable and component-count queries.

## Presentation boundary

Runtime Preview realizes proxy Static Meshes and baked ISM/HISM/Foliage instance batches under one root. It intentionally excludes gameplay-actor duplication, collision, navigation, and tick-based behavior.

Loaded and Renderable are different. A Resident preview can still require render-resource readiness before presentation switches.

## Runtime Budget

**PlanetX Runtime** project settings select Follow Engine Scalability or a fixed profile. Proxy Bake Quality is immutable geometry quality for a published revision; Runtime Budget controls per-frame realization and residency work. They are independent.

## Observation

Use `Stat PlanetXMemory`, `Stat PlanetXResources`, `Stat PlanetXProxy`, and `Stat PlanetXRuntime` to inspect memory, resources, rendering, and runtime-service cost. Also review `PlanetX.MemoryBudgetMB` and automatic-material MID budget warnings.
