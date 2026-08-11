# Proxy Bake Editor

Proxy Bake Editor collects visual sources from a Ground World and publishes orbit proxies, partition payloads, Runtime Preview data, and transition resources.

## Choose the correct entry path

Use one of these paths according to the current Asset state.

| Situation | Entry path | Section selection |
| --- | --- | --- |
| First Section for a new Planet Asset | Open the saved Ground Level, then use **Tools > PlanetX section > Proxy Bake Editor** | No Section exists yet; Scan derives the target and the first successful Bake creates it |
| Rebuild an existing Section | Open Planet Asset Editor > **Sections**, select the Section, then choose **Open Proxy Bake** | The selected Section is the rebuild target |
| Diagnostics repair | Open Planet Asset Editor > **Diagnostics > Open Proxy Bake** | Use only after reviewing the reported finding |

First-time users should follow [Start Here — Same World Quick Start](/docs/en/quick-start-same-world) and use only the first row.

## First-Bake workflow

1. Open and save the Ground Level.
2. Open Proxy Bake Editor from the **Tools** menu's PlanetX section.
3. Select the target Planet Asset, set Presentation to **Same World**, and set Source Scope to **Current Level**.
4. Run **Scan Sources** (`F5`). Confirm at least one enabled source and `NEW OUTPUT`.
5. Review source roles, omissions, and Output Plan. Apply Source Changes if you edited Use or Role.
6. Run **BAKE IN EDITOR** (`Ctrl+B`). A successful result starts with `Bake complete.` and creates the Section and Level Pair automatically.

## Existing-Section workflow

1. Open Planet Asset Editor > **Sections**.
2. Select the Section to rebuild.
3. Choose **Open Proxy Bake**.
4. Run **Scan Sources** (`F5`) to refresh sources and the Bake plan.
5. Review changes and run **REBUILD IN EDITOR** or **BAKE IN EDITOR** as shown.

Use `Esc` to request cancellation and `Ctrl+Shift+O` to select results.

Operations that need to change the Source Level cannot start during PIE. While an external worker is active, do not open its Source World directly; request cancellation through the editor.

## Success checkpoints

| Stage | Required result |
| --- | --- |
| Scan | Header shows `SUCCESS`; enabled source count is greater than zero |
| Plan | No `SCAN OUT OF DATE` or `TARGET CONFLICT` |
| Bake | `Bake complete.` or reviewed `Bake complete with warnings` |
| Planet Asset > Sections | Bake is `Linked`; Transition is `Ready` or `Same World` |

## External Bake Monitor

Enable **Open Bake Monitor in browser** in the External Bake confirmation to open a local browser view of stages, progress, ETA, resource usage, warnings, and bounded log tails. The Monitor is an observer: if its service or browser cannot open, External Bake continues and its result is unchanged.

The loopback Monitor service is part of the `PlanetXEditor` module and runs inside the active Editor or direct Worker process. PlanetX does not install or launch a separate Monitor executable. The service accepts local connections only and authorizes its browser page with a per-session token. Do not share or publish the complete Monitor URL.

The direct Worker hosts the Monitor during an active External Bake. When the Worker exits, that service ends and an existing tab can disconnect. After Unreal Editor restarts, use **Open External Bake Monitor** to host the latest durable result again. The new service reconstructs state from the Job artifacts; the previous browser tab is not migrated automatically.

Closing the tab never cancels the Bake. Use **Cancel Bake** in the Monitor or the Editor cancellation action to request cancellation at a safe checkpoint. A cancellation request does not publish partial output.

## Supported sources

| Component | Handling |
| --- | --- |
| LandscapeComponent | Landscape pass |
| FoliageInstancedStaticMeshComponent | Foliage pass |
| HISM / ISM | Instances pass |
| StaticMeshComponent | RigidMesh pass |
| SplineMeshComponent | Deformation extraction unsupported; omission |

Discovery also checks saved PCG managed resources and HLOD validity. If HLOD validation is incomplete, original sources are used conservatively.

## Roles and tags

The editor exposes Auto, ProxyGeometry, LandscapeProxy, InstanceBatch, Discard, ManualReview, and Unsupported roles. Sources can be grouped by Actor, Folder, Data Layer, or Level/Level Instance.

The C++ tag API provides BakeSource, NoBake, Preview, and Generated tags. Use explicit exclusion as an intentional source policy, not as a way to conceal omissions.

## Result interpretation

Succeeded means publication completed without omissions. CompletedWithWarnings means publication succeeded but SourceOmissions require review. Packages over 512 MiB produce warnings; publication is rejected over 1 GiB.
