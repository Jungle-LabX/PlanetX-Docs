# Performance와 Optimization

[이전: Large World](06_Large_World_and_World_Partition.md) · [문서 홈](../../PlanetX_User_Guide_KO.md) · [다음: Reference](08_Reference.md)

## 권장 시작점

| 용도 | 설정 |
|---|---|
| Preview | Auto Partition, Source Grid Off, In Editor, Auto + Safe |
| 일반 제작 | Auto Partition, Auto + Safe |
| 고품질 Landscape | Source Grid On 비교, External 권장 |
| 대형 WP | Auto Partition, External, Workers 0 |
| 전용 Bake 머신 | 측정 후 High Utilization 선택 |

`High Utilization`은 품질 설정이 아니라 RAM reserve를 4 GiB에서 1 GiB로 줄이는 실행 설정입니다.

## 영향이 큰 옵션

| 변경 | 영향 |
|---|---|
| Source Grid On | triangle, RAM, disk 증가 |
| 작은 Partition | packet은 작아지고 Asset/seam/finalize 증가 |
| 큰 Partition | Asset은 줄고 peak RAM/loading 단위 증가 |
| Workers/Queue 증가 | 처리량과 동시 peak RAM 증가 가능 |
| 불필요한 Instance 포함 | payload와 Runtime Preview 비용 증가 |

## 최적화 순서

1. 불필요 Source와 ManualReview를 정리합니다.
2. Auto Partition + Safe로 기준 Bake를 만듭니다.
3. largest packet, peak RAM, output bytes를 확인합니다.
4. 설정을 한 번에 하나만 바꿉니다.
5. Runtime Preview, MeshPage, InstanceBatch와 transition을 profile합니다.

현재 Basic UI에는 임의 비율의 단일 Simplify slider가 없습니다. 내부 값을 추측해 고정하지 말고 노출된 Plan과 설정만 사용하십시오.

