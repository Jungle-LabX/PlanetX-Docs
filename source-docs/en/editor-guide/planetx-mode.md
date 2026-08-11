# PlanetX Mode

PlanetX Mode is a Level Editor mode that presents Planet Actors, Sections, participants, environment, and transitions in the current World.

## Palettes

| Shortcut | Palette | Purpose |
| --- | --- | --- |
| Alt+1 | Placement | Planet/Section placement and coordinate editing |
| Alt+2 | Runtime | PIE registration, residency, and state |
| Alt+3 | Cinematic | PlanetX Transform path authoring |
| Alt+4 | Transition | Endpoints and transition volumes |
| Alt+5 | Environment | World environment bindings |
| Alt+6 | Validate | World and asset validation |

`F5` Refresh Preview rebuilds the scene index and refreshes pre-PIE Completion and Padding preview.

## Preview views

- **Planet** shows the active planet proxy and hides source Level actors.
- **Compare** shows the planet proxy and source actors together.
- **Level** hides planet proxies and shows original Level actors.

These are editor visibility previews and do not change the saved runtime role.

## Scene Tree and selection

Scene Tree displays Planet, Section, Endpoint, Environment, and participant associations. It warns about duplicate Endpoints or Environment Managers and invalid Section placement or topology.

Before moving an actor with Placement tools, verify the Coordinate Component's Reference Planet/Section and representation domain. Use an explicit Section ID for persistent placement.

## PIE usage

In PIE, use Runtime to observe planet registration, Section state, Runtime Preview, and transition results. Do not run Proxy Bake operations that change the source World while PIE is active.
