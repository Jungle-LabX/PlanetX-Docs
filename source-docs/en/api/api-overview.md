# Public API Overview

PlanetX gameplay integrations use the `PlanetX` runtime module. The primary Blueprint facade is `UPlanetXSubsystem`; actors and components provide registration, coordinate, movement, transition, environment, and arrival behavior.

This reference is based on the public headers shipped with PlanetX 1.0 under `Source/PlanetX/Public/PlanetX`.

## API support tiers

| Tier | Intended use |
| --- | --- |
| Stable Gameplay API | Supported gameplay integration surface. Signatures, reflected shape, documented behavior, and failure or consume contracts are protected. |
| Advanced and Diagnostics API | Supported specialist surface. Breaking changes require deprecation and migration guidance. |
| Authoring and Editor API | Supported for editor workflows; cooked-runtime support is not implied. |
| Internal or Test-only API | No external compatibility guarantee. |

The presence of a type in a public header does not by itself assign it to a support tier. Avoid treating generated-mesh intermediates, bake passes, runtime services, or serialized implementation payloads as game-facing contracts.

## Primary types

| Area | Primary types |
| --- | --- |
| Runtime facade | `UPlanetXSubsystem` |
| Planet representation | `APlanetXPlanetActor`, `UPlanetXPlanetComponent`, `UPlanetXPlanetProxyComponent` |
| Participating actors | `UPlanetXCoordinateComponent`, `UPlanetXMovementComponent`, `UPlanetXViewpointComponent`, `UPlanetXTravelReceiverComponent` |
| Authoring data | `UPlanetXPlanetAsset`, `UPlanetXSurfacePreset` |
| Movement handoff | `UPlanetXMovementHandoffLibrary` |

## Module and subsystem access

Add the runtime module to the consuming game's `Build.cs`:

```csharp
PublicDependencyModuleNames.AddRange(new[] { "PlanetX" });
```

Use a valid Game Instance to obtain the subsystem in C++:

```cpp
#include "PlanetX/Subsystems/PlanetXSubsystem.h"

UPlanetXSubsystem* PlanetX = GameInstance->GetSubsystem<UPlanetXSubsystem>();
```

In Blueprint, use the Game Instance Subsystem node. Do not call World Context functions while the world is unavailable or tearing down.

## Shared failure rules

- A `bool` return reports whether the operation completed. Do not consume output parameters after `false` unless that function explicitly documents diagnostic output.
- For enum-returning queries, accept output only for a success status.
- Treat `None` IDs, invalid object references, expired handles, and non-success error enums as normal failure states.
- Pass explicit Planet, Binding, Section, and Level Pair IDs when more than one candidate can exist.
- Refresh runtime context after registration or streaming changes.

Blueprint display names can differ from C++ symbols. The names and include paths in this reference use the C++ declarations.

