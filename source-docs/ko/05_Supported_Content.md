# Supported Content

[이전: Core Concepts](04_Core_Concepts.md) · [문서 홈](../../PlanetX_User_Guide_KO.md) · [다음: Large World](06_Large_World_and_World_Partition.md)

| Source | 상태 | 처리 |
|---|---|---|
| Static Mesh Component | 지원 | ProxyGeometry 또는 InstanceBatch |
| Landscape / Streaming Proxy | 지원 | LandscapeProxy |
| ISM/HISM | 지원 | InstanceBatch |
| Foliage | 지원 | Foliage InstanceBatch |
| PCG 결과 | 조건부 | 실제 Static Mesh/ISM/HISM Component가 존재해야 함 |
| Level Instance / Packed Level | 지원 | 내부 지원 Component 검색 |
| World Partition HLOD | 조건부 | 유효 HLOD 우선, raw source fallback |
| Skeletal Mesh / Cloth | 미지원 | 검색에서 제외 |
| Spline deformation | 미지원 | Static Mesh로 변환 권장 |
| Dynamic runtime mesh | 미지원 | 영속 Static Mesh로 변환 필요 |

## 중요 조건

- Static Mesh는 유효 source LOD가 필요합니다.
- Negative Scale은 winding과 normal sign을 보정합니다.
- Source Nanite cluster를 복사하는 것이 아니라 source LOD에서 새 MeshPage를 만듭니다.
- Foliage와 ISM/HISM은 tiny여도 InstanceBatch 후보입니다.
- 일반 Static Mesh의 최대 크기가 80cm 이하면 자동 Discard됩니다.
- live WPO/displacement는 projected Orbit/Morph에서 `ManualReview`가 됩니다.
- `PlanetX.NoBake`, `PlanetX.ProxyBakePreview`, hidden-in-game, transient, editor-only Source는 제외됩니다.

문제 Source는 `Selected Actors → Refresh → Role/Reason 확인`으로 가장 빠르게 진단할 수 있습니다.

