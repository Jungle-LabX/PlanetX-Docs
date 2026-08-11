# Preview Tab

The **Preview** tab in the Planet Asset Editor authors the planet visual contract in a dedicated preview World. **Basic** exposes frequent controls; **Advanced** exposes generation and environment details.

## Basic

The Planet, Sections, and Environment areas provide quick access to:

- Atmosphere enablement and radius-scaled or manual height
- Volumetric Clouds and layer height
- Sun and cloud shadows
- Post Process, convolution bloom, and lens flare
- Section selection and preview

## Advanced

Advanced contains Planet Completion, Section Proxy Padding, material build, and the complete Environment profile. Changes apply to a preview session, and a successful build links its revision to the Planet Asset.

## Preview rules

Preview is an authoring environment, not the runtime World. Runtime Preview follows a separate path that consumes published Proxy Bake payloads. Even when Preview looks correct, check stale status and Runtime Preview readiness in Diagnostics.

## Interaction and diagnostics

The viewport adjusts camera speed and framing for the planet radius. A failed Padding Material Preview reports the failed Section count; use `PlanetX.VisualEdit.Dump` for details.

Save before and after edits. When Section geometry or material sources change, review the stale state of both Completion/Padding and Proxy Bake.
