# Environment Runtime

`APlanetXEnvironmentManager` connects a Planet Asset environment profile to Atmosphere, Cloud, Sun, Post Process, and Space Background bindings in the current World.

## Binding modes

PlanetX Managed mode controls required components from the PlanetX profile. Use Existing Level preserves existing SkyAtmosphere or Volumetric Cloud components, so the project must match them manually to the Planet Asset profile.

A managed Planet Actor supplies Radius and environment-authoring settings. Without an Existing Sun Light, the stored Sun direction remains usable but validation can report a warning.

## Initialization and transition

- `ValidateEnvironmentBinding` checks bindings and material/profile conditions.
- `CaptureEnvironmentStateFromBindings` captures current Level values.
- `ApplyEnvironmentState` applies the stored state.
- `ApplyInitialRuntimeSpace` establishes the initial Orbit or Ground presentation.
- `SetEnvironmentTransition(From, To, Alpha)` interpolates between spaces.

Orbit cloud and atmosphere render-quality and tracing overrides have matching Apply and Restore operations. Always restore overrides when returning ownership to the Level.

## Common warnings

- Missing existing cloud or atmosphere
- Mismatch between PlanetX and existing Ground cloud
- Missing MPC
- Non-positive Planet Radius or terminator softness
- Missing Sun or Cloud source for a cloud-shadow override
- Incorrect Space Background material domain, blend, shading, or Is Sky

Resolve binding validation before investigating presentation alpha.
