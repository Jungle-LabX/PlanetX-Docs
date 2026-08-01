# PlanetX 사용자 제공 API

이 문서는 게임 Blueprint, 게임 C++ 코드와 다른 Runtime 모듈에서 사용하는 PlanetX 공개 API를 정리합니다.

이 문서는 게임 Blueprint, 게임 C++ 코드와 다른 Runtime 모듈에서 사용하는 PlanetX 공개 API를 정리합니다.

- 기준 소스: `Plugins/PlanetX/Source/PlanetX/Public`
- 기준일: 2026-07-30
- 기본 공개 진입점: `UPlanetXSubsystem`
- Actor 단위 좌표 API: `UPlanetXCoordinateComponent`
- 선택적 Native 이동 API: `UPlanetXMovementComponent`
- 기존 UE 이동 구현 연결 API: `UPlanetXMovementInteropLibrary`

`UPlanetXWorldRuntimeSubsystem`과 그 내부 Runtime Service는 외부 사용자 API가 아닙니다.

## 1. API 선택 가이드

| 필요한 기능 | 사용할 API |
|---|---|
| Ground 진입, Orbit 복귀 | `UPlanetXSubsystem` |
| Level 이동 전후 pose/state 보존 | `UPlanetXSubsystem` |
| 행성 표면 또는 Section 조회 | `UPlanetXSubsystem` |
| World Transform과 PlanetX pose 변환 | `UPlanetXSubsystem` |
| 특정 Actor의 좌표 저장과 벡터 변환 | `UPlanetXCoordinateComponent` |
| PlanetX Native 이동, 중력, 표면 정렬 | `UPlanetXMovementComponent` |
| CharacterMovement, Physics, Custom Movement 전환 | `UPlanetXMovementInteropLibrary` |
| Planet/Section/LevelPair 상태 조회 | `UPlanetXSubsystem` |
| Planet Asset 유효성 검사 | `UPlanetXSubsystem::ValidatePlanetAsset` |
| Bake/Visual Revision 조회 | `UPlanetXPlanetAsset` |

일반 게임 코드는 내부 서비스나 Proxy 컴포넌트를 직접 찾지 말고 `UPlanetXSubsystem`을 사용합니다.

## 2. 시작하기

### Blueprint

1. `Get Game Instance Subsystem` 노드를 추가합니다.
2. Class를 `PlanetXSubsystem`으로 지정합니다.
3. 반환값에서 `PlanetX` 카테고리의 노드를 호출합니다.

Blueprint에서는 `WorldContextObject` 핀이 일반적으로 숨겨지며 현재 Blueprint가 자동으로 전달됩니다.

### C++

게임 모듈의 `Build.cs`에 `PlanetX` 모듈 의존성을 추가합니다.

```csharp
PublicDependencyModuleNames.AddRange(new[]
{
    "Core",
    "CoreUObject",
    "Engine",
    "PlanetX"
});
```

```cpp
#include "PlanetX/Runtime/PlanetXSubsystem.h"

UPlanetXSubsystem* PlanetX =
    GetGameInstance()->GetSubsystem<UPlanetXSubsystem>();
```

호출 전 다음 상태를 확인합니다.

- 현재 World에 `APlanetXPlanetActor`가 존재합니다.
- `PlanetComponent`에 `UPlanetXPlanetAsset`이 지정되어 있습니다.
- `bAutoRegisterRuntime`이 활성화되어 있거나 등록 API를 직접 호출했습니다.
- 사용하는 Section과 LevelPair가 Planet Asset에 존재하고 활성화되어 있습니다.
- 동일한 Planet Asset을 여러 Actor가 사용하면 안정적인 `PlanetBindingId`를 지정합니다.

## 3. 공통 반환 규칙

대부분의 명령과 조회 함수는 `bool`을 반환합니다.

- `true`: 요청 또는 조회가 정상적으로 완료됨
- `false`: 입력, Runtime 등록, 좌표 해석 또는 대상 상태가 유효하지 않음

결과 구조체가 함께 제공되면 `bool`만 확인하지 말고 오류 필드도 기록합니다.

| 결과 타입 | 확인할 필드 |
|---|---|
| `FPlanetXTransformResolveResult` | `bSuccess`, `Error`, `ValidationError`, `ConversionError` |
| `FPlanetXLevelHandoffResult` | `bSuccess`, `Error`, `CaptureId`, `JourneyId`, `TransformResult` |
| `FPlanetXMovementHandoffResult` | `bSucceeded`, `Error`, `Handle`, `DiagnosticContext` |
| `FPlanetXRuntimePreviewStatus` | `State`, `bRenderableContentReady`, `bActuallyVisible`, `RetryCount` |

`PlanetBindingId`가 비어 있으면 Runtime이 일치하는 행성을 찾습니다. 같은 `PlanetId`를 가진 PlanetActor가 여러 개라면 명시적인 Binding을 사용해야 합니다.

## 4. Same World 진입 API

Ground와 Orbit 표현이 같은 `UWorld`에 있을 때 사용합니다.

```text
Surface Query
→ EnterGroundSameWorld
→ Ground Gameplay
→ ReturnToOrbitSameWorld
```

| 함수 | 용도 |
|---|---|
| `EnterGroundSameWorld` | Surface Query 결과를 기준으로 Actor를 Ground pose에 원자적으로 적용 |
| `ReturnToOrbitSameWorld` | 저장된 Capture를 사용해 Actor를 Orbit pose로 복귀 |
| `BuildLandingTransform` | Surface Query에서 실제 Ground spawn transform 계산 |

### C++ 예시

```cpp
FPlanetXSurfaceQueryResult Surface;
const bool bSurfaceFound = PlanetX->QuerySurfaceAtGeo(
    this,
    PlanetId,
    TargetGeo,
    PlanetBindingId,
    Surface);

if (bSurfaceFound && Surface.bCanEnterGround)
{
    PlanetX->EnterGroundSameWorld(this, RequestActor, Surface);
}
```

```cpp
PlanetX->ReturnToOrbitSameWorld(this, RequestActor);
```

수동 진입 대신 `UPlanetXCoordinateComponent`에서 다음 정책을 활성화할 수 있습니다.

- `SetAutomaticSameWorldEntryEnabled`
- `SetAutomaticSameWorldReturnEnabled`
- `SpatialEntryPolicy.MovementContinuityPolicy`

자동 참여 Actor의 경계 감지, Capture와 실제 이동은 World Runtime이 처리합니다.

## 5. Level Travel API

PlanetX는 좌표, 전환 상태와 Ticket을 보존합니다. 다음 작업은 게임 코드의 책임입니다.

- `OpenLevel` 또는 다른 Travel 호출
- 로딩 화면
- Pawn 생성
- PlayerController와 Possession
- GameMode
- Replication과 멀티플레이 이동 정책

### 권장 간편 흐름

```text
PrepareTravel
→ 게임이 TargetRoute.World로 이동
→ Target PlanetActor 등록
→ Target Actor 생성·Possess
→ ResumePendingTravel
```

| 함수 | 용도 |
|---|---|
| `PrepareTravel` | Source pose/state를 캡처하고 Target Route가 포함된 Ticket 생성 |
| `ResumePendingTravel` | 가장 최근에 준비한 Ticket을 Target Actor에 적용하고 성공 시 소비 |
| `BeginReturnLevelHandoff` | Ground Journey를 Ground→Orbit 복귀 Ticket으로 전환 |
| `GetTransitionJourney` | `JourneyId`로 Journey 상태 조회 |
| `GetActiveTransitionJourneys` | 현재 활성 Journey 전체 조회 |

### Source World 예시

```cpp
FPlanetXTravelRoute Route;
Route.World = TargetWorld;
Route.PlanetId = PlanetId;
Route.SectionId = SectionId;
Route.PlanetBindingId = TargetPlanetBindingId;

FPlanetXLevelHandoffTicket Ticket;
FPlanetXLevelHandoffResult Result;

if (PlanetX->PrepareTravel(
        this,
        SourceActor,
        Surface,
        Route,
        Ticket,
        Result))
{
    // PlanetX는 Travel을 호출하지 않는다.
    // 게임이 Ticket.TargetWorld 또는 Route.World을 사용해 이동한다.
}
```

### Target World 예시

```cpp
FPlanetXLevelHandoffResult Result;
const bool bApplied = PlanetX->ResumePendingTravel(
    this,
    TargetActor,
    Result,
    true);
```

도착 Actor에 `UPlanetXTravelReceiverComponent`를 추가하면 `ResumePendingTravel`을 자동으로 재시도할 수 있습니다.

| 설정 | 의미 |
|---|---|
| `bAutoResumePendingTravel` | BeginPlay 이후 자동 Resume 사용 |
| `bApplyControlRotation` | 저장된 Control Rotation 적용 |
| `ArrivalRetryTimeoutSeconds` | PlanetActor 등록 지연을 기다리는 최대 시간 |
| `bLastResumeSucceeded` | 마지막 자동 Resume 성공 여부 |
| `LastResumeError` | 마지막 실패 코드 |

완전 수동으로 처리하려면 `bAutoResumePendingTravel`을 끕니다.

### 명시적 Ticket 흐름

여러 Ticket을 직접 관리하거나 적용 전 Transform을 검사할 때 사용합니다.

| 함수 | 용도 |
|---|---|
| `BeginLevelHandoff` | LevelPair를 기준으로 Capture와 Ticket 생성 |
| `ResolveLevelHandoffTicket` | Ticket을 소비하지 않고 Target World Transform만 계산 |
| `CompleteLevelHandoff` | Target Actor에 적용하고 성공한 경우에만 Capture 소비 |
| `CancelLevelHandoff` | 미완료 Ticket 취소 |
| `ResolveLevelHandoffEntryTransform` | 기존 Capture의 Ground pose를 현재 World에서 해석 |
| `GetStoredLevelHandoffCapture` | `CaptureId`로 저장 Capture 조회 |

`FPlanetXLevelHandoffTicket`의 `CaptureId`, `JourneyId`, `Generation`, `TargetWorld`, `TargetRoute`는 한 묶음으로 보관해야 합니다. 일부 필드만 복사해 새로운 Ticket을 조립하면 검증에 실패합니다.

## 6. Runtime Preview API

LevelHandoff 전에 Ground의 Bake 결과를 렌더링 전용으로 보여줄 때 사용합니다.

| 함수 | 용도 |
|---|---|
| `LoadRuntimePreview` | LevelPair의 Runtime Preview 로드 요청 |
| `SetRuntimePreviewVisible` | 로드된 Preview의 표시 요청 |
| `GetRuntimePreviewStatus` | 로딩, 렌더 준비와 실제 표시 상태 조회 |
| `UnloadRuntimePreview` | Preview와 임시 렌더 컴포넌트 해제 |

권장 순서:

```text
LoadRuntimePreview
→ GetRuntimePreviewStatus 반복 조회
→ State == Ready
→ bRenderableContentReady == true
→ SetRuntimePreviewVisible(true)
```

`bVisibleRequested`와 `bActuallyVisible`은 다릅니다. 리소스 준비 전에는 표시를 요청했어도 실제 화면에 보이지 않을 수 있습니다.

Runtime Preview는 다음 기능을 제공하지 않습니다.

- Gameplay Actor 복제
- Collision
- Navigation
- Tick 기반 Gameplay
- GameMode 또는 Ground World 대체

## 7. 좌표와 Transform API

### `FPlanetXTransform`

World에 종속되지 않는 행성 고정 pose입니다.

| 필드 | 의미 |
|---|---|
| `PlanetId` | 행성 식별자 |
| `PlanetBindingId` | 현재 World의 PlanetActor Binding |
| `PlanetFixedPositionCm` | 행성 중심 기준 Cartesian 위치 |
| `PlanetFixedRotation` | 행성 좌표 규약 기준 회전 |
| `Scale3D` | Actor Scale |

`SectionId`와 `LevelPairId`는 pose에 저장되지 않으며 현재 World에서 resolve할 때 계산됩니다.

### Subsystem 좌표 API

| 함수 | 용도 |
|---|---|
| `CapturePlanetXTransform` | World Transform을 `FPlanetXTransform`으로 캡처 |
| `CaptureActorPlanetXTransform` | Actor의 현재 Transform을 캡처 |
| `ResolvePlanetXTransform` | PlanetX pose를 현재 World Transform으로 해석 |
| `ApplyPlanetXTransformToActor` | 해석한 Transform을 Actor에 적용 |
| `ResolveCoordinateFrame` | Planet 또는 Section frame을 World Transform으로 해석 |
| `CaptureTransitionActorSyncPose` | 전환용 Actor pose와 Control Rotation 캡처 |
| `ApplyTransitionActorSyncPose` | 캡처한 전환 pose를 다른 표현 또는 World의 Actor에 적용 |

### C++ 예시

```cpp
FPlanetXTransform SavedPose;
FPlanetXTransformResolveResult CaptureResult;

if (PlanetX->CaptureActorPlanetXTransform(
        this,
        PlanetId,
        PlanetBindingId,
        Actor,
        SavedPose,
        CaptureResult))
{
    // SavedPose를 SaveGame, Journey 또는 사용자 상태에 보관할 수 있다.
}
```

```cpp
FPlanetXTransformResolveResult ApplyResult;
PlanetX->ApplyPlanetXTransformToActor(
    this,
    TargetActor,
    SavedPose,
    ApplyResult);
```

## 8. Surface, Section과 LevelPair 조회

### Surface Query

| 함수 | 입력 기준 | 주요 결과 |
|---|---|---|
| `QuerySurfaceAtWorldRay` | World Ray | 교차 표면, Section, Geo, Ground 진입 가능 여부 |
| `QuerySurfaceAtGeo` | PlanetId와 정규화 Geo | 표면 위치, Normal, Section |
| `QuerySurfaceAtPlanetXTransform` | PlanetX pose | 해당 위치의 Surface/Section |
| `BuildLandingTransform` | Surface Query 결과 | Ground Spawn Transform과 Surface Frame |

`FPlanetXSurfaceQueryResult`의 핵심 필드:

- `bHitPlanetSurface`
- `PlanetId`, `PlanetBindingId`
- `SectionId`, `LevelPairId`
- `Geo`, `SectionLocal`
- `SurfacePositionWorld`, `SurfaceNormalWorld`
- `bInsideSection`
- `bCanEnterGround`
- `bHasGroundWorld`

표면에 맞았다는 사실과 Ground 진입 가능 여부는 별도입니다. 진입 전 `bCanEnterGround`를 확인합니다.

### Section과 LevelPair

| 함수 | 용도 |
|---|---|
| `GetSectionTransform` | SectionLocal→World Transform 조회 |
| `GetSectionDesc` | Section 배치, Bounds, Region, Bake Link 조회 |
| `GetSectionRuntimeState` | Proxy, Ground 로딩, 표시, Transition 상태 조회 |
| `GetLevelPair` | LevelPairId로 전환 정책 조회 |
| `GetLevelPairForSection` | SectionId에 연결된 LevelPair 조회 |
| `DiagnoseSectionPlanetOverlapFromBounds` | Bounds와 Planet Sphere의 겹침 진단 |

## 9. Runtime 상태와 Transition 조회

| 함수 | 용도 |
|---|---|
| `GetActorRuntimeContext` | Actor의 Planet, Section, Geo와 공간 상태 Snapshot |
| `GetMovementRuntimeState` | 특정 Actor의 속도, 중력, Movement 상태 조회 |
| `GetMovementRuntimeStates` | 현재 World의 모든 PlanetX Movement 상태 조회 |
| `GetTransitionRuntimeResult` | 특정 SourceObject의 현재 Transition 결과 조회 |
| `GetTransitionRuntimeResults` | 현재 Tick의 모든 Transition 결과 조회 |
| `GetTransitionManagedActorState` | Runtime이 관리하는 Actor의 현재·복구 예정 상태 조회 |
| `EvaluateTransitionCylinderState` | 거리와 고도로 Orbit/Transition/Ground 및 Alpha 사전 계산 |

`FPlanetXActorRuntimeContext`의 주요 필드:

- `PlanetId`, `SectionId`, `LevelPairId`
- `Geo`, `SectionLocal`
- `SpaceState`
- `TransitionDirection`
- `TransitionAlpha`
- `bInsidePlanet`, `bInsideSection`, `bCanEnterGround`

이 값들은 Runtime이 계산한 Snapshot입니다. 사용자가 값을 수정해 Runtime 상태를 변경하는 구조가 아닙니다.

## 10. `UPlanetXCoordinateComponent`

Actor가 어떤 Planet 기준 pose를 가지는지 저장하고 좌표 벡터를 변환합니다. 이 컴포넌트 자체는 Actor를 매 프레임 이동시키지 않습니다.

### 좌표 동기화

| 함수 | 용도 |
|---|---|
| `RefreshRuntimeContext` | 현재 Actor의 Runtime Context 갱신 |
| `CaptureOwnerTransformToPlanetX` | Owner World Transform을 PlanetX pose로 저장 |
| `ApplyPlanetXTransformToOwner` | 저장된 PlanetX pose를 Owner에 적용 |
| `SetPlanetXTransform` | pose 저장 및 선택적 즉시 적용 |
| `GetPlanetXTransform` | 현재 저장 pose 조회 |
| `SetCoordinateFrameReference` | 값은 유지하고 해석할 Planet/Section frame 변경 |
| `PullFromWorld` | World 값을 Coordinate 데이터로 가져오기 |
| `PushToWorld` | Coordinate 데이터를 World에 적용 |

`ApplyPlanetXTransformToOwner`는 PlanetX Coordinate Mode에서만 허용됩니다. 두 Coordinate Mode 모두 숨은 Tick으로 Owner Transform을 덮어쓰지 않습니다.

### 방향과 벡터

| 함수 | 용도 |
|---|---|
| `GetCurrentSurfaceFrame` | 현재 위치의 East/North/Up frame 조회 |
| `GetPlanetUpVectorWorld` / `GetPlanetDownVectorWorld` | 방사형 Up/Down 조회 |
| `GetSurfaceEastVectorWorld` / `GetSurfaceNorthVectorWorld` | 표면 방향축 조회 |
| `ProjectVectorToSurfaceTangent` | World vector를 표면 접평면에 투영 |
| `ConvertSurfaceVectorToWorld` | East/North/Up vector를 World로 변환 |
| `ConvertPlanetLocalVectorToWorld` | PlanetLocal vector를 World로 변환 |
| `ConvertSectionLocalVectorToWorld` | SectionLocal vector를 World로 변환 |
| `ConvertCoordinateVectorToWorld` | 선택한 VectorSpace에서 World로 통합 변환 |
| `ConvertWorldVectorToCoordinate` | World vector를 선택한 VectorSpace로 역변환 |
| `BuildPlanetSurfaceWorldLocation` | 현재 위치 기준 목표 고도의 World 위치 계산 |
| `BuildSurfaceAlignedRotation` | Actor Up을 행성 표면 Up에 맞춘 회전 계산 |

## 11. `UPlanetXMovementComponent`

PlanetX Native Movement를 선택한 Actor에만 사용합니다. 같은 Owner에 유효한 `UPlanetXCoordinateComponent`가 필요합니다.

| 함수 | 용도 |
|---|---|
| `AddPlanetXInputVector` | 다음 Tick의 이동 입력 누적 |
| `SetPlanetXVelocity` | Native Movement 속도 설정 |
| `GetPlanetXVelocity` | 선택 좌표 기준 속도 조회 |
| `AddPlanetXForce` | 다음 Tick Force 누적 |
| `AddPlanetXImpulse` | 속도에 Impulse 즉시 반영 |
| `SnapToPlanetSurface` | 목표 고도로 위치 보정 |
| `AlignUpToPlanetSurface` | Actor Up을 표면 Up에 정렬 |
| `ValidateMovementConfiguration` | Owner, UpdatedComponent와 좌표 참조 검증 |
| `GetMovementRuntimeState` | 현재 Movement Snapshot 조회 |
| `GetCommittedRuntimeContext` | Orchestrator가 확정한 공간 상태 조회 |

```cpp
Movement->AddPlanetXInputVector(
    FVector(1.0, 0.0, 0.0),
    EPlanetXMovementVectorSpace::SurfaceFrame,
    true);
```

지원 Vector Space:

- `World`
- `PlanetLocal`
- `SurfaceFrame`
- `SectionLocal`

이 컴포넌트는 CharacterMovement, Vehicle, Physics Body 또는 Custom Movement를 자동으로 탐색하거나 비활성화하지 않습니다.

## 12. Movement Handoff API

기존 UE Movement 또는 Physics Body 사이에서 속도 연속성을 보존할 때 `UPlanetXMovementInteropLibrary`를 사용합니다.

### 표준 MovementComponent

| 함수 | 용도 |
|---|---|
| `CaptureMovementComponentHandoff` | Source Movement 속도 Snapshot 생성 |
| `ApplyMovementComponentHandoff` | Snapshot을 Target Movement에 적용 |
| `SwitchMovementComponentsWithHandoff` | Capture, Target 적용, 활성 상태 전환과 소비를 원자적으로 수행 |

### Physics Body

| 함수 | 용도 |
|---|---|
| `CapturePhysicsBodyHandoff` | PrimitiveComponent의 선속도·각속도 캡처 |
| `ApplyPhysicsBodyHandoff` | Target Physics Body에 속도 적용 |

### Custom Movement

| 함수 | 용도 |
|---|---|
| `CaptureMovementHandoffVelocity` | 사용자 이동 구현의 원시 속도 캡처 |
| `ResolveMovementHandoffVelocity` | 목표 frame과 연속성 정책으로 속도 해석 |
| `GetMovementHandoffSnapshot` | Handle의 현재 Snapshot 조회 |
| `ConsumeMovementHandoff` | 사용자 적용 성공 후 Snapshot 소비 |
| `CancelMovementHandoff` | 실패하거나 취소된 Snapshot 종료 |

연속성 정책:

| 정책 | 동작 |
|---|---|
| `Reset` | 목표 속도를 0으로 초기화 |
| `PreserveWorld` | World 속도를 그대로 유지 |
| `RebaseBetweenFrames` | Source frame의 의미를 Target frame으로 재해석 |
| `DoNotApply` | Target 속도를 변경하지 않음 |

`SwitchMovementComponentsWithHandoff`는 성공한 경우에만 Target 활성화, Source 비활성화와 Snapshot 소비를 수행합니다. CharacterMovement의 Movement Mode, Root Motion, Floor State 같은 구현별 상태는 게임 코드가 별도로 처리합니다.

## 13. Planet Asset API

`UPlanetXPlanetAsset`은 행성, Section과 LevelPair의 canonical 설정 자산입니다.

### 일반 조회

| 함수 | 용도 |
|---|---|
| `GetPlanetId` | 행성 ID 조회 |
| `GetRadiusCm` | 행성 반지름 조회 |
| `GetBakeContractRevision` | 현재 Bake 계약 Revision |
| `GetLastSuccessfulBakeRevision` | 마지막 성공 Bake Revision |
| `IsProxyBakeStale` | 현재 설정과 Bake 결과 불일치 여부 |
| `HasSuccessfulVisualBuild` | 저장형 Visual Build 성공 이력 |
| `IsVisualBuildStale` | 저장형 Visual 결과가 현재 설정보다 오래됐는지 조회 |
| `IsVisualPreviewStale` | 세션 Preview가 현재 설정보다 오래됐는지 조회 |

### Authoring API

다음 함수는 Editor Tool 또는 명시적인 Authoring 코드에서 사용합니다.

- `SetSurfaceCompletionSettings`
- `SetProxyPaddingSettings`
- `SetVisualGenerationSettings`
- `SetActiveSurfacePreset`
- `SetSectionPlacement`
- `ValidateSectionPlacement`
- `ValidateLevelTopology`
- `SetSectionSurfaceCorrectionSettings`
- `RefreshSectionProxyBakeLink`

Cooked Runtime에서 값을 바꿔도 원본 Asset 패키지에 영속 저장되지 않습니다. 게임 플레이 상태 저장 용도로 사용하지 마십시오.

## 14. 검증과 진단 API

| 함수 | 용도 |
|---|---|
| `ValidatePlanetAsset` | 구조화된 `FPlanetXValidationIssue` 목록 생성 |
| `DiagnoseProxySync` | Planet, Proxy, Morph와 Ground anchor 정렬 진단 |
| `ResolvePlanetAlignmentForSection` | Bake Ground mapping 기준 필요 Planet 배치와 현재 오차 계산 |
| `DiagnoseSectionPlanetOverlapFromBounds` | Section bounds의 Planet surface 침범 깊이 계산 |
| `DrawPlanetDebug` | 등록 행성 디버그 표시 |
| `DrawSectionDebug` | Section 디버그 표시 |
| `DrawActorContextDebug` | Actor Runtime Context 표시 |
| `DrawCaptureStackDebug` | Transition Capture Stack 표시 |

`ValidatePlanetAsset`의 반환값과 Issue 목록을 함께 확인합니다. Warning만 존재하는 경우와 Runtime을 막는 Error를 구분해야 합니다.

## 15. 고급 직접 제어 API

다음 API도 Blueprint에 노출되지만 일반 게임 흐름에서는 Runtime Orchestrator가 관리합니다.

| 타입 | 주요 기능 | 권장 사용 |
|---|---|---|
| `UPlanetXPlanetComponent` | Runtime 등록, 행성 중력 조회, Morph 상태 | 등록·조회는 사용 가능, Transition setter는 특수 제어용 |
| `UPlanetXPlanetProxyComponent` | Sphere/Section Proxy 재구성, Layer/Partition 표시 | 디버그, 커스텀 표시 또는 툴링 |
| `UPlanetXTransitionMorphComponent` | BakeData/Resource 지정, Morph mesh와 Alpha 제어 | 커스텀 Transition Presentation |
| `APlanetXRuntimePreviewActor` | BakeData를 직접 로드하고 표시 | Subsystem Preview 경로를 사용할 수 없을 때 |
| `APlanetXEnvironmentManager` | 환경 binding 검증과 Transition Alpha 적용 | 커스텀 환경 제어 |

자동 Transition이 활성화된 상태에서 같은 Alpha, Visibility 또는 Environment 값을 매 Tick 직접 설정하면 Orchestrator 결과와 충돌할 수 있습니다.

### 구성 전용 Actor/Component

- `APlanetXTransitionEndpoint`: Planet, Section, LevelPair와 Transition Cylinder를 Details에서 설정합니다. 상태 판정은 Runtime Service가 수행합니다.
- `UPlanetXViewpointComponent`: Actor를 관찰자 후보로 등록합니다. 공개 명령 함수 없이 설정 프로퍼티로 동작합니다.
- `UPlanetXTravelReceiverComponent`: 도착 Actor에서 Pending Travel을 자동 복원합니다. 공개 명령 함수 없이 BeginPlay와 설정 프로퍼티로 동작합니다.

## 16. 사용 책임 경계

PlanetX가 담당하는 기능:

- 행성 고정 pose Capture/Resolve
- Ground/Orbit 전환 상태
- SameWorld 진입과 복귀
- LevelHandoff Ticket과 Journey
- Runtime Preview
- Section, Surface와 Runtime Context 조회
- 선택적 Native Movement와 이동 속도 Handoff

게임이 담당하는 기능:

- `OpenLevel`, Seamless Travel 또는 다른 World 이동 실행
- Pawn Spawn과 Possession
- GameMode와 PlayerController 정책
- 저장 게임과 네트워크 복제
- 로딩 화면과 실패 복구 UI
- CharacterMovement, Vehicle과 Custom Movement의 고유 상태
- Data Layer와 Streaming Source 정책

## 17. 구현 체크리스트

- [ ] PlanetActor와 PlanetAsset이 현재 World에 등록되어 있다.
- [ ] 중복 PlanetId 사용 시 `PlanetBindingId`를 지정했다.
- [ ] Surface Query 성공 후 `bCanEnterGround`를 확인했다.
- [ ] 모든 `bool` 실패 경로에서 Result 오류를 기록한다.
- [ ] Level Travel은 게임 코드가 직접 수행한다.
- [ ] Target World에서 PlanetActor 등록 후 Ticket을 Resume/Complete한다.
- [ ] Runtime Preview의 `bRenderableContentReady`를 확인한 뒤 표시한다.
- [ ] CoordinateComponent를 MovementComponent로 오해하지 않는다.
- [ ] 기존 UE Movement 전환 시 Movement Handoff API를 명시적으로 호출한다.
- [ ] 자동 Transition 사용 중 Proxy/Morph/Environment를 중복 제어하지 않는다.
