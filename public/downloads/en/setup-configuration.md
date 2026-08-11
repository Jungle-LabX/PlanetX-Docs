# Setup and Configuration

## Plugin does not load

Check `PlanetX.uplugin` and the project's EngineAssociation. The current baseline is UE 5.8 with Runtime and Editor modules. GeometryProcessing and PCG must be enabled, and the target-platform toolchain must be installed.

Inspect the first module-load error in the Editor log. Later compile failures can be cascading results.

## Planet Asset is missing from Add

- Confirm that PlanetXEditor loaded.
- Use the correct Content Browser Add menu.
- Confirm that the project built an Editor target.
- Restart the Editor after enabling the plugin.

## Actor cannot resolve a planet

A valid Reference Planet Actor on the Coordinate Component takes priority over Planet ID. Confirm that its Planet Component has a Planet Asset and registered successfully at runtime.

When multiple actors share one Planet ID, provide Planet Binding ID. The Section dropdown is populated from enabled Sections on planets placed in the current World, not from every asset in the Content Browser.

## World Partition warning

`EPlanetXActorSpatialLoadingPolicy::PlanetXManaged` keeps Orbit actors non-spatial. With `ActorManaged`, the project owns Is Spatially Loaded. Data Layers and Streaming Sources are not modified automatically. Use `GetActorSpatialLoadingPolicy`, `ShouldForceOwnerAlwaysLoaded`, and `ApplySpatialLoadingPolicyToOwner` when diagnosing the effective setting.
