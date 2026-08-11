# Asset과 Project Settings API

## UPlanetXPlanetAsset

헤더: `PlanetX/Assets/PlanetXPlanetAsset.h`

### Identity와 Revision 조회

| Category | 함수 |
| --- | --- |
| Planet Asset | `GetPlanetId`, `GetRadiusCm` |
| Bake Revision | `GetBakeContractRevision`, `GetLastSuccessfulBakeRevision`, `IsProxyBakeStale` |
| Visual·Material Revision | `GetVisualSettingsRevision`, `GetMaterialBindingRevision`, `GetLastSuccessfulVisualBuildRevision`, `HasSuccessfulVisualBuild`, `IsVisualBuildStale` |
| Environment·Preview Revision | `GetEnvironmentSettingsRevision`, `GetLastSuccessfulPreviewRevision`, `IsVisualPreviewStale` |

모두 Blueprint Pure 조회입니다. Revision이 0이면 대응하는 출력이 아직 한 번도 성공적으로 게시되지 않았다는 뜻일 수 있습니다.

### Visual Authoring 변경

아래 함수는 별도 표시가 없으면 `PlanetX|Visual` Blueprint Category에 속하며 `bool`을 반환합니다.

| 함수 | 계약 |
| --- | --- |
| `SetSurfaceCompletionSettings`, `SetProxyPaddingSettings`, `SetVisualGenerationSettings` | Revision 추적 Setter를 통해 Completion과 Padding 입력을 변경합니다. |
| `SetEnvironmentSettings`, `SetActiveSurfacePreset` | Environment 설정 또는 활성 Surface Preset을 변경합니다. |
| `SetSectionPlacement`, `SetSectionGroundProxyVisibility` | 지정한 Section을 변경합니다. |
| `IsSectionPlacementLockedToNorthPole`, `IsSectionAtCanonicalNorthPole` | 지정한 Section의 Same World Placement 계약을 읽습니다. |
| `ValidateSectionPlacement`, `ValidateLevelTopology` | Placement 또는 전체 Topology를 검증하며 선언된 경우 Reason Text를 출력합니다. |
| `SetSectionSurfaceCorrectionSettings`, `RefreshSectionProxyBakeLink` | Correction 설정을 변경하거나 권위 있는 Bake Data를 다시 연결합니다. |

`MarkVisualPreviewBuildSucceeded`는 `PlanetX|Revision` Category의 `void` Blueprint-callable 함수입니다. Preview Build가 성공한 뒤에만 호출하세요. Revision과 Staleness 추적을 일관되게 유지하려면 직접 Field를 바꾸기보다 이 함수와 Planet Asset Editor를 사용합니다.

## UPlanetXSurfacePreset

헤더: `PlanetX/Visual/Assets/PlanetXSurfacePreset.h`

이 Blueprint Type에는 Blueprint-callable 함수가 없습니다. 편집 가능한 Field는 `PresetId`, `DisplayName`, `PresetType`, `CompletionSettings`, `PaddingSettings`, `BaseSurfaceMaterial`, `OptionalBiomeMask`, `OptionalHeightMask`입니다. `PresetId`를 안정적으로 유지하고 참조한 Material과 Texture가 Cook에 포함되는지 확인하세요.

## Project Settings

`UPlanetXRuntimeDeveloperSettings`는 `PlanetX/Settings/PlanetXRuntimeDeveloperSettings.h`에 선언됩니다. Project-wide Config Field는 `RuntimeBudgetPolicy`이며 기본값은 `EPlanetXRuntimeBudgetPolicy::FollowEngineScalability`입니다.

`UPlanetXRenderingDeveloperSettings`는 `PlanetX/Settings/PlanetXRenderingDeveloperSettings.h`에 선언됩니다. Config Field는 기본값이 `true`인 `bEnableLensFlares`와 기본값이 `3`이고 유효 범위가 0~3인 `LensFlareQuality`입니다. `ApplyConsoleVariables`는 C++ Member이며 Blueprint 함수가 아닙니다.
