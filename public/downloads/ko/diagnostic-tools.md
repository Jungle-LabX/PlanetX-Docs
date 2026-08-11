# 진단 도구

PlanetX는 Editor UI, Blueprint query, console stat과 dump 명령을 제공합니다.

## 실시간 Stat

```text
Stat PlanetXMemory
Stat PlanetXResources
Stat PlanetXProxy
Stat PlanetXProxyDetail
Stat PlanetXRuntime
```

Memory는 runtime resource와 budget을, Resources는 수량을, Proxy는 렌더 coverage를, Runtime은 service 비용을 보여줍니다. 통계 World는 PIE/Game World와 선택된 Preview World 우선순위에 따라 결정됩니다.

## Dump 명령

| 명령 | 결과 |
| --- | --- |
| PlanetX.ProxyStats.Dump | 현재 World의 proxy render summary |
| PlanetX.ProxyStats.DumpInstanceCoverage | instance source와 realized coverage |
| PlanetX.VisualEdit.Status | Visual Edit session 상태 |
| PlanetX.VisualEdit.Dump | Visual build, Section failure와 진단 snapshot |

`PlanetX.ProxyStats.LogIntervalSeconds`는 반복 proxy log 주기를, `PlanetX.MemoryBudgetMB`는 진단용 memory budget을 조정합니다.

## Blueprint 진단

`UPlanetXSubsystem`에서 Actor runtime context, movement state, transition result, managed actor state, Section runtime state와 Journey를 조회할 수 있습니다. DrawPlanetDebug, DrawSectionDebug, DrawActorContextDebug, DrawCaptureStackDebug는 개발 build의 공간 상태 확인에 사용합니다.

## 지원 자료 수집

문제를 재현한 World, Planet/Binding/Section ID, Asset validation result, Proxy Bake revision과 omission, Travel Result error, 관련 Stat/Dump를 함께 기록하세요. 경로에 민감 정보가 있을 수 있으므로 외부 공유 전 redaction을 확인합니다.
