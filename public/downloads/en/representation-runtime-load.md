# Representation and Runtime Load

PlanetX treats presentation ownership and World Partition loading as separate policies.

## Representation Domain

`EPlanetXRepresentationDomain` describes an actor's default presentation domain.

- Ground actors belong to the original Level presentation.
- Orbit actors appear in Planet/Compare editor views and Orbit/Transition runtime presentation.
- Global presentation actors can have separate visibility rules.

PlanetX Mode uses the domain in its Planet, Compare, and Level views when comparing source and proxy content.

## Actor Spatial Loading Policy

`EPlanetXActorSpatialLoadingPolicy` defines who owns the Actor's World Partition spatial-loading setting.

- `PlanetXManaged` keeps an Orbit actor non-spatial so it remains available to the orbit representation.
- `ActorManaged` leaves the Actor's Is Spatially Loaded setting under project control.

This policy does not configure Data Layer membership or Streaming Sources. Those systems remain project-owned.

## Applying the policy

Use `ShouldForceOwnerAlwaysLoaded` to inspect the effective result and `ApplySpatialLoadingPolicyToOwner` to apply it. The apply function can also run in the editor. Verify the resulting Actor, World Partition, and Data Layer configuration against project policy.

## Visibility versus residency

Hidden and unloaded are different states. Planet proxy visibility, Section proxy residency, and Runtime Preview residency are tracked separately. Use Runtime Monitor to inspect registration, realized component count, and renderability together.
