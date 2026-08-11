# Runtime Integration

The public runtime facade is `UPlanetXSubsystem`, a Game Instance Subsystem. World-specific registries and services are implementation details; gameplay code uses the facade and public components.

## Planet registration

`APlanetXPlanetActor` includes Planet, Proxy, Transition Morph, Atmosphere, and Volumetric Cloud components. Assign a Planet Asset on the Planet Component and use `bAutoRegisterRuntime`, or call `RegisterToPlanetXRuntime`.

When several actors share one Planet ID, retain the Planet Binding ID and pass it to queries. Automatic resolution that assumes a single instance can become ambiguous.

## Participant actors

Add components as required:

- Coordinate for Planet/Section references, canonical pose, vector conversion, and Spatial Entry policy
- Movement for planet gravity, input/force/impulse, surface snap, and alignment
- Viewpoint for transition observation
- Travel Receiver for resuming pending travel after Level Handoff
- Transition Endpoint for Section entry/exit conditions and presentation

## Begin Play order

The Planet Actor must register before participants can resolve runtime context. If streaming can delay that order, use `RefreshRuntimeRegistration`, `RefreshRuntimeContext`, or the Travel Receiver retry policy.

## Before packaging

Check Full Validate, current Proxy Bake, current Generated Visual and Material output, Runtime Preview Worlds, and cooked asset bundles. A working editor preview does not prove that runtime payloads are cooked.
