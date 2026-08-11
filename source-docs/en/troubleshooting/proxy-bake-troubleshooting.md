# Proxy Bake Issues

## Scan Sources is disabled

Confirm a valid Planet Asset, Section, and Source World. Stop PIE and ensure another external worker does not own the operation. If an External Level Section is opened from a different Level, the editor can request a move to the required Level.

## CompletedWithWarnings

Inspect SourceOmissions on BakeData. Each record stores Reason, PassId, actor and component path, class, and detail.

Typical reasons include:

- Spline Mesh deformation
- Unsupported component class
- Cloth or deformable content
- Missing mesh or LOD
- Projection range exceeded
- Unsupported or sky material
- Nondeterministic dynamic source
- Unavailable saved PCG managed resource

For intentional exclusion, author an explicit source policy or NoBake tag. For missing visible content, convert it to a supported Static Mesh, Instance, or Landscape source.

## Bake is stale

Changes to Planet Asset structure, Section placement, Source World content, Source Material, quality, or visual-generation input can make the revision stale. Scan, recalculate the plan, bake again, and run Full Validate.

## External Bake Monitor does not open

The browser Monitor is optional and does not own the Bake. If its local service or system browser cannot open, External Bake continues; use the Editor status and Unreal log for progress. Do not copy or share a complete Monitor URL because it contains a local session token.

The direct Worker hosts the Monitor while the Bake is active. Its service ends when the Worker exits, so an existing tab may show **Disconnected** after completion. Restart or return to Unreal Editor and select **Open External Bake Monitor** to host the latest durable result again. The previous tab is not migrated automatically.

## Large package

Packages over 512 MiB warn; publication fails over 1 GiB. Split large indivisible sources and review partition, shard, and instance-aggregation output. The 128 MiB source-spool target is not the final uasset size.
