# 데이터 타입과 C++ 통합

## 모듈 설정

게임 모듈의 `Build.cs`에 `PlanetX` 런타임 모듈을 추가합니다.

```csharp
PublicDependencyModuleNames.AddRange(new[] { "PlanetX" });
```

각 타입을 소유하는 헤더를 Include하세요. 자주 사용하는 진입점은 다음과 같습니다.

- `PlanetX/Core/PlanetXTypes.h`
- `PlanetX/Coordinates/PlanetXTransform.h`
- `PlanetX/Coordinates/PlanetXCoordinateUtils.h`
- `PlanetX/Movement/PlanetXMovementTypes.h`
- `PlanetX/Movement/Handoff/PlanetXMovementHandoffTypes.h`
- `PlanetX/Travel/PlanetXLevelPair.h`
- `PlanetX/Transition/PlanetXTransitionTypes.h`
- `PlanetX/Validation/PlanetXValidation.h`

## 안정 Transform 계약

`FPlanetXTransform`은 `DataVersion`, `PlanetId`, `PlanetBindingId`, `PlanetFixedPositionCm`, `PlanetFixedRotation`, `Scale3D` Reflection Field를 가진 Blueprint Type입니다. Position 단위는 cm입니다. `UPlanetXSubsystem` 또는 `UPlanetXCoordinateComponent`로 Resolve·Capture하고, World Transform을 Representation과 무관한 저장 Pose로 취급하지 마세요.

## 안정 Movement Handoff 타입

안정 Handoff 계약은 다음을 포함합니다.

- `FPlanetXMovementHandoffHandle`: `SnapshotId`, `Generation`
- `FPlanetXMovementHandoffCaptureRequest`: Source·Target Frame, Source·Target Actor Space State, `LifetimeSeconds`
- `FPlanetXMovementHandoffApplyOptions`: Continuity, Activation, Velocity Update, Consume와 Same Actor 정책
- `FPlanetXMovementHandoffSnapshot`: Version, Handle, Source Identity와 Frame, Movement State, Capture Time, Lifetime, State
- `FPlanetXMovementHandoffResult`: `bSucceeded`, `Error`, `Handle`, `DiagnosticContext`

안정 Reflection Enum에는 `EPlanetXTransformSource`, `EPlanetXMovementHandoffState`, `EPlanetXMovementContinuityPolicy`, `EPlanetXMovementVectorSpace`가 있습니다. 실제 배포하는 Plugin Version의 헤더를 기준으로 Compile·Serialize하고 숫자 값이나 Layout을 추정하지 마세요.

## Travel Route 선택

`FPlanetXTravelRoute`는 `PlanetX/Transition/PlanetXTransitionTypes.h`에 선언되며 `World`, `PlanetId`, `SectionId`, `PlanetActorIndex`, `PlanetBindingId`를 포함합니다. `PlanetActorIndex` 기본값은 `INDEX_NONE`입니다. 후보가 정확히 하나일 때만 자동 선택하며 `0`은 첫 번째 deterministic 후보를 명시적으로 선택합니다. 두 Selector를 함께 지정하면 Index와 Binding ID가 같은 후보를 가리켜야 합니다.

## Coordinate와 Validation Helper

`FPlanetXCoordinateUtils`는 지원 Coordinate 표현 사이의 순수 C++ 변환을 제공합니다. Runtime Registry가 필요한 변환은 `UPlanetXSubsystem`을 사용하세요. cm 단위, 유한한 값과 정규화된 방향 가정을 지키고 성공값을 항상 확인합니다.

`PlanetXValidation`은 C++ Tool을 위한 구조화된 Validation을 제공합니다. Severity, Code, Subject와 Remediation Text를 유지하세요. Validation은 Asset을 암묵적으로 Repair하거나 Save하지 않습니다.

## 제외되는 구현 표면

생성 Mesh 데이터, Boundary Reconstruction 중간체, Bake Pass, 내부 Runtime Service와 Shard·Serialization Payload는 선언이 공개되어 있다는 이유만으로 안정 Game Save 또는 Network 계약이 되지 않습니다.

