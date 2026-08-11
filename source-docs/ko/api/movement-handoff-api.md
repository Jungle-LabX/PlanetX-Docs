# Movement Handoff API

헤더: `PlanetX/Blueprint/PlanetXMovementHandoffLibrary.h`

클래스: `UPlanetXMovementHandoffLibrary`

Blueprint Category: `PlanetX|Movement Handoff`

이 Library는 versioned Movement Snapshot을 저장하고 `FPlanetXMovementHandoffHandle`을 반환합니다. 이후 호출에서 이 Handle을 resolve, apply, consume 또는 cancel합니다. 공개 함수 10개는 모두 `bool`과 `FPlanetXMovementHandoffResult`를 제공하므로 출력 사용 전에 두 결과를 함께 확인하세요.

## Capture

| 함수 | 입력과 출력 |
| --- | --- |
| `CaptureMovementComponentHandoff` | `FPlanetXMovementHandoffCaptureRequest`로 `UMovementComponent`를 캡처하고 Snapshot과 Result를 씁니다. |
| `CapturePhysicsBodyHandoff` | `UPrimitiveComponent` Physics Body를 캡처하고 Snapshot과 Result를 씁니다. |
| `CaptureMovementHandoffVelocity` | Source Actor에 대해 전달한 World 선속도·각속도를 캡처하고 Snapshot과 Result를 씁니다. |

`FPlanetXMovementHandoffCaptureRequest`는 Source·Target Coordinate Frame, Source·Target Actor Space State와 Snapshot Lifetime을 지정합니다.

## Resolve와 Apply

| 함수 | 입력과 출력 |
| --- | --- |
| `ResolveMovementHandoffVelocity` | `EPlanetXMovementContinuityPolicy`에 따라 Handle을 대상 World 선속도·각속도로 resolve합니다. |
| `ApplyMovementComponentHandoff` | `FPlanetXMovementHandoffApplyOptions`에 따라 Handle을 대상 `UMovementComponent`에 적용합니다. |
| `ApplyPhysicsBodyHandoff` | Handle을 대상 Physics Body에 적용합니다. |
| `SwitchMovementComponentsWithHandoff` | Source 캡처, Option에 따른 Component 활성 전환과 Target 적용을 수행합니다. |

Apply Option은 연속성, Source 비활성화, Target 활성화, Component Velocity 갱신, 성공 시 Consume과 Same Actor 강제를 제어합니다. Switch가 실패했다면 Component 활성 상태나 Velocity가 의도대로 바뀌었다고 가정하지 말고 Result와 실제 Component를 확인하세요.

## 조회와 종료

| 함수 | 계약 |
| --- | --- |
| `GetMovementHandoffSnapshot` | Handle이 가리키는 Snapshot을 Consume하지 않고 읽습니다. |
| `ConsumeMovementHandoff` | Pending Handle을 Consumed 상태로 바꿉니다. |
| `CancelMovementHandoff` | Pending Handle을 Cancelled 상태로 바꿉니다. |

Actor로 상태를 검색하지 말고 반환된 Handle을 사용하세요. Handle이 invalid, expired, consumed, cancelled 상태이거나 저장된 generation과 일치하지 않으면 실패할 수 있습니다. 전환 직전에 캡처하고, 대상 Frame을 사용할 수 있게 된 뒤 resolve·apply하며, 성공적으로 적용한 뒤에만 consume하세요.

