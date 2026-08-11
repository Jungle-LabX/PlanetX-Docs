# 전환 모델

PlanetX 전환은 표시 Alpha만 바꾸는 효과가 아니라 Section, runtime context, Actor pose와 travel state를 연결하는 수명 주기입니다.

## 전환 참여 요소

- `APlanetXTransitionEndpoint`: Section과 endpoint 역할, cylinder 설정, 참가 Actor 정책
- `UPlanetXViewpointComponent`: 관찰 위치와 transition presentation 기준
- `UPlanetXTransitionMorphComponent`: flat/curved mesh 전환 표현
- `UPlanetXPlanetProxyComponent`: Section proxy와 residency
- `UPlanetXSubsystem`: query, capture, Same World/Level Handoff facade

`FPlanetXTransitionCylinderSettings`은 표면 거리와 고도 offset으로 상태와 Alpha를 평가합니다.

## Same World

같은 World 안에서 Orbit Actor가 Ground pose로 이동합니다. 자동 진입은 Coordinate Component의 Spatial Entry policy가 켜진 참가 Actor에만 적용됩니다. 반환 정책은 captured pose 또는 현재 Section-relative pose 중 선택할 수 있습니다.

## Level Handoff

서로 다른 World 사이에서는 `BeginLevelHandoff` 또는 `PrepareTravel`이 Ticket을 만들고, 게임 코드가 `OpenLevel`과 Pawn 정책을 소유합니다. 도착 World에서 `ResumePendingTravel` 또는 정확한 Ticket을 사용하는 `CompleteLevelHandoff`가 pose를 적용합니다.

Ticket generation이 오래됐거나 현재 World에 matching pending travel이 여러 개면 적용하지 않습니다. Journey ID는 왕복 상태를 이어주며 완료된 Journey도 진단을 위해 조회할 수 있습니다.

## 이동 연속성

Movement Handoff는 linear/angular velocity를 coordinate frame에 맞춰 캡처하고 적용합니다. Consume, Cancel과 rollback 결과를 확인해 중복 적용을 막으세요.
