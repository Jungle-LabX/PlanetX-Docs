# Planet Assets and Identities

`UPlanetXPlanetAsset` is a Primary Data Asset connecting a planet's physical, coordinate, Section, Level Pair, Proxy Bake, generated-visual, and environment-authoring contracts.

## Three primary IDs

| ID | Purpose | Selection rule |
| --- | --- | --- |
| Planet ID | Project-wide identity of the planet contract | Unique among Planet Assets |
| Planet Binding ID | Distinguishes runtime instances sharing one Planet ID | Provide it when multiple Planet Actors exist |
| Section ID | Authoring and query region on the surface | Non-empty and unique within the asset |

Level Pair ID locates the Orbit/Ground/Runtime Preview world set associated with a Section. Journey ID and Capture ID identify one travel lifecycle.

## Contract owned by the asset

A Planet Asset stores Radius, Coordinate Convention, Sections, Level Pairs, Completion and Padding settings, Environment settings, Surface Preset, Proxy Bake links, and revision state. Generated payloads and materials are published by editor workflows and linked to the asset.

`IsProxyBakeStale`, `IsVisualBuildStale`, and `IsVisualPreviewStale` compare the current authoring revision with the most recent successful output. A stale result requests validation and regeneration; it is not an instruction to delete assets automatically.

## Multiple worlds and instances

The same Planet Asset can appear in Orbit and Ground worlds. If several Planet Actors with one Planet ID exist in a world, automatic selection can be ambiguous. Supply the Planet Binding ID exposed in advanced API inputs.

## Change policy

Changing an ID affects saved coordinates, Level Pairs, bake links, and travel routes. Treat it as a migration rather than a display-name edit, then run Full Validate and bake again.
