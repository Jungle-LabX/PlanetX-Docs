# Data Types and C++ Integration

## Module setup

Add the `PlanetX` runtime module to the consuming game's `Build.cs`:

```csharp
PublicDependencyModuleNames.AddRange(new[] { "PlanetX" });
```

Use the header that owns each type. Common entry points include:

- `PlanetX/Core/PlanetXTypes.h`
- `PlanetX/Coordinates/PlanetXTransform.h`
- `PlanetX/Coordinates/PlanetXCoordinateUtils.h`
- `PlanetX/Movement/PlanetXMovementTypes.h`
- `PlanetX/Movement/Handoff/PlanetXMovementHandoffTypes.h`
- `PlanetX/Travel/PlanetXLevelPair.h`
- `PlanetX/Transition/PlanetXTransitionTypes.h`
- `PlanetX/Validation/PlanetXValidation.h`

## Stable transform contract

`FPlanetXTransform` is a Blueprint type with these reflected fields: `DataVersion`, `PlanetId`, `PlanetBindingId`, `PlanetFixedPositionCm`, `PlanetFixedRotation`, and `Scale3D`. Position is stored in centimeters. Use `UPlanetXSubsystem` or `UPlanetXCoordinateComponent` to resolve and capture it; do not treat a World transform as a representation-independent saved pose.

## Stable movement handoff types

The stable handoff contract includes:

- `FPlanetXMovementHandoffHandle`: `SnapshotId`, `Generation`
- `FPlanetXMovementHandoffCaptureRequest`: source and target frames, source and target actor-space states, `LifetimeSeconds`
- `FPlanetXMovementHandoffApplyOptions`: continuity and activation, velocity-update, consume, and same-Actor policies
- `FPlanetXMovementHandoffSnapshot`: version, handle, source identity and frames, movement state, capture time, lifetime, and state
- `FPlanetXMovementHandoffResult`: `bSucceeded`, `Error`, `Handle`, `DiagnosticContext`

Stable reflected enums include `EPlanetXTransformSource`, `EPlanetXMovementHandoffState`, `EPlanetXMovementContinuityPolicy`, and `EPlanetXMovementVectorSpace`. Compile and serialize against the headers from the plugin version you ship; do not invent numeric values or layouts.

## Travel route selection

`FPlanetXTravelRoute` is declared in `PlanetX/Transition/PlanetXTransitionTypes.h` and contains `World`, `PlanetId`, `SectionId`, `PlanetActorIndex`, and `PlanetBindingId`. `PlanetActorIndex` defaults to `INDEX_NONE`. Automatic selection is allowed only when exactly one candidate exists; `0` explicitly selects the first deterministic candidate. If both selectors are set, the index and Binding ID must agree.

## Coordinate and validation helpers

`FPlanetXCoordinateUtils` provides pure C++ conversions among supported coordinate representations. Use `UPlanetXSubsystem` when a conversion requires the runtime registry. Preserve centimeter units, finite values, and normalized direction assumptions, and check every success result.

`PlanetXValidation` provides structured validation for C++ tools. Preserve severity, code, subject, and remediation text. Validation does not implicitly repair or save assets.

## Excluded implementation surface

Generated-mesh data, boundary reconstruction intermediates, bake passes, internal runtime services, and shard or serialization payloads are not stable game save or network contracts merely because a declaration is publicly visible.

