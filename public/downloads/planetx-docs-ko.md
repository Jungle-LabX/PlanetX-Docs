# PlanetX 공식 문서

Version 1.0 · Last reviewed 2026-08-23

## PlanetX 문서에 오신 것을 환영합니다!

![우주에서 바라본 PlanetX 행성](/images/docs/overview-introduction-0.png)

PlanetX를 다운로드해주셔서 감사합니다.

이 문서에서는 PlanetX의 설치부터 행성 생성, Ground Level 연결, Proxy Bake, 비주얼 편집, 그리고 Orbit과 Ground 사이의 전환까지 전반적인 사용 방법을 안내합니다.

처음 PlanetX를 사용하신다면 공식 첫 사용 경로인 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)부터 진행하세요.

### PlanetX란 무엇인가요?

PlanetX는 기존 Unreal Engine Level을 **행성 표면의 일부로 활용할 수 있도록 도와주는 Unreal Engine 플러그인**입니다.

평소처럼 제작한 Landscape와 Level을 행성의 특정 지역으로 등록하고, 멀리서 보았을 때는 하나의 행성처럼 표현하면서 가까이 접근하면 실제 Ground Level에서 플레이할 수 있도록 연결합니다.

이를 통해 기존 Level 제작 방식을 크게 변경하지 않고도 **우주에서 바라보는 행성과 실제 지표면 플레이를 하나의 흐름으로 구성**할 수 있습니다.

### 무엇을 해결하나요?

Unreal Engine의 일반적인 Level과 Landscape는 평면 공간을 중심으로 제작됩니다. 때문에 우주에서 행성을 바라보다가 그대로 지표면까지 이동하는 게임을 만들려면 원거리 행성 표현, 실제 Ground Level, 좌표 변환과 전환 과정을 별도로 구현해야 합니다.

PlanetX는 기존 Ground Level을 그대로 활용하면서, 해당 영역을 행성 표면의 **Section**으로 연결합니다. Orbit에서는 가볍게 제작된 Proxy와 행성 표면을 보여주고, 플레이어가 지표면으로 접근하면 실제 Ground 콘텐츠로 자연스럽게 이어지도록 구성할 수 있습니다.

### 기본 작업 흐름

1. **Planet Asset 생성**

   행성의 크기와 기본 설정을 지정합니다.

2. **Ground Level 등록**

   기존 Unreal Engine Level에서 행성 표면으로 사용할 영역을 Section으로 등록합니다.

3. **Section Proxy Bake**

   Ground Level을 Orbit에서 보여주기 위한 Proxy로 변환합니다.

4. **행성 비주얼 편집**

   **Planet Asset Editor > Preview**에서 Section의 위치와 행성 표면, Material 등의 모습을 조정합니다.

5. **Planet Actor 배치**

   완성된 Planet Asset을 Level에 배치하여 행성을 표시합니다.

6. **Orbit ↔ Ground 전환 확인**

   플레이어 또는 카메라를 이동하며 Orbit 표현과 실제 Ground Level 사이의 전환을 테스트합니다.

> **💡 Tip**
> PlanetX를 처음 사용한다면 모든 기능을 한 번에 이해하려고 할 필요는 없습니다.
> 먼저 Planet Asset을 만들고 하나의 Ground Level을 행성에 연결하는 기본 흐름부터 따라 해보세요.

다음 단계에서는 [설치](/docs/ko/installation)를 진행하거나, 바로 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)을 따라 PlanetX를 사용해볼 수 있습니다.

## 주요 기능

PlanetX는 기존 Unreal Engine Level을 행성의 일부로 연결하고, Orbit에서 바라보는 행성 표현부터 실제 Ground 플레이까지 하나의 흐름으로 구성할 수 있도록 다양한 제작 및 런타임 기능을 제공합니다.

### 행성 좌표와 표면 기준

![행성 좌표와 표면 기준](/images/docs/overview-key-features-0.png)

PlanetX는 행성의 중심과 표면을 기준으로 위치와 방향을 계산할 수 있는 좌표 체계를 제공합니다.

이를 통해 행성 어디에 있더라도 표면의 위쪽 방향과 이동 방향을 일관되게 계산할 수 있으며, 기존 Unreal Engine의 World 좌표와 행성 좌표 사이를 변환할 수 있습니다.

이 좌표 체계는 Section 배치, Ground 연결, 플레이어 이동과 Orbit ↔ Ground 전환의 공통 기준으로 사용됩니다.

### Section과 Ground 연결

**Section**은 기존 Ground 콘텐츠를 행성 표면의 특정 지역과 연결하기 위한 단위입니다.

하나의 행성에 여러 Section을 배치할 수 있으며, 각 Section에는 실제 플레이에 사용할 Ground Level을 연결할 수 있습니다.

PlanetX는 프로젝트 구성에 따라 두 가지 방식의 전환을 지원합니다.

- **Same World**  
  Orbit과 Ground 콘텐츠를 하나의 World 안에서 사용하며, 플레이어가 이동하는 동안 표현을 전환합니다.

- **Level Handoff**  
  Orbit과 Ground를 서로 다른 Level로 구성하고, 전환 시 플레이어의 위치와 이동 상태를 이어받아 다른 Level로 이동합니다.

### Section Proxy Bake

![Section Proxy Bake 결과](/images/docs/overview-key-features-1.png)

PlanetX는 기존 Ground Level의 모습을 Orbit에서도 확인할 수 있도록 **Section Proxy**를 생성할 수 있습니다.

Landscape, Static Mesh, Foliage 등 Ground를 구성하는 주요 요소를 분석하여 원거리에서 사용하기 적합한 형태로 Bake하고, 이를 행성 표면의 Section과 연결합니다.

이를 통해 실제 Ground Level 전체를 항상 표시하지 않고도 Orbit에서는 해당 지역의 모습을 행성 표면에서 확인할 수 있습니다.

### Orbit ↔ Ground 전환

PlanetX는 플레이어 또는 카메라가 행성에 접근하거나 지표면에서 다시 멀어지는 과정에서 **Orbit 표현과 실제 Ground 콘텐츠 사이를 전환**할 수 있습니다.

전환 과정에서는 행성 표면의 위치와 방향을 기준으로 플레이어의 위치, 회전과 이동 상태를 이어갈 수 있도록 처리합니다.

이를 통해 별도의 착륙 화면이나 완전히 분리된 이동 방식 없이, Orbit과 Ground를 하나의 이동 흐름으로 구성할 수 있습니다.

### 행성 비주얼 제작

![Planet Asset Editor에서 행성 비주얼 제작](/images/docs/overview-key-features-2.png)

PlanetX는 Section Proxy가 없는 영역까지 하나의 완성된 행성처럼 보이도록 행성 표면을 제작할 수 있는 기능을 제공합니다.

Planet Asset Editor의 **Preview** 탭에서 다음 요소를 편집하고 미리 확인할 수 있습니다.

- 행성의 기본 표면
- Section과 행성 표면 사이의 연결 영역
- Surface Material
- 대기와 구름
- 태양과 조명
- 우주 배경과 후처리 효과

편집한 결과는 최종 Runtime용 행성 비주얼로 생성하여 사용할 수 있습니다.

### 환경 전환

![Orbit과 Ground 사이의 환경 전환](/images/docs/overview-key-features-3.png)

Orbit과 Ground에서는 필요한 환경 표현이 서로 다를 수 있습니다.

PlanetX는 행성의 대기, 구름, 조명과 기타 환경 효과를 관리하고, 플레이어가 Orbit과 Ground 사이를 이동할 때 현재 상태에 맞는 환경 표현을 적용할 수 있도록 지원합니다.

### 검증과 디버깅

![PlanetX 검증 및 디버깅 화면](/images/docs/overview-key-features-4.png)

PlanetX는 행성을 제작하는 과정에서 잘못된 설정이나 누락된 데이터를 쉽게 확인할 수 있도록 여러 검증 및 디버깅 기능을 제공합니다.

Planet Asset 설정, Section과 Ground 연결, Proxy Bake 결과, 행성 비주얼과 Runtime 전환 상태 등을 확인할 수 있으며, 문제가 발생했을 때 어느 단계에서 수정이 필요한지 파악할 수 있도록 도와줍니다.

## 호환성과 제한사항

PlanetX를 사용하기 전에 지원하는 Unreal Engine 버전과 플랫폼, Proxy Bake의 지원 범위를 확인해 주세요.

### 호환성

| 항목 | 지원 범위 |
| --- | --- |
| 플러그인 버전 | 1.0 |
| Unreal Engine | Unreal Engine 5.8 |
| 지원 플랫폼 | Windows 64-bit (Win64) |
| 필수 플러그인 | GeometryProcessing, PCG |
| 콘텐츠 포함 | 지원 |

PlanetX의 행성 제작, Proxy Bake, Planet Asset Editor의 **Preview** 탭 등의 제작 도구는 Unreal Editor에서 사용합니다.  
완성된 게임에서는 필요한 Planet Asset과 Bake된 행성 및 Proxy 데이터를 Runtime에서 사용합니다.

### 권장 시스템 사양

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

### Proxy Bake 지원 범위

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

### Runtime 표현의 범위

Orbit에서 사용하는 Proxy와 Runtime Preview는 실제 Ground Level을 복제한 것이 아니라 **원거리 표현을 위한 시각 데이터**입니다.

따라서 Runtime Preview 자체는 다음 기능을 제공하지 않습니다.

- Ground Level의 Gameplay Actor 복제
- Collision
- Navigation
- Ground Actor의 Tick 및 Gameplay Logic

실제 게임플레이는 원본 Ground 콘텐츠에서 수행하며, PlanetX는 Orbit 표현과 Ground 콘텐츠를 연결하는 역할을 담당합니다.

Level Handoff를 사용하는 경우에도 Level을 불러오는 방식이나 Pawn 생성과 같은 게임 고유의 흐름은 프로젝트에서 계속 관리합니다.

### Proxy Bake 크기 제한

대규모 Level의 Proxy Bake에서는 지나치게 큰 단일 결과물이 생성되지 않도록 출력 크기를 제한합니다.

- 개별 Proxy Bake 처리 조각의 중간 데이터는 일반적으로 **128 MiB 이하**를 목표로 합니다.
- 생성되는 개별 Package가 **512 MiB를 초과하면 경고**가 표시됩니다.
- 개별 Package가 **1 GiB를 초과하면 해당 결과를 게시할 수 없습니다.**

복잡한 대규모 Level에서는 Proxy의 Detail과 Bake 대상 범위를 적절하게 조정하는 것을 권장합니다.

## 여기서 시작 — Same World 빠른 시작

이 문서는 공식 첫 사용 및 제품 검토 경로입니다. Unreal Engine의 기본 **Open World** Level 템플릿으로 시작해 Level을 `GroundLevel`로 저장하고, 이를 PlanetX의 **Same World Section**으로 연결한 뒤 실제 Ground 콘텐츠와의 런타임 전환을 확인합니다.

완료하면 다음과 같은 구성이 만들어집니다.

- Planet Asset 1개
- `GroundLevel`과 연결된 Same World Section 1개
- Bake된 Section Proxy
- Runtime용 행성 비주얼
- PlanetX Planet Actor
- Environment Manager
- Transition Endpoint
- Orbit ↔ Ground 전환에 참여하는 Player Actor

> 이 문서에서는 **Same World** 구성만 다룹니다.
> Orbit과 Ground를 서로 다른 Level로 구성하는 **External Level** 방식은 이 흐름을 성공한 뒤 [고급 가이드 — Multi-Level Handoff](/docs/ko/quick-start-level-handoff)를 참고하세요.

### 시작하기 전에

다음 항목을 준비해 주세요.

- PlanetX가 설치되고 활성화된 Unreal Engine 5.8 프로젝트

미리 준비한 Ground Level은 필요하지 않습니다. 2단계에서 Unreal Engine의 기본 **Open World** 템플릿으로 새 Level을 만들고 `GroundLevel`로 저장합니다. 이 템플릿의 Landscape를 재현 가능한 Source로 사용하며, 런타임 전환 테스트에 필요한 Player Actor는 11단계에서 준비합니다.

동일한 결과를 재현하려면 다음 값을 그대로 사용하세요.

| 설정 | 값 |
| --- | --- |
| Ground Level | **Open World** 템플릿으로 만든 `GroundLevel` |
| Planet ID | `FirstPlanet` |
| Planet Radius | `100 km` |
| Planet Asset | `PA_FirstPlanet` |

2단계에서 `GroundLevel`을 만들고 저장하기 전에는 Proxy Bake를 열지 마세요. Proxy Bake에는 `Untitled` 또는 `/Temp` Level이 아닌 저장된 Level을 사용해야 합니다.

또한 PIE 또는 Simulate가 실행 중이라면 먼저 종료하세요. Proxy Bake는 Editor의 Ground Source를 기준으로 작업하므로 PIE 중에는 실행하지 않습니다.

---

### 1. Planet Asset 준비

**Content Browser > Add > Miscellaneous > Planet Asset**을 선택합니다. 이 문서에서는 Planet ID `FirstPlanet`, Planet Radius `100 km`, 기본 Coordinate Convention을 사용하고 Asset을 `PA_FirstPlanet`으로 저장합니다. 각 설정의 개념 설명이 필요한 경우에만 [첫 Planet Asset 만들기](/docs/ko/create-first-planet)를 참고하세요.

![Add, Miscellaneous, Planet Asset 경로가 표시된 Content Browser 메뉴](/images/docs/qs-02-create-planet-asset-menu.png)

**Section은 아직 직접 만들 필요가 없습니다.**

처음 Proxy Bake를 실행하면 현재 Ground Level을 기준으로 필요한 Section과 Level Pair가 자동으로 생성됩니다.

---

### 2. GroundLevel을 만들고 Proxy Bake 열기

**File > New Level**을 선택하고 Unreal Engine의 기본 **Open World** 템플릿을 연 뒤 즉시 `GroundLevel`로 저장합니다.

Open World 템플릿에는 World Partition Landscape가 포함되어 있으며, 이 빠른 시작에서는 동일한 결과를 재현하기 위한 Ground Source로 사용합니다. 이 흐름을 성공한 뒤에는 프로젝트의 실제 Gameplay Level에서도 같은 과정을 반복할 수 있습니다.

Proxy Bake를 열기 전에 Level 탭이 `Untitled`가 아니라 `GroundLevel`인지 확인하고 한 번 더 저장하세요.

첫 Bake에서는 Unreal Editor의 **Tools** 메뉴에서 **PlanetX** 영역을 찾고 **Proxy Bake Editor**를 선택합니다. 이 경로가 공식 첫 사용 경로입니다.

![Unreal Editor Tools 메뉴의 PlanetX Proxy Bake Editor 명령](/images/docs/qs-05-open-proxy-bake.png)

Planet Asset Editor > Sections에서 Proxy Bake를 여는 방식은 기존 Section 작업 경로이며 Section이 이미 생성된 뒤에만 사용합니다.

Proxy Bake Editor가 열리면 먼저 상단의 **Basic** 모드를 사용하면 됩니다. 빠른 시작에서는 Advanced 설정을 변경할 필요가 없습니다.

#### Target Planet Asset 지정

**1 Target Planet Asset** 영역에서 앞 단계에서 만든 Planet Asset을 선택합니다.

이미 Planet Asset Editor에서 Proxy Bake를 열었다면 자동으로 지정되어 있을 수 있습니다.

Planet Asset이 올바르게 지정되었는지 확인하세요.

#### Runtime Role을 Same World로 설정

**2 Runtime Role**을 펼칩니다.

**Presentation**에서 다음 값을 선택합니다.

```text
Same World
```

Same World는 Planet과 실제 Ground 콘텐츠가 같은 World 안에 존재하는 구성입니다.

이 모드에서는 현재 열려 있는 Ground Level이 자동으로 **Ground World**가 됩니다.

따라서 별도의 Planet World를 지정할 필요가 없습니다.

**Ground World**에 현재 작업 중인 Level이 표시되는지 확인하세요.

#### Source Scope 선택

**3 Source Scope**에서 Proxy Bake가 어떤 Actor를 검색할지 선택합니다.

처음 사용하는 경우 일반적인 단일 Level이라면 다음 설정을 권장합니다.

```text
Source Scope
└─ Current Level
```

각 옵션은 다음과 같이 사용할 수 있습니다.

- **Selected Actors**  
  현재 선택한 Actor만 Bake하고 싶을 때 사용합니다.

- **Current Level**  
  현재 Persistent Level의 Actor를 대상으로 합니다. 일반적인 첫 테스트에 적합합니다.

- **Loaded Levels**  
  현재 Level과 함께 로드된 Streaming Level 및 Level Instance까지 포함할 때 사용합니다.

- **Reviewed Set**  
  이전에 검토한 Source 목록을 그대로 다시 사용합니다. 반복적인 제작 작업을 위한 옵션이므로 처음에는 사용하지 않아도 됩니다.

그 아래의 **Source Representation**은 특별한 이유가 없다면 기본 설정을 유지해도 됩니다.

World Partition HLOD가 준비되어 있다면 **Prefer HLOD**가 유효한 HLOD를 우선 사용하고, 필요한 경우 원본 Actor를 사용합니다.

#### Bake Quality 선택

Proxy Bake Editor 상단의 **BAKE QUALITY**에서 다음 값을 권장합니다.

```text
High (Recommended)
```

빠른 테스트 시간을 줄이고 싶다면 Medium이나 Low를 사용할 수 있지만, 최종 결과를 확인할 때는 High 사용을 권장합니다.

---

### 3. Ground Source 검색하기

설정이 끝났다면 **Scan Sources**를 클릭합니다.

단축키는 `F5`입니다.

```text
Scan Sources
```

Scan은 현재 설정에 따라 Ground Level을 검색하고 Proxy Bake에 사용할 Source 목록과 Bake Plan을 구성합니다.

> PlanetX Mode를 사용하고 있다면 Scan 전에 Preview View를 반드시 **Level**로 변경하세요.
>
> **Planet**과 **Compare**는 행성 표현을 확인하기 위한 Preview 상태이므로 Ground Proxy Bake의 Source를 선택하는 기준으로 사용할 수 없습니다.

Scan이 완료되면 **Source Review**에서 발견된 Source를 확인합니다.

일반적인 Static Mesh, Landscape, ISM/HISM, Foliage 등의 지원 대상은 자동으로 적절한 역할이 지정됩니다.

#### Source Review에서 확인할 것

처음에는 목록 전체를 하나씩 수정할 필요는 없습니다.

다음과 같은 문제가 표시되는지만 확인하세요.

- 사용하려던 Actor가 목록에 나타나지 않음
- `Manual Review`가 필요한 Source가 있음
- `Unsupported` Source가 있음
- Bake에 사용되는 Source가 하나도 없음

상태 줄이 녹색 `SUCCESS`이고, 의도한 Source가 하나 이상 활성화되어 있으며, `Unsupported`와 `Manual Review`가 모두 `0`이고 **BAKE IN EDITOR**가 활성화된 상태에서 진행합니다.

![PA_FirstPlanet과 GroundLevel을 검색해 Unsupported와 Manual Review가 0이고 Bake in Editor가 활성화된 성공 화면](/images/docs/qs-07-scan-success.png)

생성되는 Section ID에는 고유한 접미사가 붙습니다. 예시 화면은 `GroundLevel_143C3E3D`를 사용하지만 사용자의 접미사는 달라도 정상입니다.

지원하지 않는 Source가 있다면 해당 항목을 제외하거나 문제를 수정한 뒤 다시 Scan할 수 있습니다.

Source Review에서 **Use** 또는 **Role** 값을 직접 변경했다면 반드시 다음 버튼을 한 번 클릭하세요.

```text
Apply Source Changes
```

Source 변경 사항을 적용하지 않으면 Bake 버튼이 활성화되지 않습니다.

아무 Source도 수정하지 않았다면 별도로 누를 필요는 없습니다.

#### World Partition을 사용하는 경우

World Partition Level에서는 Output Plan에 자동 크기 설정이 표시될 수 있습니다.

처음에는 **Automatic World Partition Output Sizing**을 활성화한 상태로 사용하는 것을 권장합니다.

Scan 결과를 기준으로 PlanetX가 필요한 출력 Partition 구성을 계산합니다.

---

### 4. Section Proxy Bake 실행하기

Source 검토가 끝났다면 **BAKE IN EDITOR**를 클릭합니다.

단축키는 `Ctrl+B`입니다.

```text
BAKE IN EDITOR
```

Bake가 진행되는 동안 Ground의 Geometry를 수집하고, Orbit에서 사용할 Section Proxy와 필요한 Runtime 데이터를 생성합니다.

처음 Bake하는 Planet Asset이라면 이 과정에서 **현재 Ground Level에 대응하는 Section이 자동으로 생성되고 Planet Asset에 연결됩니다.**

Bake가 끝날 때까지 기다리세요.

#### Bake 결과 확인

정상적으로 완료되었다면 결과가 성공 상태로 표시됩니다.

일부 Source가 제외되었다면 Bake 자체는 성공하면서 경고가 함께 표시될 수 있습니다.

이 경우 결과의 Warning과 Omission을 확인하여 의도한 Ground 콘텐츠가 빠지지 않았는지 확인하세요.

필요하다면 **Open Results**를 클릭하거나 `Ctrl+Shift+O`를 눌러 생성된 Bake 결과를 Content Browser에서 확인할 수 있습니다.

> 이미 최신 Bake 결과가 존재한다면 버튼 이름이 **REBUILD IN EDITOR**로 표시될 수 있습니다.  
> 이는 현재 결과를 강제로 다시 생성하는 동작입니다.

---

### 5. 생성된 Section 확인하기

Planet Asset Editor로 돌아가 **Sections**를 엽니다.

첫 Proxy Bake가 성공했다면 Section 목록에 새로운 항목이 하나 표시됩니다.

빠른 시작에서는 다음 상태를 확인하면 됩니다.

| 항목 | 예상 상태 |
| --- | --- |
| Runtime Role | `Same World` |
| Ground World | `GroundLevel` |
| Bake | `Linked` |
| Transition | `Ready` |

Section을 선택하면 오른쪽에서 연결된 Ground World와 Generated Resource 상태를 추가로 확인할 수 있습니다.

Same World Section은 Ground Level과 행성의 기준점을 연결하는 **고정 Anchor**로 사용됩니다.

따라서 기본 Same World Section의 Latitude, Longitude, Surface Yaw와 Scale은 직접 변경할 필요가 없습니다.

필요한 경우 **Altitude**만 조정하여 Ground와 행성 표면 사이의 높이 차이를 보정할 수 있습니다.

---

### 6. 행성 비주얼 만들기

이제 Planet Asset Editor에서 **Preview**를 엽니다.

처음에는 **Basic** 모드를 사용하면 됩니다.

여기에서는 Bake된 Section Proxy와 나머지 행성 표면을 함께 확인할 수 있습니다.

#### Completion Material 지정

행성에서 Section이 존재하지 않는 나머지 영역을 표시하려면 **Completion Material**을 지정합니다.

```text
Preview
└─ Basic
   └─ Planet
      └─ Completion Material
```

이 튜토리얼에서는 **Show Plugin Content**를 활성화하고 포함된 `MI_PlanetX_Earth` Material Instance를 선택합니다.

```text
/PlanetX/PlanetX/Materials/Samples/PlanetSurface/MI_PlanetX_Earth
```

처음에는 Terrain Height, Terrain Frequency, Padding Width 등의 값은 기본값으로 두어도 됩니다.

Preview에서 다음 사항만 확인합니다.

- 행성 전체가 정상적으로 표시되는지
- Bake한 Section Proxy가 행성 표면에 나타나는지
- Proxy 주변에 심각한 빈 공간이나 뒤집힌 Geometry가 없는지

![MI_PlanetX_Earth가 지정되고 Apply and Build를 실행할 수 있는 Preview 설정](/images/docs/qs-10-preview-settings.png)

Preview 상단의 `10000`은 Viewport 카메라 속도이며 Planet Radius가 아닙니다.

#### Runtime Visual 생성

Preview 결과에 문제가 없다면 **Planet Visual Build** 영역에서 다음 버튼을 클릭합니다.

```text
Apply & Build
```

`Apply & Build`는 현재 Preview 설정을 Planet Asset에 적용하고, 필요한 Padding Material과 Runtime용 행성 Visual Asset을 생성합니다.

작업이 완료될 때까지 기다리세요. 성공하면 다음 메시지가 표시됩니다.

```text
Planet Visual Build completed successfully.
```

> **Apply & Build가 비활성화되어 있다면**
>
> 먼저 Preview에 표시된 오류를 확인하세요.
>
> 특히 Proxy Bake 결과가 오래되었거나 Padding 생성에 실패한 경우 Build가 차단될 수 있습니다. Ground Geometry가 변경되었다면 Proxy Bake를 다시 실행한 뒤 Preview를 Refresh하고 다시 시도하세요.

작업이 끝나면 Planet Asset을 저장합니다.

---

### 7. Ground Level에 PlanetX Planet 배치하기

다시 Ground Level로 돌아옵니다.

Place Actors에서 다음 Actor를 검색합니다.

```text
PlanetX Planet
```

Level에 **PlanetX Planet** Actor를 하나 배치합니다.

Actor를 선택하고 Details에서 **Planet Component**를 찾은 뒤 **Planet Asset**에 앞에서 만든 Planet Asset을 지정합니다.

![PA_FirstPlanet이 지정되고 Auto Register Runtime이 활성화된 PlanetX Planet Actor Details](/images/docs/qs-12-planet-actor-details.png)

다음 기본 설정은 그대로 유지합니다.

```text
Auto Register Runtime
    Enabled
```

하나의 Planet Actor만 사용하는 빠른 시작에서는 별도의 Planet Binding ID를 설정할 필요가 없습니다.

---

### 8. Planet Actor를 Ground Level에 정렬하기

Level Editor 왼쪽 위의 Modes 선택기에서 **PlanetX Mode**를 선택합니다.

PlanetX Mode 상단에는 다음 세 가지 Preview View가 있습니다.

- **Planet**
- **Compare**
- **Level**

먼저 **Level**을 선택합니다.

```text
Preview View
└─ Level
```

Level View에서는 Planet Proxy를 숨기고 원본 Ground Level을 표시합니다.

#### 활성 Planet 확인

PlanetX Mode의 **Scene** 영역에서 방금 배치한 Planet Actor가 활성 Planet으로 선택되어 있는지 확인합니다.

Planet이 여러 개 있다면 방금 만든 Planet을 명시적으로 선택하세요.

#### Same World Align 실행

Scene 영역의 오른쪽에 있는 **Transform 모양의 Align 아이콘**을 클릭합니다.

이 버튼은 Planet Actor를 현재 Same World Ground Level의 기준 위치에 맞춥니다.

Same World에서는 Ground Level을 행성의 North Pole 기준 Section으로 사용하므로 사용자가 Planet Actor의 위치를 직접 계산할 필요가 없습니다.

Align은 Planet Actor의 회전이나 Scale을 임의로 변경하지 않고, Ground와 행성 표면이 맞닿도록 위치를 조정합니다.

#### Compare로 정렬 확인

정렬이 끝나면 상단 Preview View를 **Compare**로 변경합니다.

```text
Compare
```

Compare에서는 다음 두 표현을 동시에 확인할 수 있습니다.

- 실제 Ground Level
- Bake된 Planet Section Proxy

두 표현이 같은 위치에 겹쳐 보이는지 확인하세요.

큰 위치 오차가 보인다면 다음 단계로 진행하기 전에 다음 항목을 다시 확인하는 것이 좋습니다.

- 올바른 Planet Asset이 Planet Actor에 지정되어 있는지
- Proxy Bake가 현재 Ground Level을 대상으로 만들어졌는지
- Same World Section의 Bake 상태가 `Linked`인지
- Section Altitude가 의도하지 않은 값으로 변경되지 않았는지

확인이 끝나면 **Planet** View로 전환하여 Orbit에서 보이는 행성 표현도 확인할 수 있습니다.

---

### 9. Environment Manager 추가하기

PlanetX는 각 Planet에 하나의 **Environment Manager**를 사용합니다.

Environment Manager를 추가하고 연결하기 전에는 PlanetX가 이 Level에 대기, 구름과 우주 배경 환경을 아직 적용하지 않았기 때문에 행성이 어둡게 보일 수 있습니다. 이 상태를 Material 오류로 판단하지 말고 Environment Manager 설정을 먼저 완료하세요.

PlanetX Mode에서 **Environment** Palette를 엽니다.

단축키는 `Alt+5`입니다.

Environment Manager가 아직 없다면 다음 메시지가 표시됩니다.

```text
Environment Manager is not assigned to this Planet.
```

**Add Manager**를 클릭합니다.

```text
Add Manager
```

PlanetX가 현재 활성 Planet에 연결된 `PlanetXEnvironmentManager`를 Level에 생성합니다.

처음에는 별도의 Level Override를 설정하지 않아도 됩니다. Planet Asset에서 작성한 Environment 설정이 기본값으로 사용됩니다.

Manager를 추가한 직후 `GroundLevel`을 저장합니다. 대기나 구름이 이상하게 보인다면 먼저 Level을 저장한 뒤 Planet View를 다시 확인하세요. 저장하면 Environment가 다시 평가되기 전에 Manager와 Level Binding이 유지됩니다.

Manager가 생성되었다면 **Validate**를 눌러 현재 Planet과 올바르게 연결되었는지 확인합니다.

> PlanetX는 Environment 기능을 일부 사용하지 않는 경우에도 Planet마다 하나의 Environment Manager를 Runtime infrastructure로 사용합니다. 빠른 시작에서도 생성하는 것을 권장합니다.

---

### 10. Transition Endpoint 추가하기

PlanetX Mode에서 **Transition** Palette를 엽니다.

단축키는 `Alt+4`입니다.

현재 Level에 Endpoint가 없다면 다음 메시지가 표시됩니다.

```text
No Transition Endpoint for this Level.
```

**Add Endpoint**를 클릭합니다.

```text
Add Endpoint
```

PlanetX가 현재 활성 Planet과 Same World Section에 맞는 Transition Endpoint를 자동으로 생성합니다.

Endpoint에는 다음 정보가 자동으로 연결됩니다.

- 현재 Planet
- 현재 Section
- 현재 Level Pair
- 앞 단계에서 만든 Environment Manager

따라서 빠른 시작에서는 ID를 직접 입력할 필요가 없습니다.

#### Transition 범위 확인

생성된 Endpoint는 Section의 크기를 기준으로 Transition Cylinder를 자동 설정합니다.

기본 설정인 다음 옵션은 그대로 유지하세요.

```text
Auto Size Transition Cylinder to Section Bounds
    Enabled
```

Viewport에는 Transition 영역을 확인하기 위한 Debug Cylinder가 표시됩니다.

이 영역은 플레이어가 Orbit, Transition, Ground 중 어느 상태에 있는지 판단하는 기준으로 사용됩니다.

Endpoint의 위치나 크기를 처음부터 수동으로 조정할 필요는 없습니다.

Level을 저장합니다.

---

### 11. Player Actor를 PlanetX에 연결하기

이제 실제로 움직일 Pawn 또는 Character를 설정합니다.

여기서는 **현재 PlayerController가 View Target으로 사용하는 Actor**를 수정해야 합니다. 이 튜토리얼에서는 Ground Level에 배치하고 **Auto Possess Player 0**으로 설정한 Pawn 또는 Character Instance를 사용합니다.

`GroundLevel`에 해당 Actor가 없다면 지금 Pawn 또는 Character를 배치하고 **Auto Possess Player**를 **Player 0**으로 설정한 뒤, 활성 Camera Component가 PlayerController의 View Target을 제공하는지 확인합니다.

해당 Actor의 Blueprint를 엽니다.

#### Coordinate Component 추가

Components 패널에서 **PlanetX Coordinate Component**를 추가합니다.

Component를 추가한 뒤 Blueprint를 Compile하고 Ground Level로 돌아갑니다. Level에 **배치한 Player Actor Instance**를 선택하고 해당 Instance의 Component Details에서 **PlanetX Reference**를 다음과 같이 설정합니다.

**Reference Planet Actor**에는 이 Level에 배치한 **PlanetX Planet Instance**를 지정합니다.

그 다음 **Reference Section Id**에서 앞의 Proxy Bake가 생성한 Same World Section을 선택합니다.

처음 테스트에서는 Section을 자동 검색하게 두기보다 명시적으로 지정하는 것을 권장합니다.

![PlanetX Coordinate와 Viewpoint Component가 있고 PlanetXPlanetActor와 GroundLevel Section을 참조하는 BP_Player](/images/docs/qs-13-player-components.png)

PIE가 시작되면 실제로 Possess된 Pawn이 여기서 설정한 Actor와 같은지 확인하세요. World Outliner에 별도의 `DefaultPawn0`가 생성되고 그 Pawn이 Possess된다면, 배치된 `BP_Player`가 조작된다고 가정하지 말고 실제 Pawn을 설정하거나 GameMode의 Default Pawn Class를 변경해야 합니다.

> Blueprint Class Default에서 특정 Level Actor를 지정하려고 하지 마세요. Blueprint Class는 특정 Level에 존재하는 Actor Instance 참조를 저장할 수 없습니다. GameMode를 통해 Pawn을 Spawn하는 프로젝트에서는 Spawn 이후 Planet 참조를 Resolve하고 지정해야 합니다. 자세한 내용은 [런타임 통합](/docs/ko/runtime-integration)을 참고하세요.

최종적으로 다음 관계가 되어야 합니다.

```text
Player Actor
└─ PlanetX Coordinate Component
   ├─ Reference Planet Actor → 배치한 PlanetX Planet
   └─ Reference Section Id   → Bake로 생성된 Same World Section
```

`Reference Planet Actor`가 설정되어 있다면 Planet ID는 해당 Actor의 Planet Asset에서 자동으로 결정됩니다.

#### Viewpoint Component 추가

같은 Actor에 **PlanetX Viewpoint Component**를 추가합니다.

다음 기본 설정은 그대로 유지합니다.

```text
Auto Register Runtime
    Enabled

Can Drive Transition State
    Enabled
```

그리고 해당 Actor에 **활성 Camera Component가 하나 이상 존재하는지 반드시 확인하세요.**

PlanetX는 PIE에서 실제 PlayerController의 View Target과 활성 Camera를 기준으로 Orbit / Transition / Ground 상태를 계산합니다.

따라서 PlayerController가 다른 Actor를 View Target으로 사용하고 있다면 PlanetX Viewpoint Component도 실제 View Target Actor에 추가해야 합니다.

> **중요**
>
> Coordinate Component만 추가하고 Viewpoint Component를 추가하지 않으면 플레이어 카메라를 기준으로 Transition 상태를 계산할 수 없습니다.

#### Movement Component는 필요한 경우에만 추가

기존 Character Movement나 프로젝트 고유 이동 시스템을 사용하고 있다면 **PlanetX Movement Component를 반드시 추가할 필요는 없습니다.**

PlanetX Movement Component는 다음과 같은 기능이 필요한 경우에 추가하세요.

- 행성 중심 방향의 중력
- Surface Frame 기반 이동 입력
- 행성 표면 Up 방향 정렬
- PlanetX Movement Handoff

빠른 시작에서 단순히 Orbit ↔ Ground 전환을 확인하는 목적이라면 기존 이동 Component를 그대로 사용할 수 있습니다.

---

### 12. 자동 Same World Entry 활성화하기

Same World에서 플레이어가 Transition 영역을 통과할 때 자동으로 Ground와 Orbit 좌표 사이를 이동하도록 설정합니다.

현재 PlanetX에서는 이 설정을 Blueprint에서 활성화할 수 있습니다.

Player Actor Blueprint의 **Event BeginPlay**에서 앞에서 추가한 PlanetX Coordinate Component를 사용하여 다음 두 함수를 호출합니다.

```text
Event BeginPlay
    │
    ├─ Set Automatic Same World Entry Enabled
    │      Enabled = true
    │
    └─ Set Automatic Same World Return Enabled
           Enabled = true
```

두 함수 모두 **PlanetX Coordinate Component**의 함수입니다.

첫 번째 옵션은 플레이어가 Ground 영역으로 들어왔을 때 Orbit 좌표에서 실제 Ground 좌표로 이동하도록 합니다.

두 번째 옵션은 다시 Orbit 영역으로 나갈 때 Ground에서 Orbit 좌표로 복귀하도록 합니다.

빠른 시작에서는 Return Pose와 Movement Continuity의 기본 정책을 그대로 사용하면 됩니다.

기본적으로 Ground에서 이동한 결과를 유지하면서 Orbit 좌표로 이어지고, 필요한 경우 두 좌표 Frame 사이에서 이동 상태가 변환됩니다.

Blueprint를 Compile하고 저장합니다.

---

### 13. 테스트 시작 위치 확인하기

Orbit → Ground 전환을 확인하려면 플레이어가 처음부터 Ground 영역 안에 있어서는 안 됩니다.

Transition Endpoint의 Debug Cylinder를 확인하고, 플레이어의 시작 위치를 **Ground Transition 영역 바깥쪽**에 배치하세요.

정확한 거리는 Section의 크기에 따라 달라지므로 고정된 숫자로 맞출 필요는 없습니다.

중요한 것은 플레이어 또는 카메라가 다음 순서로 이동할 수 있어야 한다는 점입니다.

```text
Orbit
  ↓
Transition
  ↓
Ground
```

그리고 반대로 이동하면 다음 순서가 됩니다.

```text
Ground
  ↓
Transition
  ↓
Orbit
```

기존 Character가 지상 이동만 가능해 Orbit 영역에서 Ground 쪽으로 이동할 수 없다면, 테스트용 Pawn이나 비행 가능한 이동 방식을 사용하세요.

PlanetX는 프로젝트의 Pawn 이동 방식을 대신 제공하지 않습니다.

---

### 14. 실행 전 검증하기

모든 설정이 끝났다면 **Save All**을 실행합니다.

Planet Asset을 열고 **Diagnostics**에서 다음을 실행합니다.

```text
Full Validate
```

또는 PlanetX Mode의 **Validate** Palette에서도 현재 World 구성을 확인할 수 있습니다.

단축키는 `Alt+6`입니다.

빠른 시작에서는 최소한 다음 항목에 Error가 없어야 합니다.

- Planet Actor가 존재하고 Planet Asset이 연결되어 있음
- Same World Section과 Level Pair가 유효함
- Proxy BakeData가 연결되어 있음
- Runtime에서 표시할 Proxy가 존재함
- Transition Endpoint가 정확히 하나 존재함
- Environment Manager가 정확히 하나 존재함
- Planet과 Ground의 Same World Align이 올바름

![Error와 Warning이 모두 0으로 표시된 PlanetX Mode Validate Palette](/images/docs/qs-14-diagnostics-ready.png)

Info 항목은 남아 있을 수 있습니다. 첫 검증 통과 기준은 `Errors 0`, `Warnings 0`입니다.

Validation Error가 있다면 PIE로 넘어가기 전에 먼저 해결하세요.

일부 중요한 설정 오류는 PlanetX가 PIE 시작을 차단할 수 있습니다.

---

### 15. PIE에서 Orbit ↔ Ground 전환 확인하기

이제 **Play**를 눌러 PIE를 시작합니다.

PlanetX Mode의 **Runtime** Palette를 엽니다.

단축키는 `Alt+2`입니다.

Runtime Palette에서는 현재 Planet 등록 상태와 Transition 상태를 확인할 수 있습니다.

플레이어를 Ground 방향으로 이동시키면서 Transition 상태를 확인하세요.

정상적인 경우 상태가 다음과 같이 변합니다.

```text
Orbit
→ Transition
→ Ground
```

Ground 상태에 도달하면 PlanetX가 Same World Section의 실제 Ground 위치로 플레이어 상태를 연결합니다.

다시 Ground에서 멀어지면 다음 순서로 복귀합니다.

```text
Ground
→ Transition
→ Orbit
```

전환 과정에서 다음 항목을 확인하세요.

- Section Proxy와 실제 Ground가 크게 어긋나지 않는지
- 플레이어 위치가 갑자기 엉뚱한 장소로 이동하지 않는지
- 카메라 방향이 정상적으로 유지되는지
- Ground 진입 후 기존 Gameplay가 정상적으로 동작하는지
- Orbit으로 돌아갈 때 이동 흐름이 자연스럽게 이어지는지

아래 예시는 완성된 행성 비주얼이 표시된 상태로 `GroundLevel`이 실제 PIE에서 실행 중인 화면입니다. 이 이미지는 PIE 렌더링 결과를 확인하는 용도이며, 실제 Orbit, Transition, Ground 상태 순서는 앞에서 설명한 **Runtime** Palette에서 별도로 확인하세요.

![완성된 PlanetX 행성, Environment Manager, Transition Endpoint와 Player Actor가 있는 GroundLevel PIE 실행 화면](/images/docs/qs-15-pie-result.png)

예시 화면의 노란색 Placement 안내는 배치 편집 대상으로 선택된 Actor가 없다는 뜻이며 Validation Error가 아닙니다.

---

### 전환이 동작하지 않는다면

자동 전환이 발생하지 않는 경우 다음 항목을 순서대로 확인하세요.

1. **PlanetX Planet에 올바른 Planet Asset이 지정되어 있는지 확인합니다.**
2. PlanetX Mode의 Align을 실행했는지 확인합니다.
3. **Environment Manager가 하나 존재하는지 확인합니다.**
4. **Transition Endpoint가 하나 존재하는지 확인합니다.**
5. Player Actor의 Coordinate Component에 올바른 **Reference Planet Actor**와 **Reference Section Id**가 지정되어 있는지 확인합니다.
6. 실제 PlayerController의 View Target에 **PlanetX Viewpoint Component**가 있는지 확인합니다.
7. View Target에 활성 **Camera Component**가 있는지 확인합니다.
8. Blueprint에서 **Automatic Same World Entry**와 **Automatic Same World Return**을 활성화했는지 확인합니다.
9. Proxy Bake 결과가 오래된 상태라면 다시 **Scan Sources → Bake**를 실행합니다.
10. 비주얼이 오래된 상태라면 **Planet Asset Editor > Preview**에서 다시 **Apply & Build**를 실행합니다.
11. 마지막으로 **Full Validate**에서 남아 있는 Error를 확인합니다.

문제가 계속된다면 [진단 도구](/docs/ko/diagnostic-tools)와 [Runtime 이동 문제 해결](/docs/ko/runtime-travel-troubleshooting)을 참고하세요.

---

### 완료

여기까지 정상적으로 동작했다면 PlanetX의 가장 기본적인 제작 흐름을 한 번 완료한 것입니다.

```text
Planet Asset
    ↓
Ground Level
    ↓
Proxy Bake
    ↓
Same World Section
    ↓
Planet Visual Build
    ↓
PlanetX Planet + Align
    ↓
Environment Manager
    ↓
Transition Endpoint
    ↓
Player Coordinate + Viewpoint
    ↓
Orbit ↔ Ground
```

다음 단계에서는 필요에 따라 **Planet Asset Editor > Preview**에서 행성의 표면과 환경을 더 세밀하게 편집하거나, 여러 Section을 추가하거나, 서로 다른 Level을 연결하는 External Level 방식을 구성할 수 있습니다.

## 설치

PlanetX는 Fab을 통해 Unreal Engine에 설치할 수 있습니다.

### 사전 조건

PlanetX를 설치하기 전에 다음 환경을 확인해 주세요.

- Unreal Engine 5.8
- GeometryProcessing 플러그인
- PCG 플러그인

PlanetX는 필요한 Unreal Engine 플러그인을 함께 활성화하도록 구성되어 있습니다.

> 소스에서 직접 PlanetX를 빌드하거나 Source Build Unreal Engine을 사용하는 경우에는 대상 플랫폼에 맞는 C++ 개발 환경과 Toolchain이 추가로 필요할 수 있습니다.

### Fab에서 설치하기

1. **Epic Games Launcher**를 실행합니다.
2. **Unreal Engine > Library**로 이동합니다.
3. **Fab Library**에서 PlanetX를 찾습니다.
4. **Install to Engine**을 클릭합니다.
5. PlanetX를 사용할 Unreal Engine 5.8 설치를 선택합니다.
6. 설치가 완료되면 Unreal Editor를 실행합니다.

Fab Library에는 PlanetX가 지원하는 Unreal Engine 버전만 설치 대상으로 표시됩니다.

설치 후 프로젝트를 열고 **Edit > Plugins**에서 PlanetX가 활성화되어 있는지 확인하세요.  
처음 활성화한 경우 Unreal Editor를 다시 시작해야 할 수 있습니다.

### 수동 설치

Fab을 사용하지 않고 별도로 제공된 PlanetX 패키지를 설치해야 하는 경우에는 프로젝트의 `Plugins` 디렉터리에 직접 설치할 수 있습니다.

1. Unreal Editor를 종료합니다.
2. PlanetX 디렉터리를 다음 위치에 복사합니다.

   ```
   <Project>/Plugins/PlanetX
   ```

3. 프로젝트를 다시 엽니다.
4. 필요한 경우 Project Files를 재생성하고 프로젝트를 빌드합니다.
5. **Edit > Plugins**에서 PlanetX가 활성화되어 있는지 확인합니다.

수동 설치는 개발용 빌드나 별도로 제공된 패키지를 사용하는 경우를 위한 방법입니다. 일반적인 설치에는 Fab 사용을 권장합니다.

### 설치 확인

설치가 완료되었다면 다음 항목을 확인할 수 있습니다.

- **Content Browser > Add > Miscellaneous**에서 **Planet Asset**을 생성할 수 있습니다.
- Editor 메뉴에서 **PlanetX Proxy Bake Editor**를 열 수 있습니다.
- Editor의 **PlanetX Mode**를 사용할 수 있습니다.

위 항목이 정상적으로 표시된다면 PlanetX 설치가 완료된 것입니다.

### Plugin Content 보기

PlanetX에는 일부 Unreal Engine Content Asset이 포함되어 있습니다.

PlanetX의 Plugin Content를 직접 확인해야 하는 경우 Content Browser의 설정에서 **Show Plugin Content**를 활성화하세요.

일반적인 PlanetX 사용에는 Plugin Content를 직접 수정할 필요가 없습니다.

### 문서 열기

최신 PlanetX 문서는 [온라인 문서 사이트](https://jungle-labx.github.io/PlanetX-Docs/)에서 확인할 수 있습니다.

인터넷에 연결할 수 없는 환경에서는 설치된 PlanetX 플러그인의 다음 파일을 직접 열어 오프라인 문서를 사용할 수 있습니다.

```text
PlanetX/Docs/index.html
```

문서를 연 뒤 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)부터 진행하세요. 이 문서가 공식 첫 사용 경로입니다.

## 첫 Planet Asset 만들기

Planet Asset은 PlanetX에서 하나의 행성을 정의하는 중심 Asset입니다.

행성의 크기와 좌표 기준을 저장하며, 이후 생성되는 Section, Proxy Bake 결과와 행성 비주얼이 모두 이 Planet Asset을 기준으로 연결됩니다.

### Planet Asset 생성하기

**Content Browser > Add > Miscellaneous**에서 **Planet Asset**을 선택합니다.

생성 창에서는 다음 세 가지 기본 정보를 설정합니다.

- Planet ID
- Planet Radius
- Coordinate Convention

처음 PlanetX를 사용한다면 Coordinate Convention은 기본값을 유지하고, **Planet ID와 Planet Radius만 확인한 뒤 생성해도 충분합니다.**

---

### Planet ID

**Planet ID**는 PlanetX가 행성을 구분하기 위해 사용하는 고유한 이름입니다.

예를 들어 지구와 화성을 각각 만든다면 다음처럼 지정할 수 있습니다.

```text
Earth
Mars
```

Planet ID는 프로젝트 안의 다른 Planet Asset과 중복되지 않도록 지정하세요.

파일 이름이나 화면에 표시하기 위한 이름보다는, 프로젝트가 진행되는 동안 계속 유지할 **안정적인 식별자**로 정하는 것을 권장합니다.

예를 들어 다음과 같이 사용하는 것이 좋습니다.

```text
Earth
Mars
Moon
MainPlanet
```

반대로 작업 단계에 따라 자주 바뀔 가능성이 있는 이름은 피하는 것이 좋습니다.

```text
TestPlanet
NewPlanet
Planet_Final_Final2
```

> 같은 행성을 여러 Level에서 사용할 때는 새로운 Planet Asset을 다시 만드는 것이 아니라 **같은 Planet Asset을 재사용**하는 것이 기본적인 사용 방법입니다.

여러 World에서 동일한 행성의 서로 다른 Runtime 인스턴스를 구분해야 하는 고급 구성에서는 별도의 Planet Binding을 사용할 수 있습니다.

처음 Planet Asset을 만드는 단계에서는 Planet Binding을 신경 쓰지 않아도 됩니다.

---

### Planet Radius

**Planet Radius**는 행성 중심에서 기본 표면까지의 거리를 의미합니다.

Planet Asset 생성 창에서는 **km 단위**로 입력합니다.

Same World 빠른 시작에서 사용할 첫 Planet은 다음과 같이 입력합니다.

```text
Planet Radius
    100 km
```

PlanetX는 이 값을 기준으로 다음과 같은 요소를 계산합니다.

- 행성의 전체 크기
- Section의 행성 표면 배치
- Section Proxy의 곡면 변환
- 행성 비주얼 생성
- Orbit과 Ground 사이의 좌표 변환

따라서 Planet Radius는 단순히 화면에 보이는 행성 Mesh의 크기만 결정하는 값이 아닙니다.

**실제 제작을 시작하기 전에 사용할 행성 크기를 먼저 정하는 것을 권장합니다.**

> Planet Radius는 이후 Section과 Proxy Bake의 기준이 되는 중요한 값입니다.
>
> Proxy Bake와 행성 제작을 시작한 뒤에는 반지름을 임의로 변경하기보다, 다른 크기의 행성이 필요하다면 새로운 Planet Asset을 만드는 것을 권장합니다.

---

### Coordinate Convention

**Coordinate Convention**은 PlanetX가 행성의 북쪽과 경도 방향을 Unreal Engine World에서 어느 방향으로 해석할지를 정의합니다.

쉽게 말하면 다음과 같은 질문에 대한 규칙입니다.

```text
행성의 북극은 어느 방향인가?
경도 0°는 어느 방향인가?
행성의 동쪽은 어느 방향인가?
```

처음 PlanetX를 사용하는 경우에는 **기본 Coordinate Convention을 그대로 사용하는 것을 권장합니다.**

일반적인 PlanetX 작업에서는 이 설정을 직접 변경할 필요가 없습니다.

기존 프로젝트에서 이미 특정한 World 축 규칙을 사용하고 있거나, 다른 좌표 시스템과 PlanetX를 연동해야 하는 경우에만 Coordinate Convention을 변경하세요.

> Coordinate Convention을 변경하면 Section 배치와 좌표 변환의 기준 자체가 달라집니다.
>
> 특별한 이유가 없다면 프로젝트 제작을 시작한 이후에는 변경하지 않는 것이 좋습니다.

---

### Planet Asset 생성 완료하기

설정을 확인했다면 Planet Asset을 생성합니다.

처음 테스트에서는 예를 들어 다음과 같은 설정으로 시작할 수 있습니다.

```text
Planet ID
    FirstPlanet

Planet Radius
    100 km

Coordinate Convention
    Default
```

생성이 완료되면 Content Browser에 새로운 Planet Asset이 나타납니다.

Planet Asset을 더블 클릭하면 **Planet Asset Editor**가 열립니다.

---

### Planet Asset Editor 확인하기

Planet Asset Editor는 PlanetX 행성을 제작하고 상태를 확인하는 중심 Editor입니다.

다음은 코드와 동일한 이름의 다섯 도킹 탭입니다. 기본 레이아웃에서는 중앙의 **Preview**와 오른쪽의 **Configuration**이 열립니다. 다른 탭이 닫혀 있으면 **Window > Planet Asset**에서 다시 여세요.

#### Overview

현재 Planet Asset의 기본 상태와 주요 작업으로 이동할 수 있는 탭입니다.

처음 Asset을 열었다면 이곳에서 전체 상태를 확인할 수 있습니다.

#### Sections

행성에 연결된 Ground 영역인 **Section**을 확인하고 관리하는 탭입니다.

처음 Planet Asset을 만들었을 때는 Section이 아직 없어도 정상입니다.

첫 Proxy Bake를 실행하면 Ground Level에 대응하는 Section이 생성되어 Planet Asset에 연결됩니다.

#### Configuration

행성의 제작 및 동작에 사용되는 추가 설정을 확인하는 탭입니다.

처음 빠른 시작을 진행할 때는 대부분의 값을 기본값으로 유지해도 됩니다.

#### Preview

Section Proxy와 나머지 행성 표면을 함께 보면서 행성의 비주얼을 제작하는 탭입니다.

Proxy Bake를 완료한 뒤 본격적으로 사용하게 됩니다.

#### Diagnostics

Planet Asset과 연결된 Section, Proxy Bake 결과와 기타 설정에 문제가 없는지 검사하는 탭입니다.

문제가 발생했을 때 가장 먼저 확인하기 좋은 공간입니다.

---

### 처음에는 무엇을 해야 하나요?

Planet Asset을 만든 직후에는 복잡한 설정을 모두 수정할 필요가 없습니다.

우선 다음 세 가지만 확인하세요.

1. **Planet ID가 다른 Planet Asset과 중복되지 않는지 확인합니다.**
2. **Planet Radius가 만들고자 하는 행성 크기에 맞는지 확인합니다.**
3. 특별한 좌표 규칙이 필요하지 않다면 **Coordinate Convention은 기본값을 유지합니다.**

Planet Asset을 저장하면 기본 준비가 완료됩니다.

**Section을 직접 추가할 필요는 없습니다.**

다음 단계에서 Ground Level을 대상으로 첫 **Proxy Bake**를 실행하면 PlanetX가 필요한 Section과 연결 정보를 생성합니다.

> Planet Asset을 만들었다면 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)을 따라 첫 Ground Level을 행성에 연결해 보세요.

## 고급 가이드 — Multi-Level Handoff

이 가이드에서는 **Orbit World와 Ground World를 서로 다른 Level로 구성**하고, PlanetX의 Level Handoff를 사용하여 두 World 사이에서 플레이어의 위치와 이동 상태를 이어가는 방법을 설명합니다.

완료하면 다음과 같은 구성이 만들어집니다.

- Planet Asset 1개
- Orbit 전용 Level 1개
- 실제 플레이에 사용할 Ground Level 1개
- Level Handoff Section 1개
- Bake된 Section Proxy
- Bake된 Runtime Preview World
- Runtime용 행성 비주얼
- Orbit World의 PlanetX Planet Actor
- Environment Manager
- Orbit Transition Endpoint
- Orbit → Ground → Orbit으로 이동하는 Player Actor

> **중요**
>
> Level Handoff에서는 PlanetX가 Level을 직접 열지 않습니다.
>
> PlanetX는 이동 직전의 플레이어 위치, 회전, 이동 상태와 목적지를 저장하고, 새로운 World가 열린 뒤 해당 상태를 복원합니다.
>
> 실제 `Open Level`, Pawn 생성, Possess, GameMode 등의 흐름은 프로젝트에서 직접 관리합니다.

이 고급 워크플로를 사용하기 전에 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)을 완료하세요. 이 문서는 Planet Asset, Proxy Bake, Visual Build, PlanetX Mode와 기본 전환 개념을 이미 이해하고 있다고 가정합니다.

---

### 시작하기 전에

Level Handoff에서는 서로 다른 두 개의 Level이 필요합니다.

이 가이드에서는 다음 이름을 예시로 사용합니다.

```text
L_Orbit
L_Ground
```

#### L_Orbit

우주에서 행성을 보여주고 플레이어가 행성으로 접근하는 Level입니다.

이 Level에는 이후 다음 요소를 배치합니다.

```text
L_Orbit
├─ PlanetX Planet
├─ PlanetX Environment Manager
├─ PlanetX Transition Endpoint
└─ Orbit Player / SpaceShip
```

#### L_Ground

실제로 지표면에서 플레이하는 기존 Unreal Engine Level입니다.

Landscape, Static Mesh, Foliage와 실제 Gameplay Actor 등을 평소 Unreal Engine Level을 제작하듯 구성하면 됩니다.

```text
L_Ground
├─ Landscape
├─ Buildings
├─ Foliage
├─ Gameplay Actors
└─ Ground Player
```

> Ground Level을 PlanetX 전용 형식으로 다시 만들 필요는 없습니다.
>
> 기존 프로젝트에서 사용하던 Ground Level을 그대로 사용할 수 있습니다.

두 Level은 **반드시 저장된 서로 다른 World Asset**이어야 합니다.

```text
L_Orbit != L_Ground
```

Level Handoff는 Orbit World와 Ground World가 같은 Package를 가리키는 구성을 허용하지 않습니다.

### Phase 체크포인트

Level Travel, Pawn 수명과 Possess는 프로젝트가 관리하므로 이 문서는 의도적으로 상세합니다. 34단계를 다섯 Phase로 나누어 진행하고 현재 Phase의 결과를 통과하기 전에는 다음으로 넘어가지 마세요.

| Phase | 단계 | 다음 Phase로 진행하기 위한 결과 |
| --- | --- | --- |
| A. External Section 제작 | 1-10 | Section은 Level Handoff, Bake는 `Linked`, Runtime Preview는 연결되고 Renderable, Planet Visual Build 성공 |
| B. 두 World 준비 | 11-16 | Orbit Planet Align 완료, Environment Manager와 Orbit Endpoint가 각각 하나, Orbit/Ground Player에 필수 Component 존재 |
| C. Orbit → Ground 이동 | 17-25 | Surface Query가 의도한 Section에 Hit, Begin Level Handoff 성공, 정확한 Ticket이 Travel 뒤에도 유지, 완료 결과에 유효한 Ground 도착 정보와 Journey ID 존재 |
| D. Ground → Orbit 복귀 | 27-30 | Begin Return Level Handoff 성공, Return Ticket이 Travel 뒤에도 유지, Ticket 적용 후 Journey 완료 |
| E. 전체 흐름 검증 | 31-34 | Runtime Preview가 Renderable, Full Validate에 Error 없음, Orbit → Ground → Orbit 전체 테스트 성공 |

26단계는 선택 가능한 Travel Receiver 방식입니다. 첫 테스트에서는 22-25단계의 명시적 완료 방식과 Travel Receiver 중 하나만 선택하고 두 방식을 함께 사용하지 마세요.

---

### 1. Planet Asset 준비

먼저 Planet Asset을 하나 만듭니다.

Planet Asset 생성 과정은 [첫 Planet Asset 만들기](/docs/ko/create-first-planet) 문서에서 자세히 설명합니다.

해당 문서를 따라 다음 단계까지만 완료한 뒤 이 페이지로 돌아오세요.

- Planet Asset 생성
- Planet ID 설정
- Planet Radius 설정
- Planet Asset 저장

**Section은 아직 직접 만들 필요가 없습니다.**

Ground Level에서 첫 Proxy Bake를 실행하면 PlanetX가 필요한 Section과 Level Pair를 자동으로 생성합니다.

---

### 2. Ground Level 열기

먼저 **L_Ground**를 엽니다.

```text
L_Ground
```

Proxy Bake는 현재 열려 있는 Ground Level을 Source World로 사용합니다.

따라서 실수로 `L_Orbit`을 연 상태에서 Bake하지 않도록 주의하세요.

Ground Level 안에 최소한 하나 이상의 Proxy Bake 대상이 있어야 합니다.

예를 들면 다음과 같습니다.

- Landscape
- Static Mesh
- Instanced Static Mesh
- Hierarchical Instanced Static Mesh
- Foliage

작업을 시작하기 전에 Level을 저장하는 것을 권장합니다.

PIE 또는 Simulate가 실행 중이라면 먼저 종료하세요.

---

### 3. Proxy Bake Editor 열기

`L_Ground`가 열린 상태에서 Unreal Editor의 **Tools** 메뉴에서 **PlanetX** 영역을 찾고 **Proxy Bake Editor**를 선택합니다. 첫 External Section에서는 이 단일 경로만 사용합니다.

Proxy Bake Editor가 열리면 먼저 **Target Planet Asset**을 확인합니다.

```text
1 Target Planet Asset
└─ Planet Asset
```

앞 단계에서 만든 Planet Asset을 지정하세요.

첫 Bake 전에는 선택할 기존 Section이 없습니다.

---

### 4. Runtime Role을 External Level로 설정하기

Proxy Bake Editor에서 **2 Runtime Role**을 펼칩니다.

**Presentation**을 다음과 같이 설정합니다.

```text
Presentation
└─ External Level
```

UI에서는 `External Level`이라고 표시되며, Planet Asset에는 이 Section이 **Level Handoff** 방식으로 저장됩니다.

External Level은 다음 구조를 의미합니다.

```text
Orbit World
    ↓
PlanetX Runtime Preview
    ↓
게임이 World Travel 실행
    ↓
Ground World
```

#### Ground World 확인

**Ground World**에는 현재 열려 있는 `L_Ground`가 자동으로 표시됩니다.

```text
Ground World
    L_Ground
```

Ground World는 직접 선택하는 값이 아니라 현재 Scan/Bake 대상 Source World를 기준으로 결정됩니다.

#### Planet World 지정

External Level을 선택하면 **Planet World** 항목이 표시됩니다.

여기에 앞에서 준비한 Orbit Level을 지정합니다.

```text
Planet World
    L_Orbit
```

최종적으로 다음과 같아야 합니다.

```text
Presentation
    External Level

Ground World
    L_Ground

Planet World
    L_Orbit
```

> `Planet World`와 `Ground World`는 서로 다른 Level이어야 합니다.
>
> 같은 Level을 지정하면 Level Handoff 계약이 유효하지 않으므로 Bake를 진행할 수 없습니다.

빠른 시작에서는 Handoff Backend를 별도로 변경할 필요가 없습니다.

현재 기본 계약은 `Open Level`을 기준으로 저장되지만, 실제 `Open Level` 실행 자체는 이후 게임 Blueprint에서 수행합니다.

---

### 5. Source Scope 선택하기

**3 Source Scope**를 펼칩니다.

일반적인 첫 테스트에서는 다음 설정을 권장합니다.

```text
Source Scope
└─ Current Level
```

각 Source Scope의 의미는 다음과 같습니다.

- **Selected Actors** — 현재 선택한 Actor만 Bake합니다.
- **Current Level** — 현재 Ground Level의 Actor를 Bake하며 첫 테스트에 가장 적합합니다.
- **Loaded Levels** — 현재 로드되어 있는 Streaming Level이나 Level Instance까지 포함합니다.
- **Reviewed Set** — 이전에 검토한 Source 집합을 다시 사용합니다.

처음에는 **Current Level**을 사용하는 것이 가장 단순합니다.

Bake Quality 역시 특별한 이유가 없다면 다음 값을 권장합니다.

```text
High (Recommended)
```

---

### 6. Ground Source 검색하기

설정이 끝났다면 **Scan Sources**를 클릭합니다.

단축키는 `F5`입니다.

```text
Scan Sources
```

PlanetX가 현재 Ground Level을 조사하고 Proxy로 변환할 Source를 찾습니다.

Scan이 끝나면 **Source Review**에 발견된 항목이 나타납니다.

#### Source Review 확인

처음에는 모든 항목을 수정할 필요는 없습니다.

다음 항목이 있는지만 확인하세요.

- 사용하려던 Actor가 검색되지 않음
- `Manual Review` 상태의 Source가 있음
- `Unsupported` Source가 있음
- Bake에 사용되는 Source가 하나도 없음
- 의도하지 않은 Actor가 Bake 대상으로 들어감

지원되는 Landscape, Static Mesh, ISM/HISM, Foliage 등은 일반적으로 자동으로 분류됩니다.

Source의 **Use** 또는 **Role**을 직접 변경했다면 반드시 다음 버튼을 클릭하세요.

```text
Apply Source Changes
```

변경하지 않았다면 별도로 적용할 필요는 없습니다.

---

### 7. Proxy Bake 실행하기

Source Review를 마쳤다면 다음 버튼을 클릭합니다.

```text
BAKE IN EDITOR
```

단축키는 `Ctrl+B`입니다.

Bake에서는 Ground Level의 Geometry뿐 아니라 Level Handoff에서 사용할 여러 Runtime 데이터도 함께 생성됩니다.

처음 Bake하는 Planet Asset이라면 이 과정에서 다음 항목이 자동으로 만들어집니다.

```text
Planet Asset
├─ Section
├─ Level Pair
├─ Proxy Bake Data
└─ Runtime Preview World
```

#### Runtime Preview World란?

External Level에서는 실제 `L_Ground`를 Orbit World에 통째로 로드하지 않습니다.

대신 Proxy Bake가 **시각 표현만 포함하는 Runtime Preview World**를 별도로 생성합니다.

이 Preview는 행성에 가까이 접근할 때 Ground와 비슷한 모습을 보여주기 위한 것입니다.

다음과 같은 실제 Gameplay 기능을 복제하는 Level은 아닙니다.

- GameMode
- PlayerStart
- Pawn
- Controller
- Gameplay Actor Logic
- Collision Gameplay
- Navigation

즉 다음 두 World는 서로 다른 역할을 가집니다.

```text
Runtime Preview World
    = 전환 중 보여주기 위한 시각 표현

L_Ground
    = 실제 Gameplay World
```

이 차이는 Level Handoff에서 매우 중요합니다.

---

### 8. Bake 결과 확인하기

Bake가 완료되면 Planet Asset Editor로 돌아갑니다.

**Sections**에서 새 Section을 선택하세요.

빠른 시작에서는 대략 다음 상태를 확인하면 됩니다.

| 항목 | 예상 상태 |
| --- | --- |
| Runtime Role | `Level Handoff` |
| Ground World | `L_Ground` |
| Planet / Orbit World | `L_Orbit` |
| Bake | `Linked` |
| Runtime Preview | 연결됨 |
| Transition | 사용 가능 |

Proxy Bake Editor에서는 **Open Results** 또는 `Ctrl+Shift+O`를 사용하여 최신 Bake 결과를 Content Browser에서 확인할 수도 있습니다.

이미 동일한 Section에 Bake 결과가 존재한다면 버튼이 다음과 같이 표시될 수 있습니다.

```text
REBUILD IN EDITOR
```

이는 기존 Section을 새 Ground Source 결과로 다시 Bake하는 동작입니다.

---

### 9. 행성에서 Section 위치 확인하기

Planet Asset Editor의 **Preview**를 엽니다.

Level Handoff Section은 Same World Section과 달리 행성 표면의 원하는 위치에 배치할 수 있습니다.

처음 테스트에서는 자동으로 만들어진 위치를 그대로 사용해도 됩니다.

Preview에서 다음 항목을 확인하세요.

- Section Proxy가 행성 표면에 나타남
- Proxy의 방향이 정상임
- 다른 Section과 겹치지 않음
- 행성 표면과 심각한 Gap이 없음

여러 Ground Level을 하나의 Planet Asset에 연결하는 경우에는 각각 별도의 External Level Section으로 구성할 수 있습니다.

```text
Planet
├─ Section_A → Ground_A
├─ Section_B → Ground_B
└─ Section_C → Ground_C
```

이번 빠른 시작에서는 Section 하나만 사용합니다.

---

### 10. 행성 비주얼 만들기

**Planet Asset Editor > Preview**에서 행성의 기본 표면을 설정합니다.

**Completion Material**에 행성에서 사용할 Material을 지정하세요.

```text
Preview
└─ Basic
   └─ Planet
      └─ Completion Material
```

처음에는 Terrain, Padding 등의 세부 설정은 기본값으로 두어도 됩니다.

Preview에서 다음 정도만 확인하면 충분합니다.

- 행성 전체 표면이 정상적으로 표시됨
- Bake한 Section이 행성 위에 표시됨
- Section 주변에 큰 빈 공간이 없음
- Geometry가 심하게 뒤집혀 있지 않음

문제가 없다면 **Planet Visual Build**에서 다음 버튼을 클릭합니다.

```text
Apply & Build
```

PlanetX가 Preview 설정을 Planet Asset에 적용하고 Runtime에서 사용할 최종 행성 Visual을 생성합니다.

Build가 성공했다면 Planet Asset을 저장합니다.

---

### 11. Orbit World에 Planet Actor 배치하기

이제 **L_Orbit**을 엽니다.

```text
L_Orbit
```

Place Actors에서 다음 Actor를 검색합니다.

```text
PlanetX Planet
```

Level에 PlanetX Planet Actor를 하나 배치합니다.

Actor를 선택한 뒤 **Planet Component**에서 다음 값을 설정합니다.

```text
Planet Asset
    → 앞에서 만든 Planet Asset

Auto Register Runtime
    Enabled
```

하나의 Planet Actor만 사용하는 빠른 시작에서는 별도의 Planet Binding ID를 직접 지정할 필요는 없습니다.

---

### 12. Planet Actor 정렬하기

Level Editor에서 **PlanetX Mode**를 엽니다.

Scene에서 방금 배치한 Planet Actor가 Active Planet인지 확인하세요.

Planet Asset에 Same World Section이 하나도 없더라도 PlanetX는 첫 번째 유효한 External Section의 Ground Sync Mapping을 기준으로 정렬 Anchor를 결정할 수 있습니다.

따라서 Level Handoff만 사용하는 Planet도 별도의 Same World Section을 만들 필요가 없습니다.

PlanetX Mode의 **Align** 버튼을 실행합니다.

Align은 Planet Actor의 Rotation이나 Scale을 임의로 변경하지 않고 필요한 위치 보정을 적용합니다.

완료 후 Validate에서 다음과 같은 정렬 오류가 없어야 합니다.

```text
Planet Actor location is not aligned
to the canonical Section's baked Ground Sync Mapping.
```

> External Level 구성에서도 Align 단계를 생략하지 않는 것을 권장합니다.
>
> Section 자체의 행성 위 위치와 방향은 **Planet Asset Editor > Preview**에서 편집하고, Planet Actor의 World 배치는 PlanetX Mode의 Align을 사용합니다.

---

### 13. Environment Manager 추가하기

PlanetX Mode에서 **Environment** Palette를 엽니다.

현재 Planet에 Environment Manager가 없다면 **Add Manager**를 클릭합니다.

```text
Environment
└─ Add Manager
```

PlanetX가 현재 활성 Planet에 연결된 Environment Manager를 생성합니다.

PlanetX는 개별 대기나 구름 기능을 사용하지 않더라도 Environment Manager를 Planet의 Runtime infrastructure로 사용하므로 빠른 시작에서도 하나를 배치합니다.

한 Planet에는 하나의 Environment Manager만 유지하세요.

---

### 14. Orbit Transition Endpoint 추가하기

PlanetX Mode에서 **Transition** Palette를 엽니다.

현재 Section에 Endpoint가 없다면 다음 상태가 표시됩니다.

```text
No Transition Endpoint for this Level.
```

**Add Endpoint**를 클릭합니다.

```text
Add Endpoint
```

현재 `L_Orbit`은 Level Pair의 Planet World이므로 생성되는 Endpoint는 자동으로 다음 역할을 가집니다.

```text
Endpoint Role
    Orbit
```

PlanetX는 다음 값도 현재 Section에 맞게 연결합니다.

- Planet ID
- Section ID
- Level Pair ID
- Planet Actor
- Planet Asset
- Environment Manager

#### Transition Cylinder

기본 설정은 그대로 유지하는 것을 권장합니다.

```text
Auto Size Transition Cylinder To Section Bounds
    Enabled
```

PlanetX는 Section의 크기를 기준으로 Transition 영역을 계산합니다.

Viewport에서 Cylinder Visualization을 통해 영역을 확인할 수 있습니다.

이 영역은 플레이어의 Viewpoint가 행성의 Section으로 접근하는 동안 다음 상태를 계산하는 데 사용됩니다.

```text
Orbit
   ↓
Transition
   ↓
Ground Presentation
```

External Level에서는 마지막 단계에서 실제 `L_Ground`가 Orbit World에 나타나는 것이 아니라 **Bake된 Runtime Preview World**가 Ground Presentation 역할을 합니다.

실제 `L_Ground`로 넘어가는 것은 이후 별도의 Level Handoff 호출입니다.

---

### 15. Orbit Player를 PlanetX에 연결하기

Orbit에서 사용할 Pawn 또는 Character Blueprint를 엽니다.

이 문서에서는 다음 이름을 예로 사용합니다.

```text
BP_OrbitPlayer
```

다음 Component를 추가하세요.

```text
BP_OrbitPlayer
├─ Camera Component
├─ PlanetX Coordinate Component
└─ PlanetX Viewpoint Component
```

#### Coordinate Component

다음과 같이 설정합니다.

```text
Auto Register Runtime
    Enabled

Representation Domain
    Orbit

Reference Planet Actor
    → L_Orbit의 PlanetX Planet

Reference Section Id
    → 앞에서 Bake한 Section
```

Level에 미리 배치된 Pawn이라면 Details에서 Planet Actor를 직접 지정할 수 있습니다.

런타임에 Spawn되는 Pawn이라면 BeginPlay에서 Planet Actor 참조를 설정한 뒤 **Refresh Coordinate Snapshot**을 호출하는 방식을 사용할 수 있습니다.

#### Viewpoint Component

다음 기본 설정을 유지합니다.

```text
Auto Register Runtime
    Enabled

Can Drive Transition State
    Enabled
```

PlayerController가 실제로 `BP_OrbitPlayer`를 ViewTarget으로 사용하고 있는지도 확인하세요.

또한 ViewTarget에 활성 Camera Component가 있어야 합니다.

이 Viewpoint를 기준으로 PlanetX가 Transition Alpha와 Runtime Preview의 Load/Visibility를 계산합니다.

---

### 16. Ground Player 준비하기

이제 `L_Ground`에서 사용할 Pawn 또는 Character를 준비합니다.

예를 들어 다음과 같습니다.

```text
BP_GroundPlayer
```

Level Handoff의 **위치 복원 자체만을 위해 Ground World에 Planet Actor를 배치할 필요는 없습니다.**

PlanetX는 Proxy Bake에서 저장한 Ground Sync Mapping을 사용하여 Orbit의 Section 좌표를 Ground World 좌표로 변환할 수 있습니다.

따라서 가장 단순한 구성은 다음과 같습니다.

```text
L_Ground
└─ BP_GroundPlayer
```

다만 Ground에서도 다음 기능을 계속 사용할 예정이라면 Ground World에 별도의 Planet Actor 구성이 필요할 수 있습니다.

- PlanetX Native Movement
- PlanetX 방사형 중력
- PlanetX Coordinate Query
- Ground 측 PlanetX Environment
- Ground Transition Endpoint

이 경우에도 Ground World의 Planet Actor는 Orbit World의 Actor와 **서로 다른 World 인스턴스**입니다.

---

### 17. Travel 정보를 보관할 GameInstance 준비하기

`Open Level`을 실행하면 기존 World와 그 안의 Actor들은 사라집니다.

따라서 Level Handoff Ticket은 Level Actor 안에만 저장하면 안 됩니다.

Ticket은 다음 World에서도 읽을 수 있는 곳에 저장해야 합니다.

가장 이해하기 쉬운 방법은 프로젝트의 **GameInstance**를 사용하는 것입니다.

이미 커스텀 GameInstance를 사용하고 있다면 기존 GameInstance에 아래 변수를 추가하면 됩니다.

없다면 Blueprint GameInstance를 하나 만듭니다.

예:

```text
BP_PlanetXGameInstance
```

다음 변수를 추가합니다.

```text
Pending PlanetX Ticket
    Type = PlanetX Level Handoff Ticket

Active PlanetX Journey Id
    Type = Guid

Has Pending PlanetX Ticket
    Type = Boolean
```

Project Settings에서 이 GameInstance를 사용하도록 설정합니다.

```text
Project Settings
└─ Maps & Modes
   └─ Game Instance Class
      └─ BP_PlanetXGameInstance
```

> PlanetX 내부의 pending capture 자체도 GameInstance 수명의 Subsystem에 저장됩니다.
>
> 여기에서 별도로 Ticket을 저장하는 이유는 여러 pending travel이 생겼을 때도 **정확히 어떤 Travel을 완료해야 하는지 명시적으로 선택하기 위해서**입니다.

---

### 18. Orbit에서 착륙 지점 Query하기

이제 `BP_OrbitPlayer`에 착륙 입력을 하나 만듭니다.

예를 들어 Enhanced Input의 다음 Action을 사용한다고 가정합니다.

```text
IA_Land
```

`Started` 이벤트에서 먼저 Planet 표면을 Query합니다.

Blueprint 흐름은 다음과 같습니다.

```text
IA_Land (Started)
    ↓
Get Game Instance Subsystem
    Class = PlanetXSubsystem
    ↓
Make PlanetXSurfaceQueryInput
    ↓
Query Surface At World Ray Detailed
```

#### Surface Query Input

다음과 같이 연결합니다.

```text
Ray Origin World
    = 현재 Camera의 World Location

Ray Direction World
    = 현재 Camera의 Forward Vector

Max Distance Cm
    = 착륙 지점을 검색하기에 충분히 큰 값
```

Planet이 여러 개라면 숨겨진 핀을 표시하여 다음 값도 지정하는 것을 권장합니다.

```text
Preferred Planet Id
Preferred Planet Binding Id
```

간단한 하나의 Planet 테스트에서는 생략할 수 있습니다.

#### Query 결과 확인

`Query Surface At World Ray Detailed`의 반환 Status를 확인합니다.

```text
Switch on EPlanetXSurfaceQueryStatus
```

다음 상태에서만 계속 진행합니다.

```text
Status == Hit
```

그 다음 Surface Result를 Break하고 다음 값을 확인합니다.

```text
bCanEnterGround == true
```

최종 흐름은 다음과 같습니다.

```text
Query Surface At World Ray Detailed
    ↓
Status == Hit?
    ↓ yes
Surface Result.bCanEnterGround?
    ↓ true
Level Handoff 준비
```

`Hit`이지만 `bCanEnterGround == false`라면 행성 표면은 찾았지만 해당 위치가 Ground 진입 가능한 Section이 아닙니다.

---

### 19. Orbit → Ground Handoff 준비하기

Surface Query가 성공했다면 같은 `PlanetXSubsystem`에서 다음 노드를 호출합니다.

```text
Begin Level Handoff
```

연결은 다음과 같습니다.

```text
Begin Level Handoff

Source Actor
    = Self

Surface Query
    = 앞에서 얻은 Surface Query Result
```

`Begin Level Handoff`가 성공하면 PlanetX는 현재 이동의 다음 정보를 보관합니다.

- Planet
- Section
- Level Pair
- 현재 Actor 위치
- Section을 기준으로 한 Actor 회전
- Ground 착륙 위치
- Control Rotation
- 가능한 경우 현재 이동 속도
- Orbit 복귀에 필요한 위치 정보
- Target Ground World

하지만 **아직 Level은 변경되지 않습니다.**

---

### 20. Handoff Ticket 저장하기

`Begin Level Handoff`의 **Return Value**를 Branch로 확인합니다.

```text
Begin Level Handoff
    ↓
Branch
```

`false`이면 `Out Result.Error`를 확인하고 Open Level을 실행하지 마세요.

`true`라면 **Out Ticket 전체를** 앞에서 만든 GameInstance에 저장합니다.

```text
Get Game Instance
    ↓
Cast to BP_PlanetXGameInstance
    ↓
Set Pending PlanetX Ticket
    = Out Ticket

Set Has Pending PlanetX Ticket
    = true
```

Ticket에서 필요한 값만 따로 복사하지 말고 구조체 전체를 저장하는 것을 권장합니다.

Ticket에는 해당 Travel을 식별하는 정보와 목적 World가 함께 들어 있습니다.

---

### 21. 실제 Ground Level 열기

저장한 `Out Ticket`을 Break합니다.

다음 값을 찾습니다.

```text
Target World
```

빠른 시작에서는 이 값이 다음 World를 가리켜야 합니다.

```text
L_Ground
```

게임 Blueprint에서 **Open Level (by Object Reference)**를 호출하고 Ticket의 Target World를 전달합니다.

전체 흐름은 다음과 같습니다.

```text
IA_Land
    ↓
Surface Query
    ↓
Begin Level Handoff
    ↓
Success?
    ↓
Ticket을 GameInstance에 저장
    ↓
Break PlanetX Level Handoff Ticket
    ↓
Target World
    ↓
Open Level
```

> PlanetX가 직접 `Open Level`을 실행하지 않는 이유는 프로젝트마다 Level Travel 정책이 다르기 때문입니다.
>
> 실제 게임에서는 Open Level 대신 Seamless Travel이나 프로젝트 고유 Travel 시스템을 사용할 수도 있습니다.

빠른 시작에서는 일반적인 Open Level 방식만 사용합니다.

---

### 22. Ground World에서 Player를 먼저 Spawn하고 Possess하기

`L_Ground`가 열리면 프로젝트의 기존 GameMode가 Ground Player를 생성하도록 구성합니다.

예:

```text
Default Pawn Class
    BP_GroundPlayer
```

PlanetX는 다음 작업을 대신하지 않습니다.

```text
Spawn Pawn
Possess Pawn
PlayerStart 선택
GameMode 선택
```

따라서 Ground Level을 PlanetX 없이 실행했을 때도 `BP_GroundPlayer`가 정상적으로 생성되고 조작 가능한 상태여야 합니다.

> Control Rotation까지 복원하려면 Handoff를 적용할 때 Target Pawn에 Controller가 존재해야 합니다.
>
> 따라서 Pawn이 생성되기만 한 시점보다 **Possess가 완료된 이후**에 Travel을 완료하는 것이 안전합니다.

---

### 23. Ground Player에 저장한 Ticket 적용하기

`BP_GroundPlayer`에서 Possess가 완료된 시점에 저장한 Ticket을 적용합니다.

Blueprint에서는 Pawn의 **Event Possessed**와 같은 시점을 사용할 수 있습니다.

먼저 GameInstance에서 Ticket을 읽습니다.

```text
Event Possessed
    ↓
Get Game Instance
    ↓
Cast to BP_PlanetXGameInstance
    ↓
Has Pending PlanetX Ticket?
```

`true`인 경우 다음 노드를 호출합니다.

```text
Get Game Instance Subsystem
    Class = PlanetXSubsystem
    ↓
Complete Level Handoff
```

연결은 다음과 같습니다.

```text
Ticket
    = GameInstance.Pending PlanetX Ticket

Target Actor
    = Self

Apply Control Rotation
    = true
```

최종 흐름은 다음과 같습니다.

```text
Event Possessed
    ↓
Has Pending PlanetX Ticket?
    ↓ true
Complete Level Handoff
    Ticket       = 저장한 Ticket
    Target Actor = Self
```

성공하면 PlanetX가 현재 Ground Pawn에 저장된 착륙 상태를 적용합니다.

---

### 24. Ground 도착 결과 저장하기

`Complete Level Handoff`의 Return Value를 확인합니다.

성공한 경우 **Out Result.JourneyId**를 GameInstance에 저장하세요.

```text
Complete Level Handoff
    ↓
Success?
    ↓ true
Break PlanetX Level Handoff Result
    ↓
Journey Id
    ↓
GameInstance.Active PlanetX Journey Id
```

그리고 다음 값을 변경합니다.

```text
Has Pending PlanetX Ticket
    = false
```

이제 Orbit → Ground 이동이 완료된 상태입니다.

PlanetX 내부 Journey 상태는 다음과 같이 됩니다.

```text
Ground Active
```

`Journey Id`는 나중에 Ground에서 Orbit으로 돌아갈 때 사용하므로 잃어버리지 마세요.

---

### 25. Ground 도착 위치 확인하기

정상적으로 Handoff가 완료되었다면 Ground Pawn은 단순히 `PlayerStart` 위치에 머무르지 않고, Orbit에서 선택한 Section 위치에 대응하는 Ground 위치로 이동합니다.

PlanetX는 대략 다음 관계를 사용합니다.

```text
Orbit에서 캡처한 Section Local 위치
        ↓
Ground Sync Mapping
        ↓
L_Ground의 World 위치
```

따라서 다음 항목을 확인하세요.

- 예상한 Ground 영역에 도착함
- Actor가 엉뚱한 방향을 바라보지 않음
- Camera 방향이 크게 튀지 않음
- 이동 속도가 의도대로 이어짐
- 기존 Ground Gameplay가 정상 동작함

Ground World에 Planet Actor가 없어도 이 착륙 위치 복원은 가능합니다.

---

### 26. 더 간단한 도착 방식: Travel Receiver

현재 World에 일치하는 Pending Travel이 **항상 정확히 하나**라는 것이 보장된다면 저장한 Ticket을 직접 적용하는 대신 다음 Component를 사용할 수도 있습니다.

```text
PlanetX Travel Receiver Component
```

Ground Pawn에 Component를 추가하고 다음 값을 유지합니다.

```text
Auto Resume Pending Travel
    Enabled

Apply Control Rotation
    Enabled
```

Travel Receiver는 World가 열린 직후 PlanetX Runtime 준비가 아직 끝나지 않은 경우 일정 시간 동안 자동으로 재시도합니다.

기본 Retry Timeout은 다음과 같습니다.

```text
15 seconds
```

성공하면 다음 Event가 호출됩니다.

```text
On Travel Resumed
```

최종 실패하면 다음 Event가 호출됩니다.

```text
On Travel Resume Failed
```

다만 Receiver는 현재 World와 일치하는 Pending이 정확히 하나일 때만 자동으로 선택합니다.

| Pending 수 | 동작 |
| ---: | --- |
| 0 | 일반 Spawn으로 처리 |
| 1 | 해당 Travel 복원 |
| 2 이상 | `AmbiguousPendingTravel` |

여러 플레이어 또는 여러 Travel을 동시에 처리할 가능성이 있다면 앞에서 설명한 **정확한 Ticket + Complete Level Handoff** 방식을 권장합니다.

> 자동 Travel Receiver와 수동 `Resume Pending Travel`을 같은 Actor에서 동시에 사용하지 마세요.

---

### 27. Ground → Orbit 복귀 준비하기

이번에는 Ground Player에서 Orbit으로 돌아가는 입력을 만듭니다.

예:

```text
IA_ReturnOrbit
```

GameInstance에서 앞에서 저장한 Journey ID를 가져옵니다.

```text
IA_ReturnOrbit (Started)
    ↓
Get Game Instance
    ↓
Cast to BP_PlanetXGameInstance
    ↓
Get Active PlanetX Journey Id
```

그 다음 PlanetXSubsystem의 다음 노드를 호출합니다.

```text
Begin Return Level Handoff
```

연결은 다음과 같습니다.

```text
Journey Id
    = Active PlanetX Journey Id

Source Actor
    = Self

Resume Alpha
    = 0
```

`Resume Alpha`는 빠른 시작에서는 기본값 `0`을 사용하면 됩니다.

성공하면 새로운 **Return Ticket**이 생성됩니다.

이 Ticket은 Orbit → Ground 때 사용했던 Ticket과 다른 Ticket입니다.

```text
Orbit → Ground Ticket
    !=
Ground → Orbit Ticket
```

---

### 28. Return Ticket 저장하고 Orbit World 열기

`Begin Return Level Handoff`가 성공하면 Return Ticket을 GameInstance의 동일한 Pending Ticket 변수에 저장합니다.

```text
Pending PlanetX Ticket
    = Return Ticket

Has Pending PlanetX Ticket
    = true
```

Return Ticket을 Break하면 `Target World`가 다음 Level을 가리켜야 합니다.

```text
L_Orbit
```

그 값을 이용해 다시 Open Level을 실행합니다.

```text
Begin Return Level Handoff
    ↓
Success?
    ↓
Return Ticket 저장
    ↓
Break Ticket
    ↓
Target World = L_Orbit
    ↓
Open Level
```

---

### 29. Orbit World에서 복귀 상태 적용하기

`L_Orbit`이 다시 열리면 `BP_OrbitPlayer`가 생성되고 Possess되어야 합니다.

이때 Ground에서 사용한 것과 같은 방식으로 GameInstance의 Pending Ticket을 읽어 **Complete Level Handoff**를 호출할 수 있습니다.

```text
BP_OrbitPlayer
Event Possessed
    ↓
GameInstance.Has Pending PlanetX Ticket?
    ↓ true
Complete Level Handoff
    Ticket       = GameInstance.Pending PlanetX Ticket
    Target Actor = Self
```

성공하면 다음 값을 정리합니다.

```text
Has Pending PlanetX Ticket
    = false
```

Orbit 복귀가 완료되면 해당 Journey도 완료됩니다.

정상적인 전체 Journey는 다음 순서입니다.

```text
Orbit
    ↓
Pending Orbit To Ground
    ↓
Ground Active
    ↓
Pending Ground To Orbit
    ↓
Completed
```

---

### 30. Orbit 도착 시 Runtime 등록 순서 때문에 실패한다면

Orbit World가 다시 열린 직후에는 Planet Actor가 PlanetX Runtime에 등록되는 시점과 Player가 생성되는 시점이 완전히 같지 않을 수 있습니다.

이 경우 수동 `Complete Level Handoff`가 너무 일찍 호출되면 일시적으로 복원이 실패할 수 있습니다.

단일 Player 빠른 시작에서는 Orbit Player에 **PlanetX Travel Receiver Component**를 추가하여 복귀 적용을 맡기는 방법도 사용할 수 있습니다.

```text
BP_OrbitPlayer
└─ PlanetX Travel Receiver Component
```

```text
Auto Resume Pending Travel
    Enabled

Apply Control Rotation
    Enabled
```

Travel Receiver는 Planet Runtime 등록이 아직 끝나지 않은 경우 제한된 시간 동안 다시 시도합니다.

단, 이 방법을 사용한다면 같은 도착 과정에서 수동 `Complete Level Handoff`를 동시에 호출하지 마세요.

---

### 31. Runtime Preview 동작 확인하기

실제 Ground Level로 Travel하기 전에 Orbit에서 Planet에 접근해 보세요.

Viewpoint가 Transition Endpoint 영역에 들어오면 External Level Section의 **Runtime Preview World**가 필요에 따라 로드됩니다.

정상적인 표현 흐름은 다음과 같습니다.

```text
멀리 있음
    Section Proxy

        ↓ 접근

Transition
    Proxy / Morph / Runtime Preview 전환

        ↓

Ground Presentation
    Runtime Preview World
```

이 상태에서도 아직 실제 `L_Ground`로 World Travel한 것은 아닙니다.

즉 다음 두 과정은 독립적입니다.

```text
[시각적 전환]
Orbit World 안에서 Runtime Preview 표시

[Gameplay Travel]
Begin Level Handoff
→ 게임의 Open Level
→ L_Ground
```

이 구분을 이해하면 Level Handoff를 디버깅하기 훨씬 쉽습니다.

---

### 32. 실행 전 Validate하기

Orbit World로 돌아가 PlanetX Mode의 **Validate** Palette를 엽니다.

Planet Asset Editor의 Diagnostics에서도 검증할 수 있습니다.

빠른 시작에서는 최소한 다음 항목에 Error가 없어야 합니다.

- Planet Actor에 올바른 Planet Asset이 지정됨
- External Level Section이 유효함
- Orbit World와 Ground World가 서로 다름
- Ground Sync Mapping이 유효함
- Proxy Bake Data가 연결됨
- Runtime Preview World가 연결됨
- Runtime Preview Bake revision이 최신 상태임
- Runtime Preview에 renderable content가 존재함
- Orbit Transition Endpoint가 Section에 정확히 하나 존재함
- Environment Manager가 정확히 하나 존재함
- Planet Actor가 canonical External Section mapping에 맞게 Align되어 있음

Validation Error가 있다면 PIE를 실행하기 전에 해결하세요.

---

### 33. 전체 흐름 테스트하기

이제 `L_Orbit`에서 PIE를 시작합니다.

#### 1단계: Orbit 확인

먼저 다음을 확인합니다.

- 행성이 정상적으로 표시됨
- Section Proxy가 보임
- Player를 조작할 수 있음
- PlanetX Runtime에 Planet이 등록됨

#### 2단계: 행성에 접근

Section 방향으로 접근하면서 다음을 확인합니다.

```text
Orbit
→ Transition
→ Ground Presentation
```

Runtime Preview가 필요한 시점에 정상적으로 나타나는지 확인합니다.

#### 3단계: 착륙 입력

Section을 향해 카메라를 두고 `IA_Land`를 실행합니다.

다음 순서가 발생해야 합니다.

```text
Surface Query Hit
→ Begin Level Handoff 성공
→ Ticket 저장
→ L_Ground Open
```

#### 4단계: Ground 도착

Ground Player가 Spawn되고 Possess된 후 다음이 발생해야 합니다.

```text
Complete Level Handoff
→ 저장된 Ground Pose 적용
→ Journey = Ground Active
```

#### 5단계: Orbit 복귀

`IA_ReturnOrbit`을 실행합니다.

```text
Begin Return Level Handoff
→ Return Ticket 생성
→ L_Orbit Open
→ Return Ticket 적용
→ Journey Completed
```

---

### 34. PlanetX Runtime Palette에서 확인하기

PIE 중 PlanetX Mode의 **Runtime** Palette를 사용하면 현재 Runtime 상태를 확인하는 데 도움이 됩니다.

Orbit World에서는 특히 다음 항목을 확인하세요.

- Planet 등록 상태
- 현재 Transition State
- Transition Alpha
- Section Context
- Runtime Preview 상태
- Ground Presentation 준비 상태

Level Handoff 문제를 찾을 때는 먼저 다음 둘을 구분하세요.

```text
Runtime Preview 문제인가?
```

또는

```text
실제 World Handoff 문제인가?
```

Runtime Preview가 정상인데 `Open Level` 후 위치가 틀리다면 Handoff 쪽 문제입니다.

반대로 Travel하지 않아도 행성 접근 과정에서 Preview가 나타나지 않는다면 Transition/Preview 설정을 먼저 확인해야 합니다.

---

### Level Handoff가 동작하지 않는다면

다음 항목을 순서대로 확인하세요.

1. **Proxy Bake의 Presentation이 External Level인지 확인합니다.**

2. **Ground World와 Planet World가 서로 다른 Level인지 확인합니다.**

3. **Planet World가 실제 L_Orbit을 가리키는지 확인합니다.**

4. **Proxy Bake를 최신 상태로 다시 실행했는지 확인합니다.**

5. Planet Asset의 해당 Section에 **Runtime Preview World가 연결되어 있는지 확인합니다.**

6. Orbit World의 Planet Actor에 올바른 Planet Asset이 지정되어 있는지 확인합니다.

7. PlanetX Mode에서 **Align**을 실행했는지 확인합니다.

8. Orbit Section에 정확히 하나의 **Orbit Transition Endpoint**가 있는지 확인합니다.

9. Environment Manager가 정확히 하나 존재하는지 확인합니다.

10. Player ViewTarget에 활성 Camera와 PlanetX Viewpoint Component가 있는지 확인합니다.

11. Surface Query 결과가 실제로 `Hit`인지 확인합니다.

12. `Surface Result.bCanEnterGround`가 `true`인지 확인합니다.

13. `Begin Level Handoff`가 `true`를 반환하는지 확인합니다.

14. 실패한다면 `Out Result.Error`를 확인합니다.

15. `Begin Level Handoff` 이후 **Ticket 전체를** World Travel을 넘어서 보관하고 있는지 확인합니다.

16. 실제 Open Level 대상이 `Ticket.TargetWorld`와 같은지 확인합니다.

17. Ground Pawn이 Spawn된 뒤 **Possess가 완료된 상태에서** Complete를 실행하는지 확인합니다.

18. 여러 Pending Travel이 있을 수 있다면 `Resume Pending Travel` 대신 저장한 정확한 Ticket으로 `Complete Level Handoff`를 호출합니다.

19. Ground → Orbit 복귀 전에 Ground 도착 결과의 `JourneyId`를 저장했는지 확인합니다.

20. Return용으로 `Return To Orbit Same World`를 호출하고 있지 않은지 확인합니다. External Level에서는 `Begin Return Level Handoff`를 사용해야 합니다.

---

### 자주 발생하는 오류

| 오류 | 의미 / 확인할 항목 |
| --- | --- |
| `InvalidSurfaceQuery` | Query 결과와 Section 상태를 다시 확인하세요. |
| `InvalidLevelPair` | Level Handoff 설정, Orbit/Ground World, Can Enter Ground를 확인하세요. |
| `TargetWorldMismatch` | Ticket이 요구한 World가 아닌 다른 Level을 열었습니다. |
| `TargetActorInvalid` | 도착 후 잘못된 Actor에 Handoff를 적용하고 있습니다. |
| `TargetPlanetBindingNotFound` | Orbit 복귀 시 목표 Planet Actor가 아직 등록되지 않았거나 Binding이 잘못되었습니다. |
| `ResolveFailed` | Target World에서 저장된 좌표 상태를 해석하지 못했습니다. |
| `ApplyFailed` | Actor Transform 또는 Movement 상태 적용에 실패했습니다. |
| `PendingTravelNotFound` | 현재 World를 대상으로 한 Pending Travel이 없습니다. |
| `AmbiguousPendingTravel` | 현재 World에 Pending Travel이 여러 개 있습니다. 정확한 Ticket을 사용하세요. |
| `ActiveJourneyNotFound` | Ground 도착 Travel이 완료되지 않았거나 Journey Id가 유효하지 않습니다. |
| `JourneyNotGroundActive` | 아직 Ground Handoff가 정상 완료되지 않았습니다. |
| `ArrivalTimedOut` | Travel Receiver가 제한 시간 안에 도착 상태를 복원하지 못했습니다. |

---

### Ground World에서도 PlanetX 기능을 사용하려면

기본 Level Handoff에서는 Ground pose 복원만을 위해 Ground World에 Planet Actor가 필요하지 않습니다.

하지만 Ground에서도 PlanetX 기능을 계속 사용할 계획이라면 추가 구성이 필요할 수 있습니다.

예를 들어 다음 기능입니다.

- PlanetX Native Movement
- 행성 중심 방향 중력
- Surface Frame 이동
- PlanetX Coordinate Query
- Ground 환경 전환

이 경우 `L_Ground`에도 PlanetX Planet Actor를 배치하고 같은 Planet Asset을 지정합니다.

Ground Player의 Coordinate Component에는 해당 **Ground World의 Planet Actor**를 참조하도록 설정하세요.

> Orbit World의 Planet Actor 참조를 Ground World에서 그대로 사용할 수는 없습니다.
>
> 두 Actor는 같은 Planet Asset을 사용하더라도 서로 다른 World에 존재하는 서로 다른 Actor 인스턴스입니다.

또한 Planet Component의 Gravity Settings는 Planet Asset이 아니라 각 Planet Actor가 소유하므로 Ground World에서 PlanetX 중력을 사용할 경우 Ground 쪽 Planet Actor의 중력 설정도 별도로 구성해야 합니다.

이 추가 구성은 기본적인 Level Handoff pose 복원을 위한 필수 조건은 아닙니다.

---

### 완료

여기까지 정상적으로 동작했다면 PlanetX의 기본 Level Handoff 흐름을 구성한 것입니다.

전체 제작 흐름은 다음과 같습니다.

```text
Planet Asset
    ↓
L_Ground
    ↓
Proxy Bake
    │
    ├─ Section
    ├─ Level Pair
    ├─ Section Proxy
    └─ Runtime Preview World
    ↓
Planet Visual Build
    ↓
L_Orbit
    ↓
PlanetX Planet
    ↓
Align
    ↓
Environment Manager
    ↓
Orbit Transition Endpoint
    ↓
Orbit Player + Viewpoint
```

실제 Runtime Travel은 다음과 같습니다.

```text
L_Orbit
    ↓
Surface Query
    ↓
Begin Level Handoff
    ↓
Ticket 저장
    ↓
게임이 Open Level
    ↓
L_Ground
    ↓
Ground Pawn Spawn / Possess
    ↓
Complete Level Handoff
    ↓
Ground Active
    ↓
Begin Return Level Handoff
    ↓
Return Ticket 저장
    ↓
게임이 Open Level
    ↓
L_Orbit
    ↓
Return Ticket 적용
    ↓
Journey Completed
```

그리고 Orbit World에서 Ground에 접근할 때 보이는 시각적 전환은 실제 World Travel과 별도로 다음과 같이 동작합니다.

```text
Section Proxy
    ↓
Transition
    ↓
Runtime Preview World
```

**Runtime Preview World는 실제 Ground Gameplay Level이 아닙니다.**

PlanetX는 Orbit과 Ground 사이에서 필요한 좌표와 상태를 연결하고, 실제 World Travel과 Pawn 생명주기는 기존 Unreal Engine 프로젝트의 정책을 그대로 사용할 수 있도록 분리합니다.

## Planet Asset과 식별자

`UPlanetXPlanetAsset`은 행성의 물리·좌표·Section·Level Pair·Proxy Bake·생성 비주얼·환경 제작 상태를 연결하는 Primary Data Asset입니다.

### 세 가지 핵심 ID

| ID | 역할 | 선택 규칙 |
| --- | --- | --- |
| Planet ID | 행성 계약의 프로젝트 전역 식별자 | Planet Asset 사이에서 고유 |
| Planet Binding ID | 동일 Planet ID를 가진 런타임 인스턴스 구분 | 여러 Planet Actor가 있을 때 명시 |
| Section ID | 행성 표면의 제작·조회 구역 | Asset 안에서 비어 있지 않고 고유 |

Level Pair ID는 Section과 Orbit/Ground/Runtime Preview World 묶음을 찾는 키입니다. Journey ID와 Capture ID는 Travel 한 번의 수명 주기를 식별합니다.

### Asset이 소유하는 계약

Planet Asset에는 Radius, Coordinate Convention, Sections, Level Pairs, Completion/Padding 설정, Environment 설정, Surface Preset, Proxy Bake 링크와 revision 상태가 들어 있습니다. 생성된 Payload나 Material은 Asset이 직접 제작하지 않고 Editor workflow가 게시하고 링크합니다.

`IsProxyBakeStale`, `IsVisualBuildStale`, `IsVisualPreviewStale`은 현재 authoring revision과 마지막 성공 결과를 비교합니다. stale 결과는 자동 삭제 신호가 아니라 재검증·재생성이 필요하다는 신호입니다.

### 여러 World와 여러 인스턴스

같은 Planet Asset이 Orbit World와 Ground World에 사용될 수 있습니다. 동일 Planet ID의 Planet Actor가 한 World에 여러 개면 자동 선택은 모호해질 수 있으므로 API의 AdvancedDisplay에 있는 Planet Binding ID를 전달하세요.

### 변경 원칙

ID 변경은 저장 좌표, Level Pair, Bake 링크, Travel route에 영향을 줍니다. 표시 이름 변경과 달리 migration으로 취급하고 Full Validate와 재 Bake를 수행하세요.

## Section과 Level Pair

Section은 행성 표면의 지리적 구역, 로컬 Frame, 시각 프록시, 전환 경계를 묶는 단위입니다. Level Pair는 해당 Section이 어느 World에서 어떻게 표현되는지 정의합니다.

### Section placement

`FPlanetXSectionPlacement`은 표면상의 위치, tangent 방향, 크기와 배치 Transform을 결정합니다. Canonical north-pole anchor로 선택된 Same World Section은 자동 배치가 제한될 수 있습니다. 편집기는 Visual, coordinate-containment, transition rectangle을 하나의 bounds contract로 검증합니다.

Section ID를 명시하면 저장, Capture, Sequencer가 같은 Frame을 재현합니다. ID가 None일 때 자동 Section resolve는 현재 Planet Local 위치와 Asset 배열 순서를 사용하므로 영속 데이터에는 권장하지 않습니다.

### Runtime role

- **Same World**: Orbit World와 Ground World package가 같아야 합니다.
- **External Level / Level Handoff**: Orbit과 Ground가 서로 달라야 하고 Runtime Preview World가 필요합니다.

Level Handoff Section은 GroundSyncMapping과 유효한 TransitionPolicy를 가져야 합니다. Proxy Bake가 성공하면 SourceRef, BakeData, mapping, preview와 transition resource 링크가 갱신됩니다.

### Ground proxy visibility

Section별 Ground proxy visibility는 Orbit, Ground, transition 시 원본 Actor와 프록시 중 무엇이 보일지 결정합니다. PlanetX Mode의 Planet/Compare/Level view는 runtime 계약을 변경하지 않고 편집 중 표현만 비교합니다.

### 검증 체크리스트

1. Section ID와 Level Pair ID가 비어 있지 않은가?
2. Runtime role과 World package 관계가 맞는가?
3. GroundSyncMapping이 유효한가?
4. Proxy Bake와 생성 비주얼이 현재 revision인가?
5. transition bounds가 containment bounds 안에 있는가?

## 좌표 모델

PlanetX는 World 좌표 하나에 모든 의미를 넣지 않고 목적이 다른 좌표 Frame을 명시적으로 구분합니다.

### 좌표 종류

| 좌표 | 의미 |
| --- | --- |
| World | 현재 Unreal World의 Transform |
| Planet Local | Planet Actor 원점을 기준으로 한 3D 위치 |
| Canonical Geo | Latitude, Longitude, AltitudeCm |
| Section Local | 특정 Section의 tangent frame |
| Surface Frame | East, North, Up 기저 |
| FPlanetXTransform | Planet ID/Binding과 위치·회전을 함께 저장하는 표준 pose |

`FPlanetXCoordinateConvention`은 North Pole과 경도 축을 정의합니다. Geo의 altitude는 Planet Radius를 기준으로 한 cm 값입니다.

### Coordinate Component의 권위

`UPlanetXCoordinateComponent.CoordinateMode`이 Unreal이면 Owner World Transform이 원본이고 PlanetX snapshot은 캡처됩니다. PlanetX 모드에서는 `FPlanetXTransform`이 원본이며 Apply가 World Transform을 만듭니다. Capture와 Apply는 명시적 작업입니다.

Reference resolve 우선순위는 Reference Planet Actor, Reference Planet ID 순입니다. Section ID를 지정하면 해당 Frame이 authoritative합니다.

### 벡터 변환

위치는 점 변환이고 이동 입력은 벡터 변환입니다. `ConvertCoordinateVectorToWorld`에서 Surface Frame을 사용하면 X/Y/Z를 East/North/Up으로 해석할 수 있습니다. 지표 이동은 `bProjectToSurfaceTangent`를 켜 Up 성분을 제거할 수 있습니다.

### 실패 처리

Transform과 Query 함수는 bool만 보지 말고 `FPlanetXTransformResolveResult` 또는 상세 Status를 확인하세요. 잘못된 버전, 미등록 Planet, 모호한 Binding, 지원하지 않는 Planet scale, 유효하지 않은 Section이 구분됩니다.

## 표현 영역과 런타임 로드

PlanetX는 Actor가 어느 표현에 속하는지와 World Partition에서 어떻게 로드되는지를 별도 정책으로 취급합니다.

### Representation Domain

`EPlanetXRepresentationDomain`은 Actor의 기본 표현 영역을 나타냅니다.

- Ground Actor는 원본 Level 표현에 속합니다.
- Orbit Actor는 Planet/Compare 편집 view와 Orbit/Transition 런타임 표현에 속합니다.
- 전역 presentation Actor는 별도 visibility 규칙을 가질 수 있습니다.

PlanetX Mode의 Planet, Compare, Level view는 이 Domain을 이용해 원본과 프록시를 비교합니다.

### Actor Spatial Loading Policy

`EPlanetXActorSpatialLoadingPolicy`는 Actor의 World Partition spatial-loading 설정을 누가 관리하는지 정의합니다.

- `PlanetXManaged`: Orbit Actor를 non-spatial 상태로 유지해 Orbit 표현에서 계속 사용할 수 있게 합니다.
- `ActorManaged`: Actor의 Is Spatially Loaded 설정을 프로젝트가 직접 관리합니다.

이 정책은 Data Layer membership이나 Streaming Source를 자동 구성하지 않습니다. 해당 시스템은 프로젝트가 계속 소유합니다.

### 정책 적용

`ShouldForceOwnerAlwaysLoaded`로 현재 정책의 결과를 확인하고 `ApplySpatialLoadingPolicyToOwner`로 Owner에 적용합니다. 적용 함수는 Editor에서도 호출할 수 있습니다. 적용 후 Actor, World Partition과 Data Layer 설정을 프로젝트 기준으로 다시 확인하세요.

### Visibility와 residency 구분

보이지 않는 것과 로드되지 않은 것은 다릅니다. Planet proxy visibility, Section proxy residency, Runtime Preview residency는 별도 상태입니다. Runtime Monitor에서 등록 여부, realized component 수, renderable 상태를 함께 확인해야 합니다.

## 전환 모델

PlanetX 전환은 표시 Alpha만 바꾸는 효과가 아니라 Section, runtime context, Actor pose와 travel state를 연결하는 수명 주기입니다.

### 전환 참여 요소

- `APlanetXTransitionEndpoint`: Section과 endpoint 역할, cylinder 설정, 참가 Actor 정책
- `UPlanetXViewpointComponent`: 관찰 위치와 transition presentation 기준
- `UPlanetXTransitionMorphComponent`: flat/curved mesh 전환 표현
- `UPlanetXPlanetProxyComponent`: Section proxy와 residency
- `UPlanetXSubsystem`: query, capture, Same World/Level Handoff facade

`FPlanetXTransitionCylinderSettings`은 표면 거리와 고도 offset으로 상태와 Alpha를 평가합니다.

### Same World

같은 World 안에서 Orbit Actor가 Ground pose로 이동합니다. 자동 진입은 Coordinate Component의 Spatial Entry policy가 켜진 참가 Actor에만 적용됩니다. 반환 정책은 captured pose 또는 현재 Section-relative pose 중 선택할 수 있습니다.

### Level Handoff

서로 다른 World 사이에서는 `BeginLevelHandoff` 또는 `PrepareTravel`이 Ticket을 만들고, 게임 코드가 `OpenLevel`과 Pawn 정책을 소유합니다. 도착 World에서 `ResumePendingTravel` 또는 정확한 Ticket을 사용하는 `CompleteLevelHandoff`가 pose를 적용합니다.

Ticket generation이 오래됐거나 현재 World에 matching pending travel이 여러 개면 적용하지 않습니다. Journey ID는 왕복 상태를 이어주며 완료된 Journey도 진단을 위해 조회할 수 있습니다.

### 이동 연속성

Movement Handoff는 linear/angular velocity를 coordinate frame에 맞춰 캡처하고 적용합니다. Consume, Cancel과 rollback 결과를 확인해 중복 적용을 막으세요.

## Planet Asset Editor

Planet Asset을 더블 클릭하면 전용 Editor가 열립니다. Editor에는 Asset 계약을 다루는 다섯 개의 도킹 가능한 탭이 있습니다.

### 탭

| 탭 | 용도 |
| --- | --- |
| Overview | Planet 상태와 권장 다음 작업 |
| Sections | Section 검색, 필터, runtime role, Bake 진입 |
| Configuration | Planet 구조와 제작 설정 |
| Preview | Basic/Advanced 비주얼 제작 |
| Diagnostics | Quick/Full validation과 해결 동작 |

기본 레이아웃에서는 중앙의 **Preview**와 오른쪽의 **Configuration**이 열립니다. **Overview**, **Sections**, **Diagnostics**는 명령을 실행하기 전까지 닫혀 있을 수 있습니다. 탭이 보이지 않으면 **Window > Planet Asset**에서 다시 여세요.

Configuration에서는 EnvironmentSettings가 숨겨집니다. 환경 프로필의 단일 제작 표면은 **Preview > Advanced > Environment**입니다.

### 주요 명령

- Open Preview: `Alt+P`
- Sections: `Alt+T`
- Open Proxy Bake: `Alt+B`
- Refresh: `F5`
- Validate: `Shift+F`
- Section 검색: `Ctrl+F`
- 선택 Section Focus: `F`
- 선택 Section 삭제: `Delete`

Sections 필터는 All, Same World, External Level, Needs Bake, Needs Transition, Invalid를 제공합니다. Runtime role 변경은 필요한 World와 Proxy Bake 계약을 만족해야 합니다.

### 삭제와 보존

Delete Selected Section은 Planet Asset에서 Section과 Level Pair를 제거하지만 참조하던 Source World, Proxy BakeData, Runtime Preview asset을 삭제하지 않습니다. 생성 자산 정리는 별도 확인 작업으로 수행하세요.

### 권장 흐름

새 Planet Asset에서는 상태 요약이 필요할 때 **Overview**를 열고, 저장된 Ground Level에서 Proxy Bake를 엽니다. Section을 먼저 만들거나 선택하지 마세요. 첫 번째 성공한 Proxy Bake가 Section과 Level Pair를 생성합니다. Bake가 끝난 뒤 **Sections**에서 `Linked` 상태를 확인하고 **Preview**에서 비주얼을 조정한 다음 **Diagnostics**에서 Full Validate를 통과시킵니다.

기존 Planet Asset에서는 **Sections**에서 작업할 Section을 선택한 뒤 해당 Section의 Proxy Bake 진입점을 사용합니다. Section 선택으로 시작하는 흐름은 기존 Section 작업뿐입니다.

## PlanetX Mode

PlanetX Mode는 현재 World의 Planet Actor, Section, 참가 Actor, 환경과 전환을 한 화면에서 연결해 보는 Level Editor mode입니다.

### Palette

| 단축키 | Palette | 역할 |
| --- | --- | --- |
| Alt+1 | Placement | Planet/Section 배치와 좌표 편집 |
| Alt+2 | Runtime | PIE 등록·residency·상태 관찰 |
| Alt+3 | Cinematic | PlanetX Transform path 제작 |
| Alt+4 | Transition | Endpoint와 전환 범위 |
| Alt+5 | Environment | World 환경 연결 |
| Alt+6 | Validate | World와 Asset 검증 |

`F5`의 Refresh Preview는 scene index를 새로 만들고 PIE 전 Completion/Padding preview를 갱신합니다.

### Preview view

- **Planet**: 활성 Planet proxy를 표시하고 Source Level Actor를 숨깁니다.
- **Compare**: Planet proxy와 Source Level Actor를 함께 표시합니다.
- **Level**: Planet proxy를 숨기고 원본 Level Actor를 표시합니다.

이 선택은 편집 시 visibility preview이며 저장된 runtime role을 바꾸지 않습니다.

### Scene Tree와 선택

Scene Tree는 Planet, Section, Endpoint, Environment, 참가 Actor 연결을 표시합니다. 같은 Planet에 중복 Endpoint나 Environment Manager가 있거나 Section placement/topology가 잘못되면 경고가 표시됩니다.

Placement 도구로 Actor를 이동할 때 Coordinate Component의 Reference Planet/Section과 representation domain을 먼저 확인하세요. 저장 가능한 위치는 명시 Section ID를 권장합니다.

### PIE 사용

PIE에서는 Runtime palette로 Planet registration, Section state, Runtime Preview와 Transition 결과를 관찰합니다. Source World를 바꾸는 Proxy Bake 작업은 PIE 중 실행하지 마세요.

## Proxy Bake Editor

Proxy Bake Editor는 Ground World의 시각 소스를 수집해 Orbit proxy, partition payload, Runtime Preview와 transition resource를 게시합니다.

### 현재 상태에 맞는 진입 경로 선택

Asset 상태에 따라 다음 경로 중 하나를 사용합니다.

| 상황 | 진입 경로 | Section 선택 |
| --- | --- | --- |
| 새 Planet Asset의 첫 Section | 저장된 Ground Level을 열고 **Tools > PlanetX 영역 > Proxy Bake Editor** 사용 | 아직 Section이 없으며 Scan이 Target을 결정하고 첫 성공 Bake가 Section을 생성 |
| 기존 Section Rebuild | Planet Asset Editor > **Sections**에서 Section을 선택한 뒤 **Open Proxy Bake** | 선택한 Section이 Rebuild 대상 |
| Diagnostics 문제 해결 | Planet Asset Editor > **Diagnostics > Open Proxy Bake** | 표시된 Finding을 먼저 검토한 뒤 사용 |

처음 사용하는 사용자는 [여기서 시작 — Same World 빠른 시작](/docs/ko/quick-start-same-world)을 따라 첫 번째 경로만 사용하세요.

### 첫 Bake 작업 순서

1. Ground Level을 열고 저장합니다.
2. **Tools** 메뉴의 PlanetX 영역에서 Proxy Bake Editor를 엽니다.
3. Target Planet Asset을 지정하고 Presentation을 **Same World**, Source Scope를 **Current Level**로 설정합니다.
4. **Scan Sources**(`F5`)를 실행하고 활성 Source가 하나 이상이며 `NEW OUTPUT`인지 확인합니다.
5. Source Role, Omission과 Output Plan을 검토합니다. Use 또는 Role을 수정했다면 Apply Source Changes를 실행합니다.
6. **BAKE IN EDITOR**(`Ctrl+B`)를 실행합니다. 성공 결과는 `Bake complete.`로 시작하며 Section과 Level Pair를 자동으로 생성합니다.

### 기존 Section 작업 순서

1. Planet Asset Editor > **Sections**를 엽니다.
2. 다시 Bake할 Section을 선택합니다.
3. **Open Proxy Bake**를 선택합니다.
4. **Scan Sources**(`F5`)로 Source와 Bake Plan을 갱신합니다.
5. 변경 사항을 검토하고 표시되는 **REBUILD IN EDITOR** 또는 **BAKE IN EDITOR**를 실행합니다.

진행 중 취소는 `Esc`, 결과 선택은 `Ctrl+Shift+O`입니다.

PIE 중에는 Source Level 변경이 필요한 작업을 시작할 수 없습니다. 외부 Worker가 활성 상태이면 해당 Source World를 직접 열지 말고 Editor에서 취소만 요청하세요.

### 성공 체크포인트

| 단계 | 필요한 결과 |
| --- | --- |
| Scan | 상단에 `SUCCESS`가 표시되고 활성 Source 수가 0보다 큼 |
| Plan | `SCAN OUT OF DATE` 또는 `TARGET CONFLICT`가 없음 |
| Bake | `Bake complete.` 또는 검토가 끝난 `Bake complete with warnings` |
| Planet Asset > Sections | Bake는 `Linked`, Transition은 `Ready` 또는 `Same World` |

### External Bake Monitor

External Bake 확인 창에서 **Open Bake Monitor in browser**를 활성화하면 Stage, 진행률, ETA, 리소스 사용량, 경고와 제한된 로그 tail을 로컬 브라우저에서 볼 수 있습니다. Monitor는 관찰 도구이므로 서비스 또는 브라우저를 열지 못하더라도 External Bake는 계속되며 결과도 달라지지 않습니다.

Loopback Monitor 서비스는 `PlanetXEditor` 모듈에 포함되어 활성 Editor 또는 Direct Worker 프로세스 내부에서 실행됩니다. PlanetX는 별도의 Monitor 실행 파일을 설치하거나 실행하지 않습니다. 서비스는 로컬 연결만 허용하며 세션별 token으로 브라우저 페이지를 인증합니다. 전체 Monitor URL을 공유하거나 게시하지 마세요.

External Bake가 진행되는 동안에는 Direct Worker가 Monitor를 호스팅합니다. Worker가 종료되면 해당 서비스도 종료되므로 기존 탭의 연결이 끊길 수 있습니다. Unreal Editor가 다시 실행된 뒤 **Open External Bake Monitor**를 사용하면 최신 durable result를 다시 호스팅할 수 있습니다. 새 서비스는 Job artifact에서 상태를 복원하며 이전 브라우저 탭을 자동으로 이전하지는 않습니다.

브라우저 탭을 닫아도 Bake는 취소되지 않습니다. 안전한 checkpoint에서 취소를 요청하려면 Monitor의 **Cancel Bake** 또는 Editor의 취소 기능을 사용하세요. 취소를 요청해도 부분 결과는 게시되지 않습니다.

### 지원 소스

| Component | 처리 |
| --- | --- |
| LandscapeComponent | Landscape pass |
| FoliageInstancedStaticMeshComponent | Foliage pass |
| HISM / ISM | Instances pass |
| StaticMeshComponent | RigidMesh pass |
| SplineMeshComponent | 변형 추출 미지원, omission |

PCG managed resource와 HLOD는 discovery 단계에서 저장·검증 상태를 확인합니다. HLOD가 검증되지 않으면 원본 소스를 보수적으로 사용합니다.

### 역할과 태그

Editor는 Auto, ProxyGeometry, LandscapeProxy, InstanceBatch, Discard, ManualReview, Unsupported 역할을 표시합니다. Source group은 Actor, Folder, Data Layer, Level/Level Instance 단위로 볼 수 있습니다.

C++ 태그 API는 BakeSource, NoBake, Preview, Generated를 제공합니다. 명시적 제외는 omission을 숨기는 수단이 아니라 의도된 소스 정책으로 사용하세요.

### 결과 판정

Succeeded는 omission 없는 성공입니다. CompletedWithWarnings는 게시 성공이지만 SourceOmissions를 검토해야 합니다. package가 512 MiB를 넘으면 경고하고 1 GiB를 넘으면 게시를 거부합니다.

## 검증과 진단

PlanetX 검증은 오류 문구만 나열하지 않고 finding의 Severity, Impact, blocking scope, 자동 수정 가능 여부와 resolution action을 제공합니다.

### Quick와 Full Validate

Quick Validate는 Asset 구조와 즉시 확인 가능한 계약을 검사합니다. Full Validate는 World, Proxy Bake link, Runtime Preview, 생성 결과까지 더 깊게 확인하고 구조화된 로그를 남깁니다.

Diagnostics 탭의 주요 동작:

- Quick Validate
- Full Validate
- Review Sections
- Open Proxy Bake
- Show Section
- Open Details

### Validate palette

PlanetX Mode의 Validate palette는 현재 World와 연결 Asset을 함께 검사합니다. **Fix All Safe**는 결과가 결정적이고 추가 선택이 필요 없는 Warning만 수정합니다. 파괴적 작업이나 사용자 결정을 요구하는 finding은 자동으로 바꾸지 않습니다.

### 자주 보는 finding

- Planet ID/Section ID 누락 또는 중복
- 잘못된 Radius나 Coordinate Convention
- Same World와 External Level의 World package 관계 오류
- GroundSyncMapping 또는 TransitionPolicy 누락
- stale Proxy Bake/Generated Visual/Generated Material
- 변경된 Source Material
- unresolved Reference Planet/Section
- World Partition runtime load policy 불일치

### 로그와 지원 자료

Full Validate 결과는 `LogPlanetXValidation`에 안정적인 Surface/Operation/Subject 형태로 기록됩니다. Visual Edit 문제는 `PlanetX.VisualEdit.Dump`, proxy 표현은 `PlanetX.ProxyStats.Dump`로 추가 상태를 확인하세요.

## 런타임 통합

런타임 통합의 공개 facade는 Game Instance Subsystem인 `UPlanetXSubsystem`입니다. World별 registry와 서비스는 내부 구현이며 gameplay 코드는 facade와 공개 Component를 사용합니다.

### Planet 등록

`APlanetXPlanetActor`에는 Planet, Proxy, Transition Morph, Atmosphere, Volumetric Cloud Component가 기본으로 포함됩니다. Planet Component에 Planet Asset을 지정하고 `bAutoRegisterRuntime`을 사용하거나 `RegisterToPlanetXRuntime`을 호출합니다.

같은 Planet ID를 가진 Actor가 여러 개면 Planet Binding ID를 저장하고 query에 전달하세요. 단일 인스턴스만 가정한 자동 resolve는 여러 Actor 환경에서 모호할 수 있습니다.

### 참가 Actor

필요에 따라 다음 Component를 추가합니다.

- Coordinate: Planet/Section reference, 표준 pose, vector 변환, Spatial Entry policy
- Movement: planet gravity, input/force/impulse, surface snap과 alignment
- Viewpoint: transition 관찰 기준
- Travel Receiver: Level Handoff 도착 후 pending travel 재개
- Transition Endpoint: Section 진입/이탈 조건과 presentation

### Begin Play 순서

Planet Actor가 먼저 등록되고 참가 Actor가 runtime context를 resolve할 수 있어야 합니다. Streaming으로 순서가 늦어질 수 있으면 `RefreshRuntimeRegistration`, `RefreshRuntimeContext` 또는 Travel Receiver의 retry 정책을 사용합니다.

### Package 전 확인

Planet Asset Full Validate, current Proxy Bake, current Generated Visual/Material, Runtime Preview World와 Cook asset bundle을 확인합니다. Editor Preview가 보인다는 사실만으로 runtime payload가 Cook됐다고 판단하지 마세요.

## 좌표와 표면 쿼리

좌표 API는 Actor pose 변환과 행성 표면 탐색을 분리합니다. `UPlanetXSubsystem`은 World context를 받는 Blueprint facade이며 Coordinate Component는 Owner에 바인딩된 편의 API를 제공합니다.

### Transform Capture와 Resolve

- `CapturePlanetXTransform`: World Transform을 PlanetX 표준 pose로 캡처
- `CaptureActorPlanetXTransform`: Actor Transform을 캡처
- `ResolvePlanetXTransform`: 표준 pose를 현재 World Transform으로 계산
- `ApplyPlanetXTransformToActor`: 계산과 Actor 적용
- `ResolveCoordinateFrame`: Planet 또는 Section frame을 World로 resolve

반환 bool과 함께 `FPlanetXTransformResolveResult`를 확인합니다. Planet ID와 Binding, Section ID가 현재 World registry와 일치해야 합니다.

### 표면 Query

`FPlanetXSurfaceQueryInput`에는 ray origin/direction과 선택 조건이 들어갑니다. `QuerySurfaceAtWorldRayDetailed`은 Hit/Miss 외에 InvalidInput과 RuntimeUnavailable을 구분하므로 gameplay 분기에 권장됩니다.

Geo 또는 `FPlanetXTransform`에서도 표면을 조회할 수 있습니다. 결과 `FPlanetXSurfaceQueryResult`에는 Planet, Section, hit 위치, normal과 좌표 정보가 포함됩니다.

### 착지와 Section

`BuildLandingTransform`은 query 결과로 surface-aligned 착지 pose를 만듭니다. `GetSectionTransform`, `GetSectionDesc`, `GetSectionRuntimeState`는 Section 계약과 현재 상태를 조회합니다.

### Component 벡터 API

Surface Up/Down/East/North, tangent projection, Surface/Planet/Section Local ↔ World vector 변환을 제공합니다. 위치와 벡터를 혼동하지 말고, 지표 입력에는 tangent projection 여부를 명시하세요.

## 이동과 중력

`UPlanetXMovementComponent`는 Coordinate Component가 resolve한 runtime context를 사용해 행성 기준 이동을 적용합니다.

### 설정

Movement Component의 UpdatedComponent가 유효해야 합니다. Reference Coordinate Component와 Planet gravity 설정을 확인하고 `ValidateMovementConfiguration`으로 오류 메시지를 받습니다.

`FPlanetXNativeMovementSettings`은 가속, 감속, 속도와 ballistic 동작을 정의합니다. `FPlanetXGravitySettings`은 행성 중심 방향의 가속을 정의하고 Planet Component의 `GetGravityAccelerationAtWorldLocation`으로 조회할 수 있습니다.

### 입력과 물리

| 함수 | 용도 |
| --- | --- |
| AddPlanetXInputVector | 선택 Frame의 이동 입력 누적 |
| Set/GetPlanetXVelocity | World/Planet/Section/Surface 속도 설정·조회 |
| AddPlanetXForce | Force 또는 acceleration change |
| AddPlanetXImpulse | Impulse 또는 velocity change |
| SnapToPlanetSurface | 고도와 표면 위치 보정 |
| AlignUpToPlanetSurface | Actor Up을 표면 normal에 정렬 |

Surface Frame 입력은 East/North/Up입니다. 지상 이동은 tangent projection을 켜고 점프·비행은 Up 성분 정책을 명시합니다.

### Runtime state

`GetMovementRuntimeState`에는 현재 velocity, gravity, resolve/failure 상태가 담깁니다. Game Instance facade의 단일·전체 state query는 디버그 UI와 telemetry에 사용할 수 있습니다.

### Handoff

World나 Movement Component를 교체할 때 velocity를 직접 복사하지 말고 Movement Handoff API를 사용하세요. frame continuity policy가 linear/angular velocity를 새 표면 frame에 맞춰 해석합니다.

## Same World 이동

Same World 이동은 Orbit과 Ground가 같은 World package에 있을 때 Actor를 Section의 Ground pose로 옮기고 다시 Orbit pose로 반환합니다.

### 계약

Level Pair의 OrbitWorld와 GroundWorld가 같은 package여야 합니다. Section의 GroundSyncMapping, transition bounds와 Surface Query가 유효해야 합니다. 이동할 Actor는 현재 World에서 resolve 가능한 Planet/Section context를 가져야 합니다.

### 명시 호출

1. Ray 또는 Geo query로 `FPlanetXSurfaceQueryResult`를 얻습니다.
2. `EnterGroundSameWorld(WorldContext, Actor, SurfaceQuery)`를 호출합니다.
3. Ground gameplay를 수행합니다.
4. `ReturnToOrbitSameWorld(WorldContext, Actor)`를 호출합니다.

진입 시 Journey와 capture가 만들어지고 Actor에 연결됩니다. 반환은 Actor에 연결된 정확한 Journey를 사용합니다.

### 자동 Spatial Entry

Coordinate Component에서 automatic same-world entry/return을 켤 수 있습니다. Runtime은 viewpoint/participant가 transition 경계를 넘는지 평가하고 안전한 시점에 pose를 적용합니다.

Return Pose Policy는 캡처한 Orbit pose 또는 현재 Ground Section-relative pose에서 복원하는 방식을 선택합니다. 현재 pose 기반 반환은 Ground에서 움직인 결과를 Orbit Section frame에 이어야 할 때 사용합니다.

### 실패 처리

Surface Query가 다른 Section/Planet이거나 Actor의 context가 모호하면 실패합니다. 자동 반환은 Orbit 표현이 준비될 때까지 기다릴 수 있습니다. `GetTransitionJourney`와 managed actor state로 상태를 확인하세요.

## Level Handoff

Level Handoff는 서로 다른 World package 사이에서 PlanetX pose와 Journey 상태를 전달합니다. 게임 코드는 레벨 로딩과 Pawn 생성 정책을 계속 소유합니다.

### 권장 흐름

`PrepareTravel`은 Source Actor, Surface Query, 명시적인 `FPlanetXTravelRoute`에서 Ticket을 만듭니다.

```cpp
FPlanetXLevelHandoffTicket Ticket;
FPlanetXLevelHandoffResult Result;
const bool bPrepared = PlanetXSubsystem->PrepareTravel(
    WorldContext, SourceActor, SurfaceQuery, TargetRoute, Ticket, Result);
```

성공하면 게임이 `Ticket.TargetWorld`로 이동합니다. 도착 후 한 개의 matching pending ticket만 존재할 때 `ResumePendingTravel`을 사용하거나, 저장한 Ticket으로 `CompleteLevelHandoff`를 호출합니다.

### 왕복

고급 API는 `BeginLevelHandoff` → `CompleteLevelHandoff` → `BeginReturnLevelHandoff(JourneyId)` → `CompleteLevelHandoff` 흐름을 제공합니다. `PrepareTravel`은 명시 route를 사용해 Ground에서 Orbit으로 직접 돌아갈 수도 있습니다.

### 안전 규칙

- matching pending travel이 없으면 PendingTravelNotFound
- 여러 개면 AmbiguousPendingTravel
- 오래된 Ticket generation은 StaleGeneration
- target Planet Binding을 아직 찾지 못하면 Travel Receiver가 timeout 안에서 retry 가능
- Level Handoff Ground pose는 capture에 저장된 Ground mapping이 authoritative

`ResumePendingTravel`은 latest ticket을 추측하지 않습니다. 멀티 Travel을 허용하는 프로젝트는 Ticket이나 Journey를 gameplay save state에 함께 관리하세요.

### 취소와 진단

미사용 Ticket은 `CancelLevelHandoff`로 취소합니다. Capture, Journey와 Result error를 로그에 함께 남기고 `GetActiveTransitionJourneys`로 누수를 확인하세요.

## Runtime Preview와 Budget

Runtime Preview는 External Level Section의 Ground 표현을 Orbit/Transition World에서 보여주는 gameplay-independent 렌더 host입니다.

### 로딩 수명 주기

`APlanetXRuntimePreviewActor`의 residency state는 Idle, LoadingRoot, LoadingPayloads, LoadingResources, Realizing, WaitingForRender, Resident, Failed 순으로 진행될 수 있습니다.

Game Instance facade는 다음을 제공합니다.

- LoadRuntimePreview
- SetRuntimePreviewVisible
- UnloadRuntimePreview
- GetRuntimePreviewStatus

직접 Actor를 사용할 때는 AssignPreviewBakeData, LoadPreviewFromBakeData, SetPreviewVisible, UnloadPreview와 renderable/component count query를 사용합니다.

### 표현 범위

Runtime Preview는 Proxy Static Mesh, baked ISM/HISM/Foliage instance batch를 하나의 root 아래에 만듭니다. gameplay Actor 복제, collision, navigation, tick 기반 동작은 의도적으로 포함하지 않습니다.

Loaded와 Renderable은 다릅니다. Resident라도 필요한 render resource가 아직 준비되지 않으면 presentation 전환을 기다려야 합니다.

### Runtime Budget

Project Settings의 **PlanetX Runtime**은 Follow Engine Scalability 또는 고정 profile 정책을 선택합니다. Proxy Bake Quality는 게시 revision의 immutable geometry 품질이고 Runtime Budget은 프레임당 realization·residency 작업량이므로 서로 독립적입니다.

### 관찰

`Stat PlanetXMemory`, `Stat PlanetXResources`, `Stat PlanetXProxy`, `Stat PlanetXRuntime`으로 memory, resource count, render, runtime service 비용을 확인합니다. `PlanetX.MemoryBudgetMB`와 자동 material MID budget warning도 함께 검토하세요.

## Environment Runtime

`APlanetXEnvironmentManager`는 Planet Asset의 환경 프로필과 현재 World의 Atmosphere, Cloud, Sun, Post Process, Space Background binding을 연결합니다.

### Binding 모드

PlanetX Managed 모드는 필요한 Component를 PlanetX profile에 맞춰 제어합니다. Use Existing Level 모드는 기존 SkyAtmosphere나 Volumetric Cloud를 유지하므로 Planet Asset profile과 수동으로 일치시켜야 합니다.

Managed Planet Actor가 있으면 Radius와 environment authoring 설정을 resolve합니다. Existing Sun Light가 없으면 저장된 Sun direction을 사용하지만 validation warning이 남을 수 있습니다.

### 초기화와 전환

- `ValidateEnvironmentBinding`: 필수 binding과 material/profile 조건 검사
- `CaptureEnvironmentStateFromBindings`: 현재 Level 값을 state로 캡처
- `ApplyEnvironmentState`: 저장 state 적용
- `ApplyInitialRuntimeSpace`: 시작 Orbit/Ground 표현 적용
- `SetEnvironmentTransition(From, To, Alpha)`: 두 공간 사이 보간

Orbit cloud/atmosphere render quality와 tracing override는 Apply/Restore 쌍으로 사용합니다. restore를 생략하면 기존 Level 품질 값이 남지 않을 수 있습니다.

### 자주 발생하는 경고

- Existing cloud/atmosphere 미지정
- PlanetX cloud와 existing Ground cloud 불일치
- MPC 미지정
- Planet Radius 또는 terminator softness가 0 이하
- Cloud shadow override에 Sun/Cloud source 누락
- Space Background material domain/blend/shading/Is Sky 설정 오류

환경 전환 문제는 binding validation부터 해결한 뒤 presentation Alpha를 조사하세요.

## Preview 탭

Planet Asset Editor의 **Preview** 탭은 전용 미리보기 World에서 Planet visual contract를 제작합니다. **Basic**은 자주 쓰는 항목, **Advanced**는 생성·환경 세부 설정을 제공합니다.

### Basic

Basic의 Planet, Sections, Environment 영역에서 다음을 빠르게 조정합니다.

- Atmosphere 활성화와 Radius 기반/Manual 높이
- Volumetric Clouds와 layer 높이
- 태양과 cloud shadow
- Post Process, convolution bloom, lens flare
- Section 선택과 preview

### Advanced

Advanced에서는 Planet Completion, Section Proxy Padding, material build와 Environment profile 전체를 편집합니다. 변경은 preview session에 적용되고 성공한 build가 Planet Asset revision과 연결됩니다.

### Preview 원칙

Preview는 제작 환경이며 Runtime World 자체가 아닙니다. Runtime Preview는 Proxy Bake가 게시한 payload를 읽는 별도 경로입니다. Preview에서 좋아 보이더라도 Diagnostics의 stale 상태와 Runtime Preview readiness를 확인해야 합니다.

### 조작과 진단

Preview viewport는 행성 반지름에 맞춰 카메라 속도와 framing을 조정합니다. 실패한 Padding Material Preview는 실패 Section 수를 표시하며 `PlanetX.VisualEdit.Dump`에서 상세 원인을 확인할 수 있습니다.

변경 전후에는 저장하고, Section geometry와 Material source가 바뀌면 Completion/Padding과 Proxy Bake의 stale 상태를 모두 검토하세요.

## Completion과 Padding

Completion은 Section 사이에서 보이지 않는 행성 표면을 생성하고, Padding은 Section proxy 경계가 구형 행성 표현과 자연스럽게 이어지도록 보강합니다.

### Completion

Surface Completion 설정은 생성 topology, cutout, terrain noise와 surface material을 제어합니다. 생성기는 동일 입력에 대해 결정적인 결과를 만들고 polygon, boundary, mesh attribute를 검증합니다.

Terrain Region은 행성 표면의 특정 구역에 noise parameter를 적용합니다. 큰 noise나 잘못된 cutout이 proxy 아래로 침범하지 않는지 Preview에서 확인하세요.

### Padding

Proxy Padding은 Section boundary loop를 선택하고 adaptive subdivision과 projection으로 연결 geometry를 만듭니다. Transition strip과 shared seam은 경계의 위치·normal·material provenance를 유지합니다.

성능 budget에는 boundary edge, generated vertex, index, compact binding, MID 수의 warning/hard 기준이 있습니다. Warning은 결과를 게시할 수 있지만 runtime 비용을 검토해야 함을 뜻합니다.

### Material build

Padding Material Build는 source material layout을 수집하고 필요한 texture/material asset을 생성합니다. Source Material asset path가 같더라도 내용이 바뀌면 Editor validation이 stale 상태를 찾습니다. Package 전에 다시 build하세요.

### 실패 시 확인

- Section bounds와 boundary loop 유효성
- Proxy Bake revision과 generated visual geometry hash
- Source Material layout과 slot remap
- projection tolerance와 Planet Radius
- performance budget warning

## 재질과 Surface Preset

PlanetX 재질 경로는 원본 Section material, Proxy Bake가 게시한 material identity, Completion/Padding용 생성 material을 구분합니다.

### Surface Preset

`UPlanetXSurfacePreset`은 Completion과 행성 표면의 재사용 가능한 스타일을 담는 Primary Data Asset입니다. Preset을 Planet Asset의 Active Surface Preset으로 지정하면 authoring 설정이 해당 선택을 참조합니다.

Preset은 material, terrain/noise 성격과 시각 파라미터를 공유하는 데 사용하고 Planet ID나 Section geometry 같은 구조 계약을 대신하지 않습니다.

### Proxy material

`UPlanetXPlanetProxyComponent`의 Planet Material Override는 행성 sphere 표현을 교체합니다. Section proxy material은 BakeData의 canonical slot과 remap을 따라야 합니다. 임의로 slot 순서를 바꾸면 boundary와 padding material provenance가 어긋날 수 있습니다.

### 자동 Padding material

Runtime binder는 generated visual의 binding descriptor와 Source Material identity를 확인한 뒤 MID를 준비합니다. geometry revision, slot, texture set이 일치하지 않으면 error material 또는 경고가 사용될 수 있습니다.

### 권장 사항

- Source Material을 변경한 뒤 Full Validate 실행
- stale Generated Material을 package 전에 rebuild
- Material slot 순서를 Bake와 Visual build 사이에서 유지
- Sky material은 지표 Proxy Bake 소스로 사용하지 않음
- 동적 재질은 결정적으로 캡처 가능한 파라미터만 사용

## 환경 제작

환경 프로필은 **Planet Asset Editor > Preview > Advanced > Environment**에서 제작합니다. Atmosphere, Clouds, Sun, Post Process, Space Background가 하나의 `FPlanetXEnvironmentAuthoringSettings`에 저장됩니다.

### Atmosphere와 Clouds

Atmosphere 높이는 Planet Radius 비율로 자동 계산하거나 수동 km 값으로 지정할 수 있습니다. Rayleigh, Mie, absorption, aerial perspective와 ground albedo를 조정합니다.

Clouds는 layer bottom/height, lighting, atmosphere interaction, shadow parameter를 가집니다. 기존 Level cloud를 사용할 때 PlanetX cloud와 설정이 다르면 Orbit/Ground 전환에서 불일치가 생길 수 있습니다.

### Sun과 Post Process

Sun profile은 atmosphere sun light, cloud shadow, shadow extent와 품질을 정의합니다. Post Process에서는 planet profile, convolution bloom, lens flare를 제어합니다. Project Settings의 PlanetX Rendering도 lens flare 기본 console variable을 적용합니다.

### Space Background

Space Background material은 Surface domain, Opaque, Unlit, Is Sky 설정을 권장합니다. Planet Asset Defaults를 source로 선택하면 연결된 Managed Planet Actor와 Planet Asset이 필요합니다.

### Runtime 연결

레벨의 `APlanetXEnvironmentManager`에 Planet Actor, Sun, Atmosphere, Volumetric Cloud와 MPC를 연결합니다. ValidateEnvironmentBinding으로 누락·불일치를 확인한 뒤 ApplyInitialRuntimeSpace 또는 SetEnvironmentTransition을 사용합니다.

## 설정 레퍼런스 안내

이 카테고리는 현재 PlanetX 코드에서 사용자가 조정할 수 있는 설정을 소유 객체와 작업 화면별로 정리합니다. 설정 이름은 Unreal Editor의 Details 패널 또는 C++ 속성 이름과 대응하며, 기본값은 새 객체를 만들었을 때의 코드 기본값입니다.

### 어디에서 무엇을 설정하나요?

| 문서 | 설정 위치 | 주요 대상 |
| --- | --- | --- |
| [Planet Asset과 비주얼 설정](/docs/ko/planet-visual-settings) | Planet Asset Editor, Surface Preset | 행성 생성 계약, Completion, Padding, Section, Level Pair, Preview와 Build |
| [Proxy Bake 설정](/docs/ko/proxy-bake-settings) | PlanetX Proxy Bake Editor | 대상 Asset, Runtime Role, Source Scope, 품질, 출력 Partition, 실행 메모리 |
| [런타임 Actor와 Component 설정](/docs/ko/runtime-component-settings) | Actor와 Component Details | Planet, Coordinate, Movement, Viewpoint, Travel Receiver, Transition Endpoint |
| [Proxy·Morph·Preview 설정](/docs/ko/proxy-transition-settings) | Planet Proxy, Transition Morph, Runtime Preview | 표시 계층, Surface Correction, Morph 렌더링, Runtime Budget Override |
| [환경 설정](/docs/ko/environment-settings) | Planet Asset Environment, Environment Manager | 대기, 구름, 태양, Post Process, Space Background, Level Binding |
| [프로젝트와 성능 설정](/docs/ko/project-settings) | Project Settings > Plugins | Runtime Budget 정책과 Lens Flare 품질 |

### 설정과 생성 데이터 구분

PlanetX의 reflected 구조체에는 사용자가 선택하는 설정뿐 아니라 Bake 결과, Runtime Capture, 쿼리 입력과 진단 데이터도 포함됩니다.

- **사용자 설정**은 이 카테고리에서 기본값, 단위, 효과를 설명합니다.
- **조건부 설정**은 선행 토글이나 Mode가 활성화될 때만 사용됩니다. 표의 조건을 함께 확인하세요.
- **생성 데이터**는 Proxy Bake 또는 Visual Build가 작성합니다. Details에 표시되더라도 수동 편집하지 않는 것이 원칙입니다.
- **요청·결과 구조체**는 함수 호출마다 전달되는 값이며 저장형 프로젝트 설정이 아닙니다. 해당 필드는 [공개 API 레퍼런스](/docs/ko/api-overview)에서 설명합니다.

### 기본값을 변경하기 전 확인할 점

1. Planet ID, Radius, Coordinate Convention은 Planet Asset 생성 시 확정되는 계약입니다. 기존 Asset에서 직접 바꾸는 설정이 아닙니다.
2. Proxy Bake Quality와 Runtime Budget은 서로 독립적입니다. 품질을 바꾸면 생성 결과가 달라질 수 있지만 Runtime Budget 변경은 이미 Bake된 Asset을 다시 만들지 않습니다.
3. Override 토글이 꺼져 있으면 Component는 Project Settings 또는 Planet Asset의 값을 사용합니다.
4. Proxy Bake, Section 배치, Visual 설정을 바꾼 뒤에는 표시되는 Stale 상태를 확인하고 필요한 Bake 또는 Apply & Build를 다시 실행하세요.
5. 최종 패키징 전에는 Planet Asset의 Full Validate와 현재 World의 Validate를 모두 실행하세요.

### 공개 코드 기준

이 레퍼런스는 PlanetX 1.0에 포함된 다음 공개 헤더를 기준으로 작성되었습니다.

```text
Source/PlanetX/Public/PlanetX
```

Public 헤더에 존재한다는 이유만으로 모든 데이터 구조체가 일반 사용자 설정이 되는 것은 아닙니다. 이 문서는 Editor에서 조정 가능한 값, Project Config 값, 공개 작업 옵션을 설정 범위로 다루고, 파이프라인이 생성하는 payload와 capture는 별도로 표시합니다.

## Planet Asset과 비주얼 설정

거리와 크기는 별도 표기가 없으면 Unreal Unit인 cm입니다.

### 생성 시 확정되는 Planet 계약

| 항목 | 의미 |
| --- | --- |
| Planet ID | 프로젝트와 런타임에서 행성을 식별하는 고유 `FName`입니다. 생성 후 immutable입니다. |
| Radius | 행성 반지름입니다. 생성 UI는 km를 받을 수 있지만 Asset은 cm로 저장하며, 최소 유효 반지름은 1 cm입니다. Bake와 Visual Build 계약에 포함되므로 생성 후 직접 변경하지 않습니다. |
| Coordinate Convention | North Pole, 경도 0/90도 축, 경도 방향, Source X/Y/Z 매핑과 `UnrealUnitToCm`을 정의합니다. 생성 후 immutable입니다. 기본 축은 Up/Forward/Right, 반시계 경도, X=East, Y=North, Z=Up, 1 uu=1 cm입니다. |

### Authoring Geometry Settings

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `DetailLevel` | `Medium` | `Low`, `Medium`, `High`, `Custom` 중 Preview 행성 메시 등급을 선택합니다. |
| `PreviewSegmentCount` | 64, 8–512 | 절차적 Preview 구의 세그먼트 수입니다. 높일수록 윤곽은 부드러워지지만 Preview 비용이 증가합니다. |
| `PreviewVertexBudget` | 10,000, 128–1,000,000 | Preview 생성이 사용할 수 있는 정점 상한입니다. |
| `ProxyTextureResolution` | 2048, 256–8192 | Proxy/Visual 저작 과정의 목표 텍스처 해상도입니다. 메모리와 Build 시간을 함께 고려하세요. |
| `bUseCustomPreviewMesh` | false | 자동 Preview 메시 대신 `CustomPreviewMesh`를 사용합니다. |
| `CustomPreviewMesh` | None | Custom Preview가 켜졌을 때 사용할 Static Mesh입니다. |
| `LowPreviewMesh` | None | Low 등급에 명시적으로 사용할 Preview Static Mesh입니다. |
| `MediumPreviewMesh` | None | Medium 등급에 명시적으로 사용할 Preview Static Mesh입니다. |
| `HighPreviewMesh` | None | High 등급에 명시적으로 사용할 Preview Static Mesh입니다. |

### Surface Completion Settings

Section이 덮지 않는 행성 표면을 생성하는 설정입니다.

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `CompletionMeshDetailLevel` | 6, 0–7 | Completion 구 메시의 세부 단계입니다. 높은 값은 정점 수와 Build 비용을 증가시킵니다. |
| `CompletionNoiseSeed` | 1337 | 같은 설정에서 재현 가능한 Terrain Noise 배치를 결정합니다. |
| `CompletionNoiseStrengthPercent` | 10%, 0–25 | 반지름 대비 표면 높이 변화의 강도입니다. |
| `CompletionNoiseScale` | 3.0, 0.001–25 | Noise 공간 주파수/스케일을 조정합니다. |
| `TerrainRegionProfiles` | 4개 | Noise 지역의 `Strength`와 `Sharpness` 조합입니다. 배열은 1–8개를 사용하며 기본 쌍은 `(0.20,1.25)`, `(0.45,2.00)`, `(0.70,3.25)`, `(1.00,4.50)`입니다. |
| `TerrainRegionProfiles[].Strength` | 0.5, 0–1 | 해당 지역의 높이 영향도입니다. |
| `TerrainRegionProfiles[].Sharpness` | 2.0, 0.5–8 | 지역 경계의 집중도를 정합니다. |
| `CompletionMaterial` | None | Completion 표면에 적용할 Material입니다. Section Material과 이어질 수 있도록 PlanetX의 Visual Build 결과를 확인하세요. |
| `BlendSharpness` | 1.0, 0.01–8 | Completion과 인접 표면의 Material Blend 경계 선명도입니다. |

### Proxy Padding Settings

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `GeometryPaddingWidthCm` | 100,000, 0 이상 | Section Proxy 외곽에서 Completion으로 이어지는 기하 패딩 폭입니다. |
| `MaterialTransitionWidthRatio` | 0.1, 0–0.5 | 전체 Padding 폭 중 Material 전이에 사용하는 비율입니다. |
| `PaddingMaterialBakeResolution` | 2048, 256–2048 | Padding Material Bake 출력 해상도입니다. |
| `MaterialBakeBindings` | 빈 배열 | Visual Build가 Section별 Padding Material 결과를 기록하는 생성 데이터입니다. 항목을 직접 편집하지 마세요. |
| `PaddingSegmentCount` | 8, 1–128 | 패딩 폭 방향의 기하 세그먼트 수입니다. |
| `RingDistributionStrength` | 2.0, 1–4 | Padding Ring을 경계 쪽에 분배하는 강도입니다. |
| `HeightTransitionStrength` | 1.0, 0–4 | Proxy 높이에서 Completion 높이로 이어지는 보정 강도입니다. |

#### Padding Performance Budget

Warning 값은 경고를 만들고 Hard 값은 과도한 Build를 차단하는 상한입니다. Hard 값은 대응 Warning 값보다 작게 두지 마세요.

| 설정 | 기본값 | 측정 대상 |
| --- | ---: | --- |
| `WarningBoundaryEdgeCount` / `HardBoundaryEdgeCount` | 10,000 / 100,000 | 추출된 경계 Edge 수 |
| `WarningGeneratedVertexCount` / `HardGeneratedVertexCount` | 200,000 / 5,000,000 | 생성 정점 수 |
| `WarningIndexCount` / `HardIndexCount` | 1,000,000 / 15,000,000 | 생성 Index 수 |
| `WarningCompactBindingCount` / `HardCompactBindingCount` | 64 / 256 | Compact Material Binding 수 |
| `WarningTotalMidCount` / `HardTotalMidCount` | 64 / 256 | 전체 중간 Ring/중간 결과 수 |

### Transition Distance Settings

| 설정 | 기본값 | 설명 |
| --- | ---: | --- |
| `TransitionStartDistance` | 50,000 | Ground/Proxy 전환을 시작하는 기준 거리입니다. |
| `ApproachStartDistance` | 75,000 | 접근 상태를 시작하는 기준 거리입니다. 보통 Transition 거리보다 바깥쪽에 둡니다. |
| `LandingSelectionDistance` | 30,000 | Landing 후보 Section을 선택하는 거리입니다. |
| `CameraBlendDistance` | 15,000 | 전환 표현에서 카메라 Blend에 사용하는 거리입니다. |

모든 값은 0 이상이어야 합니다. 실제 Runtime의 Section 로드/표시 Alpha는 Level Pair의 `TransitionPolicy`가 소유합니다.

### Preview와 Build Settings

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bPreviewProxyRegion` | true | Proxy 영역 Preview를 표시합니다. |
| `bPreviewVisualBlendPadding` | true | Visual Blend Padding을 표시합니다. |
| `bPreviewGeometricPadding` | true | 기하 Padding을 표시합니다. |
| `bPreviewCompletionRegion` | true | Completion 영역을 표시합니다. |
| `bPreviewTransitionDistance` | true | 전환 거리 시각화를 표시합니다. |
| `bRealtimeMaterialPreview` | true | 설정 변경 중 Material Preview를 실시간 갱신합니다. |
| `PreviewDebugMode` | `FinalSurface` | `FinalSurface`, `ProxyRegion`, `VisualPaddingRegion`, `GeometricPaddingRegion`, `CompletionRegion`, `BlendMask`, `LandingMask`, `TransitionDistance` 중 표시 채널을 선택합니다. |
| `FakeProxyRegion.ProxyUVMin` / `ProxyUVMax` | (0.35,0.35) / (0.65,0.65) | 실제 Section이 없을 때 사용하는 테스트 Proxy UV 사각형입니다. |
| `FakeProxyRegion.FakeProxyColor` | (0.1,0.6,0.2,1) | 테스트 Proxy 색상입니다. |
| `FakeProxyRegion.FakeProxyHeightOffset` | 500 | 테스트 Proxy 높이 Offset입니다. |
| `FakeProxyRegion.FakeCompletionHeightOffset` | 0 | 테스트 Completion 높이 Offset입니다. |
| `AuthoringOutputFolder` | 비어 있음 | Visual Build 생성 Asset의 출력 폴더입니다. 비어 있으면 Editor가 대상 Asset 기준 경로를 결정합니다. |
| `bAllowGeneratedAssetOverwrite` | false | 동일한 생성 경로의 Asset 덮어쓰기를 허용합니다. 출력 대상이 맞는지 확인한 뒤에만 켜세요. |

### Section Settings

Section 목록은 Planet Asset Editor와 Proxy Bake가 관리합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `SectionId` | None | Planet 내부의 안정적인 Section 식별자입니다. |
| `DisplayName` | 비어 있음 | Editor에서 표시할 이름입니다. Runtime 식별에는 `SectionId`를 사용합니다. |
| `Placement.CenterGeo` | (0°,0°,0 cm) | Section 중심의 위도, 경도, 고도입니다. |
| `Placement.YawDeg` | 0° | Surface Frame을 기준으로 한 Section 회전입니다. |
| `Placement.Scale` | 1.0, 0보다 큼 | Section의 균일 배율입니다. |
| `Placement.LocalExtentCm` | (100,000,100,000) | Section Local X/Y 반폭입니다. |
| `Placement.bLockToSurface` | true | 중심을 행성 표면 계약에 고정합니다. |
| `SurfaceCorrectionSettings.Mode` | `Disabled` | `Disabled`, Bake 정점에서 계산하는 `Automatic`, 직접 Offset을 쓰는 `Manual` 중 선택합니다. |
| `SurfaceClearanceCm` | 1.0, 0 이상 | Automatic이 최저 Bake 정점을 표면으로 올린 뒤 추가하는 바깥쪽 여유입니다. |
| `ManualOffsetCm` | 0, 0 이상 | Manual에서 적용하는 바깥쪽 Offset입니다. |
| `LevelPairId` | None | Section이 참조하는 Level Pair ID입니다. |
| `bEnabled` | true | 꺼진 Section은 Runtime 표현과 이동 대상에서 제외됩니다. |

Same World Section은 North Pole Anchor 계약 때문에 위도, 경도, Yaw, Scale이 잠깁니다. Altitude만 Ground 접촉 높이 보정에 사용할 수 있습니다. `Bounds`, `RegionSet`, `SourceRef`, `ProxyBakeData`와 각 사각형/Hash는 Scan/Bake가 생성하는 데이터이므로 수동 편집하지 마세요.

### Level Pair와 Transition Policy

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `LevelPairId`, `PlanetId`, `SectionId` | None | Pair의 안정적인 연결 ID입니다. Editor/Bake가 일관되게 관리해야 합니다. |
| `EntryMode` | `SameWorld` | 같은 World에서 표현을 전환할지, 별도 World로 `LevelHandoff`할지 정합니다. |
| `HandoffBackend` | `OpenLevel` | `OpenLevel`, `SeamlessTravel`, `PreparedMapChange` 계약을 기록합니다. PlanetX가 Level을 직접 여는 것은 아닙니다. |
| `PlanetSyncMode` | `None` | Travel 중 Planet Actor 동기화 정책입니다. 명시적으로 필요한 프로젝트에서만 변경하세요. |
| `OrbitWorld` / `GroundWorld` | None | Same World는 같은 Package, Level Handoff는 서로 다른 저장된 World여야 합니다. |
| `bCanEnterGround` | true | Ground 진입 가능 여부입니다. |
| `bVisualOnly` | false | true이면 이 Pair를 시각 전용으로 취급하고 Gameplay 진입 대상으로 사용하지 않습니다. |
| `TransitionPolicy.PreloadAlpha` | 0.0, 0–1 | Runtime Preview preload를 요청하는 전환 Alpha입니다. |
| `TransitionPolicy.VisibleAlpha` | 0.25, 0–1 | Preview 표시를 시작하는 Alpha입니다. |
| `TransitionPolicy.HideAlpha` | 0.15, 0–1 | 복귀 시 Preview를 숨기는 Alpha입니다. Hysteresis를 위해 보통 `VisibleAlpha`보다 낮게 둡니다. |
| `TransitionPolicy.UnloadDelaySeconds` | 5 s, 0 이상 | 숨긴 Preview를 unload하기 전 대기 시간입니다. |
| `TransitionPolicy.bKeepPreviewLoaded` | false | true이면 숨겨져도 Runtime Preview를 상주 상태로 유지합니다. |
| `TransitionPolicy.GroundProxyVisibility` | `Hidden` | Ground 활성 시 `Hidden`, `HorizonOnly`, `FullProxy` 중 남길 Planet/Section Proxy 범위를 정합니다. |

### Surface Preset

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PresetId` | None | Preset 식별자입니다. |
| `DisplayName` | 비어 있음 | Editor 표시 이름입니다. |
| `PresetType` | `Custom` | Preset 분류입니다. |
| `CompletionSettings` | 구조체 기본값 | 위 Completion 설정 묶음입니다. |
| `PaddingSettings` | 구조체 기본값 | 위 Padding 설정 묶음입니다. |
| `BaseSurfaceMaterial` | None | Preset의 기본 표면 Material입니다. |
| `OptionalBiomeMask` | None | 선택적인 Biome Mask Texture입니다. |
| `OptionalHeightMask` | None | 선택적인 Height Mask Texture입니다. |

`ActiveSurfacePreset`을 Planet Asset에 지정한 뒤에도 실제 Build 입력이 의도한 값인지 Preview에서 확인하고 Apply & Build를 실행하세요.

### Planet Asset의 설정 묶음 이름

Details/API에서 `AuthoringGeometrySettings`, `SurfaceCompletionSettings`, `ProxyPaddingSettings`, `TransitionDistanceSettings`, `ShapeEditorSettings`가 위 표의 각 설정 묶음을 소유합니다. `ProxyPaddingSettings.PerformanceBudget`은 Padding Warning/Hard 상한 묶음입니다.

## Proxy Bake 설정

Basic/Advanced 전환 상태, Bake Quality, 요청한 Source Representation은 Editor 사용자 설정에 저장됩니다.

### 1 Target Planet Asset

| 설정 | 설명 |
| --- | --- |
| `Planet Asset` | 생성될 Section과 Bake 링크를 소유하는 Asset입니다. 행성 반지름, 출력 ID, Projection과 최종 `ProxyBakeData` 연결의 기준입니다. |

Planet Asset이나 Source World가 바뀌면 기존 Scan Plan은 stale 상태가 됩니다. 새 대상에 대해 다시 **Scan Sources**를 실행하세요.

### 2 Runtime Role

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `Presentation` | `Same World` | `Same World`는 Planet과 Ground가 같은 World Package에 있고 표시만 전환합니다. `External Level`은 코드의 `LevelHandoff`이며 별도 Ground World와 시각 전용 Runtime Preview World를 사용합니다. |
| `Ground World` | 현재 Source World | Scan/Bake 대상 World에서 자동 결정되는 읽기 전용 값입니다. |
| `Planet World` | None | External Level에서만 표시됩니다. Ground로부터 돌아올 Planet Actor가 있는 Orbit World를 지정합니다. Ground World와 다른 저장된 World여야 합니다. |

Level Handoff의 backend 계약 기본값은 `OpenLevel`입니다. PlanetX는 상태를 capture/resume하지만 실제 Open Level, Pawn 생성, Possess 흐름은 게임이 수행합니다.

### 3 Source Scope

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

### Source Review

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

### Bake Quality

Quality는 생성 결과에 기록되는 immutable authoring preset입니다.

| Preset | Static Mesh triangle budget | Projection scale / max segments | Landscape spacing / resolution |
| --- | ---: | ---: | ---: |
| Low | coarsest LOD의 1배 | 4.0 / 8 | 800 cm / 17–129 |
| Medium | coarsest LOD의 2배 | 2.0 / 12 | 600 cm / 25–193 |
| High (Recommended) | coarsest LOD의 4배 | 1.0 / 16 | 400 cm / 33–257 |

High도 무제한 원본 LOD를 뜻하지 않습니다. 가장 거친 유효 LOD의 triangle count에 배수를 적용한 범위에서 가장 정밀한 LOD를 선택해 기하 증가를 제한합니다.

### Advanced Projection과 Output Plan

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

### Advanced Execution Budget

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

### 공개 고급 옵션: `FPlanetXProxyBakePartitionDesc`

이 구조체는 Transition Morph나 공개 C++ 경로의 projection 계약입니다. 일반 Proxy Bake UI에서는 Target Asset과 Plan으로부터 생성됩니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PartitionOrigin` | (0,0,0) | 평면 partition frame의 원점입니다. |
| `PartitionEast` / `PartitionNorth` / `PartitionUp` | Forward / Right / Up | 서로 직교하는 partition frame 축입니다. |
| `PlanetRadius` | 100,000, 최소 1 | 곡면 projection의 행성 반지름입니다. |
| `PartitionRadius` | 10,000, 최소 1 | partition의 유효 반경입니다. |
| `SphereLatitudeSegments` / `SphereLongitudeSegments` | 250 / 250, 최소 3 | 고정 구 표면 표본 해상도입니다. |

### 공개 고급 옵션: `FPlanetXProxyBakeOptions`

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

## 런타임 Actor와 Component 설정

### Planet Component

`UPlanetXPlanetComponent`는 `APlanetXPlanetActor`의 Runtime 등록과 행성 중력 기준을 소유합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PlanetAsset` | None | 이 Actor가 표현할 `UPlanetXPlanetAsset`입니다. Runtime 등록, Section, 좌표와 Visual 계약의 기준입니다. |
| `PlanetBindingId` | None | 같은 Planet ID를 가진 여러 Actor를 World 안에서 구분합니다. 비어 있으면 Owner Actor 이름을 사용합니다. Actor 이름이 바뀌어도 Travel Ticket을 유지해야 하면 명시적으로 지정하세요. |
| `bAutoRegisterRuntime` | true | Begin Play에 Runtime Registry에 자동 등록합니다. 끄면 공개 등록 API를 직접 호출해야 합니다. |
| `bRefreshRuntimeRegistrationOnTransformChange` | true | Planet Actor Transform이 바뀌면 Runtime 등록 Transform을 갱신합니다. |
| `GravitySettings.bEnabled` | true | 이 Planet의 중력 쿼리를 활성화합니다. |
| `GravitySettings.Model` | `ConstantSurface` | `ConstantSurface`는 표면 가속도를 유지하고 `InverseSquare`는 중심 거리의 제곱에 반비례시킵니다. |
| `SurfaceAccelerationCmPerSecondSquared` | 980 cm/s², 0 이상 | 행성 표면 기준 중력 가속도입니다. |
| `MaximumAccelerationCmPerSecondSquared` | 100,000 cm/s², 0 이상 | 중심 근처에서 Inverse Square 가속도가 과도해지는 것을 제한합니다. |

### Coordinate Component

`SpatialEntryPolicy`는 아래 Same World 자동 진입/복귀 설정 묶음입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAutoRegisterRuntime` | true | Owner를 PlanetX Runtime 참여 Actor로 자동 등록합니다. |
| `RepresentationDomain` | `Ground` | Actor의 기본 표현 소속입니다. `Ground`는 원본 Level, `Orbit`은 Planet/Compare와 Runtime Orbit/Transition 표현에 사용됩니다. |
| `ActorSpatialLoadingPolicy` | `PlanetXManaged` | `PlanetXManaged`는 Orbit Actor를 non-spatial/always-loaded로 유지합니다. `ActorManaged`는 개발자가 `Is Spatially Loaded`를 직접 관리합니다. Data Layer와 Streaming Source는 이 옵션이 관리하지 않습니다. |
| `ReferencePlanetActor` | None | 좌표 기준 Planet Actor입니다. 유효한 Planet Asset을 가진 Actor만 사용할 수 있고, 지정하면 `ReferencePlanetId`보다 우선합니다. |
| `ReferencePlanetId` | None | Planet Actor가 없을 때 사용할 ID입니다. 목록은 현재 World에 배치된 Planet Component의 Asset에서 구성됩니다. |
| `ReferenceSectionId` | None | 현재 Planet Asset의 enabled Section ID입니다. 저장, Capture, Sequencer처럼 재현성이 필요한 경로에서는 명시적으로 지정하세요. |
| `bAutoResolveSectionFromWorld` | true | Section ID가 None이면 현재 Planet Local 위치를 포함하는 첫 Section을 Asset 배열 순서로 찾습니다. Editor 편의와 일회성 Query용이며 영속 ID로 사용하지 마세요. |
| `bSyncFromOwnerTransformInEditor` | true | Editor에서 Root Transform이 바뀔 때 좌표 snapshot을 갱신합니다. Runtime authoritative state는 World Runtime Subsystem이 관리합니다. |
| `TransformSource` | `WorldTransform` | `WorldTransform`은 Owner Transform에서 PlanetX pose를 capture합니다. `PlanetXTransform`은 저장된 표준 pose를 원본으로 World Transform을 만듭니다. 전환은 자동으로 양쪽 값을 덮어쓰지 않습니다. |

#### Spatial Entry Policy

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAutomaticSameWorldEntryEnabled` | false | Orbit에서 Same World Ground 영역으로 들어갈 때 좌표/Actor 이동을 자동 적용합니다. |
| `bAutomaticSameWorldReturnEnabled` | false | Ground 영역을 벗어날 때 Orbit 표현으로 자동 복귀합니다. |
| `SameWorldReturnPosePolicy` | `PreserveCurrentLogicalPose` | 현재 Ground 이동 결과를 유지합니다. `RestoreEntryOrbitPose`는 진입 시 Orbit pose로 복원합니다. |
| `MovementContinuityPolicy` | `RebaseBetweenFrames` | `Reset`, `PreserveWorld`, Frame 사이 속도를 변환하는 `RebaseBetweenFrames`, 적용하지 않는 `DoNotApply` 중 이동 연속성을 선택합니다. |

#### PlanetX Transform

`TransformSource=PlanetXTransform`일 때 아래 값이 authoritative 입력입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PlanetId` | None | 행성 식별자입니다. |
| `PlanetBindingId` | None | 현재 World의 Planet Actor binding입니다. Runtime resolve에는 비어 있지 않아야 합니다. |
| `PlanetFixedPositionCm` | (0,0,0) | 행성 고정 좌표의 위치입니다. |
| `PlanetFixedRotation` | Identity | 정규화된 행성 고정 회전 Quaternion입니다. |
| `Scale3D` | (1,1,1) | 유한한 Actor Scale입니다. |

### Movement Component

`UPlanetXMovementComponent`는 PlanetX native 이동을 사용할 때 추가합니다. 기존 Character Movement만 사용할 프로젝트에는 필수가 아닙니다.

`NativeMovementSettings`와 `SurfaceAlignmentSettings`는 아래 두 하위 표의 설정 묶음입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `CoordinateComponent` | None | 기준 Coordinate Component입니다. 비어 있으면 Owner에서 resolve할 수 있지만 명시적 연결이 더 확실합니다. |
| `bApplyPlanetGravity` | true | PlanetX 중력을 이동에 적용합니다. |
| `bApplyPlanetGravityInGround` | false | Ground 상태에서도 PlanetX 중력을 적용합니다. 기존 Character/Physics 중력과 중복되지 않게 주의하세요. |
| `GravityScale` | 1.0, 0 이상 | Planet Component의 gravity acceleration에 곱하는 배율입니다. |
| `bAutoRegisterRuntime` | true | Runtime movement registry에 자동 등록합니다. |

#### Native Movement Settings

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `MassKg` | 1 kg, 최소 0.001 | 힘/가속도 계산의 질량입니다. |
| `MaximumSpeedCmPerSecond` | 1,200 cm/s | native 이동 최고 속도입니다. |
| `AccelerationCmPerSecondSquared` | 4,096 cm/s² | 입력 시 가속도입니다. |
| `DecelerationCmPerSecondSquared` | 4,096 cm/s² | 입력이 줄었을 때 감속도입니다. |
| `bConstrainInputToSurface` | false | 입력 벡터에서 Surface Up 성분을 제거해 접평면에 제한합니다. |
| `bAlignUpToSurface` | true | Actor Up을 행성 Surface Up에 맞춥니다. |
| `bSweepInOrbit` | false | Orbit 이동 시 collision sweep을 사용합니다. |
| `bSweepInGround` | true | Ground 이동 시 collision sweep을 사용합니다. |
| `bMaintainSurfaceAltitude` | false | 이동 중 지정 Surface Altitude를 유지합니다. |
| `SurfaceAltitudeCm` | 0 cm | 유지할 표면 고도입니다. |

#### Surface Alignment Settings

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bPreserveCurrentForward` | true | Up을 표면에 맞출 때 현재 Forward를 접평면에 투영해 최대한 보존합니다. |
| `FallbackForwardWorld` | World Forward | 현재 Forward가 Up과 평행해질 때 사용할 fallback 방향입니다. |
| `BlendTimeSeconds` | 0.25 s, 0 이상 | 표면 정렬 회전 Blend 시간입니다. 0이면 즉시 적용합니다. |

공개 Surface Snap 요청의 `TargetAltitudeCm`은 목표 표면 고도이고 `bSweep`은 그 위치로 이동할 때 충돌 Sweep을 사용할지 결정합니다.

### Viewpoint Component

실제 PlayerController View Target과 활성 Camera가 있는 Actor에 두세요.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAutoRegisterRuntime` | true | Viewpoint Registry에 자동 등록합니다. |
| `bCanDriveTransitionState` | true | 이 Viewpoint가 Orbit/Transition/Ground 상태 계산을 주도할 수 있습니다. 여러 Viewpoint 중 관찰용은 끄세요. |
| `PresentationCompensationMode` | `Automatic` | `Automatic`은 적절한 movable child를 찾고, `Disabled`는 보정을 끄며, `ExplicitComponent`는 지정 Component만 움직입니다. Actor Root는 보정 대상으로 이동하지 않습니다. |
| `TransitionPresentationComponent` | None | Explicit 모드에서 presentation compensation을 받을 movable child Scene Component입니다. |

### Travel Receiver Component

Level Handoff 뒤 새 World의 Actor가 pending capture를 복원하는 설정입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAutoResumePendingTravel` | true | Begin Play 이후 pending travel을 자동 resume합니다. 완전 수동 `ResumePendingTravel` 흐름에서는 끄세요. |
| `bApplyControlRotation` | true | Capture한 Controller 회전을 도착 Actor에 복원합니다. 프로젝트가 카메라 방향을 별도로 결정하면 끄세요. |
| `ArrivalRetryTimeoutSeconds` | 15 s, 최소 0, UI 최대 30 | OpenLevel 후 Planet Actor 등록이 늦을 때 재시도하는 제한 시간입니다. 0이면 지연 재시도를 하지 않습니다. |

### Transition Endpoint

PlanetX Mode의 Add Endpoint가 ID와 Actor 참조를 채우는 것이 가장 안전합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PlanetId`, `SectionId`, `LevelPairId` | None | Orbit/Ground Endpoint가 공유하는 이동 계약 ID입니다. |
| `EndpointRole` | `Orbit` | 이 World-local Endpoint가 Orbit 쪽인지 Ground 쪽인지 지정합니다. |
| `PlanetAsset` | None | canonical Transition Policy의 원본입니다. Ground Endpoint에는 필수이며 Orbit은 Planet Actor에서 추론할 수 있습니다. |
| `PlanetActor` | None | Orbit Endpoint에서 사용하는 Planet Actor입니다. |
| `EnvironmentManagerActor` | None | 상태 변화와 함께 환경 표현을 전환할 Manager입니다. |
| `bAutoSizeTransitionCylinderToSectionBounds` | true | Section landing/playable bounds에 맞춰 Cylinder를 계산합니다. 켜져 있으면 수동 Cylinder 크기를 덮어씁니다. |
| `OuterRadiusCm` / `InnerRadiusCm` | 1,000,000 / 250,000, 최소 1 | 바깥 Transition 경계와 안쪽 Ground 경계의 반경입니다. Inner는 Outer보다 작아야 합니다. |
| `bUseHeightLimit` | true | 반경뿐 아니라 Cylinder 높이도 상태 판정에 사용합니다. |
| `OuterHalfHeightCm` / `InnerHalfHeightCm` | 1,000,000 / 250,000, 최소 1 | Height Limit이 켜졌을 때 바깥/안쪽 반높이입니다. |
| `RuntimeAlphaUpdateThreshold` | 0.002, 0 이상 | 이전 값과의 Alpha 차이가 이 값 이상일 때 Runtime 업데이트를 전달합니다. 작은 값은 더 자주 갱신합니다. |
| `bDrawDebugTransitionCylinders` | true | Editor Cylinder 시각화를 표시합니다. |
| `CylinderLineThickness` | 480, 최소 1 | Debug 선 굵기입니다. |
| `DebugCylinderSegments` | 96, 8–128 | 원주 세그먼트 수입니다. |
| `DebugCylinderHeightRingCount` | 8, 0–12 | 높이 방향 보조 Ring 수입니다. |
| `DebugCylinderRadialBandCount` | 3, 0–4 | 반경 방향 보조 Band 수입니다. |

### Movement Handoff 호출 옵션

이 값들은 Component Details의 저장 설정이 아니라 Capture/Apply 호출마다 전달하는 공개 옵션입니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `SourceCoordinateFrame` / `TargetCoordinateFrame` | None | `Planet` 또는 `Section` Frame과 관련 ID를 지정합니다. |
| `SourceSpaceState` / `TargetSpaceState` | `None` | 이동 전후 `Orbit`, `Transition`, `Ground` 상태입니다. |
| `LifetimeSeconds` | 0 s | Snapshot 유효 시간입니다. 0은 즉시 만료 의미가 될 수 있으므로 호출 계약에 맞는 양수를 사용하세요. |
| `ContinuityPolicy` | `RebaseBetweenFrames` | 속도/각속도를 Source Frame에서 Target Frame으로 처리하는 정책입니다. |
| `bDeactivateSource` | true | 성공 시 Source Movement Component를 비활성화합니다. |
| `bActivateTarget` | true | Target Movement Component를 활성화합니다. |
| `bUpdateComponentVelocity` | true | 변환된 속도를 Target Component에 씁니다. |
| `bConsumeOnSuccess` | true | 성공한 Snapshot을 재사용할 수 없도록 consume합니다. |
| `bRequireSameActor` | true | Source와 Target Movement Component가 같은 Actor에 속해야 합니다. |

`UPlanetXSubsystem::MaxCaptureStackDepth`의 클래스 기본값은 8입니다. 이는 중첩 Transition Capture의 안전 상한인 고급 기본값이며 일반 Project Settings 항목은 아닙니다.

## Proxy·Morph·Preview 설정

Runtime Budget Override는 진단이나 특정 Actor의 명시적 요구가 있을 때만 사용하고, 일반적으로는 Project Settings 정책을 따르세요.

### Planet Proxy Component

#### 표시와 생성

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bShowPlanetProxy` | true | Completion을 포함한 행성 전체 Proxy를 표시합니다. |
| `PlanetSphereMeshOverride` | None | 생성 Visual 대신 사용할 고급 Planet Sphere Static Mesh입니다. |
| `bReversePlanetSphereCulling` | false | Planet Sphere의 Culling 방향을 뒤집습니다. 메시 winding/material 계약이 반대인 특수 Asset에만 사용하세요. |
| `bShowSectionProxies` | true | Bake된 Section Proxy 계층을 표시합니다. |
| `bEnableRuntimeSurfaceCutout` | true | Section 영역과 겹치는 행성 표면을 Runtime에 잘라냅니다. |
| `bEnableRuntimeProxyPadding` | true | Surface Cutout이 켜진 경우 Runtime Proxy Padding을 생성/표시합니다. |
| `bAutoRebuildSectionProxiesFromPlanetAsset` | true | Planet Asset의 Section/Bake 링크가 바뀌면 Proxy 계층을 다시 구성합니다. |
| `bAutoRefreshOnRegister` | true | Component 등록 시 Asset과 Runtime 상태에서 표시를 갱신합니다. |
| `FallbackRadiusCm` | 100,000 cm, 최소 1 | 유효한 Planet Asset 반지름을 resolve하지 못했을 때 사용할 fallback입니다. |

#### Section Proxy Layer Descriptor

이 배열은 일반적으로 Planet Asset과 Bake 결과로부터 생성됩니다. 수동으로 구성하는 고급 경로에서만 편집하세요.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `SectionId` / `LayerId` | None | Layer가 속한 Section과 Layer의 안정적인 ID입니다. |
| `Mesh` / `Material` | None | Layer의 Static Mesh와 선택적 Material Override입니다. |
| `RelativeTransform` | Identity | Planet Proxy Component 기준 Layer Transform입니다. |
| `bLayerVisible` | true | 개별 Layer 표시 여부입니다. |
| `bPartitionScoped` | false | Layer를 특정 Bake Partition과 함께 residency/culling할지 정합니다. |
| `PartitionCoord` | (0,0) | Partition Scoped가 켜진 Layer의 Partition 좌표입니다. |

#### Section Proxy Runtime Budget Override

`bOverrideSectionProxyRuntimeBudget=false`이면 Project Runtime Budget을 사용합니다.

| 설정 | 기본값 | 설명 |
| --- | ---: | --- |
| `MaximumSectionProxyPayloadsPerRequest` | 8 | 한 요청에서 유지할 child payload package 상한입니다. |
| `MaximumSectionProxyDependenciesPerRequest` | 64 | 한 streamable batch의 mesh/material dependency 상한입니다. |
| `MaximumSectionProxyComponentsPerFrame` | 2 | Game Thread 한 Frame에 새로 만드는 render Component 상한입니다. |
| `MaximumSectionProxyInstancesPerFrame` | 512 | 한 Frame에 검증하고 upload하는 instance transform 상한입니다. |
| `MaximumSectionProxyCorrectionVerticesPerFrame` | 4,096 | Automatic Surface Correction이 한 Frame에 검사하는 morph vertex 상한입니다. |
| `SectionProxyRealizationTimeBudgetMs` | 2.0 ms, 최소 0.1 | correction scan과 Component/Instance realization이 공유하는 Frame 시간 상한입니다. |

#### Surface Correction Override

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bOverrideSectionSurfaceCorrectionSettings` | false | Planet Asset의 per-Section 설정 대신 이 Actor 전체 Override를 사용합니다. |
| `SectionSurfaceCorrectionMode` | `Disabled` | `Disabled`, 최저 Bake 정점을 표면으로 올리는 `Automatic`, 고정 Offset을 쓰는 `Manual` 중 선택합니다. |
| `SectionSurfaceClearanceCm` | 1 cm, 0 이상 | Automatic에서 표면 위로 추가하는 여유입니다. |
| `ManualSectionSurfaceCorrectionCm` | 0 cm, 0 이상 | Manual에서 모든 Section Proxy에 적용하는 바깥쪽 Offset입니다. |

#### Debug Overlay

`DebugOverlaySettings`가 아래 시각화 값 묶음을 소유합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bShowSectionBounds` | false | Section bounds를 표시합니다. |
| `bShowSectionFrames` | false | Section Local frame 축을 표시합니다. |
| `FrameAxisLengthCm` | 1,000 cm, 최소 1 | 표시할 frame 축 길이입니다. |

### Transition Morph Component

#### Source와 Morph Geometry

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `ProxyBakeData` | None | flat/curved morph payload를 제공하는 Bake Data입니다. 일반적으로 Transition Resource Set이 연결합니다. |
| `ProxyMeshOverride` | None | Bake Data의 Proxy Mesh 대신 사용할 고급 Source Mesh입니다. |
| `SourceLODIndex` | 0, 최소 0 | Override/Source Mesh에서 읽을 LOD입니다. |
| `bUseProxyMeshMaterials` | true | Source Proxy Mesh의 Material slot을 사용합니다. |
| `TransitionAlpha` | 0, 0–1 | 0과 1 사이의 morph 위치입니다. Runtime transition이 보통 갱신합니다. |
| `bAutoRebuildOnRegister` | true | 등록 시 render/morph representation을 다시 만듭니다. |
| `bUseBakeDataPartitionDesc` | true | Bake Data의 projection frame과 radius를 사용합니다. |
| `bOverridePlanetRadius` | false | Bake/Planet radius 대신 `PlanetRadiusOverride`를 사용합니다. 진단 외에는 계약 불일치를 만들 수 있습니다. |
| `PlanetRadiusOverride` | 100,000 cm, 최소 1 | Override가 켜졌을 때의 곡률 반지름입니다. |
| `ManualPartitionDesc` | 구조체 기본값 | Bake Data Partition을 사용하지 않을 때의 Origin, East/North/Up, radius와 sphere segments입니다. |
| `bUseProxyBoundsCenterAsPivot` | false | Source Proxy bounds 중심을 morph pivot으로 사용합니다. |
| `bMoveComponentToPivotOnBuild` | false | Build할 때 Component 자체를 계산된 pivot으로 이동합니다. 외부 Transform 계약이 있으면 끄세요. |
| `bUseTangentPreservingCurvature` | true | 곡면 투영 시 tangent 방향과 shading 연속성을 보존하는 경로를 사용합니다. |

#### GPU WPO Morph

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bUseGpuWpoMorph` | true | Material WPO 기반 GPU morph를 우선 사용합니다. |
| `bPreferStaticMeshComponentForGpuMorph` | true | GPU 경로에서 StaticMesh Component를 우선합니다. |
| `bFallbackToDynamicMeshWhenStaticGpuMorphInflates` | true | Static Mesh render vertex가 허용 비율을 넘으면 Dynamic Mesh로 fallback합니다. |
| `StaticGpuMorphMaxRenderVertexRatio` | 1.25, 최소 1 | Static GPU 경로에서 source 대비 허용할 render vertex 비율입니다. |
| `bBuildTransientStaticMeshForGpuMorph` | false | 지정된 GPU Static Mesh Asset이 없을 때 transient Static Mesh를 만듭니다. Runtime 비용과 lifetime을 고려하세요. |
| `GpuMorphStaticMeshAsset` | None | 미리 생성된 GPU morph용 Static Mesh입니다. |
| `GpuMorphMaterialOverride` | None | 모든 slot에 사용할 단일 GPU morph Material Override입니다. |
| `GpuMorphMaterialOverrides` | 빈 배열 | slot별 GPU morph Material Override입니다. 배열 항목이 단일 Override보다 구체적인 선택입니다. |
| `GpuMorphAlphaParameterName` | `PlanetXMorphAlpha` | Material에서 Transition Alpha를 받는 scalar parameter 이름입니다. Material과 정확히 일치해야 합니다. |

#### GPU Render Pass Policy

이 옵션은 PlanetX가 소유한 Transition Morph render Component에만 적용됩니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `MorphShadowMode` | `FullMorphMesh` | Morph Mesh shadow를 끄거나 전체 morph representation으로 그립니다. |
| `MorphRayTracingMode` | `EvaluateWpo` | `Disabled`, WPO를 무시하는 `StaticGeometry`, 비용이 높은 `EvaluateWpo` 중 Ray Tracing 표현을 선택합니다. |
| `MorphVelocityMode` | `Enabled` | 정확한 motion vector/temporal effect를 위한 velocity pass를 켭니다. |
| `MorphDepthPassMode` | `Enabled` | depth effect와의 호환성을 위한 depth pass를 켭니다. |

#### Morph Performance와 Visibility

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `MinimumAlphaChange` | 0.002, 0–1 | Alpha 변화가 이 값보다 작으면 morph update를 생략합니다. |
| `bUpdateNormalsDuringMorph` | false | CPU/Dynamic 경로에서 위치와 함께 Normal을 갱신합니다. 품질은 좋아질 수 있지만 비용이 증가합니다. |
| `bUseFastPositionUpdates` | true | topology rebuild 없이 position-only 빠른 갱신을 사용합니다. |
| `bCollectRuntimeMorphDiagnostics` | false | Runtime morph 진단 통계를 수집합니다. Shipping 성능 측정 시 필요할 때만 켜세요. |
| `bOverrideTransitionRuntimeBudget` | false | Project Runtime Budget 대신 아래 Transition 전용 값들을 사용합니다. |
| `MaximumTransitionDependenciesPerRequest` | 64, 1–512 | 한 Transition stream 요청의 dependency 상한입니다. |
| `MaximumTransitionComponentsPerFrame` | 2, 1–64 | 한 Frame에 realize할 Transition render Component 상한입니다. |
| `TransitionRealizationTimeBudgetMs` | 2.0 ms, 0.1–10 | Transition realization의 Game Thread 시간 상한입니다. |
| `bVisibleOnlyDuringTransition` | true | Transition 상태에서만 Morph Component를 표시합니다. |
| `bTransitionActive` | false | 현재 Transition 표시 활성 상태입니다. Runtime이 보통 관리하지만 수동 테스트에서 설정할 수 있습니다. |

### Runtime Preview Actor

External Level Proxy Bake가 생성하는 Preview World의 Actor입니다. 직접 배치한 Gameplay Actor가 아니며, `PreviewBakeData` 링크는 생성 파이프라인이 관리합니다.

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PreviewBakeData` | None | Preview World가 stream될 때 불러올 시각 전용 Bake Data입니다. |
| `bOverrideRuntimeBudget` | false | Project Runtime Budget 대신 이 Preview Actor의 값을 사용합니다. |
| `MaximumPayloadsPerRequest` | 8, 최소 1 | 한 요청의 child payload 상한입니다. |
| `MaximumDependenciesPerRequest` | 64, 최소 1 | 한 streamable batch의 dependency 상한입니다. |
| `MaximumComponentsPerFrame` | 2, 최소 1 | 한 Frame에 생성할 Component 상한입니다. |
| `MaximumInstancesPerFrame` | 512, 최소 1 | 한 Frame에 realize할 instance 상한입니다. |
| `RealizationTimeBudgetMs` | 2.0 ms, 최소 0.1 | Preview realization의 Frame 시간 상한입니다. |

Runtime Preview에는 GameMode, Pawn, Controller, Gameplay Actor Logic, Navigation과 Ground Gameplay Collision을 복제하지 마세요. 실제 Gameplay는 Ground World의 책임입니다.

## 환경 설정

Planet Asset의 `EnvironmentSettings`는 행성 전체에서 재사용하는 저작 Profile이고, Level의 `PlanetX Environment Manager`는 이 Profile을 적용하거나 해당 Level만 Override합니다. 거리 비율은 canonical Planet Radius에 대한 비율이며, `Km`가 붙은 값은 km입니다.

### Planet Asset: Atmosphere Profile

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bEnabled` | true | PlanetX-managed Sky Atmosphere Profile을 활성화합니다. |
| `GroundAlbedo` | (0.4,0.4,0.4,1) | Multi-scattering에 반영할 선형 지표 반사색입니다. |
| `MultiScatteringFactor` | 1.0 | 대기 다중 산란 배율입니다. |
| `bAutoScaleAtmosphereHeight` | true | Planet Radius에서 대기 shell 높이를 자동 계산합니다. |
| `AutoHeightRatio` | 0.01 | Auto 높이의 Planet Radius 비율입니다. |
| `MinAutoHeightKm` / `MaxAutoHeightKm` | 6 / 100 km | 자동 계산 높이의 최소/최대입니다. |
| `HeightRatio` | 0.06 | Auto를 사용하지 않을 때 대기 높이/Planet Radius 비율입니다. |
| `bAutoScaleDensityProfile` | true | 대기 shell 높이에 맞춰 density falloff를 조정합니다. |
| `RayleighDensityHeightRatio` | 0.133333 | Rayleigh density falloff 높이의 shell 비율입니다. |
| `MieDensityHeightRatio` | 0.02 | Mie density falloff 높이의 shell 비율입니다. |
| `RayleighScatteringScale` | 0.0331 | Rayleigh scattering 전체 강도입니다. |
| `RayleighScattering` | (0.175287,0.409607,1) | Rayleigh spectral color입니다. |
| `RayleighExponentialDistributionKm` | 8 km | Rayleigh가 약 40%로 감소하는 기준 고도입니다. |
| `MieScatteringScale` | 0.003996 | Mie 산란 강도입니다. |
| `MieScattering` | White | Mie 산란색입니다. |
| `MieAbsorptionScale` | 0.000444 | Mie 흡수 강도입니다. |
| `MieAbsorption` | White | Mie 흡수색입니다. |
| `MieAnisotropy` | 0.8 | Mie 전방 산란 편향입니다. |
| `MieExponentialDistributionKm` | 1.2 km | Mie 산란/흡수가 약 40%로 감소하는 기준 고도입니다. |
| `OtherAbsorptionScale` | 0.001881 | Ozone과 유사한 추가 흡수층 강도입니다. |
| `OtherAbsorption` | (0.345561,1,0.045189,1) | 추가 흡수층 spectral color입니다. |
| `SkyLuminanceFactor` | White | Sky luminance의 art-direction 배율입니다. |
| `SkyAndAerialPerspectiveLuminanceFactor` | White | Sky와 Aerial Perspective luminance 배율입니다. |
| `AerialPerspectiveViewDistanceScale` | 1.0 | Aerial Perspective 적용 거리 배율입니다. |
| `HeightFogContribution` | 1.0 | Sky Atmosphere가 Height Fog에 기여하는 정도입니다. |
| `TransmittanceMinLightElevationAngle` | -90° | Transmittance 계산에서 허용할 최소 광원 고도각입니다. |

### Planet Asset: Cloud Profile

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bEnabled` | true | PlanetX-managed Volumetric Cloud Profile을 활성화합니다. |
| `BottomAltitudeRatio` | 0.005 | 구름층 바닥 고도/Planet Radius 비율입니다. |
| `LayerHeightRatio` | 0.01 | 구름층 두께/Planet Radius 비율입니다. |
| `NightVisibilityFloor` | 0, 0–1 | 야간에도 남길 구름 밝기/가시성 최저값입니다. |
| `TerminatorSoftness` | 0.22, 최소 0.001 | 주야 경계의 부드러움입니다. |
| `TerminatorOffset` | 0, -1–1 | 구름 주야 경계 위치 Offset입니다. |
| `GroundAlbedo` | (0.4,0.4,0.4,1) | 구름 조명에 사용하는 선형 지표 반사색입니다. |
| `bUsePerSampleAtmosphericLightTransmittance` | false | 각 cloud sample에서 대기 광 투과를 계산합니다. 품질과 비용이 함께 증가합니다. |
| `SkyLightCloudBottomOcclusion` | 0.5 | Sky Light가 구름 하단에서 차폐되는 강도입니다. |
| `AerialPerspectiveRayleighStartDistanceKm` / `AerialPerspectiveRayleighFadeDistanceKm` | 0 / 0 | 구름의 Rayleigh Aerial Perspective 시작/전이 거리입니다. 0은 Engine 기본 동작을 유지합니다. |
| `AerialPerspectiveMieStartDistanceKm` / `AerialPerspectiveMieFadeDistanceKm` | 0 / 0 | 구름의 Mie Aerial Perspective 시작/전이 거리입니다. |
| `StopTracingTransmittanceThreshold` | 0.005 | 누적 transmittance가 이 값 아래일 때 cloud tracing을 조기 종료합니다. |

### Planet Asset: Sun과 Cloud Shadow Profile

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bAtmosphereSunLight` | true | Directional Light를 Atmosphere Sun Light로 사용합니다. |
| `bCastShadowsOnClouds` | true | 광원이 구름에 그림자를 만듭니다. |
| `bCastShadowsOnAtmosphere` | true | 광원이 대기에 그림자를 만듭니다. |
| `bCastCloudShadows` | true | 구름 그림자 맵을 활성화합니다. |
| `CloudShadowExtentKm` | 400 km, 최소 1 | cloud shadow map이 덮는 범위입니다. |
| `CloudShadowMapResolutionScale` | 4.0, 최소 0.25 | shadow map 해상도 배율입니다. |
| `CloudShadowRaySampleCountScale` | 1.0, 최소 0.25 | cloud shadow ray sample 배율입니다. |
| `CloudShadowStrength` | 1.0, 0 이상 | 전체 구름 그림자 강도입니다. |
| `CloudShadowOnAtmosphereStrength` | 1.0, 0 이상 | 대기에 보이는 구름 그림자 강도입니다. |
| `CloudShadowOnSurfaceStrength` | 1.0, 0 이상 | 표면에 보이는 구름 그림자 강도입니다. |
| `CloudShadowDepthBias` | 0 | cloud shadow depth bias입니다. |
| `bUseSeparateGroundOverride` | false | Ground에서 별도의 extent/resolution/sample profile을 사용합니다. |
| `GroundCloudShadowExtentKm` | 400 km | Ground 전용 shadow 범위입니다. |
| `GroundCloudShadowMapResolutionScale` | 4.0 | Ground 전용 해상도 배율입니다. |
| `GroundCloudShadowRaySampleCountScale` | 1.0 | Ground 전용 ray sample 배율입니다. |

### Planet Asset: Post Process와 Space Background

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `PostProcess.bEnabled` | true | 행성별 Post Process Profile을 적용합니다. |
| `bUseConvolutionBloom` | true | Convolution Bloom을 사용합니다. |
| `bEnableLensFlare` | true | 이 행성에서 Lens Flare를 허용합니다. Project의 PlanetX Rendering 설정도 켜져 있어야 합니다. |
| `LensFlareIntensity` | 0.12, 0 이상 | 행성별 Lens Flare 강도입니다. |
| `SpaceBackground.bEnabled` | true | Environment Manager의 단일 Space Background Sphere를 사용합니다. |
| `Material` | PlanetX 기본 Space Background Material | Background Sphere Material입니다. Soft reference로 저장됩니다. |
| `VisibilityMode` | `OrbitOnly` | `OrbitOnly` 또는 `OrbitAndGround`에서 표시 범위를 정합니다. |

### Environment Manager: Domain과 Profile Source

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `CloudMode` | `PlanetXManaged` | `PlanetXManaged`가 PlanetX 구름을 만들고 제어합니다. `UseExistingLevel`은 기존 Level Cloud를 채택합니다. |
| `CloudProfileSource` | `PlanetAssetDefaults` | Asset의 Cloud Profile을 쓰거나 `LevelOverride`를 사용합니다. |
| `CloudProfileOverride` | Profile 기본값 | Level Override에서만 편집되는 Cloud Profile 전체입니다. |
| `GroundCloudSource` | `SamePlanetXCloud` | Ground에서도 같은 PlanetX Cloud를 사용하거나 `ExistingLevelCloud`를 사용합니다. |
| `AtmosphereMode` | `PlanetXManaged` | PlanetX Atmosphere를 관리하거나 기존 Level Atmosphere를 사용합니다. |
| `AtmosphereProfileSource` | `PlanetAssetDefaults` | Asset Atmosphere 또는 Level Override를 선택합니다. |
| `AtmosphereProfileOverride` | Profile 기본값 | Level Override에서만 편집되는 Atmosphere Profile 전체입니다. |
| `SunProfileSource` | `PlanetAssetDefaults` | Asset Sun/Cloud Shadow 또는 Level Override를 선택합니다. |
| `SunProfileOverride` | Profile 기본값 | Level Override에서만 편집되는 Sun/Shadow Profile 전체입니다. |
| `SpaceBackgroundMode` | `PlanetXManaged` | PlanetX Background를 관리하거나 기존 Level 표현을 유지합니다. |
| `SpaceBackgroundProfileSource` | `PlanetAssetDefaults` | Asset Background 또는 Level Override를 선택합니다. |
| `SpaceBackgroundProfileOverride` | Profile 기본값 | Level Override에서만 편집되는 Background Profile 전체입니다. |

Resolved Profile과 Resolved Height 값은 읽기 전용 결과입니다. `CloudShadow` 역시 Sun Profile에서 계산되는 Runtime cache이므로 직접 수정하지 않습니다.

### Environment Manager: Runtime과 Binding

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `bApplyOnConstruction` | true | Editor Construction 시 현재 Profile을 적용합니다. |
| `InitialRuntimeSpace` | `Auto` | 시작 공간을 transition 상태에 맡기거나 `Orbit`/`Ground`로 고정합니다. Transition Endpoint 없이 Ground에서 시작하는 Level은 `Ground`가 유용합니다. |
| `bUpdateEveryTick` | true | Sun, binding과 transition-dependent 환경을 매 Tick 갱신합니다. 외부 runtime driver가 관리하는 경우 계약에 맞춰 사용하세요. |
| `ManagedPlanetActor` | None | 환경의 중심, 반지름과 Asset Profile을 제공하는 Planet Actor입니다. |
| `ExistingVolumetricCloud` / `ExistingVolumetricCloudComponent` | None | 사용할 기존 Cloud Actor 또는 Component입니다. Component 참조가 더 직접적입니다. |
| `ExistingSkyAtmosphere` / `ExistingSkyAtmosphereComponent` | None | 사용할 기존 Sky Atmosphere Actor 또는 Component입니다. |
| `ExistingSunLight` | None | Sun과 cloud shadow를 제공하는 Directional Light입니다. |
| `ExistingSkyLight` | None | 기존 Sky Light binding입니다. |
| `ExistingHeightFog` | None | 기존 Exponential Height Fog binding입니다. |
| `bAutoBindEnvironmentActors` | true | 명시적 참조가 없으면 World에서 적절한 환경 Actor를 찾습니다. |
| `AutoBindRetryIntervalSeconds` | 1 s, 최소 0.1 | Streaming Actor를 발견하기 위해 auto-bind miss 뒤 재검색하는 간격입니다. |
| `bDeriveSunDirectionFromDirectionalLight` | true | Bound Directional Light에서 Sun Direction을 계산합니다. |
| `bUseNegativeDirectionalLightForward` | true | Directional Light의 -Forward를 행성에서 태양으로 향하는 방향으로 사용합니다. Material 방향이 반대일 때만 변경하세요. |
| `bDerivePlanetSettingsFromSkyAtmosphere` | true | 기존 Sky Atmosphere에서 Planet Center/Radius를 읽습니다. |
| `bDeriveCloudLayerAltitudeFromVolumetricCloud` | true | 기존 Volumetric Cloud에서 cloud layer altitude를 읽습니다. |

### Orbit Cloud Lighting과 Existing Cloud Sync

| 설정 | 기본값 | 설명 |
| --- | --- | --- |
| `OrbitCloudLighting.PlanetCenter` | (0,0,0) | cloud material lighting의 행성 중심 fallback입니다. |
| `PlanetRadius` | 250,000 cm, 최소 1 | cloud lighting 계산용 fallback 반지름입니다. |
| `CloudLayerAltitude` | 10,000 cm, 0 이상 | cloud lighting의 layer altitude입니다. |
| `NightCloudVisibilityFloor` | 0, 0–1 | 야간 cloud visibility 최저값입니다. |
| `TerminatorSoftness` | 0.22, 최소 0.001 | cloud 주야 경계 softness입니다. |
| `CloudTerminatorOffset` | 0, -1–1 | cloud 주야 경계 Offset입니다. |
| `CloudSync.bReadExistingCloudAsGroundTruth` | true | Existing Cloud의 현재 parameter를 Ground truth로 읽습니다. |
| `CoverageParameterName` | `Coverage` | coverage parameter 이름입니다. |
| `DensityParameterName` | `Density` | density parameter 이름입니다. |
| `WindDirectionParameterName` | `WindDirection` | wind direction parameter 이름입니다. |
| `WindSpeedParameterName` | `WindSpeed` | wind speed parameter 이름입니다. |
| `CloudTimeParameterName` | `CloudTime` | cloud time parameter 이름입니다. |

Sync 이름은 사용 중인 Material parameter와 대소문자까지 일치해야 합니다.

### Orbit Render Quality와 Ground Presentation

`GroundEnvironmentPresentation`이 아래 Ground presentation 설정 묶음을 소유합니다.

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bOverrideVolumetricRenderTargetQuality` | true | Orbit에서 Volumetric Render Target mode/scale을 Override합니다. |
| `bOverrideVolumetricRenderTargetEnabled` | true | Orbit cloud를 위해 Volumetric Render Target 사용 여부를 Override합니다. |
| `VolumetricRenderTargetMode` | 1, 0–3 | Unreal Volumetric Render Target mode입니다. 프로젝트의 품질/호환성을 확인하세요. |
| `VolumetricRenderTargetScale` | 1.0, 0.1–1 | Render Target resolution scale입니다. |
| `bEnableReprojectionBoxConstraint` | true | Volumetric reprojection을 유효 box에 제한합니다. |
| `OrbitCloudRenderQuality.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Transition Alpha가 이 기준을 넘을 때 Orbit cloud quality override를 활성화합니다. |
| `bOverrideAerialPerspectiveLUTDepth` | true | Orbit에서 Aerial Perspective LUT depth를 Override합니다. |
| `AerialPerspectiveLUTDepthKm` | 512 km, 최소 1 | LUT가 표현할 대기 깊이입니다. |
| `OrbitAtmosphereRenderQuality.OrbitOverrideActivationThreshold` | 0.5, 0–1 | Atmosphere quality override 활성 기준입니다. |
| `bEnableGroundPresentation` | true | Ground에서 거의 평면에 가까운 고정 대기 표현을 사용합니다. |
| `bUseAdaptiveGroundRadius` | true | Bake된 Level footprint에서 실용적인 Ground radius를 계산합니다. |
| `MinimumGroundRadiusKm` | 6,360 km, 1–10,000 | adaptive bounds가 없을 때의 fallback Ground radius입니다. |
| `MaximumGroundSurfaceDropKm` | 2.5 km, 0.01–100 | Level edge에서 tangent plane 아래 허용할 최대 표면 낙차입니다. |
| `GroundSurfaceClearanceKm` | 0.1 km, 0–10 | virtual atmosphere 표면을 최저 Ground geometry 아래로 내리는 여유입니다. |
| `TransitionBlendStartAlpha` | 0.75, 0–0.99 | Atmosphere가 Ground presentation frame으로 이동하기 시작하는 Alpha입니다. |
| `bPreviewInEditor` | true | PlanetX Mode의 Level View에도 같은 Ground presentation을 적용합니다. |

### Orbit Cloud Tracing

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bOverrideVolumetricCloudTracing` | true | Orbit에서 cloud tracing 거리를 Override합니다. |
| `TracingStartMaxDistanceKm` | 10,000 km, 최소 1 | tracing 시작점에 허용할 최대 거리입니다. |
| `TracingStartDistanceFromCameraKm` | 0 km, 0 이상 | Camera에서 tracing 시작점까지의 거리입니다. |
| `TracingMaxDistanceMode` | `DistanceFromPointOfView` | 최대 tracing 거리를 View 기준 등 Unreal의 mode로 해석합니다. |
| `TracingMaxDistanceKm` | 10,000 km, 최소 0.1 | 최대 cloud tracing 거리입니다. |
| `OrbitCloudTracing.OrbitOverrideActivationThreshold` | 0.5, 0–1 | tracing override 활성 기준 Alpha입니다. |

### Material Parameter Collection

`EnvironmentParameterCollection`에 사용할 MPC를 지정합니다. `MpcParameters`는 PlanetX가 쓰는 parameter 이름 매핑입니다.

| 값 종류 | 기본 parameter 이름 |
| --- | --- |
| `PlanetCenter`, `PlanetRadius`, `CloudLayerRadius`, `SunDirection` | `PlanetX_PlanetCenter`, `PlanetX_PlanetRadius`, `PlanetX_CloudLayerRadius`, `PlanetX_SunDirection` |
| `NightCloudVisibilityFloor`, `TerminatorSoftness`, `CloudTerminatorOffset` | `PlanetX_NightCloudVisibilityFloor`, `PlanetX_TerminatorSoftness`, `PlanetX_CloudTerminatorOffset` |
| `OrbitCloudVisibility`, `GroundCloudVisibility`, `EnvironmentTransitionAlpha` | `PlanetX_OrbitCloudVisibility`, `PlanetX_GroundCloudVisibility`, `PlanetX_EnvironmentTransitionAlpha` |
| `OrbitCloudShadowStrength`, `CloudShadowOnAtmosphereStrength`, `CloudShadowOnSurfaceStrength` | `PlanetX_OrbitCloudShadowStrength`, `PlanetX_CloudShadowOnAtmosphereStrength`, `PlanetX_CloudShadowOnSurfaceStrength` |
| `CloudShadowDepthBias`, `CloudShadowExtentKm`, `CloudShadowMapResolutionScale`, `CloudShadowRaySampleCountScale` | 같은 이름 앞에 `PlanetX_`를 붙인 기본값 |

이름을 변경했다면 MPC와 모든 소비 Material도 함께 변경하세요. Parameter가 없으면 해당 값은 Material에 전달되지 않습니다.

### 파생 Cloud Shadow Runtime Cache

Manager의 `CloudShadow`는 편집 원본이 아니라 `SunProfileOverride` 또는 Asset Sun Profile에서 계산되는 cache입니다. 내부 `Mode` 기본값은 `PlanetXManagedOverride`이고, `bEnableOrbitCloudShadow=true`, `bRestoreSourceLightWhenGroundActive=true`입니다. `DesiredOrbitLightShadow`는 Orbit Material Approximation용, `DirectionalLightOverrideShadow`는 Orbit Directional Light용, `GroundDirectionalLightOverrideShadow`는 Ground용 상태이며, `bUseSeparateGroundDirectionalLightOverride=false`일 때 Ground도 Orbit Override를 공유합니다. 이 cache를 직접 고치지 말고 위 Sun/Cloud Shadow Profile을 편집하세요.

## 프로젝트와 성능 설정

PlanetX의 Project Settings는 **Edit > Project Settings > Plugins** 아래에 있습니다. 두 설정 객체는 `DefaultEngine.ini` 계열 Config에 저장됩니다.

### PlanetX Runtime

`RuntimeBudgetPolicy`는 Bake된 Section Proxy, Transition Morph, Runtime Preview가 한 Frame과 한 streaming request에서 처리할 작업량을 정합니다. Proxy Bake Quality와는 독립적이므로 이 값을 바꿔도 Bake Asset이 다시 생성되지 않습니다.

| 정책 | 설명 |
| --- | --- |
| `Follow Engine Scalability` | 기본값입니다. 현재 Unreal Scalability의 단일 Quality Level을 따릅니다. 여러 그룹이 섞여 있으면 가장 낮은 Quality Level을 보수적으로 사용합니다. |
| `Low` | 가장 작은 Runtime streaming/realization budget을 고정합니다. |
| `Medium` | 중간 budget을 고정합니다. |
| `High` | PlanetX의 기본 제품 budget을 고정합니다. |
| `Epic` | 가장 큰 bounded budget을 고정합니다. Cinematic Scalability도 Epic Profile로 해석됩니다. |

#### Resolved Budget 값

| Profile | Payloads / request | Dependencies / request | Components / frame | Instances / frame | Correction vertices / frame | Transition deps / components | Time / frame |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Low | 2 | 16 | 1 | 128 | 1,024 | 16 / 1 | 0.5 ms |
| Medium | 4 | 32 | 1 | 256 | 2,048 | 32 / 1 | 1.0 ms |
| High | 8 | 64 | 2 | 512 | 4,096 | 64 / 2 | 2.0 ms |
| Epic | 16 | 128 | 4 | 1,024 | 8,192 | 128 / 4 | 3.0 ms |

Engine Quality Level 0은 Low, 1은 Medium, 2는 High, 3 이상은 Epic으로 매핑됩니다.

#### Actor별 Override 우선순위

다음 Override가 켜져 있으면 해당 Actor/Component가 Project Profile보다 우선합니다.

1. Planet Proxy Component의 `bOverrideSectionProxyRuntimeBudget`
2. Transition Morph Component의 `bOverrideTransitionRuntimeBudget`
3. Runtime Preview Actor의 `bOverrideRuntimeBudget`

Override는 문제 진단이나 특정 Actor가 반드시 다른 처리량을 가져야 할 때만 사용하세요. 너무 큰 값은 Game Thread spike와 streaming burst를 만들 수 있고, 너무 작은 값은 Section이 완전히 나타날 때까지 여러 Frame이 더 필요하게 만듭니다.

### PlanetX Rendering

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bEnableLensFlares` | true | PlanetX presentation을 위해 Unreal의 image-based Lens Flare 기능을 활성화합니다. |
| `LensFlareQuality` | 3, 0–3 | `r.LensFlareQuality`에 대응합니다. 0=Off, 1=Low, 2=High, 3=Very High입니다. |

이 값은 Project Setting 우선순위로 Console Variable에 적용됩니다. 일반 Scalability 변경으로 조용히 낮아지지는 않지만, command line이나 더 높은 우선순위의 Runtime Override는 여전히 우선할 수 있습니다.

행성별 `EnvironmentSettings.PostProcess.bEnableLensFlare`와 `LensFlareIntensity`도 함께 적용됩니다. Project에서 Lens Flare가 꺼져 있으면 행성별 토글만 켜도 렌더러 기능이 활성화되지 않습니다.

### 성능 조정 순서

1. Project의 `Follow Engine Scalability`를 유지한 상태로 목표 플랫폼 Scalability에서 측정합니다.
2. Runtime diagnostics에서 payload, dependency, component, instance 중 어느 상한이 병목인지 확인합니다.
3. 전체 프로젝트가 일관되게 더 작은/큰 budget을 필요로 할 때만 고정 Profile을 선택합니다.
4. 한 Actor만 예외여야 할 때 Component Override를 사용합니다.
5. Proxy 품질이나 triangle 수가 문제라면 Runtime Budget이 아니라 Proxy Bake Quality와 Source Scope를 조정하고 다시 Bake합니다.

### Config 검토

Project Settings를 바꾸면 소스 관리에 포함될 `Config/DefaultEngine.ini` 변경을 확인하세요. 사용자별 `Saved/Config` 값만 바뀌고 기본 Config에 반영되지 않으면 팀원과 패키징 빌드가 같은 값을 사용하지 않을 수 있습니다.

## 공개 API 개요

PlanetX gameplay 통합에는 `PlanetX` 런타임 모듈을 사용합니다. Blueprint의 주요 facade는 `UPlanetXSubsystem`이며 Actor와 Component가 등록, 좌표, 이동, 전환, 환경과 도착 처리를 담당합니다.

이 레퍼런스는 PlanetX 1.0에 포함된 `Source/PlanetX/Public/PlanetX` 아래의 공개 헤더를 기준으로 작성했습니다.

### API 지원 등급

| 등급 | 용도 |
| --- | --- |
| Stable Gameplay API | 지원되는 gameplay 통합 표면입니다. 시그니처, reflection 형태, 문서화된 동작과 실패·consume 계약을 보호합니다. |
| Advanced and Diagnostics API | 전문 통합용 지원 표면입니다. 호환성을 깨는 변경에는 deprecation과 migration 안내가 필요합니다. |
| Authoring and Editor API | Editor workflow에서 지원하며 cooked runtime 지원을 의미하지는 않습니다. |
| Internal or Test-only API | 외부 호환성을 보장하지 않습니다. |

타입이 공개 헤더에 있다는 사실만으로 지원 등급이 정해지는 것은 아닙니다. 생성 Mesh 중간 데이터, Bake pass, 내부 Runtime Service와 직렬화 payload를 게임 코드의 계약으로 사용하지 마세요.

### 주요 타입

| 영역 | 주요 타입 |
| --- | --- |
| Runtime facade | `UPlanetXSubsystem` |
| Planet 표현 | `APlanetXPlanetActor`, `UPlanetXPlanetComponent`, `UPlanetXPlanetProxyComponent` |
| 참가 Actor | `UPlanetXCoordinateComponent`, `UPlanetXMovementComponent`, `UPlanetXViewpointComponent`, `UPlanetXTravelReceiverComponent` |
| 제작 데이터 | `UPlanetXPlanetAsset`, `UPlanetXSurfacePreset` |
| 이동 Handoff | `UPlanetXMovementHandoffLibrary` |

### 모듈과 Subsystem 접근

게임 모듈의 `Build.cs`에 런타임 모듈을 추가합니다.

```csharp
PublicDependencyModuleNames.AddRange(new[] { "PlanetX" });
```

C++에서는 유효한 Game Instance에서 Subsystem을 얻습니다.

```cpp
#include "PlanetX/Subsystems/PlanetXSubsystem.h"

UPlanetXSubsystem* PlanetX = GameInstance->GetSubsystem<UPlanetXSubsystem>();
```

Blueprint에서는 Game Instance Subsystem 노드를 사용합니다. World가 없거나 종료 중일 때 World Context 함수를 호출하지 마세요.

### 공통 실패 규칙

- `bool` 반환값은 작업 완료 여부를 나타냅니다. 함수가 진단 출력을 별도로 보장하지 않는 한 `false` 뒤에는 출력 parameter를 사용하지 않습니다.
- Enum을 반환하는 Query는 성공 상태일 때만 출력값을 사용합니다.
- `None` ID, 유효하지 않은 Object 참조, 만료된 Handle과 non-success 오류 Enum을 정상적인 실패 상태로 처리합니다.
- 후보가 여러 개일 수 있으면 Planet, Binding, Section과 Level Pair ID를 명시합니다.
- 등록 또는 Streaming 상태가 바뀌면 Runtime Context를 갱신합니다.

Blueprint 표시명과 C++ Symbol은 다를 수 있습니다. 이 레퍼런스의 이름과 include 경로는 C++ 선언을 기준으로 합니다.

## UPlanetXSubsystem

헤더: `PlanetX/Subsystems/PlanetXSubsystem.h`

`UPlanetXSubsystem`은 지원되는 런타임 API의 Game Instance Subsystem facade입니다. World Context parameter가 있는 함수는 모두 유효한 game world가 필요합니다. 안정 API 중 `CancelLevelHandoff`만 예외이며 Ticket만 받습니다.

### 안정 Surface Query

| 함수 | 계약 |
| --- | --- |
| `QuerySurfaceAtWorldRay` | `FPlanetXSurfaceQueryInput`을 평가해 `FPlanetXSurfaceQueryResult`를 쓰고 `bool`을 반환합니다. |
| `QuerySurfaceAtWorldRayDetailed` | 같은 Query를 수행하고 `EPlanetXSurfaceQueryStatus`를 반환합니다. |
| `QuerySurfaceAtGeo` | Planet ID, `FPlanetXGeoCoordinate`, optional Binding ID로 조회합니다. |
| `QuerySurfaceAtPlanetXTransform` | 표준 `FPlanetXTransform` 위치에서 조회합니다. |
| `BuildLandingTransform` | 성공한 Surface 결과에서 `FPlanetXLandingTransform`을 만듭니다. |

`bool`이 `false`이거나 Detailed Status가 성공이 아니면 Hit 출력을 사용하지 마세요.

### 안정 좌표 API

| 함수 | 계약 |
| --- | --- |
| `ResolvePlanetXTransform` | `FPlanetXTransform`을 `FTransform`으로 resolve하고 `FPlanetXTransformResolveResult`를 씁니다. |
| `CapturePlanetXTransform` | Planet ID와 Binding ID를 기준으로 World Transform을 캡처합니다. |
| `CaptureActorPlanetXTransform` | 전달한 Planet·Binding ID 기준으로 Actor pose를 캡처합니다. |
| `ApplyPlanetXTransformToActor` | 표준 pose를 resolve해 Actor에 적용합니다. |

이 함수들의 Blueprint Category는 `PlanetX|Coordinates`입니다.

### 안정 Travel API

| 함수 | 계약 |
| --- | --- |
| `EnterGroundSameWorld` | 요청 Actor와 성공한 Surface Query로 현재 World의 Ground에 진입합니다. |
| `ReturnToOrbitSameWorld` | 요청 Actor의 활성 Same World Journey를 통해 Orbit으로 돌아갑니다. |
| `BeginLevelHandoff` | Source Actor와 Surface Query에서 `FPlanetXLevelHandoffTicket`과 결과를 만듭니다. |
| `ResolveLevelHandoffTicket` | Ticket을 적용하지 않고 대상 World Transform으로 resolve합니다. |
| `CompleteLevelHandoff` | Ticket을 Target Actor에 적용하며 `bApplyControlRotation` 기본값은 `true`입니다. |
| `CancelLevelHandoff` | Ticket을 취소합니다. World Context parameter가 없습니다. |

PlanetX는 Handoff 상태를 준비하고 복원하지만 Open Level 호출, 대상 Actor Spawn, Possess 또는 GameMode 선택은 하지 않습니다. 이 과정은 게임 코드가 담당합니다.

### Advanced Travel과 상태 조회

- Travel: `PrepareTravel`, `ResumePendingTravel`, `BeginReturnLevelHandoff`, `ResolveLevelHandoffEntryTransform`
- 저장 상태: `GetStoredLevelHandoffCapture`, `GetTransitionJourney`, `GetActiveTransitionJourneys`
- Runtime 상태: `GetActorRuntimeContext`, `GetMovementRuntimeState`, `GetMovementRuntimeStates`
- Transition 상태: `GetTransitionRuntimeResult`, `GetTransitionRuntimeResults`, `GetTransitionManagedActorState`
- Transition 계산과 Sync: `EvaluateTransitionCylinderState`, `CaptureTransitionActorSyncPose`, `ApplyTransitionActorSyncPose`

`PrepareTravel`은 `FPlanetXTravelRoute`를 받습니다. Planet Actor 후보가 정확히 하나일 때만 자동 선택합니다. 명시적인 index `0`은 유효하며, `PlanetActorIndex`와 `PlanetBindingId`를 모두 지정하면 같은 후보를 가리켜야 합니다.

### Advanced Data, Preview와 Diagnostics

- Section과 Level Pair: `GetSectionTransform`, `GetSectionDesc`, `GetSectionRuntimeState`, `GetLevelPair`, `GetLevelPairForSection`
- Coordinate Frame: `ResolveCoordinateFrame`
- Runtime Preview: `LoadRuntimePreview`, `SetRuntimePreviewVisible`, `UnloadRuntimePreview`, `GetRuntimePreviewStatus`
- Validation: `ValidatePlanetAsset`
- Diagnostics: `DiagnoseProxySync`, `ResolvePlanetAlignmentForSection`, `DiagnoseSectionPlanetOverlapFromBounds`
- 일시적 Debug Draw: `DrawPlanetDebug`, `DrawSectionDebug`, `DrawActorContextDebug`, `DrawCaptureStackDebug`

Debug Draw 함수는 성공값을 반환하지 않습니다. Validation 함수 실행 성공과 issue가 없는 결과는 서로 다른 조건입니다.

## Actor API

### APlanetXPlanetActor

헤더: `PlanetX/Actors/PlanetXPlanetActor.h`

`RegisterToPlanetXRuntime`은 등록 성공 여부를 반환하고 `UnregisterFromPlanetXRuntime`은 `void`입니다. 두 함수의 Blueprint Category는 `PlanetX|Planet`입니다.

Actor는 `Root`, `PlanetComponent`, `PlanetProxyComponent`, `TransitionMorphComponent`, `SkyAtmosphereComponent`, `VolumetricCloudComponent`를 Blueprint Read Only Reference로 제공합니다. Planet Asset은 Planet Component에 지정하고 Planet ID와 Binding ID가 모호하지 않도록 관리하세요.

### APlanetXTransitionEndpoint

헤더: `PlanetX/Actors/PlanetXTransitionEndpoint.h`

이 Actor에는 Blueprint-callable 함수가 없습니다. Reflection Property가 제작 계약을 구성합니다.

| Property | 목적 |
| --- | --- |
| `PlanetId`, `SectionId`, `LevelPairId`, `EndpointRole` | Endpoint와 Orbit·Ground 역할을 식별합니다. |
| `PlanetAsset`, `PlanetActor`, `EnvironmentManagerActor` | 정책 데이터와 참가 Actor를 연결합니다. `PlanetActor`는 Orbit Endpoint에 적용됩니다. |
| `CoordinateComponent` | Endpoint의 표준 Reference와 Pose를 보관합니다. |
| `TransitionCylinder` | Transition 영역을 정의합니다. |
| `bAutoSizeTransitionCylinderToSectionBounds` | 활성화하면 Section Bounds에서 Cylinder를 계산합니다. |
| `RuntimeAlphaUpdateThreshold` | 작은 Runtime Alpha Update를 제한합니다. |

ID는 resolve된 Planet Asset에 실제로 존재하는 Section과 Level Pair와 일치해야 합니다. Ground Endpoint에는 Planet Asset이 필요하며, Orbit Endpoint는 가능한 경우 Planet Actor에서 추론합니다.

### APlanetXEnvironmentManager

헤더: `PlanetX/Actors/PlanetXEnvironmentManager.h`

주요 Environment Command 중 `bool`을 반환하는 함수는 `ValidateEnvironmentBinding`뿐입니다. `void` 변경 함수를 호출하기 전에 검증하고 보고된 Binding 문제를 먼저 해결하세요.

| 반환형 | 함수 |
| --- | --- |
| `bool` | `ValidateEnvironmentBinding` |
| `void` | `CaptureEnvironmentStateFromBindings`, `ApplyEnvironmentState`, `SetEnvironmentTransition`, `ApplyInitialRuntimeSpace` |
| `void` | `ApplyOrbitCloudRenderQualityOverride`, `RestoreSourceCloudRenderQuality` |
| `void` | `ApplyOrbitAtmosphereRenderQualityOverride`, `RestoreSourceAtmosphereRenderQuality` |
| `void` | `ApplyOrbitCloudTracingOverride`, `RestoreSourceCloudTracing` |
| `bool` | `IsOrbitCloudRenderQualityOverrideActive`, `IsOrbitAtmosphereRenderQualityOverrideActive`, `IsOrbitCloudTracingOverrideActive` |

Override Apply와 Restore를 한 쌍으로 관리하세요. `void` Command는 성공 결과를 제공하지 않으므로 먼저 Binding을 검증하고, 제공되는 경우 대응하는 Active State Query를 확인합니다.

### APlanetXRuntimePreviewActor

헤더: `PlanetX/Preview/PlanetXRuntimePreviewActor.h`

일반적인 Runtime 사용에서는 직접 Spawn하기보다 `UPlanetXSubsystem::LoadRuntimePreview`를 권장합니다.

| 반환형 | 함수 |
| --- | --- |
| `bool` | `LoadPreviewFromBakeData` |
| `void` | `AssignPreviewBakeData`, `SetPreviewVisible`, `UnloadPreview` |
| `bool` | `IsPreviewLoaded`, `IsPreviewRenderable` |
| `int32` | `GetRenderableComponentCount`, `GetRealizedComponentCount` |
| Enum 또는 Object | `GetPreviewResidencyState`, `GetSourceBakeData` |

Loaded와 Renderable은 서로 다른 상태입니다. Runtime Budget에 따라 Realized Component 수가 Renderable Component 수보다 작을 수 있습니다.

## 좌표·이동 Component API

### UPlanetXCoordinateComponent

헤더: `PlanetX/Components/PlanetXCoordinateComponent.h`

Coordinate Component는 표준 PlanetX pose를 저장하고 Owner가 사용할 Planet, Binding, Section과 Coordinate Frame을 resolve합니다. Reference를 설정하고 Planet Actor가 등록됐는지 확인한 뒤, 관련 등록이나 Streaming 상태가 바뀌면 `RefreshRuntimeContext`를 호출하세요.

#### 안정 좌표 상태와 정책

| 함수 | 계약 |
| --- | --- |
| `RefreshRuntimeContext` | Runtime Context를 다시 resolve하며 유효한 Context를 만들 수 없으면 `false`입니다. |
| `SetPlanetXTransform`, `GetPlanetXTransform` | 표준 pose를 쓰거나 읽습니다. Setter의 `bApplyToOwner`가 즉시 적용 여부를 정합니다. |
| `SetCoordinateFrameReference` | Coordinate Frame Reference를 바꾸고 resolve 성공 여부를 반환합니다. |
| `SetAutomaticSameWorldEntryEnabled`, `SetAutomaticSameWorldReturnEnabled`, `SetSameWorldReturnPosePolicy` | Spatial Entry 동작을 변경합니다. |
| `GetSpatialEntryPolicy`, `IsAutomaticSpatialEntryParticipant` | 실제 Spatial Entry 설정을 읽습니다. |

Editor-callable helper인 `RefreshCoordinateSnapshot`, `PullFromWorld`, `PushToWorld`, `CaptureOwnerTransformToPlanetX`, `ApplyPlanetXTransformToOwner`는 저장 pose와 Owner Transform을 명시적으로 동기화합니다.

#### 안정 Surface Frame과 Vector

| 함수 | 계약 |
| --- | --- |
| `GetCurrentSurfaceFrame` | 현재 Surface Frame을 출력합니다. |
| `GetPlanetUpVectorWorld`, `GetPlanetDownVectorWorld` | Planet 기준 단위 방향을 출력합니다. |
| `GetSurfaceEastVectorWorld`, `GetSurfaceNorthVectorWorld` | resolve된 Surface Frame의 접선 방향을 출력합니다. |
| `ProjectVectorToSurfaceTangent` | World Vector를 현재 접평면에 투영합니다. |
| `ConvertSurfaceVectorToWorld` | East/North/Up 입력을 World Space로 변환하며 선택적으로 접평면에 투영합니다. |
| `ConvertPlanetLocalVectorToWorld`, `ConvertSectionLocalVectorToWorld` | 각 Local Space의 Vector를 변환합니다. |
| `ConvertCoordinateVectorToWorld`, `ConvertWorldVectorToCoordinate` | `EPlanetXMovementVectorSpace` 기준으로 변환합니다. |
| `BuildPlanetSurfaceWorldLocation` | `TargetAltitudeCm`의 World Location을 만듭니다. |
| `BuildSurfaceAlignedRotation` | `FPlanetXSurfaceAlignmentSettings`에 따라 Rotation을 만듭니다. |

이 표의 함수는 모두 `bool`을 반환합니다. `false` 뒤에는 출력을 사용하지 마세요.

#### Advanced 조회와 Spatial Loading

`RefreshReferenceDetails`, `GetResolvedPlanetComponent`, `GetCachedRuntimeContext`, `GetRepresentationDomain`은 resolve된 Reference와 Context를 제공합니다. 현재 Spatial Loading 정책에는 `GetActorSpatialLoadingPolicy`, `ShouldForceOwnerAlwaysLoaded`, `ApplySpatialLoadingPolicyToOwner`를 사용합니다. Data Layer와 Streaming Source는 프로젝트가 관리합니다.

### UPlanetXMovementComponent

헤더: `PlanetX/Components/PlanetXMovementComponent.h`

Owner에 Coordinate Component와 commit된 Runtime Context가 필요합니다.

| 안정 함수 | 계약 |
| --- | --- |
| `AddPlanetXInputVector` | 선택한 Vector Space에서 입력을 추가합니다. 기본값은 `SurfaceFrame`, 접평면 투영은 활성입니다. |
| `SetPlanetXVelocity` | 선택한 Vector Space에서 속도를 설정합니다. 기본값은 `World`입니다. |
| `GetPlanetXVelocity` | 현재 속도를 요청한 Vector Space로 변환합니다. |
| `AddPlanetXForce` | Force를 추가합니다. 기본 Space는 `World`, `bAccelerationChange` 기본값은 `false`입니다. |
| `AddPlanetXImpulse` | Impulse를 추가합니다. 기본 Space는 `World`, `bVelocityChange` 기본값은 `false`입니다. |
| `SnapToPlanetSurface` | `FPlanetXSurfaceSnapSettings`에 따라 resolve된 표면으로 이동합니다. |
| `AlignUpToPlanetSurface` | `FPlanetXSurfaceAlignmentSettings`에 따라 Owner를 정렬합니다. |
| `ValidateMovementConfiguration` | 설정이 유효하지 않을 때 오류 메시지를 출력합니다. |

안정 함수는 모두 `bool`을 반환합니다. `GetMovementRuntimeState`와 `GetCommittedRuntimeContext`는 승인된 Advanced 상태 조회입니다. Representation이 바뀌는 동안 다른 Movement Component나 Physics Body가 속도를 소유한다면 [Movement Handoff](/docs/ko/movement-handoff-api)를 사용하세요.

## Planet·Transition Component API

### UPlanetXPlanetComponent

헤더: `PlanetX/Components/PlanetXPlanetComponent.h`

| 반환형 | 함수 |
| --- | --- |
| `bool` | `RegisterToPlanetXRuntime`, `RefreshRuntimeRegistration`, `GetGravityAccelerationAtWorldLocation` |
| `void` | `UnregisterFromPlanetXRuntime`, `SetTransitionMorphAlpha`, `SetTransitionMorphActive`, `SetTransitionMorphVisible`, `SetTransitionMorphState` |
| 값 또는 Object | `GetPlanetId`, `GetPlanetBindingId`, `GetPlanetAsset`, `GetPlanetToWorldTransform`, `GetGravitySettings`, `GetTransitionMorphState` |

등록하려면 유효한 World, Planet Asset과 Identity가 필요합니다. 여러 Component가 같은 Planet ID를 사용한다면 Binding ID로 대상을 명확하게 구분하세요.

### UPlanetXPlanetProxyComponent

헤더: `PlanetX/Components/PlanetXPlanetProxyComponent.h`

#### Planet 전체 표현

- Source 설정·조회: `SetPlanetAsset`, `GetPlanetAsset`, `SetPlanetMaterialOverride`, `GetPlanetMaterialOverride`, `SetPlanetSphereMeshOverride`, `GetPlanetSphereMeshOverride`
- 표현 Rebuild·제거: `RefreshProxy`, `RebuildPlanetProxy`, `RebuildSectionProxiesFromPlanetAsset`, `ClearSectionProxies`
- Visibility: `SetPlanetProxyVisible`, `SetSectionProxiesVisible`, `SetSectionProxyMorphAlpha`, `GetSectionProxyMorphAlpha`
- 상태 조회: `GetPlanetSphereComponent`, `GetSectionProxyResidencyState`, `GetSectionProxyRealizedComponentCount`

`RebuildSectionProxiesFromPlanetAsset`은 생성 수를 반환합니다. 이 그룹의 나머지 Rebuild, Clear와 Visibility Command는 `void`이므로 결과가 중요하다면 Residency와 Count를 확인하세요.

#### Section과 Layer 표현

| 반환형 | 함수 |
| --- | --- |
| `int32` | `SetSectionProxyBakeData`, `ClearSectionProxyBakeData`, `SetProxyLayerVisible`, `SetSectionProxyPartitionVisible`, `RemoveProxyLayer`, `GetSectionProxyLayerCount`, `GetProxyLayerCount` |
| `bool` | `SetSectionProxyLayer`, `SetSectionProxyMesh`, `RemoveSectionProxyLayer`, `SetSectionProxyLayerVisible`, `HasSectionProxyLayer` |
| `void` | `RemoveSectionProxyLayers` |
| Array | `GetSectionProxyLayerIds`, `GetSectionProxySectionIds` |

Count를 반환하는 변경 함수에서 `0`은 일치해 변경된 Entry가 없다는 뜻입니다. Boolean 변경 함수는 요청 작업의 성공 여부를 반환합니다.

Debug 표현에는 `SetDebugOverlaySettings`, `GetDebugOverlaySettings`, `SetDebugOverlaysVisible`를 사용합니다.

### UPlanetXTransitionMorphComponent

헤더: `PlanetX/Components/PlanetXTransitionMorphComponent.h`

| 반환형 | 함수 |
| --- | --- |
| `void` | `SetProxyBakeData`, `SetProxyMeshOverride`, `SetTransitionResources` |
| Object | `GetProxyBakeData`, `GetProxyMeshOverride`, `GetTransitionResources` |
| `bool` | `HasCompatibleTransitionResources`, `IsUsingGpuMorph`, `IsUsingStaticMeshGpuMorph`, `HasRenderableTransitionPresentation` |
| `void` | `BuildMorphMesh`, `ApplyMorphState`, `SetTransitionAlpha`, `SetTransitionActive`, `SetMorphVisible`, `ApplyMorphRenderPolicy` |

Build와 Apply Command는 `void`입니다. Compatibility와 Renderability Query로 실제 선택된 표현 경로를 확인하세요.

### Viewpoint와 Travel Receiver

`UPlanetXViewpointComponent`는 `PlanetX/Components/PlanetXViewpointComponent.h`에 선언됩니다. `GetTransitionFrame`과 `MapViewDirectionToMovement`는 `bool`을 반환하며 성공했을 때만 출력을 사용합니다.

`UPlanetXTravelReceiverComponent`는 `PlanetX/Components/PlanetXTravelReceiverComponent.h`에 선언됩니다. Blueprint-callable 함수는 없습니다. `bAutoResumePendingTravel`, `bApplyControlRotation`, `ArrivalRetryTimeoutSeconds`를 설정하고 `bLastResumeSucceeded`, `LastResumeError`, `State`를 확인하거나 `OnTravelResumed`, `OnTravelResumeFailed`에 Bind합니다. 이 Component는 Level Open, Spawn, Possess 또는 GameMode 선택을 담당하지 않습니다.

## Asset과 Project Settings API

### UPlanetXPlanetAsset

헤더: `PlanetX/Assets/PlanetXPlanetAsset.h`

#### Identity와 Revision 조회

| Category | 함수 |
| --- | --- |
| Planet Asset | `GetPlanetId`, `GetRadiusCm` |
| Bake Revision | `GetBakeContractRevision`, `GetLastSuccessfulBakeRevision`, `IsProxyBakeStale` |
| Visual·Material Revision | `GetVisualSettingsRevision`, `GetMaterialBindingRevision`, `GetLastSuccessfulVisualBuildRevision`, `HasSuccessfulVisualBuild`, `IsVisualBuildStale` |
| Environment·Preview Revision | `GetEnvironmentSettingsRevision`, `GetLastSuccessfulPreviewRevision`, `IsVisualPreviewStale` |

모두 Blueprint Pure 조회입니다. Revision이 0이면 대응하는 출력이 아직 한 번도 성공적으로 게시되지 않았다는 뜻일 수 있습니다.

#### Visual Authoring 변경

아래 함수는 별도 표시가 없으면 `PlanetX|Visual` Blueprint Category에 속하며 `bool`을 반환합니다.

| 함수 | 계약 |
| --- | --- |
| `SetSurfaceCompletionSettings`, `SetProxyPaddingSettings`, `SetVisualGenerationSettings` | Revision 추적 Setter를 통해 Completion과 Padding 입력을 변경합니다. |
| `SetEnvironmentSettings`, `SetActiveSurfacePreset` | Environment 설정 또는 활성 Surface Preset을 변경합니다. |
| `SetSectionPlacement`, `SetSectionGroundProxyVisibility` | 지정한 Section을 변경합니다. |
| `IsSectionPlacementLockedToNorthPole`, `IsSectionAtCanonicalNorthPole` | 지정한 Section의 Same World Placement 계약을 읽습니다. |
| `ValidateSectionPlacement`, `ValidateLevelTopology` | Placement 또는 전체 Topology를 검증하며 선언된 경우 Reason Text를 출력합니다. |
| `SetSectionSurfaceCorrectionSettings`, `RefreshSectionProxyBakeLink` | Correction 설정을 변경하거나 권위 있는 Bake Data를 다시 연결합니다. |

`MarkVisualPreviewBuildSucceeded`는 `PlanetX|Revision` Category의 `void` Blueprint-callable 함수입니다. Preview Build가 성공한 뒤에만 호출하세요. Revision과 Staleness 추적을 일관되게 유지하려면 직접 Field를 바꾸기보다 이 함수와 Planet Asset Editor를 사용합니다.

### UPlanetXSurfacePreset

헤더: `PlanetX/Visual/Assets/PlanetXSurfacePreset.h`

이 Blueprint Type에는 Blueprint-callable 함수가 없습니다. 편집 가능한 Field는 `PresetId`, `DisplayName`, `PresetType`, `CompletionSettings`, `PaddingSettings`, `BaseSurfaceMaterial`, `OptionalBiomeMask`, `OptionalHeightMask`입니다. `PresetId`를 안정적으로 유지하고 참조한 Material과 Texture가 Cook에 포함되는지 확인하세요.

### Project Settings

`UPlanetXRuntimeDeveloperSettings`는 `PlanetX/Settings/PlanetXRuntimeDeveloperSettings.h`에 선언됩니다. Project-wide Config Field는 `RuntimeBudgetPolicy`이며 기본값은 `EPlanetXRuntimeBudgetPolicy::FollowEngineScalability`입니다.

`UPlanetXRenderingDeveloperSettings`는 `PlanetX/Settings/PlanetXRenderingDeveloperSettings.h`에 선언됩니다. Config Field는 기본값이 `true`인 `bEnableLensFlares`와 기본값이 `3`이고 유효 범위가 0~3인 `LensFlareQuality`입니다. `ApplyConsoleVariables`는 C++ Member이며 Blueprint 함수가 아닙니다.

## Movement Handoff API

헤더: `PlanetX/Blueprint/PlanetXMovementHandoffLibrary.h`

클래스: `UPlanetXMovementHandoffLibrary`

Blueprint Category: `PlanetX|Movement Handoff`

이 Library는 versioned Movement Snapshot을 저장하고 `FPlanetXMovementHandoffHandle`을 반환합니다. 이후 호출에서 이 Handle을 resolve, apply, consume 또는 cancel합니다. 공개 함수 10개는 모두 `bool`과 `FPlanetXMovementHandoffResult`를 제공하므로 출력 사용 전에 두 결과를 함께 확인하세요.

### Capture

| 함수 | 입력과 출력 |
| --- | --- |
| `CaptureMovementComponentHandoff` | `FPlanetXMovementHandoffCaptureRequest`로 `UMovementComponent`를 캡처하고 Snapshot과 Result를 씁니다. |
| `CapturePhysicsBodyHandoff` | `UPrimitiveComponent` Physics Body를 캡처하고 Snapshot과 Result를 씁니다. |
| `CaptureMovementHandoffVelocity` | Source Actor에 대해 전달한 World 선속도·각속도를 캡처하고 Snapshot과 Result를 씁니다. |

`FPlanetXMovementHandoffCaptureRequest`는 Source·Target Coordinate Frame, Source·Target Actor Space State와 Snapshot Lifetime을 지정합니다.

### Resolve와 Apply

| 함수 | 입력과 출력 |
| --- | --- |
| `ResolveMovementHandoffVelocity` | `EPlanetXMovementContinuityPolicy`에 따라 Handle을 대상 World 선속도·각속도로 resolve합니다. |
| `ApplyMovementComponentHandoff` | `FPlanetXMovementHandoffApplyOptions`에 따라 Handle을 대상 `UMovementComponent`에 적용합니다. |
| `ApplyPhysicsBodyHandoff` | Handle을 대상 Physics Body에 적용합니다. |
| `SwitchMovementComponentsWithHandoff` | Source 캡처, Option에 따른 Component 활성 전환과 Target 적용을 수행합니다. |

Apply Option은 연속성, Source 비활성화, Target 활성화, Component Velocity 갱신, 성공 시 Consume과 Same Actor 강제를 제어합니다. Switch가 실패했다면 Component 활성 상태나 Velocity가 의도대로 바뀌었다고 가정하지 말고 Result와 실제 Component를 확인하세요.

### 조회와 종료

| 함수 | 계약 |
| --- | --- |
| `GetMovementHandoffSnapshot` | Handle이 가리키는 Snapshot을 Consume하지 않고 읽습니다. |
| `ConsumeMovementHandoff` | Pending Handle을 Consumed 상태로 바꿉니다. |
| `CancelMovementHandoff` | Pending Handle을 Cancelled 상태로 바꿉니다. |

Actor로 상태를 검색하지 말고 반환된 Handle을 사용하세요. Handle이 invalid, expired, consumed, cancelled 상태이거나 저장된 generation과 일치하지 않으면 실패할 수 있습니다. 전환 직전에 캡처하고, 대상 Frame을 사용할 수 있게 된 뒤 resolve·apply하며, 성공적으로 적용한 뒤에만 consume하세요.

## 데이터 타입과 C++ 통합

### 모듈 설정

게임 모듈의 `Build.cs`에 `PlanetX` 런타임 모듈을 추가합니다.

```csharp
PublicDependencyModuleNames.AddRange(new[] { "PlanetX" });
```

각 타입을 소유하는 헤더를 Include하세요. 자주 사용하는 진입점은 다음과 같습니다.

- `PlanetX/Core/PlanetXTypes.h`
- `PlanetX/Coordinates/PlanetXTransform.h`
- `PlanetX/Coordinates/PlanetXCoordinateUtils.h`
- `PlanetX/Movement/PlanetXMovementTypes.h`
- `PlanetX/Movement/Handoff/PlanetXMovementHandoffTypes.h`
- `PlanetX/Travel/PlanetXLevelPair.h`
- `PlanetX/Transition/PlanetXTransitionTypes.h`
- `PlanetX/Validation/PlanetXValidation.h`

### 안정 Transform 계약

`FPlanetXTransform`은 `DataVersion`, `PlanetId`, `PlanetBindingId`, `PlanetFixedPositionCm`, `PlanetFixedRotation`, `Scale3D` Reflection Field를 가진 Blueprint Type입니다. Position 단위는 cm입니다. `UPlanetXSubsystem` 또는 `UPlanetXCoordinateComponent`로 Resolve·Capture하고, World Transform을 Representation과 무관한 저장 Pose로 취급하지 마세요.

### 안정 Movement Handoff 타입

안정 Handoff 계약은 다음을 포함합니다.

- `FPlanetXMovementHandoffHandle`: `SnapshotId`, `Generation`
- `FPlanetXMovementHandoffCaptureRequest`: Source·Target Frame, Source·Target Actor Space State, `LifetimeSeconds`
- `FPlanetXMovementHandoffApplyOptions`: Continuity, Activation, Velocity Update, Consume와 Same Actor 정책
- `FPlanetXMovementHandoffSnapshot`: Version, Handle, Source Identity와 Frame, Movement State, Capture Time, Lifetime, State
- `FPlanetXMovementHandoffResult`: `bSucceeded`, `Error`, `Handle`, `DiagnosticContext`

안정 Reflection Enum에는 `EPlanetXTransformSource`, `EPlanetXMovementHandoffState`, `EPlanetXMovementContinuityPolicy`, `EPlanetXMovementVectorSpace`가 있습니다. 실제 배포하는 Plugin Version의 헤더를 기준으로 Compile·Serialize하고 숫자 값이나 Layout을 추정하지 마세요.

### Travel Route 선택

`FPlanetXTravelRoute`는 `PlanetX/Transition/PlanetXTransitionTypes.h`에 선언되며 `World`, `PlanetId`, `SectionId`, `PlanetActorIndex`, `PlanetBindingId`를 포함합니다. `PlanetActorIndex` 기본값은 `INDEX_NONE`입니다. 후보가 정확히 하나일 때만 자동 선택하며 `0`은 첫 번째 deterministic 후보를 명시적으로 선택합니다. 두 Selector를 함께 지정하면 Index와 Binding ID가 같은 후보를 가리켜야 합니다.

### Coordinate와 Validation Helper

`FPlanetXCoordinateUtils`는 지원 Coordinate 표현 사이의 순수 C++ 변환을 제공합니다. Runtime Registry가 필요한 변환은 `UPlanetXSubsystem`을 사용하세요. cm 단위, 유한한 값과 정규화된 방향 가정을 지키고 성공값을 항상 확인합니다.

`PlanetXValidation`은 C++ Tool을 위한 구조화된 Validation을 제공합니다. Severity, Code, Subject와 Remediation Text를 유지하세요. Validation은 Asset을 암묵적으로 Repair하거나 Save하지 않습니다.

### 제외되는 구현 표면

생성 Mesh 데이터, Boundary Reconstruction 중간체, Bake Pass, 내부 Runtime Service와 Shard·Serialization Payload는 선언이 공개되어 있다는 이유만으로 안정 Game Save 또는 Network 계약이 되지 않습니다.

## 설치와 설정 문제

### 플러그인이 로드되지 않음

`PlanetX.uplugin`과 프로젝트의 EngineAssociation을 확인합니다. 현재 기준은 UE 5.8이며 Runtime과 Editor 두 모듈이 있습니다. GeometryProcessing과 PCG 플러그인이 활성화되고 대상 플랫폼 toolchain이 설치되어야 합니다.

Editor 로그에서 module load 실패의 첫 오류를 확인하세요. 이후 compile 오류는 연쇄 결과일 수 있습니다.

### Planet Asset 생성 항목이 없음

- PlanetXEditor 모듈이 로드됐는지 확인
- Content Browser의 올바른 Add 메뉴 사용
- 프로젝트가 Editor target으로 빌드됐는지 확인
- Plugin 활성화 후 Editor 재시작

### Actor가 Planet을 resolve하지 못함

Coordinate Component에서 Reference Planet Actor가 유효하면 Planet ID보다 우선합니다. 해당 Actor의 Planet Component에 Planet Asset이 지정됐는지, runtime 등록이 성공했는지 확인하세요.

여러 Actor가 같은 Planet ID를 쓰면 Planet Binding ID를 명시합니다. Section 드롭다운은 Content Browser 전체가 아니라 현재 World에 배치된 Planet의 enabled Section에서 만들어집니다.

### World Partition 경고

`EPlanetXActorSpatialLoadingPolicy::PlanetXManaged`는 Orbit Actor를 non-spatial 상태로 유지합니다. `ActorManaged`를 선택하면 Is Spatially Loaded를 프로젝트가 직접 관리해야 합니다. Data Layer와 Streaming Source는 자동 변경되지 않습니다. 실제 적용 상태는 `GetActorSpatialLoadingPolicy`, `ShouldForceOwnerAlwaysLoaded`, `ApplySpatialLoadingPolicyToOwner`로 확인하세요.

## Proxy Bake 문제

### Scan Sources가 비활성

대상 Planet Asset, Section과 Source World가 유효한지 확인합니다. PIE를 종료하고 외부 Worker가 다른 작업을 소유하지 않는지 확인하세요. External Level Section을 다른 Level에서 열었다면 Editor가 필요한 Level 이동을 요청할 수 있습니다.

### CompletedWithWarnings

BakeData의 SourceOmissions를 확인합니다. Reason, PassId, Actor/Component path, class와 Detail이 저장됩니다.

대표 원인:

- Spline Mesh deformation
- 지원하지 않는 Component class
- Cloth/deformable
- Missing mesh 또는 LOD
- projection range 초과
- unsupported material 또는 sky material
- nondeterministic dynamic source
- 저장되지 않은 PCG managed resource

의도된 제외라면 Source 정책이나 NoBake tag를 명시하고, 보이는 콘텐츠가 빠졌다면 지원되는 Static Mesh/Instance/Landscape 형태로 바꿉니다.

### Bake가 stale

Planet Asset 구조, Section placement, Source World content, Source Material, quality나 visual generation 입력이 바뀌면 revision이 stale이 됩니다. Scan과 plan 재계산 후 다시 Bake하고 Full Validate를 실행합니다.

### External Bake Monitor가 열리지 않음

브라우저 Monitor는 선택 기능이며 Bake를 소유하지 않습니다. 로컬 서비스나 시스템 브라우저를 열지 못해도 External Bake는 계속되므로 Editor 상태와 Unreal 로그에서 진행 상황을 확인하세요. 전체 Monitor URL에는 로컬 세션 token이 포함되므로 복사하거나 공유하지 마세요.

Bake가 진행되는 동안에는 Direct Worker가 Monitor를 호스팅합니다. Worker가 종료되면 서비스도 끝나므로 완료 후 기존 탭에 **Disconnected**가 표시될 수 있습니다. Unreal Editor로 돌아가거나 다시 실행한 뒤 **Open External Bake Monitor**를 선택하면 최신 durable result를 다시 호스팅할 수 있습니다. 이전 탭은 자동으로 이전되지 않습니다.

### 큰 package

512 MiB 초과 package는 warning, 1 GiB 초과는 publication failure입니다. 큰 indivisible source를 분리하고 partition/shard 결과와 instance aggregation을 검토하세요. source spool 128 MiB 목표는 최종 uasset 크기가 아님을 유의합니다.

## 런타임과 Travel 문제

### RuntimeUnavailable

Planet Actor 등록, Planet Asset, 현재 World와 World Runtime 서비스가 준비되지 않은 상태입니다. Begin Play/streaming 순서를 확인하고 Planet Component의 RefreshRuntimeRegistration과 참가 Actor의 RefreshRuntimeContext를 사용합니다.

### 표면 Query가 실패

Detailed query status로 InvalidInput, RuntimeUnavailable, Miss를 구분합니다. Ray direction이 0이 아닌지, Planet/Binding filter가 현재 World에 존재하는지, Section bounds와 BakeData가 유효한지 확인하세요.

### ResumePendingTravel 실패

| Error | 의미 |
| --- | --- |
| PendingTravelNotFound | 현재 World에 matching pending capture 없음 |
| AmbiguousPendingTravel | matching capture가 여러 개 |
| StaleGeneration | 더 새로운 Ticket이 이미 발행됨 |
| TargetPlanetBindingNotFound | 대상 Planet 인스턴스가 아직 등록되지 않음 |
| ArrivalTimedOut | retry 가능한 상태가 timeout을 넘음 |

동시 Travel에서는 Ticket/Journey identity를 gameplay 상태에 저장하고 무인자 resume에 의존하지 마세요.

### 잘못된 위치 또는 회전

Level Handoff Ground 위치는 capture에 저장된 SectionLocalToGroundWorld mapping이 authoritative합니다. Source/Target Planet Actor Transform을 임의로 맞춰 덮어쓰지 마세요. DiagnoseProxySync와 ResolvePlanetAlignmentForSection으로 mapping을 검사합니다.

### 속도 손실

Movement Component나 Physics Body를 교체했다면 Movement Handoff snapshot을 Capture/Apply하고 결과가 consumed됐는지 확인합니다.

## 진단 도구

PlanetX는 Editor UI, Blueprint query, console stat과 dump 명령을 제공합니다.

### 실시간 Stat

```text
Stat PlanetXMemory
Stat PlanetXResources
Stat PlanetXProxy
Stat PlanetXProxyDetail
Stat PlanetXRuntime
```

Memory는 runtime resource와 budget을, Resources는 수량을, Proxy는 렌더 coverage를, Runtime은 service 비용을 보여줍니다. 통계 World는 PIE/Game World와 선택된 Preview World 우선순위에 따라 결정됩니다.

### Dump 명령

| 명령 | 결과 |
| --- | --- |
| PlanetX.ProxyStats.Dump | 현재 World의 proxy render summary |
| PlanetX.ProxyStats.DumpInstanceCoverage | instance source와 realized coverage |
| PlanetX.VisualEdit.Status | Visual Edit session 상태 |
| PlanetX.VisualEdit.Dump | Visual build, Section failure와 진단 snapshot |

`PlanetX.ProxyStats.LogIntervalSeconds`는 반복 proxy log 주기를, `PlanetX.MemoryBudgetMB`는 진단용 memory budget을 조정합니다.

### Blueprint 진단

`UPlanetXSubsystem`에서 Actor runtime context, movement state, transition result, managed actor state, Section runtime state와 Journey를 조회할 수 있습니다. DrawPlanetDebug, DrawSectionDebug, DrawActorContextDebug, DrawCaptureStackDebug는 개발 build의 공간 상태 확인에 사용합니다.

### 지원 자료 수집

문제를 재현한 World, Planet/Binding/Section ID, Asset validation result, Proxy Bake revision과 omission, Travel Result error, 관련 Stat/Dump를 함께 기록하세요. 경로에 민감 정보가 있을 수 있으므로 외부 공유 전 redaction을 확인합니다.

## Version 1.0 Mercury

### 릴리스 계약

| 항목 | 값 |
| --- | --- |
| 릴리스 이름 | 1.0 Mercury |
| Version | 1 |
| VersionName | 1.0 |
| Engine baseline | Unreal Engine 5.8 프로젝트 |
| Runtime module | PlanetX |
| Editor module | PlanetXEditor |
| SupportedTargetPlatforms | Win64 |
| Required plugins | GeometryProcessing, PCG |
| CanContainContent | true |
| Beta / Experimental | false / false |

### 포함 기능

- Planet Asset, Section, Level Pair 제작
- PlanetX Mode와 전용 Planet Asset Editor
- Proxy Bake와 외부 진행 Monitor
- 좌표, 표면 Query, 이동, 중력
- Same World와 Level Handoff travel
- Runtime Preview와 transition presentation
- Completion, Padding, generated material
- Atmosphere, cloud, sun, post process, space background
- Validation, runtime stats와 diagnostics

### 배포 참고

Plugin package에 로컬에서 직접 여는 이 `Docs` 정적 사이트가 포함됩니다. 릴리스별 자동 changelog나 과거 호환성 표는 현재 소스에 근거가 없으므로 이 문서에서 추정하지 않습니다.

### 1.0.x 유지보수 트랙 (미출시)

> 이 내용은 계획된 유지보수 Release 범위이며, 패치가 이미 공개되었다는 뜻이 아닙니다. 각 변경은 아래 Release Gate에서 코드, Editor/PIE 동작, 패키지 Win64 동작, 기존 프로젝트 업그레이드 동작을 모두 통과한 뒤에만 공개 릴리스 노트로 이동합니다.

#### Batch A — Release 안전 진단과 복구

- Chrome 확인 응답을 받지 못해도 외부 Monitor 시작이 실패로 확정되지 않도록 하고, 브라우저 탐색과 별개로 수동 URL/재시도 복구 경로를 유지합니다.
- Transition Resource Build 전에 누락·stale·미저장 PCG 출력을 식별 가능한 Preflight 결과로 제공합니다. 이 Batch는 PCG 자동 생성이나 저장 orchestration을 약속하지 않습니다.
- Runtime Proxy가 보이지 않는 원인을 authored instance culling, Runtime Budget/Scalability, residency/loading, generated resource 누락으로 구분해 보고합니다.
- 복잡한 Landscape Material 경로와 multi-island boundary/padding 입력을 publish 전에 감지하고, 가능하면 영향받은 Actor, Component 또는 generated resource 경로를 표시합니다.

#### Batch B — Editor Visibility와 Gizmo 사용성

- PlanetX Mode의 강제 Visibility 적용을 저장되는 editor-only Visibility Filter로 교체합니다.
- 일반 Actor와 다중 선택에서 UE Native Transform Gizmo를 다시 사용할 수 있게 하고, PlanetX Coordinate Gizmo는 지원되는 단일 Coordinate Component 워크플로에만 유지합니다.
- Editor Preview 상태와 Runtime Visibility 상태를 분리합니다.

#### Batch C — Runtime Presentation 호환성

- migration 안전성을 위해 현 1.0 동작을 기본값으로 보존하면서 opt-in Runtime Presentation/Visibility Policy를 도입합니다.
- Ground와 Orbit 모두에서 보여야 하는 콘텐츠에는 명시적인 shared-presentation 옵션을 제공합니다. 이는 Representation Domain과 분리되며 coordinate/load 의미를 바꾸지 않아야 합니다.

#### 1.0.x 유지보수 범위 이후로 미루는 항목

- 완전한 Representation Domain 양방향 상태 복원.
- 일반화된 multi-island padding reconstruction.
- 임의 Landscape Material Graph의 완전한 fidelity 지원.
- PCG 자동 generate/save/cook orchestration.

#### Release Gate와 Known Issue 종료 기준

후보 변경은 모두 다음의 해당 검증을 통과해야 수정 완료로 공지합니다.

1. 지원 기준인 Unreal Engine 5.8에서 PlanetX Editor와 Win64 target을 빌드하고, 새 warning이 error로 처리되는 상태가 없어야 합니다.
2. 새 프로젝트와 기존 1.0 프로젝트에서 open, save, Proxy Bake, transition, PIE, 패키지 Win64 smoke test를 확인합니다.
3. 영향받은 Scalability preset과 문서화한 복구 경로에서 이슈별 재현을 다시 검증합니다.
4. 선택한 opt-in policy 이외의 기존 Runtime Visibility, Representation Domain, generated resource 동작이 변하지 않았음을 확인합니다.
5. 출시 버전과 검증 근거를 기록한 뒤에만 Known Issues의 해당 항목을 **Resolved**로 옮깁니다. 진단 추가나 임시 workaround만으로는 이슈를 닫지 않습니다.

## 서드파티 저작권 고지

### 배포 조건

PlanetX는 Fab을 통해 배포되며, 취득과 사용 조건은 Fab End User License Agreement를 따릅니다.

| 항목 | 내용 |
| --- | --- |
| 배포 채널 | Fab |
| 적용 약관 | Fab End User License Agreement |
| 약관 주소 | https://www.fab.com/eula |
| 저작권 | Copyright (c) 2026 LabX. All Rights Reserved. |

여기 기재된 고지는 Fab End User License Agreement를 대체하거나 변경하지 않으며, PlanetX에 별도의 이용 조건을 추가하지 않습니다.

### 개발 지원 프로그램 고지

이 제품은 KRAFTON JUNGLE GameTech Lab의 개발자 지원 프로그램인 Epic Project에 참여하며 본인(당사)이 독자적으로 개발한 결과물입니다. 이 제품에 대한 모든 권리와 권원, 이익은 전적으로 본인(당사)에게 귀속됩니다. Krafton, Inc.는 이 제품의 개발과 배포에 관여하지 않았으며, 명시적이거나 묵시적인 일체의 진술과 보증을 부인하고, 이 제품의 사용으로 발생하는 어떠한 결과에 대해서도 책임을 지지 않습니다.

위 고지의 원문은 다음과 같습니다.

> This product was independently developed by me(us) while participating in the Epic Project, a developer-support program of the KRAFTON JUNGLE GameTech Lab. All rights, title, and interest in and to the product are exclusively vested in me(us). Krafton, Inc. was not involved in its development and distribution and disclaims all representations and warranties, express or implied, and assumes no responsibility or liability for any consequences arising from the use of this product.

### Solar System Scope 행성 표면과 우주 배경 텍스처

PlanetX의 샘플 행성 표면 텍스처와 우주 배경 텍스처는 Solar System Scope / INOVE가 제공하는 텍스처 데이터를 포함하거나 이를 기반으로 제작되었습니다. 이 텍스처를 참조하는 Unreal Engine Material과 Material Instance도 같은 범위에 포함됩니다.

| 항목 | 내용 |
| --- | --- |
| 저작자 | Solar System Scope / INOVE |
| 저작물 | Solar Textures |
| 출처 | https://www.solarsystemscope.com/textures/ |
| 라이선스 | Creative Commons Attribution 4.0 International (CC BY 4.0) |
| 라이선스 전문 | https://creativecommons.org/licenses/by/4.0/ |

#### 포함 위치

텍스처 에셋은 모두 `Content/PlanetX/Textures/Samples/Solar_System_Scope` 아래에 있습니다.

| 용도 | 에셋 |
| --- | --- |
| 행성 표면 | `T_PlanetX_Earth`, `T_PlanetX_Earth_Normal`, `T_PlanetX_Mars`, `T_PlanetX_Mars_Normal`, `T_PlanetX_Moon`, `T_PlanetX_Moon_Normal` |
| 우주 배경 | `T_PlanetX_SpaceBackground` |

위 텍스처를 참조하는 샘플 행성 Material Instance와 우주 배경 Material도 이 고지의 적용 대상입니다.

#### 변경 사항

- 원본 행성 표면 텍스처와 우주 배경 텍스처를 Unreal Engine 콘텐츠 에셋 형식으로 임포트하고 변환했습니다.
- 변환한 텍스처를 샘플 행성 Material, 우주 배경 Material과 관련 Texture, Material, Material Instance 에셋에 통합했습니다.
- Unreal Engine의 임포트, 압축, 밉맵, 샘플링, Material 설정에 따라 원본 텍스처와 다르게 표현될 수 있습니다.

#### 적용 범위

CC BY 4.0은 위에 명시한 행성 표면 텍스처와 우주 배경 텍스처, 그리고 이를 사용하는 콘텐츠에만 적용되며, PlanetX의 소스 코드나 그 밖의 자체 제작 에셋에는 적용되지 않습니다.

이 고지의 어떤 내용도 Solar System Scope 파생 콘텐츠에 대해 CC BY 4.0이 부여하는 권리를 제한하지 않습니다.

Solar System Scope와 INOVE는 PlanetX를 보증하거나 후원하지 않으며, 공식적으로 지원하지 않습니다.

### 그 밖의 구성 요소

위에 명시한 행성 표면 텍스처와 우주 배경 텍스처 외에 PlanetX가 사용하는 외부 저작물은 없습니다. 그 밖의 소스 코드, Material, Mesh, 아이콘, 문서, Proxy Bake Monitor 웹 리소스는 모두 LabX가 직접 제작했습니다. 문서 사이트는 외부 스크립트, 폰트, 스타일시트를 내려받지 않으며 네트워크 연결 없이 동작합니다.
