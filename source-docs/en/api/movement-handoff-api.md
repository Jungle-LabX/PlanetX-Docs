# Movement Handoff API

Header: `PlanetX/Blueprint/PlanetXMovementHandoffLibrary.h`

Class: `UPlanetXMovementHandoffLibrary`

Blueprint category: `PlanetX|Movement Handoff`

The library stores a versioned movement snapshot and returns an `FPlanetXMovementHandoffHandle`. Later calls resolve, apply, consume, or cancel that handle. All ten public operations return `bool` and also write `FPlanetXMovementHandoffResult`; inspect both before using outputs.

## Capture

| Function | Inputs and output |
| --- | --- |
| `CaptureMovementComponentHandoff` | Captures a `UMovementComponent` with `FPlanetXMovementHandoffCaptureRequest`; writes snapshot and result. |
| `CapturePhysicsBodyHandoff` | Captures a `UPrimitiveComponent` physics body; writes snapshot and result. |
| `CaptureMovementHandoffVelocity` | Captures supplied linear and angular World velocity for a source Actor; writes snapshot and result. |

`FPlanetXMovementHandoffCaptureRequest` specifies source and target coordinate frames, source and target actor-space states, and snapshot lifetime.

## Resolve and apply

| Function | Inputs and output |
| --- | --- |
| `ResolveMovementHandoffVelocity` | Resolves a handle to destination World linear and angular velocity using `EPlanetXMovementContinuityPolicy`. |
| `ApplyMovementComponentHandoff` | Applies a handle to a destination `UMovementComponent` using `FPlanetXMovementHandoffApplyOptions`. |
| `ApplyPhysicsBodyHandoff` | Applies a handle to a destination physics body. |
| `SwitchMovementComponentsWithHandoff` | Captures the source, switches component activity according to the options, and applies to the target. |

Apply options control continuity, source deactivation, target activation, component-velocity update, consume-on-success, and same-Actor enforcement. A failed switch is not permission to assume component activity or velocity changed as intended; inspect the result and current components.

## Inspect and finish

| Function | Contract |
| --- | --- |
| `GetMovementHandoffSnapshot` | Reads the snapshot identified by a handle without consuming it. |
| `ConsumeMovementHandoff` | Marks a pending handle consumed. |
| `CancelMovementHandoff` | Marks a pending handle cancelled. |

Use the returned handle rather than looking up state by Actor. A handle can fail because it is invalid, expired, consumed, cancelled, or no longer matches the stored generation. Capture immediately before the transition, resolve and apply after the destination frame is available, and consume only after successful application.

