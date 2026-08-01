# PlanetX 개요

PlanetX는 기존 Unreal Engine Level을 곡면 행성 표현으로 변환하고 Ground와 Orbit 표현 사이의 전환을 제공하는 플러그인입니다.

PlanetX는 기존 Unreal Engine Level을 곡면 행성 표현으로 변환하고 Ground와 Orbit 표현 사이의 전환을 제공하는 플러그인입니다.

## 해결하는 문제

- 기존 Landscape와 Static Mesh를 행성 표면으로 재사용
- 우주용 Proxy 생성
- Ground/Orbit 좌표와 표시 전환
- Same World 및 서로 다른 Level 간 이동
- World Partition 대형 Bake

```mermaid
flowchart LR
    A["기존 Level"] --> B["Planet Asset"]
    B --> C["Refresh"]
    C --> D["Review / Plan"]
    D --> E["Bake"]
    E --> F["Section + Bake Data"]
    F --> G["Planet Actor"]
    G --> H["Ground ↔ Orbit"]
```

## 요구사항 요약

| 항목 | 현재 상태 |
|---|---|
| 의존 플러그인 | GeometryProcessing |
| Bake | Editor 전용 |
| 주요 Source | Static Mesh, Landscape, ISM/HISM, Foliage |
| World Partition | 지원 |
| Multiplayer | Travel과 replication은 게임에서 구현 |
| Engine/Platform | 현재 프로젝트에서 빌드·검증한 조합 사용 |
| Demo Map | 사용자용 번들 Demo 없음 |

바로 시작하려면 [첫 Planet Proxy 만들기](/docs/ko/getting-started)로 이동하십시오.
