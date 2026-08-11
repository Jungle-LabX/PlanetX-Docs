# Compatibility and Limitations

Before using PlanetX, please review the supported Unreal Engine version and platforms, as well as the scope and limitations of Proxy Bake.

## Compatibility

| Item | Supported range |
| --- | --- |
| Plugin version | 1.0 |
| Unreal Engine | Unreal Engine 5.8 |
| Supported platforms | Windows 64-bit (Win64) |
| Required plugins | GeometryProcessing, PCG |
| Content included | Supported |

Planet authoring, Proxy Bake, the Planet Asset Editor **Preview** tab, and other authoring tools are used in Unreal Editor.
The packaged game uses the required Planet Assets together with the baked planet and Proxy data at runtime.

## Recommended system specifications

Because PlanetX runs on top of Unreal Engine Editor, we recommend a CPU and GPU that meet or exceed the **recommended specifications for Unreal Engine 5.8**.

Proxy Bake and the Planet Asset Editor **Preview** tab may hold geometry from large Levels and intermediate generated data in memory. We therefore recommend providing more system memory than a typical Unreal Engine project may require.

| Component | Minimum | Recommended |
| --- | --- | --- |
| CPU | Unreal Engine 5.8 recommended specification | Unreal Engine 5.8 recommended specification or better |
| GPU | Unreal Engine 5.8 recommended specification | Unreal Engine 5.8 recommended specification or better |
| System memory | **32 GB RAM** | **64 GB RAM or more** |

> **Memory notice**
> 32 GB is the minimum recommended capacity for PlanetX's primary Editor features.
> For Proxy Bakes of large Landscapes or Levels containing many Static Meshes or instances, or for high-detail planet visual authoring, we recommend **64 GB of memory or more**.

Actual memory requirements depend on the size and complexity of the source Level, the number of Proxy Bake sources, Landscape resolution, and visual settings.

## Proxy Bake support

Proxy Bake converts the visual appearance of a Ground Level into a Section Proxy suitable for use from Orbit.

The following Unreal Engine content types are supported directly:

- Static Mesh
- Instanced Static Mesh (ISM)
- Hierarchical Instanced Static Mesh (HISM)
- Foliage
- Landscape

PCG-generated Static Meshes or instances, Level Instances, Packed Level Actors, and HLODs may be processed conditionally when their inspectable content is composed of the supported types listed above.

Content that changes shape at runtime or requires a separate representation is not supported as a standard Proxy Bake source. Examples include:

- Spline Meshes
- Skeletal Meshes and Cloth
- Dynamic or Procedural Meshes
- Grooms
- Niagara and other effects
- Dynamic geometry such as Geometry Collections

When PlanetX encounters an unsupported visual element, it records the omission in the Bake results whenever possible rather than silently ignoring it.

If Proxy Bake finishes as **Completed With Warnings**, the Proxy itself was generated successfully, but some content may have been excluded. Please review the result and its warnings.

## Scope of runtime representations

The Proxy and Runtime Preview used in Orbit are **visual data for distant representation**, not copies of the actual Ground Level.

Runtime Preview therefore does not provide the following functionality:

- Duplication of Gameplay Actors from the Ground Level
- Collision
- Navigation
- Ground Actor ticking or gameplay logic

Actual gameplay runs in the original Ground content. PlanetX connects that content to the Orbit representation.

This remains true when using Level Handoff: the project continues to own its Level-loading policy, Pawn creation, and other game-specific travel flow.

## Proxy Bake size limits

For large Levels, Proxy Bake limits output size to avoid creating an excessively large single result.

- Intermediate data for an individual Proxy Bake processing chunk generally targets **128 MiB or less**.
- A warning is reported when an individual generated package exceeds **512 MiB**.
- An individual package that exceeds **1 GiB cannot be published**.

For complex, large-scale Levels, adjust Proxy detail and the Bake source scope as appropriate.
