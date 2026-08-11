# Level Handoff Travel

Level Handoff transfers a PlanetX pose and Journey state between different World packages. Game code continues to own level loading and pawn creation policy.

## Recommended flow

`PrepareTravel` creates a ticket from the Source Actor, Surface Query, and an explicit `FPlanetXTravelRoute`.

```cpp
FPlanetXLevelHandoffTicket Ticket;
FPlanetXLevelHandoffResult Result;
const bool bPrepared = PlanetXSubsystem->PrepareTravel(
    WorldContext, SourceActor, SurfaceQuery, TargetRoute, Ticket, Result);
```

On success, game code travels to `Ticket.TargetWorld`. At arrival, use `ResumePendingTravel` only when exactly one pending ticket matches, or call `CompleteLevelHandoff` with the stored ticket.

## Round trip

The advanced flow is `BeginLevelHandoff` → `CompleteLevelHandoff` → `BeginReturnLevelHandoff(JourneyId)` → `CompleteLevelHandoff`. `PrepareTravel` can also use an explicit route for direct Ground-to-Orbit travel.

## Safety rules

- No matching pending travel reports PendingTravelNotFound.
- Multiple matches report AmbiguousPendingTravel.
- An older ticket generation reports StaleGeneration.
- A missing target Planet Binding can be retried by Travel Receiver within its timeout.
- The Ground mapping stored in the capture is authoritative for the Level Handoff Ground pose.

`ResumePendingTravel` never guesses the latest ticket. Projects allowing concurrent travel should keep Ticket or Journey identity in gameplay save state.

## Cancellation and diagnostics

Cancel unused tickets with `CancelLevelHandoff`. Log Capture, Journey, and Result error together, and use `GetActiveTransitionJourneys` to find leaked journeys.
