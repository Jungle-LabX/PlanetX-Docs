# Same World Travel

Same World travel moves an actor from Orbit to a Section's Ground pose, then returns it to Orbit when both presentations use one World package.

## Contract

The Level Pair must use the same package for OrbitWorld and GroundWorld. GroundSyncMapping, transition bounds, and the Surface Query must be valid. The traveling actor needs a resolvable Planet and Section context in the current World.

## Explicit calls

1. Obtain `FPlanetXSurfaceQueryResult` from a ray or Geo query.
2. Call `EnterGroundSameWorld(WorldContext, Actor, SurfaceQuery)`.
3. Run Ground gameplay.
4. Call `ReturnToOrbitSameWorld(WorldContext, Actor)`.

Entry creates a Journey and capture associated with the actor. Return selects that exact active Journey.

## Automatic Spatial Entry

The Coordinate Component can enable automatic Same World entry and return. Runtime evaluates the transition boundary for registered participants and applies the pose when the presentation is ready.

Return Pose Policy chooses between the captured Orbit pose and a pose reconstructed from the actor's current Ground Section-relative transform. Use the latter when Ground movement must carry back into the Orbit Section frame.

## Failure handling

The request fails when the Surface Query targets another Planet or Section or actor context is ambiguous. Automatic return can wait for Orbit presentation readiness. Inspect the Transition Journey and managed-actor state.
