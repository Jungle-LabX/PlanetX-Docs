# Materials and Surface Presets

PlanetX distinguishes source Section materials, material identities published by Proxy Bake, and generated materials used by Completion and Padding.

## Surface Preset

`UPlanetXSurfacePreset` is a Primary Data Asset for reusable Completion and planet-surface styling. Assigning it as the Planet Asset's Active Surface Preset lets authoring settings reference that selection.

Use a preset to share materials, terrain or noise character, and visual parameters. It does not replace structural contracts such as Planet ID or Section geometry.

## Proxy materials

Planet Material Override on `UPlanetXPlanetProxyComponent` replaces the planet-sphere presentation. Section proxy materials must follow the canonical slots and remaps in BakeData. Reordering slots independently can break boundary and padding material provenance.

## Automatic Padding materials

The runtime binder checks generated-visual binding descriptors and Source Material identity before preparing MIDs. A mismatched geometry revision, slot, or texture set can produce an error material or warning.

## Recommendations

- Run Full Validate after changing a Source Material.
- Rebuild stale Generated Material before packaging.
- Preserve material-slot order across bake and visual build.
- Do not use sky materials as ground Proxy Bake sources.
- Limit dynamic materials to parameters that can be captured deterministically.
