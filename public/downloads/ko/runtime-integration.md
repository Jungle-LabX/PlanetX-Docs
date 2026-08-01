# Runtime Integration

Planet Actor

## Planet Actor

1. World에 `APlanetXPlanetActor`를 배치합니다.
2. Planet Component에 Planet Asset을 지정합니다.
3. 일반적으로 Auto Register Runtime을 유지합니다.
4. 같은 Planet Asset의 여러 인스턴스가 있으면 안정적인 Planet Binding ID를 지정합니다.

## Runtime Role

| Role | 사용 방식 |
|---|---|
| Same World | 같은 World에서 Ground/Orbit 표현 전환 |
| External Level | 게임이 World Travel하고 PlanetX가 pose/state를 Handoff |

PlanetX는 `OpenLevel`, spawn, possession과 GameMode를 소유하지 않습니다.

## Same World

Blueprint:

- `Enter Ground Same World(World Context, Request Actor, Surface Query)`
- `Return To Orbit Same World(World Context, Request Actor)`

Coordinate Component의 Automatic Same World Entry/Return을 사용할 수도 있습니다.

## External Level

```text
Prepare Travel
→ 게임이 Ticket/Route 보관
→ 게임이 World Travel
→ Target Actor 생성·Possess
→ Resume Pending Travel
```

도착 Actor의 `UPlanetXTravelReceiverComponent`는 자동 resume를 시도할 수 있습니다.

## 주요 Component

| Component | 용도 |
|---|---|
| Coordinate Component | Planet/Section identity와 PlanetX pose |
| Movement Component | 선택적 행성 표면 native movement |
| Viewpoint Component | 카메라/플레이어 관찰자와 transition driver |
| Travel Receiver | External Travel 도착 pose/state 적용 |

Coordinate Component만 붙여도 Actor가 매 프레임 자동 이동하지는 않습니다.

## Runtime Preview

External Level의 Bake Preview를 실제 Travel 없이 표시할 때 사용합니다.

- Load Runtime Preview
- Set Runtime Preview Visible
- Unload Runtime Preview
- Get Runtime Preview Status

## C++ 시작점

```cpp
#include "PlanetX/Runtime/PlanetXSubsystem.h"

UPlanetXSubsystem* PlanetX =
    GetGameInstance()->GetSubsystem<UPlanetXSubsystem>();
```

```cpp
PlanetX->EnterGroundSameWorld(this, RequestActor, SurfaceQuery);
PlanetX->ReturnToOrbitSameWorld(this, RequestActor);
```

External Travel은 `PrepareTravel` 후 게임 Travel을 수행하고, 도착 후 `ResumePendingTravel`을 호출합니다.

내부 Runtime Service가 아니라 `UPlanetXSubsystem` 공개 facade를 사용하십시오.

## Transition과 Environment

- `APlanetXTransitionEndpoint`: Planet/Section/Level Pair의 Orbit/Ground 경계 등록
- `APlanetXEnvironmentManager`: Cloud/Atmosphere binding과 Ground/Orbit 환경 전환

PIE에서는 PlanetX Mode의 Runtime 팔레트로 Actor context, Movement state와 Transition result를 확인합니다.

전체 Blueprint/C++ 함수, 반환 타입과 실패 처리 방법은 [사용자 제공 API](/docs/ko/user-api)를 참고하십시오.
