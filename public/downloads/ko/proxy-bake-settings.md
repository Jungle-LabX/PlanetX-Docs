# Proxy Bake 설정

Basic/Advanced 전환 상태, Bake Quality, 요청한 Source Representation은 Editor 사용자 설정에 저장됩니다.

## 1 Target Planet Asset

| 설정 | 설명 |
| --- | --- |
| `Planet Asset` | 생성될 Section과 Bake 링크를 소유하는 Asset입니다. 행성 반지름, 출력 ID, Projection과 최종 `ProxyBakeData` 연결의 기준입니다. |

Planet Asset이나 Source World가 바뀌면 기존 Scan Plan은 stale 상태가 됩니다. 새 대상에 대해 다시 **Scan Sources**를 실행하세요.

## 2 Runtime Role

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `Presentation` | `Same World` | `Same World`는 Planet과 Ground가 같은 World Package에 있고 표시만 전환합니다. `External Level`은 코드의 `LevelHandoff`이며 별도 Ground World와 시각 전용 Runtime Preview World를 사용합니다. |
| `Ground World` | 현재 Source World | Scan/Bake 대상 World에서 자동 결정되는 읽기 전용 값입니다. |
| `Planet World` | None | External Level에서만 표시됩니다. Ground로부터 돌아올 Planet Actor가 있는 Orbit World를 지정합니다. Ground World와 다른 저장된 World여야 합니다. |

Level Handoff의 backend 계약 기본값은 `OpenLevel`입니다. PlanetX는 상태를 capture/resume하지만 실제 Open Level, Pawn 생성, Possess 흐름은 게임이 수행합니다.

## 3 Source Scope

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `Selected Actors` |  | 현재 Outliner/Viewport에서 선택한 Actor만 검색합니다. 의도적인 부분 Bake에 적합합니다. |
| `Current Level` | 선택됨 | 현재 Persistent Level 소유 Actor만 검색하고 Streaming Level은 제외합니다. |
| `Loaded Levels` |  | 현재 Level, 로드된 Streaming Level과 Level Instance를 함께 검색합니다. |
| `Reviewed Set` |  | 현재 Plan에서 명시적으로 검토한 stable source membership을 재사용합니다. 먼저 다른 Scope로 Scan을 완료해야 합니다. |
| `Source Representation: Prefer HLOD` | 선택됨 | 유효성이 확인된 World Partition HLOD를 우선 사용하고 계약상 필요하면 원본 Actor로 fallback합니다. |
| `Source Representation: Original Actors` |  | 원본 Actor/Component만 사용합니다. HLOD 결과 비교나 fidelity 진단에 유용합니다. |
| `Include all tags` | 비어 있음 | 쉼표로 구분한 모든 Actor Tag를 가진 Source만 포함합니다. 비어 있으면 포함 필터를 적용하지 않습니다. |
| `Exclude any tag` | 비어 있음 | 나열한 Tag 중 하나라도 가진 Source를 제외합니다. |

Selected Actors, Reviewed Set 또는 Tag Filter처럼 정확한 membership이 필요한 계약에서는 `Prefer HLOD`를 요청해도 effective 정책이 Original Actors로 바뀔 수 있습니다. UI의 Source Representation summary에서 requested/effective 결과를 확인하세요.

## Source Review

| 항목 | 설명 |
| --- | --- |
| `Use` | Source를 현재 Bake에 포함하거나 제외합니다. |
| `Role: Auto` | Scan 분류 결과를 사용합니다. |
| `ProxyGeometry` | Static Mesh 등 일반 기하를 Proxy 메시로 만듭니다. |
| `LandscapeProxy` | Landscape 전용 capture와 material 경로를 사용합니다. |
| `InstanceBatch` | ISM/HISM/Foliage 반복 인스턴스를 batch output으로 처리합니다. |
| `Discard` | 사용자가 의도적으로 출력에서 제외합니다. |
| `ManualReview` | 자동으로 안전성을 확정하지 못했습니다. 이유를 확인하고 수정하거나 제외해야 합니다. |
| `Unsupported` | 현재 파이프라인이 안전한 결과를 만들 수 없습니다. 활성 상태로 남으면 Bake가 차단됩니다. |
| Group Scope | Actor, Folder, Data Layer, Level/Level Instance 단위로 선택 변경을 적용합니다. |

`Use`나 `Role`을 변경한 뒤에는 **Apply Source Changes**로 Plan에 반영하세요. WPO/displacement, private material dependency, unsupported deformation 같은 안전성 경고는 단순 경고가 아니라 명시적인 제외 또는 수정이 필요한 차단 조건일 수 있습니다.

## Bake Quality

Quality는 생성 결과에 기록되는 immutable authoring preset입니다.

| Preset | Static Mesh triangle budget | Projection scale / max segments | Landscape spacing / resolution |
| --- | ---: | ---: | ---: |
| Low | coarsest LOD의 1배 | 4.0 / 8 | 800 cm / 17–129 |
| Medium | coarsest LOD의 2배 | 2.0 / 12 | 600 cm / 25–193 |
| High (Recommended) | coarsest LOD의 4배 | 1.0 / 16 | 400 cm / 33–257 |

High도 무제한 원본 LOD를 뜻하지 않습니다. 가장 거친 유효 LOD의 triangle count에 배수를 적용한 범위에서 가장 정밀한 LOD를 선택해 기하 증가를 제한합니다.

## Advanced Projection과 Output Plan

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `Partition X`, `Partition Y` | 자동 Plan 값, 최소 1 cm | output partition 크기입니다. World Partition Auto-size가 켜져 있으면 직접 편집할 수 없습니다. |
| `Planet Radius` | Target Asset 값, 읽기 전용 | AEQD Projection, 곡률 분류와 subdivision에 사용하는 cm 반지름입니다. |
| `Source Grid` | false | Low proxy grid 대신 Source Landscape의 vertex resolution을 사용합니다. 출력 크기와 처리량이 크게 늘 수 있습니다. |
| `Surface Datum World Z: Auto` | 켜짐 | 참여 Source Bounds의 최소 World Z를 altitude 0과 Ground Sync 기준으로 사용합니다. |
| `Surface Datum World Z` | Plan 값, cm | Auto를 끈 경우 altitude 0으로 사용할 World-space Z입니다. 바꾸면 Plan을 다시 계산해야 합니다. |
| `Auto-size World Partition Output` | WP에서 true | Source bounds와 work density로 PlanetX output shard 크기를 계산합니다. World Partition cell을 1:1 복제하지 않습니다. |
| `Recalculate` |  | 최신 Scan 결과로 자동 grid를 다시 계산합니다. |

Output path, Target Section, Bake ID, Source/Partition/Geometry summary는 계산 결과입니다. 출력 대상이 기존 Asset과 충돌하면 Editor가 명시적인 overwrite/rebuild 확인을 요구합니다.

## Advanced Execution Budget

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `Auto Memory Budget` | true | 현재 사용 가능한 physical memory에서 안전한 RAM budget을 계산합니다. 일반 작업에 권장합니다. |
| `Safe` | 선택됨 | Proxy Bake가 사용할 수 없는 physical memory 4 GiB를 남깁니다. |
| `High Utilization` |  | 1 GiB만 남깁니다. 전용 Bake 작업에서 명시적으로 사용하세요. Commit/finalization guard는 유지됩니다. |
| `Manual GiB` | Auto일 때 비활성, 0.5–1024 | Auto를 끈 경우의 전체 수동 memory budget입니다. |
| `Workers` | 0, 0–64 | geometry worker 상한입니다. 0은 memory governor가 concurrency를 선택합니다. |
| `Queued` | 8, 1–128 | 동시에 대기할 수 있는 bounded work packet 상한입니다. |
| `GT Finalize` | 4, 1–32 | Game Thread publication/finalization backlog 상한입니다. |
| `Worker Geometry` | true | UObject read와 publication은 Game Thread에 남겨 두고 value-only geometry 계산을 worker task에서 수행합니다. |

더 높은 값이 항상 빠른 것은 아닙니다. Scan 뒤 표시되는 top contributor와 remediation을 확인하고, 메모리 부족 시 Worker/Queued/GT Finalize보다 먼저 Auto Memory Budget과 Partition Plan을 점검하세요.

## 공개 고급 옵션: `FPlanetXProxyBakePartitionDesc`

이 구조체는 Transition Morph나 공개 C++ 경로의 projection 계약입니다. 일반 Proxy Bake UI에서는 Target Asset과 Plan으로부터 생성됩니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PartitionOrigin` | (0,0,0) | 평면 partition frame의 원점입니다. |
| `PartitionEast` / `PartitionNorth` / `PartitionUp` | Forward / Right / Up | 서로 직교하는 partition frame 축입니다. |
| `PlanetRadius` | 100,000, 최소 1 | 곡면 projection의 행성 반지름입니다. |
| `PartitionRadius` | 10,000, 최소 1 | partition의 유효 반경입니다. |
| `SphereLatitudeSegments` / `SphereLongitudeSegments` | 250 / 250, 최소 3 | 고정 구 표면 표본 해상도입니다. |

## 공개 고급 옵션: `FPlanetXProxyBakeOptions`

Editor의 품질 preset과 source classification이 일반 사용자 경로에서 이 값을 해결합니다. 직접 API를 구성하는 도구만 명시적으로 설정하세요.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `LODIndex` | 0, 최소 0 | 명시적인 Static Mesh source LOD입니다. Editor quality selection과 혼용하지 마세요. |
| `bSkipHiddenComponents` | true | 숨겨진 Component를 제외합니다. |
| `bWarnOnNonUniformScale` | true | 비균일 Scale Source를 진단합니다. |
| `bSkipNoBakeTaggedActors` | true | PlanetX NoBake Tag가 있는 Actor를 제외합니다. |
| `bRequireBakeSourceTagForSingleLevel` | false | Single Level bake에서도 BakeSource Tag가 있는 Actor만 허용합니다. |
| `bFailOnAeqdRangeExceeded` | true | AEQD projection 안전 범위를 넘으면 실패합니다. 품질 손상을 숨기지 않으므로 기본값 유지가 권장됩니다. |
| `bClipTrianglesToPartitionRadius` | false | partition 반경에서 triangle을 자릅니다. 기본 pipeline의 canonical ownership과 의도적으로 다른 출력이 필요할 때만 사용합니다. |
| `LandscapeProxyMaterial` | None | Source Landscape Material을 Static Mesh에 사용할 수 없을 때의 fallback Material입니다. |
| `SubdivisionWorldStep` | 275 cm, 0 이상 | 기본 world-space subdivision 간격입니다. |
| `AdaptiveSubdivisionMaxProjectedEdgeDeviationCm` | 5 cm, 0 이상 | 곡면 projection edge 오차 허용치입니다. |
| `MaxSubdivisionDivisionsPerTriangle` | 24, 최소 1 | 한 Source triangle의 subdivision 상한입니다. |
| `MaxOutputTrianglesPerBakeJob` | 5,000,000, 최소 1 | 한 Bake job의 최종 triangle 안전 상한입니다. |

`FPlanetXProjectionResult`, material remap, heightfield, mesh page, partition output과 instance batch 구조체는 결과 payload입니다. 속성이 reflected되어 있어도 사용자 설정으로 편집하지 마세요.
