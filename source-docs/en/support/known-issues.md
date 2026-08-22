# Known Issues

Known issues currently acknowledged for PlanetX 1.0 Mercury. The maintenance batches below define what can safely ship in the 1.0.x line and what remains a later compatibility project.

## Current release status

> PlanetX 1.0 Mercury is the currently published Fab build. **Scheduled** and **in verification** items are not fixed in that build. An item is moved to **Resolved** only after its released version and its issue-specific validation evidence are recorded.

- **Affected release:** PlanetX 1.0 Mercury
- **Maintenance scope:** [1.0.x maintenance track](/release-notes)
- **Last updated:** August 23, 2026
- **Reporting:** Include the PlanetX and Unreal Engine versions, exact reproduction steps, and whether the issue occurs in Editor, PIE, or a packaged build.

## Status and closure policy

- **Scheduled:** included in a future batch but not yet validated for release.
- **Mitigation in 1.0.x:** the batch improves diagnosis or recovery; the original capability limitation remains open.
- **Resolved:** used only after the supported Unreal Engine 5.8 build, new-project and existing-1.0 upgrade checks, Editor/PIE, packaged Win64, and the issue-specific reproduction have passed.

No issue below is resolved by this planning update alone.

## Active issues

### Bidirectional Coordinate Component Representation Domain transitions

- **Status:** Deferred beyond the 1.0.x maintenance scope
- **Scope:** `UPlanetXCoordinateComponent` / Representation Domain
- **Observed behavior:** Workflows that change an Actor between Ground and Orbit Representation Domains in both directions are not handled consistently in every case.
- **1.0.x position:** Representation Domain remains a coordinate/load contract. A separate shared-presentation option must not be treated as bidirectional state reconstruction.
- **Current guidance:** Treat each domain change as an explicit handoff and validate both directions independently. Do not assume that changing Representation Domain alone reconstructs the previous Actor state.
- **Closure evidence:** A stateful Ground → Orbit → Ground and Orbit → Ground → Orbit test must restore the documented transform, loading, and presentation contracts without manual reconstruction.

### Landscape Material compatibility

- **Status:** Mitigation in 1.0.x Batch A; full fidelity deferred
- **Scope:** Proxy Bake / Landscape Material
- **Observed behavior:** A baked Section Proxy may not reproduce a Landscape Material correctly when its Material Graph uses complex or project-specific paths.
- **1.0.x position:** Detect and name unsupported graph paths before publish; do not claim arbitrary Material Graph fidelity.
- **Current guidance:** Review the baked proxy with representative Material Instances. If the output diverges, use a dedicated proxy material or simplify the unsupported graph path.
- **Closure evidence:** The issue remains open until the supported complex-graph set is documented and its source and baked outputs match in Editor, PIE, and packaged Win64.

### Multi-island padding generation

- **Status:** Mitigation in 1.0.x Batch A; general reconstruction deferred
- **Scope:** Proxy Bake / Boundary reconstruction
- **Observed behavior:** Automatic padding may not be generated for sources containing multiple disconnected islands when their boundaries cannot be resolved independently.
- **1.0.x position:** Validate the boundary topology before publish and identify the affected source. It does not add general multi-island reconstruction.
- **Current guidance:** Inspect every island boundary before Bake. Split the source or provide explicit spacing when automatic padding is required for the output.
- **Closure evidence:** The issue remains open until multiple disconnected islands and their independent boundaries generate validated padding without manual source splitting.

### Transition Resource Build can omit PCG resources

- **Status:** Mitigation in 1.0.x Batch A; automatic PCG orchestration deferred
- **Scope:** Transition Resource Build / PCG
- **Observed behavior:** PCG-generated resources or references may be missing from the generated Transition Resource.
- **1.0.x position:** Preflight must identify missing, stale, or unsaved PCG output and give a recovery path. It does not silently generate, save, or cook PCG output.
- **Current guidance:** Verify PCG outputs and references after every Transition Resource Build, and confirm the result again in a packaged build before distribution.
- **Closure evidence:** The issue remains open until the chosen PCG contract is implemented end-to-end and both an available-output and unavailable-output case behave as documented in a packaged build.

### Section Proxy visibility depends on Epic scalability

- **Status:** Diagnosis in 1.0.x Batch A; lower-preset fallback deferred
- **Scope:** Section Proxy rendering / Scalability
- **Observed behavior:** A Section Proxy may be visible only when Unreal Engine scalability is set to **Epic** and disappear at lower presets.
- **1.0.x position:** Report whether runtime budget/scalability, authored-instance culling, residency/loading, or generated resources explain the absence. This does not promise a lower-preset rendering fallback.
- **Current guidance:** Use Epic scalability while reviewing the current proxy output and validate the project's scalability overrides before shipping.
- **Closure evidence:** Validate High, Medium, and Low in PIE and packaged Win64 against the documented fallback/progression behavior before closing.

### Monitor can fail with multiple Chrome windows

- **Status:** Scheduled for 1.0.x Batch A
- **Scope:** Monitor / browser acknowledgement
- **Observed behavior:** Monitor initialization may fail when more than one Chrome window is open.
- **1.0.x target:** Treat browser acknowledgement as best-effort; preserve a manual URL and retry path without misreporting the bake result as failed.
- **Current guidance:** Keep a single Chrome window open while starting Monitor. If discovery has already failed, close duplicate windows and restart the Monitor session.
- **Closure evidence:** Verify no-Chrome, one-Chrome, and multiple-Chrome scenarios. The Monitor must retain its recovery actions and a completed bake must not be reported as failed solely because acknowledgement is missing.

### Coordinate Component Gizmo is missing during multi-selection

- **Status:** Scheduled for 1.0.x Batch B
- **Scope:** Editor / Coordinate Component Gizmo
- **Observed behavior:** The Coordinate Component Gizmo may not appear when multiple Actors with Coordinate Components are selected.
- **1.0.x target:** Restore native UE transform-gizmo access for multi-selection; PlanetX's specialized Coordinate gizmo remains single-component only unless its multi-edit contract is separately implemented.
- **Current guidance:** Select and edit one Actor at a time when the Coordinate Component Gizmo is required.
- **Closure evidence:** Validate single Coordinate Actor, multi-selection with Coordinates, and mixed/non-Coordinate selection after an Editor restart.

### Runtime Section Proxy distance culling with PCG and Landscape content

- **Status:** Diagnosis in 1.0.x Batch A; runtime rendering fix remains open
- **Scope:** Runtime / Section Proxy / PCG and Landscape
- **Observed behavior:** In the reproduced Electric Dreams-based case, Section Proxies generated from both PCG and Landscape content stop rendering beyond a certain runtime distance.
- **1.0.x position:** Add a diagnostic distinction between authored-instance culling, runtime budget/scalability, residency/loading, and missing generated resources. The Electric Dreams reproduction remains required for the underlying rendering fix.
- **Current guidance:** Do not use Editor visibility as proof of runtime coverage. Validate cull distance, HLOD, World Partition, and spatial-loading behavior in PIE and a packaged build.
- **Closure evidence:** Reproduce and pass the Electric Dreams scenario at the documented distance in PIE and packaged Win64, including PCG and Landscape sources.

### PlanetX overrides Visibility during Runtime

- **Status:** Scheduled for 1.0.x Batch C
- **Scope:** Runtime / Actor and Component Visibility
- **Observed behavior:** PlanetX may change Visibility during Runtime even when the behavior should be limited to Editor preview and authoring.
- **1.0.x target:** Add an opt-in presentation/visibility policy that preserves the existing 1.0 behavior by default and keeps editor-only filtering out of runtime state changes.
- **Current guidance:** Do not rely on manually assigned runtime Visibility remaining unchanged across PlanetX state updates. Revalidate affected Actors after transitions until the policy is released.
- **Closure evidence:** Validate legacy-default projects and opt-in projects through Ground, Orbit, and transition states in PIE and packaged Win64; manual runtime visibility outside the policy must remain unchanged.

### PlanetX Mode forces Visibility Filtering and blocks the native UE Gizmo

- **Status:** Scheduled for 1.0.x Batch B
- **Scope:** Editor / PlanetX Mode
- **Observed behavior:** PlanetX Mode can force Visibility Filtering and prevent use of the native Unreal Engine transform Gizmo.
- **1.0.x target:** Replace forced visibility with a persisted editor-only filter and provide native-gizmo passthrough where PlanetX has no specialized single-Coordinate operation.
- **Current guidance:** Exit PlanetX Mode when project-owned Visibility Filtering or the native UE Gizmo is required.
- **Closure evidence:** Confirm saved filter restoration after an Editor restart, no runtime visibility mutation from filter changes, and UE native gizmo access in the specified fallback cases.

## Before reporting a new issue

1. Check [Setup and Configuration](/docs/en/setup-configuration), [Proxy Bake Issues](/docs/en/proxy-bake-troubleshooting), [Runtime and Travel Issues](/docs/en/runtime-travel-troubleshooting), and the [FAQ](/faq).
2. Record PlanetX and Unreal Engine versions.
3. Include exact reproduction steps and whether the problem occurs in Editor, PIE, packaged builds, or all three.
4. Include relevant logs, diagnostics, and the smallest reproducible project state that can be shared safely.
