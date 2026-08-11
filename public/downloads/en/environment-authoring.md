# Environment Authoring

Author the environment profile in **Planet Asset Editor > Preview > Advanced > Environment**. Atmosphere, Clouds, Sun, Post Process, and Space Background are stored in one `FPlanetXEnvironmentAuthoringSettings` contract.

## Atmosphere and Clouds

Atmosphere height can scale from Planet Radius or use a manual kilometer value. The profile exposes Rayleigh, Mie, absorption, aerial perspective, and ground albedo controls.

Clouds define layer bottom and height, lighting, atmosphere interaction, and shadow parameters. If an existing Level cloud does not match the PlanetX profile, Orbit and Ground presentation can diverge during transition.

## Sun and Post Process

The Sun profile defines atmosphere sunlight, cloud shadows, shadow extent, and quality. Post Process controls the planet profile, convolution bloom, and lens flare. PlanetX Rendering project settings also apply default lens-flare console variables.

## Space Background

A Space Background material should use the Surface domain, Opaque blend mode, Unlit shading, and Is Sky. When Planet Asset Defaults is the profile source, a managed Planet Actor and Planet Asset must be bound.

## Runtime binding

Connect the Planet Actor, Sun, Atmosphere, Volumetric Cloud, and MPC to `APlanetXEnvironmentManager`. Run ValidateEnvironmentBinding before using ApplyInitialRuntimeSpace or SetEnvironmentTransition.
