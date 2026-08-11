# 환경 설정

Planet Asset의 `EnvironmentSettings`는 행성 전체에서 재사용하는 저작 Profile이고, Level의 `PlanetX Environment Manager`는 이 Profile을 적용하거나 해당 Level만 Override합니다. 거리 비율은 canonical Planet Radius에 대한 비율이며, `Km`가 붙은 값은 km입니다.

## Planet Asset: Atmosphere Profile

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bEnabled` | true | PlanetX-managed Sky Atmosphere Profile을 활성화합니다. |
| `GroundAlbedo` | (0.4,0.4,0.4,1) | Multi-scattering에 반영할 선형 지표 반사색입니다. |
| `MultiScatteringFactor` | 1.0 | 대기 다중 산란 배율입니다. |
| `bAutoScaleAtmosphereHeight` | true | Planet Radius에서 대기 shell 높이를 자동 계산합니다. |
| `AutoHeightRatio` | 0.01 | Auto 높이의 Planet Radius 비율입니다. |
| `MinAutoHeightKm` / `MaxAutoHeightKm` | 6 / 100 km | 자동 계산 높이의 최소/최대입니다. |
| `HeightRatio` | 0.06 | Auto를 사용하지 않을 때 대기 높이/Planet Radius 비율입니다. |
| `bAutoScaleDensityProfile` | true | 대기 shell 높이에 맞춰 density falloff를 조정합니다. |
| `RayleighDensityHeightRatio` | 0.133333 | Rayleigh density falloff 높이의 shell 비율입니다. |
| `MieDensityHeightRatio` | 0.02 | Mie density falloff 높이의 shell 비율입니다. |
| `RayleighScatteringScale` | 0.0331 | Rayleigh scattering 전체 강도입니다. |
| `RayleighScattering` | (0.175287,0.409607,1) | Rayleigh spectral color입니다. |
| `RayleighExponentialDistributionKm` | 8 km | Rayleigh가 약 40%로 감소하는 기준 고도입니다. |
| `MieScatteringScale` | 0.003996 | Mie 산란 강도입니다. |
| `MieScattering` | White | Mie 산란색입니다. |
| `MieAbsorptionScale` | 0.000444 | Mie 흡수 강도입니다. |
| `MieAbsorption` | White | Mie 흡수색입니다. |
| `MieAnisotropy` | 0.8 | Mie 전방 산란 편향입니다. |
| `MieExponentialDistributionKm` | 1.2 km | Mie 산란/흡수가 약 40%로 감소하는 기준 고도입니다. |
| `OtherAbsorptionScale` | 0.001881 | Ozone과 유사한 추가 흡수층 강도입니다. |
| `OtherAbsorption` | (0.345561,1,0.045189,1) | 추가 흡수층 spectral color입니다. |
| `SkyLuminanceFactor` | White | Sky luminance의 art-direction 배율입니다. |
| `SkyAndAerialPerspectiveLuminanceFactor` | White | Sky와 Aerial Perspective luminance 배율입니다. |
| `AerialPerspectiveViewDistanceScale` | 1.0 | Aerial Perspective 적용 거리 배율입니다. |
| `HeightFogContribution` | 1.0 | Sky Atmosphere가 Height Fog에 기여하는 정도입니다. |
| `TransmittanceMinLightElevationAngle` | -90° | Transmittance 계산에서 허용할 최소 광원 고도각입니다. |

## Planet Asset: Cloud Profile

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bEnabled` | true | PlanetX-managed Volumetric Cloud Profile을 활성화합니다. |
| `BottomAltitudeRatio` | 0.005 | 구름층 바닥 고도/Planet Radius 비율입니다. |
| `LayerHeightRatio` | 0.01 | 구름층 두께/Planet Radius 비율입니다. |
| `NightVisibilityFloor` | 0, 0–1 | 야간에도 남길 구름 밝기/가시성 최저값입니다. |
| `TerminatorSoftness` | 0.22, 최소 0.001 | 주야 경계의 부드러움입니다. |
| `TerminatorOffset` | 0, -1–1 | 구름 주야 경계 위치 Offset입니다. |
| `GroundAlbedo` | (0.4,0.4,0.4,1) | 구름 조명에 사용하는 선형 지표 반사색입니다. |
| `bUsePerSampleAtmosphericLightTransmittance` | false | 각 cloud sample에서 대기 광 투과를 계산합니다. 품질과 비용이 함께 증가합니다. |
| `SkyLightCloudBottomOcclusion` | 0.5 | Sky Light가 구름 하단에서 차폐되는 강도입니다. |
| `AerialPerspectiveRayleighStartDistanceKm` / `AerialPerspectiveRayleighFadeDistanceKm` | 0 / 0 | 구름의 Rayleigh Aerial Perspective 시작/전이 거리입니다. 0은 Engine 기본 동작을 유지합니다. |
| `AerialPerspectiveMieStartDistanceKm` / `AerialPerspectiveMieFadeDistanceKm` | 0 / 0 | 구름의 Mie Aerial Perspective 시작/전이 거리입니다. |
| `StopTracingTransmittanceThreshold` | 0.005 | 누적 transmittance가 이 값 아래일 때 cloud tracing을 조기 종료합니다. |

## Planet Asset: Sun과 Cloud Shadow Profile

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAtmosphereSunLight` | true | Directional Light를 Atmosphere Sun Light로 사용합니다. |
| `bCastShadowsOnClouds` | true | 광원이 구름에 그림자를 만듭니다. |
| `bCastShadowsOnAtmosphere` | true | 광원이 대기에 그림자를 만듭니다. |
| `bCastCloudShadows` | true | 구름 그림자 맵을 활성화합니다. |
| `CloudShadowExtentKm` | 400 km, 최소 1 | cloud shadow map이 덮는 범위입니다. |
| `CloudShadowMapResolutionScale` | 4.0, 최소 0.25 | shadow map 해상도 배율입니다. |
| `CloudShadowRaySampleCountScale` | 1.0, 최소 0.25 | cloud shadow ray sample 배율입니다. |
| `CloudShadowStrength` | 1.0, 0 이상 | 전체 구름 그림자 강도입니다. |
| `CloudShadowOnAtmosphereStrength` | 1.0, 0 이상 | 대기에 보이는 구름 그림자 강도입니다. |
| `CloudShadowOnSurfaceStrength` | 1.0, 0 이상 | 표면에 보이는 구름 그림자 강도입니다. |
| `CloudShadowDepthBias` | 0 | cloud shadow depth bias입니다. |
| `bUseSeparateGroundOverride` | false | Ground에서 별도의 extent/resolution/sample profile을 사용합니다. |
| `GroundCloudShadowExtentKm` | 400 km | Ground 전용 shadow 범위입니다. |
| `GroundCloudShadowMapResolutionScale` | 4.0 | Ground 전용 해상도 배율입니다. |
| `GroundCloudShadowRaySampleCountScale` | 1.0 | Ground 전용 ray sample 배율입니다. |

## Planet Asset: Post Process와 Space Background

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PostProcess.bEnabled` | true | 행성별 Post Process Profile을 적용합니다. |
| `bUseConvolutionBloom` | true | Convolution Bloom을 사용합니다. |
| `bEnableLensFlare` | true | 이 행성에서 Lens Flare를 허용합니다. Project의 PlanetX Rendering 설정도 켜져 있어야 합니다. |
| `LensFlareIntensity` | 0.12, 0 이상 | 행성별 Lens Flare 강도입니다. |
| `SpaceBackground.bEnabled` | true | Environment Manager의 단일 Space Background Sphere를 사용합니다. |
| `Material` | PlanetX 기본 Space Background Material | Background Sphere Material입니다. Soft reference로 저장됩니다. |
| `VisibilityMode` | `OrbitOnly` | `OrbitOnly` 또는 `OrbitAndGround`에서 표시 범위를 정합니다. |

## Environment Manager: Domain과 Profile Source

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `CloudMode` | `PlanetXManaged` | `PlanetXManaged`가 PlanetX 구름을 만들고 제어합니다. `UseExistingLevel`은 기존 Level Cloud를 채택합니다. |
| `CloudProfileSource` | `PlanetAssetDefaults` | Asset의 Cloud Profile을 쓰거나 `LevelOverride`를 사용합니다. |
| `CloudProfileOverride` | Profile 기본값 | Level Override에서만 편집되는 Cloud Profile 전체입니다. |
| `GroundCloudSource` | `SamePlanetXCloud` | Ground에서도 같은 PlanetX Cloud를 사용하거나 `ExistingLevelCloud`를 사용합니다. |
| `AtmosphereMode` | `PlanetXManaged` | PlanetX Atmosphere를 관리하거나 기존 Level Atmosphere를 사용합니다. |
| `AtmosphereProfileSource` | `PlanetAssetDefaults` | Asset Atmosphere 또는 Level Override를 선택합니다. |
| `AtmosphereProfileOverride` | Profile 기본값 | Level Override에서만 편집되는 Atmosphere Profile 전체입니다. |
| `SunProfileSource` | `PlanetAssetDefaults` | Asset Sun/Cloud Shadow 또는 Level Override를 선택합니다. |
| `SunProfileOverride` | Profile 기본값 | Level Override에서만 편집되는 Sun/Shadow Profile 전체입니다. |
| `SpaceBackgroundMode` | `PlanetXManaged` | PlanetX Background를 관리하거나 기존 Level 표현을 유지합니다. |
| `SpaceBackgroundProfileSource` | `PlanetAssetDefaults` | Asset Background 또는 Level Override를 선택합니다. |
| `SpaceBackgroundProfileOverride` | Profile 기본값 | Level Override에서만 편집되는 Background Profile 전체입니다. |

Resolved Profile과 Resolved Height 값은 읽기 전용 결과입니다. `CloudShadow` 역시 Sun Profile에서 계산되는 Runtime cache이므로 직접 수정하지 않습니다.

## Environment Manager: Runtime과 Binding

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bApplyOnConstruction` | true | Editor Construction 시 현재 Profile을 적용합니다. |
| `InitialRuntimeSpace` | `Auto` | 시작 공간을 transition 상태에 맡기거나 `Orbit`/`Ground`로 고정합니다. Transition Endpoint 없이 Ground에서 시작하는 Level은 `Ground`가 유용합니다. |
| `bUpdateEveryTick` | true | Sun, binding과 transition-dependent 환경을 매 Tick 갱신합니다. 외부 runtime driver가 관리하는 경우 계약에 맞춰 사용하세요. |
| `ManagedPlanetActor` | None | 환경의 중심, 반지름과 Asset Profile을 제공하는 Planet Actor입니다. |
| `ExistingVolumetricCloud` / `ExistingVolumetricCloudComponent` | None | 사용할 기존 Cloud Actor 또는 Component입니다. Component 참조가 더 직접적입니다. |
| `ExistingSkyAtmosphere` / `ExistingSkyAtmosphereComponent` | None | 사용할 기존 Sky Atmosphere Actor 또는 Component입니다. |
| `ExistingSunLight` | None | Sun과 cloud shadow를 제공하는 Directional Light입니다. |
| `ExistingSkyLight` | None | 기존 Sky Light binding입니다. |
| `ExistingHeightFog` | None | 기존 Exponential Height Fog binding입니다. |
| `bAutoBindEnvironmentActors` | true | 명시적 참조가 없으면 World에서 적절한 환경 Actor를 찾습니다. |
| `AutoBindRetryIntervalSeconds` | 1 s, 최소 0.1 | Streaming Actor를 발견하기 위해 auto-bind miss 뒤 재검색하는 간격입니다. |
| `bDeriveSunDirectionFromDirectionalLight` | true | Bound Directional Light에서 Sun Direction을 계산합니다. |
| `bUseNegativeDirectionalLightForward` | true | Directional Light의 -Forward를 행성에서 태양으로 향하는 방향으로 사용합니다. Material 방향이 반대일 때만 변경하세요. |
| `bDerivePlanetSettingsFromSkyAtmosphere` | true | 기존 Sky Atmosphere에서 Planet Center/Radius를 읽습니다. |
| `bDeriveCloudLayerAltitudeFromVolumetricCloud` | true | 기존 Volumetric Cloud에서 cloud layer altitude를 읽습니다. |

## Orbit Cloud Lighting과 Existing Cloud Sync

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `OrbitCloudLighting.PlanetCenter` | (0,0,0) | cloud material lighting의 행성 중심 fallback입니다. |
| `PlanetRadius` | 250,000 cm, 최소 1 | cloud lighting 계산용 fallback 반지름입니다. |
| `CloudLayerAltitude` | 10,000 cm, 0 이상 | cloud lighting의 layer altitude입니다. |
| `NightCloudVisibilityFloor` | 0, 0–1 | 야간 cloud visibility 최저값입니다. |
| `TerminatorSoftness` | 0.22, 최소 0.001 | cloud 주야 경계 softness입니다. |
| `CloudTerminatorOffset` | 0, -1–1 | cloud 주야 경계 Offset입니다. |
| `CloudSync.bReadExistingCloudAsGroundTruth` | true | Existing Cloud의 현재 parameter를 Ground truth로 읽습니다. |
| `CoverageParameterName` | `Coverage` | coverage parameter 이름입니다. |
| `DensityParameterName` | `Density` | density parameter 이름입니다. |
| `WindDirectionParameterName` | `WindDirection` | wind direction parameter 이름입니다. |
| `WindSpeedParameterName` | `WindSpeed` | wind speed parameter 이름입니다. |
| `CloudTimeParameterName` | `CloudTime` | cloud time parameter 이름입니다. |

Sync 이름은 사용 중인 Material parameter와 대소문자까지 일치해야 합니다.

## Orbit Render Quality와 Ground Presentation

`GroundEnvironmentPresentation`이 아래 Ground presentation 설정 묶음을 소유합니다.

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bOverrideVolumetricRenderTargetQuality` | true | Orbit에서 Volumetric Render Target mode/scale을 Override합니다. |
| `bOverrideVolumetricRenderTargetEnabled` | true | Orbit cloud를 위해 Volumetric Render Target 사용 여부를 Override합니다. |
| `VolumetricRenderTargetMode` | 1, 0–3 | Unreal Volumetric Render Target mode입니다. 프로젝트의 품질/호환성을 확인하세요. |
| `VolumetricRenderTargetScale` | 1.0, 0.1–1 | Render Target resolution scale입니다. |
| `bEnableReprojectionBoxConstraint` | true | Volumetric reprojection을 유효 box에 제한합니다. |
| `OrbitCloudRenderQuality.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Transition Alpha가 이 기준을 넘을 때 Orbit cloud quality override를 활성화합니다. |
| `bOverrideAerialPerspectiveLUTDepth` | true | Orbit에서 Aerial Perspective LUT depth를 Override합니다. |
| `AerialPerspectiveLUTDepthKm` | 512 km, 최소 1 | LUT가 표현할 대기 깊이입니다. |
| `OrbitAtmosphereRenderQuality.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Atmosphere quality override 활성 기준입니다. |
| `bEnableGroundPresentation` | true | Ground에서 거의 평면에 가까운 고정 대기 표현을 사용합니다. |
| `bUseAdaptiveGroundRadius` | true | Bake된 Level footprint에서 실용적인 Ground radius를 계산합니다. |
| `MinimumGroundRadiusKm` | 6,360 km, 1–10,000 | adaptive bounds가 없을 때의 fallback Ground radius입니다. |
| `MaximumGroundSurfaceDropKm` | 2.5 km, 0.01–100 | Level edge에서 tangent plane 아래 허용할 최대 표면 낙차입니다. |
| `GroundSurfaceClearanceKm` | 0.1 km, 0–10 | virtual atmosphere 표면을 최저 Ground geometry 아래로 내리는 여유입니다. |
| `TransitionBlendStartAlpha` | 0.75, 0–0.99 | Atmosphere가 Ground presentation frame으로 이동하기 시작하는 Alpha입니다. |
| `bPreviewInEditor` | true | PlanetX Mode의 Level View에도 같은 Ground presentation을 적용합니다. |

## Orbit Cloud Tracing

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bOverrideVolumetricCloudTracing` | true | Orbit에서 cloud tracing 거리를 Override합니다. |
| `TracingStartMaxDistanceKm` | 10,000 km, 최소 1 | tracing 시작점에 허용할 최대 거리입니다. |
| `TracingStartDistanceFromCameraKm` | 0 km, 0 이상 | Camera에서 tracing 시작점까지의 거리입니다. |
| `TracingMaxDistanceMode` | `DistanceFromPointOfView` | 최대 tracing 거리를 View 기준 등 Unreal의 mode로 해석합니다. |
| `TracingMaxDistanceKm` | 10,000 km, 최소 0.1 | 최대 cloud tracing 거리입니다. |
| `OrbitCloudTracing.OrbitOverrideActivationThreshold` | 0.5, 0–1 | tracing override 활성 기준 Alpha입니다. |

## Material Parameter Collection

`EnvironmentParameterCollection`에 사용할 MPC를 지정합니다. `MpcParameters`는 PlanetX가 쓰는 parameter 이름 매핑입니다.

| 값 종류 | 기본 parameter 이름 |
| --- | --- |
| `PlanetCenter`, `PlanetRadius`, `CloudLayerRadius`, `SunDirection` | `PlanetX_PlanetCenter`, `PlanetX_PlanetRadius`, `PlanetX_CloudLayerRadius`, `PlanetX_SunDirection` |
| `NightCloudVisibilityFloor`, `TerminatorSoftness`, `CloudTerminatorOffset` | `PlanetX_NightCloudVisibilityFloor`, `PlanetX_TerminatorSoftness`, `PlanetX_CloudTerminatorOffset` |
| `OrbitCloudVisibility`, `GroundCloudVisibility`, `EnvironmentTransitionAlpha` | `PlanetX_OrbitCloudVisibility`, `PlanetX_GroundCloudVisibility`, `PlanetX_EnvironmentTransitionAlpha` |
| `OrbitCloudShadowStrength`, `CloudShadowOnAtmosphereStrength`, `CloudShadowOnSurfaceStrength` | `PlanetX_OrbitCloudShadowStrength`, `PlanetX_CloudShadowOnAtmosphereStrength`, `PlanetX_CloudShadowOnSurfaceStrength` |
| `CloudShadowDepthBias`, `CloudShadowExtentKm`, `CloudShadowMapResolutionScale`, `CloudShadowRaySampleCountScale` | 같은 이름 앞에 `PlanetX_`를 붙인 기본값 |

이름을 변경했다면 MPC와 모든 소비 Material도 함께 변경하세요. Parameter가 없으면 해당 값은 Material에 전달되지 않습니다.

## 파생 Cloud Shadow Runtime Cache

Manager의 `CloudShadow`는 편집 원본이 아니라 `SunProfileOverride` 또는 Asset Sun Profile에서 계산되는 cache입니다. 내부 `Mode` 기본값은 `PlanetXManagedOverride`이고, `bEnableOrbitCloudShadow=true`, `bRestoreSourceLightWhenGroundActive=true`입니다. `DesiredOrbitLightShadow`는 Orbit Material Approximation용, `DirectionalLightOverrideShadow`는 Orbit Directional Light용, `GroundDirectionalLightOverrideShadow`는 Ground용 상태이며, `bUseSeparateGroundDirectionalLightOverride=false`일 때 Ground도 Orbit Override를 공유합니다. 이 cache를 직접 고치지 말고 위 Sun/Cloud Shadow Profile을 편집하세요.
