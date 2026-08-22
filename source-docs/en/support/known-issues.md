# Known Issues

This page lists active limitations that are not resolved by the upcoming 1.0.1 maintenance update.

## Current status

- **Published Fab release:** PlanetX 1.0 Mercury
- **Next maintenance update:** 1.0.1
- **Report issues:** [jungle.labx@gmail.com](mailto:jungle.labx@gmail.com)

The 1.0.1 update addresses Browser Monitor failure reporting, native transform-gizmo fallback, and opt-in Global Presentation. See [Release Notes](/release-notes).

## Active issues

### Bidirectional Representation Domain conversion

Changing an Actor between Ground and Orbit does not reconstruct the previous state in both directions. **Presentation Scope: Global** only keeps authored visibility across presentations; it is not coordinate, transform, loading, or state conversion.

### Transition Resource Build and PCG output

PCG-generated resources can be absent from a Transition Resource when the generated output is unavailable, stale, or unsaved. PlanetX does not automatically generate, save, or cook PCG output. Verify the generated resources before building and again in a packaged build.

### Section Proxy at lower scalability presets

Section Proxy visibility can depend on scalability, runtime budget, authored cull distance, residency, or generated-resource availability. Validate the project's target presets in PIE and packaged Win64; a general lower-preset fallback is not part of 1.0.1.

### Runtime distance culling with PCG and Landscape content

In the Electric Dreams reproduction, PCG- and Landscape-derived Section Proxies can stop rendering at runtime distance. The root cause must be isolated between authored culling, runtime budget, residency/loading, and generated-resource coverage before a rendering fix is released.

### PlanetX Mode visibility filtering

PlanetX Mode can still apply its presentation filtering in the editor. The 1.0.1 native-gizmo fallback does not add persisted user-controlled visibility filters. Exit PlanetX Mode when project-owned visibility filtering is required.

### Landscape Material compatibility — excluded from 1.0.1

Complex or project-specific Landscape Material Graphs can diverge after Proxy Bake. Full arbitrary-graph fidelity is not part of 1.0.1; use and validate a dedicated proxy material where needed.

### Multi-island padding — excluded from 1.0.1

General padding reconstruction for disconnected islands is not part of 1.0.1. Split the source or provide explicit spacing when independent island padding is required.

## Before reporting

Include the PlanetX and Unreal Engine versions, exact reproduction steps, whether the issue occurs in Editor, PIE, or packaged Win64, and relevant logs or diagnostics. Send the smallest safe reproduction to [jungle.labx@gmail.com](mailto:jungle.labx@gmail.com).
