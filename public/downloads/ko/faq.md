# 자주 묻는 질문

PlanetX 제품, Editor, Runtime, 기술 문서에 관해 자주 묻는 질문을 정리합니다.

PlanetX 제품, Editor, Runtime, 기술 문서에 관해 자주 묻는 질문을 정리합니다.

## PlanetX는 Runtime 행성 생성기인가요?

PlanetX는 제작한 Unreal Engine Level을 곡면 행성 표현으로 변환하는 워크플로입니다. 기존 Ground 제작 방식을 대체하거나 완전한 Game World를 Runtime에 자동 생성하지 않습니다.

## PlanetX가 Travel과 Replication을 담당하나요?

아닙니다. PlanetX는 좌표, Surface Context, 상태 정보, Handoff 데이터를 제공합니다. Level Travel, Pawn 생성, Possess, Loading Screen, Replication 정책은 게임이 담당합니다.

## Ground, Transition, Orbit의 차이는 무엇인가요?

- **Ground**는 제작한 로컬 Level과 전체 디테일을 사용합니다.
- **Transition**은 Surface Context를 해석하고 표현 사이의 Handoff를 조율합니다.
- **Orbit**은 생성된 Proxy 콘텐츠로 원거리 행성을 표현합니다.

## Same World와 External Level 중 무엇을 사용해야 하나요?

두 표현을 하나의 World에 함께 둘 수 있고 게임이 로컬에서 Visibility와 상태를 조율할 수 있다면 **Same World**를 사용합니다. Ground 경험이 다른 World에 있고 Travel Ticket과 복원 흐름이 필요하다면 **External Level**을 사용합니다.

## Bake 전에 Refresh가 필요한 이유는 무엇인가요?

`Refresh`는 Source Review와 Output Plan을 다시 만듭니다. 선택, Tag, Level, Bake 설정을 변경한 뒤 실행하면 생성 전에 미지원 콘텐츠, 수동 검토 항목, 출력 충돌을 확인할 수 있습니다.

## World Partition을 지원하나요?

World Partition은 지원 워크플로로 문서화되어 있습니다. 다만 프로젝트 규모 검증, Memory Budget, Partition 크기, Save 동작, External Bake 조건은 각 Production 환경에서 확인해야 합니다.

## 어떤 Unreal Engine 버전을 지원하나요?

현재 Plugin Descriptor에는 공개 `EngineVersion` 범위가 선언되어 있지 않습니다. 공식 호환성 매트릭스가 공개되기 전에는 프로젝트에서 직접 Build하고 검증한 Engine/Platform 조합만 사용하세요.

## 문제는 어디에 보고해야 하나요?

먼저 [알려진 문제](/docs/ko/known-issues)와 [문제 해결](/docs/ko/troubleshooting)을 확인하세요. 새 문제를 보고할 때는 PlanetX 버전, Unreal Engine 버전, 재현 절차, 관련 설정, 정확한 오류 또는 진단 출력을 포함하세요.
