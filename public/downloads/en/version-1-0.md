# PlanetX 1.0.1 - Pending

Pending maintenance update. Fab currently distributes PlanetX 1.0 Mercury; the changes below are not available in the Fab build until 1.0.1 is published.

## Planned fixes

- **External Browser Monitor:** a missing browser acknowledgement no longer makes the Monitor endpoint or an external bake appear to have failed. Browser launch is best-effort and the endpoint remains available for recovery.
- **PlanetX Mode transform gizmo:** ordinary Actors and multi-selection now fall back to Unreal Engine's native transform gizmo. PlanetX keeps its specialized gizmo for one selected Actor with a Coordinate Component.
- **Global presentation:** `UPlanetXCoordinateComponent` now exposes **Presentation Scope**. Set it to **Global** when an Actor must remain visible in Ground, Orbit, and Transition. This is presentation-only; its Representation Domain, coordinates, Proxy Bake eligibility, and physical-frame ownership do not change.

## Compatibility note

- Existing content remains **Domain Only** by default and preserves the 1.0 presentation behavior.
- Use **Global** only for Actors that intentionally need their authored presentation preserved across all three states.
- Global is not bidirectional Representation Domain conversion. Ground and Orbit remain the coordinate and loading contracts.
