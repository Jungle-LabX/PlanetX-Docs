# 호환성과 제한사항

PlanetX를 사용하기 전에 지원하는 Unreal Engine 버전과 플랫폼, Proxy Bake의 지원 범위를 확인해 주세요.

## 호환성

| 항목 | 지원 범위 |
| --- | --- |
| 플러그인 버전 | 1.0 |
| Unreal Engine | Unreal Engine 5.8 |
| 지원 플랫폼 | Windows 64-bit (Win64) |
| 필수 플러그인 | GeometryProcessing, PCG |
| 콘텐츠 포함 | 지원 |

PlanetX의 행성 제작, Proxy Bake, Planet Asset Editor의 **Preview** 탭 등의 제작 도구는 Unreal Editor에서 사용합니다.  
완성된 게임에서는 필요한 Planet Asset과 Bake된 행성 및 Proxy 데이터를 Runtime에서 사용합니다.

## 권장 시스템 사양

PlanetX는 Unreal Engine Editor 위에서 동작하므로 CPU와 GPU는 기본적으로 **Unreal Engine 5.8의 권장 시스템 사양 이상**을 권장합니다.

다만 Proxy Bake와 Planet Asset Editor의 **Preview** 탭에서는 큰 Level의 Geometry와 중간 생성 데이터를 메모리에 유지하는 작업이 발생할 수 있으므로, 일반적인 Unreal Engine 프로젝트보다 충분한 시스템 메모리를 확보하는 것을 권장합니다.

| 항목 | 최소 사양 | 권장 사양 |
| --- | --- | --- |
| CPU | Unreal Engine 5.8 권장 사양 기준 | Unreal Engine 5.8 권장 사양 이상 |
| GPU | Unreal Engine 5.8 권장 사양 기준 | Unreal Engine 5.8 권장 사양 이상 |
| 시스템 메모리 | **32 GB RAM** | **64 GB RAM 이상** |

> **⚠️ 메모리 안내**  
> 32 GB는 PlanetX의 주요 Editor 기능을 사용하기 위한 최소 권장 용량입니다.  
> 대규모 Landscape, 많은 Static Mesh 또는 Instance를 포함하는 Level을 Proxy Bake하거나 높은 Detail의 행성 비주얼을 제작하는 경우에는 **64 GB 이상의 메모리 사용을 권장합니다.**

실제 필요한 메모리는 Source Level의 크기와 복잡도, Proxy Bake 대상 수, Landscape 해상도와 Visual 설정에 따라 달라질 수 있습니다.

## Proxy Bake 지원 범위

Proxy Bake는 Ground Level의 시각적인 모습을 Orbit에서 사용할 수 있는 Section Proxy로 변환합니다.

현재 다음과 같은 Unreal Engine 콘텐츠를 직접 지원합니다.

- Static Mesh
- Instanced Static Mesh (ISM)
- Hierarchical Instanced Static Mesh (HISM)
- Foliage
- Landscape

PCG로 생성된 Static Mesh나 Instance, Level Instance, Packed Level Actor, HLOD 등은 실제로 확인 가능한 콘텐츠가 위의 지원 형식으로 구성되어 있는 경우 조건부로 처리할 수 있습니다.

반면 다음과 같이 실행 중에 형태가 변하거나 별도의 표현 방식이 필요한 콘텐츠는 일반적인 Proxy Bake 대상으로 지원하지 않습니다.

- Spline Mesh
- Skeletal Mesh와 Cloth
- Dynamic / Procedural Mesh
- Groom
- Niagara와 기타 Effect
- Geometry Collection 등의 동적 Geometry

지원하지 않는 시각 요소가 발견되었을 때 PlanetX는 가능한 경우 이를 조용히 무시하지 않고 Bake 결과에 누락 항목으로 기록합니다.

Proxy Bake가 **Completed With Warnings**로 완료되었다면 Proxy 생성 자체는 성공했지만 일부 콘텐츠가 제외되었을 수 있으므로 결과와 경고 내용을 확인하는 것을 권장합니다.

## Runtime 표현의 범위

Orbit에서 사용하는 Proxy와 Runtime Preview는 실제 Ground Level을 복제한 것이 아니라 **원거리 표현을 위한 시각 데이터**입니다.

따라서 Runtime Preview 자체는 다음 기능을 제공하지 않습니다.

- Ground Level의 Gameplay Actor 복제
- Collision
- Navigation
- Ground Actor의 Tick 및 Gameplay Logic

실제 게임플레이는 원본 Ground 콘텐츠에서 수행하며, PlanetX는 Orbit 표현과 Ground 콘텐츠를 연결하는 역할을 담당합니다.

Level Handoff를 사용하는 경우에도 Level을 불러오는 방식이나 Pawn 생성과 같은 게임 고유의 흐름은 프로젝트에서 계속 관리합니다.

## Proxy Bake 크기 제한

대규모 Level의 Proxy Bake에서는 지나치게 큰 단일 결과물이 생성되지 않도록 출력 크기를 제한합니다.

- 개별 Proxy Bake 처리 조각의 중간 데이터는 일반적으로 **128 MiB 이하**를 목표로 합니다.
- 생성되는 개별 Package가 **512 MiB를 초과하면 경고**가 표시됩니다.
- 개별 Package가 **1 GiB를 초과하면 해당 결과를 게시할 수 없습니다.**

복잡한 대규모 Level에서는 Proxy의 Detail과 Bake 대상 범위를 적절하게 조정하는 것을 권장합니다.
