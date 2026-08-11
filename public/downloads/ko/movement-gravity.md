# 이동과 중력

`UPlanetXMovementComponent`는 Coordinate Component가 resolve한 runtime context를 사용해 행성 기준 이동을 적용합니다.

## 설정

Movement Component의 UpdatedComponent가 유효해야 합니다. Reference Coordinate Component와 Planet gravity 설정을 확인하고 `ValidateMovementConfiguration`으로 오류 메시지를 받습니다.

`FPlanetXNativeMovementSettings`은 가속, 감속, 속도와 ballistic 동작을 정의합니다. `FPlanetXGravitySettings`은 행성 중심 방향의 가속을 정의하고 Planet Component의 `GetGravityAccelerationAtWorldLocation`으로 조회할 수 있습니다.

## 입력과 물리

| 함수 | 용도 |
| --- | --- |
| AddPlanetXInputVector | 선택 Frame의 이동 입력 누적 |
| Set/GetPlanetXVelocity | World/Planet/Section/Surface 속도 설정·조회 |
| AddPlanetXForce | Force 또는 acceleration change |
| AddPlanetXImpulse | Impulse 또는 velocity change |
| SnapToPlanetSurface | 고도와 표면 위치 보정 |
| AlignUpToPlanetSurface | Actor Up을 표면 normal에 정렬 |

Surface Frame 입력은 East/North/Up입니다. 지상 이동은 tangent projection을 켜고 점프·비행은 Up 성분 정책을 명시합니다.

## Runtime state

`GetMovementRuntimeState`에는 현재 velocity, gravity, resolve/failure 상태가 담깁니다. Game Instance facade의 단일·전체 state query는 디버그 UI와 telemetry에 사용할 수 있습니다.

## Handoff

World나 Movement Component를 교체할 때 velocity를 직접 복사하지 말고 Movement Handoff API를 사용하세요. frame continuity policy가 linear/angular velocity를 새 표면 frame에 맞춰 해석합니다.
