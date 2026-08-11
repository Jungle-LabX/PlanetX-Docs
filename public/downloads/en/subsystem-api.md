# UPlanetXSubsystem

Header: `PlanetX/Subsystems/PlanetXSubsystem.h`

`UPlanetXSubsystem` is the Game Instance Subsystem facade for the supported runtime API. Every function with a World Context parameter requires a valid game world. `CancelLevelHandoff` is the stable exception and accepts only a ticket.

## Stable surface queries

| Function | Contract |
| --- | --- |
| `QuerySurfaceAtWorldRay` | Evaluates `FPlanetXSurfaceQueryInput` and writes `FPlanetXSurfaceQueryResult`; returns `bool`. |
| `QuerySurfaceAtWorldRayDetailed` | Performs the same query and returns `EPlanetXSurfaceQueryStatus`. |
| `QuerySurfaceAtGeo` | Queries by Planet ID, `FPlanetXGeoCoordinate`, and optional Binding ID. |
| `QuerySurfaceAtPlanetXTransform` | Queries at a canonical `FPlanetXTransform`. |
| `BuildLandingTransform` | Builds `FPlanetXLandingTransform` from a successful surface result. |

Do not use hit data after a failed `bool` result or a non-success detailed status.

## Stable coordinates

| Function | Contract |
| --- | --- |
| `ResolvePlanetXTransform` | Resolves `FPlanetXTransform` to `FTransform` and writes `FPlanetXTransformResolveResult`. |
| `CapturePlanetXTransform` | Captures a World transform for a Planet ID and Binding ID. |
| `CaptureActorPlanetXTransform` | Captures an Actor using the supplied Planet and Binding IDs. |
| `ApplyPlanetXTransformToActor` | Resolves a canonical pose and applies it to an Actor. |

The Blueprint category for these functions is `PlanetX|Coordinates`.

## Stable travel

| Function | Contract |
| --- | --- |
| `EnterGroundSameWorld` | Enters Ground in the current World using a request Actor and successful surface query. |
| `ReturnToOrbitSameWorld` | Returns the request Actor through its active Same World journey. |
| `BeginLevelHandoff` | Creates an `FPlanetXLevelHandoffTicket` and result from a source Actor and surface query. |
| `ResolveLevelHandoffTicket` | Resolves a ticket into the destination World transform without applying it. |
| `CompleteLevelHandoff` | Applies a ticket to the target Actor; `bApplyControlRotation` defaults to `true`. |
| `CancelLevelHandoff` | Cancels a ticket. This function has no World Context parameter. |

PlanetX prepares and restores handoff state but does not call Open Level, spawn the destination Actor, possess a pawn, or choose a GameMode. Game code owns those steps.

## Advanced travel and state inspection

- Travel: `PrepareTravel`, `ResumePendingTravel`, `BeginReturnLevelHandoff`, `ResolveLevelHandoffEntryTransform`
- Stored state: `GetStoredLevelHandoffCapture`, `GetTransitionJourney`, `GetActiveTransitionJourneys`
- Runtime state: `GetActorRuntimeContext`, `GetMovementRuntimeState`, `GetMovementRuntimeStates`
- Transition state: `GetTransitionRuntimeResult`, `GetTransitionRuntimeResults`, `GetTransitionManagedActorState`
- Transition math and sync: `EvaluateTransitionCylinderState`, `CaptureTransitionActorSyncPose`, `ApplyTransitionActorSyncPose`

`PrepareTravel` accepts `FPlanetXTravelRoute`. PlanetX selects automatically only when exactly one Planet Actor candidate exists. An explicit index of `0` is valid; if both `PlanetActorIndex` and `PlanetBindingId` are supplied, both must identify the same candidate.

## Advanced data, preview, and diagnostics

- Section and Level Pair: `GetSectionTransform`, `GetSectionDesc`, `GetSectionRuntimeState`, `GetLevelPair`, `GetLevelPairForSection`
- Coordinate frame: `ResolveCoordinateFrame`
- Runtime Preview: `LoadRuntimePreview`, `SetRuntimePreviewVisible`, `UnloadRuntimePreview`, `GetRuntimePreviewStatus`
- Validation: `ValidatePlanetAsset`
- Diagnostics: `DiagnoseProxySync`, `ResolvePlanetAlignmentForSection`, `DiagnoseSectionPlanetOverlapFromBounds`
- Transient drawing: `DrawPlanetDebug`, `DrawSectionDebug`, `DrawActorContextDebug`, `DrawCaptureStackDebug`

Diagnostic drawing functions do not return a success value. Validation execution success and a validation result with no issues are separate conditions.
