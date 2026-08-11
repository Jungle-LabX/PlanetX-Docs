# Runtime Actor and Component Settings

## Planet Component

`UPlanetXPlanetComponent` owns runtime registration and the planet's gravity model on `APlanetXPlanetActor`.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PlanetAsset` | None | `UPlanetXPlanetAsset` represented by this Actor. It supplies runtime identity, Sections, coordinates, and visual contracts. |
| `PlanetBindingId` | None | Distinguishes multiple Actors with the same Planet ID in one World. Empty uses the owning Actor name. Assign a stable value when travel tickets must survive Actor renames. |
| `bAutoRegisterRuntime` | true | Registers with the runtime registry at Begin Play. If disabled, call the public registration API yourself. |
| `bRefreshRuntimeRegistrationOnTransformChange` | true | Refreshes the registered transform when the Planet Actor transform changes. |
| `GravitySettings.bEnabled` | true | Enables gravity queries for this planet. |
| `GravitySettings.Model` | `ConstantSurface` | `ConstantSurface` maintains surface acceleration; `InverseSquare` scales it by inverse square of distance from the center. |
| `SurfaceAccelerationCmPerSecondSquared` | 980 cm/s², at least 0 | Gravity acceleration at the planet surface. |
| `MaximumAccelerationCmPerSecondSquared` | 100,000 cm/s², at least 0 | Caps Inverse Square acceleration near the center. |

## Coordinate Component

`SpatialEntryPolicy` is the group containing the Same World automatic entry and return settings below.

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAutoRegisterRuntime` | true | Automatically registers the owner as a PlanetX runtime participant. |
| `RepresentationDomain` | `Ground` | Default representation domain. `Ground` belongs to the source Level; `Orbit` appears in Planet/Compare and runtime Orbit/Transition presentation. |
| `ActorSpatialLoadingPolicy` | `PlanetXManaged` | `PlanetXManaged` keeps an Orbit Actor non-spatial/always loaded. `ActorManaged` leaves `Is Spatially Loaded` to the developer. This option does not manage Data Layers or Streaming Sources. |
| `ReferencePlanetActor` | None | Planet Actor used as the coordinate reference. It must own a valid Planet Asset and takes precedence over `ReferencePlanetId`. |
| `ReferencePlanetId` | None | ID used when no Planet Actor is assigned. Its options come from Planet Assets on Planet Components placed in the current World. |
| `ReferenceSectionId` | None | Enabled Section ID from the resolved Planet Asset. Specify it for reproducible save, capture, and Sequencer paths. |
| `bAutoResolveSectionFromWorld` | true | When Section ID is None, selects the first Section containing the current Planet-local position in Asset array order. This is an editor/convenience query, not a persistent identity. |
| `bSyncFromOwnerTransformInEditor` | true | Refreshes coordinate snapshots when the root transform changes in the editor. Authoritative runtime state belongs to the World Runtime Subsystem. |
| `TransformSource` | `WorldTransform` | `WorldTransform` captures the PlanetX pose from the owner. `PlanetXTransform` generates World Transform from the stored canonical pose. Switching the source does not silently overwrite both values. |

### Spatial Entry Policy

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAutomaticSameWorldEntryEnabled` | false | Automatically applies coordinate/Actor movement when entering a Same World Ground region from Orbit. |
| `bAutomaticSameWorldReturnEnabled` | false | Automatically returns to Orbit representation when leaving the Ground region. |
| `SameWorldReturnPosePolicy` | `PreserveCurrentLogicalPose` | Preserves movement completed on Ground. `RestoreEntryOrbitPose` restores the Orbit pose captured at entry. |
| `MovementContinuityPolicy` | `RebaseBetweenFrames` | Chooses `Reset`, `PreserveWorld`, velocity conversion with `RebaseBetweenFrames`, or `DoNotApply`. |

### PlanetX Transform

These are authoritative inputs when `TransformSource=PlanetXTransform`.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PlanetId` | None | Planet identity. |
| `PlanetBindingId` | None | Planet Actor binding in the current World. Runtime resolution requires a non-empty value. |
| `PlanetFixedPositionCm` | (0,0,0) | Position in planet-fixed coordinates. |
| `PlanetFixedRotation` | Identity | Normalized rotation quaternion in planet-fixed coordinates. |
| `Scale3D` | (1,1,1) | Finite Actor scale. |

## Movement Component

Add `UPlanetXMovementComponent` when using PlanetX native movement. It is not required when the project uses only its existing Character Movement.

`NativeMovementSettings` and `SurfaceAlignmentSettings` own the two setting groups documented below.

| Setting | Default | Purpose |
| --- | --- | --- |
| `CoordinateComponent` | None | Coordinate Component used as the reference. The owner may be searched when empty, but an explicit connection is less ambiguous. |
| `bApplyPlanetGravity` | true | Applies PlanetX gravity to movement. |
| `bApplyPlanetGravityInGround` | false | Also applies PlanetX gravity in Ground state. Avoid applying it on top of Character or physics gravity. |
| `GravityScale` | 1.0, at least 0 | Multiplier applied to the Planet Component's gravity acceleration. |
| `bAutoRegisterRuntime` | true | Registers with the runtime movement registry automatically. |

### Native Movement Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `MassKg` | 1 kg, at least 0.001 | Mass used by force/acceleration calculations. |
| `MaximumSpeedCmPerSecond` | 1,200 cm/s | Maximum native movement speed. |
| `AccelerationCmPerSecondSquared` | 4,096 cm/s² | Acceleration while input is applied. |
| `DecelerationCmPerSecondSquared` | 4,096 cm/s² | Deceleration as input is released. |
| `bConstrainInputToSurface` | false | Removes the Surface Up component from input, constraining it to the tangent plane. |
| `bAlignUpToSurface` | true | Aligns Actor Up with planet Surface Up. |
| `bSweepInOrbit` | false | Uses collision sweep for Orbit movement. |
| `bSweepInGround` | true | Uses collision sweep for Ground movement. |
| `bMaintainSurfaceAltitude` | false | Maintains the requested surface altitude while moving. |
| `SurfaceAltitudeCm` | 0 cm | Surface altitude to maintain. |

### Surface Alignment Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `bPreserveCurrentForward` | true | Projects the current Forward onto the tangent plane while aligning Up. |
| `FallbackForwardWorld` | World Forward | Fallback when the current Forward is parallel to Up. |
| `BlendTimeSeconds` | 0.25 s, at least 0 | Rotation blend time. Zero applies alignment immediately. |

For a public Surface Snap request, `TargetAltitudeCm` is the target surface altitude and `bSweep` controls collision sweep while moving there.

## Viewpoint Component

Place it on the Actor that is the actual PlayerController View Target and owns the active Camera.

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAutoRegisterRuntime` | true | Registers with the Viewpoint registry automatically. |
| `bCanDriveTransitionState` | true | Allows this Viewpoint to drive Orbit/Transition/Ground evaluation. Disable it on observational Viewpoints when several are present. |
| `PresentationCompensationMode` | `Automatic` | `Automatic` resolves a suitable movable child, `Disabled` turns compensation off, and `ExplicitComponent` moves only the selected Component. Actor roots are never moved for compensation. |
| `TransitionPresentationComponent` | None | Movable child Scene Component that receives presentation compensation in Explicit mode. |

## Travel Receiver Component

These settings restore a pending capture on an Actor in the new World after Level Handoff.

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAutoResumePendingTravel` | true | Automatically resumes pending travel after Begin Play. Disable it for a fully manual `ResumePendingTravel` flow. |
| `bApplyControlRotation` | true | Restores captured Controller rotation. Disable it when the project chooses arrival camera orientation independently. |
| `ArrivalRetryTimeoutSeconds` | 15 s, at least 0, UI maximum 30 | Bounded retry period while Planet Actor registration is deferred after OpenLevel. Zero disables delayed retries. |

## Transition Endpoint

Using Add Endpoint in PlanetX Mode is the safest way to populate IDs and Actor references.

| Setting | Default | Purpose |
| --- | --- | --- |
| `PlanetId`, `SectionId`, `LevelPairId` | None | Travel-contract identities shared by Orbit and Ground Endpoints. |
| `EndpointRole` | `Orbit` | Identifies this World-local Endpoint as the Orbit or Ground side. |
| `PlanetAsset` | None | Canonical source for Transition Policy. Required on Ground; Orbit can infer it from the Planet Actor. |
| `PlanetActor` | None | Planet Actor used by an Orbit Endpoint. |
| `EnvironmentManagerActor` | None | Manager that changes environment presentation with transition state. |
| `bAutoSizeTransitionCylinderToSectionBounds` | true | Derives the cylinder from Section landing/playable bounds. While enabled, it replaces manual cylinder dimensions. |
| `OuterRadiusCm` / `InnerRadiusCm` | 1,000,000 / 250,000, at least 1 | Radii of the outer transition and inner Ground boundaries. Inner should be smaller than Outer. |
| `bUseHeightLimit` | true | Includes cylinder height in state evaluation. |
| `OuterHalfHeightCm` / `InnerHalfHeightCm` | 1,000,000 / 250,000, at least 1 | Outer and inner half-heights while Height Limit is enabled. |
| `RuntimeAlphaUpdateThreshold` | 0.002, at least 0 | Sends a runtime update when alpha changes by at least this amount. Smaller values update more often. |
| `bDrawDebugTransitionCylinders` | true | Shows editor cylinder visualization. |
| `CylinderLineThickness` | 480, at least 1 | Debug line thickness. |
| `DebugCylinderSegments` | 96, 8–128 | Circumference segment count. |
| `DebugCylinderHeightRingCount` | 8, 0–12 | Additional rings along cylinder height. |
| `DebugCylinderRadialBandCount` | 3, 0–4 | Additional radial bands. |

## Movement Handoff call options

These are per-call public Capture/Apply options, not persistent Component Details settings.

| Setting | Default | Purpose |
| --- | --- | --- |
| `SourceCoordinateFrame` / `TargetCoordinateFrame` | None | Select a `Planet` or `Section` frame and its identity. |
| `SourceSpaceState` / `TargetSpaceState` | `None` | `Orbit`, `Transition`, or `Ground` before and after handoff. |
| `LifetimeSeconds` | 0 s | Snapshot lifetime. Zero can mean immediate expiry; provide a positive value appropriate to the call contract. |
| `ContinuityPolicy` | `RebaseBetweenFrames` | Determines how velocity and angular velocity move from source to target frame. |
| `bDeactivateSource` | true | Deactivates the source Movement Component after success. |
| `bActivateTarget` | true | Activates the target Movement Component. |
| `bUpdateComponentVelocity` | true | Writes converted velocity to the target Component. |
| `bConsumeOnSuccess` | true | Consumes the Snapshot so it cannot be applied again. |
| `bRequireSameActor` | true | Requires source and target Movement Components to belong to the same Actor. |

The class default for `UPlanetXSubsystem::MaxCaptureStackDepth` is 8. It is an advanced safeguard for nested transition captures, not an ordinary Project Settings entry.
