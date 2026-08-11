# Environment Settings

`EnvironmentSettings` on the Planet Asset is a reusable planet-wide authoring profile. A Level's `PlanetX Environment Manager` applies that profile or supplies a Level-only override. Ratios are relative to the canonical Planet Radius; names ending in `Km` use kilometers.

## Planet Asset: Atmosphere Profile

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bEnabled` | true | Enables the PlanetX-managed Sky Atmosphere profile. |
| `GroundAlbedo` | (0.4,0.4,0.4,1) | Linear ground reflectance used by multi-scattering. |
| `MultiScatteringFactor` | 1.0 | Atmosphere multi-scattering multiplier. |
| `bAutoScaleAtmosphereHeight` | true | Derives atmosphere-shell height from Planet Radius. |
| `AutoHeightRatio` | 0.01 | Planet Radius ratio used by automatic height. |
| `MinAutoHeightKm` / `MaxAutoHeightKm` | 6 / 100 km | Minimum and maximum automatically resolved height. |
| `HeightRatio` | 0.06 | Atmosphere-height/Planet-Radius ratio used when automatic height is disabled. |
| `bAutoScaleDensityProfile` | true | Adapts density falloff to the authored atmosphere shell. |
| `RayleighDensityHeightRatio` | 0.133333 | Rayleigh density falloff height as a shell ratio. |
| `MieDensityHeightRatio` | 0.02 | Mie density falloff height as a shell ratio. |
| `RayleighScatteringScale` | 0.0331 | Overall Rayleigh scattering intensity. |
| `RayleighScattering` | (0.175287,0.409607,1) | Rayleigh spectral color. |
| `RayleighExponentialDistributionKm` | 8 km | Altitude where Rayleigh density falls to approximately 40 percent. |
| `MieScatteringScale` | 0.003996 | Mie scattering intensity. |
| `MieScattering` | White | Mie scattering color. |
| `MieAbsorptionScale` | 0.000444 | Mie absorption intensity. |
| `MieAbsorption` | White | Mie absorption color. |
| `MieAnisotropy` | 0.8 | Mie forward-scattering bias. |
| `MieExponentialDistributionKm` | 1.2 km | Altitude where Mie scattering/absorption falls to approximately 40 percent. |
| `OtherAbsorptionScale` | 0.001881 | Strength of the ozone-like absorption layer. |
| `OtherAbsorption` | (0.345561,1,0.045189,1) | Spectral color of the additional absorption layer. |
| `SkyLuminanceFactor` | White | Art-direction multiplier for sky luminance. |
| `SkyAndAerialPerspectiveLuminanceFactor` | White | Luminance multiplier for sky and aerial perspective. |
| `AerialPerspectiveViewDistanceScale` | 1.0 | Distance scale for aerial perspective. |
| `HeightFogContribution` | 1.0 | Sky Atmosphere contribution to Height Fog. |
| `TransmittanceMinLightElevationAngle` | -90° | Minimum light elevation used by transmittance calculations. |

## Planet Asset: Cloud Profile

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bEnabled` | true | Enables the PlanetX-managed Volumetric Cloud profile. |
| `BottomAltitudeRatio` | 0.005 | Cloud-bottom altitude divided by Planet Radius. |
| `LayerHeightRatio` | 0.01 | Cloud-layer thickness divided by Planet Radius. |
| `NightVisibilityFloor` | 0, 0–1 | Minimum cloud brightness/visibility retained at night. |
| `TerminatorSoftness` | 0.22, at least 0.001 | Softness of the day/night cloud boundary. |
| `TerminatorOffset` | 0, -1–1 | Offset of the cloud terminator. |
| `GroundAlbedo` | (0.4,0.4,0.4,1) | Linear ground reflectance used for cloud lighting. |
| `bUsePerSampleAtmosphericLightTransmittance` | false | Evaluates atmosphere transmittance per cloud sample, increasing both quality and cost. |
| `SkyLightCloudBottomOcclusion` | 0.5 | Sky Light occlusion at the cloud bottom. |
| `AerialPerspectiveRayleighStartDistanceKm` / `AerialPerspectiveRayleighFadeDistanceKm` | 0 / 0 | Start/fade distances for cloud Rayleigh aerial perspective. Zero preserves engine-default behavior. |
| `AerialPerspectiveMieStartDistanceKm` / `AerialPerspectiveMieFadeDistanceKm` | 0 / 0 | Start/fade distances for cloud Mie aerial perspective. |
| `StopTracingTransmittanceThreshold` | 0.005 | Stops cloud tracing once accumulated transmittance falls below this value. |

## Planet Asset: Sun and Cloud Shadow Profile

| Setting | Default | Purpose |
| --- | --- | --- |
| `bAtmosphereSunLight` | true | Uses the Directional Light as an Atmosphere Sun Light. |
| `bCastShadowsOnClouds` | true | Allows the light to cast onto clouds. |
| `bCastShadowsOnAtmosphere` | true | Allows the light to cast onto atmosphere. |
| `bCastCloudShadows` | true | Enables cloud shadow maps. |
| `CloudShadowExtentKm` | 400 km, at least 1 | Coverage of the cloud shadow map. |
| `CloudShadowMapResolutionScale` | 4.0, at least 0.25 | Cloud shadow map resolution multiplier. |
| `CloudShadowRaySampleCountScale` | 1.0, at least 0.25 | Cloud shadow ray-sample multiplier. |
| `CloudShadowStrength` | 1.0, at least 0 | Overall cloud shadow strength. |
| `CloudShadowOnAtmosphereStrength` | 1.0, at least 0 | Cloud shadow strength visible on atmosphere. |
| `CloudShadowOnSurfaceStrength` | 1.0, at least 0 | Cloud shadow strength visible on surfaces. |
| `CloudShadowDepthBias` | 0 | Cloud shadow depth bias. |
| `bUseSeparateGroundOverride` | false | Uses a separate Ground extent/resolution/sample profile. |
| `GroundCloudShadowExtentKm` | 400 km | Ground-only shadow extent. |
| `GroundCloudShadowMapResolutionScale` | 4.0 | Ground-only resolution multiplier. |
| `GroundCloudShadowRaySampleCountScale` | 1.0 | Ground-only ray-sample multiplier. |

## Planet Asset: Post Process and Space Background

| Setting | Default | Purpose |
| --- | --- | --- |
| `PostProcess.bEnabled` | true | Applies the per-planet Post Process profile. |
| `bUseConvolutionBloom` | true | Uses Convolution Bloom. |
| `bEnableLensFlare` | true | Allows lens flare for this planet. PlanetX Rendering must also enable it at project level. |
| `LensFlareIntensity` | 0.12, at least 0 | Per-planet lens-flare intensity. |
| `SpaceBackground.bEnabled` | true | Uses the Environment Manager's single space-background sphere. |
| `Material` | PlanetX default space-background Material | Material on the background sphere, stored as a soft reference. |
| `VisibilityMode` | `OrbitOnly` | Shows it in `OrbitOnly` or `OrbitAndGround`. |

## Environment Manager: Domains and profile sources

| Setting | Default | Purpose |
| --- | --- | --- |
| `CloudMode` | `PlanetXManaged` | `PlanetXManaged` creates and controls PlanetX cloud presentation; `UseExistingLevel` adopts an existing Level cloud. |
| `CloudProfileSource` | `PlanetAssetDefaults` | Uses the Asset Cloud Profile or a `LevelOverride`. |
| `CloudProfileOverride` | Profile defaults | Complete Cloud Profile editable only for a Level Override. |
| `GroundCloudSource` | `SamePlanetXCloud` | Uses the same PlanetX cloud on Ground or selects `ExistingLevelCloud`. |
| `AtmosphereMode` | `PlanetXManaged` | Manages PlanetX atmosphere or uses the existing Level atmosphere. |
| `AtmosphereProfileSource` | `PlanetAssetDefaults` | Selects the Asset Atmosphere or a Level Override. |
| `AtmosphereProfileOverride` | Profile defaults | Complete Atmosphere Profile editable only for a Level Override. |
| `SunProfileSource` | `PlanetAssetDefaults` | Selects Asset Sun/Cloud Shadow or a Level Override. |
| `SunProfileOverride` | Profile defaults | Complete Sun/Shadow Profile editable only for a Level Override. |
| `SpaceBackgroundMode` | `PlanetXManaged` | Manages the PlanetX background or leaves existing Level presentation in place. |
| `SpaceBackgroundProfileSource` | `PlanetAssetDefaults` | Selects the Asset Background or a Level Override. |
| `SpaceBackgroundProfileOverride` | Profile defaults | Complete Background Profile editable only for a Level Override. |

Resolved Profiles and resolved heights are read-only results. `CloudShadow` is also a runtime cache derived from the Sun Profile and must not be edited directly.

## Environment Manager: runtime and bindings

| Setting | Default | Purpose |
| --- | --- | --- |
| `bApplyOnConstruction` | true | Applies the current profile during editor construction. |
| `InitialRuntimeSpace` | `Auto` | Leaves startup space to transition state or forces `Orbit`/`Ground`. `Ground` is useful for a Level that begins directly in Ground gameplay without a Transition Endpoint. |
| `bUpdateEveryTick` | true | Updates sun, bindings, and transition-dependent environment each tick. Follow the external-runtime-driver contract when another service owns updates. |
| `ManagedPlanetActor` | None | Supplies environment center, radius, and the Planet Asset profile. |
| `ExistingVolumetricCloud` / `ExistingVolumetricCloudComponent` | None | Existing cloud Actor or Component to use. A Component reference is more direct. |
| `ExistingSkyAtmosphere` / `ExistingSkyAtmosphereComponent` | None | Existing Sky Atmosphere Actor or Component. |
| `ExistingSunLight` | None | Directional Light that supplies sun and cloud shadows. |
| `ExistingSkyLight` | None | Existing Sky Light binding. |
| `ExistingHeightFog` | None | Existing Exponential Height Fog binding. |
| `bAutoBindEnvironmentActors` | true | Searches the World for suitable environment Actors when explicit references are empty. |
| `AutoBindRetryIntervalSeconds` | 1 s, at least 0.1 | Delay after an auto-bind miss before searching again for streamed Actors. |
| `bDeriveSunDirectionFromDirectionalLight` | true | Resolves sun direction from the bound Directional Light. |
| `bUseNegativeDirectionalLightForward` | true | Treats Directional Light -Forward as the planet-to-sun direction. Change it only when the consuming Material uses the opposite convention. |
| `bDerivePlanetSettingsFromSkyAtmosphere` | true | Reads Planet Center/Radius from an existing Sky Atmosphere. |
| `bDeriveCloudLayerAltitudeFromVolumetricCloud` | true | Reads cloud-layer altitude from an existing Volumetric Cloud. |

## Orbit Cloud Lighting and Existing Cloud Sync

| Setting | Default | Purpose |
| --- | --- | --- |
| `OrbitCloudLighting.PlanetCenter` | (0,0,0) | Fallback planet center for cloud-material lighting. |
| `PlanetRadius` | 250,000 cm, at least 1 | Fallback radius for cloud lighting. |
| `CloudLayerAltitude` | 10,000 cm, at least 0 | Cloud-layer altitude used by lighting. |
| `NightCloudVisibilityFloor` | 0, 0–1 | Minimum night cloud visibility. |
| `TerminatorSoftness` | 0.22, at least 0.001 | Cloud terminator softness. |
| `CloudTerminatorOffset` | 0, -1–1 | Cloud terminator offset. |
| `CloudSync.bReadExistingCloudAsGroundTruth` | true | Reads current parameters from the existing cloud as ground truth. |
| `CoverageParameterName` | `Coverage` | Coverage parameter name. |
| `DensityParameterName` | `Density` | Density parameter name. |
| `WindDirectionParameterName` | `WindDirection` | Wind-direction parameter name. |
| `WindSpeedParameterName` | `WindSpeed` | Wind-speed parameter name. |
| `CloudTimeParameterName` | `CloudTime` | Cloud-time parameter name. |

Sync names must match the consuming Material parameters exactly, including case.

## Orbit render quality and Ground presentation

`GroundEnvironmentPresentation` owns the Ground-presentation setting group below.

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bOverrideVolumetricRenderTargetQuality` | true | Overrides Volumetric Render Target mode/scale in Orbit. |
| `bOverrideVolumetricRenderTargetEnabled` | true | Overrides use of the Volumetric Render Target for Orbit cloud. |
| `VolumetricRenderTargetMode` | 1, 0–3 | Unreal Volumetric Render Target mode. Verify project quality and compatibility. |
| `VolumetricRenderTargetScale` | 1.0, 0.1–1 | Render-target resolution scale. |
| `bEnableReprojectionBoxConstraint` | true | Constrains volumetric reprojection to its valid box. |
| `OrbitCloudRenderQuality.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Transition Alpha at which the Orbit cloud-quality override activates. |
| `bOverrideAerialPerspectiveLUTDepth` | true | Overrides Aerial Perspective LUT depth in Orbit. |
| `AerialPerspectiveLUTDepthKm` | 512 km, at least 1 | Atmosphere depth represented by the LUT. |
| `OrbitAtmosphereRenderQuality.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Activation threshold for atmosphere-quality override. |
| `bEnableGroundPresentation` | true | Uses a fixed, nearly flat atmosphere presentation on Ground. |
| `bUseAdaptiveGroundRadius` | true | Derives a practical Ground radius from the baked Level footprint. |
| `MinimumGroundRadiusKm` | 6,360 km, 1–10,000 | Fallback Ground radius when adaptive bounds are unavailable. |
| `MaximumGroundSurfaceDropKm` | 2.5 km, 0.01–100 | Maximum allowed surface drop below the tangent plane at the Level edge. |
| `GroundSurfaceClearanceKm` | 0.1 km, 0–10 | Keeps the virtual atmosphere surface below the lowest Ground geometry. |
| `TransitionBlendStartAlpha` | 0.75, 0–0.99 | Alpha at which atmosphere begins moving into its Ground presentation frame. |
| `bPreviewInEditor` | true | Applies the same Ground presentation in PlanetX Mode's Level view. |

## Orbit Cloud Tracing

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bOverrideVolumetricCloudTracing` | true | Overrides cloud-tracing distances in Orbit. |
| `TracingStartMaxDistanceKm` | 10,000 km, at least 1 | Maximum permitted tracing-start distance. |
| `TracingStartDistanceFromCameraKm` | 0 km, at least 0 | Distance from camera to tracing start. |
| `TracingMaxDistanceMode` | `DistanceFromPointOfView` | Selects how Unreal interprets maximum tracing distance. |
| `TracingMaxDistanceKm` | 10,000 km, at least 0.1 | Maximum cloud-tracing distance. |
| `OrbitCloudTracing.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Alpha threshold for tracing override activation. |

## Material Parameter Collection

Assign the MPC through `EnvironmentParameterCollection`. `MpcParameters` maps the names PlanetX writes.

| Values | Default parameter names |
| --- | --- |
| `PlanetCenter`, `PlanetRadius`, `CloudLayerRadius`, `SunDirection` | `PlanetX_PlanetCenter`, `PlanetX_PlanetRadius`, `PlanetX_CloudLayerRadius`, `PlanetX_SunDirection` |
| `NightCloudVisibilityFloor`, `TerminatorSoftness`, `CloudTerminatorOffset` | `PlanetX_NightCloudVisibilityFloor`, `PlanetX_TerminatorSoftness`, `PlanetX_CloudTerminatorOffset` |
| `OrbitCloudVisibility`, `GroundCloudVisibility`, `EnvironmentTransitionAlpha` | `PlanetX_OrbitCloudVisibility`, `PlanetX_GroundCloudVisibility`, `PlanetX_EnvironmentTransitionAlpha` |
| `OrbitCloudShadowStrength`, `CloudShadowOnAtmosphereStrength`, `CloudShadowOnSurfaceStrength` | `PlanetX_OrbitCloudShadowStrength`, `PlanetX_CloudShadowOnAtmosphereStrength`, `PlanetX_CloudShadowOnSurfaceStrength` |
| `CloudShadowDepthBias`, `CloudShadowExtentKm`, `CloudShadowMapResolutionScale`, `CloudShadowRaySampleCountScale` | The same names with the default `PlanetX_` prefix |

If you rename a mapping, update the MPC and every consuming Material as well. A missing parameter prevents that value from reaching the Material.

## Derived Cloud Shadow runtime cache

The Manager's `CloudShadow` is a cache resolved from `SunProfileOverride` or the Asset Sun Profile, not an authoring source. Its internal `Mode` defaults to `PlanetXManagedOverride`, with `bEnableOrbitCloudShadow=true` and `bRestoreSourceLightWhenGroundActive=true`. `DesiredOrbitLightShadow` serves Orbit Material Approximation, `DirectionalLightOverrideShadow` serves the Orbit Directional Light, and `GroundDirectionalLightOverrideShadow` serves Ground. When `bUseSeparateGroundDirectionalLightOverride=false`, Ground shares the Orbit override. Edit the Sun/Cloud Shadow Profile above instead of this cache.
