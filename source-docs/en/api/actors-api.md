# Actor API

## APlanetXPlanetActor

Header: `PlanetX/Actors/PlanetXPlanetActor.h`

`RegisterToPlanetXRuntime` returns whether registration succeeded. `UnregisterFromPlanetXRuntime` returns `void`. Both are in the `PlanetX|Planet` Blueprint category.

The actor exposes Blueprint-read-only references to `Root`, `PlanetComponent`, `PlanetProxyComponent`, `TransitionMorphComponent`, `SkyAtmosphereComponent`, and `VolumetricCloudComponent`. Assign the Planet Asset through the Planet Component and keep Planet and Binding IDs unambiguous.

## APlanetXTransitionEndpoint

Header: `PlanetX/Actors/PlanetXTransitionEndpoint.h`

This actor has no Blueprint-callable functions. Its reflected properties define the authoring contract:

| Properties | Purpose |
| --- | --- |
| `PlanetId`, `SectionId`, `LevelPairId`, `EndpointRole` | Identifies the endpoint and whether it represents Orbit or Ground. |
| `PlanetAsset`, `PlanetActor`, `EnvironmentManagerActor` | Links policy data and participating actors. `PlanetActor` applies to Orbit endpoints. |
| `CoordinateComponent` | Holds the endpoint's canonical reference and pose. |
| `TransitionCylinder` | Defines the transition region. |
| `bAutoSizeTransitionCylinderToSectionBounds` | Derives the cylinder from Section bounds when enabled. |
| `RuntimeAlphaUpdateThreshold` | Limits small runtime alpha updates. |

IDs must match a real Section and Level Pair in the resolved Planet Asset. Ground endpoints require the Planet Asset; Orbit endpoints can infer it from the Planet Actor when available.

## APlanetXEnvironmentManager

Header: `PlanetX/Actors/PlanetXEnvironmentManager.h`

`ValidateEnvironmentBinding` is the only main environment command that returns `bool`. Use it before the `void` mutation functions and resolve reported binding problems first.

| Return | Functions |
| --- | --- |
| `bool` | `ValidateEnvironmentBinding` |
| `void` | `CaptureEnvironmentStateFromBindings`, `ApplyEnvironmentState`, `SetEnvironmentTransition`, `ApplyInitialRuntimeSpace` |
| `void` | `ApplyOrbitCloudRenderQualityOverride`, `RestoreSourceCloudRenderQuality` |
| `void` | `ApplyOrbitAtmosphereRenderQualityOverride`, `RestoreSourceAtmosphereRenderQuality` |
| `void` | `ApplyOrbitCloudTracingOverride`, `RestoreSourceCloudTracing` |
| `bool` | `IsOrbitCloudRenderQualityOverrideActive`, `IsOrbitAtmosphereRenderQualityOverrideActive`, `IsOrbitCloudTracingOverrideActive` |

Apply and restore overrides as matched operations. A `void` command does not provide a success result; validate bindings and inspect the matching active-state query where one exists.

## APlanetXRuntimePreviewActor

Header: `PlanetX/Preview/PlanetXRuntimePreviewActor.h`

Prefer `UPlanetXSubsystem::LoadRuntimePreview` for normal runtime use.

| Return | Functions |
| --- | --- |
| `bool` | `LoadPreviewFromBakeData` |
| `void` | `AssignPreviewBakeData`, `SetPreviewVisible`, `UnloadPreview` |
| `bool` | `IsPreviewLoaded`, `IsPreviewRenderable` |
| `int32` | `GetRenderableComponentCount`, `GetRealizedComponentCount` |
| enum or object | `GetPreviewResidencyState`, `GetSourceBakeData` |

Loaded and renderable are distinct states. Runtime budgets can make the realized count smaller than the renderable count.

