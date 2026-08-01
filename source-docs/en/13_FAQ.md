# Frequently Asked Questions

Quick answers to common PlanetX product, editor, runtime, and documentation questions.

## Is PlanetX a runtime planet generator?

PlanetX is a workflow for projecting an authored Unreal Engine Level onto a curved planetary representation. It does not replace your Ground-authoring workflow or generate a complete Game World at runtime.

## Does PlanetX own travel and replication?

No. PlanetX provides coordinates, Surface Context, state information, and handoff data. Your game owns Level Travel, Pawn spawning, possession, loading screens, and replication policy.

## What is the difference between Ground, Transition, and Orbit?

- **Ground** uses the authored local Level and its full detail.
- **Transition** resolves Surface Context and coordinates the handoff between representations.
- **Orbit** uses generated Proxy content to present the planet at distance.

## When should I use Same World or External Level?

Use **Same World** when both representations can coexist in one World and your game can coordinate visibility and state locally. Use **External Level** when the Ground experience lives in another World and requires a Travel Ticket and restoration flow.

## Why do I need Refresh before Bake?

`Refresh` rebuilds Source Review and Output Plan. Run it after changing selection, tags, levels, or bake settings so unsupported content, manual-review items, and output conflicts remain visible before generation.

## Does PlanetX support World Partition?

World Partition is documented as a supported workflow. Project-scale validation, memory budgets, partition sizes, save behavior, and external bake conditions still need to be tested for each production setup.

## Which Unreal Engine versions are supported?

The plugin descriptor does not currently declare a public `EngineVersion` range. Use only engine/platform combinations built and validated by your project until an official compatibility matrix is published.

## Where should I report a problem?

Check [Known Issues](/docs/en/known-issues) and [Troubleshooting](/docs/en/troubleshooting) first. Include the PlanetX version, Unreal Engine version, reproduction steps, relevant settings, and the exact error or diagnostic output when reporting a new issue.
