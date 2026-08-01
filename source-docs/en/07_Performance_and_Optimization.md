# Performance and Optimization

[Previous: Large World](06_Large_World_and_World_Partition.md) · [Documentation Home](../../PlanetX_User_Guide_EN.md) · [Next: Reference](08_Reference.md)

## Recommended starting points

| Use | Settings |
|---|---|
| Preview | Auto Partition, Source Grid Off, In Editor, Auto + Safe |
| General production | Auto Partition, Auto + Safe |
| High-quality Landscape | Compare Source Grid On, prefer External |
| Large World Partition | Auto Partition, External, Workers 0 |
| Dedicated bake machine | Select High Utilization only after measurement |

`High Utilization` is not a quality setting. It reduces the reserved RAM from 4 GiB to 1 GiB.

## High-impact changes

| Change | Impact |
|---|---|
| Source Grid On | More triangles, RAM, and disk |
| Smaller partitions | Smaller packets; more assets, seams, and finalization |
| Larger partitions | Fewer assets; higher peak RAM and loading unit |
| More Workers/Queue | Potential throughput and peak-RAM increase |
| Unnecessary instances | Larger payload and Runtime Preview cost |

Optimization order:

1. Remove unnecessary and ManualReview sources.
2. Create a baseline with Auto Partition + Safe.
3. Check largest packet, peak RAM, and output bytes.
4. Change one setting at a time.
5. Profile Runtime Preview, MeshPages, InstanceBatches, and transition.

The current Basic UI has no general user-facing Simplify ratio slider. Do not hard-code undocumented internal values.

