# Key Features

PlanetX provides authoring and runtime features that connect existing Unreal Engine Levels to a planet and create a continuous experience from the Orbit representation to actual Ground gameplay.

## Planet coordinates and surface frames

![Planet coordinates and surface frames](/images/docs/overview-key-features-0.png)

PlanetX provides a coordinate system that calculates positions and directions relative to the planet's center and surface.

This makes it possible to determine a consistent surface-up direction and movement orientation anywhere on the planet, and to convert between standard Unreal Engine World coordinates and planet coordinates.

Sections, Ground connections, player movement, and Orbit ↔ Ground transitions all use this coordinate system as a shared frame of reference.

## Sections and Ground connections

A **Section** associates existing Ground content with a particular region of a planet's surface.

You can place multiple Sections on one planet, and each Section can be connected to the Ground Level used for actual gameplay.

PlanetX supports two transition models to accommodate different project structures.

- **Same World**

  Orbit and Ground content coexist in one World, and PlanetX changes their representation while the player moves.

- **Level Handoff**

  Orbit and Ground use separate Levels. During travel, PlanetX carries the player's position and movement state into the destination Level.

## Section Proxy Bake

![Section Proxy Bake](/images/docs/overview-key-features-1.png)

PlanetX can generate a **Section Proxy** so that an existing Ground Level remains recognizable from Orbit.

It analyzes the main visual elements that make up the Ground area—including Landscapes, Static Meshes, and Foliage—and bakes them into a representation suitable for distant viewing. The result is then associated with the corresponding Section on the planet.

This allows the region to remain visible on the planet in Orbit without keeping the complete Ground Level rendered at all times.

## Orbit ↔ Ground transitions

As a player or camera approaches the planet or moves away from its surface, PlanetX can transition between the **Orbit representation and the actual Ground content**.

During the transition, PlanetX uses the planet surface frame to carry the player's position, rotation, and movement state between the two representations.

This makes it possible to create one continuous travel experience without requiring a separate landing screen or a completely unrelated movement model.

## Planet visual authoring

![Planet visual authoring](/images/docs/overview-key-features-2.png)

PlanetX can author the rest of the planet surface so that regions without Section Proxies still form a visually complete planet.

The **Preview** tab in the Planet Asset Editor lets you edit and preview the following elements:

- Base planet surface
- Connections between Sections and the planet surface
- Surface materials
- Atmosphere and clouds
- Sun and lighting
- Space background and post-processing effects

The authored result can then be built as the final runtime planet visual.

## Environment transitions

![Environment transitions](/images/docs/overview-key-features-3.png)

Orbit and Ground may require different environment presentations.

PlanetX manages the planet's atmosphere, clouds, lighting, and related effects, and can apply the appropriate presentation while the player moves between Orbit and Ground.

## Validation and debugging

![Validation and debugging](/images/docs/overview-key-features-4.png)

PlanetX includes validation and debugging tools that make it easier to find missing data or incorrect settings while authoring a planet.

You can inspect the Planet Asset, Section-to-Ground connections, Proxy Bake results, planet visuals, and runtime transition state. When a problem occurs, these tools help identify which stage of the workflow requires attention.
