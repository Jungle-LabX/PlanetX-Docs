# 자주 묻는 질문

PlanetX 제품, Editor, Runtime, 기술 문서에 관해 자주 묻는 질문을 정리합니다.

## PlanetX는 Runtime 행성 생성기인가요?

PlanetX는 제작한 Unreal Engine Level을 곡면 행성 표면 및 Bake된 Proxy 표현과 연결합니다. 기존 Ground Gameplay 콘텐츠를 대체하거나 완전한 Game World를 Runtime에 자동 생성하지 않습니다.

## PlanetX가 Level Handoff Travel 전체를 담당하나요?

아닙니다. PlanetX는 Level Handoff 상태를 준비하고 복원합니다. `OpenLevel`, 도착지 Pawn 생성과 Possess, 도착지 `GameMode` 정책은 게임 코드가 담당합니다.

## Ground, Transition, Orbit의 차이는 무엇인가요?

- **Ground**는 원본 Gameplay 콘텐츠와 전체 디테일을 사용합니다.
- **Transition**은 표현이 바뀌는 동안 Section 상태, Runtime Context, Actor Pose, Travel 상태를 연결합니다.
- **Orbit**은 Planet과 Bake된 Section Proxy 콘텐츠를 원거리에서 표현합니다.

## Same World와 External Level 중 무엇을 사용해야 하나요?

두 표현을 하나의 World에 함께 둘 수 있고 게임이 로컬에서 Visibility와 상태를 조율할 수 있다면 **Same World**를 사용합니다. Ground 경험이 다른 World에 있고 Travel Ticket과 복원 흐름이 필요하다면 **External Level**을 사용합니다.

## Bake 전에 Scan Sources가 필요한 이유는 무엇인가요?

`Scan Sources`는 Source Review와 Output Plan을 다시 만듭니다. Source의 Use 또는 Role을 변경했다면 Bake 전에 **Apply Source Changes**를 선택해 검토한 Source 결정을 Plan에 적용하세요.

## World Partition을 지원하나요?

PlanetX는 검증된 HLOD 우선 사용과 자동 출력 크기 계산 등 World Partition 대응 옵션을 제공합니다. World Partition, Data Layer, Spatial Loading 정책은 프로젝트별로 검증해야 합니다.

## 어떤 Unreal Engine 버전을 지원하나요?

PlanetX 1.0은 Unreal Engine 5.8과 Win64를 대상으로 하며 GeometryProcessing 및 PCG가 필요합니다. 프로젝트에 통합하기 전에 [호환성과 제한사항](/docs/ko/compatibility-limitations)을 확인하세요.

## 문제 보고에 무엇을 포함해야 하나요?

먼저 [알려진 문제](/known-issues), [설치와 설정 문제](/docs/ko/setup-configuration), [Proxy Bake 문제](/docs/ko/proxy-bake-troubleshooting), [Runtime과 Travel 문제](/docs/ko/runtime-travel-troubleshooting)를 확인하세요. PlanetX 버전, Unreal Engine 버전, 정확한 재현 절차, 관련 설정, 전체 오류 또는 진단 출력을 포함하고 [jungle.labx@gmail.com](mailto:jungle.labx@gmail.com)으로 보내주세요.
