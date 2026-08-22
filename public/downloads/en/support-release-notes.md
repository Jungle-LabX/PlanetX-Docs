# Version 1.0 Mercury

## Release contract

| Item | Value |
| --- | --- |
| Release name | 1.0 Mercury |
| Version | 1 |
| VersionName | 1.0 |
| Engine baseline | Unreal Engine 5.8 project |
| Runtime module | PlanetX |
| Editor module | PlanetXEditor |
| SupportedTargetPlatforms | Win64 |
| Required plugins | GeometryProcessing, PCG |
| CanContainContent | true |
| Beta / Experimental | false / false |

## Included capabilities

- Planet Asset, Section, and Level Pair authoring
- PlanetX Mode and dedicated Planet Asset Editor
- Proxy Bake and external progress monitor
- Coordinates, surface queries, movement, and gravity
- Same World and Level Handoff travel
- Runtime Preview and transition presentation
- Completion, Padding, and generated materials
- Atmosphere, clouds, sun, post process, and space background
- Validation, runtime stats, and diagnostics

## Distribution note

The plugin package includes this local-file `Docs` static site. The source does not provide a release-by-release changelog or historical compatibility matrix, so this page does not invent one.

## 1.0.x maintenance track (unreleased)

> This is the planned maintenance-release scope, not a statement that a patch is already published. A change moves into the shipped notes only after its code, Editor/PIE behavior, packaged Win64 behavior, and upgrade behavior have passed the release gate below.

### Batch A — release-safe diagnostics and recovery

- Make the external Monitor startup resilient when Chrome acknowledgement is unavailable; retain a manual URL/retry recovery path instead of treating browser discovery as the bake result.
- Add actionable preflight results for missing, stale, or unsaved PCG output before Transition Resource Build. This batch does **not** claim automatic PCG generation or save orchestration.
- Report distinguishable causes for runtime proxy absence: authored-instance culling, runtime budget/scalability, residency/loading, or missing generated resources.
- Detect unsupported complex Landscape Material paths and multi-island boundary/padding inputs before publish, with the affected Actor, component, or generated-resource path when available.

### Batch B — editor visibility and gizmo usability

- Replace hard PlanetX Mode visibility forcing with a persisted editor-only visibility filter.
- Restore UE native transform-gizmo use for ordinary Actors and multi-selection; retain the PlanetX Coordinate gizmo only for its supported single-Coordinate-Component workflow.
- Keep editor preview state separate from runtime visibility state.

### Batch C — runtime presentation compatibility

- Introduce an opt-in runtime presentation/visibility policy while preserving the current 1.0 behavior as the migration-safe default.
- Provide an explicit shared-presentation option for content that must remain visible across Ground and Orbit; it is separate from Representation Domain and must not alter coordinate/load semantics.

### Deferred beyond the 1.0.x maintenance scope

- Full bidirectional Representation Domain state reconstruction.
- General multi-island padding reconstruction.
- Full fidelity for arbitrary Landscape Material Graphs.
- Automatic PCG generate/save/cook orchestration.

### Release gate and Known Issue closure

Every candidate must pass all applicable checks before it is advertised as fixed:

1. Build the PlanetX Editor and Win64 target for the supported Unreal Engine 5.8 baseline without new warnings treated as errors.
2. Verify a new project and an existing 1.0 project: open, save, proxy bake, transition, PIE, and packaged Win64 smoke test.
3. Run the issue-specific reproduction at the affected scalability preset and at the documented recovery path.
4. Confirm no legacy runtime-visibility, Representation Domain, or generated-resource behavior changed outside the chosen opt-in policy.
5. Record the released version and validation evidence, then move the matching item from **Active** to **Resolved** in Known Issues. Partial diagnostics or a workaround alone do not close an issue.
