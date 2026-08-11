# Coordinate and Movement Component API

## UPlanetXCoordinateComponent

Header: `PlanetX/Components/PlanetXCoordinateComponent.h`

The Coordinate Component stores a canonical PlanetX pose and resolves the Planet, Binding, Section, and coordinate frame used by its owner. Configure a reference, make sure the Planet Actor is registered, and call `RefreshRuntimeContext` after relevant streaming or registration changes.

### Stable coordinate state and policy

| Functions | Contract |
| --- | --- |
| `RefreshRuntimeContext` | Re-resolves the runtime context; returns `false` when no valid context can be built. |
| `SetPlanetXTransform`, `GetPlanetXTransform` | Writes or reads the canonical pose. The setter's `bApplyToOwner` controls immediate application. |
| `SetCoordinateFrameReference` | Replaces the coordinate-frame reference and reports whether it resolves. |
| `SetAutomaticSameWorldEntryEnabled`, `SetAutomaticSameWorldReturnEnabled`, `SetSameWorldReturnPosePolicy` | Updates Spatial Entry behavior. |
| `GetSpatialEntryPolicy`, `IsAutomaticSpatialEntryParticipant` | Reads the effective Spatial Entry configuration. |

The editor-callable helpers `RefreshCoordinateSnapshot`, `PullFromWorld`, `PushToWorld`, `CaptureOwnerTransformToPlanetX`, and `ApplyPlanetXTransformToOwner` synchronize the stored pose and the owner transform explicitly.

### Stable surface frame and vectors

| Functions | Contract |
| --- | --- |
| `GetCurrentSurfaceFrame` | Writes the current surface frame. |
| `GetPlanetUpVectorWorld`, `GetPlanetDownVectorWorld` | Writes planet-relative unit directions. |
| `GetSurfaceEastVectorWorld`, `GetSurfaceNorthVectorWorld` | Writes tangent directions for the resolved surface frame. |
| `ProjectVectorToSurfaceTangent` | Projects a World vector onto the current tangent plane. |
| `ConvertSurfaceVectorToWorld` | Converts East/North/Up input to World space, with optional tangent projection. |
| `ConvertPlanetLocalVectorToWorld`, `ConvertSectionLocalVectorToWorld` | Converts a vector from the named local space. |
| `ConvertCoordinateVectorToWorld`, `ConvertWorldVectorToCoordinate` | Converts using `EPlanetXMovementVectorSpace`. |
| `BuildPlanetSurfaceWorldLocation` | Builds a World location at `TargetAltitudeCm`. |
| `BuildSurfaceAlignedRotation` | Builds a rotation from `FPlanetXSurfaceAlignmentSettings`. |

All functions in this table return `bool`. Do not use their output after `false`.

### Advanced reads and spatial loading

`RefreshReferenceDetails`, `GetResolvedPlanetComponent`, `GetCachedRuntimeContext`, and `GetRepresentationDomain` expose the resolved reference and context. `GetActorSpatialLoadingPolicy`, `ShouldForceOwnerAlwaysLoaded`, and `ApplySpatialLoadingPolicyToOwner` implement the current spatial-loading policy. Data Layers and Streaming Sources remain project-owned.

## UPlanetXMovementComponent

Header: `PlanetX/Components/PlanetXMovementComponent.h`

The owner requires a Coordinate Component and a committed runtime context.

| Stable function | Contract |
| --- | --- |
| `AddPlanetXInputVector` | Adds input in a selected vector space. Defaults to `SurfaceFrame` with tangent projection enabled. |
| `SetPlanetXVelocity` | Sets velocity in the selected vector space; the default is `World`. |
| `GetPlanetXVelocity` | Converts current velocity to the requested vector space. |
| `AddPlanetXForce` | Adds force; the default space is `World`, and `bAccelerationChange` defaults to `false`. |
| `AddPlanetXImpulse` | Adds impulse; the default space is `World`, and `bVelocityChange` defaults to `false`. |
| `SnapToPlanetSurface` | Uses `FPlanetXSurfaceSnapSettings` to move to the resolved surface. |
| `AlignUpToPlanetSurface` | Uses `FPlanetXSurfaceAlignmentSettings` to align the owner. |
| `ValidateMovementConfiguration` | Writes an error message when configuration is invalid. |

Every stable function returns `bool`. `GetMovementRuntimeState` and `GetCommittedRuntimeContext` are the approved advanced state reads. When another Movement Component or a physics body owns velocity across a representation change, use [Movement Handoff](/docs/en/movement-handoff-api).
