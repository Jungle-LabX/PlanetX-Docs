# Planet Asset과 식별자

`UPlanetXPlanetAsset`은 행성의 물리·좌표·Section·Level Pair·Proxy Bake·생성 비주얼·환경 제작 상태를 연결하는 Primary Data Asset입니다.

## 세 가지 핵심 ID

| ID | 역할 | 선택 규칙 |
| --- | --- | --- |
| Planet ID | 행성 계약의 프로젝트 전역 식별자 | Planet Asset 사이에서 고유 |
| Planet Binding ID | 동일 Planet ID를 가진 런타임 인스턴스 구분 | 여러 Planet Actor가 있을 때 명시 |
| Section ID | 행성 표면의 제작·조회 구역 | Asset 안에서 비어 있지 않고 고유 |

Level Pair ID는 Section과 Orbit/Ground/Runtime Preview World 묶음을 찾는 키입니다. Journey ID와 Capture ID는 Travel 한 번의 수명 주기를 식별합니다.

## Asset이 소유하는 계약

Planet Asset에는 Radius, Coordinate Convention, Sections, Level Pairs, Completion/Padding 설정, Environment 설정, Surface Preset, Proxy Bake 링크와 revision 상태가 들어 있습니다. 생성된 Payload나 Material은 Asset이 직접 제작하지 않고 Editor workflow가 게시하고 링크합니다.

`IsProxyBakeStale`, `IsVisualBuildStale`, `IsVisualPreviewStale`은 현재 authoring revision과 마지막 성공 결과를 비교합니다. stale 결과는 자동 삭제 신호가 아니라 재검증·재생성이 필요하다는 신호입니다.

## 여러 World와 여러 인스턴스

같은 Planet Asset이 Orbit World와 Ground World에 사용될 수 있습니다. 동일 Planet ID의 Planet Actor가 한 World에 여러 개면 자동 선택은 모호해질 수 있으므로 API의 AdvancedDisplay에 있는 Planet Binding ID를 전달하세요.

## 변경 원칙

ID 변경은 저장 좌표, Level Pair, Bake 링크, Travel route에 영향을 줍니다. 표시 이름 변경과 달리 migration으로 취급하고 Full Validate와 재 Bake를 수행하세요.
