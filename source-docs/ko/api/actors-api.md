# Actor API

## APlanetXPlanetActor

헤더: `PlanetX/Actors/PlanetXPlanetActor.h`

`RegisterToPlanetXRuntime`은 등록 성공 여부를 반환하고 `UnregisterFromPlanetXRuntime`은 `void`입니다. 두 함수의 Blueprint Category는 `PlanetX|Planet`입니다.

Actor는 `Root`, `PlanetComponent`, `PlanetProxyComponent`, `TransitionMorphComponent`, `SkyAtmosphereComponent`, `VolumetricCloudComponent`를 Blueprint Read Only Reference로 제공합니다. Planet Asset은 Planet Component에 지정하고 Planet ID와 Binding ID가 모호하지 않도록 관리하세요.

## APlanetXTransitionEndpoint

헤더: `PlanetX/Actors/PlanetXTransitionEndpoint.h`

이 Actor에는 Blueprint-callable 함수가 없습니다. Reflection Property가 제작 계약을 구성합니다.

| Property | 목적 |
| --- | --- |
| `PlanetId`, `SectionId`, `LevelPairId`, `EndpointRole` | Endpoint와 Orbit·Ground 역할을 식별합니다. |
| `PlanetAsset`, `PlanetActor`, `EnvironmentManagerActor` | 정책 데이터와 참가 Actor를 연결합니다. `PlanetActor`는 Orbit Endpoint에 적용됩니다. |
| `CoordinateComponent` | Endpoint의 표준 Reference와 Pose를 보관합니다. |
| `TransitionCylinder` | Transition 영역을 정의합니다. |
| `bAutoSizeTransitionCylinderToSectionBounds` | 활성화하면 Section Bounds에서 Cylinder를 계산합니다. |
| `RuntimeAlphaUpdateThreshold` | 작은 Runtime Alpha Update를 제한합니다. |

ID는 resolve된 Planet Asset에 실제로 존재하는 Section과 Level Pair와 일치해야 합니다. Ground Endpoint에는 Planet Asset이 필요하며, Orbit Endpoint는 가능한 경우 Planet Actor에서 추론합니다.

## APlanetXEnvironmentManager

헤더: `PlanetX/Actors/PlanetXEnvironmentManager.h`

주요 Environment Command 중 `bool`을 반환하는 함수는 `ValidateEnvironmentBinding`뿐입니다. `void` 변경 함수를 호출하기 전에 검증하고 보고된 Binding 문제를 먼저 해결하세요.

| 반환형 | 함수 |
| --- | --- |
| `bool` | `ValidateEnvironmentBinding` |
| `void` | `CaptureEnvironmentStateFromBindings`, `ApplyEnvironmentState`, `SetEnvironmentTransition`, `ApplyInitialRuntimeSpace` |
| `void` | `ApplyOrbitCloudRenderQualityOverride`, `RestoreSourceCloudRenderQuality` |
| `void` | `ApplyOrbitAtmosphereRenderQualityOverride`, `RestoreSourceAtmosphereRenderQuality` |
| `void` | `ApplyOrbitCloudTracingOverride`, `RestoreSourceCloudTracing` |
| `bool` | `IsOrbitCloudRenderQualityOverrideActive`, `IsOrbitAtmosphereRenderQualityOverrideActive`, `IsOrbitCloudTracingOverrideActive` |

Override Apply와 Restore를 한 쌍으로 관리하세요. `void` Command는 성공 결과를 제공하지 않으므로 먼저 Binding을 검증하고, 제공되는 경우 대응하는 Active State Query를 확인합니다.

## APlanetXRuntimePreviewActor

헤더: `PlanetX/Preview/PlanetXRuntimePreviewActor.h`

일반적인 Runtime 사용에서는 직접 Spawn하기보다 `UPlanetXSubsystem::LoadRuntimePreview`를 권장합니다.

| 반환형 | 함수 |
| --- | --- |
| `bool` | `LoadPreviewFromBakeData` |
| `void` | `AssignPreviewBakeData`, `SetPreviewVisible`, `UnloadPreview` |
| `bool` | `IsPreviewLoaded`, `IsPreviewRenderable` |
| `int32` | `GetRenderableComponentCount`, `GetRealizedComponentCount` |
| Enum 또는 Object | `GetPreviewResidencyState`, `GetSourceBakeData` |

Loaded와 Renderable은 서로 다른 상태입니다. Runtime Budget에 따라 Realized Component 수가 Renderable Component 수보다 작을 수 있습니다.

