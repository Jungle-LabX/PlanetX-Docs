# Known Issues

Known issues currently acknowledged for PlanetX 1.0 Mercury. The LabX team is reproducing and patching the items below; this page will be updated as fixes are verified for release.

## Current release status

> Every issue listed below is acknowledged. **Patch in progress** means that implementation or verification is underway; it does not guarantee that a fix is included in the currently published Fab build.

- **Affected release:** PlanetX 1.0 Mercury
- **Last updated:** August 17, 2026
- **Reporting:** Include the PlanetX and Unreal Engine versions, exact reproduction steps, and whether the issue occurs in Editor, PIE, or a packaged build.

## Active issues

### Bidirectional Coordinate Component Representation Domain transitions

- **Status:** Patch in progress
- **Scope:** `UPlanetXCoordinateComponent` / Representation Domain
- **Observed behavior:** Workflows that change an Actor between Ground and Orbit Representation Domains in both directions are not handled consistently in every case.
- **Current guidance:** Treat each domain change as an explicit handoff and validate both directions independently. Do not assume that changing Representation Domain alone reconstructs the previous Actor state.

### Landscape Material compatibility

- **Status:** Patch in progress
- **Scope:** Proxy Bake / Landscape Material
- **Observed behavior:** A baked Section Proxy may not reproduce a Landscape Material correctly when its Material Graph uses complex or project-specific paths.
- **Current guidance:** Review the baked proxy with representative Material Instances. If the output diverges, use a dedicated proxy material or simplify the unsupported graph path until the compatibility patch is available.

### Multi-island padding generation

- **Status:** Patch in progress
- **Scope:** Proxy Bake / Boundary reconstruction
- **Observed behavior:** Automatic padding may not be generated for sources containing multiple disconnected islands when their boundaries cannot be resolved independently.
- **Current guidance:** Inspect every island boundary before Bake. Split the source or provide explicit spacing when automatic padding is required for the output.

### Transition Resource Build can omit PCG resources

- **Status:** Patch in progress
- **Scope:** Transition Resource Build / PCG
- **Observed behavior:** PCG-generated resources or references may be missing from the generated Transition Resource.
- **Current guidance:** Verify PCG outputs and references after every Transition Resource Build, and confirm the result again in a packaged build before distribution.

### Section Proxy visibility depends on Epic scalability

- **Status:** Patch in progress
- **Scope:** Section Proxy rendering / Scalability
- **Observed behavior:** A Section Proxy may be visible only when Unreal Engine scalability is set to **Epic** and disappear at lower presets.
- **Current guidance:** Use Epic scalability while reviewing the current proxy output and validate the project's scalability overrides before shipping.

### Monitor can fail with multiple Chrome windows

- **Status:** Patch in progress
- **Scope:** Monitor / Chrome session discovery
- **Observed behavior:** Monitor initialization may fail when more than one Chrome window is open.
- **Current guidance:** Keep a single Chrome window open while starting Monitor. If discovery has already failed, close duplicate windows and restart the Monitor session.

### Coordinate Component Gizmo is missing during multi-selection

- **Status:** Patch in progress
- **Scope:** Editor / Coordinate Component Gizmo
- **Observed behavior:** The Coordinate Component Gizmo may not appear when multiple Actors with Coordinate Components are selected.
- **Current guidance:** Select and edit one Actor at a time when the Coordinate Component Gizmo is required.

### Runtime Section Proxy distance culling with PCG and Landscape content

- **Status:** Patch in progress
- **Scope:** Runtime / Section Proxy / PCG and Landscape
- **Observed behavior:** In the reproduced Electric Dreams-based case, Section Proxies generated from both PCG and Landscape content stop rendering beyond a certain runtime distance.
- **Current guidance:** Do not use Editor visibility as proof of runtime coverage. Validate cull distance, HLOD, World Partition, and spatial-loading behavior in PIE and a packaged build. No universal workaround has been verified yet.

### PlanetX overrides Visibility during Runtime

- **Status:** Patch in progress
- **Scope:** Runtime / Actor and Component Visibility
- **Observed behavior:** PlanetX may change Visibility during Runtime even when the behavior should be limited to Editor preview and authoring.
- **Current guidance:** Do not rely on manually assigned runtime Visibility remaining unchanged across PlanetX state updates. Revalidate affected Actors after transitions until the fix restricts this behavior to the Editor.

### PlanetX Mode forces Visibility Filtering and blocks the native UE Gizmo

- **Status:** Patch in progress
- **Scope:** Editor / PlanetX Mode
- **Observed behavior:** PlanetX Mode can force Visibility Filtering and prevent use of the native Unreal Engine transform Gizmo.
- **Current guidance:** Exit PlanetX Mode when project-owned Visibility Filtering or the native UE Gizmo is required. A planned patch will stop forcing the filter and restore native Gizmo access.

## Before reporting a new issue

1. Check [Setup and Configuration](/docs/en/setup-configuration), [Proxy Bake Issues](/docs/en/proxy-bake-troubleshooting), [Runtime and Travel Issues](/docs/en/runtime-travel-troubleshooting), and the [FAQ](/faq).
2. Record PlanetX and Unreal Engine versions.
3. Include exact reproduction steps and whether the problem occurs in Editor, PIE, packaged builds, or all three.
4. Include relevant logs, diagnostics, and the smallest reproducible project state that can be shared safely.
