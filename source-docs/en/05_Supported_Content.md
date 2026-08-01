# Supported Content

[Previous: Core Concepts](04_Core_Concepts.md) · [Documentation Home](../../PlanetX_User_Guide_EN.md) · [Next: Large World](06_Large_World_and_World_Partition.md)

| Source | Status | Processing |
|---|---|---|
| Static Mesh Component | Supported | ProxyGeometry or InstanceBatch |
| Landscape / Streaming Proxy | Supported | LandscapeProxy |
| ISM/HISM | Supported | InstanceBatch |
| Foliage | Supported | Foliage InstanceBatch |
| PCG output | Conditional | Actual Static Mesh/ISM/HISM Components must exist |
| Level Instance / Packed Level | Supported | Discovers contained supported Components |
| World Partition HLOD | Conditional | Valid HLOD preferred, raw-source fallback |
| Skeletal Mesh / Cloth | Unsupported | Excluded during discovery |
| Spline deformation | Unsupported | Convert to Static Mesh |
| Dynamic runtime mesh | Unsupported | Convert to persistent Static Mesh |

Important conditions:

- Static Mesh requires a valid source LOD.
- Negative scale winding and normal sign are corrected.
- Source Nanite clusters are not copied; new MeshPages are built from source LOD data.
- Foliage and ISM/HISM remain InstanceBatch candidates even when tiny.
- A regular Static Mesh at or below 80 cm maximum size is discarded automatically.
- Live WPO/displacement becomes `ManualReview` for projected Orbit/Morph output.
- `PlanetX.NoBake`, `PlanetX.ProxyBakePreview`, hidden-in-game, transient, and editor-only sources are excluded.

Diagnose one source with `Selected Actors → Refresh → inspect Role/Reason`.

