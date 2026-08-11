# Runtime Preview와 Budget

Runtime Preview는 External Level Section의 Ground 표현을 Orbit/Transition World에서 보여주는 gameplay-independent 렌더 host입니다.

## 로딩 수명 주기

`APlanetXRuntimePreviewActor`의 residency state는 Idle, LoadingRoot, LoadingPayloads, LoadingResources, Realizing, WaitingForRender, Resident, Failed 순으로 진행될 수 있습니다.

Game Instance facade는 다음을 제공합니다.

- LoadRuntimePreview
- SetRuntimePreviewVisible
- UnloadRuntimePreview
- GetRuntimePreviewStatus

직접 Actor를 사용할 때는 AssignPreviewBakeData, LoadPreviewFromBakeData, SetPreviewVisible, UnloadPreview와 renderable/component count query를 사용합니다.

## 표현 범위

Runtime Preview는 Proxy Static Mesh, baked ISM/HISM/Foliage instance batch를 하나의 root 아래에 만듭니다. gameplay Actor 복제, collision, navigation, tick 기반 동작은 의도적으로 포함하지 않습니다.

Loaded와 Renderable은 다릅니다. Resident라도 필요한 render resource가 아직 준비되지 않으면 presentation 전환을 기다려야 합니다.

## Runtime Budget

Project Settings의 **PlanetX Runtime**은 Follow Engine Scalability 또는 고정 profile 정책을 선택합니다. Proxy Bake Quality는 게시 revision의 immutable geometry 품질이고 Runtime Budget은 프레임당 realization·residency 작업량이므로 서로 독립적입니다.

## 관찰

`Stat PlanetXMemory`, `Stat PlanetXResources`, `Stat PlanetXProxy`, `Stat PlanetXRuntime`으로 memory, resource count, render, runtime service 비용을 확인합니다. `PlanetX.MemoryBudgetMB`와 자동 material MID budget warning도 함께 검토하세요.
