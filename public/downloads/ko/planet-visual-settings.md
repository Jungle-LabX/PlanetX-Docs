# Planet Asset과 비주얼 설정

거리와 크기는 별도 표기가 없으면 Unreal Unit인 cm입니다.

## 생성 시 확정되는 Planet 계약

| 항목 | 의미 |
| --- | --- |
| Planet ID | 프로젝트와 런타임에서 행성을 식별하는 고유 `FName`입니다. 생성 후 immutable입니다. |
| Radius | 행성 반지름입니다. 생성 UI는 km를 받을 수 있지만 Asset은 cm로 저장하며, 최소 유효 반지름은 1 cm입니다. Bake와 Visual Build 계약에 포함되므로 생성 후 직접 변경하지 않습니다. |
| Coordinate Convention | North Pole, 경도 0/90도 축, 경도 방향, Source X/Y/Z 매핑과 `UnrealUnitToCm`을 정의합니다. 생성 후 immutable입니다. 기본 축은 Up/Forward/Right, 반시계 경도, X=East, Y=North, Z=Up, 1 uu=1 cm입니다. |

## Authoring Geometry Settings

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `DetailLevel` | `Medium` | `Low`, `Medium`, `High`, `Custom` 중 Preview 행성 메시 등급을 선택합니다. |
| `PreviewSegmentCount` | 64, 8–512 | 절차적 Preview 구의 세그먼트 수입니다. 높일수록 윤곽은 부드러워지지만 Preview 비용이 증가합니다. |
| `PreviewVertexBudget` | 10,000, 128–1,000,000 | Preview 생성이 사용할 수 있는 정점 상한입니다. |
| `ProxyTextureResolution` | 2048, 256–8192 | Proxy/Visual 저작 과정의 목표 텍스처 해상도입니다. 메모리와 Build 시간을 함께 고려하세요. |
| `bUseCustomPreviewMesh` | false | 자동 Preview 메시 대신 `CustomPreviewMesh`를 사용합니다. |
| `CustomPreviewMesh` | None | Custom Preview가 켜졌을 때 사용할 Static Mesh입니다. |
| `LowPreviewMesh` | None | Low 등급에 명시적으로 사용할 Preview Static Mesh입니다. |
| `MediumPreviewMesh` | None | Medium 등급에 명시적으로 사용할 Preview Static Mesh입니다. |
| `HighPreviewMesh` | None | High 등급에 명시적으로 사용할 Preview Static Mesh입니다. |

## Surface Completion Settings

Section이 덮지 않는 행성 표면을 생성하는 설정입니다.

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `CompletionMeshDetailLevel` | 6, 0–7 | Completion 구 메시의 세부 단계입니다. 높은 값은 정점 수와 Build 비용을 증가시킵니다. |
| `CompletionNoiseSeed` | 1337 | 같은 설정에서 재현 가능한 Terrain Noise 배치를 결정합니다. |
| `CompletionNoiseStrengthPercent` | 10%, 0–25 | 반지름 대비 표면 높이 변화의 강도입니다. |
| `CompletionNoiseScale` | 3.0, 0.001–25 | Noise 공간 주파수/스케일을 조정합니다. |
| `TerrainRegionProfiles` | 4개 | Noise 지역의 `Strength`와 `Sharpness` 조합입니다. 배열은 1–8개를 사용하며 기본 쌍은 `(0.20,1.25)`, `(0.45,2.00)`, `(0.70,3.25)`, `(1.00,4.50)`입니다. |
| `TerrainRegionProfiles[].Strength` | 0.5, 0–1 | 해당 지역의 높이 영향도입니다. |
| `TerrainRegionProfiles[].Sharpness` | 2.0, 0.5–8 | 지역 경계의 집중도를 정합니다. |
| `CompletionMaterial` | None | Completion 표면에 적용할 Material입니다. Section Material과 이어질 수 있도록 PlanetX의 Visual Build 결과를 확인하세요. |
| `BlendSharpness` | 1.0, 0.01–8 | Completion과 인접 표면의 Material Blend 경계 선명도입니다. |

## Proxy Padding Settings

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `GeometryPaddingWidthCm` | 100,000, 0 이상 | Section Proxy 외곽에서 Completion으로 이어지는 기하 패딩 폭입니다. |
| `MaterialTransitionWidthRatio` | 0.1, 0–0.5 | 전체 Padding 폭 중 Material 전이에 사용하는 비율입니다. |
| `PaddingMaterialBakeResolution` | 2048, 256–2048 | Padding Material Bake 출력 해상도입니다. |
| `MaterialBakeBindings` | 빈 배열 | Visual Build가 Section별 Padding Material 결과를 기록하는 생성 데이터입니다. 항목을 직접 편집하지 마세요. |
| `PaddingSegmentCount` | 8, 1–128 | 패딩 폭 방향의 기하 세그먼트 수입니다. |
| `RingDistributionStrength` | 2.0, 1–4 | Padding Ring을 경계 쪽에 분배하는 강도입니다. |
| `HeightTransitionStrength` | 1.0, 0–4 | Proxy 높이에서 Completion 높이로 이어지는 보정 강도입니다. |

### Padding Performance Budget

Warning 값은 경고를 만들고 Hard 값은 과도한 Build를 차단하는 상한입니다. Hard 값은 대응 Warning 값보다 작게 두지 마세요.

| 설정 | 기본값 | 측정 대상 |
| --- | ---: | --- |
| `WarningBoundaryEdgeCount` / `HardBoundaryEdgeCount` | 10,000 / 100,000 | 추출된 경계 Edge 수 |
| `WarningGeneratedVertexCount` / `HardGeneratedVertexCount` | 200,000 / 5,000,000 | 생성 정점 수 |
| `WarningIndexCount` / `HardIndexCount` | 1,000,000 / 15,000,000 | 생성 Index 수 |
| `WarningCompactBindingCount` / `HardCompactBindingCount` | 64 / 256 | Compact Material Binding 수 |
| `WarningTotalMidCount` / `HardTotalMidCount` | 64 / 256 | 전체 중간 Ring/중간 결과 수 |

## Transition Distance Settings

| 설정 | 기본값 | 설명 |
| --- | ---: | --- |
| `TransitionStartDistance` | 50,000 | Ground/Proxy 전환을 시작하는 기준 거리입니다. |
| `ApproachStartDistance` | 75,000 | 접근 상태를 시작하는 기준 거리입니다. 보통 Transition 거리보다 바깥쪽에 둡니다. |
| `LandingSelectionDistance` | 30,000 | Landing 후보 Section을 선택하는 거리입니다. |
| `CameraBlendDistance` | 15,000 | 전환 표현에서 카메라 Blend에 사용하는 거리입니다. |

모든 값은 0 이상이어야 합니다. 실제 Runtime의 Section 로드/표시 Alpha는 Level Pair의 `TransitionPolicy`가 소유합니다.

## Preview와 Build Settings

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bPreviewProxyRegion` | true | Proxy 영역 Preview를 표시합니다. |
| `bPreviewVisualBlendPadding` | true | Visual Blend Padding을 표시합니다. |
| `bPreviewGeometricPadding` | true | 기하 Padding을 표시합니다. |
| `bPreviewCompletionRegion` | true | Completion 영역을 표시합니다. |
| `bPreviewTransitionDistance` | true | 전환 거리 시각화를 표시합니다. |
| `bRealtimeMaterialPreview` | true | 설정 변경 중 Material Preview를 실시간 갱신합니다. |
| `PreviewDebugMode` | `FinalSurface` | `FinalSurface`, `ProxyRegion`, `VisualPaddingRegion`, `GeometricPaddingRegion`, `CompletionRegion`, `BlendMask`, `LandingMask`, `TransitionDistance` 중 표시 채널을 선택합니다. |
| `FakeProxyRegion.ProxyUVMin` / `ProxyUVMax` | (0.35,0.35) / (0.65,0.65) | 실제 Section이 없을 때 사용하는 테스트 Proxy UV 사각형입니다. |
| `FakeProxyRegion.FakeProxyColor` | (0.1,0.6,0.2,1) | 테스트 Proxy 색상입니다. |
| `FakeProxyRegion.FakeProxyHeightOffset` | 500 | 테스트 Proxy 높이 Offset입니다. |
| `FakeProxyRegion.FakeCompletionHeightOffset` | 0 | 테스트 Completion 높이 Offset입니다. |
| `AuthoringOutputFolder` | 비어 있음 | Visual Build 생성 Asset의 출력 폴더입니다. 비어 있으면 Editor가 대상 Asset 기준 경로를 결정합니다. |
| `bAllowGeneratedAssetOverwrite` | false | 동일한 생성 경로의 Asset 덮어쓰기를 허용합니다. 출력 대상이 맞는지 확인한 뒤에만 켜세요. |

## Section Settings

Section 목록은 Planet Asset Editor와 Proxy Bake가 관리합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `SectionId` | None | Planet 내부의 안정적인 Section 식별자입니다. |
| `DisplayName` | 비어 있음 | Editor에서 표시할 이름입니다. Runtime 식별에는 `SectionId`를 사용합니다. |
| `Placement.CenterGeo` | (0°,0°,0 cm) | Section 중심의 위도, 경도, 고도입니다. |
| `Placement.YawDeg` | 0° | Surface Frame을 기준으로 한 Section 회전입니다. |
| `Placement.Scale` | 1.0, 0보다 큼 | Section의 균일 배율입니다. |
| `Placement.LocalExtentCm` | (100,000,100,000) | Section Local X/Y 반폭입니다. |
| `Placement.bLockToSurface` | true | 중심을 행성 표면 계약에 고정합니다. |
| `SurfaceCorrectionSettings.Mode` | `Disabled` | `Disabled`, Bake 정점에서 계산하는 `Automatic`, 직접 Offset을 쓰는 `Manual` 중 선택합니다. |
| `SurfaceClearanceCm` | 1.0, 0 이상 | Automatic이 최저 Bake 정점을 표면으로 올린 뒤 추가하는 바깥쪽 여유입니다. |
| `ManualOffsetCm` | 0, 0 이상 | Manual에서 적용하는 바깥쪽 Offset입니다. |
| `LevelPairId` | None | Section이 참조하는 Level Pair ID입니다. |
| `bEnabled` | true | 꺼진 Section은 Runtime 표현과 이동 대상에서 제외됩니다. |

Same World Section은 North Pole Anchor 계약 때문에 위도, 경도, Yaw, Scale이 잠깁니다. Altitude만 Ground 접촉 높이 보정에 사용할 수 있습니다. `Bounds`, `RegionSet`, `SourceRef`, `ProxyBakeData`와 각 사각형/Hash는 Scan/Bake가 생성하는 데이터이므로 수동 편집하지 마세요.

## Level Pair와 Transition Policy

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `LevelPairId`, `PlanetId`, `SectionId` | None | Pair의 안정적인 연결 ID입니다. Editor/Bake가 일관되게 관리해야 합니다. |
| `EntryMode` | `SameWorld` | 같은 World에서 표현을 전환할지, 별도 World로 `LevelHandoff`할지 정합니다. |
| `HandoffBackend` | `OpenLevel` | `OpenLevel`, `SeamlessTravel`, `PreparedMapChange` 계약을 기록합니다. PlanetX가 Level을 직접 여는 것은 아닙니다. |
| `PlanetSyncMode` | `None` | Travel 중 Planet Actor 동기화 정책입니다. 명시적으로 필요한 프로젝트에서만 변경하세요. |
| `OrbitWorld` / `GroundWorld` | None | Same World는 같은 Package, Level Handoff는 서로 다른 저장된 World여야 합니다. |
| `bCanEnterGround` | true | Ground 진입 가능 여부입니다. |
| `bVisualOnly` | false | true이면 이 Pair를 시각 전용으로 취급하고 Gameplay 진입 대상으로 사용하지 않습니다. |
| `TransitionPolicy.PreloadAlpha` | 0.0, 0–1 | Runtime Preview preload를 요청하는 전환 Alpha입니다. |
| `TransitionPolicy.VisibleAlpha` | 0.25, 0–1 | Preview 표시를 시작하는 Alpha입니다. |
| `TransitionPolicy.HideAlpha` | 0.15, 0–1 | 복귀 시 Preview를 숨기는 Alpha입니다. Hysteresis를 위해 보통 `VisibleAlpha`보다 낮게 둡니다. |
| `TransitionPolicy.UnloadDelaySeconds` | 5 s, 0 이상 | 숨긴 Preview를 unload하기 전 대기 시간입니다. |
| `TransitionPolicy.bKeepPreviewLoaded` | false | true이면 숨겨져도 Runtime Preview를 상주 상태로 유지합니다. |
| `TransitionPolicy.GroundProxyVisibility` | `Hidden` | Ground 활성 시 `Hidden`, `HorizonOnly`, `FullProxy` 중 남길 Planet/Section Proxy 범위를 정합니다. |

## Surface Preset

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PresetId` | None | Preset 식별자입니다. |
| `DisplayName` | 비어 있음 | Editor 표시 이름입니다. |
| `PresetType` | `Custom` | Preset 분류입니다. |
| `CompletionSettings` | 구조체 기본값 | 위 Completion 설정 묶음입니다. |
| `PaddingSettings` | 구조체 기본값 | 위 Padding 설정 묶음입니다. |
| `BaseSurfaceMaterial` | None | Preset의 기본 표면 Material입니다. |
| `OptionalBiomeMask` | None | 선택적인 Biome Mask Texture입니다. |
| `OptionalHeightMask` | None | 선택적인 Height Mask Texture입니다. |

`ActiveSurfacePreset`을 Planet Asset에 지정한 뒤에도 실제 Build 입력이 의도한 값인지 Preview에서 확인하고 Apply & Build를 실행하세요.

## Planet Asset의 설정 묶음 이름

Details/API에서 `AuthoringGeometrySettings`, `SurfaceCompletionSettings`, `ProxyPaddingSettings`, `TransitionDistanceSettings`, `ShapeEditorSettings`가 위 표의 각 설정 묶음을 소유합니다. `ProxyPaddingSettings.PerformanceBudget`은 Padding Warning/Hard 상한 묶음입니다.
