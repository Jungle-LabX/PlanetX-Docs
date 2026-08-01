# Quick Start: 첫 Planet Proxy 만들기

[이전: 개요](00_Overview.md) · [문서 홈](../../PlanetX_User_Guide_KO.md) · [다음: Editor Workflow](02_Editor_Workflow.md)

아래 순서로 기존 Level에서 첫 Proxy를 만듭니다.

| 단계 | Action | Expected Result | Common Failure | Screenshot/확인 위치 |
|---:|---|---|---|---|
| 1 | `Edit > Plugins`에서 PlanetX 활성화 후 재시작 | `Tools > PlanetX` 메뉴 표시 | 오래된/중복 plugin binary | Plugins 창 |
| 2 | Bake할 Ground Map 열기 | 현재 World가 Source World와 일치 | Untitled 또는 Orbit Map을 엶 | Level viewport |
| 3 | `Add > Miscellaneous > PlanetX Planet Asset` 생성 | 전용 Asset Editor가 열림 | 중복 Planet ID, 잘못된 Radius | Create Planet Asset |
| 4 | `Tools > PlanetX > Proxy Bake Editor` 열기 | Bake 창 표시 | 최신 Editor module 미로드 | Proxy Bake 상단 |
| 5 | Planet Asset, Runtime Role, Source Scope 선택 | 대상 World와 Source 범위 확정 | Selected Actors가 비어 있음 | Setup 영역 |
| 6 | `Refresh` 실행 | Source Review와 Output Plan 생성 | hidden/NoBake/미지원 Source | [현재 화면](../../Images/ProxyBake_Refresh_Review.png) |
| 7 | `ManualReview`, `Unsupported`, Reason 확인 | 사용할 Source가 유효 Role로 분류 | WPO/displacement, source LOD 없음 | Source Review |
| 8 | Target Section Name과 `NEW OUTPUT` 확인 | 출력 경로와 파티션 확정 | TARGET CONFLICT, SCAN OUT OF DATE | Output Plan |
| 9 | `BAKE IN EDITOR` 실행 | Bake Data와 Section 자동 등록 | 미저장 Asset, 메모리/저장 실패 | ACTIVE BAKE |
| 10 | `PlanetX Planet Actor` 배치 후 Planet Asset 지정 | Proxy를 표시할 runtime 인스턴스 등록 | Planet Binding 충돌 | Actor Details |
| 11 | Sections/Diagnostics 확인 후 PIE | Proxy와 Level Pair가 유효 | Bake/Preview link 누락 | Planet Asset Editor |

> 예전 `Scan Sources` 버튼은 현재 `Refresh`입니다. Bake Data는 성공 시 Planet Asset에 자동 연결됩니다.

## 완료 조건

- Planet Asset에 Section이 존재합니다.
- Section에 Bake Data가 연결됩니다.
- External Level이면 Runtime Preview World가 연결됩니다.
- Planet Actor가 같은 Planet Asset을 참조합니다.
- Diagnostics에 차단 Error가 없습니다.

C++ 프로젝트는 게임 module `Build.cs`에 `"PlanetX"`를 추가합니다. `PlanetXEditor`는 runtime module에 추가하지 않습니다.

