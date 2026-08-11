# 공개 API 개요

PlanetX gameplay 통합에는 `PlanetX` 런타임 모듈을 사용합니다. Blueprint의 주요 facade는 `UPlanetXSubsystem`이며 Actor와 Component가 등록, 좌표, 이동, 전환, 환경과 도착 처리를 담당합니다.

이 레퍼런스는 PlanetX 1.0에 포함된 `Source/PlanetX/Public/PlanetX` 아래의 공개 헤더를 기준으로 작성했습니다.

## API 지원 등급

| 등급 | 용도 |
| --- | --- |
| Stable Gameplay API | 지원되는 gameplay 통합 표면입니다. 시그니처, reflection 형태, 문서화된 동작과 실패·consume 계약을 보호합니다. |
| Advanced and Diagnostics API | 전문 통합용 지원 표면입니다. 호환성을 깨는 변경에는 deprecation과 migration 안내가 필요합니다. |
| Authoring and Editor API | Editor workflow에서 지원하며 cooked runtime 지원을 의미하지는 않습니다. |
| Internal or Test-only API | 외부 호환성을 보장하지 않습니다. |

타입이 공개 헤더에 있다는 사실만으로 지원 등급이 정해지는 것은 아닙니다. 생성 Mesh 중간 데이터, Bake pass, 내부 Runtime Service와 직렬화 payload를 게임 코드의 계약으로 사용하지 마세요.

## 주요 타입

| 영역 | 주요 타입 |
| --- | --- |
| Runtime facade | `UPlanetXSubsystem` |
| Planet 표현 | `APlanetXPlanetActor`, `UPlanetXPlanetComponent`, `UPlanetXPlanetProxyComponent` |
| 참가 Actor | `UPlanetXCoordinateComponent`, `UPlanetXMovementComponent`, `UPlanetXViewpointComponent`, `UPlanetXTravelReceiverComponent` |
| 제작 데이터 | `UPlanetXPlanetAsset`, `UPlanetXSurfacePreset` |
| 이동 Handoff | `UPlanetXMovementHandoffLibrary` |

## 모듈과 Subsystem 접근

게임 모듈의 `Build.cs`에 런타임 모듈을 추가합니다.

```csharp
PublicDependencyModuleNames.AddRange(new[] { "PlanetX" });
```

C++에서는 유효한 Game Instance에서 Subsystem을 얻습니다.

```cpp
#include "PlanetX/Subsystems/PlanetXSubsystem.h"

UPlanetXSubsystem* PlanetX = GameInstance->GetSubsystem<UPlanetXSubsystem>();
```

Blueprint에서는 Game Instance Subsystem 노드를 사용합니다. World가 없거나 종료 중일 때 World Context 함수를 호출하지 마세요.

## 공통 실패 규칙

- `bool` 반환값은 작업 완료 여부를 나타냅니다. 함수가 진단 출력을 별도로 보장하지 않는 한 `false` 뒤에는 출력 parameter를 사용하지 않습니다.
- Enum을 반환하는 Query는 성공 상태일 때만 출력값을 사용합니다.
- `None` ID, 유효하지 않은 Object 참조, 만료된 Handle과 non-success 오류 Enum을 정상적인 실패 상태로 처리합니다.
- 후보가 여러 개일 수 있으면 Planet, Binding, Section과 Level Pair ID를 명시합니다.
- 등록 또는 Streaming 상태가 바뀌면 Runtime Context를 갱신합니다.

Blueprint 표시명과 C++ Symbol은 다를 수 있습니다. 이 레퍼런스의 이름과 include 경로는 C++ 선언을 기준으로 합니다.
