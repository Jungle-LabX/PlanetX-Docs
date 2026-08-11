# 좌표·이동 Component API

## UPlanetXCoordinateComponent

헤더: `PlanetX/Components/PlanetXCoordinateComponent.h`

Coordinate Component는 표준 PlanetX pose를 저장하고 Owner가 사용할 Planet, Binding, Section과 Coordinate Frame을 resolve합니다. Reference를 설정하고 Planet Actor가 등록됐는지 확인한 뒤, 관련 등록이나 Streaming 상태가 바뀌면 `RefreshRuntimeContext`를 호출하세요.

### 안정 좌표 상태와 정책

| 함수 | 계약 |
| --- | --- |
| `RefreshRuntimeContext` | Runtime Context를 다시 resolve하며 유효한 Context를 만들 수 없으면 `false`입니다. |
| `SetPlanetXTransform`, `GetPlanetXTransform` | 표준 pose를 쓰거나 읽습니다. Setter의 `bApplyToOwner`가 즉시 적용 여부를 정합니다. |
| `SetCoordinateFrameReference` | Coordinate Frame Reference를 바꾸고 resolve 성공 여부를 반환합니다. |
| `SetAutomaticSameWorldEntryEnabled`, `SetAutomaticSameWorldReturnEnabled`, `SetSameWorldReturnPosePolicy` | Spatial Entry 동작을 변경합니다. |
| `GetSpatialEntryPolicy`, `IsAutomaticSpatialEntryParticipant` | 실제 Spatial Entry 설정을 읽습니다. |

Editor-callable helper인 `RefreshCoordinateSnapshot`, `PullFromWorld`, `PushToWorld`, `CaptureOwnerTransformToPlanetX`, `ApplyPlanetXTransformToOwner`는 저장 pose와 Owner Transform을 명시적으로 동기화합니다.

### 안정 Surface Frame과 Vector

| 함수 | 계약 |
| --- | --- |
| `GetCurrentSurfaceFrame` | 현재 Surface Frame을 출력합니다. |
| `GetPlanetUpVectorWorld`, `GetPlanetDownVectorWorld` | Planet 기준 단위 방향을 출력합니다. |
| `GetSurfaceEastVectorWorld`, `GetSurfaceNorthVectorWorld` | resolve된 Surface Frame의 접선 방향을 출력합니다. |
| `ProjectVectorToSurfaceTangent` | World Vector를 현재 접평면에 투영합니다. |
| `ConvertSurfaceVectorToWorld` | East/North/Up 입력을 World Space로 변환하며 선택적으로 접평면에 투영합니다. |
| `ConvertPlanetLocalVectorToWorld`, `ConvertSectionLocalVectorToWorld` | 각 Local Space의 Vector를 변환합니다. |
| `ConvertCoordinateVectorToWorld`, `ConvertWorldVectorToCoordinate` | `EPlanetXMovementVectorSpace` 기준으로 변환합니다. |
| `BuildPlanetSurfaceWorldLocation` | `TargetAltitudeCm`의 World Location을 만듭니다. |
| `BuildSurfaceAlignedRotation` | `FPlanetXSurfaceAlignmentSettings`에 따라 Rotation을 만듭니다. |

이 표의 함수는 모두 `bool`을 반환합니다. `false` 뒤에는 출력을 사용하지 마세요.

### Advanced 조회와 Spatial Loading

`RefreshReferenceDetails`, `GetResolvedPlanetComponent`, `GetCachedRuntimeContext`, `GetRepresentationDomain`은 resolve된 Reference와 Context를 제공합니다. 현재 Spatial Loading 정책에는 `GetActorSpatialLoadingPolicy`, `ShouldForceOwnerAlwaysLoaded`, `ApplySpatialLoadingPolicyToOwner`를 사용합니다. Data Layer와 Streaming Source는 프로젝트가 관리합니다.

## UPlanetXMovementComponent

헤더: `PlanetX/Components/PlanetXMovementComponent.h`

Owner에 Coordinate Component와 commit된 Runtime Context가 필요합니다.

| 안정 함수 | 계약 |
| --- | --- |
| `AddPlanetXInputVector` | 선택한 Vector Space에서 입력을 추가합니다. 기본값은 `SurfaceFrame`, 접평면 투영은 활성입니다. |
| `SetPlanetXVelocity` | 선택한 Vector Space에서 속도를 설정합니다. 기본값은 `World`입니다. |
| `GetPlanetXVelocity` | 현재 속도를 요청한 Vector Space로 변환합니다. |
| `AddPlanetXForce` | Force를 추가합니다. 기본 Space는 `World`, `bAccelerationChange` 기본값은 `false`입니다. |
| `AddPlanetXImpulse` | Impulse를 추가합니다. 기본 Space는 `World`, `bVelocityChange` 기본값은 `false`입니다. |
| `SnapToPlanetSurface` | `FPlanetXSurfaceSnapSettings`에 따라 resolve된 표면으로 이동합니다. |
| `AlignUpToPlanetSurface` | `FPlanetXSurfaceAlignmentSettings`에 따라 Owner를 정렬합니다. |
| `ValidateMovementConfiguration` | 설정이 유효하지 않을 때 오류 메시지를 출력합니다. |

안정 함수는 모두 `bool`을 반환합니다. `GetMovementRuntimeState`와 `GetCommittedRuntimeContext`는 승인된 Advanced 상태 조회입니다. Representation이 바뀌는 동안 다른 Movement Component나 Physics Body가 속도를 소유한다면 [Movement Handoff](?lang=ko&doc=movement-handoff-api)를 사용하세요.

