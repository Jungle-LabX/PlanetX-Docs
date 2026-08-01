# Large World와 World Partition

Source 검색

## Source 검색

World Partition은 unloaded actor를 미리 전부 열 필요가 없습니다.

```text
Descriptor 열거
→ 유효 Actor/HLOD 선택
→ 64개 단위 임시 로드
→ Component payload 캡처
→ 참조 해제
→ 분류와 Plan 생성
```

- 유효하고 최신인 top-level HLOD를 우선 사용합니다.
- stale/invalid HLOD는 original source로 fallback합니다.
- Data Layer membership은 통계에 기록되지만 활성 Data Layer만으로 자동 제한하지 않습니다.
- 확실한 제외에는 visibility보다 `PlanetX.NoBake`를 사용합니다.
- Level Instance/Packed Level의 순환과 로드 실패는 진단에 기록됩니다.

## 대형 Bake 권장

1. Map과 Asset을 저장합니다.
2. `Current Level` 또는 확정한 `Reviewed Set`으로 Refresh합니다.
3. Auto Partition을 유지합니다.
4. `Auto Memory Budget + Safe`를 사용합니다.
5. `BAKE IN EXTERNAL PROCESS`를 사용합니다.
6. `ACTIVE BAKE`와 `Saved/Logs`를 확인합니다.

## Checkpoint

- 동일 contract의 static geometry spool은 재사용될 수 있습니다.
- Landscape가 포함되면 현재 geometry checkpoint는 비활성화됩니다.
- 전체 pipeline 임의 지점 resume가 아니라 exact-contract geometry 재사용입니다.
- 성공 publish 후 checkpoint는 정리됩니다.

주요 임시 경로:

```text
Saved/PlanetX/ProxyBake/PartitionSpool
Saved/PlanetX/ProxyBakeRollback
Saved/PlanetXProxyBake
Saved/Logs
```

작은 partition은 packet RAM을 줄일 수 있지만 MeshPage, seam, package와 finalize 수를 늘립니다.
