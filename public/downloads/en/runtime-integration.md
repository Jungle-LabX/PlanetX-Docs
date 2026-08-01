# Runtime Integration

Planet Actor

## Planet Actor

1. Place `APlanetXPlanetActor`.
2. Assign the Planet Asset to its Planet Component.
3. Normally keep Auto Register Runtime enabled.
4. Set a stable Planet Binding ID when several instances use the same Planet Asset.

## Runtime Role

| Role | Behavior |
|---|---|
| Same World | Switches Ground/Orbit presentation in one World |
| External Level | The game travels between Worlds; PlanetX hands off pose/state |

PlanetX does not own `OpenLevel`, spawning, possession, or GameMode.

## Same World

Blueprint:

- `Enter Ground Same World(World Context, Request Actor, Surface Query)`
- `Return To Orbit Same World(World Context, Request Actor)`

Coordinate Component can also opt into automatic Same World entry/return.

## External Level

```text
Prepare Travel
→ game stores Ticket/Route
→ game performs World travel
→ Target Actor is spawned and possessed
→ Resume Pending Travel
```

`UPlanetXTravelReceiverComponent` can attempt automatic resume on arrival.

## Main Components

| Component | Purpose |
|---|---|
| Coordinate Component | Planet/Section identity and PlanetX pose |
| Movement Component | Optional native surface movement |
| Viewpoint Component | Camera/player observer and transition driver |
| Travel Receiver | Applies arrival pose/state |

Attaching Coordinate Component does not force-move the Actor every frame.

## Runtime Preview

- Load Runtime Preview
- Set Runtime Preview Visible
- Unload Runtime Preview
- Get Runtime Preview Status

## C++ entry point

```cpp
#include "PlanetX/Runtime/PlanetXSubsystem.h"

UPlanetXSubsystem* PlanetX =
    GetGameInstance()->GetSubsystem<UPlanetXSubsystem>();
```

Use `PrepareTravel`, let the game perform travel, then call `ResumePendingTravel`. Game code should depend on the public `UPlanetXSubsystem` facade, not internal runtime services.

Transition and environment:

- `APlanetXTransitionEndpoint`: Orbit/Ground boundary for a Planet/Section/Level Pair
- `APlanetXEnvironmentManager`: Cloud/Atmosphere binding and Ground/Orbit environment transition
