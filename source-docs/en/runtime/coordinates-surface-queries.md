# Coordinates and Surface Queries

Coordinate APIs separate actor-pose conversion from planet-surface discovery. `UPlanetXSubsystem` is the Blueprint facade taking a World context; the Coordinate Component provides owner-bound conveniences.

## Transform capture and resolve

- `CapturePlanetXTransform` captures a World Transform as a canonical PlanetX pose.
- `CaptureActorPlanetXTransform` captures an actor transform.
- `ResolvePlanetXTransform` computes the current World Transform from a canonical pose.
- `ApplyPlanetXTransformToActor` resolves and applies it.
- `ResolveCoordinateFrame` resolves a Planet or Section frame into World space.

Inspect `FPlanetXTransformResolveResult` together with the boolean return. Planet ID, Binding, and Section ID must match the current World registry.

## Surface queries

`FPlanetXSurfaceQueryInput` contains ray origin, direction, and selection criteria. Prefer `QuerySurfaceAtWorldRayDetailed` for gameplay branches because it distinguishes InvalidInput and RuntimeUnavailable from a geometric miss.

Queries can also start from Geo coordinates or `FPlanetXTransform`. `FPlanetXSurfaceQueryResult` carries Planet, Section, hit position, normal, and coordinate information.

## Landing and Sections

`BuildLandingTransform` creates a surface-aligned landing pose. `GetSectionTransform`, `GetSectionDesc`, and `GetSectionRuntimeState` expose the Section contract and current state.

## Component vector API

The Coordinate Component exposes Surface Up/Down/East/North, tangent projection, and Surface/Planet/Section Local to World vector conversion. Do not confuse points with vectors, and choose tangent projection explicitly for surface input.
