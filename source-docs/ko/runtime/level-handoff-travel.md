# Level Handoff

Level Handoff는 서로 다른 World package 사이에서 PlanetX pose와 Journey 상태를 전달합니다. 게임 코드는 레벨 로딩과 Pawn 생성 정책을 계속 소유합니다.

## 권장 흐름

`PrepareTravel`은 Source Actor, Surface Query, 명시적인 `FPlanetXTravelRoute`에서 Ticket을 만듭니다.

```cpp
FPlanetXLevelHandoffTicket Ticket;
FPlanetXLevelHandoffResult Result;
const bool bPrepared = PlanetXSubsystem->PrepareTravel(
    WorldContext, SourceActor, SurfaceQuery, TargetRoute, Ticket, Result);
```

성공하면 게임이 `Ticket.TargetWorld`로 이동합니다. 도착 후 한 개의 matching pending ticket만 존재할 때 `ResumePendingTravel`을 사용하거나, 저장한 Ticket으로 `CompleteLevelHandoff`를 호출합니다.

## 왕복

고급 API는 `BeginLevelHandoff` → `CompleteLevelHandoff` → `BeginReturnLevelHandoff(JourneyId)` → `CompleteLevelHandoff` 흐름을 제공합니다. `PrepareTravel`은 명시 route를 사용해 Ground에서 Orbit으로 직접 돌아갈 수도 있습니다.

## 안전 규칙

- matching pending travel이 없으면 PendingTravelNotFound
- 여러 개면 AmbiguousPendingTravel
- 오래된 Ticket generation은 StaleGeneration
- target Planet Binding을 아직 찾지 못하면 Travel Receiver가 timeout 안에서 retry 가능
- Level Handoff Ground pose는 capture에 저장된 Ground mapping이 authoritative

`ResumePendingTravel`은 latest ticket을 추측하지 않습니다. 멀티 Travel을 허용하는 프로젝트는 Ticket이나 Journey를 gameplay save state에 함께 관리하세요.

## 취소와 진단

미사용 Ticket은 `CancelLevelHandoff`로 취소합니다. Capture, Journey와 Result error를 로그에 함께 남기고 `GetActiveTransitionJourneys`로 누수를 확인하세요.
