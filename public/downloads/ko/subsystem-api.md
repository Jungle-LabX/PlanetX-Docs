# UPlanetXSubsystem

헤더: `PlanetX/Subsystems/PlanetXSubsystem.h`

`UPlanetXSubsystem`은 지원되는 런타임 API의 Game Instance Subsystem facade입니다. World Context parameter가 있는 함수는 모두 유효한 game world가 필요합니다. 안정 API 중 `CancelLevelHandoff`만 예외이며 Ticket만 받습니다.

## 안정 Surface Query

| 함수 | 계약 |
| --- | --- |
| `QuerySurfaceAtWorldRay` | `FPlanetXSurfaceQueryInput`을 평가해 `FPlanetXSurfaceQueryResult`를 쓰고 `bool`을 반환합니다. |
| `QuerySurfaceAtWorldRayDetailed` | 같은 Query를 수행하고 `EPlanetXSurfaceQueryStatus`를 반환합니다. |
| `QuerySurfaceAtGeo` | Planet ID, `FPlanetXGeoCoordinate`, optional Binding ID로 조회합니다. |
| `QuerySurfaceAtPlanetXTransform` | 표준 `FPlanetXTransform` 위치에서 조회합니다. |
| `BuildLandingTransform` | 성공한 Surface 결과에서 `FPlanetXLandingTransform`을 만듭니다. |

`bool`이 `false`이거나 Detailed Status가 성공이 아니면 Hit 출력을 사용하지 마세요.

## 안정 좌표 API

| 함수 | 계약 |
| --- | --- |
| `ResolvePlanetXTransform` | `FPlanetXTransform`을 `FTransform`으로 resolve하고 `FPlanetXTransformResolveResult`를 씁니다. |
| `CapturePlanetXTransform` | Planet ID와 Binding ID를 기준으로 World Transform을 캡처합니다. |
| `CaptureActorPlanetXTransform` | 전달한 Planet·Binding ID 기준으로 Actor pose를 캡처합니다. |
| `ApplyPlanetXTransformToActor` | 표준 pose를 resolve해 Actor에 적용합니다. |

이 함수들의 Blueprint Category는 `PlanetX|Coordinates`입니다.

## 안정 Travel API

| 함수 | 계약 |
| --- | --- |
| `EnterGroundSameWorld` | 요청 Actor와 성공한 Surface Query로 현재 World의 Ground에 진입합니다. |
| `ReturnToOrbitSameWorld` | 요청 Actor의 활성 Same World Journey를 통해 Orbit으로 돌아갑니다. |
| `BeginLevelHandoff` | Source Actor와 Surface Query에서 `FPlanetXLevelHandoffTicket`과 결과를 만듭니다. |
| `ResolveLevelHandoffTicket` | Ticket을 적용하지 않고 대상 World Transform으로 resolve합니다. |
| `CompleteLevelHandoff` | Ticket을 Target Actor에 적용하며 `bApplyControlRotation` 기본값은 `true`입니다. |
| `CancelLevelHandoff` | Ticket을 취소합니다. World Context parameter가 없습니다. |

PlanetX는 Handoff 상태를 준비하고 복원하지만 Open Level 호출, 대상 Actor Spawn, Possess 또는 GameMode 선택은 하지 않습니다. 이 과정은 게임 코드가 담당합니다.

## Advanced Travel과 상태 조회

- Travel: `PrepareTravel`, `ResumePendingTravel`, `BeginReturnLevelHandoff`, `ResolveLevelHandoffEntryTransform`
- 저장 상태: `GetStoredLevelHandoffCapture`, `GetTransitionJourney`, `GetActiveTransitionJourneys`
- Runtime 상태: `GetActorRuntimeContext`, `GetMovementRuntimeState`, `GetMovementRuntimeStates`
- Transition 상태: `GetTransitionRuntimeResult`, `GetTransitionRuntimeResults`, `GetTransitionManagedActorState`
- Transition 계산과 Sync: `EvaluateTransitionCylinderState`, `CaptureTransitionActorSyncPose`, `ApplyTransitionActorSyncPose`

`PrepareTravel`은 `FPlanetXTravelRoute`를 받습니다. Planet Actor 후보가 정확히 하나일 때만 자동 선택합니다. 명시적인 index `0`은 유효하며, `PlanetActorIndex`와 `PlanetBindingId`를 모두 지정하면 같은 후보를 가리켜야 합니다.

## Advanced Data, Preview와 Diagnostics

- Section과 Level Pair: `GetSectionTransform`, `GetSectionDesc`, `GetSectionRuntimeState`, `GetLevelPair`, `GetLevelPairForSection`
- Coordinate Frame: `ResolveCoordinateFrame`
- Runtime Preview: `LoadRuntimePreview`, `SetRuntimePreviewVisible`, `UnloadRuntimePreview`, `GetRuntimePreviewStatus`
- Validation: `ValidatePlanetAsset`
- Diagnostics: `DiagnoseProxySync`, `ResolvePlanetAlignmentForSection`, `DiagnoseSectionPlanetOverlapFromBounds`
- 일시적 Debug Draw: `DrawPlanetDebug`, `DrawSectionDebug`, `DrawActorContextDebug`, `DrawCaptureStackDebug`

Debug Draw 함수는 성공값을 반환하지 않습니다. Validation 함수 실행 성공과 issue가 없는 결과는 서로 다른 조건입니다.
