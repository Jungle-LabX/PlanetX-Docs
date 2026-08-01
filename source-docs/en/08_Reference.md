# Reference

[Previous: Optimization](07_Performance_and_Optimization.md) · [Documentation Home](../../PlanetX_User_Guide_EN.md) · [Next: Troubleshooting](09_Troubleshooting.md)

## Proxy Bake UI

| Area | Main items |
|---|---|
| Target | Planet Asset, Target Section Name, Rename/Use on Bake |
| Runtime Role | Same World, External Level, Ground/Orbit World |
| Source Scope | Selected Actors, Current Level, Loaded Levels, Reviewed Set |
| Output Plan | Sources, partitions, geometry mix, Bake ID, output path |
| Review | Use, Owner, Component, Role, Assignment, Reason, Partitions |
| Advanced | Partition X/Y, Planet Radius, Source Grid, Surface Datum |
| Budget | Auto Memory, Safe/High Utilization, Workers, Queue, GT Finalize |
| Actions | Refresh, Plan, Clear, Logs, In Editor/External Bake |

## Planet Asset Editor

| Tab | Purpose |
|---|---|
| Overview | Identity and readiness |
| Sections | Rename, Delete, Runtime Role, Bake/Level Pair |
| Configuration | Authoring and visual settings |
| Preview | Saved-result preview |
| Diagnostics | Topology and link validation |

## Main runtime types

- `APlanetXPlanetActor`
- `APlanetXTransitionEndpoint`
- `APlanetXEnvironmentManager`
- `UPlanetXCoordinateComponent`
- `UPlanetXMovementComponent`
- `UPlanetXViewpointComponent`
- `UPlanetXTravelReceiverComponent`

## Public API

Game code uses `UPlanetXSubsystem`.

Entry/Travel:

- EnterGroundSameWorld / ReturnToOrbitSameWorld
- PrepareTravel / ResumePendingTravel
- Begin/Resolve/Complete/Cancel LevelHandoff

Runtime Preview:

- LoadRuntimePreview
- SetRuntimePreviewVisible
- UnloadRuntimePreview
- GetRuntimePreviewStatus

Coordinate/Surface:

- CaptureActorPlanetXTransform
- ResolvePlanetXTransform
- ApplyPlanetXTransformToActor
- QuerySurfaceAtWorldRay/Geo/PlanetXTransform
- BuildLandingTransform

Query/Diagnostics:

- GetActorRuntimeContext
- GetMovementRuntimeState
- GetTransitionRuntimeResult
- GetSectionDesc/GetSectionTransform
- GetLevelPair/GetLevelPairForSection
- ValidatePlanetAsset
- DiagnoseProxySync
- ResolvePlanetAlignmentForSection

## Console Variables

| CVar | Purpose |
|---|---|
| `PlanetX.MemoryBudgetMB` | PlanetX memory-stat budget |
| `px.Material.DebugMode` | Development material-debug override |
| `px.Material.UseLegacyPath` | Development legacy-path comparison |

## Generated layout

```text
/Game/PlanetX/ProxyBake/{PlanetAsset}/{GroundLevel}/
├─ DA_PXBake_{BakeId}
├─ {BakeDataName}_RuntimePreview
└─ Revisions/{RevisionId}/
   ├─ Meshes/
   └─ Payloads/
```

Logs and jobs:

```text
Saved/Logs
Saved/PlanetXProxyBake
Saved/PlanetX/ProxyBake/PartitionSpool
Saved/PlanetX/ProxyBakeRollback
```

