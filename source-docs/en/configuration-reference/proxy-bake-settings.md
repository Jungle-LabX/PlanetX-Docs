# Proxy Bake Settings

Basic/Advanced view state, Bake Quality, and the requested Source Representation are stored as editor-user settings.

## 1 Target Planet Asset

| Setting | Purpose |
| --- | --- |
| `Planet Asset` | Owns the generated Section and bake link. It supplies planet radius, output identity, projection context, and the final `ProxyBakeData` link. |

Changing the Planet Asset or Source World makes the existing Scan plan stale. Run **Scan Sources** again for the new target.

## 2 Runtime Role

| Setting | Default | Purpose |
| --- | --- | --- |
| `Presentation` | `Same World` | `Same World` keeps Planet and Ground in one World package and changes presentation. `External Level` is the UI name for code-level `LevelHandoff`; it uses a separate Ground World and a visual-only Runtime Preview World. |
| `Ground World` | Current Source World | Read-only value resolved from the World being scanned and baked. |
| `Planet World` | None | Shown only for External Level. Select the Orbit World that owns the destination Planet Actor on return from Ground. It must be a saved World distinct from Ground World. |

The default Level Handoff backend contract is `OpenLevel`. PlanetX captures and resumes state, but the game remains responsible for Open Level, Pawn creation, and possession.

## 3 Source Scope

| Setting | Default | Purpose |
| --- | --- | --- |
| `Selected Actors` |  | Scans only Actors currently selected in the Outliner or viewport. Appropriate for deliberate partial bakes. |
| `Current Level` | Selected | Scans Actors owned by the current persistent Level and excludes streaming Levels. |
| `Loaded Levels` |  | Scans the current Level, loaded streaming Levels, and Level Instances. |
| `Reviewed Set` |  | Reuses stable source membership explicitly reviewed in the current plan. Complete a Scan with another scope first. |
| `Source Representation: Prefer HLOD` | Selected | Prefers validated World Partition HLOD and falls back to original Actors when the source contract requires it. |
| `Source Representation: Original Actors` |  | Uses original Actors and Components only. This is useful for HLOD comparison or fidelity diagnosis. |
| `Include all tags` | Empty | Includes only sources whose Actor has every comma-separated tag. Empty means no include filter. |
| `Exclude any tag` | Empty | Excludes a source when its Actor has any listed tag. |

Contracts that require exact membership—Selected Actors, Reviewed Set, or tag filtering—may resolve an effective Original Actors policy even when Prefer HLOD was requested. Check the requested/effective summary in the UI.

## Source Review

| Field | Purpose |
| --- | --- |
| `Use` | Includes or excludes the source from the current bake. |
| `Role: Auto` | Uses the role selected by Scan classification. |
| `ProxyGeometry` | Builds ordinary geometry, such as Static Mesh content, into proxy meshes. |
| `LandscapeProxy` | Uses the Landscape-specific capture and material path. |
| `InstanceBatch` | Publishes repeated ISM/HISM/Foliage instances as batch output. |
| `Discard` | Intentionally omits the source from output. |
| `ManualReview` | Scan could not establish safety automatically. Review the reason, then repair or exclude it. |
| `Unsupported` | The current pipeline cannot publish the source safely. Leaving it enabled blocks Bake. |
| Group Scope | Applies review changes by Actor, Folder, Data Layer, or Level/Level Instance. |

After changing `Use` or `Role`, choose **Apply Source Changes** to rebuild the plan. Safety findings for WPO/displacement, private material dependencies, or unsupported deformation can be blocking decisions rather than informational warnings.

## Bake Quality

Quality is an immutable authoring preset recorded in the generated revision.

| Preset | Static Mesh triangle budget | Projection scale / max segments | Landscape spacing / resolution |
| --- | ---: | ---: | ---: |
| Low | 1× coarsest LOD | 4.0 / 8 | 800 cm / 17–129 |
| Medium | 2× coarsest LOD | 2.0 / 12 | 600 cm / 25–193 |
| High (Recommended) | 4× coarsest LOD | 1.0 / 16 | 400 cm / 33–257 |

High does not mean an unbounded source LOD. It selects the finest valid LOD within a multiple of the coarsest valid LOD's triangle count, keeping geometry growth bounded.

## Advanced Projection and Output Plan

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `Partition X`, `Partition Y` | Plan value, at least 1 cm | Output partition dimensions. They are disabled while World Partition auto-sizing is active. |
| `Planet Radius` | Target Asset value, read-only | Radius in centimeters used by AEQD projection, curvature classification, and subdivision. |
| `Source Grid` | false | Uses source Landscape vertex resolution instead of the low proxy grid. It can substantially increase output and processing cost. |
| `Surface Datum World Z: Auto` | On | Uses the minimum World Z of participating source bounds as altitude zero and the Ground Sync datum. |
| `Surface Datum World Z` | Plan value, cm | Manual world-space Z treated as altitude zero when Auto is off. Changing it requires plan recalculation. |
| `Auto-size World Partition Output` | true for WP | Derives PlanetX output-shard dimensions from source bounds and work density. It does not mirror World Partition cells one-to-one. |
| `Recalculate` |  | Recomputes the automatic grid from the latest Scan. |

Output path, Target Section, Bake ID, and Source/Partition/Geometry summaries are resolved results. If the target conflicts with an existing asset, the editor requires explicit overwrite or rebuild consent.

## Advanced Execution Budget

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `Auto Memory Budget` | true | Resolves a safe RAM budget from currently available physical memory. Recommended for ordinary work. |
| `Safe` | Selected | Keeps 4 GiB of physical memory unavailable to Proxy Bake. |
| `High Utilization` |  | Keeps only 1 GiB free. Select it explicitly for a dedicated bake run; commit and finalization guards remain active. |
| `Manual GiB` | Disabled under Auto, 0.5–1024 | Total manual memory budget used when Auto is off. |
| `Workers` | 0, 0–64 | Geometry worker limit. Zero lets the memory governor choose concurrency. |
| `Queued` | 8, 1–128 | Maximum number of bounded work packets waiting concurrently. |
| `GT Finalize` | 4, 1–32 | Maximum Game Thread publication/finalization backlog. |
| `Worker Geometry` | true | Runs value-only geometry on worker tasks while UObject reads and publication stay on the Game Thread. |

Higher values are not always faster. After Scan, review the top contributor and remediation text. For memory pressure, inspect Auto Memory Budget and the partition plan before increasing worker, queue, or finalization limits.

## Public advanced option: `FPlanetXProxyBakePartitionDesc`

This structure is the projection contract used by Transition Morph and public C++ paths. The ordinary editor workflow generates it from the target Asset and plan.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PartitionOrigin` | (0,0,0) | Origin of the flat partition frame. |
| `PartitionEast` / `PartitionNorth` / `PartitionUp` | Forward / Right / Up | Orthogonal axes of the partition frame. |
| `PlanetRadius` | 100,000, at least 1 | Planet radius for curved projection. |
| `PartitionRadius` | 10,000, at least 1 | Valid radius of the partition. |
| `SphereLatitudeSegments` / `SphereLongitudeSegments` | 250 / 250, at least 3 | Fixed sphere-surface sampling resolution. |

## Public advanced option: `FPlanetXProxyBakeOptions`

The editor quality preset and source classifier resolve these values in the normal user workflow. Set them directly only in a tool that calls the public API.

| Setting | Default | Purpose |
| --- | --- | --- |
| `LODIndex` | 0, at least 0 | Explicit Static Mesh source LOD. Do not mix it with editor quality selection unintentionally. |
| `bSkipHiddenComponents` | true | Omits hidden Components. |
| `bWarnOnNonUniformScale` | true | Reports non-uniformly scaled sources. |
| `bSkipNoBakeTaggedActors` | true | Omits Actors carrying the PlanetX NoBake tag. |
| `bRequireBakeSourceTagForSingleLevel` | false | Requires the BakeSource tag even for a single-Level bake. |
| `bFailOnAeqdRangeExceeded` | true | Fails outside the safe AEQD projection range. Keeping the default avoids silently publishing distorted output. |
| `bClipTrianglesToPartitionRadius` | false | Clips triangles at the partition radius. Use only for output intentionally different from canonical ownership. |
| `LandscapeProxyMaterial` | None | Fallback when the source Landscape material cannot be used by a Static Mesh proxy. |
| `SubdivisionWorldStep` | 275 cm, at least 0 | Base world-space subdivision interval. |
| `AdaptiveSubdivisionMaxProjectedEdgeDeviationCm` | 5 cm, at least 0 | Allowed curved-projection edge deviation. |
| `MaxSubdivisionDivisionsPerTriangle` | 24, at least 1 | Subdivision limit for one source triangle. |
| `MaxOutputTrianglesPerBakeJob` | 5,000,000, at least 1 | Final triangle safety limit for one bake job. |

`FPlanetXProjectionResult`, material remaps, heightfields, mesh pages, partition output, and instance-batch structures are generated payloads. They are not user settings even where their properties are reflected.
