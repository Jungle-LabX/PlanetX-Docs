# 고급 가이드 — Multi-Level Handoff

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

이 고급 워크플로를 사용하기 전에 [여기서 시작 — Same World 빠른 시작](?lang=ko&doc=quick-start-same-world)을 완료하세요. 이 문서는 Planet Asset, Proxy Bake, Visual Build, PlanetX Mode와 기본 전환 개념을 이미 이해하고 있다고 가정합니다.

---

## 시작하기 전에

Level Handoff에서는 서로 다른 두 개의 Level이 필요합니다.

이 가이드에서는 다음 이름을 예시로 사용합니다.

```text
L_Orbit
L_Ground
```

### L_Orbit

우주에서 행성을 보여주고 플레이어가 행성으로 접근하는 Level입니다.

이 Level에는 이후 다음 요소를 배치합니다.

```text
L_Orbit
├─ PlanetX Planet
├─ PlanetX Environment Manager
├─ PlanetX Transition Endpoint
└─ Orbit Player / SpaceShip
```

### L_Ground

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

## Phase 체크포인트

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

## 1. Planet Asset 준비

먼저 Planet Asset을 하나 만듭니다.

Planet Asset 생성 과정은 [첫 Planet Asset 만들기](?lang=ko&doc=create-first-planet) 문서에서 자세히 설명합니다.

해당 문서를 따라 다음 단계까지만 완료한 뒤 이 페이지로 돌아오세요.

- Planet Asset 생성
- Planet ID 설정
- Planet Radius 설정
- Planet Asset 저장

**Section은 아직 직접 만들 필요가 없습니다.**

Ground Level에서 첫 Proxy Bake를 실행하면 PlanetX가 필요한 Section과 Level Pair를 자동으로 생성합니다.

---

## 2. Ground Level 열기

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

## 3. Proxy Bake Editor 열기

`L_Ground`가 열린 상태에서 Unreal Editor의 **Tools** 메뉴에서 **PlanetX** 영역을 찾고 **Proxy Bake Editor**를 선택합니다. 첫 External Section에서는 이 단일 경로만 사용합니다.

Proxy Bake Editor가 열리면 먼저 **Target Planet Asset**을 확인합니다.

```text
1 Target Planet Asset
└─ Planet Asset
```

앞 단계에서 만든 Planet Asset을 지정하세요.

첫 Bake 전에는 선택할 기존 Section이 없습니다.

---

## 4. Runtime Role을 External Level로 설정하기

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

### Ground World 확인

**Ground World**에는 현재 열려 있는 `L_Ground`가 자동으로 표시됩니다.

```text
Ground World
    L_Ground
```

Ground World는 직접 선택하는 값이 아니라 현재 Scan/Bake 대상 Source World를 기준으로 결정됩니다.

### Planet World 지정

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

## 5. Source Scope 선택하기

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

## 6. Ground Source 검색하기

설정이 끝났다면 **Scan Sources**를 클릭합니다.

단축키는 `F5`입니다.

```text
Scan Sources
```

PlanetX가 현재 Ground Level을 조사하고 Proxy로 변환할 Source를 찾습니다.

Scan이 끝나면 **Source Review**에 발견된 항목이 나타납니다.

### Source Review 확인

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

## 7. Proxy Bake 실행하기

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

### Runtime Preview World란?

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

## 8. Bake 결과 확인하기

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

## 9. 행성에서 Section 위치 확인하기

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

## 10. 행성 비주얼 만들기

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

## 11. Orbit World에 Planet Actor 배치하기

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

## 12. Planet Actor 정렬하기

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

## 13. Environment Manager 추가하기

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

## 14. Orbit Transition Endpoint 추가하기

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

### Transition Cylinder

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

## 15. Orbit Player를 PlanetX에 연결하기

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

### Coordinate Component

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

### Viewpoint Component

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

## 16. Ground Player 준비하기

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

## 17. Travel 정보를 보관할 GameInstance 준비하기

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

## 18. Orbit에서 착륙 지점 Query하기

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

### Surface Query Input

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

### Query 결과 확인

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

## 19. Orbit → Ground Handoff 준비하기

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

## 20. Handoff Ticket 저장하기

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

## 21. 실제 Ground Level 열기

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

## 22. Ground World에서 Player를 먼저 Spawn하고 Possess하기

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

## 23. Ground Player에 저장한 Ticket 적용하기

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

## 24. Ground 도착 결과 저장하기

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

## 25. Ground 도착 위치 확인하기

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

## 26. 더 간단한 도착 방식: Travel Receiver

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

## 27. Ground → Orbit 복귀 준비하기

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

## 28. Return Ticket 저장하고 Orbit World 열기

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

## 29. Orbit World에서 복귀 상태 적용하기

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

## 30. Orbit 도착 시 Runtime 등록 순서 때문에 실패한다면

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

## 31. Runtime Preview 동작 확인하기

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

## 32. 실행 전 Validate하기

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

## 33. 전체 흐름 테스트하기

이제 `L_Orbit`에서 PIE를 시작합니다.

### 1단계: Orbit 확인

먼저 다음을 확인합니다.

- 행성이 정상적으로 표시됨
- Section Proxy가 보임
- Player를 조작할 수 있음
- PlanetX Runtime에 Planet이 등록됨

### 2단계: 행성에 접근

Section 방향으로 접근하면서 다음을 확인합니다.

```text
Orbit
→ Transition
→ Ground Presentation
```

Runtime Preview가 필요한 시점에 정상적으로 나타나는지 확인합니다.

### 3단계: 착륙 입력

Section을 향해 카메라를 두고 `IA_Land`를 실행합니다.

다음 순서가 발생해야 합니다.

```text
Surface Query Hit
→ Begin Level Handoff 성공
→ Ticket 저장
→ L_Ground Open
```

### 4단계: Ground 도착

Ground Player가 Spawn되고 Possess된 후 다음이 발생해야 합니다.

```text
Complete Level Handoff
→ 저장된 Ground Pose 적용
→ Journey = Ground Active
```

### 5단계: Orbit 복귀

`IA_ReturnOrbit`을 실행합니다.

```text
Begin Return Level Handoff
→ Return Ticket 생성
→ L_Orbit Open
→ Return Ticket 적용
→ Journey Completed
```

---

## 34. PlanetX Runtime Palette에서 확인하기

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

## Level Handoff가 동작하지 않는다면

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

## 자주 발생하는 오류

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

## Ground World에서도 PlanetX 기능을 사용하려면

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

## 완료

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
