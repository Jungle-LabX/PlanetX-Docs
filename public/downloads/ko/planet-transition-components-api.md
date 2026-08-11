# Planet·Transition Component API

## UPlanetXPlanetComponent

헤더: `PlanetX/Components/PlanetXPlanetComponent.h`

| 반환형 | 함수 |
| --- | --- |
| `bool` | `RegisterToPlanetXRuntime`, `RefreshRuntimeRegistration`, `GetGravityAccelerationAtWorldLocation` |
| `void` | `UnregisterFromPlanetXRuntime`, `SetTransitionMorphAlpha`, `SetTransitionMorphActive`, `SetTransitionMorphVisible`, `SetTransitionMorphState` |
| 값 또는 Object | `GetPlanetId`, `GetPlanetBindingId`, `GetPlanetAsset`, `GetPlanetToWorldTransform`, `GetGravitySettings`, `GetTransitionMorphState` |

등록하려면 유효한 World, Planet Asset과 Identity가 필요합니다. 여러 Component가 같은 Planet ID를 사용한다면 Binding ID로 대상을 명확하게 구분하세요.

## UPlanetXPlanetProxyComponent

헤더: `PlanetX/Components/PlanetXPlanetProxyComponent.h`

### Planet 전체 표현

- Source 설정·조회: `SetPlanetAsset`, `GetPlanetAsset`, `SetPlanetMaterialOverride`, `GetPlanetMaterialOverride`, `SetPlanetSphereMeshOverride`, `GetPlanetSphereMeshOverride`
- 표현 Rebuild·제거: `RefreshProxy`, `RebuildPlanetProxy`, `RebuildSectionProxiesFromPlanetAsset`, `ClearSectionProxies`
- Visibility: `SetPlanetProxyVisible`, `SetSectionProxiesVisible`, `SetSectionProxyMorphAlpha`, `GetSectionProxyMorphAlpha`
- 상태 조회: `GetPlanetSphereComponent`, `GetSectionProxyResidencyState`, `GetSectionProxyRealizedComponentCount`

`RebuildSectionProxiesFromPlanetAsset`은 생성 수를 반환합니다. 이 그룹의 나머지 Rebuild, Clear와 Visibility Command는 `void`이므로 결과가 중요하다면 Residency와 Count를 확인하세요.

### Section과 Layer 표현

| 반환형 | 함수 |
| --- | --- |
| `int32` | `SetSectionProxyBakeData`, `ClearSectionProxyBakeData`, `SetProxyLayerVisible`, `SetSectionProxyPartitionVisible`, `RemoveProxyLayer`, `GetSectionProxyLayerCount`, `GetProxyLayerCount` |
| `bool` | `SetSectionProxyLayer`, `SetSectionProxyMesh`, `RemoveSectionProxyLayer`, `SetSectionProxyLayerVisible`, `HasSectionProxyLayer` |
| `void` | `RemoveSectionProxyLayers` |
| Array | `GetSectionProxyLayerIds`, `GetSectionProxySectionIds` |

Count를 반환하는 변경 함수에서 `0`은 일치해 변경된 Entry가 없다는 뜻입니다. Boolean 변경 함수는 요청 작업의 성공 여부를 반환합니다.

Debug 표현에는 `SetDebugOverlaySettings`, `GetDebugOverlaySettings`, `SetDebugOverlaysVisible`를 사용합니다.

## UPlanetXTransitionMorphComponent

헤더: `PlanetX/Components/PlanetXTransitionMorphComponent.h`

| 반환형 | 함수 |
| --- | --- |
| `void` | `SetProxyBakeData`, `SetProxyMeshOverride`, `SetTransitionResources` |
| Object | `GetProxyBakeData`, `GetProxyMeshOverride`, `GetTransitionResources` |
| `bool` | `HasCompatibleTransitionResources`, `IsUsingGpuMorph`, `IsUsingStaticMeshGpuMorph`, `HasRenderableTransitionPresentation` |
| `void` | `BuildMorphMesh`, `ApplyMorphState`, `SetTransitionAlpha`, `SetTransitionActive`, `SetMorphVisible`, `ApplyMorphRenderPolicy` |

Build와 Apply Command는 `void`입니다. Compatibility와 Renderability Query로 실제 선택된 표현 경로를 확인하세요.

## Viewpoint와 Travel Receiver

`UPlanetXViewpointComponent`는 `PlanetX/Components/PlanetXViewpointComponent.h`에 선언됩니다. `GetTransitionFrame`과 `MapViewDirectionToMovement`는 `bool`을 반환하며 성공했을 때만 출력을 사용합니다.

`UPlanetXTravelReceiverComponent`는 `PlanetX/Components/PlanetXTravelReceiverComponent.h`에 선언됩니다. Blueprint-callable 함수는 없습니다. `bAutoResumePendingTravel`, `bApplyControlRotation`, `ArrivalRetryTimeoutSeconds`를 설정하고 `bLastResumeSucceeded`, `LastResumeError`, `State`를 확인하거나 `OnTravelResumed`, `OnTravelResumeFailed`에 Bind합니다. 이 Component는 Level Open, Spawn, Possess 또는 GameMode 선택을 담당하지 않습니다.
