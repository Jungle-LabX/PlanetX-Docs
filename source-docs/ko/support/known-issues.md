# 알려진 문제

이 페이지는 활성 제한 사항을 정리합니다. 예정된 1.0.1 업데이트는 게시된 릴리스 노트에서 명시하지 않는 한 아래 항목을 해결하지 않습니다.

## 현재 상태

- **Fab 공개 버전:** PlanetX 1.0 Mercury
- **다음 유지보수 업데이트:** 1.0.1
- **문제 신고:** [jungle.labx@gmail.com](mailto:jungle.labx@gmail.com)

예정된 1.0.1 업데이트는 Browser Monitor 실패 보고, Native Transform Gizmo fallback, opt-in Global Presentation을 처리할 예정입니다. 자세한 내용은 [릴리스 노트](/release-notes)를 확인하세요. 이 변경 사항은 현재 Fab 빌드에서 사용할 수 없습니다.

## 활성 이슈

### Representation Domain 양방향 전환

Actor를 Ground와 Orbit 사이에서 변경해도 이전 상태가 양방향으로 복원되지는 않습니다. **Presentation Scope: Global**은 authored visibility를 표현 상태 전반에서 유지할 뿐이며, coordinate, transform, loading, state를 변환하지 않습니다.

### Transition Resource Build와 PCG 출력

생성된 PCG 출력이 없거나 stale 또는 미저장 상태라면 Transition Resource에서 PCG Resource가 빠질 수 있습니다. PlanetX는 PCG 출력을 자동으로 generate, save, cook하지 않습니다. Build 전과 패키지 Build에서 generated resource를 확인하세요.

### 낮은 Scalability Preset의 Section Proxy

Section Proxy 가시성은 Scalability, Runtime Budget, authored cull distance, residency, generated resource 존재 여부에 영향을 받을 수 있습니다. 프로젝트의 목표 preset을 PIE와 패키지 Win64에서 검증해야 하며, 일반적인 낮은 preset fallback은 1.0.1 범위가 아닙니다.

### PCG·Landscape 콘텐츠의 Runtime 거리 Culling

Electric Dreams 재현 환경에서 PCG와 Landscape 기반 Section Proxy가 Runtime 거리에서 보이지 않을 수 있습니다. rendering 수정 전에는 authored culling, Runtime Budget, residency/loading, generated resource coverage 중 원인을 분리해야 합니다.

### PlanetX Mode Visibility Filtering

PlanetX Mode는 editor에서 presentation filtering을 계속 적용할 수 있습니다. 1.0.1의 Native Gizmo fallback에는 저장되는 사용자 제어 Visibility Filter가 포함되지 않습니다. 프로젝트가 소유하는 visibility filtering이 필요하면 PlanetX Mode를 종료하세요.

### Landscape Material 호환성 — 1.0.1 제외

복잡하거나 프로젝트 전용 경로를 사용하는 Landscape Material Graph는 Proxy Bake 후 원본과 다르게 표현될 수 있습니다. 임의 Graph의 완전 fidelity는 1.0.1 범위가 아니며, 필요한 경우 Proxy 전용 Material을 사용하고 결과를 검증하세요.

### Multi-island Padding — 1.0.1 제외

서로 분리된 Island의 일반적인 Padding reconstruction은 1.0.1 범위가 아닙니다. Island마다 독립 Padding이 필요하면 Source를 분리하거나 명시적인 간격을 적용하세요.

## 문제 보고 전 확인 사항

PlanetX와 Unreal Engine 버전, 정확한 재현 절차, Editor·PIE·패키지 Win64 중 발생 환경, 관련 로그와 진단 결과를 포함하세요. 안전하게 공유할 수 있는 최소 재현을 [jungle.labx@gmail.com](mailto:jungle.labx@gmail.com)으로 보내주세요.
