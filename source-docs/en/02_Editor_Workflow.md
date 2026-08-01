# Editor Workflow

[Previous: Quick Start](01_Getting_Started.md) · [Documentation Home](../../PlanetX_User_Guide_EN.md) · [Next: Runtime Integration](03_Runtime_Integration.md)

## Basic flow

```text
Refresh → Source Review → Output Plan → Bake → Sections/Diagnostics
```

## Source Scope

| Scope | Use |
|---|---|
| Selected Actors | Test a small set |
| Current Level | Bake the current Level |
| Loaded Levels | Bake loaded Levels |
| Reviewed Set | Reuse confirmed source membership |

Use `Refresh` after changing selection, tags, Levels, or settings.

`PlanetX.NoBake` and `PlanetX.ProxyBakePreview` exclude an Actor or Component.

## Source roles

| Role | Processing |
|---|---|
| ProxyGeometry | Curved proxy geometry |
| LandscapeProxy | Landscape-specific path |
| InstanceBatch | ISM/HISM, Foliage, repeated or small rigid meshes |
| Discard | User exclusion, tiny detail, or world-scale helper |
| ManualReview | User decision required, such as WPO/displacement |
| Unsupported | Unsupported Component or invalid payload/LOD |

Non-instanced Static Meshes at or below 80 cm maximum size are discarded as Tiny. ISM/HISM and Foliage remain InstanceBatch candidates.

## Main settings

| Setting | Purpose | Recommended start |
|---|---|---|
| Planet Radius | AEQD curvature, edited on Planet Asset | Real planet radius |
| Surface Datum World Z | Altitude zero | Auto |
| Source Grid | Original Landscape vertex grid | Off for preview |
| Partition X/Y | Output region size | Automatic plan |
| Memory Budget | Bake RAM limit | Auto + Safe |
| Workers | Geometry worker count | 0 (automatic) |

Smaller partitions reduce loading granularity but create more assets, seams, and finalization work.

## Bake modes

- `BAKE IN EDITOR`: rapid iteration and small-to-medium sources
- `BAKE IN EXTERNAL PROCESS`: large World Partition and high-memory work

Save Maps and assets before External Bake. Use `ACTIVE BAKE`, `Saved/Logs`, and `Saved/PlanetXProxyBake` for status.

## Output states

| State | Action |
|---|---|
| NEW OUTPUT | Bake a new result |
| UP TO DATE | Use it or confirm Force Rebuild |
| REBAKE REQUIRED | SourceHash changed; bake again |
| LEGACY HASH | Refresh to the current contract |
| TARGET CONFLICT | Resolve the path/identity conflict |
| SCAN OUT OF DATE | Refresh |

## Section management

- A new In Editor Bake applies `Target Section Name` when the Section is created.
- `Rename` changes only an existing Section's Display Name.
- Internal Section ID includes a source World path hash and remains stable.
- `Delete Selected Section` removes the Section and Level Pair, not generated asset files.
- A Planet Asset can have at most one enabled Same World Level Pair.

Supporting tools:

- `PlanetX Mode`: Planet/Compare/Level views and authoring palettes
- `Visual Editor`: Section Placement, Surface Correction, and visual preview

