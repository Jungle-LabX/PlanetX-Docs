# Transition Model

A PlanetX transition is a lifecycle connecting Section state, runtime context, actor pose, and travel state—not only a visual alpha.

## Participants

- `APlanetXTransitionEndpoint` defines the Section, endpoint role, cylinder settings, and participant policy.
- `UPlanetXViewpointComponent` supplies observation and transition-presentation context.
- `UPlanetXTransitionMorphComponent` presents flat/curved mesh interpolation.
- `UPlanetXPlanetProxyComponent` owns Section proxy presentation and residency.
- `UPlanetXSubsystem` exposes queries, captures, and Same World or Level Handoff operations.

`FPlanetXTransitionCylinderSettings` evaluates state and alpha from surface distance and altitude offset.

## Same World

The Orbit actor moves to a Ground pose within one World. Automatic entry applies only to actors whose Coordinate Component enables the Spatial Entry policy. Return policy can use the captured pose or the current Section-relative pose.

## Level Handoff

For different Worlds, `BeginLevelHandoff` or `PrepareTravel` creates a ticket. Game code remains responsible for `OpenLevel` and pawn policy. In the destination World, `ResumePendingTravel` or `CompleteLevelHandoff` with an exact ticket applies the pose.

An old ticket generation or multiple matching pending travels is rejected rather than guessed. Journey ID links the round trip, and completed journeys remain queryable for diagnostics.

## Movement continuity

Movement Handoff captures and reapplies linear and angular velocity in the intended coordinate frame. Inspect Consume, Cancel, and rollback results to prevent duplicate application.
