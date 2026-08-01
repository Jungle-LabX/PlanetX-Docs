# Troubleshooting

[Previous: Reference](08_Reference.md) · [Documentation Home](../../PlanetX_User_Guide_EN.md) · [Next: Support](10_Support_and_Release_Notes.md)

| Symptom | Likely Cause / Check | Solution |
|---|---|---|
| No `Scan Sources` button | The action was renamed | Use `Refresh` |
| Refresh finds 0 sources | Empty selection, hidden/NoBake, unsupported Component | Try Current Level, then isolate with Selected Actors |
| Landscape missing | Hidden/tag/WP load/LandscapeInfo issue | Inspect `LandscapeDiscovery` and failed WP loads |
| Target Section Name disabled | Target identity unresolved | Select Planet Asset and Refresh |
| Name missing after External Bake | Staged naming is In Editor-only | Refresh after completion and Rename |
| `TARGET CONFLICT` | Another identity occupies the output path | Resolve existing asset/path conflict |
| Excessive memory | Source Grid, large packet, too many workers/queue | Auto + Safe, Workers 0, External |
| Appears stuck at `RootManifestBuild` | Large manifest or real hang | Check logs, CPU/RAM/disk, and timestamps together |
| Visible seam or hole | Clipping/topology invariant failure | Stop using output; preserve source/partition/full log |
| Mirrored mesh inside-out | Old Bake or material tangent issue | Rebake with current code and isolate the mesh |
| WPO material blocked | Live deformation cannot project safely | Flatten, replace, or Discard |
| WP actor missing | Descriptor/HLOD/Level Instance/load failure | Inspect WP/HLOD metrics and external actor package |
| Save/Publish failure | Read-only, disk, unsaved data, rollback failure | Check out, save, free disk, retry |
| Empty Preview | Bake Data/Runtime Preview/Level Pair link missing | Inspect Sections and Diagnostics |
| Cannot change to Same World | Another Same World Pair is enabled | Keep only one |
| Wrong location after travel | Binding/Ticket/Target timing mismatch | Inspect resume result and identities |

Important errors:

```text
Align Section failed: ... target placement is unchanged or violates placement constraints.
```

The target is unchanged or violates placement constraints. Check Ground Sync Mapping, Section Placement, and Planet Actor transform.

```text
Canonical seam coverage mismatch ... owners=1
```

Canonical seam ownership failed after clipping. Do not use the output. Preserve triangle, axis, boundary, partition, and the full log for a pipeline report.

Use `Logs` and `ACTIVE BAKE` first. Attach the full run from `Saved/Logs` to support requests.

