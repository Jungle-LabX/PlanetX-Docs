# 알려진 문제

현재 LabX가 인지한 PlanetX 1.0 Mercury의 Known Issues입니다. 아래 유지보수 Batch는 1.0.x에서 안전하게 Release할 수 있는 범위와 이후 호환성 프로젝트로 남겨야 할 범위를 구분합니다.

## 현재 Release 상태

> PlanetX 1.0 Mercury가 현재 Fab에 공개된 Build입니다. **예정됨**과 **검증 중**은 이 Build에서 수정됐다는 뜻이 아닙니다. 각 이슈는 출시 버전과 이슈별 검증 근거가 기록된 뒤에만 **Resolved**로 이동합니다.

- **대상 Release:** PlanetX 1.0 Mercury
- **유지보수 범위:** [1.0.x 유지보수 트랙](/release-notes)
- **마지막 갱신:** 2026년 8월 23일
- **문제 보고:** PlanetX와 Unreal Engine 버전, 정확한 재현 절차, Editor·PIE·패키지 Build 중 어디에서 발생하는지 포함해 주세요.

## 상태와 종료 정책

- **예정됨:** 향후 Batch에 포함되지만 아직 Release 검증을 통과하지 않았습니다.
- **1.0.x 완화:** 진단 또는 복구를 개선하지만, 원래의 기능 제한은 열린 상태로 남습니다.
- **Resolved:** 지원 기준 Unreal Engine 5.8 build, 새 프로젝트와 기존 1.0 업그레이드, Editor/PIE, 패키지 Win64, 이슈별 재현을 모두 통과한 경우에만 사용합니다.

이번 계획 문서 갱신만으로 종료되는 이슈는 없습니다.

## 활성 이슈

### Coordinate Component Representation Domain 양방향 전환

- **상태:** 1.0.x 유지보수 범위 이후로 연기
- **범위:** `UPlanetXCoordinateComponent` / Representation Domain
- **증상:** Actor를 Ground와 Orbit Representation Domain 사이에서 양방향으로 전환하는 워크플로가 일부 사례에서 일관되게 처리되지 않습니다.
- **1.0.x 방향:** Representation Domain은 coordinate/load 계약으로 유지합니다. 별도의 shared-presentation 옵션을 양방향 상태 복원으로 취급하지 않습니다.
- **현재 안내:** 각 Domain 변경을 명시적인 Handoff로 취급하고 양방향을 각각 검증하세요. Representation Domain 값만 변경하면 이전 Actor 상태가 자동으로 복원된다고 가정하지 마세요.
- **종료 근거:** 수동 복원 없이 Ground → Orbit → Ground와 Orbit → Ground → Orbit에서 문서화된 transform, loading, presentation 계약이 복원되어야 합니다.

### Landscape Material 호환성

- **상태:** 1.0.x Batch A에서 완화, 완전 fidelity는 연기
- **범위:** Proxy Bake / Landscape Material
- **증상:** 복잡하거나 프로젝트 전용 경로를 사용하는 Material Graph의 경우 Bake된 Section Proxy에서 Landscape Material이 원본과 다르게 표현될 수 있습니다.
- **1.0.x 방향:** publish 전에 지원되지 않는 graph 경로를 감지·표시하되, 임의 Material Graph fidelity를 약속하지 않습니다.
- **현재 안내:** 대표 Material Instance로 Bake 결과를 확인하세요. 출력이 다르면 Proxy 전용 Material을 사용하거나 지원되지 않는 Graph 경로를 단순화하세요.
- **종료 근거:** 지원하는 complex graph 집합을 문서화하고 Editor, PIE, 패키지 Win64에서 source와 baked output이 일치할 때까지 이슈를 유지합니다.

### Multi-island Padding 생성

- **상태:** 1.0.x Batch A에서 완화, 일반 reconstruction은 연기
- **범위:** Proxy Bake / Boundary Reconstruction
- **증상:** 서로 떨어진 여러 Island를 포함한 Source에서 각 Boundary를 독립적으로 계산하지 못하면 자동 Padding이 생성되지 않을 수 있습니다.
- **1.0.x 방향:** publish 전에 boundary topology를 검증하고 영향받은 source를 표시합니다. 일반 multi-island reconstruction을 추가하는 Batch는 아닙니다.
- **현재 안내:** Bake 전에 각 Island Boundary를 확인하세요. 출력에 Padding이 필요하면 Source를 분리하거나 명시적인 간격을 적용하세요.
- **종료 근거:** 수동 source 분리 없이 서로 떨어진 여러 Island와 각 독립 Boundary에서 검증된 Padding이 생성되어야 합니다.

### Transition Resource Build에서 PCG Resource 누락

- **상태:** 1.0.x Batch A에서 완화, PCG 자동 orchestration은 연기
- **범위:** Transition Resource Build / PCG
- **증상:** 생성된 Transition Resource에 PCG 기반 Resource 또는 Reference가 누락될 수 있습니다.
- **1.0.x 방향:** 누락·stale·미저장 PCG 출력을 Preflight에서 식별하고 복구 경로를 제공합니다. PCG를 조용히 generate/save/cook하지는 않습니다.
- **현재 안내:** Transition Resource를 Build할 때마다 PCG 출력과 Reference를 확인하고, 배포 전에 패키지 Build에서도 다시 검증하세요.
- **종료 근거:** 선택한 PCG 계약이 end-to-end로 구현되고, 사용 가능한 출력과 사용할 수 없는 출력이 패키지 Build에서 문서대로 동작해야 합니다.

### Epic Scalability에서만 보이는 Section Proxy

- **상태:** 1.0.x Batch A에서 진단, 낮은 preset fallback은 연기
- **범위:** Section Proxy Rendering / Scalability
- **증상:** Unreal Engine Scalability가 **Epic**일 때만 Section Proxy가 보이고 낮은 Preset에서는 사라질 수 있습니다.
- **1.0.x 방향:** Runtime Budget/Scalability, authored instance culling, residency/loading, generated resource 중 어떤 이유로 보이지 않는지 보고합니다. 낮은 preset rendering fallback을 약속하지는 않습니다.
- **현재 안내:** 현재 Proxy 결과를 검토할 때는 Epic Scalability를 사용하고, 배포 전에 프로젝트의 Scalability Override를 검증하세요.
- **종료 근거:** 문서화된 fallback/progression 동작을 기준으로 High, Medium, Low를 PIE와 패키지 Win64에서 검증한 뒤에만 닫습니다.

### Chrome 창이 여러 개일 때 Monitor 실패

- **상태:** 1.0.x Batch A 예정
- **범위:** Monitor / browser acknowledgement
- **증상:** Chrome 창이 두 개 이상 열려 있으면 Monitor 초기화가 실패할 수 있습니다.
- **1.0.x 목표:** browser acknowledgement를 best-effort로 취급하고, Bake 결과를 잘못 실패로 보고하지 않으면서 수동 URL과 재시도 경로를 유지합니다.
- **현재 안내:** Monitor를 시작할 때 Chrome 창을 하나만 유지하세요. 이미 탐색에 실패했다면 중복 창을 닫고 Monitor Session을 다시 시작하세요.
- **종료 근거:** Chrome 없음, 하나, 여러 개 시나리오를 검증합니다. acknowledgement가 없어도 Monitor의 복구 action이 유지되고, 완료된 Bake가 그 이유만으로 실패로 보고되면 안 됩니다.

### 다중 선택에서 Coordinate Component Gizmo 누락

- **상태:** 1.0.x Batch B 예정
- **범위:** Editor / Coordinate Component Gizmo
- **증상:** Coordinate Component가 있는 Actor를 여러 개 선택하면 Coordinate Component Gizmo가 보이지 않을 수 있습니다.
- **1.0.x 목표:** 다중 선택에서 UE Native Transform Gizmo 접근을 복원합니다. PlanetX 전용 Coordinate Gizmo는 multi-edit 계약이 별도로 구현되지 않는 한 단일 Component 전용으로 유지합니다.
- **현재 안내:** Coordinate Component Gizmo가 필요할 때는 Actor를 하나씩 선택해 편집하세요.
- **종료 근거:** Editor 재시작 후 단일 Coordinate Actor, Coordinate 다중 선택, Coordinate가 섞인 선택을 모두 검증합니다.

### PCG·Landscape 콘텐츠의 Runtime Section Proxy 거리 Culling

- **상태:** 1.0.x Batch A에서 진단, Runtime rendering 수정은 열린 상태
- **범위:** Runtime / Section Proxy / PCG 및 Landscape
- **증상:** Electric Dreams 기반 재현 환경에서 PCG와 Landscape로 생성된 Section Proxy가 Runtime의 일정 거리 밖에서 보이지 않습니다.
- **1.0.x 방향:** authored instance culling, Runtime Budget/Scalability, residency/loading, generated resource 누락을 구분하는 진단을 추가합니다. 근본 rendering 수정에는 Electric Dreams 재현이 계속 필요합니다.
- **현재 안내:** Editor에서 보이는 것만으로 Runtime 가시성을 판단하지 마세요. PIE와 패키지 Build에서 Cull Distance, HLOD, World Partition, Spatial Loading 동작을 확인하세요.
- **종료 근거:** 문서화된 거리에서 PCG와 Landscape source를 포함한 Electric Dreams 시나리오가 PIE와 패키지 Win64에서 재현·통과해야 합니다.

### PlanetX가 Runtime Visibility를 변경함

- **상태:** 1.0.x Batch C 예정
- **범위:** Runtime / Actor 및 Component Visibility
- **증상:** Editor Preview와 Authoring에만 적용되어야 하는 Visibility 변경이 Runtime에도 적용될 수 있습니다.
- **1.0.x 목표:** 현 1.0 동작을 기본값으로 보존하고, editor-only filtering이 Runtime 상태를 바꾸지 않는 opt-in presentation/visibility policy를 추가합니다.
- **현재 안내:** policy가 출시되기 전까지 PlanetX 상태 갱신 이후에도 수동 지정한 Runtime Visibility가 유지된다고 가정하지 마세요.
- **종료 근거:** 기존 기본값 프로젝트와 opt-in 프로젝트를 Ground, Orbit, transition 상태의 PIE와 패키지 Win64에서 검증합니다. policy 범위 밖의 수동 Runtime Visibility는 바뀌면 안 됩니다.

### PlanetX Mode의 Visibility Filtering 강제 및 UE Native Gizmo 제한

- **상태:** 1.0.x Batch B 예정
- **범위:** Editor / PlanetX Mode
- **증상:** PlanetX Mode가 Visibility Filtering을 강제하고 Unreal Engine Native Transform Gizmo 사용을 제한할 수 있습니다.
- **1.0.x 목표:** 강제 Visibility를 저장되는 editor-only filter로 교체하고, PlanetX가 전용 단일 Coordinate 동작을 제공하지 않는 경우 Native Gizmo passthrough를 제공합니다.
- **현재 안내:** 프로젝트에서 관리하는 Visibility Filtering 또는 UE Native Gizmo가 필요하면 PlanetX Mode에서 나가 작업하세요.
- **종료 근거:** Editor 재시작 후 저장된 filter 복원, filter 변경으로 인한 Runtime Visibility 미변경, 지정한 fallback 사례의 UE Native Gizmo 접근을 확인합니다.

## 새 문제를 보고하기 전에

1. [설치와 설정 문제](/docs/ko/setup-configuration), [Proxy Bake 문제](/docs/ko/proxy-bake-troubleshooting), [Runtime과 Travel 문제](/docs/ko/runtime-travel-troubleshooting), [FAQ](/faq)를 확인합니다.
2. PlanetX와 Unreal Engine 버전을 기록합니다.
3. 정확한 재현 절차와 Editor, PIE, 패키지 Build 중 어디에서 발생하는지 포함합니다.
4. 안전하게 공유할 수 있는 관련 로그, 진단 결과, 최소 재현 프로젝트 상태를 포함합니다.
