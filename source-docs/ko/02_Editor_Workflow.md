# Editor Workflow

[이전: Quick Start](01_Getting_Started.md) · [문서 홈](../../PlanetX_User_Guide_KO.md) · [다음: Runtime Integration](03_Runtime_Integration.md)

## 기본 흐름

```text
Refresh → Source Review → Output Plan → Bake → Sections/Diagnostics
```

## Source Scope

| 범위 | 용도 |
|---|---|
| Selected Actors | 소수 Actor 테스트 |
| Current Level | 현재 Level 전체 |
| Loaded Levels | 로드된 Level 전체 |
| Reviewed Set | Review에서 확정한 Source 집합 |

선택, Tag, Level 또는 설정을 바꾸면 다시 `Refresh`하십시오.

`PlanetX.NoBake`와 `PlanetX.ProxyBakePreview` 태그는 Actor/Component를 제외합니다.

## Source 분류

| Role | 처리 |
|---|---|
| ProxyGeometry | 곡면 Proxy geometry |
| LandscapeProxy | Landscape 전용 처리 |
| InstanceBatch | ISM/HISM, Foliage, 반복·소형 rigid mesh |
| Discard | 사용자 제외, tiny 또는 world-scale helper |
| ManualReview | WPO/displacement 등 사용자 판단 필요 |
| Unsupported | 미지원 Component 또는 유효 payload/LOD 없음 |

일반 Static Mesh 중 최대 크기 80cm 이하는 자동 Tiny Discard입니다. ISM/HISM과 Foliage는 크기와 관계없이 InstanceBatch 후보입니다.

## 주요 설정

| 설정 | 설명 | 권장 시작 |
|---|---|---|
| Planet Radius | AEQD 곡률 기준, Planet Asset에서 변경 | 실제 행성 반지름 |
| Surface Datum World Z | altitude 0 기준 | Auto |
| Source Grid | Landscape 원본 vertex grid | 빠른 검토 Off |
| Partition X/Y | 출력 분할 크기 | Auto plan |
| Memory Budget | Bake RAM 한도 | Auto + Safe |
| Workers | geometry worker 수 | 0(자동) |

작은 partition은 loading 단위를 줄이지만 Asset, seam과 finalize 비용을 늘립니다.

## Bake 방식

- `BAKE IN EDITOR`: 빠른 반복과 중소 규모
- `BAKE IN EXTERNAL PROCESS`: 대형 WP와 높은 메모리 작업

External Bake 전에는 Map과 Asset을 저장해야 합니다. 작업 상태는 `ACTIVE BAKE`, 로그는 `Saved/Logs`와 `Saved/PlanetXProxyBake`에서 확인합니다.

## Output 상태

| 상태 | 대응 |
|---|---|
| NEW OUTPUT | 새 Bake |
| UP TO DATE | 그대로 사용 또는 Force Rebuild |
| REBAKE REQUIRED | SourceHash 변경, 다시 Bake |
| LEGACY HASH | 현재 contract로 갱신 |
| TARGET CONFLICT | 경로/identity 충돌 해결 |
| SCAN OUT OF DATE | Refresh |

## Section 관리

- 새 In Editor Bake의 `Target Section Name`은 생성 시 적용됩니다.
- 기존 Section은 `Rename`으로 Display Name만 변경합니다.
- 내부 Section ID는 Source World 경로 hash를 포함하며 변경되지 않습니다.
- `Delete Selected Section`은 Section과 Level Pair만 제거하고 생성 Asset 파일은 남깁니다.
- 한 Planet Asset에는 활성 Same World Level Pair를 최대 하나만 둘 수 있습니다.

## 보조 Editor

- `PlanetX Mode`: Planet/Compare/Level 보기, Placement, Runtime, Transition, Environment, Validate
- `Visual Editor`: Section Placement, Surface Correction, completion/padding Preview

Visual Editor 변경은 `Apply to Asset` 전까지 edit buffer에만 있습니다.

