# Large World and World Partition

Source discovery

## Source discovery

World Partition actors do not all have to be loaded manually.

```text
Enumerate descriptors
→ select eligible actors/HLODs
→ temporarily load chunks of 64
→ capture Component payloads
→ release references
→ classify and build the Plan
```

- Valid current top-level HLODs are preferred.
- Stale or invalid HLODs fall back to original sources.
- Data Layer membership is recorded but does not limit the Bake to currently active Data Layers.
- Use `PlanetX.NoBake` for deterministic exclusion.
- Level Instance/Packed Level cycles and load failures are diagnosed.

## Large Bake recommendation

1. Save Maps and assets.
2. Refresh with `Current Level` or a confirmed `Reviewed Set`.
3. Keep automatic partitions.
4. Use `Auto Memory Budget + Safe`.
5. Use `BAKE IN EXTERNAL PROCESS`.
6. Inspect `ACTIVE BAKE` and `Saved/Logs`.

## Checkpoints

- Static geometry spool can be reused for an identical contract.
- Landscape currently disables geometry checkpoint reuse.
- This is exact-contract geometry reuse, not arbitrary full-pipeline resume.
- A successful publish removes the checkpoint.

Main temporary paths:

```text
Saved/PlanetX/ProxyBake/PartitionSpool
Saved/PlanetX/ProxyBakeRollback
Saved/PlanetXProxyBake
Saved/Logs
```

Smaller partitions can reduce packet RAM but increase MeshPages, seams, packages, and finalization work.
