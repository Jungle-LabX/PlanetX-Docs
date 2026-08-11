# Proxy·Morph·Preview 설정

Runtime Budget Override는 진단이나 특정 Actor의 명시적 요구가 있을 때만 사용하고, 일반적으로는 Project Settings 정책을 따르세요.

## Planet Proxy Component

### 표시와 생성

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bShowPlanetProxy` | true | Completion을 포함한 행성 전체 Proxy를 표시합니다. |
| `PlanetSphereMeshOverride` | None | 생성 Visual 대신 사용할 고급 Planet Sphere Static Mesh입니다. |
| `bReversePlanetSphereCulling` | false | Planet Sphere의 Culling 방향을 뒤집습니다. 메시 winding/material 계약이 반대인 특수 Asset에만 사용하세요. |
| `bShowSectionProxies` | true | Bake된 Section Proxy 계층을 표시합니다. |
| `bEnableRuntimeSurfaceCutout` | true | Section 영역과 겹치는 행성 표면을 Runtime에 잘라냅니다. |
| `bEnableRuntimeProxyPadding` | true | Surface Cutout이 켜진 경우 Runtime Proxy Padding을 생성/표시합니다. |
| `bAutoRebuildSectionProxiesFromPlanetAsset` | true | Planet Asset의 Section/Bake 링크가 바뀌면 Proxy 계층을 다시 구성합니다. |
| `bAutoRefreshOnRegister` | true | Component 등록 시 Asset과 Runtime 상태에서 표시를 갱신합니다. |
| `FallbackRadiusCm` | 100,000 cm, 최소 1 | 유효한 Planet Asset 반지름을 resolve하지 못했을 때 사용할 fallback입니다. |

### Section Proxy Layer Descriptor

이 배열은 일반적으로 Planet Asset과 Bake 결과로부터 생성됩니다. 수동으로 구성하는 고급 경로에서만 편집하세요.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `SectionId` / `LayerId` | None | Layer가 속한 Section과 Layer의 안정적인 ID입니다. |
| `Mesh` / `Material` | None | Layer의 Static Mesh와 선택적 Material Override입니다. |
| `RelativeTransform` | Identity | Planet Proxy Component 기준 Layer Transform입니다. |
| `bLayerVisible` | true | 개별 Layer 표시 여부입니다. |
| `bPartitionScoped` | false | Layer를 특정 Bake Partition과 함께 residency/culling할지 정합니다. |
| `PartitionCoord` | (0,0) | Partition Scoped가 켜진 Layer의 Partition 좌표입니다. |

### Section Proxy Runtime Budget Override

`bOverrideSectionProxyRuntimeBudget=false`이면 Project Runtime Budget을 사용합니다.

| 설정 | 기본값 | 설명 |
| --- | ---: | --- |
| `MaximumSectionProxyPayloadsPerRequest` | 8 | 한 요청에서 유지할 child payload package 상한입니다. |
| `MaximumSectionProxyDependenciesPerRequest` | 64 | 한 streamable batch의 mesh/material dependency 상한입니다. |
| `MaximumSectionProxyComponentsPerFrame` | 2 | Game Thread 한 Frame에 새로 만드는 render Component 상한입니다. |
| `MaximumSectionProxyInstancesPerFrame` | 512 | 한 Frame에 검증하고 upload하는 instance transform 상한입니다. |
| `MaximumSectionProxyCorrectionVerticesPerFrame` | 4,096 | Automatic Surface Correction이 한 Frame에 검사하는 morph vertex 상한입니다. |
| `SectionProxyRealizationTimeBudgetMs` | 2.0 ms, 최소 0.1 | correction scan과 Component/Instance realization이 공유하는 Frame 시간 상한입니다. |

### Surface Correction Override

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bOverrideSectionSurfaceCorrectionSettings` | false | Planet Asset의 per-Section 설정 대신 이 Actor 전체 Override를 사용합니다. |
| `SectionSurfaceCorrectionMode` | `Disabled` | `Disabled`, 최저 Bake 정점을 표면으로 올리는 `Automatic`, 고정 Offset을 쓰는 `Manual` 중 선택합니다. |
| `SectionSurfaceClearanceCm` | 1 cm, 0 이상 | Automatic에서 표면 위로 추가하는 여유입니다. |
| `ManualSectionSurfaceCorrectionCm` | 0 cm, 0 이상 | Manual에서 모든 Section Proxy에 적용하는 바깥쪽 Offset입니다. |

### Debug Overlay

`DebugOverlaySettings`가 아래 시각화 값 묶음을 소유합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bShowSectionBounds` | false | Section bounds를 표시합니다. |
| `bShowSectionFrames` | false | Section Local frame 축을 표시합니다. |
| `FrameAxisLengthCm` | 1,000 cm, 최소 1 | 표시할 frame 축 길이입니다. |

## Transition Morph Component

### Source와 Morph Geometry

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `ProxyBakeData` | None | flat/curved morph payload를 제공하는 Bake Data입니다. 일반적으로 Transition Resource Set이 연결합니다. |
| `ProxyMeshOverride` | None | Bake Data의 Proxy Mesh 대신 사용할 고급 Source Mesh입니다. |
| `SourceLODIndex` | 0, 최소 0 | Override/Source Mesh에서 읽을 LOD입니다. |
| `bUseProxyMeshMaterials` | true | Source Proxy Mesh의 Material slot을 사용합니다. |
| `TransitionAlpha` | 0, 0–1 | 0과 1 사이의 morph 위치입니다. Runtime transition이 보통 갱신합니다. |
| `bAutoRebuildOnRegister` | true | 등록 시 render/morph representation을 다시 만듭니다. |
| `bUseBakeDataPartitionDesc` | true | Bake Data의 projection frame과 radius를 사용합니다. |
| `bOverridePlanetRadius` | false | Bake/Planet radius 대신 `PlanetRadiusOverride`를 사용합니다. 진단 외에는 계약 불일치를 만들 수 있습니다. |
| `PlanetRadiusOverride` | 100,000 cm, 최소 1 | Override가 켜졌을 때의 곡률 반지름입니다. |
| `ManualPartitionDesc` | 구조체 기본값 | Bake Data Partition을 사용하지 않을 때의 Origin, East/North/Up, radius와 sphere segments입니다. |
| `bUseProxyBoundsCenterAsPivot` | false | Source Proxy bounds 중심을 morph pivot으로 사용합니다. |
| `bMoveComponentToPivotOnBuild` | false | Build할 때 Component 자체를 계산된 pivot으로 이동합니다. 외부 Transform 계약이 있으면 끄세요. |
| `bUseTangentPreservingCurvature` | true | 곡면 투영 시 tangent 방향과 shading 연속성을 보존하는 경로를 사용합니다. |

### GPU WPO Morph

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bUseGpuWpoMorph` | true | Material WPO 기반 GPU morph를 우선 사용합니다. |
| `bPreferStaticMeshComponentForGpuMorph` | true | GPU 경로에서 StaticMesh Component를 우선합니다. |
| `bFallbackToDynamicMeshWhenStaticGpuMorphInflates` | true | Static Mesh render vertex가 허용 비율을 넘으면 Dynamic Mesh로 fallback합니다. |
| `StaticGpuMorphMaxRenderVertexRatio` | 1.25, 최소 1 | Static GPU 경로에서 source 대비 허용할 render vertex 비율입니다. |
| `bBuildTransientStaticMeshForGpuMorph` | false | 지정된 GPU Static Mesh Asset이 없을 때 transient Static Mesh를 만듭니다. Runtime 비용과 lifetime을 고려하세요. |
| `GpuMorphStaticMeshAsset` | None | 미리 생성된 GPU morph용 Static Mesh입니다. |
| `GpuMorphMaterialOverride` | None | 모든 slot에 사용할 단일 GPU morph Material Override입니다. |
| `GpuMorphMaterialOverrides` | 빈 배열 | slot별 GPU morph Material Override입니다. 배열 항목이 단일 Override보다 구체적인 선택입니다. |
| `GpuMorphAlphaParameterName` | `PlanetXMorphAlpha` | Material에서 Transition Alpha를 받는 scalar parameter 이름입니다. Material과 정확히 일치해야 합니다. |

### GPU Render Pass Policy

이 옵션은 PlanetX가 소유한 Transition Morph render Component에만 적용됩니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `MorphShadowMode` | `FullMorphMesh` | Morph Mesh shadow를 끄거나 전체 morph representation으로 그립니다. |
| `MorphRayTracingMode` | `EvaluateWpo` | `Disabled`, WPO를 무시하는 `StaticGeometry`, 비용이 높은 `EvaluateWpo` 중 Ray Tracing 표현을 선택합니다. |
| `MorphVelocityMode` | `Enabled` | 정확한 motion vector/temporal effect를 위한 velocity pass를 켭니다. |
| `MorphDepthPassMode` | `Enabled` | depth effect와의 호환성을 위한 depth pass를 켭니다. |

### Morph Performance와 Visibility

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `MinimumAlphaChange` | 0.002, 0–1 | Alpha 변화가 이 값보다 작으면 morph update를 생략합니다. |
| `bUpdateNormalsDuringMorph` | false | CPU/Dynamic 경로에서 위치와 함께 Normal을 갱신합니다. 품질은 좋아질 수 있지만 비용이 증가합니다. |
| `bUseFastPositionUpdates` | true | topology rebuild 없이 position-only 빠른 갱신을 사용합니다. |
| `bCollectRuntimeMorphDiagnostics` | false | Runtime morph 진단 통계를 수집합니다. Shipping 성능 측정 시 필요할 때만 켜세요. |
| `bOverrideTransitionRuntimeBudget` | false | Project Runtime Budget 대신 아래 Transition 전용 값들을 사용합니다. |
| `MaximumTransitionDependenciesPerRequest` | 64, 1–512 | 한 Transition stream 요청의 dependency 상한입니다. |
| `MaximumTransitionComponentsPerFrame` | 2, 1–64 | 한 Frame에 realize할 Transition render Component 상한입니다. |
| `TransitionRealizationTimeBudgetMs` | 2.0 ms, 0.1–10 | Transition realization의 Game Thread 시간 상한입니다. |
| `bVisibleOnlyDuringTransition` | true | Transition 상태에서만 Morph Component를 표시합니다. |
| `bTransitionActive` | false | 현재 Transition 표시 활성 상태입니다. Runtime이 보통 관리하지만 수동 테스트에서 설정할 수 있습니다. |

## Runtime Preview Actor

External Level Proxy Bake가 생성하는 Preview World의 Actor입니다. 직접 배치한 Gameplay Actor가 아니며, `PreviewBakeData` 링크는 생성 파이프라인이 관리합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PreviewBakeData` | None | Preview World가 stream될 때 불러올 시각 전용 Bake Data입니다. |
| `bOverrideRuntimeBudget` | false | Project Runtime Budget 대신 이 Preview Actor의 값을 사용합니다. |
| `MaximumPayloadsPerRequest` | 8, 최소 1 | 한 요청의 child payload 상한입니다. |
| `MaximumDependenciesPerRequest` | 64, 최소 1 | 한 streamable batch의 dependency 상한입니다. |
| `MaximumComponentsPerFrame` | 2, 최소 1 | 한 Frame에 생성할 Component 상한입니다. |
| `MaximumInstancesPerFrame` | 512, 최소 1 | 한 Frame에 realize할 instance 상한입니다. |
| `RealizationTimeBudgetMs` | 2.0 ms, 최소 0.1 | Preview realization의 Frame 시간 상한입니다. |

Runtime Preview에는 GameMode, Pawn, Controller, Gameplay Actor Logic, Navigation과 Ground Gameplay Collision을 복제하지 마세요. 실제 Gameplay는 Ground World의 책임입니다.
