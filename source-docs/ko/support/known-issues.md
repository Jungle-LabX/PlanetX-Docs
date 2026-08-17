# 알려진 문제

현재 LabX가 인지한 PlanetX 1.0 Mercury의 Known Issues입니다. 아래 항목은 재현 및 패치 작업이 진행 중이며, 수정 사항의 Release 반영이 검증되면 이 페이지를 갱신합니다.

## 현재 Release 상태

> 아래 이슈는 모두 LabX가 인지하고 있습니다. **패치 진행 중**은 구현 또는 검증이 진행 중이라는 뜻이며, 현재 Fab에 공개된 Build에 수정이 포함되었다는 의미는 아닙니다.

- **대상 Release:** PlanetX 1.0 Mercury
- **마지막 갱신:** 2026년 8월 17일
- **문제 보고:** PlanetX와 Unreal Engine 버전, 정확한 재현 절차, Editor·PIE·패키지 Build 중 어디에서 발생하는지 포함해 주세요.

## 활성 이슈

### Coordinate Component Representation Domain 양방향 전환

- **상태:** 패치 진행 중
- **범위:** `UPlanetXCoordinateComponent` / Representation Domain
- **증상:** Actor를 Ground와 Orbit Representation Domain 사이에서 양방향으로 전환하는 워크플로가 일부 사례에서 일관되게 처리되지 않습니다.
- **현재 안내:** 각 Domain 변경을 명시적인 Handoff로 취급하고 양방향을 각각 검증하세요. Representation Domain 값만 변경하면 이전 Actor 상태가 자동으로 복원된다고 가정하지 마세요.

### Landscape Material 호환성

- **상태:** 패치 진행 중
- **범위:** Proxy Bake / Landscape Material
- **증상:** 복잡하거나 프로젝트 전용 경로를 사용하는 Material Graph의 경우 Bake된 Section Proxy에서 Landscape Material이 원본과 다르게 표현될 수 있습니다.
- **현재 안내:** 대표 Material Instance로 Bake 결과를 확인하세요. 출력이 다르면 호환성 패치 전까지 Proxy 전용 Material을 사용하거나 지원되지 않는 Graph 경로를 단순화하세요.

### Multi-island Padding 생성

- **상태:** 패치 진행 중
- **범위:** Proxy Bake / Boundary Reconstruction
- **증상:** 서로 떨어진 여러 Island를 포함한 Source에서 각 Boundary를 독립적으로 계산하지 못하면 자동 Padding이 생성되지 않을 수 있습니다.
- **현재 안내:** Bake 전에 각 Island Boundary를 확인하세요. 출력에 Padding이 필요하면 Source를 분리하거나 명시적인 간격을 적용하세요.

### Transition Resource Build에서 PCG Resource 누락

- **상태:** 패치 진행 중
- **범위:** Transition Resource Build / PCG
- **증상:** 생성된 Transition Resource에 PCG 기반 Resource 또는 Reference가 누락될 수 있습니다.
- **현재 안내:** Transition Resource를 Build할 때마다 PCG 출력과 Reference를 확인하고, 배포 전에 패키지 Build에서도 다시 검증하세요.

### Epic Scalability에서만 보이는 Section Proxy

- **상태:** 패치 진행 중
- **범위:** Section Proxy Rendering / Scalability
- **증상:** Unreal Engine Scalability가 **Epic**일 때만 Section Proxy가 보이고 낮은 Preset에서는 사라질 수 있습니다.
- **현재 안내:** 현재 Proxy 결과를 검토할 때는 Epic Scalability를 사용하고, 배포 전에 프로젝트의 Scalability Override를 검증하세요.

### Chrome 창이 여러 개일 때 Monitor 실패

- **상태:** 패치 진행 중
- **범위:** Monitor / Chrome Session 탐색
- **증상:** Chrome 창이 두 개 이상 열려 있으면 Monitor 초기화가 실패할 수 있습니다.
- **현재 안내:** Monitor를 시작할 때 Chrome 창을 하나만 유지하세요. 이미 탐색에 실패했다면 중복 창을 닫고 Monitor Session을 다시 시작하세요.

### 다중 선택에서 Coordinate Component Gizmo 누락

- **상태:** 패치 진행 중
- **범위:** Editor / Coordinate Component Gizmo
- **증상:** Coordinate Component가 있는 Actor를 여러 개 선택하면 Coordinate Component Gizmo가 보이지 않을 수 있습니다.
- **현재 안내:** Coordinate Component Gizmo가 필요할 때는 Actor를 하나씩 선택해 편집하세요.

### PCG·Landscape 콘텐츠의 Runtime Section Proxy 거리 Culling

- **상태:** 패치 진행 중
- **범위:** Runtime / Section Proxy / PCG 및 Landscape
- **증상:** Electric Dreams 기반 재현 환경에서 PCG와 Landscape로 생성된 Section Proxy가 Runtime의 일정 거리 밖에서 보이지 않습니다.
- **현재 안내:** Editor에서 보이는 것만으로 Runtime 가시성을 판단하지 마세요. PIE와 패키지 Build에서 Cull Distance, HLOD, World Partition, Spatial Loading 동작을 확인하세요. 아직 모든 프로젝트에 적용할 수 있는 우회 방법은 검증되지 않았습니다.

### PlanetX가 Runtime Visibility를 변경함

- **상태:** 패치 진행 중
- **범위:** Runtime / Actor 및 Component Visibility
- **증상:** Editor Preview와 Authoring에만 적용되어야 하는 Visibility 변경이 Runtime에도 적용될 수 있습니다.
- **현재 안내:** PlanetX 상태 갱신 이후에도 수동 지정한 Runtime Visibility가 유지된다고 가정하지 마세요. 해당 동작이 Editor로 제한되는 패치 전까지 Transition 이후 대상 Actor 상태를 다시 검증하세요.

### PlanetX Mode의 Visibility Filtering 강제 및 UE Native Gizmo 제한

- **상태:** 패치 진행 중
- **범위:** Editor / PlanetX Mode
- **증상:** PlanetX Mode가 Visibility Filtering을 강제하고 Unreal Engine Native Transform Gizmo 사용을 제한할 수 있습니다.
- **현재 안내:** 프로젝트에서 관리하는 Visibility Filtering 또는 UE Native Gizmo가 필요하면 PlanetX Mode에서 나가 작업하세요. 후속 패치에서 Filter 강제를 제거하고 Native Gizmo를 사용할 수 있도록 수정할 예정입니다.

## 새 문제를 보고하기 전에

1. [설치와 설정 문제](/docs/ko/setup-configuration), [Proxy Bake 문제](/docs/ko/proxy-bake-troubleshooting), [Runtime과 Travel 문제](/docs/ko/runtime-travel-troubleshooting), [FAQ](/faq)를 확인합니다.
2. PlanetX와 Unreal Engine 버전을 기록합니다.
3. 정확한 재현 절차와 Editor, PIE, 패키지 Build 중 어디에서 발생하는지 포함합니다.
4. 안전하게 공유할 수 있는 관련 로그, 진단 결과, 최소 재현 프로젝트 상태를 포함합니다.
