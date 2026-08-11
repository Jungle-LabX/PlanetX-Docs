# Movement and Gravity

`UPlanetXMovementComponent` applies planet-relative movement using runtime context resolved by the Coordinate Component.

## Configuration

The Movement Component needs a valid UpdatedComponent. Verify the reference Coordinate Component and planet-gravity settings, then use `ValidateMovementConfiguration` for a specific error message.

`FPlanetXNativeMovementSettings` defines acceleration, deceleration, speed, and ballistic behavior. `FPlanetXGravitySettings` defines acceleration toward the planet center; Planet Component exposes `GetGravityAccelerationAtWorldLocation`.

## Input and physics

| Function | Purpose |
| --- | --- |
| AddPlanetXInputVector | Accumulate input in the selected frame |
| Set/GetPlanetXVelocity | Set or read World/Planet/Section/Surface velocity |
| AddPlanetXForce | Add force or acceleration change |
| AddPlanetXImpulse | Add impulse or velocity change |
| SnapToPlanetSurface | Correct altitude and surface position |
| AlignUpToPlanetSurface | Align actor Up with the surface normal |

Surface Frame input uses East/North/Up. Enable tangent projection for ground movement; define an explicit Up policy for jumping or flight.

## Runtime state

`GetMovementRuntimeState` contains current velocity, gravity, and resolve or failure state. The single and aggregate queries on the Game Instance facade are suitable for debug UI and telemetry.

## Handoff

When changing Worlds or Movement Components, use Movement Handoff instead of copying velocity directly. The frame-continuity policy interprets linear and angular velocity in the destination surface frame.
