# 표현 영역과 런타임 로드

PlanetX는 Actor가 어느 표현에 속하는지와 World Partition에서 어떻게 로드되는지를 별도 정책으로 취급합니다.

## Representation Domain

`EPlanetXRepresentationDomain`은 Actor의 기본 표현 영역을 나타냅니다.

- Ground Actor는 원본 Level 표현에 속합니다.
- Orbit Actor는 Planet/Compare 편집 view와 Orbit/Transition 런타임 표현에 속합니다.
- 전역 presentation Actor는 별도 visibility 규칙을 가질 수 있습니다.

PlanetX Mode의 Planet, Compare, Level view는 이 Domain을 이용해 원본과 프록시를 비교합니다.

## Actor Spatial Loading Policy

`EPlanetXActorSpatialLoadingPolicy`는 Actor의 World Partition spatial-loading 설정을 누가 관리하는지 정의합니다.

- `PlanetXManaged`: Orbit Actor를 non-spatial 상태로 유지해 Orbit 표현에서 계속 사용할 수 있게 합니다.
- `ActorManaged`: Actor의 Is Spatially Loaded 설정을 프로젝트가 직접 관리합니다.

이 정책은 Data Layer membership이나 Streaming Source를 자동 구성하지 않습니다. 해당 시스템은 프로젝트가 계속 소유합니다.

## 정책 적용

`ShouldForceOwnerAlwaysLoaded`로 현재 정책의 결과를 확인하고 `ApplySpatialLoadingPolicyToOwner`로 Owner에 적용합니다. 적용 함수는 Editor에서도 호출할 수 있습니다. 적용 후 Actor, World Partition과 Data Layer 설정을 프로젝트 기준으로 다시 확인하세요.

## Visibility와 residency 구분

보이지 않는 것과 로드되지 않은 것은 다릅니다. Planet proxy visibility, Section proxy residency, Runtime Preview residency는 별도 상태입니다. Runtime Monitor에서 등록 여부, realized component 수, renderable 상태를 함께 확인해야 합니다.
