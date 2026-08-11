# 설정 레퍼런스 안내

이 카테고리는 현재 PlanetX 코드에서 사용자가 조정할 수 있는 설정을 소유 객체와 작업 화면별로 정리합니다. 설정 이름은 Unreal Editor의 Details 패널 또는 C++ 속성 이름과 대응하며, 기본값은 새 객체를 만들었을 때의 코드 기본값입니다.

## 어디에서 무엇을 설정하나요?

| 문서 | 설정 위치 | 주요 대상 |
| --- | --- | --- |
| [Planet Asset과 비주얼 설정](?lang=ko&doc=planet-visual-settings) | Planet Asset Editor, Surface Preset | 행성 생성 계약, Completion, Padding, Section, Level Pair, Preview와 Build |
| [Proxy Bake 설정](?lang=ko&doc=proxy-bake-settings) | PlanetX Proxy Bake Editor | 대상 Asset, Runtime Role, Source Scope, 품질, 출력 Partition, 실행 메모리 |
| [런타임 Actor와 Component 설정](?lang=ko&doc=runtime-component-settings) | Actor와 Component Details | Planet, Coordinate, Movement, Viewpoint, Travel Receiver, Transition Endpoint |
| [Proxy·Morph·Preview 설정](?lang=ko&doc=proxy-transition-settings) | Planet Proxy, Transition Morph, Runtime Preview | 표시 계층, Surface Correction, Morph 렌더링, Runtime Budget Override |
| [환경 설정](?lang=ko&doc=environment-settings) | Planet Asset Environment, Environment Manager | 대기, 구름, 태양, Post Process, Space Background, Level Binding |
| [프로젝트와 성능 설정](?lang=ko&doc=project-settings) | Project Settings > Plugins | Runtime Budget 정책과 Lens Flare 품질 |

## 설정과 생성 데이터 구분

PlanetX의 reflected 구조체에는 사용자가 선택하는 설정뿐 아니라 Bake 결과, Runtime Capture, 쿼리 입력과 진단 데이터도 포함됩니다.

- **사용자 설정**은 이 카테고리에서 기본값, 단위, 효과를 설명합니다.
- **조건부 설정**은 선행 토글이나 Mode가 활성화될 때만 사용됩니다. 표의 조건을 함께 확인하세요.
- **생성 데이터**는 Proxy Bake 또는 Visual Build가 작성합니다. Details에 표시되더라도 수동 편집하지 않는 것이 원칙입니다.
- **요청·결과 구조체**는 함수 호출마다 전달되는 값이며 저장형 프로젝트 설정이 아닙니다. 해당 필드는 [공개 API 레퍼런스](?lang=ko&doc=api-overview)에서 설명합니다.

## 기본값을 변경하기 전 확인할 점

1. Planet ID, Radius, Coordinate Convention은 Planet Asset 생성 시 확정되는 계약입니다. 기존 Asset에서 직접 바꾸는 설정이 아닙니다.
2. Proxy Bake Quality와 Runtime Budget은 서로 독립적입니다. 품질을 바꾸면 생성 결과가 달라질 수 있지만 Runtime Budget 변경은 이미 Bake된 Asset을 다시 만들지 않습니다.
3. Override 토글이 꺼져 있으면 Component는 Project Settings 또는 Planet Asset의 값을 사용합니다.
4. Proxy Bake, Section 배치, Visual 설정을 바꾼 뒤에는 표시되는 Stale 상태를 확인하고 필요한 Bake 또는 Apply & Build를 다시 실행하세요.
5. 최종 패키징 전에는 Planet Asset의 Full Validate와 현재 World의 Validate를 모두 실행하세요.

## 공개 코드 기준

이 레퍼런스는 PlanetX 1.0에 포함된 다음 공개 헤더를 기준으로 작성되었습니다.

```text
Source/PlanetX/Public/PlanetX
```

Public 헤더에 존재한다는 이유만으로 모든 데이터 구조체가 일반 사용자 설정이 되는 것은 아닙니다. 이 문서는 Editor에서 조정 가능한 값, Project Config 값, 공개 작업 옵션을 설정 범위로 다루고, 파이프라인이 생성하는 payload와 capture는 별도로 표시합니다.
