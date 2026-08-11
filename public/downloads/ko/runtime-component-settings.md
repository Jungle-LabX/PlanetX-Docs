# 런타임 Actor와 Component 설정

## Planet Component

`UPlanetXPlanetComponent`는 `APlanetXPlanetActor`의 Runtime 등록과 행성 중력 기준을 소유합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PlanetAsset` | None | 이 Actor가 표현할 `UPlanetXPlanetAsset`입니다. Runtime 등록, Section, 좌표와 Visual 계약의 기준입니다. |
| `PlanetBindingId` | None | 같은 Planet ID를 가진 여러 Actor를 World 안에서 구분합니다. 비어 있으면 Owner Actor 이름을 사용합니다. Actor 이름이 바뀌어도 Travel Ticket을 유지해야 하면 명시적으로 지정하세요. |
| `bAutoRegisterRuntime` | true | Begin Play에 Runtime Registry에 자동 등록합니다. 끄면 공개 등록 API를 직접 호출해야 합니다. |
| `bRefreshRuntimeRegistrationOnTransformChange` | true | Planet Actor Transform이 바뀌면 Runtime 등록 Transform을 갱신합니다. |
| `GravitySettings.bEnabled` | true | 이 Planet의 중력 쿼리를 활성화합니다. |
| `GravitySettings.Model` | `ConstantSurface` | `ConstantSurface`는 표면 가속도를 유지하고 `InverseSquare`는 중심 거리의 제곱에 반비례시킵니다. |
| `SurfaceAccelerationCmPerSecondSquared` | 980 cm/s², 0 이상 | 행성 표면 기준 중력 가속도입니다. |
| `MaximumAccelerationCmPerSecondSquared` | 100,000 cm/s², 0 이상 | 중심 근처에서 Inverse Square 가속도가 과도해지는 것을 제한합니다. |

## Coordinate Component

`SpatialEntryPolicy`는 아래 Same World 자동 진입/복귀 설정 묶음입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAutoRegisterRuntime` | true | Owner를 PlanetX Runtime 참여 Actor로 자동 등록합니다. |
| `RepresentationDomain` | `Ground` | Actor의 기본 표현 소속입니다. `Ground`는 원본 Level, `Orbit`은 Planet/Compare와 Runtime Orbit/Transition 표현에 사용됩니다. |
| `ActorSpatialLoadingPolicy` | `PlanetXManaged` | `PlanetXManaged`는 Orbit Actor를 non-spatial/always-loaded로 유지합니다. `ActorManaged`는 개발자가 `Is Spatially Loaded`를 직접 관리합니다. Data Layer와 Streaming Source는 이 옵션이 관리하지 않습니다. |
| `ReferencePlanetActor` | None | 좌표 기준 Planet Actor입니다. 유효한 Planet Asset을 가진 Actor만 사용할 수 있고, 지정하면 `ReferencePlanetId`보다 우선합니다. |
| `ReferencePlanetId` | None | Planet Actor가 없을 때 사용할 ID입니다. 목록은 현재 World에 배치된 Planet Component의 Asset에서 구성됩니다. |
| `ReferenceSectionId` | None | 현재 Planet Asset의 enabled Section ID입니다. 저장, Capture, Sequencer처럼 재현성이 필요한 경로에서는 명시적으로 지정하세요. |
| `bAutoResolveSectionFromWorld` | true | Section ID가 None이면 현재 Planet Local 위치를 포함하는 첫 Section을 Asset 배열 순서로 찾습니다. Editor 편의와 일회성 Query용이며 영속 ID로 사용하지 마세요. |
| `bSyncFromOwnerTransformInEditor` | true | Editor에서 Root Transform이 바뀔 때 좌표 snapshot을 갱신합니다. Runtime authoritative state는 World Runtime Subsystem이 관리합니다. |
| `TransformSource` | `WorldTransform` | `WorldTransform`은 Owner Transform에서 PlanetX pose를 capture합니다. `PlanetXTransform`은 저장된 표준 pose를 원본으로 World Transform을 만듭니다. 전환은 자동으로 양쪽 값을 덮어쓰지 않습니다. |

### Spatial Entry Policy

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAutomaticSameWorldEntryEnabled` | false | Orbit에서 Same World Ground 영역으로 들어갈 때 좌표/Actor 이동을 자동 적용합니다. |
| `bAutomaticSameWorldReturnEnabled` | false | Ground 영역을 벗어날 때 Orbit 표현으로 자동 복귀합니다. |
| `SameWorldReturnPosePolicy` | `PreserveCurrentLogicalPose` | 현재 Ground 이동 결과를 유지합니다. `RestoreEntryOrbitPose`는 진입 시 Orbit pose로 복원합니다. |
| `MovementContinuityPolicy` | `RebaseBetweenFrames` | `Reset`, `PreserveWorld`, Frame 사이 속도를 변환하는 `RebaseBetweenFrames`, 적용하지 않는 `DoNotApply` 중 이동 연속성을 선택합니다. |

### PlanetX Transform

`TransformSource=PlanetXTransform`일 때 아래 값이 authoritative 입력입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PlanetId` | None | 행성 식별자입니다. |
| `PlanetBindingId` | None | 현재 World의 Planet Actor binding입니다. Runtime resolve에는 비어 있지 않아야 합니다. |
| `PlanetFixedPositionCm` | (0,0,0) | 행성 고정 좌표의 위치입니다. |
| `PlanetFixedRotation` | Identity | 정규화된 행성 고정 회전 Quaternion입니다. |
| `Scale3D` | (1,1,1) | 유한한 Actor Scale입니다. |

## Movement Component

`UPlanetXMovementComponent`는 PlanetX native 이동을 사용할 때 추가합니다. 기존 Character Movement만 사용할 프로젝트에는 필수가 아닙니다.

`NativeMovementSettings`와 `SurfaceAlignmentSettings`는 아래 두 하위 표의 설정 묶음입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `CoordinateComponent` | None | 기준 Coordinate Component입니다. 비어 있으면 Owner에서 resolve할 수 있지만 명시적 연결이 더 확실합니다. |
| `bApplyPlanetGravity` | true | PlanetX 중력을 이동에 적용합니다. |
| `bApplyPlanetGravityInGround` | false | Ground 상태에서도 PlanetX 중력을 적용합니다. 기존 Character/Physics 중력과 중복되지 않게 주의하세요. |
| `GravityScale` | 1.0, 0 이상 | Planet Component의 gravity acceleration에 곱하는 배율입니다. |
| `bAutoRegisterRuntime` | true | Runtime movement registry에 자동 등록합니다. |

### Native Movement Settings

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `MassKg` | 1 kg, 최소 0.001 | 힘/가속도 계산의 질량입니다. |
| `MaximumSpeedCmPerSecond` | 1,200 cm/s | native 이동 최고 속도입니다. |
| `AccelerationCmPerSecondSquared` | 4,096 cm/s² | 입력 시 가속도입니다. |
| `DecelerationCmPerSecondSquared` | 4,096 cm/s² | 입력이 줄었을 때 감속도입니다. |
| `bConstrainInputToSurface` | false | 입력 벡터에서 Surface Up 성분을 제거해 접평면에 제한합니다. |
| `bAlignUpToSurface` | true | Actor Up을 행성 Surface Up에 맞춥니다. |
| `bSweepInOrbit` | false | Orbit 이동 시 collision sweep을 사용합니다. |
| `bSweepInGround` | true | Ground 이동 시 collision sweep을 사용합니다. |
| `bMaintainSurfaceAltitude` | false | 이동 중 지정 Surface Altitude를 유지합니다. |
| `SurfaceAltitudeCm` | 0 cm | 유지할 표면 고도입니다. |

### Surface Alignment Settings

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bPreserveCurrentForward` | true | Up을 표면에 맞출 때 현재 Forward를 접평면에 투영해 최대한 보존합니다. |
| `FallbackForwardWorld` | World Forward | 현재 Forward가 Up과 평행해질 때 사용할 fallback 방향입니다. |
| `BlendTimeSeconds` | 0.25 s, 0 이상 | 표면 정렬 회전 Blend 시간입니다. 0이면 즉시 적용합니다. |

공개 Surface Snap 요청의 `TargetAltitudeCm`은 목표 표면 고도이고 `bSweep`은 그 위치로 이동할 때 충돌 Sweep을 사용할지 결정합니다.

## Viewpoint Component

실제 PlayerController View Target과 활성 Camera가 있는 Actor에 두세요.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAutoRegisterRuntime` | true | Viewpoint Registry에 자동 등록합니다. |
| `bCanDriveTransitionState` | true | 이 Viewpoint가 Orbit/Transition/Ground 상태 계산을 주도할 수 있습니다. 여러 Viewpoint 중 관찰용은 끄세요. |
| `PresentationCompensationMode` | `Automatic` | `Automatic`은 적절한 movable child를 찾고, `Disabled`는 보정을 끄며, `ExplicitComponent`는 지정 Component만 움직입니다. Actor Root는 보정 대상으로 이동하지 않습니다. |
| `TransitionPresentationComponent` | None | Explicit 모드에서 presentation compensation을 받을 movable child Scene Component입니다. |

## Travel Receiver Component

Level Handoff 뒤 새 World의 Actor가 pending capture를 복원하는 설정입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAutoResumePendingTravel` | true | Begin Play 이후 pending travel을 자동 resume합니다. 완전 수동 `ResumePendingTravel` 흐름에서는 끄세요. |
| `bApplyControlRotation` | true | Capture한 Controller 회전을 도착 Actor에 복원합니다. 프로젝트가 카메라 방향을 별도로 결정하면 끄세요. |
| `ArrivalRetryTimeoutSeconds` | 15 s, 최소 0, UI 최대 30 | OpenLevel 후 Planet Actor 등록이 늦을 때 재시도하는 제한 시간입니다. 0이면 지연 재시도를 하지 않습니다. |

## Transition Endpoint

PlanetX Mode의 Add Endpoint가 ID와 Actor 참조를 채우는 것이 가장 안전합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PlanetId`, `SectionId`, `LevelPairId` | None | Orbit/Ground Endpoint가 공유하는 이동 계약 ID입니다. |
| `EndpointRole` | `Orbit` | 이 World-local Endpoint가 Orbit 쪽인지 Ground 쪽인지 지정합니다. |
| `PlanetAsset` | None | canonical Transition Policy의 원본입니다. Ground Endpoint에는 필수이며 Orbit은 Planet Actor에서 추론할 수 있습니다. |
| `PlanetActor` | None | Orbit Endpoint에서 사용하는 Planet Actor입니다. |
| `EnvironmentManagerActor` | None | 상태 변화와 함께 환경 표현을 전환할 Manager입니다. |
| `bAutoSizeTransitionCylinderToSectionBounds` | true | Section landing/playable bounds에 맞춰 Cylinder를 계산합니다. 켜져 있으면 수동 Cylinder 크기를 덮어씁니다. |
| `OuterRadiusCm` / `InnerRadiusCm` | 1,000,000 / 250,000, 최소 1 | 바깥 Transition 경계와 안쪽 Ground 경계의 반경입니다. Inner는 Outer보다 작아야 합니다. |
| `bUseHeightLimit` | true | 반경뿐 아니라 Cylinder 높이도 상태 판정에 사용합니다. |
| `OuterHalfHeightCm` / `InnerHalfHeightCm` | 1,000,000 / 250,000, 최소 1 | Height Limit이 켜졌을 때 바깥/안쪽 반높이입니다. |
| `RuntimeAlphaUpdateThreshold` | 0.002, 0 이상 | 이전 값과의 Alpha 차이가 이 값 이상일 때 Runtime 업데이트를 전달합니다. 작은 값은 더 자주 갱신합니다. |
| `bDrawDebugTransitionCylinders` | true | Editor Cylinder 시각화를 표시합니다. |
| `CylinderLineThickness` | 480, 최소 1 | Debug 선 굵기입니다. |
| `DebugCylinderSegments` | 96, 8–128 | 원주 세그먼트 수입니다. |
| `DebugCylinderHeightRingCount` | 8, 0–12 | 높이 방향 보조 Ring 수입니다. |
| `DebugCylinderRadialBandCount` | 3, 0–4 | 반경 방향 보조 Band 수입니다. |

## Movement Handoff 호출 옵션

이 값들은 Component Details의 저장 설정이 아니라 Capture/Apply 호출마다 전달하는 공개 옵션입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `SourceCoordinateFrame` / `TargetCoordinateFrame` | None | `Planet` 또는 `Section` Frame과 관련 ID를 지정합니다. |
| `SourceSpaceState` / `TargetSpaceState` | `None` | 이동 전후 `Orbit`, `Transition`, `Ground` 상태입니다. |
| `LifetimeSeconds` | 0 s | Snapshot 유효 시간입니다. 0은 즉시 만료 의미가 될 수 있으므로 호출 계약에 맞는 양수를 사용하세요. |
| `ContinuityPolicy` | `RebaseBetweenFrames` | 속도/각속도를 Source Frame에서 Target Frame으로 처리하는 정책입니다. |
| `bDeactivateSource` | true | 성공 시 Source Movement Component를 비활성화합니다. |
| `bActivateTarget` | true | Target Movement Component를 활성화합니다. |
| `bUpdateComponentVelocity` | true | 변환된 속도를 Target Component에 씁니다. |
| `bConsumeOnSuccess` | true | 성공한 Snapshot을 재사용할 수 없도록 consume합니다. |
| `bRequireSameActor` | true | Source와 Target Movement Component가 같은 Actor에 속해야 합니다. |

`UPlanetXSubsystem::MaxCaptureStackDepth`의 클래스 기본값은 8입니다. 이는 중첩 Transition Capture의 안전 상한인 고급 기본값이며 일반 Project Settings 항목은 아닙니다.
