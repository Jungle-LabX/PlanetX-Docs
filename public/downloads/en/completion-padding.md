# Completion and Padding

Completion generates planet surface not covered by Sections. Padding reinforces Section proxy boundaries so they connect naturally to the spherical presentation.

## Completion

Surface Completion settings control generated topology, cutouts, terrain noise, and surface materials. Generators are deterministic for identical input and validate polygons, boundaries, and mesh attributes.

Terrain Regions apply noise parameters to selected surface areas. Use Preview to ensure strong noise or an incorrect cutout does not intrude beneath a proxy.

## Padding

Proxy Padding selects Section boundary loops and creates connecting geometry through adaptive subdivision and projection. Transition strips and shared seams preserve position, normal, and material provenance across the boundary.

Performance budgets contain warning and hard thresholds for boundary edges, generated vertices, indices, compact bindings, and MID counts. A warning can still publish output, but requires runtime-cost review.

## Material build

Padding Material Build collects source material layouts and generates the necessary texture and material assets. Editor validation can detect changed source material state even when the asset path is unchanged. Rebuild before packaging.

## Failure checklist

- Valid Section bounds and boundary loops
- Current Proxy Bake revision and generated-visual geometry hash
- Source material layout and slot remap
- Projection tolerance and Planet Radius
- Performance-budget warnings
