# Version 1.0 Mercury

## 릴리스 계약

| 항목 | 값 |
| --- | --- |
| 릴리스 이름 | 1.0 Mercury |
| Version | 1 |
| VersionName | 1.0 |
| Engine baseline | Unreal Engine 5.8 프로젝트 |
| Runtime module | PlanetX |
| Editor module | PlanetXEditor |
| SupportedTargetPlatforms | Win64 |
| Required plugins | GeometryProcessing, PCG |
| CanContainContent | true |
| Beta / Experimental | false / false |

## 포함 기능

- Planet Asset, Section, Level Pair 제작
- PlanetX Mode와 전용 Planet Asset Editor
- Proxy Bake와 외부 진행 Monitor
- 좌표, 표면 Query, 이동, 중력
- Same World와 Level Handoff travel
- Runtime Preview와 transition presentation
- Completion, Padding, generated material
- Atmosphere, cloud, sun, post process, space background
- Validation, runtime stats와 diagnostics

## 배포 참고

Plugin package에 로컬에서 직접 여는 이 `Docs` 정적 사이트가 포함됩니다. 릴리스별 자동 changelog나 과거 호환성 표는 현재 소스에 근거가 없으므로 이 문서에서 추정하지 않습니다.

## 1.0.x 유지보수 트랙 (미출시)

> 이 내용은 계획된 유지보수 Release 범위이며, 패치가 이미 공개되었다는 뜻이 아닙니다. 각 변경은 아래 Release Gate에서 코드, Editor/PIE 동작, 패키지 Win64 동작, 기존 프로젝트 업그레이드 동작을 모두 통과한 뒤에만 공개 릴리스 노트로 이동합니다.

### Batch A — Release 안전 진단과 복구

- Chrome 확인 응답을 받지 못해도 외부 Monitor 시작이 실패로 확정되지 않도록 하고, 브라우저 탐색과 별개로 수동 URL/재시도 복구 경로를 유지합니다.
- Transition Resource Build 전에 누락·stale·미저장 PCG 출력을 식별 가능한 Preflight 결과로 제공합니다. 이 Batch는 PCG 자동 생성이나 저장 orchestration을 약속하지 않습니다.
- Runtime Proxy가 보이지 않는 원인을 authored instance culling, Runtime Budget/Scalability, residency/loading, generated resource 누락으로 구분해 보고합니다.
- 복잡한 Landscape Material 경로와 multi-island boundary/padding 입력을 publish 전에 감지하고, 가능하면 영향받은 Actor, Component 또는 generated resource 경로를 표시합니다.

### Batch B — Editor Visibility와 Gizmo 사용성

- PlanetX Mode의 강제 Visibility 적용을 저장되는 editor-only Visibility Filter로 교체합니다.
- 일반 Actor와 다중 선택에서 UE Native Transform Gizmo를 다시 사용할 수 있게 하고, PlanetX Coordinate Gizmo는 지원되는 단일 Coordinate Component 워크플로에만 유지합니다.
- Editor Preview 상태와 Runtime Visibility 상태를 분리합니다.

### Batch C — Runtime Presentation 호환성

- migration 안전성을 위해 현 1.0 동작을 기본값으로 보존하면서 opt-in Runtime Presentation/Visibility Policy를 도입합니다.
- Ground와 Orbit 모두에서 보여야 하는 콘텐츠에는 명시적인 shared-presentation 옵션을 제공합니다. 이는 Representation Domain과 분리되며 coordinate/load 의미를 바꾸지 않아야 합니다.

### 1.0.x 유지보수 범위 이후로 미루는 항목

- 완전한 Representation Domain 양방향 상태 복원.
- 일반화된 multi-island padding reconstruction.
- 임의 Landscape Material Graph의 완전한 fidelity 지원.
- PCG 자동 generate/save/cook orchestration.

### Release Gate와 Known Issue 종료 기준

후보 변경은 모두 다음의 해당 검증을 통과해야 수정 완료로 공지합니다.

1. 지원 기준인 Unreal Engine 5.8에서 PlanetX Editor와 Win64 target을 빌드하고, 새 warning이 error로 처리되는 상태가 없어야 합니다.
2. 새 프로젝트와 기존 1.0 프로젝트에서 open, save, Proxy Bake, transition, PIE, 패키지 Win64 smoke test를 확인합니다.
3. 영향받은 Scalability preset과 문서화한 복구 경로에서 이슈별 재현을 다시 검증합니다.
4. 선택한 opt-in policy 이외의 기존 Runtime Visibility, Representation Domain, generated resource 동작이 변하지 않았음을 확인합니다.
5. 출시 버전과 검증 근거를 기록한 뒤에만 Known Issues의 해당 항목을 **Resolved**로 옮깁니다. 진단 추가나 임시 workaround만으로는 이슈를 닫지 않습니다.
