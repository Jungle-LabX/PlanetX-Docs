# Troubleshooting

[이전: Reference](08_Reference.md) · [문서 홈](../../PlanetX_User_Guide_KO.md) · [다음: Support](10_Support_and_Release_Notes.md)

| Symptom | Likely Cause / 확인 | Solution |
|---|---|---|
| `Scan Sources` 버튼이 없음 | 현재 이름이 변경됨 | 왼쪽 `Refresh` 사용 |
| Refresh 결과 0 sources | 빈 선택, hidden/NoBake, 미지원 Component | Current Level로 확인 후 Selected Actors로 격리 |
| Landscape 누락 | hidden/tag/WP actor load/LandscapeInfo 문제 | `LandscapeDiscovery` 로그와 failed WP load 확인 |
| Target Section Name 비활성 | target identity 미확정 | Planet Asset 선택 후 Refresh |
| External Bake 후 이름 미적용 | staged 이름은 In Editor 경로 전용 | 완료 후 Refresh하고 Rename |
| `TARGET CONFLICT` | 다른 identity가 output path 점유 | 기존 Asset/경로 확인 후 충돌 해결 |
| 메모리 과다 | Source Grid, 큰 packet, worker/queue 과다 | Auto + Safe, Workers 0, External 사용 |
| `RootManifestBuild` 정지처럼 보임 | 큰 manifest 또는 실제 hang | Logs, CPU/RAM/disk와 timestamp를 함께 확인 |
| seam/구멍 | clipping/topology 불변식 실패 | 출력 사용 중단, Source/partition/전체 log 보존 |
| mirrored mesh inside-out | 구 Bake 또는 material tangent 문제 | 최신 코드로 재Bake, 문제 Mesh 격리 |
| WPO material 차단 | projected morph에 live deformation 불가 | flatten/교체/Discard |
| WP Actor 누락 | descriptor/HLOD/Level Instance/load 실패 | WP/HLOD metrics와 external actor package 확인 |
| Save/Publish 실패 | read-only, disk, unsaved, rollback 실패 | checkout, 저장, 공간 확보 후 재시도 |
| Preview 비어 있음 | Bake Data/Runtime Preview/Level Pair link 누락 | Sections와 Diagnostics 확인 |
| Same World 변경 실패 | 이미 활성 Same World Pair 존재 | topology를 하나로 정리 |
| Travel 후 위치 오류 | Binding/Ticket/Target Actor timing 불일치 | Resume 결과와 identity 확인 |

## 주요 오류

```text
Align Section failed: ... target placement is unchanged or violates placement constraints.
```

현재 위치와 계산 위치가 같거나 placement constraint 위반입니다. Ground Sync Mapping, Section Placement와 Planet Actor transform을 확인합니다.

```text
Canonical seam coverage mismatch ... owners=1
```

partition clipping 후 canonical seam ownership이 깨진 결과입니다. 해당 output을 사용하지 말고 triangle, axis, boundary, partition과 전체 로그를 보존해 pipeline 문제로 보고합니다.

## 로그

우선 `Logs`와 `ACTIVE BAKE`를 사용하고, 지원 요청에는 `Saved/Logs`의 전체 실행 로그를 첨부하십시오.

