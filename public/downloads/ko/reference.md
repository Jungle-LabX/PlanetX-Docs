# Reference

Proxy Bake UI

## Proxy Bake UI

| 영역 | 주요 항목 |
|---|---|
| Target | Planet Asset, Target Section Name, Rename/Use on Bake |
| Runtime Role | Same World, External Level, Ground/Orbit World |
| Source Scope | Selected Actors, Current Level, Loaded Levels, Reviewed Set |
| Output Plan | Source/partition/geometry mix/Bake ID/output path |
| Review | Use, Owner, Component, Role, Assignment, Reason, Partitions |
| Advanced | Partition X/Y, Planet Radius, Source Grid, Surface Datum |
| Budget | Auto Memory, Safe/High Utilization, Workers, Queue, GT Finalize |
| Actions | Refresh, Plan, Clear, Logs, Bake In Editor/External Process |

## Planet Asset Editor

| 탭 | 기능 |
|---|---|
| Overview | identity와 readiness |
| Sections | Rename, Delete, Runtime Role, Bake/Level Pair |
| Configuration | authoring/visual 설정 |
| Preview | 저장 결과 Preview |
| Diagnostics | topology와 link 검증 |

## 주요 Runtime Actor/Component

- `APlanetXPlanetActor`: Planet Asset runtime 인스턴스
- `APlanetXTransitionEndpoint`: transition 경계
- `APlanetXEnvironmentManager`: Cloud/Atmosphere 환경
- `UPlanetXCoordinateComponent`: 좌표 identity와 pose
- `UPlanetXMovementComponent`: 선택적 native movement
- `UPlanetXViewpointComponent`: 관찰자
- `UPlanetXTravelReceiverComponent`: Travel 도착 적용

## Public API

게임 코드는 `UPlanetXSubsystem`을 사용합니다.

함수별 용도, C++ 예제, Component API와 실패 처리 계약은 [사용자 제공 API](/docs/ko/user-api)에 정리되어 있습니다.

### Entry/Travel

- EnterGroundSameWorld
- ReturnToOrbitSameWorld
- PrepareTravel
- ResumePendingTravel
- Begin/Resolve/Complete/Cancel LevelHandoff

### Runtime Preview

- LoadRuntimePreview
- SetRuntimePreviewVisible
- UnloadRuntimePreview
- GetRuntimePreviewStatus

### Coordinate/Surface

- CaptureActorPlanetXTransform
- ResolvePlanetXTransform
- ApplyPlanetXTransformToActor
- QuerySurfaceAtWorldRay/Geo/PlanetXTransform
- BuildLandingTransform

### Query/Diagnostics

- GetActorRuntimeContext
- GetMovementRuntimeState
- GetTransitionRuntimeResult
- GetSectionDesc/GetSectionTransform
- GetLevelPair/GetLevelPairForSection
- ValidatePlanetAsset
- DiagnoseProxySync
- ResolvePlanetAlignmentForSection

## Console Variables

| CVar | 용도 |
|---|---|
| `PlanetX.MemoryBudgetMB` | PlanetX memory stat budget |
| `px.Material.DebugMode` | 개발용 material debug override |
| `px.Material.UseLegacyPath` | 개발 비교용 legacy path |

## 생성 경로

```text
/Game/PlanetX/ProxyBake/{PlanetAsset}/{GroundLevel}/
├─ DA_PXBake_{BakeId}
├─ {BakeDataName}_RuntimePreview
└─ Revisions/{RevisionId}/
   ├─ Meshes/
   └─ Payloads/
```

## 로그 경로

```text
Saved/Logs
Saved/PlanetXProxyBake
Saved/PlanetX/ProxyBake/PartitionSpool
Saved/PlanetX/ProxyBakeRollback
```
