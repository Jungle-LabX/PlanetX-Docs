# Quick Start: Create Your First Planet Proxy

Step Action Expected Result Common Failure Screenshot/Landmark : 1 Enable PlanetX in Edit Plugins, then restart Tools PlanetX appears Old or duplicate plugin binary Plugins wind...

| Step | Action | Expected Result | Common Failure | Screenshot/Landmark |
|---:|---|---|---|---|
| 1 | Enable PlanetX in `Edit > Plugins`, then restart | `Tools > PlanetX` appears | Old or duplicate plugin binary | Plugins window |
| 2 | Open the Ground Map to bake | Current World matches the source | Untitled or Orbit Map opened | Level viewport |
| 3 | Create `Add > Miscellaneous > PlanetX Planet Asset` | Dedicated Asset Editor opens | Duplicate Planet ID or bad Radius | Create Planet Asset |
| 4 | Open `Tools > PlanetX > Proxy Bake Editor` | Bake window appears | Latest Editor module not loaded | Proxy Bake header |
| 5 | Select Planet Asset, Runtime Role, and Source Scope | Target World and source range resolve | Empty Selected Actors | Setup area |
| 6 | Run `Refresh` | Source Review and Output Plan appear | Hidden, NoBake, or unsupported source | [Current screen](/images/proxy-bake-refresh-review.png) |
| 7 | Review `ManualReview`, `Unsupported`, and Reason | Sources have valid roles | WPO/displacement or missing source LOD | Source Review |
| 8 | Confirm Target Section Name and `NEW OUTPUT` | Output path and partitions resolve | TARGET CONFLICT or SCAN OUT OF DATE | Output Plan |
| 9 | Select `BAKE IN EDITOR` | Bake Data and Section are linked automatically | Unsaved asset, memory, or save failure | ACTIVE BAKE |
| 10 | Place a `PlanetX Planet Actor` and assign the Asset | Runtime planet instance registers | Planet Binding collision | Actor Details |
| 11 | Check Sections/Diagnostics and run PIE | Proxy and Level Pair are valid | Missing Bake/Preview link | Planet Asset Editor |

> The old `Scan Sources` action is now `Refresh`. A successful Bake links its result to the Planet Asset automatically.

## Completion check

- The Planet Asset contains a Section.
- Bake Data is linked.
- An External Level has a Runtime Preview World link.
- The Planet Actor references the same Asset.
- Diagnostics has no blocking Error.

For C++, add `"PlanetX"` to the game module's `Build.cs`. Do not add `PlanetXEditor` to a runtime module.
