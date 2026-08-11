# 런타임 통합

런타임 통합의 공개 facade는 Game Instance Subsystem인 `UPlanetXSubsystem`입니다. World별 registry와 서비스는 내부 구현이며 gameplay 코드는 facade와 공개 Component를 사용합니다.

## Planet 등록

`APlanetXPlanetActor`에는 Planet, Proxy, Transition Morph, Atmosphere, Volumetric Cloud Component가 기본으로 포함됩니다. Planet Component에 Planet Asset을 지정하고 `bAutoRegisterRuntime`을 사용하거나 `RegisterToPlanetXRuntime`을 호출합니다.

같은 Planet ID를 가진 Actor가 여러 개면 Planet Binding ID를 저장하고 query에 전달하세요. 단일 인스턴스만 가정한 자동 resolve는 여러 Actor 환경에서 모호할 수 있습니다.

## 참가 Actor

필요에 따라 다음 Component를 추가합니다.

- Coordinate: Planet/Section reference, 표준 pose, vector 변환, Spatial Entry policy
- Movement: planet gravity, input/force/impulse, surface snap과 alignment
- Viewpoint: transition 관찰 기준
- Travel Receiver: Level Handoff 도착 후 pending travel 재개
- Transition Endpoint: Section 진입/이탈 조건과 presentation

## Begin Play 순서

Planet Actor가 먼저 등록되고 참가 Actor가 runtime context를 resolve할 수 있어야 합니다. Streaming으로 순서가 늦어질 수 있으면 `RefreshRuntimeRegistration`, `RefreshRuntimeContext` 또는 Travel Receiver의 retry 정책을 사용합니다.

## Package 전 확인

Planet Asset Full Validate, current Proxy Bake, current Generated Visual/Material, Runtime Preview World와 Cook asset bundle을 확인합니다. Editor Preview가 보인다는 사실만으로 runtime payload가 Cook됐다고 판단하지 마세요.
