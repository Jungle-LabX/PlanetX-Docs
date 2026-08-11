# Diagnostic Tools

PlanetX provides editor UI, Blueprint queries, console stats, and dump commands.

## Live stats

```text
Stat PlanetXMemory
Stat PlanetXResources
Stat PlanetXProxy
Stat PlanetXProxyDetail
Stat PlanetXRuntime
```

Memory reports runtime resources and budget; Resources reports counts; Proxy reports render coverage; Runtime reports service cost. The diagnostic World is selected by PIE/Game and preferred Preview World priority.

## Dump commands

| Command | Output |
| --- | --- |
| PlanetX.ProxyStats.Dump | Proxy render summary for the current World |
| PlanetX.ProxyStats.DumpInstanceCoverage | Instance source and realized coverage |
| PlanetX.VisualEdit.Status | Visual Edit session state |
| PlanetX.VisualEdit.Dump | Visual build, Section failures, and diagnostic snapshot |

`PlanetX.ProxyStats.LogIntervalSeconds` adjusts recurring proxy logging; `PlanetX.MemoryBudgetMB` adjusts the diagnostic memory budget.

## Blueprint diagnostics

`UPlanetXSubsystem` can query actor runtime context, movement state, transition result, managed-actor state, Section runtime state, and Journeys. DrawPlanetDebug, DrawSectionDebug, DrawActorContextDebug, and DrawCaptureStackDebug visualize spatial state in development builds.

## Collecting support evidence

Record the reproduction World, Planet/Binding/Section IDs, asset validation, Proxy Bake revision and omissions, Travel Result error, and relevant Stat or Dump output. Review path data for sensitive information before external sharing.
